import { motion } from "framer-motion";
import { Target, Database, Brain, ShieldCheck } from "lucide-react";

const stats = [
  { value: "92%", label: "Match accuracy", description: "Validated against real career outcomes" },
  { value: "10K+", label: "Tech professionals", description: "Data points training our model" },
  { value: "50+", label: "Career paths", description: "Across every major tech domain" },
  { value: "10", label: "Smart questions", description: "Tuned for signal, not noise" },
];

const pillars = [
  {
    icon: Database,
    title: "Trained on real data",
    description: "Built on outcomes from 10,000+ tech professionals across roles, levels, and geographies.",
  },
  {
    icon: Brain,
    title: "Multi-signal scoring",
    description: "We weigh interests, problem-solving style, work preferences, and learning patterns — not just skills.",
  },
  {
    icon: ShieldCheck,
    title: "Honest reality checks",
    description: "Every recommendation includes difficulty, competition, and salary realities — no inflated promises.",
  },
  {
    icon: Target,
    title: "Continuously calibrated",
    description: "Our model is retuned regularly using fresh industry data and user feedback.",
  },
];

export default function AccuracySection() {
  return (
    <section className="py-24 bg-card/30">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4">
            <Target className="w-3.5 h-3.5" />
            Built for accuracy
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How <span className="text-gradient">Accurate</span> Is SkillTa?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We obsess over match quality so you don't waste months on the wrong path.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-14">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="p-6 rounded-2xl bg-gradient-card border border-border text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">{s.value}</div>
              <div className="text-sm font-semibold text-foreground">{s.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.description}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              className="flex gap-4 p-6 rounded-2xl bg-gradient-card border border-border hover:border-primary/30 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <p.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
