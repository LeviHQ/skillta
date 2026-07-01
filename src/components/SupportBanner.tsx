import { Heart } from "lucide-react";

interface SupportBannerProps {
  variant?: "quiz" | "about" | "results" | "default";
  className?: string;
}

const MESSAGES: Record<string, { title: string; body: string }> = {
  quiz: {
    title: "Help keep SkillTa free for students",
    body: "SkillTa is built to help students freely — no paywalls, no ads. If we can't cover our API, AI, domain and marketing costs from donations, we'll be forced to add ads. A small tip on Ko-fi keeps this project clean and free for everyone.",
  },
  results: {
    title: "Loved your career match? Support SkillTa",
    body: "Your result took real AI compute, domain hosting and hours of work. We don't want to run ads on your career journey. If SkillTa helped you today, a small $3 donation on Ko-fi keeps the AI running and the site ad-free.",
  },
  about: {
    title: "We want SkillTa to stay free — forever",
    body: "SkillTa was built to help students find the right career without hype or paywalls. To avoid running ads, we depend on tiny donations to pay for API cost, AI bills, domain and marketing. If our mission speaks to you, please consider supporting us on Ko-fi.",
  },
  default: {
    title: "Support SkillTa",
    body: "Help us keep SkillTa free and ad-free for every student. Even $3 goes a long way.",
  },
};

export default function SupportBanner({ variant = "default", className = "" }: SupportBannerProps) {
  const { title, body } = MESSAGES[variant] ?? MESSAGES.default;
  return (
    <div
      className={`max-w-3xl mx-auto my-10 p-6 rounded-2xl border border-yellow-400/30 bg-gradient-to-br from-yellow-400/10 via-background to-background ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-11 h-11 rounded-full bg-yellow-400/20 flex items-center justify-center">
          <Heart className="w-5 h-5 text-yellow-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{body}</p>
          <a
            href="https://ko-fi.com/A0A620ZLB9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-transform"
          >
            ☕ Keep SkillTa Free · Donate $3
          </a>
        </div>
      </div>
    </div>
  );
}
