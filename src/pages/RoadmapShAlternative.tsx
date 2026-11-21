import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, X, ArrowRight, Compass, Sparkles, BarChart3, FileText, HelpCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { getBreadcrumbSchema } from "@/lib/seo";

export default function RoadmapShAlternative() {
  const comparisonData = [
    {
      feature: "Learning Structure",
      roadmapSh: "Open-source mindmaps & visual flowcharts",
      skillTa: "4-Phase progressive curriculum with hands-on projects",
      skillTaAdvantage: true,
    },
    {
      feature: "AI Career Guidance Quiz",
      roadmapSh: "No (User must self-diagnose and pick)",
      skillTa: "Yes (Personalized AI diagnostic matching personality & skills)",
      skillTaAdvantage: true,
    },
    {
      feature: "Skill Gap Analyzer",
      roadmapSh: "No",
      skillTa: "Yes (Pinpoint missing skills & tailored bridge roadmap)",
      skillTaAdvantage: true,
    },
    {
      feature: "ATS Resume Reviewer & Rewriter",
      roadmapSh: "No",
      skillTa: "Yes (AI bullet optimizer, ATS score & version control)",
      skillTaAdvantage: true,
    },
    {
      feature: "2027 Salary Predictor by Country",
      roadmapSh: "No",
      skillTa: "Yes (50+ country benchmarks & global tech city bands)",
      skillTaAdvantage: true,
    },
    {
      feature: "Community Flowchart Trees",
      roadmapSh: "Yes (Extensive community-contributed graphs)",
      skillTa: "Curated catalog of 60+ in-depth verified tech roles",
      skillTaAdvantage: false,
    },
    {
      feature: "Core Access & Tools",
      roadmapSh: "Free / Community-driven",
      skillTa: "100% Free core roadmaps, quizzes & career tools",
      skillTaAdvantage: true,
    },
  ];

  const faqs = [
    {
      q: "Is SkillTa a complete alternative to Roadmap.sh?",
      a: "Yes. While Roadmap.sh focuses primarily on static knowledge-tree flowcharts, SkillTa provides an end-to-end career guidance platform. Beyond roadmaps, SkillTa offers an AI Career Diagnostic Quiz, ATS Resume Reviewer, Skill Gap Analyzer, and verified 2027 salary benchmarks across 50+ countries.",
    },
    {
      q: "Can I use SkillTa and Roadmap.sh together?",
      a: "Absolutely. Many developers explore Roadmap.sh for high-level ecosystem charts and rely on SkillTa to test their fit through the AI Career Quiz, follow phase-by-phase projects, optimize their resumes, and check regional salary potential.",
    },
    {
      q: "Are SkillTa roadmaps free?",
      a: "Yes. All 60+ tech career roadmaps, roadmap phase breakdowns, daily career quizzes, and salary predictors on SkillTa are completely free to use.",
    },
    {
      q: "How does SkillTa ensure roadmaps stay up-to-date for 2027?",
      a: "SkillTa's authored catalog is continuously evaluated against modern hiring criteria, AI workflow adoption, and real-world tech stack shifts across global and regional tech employers.",
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
        title="SkillTa vs Roadmap.sh — Which Developer Career Platform is Right for You? (2027)"
        description="Comprehensive 2027 comparison between SkillTa and Roadmap.sh. Compare learning structures, AI career quizzes, ATS resume reviews, skill gap analysis, and global salary predictors."
        keywords="roadmap sh alternative, skillta vs roadmap.sh, best developer roadmaps, tech career roadmaps 2027, learn coding roadmap"
        path="/vs/roadmap-sh"
        jsonLd={[
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Alternatives", path: "/vs/roadmap-sh" },
            { name: "SkillTa vs Roadmap.sh", path: "/vs/roadmap-sh" },
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
          <span className="text-foreground font-medium">SkillTa vs Roadmap.sh</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Platform Comparison 2027
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight leading-tight">
            SkillTa vs Roadmap.sh: <br className="hidden sm:inline" />
            <span className="text-gradient">Which Platform is Right for You?</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Comparing open-source flowcharts against an AI-powered career guidance suite. Discover how each platform helps software developers and career switchers navigate modern tech careers.
          </p>
        </div>

        {/* Quick Verdict Box */}
        <div className="max-w-4xl mx-auto mb-16 p-6 sm:p-8 rounded-2xl bg-gradient-card border border-border shadow-xs">
          <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <Compass className="w-5 h-5 text-primary" /> The Quick Verdict
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed text-muted-foreground">
            <div className="p-4 rounded-xl bg-background/50 border border-border/60">
              <p className="font-semibold text-foreground mb-1">Choose Roadmap.sh if:</p>
              <p>
                You are already certain of your exact career target and simply want a fast, community-built visual flowchart of programming languages and libraries to reference.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
              <p className="font-semibold text-foreground mb-1">Choose SkillTa if:</p>
              <p>
                You want end-to-end guidance: finding your best fit with an AI Career Quiz, following structured 4-phase roadmaps, fixing your resume with an ATS reviewer, and predicting 2027 market salaries.
              </p>
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison Table */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Feature-by-Feature Comparison</h2>
            <p className="text-sm text-muted-foreground">How SkillTa and Roadmap.sh compare across critical guidance capabilities</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="py-4 px-5 font-semibold text-foreground">Capability</th>
                  <th className="py-4 px-5 font-semibold text-muted-foreground">Roadmap.sh</th>
                  <th className="py-4 px-5 font-semibold text-primary bg-primary/5">SkillTa (2027)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-5 font-medium text-foreground">{row.feature}</td>
                    <td className="py-4 px-5 text-muted-foreground">
                      <div className="flex items-start gap-2">
                        {row.roadmapSh.startsWith("No") ? (
                          <X className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                        ) : (
                          <Check className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                        )}
                        <span>{row.roadmapSh}</span>
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
                <h3 className="font-bold text-foreground text-base mb-2">Diagnostic AI Quiz</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Instead of guessing whether to study Backend or DevOps, SkillTa’s 10-question AI Career Quiz calculates your top career matches with match percentages and honest trade-offs.
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
                <h3 className="font-bold text-foreground text-base mb-2">Integrated Career Tools</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Roadmaps are only one piece of the puzzle. SkillTa includes an AI Resume Reviewer, Resume Version Control, and a Skill Gap Analyzer to prepare you for actual technical interviews.
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
                <h3 className="font-bold text-foreground text-base mb-2">2027 Salary Insights</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Know your worth before you start learning. SkillTa provides real salary bands across 50+ countries and global tech hubs for every single roadmap phase and career role.
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
            <p className="text-sm text-muted-foreground">Everything you need to know about SkillTa and Roadmap.sh</p>
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
