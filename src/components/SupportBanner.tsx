import { Heart } from "lucide-react";

interface SupportBannerProps {
  variant?: "quiz" | "about" | "results" | "default";
  className?: string;
}

const MESSAGES: Record<string, { title: string; body: string }> = {
  quiz: {
    title: "Support career guidance for students",
    body: "SkillTa is supported by plan purchases, guest advertising, and optional donations. A tip on Ko-fi helps cover AI usage, hosting, and ongoing development. Pro and Lifetime access remains ad-free.",
  },
  results: {
    title: "Loved your career match? Support SkillTa",
    body: "If SkillTa helped you today, an optional donation on Ko-fi supports AI usage, hosting, and improvements to the career tools. Active Pro and Lifetime users enjoy an ad-free, clean experience.",
  },
  about: {
    title: "Help SkillTa stay independent",
    body: "SkillTa helps students find a career direction without the hype. Plan purchases and guest advertising support the platform; optional donations help fund further improvements.",
  },
  default: {
    title: "Support SkillTa",
    body: "Help us improve SkillTa for students. Optional donations support development, while Pro and Lifetime plans include an ad-free, clean experience.",
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
            ☕ Support SkillTa · Donate $3
          </a>
        </div>
      </div>
    </div>
  );
}
