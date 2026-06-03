import { motion } from "framer-motion";
import { UserPlus, ClipboardList, Sparkles, Map } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Sign in & Activate",
    description: "Sign in with Google and activate your Free plan in one click — no card required.",
    color: "text-primary",
  },
  {
    icon: ClipboardList,
    title: "Take the AI Quiz",
    description: "Answer 10 smart questions about your interests, skills, and goals. Takes ~5 minutes.",
    color: "text-accent",
  },
  {
    icon: Sparkles,
    title: "Get AI Matches",
    description: "Our AI analyzes your profile and ranks the top tech careers that fit you best.",
    color: "text-warning",
  },
  {
    icon: Map,
    title: "Follow Your Roadmap",
    description: "Open the personalized roadmap with resources, projects, and a clear timeline.",
    color: "text-success",
  },
];

export default function HowToUseSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How to Use <span className="text-gradient">SkillTa</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Four simple steps from "I don't know what to do" to a clear career plan.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              className="relative p-6 rounded-2xl bg-gradient-card border border-border hover:border-primary/30 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-primary text-primary-foreground text-sm font-bold flex items-center justify-center shadow-glow">
                {i + 1}
              </div>
              <step.icon className={`w-10 h-10 mb-4 ${step.color}`} />
              <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
