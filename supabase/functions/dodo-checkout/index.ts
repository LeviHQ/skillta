// Creates a Dodo Payments checkout session for a signed-in (Firebase) user.
import { jwtVerify, createRemoteJWKSet } from "https://esm.sh/jose@5.9.6";

const FIREBASE_PROJECT_ID = "skillta-30f35";
const JWKS = createRemoteJWKSet(
  new URL("https://www.googleapis.com/robot/v1/metadata/jwk/securetoken@system.gserviceaccount.com"),
);
const PRODUCTS: Record<string, string> = {
  Pro: "pdt_0NoK0Q3K4Bm69EjSjx8O5",
  Lifetime: "pdt_0NoK0gZk1HuEgKL9F3PkG",
};
const DODO_BASE = (Deno.env.get("DODO_MODE") ?? "test") === "live"
  ? "https://live.dodopayments.com"
  : "https://test.dodopayments.com";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (b: unknown, s = 200) =>
  new Response(JSON.stringify(b), { status: s, headers: { ...cors, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  let uid: string, email: string | null, name: string | null;
  try {
    const auth = req.headers.get("Authorization") ?? "";
    if (!auth.startsWith("Bearer ")) throw new Error();
    const { payload } = await jwtVerify(auth.slice(7), JWKS, {
      issuer: `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`,
      audience: FIREBASE_PROJECT_ID,
    });
    uid = payload.sub as string;
    email = typeof payload.email === "string" ? payload.email : null;
    name = typeof payload.name === "string" ? payload.name : null;
  } catch {
    return json({ error: "Unauthorized" }, 401);
  }

  let body: any;
  try { body = await req.json(); } catch { return json({ error: "Invalid JSON" }, 400); }
  const plan = body?.plan;
  if (plan !== "Pro" && plan !== "Lifetime") return json({ error: "Invalid plan" }, 400);
  let returnUrl = "https://www.skillta.tech/?payment=success#pricing";
  if (typeof body.returnOrigin === "string" && /^https?:\/\/[^/]+$/.test(body.returnOrigin)) {
    returnUrl = `${body.returnOrigin}/?payment=success#pricing`;
  }

  const res = await fetch(`${DODO_BASE}/checkouts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Deno.env.get("DODO_PAYMENTS_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product_cart: [{ product_id: PRODUCTS[plan], quantity: 1 }],
      customer: email ? { email, name: name ?? email.split("@")[0] } : undefined,
      return_url: returnUrl,
      metadata: { firebase_uid: uid, plan },
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.checkout_url) {
    console.error("Dodo checkout error", res.status, data);
    return json({ error: "Could not start checkout" }, 502);
  }
  return json({ url: data.checkout_url });
});
