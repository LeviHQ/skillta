import { motion } from "framer-motion";
import { Compass, Target, Heart, Lightbulb } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { PAGE_SEO, getBreadcrumbSchema } from "@/lib/seo";
export default function About() {
  return (
    <div className="min-h-screen bg-gradient-hero relative">
      <SEOHead
        {...PAGE_SEO.about}
        jsonLd={getBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])}
      />
      <div className="container mx-auto px-6 py-16 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="text-gradient">SkillTa</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We believe everyone deserves clarity about their career path. SkillTa uses AI to match your unique traits with the perfect tech career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {[
              { icon: Compass, title: "Our Mission", text: "Help aspiring tech professionals find their ideal career path with honest, data-driven guidance — not hype." },
              { icon: Target, title: "How It Works", text: "Our AI analyzes your interests, skills, and personality across 10 carefully crafted questions to find your best match." },
              { icon: Heart, title: "Why We Built This", text: "Too many people waste time on the wrong career path. We want to save you months of confusion with clear, actionable roadmaps." },
              { icon: Lightbulb, title: "What's Next", text: "We're building AI mentoring, progress tracking, community features, and premium roadmaps. Stay tuned for updates." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="p-6 rounded-2xl bg-gradient-card border border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <item.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center p-8 rounded-2xl bg-gradient-card border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-3">Built with ❤️ for the tech community</h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              SkillTa is free to use and always will be for core features. Our goal is to make quality career guidance accessible to everyone, regardless of background. Our goal is to make quality career guidance accessible to everyone, regardless of background.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
