import { ArrowRight, Brain, Check, FileText, GitCommit, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const sampleReports = [
  {
    label: "Career DNA · Sample",
    title: "AI Engineer",
    description: "A role match explained through interests, strengths, work style, and an actionable learning path.",
    Icon: Brain,
    accent: "text-primary",
    border: "group-hover:border-primary/45",
    score: 92,
    width: "w-[92%]",
    scoreLabel: "Career match",
    details: ["Python & analytical thinking", "12-month learning roadmap"],
  },
  {
    label: "Resume Review · Sample",
    title: "Software Engineer Resume",
    description: "A practical ATS audit with prioritized fixes, missing keywords, and stronger bullet suggestions.",
    Icon: FileText,
    accent: "text-accent",
    border: "group-hover:border-accent/45",
    score: 84,
    width: "w-[84%]",
    scoreLabel: "ATS score",
    details: ["6 high-impact improvements", "Role-specific keyword gaps"],
  },
  {
    label: "Version Control · Sample",
    title: "Resume Progress Timeline",
    description: "A Git-style history that keeps every saved resume version, target role, and ATS score easy to revisit.",
    Icon: GitCommit,
    accent: "text-info",
    border: "group-hover:border-info/45",
    score: 18,
    width: "w-[76%]",
    scorePrefix: "+",
    scoreLabel: "Point improvement",
    details: ["Three versions compared", "Previous files ready to download"],
  },
];

export default function SampleResultsSection() {
  return (
    <section id="sample-results" className="scroll-mt-20 border-y border-border bg-card/35 py-20 md:py-24">
      <div className="container mx-auto px-6">
        <div className="mb-12 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-primary/25 bg-primary/5 px-3 py-1.5">
              <Target className="h-3.5 w-3.5 text-primary" />
              <span className="font-mono text-[11px] font-bold uppercase text-primary">
                Preview before you choose
              </span>
            </div>
            <h2 className="text-3xl font-bold leading-tight text-foreground md:text-5xl">
              See what SkillTa gives you,
              <span className="block text-gradient">not just a list of features.</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Explore three representative outputs so you know what your career plan, resume feedback,
              and progress history can look like.
            </p>
          </div>

          <Button asChild size="lg" className="w-fit shadow-glow">
            <a href="#pricing">
              Compare access plans <ArrowRight />
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {sampleReports.map((sample) => (
            <article
              key={sample.label}
              className={`group flex min-h-[390px] flex-col overflow-hidden rounded-lg border border-border bg-card p-6 shadow-card transition-colors duration-300 ${sample.border}`}
            >
              <div className="flex items-center justify-between gap-3 border-b border-border pb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-secondary">
                  <sample.Icon className={`h-5 w-5 ${sample.accent}`} />
                </div>
                <span className="rounded-md border border-border bg-muted px-2.5 py-1 font-mono text-[10px] font-bold uppercase text-muted-foreground">
                  {sample.label}
                </span>
              </div>

              <div className="flex flex-1 flex-col pt-6">
                <p className={`font-mono text-xs font-bold uppercase ${sample.accent}`}>{sample.scoreLabel}</p>
                <div className="mt-1 flex items-end gap-2">
                  <span className="text-5xl font-bold leading-none text-foreground">
                    {sample.scorePrefix}{sample.score}
                  </span>
                  <span className="pb-1 text-sm text-muted-foreground">{sample.scorePrefix ? "points" : "/ 100"}</span>
                </div>

                <div className="my-5 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className={`h-full rounded-full bg-gradient-primary ${sample.width}`} />
                </div>

                <h3 className="text-xl font-bold text-foreground">{sample.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{sample.description}</p>

                <ul className="mt-auto space-y-2 pt-6">
                  {sample.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-2 text-sm text-foreground/85">
                      <Check className="h-4 w-4 shrink-0 text-success" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-7 sm:flex-row">
          <p className="text-center text-xs leading-relaxed text-muted-foreground sm:text-left">
            Illustrative samples. Your results are personalized from the information you provide.
          </p>
          <Button asChild variant="outline">
            <Link to="/quiz">Create my Career DNA report <ArrowRight /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}