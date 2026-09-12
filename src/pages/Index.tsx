import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowRight, LogIn, UserPlus } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import { useAuth } from "@/contexts/AuthContext";
const SignInModal = lazy(() => import("@/components/SignInModal"));
import DeferredSection from "@/components/DeferredSection";

// Below-the-fold sections are code-split and mounted on approach,
// keeping them out of the critical path without changing the layout.
const TestimonialSection = lazy(() => import("@/components/TestimonialSection"));
const PricingSection = lazy(() => import("@/components/PricingSection"));
const HowToUseSection = lazy(() => import("@/components/HowToUseSection"));
const AccuracySection = lazy(() => import("@/components/AccuracySection"));
const WhoIsItForSection = lazy(() => import("@/components/WhoIsItForSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const FreeServicesSection = lazy(() => import("@/components/FreeServicesSection"));
const CountryEcosystemSection = lazy(() => import("@/components/CountryEcosystemSection"));
const AdsterraNativeBanner = lazy(() => import("@/components/AdsterraNativeBanner"));
import SEOHead from "@/components/SEOHead";
import { PAGE_SEO, getWebApplicationSchema, getEducationalOrgSchema, getWebsiteSchema, getHowToSchema, getFAQSchema, getOrganizationSchema, getSoftwareAppSchema, getItemListSchema } from "@/lib/seo";

const homeFaqs = [
  { question: "How long does the career quiz take?", answer: "The AI Career Quiz takes approximately 5-10 minutes. It includes 10 smart questions designed to understand your interests, skills, and career goals. You don't need to sign up or provide personal information to take it." },
  { question: "Are the learning roadmaps free?", answer: "Yes, all SkillTa roadmaps are completely free. The personalized roadmaps, career analysis, PDF downloads, and the entire roadmap library are available at no cost." },
  { question: "How accurate is the AI recommendation?", answer: "Our AI is trained on data from 10,000+ tech professionals and uses machine learning to match your profile with career paths. It has a 92% accuracy rate in recommending suitable tech careers." },
  { question: "Do I need prior tech experience?", answer: "No, SkillTa is designed for everyone—from complete beginners to career switchers. The quiz adapts to your current level and recommends learning paths accordingly." },
  { question: "Can I download my roadmap as PDF?", answer: "Yes! Once you get your personalized roadmap, you can download it as a PDF with all the learning resources, project ideas, and timeline included." },
  { question: "How many career paths does SkillTa cover?", answer: "SkillTa covers 50+ tech career paths including frontend, backend, data science, cybersecurity, AI/ML, DevOps, game development, blockchain, and many more." },
];

const features = [
  { icon: Sparkles, title: "AI Career Quiz", description: "10 smart questions to discover your ideal tech career path", color: "text-primary" },
  { icon: Map, title: "Personalized Roadmaps", description: "Step-by-step learning paths with resources and project ideas", color: "text-accent" },
  { icon: Shield, title: "Reality Check", description: "Honest insights on difficulty, competition, and salary expectations", color: "text-warning" },
  { icon: BookOpen, title: "Roadmap Library", description: "Browse curated roadmaps for 9+ tech careers anytime", color: "text-info" },
  { icon: TrendingUp, title: "Career Analysis", description: "Deep dive into demand, growth potential, and required skills", color: "text-success" },
  { icon: Zap, title: "Download as PDF", description: "Save your personalized roadmap and share it anywhere", color: "text-primary" },
];

export default function Index() {
  const { user } = useAuth();
  const [showSignIn, setShowSignIn] = useState(false);
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    let tries = 0;
    let settled = 0;
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        // Lazy sections above may still be mounting and shifting layout,
        // so re-align a few times after the first scroll.
        if (settled++ < 6) setTimeout(tryScroll, 250);
      } else if (tries++ < 60) {
        setTimeout(tryScroll, 100);
      }
    };
    tryScroll();
  }, [hash]);


  return (
    <div>
      <SEOHead
        {...PAGE_SEO.home}
        jsonLd={[getWebApplicationSchema(), getEducationalOrgSchema(), getWebsiteSchema(), getHowToSchema(), getFAQSchema(homeFaqs), getOrganizationSchema(), getSoftwareAppSchema(), getItemListSchema()]}
      />
      {/* Hero */}
      <HeroSection />

      {/* Sign In CTA - Only for non-signed-in users */}
      {!user && (
        <section className="py-16 bg-card/30 border-y border-border">
          <div className="container mx-auto px-6">
            <motion.div
              className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-8 p-8 rounded-2xl bg-gradient-card border border-primary/20 shadow-glow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <UserPlus className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold text-foreground">Join SkillTa</h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Sign in with Google to save your quiz results, track your career journey, and get
                  personalized recommendations. It takes just one click!
                </p>
              </div>
              <button
                onClick={() => setShowSignIn(true)}
                className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                <LogIn className="w-5 h-5" />
                Sign In with Google
              </button>
            </motion.div>
          </div>
        </section>
      )}


      {/* Sponsored - Native Banner (mounted eagerly so the slot always renders) */}
      <DeferredSection minHeight={220} eager>
        <AdsterraNativeBanner />
      </DeferredSection>

      {/* Free Services showcase */}
      <DeferredSection minHeight={600}>
        <FreeServicesSection />
      </DeferredSection>

      {/* Country Ecosystem launch */}
      <DeferredSection minHeight={600}>
        <CountryEcosystemSection />
      </DeferredSection>

      {/* Who Is It For */}
      <DeferredSection minHeight={600}>
        <WhoIsItForSection />
      </DeferredSection>





      {/* Pricing */}
      <DeferredSection minHeight={700} eager={hash === "#pricing"}>
        <PricingSection />
      </DeferredSection>

      {/* How to use */}
      <DeferredSection minHeight={600}>
        <HowToUseSection />
      </DeferredSection>




      {/* Accuracy */}
      <DeferredSection minHeight={600}>
        <AccuracySection />
      </DeferredSection>

      {/* Testimonials */}
      <DeferredSection minHeight={600}>
        <TestimonialSection />
      </DeferredSection>

      {/* FAQ */}
      <DeferredSection minHeight={600}>
        <FAQSection />
      </DeferredSection>

      {showSignIn && (
        <Suspense fallback={null}>
          <SignInModal open={showSignIn} onClose={() => setShowSignIn(false)} />
        </Suspense>
      )}
    </div>
  );
}
