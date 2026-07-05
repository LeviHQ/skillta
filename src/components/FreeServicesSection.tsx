import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, TrendingUp, MessageSquare, BookOpen, ArrowLeftRight, ArrowRight, Sparkles } from "lucide-react";

const services = [
  {
    title: "AI Career Quiz",
    description: "10 smart questions to find your best-fit tech career with a 92% match accuracy.",
    limit: "3 free attempts",
    path: "/quiz",
    Icon: Brain,
    gradient: "from-primary/25 to-primary/5",
    ring: "ring-primary/30",
    accent: "text-primary",
  },
  {
    title: "Salary Predictor",
    description: "AI-driven salary ranges from real 2025-26 market data — India & global.",
    limit: "Unlimited free",
    path: "/salary-predictor",
    Icon: TrendingUp,
    gradient: "from-accent/25 to-accent/5",
    ring: "ring-accent/30",
    accent: "text-accent",
  },
  {
    title: "Interview Prep",
    description: "Adaptive MCQ + written rounds tailored to your role, level and stack.",
    limit: "Unlimited free",
    path: "/interview-prep",
    Icon: MessageSquare,
    gradient: "from-warning/25 to-warning/5",
    ring: "ring-warning/30",
    accent: "text-warning",
  },
  {
    title: "Roadmap Library",
    description: "60+ curated step-by-step roadmaps with resources, projects and salary info.",
    limit: "Unlimited free",
    path: "/roadmaps",
    Icon: BookOpen,
    gradient: "from-info/25 to-info/5",
    ring: "ring-info/30",
    accent: "text-info",
  },
  {
    title: "Compare Careers",
    description: "Side-by-side comparison of any two tech careers — salary, demand, difficulty.",
    limit: "Unlimited free",
    path: "/compare",
    Icon: ArrowLeftRight,
    gradient: "from-success/25 to-success/5",
    ring: "ring-success/30",
    accent: "text-success",
  },
];

export default function FreeServicesSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Soft glowing background orbs */}
      <div className="pointer-events-none absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-1/4 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">100% Free · No signup for core tools</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Everything SkillTa gives you <span className="text-gradient">for free</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Five real services — no paywalls, no ads. Just career clarity built for students, freshers and switchers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.path}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -6 }}
            >
              <Link
                to={s.path}
                className={`group relative block h-full p-6 rounded-2xl bg-gradient-to-br ${s.gradient} border border-border hover:border-primary/40 transition-all overflow-hidden`}
              >
                <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full bg-current opacity-[0.06] ${s.accent} blur-2xl group-hover:opacity-[0.12] transition-opacity`} />

                <div className={`w-12 h-12 rounded-xl bg-background/60 border border-border ring-1 ${s.ring} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <s.Icon className={`w-6 h-6 ${s.accent}`} />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-foreground">{s.title}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${s.accent} bg-background/60 border border-border`}>
                    {s.limit}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{s.description}</p>

                <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${s.accent} group-hover:gap-3 transition-all`}>
                  Open now <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-xs text-muted-foreground mt-10 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Quiz attempts refill with your plan or via donation support — every other service stays unlimited and free.
        </motion.p>
      </div>
    </section>
  );
}
