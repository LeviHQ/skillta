import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { jwtVerify, createRemoteJWKSet } from "https://esm.sh/jose@5.9.6";

const FIREBASE_PROJECT_ID = "skillta-30f35";
const ISSUER = `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`;
const JWKS = createRemoteJWKSet(
  new URL("https://www.googleapis.com/robot/v1/metadata/jwk/securetoken@system.gserviceaccount.com"),
);

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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY is not configured');

    // Verify caller and derive recipient from token (never trust request body for recipient).
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

    const body = await req.json().catch(() => ({}));
    const rawName = typeof body.displayName === "string" ? body.displayName : token.name;
    const userName = escapeHtml((rawName || 'there').slice(0, 100));
    const recipient = token.email;

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f4f7;font-family:'Segoe UI',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f7;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:linear-gradient(135deg,#26c6b0,#7c3aed);padding:40px 40px 30px;text-align:center;">
              <img src="https://skillta.tech/logo.png" alt="SkillTa" width="56" height="56" style="display:block;margin:0 auto 16px;border-radius:14px;" />
              <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">
                Welcome to SkillTa! 🚀
              </h1>
              <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.85);font-weight:400;">
                Your AI-Powered Career Guidance Platform
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 40px 24px;">
              <p style="margin:0;font-size:18px;color:#1a1a2e;font-weight:600;">
                Hey ${userName}! 👋
              </p>
              <p style="margin:12px 0 0;font-size:15px;color:#555770;line-height:1.7;">
                Thank you for joining <strong style="color:#26c6b0;">SkillTa</strong> — we're thrilled to have you on board! You've just taken the first step towards discovering your perfect tech career path.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 28px;">
              <div style="background:#f8f9fc;border-radius:12px;padding:24px;">
                <p style="margin:0 0 16px;font-size:16px;font-weight:700;color:#1a1a2e;">
                  🎯 Here's what you can explore:
                </p>
                <p style="margin:0;font-size:14px;color:#555770;line-height:1.7;">
                  ✅ <strong>AI Career Quiz</strong> — Discover your ideal tech career in minutes<br/>
                  ✅ <strong>Salary Predictor</strong> — AI-powered salary insights with 2026 market data<br/>
                  ✅ <strong>Interview Prep</strong> — Practice with role-specific AI interviews<br/>
                  ✅ <strong>60+ Career Roadmaps</strong> — Step-by-step guides, beginner to expert<br/>
                  ✅ <strong>Compare Careers</strong> — Side-by-side salary, demand &amp; difficulty<br/>
                  ✅ <strong>Saathi AI Assistant</strong> — Your always-on career mentor
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 28px;text-align:center;">
              <a href="https://skillta.tech/quiz" style="display:inline-block;background:linear-gradient(135deg,#26c6b0,#7c3aed);color:#ffffff;text-decoration:none;font-size:16px;font-weight:600;padding:14px 36px;border-radius:10px;letter-spacing:0.3px;">
                Take Your Career Quiz Now →
              </a>
            </td>
          </tr>
          <tr>
            <td style="background:#f8f9fc;padding:28px 40px;text-align:center;border-top:1px solid #e8e9f0;">
              <p style="margin:0 0 8px;font-size:15px;font-weight:600;color:#1a1a2e;">
                Best of luck on your journey! 🌟
              </p>
              <p style="margin:0;font-size:13px;font-weight:600;color:#7c3aed;">
                — Team SkillTa 💜
              </p>
              <div style="margin-top:20px;padding-top:16px;border-top:1px solid #e0e0e8;">
                <p style="margin:0;font-size:11px;color:#aaa;">
                  © 2025 SkillTa. All rights reserved.<br/>
                  <a href="https://skillta.tech" style="color:#26c6b0;text-decoration:none;">skillta.tech</a>
                </p>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "SkillTa <hello@skillta.tech>",
        to: [recipient],
        subject: `Welcome aboard! Your SkillTa account is ready`,
        html: htmlContent,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error('Resend API error:', data);
      throw new Error(`Resend API error [${res.status}]`);
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error sending welcome email:', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to send email' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
