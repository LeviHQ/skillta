import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "@/integrations/supabase/client";

export type PlanName = "Free" | "Pro" | "Premium";

export interface UserPlan {
  name: PlanName;
  activatedAt: string; // ISO
  expiresAt: string;   // ISO
}

interface PlanContextType {
  plan: UserPlan | null;
  activateFreePlan: () => UserPlan;
  cancelPlan: () => void;
  todayUsage: number;
  dailyLimit: number;
  incrementUsage: () => void;
  isExpired: boolean;
}

const PlanContext = createContext<PlanContextType | null>(null);

const planKey = (uid: string) => `skillta_plan_${uid}`;
const usageKey = (uid: string) => {
  const today = new Date().toISOString().slice(0, 10);
  return `skillta_usage_${uid}_${today}`;
};

const PLAN_LIMITS: Record<PlanName, number> = {
  Free: 3,
  Pro: 999,
  Premium: 9999,
};

const ONE_MONTH_MS = 1000 * 60 * 60 * 24 * 31; // ~1 month tolerance

function normalizePlan(p: UserPlan): UserPlan {
  // Migration: cap expiry to 1 month from activatedAt for Free plans
  // (older versions used 1 year by mistake)
  if (p.name !== "Free") return p;
  const activated = new Date(p.activatedAt).getTime();
  const expires = new Date(p.expiresAt).getTime();
  if (expires - activated > ONE_MONTH_MS + 1000) {
    const fixed = new Date(p.activatedAt);
    fixed.setMonth(fixed.getMonth() + 1);
    return { ...p, expiresAt: fixed.toISOString() };
  }
  return p;
}

export function PlanProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [plan, setPlan] = useState<UserPlan | null>(null);
  const [todayUsage, setTodayUsage] = useState(0);

  // Load plan + usage when user changes
  useEffect(() => {
    if (!user) {
      setPlan(null);
      setTodayUsage(0);
      return;
    }
    try {
      const raw = localStorage.getItem(planKey(user.uid));
      if (raw) {
        const parsed = JSON.parse(raw) as UserPlan;
        const fixed = normalizePlan(parsed);
        if (fixed.expiresAt !== parsed.expiresAt) {
          localStorage.setItem(planKey(user.uid), JSON.stringify(fixed));
        }
        setPlan(fixed);
      } else {
        setPlan(null);
      }
      const u = localStorage.getItem(usageKey(user.uid));
      setTodayUsage(u ? parseInt(u, 10) : 0);
    } catch {
      setPlan(null);
    }
  }, [user]);

  const activateFreePlan = useCallback((): UserPlan => {
    const now = new Date();
    const expires = new Date(now);
    expires.setMonth(expires.getMonth() + 1);
    const newPlan: UserPlan = {
      name: "Free",
      activatedAt: now.toISOString(),
      expiresAt: expires.toISOString(),
    };
    if (user) {
      localStorage.setItem(planKey(user.uid), JSON.stringify(newPlan));
      // Fire-and-forget receipt email
      if (user.email) {
        supabase.functions
          .invoke("send-plan-receipt", {
            body: {
              email: user.email,
              displayName: user.displayName,
              planName: newPlan.name,
              activatedAt: newPlan.activatedAt,
              expiresAt: newPlan.expiresAt,
              dailyLimit: PLAN_LIMITS[newPlan.name],
            },
          })
          .catch((e) => console.error("Plan receipt email failed", e));
      }
    }
    setPlan(newPlan);
    return newPlan;
  }, [user]);

  const cancelPlan = useCallback(() => {
    if (!user) return;
    localStorage.removeItem(planKey(user.uid));
    setPlan(null);
  }, [user]);

  const incrementUsage = useCallback(() => {
    if (!user) return;
    const next = todayUsage + 1;
    localStorage.setItem(usageKey(user.uid), String(next));
    setTodayUsage(next);
  }, [user, todayUsage]);

  const isExpired = plan ? new Date(plan.expiresAt).getTime() < Date.now() : false;
  const dailyLimit = plan ? PLAN_LIMITS[plan.name] : PLAN_LIMITS.Free;

  return (
    <PlanContext.Provider
      value={{ plan, activateFreePlan, cancelPlan, todayUsage, dailyLimit, incrementUsage, isExpired }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}
