import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { User } from "firebase/auth";
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
  activateFreePlan: () => Promise<UserPlan | null>;
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

const PLAN_LIMITS: Record<PlanName, number> = {
  Free: 3,
  Pro: 999,
  Premium: 9999,
};

async function callFirebaseData(user: User, body: Record<string, unknown>) {
  const token = await user.getIdToken();
  const { data, error } = await supabase.functions.invoke("firebase-data", {
    body,
    headers: { Authorization: `Bearer ${token}` },
  });
  if (error) throw error;
  return data;
}

export function PlanProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [plan, setPlan] = useState<UserPlan | null>(null);
  const [todayUsage, setTodayUsage] = useState(0);
  const [serverLimit, setServerLimit] = useState<number>(PLAN_LIMITS.Free);
  const [resumeUsage, setResumeUsage] = useState(0);
  const [resumeDailyLimit, setResumeDailyLimit] = useState(3);
  const [skillGapUsage, setSkillGapUsage] = useState(0);
  const [skillGapDailyLimit, setSkillGapDailyLimit] = useState(3);

  const refreshPlan = useCallback(async () => {
    if (!user) {
      setPlan(null);
      setTodayUsage(0);
      setResumeUsage(0);
      setSkillGapUsage(0);
      setServerLimit(PLAN_LIMITS.Free);
      return;
    }
    try {
      const data = await callFirebaseData(user, { action: "getPlan" });
      setPlan(data?.plan ?? null);
      setTodayUsage(typeof data?.usage === "number" ? data.usage : 0);
      setServerLimit(typeof data?.dailyLimit === "number" ? data.dailyLimit : PLAN_LIMITS.Free);
      setResumeUsage(typeof data?.resumeUsage === "number" ? data.resumeUsage : 0);
      setResumeDailyLimit(typeof data?.resumeDailyLimit === "number" ? data.resumeDailyLimit : 3);
      setSkillGapUsage(typeof data?.skillGapUsage === "number" ? data.skillGapUsage : 0);
      setSkillGapDailyLimit(typeof data?.skillGapDailyLimit === "number" ? data.skillGapDailyLimit : 3);
    } catch (err) {
      console.error("Failed to fetch plan", err);
      setPlan(null);
    }
  }, [user]);

  useEffect(() => {
    refreshPlan();
  }, [refreshPlan]);

  const activateFreePlan = useCallback(async (): Promise<UserPlan | null> => {
    if (!user) return null;
    try {
      const data = await callFirebaseData(user, { action: "activatePlan", planName: "Free" });
      const newPlan: UserPlan = data.plan;
      setPlan(newPlan);
      setServerLimit(typeof data?.dailyLimit === "number" ? data.dailyLimit : PLAN_LIMITS.Free);
      try {
        const token = await user.getIdToken();
        supabase.functions
          .invoke("send-plan-receipt", {
            body: {},
            headers: { Authorization: `Bearer ${token}` },
          })
          .catch((e) => console.error("Plan receipt email failed", e));
      } catch (e) {
        console.error("Plan receipt email failed", e);
      }
      return newPlan;
    } catch (err) {
      console.error("Failed to activate plan", err);
      return null;
    }
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
  const dailyLimit = plan ? PLAN_LIMITS[plan.name] : serverLimit;

  return (
    <PlanContext.Provider
      value={{
        plan,
        activateFreePlan,
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
