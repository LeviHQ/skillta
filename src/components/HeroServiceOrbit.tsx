import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Brain,
  Wallet,
  Map,
  GitCompare,
  FileText,
  Target,
  Sparkles,
} from "lucide-react";

type Service = {
  id: string;
  label: string;
  perk: string;
  to: string;
  icon: typeof Brain;
  tone: string;
};

const services: Service[] = [
  { id: "quiz", label: "Career Quiz", perk: "3 free / day", to: "/quiz", icon: Brain, tone: "primary" },
  { id: "salary", label: "Salary Predictor", perk: "Unlimited", to: "/salary-predictor", icon: Wallet, tone: "success" },
  { id: "roadmaps", label: "Roadmap Library", perk: "60+ free", to: "/roadmaps", icon: Map, tone: "accent" },
  { id: "compare", label: "Compare Careers", perk: "Unlimited", to: "/compare", icon: GitCompare, tone: "info" },
  { id: "resume", label: "Resume Reviewer", perk: "3 free / day", to: "/resume-reviewer", icon: FileText, tone: "warning" },
  { id: "skillgap", label: "Skill Gap Analyzer", perk: "3 free / day", to: "/skill-gap-analyzer", icon: Target, tone: "primary" },
];

const toneBubble: Record<string, string> = {
  primary: "border-primary/40 bg-primary/10 text-primary hover:border-primary/80 hover:shadow-[0_0_28px_-6px_hsl(var(--primary))]",
  accent: "border-accent/40 bg-accent/10 text-accent hover:border-accent/80 hover:shadow-[0_0_28px_-6px_hsl(var(--accent))]",
  success: "border-success/40 bg-success/10 text-success hover:border-success/80 hover:shadow-[0_0_28px_-6px_hsl(var(--success))]",
  info: "border-info/40 bg-info/10 text-info hover:border-info/80 hover:shadow-[0_0_28px_-6px_hsl(var(--info))]",
  warning: "border-warning/40 bg-warning/10 text-warning hover:border-warning/80 hover:shadow-[0_0_28px_-6px_hsl(var(--warning))]",
};

export default function HeroServiceOrbit() {
  const [online, setOnline] = useState(1284);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setOnline((p) => Math.min(1680, Math.max(1120, p + Math.floor(Math.random() * 15) - 6)));
    }, 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % services.length), 2600);
    return () => clearInterval(t);
  }, []);

  const radius = 132;

  return (
    <div className="relative mx-auto w-full max-w-[420px] aspect-square">
      {/* orbit rings */}
      <div className="absolute inset-[6%] rounded-full border border-border/50" />
      <motion.div
        className="absolute inset-[20%] rounded-full border border-dashed border-primary/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-[34%] rounded-full border border-dashed border-accent/25"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-[18%] rounded-full bg-primary/10 blur-3xl"
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* center live users */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[38%] aspect-square rounded-full border border-border bg-card/80 backdrop-blur-xl flex flex-col items-center justify-center text-center shadow-glow">
        <span className="flex items-center gap-1.5 mb-1">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-success">Live</span>
        </span>
        <motion.span
          key={online}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold text-foreground"
        >
          {online.toLocaleString()}
        </motion.span>
        <span className="text-[9px] font-mono text-muted-foreground leading-tight px-2">
          people using SkillTa
        </span>
        <span className="mt-1 inline-flex items-center gap-1 text-[9px] font-bold text-accent">
          <Sparkles className="w-2.5 h-2.5" /> All free
        </span>
      </div>

      {/* service bubbles — symmetric ring */}
      {services.map((s, i) => {
        const angle = (i / services.length) * Math.PI * 2 - Math.PI / 2;
        const left = 50 + Math.cos(angle) * 34;
        const top = 50 + Math.sin(angle) * 34;
        const isActive = active === i;
        return (
          <motion.div
            key={s.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${left}%`, top: `${top}%` }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Link to={s.to} aria-label={`${s.label} — ${s.perk}`} className="group block">
              <motion.div
                animate={isActive ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className={`w-[74px] h-[74px] sm:w-[84px] sm:h-[84px] rounded-full border backdrop-blur-md flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-110 ${
                  toneBubble[s.tone]
                } ${isActive ? "ring-2 ring-current/40" : ""}`}
              >
                <s.icon className="w-4 h-4 mb-1" />
                <span className="text-[8.5px] sm:text-[9px] font-bold leading-tight text-foreground px-1">
                  {s.label}
                </span>
                <span className="text-[7.5px] font-mono text-muted-foreground">{s.perk}</span>
              </motion.div>
            </Link>
          </motion.div>
        );
      })}

    </div>
  );
}
