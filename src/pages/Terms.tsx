import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { PAGE_SEO, getBreadcrumbSchema } from "@/lib/seo";
import { Scale, CheckCircle2, ShieldAlert, CreditCard, Sparkles } from "lucide-react";

export default function Terms() {
  return (
    <>
      <SEOHead
        {...PAGE_SEO.terms}
        jsonLd={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms" },
        ])}
      />
      <div className="min-h-screen py-16 px-4 bg-background text-foreground">
        <div className="container mx-auto max-w-4xl">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center justify-start gap-1.5 text-left text-xs text-muted-foreground"
          >
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">Terms of Service</span>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
              Terms of Service
            </h1>
            <p className="text-sm text-muted-foreground">
              Effective & Last Updated: October 24, 2026
            </p>
          </div>

          {/* Quick Summary Box */}
          <div className="p-6 rounded-2xl border border-border bg-card/60 backdrop-blur-sm mb-12 space-y-3">
            <div className="flex items-center gap-2 text-primary font-semibold text-sm">
              <Scale className="w-4 h-4" />
              <span>SkillTa Terms Highlights (TL;DR)</span>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              Welcome to SkillTa (<strong className="text-foreground">skillta.tech</strong>). By using our AI career platform, 
              quizzes, ATS resume tools, or purchasing Pro or Lifetime plans, you agree to these Terms. You retain full ownership 
              of your uploaded resumes. SkillTa provides educational and career guidance; while our AI models deliver comprehensive 
              insights, we do not guarantee employment, hiring, or specific compensation outcomes.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>You own your resumes & inputs</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CreditCard className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Clear transparent pricing ($3 / $10)</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>AI guidance for career empowerment</span>
              </div>
            </div>
          </div>

          {/* Detailed Clauses */}
          <div className="space-y-10 text-muted-foreground text-sm leading-relaxed">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
                1. Acceptance of Terms & Eligibility
              </h2>
              <p>
                These Terms of Service ("Terms") constitute a legally binding agreement between you and SkillTa 
                ("we", "us", or "our"), governing your access to and use of our web platform located at skillta.tech 
                and all associated features, tools, and services (collectively, the "Service").
              </p>
              <p>
                By creating an account, browsing our site, or making a purchase, you acknowledge that you have read, 
                understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree, you must 
                discontinue using the Service immediately. You must be at least 13 years old (or the legal age required 
                in your jurisdiction) to use SkillTa.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
                2. Description of Services
              </h2>
              <p>SkillTa is an AI-powered technical career guidance and preparation platform offering:</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li><strong className="text-foreground">AI Career Quiz:</strong> Psychometric and technical preference diagnostics mapping users to recommended modern tech trajectories.</li>
                <li><strong className="text-foreground">50+ Interactive Roadmaps:</strong> Curated step-by-step career path milestones with skill prerequisites and download options.</li>
                <li><strong className="text-foreground">AI Resume Reviewer & ATS Scoring:</strong> Automated parsing and feedback to optimize resumes against applicant tracking algorithms.</li>
                <li><strong className="text-foreground">Resume Version Control:</strong> Private cloud-based version tracking enabling users to archive iterations, track ATS score deltas, and download previous resumes.</li>
                <li><strong className="text-foreground">Career Comparison & Salary Predictor:</strong> Multi-factor compensation projections and side-by-side role evaluations.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
                3. User Accounts & Security
              </h2>
              <p>
                Access to personalized features requires authentication via Google OAuth (Firebase). You agree to provide 
                accurate information and maintain the security of your account credentials. You are solely responsible for 
                all activities conducted under your authenticated profile.
              </p>
              <p>
                You must notify us immediately if you suspect any unauthorized access or breach of your account. SkillTa is 
                not liable for any losses caused by unauthorized credential use.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
                4. Plans, Billing & Merchant of Record
              </h2>
              <p>
                SkillTa offers tiered access models designed for continuous career development:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>
                  <strong className="text-foreground">SkillTa Pro ($3.00 USD):</strong> Unlocks 1 full year (365 days) of unrestricted 
                  access to all AI Career Suite tools, unlimited ATS resume reviews, Resume Version Control, and an ad-free experience.
                </li>
                <li>
                  <strong className="text-foreground">SkillTa Lifetime ($10.00 USD):</strong> Unlocks perpetual, permanent access to all current 
                  and future AI Career Suite tools and updates, with no recurring renewal fees.
                </li>
              </ul>
              <div className="p-4 rounded-xl border border-border bg-card/40 space-y-2 mt-2">
                <p>
                  <strong className="text-foreground">Merchant of Record:</strong> All payments are securely processed by 
                  <strong> Dodo Payments</strong>, our authorized Merchant of Record. Dodo Payments handles billing, currency 
                  conversion, sales tax/VAT compliance, and PCI-DSS compliance.
                </p>
                <p>
                  <strong className="text-foreground">Digital Fulfillment:</strong> Because SkillTa delivers immediate digital 
                  access to computational AI services and premium database records, access entitlements are activated immediately 
                  upon transaction confirmation.
                </p>
                <p>
                  <strong className="text-foreground">Refund Policy:</strong> If you experience technical defects or are unsatisfied with 
                  your purchase within 7 days of payment, contact us at{" "}
                  <a href="mailto:adarshmishra70931@gmail.com" className="text-primary hover:underline">
                    adarshmishra70931@gmail.com
                  </a>{" "}
                  with your order details for review.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
                5. Acceptable Use & Conduct
              </h2>
              <p>You agree to use SkillTa exclusively for lawful personal and career advancement purposes. You must not:</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>Upload documents containing malicious code, viruses, or unlawful third-party private information.</li>
                <li>Scrape, crawl, harvest, or extract roadmap databases, questions, or UI content via automated bots or scripts.</li>
                <li>Reverse-engineer, decompile, or attempt to derive underlying source algorithms from our AI scoring models.</li>
                <li>Share, resell, or distribute individual account credentials to bypass pricing tiers.</li>
                <li>Circumvent or tamper with rate limits, security tokens, or advertising display controls.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
                6. Intellectual Property & Content Ownership
              </h2>
              <div className="space-y-2">
                <p>
                  <strong className="text-foreground">Your Content:</strong> You retain complete ownership, copyright, and intellectual 
                  property rights to the resumes you upload and responses you provide. By uploading, you grant SkillTa a limited, 
                  revocable license solely to store, parse, and analyze your content to deliver the requested service to you.
                </p>
                <p>
                  <strong className="text-foreground">SkillTa Intellectual Property:</strong> The platform design, proprietary 
                  scoring logic, curated roadmap milestone frameworks, branding, logos, graphics, and codebase are the exclusive 
                  property of SkillTa. No portion of our software or content may be republished or reproduced without prior written authorization.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
                7. Disclaimer of Warranties & Employment Outcomes
              </h2>
              <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-2">
                <div className="flex items-center gap-2 text-amber-500 font-semibold text-sm">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>Important Career Guidance Disclaimer</span>
                </div>
                <p className="text-xs md:text-sm leading-relaxed">
                  SkillTa provides career roadmaps, salary projections, and resume assessments for informational and educational purposes only. 
                  Our services are provided on an "AS IS" and "AS AVAILABLE" basis. SkillTa does not guarantee job interviews, hiring, 
                  employment placement, or specific remuneration. Market conditions, hiring standards, and employer criteria vary 
                  independently of our evaluations.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
                8. Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by applicable law, in no event shall SkillTa, its founders, or affiliates be liable for 
                any indirect, incidental, punitive, or consequential damages (including loss of profits, data, career opportunities, 
                or business interruption) arising out of or related to your use of the Service.
              </p>
              <p>
                Our aggregate liability for all claims arising under these Terms shall not exceed the total amount actually paid by you 
                to SkillTa during the twelve (12) months preceding the event giving rise to liability.
              </p>
            </section>

            {/* Section 9 */}
            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
                9. Account Termination & Suspension
              </h2>
              <p>
                You may discontinue use of SkillTa at any time and request full account and data deletion. We reserve the right to 
                suspend or terminate your account without prior notice if you violate these Terms, engage in fraudulent activity, 
                or attempt to harm platform infrastructure.
              </p>
            </section>

            {/* Section 10 */}
            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
                10. Governing Law & Dispute Resolution
              </h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict 
                of law principles. Before initiating formal legal proceedings, both parties agree to attempt in good faith to resolve 
                any dispute informally by contacting our designated support email.
              </p>
            </section>

            {/* Section 11 */}
            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
                11. Changes to Terms
              </h2>
              <p>
                We may revise these Terms periodically. We will notify users of material changes by updating the "Last Updated" 
                timestamp at the top of this page. Your continued use of the Service following revisions constitutes full acceptance 
                of the modified Terms.
              </p>
            </section>

            {/* Section 12 */}
            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
                12. Official Contact Information
              </h2>
              <p>
                For legal notices, billing inquiries, or questions concerning these Terms of Service, please reach out directly:
              </p>
              <div className="p-4 rounded-xl border border-border bg-card/40 space-y-1 text-sm">
                <p><strong className="text-foreground">Platform:</strong> SkillTa (skillta.tech)</p>
                <p><strong className="text-foreground">Founder & Lead:</strong> Adarsh Jayprakash Mishra</p>
                <p>
                  <strong className="text-foreground">Official Inquiries & Support:</strong>{" "}
                  <a
                    href="mailto:adarshmishra70931@gmail.com"
                    className="text-primary hover:underline font-medium"
                  >
                    adarshmishra70931@gmail.com
                  </a>
                </p>
              </div>
            </section>
          </div>

          {/* Footer Back link */}
          <div className="mt-12 pt-6 border-t border-border flex items-center justify-between">
            <Link to="/" className="text-primary hover:underline text-sm font-medium">
              ← Back to Home
            </Link>
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              Privacy Policy →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
