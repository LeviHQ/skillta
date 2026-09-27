import { forwardRef } from "react";
import { Award, CheckCircle2, Compass, Sparkles, Target, TrendingUp } from "lucide-react";
import { careers } from "@/data/careers";
import { getAchievementRank, QuizBadgePayload, ResumeBadgePayload } from "./types";

interface AchievementBadgeProps {
  type: "quiz" | "resume";
  payload: QuizBadgePayload | ResumeBadgePayload;
  userName?: string | null;
  userPhoto?: string | null;
  createdAt?: string;
  compact?: boolean;
}

const initials = (name?: string | null) =>
  (name || "SkillTa Explorer")
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

export const AchievementBadge = forwardRef<HTMLDivElement, AchievementBadgeProps>(
  ({ type, payload, userName, userPhoto, createdAt, compact = false }, ref) => {
    const isQuiz = type === "quiz";
    const quiz = isQuiz ? (payload as QuizBadgePayload) : null;
    const resume = !isQuiz ? (payload as ResumeBadgePayload) : null;
    const score = quiz?.topMatchPercentage ?? resume?.atsScore ?? 0;
    const rank = getAchievementRank(score);
    const career = quiz ? careers.find((item) => item.id === quiz.topCareer) : null;
    const title = career?.title || resume?.targetRole || resume?.roleFit?.role || "Tech Professional";
    const supportingMatches = quiz?.allResults?.slice(1, 3) ?? [];
    const highlights = resume?.strengths?.slice(0, 3) ?? career?.requiredSkills?.slice(0, 3) ?? [];
    const dateLabel = new Date(createdAt || Date.now()).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    return (
      <div className={compact ? "badge-preview-shell" : "badge-preview-shell badge-preview-shell-featured"}>
        <div ref={ref} className="skillta-badge" aria-label={`${isQuiz ? "Career match" : "Resume readiness"} badge`}>
          <div className="skillta-badge-grid" />
          <div className="skillta-badge-glow skillta-badge-glow-primary" />
          <div className="skillta-badge-glow skillta-badge-glow-accent" />

          <div className="skillta-badge-content">
            <header className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img src="/logo.png" alt="" className="h-8 w-8 rounded-md object-contain" crossOrigin="anonymous" />
                <div>
                  <p className="text-[17px] font-bold leading-none text-foreground">SkillTa</p>
                  <p className="mt-1 text-[8px] uppercase tracking-[0.22em] text-muted-foreground">Verified achievement</p>
                </div>
              </div>
              <div className="rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.18em] text-primary">
                {isQuiz ? "Career DNA" : "Resume IQ"}
              </div>
            </header>

            <div className="mt-10 flex flex-col items-center text-center">
              <div className="relative">
                <div className="absolute -inset-2 rounded-full border border-primary/30" />
                {userPhoto ? (
                  <img src={userPhoto} alt="" className="relative h-20 w-20 rounded-full border-2 border-primary object-cover" crossOrigin="anonymous" referrerPolicy="no-referrer" />
                ) : (
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary bg-secondary text-xl font-bold text-primary">
                    {initials(userName)}
                  </div>
                )}
                <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {userName || "SkillTa Explorer"}
              </p>
              <h2 className="mt-2 max-w-[310px] text-[28px] font-bold leading-[1.08] text-foreground">
                {isQuiz ? "My top career match" : "My resume readiness"}
              </h2>
            </div>

            <div className="mt-7 grid grid-cols-[1fr_122px] gap-3">
              <div className="flex min-h-[132px] flex-col justify-between rounded-md border border-border bg-card/75 p-4">
                <div className="flex items-center gap-2 text-primary">
                  {isQuiz ? <Compass className="h-4 w-4" /> : <Target className="h-4 w-4" />}
                  <span className="text-[9px] font-semibold uppercase tracking-[0.16em]">
                    {isQuiz ? "Best-fit path" : "Target role"}
                  </span>
                </div>
                <p className="mt-3 text-[20px] font-bold leading-tight text-foreground">{title}</p>
                <p className="mt-2 line-clamp-2 text-[10px] leading-relaxed text-muted-foreground">
                  {isQuiz ? career?.tagline : resume?.verdict}
                </p>
              </div>
              <div className="flex min-h-[132px] flex-col items-center justify-center rounded-md border border-primary/30 bg-primary/10">
                <span className="text-[43px] font-bold leading-none text-primary">{score}%</span>
                <span className="mt-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  {isQuiz ? "Match score" : "ATS score"}
                </span>
              </div>
            </div>

            <div className="mt-3 rounded-md border border-accent/30 bg-accent/10 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-accent">
                  <Award className="h-4 w-4" />
                  <span className="text-[9px] font-semibold uppercase tracking-[0.16em]">Achievement rank</span>
                </div>
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <p className="mt-2 text-[24px] font-bold text-foreground">{rank}</p>
              <p className="mt-1 text-[9px] text-muted-foreground">
                {isQuiz ? "Career clarity milestone unlocked" : "Resume readiness milestone unlocked"}
              </p>
            </div>

            <div className="mt-3 rounded-md border border-border bg-card/65 p-4">
              <div className="mb-3 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <TrendingUp className="h-3.5 w-3.5 text-primary" />
                {isQuiz ? "Also worth exploring" : "Standout signals"}
              </div>
              {isQuiz ? (
                <div className="space-y-2">
                  {supportingMatches.map((item) => (
                    <div key={item.careerId} className="flex items-center justify-between text-[11px]">
                      <span className="max-w-[240px] truncate font-medium text-foreground">{item.title}</span>
                      <span className="font-mono font-semibold text-primary">{item.matchPercentage}%</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {highlights.map((item, index) => (
                    <div key={`${item}-${index}`} className="flex items-start gap-2 text-[10px] leading-snug text-foreground">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span className="line-clamp-2">{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <footer className="mt-auto flex items-end justify-between border-t border-border/70 pt-4">
              <div>
                <p className="text-[9px] text-muted-foreground">Earned on {dateLabel}</p>
                <p className="mt-1 text-[11px] font-semibold text-foreground">{isQuiz ? "Discover your path" : "Check your resume readiness"}</p>
              </div>
              <p className="text-[13px] font-bold text-primary">skillta.tech</p>
            </footer>
          </div>
        </div>
      </div>
    );
  },
);

AchievementBadge.displayName = "AchievementBadge";