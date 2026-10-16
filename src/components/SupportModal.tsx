import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Heart } from "lucide-react";

interface SupportModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SupportModal({ open, onClose }: SupportModalProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center mb-3">
            <Heart className="w-6 h-6 text-yellow-400" />
          </div>
          <DialogTitle>Enjoyed your career match?</DialogTitle>
          <DialogDescription className="pt-2 leading-relaxed">
            SkillTa is supported by plan purchases, guest advertising, and optional donations.
            A contribution on Ko-fi helps cover AI usage, hosting, and development. Active Pro and Lifetime plans include an ad-free, clean experience; donations are separate from plan purchases.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 pt-2">
          <a
            href="https://ko-fi.com/A0A620ZLB9"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full text-center bg-yellow-400 text-gray-900 px-4 py-3 rounded-lg font-semibold hover:scale-[1.02] transition-transform"
          >
            ☕ Support SkillTa on Ko-fi
          </a>
          <button
            onClick={onClose}
            className="w-full text-sm text-muted-foreground hover:text-foreground py-2 transition-colors"
          >
            Ignore this time
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
