import { Link } from "react-router-dom";
import { Target, ArrowRight, Sparkles } from "lucide-react";

/**
 * Reusable internal-linking CTA for /skill-gap-analyzer.
 * Drop on any page (results, roadmaps, blogs, salary predictor, etc.)
 */
export default function SkillGapAnalyzerCTA({ variant = "default" }: { variant?: "default" | "inline" }) {
  if (variant === "inline") {
    return (
      <Link
        to="/skill-gap-analyzer"
        className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold underline underline-offset-4"
      >
        <Target className="w-4 h-4" />
        Find your skill gaps — free
        <ArrowRight className="w-4 h-4" />
      </Link>
    );
  }

  return (
    <div className="my-8 rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 via-background to-primary/5 p-6 md:p-7 relative overflow-hidden">
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
      <div className="relative flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
        <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
          <Target className="w-6 h-6 text-accent" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-accent/80 font-semibold mb-1">
            <Sparkles className="w-3 h-3" /> Free · Algorithm-driven
          </div>
          <h4 className="text-lg md:text-xl font-bold text-foreground">
            Don't know what to learn next?
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            Match your current skills against your target role, see exactly what's missing, and get a personalised weekly study plan.
          </p>
        </div>
        <Link
          to="/skill-gap-analyzer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-colors whitespace-nowrap"
        >
          Analyse My Skills <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
