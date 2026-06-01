import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { useAuth } from "./AuthContext";

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
  Free: 10,
  Pro: 999,
  Premium: 9999,
};

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
      if (raw) setPlan(JSON.parse(raw));
      else setPlan(null);
      const u = localStorage.getItem(usageKey(user.uid));
      setTodayUsage(u ? parseInt(u, 10) : 0);
    } catch {
      setPlan(null);
    }
  }, [user]);

  const activateFreePlan = useCallback((): UserPlan => {
    const now = new Date();
    const expires = new Date(now);
    expires.setFullYear(expires.getFullYear() + 1);
    const newPlan: UserPlan = {
      name: "Free",
      activatedAt: now.toISOString(),
      expiresAt: expires.toISOString(),
    };
    if (user) {
      localStorage.setItem(planKey(user.uid), JSON.stringify(newPlan));
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
