import { Link } from "react-router-dom";
import { Check, X, ArrowRight, Compass, Sparkles, BarChart3, FileText, HelpCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { getBreadcrumbSchema } from "@/lib/seo";

export default function CareerExplorerAlternative() {
  const comparisonData = [
    {
      feature: "Tech Specialization Focus",
      careerExplorer: "Broad & general (covers healthcare, arts, trades, business)",
      skillTa: "Deeply focused on 60+ specialized modern tech careers & AI roles",
      skillTaAdvantage: true,
    },
    {
      feature: "Actionable 4-Phase Roadmaps",
      careerExplorer: "No (High-level career overviews without step-by-step curricula)",
      skillTa: "Yes (Curated 4-phase progressive roadmaps with hands-on projects)",
      skillTaAdvantage: true,
    },
    {
      feature: "Diagnostic Career Quiz",
      careerExplorer: "Lengthy psychometric assessment (30+ minutes)",
      skillTa: "Fast 10-question AI diagnostic matching skills, mindset & tech domains",
      skillTaAdvantage: true,
    },
    {
      feature: "ATS Resume Reviewer & Rewriter",
      careerExplorer: "No",
      skillTa: "Yes (AI bullet optimizer, ATS score & version control)",
      skillTaAdvantage: true,
    },
    {
      feature: "Skill Gap Analyzer",
      careerExplorer: "No",
      skillTa: "Yes (Pinpoint missing skills for any target role & get bridging plan)",
      skillTaAdvantage: true,
    },
    {
      feature: "2027 Salary Predictor by Country",
      careerExplorer: "US-centric estimates; international data often behind paywalls",
      skillTa: "Verified 2027 benchmarks across 50+ countries with seniority bands",
      skillTaAdvantage: true,
    },
    {
      feature: "Pricing & Full Access",
      careerExplorer: "Basic free tier; in-depth personality reports require paid upgrade",
      skillTa: "100% Free core roadmaps, diagnostic quiz, and career tools",
      skillTaAdvantage: true,
    },
  ];

  const faqs = [
    {
      q: "How does SkillTa differ from CareerExplorer by Sokanu?",
      a: "CareerExplorer is a general psychometric assessment tool that covers hundreds of non-technical industries and locks detailed reports behind paid subscriptions. SkillTa is laser-focused on technology careers, offering 100% free structured 4-phase roadmaps, real-world portfolio projects, an ATS resume optimizer, and 2027 salary benchmarks across 50+ countries.",
    },
    {
      q: "Is SkillTa completely free compared to CareerExplorer?",
      a: "Yes. All 60+ tech career roadmaps, roadmap phase breakdowns, daily career quizzes, skill gap analysis, and global salary predictors on SkillTa are completely free without requiring an expensive membership.",
    },
    {
      q: "Can I use SkillTa if I am transitioning into tech from a non-tech background?",
      a: "Absolutely. SkillTa is designed specifically for career switchers and students. The AI Career Diagnostic Quiz evaluates your problem-solving style and interests to suggest the smoothest tech entry points, while the Skill Gap Analyzer shows exactly what you need to learn next.",
    },
    {
      q: "Are SkillTa's salary benchmarks updated for 2027?",
      a: "Yes. SkillTa evaluates verified market compensation data, remote tech adjustments, and inflation-aligned 2027 salary bands across 50+ countries and global tech hubs.",
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
        title="SkillTa vs CareerExplorer (2027) — Best Tech Career Guidance Alternative"
        description="Looking for a CareerExplorer alternative? Compare SkillTa vs CareerExplorer. Discover free structured tech roadmaps, fast AI career diagnosis, ATS resume scoring, and 2027 salary data across 50+ countries."
        keywords="careerexplorer alternative, skillta vs careerexplorer, free career test tech, career quiz software engineer, tech career roadmaps 2027"
        path="/vs/careerexplorer"
        jsonLd={[
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Alternatives", path: "/vs/careerexplorer" },
            { name: "SkillTa vs CareerExplorer", path: "/vs/careerexplorer" },
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
          <span className="text-foreground font-medium">SkillTa vs CareerExplorer</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Platform Comparison 2027
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight leading-tight">
            SkillTa vs CareerExplorer: <br className="hidden sm:inline" />
            <span className="text-gradient">Which Platform is Right for You?</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Comparing general psychometric tests against an actionable, tech-specialized career guidance suite. Discover why software engineers, students, and tech switchers choose SkillTa.
          </p>
        </div>

        {/* Quick Verdict Box */}
        <div className="max-w-4xl mx-auto mb-16 p-6 sm:p-8 rounded-2xl bg-gradient-card border border-border shadow-xs">
          <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <Compass className="w-5 h-5 text-primary" /> The Quick Verdict
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed text-muted-foreground">
            <div className="p-4 rounded-xl bg-background/50 border border-border/60">
              <p className="font-semibold text-foreground mb-1">Choose CareerExplorer if:</p>
              <p>
                You are completely undecided across general industries (like medicine, hospitality, law, or arts) and want an extensive 30-minute psychometric personality assessment.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
              <p className="font-semibold text-foreground mb-1">Choose SkillTa if:</p>
              <p>
                You want actionable tech guidance: a fast 10-question AI diagnostic, 60+ structured 4-phase tech roadmaps with portfolio projects, an ATS resume reviewer, and localized 2027 global salaries.
              </p>
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison Table */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Feature-by-Feature Comparison</h2>
            <p className="text-sm text-muted-foreground">How SkillTa and CareerExplorer compare across career discovery capabilities</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="py-4 px-5 font-semibold text-foreground">Capability</th>
                  <th className="py-4 px-5 font-semibold text-muted-foreground">CareerExplorer</th>
                  <th className="py-4 px-5 font-semibold text-primary bg-primary/5">SkillTa (2027)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-5 font-medium text-foreground">{row.feature}</td>
                    <td className="py-4 px-5 text-muted-foreground">
                      <div className="flex items-start gap-2">
                        {row.careerExplorer.startsWith("No") ? (
                          <X className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                        ) : (
                          <Check className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                        )}
                        <span>{row.careerExplorer}</span>
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
            Why Aspiring Tech Professionals Choose SkillTa
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-card border border-border flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-foreground text-base mb-2">Fast Tech Diagnostics</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Instead of generic personality questions, SkillTa’s 10-question quiz evaluates your technical problem-solving style to find your top tech roles with transparent match metrics.
                </p>
              </div>
              <Link to="/quiz" className="mt-6 inline-flex items-center text-xs font-semibold text-primary hover:underline">
                Take the Free Quiz <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-foreground text-base mb-2">Built-in ATS Resume Reviewer</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Discovering a career path is only the first step. SkillTa helps you tailor your resume, calculate ATS compatibility, and optimize bullet points for technical recruiters.
                </p>
              </div>
              <Link to="/resume-reviewer" className="mt-6 inline-flex items-center text-xs font-semibold text-primary hover:underline">
                Review Your Resume <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-foreground text-base mb-2">50+ Country 2027 Salaries</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Explore localized developer salary benchmarks across entry, mid-level, and senior tiers in 50+ countries without paywalled premium reports.
                </p>
              </div>
              <Link to="/salary-predictor" className="mt-6 inline-flex items-center text-xs font-semibold text-primary hover:underline">
                Estimate 2027 Salary <ArrowRight className="w-3.5 h-3.5 ml-1" />
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
            <p className="text-sm text-muted-foreground">Everything you need to know about SkillTa vs CareerExplorer</p>
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
            Ready to Find Your Ideal Tech Career Path?
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto mb-8">
            Take the free 2-minute AI career quiz, get matched with verified 2027 roadmaps, and start building your future in tech today.
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
