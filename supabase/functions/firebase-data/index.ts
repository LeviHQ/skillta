// Verifies Firebase ID token, then performs profile/quiz/plan ops via service_role.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { jwtVerify, createRemoteJWKSet } from "https://esm.sh/jose@5.9.6";

const FIREBASE_PROJECT_ID = "skillta-30f35";
const ISSUER = `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`;
const JWKS = createRemoteJWKSet(
  new URL("https://www.googleapis.com/robot/v1/metadata/jwk/securetoken@system.gserviceaccount.com"),
);

const PLAN_LIMITS: Record<string, number> = { Free: 3, Pro: 999, Premium: 9999 };
const ALLOWED_PLANS = new Set(["Free", "Pro", "Premium"]);

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

interface VerifiedToken {
  uid: string;
  email: string | null;
  name: string | null;
}

async function verifyFirebaseToken(authHeader: string | null): Promise<VerifiedToken> {
  if (!authHeader?.startsWith("Bearer ")) throw new Error("Missing bearer token");
  const token = authHeader.slice(7);
  const { payload } = await jwtVerify(token, JWKS, {
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

function todayCountWindow() {
  const start = new Date();
  start.setUTCHours(0, 0, 0, 0);
  return start.toISOString();
}

async function getUsageToday(uid: string): Promise<number> {
  const { count, error } = await supabase
    .from("quiz_results")
    .select("id", { count: "exact", head: true })
    .eq("firebase_uid", uid)
    .gte("created_at", todayCountWindow());
  if (error) throw error;
  return count ?? 0;
}

async function getPlanRow(uid: string) {
  const { data, error } = await supabase
    .from("user_plans")
    .select("*")
    .eq("firebase_uid", uid)
    .maybeSingle();
  if (error) throw error;
  return data;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  let token: VerifiedToken;
  try {
    token = await verifyFirebaseToken(req.headers.get("Authorization"));
  } catch {
    return json({ error: "Unauthorized" }, 401);
  }
  const uid = token.uid;

  let body: any;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const action = body?.action as string;

  try {
    if (action === "ensureProfile") {
      const { data: existing } = await supabase
        .from("profiles")
        .select("id")
        .eq("firebase_uid", uid)
        .maybeSingle();
      if (!existing) {
        // Use token-derived identity for email; only allow safe metadata from body.
        const displayName = typeof body.displayName === "string" ? body.displayName.slice(0, 200) : token.name;
        const photoUrl = typeof body.photoUrl === "string" && /^https?:\/\//i.test(body.photoUrl)
          ? body.photoUrl.slice(0, 1000)
          : null;
        const { error } = await supabase.from("profiles").insert({
          firebase_uid: uid,
          display_name: displayName,
          email: token.email,
          photo_url: photoUrl,
        });
        if (error) throw error;
      }
      return json({ ok: true });
    }

    if (action === "saveQuizResult") {
      const { answers, topCareer, topMatchPercentage, allResults } = body;
      if (
        typeof answers !== "object" || answers === null ||
        typeof topCareer !== "string" || topCareer.length > 200 ||
        typeof topMatchPercentage !== "number" ||
        !Array.isArray(allResults) || allResults.length > 200
      ) {
        return json({ error: "Invalid payload" }, 400);
      }

      // Server-side plan + usage enforcement.
      const planRow = await getPlanRow(uid);
      if (!planRow) {
        return json({ error: "no_plan", message: "Subscribe to a plan to save quiz results." }, 403);
      }
      if (new Date(planRow.expires_at).getTime() < Date.now()) {
        return json({ error: "plan_expired", message: "Your plan has expired." }, 403);
      }
      const limit = PLAN_LIMITS[planRow.name] ?? PLAN_LIMITS.Free;
      const used = await getUsageToday(uid);
      if (used >= limit) {
        return json({ error: "limit_reached", message: "Daily quiz limit reached.", used, limit }, 429);
      }

      const { error } = await supabase.from("quiz_results").insert({
        firebase_uid: uid,
        answers,
        top_career: topCareer,
        top_match_percentage: topMatchPercentage,
        all_results: allResults,
      });
      if (error) throw error;
      return json({ ok: true, used: used + 1, limit });
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

    if (action === "getPlan") {
      const planRow = await getPlanRow(uid);
      const usage = planRow ? await getUsageToday(uid) : 0;
      return json({
        plan: planRow
          ? {
              name: planRow.name,
              activatedAt: planRow.activated_at,
              expiresAt: planRow.expires_at,
            }
          : null,
        usage,
        dailyLimit: planRow ? PLAN_LIMITS[planRow.name] ?? PLAN_LIMITS.Free : PLAN_LIMITS.Free,
      });
    }

    if (action === "activatePlan") {
      // Only Free plan can be self-activated. Paid plans must come from a payment webhook.
      const requested = typeof body.planName === "string" ? body.planName : "Free";
      if (requested !== "Free") {
        return json({ error: "Only the Free plan can be activated from the client." }, 403);
      }
      if (!ALLOWED_PLANS.has(requested)) {
        return json({ error: "Invalid plan" }, 400);
      }
      const now = new Date();
      const expires = new Date(now);
      expires.setMonth(expires.getMonth() + 1);

      const { data, error } = await supabase
        .from("user_plans")
        .upsert(
          {
            firebase_uid: uid,
            name: requested,
            activated_at: now.toISOString(),
            expires_at: expires.toISOString(),
          },
          { onConflict: "firebase_uid" },
        )
        .select()
        .single();
      if (error) throw error;
      return json({
        plan: {
          name: data.name,
          activatedAt: data.activated_at,
          expiresAt: data.expires_at,
        },
        dailyLimit: PLAN_LIMITS[data.name] ?? PLAN_LIMITS.Free,
      });
    }

    if (action === "cancelPlan") {
      const { error } = await supabase.from("user_plans").delete().eq("firebase_uid", uid);
      if (error) throw error;
      return json({ ok: true });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (e) {
    console.error("firebase-data error:", e);
    return json({ error: "Internal error" }, 500);
  }
});
