import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import SEOHead from "@/components/SEOHead";
import { PAGE_SEO, getBreadcrumbSchema } from "@/lib/seo";
import { BookOpen, ArrowRight, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function Blog() {
  const seo = PAGE_SEO.blog;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        path={seo.path}
        jsonLd={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />

      {/* Hero */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <BookOpen className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Career Resources</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Tech Career <span className="text-gradient">Blog & Guides</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Expert guides, salary insights, and career comparisons to help you make the right tech career choice.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="container mx-auto px-6 pb-20">
        <div className="grid gap-8 max-w-4xl mx-auto">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="block group bg-card border border-border rounded-2xl p-6 md:p-8 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-3">
                  {post.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {post.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all">
                  Read Article <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
