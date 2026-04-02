import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";

export default function Terms() {
  return (
    <>
      <SEOHead
        {...PAGE_SEO.terms}
        jsonLd={getBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Terms of Service", path: "/terms" }])}
      />
      <div className="min-h-screen py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Terms of Service</h1>
          <p className="text-sm text-muted-foreground mb-10">Last updated: March 9, 2026</p>

          <div className="space-y-8 text-muted-foreground text-sm leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
              <p>By accessing or using SkillTa ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">2. Description of Service</h2>
              <p>SkillTa provides AI-powered career guidance, quizzes, and personalized roadmaps for individuals exploring tech career paths. The Service is provided "as is" and is intended for informational and educational purposes only.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">3. User Accounts</h2>
              <p>You may be required to create an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">4. User Conduct</h2>
              <p>You agree not to misuse the Service, including but not limited to: attempting to gain unauthorized access, interfering with the Service's functionality, or using the Service for any unlawful purpose.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">5. Intellectual Property</h2>
              <p>All content, trademarks, and materials on SkillTa are the property of SkillTa or its licensors. You may not reproduce, distribute, or create derivative works without prior written consent.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">6. Disclaimer</h2>
              <p>SkillTa provides career suggestions and roadmaps based on general data and AI models. We do not guarantee employment outcomes, salary levels, or career success. Always do your own research before making career decisions.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">7. Limitation of Liability</h2>
              <p>To the maximum extent permitted by law, SkillTa shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">8. Changes to Terms</h2>
              <p>We reserve the right to modify these Terms at any time. Continued use of the Service after changes constitutes acceptance of the updated Terms.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">9. Contact</h2>
              <p>If you have questions about these Terms, please contact us at <a href="mailto:support@skillta.tech" className="text-primary hover:underline">support@skillta.tech</a>.</p>
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
