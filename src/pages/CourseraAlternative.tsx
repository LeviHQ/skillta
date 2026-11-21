import { Link } from "react-router-dom";
import { Check, X, ArrowRight, Compass, Sparkles, BarChart3, FileText, HelpCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { getBreadcrumbSchema } from "@/lib/seo";

export default function CourseraAlternative() {
  const comparisonData = [
    {
      feature: "Learning Delivery",
      coursera: "Passive 30-50 hour pre-recorded video lectures & academic slides",
      skillTa: "Actionable 4-phase milestone roadmaps focused on hands-on building",
      skillTaAdvantage: true,
    },
    {
      feature: "Certificates & Cost",
      coursera: "Paywalled certificates ($49/month or $399/year Coursera Plus)",
      skillTa: "100% Free core roadmaps, career quiz, and developer career tools",
      skillTaAdvantage: true,
    },
    {
      feature: "Completion Velocity",
      coursera: "Low completion rates due to video fatigue and academic pacing",
      skillTa: "Fast progressive phase milestones designed for steady self-directed mastery",
      skillTaAdvantage: true,
    },
    {
      feature: "AI Career Guidance Quiz",
      coursera: "Generic course recommendations based on browsing clicks",
      skillTa: "10-question AI diagnostic matching mindset, interests & top tech roles",
      skillTaAdvantage: true,
    },
    {
      feature: "ATS Resume Reviewer & Rewriter",
      coursera: "No",
      skillTa: "Yes (AI bullet optimizer, ATS score & resume version control)",
      skillTaAdvantage: true,
    },
    {
      feature: "Skill Gap Analyzer",
      coursera: "No",
      skillTa: "Yes (Pinpoint missing competencies for any target role & bridge them)",
      skillTaAdvantage: true,
    },
    {
      feature: "2027 Salary Predictor by Country",
      coursera: "No",
      skillTa: "Verified 2027 benchmarks across 50+ countries with seniority tiers",
      skillTaAdvantage: true,
    },
  ];

  const faqs = [
    {
      q: "Are Coursera certificates worth paying for in 2027?",
      a: "In 2027, technical recruiters and engineering managers rarely filter by online video course certificates. Instead, they look at verifiable GitHub repositories, deployed applications, clean architecture, and technical interview performance. SkillTa focuses 100% on building real-world milestone projects and optimizing your ATS resume rather than selling certificates.",
    },
    {
      q: "How does SkillTa prevent video tutorial hell compared to Coursera?",
      a: "Tutorial hell occurs when you watch hundreds of hours of video without building independently. SkillTa replaces passive video marathons with structured 4-phase progressive roadmaps, curating official documentation and challenging you with milestone projects at every stage.",
    },
    {
      q: "Can I use Coursera courses alongside SkillTa?",
      a: "Yes. Many learners use SkillTa as their high-level career roadmap and progression tracker to know what skills to learn, using specific video tutorials or documentation when they need deep dives into particular syntax or libraries.",
    },
    {
      q: "Are SkillTa's roadmaps and tools completely free?",
      a: "Yes. All 60+ tech career roadmaps, roadmap phase breakdowns, daily career quizzes, skill gap analysis, and global salary predictors on SkillTa are completely free without subscription paywalls.",
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
        title="SkillTa vs Coursera (2027) — Free Actionable Developer Roadmaps vs Video Courses"
        description="Looking for a Coursera alternative? Compare SkillTa vs Coursera. Skip 40-hour video lectures and expensive certificates for free structured 4-phase tech roadmaps, ATS resume reviews, and 2027 salary data."
        keywords="coursera alternative, skillta vs coursera, are coursera certificates worth it 2027, free developer roadmap vs courses, learn tech free"
        path="/vs/coursera"
        jsonLd={[
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Alternatives", path: "/vs/coursera" },
            { name: "SkillTa vs Coursera", path: "/vs/coursera" },
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
          <span className="text-foreground font-medium">SkillTa vs Coursera</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Platform Comparison 2027
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight leading-tight">
            SkillTa vs Coursera: <br className="hidden sm:inline" />
            <span className="text-gradient">Actionable Tech Roadmaps vs 40-Hour Video Lectures</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Comparing long, passive video marathons against progressive 4-phase project curricula. Discover why developers escape tutorial hell with SkillTa’s free execution suite.
          </p>
        </div>

        {/* Quick Verdict Box */}
        <div className="max-w-4xl mx-auto mb-16 p-6 sm:p-8 rounded-2xl bg-gradient-card border border-border shadow-xs">
          <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <Compass className="w-5 h-5 text-primary" /> The Quick Verdict
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed text-muted-foreground">
            <div className="p-4 rounded-xl bg-background/50 border border-border/60">
              <p className="font-semibold text-foreground mb-1">Choose Coursera if:</p>
              <p>
                You prefer academic university lecture series, want formal academic credits, and don't mind paying monthly subscriptions for certificate badges.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
              <p className="font-semibold text-foreground mb-1">Choose SkillTa if:</p>
              <p>
                You want to escape tutorial fatigue with structured, project-driven 4-phase roadmaps, take an AI career diagnostic quiz, optimize your ATS resume, and check 2027 salaries in 50+ countries for free.
              </p>
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison Table */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Feature-by-Feature Comparison</h2>
            <p className="text-sm text-muted-foreground">How SkillTa and Coursera compare across learning methodology and career tools</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="py-4 px-5 font-semibold text-foreground">Capability</th>
                  <th className="py-4 px-5 font-semibold text-muted-foreground">Coursera</th>
                  <th className="py-4 px-5 font-semibold text-primary bg-primary/5">SkillTa (2027)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-5 font-medium text-foreground">{row.feature}</td>
                    <td className="py-4 px-5 text-muted-foreground">
                      <div className="flex items-start gap-2">
                        {row.coursera.startsWith("No") || row.coursera.startsWith("Paywalled") || row.coursera.startsWith("Low") ? (
                          <X className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                        ) : (
                          <Check className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                        )}
                        <span>{row.coursera}</span>
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
            Why Hands-on Building Beats Passive Video Watching in 2027
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-card border border-border flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-foreground text-base mb-2">Break Free from Tutorial Hell</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Watching someone else code doesn’t teach you how to solve bugs. SkillTa gives you phase milestones and challenging project briefs to build genuine muscle memory.
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
                <h3 className="font-bold text-foreground text-base mb-2">Direct Career Tools</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Instead of paying $49/month just to download a certificate image, use SkillTa’s free AI Resume Reviewer and Skill Gap Analyzer to target high-paying jobs.
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
                <h3 className="font-bold text-foreground text-base mb-2">2027 Salary Benchmarks</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Evaluate tech compensation across 50+ countries. Filter by experience level and tech specialization to plan your learning around real market demand.
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
            <p className="text-sm text-muted-foreground">Everything you need to know about SkillTa vs Coursera</p>
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
            Start Building Real Software Today
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto mb-8">
            Take the free 2-minute AI career quiz, follow step-by-step 4-phase curricula, and create standout portfolio projects without subscription paywalls.
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
