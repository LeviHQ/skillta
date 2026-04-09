import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Map, BookOpen, Shield, TrendingUp, Zap, LogIn, UserPlus } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import { careers } from "@/data/careers";
import { useAuth } from "@/contexts/AuthContext";
import SignInModal from "@/components/SignInModal";
import TestimonialSection from "@/components/TestimonialSection";
import PricingSection from "@/components/PricingSection";
import WhoIsItForSection from "@/components/WhoIsItForSection";
import FAQSection from "@/components/FAQSection";
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

      {/* Signed-in user dashboard link */}
      {user && (
        <section className="py-10 bg-card/30 border-y border-border">
          <div className="container mx-auto px-6">
            <motion.div
              className="max-w-3xl mx-auto flex items-center gap-4 p-6 rounded-2xl bg-gradient-card border border-primary/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {user.photoURL && <img src={user.photoURL} alt="" className="w-10 h-10 rounded-full border border-primary/30" />}
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Welcome back, {user.displayName?.split(" ")[0]}!</p>
                <p className="text-xs text-muted-foreground">Check your dashboard for saved results and recommendations.</p>
              </div>
              <Link
                to="/dashboard"
                className="px-5 py-2.5 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Dashboard →
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Who Is It For */}
      <WhoIsItForSection />

      {/* Features */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to <span className="text-gradient">Navigate Tech</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From discovery to your first job — SkillTa guides you every step of the way.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="p-6 rounded-2xl bg-gradient-card border border-border hover:border-primary/30 transition-all group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <feature.icon className={`w-10 h-10 mb-4 ${feature.color}`} />
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Paths Preview */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore <span className="text-gradient">Career Paths</span>
            </h2>
            <p className="text-muted-foreground">Discover what each tech career actually involves</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {careers.slice(0, 6).map((career, i) => (
              <motion.div
                key={career.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={`/roadmaps/${career.id}`}
                  className="block p-5 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-glow transition-all group"
                >
                  <div className="text-3xl mb-3">{career.icon}</div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                    {career.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{career.tagline}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary">{career.demandLevel} Demand</span>
                    <span className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground">{career.learningDifficulty}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/roadmaps"
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              View all career paths <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <PricingSection />

      {/* Testimonials */}
      <TestimonialSection />

      {/* FAQ */}
      <FAQSection />


      <SignInModal open={showSignIn} onClose={() => setShowSignIn(false)} />
    </div>
  );
}
