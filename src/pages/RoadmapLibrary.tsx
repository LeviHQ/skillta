import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { careers } from "@/data/careers";
import { ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { PAGE_SEO, getBreadcrumbSchema } from "@/lib/seo";

export default function RoadmapLibrary() {
  return (
    <div className="min-h-screen bg-gradient-hero relative">
      <SEOHead
        {...PAGE_SEO.roadmaps}
        jsonLd={getBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Roadmaps", path: "/roadmaps" }])}
      />
      <div className="container mx-auto px-6 py-16 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Tech Career <span className="text-gradient">Roadmaps</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Browse detailed roadmaps for the most in-demand tech careers. Each includes learning phases, resources, and project ideas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {careers.map((career, i) => (
            <motion.div
              key={career.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={`/roadmaps/${career.id}`}
                className="block p-6 rounded-2xl border border-border bg-gradient-card hover:border-primary/40 hover:shadow-glow transition-all group h-full"
              >
                <div className="text-4xl mb-4">{career.icon}</div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                  {career.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{career.tagline}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary">{career.demandLevel}</span>
                  <span className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground">{career.learningDifficulty}</span>
                  <span className="text-xs px-2 py-1 rounded-md bg-accent/10 text-accent">{career.estimatedTime}</span>
                </div>

                <div className="flex items-center gap-1 text-sm text-primary font-medium">
                  View Roadmap <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
