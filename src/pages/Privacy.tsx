import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { PAGE_SEO, getBreadcrumbSchema } from "@/lib/seo";

export default function Privacy() {
  return (
    <>
      <SEOHead
        {...PAGE_SEO.privacy}
        jsonLd={getBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy" }])}
      />
      <div className="min-h-screen py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-10">Last updated: March 9, 2026</p>

          <div className="space-y-8 text-muted-foreground text-sm leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">1. Information We Collect</h2>
              <p>We may collect the following types of information:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong className="text-foreground">Account Information:</strong> Name, email address when you create an account.</li>
                <li><strong className="text-foreground">Quiz Responses:</strong> Your answers to career quizzes to generate personalized roadmaps.</li>
                <li><strong className="text-foreground">Usage Data:</strong> Pages visited, features used, and interactions with the Service.</li>
                <li><strong className="text-foreground">Device Information:</strong> Browser type, operating system, and device identifiers.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">2. How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>To provide and personalize career guidance and roadmaps.</li>
                <li>To improve and optimize the Service.</li>
                <li>To communicate with you about updates and features.</li>
                <li>To ensure security and prevent fraud.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">3. Data Sharing</h2>
              <p>We do not sell your personal data. We may share data with trusted third-party services (analytics, hosting) that help us operate the Service, subject to confidentiality obligations.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">4. Data Security</h2>
              <p>We use industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">5. Cookies</h2>
              <p>We use cookies and similar technologies to enhance your experience, analyze usage, and assist in our marketing efforts. You can manage cookie preferences through your browser settings.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">6. Your Rights</h2>
              <p>Depending on your jurisdiction, you may have the right to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Access, correct, or delete your personal data.</li>
                <li>Opt out of marketing communications.</li>
                <li>Request data portability.</li>
                <li>Withdraw consent at any time.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">7. Data Retention</h2>
              <p>We retain your data only for as long as necessary to provide the Service and fulfill the purposes described in this policy, unless a longer retention period is required by law.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">8. Children's Privacy</h2>
              <p>SkillTa is not intended for children under 13. We do not knowingly collect personal information from children. If you believe a child has provided us with data, please contact us.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">9. Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the updated policy on this page.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">10. Contact Us</h2>
              <p>For questions or concerns about this Privacy Policy, contact us at <a href="mailto:support@skillta.tech" className="text-primary hover:underline">support@skillta.tech</a>.</p>
            </section>
          </div>

          <div className="mt-12 pt-6 border-t border-border">
            <Link to="/" className="text-primary hover:underline text-sm">← Back to Home</Link>
          </div>
        </div>
      </div>
    </>
  );
}
