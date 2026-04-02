import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Star, Clock, Shield, BookOpen, Sparkles, MessageSquareHeart, X } from "lucide-react";

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
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              className={`relative rounded-2xl border p-8 flex flex-col transition-all ${
                plan.highlighted
                  ? "border-primary/50 bg-gradient-card shadow-glow scale-[1.03] z-10"
                  : "border-border bg-card hover:border-primary/30"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              {plan.badge && (
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold ${
                    plan.badge === "Most Popular"
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-accent-foreground"
                  }`}
                >
                  <div className="flex items-center gap-1">
                    {plan.badge === "Most Popular" && <Star className="w-3 h-3" />}
                    {plan.badge === "Coming Soon" && <Clock className="w-3 h-3" />}
                    {plan.badge}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground text-sm">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => plan.name !== "Free" && setShowModal(true)}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                  plan.highlighted
                    ? "bg-gradient-primary text-primary-foreground hover:opacity-90"
                    : "border border-border text-foreground hover:border-primary/40 hover:bg-secondary"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
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
    </section>
  );
}
