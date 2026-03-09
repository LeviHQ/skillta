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
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    const { email, displayName } = await req.json();
    if (!email) {
      throw new Error('Email is required');
    }

    const userName = displayName || 'there';

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
          
          <!-- Header with gradient -->
          <tr>
            <td style="background:linear-gradient(135deg,#26c6b0,#7c3aed);padding:40px 40px 30px;text-align:center;">
              <div style="width:64px;height:64px;background:rgba(255,255,255,0.2);border-radius:16px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
                <span style="font-size:32px;font-weight:800;color:#ffffff;line-height:64px;">S</span>
              </div>
              <h1 style="margin:0;font-size:28px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">
                Welcome to SkillTa! 🚀
              </h1>
              <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.85);font-weight:400;">
                Your AI-Powered Career Guidance Platform
              </p>
            </td>
          </tr>

          <!-- Welcome Message -->
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

          <!-- Benefits Section -->
          <tr>
            <td style="padding:0 40px 28px;">
              <div style="background:#f8f9fc;border-radius:12px;padding:24px;">
                <p style="margin:0 0 16px;font-size:16px;font-weight:700;color:#1a1a2e;">
                  🎯 Here's what you get with SkillTa:
                </p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:8px 0;">
                      <table role="presentation" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="width:28px;vertical-align:top;padding-top:2px;">✅</td>
                          <td style="font-size:14px;color:#555770;line-height:1.6;">
                            <strong style="color:#1a1a2e;">AI Career Quiz</strong> — Discover your ideal tech career in minutes
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;">
                      <table role="presentation" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="width:28px;vertical-align:top;padding-top:2px;">✅</td>
                          <td style="font-size:14px;color:#555770;line-height:1.6;">
                            <strong style="color:#1a1a2e;">18+ Career Roadmaps</strong> — Step-by-step guides from beginner to expert
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;">
                      <table role="presentation" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="width:28px;vertical-align:top;padding-top:2px;">✅</td>
                          <td style="font-size:14px;color:#555770;line-height:1.6;">
                            <strong style="color:#1a1a2e;">Personalized Recommendations</strong> — Tailored skill paths just for you
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;">
                      <table role="presentation" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="width:28px;vertical-align:top;padding-top:2px;">✅</td>
                          <td style="font-size:14px;color:#555770;line-height:1.6;">
                            <strong style="color:#1a1a2e;">Progress Tracking</strong> — Save results and track your career journey
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;">
                      <table role="presentation" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="width:28px;vertical-align:top;padding-top:2px;">✅</td>
                          <td style="font-size:14px;color:#555770;line-height:1.6;">
                            <strong style="color:#1a1a2e;">Learning Resources</strong> — Curated tutorials, courses & tools
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding:0 40px 28px;text-align:center;">
              <a href="https://skillta.vercel.app/quiz" style="display:inline-block;background:linear-gradient(135deg,#26c6b0,#7c3aed);color:#ffffff;text-decoration:none;font-size:16px;font-weight:600;padding:14px 36px;border-radius:10px;letter-spacing:0.3px;">
                Take Your Career Quiz Now →
              </a>
            </td>
          </tr>

          <!-- Pricing Plans -->
          <tr>
            <td style="padding:0 40px 28px;">
              <p style="margin:0 0 16px;font-size:16px;font-weight:700;color:#1a1a2e;text-align:center;">
                💎 Our Plans
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <!-- Free -->
                  <td width="33%" style="padding:0 4px;vertical-align:top;">
                    <div style="background:#f8f9fc;border-radius:10px;padding:16px;text-align:center;border:1px solid #e8e9f0;">
                      <p style="margin:0;font-size:12px;font-weight:600;color:#555770;text-transform:uppercase;letter-spacing:1px;">Free</p>
                      <p style="margin:6px 0 8px;font-size:22px;font-weight:800;color:#1a1a2e;">$0<span style="font-size:12px;font-weight:400;color:#888;">/mo</span></p>
                      <p style="margin:0;font-size:11px;color:#777;line-height:1.5;">Basic guidance<br/>Limited AI responses<br/>Few career paths</p>
                    </div>
                  </td>
                  <!-- Pro -->
                  <td width="33%" style="padding:0 4px;vertical-align:top;">
                    <div style="background:linear-gradient(135deg,#26c6b0,#7c3aed);border-radius:10px;padding:16px;text-align:center;">
                      <p style="margin:0;font-size:10px;font-weight:700;color:#ffffff;background:rgba(255,255,255,0.2);display:inline-block;padding:2px 8px;border-radius:20px;">⭐ POPULAR</p>
                      <p style="margin:6px 0 8px;font-size:22px;font-weight:800;color:#ffffff;">$3<span style="font-size:12px;font-weight:400;color:rgba(255,255,255,0.8);">/mo</span></p>
                      <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.85);line-height:1.5;">Unlimited questions<br/>Full roadmaps<br/>Skill recommendations</p>
                    </div>
                  </td>
                  <!-- Premium -->
                  <td width="33%" style="padding:0 4px;vertical-align:top;">
                    <div style="background:#f8f9fc;border-radius:10px;padding:16px;text-align:center;border:1px solid #e8e9f0;">
                      <p style="margin:0;font-size:12px;font-weight:600;color:#555770;text-transform:uppercase;letter-spacing:1px;">Premium</p>
                      <p style="margin:6px 0 8px;font-size:22px;font-weight:800;color:#1a1a2e;">$7<span style="font-size:12px;font-weight:400;color:#888;">/mo</span></p>
                      <p style="margin:0;font-size:11px;color:#777;line-height:1.5;">Everything in Pro<br/>Resume tips<br/>Interview prep</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8f9fc;padding:28px 40px;text-align:center;border-top:1px solid #e8e9f0;">
              <p style="margin:0 0 8px;font-size:15px;font-weight:600;color:#1a1a2e;">
                Best of luck on your journey with SkillTa! 🌟
              </p>
              <p style="margin:0 0 16px;font-size:13px;color:#777;line-height:1.6;">
                We're here to help you navigate the tech world<br/>and find the career you love.
              </p>
              <p style="margin:0;font-size:13px;font-weight:600;color:#7c3aed;">
                — Team SkillTa 💜
              </p>
              <div style="margin-top:20px;padding-top:16px;border-top:1px solid #e0e0e8;">
                <p style="margin:0;font-size:11px;color:#aaa;">
                  © 2025 SkillTa. All rights reserved.<br/>
                  <a href="https://skillta.vercel.app" style="color:#26c6b0;text-decoration:none;">skillta.vercel.app</a>
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
        from: 'SkillTa <onboarding@resend.dev>',
        to: [email],
        subject: `Welcome to SkillTa, ${userName}! 🚀 Your Tech Career Journey Starts Now`,
        html: htmlContent,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Resend API error:', data);
      throw new Error(`Resend API error [${res.status}]: ${JSON.stringify(data)}`);
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error sending welcome email:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
