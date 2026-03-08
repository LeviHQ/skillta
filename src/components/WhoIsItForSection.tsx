import { motion } from "framer-motion";
import { GraduationCap, RefreshCw, Briefcase, Code2, Lightbulb, Users } from "lucide-react";

const personas = [
  {
    icon: GraduationCap,
    title: "College Students",
    description: "Confused about which tech career to pick after graduation? Get clarity now.",
    emoji: "🎓",
  },
  {
    icon: RefreshCw,
    title: "Career Switchers",
    description: "Stuck in a non-tech job? Discover the fastest path into the tech industry.",
    emoji: "🔄",
  },
  {
    icon: Code2,
    title: "Self-Taught Coders",
    description: "Learning to code but don't know what to specialize in? We'll guide you.",
    emoji: "💻",
  },
  {
    icon: Briefcase,
    title: "Working Professionals",
    description: "Want to upskill or pivot within tech? Find the right direction.",
    emoji: "💼",
  },
  {
    icon: Lightbulb,
    title: "Aspiring Entrepreneurs",
    description: "Building a startup? Know which tech skills you actually need to learn.",
    emoji: "🚀",
  },
  {
    icon: Users,
    title: "Freelancers",
    description: "Want high-paying freelance skills? Discover what's in demand right now.",
    emoji: "🌍",
  },
];

const stats = [
  { value: "10K+", label: "Career Paths Generated" },
  { value: "9+", label: "Tech Careers Covered" },
  { value: "95%", label: "Users Found Clarity" },
  { value: "5 Min", label: "To Your Roadmap" },
];

export default function WhoIsItForSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/3 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3">
            Built For You
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Who is <span className="text-gradient">SkillTa</span> for?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Whether you're starting fresh or leveling up — SkillTa helps you find
            the right tech career and gives you the exact roadmap to get there.
          </p>
        </motion.div>

        {/* Animated Stats Bar */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center p-5 rounded-2xl bg-gradient-card border border-border"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.08 }}
            >
              <p className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Persona Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {personas.map((persona, i) => (
            <motion.div
              key={persona.title}
              className="group relative p-6 rounded-2xl bg-gradient-card border border-border hover:border-primary/40 transition-all cursor-default"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {persona.emoji}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {persona.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {persona.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.p
          className="text-center mt-14 text-muted-foreground text-sm max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          🎯 No fluff. No confusion. Just a clear, personalized roadmap to your dream tech career.
        </motion.p>
      </div>
    </section>
  );
}
