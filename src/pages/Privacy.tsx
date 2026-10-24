import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { PAGE_SEO, getBreadcrumbSchema } from "@/lib/seo";
import { Shield, Lock, Eye, FileText, CheckCircle2 } from "lucide-react";

export default function Privacy() {
  return (
    <>
      <SEOHead
        {...PAGE_SEO.privacy}
        jsonLd={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
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
            <span className="text-foreground font-medium">Privacy Policy</span>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
              Privacy Policy
            </h1>
            <p className="text-sm text-muted-foreground">
              Effective & Last Updated: October 24, 2026
            </p>
          </div>

          {/* Quick Summary Box */}
          <div className="p-6 rounded-2xl border border-border bg-card/60 backdrop-blur-sm mb-12 space-y-3">
            <div className="flex items-center gap-2 text-primary font-semibold text-sm">
              <Shield className="w-4 h-4" />
              <span>SkillTa Privacy Highlights (TL;DR)</span>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              At SkillTa (accessible via <strong className="text-foreground">skillta.tech</strong>), we respect your privacy. 
              We never sell your personal data. Your uploaded resumes and quiz responses are stored securely and privately in encrypted 
              storage. We never use your uploaded resumes to train public foundational AI models. Active Pro and Lifetime users enjoy a 
              100% ad-free experience.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Zero selling of personal data</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Lock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Private user-isolated storage</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Eye className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Ad-free for paid members</span>
              </div>
            </div>
          </div>

          {/* Detailed Clauses */}
          <div className="space-y-10 text-muted-foreground text-sm leading-relaxed">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
                1. Introduction & Overview
              </h2>
              <p>
                SkillTa ("we", "our", or "us"), operated under skillta.tech, is dedicated to helping individuals discover, plan, 
                and advance their tech careers through AI-driven diagnostic assessments, roadmap generation, ATS resume optimization, 
                and Resume Version Control.
              </p>
              <p>
                This Privacy Policy explains what personal information we collect, how it is processed and protected, and what rights 
                you have regarding your data under applicable global privacy regulations (including GDPR and CCPA principles). 
                By using SkillTa, you consent to the data practices described herein.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
                2. Information We Collect
              </h2>
              <p>We collect information only to provide and improve our educational and career guidance tools:</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>
                  <strong className="text-foreground">Authentication & Account Details:</strong> When you sign in via Google 
                  OAuth (managed securely through Firebase), we collect your verified name, email address, and profile picture URL. 
                  We never receive or store your Google account password.
                </li>
                <li>
                  <strong className="text-foreground">Assessment & Diagnostic Data:</strong> Your answers to the SkillTa AI Career Quiz, 
                  selected work preferences, target roles, quiz scores, and earned achievement badges are stored to deliver continuous 
                  personalized recommendations.
                </li>
                <li>
                  <strong className="text-foreground">Resume & Document Data:</strong> When you utilize the AI Resume Reviewer or 
                  Resume Version Control, you may upload documents in PDF or TXT format. We extract text content strictly to compute 
                  ATS compatibility scores, identify keyword gaps, and deliver improvement tips. Uploaded files are stored in 
                  private cloud buckets bound strictly to your user ID.
                </li>
                <li>
                  <strong className="text-foreground">Technical & Device Telemetry:</strong> Standard non-identifying telemetry including 
                  browser user-agent, operating system, language preference, IP address, and interaction metrics to protect our service against abuse.
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
                3. How We Process and Use Your Data
              </h2>
              <p>We process your data strictly for legitimate educational, operational, and delivery purposes:</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>To generate personalized career roadmaps and real-time ATS resume diagnostic scores.</li>
                <li>To maintain your historical versions in Resume Version Control so you can track ATS improvements over time.</li>
                <li>To manage your Pro or Lifetime subscription entitlements and deliver plan receipts via email.</li>
                <li>To maintain platform security, prevent automated web-scraping, and resolve technical bugs.</li>
              </ul>
              <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 mt-3 text-foreground text-xs md:text-sm">
                <strong>Our AI Data Pledge:</strong> We do not sell your resumes or personal quiz answers to data brokers. 
                Your private resumes are processed through secured stateless inference APIs and are never used to train public generative AI models.
              </div>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
                4. Third-Party Sub-processors & Service Providers
              </h2>
              <p>
                To provide a secure, scalable SaaS experience, we partner with industry-leading infrastructure providers. 
                All service providers are vetted for strict confidentiality and security compliance:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>
                  <strong className="text-foreground">Firebase / Google Cloud:</strong> Secure single-sign-on (SSO) authentication and user session verification.
                </li>
                <li>
                  <strong className="text-foreground">Backend & Database Infrastructure:</strong> Enterprise-grade database and private storage with Row Level Security (RLS) ensuring strict tenant isolation.
                </li>
                <li>
                  <strong className="text-foreground">Dodo Payments:</strong> Our authorized Merchant of Record and payment gateway. When you purchase SkillTa Pro ($3/year) or Lifetime ($10), your payment details (credit cards, UPI, PayPal) are processed directly on Dodo Payments' PCI-DSS Level 1 compliant infrastructure. SkillTa never sees, handles, or stores your financial credit card numbers.
                </li>
                <li>
                  <strong className="text-foreground">Resend:</strong> Secure transactional email gateway used exclusively to deliver your account confirmation, payment receipts, and limit notifications.
                </li>
                <li>
                  <strong className="text-foreground">Adsterra:</strong> Independent advertising network that serves contextual banners strictly to non-paying guests.
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
                5. Advertising, Cookies & Paid Ad-Free Experience
              </h2>
              <p>
                SkillTa uses cookies and browser local storage solely to retain your user session, maintain UI theme preferences (Light/Dark mode), 
                and track quiz state during an active session.
              </p>
              <p>
                <strong className="text-foreground">Ad-Free Guarantee:</strong> Active subscribers of <span className="text-primary font-medium">SkillTa Pro</span> and <span className="text-primary font-medium">SkillTa Lifetime</span> receive an unconditional 100% ad-free experience. Ad scripts are dynamically prevented from executing whenever an active paid entitlement is detected.
              </p>
              <p>
                For free guest visitors, contextual ads may be served via Adsterra. These providers may place standard third-party advertising cookies 
                or analyze device headers under their respective privacy policies. You can disable third-party cookies at any time via your browser settings. 
                We never share your account details or uploaded documents with advertisers.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
                6. Data Security, Storage & Retention
              </h2>
              <p>
                We employ comprehensive technical and organizational safeguards:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li><strong className="text-foreground">Encryption:</strong> All web traffic is strictly encrypted using HTTPS/TLS 1.3 in transit, and stored assets are encrypted at rest.</li>
                <li><strong className="text-foreground">Access Control:</strong> Database tables use strict Row-Level Security policies so that only your authenticated Google account can read or write your history.</li>
                <li><strong className="text-foreground">Self-Service Deletion:</strong> In Resume Version Control, clicking "Delete" on any version permanently and immediately purges that file from our private storage buckets.</li>
                <li><strong className="text-foreground">Retention Policy:</strong> We retain account data as long as your account remains active. Inactive data is periodically audited and can be permanently removed upon request.</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
                7. Your Data Rights (GDPR & CCPA Compliance)
              </h2>
              <p>Regardless of your geographic location, SkillTa grants you full transparency and authority over your information:</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li><strong className="text-foreground">Right to Access:</strong> You can view all saved quiz results, badges, and resume versions directly within your Dashboard.</li>
                <li><strong className="text-foreground">Right to Portability & Download:</strong> You can download your uploaded resume versions and career roadmaps at any time.</li>
                <li><strong className="text-foreground">Right to Erasure ("Right to be Forgotten"):</strong> You may request the permanent deletion of your account and all associated records by contacting us.</li>
                <li><strong className="text-foreground">Right to Rectification:</strong> You can modify or upload updated resume versions whenever desired.</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
                8. Children's Privacy
              </h2>
              <p>
                SkillTa is designed for students, university graduates, and professionals exploring technical careers. 
                Our services are not directed to children under 13 years of age (or under 16 in the EEA). 
                We do not knowingly collect personal identifiable information from minors. 
                If we discover that a child has provided us with personal data, we will promptly delete it.
              </p>
            </section>

            {/* Section 9 */}
            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
                9. Changes to This Policy
              </h2>
              <p>
                We may revise this Privacy Policy periodically to reflect enhancements to our platform or updates to statutory requirements. 
                Whenever material modifications are made, we will update the "Last Updated" timestamp at the top of this document. 
                Continued use of SkillTa following any changes signifies your informed acceptance.
              </p>
            </section>

            {/* Section 10 */}
            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
                10. Contact & Privacy Inquiries
              </h2>
              <p>
                If you have any questions, feedback, or requests regarding this Privacy Policy or wish to exercise your data rights, 
                please reach out directly to our team:
              </p>
              <div className="p-4 rounded-xl border border-border bg-card/40 space-y-1 text-sm">
                <p><strong className="text-foreground">Platform:</strong> SkillTa (skillta.tech)</p>
                <p><strong className="text-foreground">Founder & Lead:</strong> Adarsh Jayprakash Mishra</p>
                <p>
                  <strong className="text-foreground">Official Support Email:</strong>{" "}
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
            <Link to="/terms" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              Terms of Service →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
