import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Lock, Sparkles, X, Clock } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  dailyLimit: number;
}

function getTimeUntilMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const diff = midnight.getTime() - now.getTime();
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function LimitReachedModal({ open, onClose, dailyLimit }: Props) {
  const [countdown, setCountdown] = useState(getTimeUntilMidnight());

  useEffect(() => {
    if (!open) return;
    const id = setInterval(() => setCountdown(getTimeUntilMidnight()), 1000);
    return () => clearInterval(id);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-card z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-warning/10 flex items-center justify-center mb-5">
            <Lock className="w-7 h-7 text-warning" />
          </div>

          <h3 className="text-xl font-bold text-foreground mb-2">
            Daily Limit Reached
          </h3>

          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            You've used all <span className="text-primary font-semibold">{dailyLimit} free quizzes</span> for today.
            Upgrade your plan for unlimited access, or come back tomorrow.
          </p>

          <div className="w-full rounded-xl border border-border bg-secondary/30 p-4 mb-6 flex items-center justify-center gap-3">
            <Clock className="w-5 h-5 text-primary" />
            <div className="text-left">
              <p className="text-xs text-muted-foreground">You can use again in</p>
              <p className="text-lg font-mono font-bold text-foreground">{countdown}</p>
            </div>
          </div>

          <Link
            to="/#pricing"
            onClick={onClose}
            className="w-full py-3 rounded-xl font-semibold text-sm bg-gradient-primary text-primary-foreground hover:opacity-90 transition-all text-center block mb-3 inline-flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> Upgrade Plan
          </Link>

          <button
            onClick={onClose}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
}
