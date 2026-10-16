import { act, cleanup, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PlanProvider } from "@/contexts/PlanContext";
import AdsterraNativeBanner from "./AdsterraNativeBanner";
import AdsterraResponsiveBanner from "./AdsterraResponsiveBanner";

const mocks = vi.hoisted(() => ({
  auth: { user: null as null | { uid: string; getIdToken: () => Promise<string> }, loading: false },
  invoke: vi.fn(),
}));
vi.mock("@/contexts/AuthContext", () => ({ useAuth: () => mocks.auth }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: { functions: { invoke: mocks.invoke } } }));
vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => false }));

const tree = () => <PlanProvider><AdsterraNativeBanner /><AdsterraResponsiveBanner /></PlanProvider>;
const ads = () => document.querySelectorAll('[aria-label="Advertisement"]');
beforeEach(() => { mocks.auth = { user: null, loading: false }; mocks.invoke.mockReset(); });
afterEach(cleanup);

describe("ad placements with plan resolution", () => {
  it("mounts existing native and responsive placements for guests", async () => {
    render(tree());
    await waitFor(() => expect(ads()).toHaveLength(2));
    expect(document.querySelector('script[src*="effectivecpmnetwork"]')).not.toBeNull();
    expect(document.querySelector('iframe[title="Sponsored banner"]')?.getAttribute("srcdoc")).toContain("a42c2ea43dd437aedb9ba40f5951e8db");
  });

  for (const name of ["Pro", "Lifetime"]) {
    it(`never mounts ads while ${name} entitlement loads or after it resolves`, async () => {
      mocks.auth.user = { uid: "paid-user", getIdToken: async () => "test-token" };
      let resolve: ((value: unknown) => void) | undefined;
      mocks.invoke.mockImplementation(() => new Promise((r) => { resolve = r; }));
      render(tree());
      await waitFor(() => expect(mocks.invoke).toHaveBeenCalled());
      expect(ads()).toHaveLength(0);
      await act(async () => resolve?.({ data: { plan: { name, expiresAt: "2099-01-01", activatedAt: "2026-01-01" } }, error: null }));
      expect(ads()).toHaveLength(0);
      expect(document.querySelector('script[src*="effectivecpmnetwork"]')).toBeNull();
    });
  }

  it("cleans guest placements immediately when an account signs in", async () => {
    const view = render(tree());
    await waitFor(() => expect(ads()).toHaveLength(2));
    mocks.auth.user = { uid: "paid-user", getIdToken: async () => "test-token" };
    mocks.invoke.mockResolvedValue({ data: { plan: { name: "Lifetime", expiresAt: "2099-01-01" } }, error: null });
    view.rerender(tree());
    expect(ads()).toHaveLength(0);
    await waitFor(() => expect(mocks.invoke).toHaveBeenCalled());
    expect(ads()).toHaveLength(0);
  });

  it("mounts placements only after a signed-in unpaid entitlement resolves", async () => {
    mocks.auth.user = { uid: "unpaid-user", getIdToken: async () => "test-token" };
    mocks.invoke.mockResolvedValue({ data: { plan: null }, error: null });
    render(tree());
    expect(ads()).toHaveLength(0);
    await waitFor(() => expect(ads()).toHaveLength(2));
  });
});