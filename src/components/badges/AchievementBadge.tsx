import { forwardRef } from "react";
import { Award, CheckCircle2, Compass, Sparkles, Target} from "lucide-react";
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

                        <div className="mt-3 flex items-center gap-3.5 text-left">
              <div className="relative shrink-0">
                <div className="absolute -inset-1.5 rounded-full border border-primary/30" />
                {userPhoto ? (
                  <img src={userPhoto} alt="" className="relative h-14 w-14 rounded-full border-2 border-primary object-cover" crossOrigin="anonymous" referrerPolicy="no-referrer" />
                ) : (
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary bg-secondary text-base font-bold text-primary">
                    {initials(userName)}
                  </div>
                )}
                <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground">
                  <CheckCircle2 className="h-3 w-3" />
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground truncate">
                  {userName || "SkillTa Explorer"}
                </p>
                <h2 className="mt-0.5 text-[18px] font-bold leading-tight text-foreground truncate">
                  {isQuiz ? "Career Match Milestone" : "Resume Readiness Milestone"}
                </h2>
              </div>
            </div>

                        <div className="mt-3 grid grid-cols-[1fr_105px] gap-2.5">
              <div className="flex flex-col justify-between rounded-md border border-border bg-card/75 p-3">
                <div className="flex items-center gap-1.5 text-primary">
                  {isQuiz ? <Compass className="h-3.5 w-3.5" /> : <Target className="h-3.5 w-3.5" />}
                  <span className="text-[8px] font-semibold uppercase tracking-[0.15em]">
                    {isQuiz ? "Best-fit path" : "Target role"}
                  </span>
                </div>
                <p className="my-1 text-[16px] font-bold leading-tight text-foreground line-clamp-1">{title}</p>
                <p className="line-clamp-1 text-[9px] text-muted-foreground">
                  {isQuiz ? career?.tagline : resume?.verdict}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center rounded-md border border-primary/30 bg-primary/10 p-2">
                <span className="text-[34px] font-bold leading-none text-primary">{score}%</span>
                <span className="mt-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {isQuiz ? "Match score" : "ATS score"}
                </span>
              </div>
            </div>

                        <div className="mt-2.5 rounded-md border border-accent/30 bg-accent/10 px-3 py-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-accent">
                  <Award className="h-3.5 w-3.5" />
                  <span className="text-[8px] font-semibold uppercase tracking-[0.15em]">Achievement rank</span>
                </div>
                <Sparkles className="h-3.5 w-3.5 text-primary" />
              </div>
              <div className="mt-1 flex items-baseline justify-between">
                <p className="text-[18px] font-bold text-foreground">{rank}</p>
                <p className="text-[8px] text-muted-foreground">
                  {isQuiz ? "Career clarity unlocked" : "Resume readiness unlocked"}
                </p>
              </div>
            </div>

                        <footer className="mt-auto flex items-center justify-between border-t border-border/70 pt-2.5">
              <div>
                <p className="text-[8px] text-muted-foreground">Earned on {dateLabel}</p>
              </div>
              <p className="text-[12px] font-bold text-primary">skillta.tech</p>
            </footer>
          </div>
        </div>
      </div>
    );
  },
);

AchievementBadge.displayName = "AchievementBadge";