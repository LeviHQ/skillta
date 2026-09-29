import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const liveFeed = [
  { emoji: "🧑‍💻", who: "Aarav from Bengaluru", action: "generated an AI Engineer roadmap", when: "just now" },
  { emoji: "👩‍💻", who: "Sophia from London", action: "completed the career quiz", when: "12 seconds ago" },
  { emoji: "🧑‍🎓", who: "Daniel from Toronto", action: "analyzed his resume with AI", when: "34 seconds ago" },
  { emoji: "👨‍🔧", who: "Meera from Pune", action: "compared Frontend vs Backend", when: "1 minute ago" },
  { emoji: "🧕", who: "Fatima from Dubai", action: "ran a skill gap analysis", when: "2 minutes ago" },
  { emoji: "🧑‍🚀", who: "Lucas from Berlin", action: "started an interview practice round", when: "3 minutes ago" },
  { emoji: "👩‍🔬", who: "Emily from Sydney", action: "unlocked the Cloud Architect path", when: "4 minutes ago" },
];

export default function HeroSection() {
  const [feedIndex, setFeedIndex] = useState(0);
  const [liveUsers, setLiveUsers] = useState(1284);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeedIndex((prev) => (prev + 1) % liveFeed.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUsers((prev) => {
        const next = prev + Math.floor(Math.random() * 15) - 6;
        return Math.min(1680, Math.max(1120, next));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);


  return (
    <section className="relative bg-gradient-hero overflow-hidden py-20 lg:py-28">
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

            {/* Ambient orbs - static blur for smooth 60fps on mobile */}
      <div className="pointer-events-none absolute top-1/4 -left-20 w-[360px] sm:w-[420px] h-[360px] sm:h-[420px] bg-primary/10 rounded-full blur-[100px] opacity-60" />
      <div className="pointer-events-none absolute bottom-0 -right-20 w-[360px] sm:w-[420px] h-[360px] sm:h-[420px] bg-accent/10 rounded-full blur-[100px] opacity-60" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-primary">
                AI-Powered Career Guidance
              </span>
              <Sparkles className="w-3.5 h-3.5 text-primary" />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.15] mb-6 tracking-tight">
              Discover Your{" "}
            <span className="text-gradient block sm:inline">Dream Tech Career</span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
              Don't just guess your future. Use AI-driven roadmaps, skill gap analysis and real salary
              data to land your dream tech role.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-10">
              <Link
                to="/quiz"
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-transform"
              >
                Start Career Quiz
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-border bg-card/40 backdrop-blur-sm font-semibold hover:bg-secondary hover:border-primary/30 transition-all text-muted-foreground hover:text-foreground"
              >
                View Plans & Pricing
              </a>
            </div>

            <div className="border-t border-border/60 pt-8">
              <div className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm p-4 max-w-md mx-auto">
                <div className="flex items-center gap-2 mb-3">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-success">
                    Live activity
                  </span>
                  <span className="ml-auto text-[10px] font-mono text-muted-foreground">
                    {liveUsers.toLocaleString()} online now
                  </span>
                </div>

                <div className="relative h-11 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={feedIndex}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="absolute inset-0 flex items-center gap-3"
                    >
                      <div className="w-7 h-7 shrink-0 rounded-full bg-secondary border border-border flex items-center justify-center text-sm">
                        {liveFeed[feedIndex].emoji}
                      </div>
                      <p className="text-sm text-muted-foreground text-left leading-tight">
                        <span className="text-foreground font-semibold">{liveFeed[feedIndex].who}</span>{" "}
                        {liveFeed[feedIndex].action}
                        <span className="block text-[10px] font-mono text-muted-foreground/70">
                          {liveFeed[feedIndex].when}
                        </span>
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>


      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
