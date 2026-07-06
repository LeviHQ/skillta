import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { jwtVerify, createRemoteJWKSet } from "https://esm.sh/jose@5.9.6";

const FIREBASE_PROJECT_ID = "skillta-30f35";
const ISSUER = `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`;
const JWKS = createRemoteJWKSet(
  new URL("https://www.googleapis.com/robot/v1/metadata/jwk/securetoken@system.gserviceaccount.com"),
);

const PLAN_LIMITS: Record<string, number> = { Free: 3, Pro: 999, Premium: 9999 };
const PLAN_FEATURES: Record<string, string[]> = {
  Free: [
    "3 AI Career Quiz attempts per day",
    "Unlimited Salary Predictor (AI-powered, 2026 market data)",
    "Unlimited Interview Prep sessions",
    "Full Roadmap Library — 60+ tech career paths",
    "Unlimited Compare Careers side-by-side",
    "Saathi AI career assistant",
    "Save all results to your dashboard",
  ],
  Pro: [
    "Unlimited AI career quiz attempts",
    "Everything in Free, without limits",
    "Priority quiz result analysis",
    "Advanced Saathi AI career assistant",
    "Early access to new roadmaps & blogs",
  ],
  Premium: [
    "Everything in Pro",
    "1:1 mentor sessions",
    "Personalized career plan",
    "Resume & profile review",
    "Premium learning resources",
  ],
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function verifyFirebaseToken(authHeader: string | null) {
  if (!authHeader?.startsWith("Bearer ")) throw new Error("Missing bearer token");
  const { payload } = await jwtVerify(authHeader.slice(7), JWKS, {
    issuer: ISSUER,
    audience: FIREBASE_PROJECT_ID,
  });
  if (!payload.sub) throw new Error("Token missing sub");
  return {
    uid: payload.sub as string,
    email: typeof payload.email === "string" ? (payload.email as string) : null,
    name: typeof payload.name === "string" ? (payload.name as string) : null,
  };
}

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY is not configured');

    let token;
    try {
      token = await verifyFirebaseToken(req.headers.get("Authorization"));
    } catch {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (!token.email) {
      return new Response(JSON.stringify({ error: "Token missing email" }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch authoritative plan data from DB — never trust client-supplied plan details.
    const { data: planRow, error: planErr } = await supabase
      .from("user_plans")
      .select("*")
      .eq("firebase_uid", token.uid)
      .maybeSingle();
    if (planErr) throw planErr;
    if (!planRow) {
      return new Response(JSON.stringify({ error: "No active plan" }), {
        status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const recipient = token.email;
    const userName = escapeHtml((token.name || 'there').slice(0, 100));
    const planName = escapeHtml(planRow.name);
    const dailyLimit = PLAN_LIMITS[planRow.name] ?? PLAN_LIMITS.Free;
    const features = PLAN_FEATURES[planRow.name] ?? PLAN_FEATURES.Free;

    const fmt = (iso: string) =>
      new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    const activatedAtStr = escapeHtml(fmt(planRow.activated_at));
    const expiresAtStr = escapeHtml(fmt(planRow.expires_at));

    const featuresHtml = features.map(f => `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
        <td style="width:28px;vertical-align:top;padding:6px 0;">✅</td>
        <td style="font-size:14px;color:#555770;line-height:1.6;padding:6px 0;">${escapeHtml(f)}</td>
      </tr></table>`).join('');

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f4f4f7;font-family:'Segoe UI',Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f7;padding:40px 20px;">
  <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
      <tr><td style="background:linear-gradient(135deg,#26c6b0,#7c3aed);padding:40px 40px 30px;text-align:center;">
        <img src="https://skillta.tech/logo.png" alt="SkillTa" width="56" height="56" style="display:block;margin:0 auto 16px;border-radius:14px;" />
        <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">Subscription Receipt 🎉</h1>
        <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.85);">Your ${planName} Plan is now active</p>
      </td></tr>
      <tr><td style="padding:36px 40px 12px;">
        <p style="margin:0;font-size:18px;color:#1a1a2e;font-weight:600;">Hey ${userName}! 👋</p>
        <p style="margin:12px 0 0;font-size:15px;color:#555770;line-height:1.7;">
          Thanks for activating the <strong style="color:#26c6b0;">${planName} Plan</strong> on SkillTa. Here's a quick receipt of your subscription details.
        </p>
      </td></tr>
      <tr><td style="padding:16px 40px 8px;">
        <div style="background:#f8f9fc;border-radius:12px;padding:22px;">
          <p style="margin:0 0 14px;font-size:15px;font-weight:700;color:#1a1a2e;">📋 Subscription Details</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#1a1a2e;">
            <tr><td style="padding:6px 0;color:#777;">Plan</td><td style="padding:6px 0;text-align:right;font-weight:600;">${planName}</td></tr>
            <tr><td style="padding:6px 0;color:#777;">Price</td><td style="padding:6px 0;text-align:right;font-weight:600;">$0.00 / month</td></tr>
            <tr><td style="padding:6px 0;color:#777;">Started On</td><td style="padding:6px 0;text-align:right;font-weight:600;">${activatedAtStr}</td></tr>
            <tr><td style="padding:6px 0;color:#777;">Expires On</td><td style="padding:6px 0;text-align:right;font-weight:600;">${expiresAtStr}</td></tr>
            <tr><td style="padding:6px 0;color:#777;">Billing Cycle</td><td style="padding:6px 0;text-align:right;font-weight:600;">1 Month</td></tr>
            <tr><td style="padding:6px 0;color:#777;">Status</td><td style="padding:6px 0;text-align:right;font-weight:600;color:#26c6b0;">Active</td></tr>
            <tr><td style="padding:6px 0;color:#777;">Daily Limit</td><td style="padding:6px 0;text-align:right;font-weight:600;">${dailyLimit}</td></tr>
          </table>
        </div>
      </td></tr>
      <tr><td style="padding:20px 40px 8px;">
        <div style="background:#f8f9fc;border-radius:12px;padding:22px;">
          <p style="margin:0 0 14px;font-size:15px;font-weight:700;color:#1a1a2e;">✨ What's included in your ${planName} Plan</p>
          ${featuresHtml}
        </div>
      </td></tr>
      <tr><td style="padding:24px 40px 28px;text-align:center;">
        <a href="https://skillta.tech/dashboard" style="display:inline-block;background:linear-gradient(135deg,#26c6b0,#7c3aed);color:#ffffff;text-decoration:none;font-size:16px;font-weight:600;padding:14px 36px;border-radius:10px;">
          Go to Your Dashboard →
        </a>
        <p style="margin:14px 0 0;font-size:12px;color:#999;">You can upgrade or cancel anytime from your dashboard.</p>
      </td></tr>
      <tr><td style="background:#f8f9fc;padding:24px 40px;text-align:center;border-top:1px solid #e8e9f0;">
        <p style="margin:0;font-size:13px;font-weight:600;color:#7c3aed;">— Team SkillTa 💜</p>
        <p style="margin:12px 0 0;font-size:11px;color:#aaa;">© 2025 SkillTa · <a href="https://skillta.tech" style="color:#26c6b0;text-decoration:none;">skillta.tech</a></p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({
        from: 'SkillTa <hello@skillta.tech>',
        to: [recipient],
        subject: `Your SkillTa ${planRow.name} Plan is Active — Subscription Receipt`,
        html: htmlContent,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(`Resend API error [${res.status}]`);

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error sending plan receipt:', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to send email' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
