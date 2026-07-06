// Notifies a user when they exhaust their daily quiz limit.
// Invoked internally by the firebase-data edge function (service_role -> functions.invoke).
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

interface Payload {
  email: string;
  name: string;
  planName: string;
  dailyLimit: number;
  expiresAt: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");

    const body = (await req.json()) as Payload;
    if (!body?.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const name = escapeHtml(String(body.name || "there").slice(0, 100));
    const planName = escapeHtml(String(body.planName || "Free").slice(0, 30));
    const dailyLimit = Number(body.dailyLimit) || 3;
    const expiresAt = body.expiresAt ? new Date(body.expiresAt).toLocaleDateString("en-IN",
      { day: "numeric", month: "long", year: "numeric" }) : "";

    const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:'Segoe UI',Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:40px 20px;">
  <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
      <tr><td style="background:linear-gradient(135deg,#26c6b0,#7c3aed);padding:40px;text-align:center;">
        <img src="https://skillta.tech/logo.png" alt="SkillTa" width="56" height="56" style="display:block;margin:0 auto 16px;border-radius:14px;" />
        <h1 style="margin:0;font-size:24px;color:#fff;font-weight:700;">You're on fire today! 🔥</h1>
        <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.85);">Daily quiz limit reached</p>
      </td></tr>
      <tr><td style="padding:32px 40px 8px;">
        <p style="margin:0;font-size:18px;color:#1a1a2e;font-weight:600;">Hey ${name}! 👋</p>
        <p style="margin:12px 0 0;font-size:15px;color:#555770;line-height:1.7;">
          You just finished all <strong>${dailyLimit} AI Career Quiz attempts</strong> on your <strong style="color:#26c6b0;">${planName} Plan</strong> for today. That's serious commitment to figuring out your path — respect. 🙌
        </p>
        <p style="margin:12px 0 0;font-size:15px;color:#555770;line-height:1.7;">
          Your daily quota resets tomorrow. Meanwhile, everything else on SkillTa stays <strong>fully unlimited</strong> — dive right in.
        </p>
      </td></tr>
      <tr><td style="padding:20px 40px 8px;">
        <div style="background:#f8f9fc;border-radius:12px;padding:22px;">
          <p style="margin:0 0 12px;font-size:15px;font-weight:700;color:#1a1a2e;">✨ Explore while you wait</p>
          <p style="margin:6px 0;font-size:14px;color:#555770;line-height:1.7;">
            💰 <a href="https://skillta.tech/salary-predictor" style="color:#7c3aed;text-decoration:none;font-weight:600;">Salary Predictor</a> — AI insights, 2026 market data<br/>
            🎯 <a href="https://skillta.tech/interview-prep" style="color:#7c3aed;text-decoration:none;font-weight:600;">Interview Prep</a> — role-specific practice<br/>
            🗺️ <a href="https://skillta.tech/roadmaps" style="color:#7c3aed;text-decoration:none;font-weight:600;">Roadmap Library</a> — 60+ tech paths<br/>
            ⚖️ <a href="https://skillta.tech/compare" style="color:#7c3aed;text-decoration:none;font-weight:600;">Compare Careers</a> — side-by-side<br/>
            📚 <a href="https://skillta.tech/blog" style="color:#7c3aed;text-decoration:none;font-weight:600;">Blog</a> — trending tech deep-dives
          </p>
        </div>
      </td></tr>
      <tr><td style="padding:24px 40px 28px;text-align:center;">
        <a href="https://skillta.tech/dashboard" style="display:inline-block;background:linear-gradient(135deg,#26c6b0,#7c3aed);color:#fff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 36px;border-radius:10px;">Go to Dashboard →</a>
        ${expiresAt ? `<p style="margin:14px 0 0;font-size:12px;color:#999;">Your ${planName} Plan is active until ${escapeHtml(expiresAt)}.</p>` : ""}
      </td></tr>
      <tr><td style="background:#f8f9fc;padding:22px 40px;text-align:center;border-top:1px solid #e8e9f0;">
        <p style="margin:0;font-size:13px;font-weight:600;color:#7c3aed;">— Team SkillTa 💜</p>
        <p style="margin:10px 0 0;font-size:11px;color:#aaa;">© 2026 SkillTa · <a href="https://skillta.tech" style="color:#26c6b0;text-decoration:none;">skillta.tech</a></p>
      </td></tr>
    </table>
  </td></tr>
</table></body></html>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({
        from: "SkillTa <hello@skillta.tech>",
        to: [body.email],
        subject: "You've hit today's quiz limit — resets tomorrow 🚀",
        html,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`Resend API error [${res.status}]`);
    return new Response(JSON.stringify({ ok: true, data }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("send-limit-reached error:", e);
    return new Response(JSON.stringify({ ok: false, error: "Failed" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
