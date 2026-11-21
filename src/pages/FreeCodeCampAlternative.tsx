import { Link } from "react-router-dom";
import { Check, X, ArrowRight, Compass, Sparkles, BarChart3, FileText, HelpCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { getBreadcrumbSchema } from "@/lib/seo";

export default function FreeCodeCampAlternative() {
  const comparisonData = [
    {
      feature: "Scope of Tech Specializations",
      freeCodeCamp: "Primarily early-stage web development & introductory data analysis",
      skillTa: "60+ specialized paths (AI/ML, DevOps, Cybersecurity, Cloud, Backend, etc.)",
      skillTaAdvantage: true,
    },
    {
      feature: "4-Phase Progressive Curricula",
      freeCodeCamp: "In-browser micro-exercises & test suites",
      skillTa: "Curated 4-phase progressive roadmaps with local IDE & production workflows",
      skillTaAdvantage: true,
    },
    {
      feature: "AI Career Guidance Diagnostic Quiz",
      freeCodeCamp: "No (User must self-select where to start)",
      skillTa: "10-question AI diagnostic matching mindset, interests & top tech roles",
      skillTaAdvantage: true,
    },
    {
      feature: "ATS Resume Reviewer & Rewriter",
      freeCodeCamp: "No",
      skillTa: "Yes (AI bullet optimizer, ATS score & resume version control)",
      skillTaAdvantage: true,
    },
    {
      feature: "Skill Gap Analyzer",
      freeCodeCamp: "No",
      skillTa: "Yes (Pinpoint missing skills for any target role & bridge them)",
      skillTaAdvantage: true,
    },
    {
      feature: "2027 Salary Predictor by Country",
      freeCodeCamp: "No",
      skillTa: "Verified 2027 benchmarks across 50+ countries with seniority tiers",
      skillTaAdvantage: true,
    },
    {
      feature: "Pricing & Community Philosophy",
      freeCodeCamp: "100% Free & non-profit donor supported",
      skillTa: "100% Free core roadmaps, diagnostic quiz, and developer career tools",
      skillTaAdvantage: false,
    },
  ];

  const faqs = [
    {
      q: "How does SkillTa differ from freeCodeCamp?",
      a: "freeCodeCamp is fantastic for absolute beginners typing their very first lines of HTML, CSS, and JavaScript in an interactive browser sandbox. SkillTa is designed for career progression and specialization—offering 60+ progressive 4-phase roadmaps covering AI engineering, cloud, devops, and cybersecurity, alongside an ATS Resume Reviewer, Skill Gap Analyzer, and 2027 global salary data.",
    },
    {
      q: "Can I use freeCodeCamp and SkillTa together?",
      a: "Yes! Many aspiring engineers start on freeCodeCamp to grasp initial syntax and programming fundamentals, and then transition to SkillTa to find their exact specialization with the AI Career Quiz, build production-grade milestone projects in local development environments, and optimize their ATS resumes.",
    },
    {
      q: "Why do learners move from browser-based exercises to SkillTa roadmaps?",
      a: "Browser exercises test isolated syntax, but real engineering jobs require working in local IDEs, using Git version control, structuring cloud architectures, and deploying full applications. SkillTa’s roadmaps train you for actual engineering workflows rather than sandboxed multiple-choice tests.",
    },
    {
      q: "Is SkillTa free like freeCodeCamp?",
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
        title="SkillTa vs freeCodeCamp (2027) — Specialized Tech Roadmaps & Career Tools"
        description="Looking for a freeCodeCamp alternative? Compare SkillTa vs freeCodeCamp. Discover 60+ specialized tech roadmaps (AI, DevOps, Cyber, Cloud), AI career diagnostic quiz, ATS resume review, and 2027 global salary data."
        keywords="freecodecamp alternative, skillta vs freecodecamp, best free coding roadmaps 2027, learn coding free, tech career roadmaps"
        path="/vs/freecodecamp"
        jsonLd={[
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Alternatives", path: "/vs/freecodecamp" },
            { name: "SkillTa vs freeCodeCamp", path: "/vs/freecodecamp" },
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
          <span className="text-foreground font-medium">SkillTa vs freeCodeCamp</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Platform Comparison 2027
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight leading-tight">
            SkillTa vs freeCodeCamp: <br className="hidden sm:inline" />
            <span className="text-gradient">From Beginner Syntax to 60+ Specialized Tech Careers</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Comparing browser-based syntax drills against specialized 4-phase production roadmaps. Discover why self-taught learners choose SkillTa to advance from basic web tutorials to high-paying engineering roles.
          </p>
        </div>

        {/* Quick Verdict Box */}
        <div className="max-w-4xl mx-auto mb-16 p-6 sm:p-8 rounded-2xl bg-gradient-card border border-border shadow-xs">
          <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <Compass className="w-5 h-5 text-primary" /> The Quick Verdict
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed text-muted-foreground">
            <div className="p-4 rounded-xl bg-background/50 border border-border/60">
              <p className="font-semibold text-foreground mb-1">Choose freeCodeCamp if:</p>
              <p>
                You have never written a line of code in your life and want a gentle, in-browser editor to practice introductory HTML, CSS, and basic JavaScript challenges.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
              <p className="font-semibold text-foreground mb-1">Choose SkillTa if:</p>
              <p>
                You want to progress into specialized modern tech (AI/ML, DevOps, Cybersecurity, Cloud, Backend) with curated 4-phase roadmaps, real portfolio projects, an ATS resume reviewer, and 2027 global salaries.
              </p>
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison Table */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Feature-by-Feature Comparison</h2>
            <p className="text-sm text-muted-foreground">How SkillTa and freeCodeCamp compare across learning depth and career advancement</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="py-4 px-5 font-semibold text-foreground">Capability</th>
                  <th className="py-4 px-5 font-semibold text-muted-foreground">freeCodeCamp</th>
                  <th className="py-4 px-5 font-semibold text-primary bg-primary/5">SkillTa (2027)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-5 font-medium text-foreground">{row.feature}</td>
                    <td className="py-4 px-5 text-muted-foreground">
                      <div className="flex items-start gap-2">
                        {row.freeCodeCamp.startsWith("No") ? (
                          <X className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                        ) : (
                          <Check className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                        )}
                        <span>{row.freeCodeCamp}</span>
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
            Why Modern Developers Graduate to SkillTa
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-card border border-border flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-foreground text-base mb-2">60+ Tech Specializations</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Go far beyond standard web dev tutorials. Explore deep roadmaps for AI Engineering, Cloud Architecture, Site Reliability Engineering, and Cybersecurity.
                </p>
              </div>
              <Link to="/roadmaps" className="mt-6 inline-flex items-center text-xs font-semibold text-primary hover:underline">
                Explore All 60+ Paths <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-foreground text-base mb-2">Built-in ATS Resume Reviewer</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Coding exercises won’t write your resume. SkillTa optimizes your resume bullets for technical keyword matching and gives you actionable score feedback.
                </p>
              </div>
              <Link to="/resume-reviewer" className="mt-6 inline-flex items-center text-xs font-semibold text-primary hover:underline">
                Optimize Your Resume <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-foreground text-base mb-2">50+ Country 2027 Salaries</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Understand real-world compensation before committing to a learning path. See verified developer salary ranges across junior, mid, and senior levels globally.
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
            <p className="text-sm text-muted-foreground">Everything you need to know about SkillTa vs freeCodeCamp</p>
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
            Ready to Specialize Your Tech Career?
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto mb-8">
            Take the free 2-minute AI career quiz, follow step-by-step 4-phase curricula, and build a career-launching portfolio today.
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
