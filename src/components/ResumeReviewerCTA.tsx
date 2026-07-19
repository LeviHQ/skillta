import { Link } from "react-router-dom";
import { FileText, ArrowRight, Sparkles } from "lucide-react";

/**
 * Compact internal-linking CTA that funnels traffic to /resume-reviewer.
 * Drop on any page (results, roadmaps, blog posts, salary predictor, etc.)
 */
export default function ResumeReviewerCTA({ variant = "default" }: { variant?: "default" | "inline" }) {
  if (variant === "inline") {
    return (
      <Link
        to="/resume-reviewer"
        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold underline underline-offset-4"
      >
        <FileText className="w-4 h-4" />
        Get a free AI resume review
        <ArrowRight className="w-4 h-4" />
      </Link>
    );
  }

  return (
    <div className="my-8 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-background to-accent/5 p-6 md:p-7 relative overflow-hidden">
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="relative flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
          <FileText className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary/80 font-semibold mb-1">
            <Sparkles className="w-3 h-3" /> Free · AI-powered
          </div>
          <h4 className="text-lg md:text-xl font-bold text-foreground">
            Is your resume ready for 2026 hiring?
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            Get an instant AI ATS score, missing keywords and bullet rewrites — tuned for tech recruiters.
          </p>
        </div>
        <Link
          to="/resume-reviewer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors whitespace-nowrap"
        >
          Review My Resume <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
