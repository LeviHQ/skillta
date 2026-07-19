// AI Resume Reviewer — free, no plan required.
// Accepts { resume: string, targetRole?: string } and returns structured feedback.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SYSTEM_PROMPT = `You are SkillTa's expert AI Resume Reviewer — a mix of a senior tech recruiter, ATS engineer, and career coach for 2026 tech hiring.
You will receive a candidate's resume text and (optionally) a target role.
Analyze it deeply and return STRICT JSON only (no markdown, no code fences) with this exact shape:

{
  "atsScore": number (0-100),
  "verdict": string (one short line summarizing overall quality),
  "strengths": string[] (4-6 specific strengths, each concrete),
  "weaknesses": string[] (4-6 specific weaknesses with reasons),
  "missingKeywords": string[] (6-12 role-relevant keywords/skills missing that ATS would look for),
  "sectionFeedback": {
    "summary": string,
    "experience": string,
    "skills": string,
    "projects": string,
    "education": string,
    "formatting": string
  },
  "rewriteSuggestions": [
    { "original": string, "improved": string, "why": string }
  ] (3-5 impactful before/after bullet rewrites),
  "actionPlan": string[] (5-7 concrete next steps prioritized),
  "roleFit": {
    "role": string,
    "fitScore": number (0-100),
    "reasoning": string
  }
}

Be brutally honest but constructive. Focus on measurable impact, quantified achievements, ATS-friendly formatting, and 2026 tech market expectations.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "AI not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const resume = typeof body?.resume === "string" ? body.resume.trim() : "";
    const targetRole = typeof body?.targetRole === "string" ? body.targetRole.trim().slice(0, 120) : "";

    if (resume.length < 100) {
      return new Response(JSON.stringify({ error: "Resume text is too short. Paste at least a few sections." }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    // Cap size to protect the model.
    const clipped = resume.slice(0, 15000);

    const userPrompt = `TARGET ROLE: ${targetRole || "(candidate did not specify — infer the best-fit role from the resume)"}\n\nRESUME:\n"""\n${clipped}\n"""\n\nReturn only the JSON object described in the system prompt.`;

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (aiRes.status === 429) {
      return new Response(JSON.stringify({ error: "Too many requests. Please try again in a minute." }), {
        status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (aiRes.status === 402) {
      return new Response(JSON.stringify({ error: "AI credits exhausted. Please contact support." }), {
        status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!aiRes.ok) {
      const txt = await aiRes.text();
      console.error("AI gateway error:", aiRes.status, txt);
      return new Response(JSON.stringify({ error: "AI request failed" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await aiRes.json();
    const content: string = data?.choices?.[0]?.message?.content ?? "";
    let parsed: unknown;
    try {
      parsed = JSON.parse(content);
    } catch {
      // Try to extract JSON block if the model wrapped it.
      const m = content.match(/\{[\s\S]*\}$/);
      if (m) {
        try { parsed = JSON.parse(m[0]); } catch { /* noop */ }
      }
    }
    if (!parsed || typeof parsed !== "object") {
      return new Response(JSON.stringify({ error: "AI returned an unexpected response. Please try again." }), {
        status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true, review: parsed }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("review-resume error:", e);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
