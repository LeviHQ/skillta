// Verifies Firebase ID token, then performs profile/quiz_results ops via service_role.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { jwtVerify, createRemoteJWKSet } from "https://esm.sh/jose@5.9.6";

const FIREBASE_PROJECT_ID = "skillta-30f35";
const ISSUER = `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`;
const JWKS = createRemoteJWKSet(
  new URL("https://www.googleapis.com/robot/v1/metadata/jwk/securetoken@system.gserviceaccount.com"),
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function verifyFirebaseToken(authHeader: string | null): Promise<string> {
  if (!authHeader?.startsWith("Bearer ")) throw new Error("Missing bearer token");
  const token = authHeader.slice(7);
  const { payload } = await jwtVerify(token, JWKS, {
    issuer: ISSUER,
    audience: FIREBASE_PROJECT_ID,
  });
  if (!payload.sub) throw new Error("Token missing sub");
  return payload.sub as string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  let uid: string;
  try {
    uid = await verifyFirebaseToken(req.headers.get("Authorization"));
  } catch (e) {
    return json({ error: "Unauthorized" }, 401);
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const action = body?.action as string;

  try {
    if (action === "ensureProfile") {
      const { displayName, email, photoUrl } = body;
      const { data: existing } = await supabase
        .from("profiles")
        .select("id")
        .eq("firebase_uid", uid)
        .maybeSingle();
      if (!existing) {
        const { error } = await supabase.from("profiles").insert({
          firebase_uid: uid,
          display_name: typeof displayName === "string" ? displayName : null,
          email: typeof email === "string" ? email : null,
          photo_url: typeof photoUrl === "string" ? photoUrl : null,
        });
        if (error) throw error;
      }
      return json({ ok: true });
    }

    if (action === "saveQuizResult") {
      const { answers, topCareer, topMatchPercentage, allResults } = body;
      if (
        typeof answers !== "object" || answers === null ||
        typeof topCareer !== "string" ||
        typeof topMatchPercentage !== "number" ||
        !Array.isArray(allResults)
      ) {
        return json({ error: "Invalid payload" }, 400);
      }
      const { error } = await supabase.from("quiz_results").insert({
        firebase_uid: uid,
        answers,
        top_career: topCareer,
        top_match_percentage: topMatchPercentage,
        all_results: allResults,
      });
      if (error) throw error;
      return json({ ok: true });
    }

    if (action === "getQuizHistory") {
      const { data, error } = await supabase
        .from("quiz_results")
        .select("*")
        .eq("firebase_uid", uid)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return json({ results: data ?? [] });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (e) {
    console.error("firebase-data error:", e);
    return json({ error: "Internal error" }, 500);
  }
});
