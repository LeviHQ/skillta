import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Gift } from "lucide-react";
import FreePerksModal from "./FreePerksModal";
import HeroServiceOrbit from "./HeroServiceOrbit";


const rotatingWords = ["Tech Career", "Dream Job", "Future Path", "Passion"];

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
  const [wordIndex, setWordIndex] = useState(0);
  const [feedIndex, setFeedIndex] = useState(0);
  const [liveUsers, setLiveUsers] = useState(1284);
  const [perksOpen, setPerksOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

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

      {/* Ambient orbs */}
      <motion.div
        className="absolute top-1/4 -left-20 w-[420px] h-[420px] bg-primary/10 rounded-full blur-[120px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 -right-20 w-[420px] h-[420px] bg-accent/10 rounded-full blur-[120px]"
        animate={{ scale: [1.15, 1, 1.15], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center max-w-6xl mx-auto">
          {/* Left: message */}
          <motion.div
            className="text-center lg:text-left"
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

            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
              <span className="block">Discover Your</span>
              <span className="relative block h-[1.25em] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    className="text-gradient absolute inset-x-0 top-0 block whitespace-nowrap leading-[1.25] pb-[0.12em]"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  >
                    {rotatingWords[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>


            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Don't just guess your future. Use AI-driven roadmaps, skill gap analysis and real salary
              data to land your dream tech role — free to start.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-5">
              <Link
                to="/quiz"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-[1.03] active:scale-[0.98] transition-transform"
              >
                Start Free Quiz
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/roadmaps"
                className="inline-flex items-center px-8 py-4 rounded-xl border border-border bg-card/50 backdrop-blur-sm font-semibold hover:bg-secondary hover:border-primary/30 transition-all"
              >
                View Roadmaps
              </Link>
            </div>

            <div className="flex justify-center lg:justify-start mb-10">
              <motion.button
                type="button"
                onClick={() => setPerksOpen(true)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center gap-2.5 px-5 py-3 rounded-full border border-accent/40 bg-accent/10 backdrop-blur-sm overflow-hidden"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
                <Gift className="w-4 h-4 text-accent relative shrink-0" />
                <span className="text-sm sm:text-base font-semibold text-foreground relative">
                  What SkillTa gives you{" "}
                  <span className="font-extrabold text-accent underline decoration-accent/60 decoration-2 underline-offset-4">
                    for FREE
                  </span>
                </span>

                <span className="relative shrink-0 text-[11px] font-bold uppercase tracking-wide text-accent-foreground bg-accent px-2 py-0.5 rounded-full">
                  7 tools
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-accent relative shrink-0 group-hover:translate-x-1 transition-transform" />

              </motion.button>
            </div>


            <div className="border-t border-border/60 pt-8">
              <div className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm p-4 max-w-md mx-auto lg:mx-0">
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

          {/* Right: animated free-service orbit */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          >
            <HeroServiceOrbit />
            <motion.div
              className="mt-6 flex justify-center"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 backdrop-blur-sm shadow-lg shadow-primary/10">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                </span>
                <span className="text-sm sm:text-base font-bold tracking-tight text-foreground">
                  Tap any bubble to start
                </span>
                <span className="text-sm sm:text-base font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  100% FREE
                </span>
              </span>
            </motion.div>

          </motion.div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      <FreePerksModal open={perksOpen} onClose={() => setPerksOpen(false)} />
    </section>
  );
}
