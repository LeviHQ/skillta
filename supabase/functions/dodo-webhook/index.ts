// Receives Dodo Payments webhooks (Standard Webhooks signature) and activates plans.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
const LIFETIME_EXPIRY = "9999-12-31T23:59:59.000Z";
const PRODUCT_TO_PLAN: Record<string, "Pro" | "Lifetime"> = {
  pdt_0NoK0Q3K4Bm69EjSjx8O5: "Pro",
  pdt_0NoK0gZk1HuEgKL9F3PkG: "Lifetime",
};

async function verify(id: string, ts: string, sigHeader: string, body: string) {
  const secret = Deno.env.get("DODO_WEBHOOK_SECRET") ?? "";
  const raw = secret.startsWith("whsec_") ? secret.slice(6) : secret;
  const keyBytes = Uint8Array.from(atob(raw), (c) => c.charCodeAt(0));
  const key = await crypto.subtle.importKey("raw", keyBytes, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${id}.${ts}.${body}`));
  const expected = btoa(String.fromCharCode(...new Uint8Array(mac)));
  if (Math.abs(Date.now() / 1000 - Number(ts)) > 600) return false;
  return sigHeader.split(" ").some((p) => p.split(",")[1] === expected);
}

async function sendReceipt(email: string, name: string, plan: string, expiresAt: string, amount: string) {
  const key = Deno.env.get("RESEND_API_KEY");
  if (!key) return;
  const validity = plan === "Lifetime"
    ? "Lifetime access — never expires"
    : `Valid until ${new Date(expiresAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`;
  const html = `<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;background:#111418;color:#e6e8eb;padding:32px;border-radius:16px">
  <h2 style="color:#2dd4bf;margin-top:0">Payment confirmed</h2>
  <p>Hi ${name},</p>
  <p>Thank you for purchasing <b>SkillTa ${plan}</b>. Your access is now active.</p>
  <table style="width:100%;border-collapse:collapse;margin:16px 0">
    <tr><td style="padding:6px 0;color:#9aa3ad">Plan</td><td style="text-align:right">SkillTa ${plan}</td></tr>
    <tr><td style="padding:6px 0;color:#9aa3ad">Amount paid</td><td style="text-align:right">${amount}</td></tr>
    <tr><td style="padding:6px 0;color:#9aa3ad">Access</td><td style="text-align:right">${validity}</td></tr>
  </table>
  <p>Included: AI Career Quiz, AI Resume Reviewer, Skill Gap Analyzer, Salary Predictor, Country Tech Ecosystems and all career roadmaps.</p>
  <p><a href="https://www.skillta.tech/dashboard" style="display:inline-block;background:#2dd4bf;color:#0b0d10;padding:12px 22px;border-radius:10px;text-decoration:none;font-weight:bold">Open your dashboard</a></p>
  <p style="color:#9aa3ad;font-size:12px">SkillTa · skillta.tech</p></div>`;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "SkillTa <noreply@skillta.tech>",
      to: [email],
      subject: `Your SkillTa ${plan} access is active`,
      html,
    }),
  }).catch((e) => console.error("receipt email failed", e));
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("ok");
  const body = await req.text();
  const id = req.headers.get("webhook-id") ?? "";
  const ts = req.headers.get("webhook-timestamp") ?? "";
  const sig = req.headers.get("webhook-signature") ?? "";
  if (!id || !ts || !sig || !(await verify(id, ts, sig, body))) {
    return new Response("Invalid signature", { status: 401 });
  }

  const event = JSON.parse(body);
  if (event.type !== "payment.succeeded") return new Response("ignored");
  const d = event.data ?? {};
  const uid = d.metadata?.firebase_uid;
  let plan = d.metadata?.plan as string | undefined;
  if (!plan) plan = PRODUCT_TO_PLAN[d.product_cart?.[0]?.product_id];
  if (!uid || (plan !== "Pro" && plan !== "Lifetime")) {
    console.error("Webhook missing uid/plan", d.payment_id);
    return new Response("missing metadata");
  }

  const { data: existing } = await supabase.from("user_plans").select("*").eq("firebase_uid", uid).maybeSingle();
  const now = new Date();
  let expiresAt: string;
  let finalPlan = plan;
  if (plan === "Lifetime" || existing?.name === "Lifetime") {
    finalPlan = "Lifetime";
    expiresAt = LIFETIME_EXPIRY;
  } else {
    const base = existing && new Date(existing.expires_at) > now ? new Date(existing.expires_at) : now;
    base.setUTCDate(base.getUTCDate() + 365);
    expiresAt = base.toISOString();
  }

  const { error } = await supabase.from("user_plans").upsert(
    { firebase_uid: uid, name: finalPlan, activated_at: now.toISOString(), expires_at: expiresAt },
    { onConflict: "firebase_uid" },
  );
  if (error) {
    console.error("plan upsert failed", error);
    return new Response("db error", { status: 500 });
  }

  const { data: profile } = await supabase.from("profiles").select("email,display_name").eq("firebase_uid", uid).maybeSingle();
  const email = profile?.email ?? d.customer?.email;
  if (email) {
    const amount = typeof d.total_amount === "number" ? `${(d.total_amount / 100).toFixed(2)} ${d.currency ?? "USD"}` : plan === "Pro" ? "$3.00" : "$10.00";
    await sendReceipt(email, profile?.display_name ?? d.customer?.name ?? "there", finalPlan, expiresAt, amount);
  }
  return new Response("ok");
});
