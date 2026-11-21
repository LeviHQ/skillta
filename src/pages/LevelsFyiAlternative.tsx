import { Link } from "react-router-dom";
import { Check, X, ArrowRight, Compass, Sparkles, BarChart3, FileText, HelpCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { getBreadcrumbSchema } from "@/lib/seo";

export default function LevelsFyiAlternative() {
  const comparisonData = [
    {
      feature: "Actionable Learning Roadmaps",
      levelsFyi: "No (Purely a passive compensation database)",
      skillTa: "Yes (60+ structured 4-phase tech roadmaps with real milestone projects)",
      skillTaAdvantage: true,
    },
    {
      feature: "2027 Salary Predictor by Country",
      levelsFyi: "Heavily skewed toward US Big Tech (FAANG / Silicon Valley)",
      skillTa: "Verified 2027 benchmarks across 50+ countries with regional purchasing power",
      skillTaAdvantage: true,
    },
    {
      feature: "AI Career Guidance Diagnostic Quiz",
      levelsFyi: "No",
      skillTa: "10-question AI diagnostic matching mindset, interests & top tech roles",
      skillTaAdvantage: true,
    },
    {
      feature: "Skill Gap Analyzer",
      levelsFyi: "No",
      skillTa: "Yes (Pinpoint missing competencies for target roles & bridge them)",
      skillTaAdvantage: true,
    },
    {
      feature: "ATS Resume Reviewer & Rewriter",
      levelsFyi: "Paid human resume reviews ($200–$500+)",
      skillTa: "100% Free instant AI bullet optimization, ATS scoring & version history",
      skillTaAdvantage: true,
    },
    {
      feature: "Salary Data Directly Linked to Roadmaps",
      levelsFyi: "No (Disconnected salary submissions)",
      skillTa: "Yes (Every career and roadmap phase shows real localized compensation)",
      skillTaAdvantage: true,
    },
    {
      feature: "Core Platform Pricing",
      levelsFyi: "Free salary browsing; expensive coaching and negotiation services",
      skillTa: "100% Free core roadmaps, diagnostic quiz, and developer career tools",
      skillTaAdvantage: true,
    },
  ];

  const faqs = [
    {
      q: "How does SkillTa compare to Levels.fyi for developer salaries?",
      a: "Levels.fyi is an excellent crowd-sourced salary board primarily focused on US Big Tech and Silicon Valley tech compensation. SkillTa takes compensation data further by offering verified 2027 salary benchmarks across 50+ countries and directly connecting those salary bands to actionable 4-phase learning roadmaps, AI career quizzes, and ATS resume optimization.",
    },
    {
      q: "Can SkillTa help me reach the high salaries reported on Levels.fyi?",
      a: "Yes. While Levels.fyi only tells you what others are earning, SkillTa shows you how to get there. Our 4-phase roadmaps guide you through the exact technical competencies, architecture concepts, and milestone portfolio projects needed to qualify for senior, high-compensating tech roles.",
    },
    {
      q: "Are SkillTa's salary estimates realistic for developers outside the United States?",
      a: "Yes. Unlike platforms dominated by US FAANG submissions, SkillTa models verified 2027 tech compensation data across 50+ countries, including India, Germany, the UK, Canada, Australia, Singapore, and emerging tech markets, segmented by junior, mid, and senior tiers.",
    },
    {
      q: "Is SkillTa's salary predictor and resume tool free?",
      a: "Yes. All 60+ tech career roadmaps, roadmap phase breakdowns, daily career quizzes, skill gap analysis, and global salary predictors on SkillTa are completely free to use without paying for expensive coaching packages.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-gradient-hero relative">
      <SEOHead
        title="SkillTa vs Levels.fyi (2027) — Tech Salaries Connected to Real Roadmaps"
        description="Comparing Levels.fyi vs SkillTa. Discover verified 2027 developer salary data across 50+ countries directly connected to actionable 4-phase roadmaps, AI career quiz, and free ATS resume scoring."
        keywords="levels fyi alternative, skillta vs levels fyi, tech salary predictor 2027, global developer compensation, software engineer salaries by country"
        path="/vs/levels-fyi"
        jsonLd={[
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Alternatives", path: "/vs/levels-fyi" },
            { name: "SkillTa vs Levels.fyi", path: "/vs/levels-fyi" },
          ]),
          faqSchema,
        ]}
      />

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center justify-start gap-1.5 text-left text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span className="mx-1.5">/</span>
          <span className="text-muted-foreground">Alternatives</span>
          <span className="mx-1.5">/</span>
          <span className="text-foreground font-medium">SkillTa vs Levels.fyi</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Platform Comparison 2027
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight leading-tight">
            SkillTa vs Levels.fyi: <br className="hidden sm:inline" />
            <span className="text-gradient">From Knowing Salaries to Actually Earning Them</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Comparing passive US-centric salary boards against an end-to-end career execution platform. Discover how SkillTa pairs verified 2027 global compensation data with step-by-step technical roadmaps.
          </p>
        </div>

        {/* Quick Verdict Box */}
        <div className="max-w-4xl mx-auto mb-16 p-6 sm:p-8 rounded-2xl bg-gradient-card border border-border shadow-xs">
          <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <Compass className="w-5 h-5 text-primary" /> The Quick Verdict
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed text-muted-foreground">
            <div className="p-4 rounded-xl bg-background/50 border border-border/60">
              <p className="font-semibold text-foreground mb-1">Choose Levels.fyi if:</p>
              <p>
                You are currently interviewing at a Tier-1 US tech company (Meta, Google, Amazon) and strictly need specific crowdsourced negotiation data points for US compensation packages.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
              <p className="font-semibold text-foreground mb-1">Choose SkillTa if:</p>
              <p>
                You want the complete roadmap to bridge skill gaps: verified 2027 salary benchmarks across 50+ countries, an AI Career Quiz, progressive 4-phase curricula, and a free ATS resume optimizer.
              </p>
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison Table */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Feature-by-Feature Comparison</h2>
            <p className="text-sm text-muted-foreground">How SkillTa and Levels.fyi compare across career intelligence and preparation</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="py-4 px-5 font-semibold text-foreground">Capability</th>
                  <th className="py-4 px-5 font-semibold text-muted-foreground">Levels.fyi</th>
                  <th className="py-4 px-5 font-semibold text-primary bg-primary/5">SkillTa (2027)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-5 font-medium text-foreground">{row.feature}</td>
                    <td className="py-4 px-5 text-muted-foreground">
                      <div className="flex items-start gap-2">
                        {row.levelsFyi.startsWith("No") || row.levelsFyi.startsWith("Paid") ? (
                          <X className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                        ) : (
                          <Check className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                        )}
                        <span>{row.levelsFyi}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 bg-primary/5 text-foreground font-medium">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{row.skillTa}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Deep Dive Pillars */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-10">
            Why Modern Engineers Choose SkillTa for Career Growth
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-card border border-border flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-foreground text-base mb-2">Salaries Linked to Skills</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Don’t just stare at salary numbers. SkillTa tells you exactly what languages, cloud stacks, and architectural competencies qualify you for each compensation tier.
                </p>
              </div>
              <Link to="/salary-predictor" className="mt-6 inline-flex items-center text-xs font-semibold text-primary hover:underline">
                Explore 2027 Salaries <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-foreground text-base mb-2">Actionable 4-Phase Roadmaps</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Follow structured curricula from basic foundations to production projects across 60+ tech roles including AI/ML, DevOps, Cybersecurity, and Cloud.
                </p>
              </div>
              <Link to="/roadmaps" className="mt-6 inline-flex items-center text-xs font-semibold text-primary hover:underline">
                View 60+ Roadmaps <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-foreground text-base mb-2">Free ATS Resume Reviewer</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Instead of paying $300+ for resume consulting, use SkillTa’s instant AI resume reviewer to optimize bullet points, compute ATS match scores, and track versions.
                </p>
              </div>
              <Link to="/resume-reviewer" className="mt-6 inline-flex items-center text-xs font-semibold text-primary hover:underline">
                Score Your Resume <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 text-primary" /> Frequently Asked Questions
            </h2>
            <p className="text-sm text-muted-foreground">Everything you need to know about SkillTa vs Levels.fyi</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="p-5 sm:p-6 rounded-2xl bg-card border border-border">
                <h3 className="font-semibold text-foreground text-base mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="max-w-4xl mx-auto text-center p-8 sm:p-12 rounded-3xl bg-gradient-card border border-primary/20 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Know Your Worth. Build the Skills to Claim It.
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto mb-8">
            Check verified 2027 global salaries across 50+ countries, take the free AI career quiz, and follow step-by-step engineering roadmaps today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/salary-predictor"
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm"
            >
              Explore 2027 Salaries <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/quiz"
              className="px-6 py-3 rounded-xl bg-muted/70 text-foreground font-semibold text-sm hover:bg-muted transition-colors border border-border"
            >
              Start Free Career Quiz
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
