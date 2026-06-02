import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY is not configured');

    const { email, displayName, planName, activatedAt, expiresAt, dailyLimit } = await req.json();
    if (!email) throw new Error('Email is required');

    const userName = displayName || 'there';
    const fmt = (iso: string) =>
      new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

    const features = [
      `${dailyLimit ?? 3} AI career quiz attempts per day`,
      'Access to a curated set of career paths',
      'Basic career roadmap view',
      'Saathi AI career assistant (basic)',
      'Save quiz results to your dashboard',
    ];

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
            <tr><td style="padding:6px 0;color:#777;">Started On</td><td style="padding:6px 0;text-align:right;font-weight:600;">${fmt(activatedAt)}</td></tr>
            <tr><td style="padding:6px 0;color:#777;">Expires On</td><td style="padding:6px 0;text-align:right;font-weight:600;">${fmt(expiresAt)}</td></tr>
            <tr><td style="padding:6px 0;color:#777;">Billing Cycle</td><td style="padding:6px 0;text-align:right;font-weight:600;">1 Month</td></tr>
            <tr><td style="padding:6px 0;color:#777;">Status</td><td style="padding:6px 0;text-align:right;font-weight:600;color:#26c6b0;">Active</td></tr>
          </table>
        </div>
      </td></tr>

      <tr><td style="padding:20px 40px 8px;">
        <div style="background:#f8f9fc;border-radius:12px;padding:22px;">
          <p style="margin:0 0 14px;font-size:15px;font-weight:700;color:#1a1a2e;">✨ What's included in your ${planName} Plan</p>
          ${features.map(f => `
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
              <td style="width:28px;vertical-align:top;padding:6px 0;">✅</td>
              <td style="font-size:14px;color:#555770;line-height:1.6;padding:6px 0;">${f}</td>
            </tr></table>`).join('')}
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
        to: [email],
        subject: `Your SkillTa ${planName} Plan is Active — Subscription Receipt`,
        html: htmlContent,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(`Resend API error [${res.status}]: ${JSON.stringify(data)}`);

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error sending plan receipt:', error);
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
