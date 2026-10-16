import { createContext, useContext, useEffect, useState, useRef, ReactNode, useCallback } from "react";
import type { User } from "firebase/auth";
import { useAuth } from "./AuthContext";
import { shouldShowAds } from "@/lib/adEligibility";

const loadSupabase = () => import("@/integrations/supabase/client").then((m) => m.supabase);

export type PlanName = "Pro" | "Lifetime";

export interface UserPlan {
  name: PlanName;
  activatedAt: string; // ISO
  expiresAt: string;   // ISO
}

interface PlanContextType {
  plan: UserPlan | null;
  adsAllowed: boolean;
  /** Legacy name kept for callers: now opens the pricing section to purchase access. */
  activateFreePlan: () => Promise<UserPlan | null>;
  showPricing: () => Promise<UserPlan | null>;
  startCheckout: (plan: PlanName) => Promise<void>;
  cancelPlan: () => Promise<void>;
  todayUsage: number;
  dailyLimit: number;
  resumeUsage: number;
  resumeDailyLimit: number;
  skillGapUsage: number;
  skillGapDailyLimit: number;
  incrementUsage: () => void;
  isExpired: boolean;
  refreshPlan: () => Promise<void>;
}


const PlanContext = createContext<PlanContextType | null>(null);

const DEFAULT_LIMIT = 3;
const PLAN_LIMITS: Record<PlanName, number> = { Pro: 3, Lifetime: 3 };

async function callFirebaseData(user: User, body: Record<string, unknown>) {
  const token = await user.getIdToken();
  const supabase = await loadSupabase();
  const { data, error } = await supabase.functions.invoke("firebase-data", {
    body,
    headers: { Authorization: `Bearer ${token}` },
  });
  if (error) throw error;
  return data;
}

export function PlanProvider({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const [planStatus, setPlanStatus] = useState<"loading" | "ready" | "error">("loading");
  const [resolvedUserId, setResolvedUserId] = useState<string | null>(null);
  const requestSequence = useRef(0);
  const [adClock, setAdClock] = useState(Date.now());
  const [plan, setPlan] = useState<UserPlan | null>(null);
  const [todayUsage, setTodayUsage] = useState(0);
  const [serverLimit, setServerLimit] = useState<number>(DEFAULT_LIMIT);
  const [resumeUsage, setResumeUsage] = useState(0);
  const [resumeDailyLimit, setResumeDailyLimit] = useState(3);
  const [skillGapUsage, setSkillGapUsage] = useState(0);
  const [skillGapDailyLimit, setSkillGapDailyLimit] = useState(3);

  const refreshPlan = useCallback(async () => {
    const sequence = ++requestSequence.current;
    if (!user) {
      setResolvedUserId(null);
      setPlanStatus("ready");
      setPlan(null);
      setTodayUsage(0);
      setResumeUsage(0);
      setSkillGapUsage(0);
      setServerLimit(DEFAULT_LIMIT);
      return;
    }
    setPlanStatus("loading");
    try {
      const data = await callFirebaseData(user, { action: "getPlan" });
      if (sequence !== requestSequence.current) return;
      setPlan(data?.plan ?? null);
      setResolvedUserId(user.uid);
      setPlanStatus("ready");
      setTodayUsage(typeof data?.usage === "number" ? data.usage : 0);
      setServerLimit(typeof data?.dailyLimit === "number" ? data.dailyLimit : DEFAULT_LIMIT);
      setResumeUsage(typeof data?.resumeUsage === "number" ? data.resumeUsage : 0);
      setResumeDailyLimit(typeof data?.resumeDailyLimit === "number" ? data.resumeDailyLimit : 3);
      setSkillGapUsage(typeof data?.skillGapUsage === "number" ? data.skillGapUsage : 0);
      setSkillGapDailyLimit(typeof data?.skillGapDailyLimit === "number" ? data.skillGapDailyLimit : 3);
    } catch (err) {
      if (sequence !== requestSequence.current) return;
      console.error("Failed to fetch plan", err);
      setPlan(null);
      setPlanStatus("error");
    }
  }, [user]);

  useEffect(() => {
    refreshPlan();
    return () => { requestSequence.current++; };
  }, [refreshPlan]);

  useEffect(() => {
    if (plan?.name !== "Pro") return;
    const remaining = Date.parse(plan.expiresAt) - Date.now();
    if (!Number.isFinite(remaining) || remaining <= 0) return;
    const timer = window.setTimeout(() => setAdClock(Date.now()), Math.min(remaining + 1, 2_147_483_647));
    return () => window.clearTimeout(timer);
  }, [plan, adClock]);

  const adsAllowed = shouldShowAds({
    authLoading, userId: user?.uid ?? null, resolvedUserId, planStatus, plan,
    now: Math.max(adClock, Date.now()),
  });

  const showPricing = useCallback(async (): Promise<UserPlan | null> => {
    const el = document.getElementById("pricing");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.location.href = "/#pricing";
    return null;
  }, []);

  const startCheckout = useCallback(async (planName: PlanName) => {
    if (!user) throw new Error("Sign in required");
    const token = await user.getIdToken();
    const supabase = await loadSupabase();
    const { data, error } = await supabase.functions.invoke("dodo-checkout", {
      body: { plan: planName, returnOrigin: window.location.origin },
      headers: { Authorization: `Bearer ${token}` },
    });
    if (error || !data?.url) throw error ?? new Error("Checkout unavailable");
    window.location.href = data.url;
  }, [user]);

  const cancelPlan = useCallback(async () => {
    if (!user) return;
    try {
      await callFirebaseData(user, { action: "cancelPlan" });
      setPlan(null);
    } catch (err) {
      console.error("Failed to cancel plan", err);
    }
  }, [user]);

  const incrementUsage = useCallback(() => {
    setTodayUsage((n) => n + 1);
  }, []);

  const isExpired = plan ? new Date(plan.expiresAt).getTime() < Date.now() : false;
  const dailyLimit = plan ? PLAN_LIMITS[plan.name] ?? DEFAULT_LIMIT : serverLimit;

  return (
    <PlanContext.Provider
      value={{
        plan,
        adsAllowed,
        activateFreePlan: showPricing,
        showPricing,
        startCheckout,
        cancelPlan,
        todayUsage,
        dailyLimit,
        resumeUsage,
        resumeDailyLimit,
        skillGapUsage,
        skillGapDailyLimit,
        incrementUsage,
        isExpired,
        refreshPlan,
      }}
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
