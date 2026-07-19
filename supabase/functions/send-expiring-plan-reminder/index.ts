// Sends a reminder to users whose plan expires in ~24 hours.
// Invoked daily via pg_cron. Uses service_role to read profiles + user_plans.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

function buildHtml(name: string, planName: string, expiresAt: string) {
  const nameH = escapeHtml(name);
  const planH = escapeHtml(planName);
  const dateH = escapeHtml(new Date(expiresAt).toLocaleDateString("en-IN",
    { day: "numeric", month: "long", year: "numeric" }));
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:'Segoe UI',Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:40px 20px;">
  <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
      <tr><td style="background:linear-gradient(135deg,#f59e0b,#7c3aed);padding:40px;text-align:center;">
        <img src="https://skillta.tech/logo.png" alt="SkillTa" width="56" height="56" style="display:block;margin:0 auto 16px;border-radius:14px;" />
        <h1 style="margin:0;font-size:24px;color:#fff;font-weight:700;">Your ${planH} Plan expires tomorrow ⏰</h1>
        <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.9);">Keep your streak alive — one click to renew</p>
      </td></tr>
      <tr><td style="padding:32px 40px 8px;">
        <p style="margin:0;font-size:18px;color:#1a1a2e;font-weight:600;">Hey ${nameH}! 👋</p>
        <p style="margin:12px 0 0;font-size:15px;color:#555770;line-height:1.7;">
          Just a quick heads-up — your <strong style="color:#7c3aed;">${planH} Plan</strong> expires on <strong>${dateH}</strong>. After that, quiz saves &amp; the daily quota will pause until you re-activate.
        </p>
        <p style="margin:12px 0 0;font-size:15px;color:#555770;line-height:1.7;">
          If you want to keep exploring your career path without a break, re-activate the plan in one tap — it's still free.
        </p>
      </td></tr>
      <tr><td style="padding:24px 40px 8px;text-align:center;">
        <a href="https://skillta.tech/dashboard" style="display:inline-block;background:linear-gradient(135deg,#26c6b0,#7c3aed);color:#fff;text-decoration:none;font-size:16px;font-weight:600;padding:14px 36px;border-radius:10px;">Re-activate My Plan →</a>
      </td></tr>
      <tr><td style="padding:20px 40px 8px;">
        <div style="background:#f8f9fc;border-radius:12px;padding:22px;">
          <p style="margin:0 0 12px;font-size:14px;font-weight:700;color:#1a1a2e;">Everything you'll keep on renewal</p>
          <p style="margin:6px 0;font-size:13px;color:#555770;line-height:1.7;">
            ✅ 3 AI Career Quiz attempts / day<br/>
            ✅ Unlimited Salary Predictor &amp; Interview Prep<br/>
            ✅ Full 60+ Roadmap Library &amp; Compare Careers<br/>
            ✅ Unlimited AI Resume Reviewer<br/>
            ✅ Saved dashboard history
          </p>
        </div>
      </td></tr>
      <tr><td style="background:#f8f9fc;padding:22px 40px;text-align:center;border-top:1px solid #e8e9f0;">
        <p style="margin:0;font-size:13px;font-weight:600;color:#7c3aed;">— Team SkillTa 💜</p>
        <p style="margin:10px 0 0;font-size:11px;color:#aaa;">© 2026 SkillTa · <a href="https://skillta.tech" style="color:#26c6b0;text-decoration:none;">skillta.tech</a></p>
      </td></tr>
    </table>
  </td></tr>
</table></body></html>`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");

    // Find plans expiring between 24h and 48h from now — one reminder per cycle.
    const now = Date.now();
    const from = new Date(now + 24 * 3600 * 1000).toISOString();
    const to = new Date(now + 48 * 3600 * 1000).toISOString();

    const { data: plans, error } = await supabase
      .from("user_plans")
      .select("firebase_uid,name,expires_at")
      .gte("expires_at", from)
      .lt("expires_at", to);
    if (error) throw error;

    let sent = 0;
    let skipped = 0;
    for (const p of plans ?? []) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("email,display_name")
        .eq("firebase_uid", p.firebase_uid)
        .maybeSingle();
      const email = profile?.email;
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { skipped++; continue; }
      const html = buildHtml(profile?.display_name || "there", p.name, p.expires_at);
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
        body: JSON.stringify({
          from: "SkillTa <hello@skillta.tech>",
          to: [email],
          subject: `Your SkillTa ${p.name} Plan expires tomorrow — renew in 1 tap`,
          html,
        }),
      });
      if (res.ok) sent++; else { skipped++; console.error("resend failed", await res.text()); }
    }

    return new Response(JSON.stringify({ ok: true, sent, skipped, checked: plans?.length ?? 0 }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("send-expiring-plan-reminder error:", e);
    return new Response(JSON.stringify({ ok: false, error: "Failed" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
