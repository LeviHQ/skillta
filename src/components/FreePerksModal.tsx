import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  Infinity as InfinityIcon,
  Sparkles,
  Loader2,
  Shield,
  Lock,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { usePlan, type PlanName } from "@/contexts/PlanContext";
import SignInModal from "./SignInModal";

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
  tagline: string;
  badge?: string;
  highlighted: boolean;
}[] = [
  {
    name: "Pro",
    price: "$3",
    period: "/ 1 year",
    tagline: "Full SkillTa Career Suite for 12 months.",
    highlighted: false,
  },
  {
    name: "Lifetime",
    price: "$10",
    period: "one-time",
    tagline: "Full access forever, including every future update.",
    badge: "Best Value",
    highlighted: true,
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function FreePerksModal({ open, onClose }: Props) {
  const { user } = useAuth();
  const { plan, startCheckout } = usePlan();
  const [showSignIn, setShowSignIn] = useState(false);
  const [pending, setPending] = useState<PlanName | null>(null);
  const [loading, setLoading] = useState<PlanName | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Compare SkillTa plans"
            initial={{ scale: 0.92, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 12 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-3xl border border-primary/25 bg-card/95 backdrop-blur-xl shadow-glow p-6 md:p-8"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 rounded-full p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <Sparkles className="w-7 h-7 text-primary-foreground" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Compare <span className="text-gradient">Our Plans</span>
              </h2>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                One suite, two durations. Both plans unlock every SkillTa tool — pick how long you want access.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-5">
              {plans.map((tier, i) => {
                const isActive = plan?.name === tier.name;
                const ownsLifetime = plan?.name === "Lifetime";
                const disabled = (isActive && tier.name === "Lifetime") || (ownsLifetime && tier.name === "Pro");
                return (
                  <motion.div
                    key={tier.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.07 }}
                    className={`relative rounded-2xl border p-5 flex flex-col ${
                      tier.highlighted
                        ? "border-primary/50 bg-gradient-card shadow-glow"
                        : "border-border bg-secondary/30"
                    }`}
                  >
                    {tier.badge && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-primary text-primary-foreground">
                        {tier.badge}
                      </span>
                    )}
                    <div className="flex items-center gap-2 mb-1">
                      {tier.name === "Lifetime" && <InfinityIcon className="w-4 h-4 text-primary" />}
                      <h3 className="text-lg font-bold text-foreground">SkillTa {tier.name}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-4">{tier.tagline}</p>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-foreground">{tier.price}</span>
                      <span className="text-muted-foreground ml-2 text-xs">{tier.period}</span>
                    </div>
                    <ul className="space-y-2 mb-5 flex-1">
                      {features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-xs text-foreground/85">
                          <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" /> {f}
                        </li>
                      ))}
                      <li className="flex items-start gap-2 text-xs font-semibold text-foreground">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        {tier.name === "Lifetime" ? "Access never expires" : "365 days of access"}
                      </li>
                    </ul>
                    <button
                      onClick={() => buy(tier.name)}
                      disabled={disabled || loading !== null}
                      className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed ${
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

            {error && <p className="text-center text-sm text-destructive mb-4">{error}</p>}

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {[
                { icon: Lock, text: "Secure checkout by Dodo Payments" },
                { icon: Shield, text: "One-time payment, no auto-renewal" },
                { icon: Sparkles, text: "New career paths added regularly" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Icon className="w-3.5 h-3.5 text-primary" /> {text}
                </div>
              ))}
            </div>
          </motion.div>

          <SignInModal
            open={showSignIn}
            onClose={() => setShowSignIn(false)}
            message="Sign in with Google to continue to secure checkout."
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
