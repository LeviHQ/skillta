import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Brain,
  TrendingUp,
  BookOpen,
  ArrowLeftRight,
  FileText,
  Target,
  MessageSquare,
  Gift,
  ArrowRight,
  X,
} from "lucide-react";

const perks = [
  { title: "AI Career Quiz", desc: "Find your best-fit tech role in 10 smart questions.", limit: "3 free / day", path: "/quiz", Icon: Brain, accent: "text-success", bg: "bg-success/15" },
  { title: "Salary Predictor", desc: "Real 2026 market salary ranges, India & global.", limit: "Unlimited", path: "/salary-predictor", Icon: TrendingUp, accent: "text-accent", bg: "bg-accent/15" },
  { title: "Roadmap Library", desc: "60+ step-by-step roadmaps with resources & projects.", limit: "Unlimited", path: "/roadmaps", Icon: BookOpen, accent: "text-info", bg: "bg-info/15" },
  { title: "Compare Careers", desc: "Two roles side-by-side: salary, demand, difficulty.", limit: "Unlimited", path: "/compare", Icon: ArrowLeftRight, accent: "text-warning", bg: "bg-warning/15" },
  { title: "AI Resume Reviewer", desc: "ATS score, keyword gaps and bullet rewrites.", limit: "3 free / day", path: "/resume-reviewer", Icon: FileText, accent: "text-primary", bg: "bg-primary/15" },
  { title: "Skill Gap Analyzer", desc: "Missing skills + a weekly study plan for any role.", limit: "3 free / day", path: "/skill-gap-analyzer", Icon: Target, accent: "text-info", bg: "bg-info/15" },
  { title: "Saathi AI Assistant", desc: "Guided navigation and instant career answers.", limit: "Always free", path: "/", Icon: MessageSquare, accent: "text-accent", bg: "bg-accent/15" },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function FreePerksModal({ open, onClose }: Props) {
  const navigate = useNavigate();

  const goToPricing = () => {
    onClose();
    navigate("/#pricing");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="What SkillTa gives you for free"
            initial={{ scale: 0.92, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 12 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-3xl border border-primary/25 bg-card/95 backdrop-blur-xl shadow-glow p-6 md:p-8"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 rounded-full p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <Gift className="w-7 h-7 text-primary-foreground" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                What SkillTa gives you <span className="text-gradient">for free</span>
              </h2>
              <p className="text-sm text-muted-foreground">
                No card, no trial games — sign in and start using everything below today.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {perks.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <Link
                    to={p.path}
                    onClick={onClose}
                    className="group flex gap-3 h-full p-4 rounded-2xl border border-border/60 bg-secondary/30 hover:border-primary/40 hover:bg-primary/5 transition-all"
                  >
                    <div className={`w-9 h-9 shrink-0 rounded-lg flex items-center justify-center ${p.bg} ${p.accent} group-hover:scale-110 transition-transform`}>
                      <p.Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-bold text-foreground">{p.title}</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-1.5">{p.desc}</p>
                      <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider text-primary">
                        {p.limit}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <button
              onClick={goToPricing}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              See all plans & pricing
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
