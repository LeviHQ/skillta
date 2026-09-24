import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Shield, Infinity as InfinityIcon, Sparkles, Loader2, CheckCircle2, Lock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { usePlan, type PlanName } from "@/contexts/PlanContext";
import SignInModal from "./SignInModal";
import CongratsModal from "./CongratsModal";

const features = [
  "AI Career Quiz with detailed match report",
  "AI Resume Reviewer with PDF report",
  "Skill Gap Analyzer",
  "AI Salary Predictor",
  "50+ country tech ecosystems",
  "All career roadmaps with PDF export",
  "Career comparison tool",
  "Smart daily usage limits on every tool",
];

const plans: {
  name: PlanName;
  price: string;
  period: string;
  description: string;
  badge?: string;
  highlighted: boolean;
}[] = [
  { name: "Pro", price: "$3", period: "/ 1 year", description: "Full SkillTa Career Suite for 12 months.", highlighted: false },
  { name: "Lifetime", price: "$10", period: "one-time", description: "Full access forever, including every future update.", badge: "Best Value", highlighted: true },
];

const trustItems = [
  { icon: Lock, text: "Secure checkout by Dodo Payments" },
  { icon: Shield, text: "One-time payment, no auto-renewal" },
  { icon: Sparkles, text: "New career paths added regularly" },
];

export default function PricingSection() {
  const { user } = useAuth();
  const { plan, startCheckout, refreshPlan } = usePlan();
  const [showSignIn, setShowSignIn] = useState(false);
  const [pending, setPending] = useState<PlanName | null>(null);
  const [loading, setLoading] = useState<PlanName | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showCongrats, setShowCongrats] = useState(false);

  const buy = async (name: PlanName) => {
    setError(null);
    if (!user) {
      setPending(name);
      setShowSignIn(true);
      return;
    }
    setLoading(name);
    try {
      await startCheckout(name);
    } catch {
      setError("Could not open checkout. Please try again.");
      setLoading(null);
    }
  };

  // Continue to checkout after sign-in completes.
  useEffect(() => {
    if (pending && user) {
      const p = pending;
      setPending(null);
      buy(p);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pending, user]);

  // Returning from Dodo checkout: poll until the webhook activates the plan.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("payment") !== "success" || !user) return;
    let tries = 0;
    const id = setInterval(async () => {
      tries++;
      await refreshPlan();
      if (tries >= 10) clearInterval(id);
    }, 2500);
    refreshPlan();
    return () => clearInterval(id);
  }, [user, refreshPlan]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("payment") === "success" && plan) {
      setShowCongrats(true);
      window.history.replaceState(null, "", window.location.pathname + "#pricing");
    }
  }, [plan]);

  const expiryLabel = plan
    ? plan.name === "Lifetime"
      ? "Lifetime access"
      : `Active until ${new Date(plan.expiresAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`
    : null;

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, <span className="text-gradient">Transparent</span> Pricing
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            One suite, two durations. Pay once and unlock every SkillTa tool.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
          {plans.map((tier, i) => {
            const isActive = plan?.name === tier.name;
            const ownsLifetime = plan?.name === "Lifetime";
            const disabled = isActive && tier.name === "Lifetime" || (ownsLifetime && tier.name === "Pro");
            return (
              <motion.div
                key={tier.name}
                className={`relative rounded-2xl border p-8 flex flex-col transition-all ${
                  tier.highlighted ? "border-primary/50 bg-gradient-card shadow-glow" : "border-border bg-card"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {tier.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-primary text-primary-foreground">
                    {tier.badge}
                  </span>
                )}
                <div className="flex items-center gap-2 mb-2">
                  {tier.name === "Lifetime" && <InfinityIcon className="w-5 h-5 text-primary" />}
                  <h3 className="text-xl font-bold text-foreground">SkillTa {tier.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-6">{tier.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                  <span className="text-muted-foreground ml-2 text-sm">{tier.period}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground/85">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {f}
                    </li>
                  ))}
                  <li className="flex items-start gap-2 text-sm font-semibold text-foreground">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {tier.name === "Lifetime" ? "Access never expires" : "365 days of access"}
                  </li>
                </ul>
                {isActive && (
                  <p className="flex items-center justify-center gap-1.5 text-xs text-primary mb-3">
                    <CheckCircle2 className="w-4 h-4" /> {expiryLabel}
                  </p>
                )}
                <button
                  onClick={() => buy(tier.name)}
                  disabled={disabled || loading !== null}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed ${
                    tier.highlighted
                      ? "bg-gradient-primary text-primary-foreground hover:opacity-90"
                      : "border border-primary/40 text-foreground hover:bg-primary/10"
                  }`}
                >
                  {loading === tier.name && <Loader2 className="w-4 h-4 animate-spin" />}
                  {disabled ? "Included in your access" : isActive ? "Extend 1 more year" : `Get ${tier.name}`}
                </button>
              </motion.div>
            );
          })}
        </div>

        {error && <p className="text-center text-sm text-destructive mt-6">{error}</p>}

        <div className="flex flex-wrap justify-center gap-6 mt-12">
          {trustItems.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon className="w-4 h-4 text-primary" /> {text}
            </div>
          ))}
        </div>
      </div>

      <SignInModal
        open={showSignIn}
        onClose={() => setShowSignIn(false)}
        message="Sign in with Google to continue to secure checkout."
      />
      <CongratsModal
        open={showCongrats}
        onClose={() => setShowCongrats(false)}
        planName={plan?.name ?? "Pro"}
        expiresAt={plan?.expiresAt}
      />
    </section>
  );
}
