export interface AdPlan {
  name: string;
  expiresAt: string;
}

export function shouldShowAds({ authLoading, userId, resolvedUserId, planStatus, plan, now = Date.now() }: {
  authLoading: boolean;
  userId: string | null;
  resolvedUserId: string | null;
  planStatus: "loading" | "ready" | "error";
  plan: AdPlan | null;
  now?: number;
}): boolean {
  if (authLoading) return false;
  if (!userId) return true;
  if (resolvedUserId !== userId || planStatus !== "ready") return false;
  if (!plan) return true;
  if (plan.name === "Lifetime") return false;
  if (plan.name !== "Pro") return true;
  const expiry = Date.parse(plan.expiresAt);
  // Invalid paid entitlement data is not permission to show ads.
  return Number.isFinite(expiry) && expiry <= now;
}