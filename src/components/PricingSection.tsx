import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Star, Clock, Shield, BookOpen, Sparkles, MessageSquareHeart, X, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { usePlan } from "@/contexts/PlanContext";
import SignInModal from "./SignInModal";
import CongratsModal from "./CongratsModal";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/ month",
    description: "Get started with basic career guidance",
    badge: null,
    features: [
      "Basic career guidance questions",
      "Limited AI responses (5–10/day)",
      "Access to a few career paths",
      "Basic career roadmap view",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$3",
    period: "/ month",
    description: "Unlock the full power of SkillTa",
    badge: "Most Popular",
    features: [
      "Unlimited career questions",
      "Advanced AI career guidance",
      "Full career roadmaps",
      "Skill recommendations",
      "Learning resources",
      "Priority feature updates",
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Premium",
    price: "$7",
    period: "/ month",
    description: "Your personal career strategist",
    badge: "Coming Soon",
    features: [
      "Everything in Pro",
      "Personalized career strategy",
      "Resume improvement suggestions",
      "Interview preparation roadmap",
      "Early access to new features",
    ],
    cta: "Join Waitlist",
    highlighted: false,
  },
];

const trustItems = [
  { icon: Shield, text: "Cancel anytime" },
  { icon: BookOpen, text: "Student-friendly pricing" },
  { icon: Sparkles, text: "New career paths added regularly" },
];

export default function PricingSection() {
  const [showModal, setShowModal] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [congratsExpiry, setCongratsExpiry] = useState<string | undefined>(undefined);
  const [pendingActivation, setPendingActivation] = useState(false);
  const { user } = useAuth();
  const { plan, activateFreePlan } = usePlan();

  // After Google sign-in, once user becomes available, activate Free plan.
  useEffect(() => {
    if (pendingActivation && user && !plan) {
      const p = activateFreePlan();
      setCongratsExpiry(p.expiresAt);
      setShowCongrats(true);
      setPendingActivation(false);
    } else if (pendingActivation && user && plan) {
      // Already had a plan
      setPendingActivation(false);
    }
  }, [pendingActivation, user, plan, activateFreePlan]);

  const handleFreeClick = () => {
    if (!user) {
      setShowSignIn(true);
    } else if (!plan) {
      const p = activateFreePlan();
      setCongratsExpiry(p.expiresAt);
      setShowCongrats(true);
    }
  };

  const handleSignInSuccess = () => {
    setPendingActivation(true);
  };

  const freeExpiry = plan?.name === "Free"
    ? new Date(plan.expiresAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
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
            Choose the plan that fits your career journey. Upgrade or downgrade anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
          {plans.map((tier, i) => {
            const isFreeActive = tier.name === "Free" && plan?.name === "Free";
            return (
            <motion.div
              key={tier.name}
              className={`relative rounded-2xl border p-8 flex flex-col transition-all ${
                tier.highlighted
                  ? "border-primary/50 bg-gradient-card shadow-glow scale-[1.03] z-10"
                  : isFreeActive
                  ? "border-primary/40 bg-card"
                  : "border-border bg-card hover:border-primary/30"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              {tier.badge && (
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold ${
                    tier.badge === "Most Popular"
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-accent-foreground"
                  }`}
                >
                  <div className="flex items-center gap-1">
                    {tier.badge === "Most Popular" && <Star className="w-3 h-3" />}
                    {tier.badge === "Coming Soon" && <Clock className="w-3 h-3" />}
                    {tier.badge}
                  </div>
                </div>
              )}
              {isFreeActive && !tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold bg-primary/15 border border-primary/40 text-primary flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Your Plan
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground mb-1">{tier.name}</h3>
                <p className="text-sm text-muted-foreground">{tier.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                <span className="text-muted-foreground text-sm">{tier.period}</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {isFreeActive ? (
                <div className="w-full py-3 rounded-xl font-semibold text-sm text-center bg-primary/10 border border-primary/30 text-primary">
                  Active till {freeExpiry}
                </div>
              ) : (
                <button
                  onClick={() => {
                    if (tier.name === "Free") handleFreeClick();
                    else setShowModal(true);
                  }}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                    tier.highlighted
                      ? "bg-gradient-primary text-primary-foreground hover:opacity-90"
                      : "border border-border text-foreground hover:border-primary/40 hover:bg-secondary"
                  }`}
                >
                  {tier.cta}
                </button>
              )}
            </motion.div>
            );
          })}
        </div>

        {/* Trust bar */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {trustItems.map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-sm text-muted-foreground">
              <item.icon className="w-4 h-4 text-primary" />
              {item.text}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Premium Coming Soon Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-card z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <MessageSquareHeart className="w-7 h-7 text-primary" />
              </div>

              <h3 className="text-xl font-bold text-foreground mb-2">
                We're Building Something Special! 🚀
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                SkillTa is currently in its <span className="text-primary font-semibold">early launch phase</span> and the premium plans aren't live yet. We're working hard to bring you the best career guidance experience possible.
              </p>

              <div className="w-full rounded-xl border border-border bg-secondary/30 p-4 mb-6">
                <p className="text-sm text-foreground/80 leading-relaxed">
                  💬 Your feedback means the world to us! Help us shape SkillTa by sharing what features matter most to you. We'll bring premium plans very soon — tailored to what <span className="font-semibold text-primary">you</span> actually need.
                </p>
              </div>

              <a
                href="https://skillta.tech/contact"
                className="w-full py-3 rounded-xl font-semibold text-sm bg-gradient-primary text-primary-foreground hover:opacity-90 transition-all text-center block mb-3"
              >
                Share Your Feedback ✨
              </a>

              <button
                onClick={() => setShowModal(false)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <SignInModal
        open={showSignIn}
        onClose={() => setShowSignIn(false)}
        message="Sign in to activate your free SkillTa plan and get started."
        onSuccess={handleSignInSuccess}
      />
      <CongratsModal
        open={showCongrats}
        onClose={() => setShowCongrats(false)}
        planName="Free"
        expiresAt={congratsExpiry || plan?.expiresAt}
      />
    </section>
  );
}
