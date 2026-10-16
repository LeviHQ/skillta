import { describe, expect, it } from "vitest";
import { shouldShowAds } from "./adEligibility";

const now = Date.parse("2026-10-16T08:11:00Z");
const ready = { authLoading: false, userId: "user-a", resolvedUserId: "user-a", planStatus: "ready" as const, plan: null, now };
describe("advertising eligibility", () => {
  it("shows ads to resolved guests", () => expect(shouldShowAds({ ...ready, userId: null })).toBe(true));
  it("shows ads to signed-in users without a paid plan", () => expect(shouldShowAds(ready)).toBe(true));
  it("keeps active Pro ad-free", () => expect(shouldShowAds({ ...ready, plan: { name: "Pro", expiresAt: "2027-10-16T08:11:00Z" } })).toBe(false));
  it("keeps Lifetime ad-free regardless of expiry", () => expect(shouldShowAds({ ...ready, plan: { name: "Lifetime", expiresAt: "2020-01-01" } })).toBe(false));
  it("shows ads after Pro expires", () => expect(shouldShowAds({ ...ready, plan: { name: "Pro", expiresAt: "2026-10-16T08:11:00Z" } })).toBe(true));
  it("shows ads for legacy free plans", () => expect(shouldShowAds({ ...ready, plan: { name: "Free", expiresAt: "2027-01-01" } })).toBe(true));
  it("does not load ads before authentication resolves", () => expect(shouldShowAds({ ...ready, authLoading: true, userId: null })).toBe(false));
  it("does not load ads during plan loading", () => expect(shouldShowAds({ ...ready, planStatus: "loading" })).toBe(false));
  it("does not treat a failed entitlement read as unpaid", () => expect(shouldShowAds({ ...ready, planStatus: "error" })).toBe(false));
  it("does not reuse another account's entitlement", () => expect(shouldShowAds({ ...ready, resolvedUserId: "user-b" })).toBe(false));
  it("keeps malformed Pro entitlement ad-free", () => expect(shouldShowAds({ ...ready, plan: { name: "Pro", expiresAt: "invalid" } })).toBe(false));
});