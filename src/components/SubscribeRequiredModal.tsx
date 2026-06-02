import { motion } from "framer-motion";
import { Lock, Sparkles, X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onGetStartedFree: () => void;
}

export default function SubscribeRequiredModal({ open, onClose, onGetStartedFree }: Props) {
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
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
            <Lock className="w-7 h-7 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Subscription Required</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            To access the career quiz you need an active SkillTa subscription. Start with our{" "}
            <span className="text-primary font-semibold">Free plan</span> — no payment required.
          </p>

          <button
            onClick={() => {
              onClose();
              onGetStartedFree();
            }}
            className="w-full py-3 rounded-xl font-semibold text-sm bg-gradient-primary text-primary-foreground hover:opacity-90 transition-all flex items-center justify-center gap-2 mb-3"
          >
            <Sparkles className="w-4 h-4" /> Get Started — Free Plan
          </button>

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
