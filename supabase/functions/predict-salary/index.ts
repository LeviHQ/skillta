// Salary Predictor edge function using Lovable AI Gateway
// Returns realistic salary estimate + growth advice grounded in real market patterns.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface Payload {
  role: string;
  city: string;
  country: string;
  experience: number; // years
  skills: string; // comma separated
  education: string;
  companyType: string; // startup / mnc / product / service / freelance
  companySize: string;
  employmentType: string; // fulltime / contract / freelance
  workMode: string; // remote / hybrid / onsite
  currentSalary?: string; // optional context
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = (await req.json()) as Payload;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("Missing LOVABLE_API_KEY");

    const systemPrompt = `You are a professional compensation analyst with access to 2025-2026 tech job market data across India, US, UK, EU, UAE, Canada, Australia and remote-global markets. You produce realistic, source-grounded salary estimates.

Ground rules:
- Base numbers on real Levels.fyi, Glassdoor, LinkedIn Salary, PayScale, AmbitionBox and Indeed patterns as of 2025-2026.
- Adjust for city cost-of-living (tier-1 vs tier-2 in India; SF/NYC vs Austin in US; London vs Manchester in UK; etc).
- Adjust for company type (FAANG/Product > MNC > Service > Startup > Freelance median), size, remote premium/discount.
- Weight experience non-linearly (junior 0-2y, mid 3-5y, senior 6-9y, staff 10y+).
- Weight skill scarcity (AI/ML, Rust, Systems, Security, Cloud pay premium; generic web dev pays less).
- Never invent — if inputs are insufficient say so in "confidence".
- Always return the LOCAL CURRENCY of the country.

Return STRICT JSON with this shape:
{
  "currency": "INR" | "USD" | ...,
  "currencySymbol": "₹" | "$" | ...,
  "min": number,
  "median": number,
  "max": number,
  "unit": "per year",
  "confidence": "high" | "medium" | "low",
  "confidenceReason": string,
  "marketPosition": string,          // e.g. "Slightly above market median for Bengaluru mid-level"
  "breakdown": [ { "factor": string, "impact": "+" | "-" | "=", "note": string } ],
  "growthAdvice": [ string ],        // 5 concrete actions to raise salary in next 12 months
  "skillsToLearn": [ string ],       // 5 high-ROI skills for this role & location
  "nextRole": string,                // realistic next promotion target
  "expectedRaisePct": number,        // realistic hike % if user switches jobs now
  "sources": [ string ]              // named references, e.g. "Levels.fyi 2025", "AmbitionBox"
}
No prose outside JSON.`;

    const userPrompt = `Predict salary for this candidate:
Role: ${body.role}
City: ${body.city}
Country: ${body.country}
Total experience (years): ${body.experience}
Key skills: ${body.skills}
Highest education: ${body.education}
Company type: ${body.companyType}
Company size: ${body.companySize}
Employment type: ${body.employmentType}
Work mode: ${body.workMode}
Current salary (if given): ${body.currentSalary || "not disclosed"}`;

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      if (aiRes.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit hit, try again in a minute." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiRes.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please top up." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error ${aiRes.status}: ${errText}`);
    }

    const data = await aiRes.json();
    const content = data.choices?.[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(content);

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("predict-salary error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
