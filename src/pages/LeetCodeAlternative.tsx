import { Link } from "react-router-dom";
import { Check, X, ArrowRight, Compass, Sparkles, BarChart3, FileText, HelpCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { getBreadcrumbSchema } from "@/lib/seo";

export default function LeetCodeAlternative() {
  const comparisonData = [
    {
      feature: "Career Preparation Scope",
      leetcode: "Algorithmic puzzles, competitive coding & isolated DSA brainteasers",
      skillTa: "End-to-end career guidance: 4-phase curricula, architecture & projects",
      skillTaAdvantage: true,
    },
    {
      feature: "Real-World Portfolio Projects",
      leetcode: "No (Focused purely on algorithmic function submission tests)",
      skillTa: "Yes (Curated milestone projects for real GitHub portfolios)",
      skillTaAdvantage: true,
    },
    {
      feature: "Career Fit & Role Selection",
      leetcode: "No diagnostic tools (Assumes you know what to study)",
      skillTa: "10-question AI Career Quiz matching mindset, interests & top tech roles",
      skillTaAdvantage: true,
    },
    {
      feature: "ATS Resume Reviewer & Optimizer",
      leetcode: "No",
      skillTa: "Yes (AI bullet rewrites, ATS match score & resume version control)",
      skillTaAdvantage: true,
    },
    {
      feature: "Skill Gap Analyzer",
      leetcode: "No",
      skillTa: "Yes (Pinpoint missing competencies for target roles & bridge the gap)",
      skillTaAdvantage: true,
    },
    {
      feature: "2027 Salary Predictor by Country",
      leetcode: "No",
      skillTa: "Verified 2027 benchmarks across 50+ countries with seniority tiers",
      skillTaAdvantage: true,
    },
    {
      feature: "Cost & Premium Paywalls",
      leetcode: "Freemium ($35/mo or $159/yr for company questions & official solutions)",
      skillTa: "100% Free core roadmaps, diagnostic quiz, and developer career tools",
      skillTaAdvantage: true,
    },
  ];

  const faqs = [
    {
      q: "Is grinding LeetCode alone enough to land a software engineering job in 2027?",
      a: "No. While data structures and algorithms remain useful for certain coding rounds, modern hiring managers in 2027 heavily prioritize practical engineering skills: system design, clean API development, AI integration, deployment pipelines, and strong portfolio projects. LeetCode does not teach you how to build software; SkillTa gives you structured 4-phase roadmaps from fundamentals to production projects.",
    },
    {
      q: "Can I use SkillTa and LeetCode together?",
      a: "Yes. Many developers use SkillTa as their primary career operating system to choose their specialization, master fullstack or backend engineering, optimize their ATS resume, and check salary benchmarks—while using LeetCode selectively for targeted interview problem sets.",
    },
    {
      q: "How does SkillTa help me stand out compared to LeetCode grinders?",
      a: "Thousands of applicants can solve inverted binary trees, but struggle to build a scalable microservice or explain cloud deployment. SkillTa emphasizes real-world milestone projects, production architecture, and tailored resume optimization so your application actually clears ATS filters and technical interviews.",
    },
    {
      q: "Are SkillTa's roadmaps and interview tools free?",
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
        title="SkillTa vs LeetCode (2027) — Beyond the DSA Grind to Real Tech Careers"
        description="Wondering if LeetCode is enough to get hired in 2027? Compare SkillTa vs LeetCode. Get free structured 4-phase tech roadmaps, real portfolio projects, AI career quiz, ATS resume scoring, and global salary data."
        keywords="leetcode alternative, skillta vs leetcode, is leetcode enough to get a job 2027, learn software engineering without leetcode, tech career roadmap"
        path="/vs/leetcode"
        jsonLd={[
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Alternatives", path: "/vs/leetcode" },
            { name: "SkillTa vs LeetCode", path: "/vs/leetcode" },
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
          <span className="text-foreground font-medium">SkillTa vs LeetCode</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Platform Comparison 2027
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight leading-tight">
            SkillTa vs LeetCode: <br className="hidden sm:inline" />
            <span className="text-gradient">Real Software Engineering vs Algorithmic Grinding</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Comparing isolated algorithm puzzles against an end-to-end career guidance platform. Discover how modern developers land top roles by building real software instead of grinding hundreds of DSA problems.
          </p>
        </div>

        {/* Quick Verdict Box */}
        <div className="max-w-4xl mx-auto mb-16 p-6 sm:p-8 rounded-2xl bg-gradient-card border border-border shadow-xs">
          <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <Compass className="w-5 h-5 text-primary" /> The Quick Verdict
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed text-muted-foreground">
            <div className="p-4 rounded-xl bg-background/50 border border-border/60">
              <p className="font-semibold text-foreground mb-1">Choose LeetCode if:</p>
              <p>
                You already have extensive hands-on software development experience and strictly need to drill data structure puzzles for big-tech algorithmic screening rounds.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
              <p className="font-semibold text-foreground mb-1">Choose SkillTa if:</p>
              <p>
                You want a complete career roadmap: finding your best tech domain with an AI quiz, building production-grade portfolio projects, optimizing your ATS resume, and evaluating 2027 salaries in 50+ countries.
              </p>
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison Table */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Feature-by-Feature Comparison</h2>
            <p className="text-sm text-muted-foreground">How SkillTa and LeetCode compare across full-cycle software career preparation</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="py-4 px-5 font-semibold text-foreground">Capability</th>
                  <th className="py-4 px-5 font-semibold text-muted-foreground">LeetCode</th>
                  <th className="py-4 px-5 font-semibold text-primary bg-primary/5">SkillTa (2027)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-5 font-medium text-foreground">{row.feature}</td>
                    <td className="py-4 px-5 text-muted-foreground">
                      <div className="flex items-start gap-2">
                        {row.leetcode.startsWith("No") ? (
                          <X className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                        ) : (
                          <Check className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                        )}
                        <span>{row.leetcode}</span>
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
            Why Hiring in 2027 Has Moved Beyond LeetCode Grinding
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-card border border-border flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-foreground text-base mb-2">Production Engineering Skills</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Companies need engineers who understand CI/CD, cloud architecture, system resilience, and clean API design—not just memoization puzzles.
                </p>
              </div>
              <Link to="/roadmaps" className="mt-6 inline-flex items-center text-xs font-semibold text-primary hover:underline">
                View 60+ Tech Roadmaps <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-foreground text-base mb-2">ATS Resume Screening</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Solving 300 LeetCode problems won’t help if your resume gets discarded by recruiter filters. SkillTa optimizes your resume for actual engineering keywords.
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
                <h3 className="font-bold text-foreground text-base mb-2">Localized Compensation Data</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Understand real market salaries across 50+ countries. Filter by role, seniority, and tech stack to negotiate fair offers.
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
            <p className="text-sm text-muted-foreground">Everything you need to know about SkillTa vs LeetCode</p>
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
            Ready to Build Real-World Engineering Skills?
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto mb-8">
            Take the free 2-minute AI career quiz, follow step-by-step 4-phase curricula, and create standout portfolio projects today.
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
