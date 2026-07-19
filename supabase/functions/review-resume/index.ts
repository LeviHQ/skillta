// AI Resume Reviewer — free with a per-user/IP daily cap to keep costs bounded.
// Accepts { resume: string, targetRole?: string } and returns structured feedback.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { jwtVerify, createRemoteJWKSet } from "https://esm.sh/jose@5.9.6";

const FIREBASE_PROJECT_ID = "skillta-30f35";
const ISSUER = `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`;
const JWKS = createRemoteJWKSet(
  new URL("https://www.googleapis.com/robot/v1/metadata/jwk/securetoken@system.gserviceaccount.com"),
);

const DAILY_LIMIT_SIGNED_IN = 3;
const DAILY_LIMIT_ANON = 1;
const MAX_RESUME_CHARS = 8000;
const MAX_JD_CHARS = 4000;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const SYSTEM_PROMPT = `You are SkillTa's AI Resume Reviewer — senior tech recruiter + ATS engineer for 2026 hiring.
Return STRICT JSON (no markdown, no code fences) with this exact shape:
{
  "atsScore": 0-100,
  "verdict": short one-line summary,
  "strengths": [4-6 concrete strengths],
  "weaknesses": [4-6 concrete weaknesses with reasons],
  "missingKeywords": [6-12 role-relevant keywords missing that an ATS would look for],
  "sectionFeedback": { "summary": str, "experience": str, "skills": str, "projects": str, "education": str, "formatting": str },
  "rewriteSuggestions": [{ "original": str, "improved": str, "why": str }] (3-5 impactful before/after bullets),
  "actionPlan": [5-7 prioritized next steps],
  "roleFit": { "role": str, "fitScore": 0-100, "reasoning": str }
}
Be brutally honest but constructive. Focus on measurable impact, quantified achievements, ATS-friendly formatting.`;

async function sha256Hex(input: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function todayStart(): string {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  return d.toISOString();
}

async function verifyFirebaseToken(auth: string | null): Promise<string | null> {
  if (!auth?.startsWith("Bearer ")) return null;
  try {
    const { payload } = await jwtVerify(auth.slice(7), JWKS, { issuer: ISSUER, audience: FIREBASE_PROJECT_ID });
    return (payload.sub as string) ?? null;
  } catch {
    return null;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "AI not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => ({}));
    const resume = typeof body?.resume === "string" ? body.resume.trim() : "";
    const targetRole = typeof body?.targetRole === "string" ? body.targetRole.trim().slice(0, 120) : "";
    if (resume.length < 100) {
      return new Response(JSON.stringify({ error: "Resume text is too short. Paste at least a few sections." }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // --- Daily rate limit (per firebase_uid if signed in; else per IP hash) ---
    const uid = await verifyFirebaseToken(req.headers.get("Authorization"));
    let identifier: string;
    let limit: number;
    if (uid) {
      identifier = `uid:${uid}`;
      limit = DAILY_LIMIT_SIGNED_IN;
    } else {
      const ip =
        req.headers.get("cf-connecting-ip") ??
        req.headers.get("x-real-ip") ??
        (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() ??
        "unknown";
      identifier = `ip:${await sha256Hex(ip || "unknown")}`;
      limit = DAILY_LIMIT_ANON;
    }

    const { count, error: countErr } = await supabase
      .from("resume_review_usage")
      .select("id", { count: "exact", head: true })
      .eq("identifier", identifier)
      .gte("created_at", todayStart());
    if (countErr) console.error("usage count error", countErr);
    const used = count ?? 0;
    if (used >= limit) {
      return new Response(
        JSON.stringify({
          error: "limit_reached",
          message: uid
            ? `You've used your ${limit} free resume reviews for today. Please come back tomorrow.`
            : `Free preview limit reached. Sign in with Google to unlock ${DAILY_LIMIT_SIGNED_IN} reviews per day.`,
          used, limit, signedIn: !!uid,
        }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const clipped = resume.slice(0, MAX_RESUME_CHARS);
    const userPrompt = `TARGET ROLE: ${targetRole || "(infer best-fit role from resume)"}\n\nRESUME:\n"""\n${clipped}\n"""\n\nReturn only the JSON object.`;

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-3.1-flash-lite",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      console.error("AI gateway failed", aiRes.status, errText);
      if (aiRes.status === 429) {
        return new Response(JSON.stringify({ error: "AI is busy — please retry in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiRes.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: "AI request failed" }), {
        status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiData = await aiRes.json();
    const content = aiData?.choices?.[0]?.message?.content ?? "{}";
    let review: unknown;
    try {
      review = typeof content === "string" ? JSON.parse(content) : content;
    } catch {
      console.error("JSON parse failed", content?.slice?.(0, 400));
      return new Response(JSON.stringify({ error: "Could not parse AI response. Please try again." }), {
        status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Record usage (best-effort; do not fail the response if this errors)
    supabase.from("resume_review_usage").insert({ identifier }).then(({ error }) => {
      if (error) console.error("usage insert error", error);
    });

    return new Response(JSON.stringify({ review, used: used + 1, limit }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("review-resume error", e);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
