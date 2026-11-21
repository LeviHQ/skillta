import { Link } from "react-router-dom";
import { Check, X, ArrowRight, Compass, Sparkles, BarChart3, FileText, HelpCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { getBreadcrumbSchema } from "@/lib/seo";

export default function CodingBootcampAlternative() {
  const comparisonData = [
    {
      feature: "Cost & Tuition",
      bootcamp: "$10,000 – $25,000+ (or 15-20% Income Share Agreements)",
      skillTa: "100% Free core roadmaps, career quiz, and diagnostic tools",
      skillTaAdvantage: true,
    },
    {
      feature: "Learning Schedule",
      bootcamp: "Rigid, full-time cohort schedule (hard for working professionals)",
      skillTa: "100% Self-paced 4-phase curriculum that adapts to your life",
      skillTaAdvantage: true,
    },
    {
      feature: "Curriculum Breadth",
      bootcamp: "Usually limited to fullstack web dev or basic data analytics",
      skillTa: "60+ specialized tech roadmaps (AI/ML, DevOps, Cyber, Cloud, etc.)",
      skillTaAdvantage: true,
    },
    {
      feature: "Hands-on Portfolio Projects",
      bootcamp: "Generic cohort projects that every graduate shares",
      skillTa: "Curated real-world milestone projects for distinct resume portfolios",
      skillTaAdvantage: true,
    },
    {
      feature: "AI Diagnostic Career Quiz",
      bootcamp: "High-pressure sales calls & admissions quota tests",
      skillTa: "Unbiased 10-question AI diagnostic matching mindset and tech fit",
      skillTaAdvantage: true,
    },
    {
      feature: "ATS Resume Optimization",
      bootcamp: "Generic career advisor review templates",
      skillTa: "Interactive AI bullet optimizer, ATS score, and version control",
      skillTaAdvantage: true,
    },
    {
      feature: "Global 2027 Salary Transparency",
      bootcamp: "Cherry-picked US-only median graduation salaries",
      skillTa: "Verified 2027 benchmarks across 50+ countries with seniority bands",
      skillTaAdvantage: true,
    },
  ];

  const faqs = [
    {
      q: "Can I realistically land a tech job using SkillTa instead of an expensive coding bootcamp?",
      a: "Yes. In 2027, hiring managers care about demonstrated skills, GitHub projects, and problem-solving ability over bootcamp certificates. SkillTa gives you structured 4-phase roadmaps, production-grade project ideas, and an ATS resume optimizer to build a competitive portfolio without taking on $15,000+ debt.",
    },
    {
      q: "Why are so many developers switching away from traditional coding bootcamps?",
      a: "Traditional bootcamps charge tens of thousands of dollars for fast-paced, 12-week cramming sessions with high burnout and cookie-cutter portfolios. SkillTa allows you to master modern tech stacks at your own pace, explore emerging AI and cloud specializations, and keep 100% of your future salary without restrictive income-share agreements.",
    },
    {
      q: "How does SkillTa keep me accountable without a cohort instructor?",
      a: "SkillTa breaks every roadmap into 4 distinct phases with clear milestone checkpoints, actionable recommended resources, real-world portfolio requirements, and a Skill Gap Analyzer to test your readiness before applying.",
    },
    {
      q: "Is SkillTa really 100% free?",
      a: "Yes. All 60+ tech career roadmaps, roadmap phase breakdowns, daily career quizzes, skill gap analysis, and global salary predictors on SkillTa are completely free to use.",
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
        title="SkillTa vs Coding Bootcamps (2027) — Free Self-Paced Developer Roadmaps"
        description="Looking for an alternative to $15,000 coding bootcamps? Compare SkillTa vs Coding Bootcamps. Get 100% free structured 4-phase roadmaps, AI career diagnosis, ATS resume scoring, and 2027 salary data."
        keywords="coding bootcamp alternative, free coding bootcamp alternative, self taught developer vs bootcamp 2027, learn coding free, tech career roadmaps"
        path="/vs/coding-bootcamps"
        jsonLd={[
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Alternatives", path: "/vs/coding-bootcamps" },
            { name: "SkillTa vs Coding Bootcamps", path: "/vs/coding-bootcamps" },
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
          <span className="text-foreground font-medium">SkillTa vs Coding Bootcamps</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Platform Comparison 2027
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight leading-tight">
            SkillTa vs Coding Bootcamps: <br className="hidden sm:inline" />
            <span className="text-gradient">Skip the $15,000 Debt, Keep the Career Growth</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Comparing high-cost, high-pressure 12-week coding bootcamps against a flexible, free, AI-guided career suite. Discover how self-directed learners build standout portfolios in 2027.
          </p>
        </div>

        {/* Quick Verdict Box */}
        <div className="max-w-4xl mx-auto mb-16 p-6 sm:p-8 rounded-2xl bg-gradient-card border border-border shadow-xs">
          <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <Compass className="w-5 h-5 text-primary" /> The Quick Verdict
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed text-muted-foreground">
            <div className="p-4 rounded-xl bg-background/50 border border-border/60">
              <p className="font-semibold text-foreground mb-1">Choose a Coding Bootcamp if:</p>
              <p>
                You have $15,000+ in discretionary budget, can dedicate 60 hours per week strictly on a rigid cohort schedule, and thrive exclusively in live classroom settings.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
              <p className="font-semibold text-foreground mb-1">Choose SkillTa if:</p>
              <p>
                You want structured, self-paced mastery with zero debt: 60+ in-depth 4-phase tech roadmaps, real portfolio projects, AI resume optimization, and localized 2027 global salaries.
              </p>
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison Table */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Feature-by-Feature Comparison</h2>
            <p className="text-sm text-muted-foreground">See how SkillTa compares against traditional $10,000–$25,000 bootcamps</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="py-4 px-5 font-semibold text-foreground">Factor</th>
                  <th className="py-4 px-5 font-semibold text-muted-foreground">Traditional Bootcamps</th>
                  <th className="py-4 px-5 font-semibold text-primary bg-primary/5">SkillTa (2027)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-5 font-medium text-foreground">{row.feature}</td>
                    <td className="py-4 px-5 text-muted-foreground">
                      <div className="flex items-start gap-2">
                        {row.bootcamp.startsWith("$") || row.bootcamp.startsWith("Rigid") ? (
                          <X className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                        ) : (
                          <Check className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                        )}
                        <span>{row.bootcamp}</span>
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
            Why Self-Directed Developers Win With SkillTa
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-card border border-border flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-foreground text-base mb-2">Zero Tuition Debt</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Never sign away 15% of your future earnings or take predatory loans. Master fullstack, devops, or AI engineering 100% free on your own timeline.
                </p>
              </div>
              <Link to="/roadmaps" className="mt-6 inline-flex items-center text-xs font-semibold text-primary hover:underline">
                Explore 60+ Roadmaps <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-foreground text-base mb-2">Real Job Readiness</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Stand out from thousands of identical bootcamp clone projects with distinct milestone portfolios, ATS resume scoring, and targeted skill gap analysis.
                </p>
              </div>
              <Link to="/resume-reviewer" className="mt-6 inline-flex items-center text-xs font-semibold text-primary hover:underline">
                Score Your Resume <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-foreground text-base mb-2">Global 2027 Salary Bands</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Understand real developer compensation across 50+ countries. Filter by experience level and tech specialization to negotiate with confidence.
                </p>
              </div>
              <Link to="/salary-predictor" className="mt-6 inline-flex items-center text-xs font-semibold text-primary hover:underline">
                Check 2027 Salaries <ArrowRight className="w-3.5 h-3.5 ml-1" />
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
            <p className="text-sm text-muted-foreground">Everything you need to know about self-learning vs coding bootcamps</p>
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
            Start Learning Tech at Your Own Pace Today
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto mb-8">
            Take the free 2-minute AI career quiz, follow step-by-step 4-phase curricula, and build job-ready portfolios without spending thousands.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/quiz"
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm"
            >
              Start Free Career Quiz <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/roadmaps"
              className="px-6 py-3 rounded-xl bg-muted/70 text-foreground font-semibold text-sm hover:bg-muted transition-colors border border-border"
            >
              Explore 60+ Roadmaps
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
