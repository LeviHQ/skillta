import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Search,
  Code2,
  Server,
  Brain,
  ShieldCheck,
  Cloud,
  Smartphone,
  TrendingUp,
  Wallet,
  Gift,
} from "lucide-react";
import { careers } from "@/data/careers";
import FreePerksModal from "./FreePerksModal";

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


const paths = [
  { id: "frontend-developer", label: "Frontend", sub: "UI/UX & Interactive", icon: Code2, tone: "primary" },
  { id: "backend-developer", label: "Backend", sub: "Systems & Logic", icon: Server, tone: "accent" },
  { id: "ai-ml-engineer", label: "AI Engineer", sub: "ML & Data Science", icon: Brain, tone: "success" },
  { id: "cybersecurity-specialist", label: "Cybersecurity", sub: "Protection & Sec Ops", icon: ShieldCheck, tone: "info" },
  { id: "cloud-architect", label: "Cloud", sub: "Infra & DevOps", icon: Cloud, tone: "warning" },
  { id: "mobile-developer", label: "Mobile", sub: "iOS & Android Apps", icon: Smartphone, tone: "primary" },
];

const toneRing: Record<string, string> = {
  primary: "hover:border-primary/50 hover:bg-primary/5",
  accent: "hover:border-accent/50 hover:bg-accent/5",
  success: "hover:border-success/50 hover:bg-success/5",
  info: "hover:border-info/50 hover:bg-info/5",
  warning: "hover:border-warning/50 hover:bg-warning/5",
};

const toneIcon: Record<string, string> = {
  primary: "bg-primary/15 text-primary",
  accent: "bg-accent/15 text-accent",
  success: "bg-success/15 text-success",
  info: "bg-info/15 text-info",
  warning: "bg-warning/15 text-warning",
};

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [feedIndex, setFeedIndex] = useState(0);
  const [liveUsers, setLiveUsers] = useState(1284);
  const [perksOpen, setPerksOpen] = useState(false);
  const navigate = useNavigate();

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


  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return careers
      .filter((c) => c.title.toLowerCase().includes(q) || c.id.includes(q.replace(/\s+/g, "-")))
      .slice(0, 4);
  }, [query]);

  const activePath = paths.find((p) => p.id === selected);

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
                  What SkillTa gives you <span className="text-accent font-bold">for free</span>
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

          {/* Right: interactive path selector */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          >
            <div className="rounded-3xl border border-border bg-card/60 backdrop-blur-xl p-6 md:p-8 shadow-glow">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Choose your path
                </h2>
                <span className="text-[10px] font-mono text-primary/70">60+ careers</span>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {paths.map((p, i) => {
                  const isActive = selected === p.id;
                  return (
                    <motion.button
                      key={p.id}
                      type="button"
                      onClick={() => setSelected(isActive ? null : p.id)}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + i * 0.06 }}
                      className={`text-left p-4 rounded-2xl border bg-secondary/30 transition-all group ${
                        isActive ? "border-primary/60 bg-primary/5" : `border-border/60 ${toneRing[p.tone]}`
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${toneIcon[p.tone]}`}
                      >
                        <p.icon className="w-4 h-4" />
                      </div>
                      <div className="text-sm font-bold text-foreground mb-0.5">{p.label}</div>
                      <div className="text-[10px] font-mono text-muted-foreground">{p.sub}</div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Search */}
              <div className="relative mt-6">
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-background/70 border border-border/60 focus-within:border-primary/50 transition-colors">
                  <Search className="w-4 h-4 text-primary shrink-0" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && suggestions[0]) navigate(`/roadmaps/${suggestions[0].id}`);
                    }}
                    placeholder="Or search your dream job..."
                    aria-label="Search career roadmaps"
                    className="bg-transparent border-none outline-none text-sm font-mono w-full placeholder:text-muted-foreground/60 text-foreground"
                  />
                </div>

                <AnimatePresence>
                  {suggestions.length > 0 && (
                    <motion.ul
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="absolute z-20 left-0 right-0 mt-2 rounded-xl border border-border bg-card shadow-glow overflow-hidden"
                    >
                      {suggestions.map((c) => (
                        <li key={c.id}>
                          <Link
                            to={`/roadmaps/${c.id}`}
                            className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-secondary transition-colors"
                          >
                            <span>{c.icon}</span>
                            <span className="text-foreground">{c.title}</span>
                            <ArrowRight className="w-3.5 h-3.5 ml-auto text-muted-foreground" />
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              {/* Contextual action */}
              <AnimatePresence mode="wait">
                {activePath && (
                  <motion.div
                    key={activePath.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 flex flex-col sm:flex-row gap-3">
                      <Link
                        to={`/roadmaps/${activePath.id}`}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                      >
                        View {activePath.label} Roadmap
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <Link
                        to="/quiz"
                        className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-border text-sm font-semibold hover:bg-secondary transition-colors"
                      >
                        Not sure? Take quiz
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Floating badges */}
            <motion.div
              className="absolute -top-3 -right-2 px-3 py-1.5 rounded-lg bg-accent text-accent-foreground text-[10px] font-bold shadow-lg"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              New: AI Prompt Engineering
            </motion.div>
            <motion.div
              className="absolute -bottom-3 -left-2 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-[10px] font-bold shadow-lg"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              Trending: DevOps
            </motion.div>

            {/* Side stats */}
            <div className="absolute top-1/2 -right-14 -translate-y-1/2 space-y-3 hidden 2xl:block">
              <div className="p-3 rounded-xl bg-card/70 backdrop-blur-md border border-border">
                <div className="flex items-center gap-1.5 text-[10px] uppercase text-muted-foreground">
                  <Wallet className="w-3 h-3" /> Avg Salary
                </div>
                <div className="text-lg font-bold text-success">$124k</div>
              </div>
              <div className="p-3 rounded-xl bg-card/70 backdrop-blur-md border border-border">
                <div className="flex items-center gap-1.5 text-[10px] uppercase text-muted-foreground">
                  <TrendingUp className="w-3 h-3" /> Growth
                </div>
                <div className="text-lg font-bold text-primary">+42%</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      <FreePerksModal open={perksOpen} onClose={() => setPerksOpen(false)} />
    </section>
  );
}
