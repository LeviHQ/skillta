import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Sparkles, X } from "lucide-react";

interface CongratsModalProps {
  open: boolean;
  onClose: () => void;
  planName: string;
  expiresAt?: string;
}

export default function CongratsModal({ open, onClose, planName, expiresAt }: CongratsModalProps) {
  const formattedExpiry = expiresAt
    ? new Date(expiresAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative w-full max-w-md p-8 rounded-2xl bg-gradient-card border border-primary/30 shadow-glow text-center"
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 250 }}
              className="w-20 h-20 mx-auto mb-5 rounded-full bg-primary/15 flex items-center justify-center relative"
            >
              <CheckCircle2 className="w-12 h-12 text-primary" />
              <Sparkles className="w-5 h-5 text-accent absolute -top-1 -right-1 animate-pulse" />
            </motion.div>

            <h2 className="text-2xl font-bold text-foreground mb-2">
              Congratulations! <span className="text-gradient">🎉</span>
            </h2>
            <p className="text-foreground/90 mb-2 font-medium">
              Your <span className="text-primary font-bold">{planName} Plan</span> is now active
            </p>
            {formattedExpiry && (
              <p className="text-sm text-muted-foreground mb-6">
                Valid until <span className="text-foreground font-semibold">{formattedExpiry}</span>
              </p>
            )}

            <div className="rounded-xl border border-border bg-secondary/40 p-4 mb-6 text-left">
              <p className="text-xs text-muted-foreground mb-2">You now have access to:</p>
              <ul className="text-sm text-foreground/85 space-y-1.5">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Career Quiz (10 attempts / day)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Basic career roadmaps
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Saathi AI assistant
                </li>
              </ul>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-gradient-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Start Exploring
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
