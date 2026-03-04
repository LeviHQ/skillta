import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Map, BookOpen, Shield, TrendingUp, Zap } from "lucide-react";
import { careers } from "@/data/careers";

const features = [
  { icon: Sparkles, title: "AI Career Quiz", description: "10 smart questions to discover your ideal tech career path", color: "text-primary" },
  { icon: Map, title: "Personalized Roadmaps", description: "Step-by-step learning paths with resources and project ideas", color: "text-accent" },
  { icon: Shield, title: "Reality Check", description: "Honest insights on difficulty, competition, and salary expectations", color: "text-warning" },
  { icon: BookOpen, title: "Roadmap Library", description: "Browse curated roadmaps for 9+ tech careers anytime", color: "text-info" },
  { icon: TrendingUp, title: "Career Analysis", description: "Deep dive into demand, growth potential, and required skills", color: "text-success" },
  { icon: Zap, title: "Download as PDF", description: "Save your personalized roadmap and share it anywhere", color: "text-primary" },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 text-sm text-muted-foreground mb-8"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              AI-Powered Career Guidance
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Find Your Perfect
              <br />
              <span className="text-gradient">Tech Career</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Confused about which tech path to choose? Take our AI-powered quiz and get a
              personalized career recommendation with a complete learning roadmap.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/quiz"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-all shadow-glow animate-pulse-glow"
              >
                Take the Career Quiz
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/roadmaps"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-border bg-card/50 text-foreground font-semibold text-lg hover:bg-secondary transition-colors"
              >
                Browse Roadmaps
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to <span className="text-gradient">Navigate Tech</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From discovery to your first job — SkillPilot guides you every step of the way.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="p-6 rounded-2xl bg-gradient-card border border-border hover:border-primary/30 transition-all group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <feature.icon className={`w-10 h-10 mb-4 ${feature.color}`} />
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Paths Preview */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore <span className="text-gradient">Career Paths</span>
            </h2>
            <p className="text-muted-foreground">Discover what each tech career actually involves</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {careers.slice(0, 6).map((career, i) => (
              <motion.div
                key={career.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={`/roadmaps/${career.id}`}
                  className="block p-5 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-glow transition-all group"
                >
                  <div className="text-3xl mb-3">{career.icon}</div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                    {career.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{career.tagline}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary">{career.demandLevel} Demand</span>
                    <span className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground">{career.learningDifficulty}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/roadmaps"
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              View all career paths <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-2xl mx-auto text-center p-12 rounded-3xl bg-gradient-card border border-border relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-primary opacity-5" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">Ready to Find Your Path?</h2>
              <p className="text-muted-foreground mb-8">
                It takes less than 5 minutes. No sign-up required.
              </p>
              <Link
                to="/quiz"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-opacity"
              >
                Start the Quiz <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
