import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { blogPosts, BLOG_COUNTRIES } from "@/data/blogPosts";
import SEOHead from "@/components/SEOHead";
import { PAGE_SEO, getBreadcrumbSchema } from "@/lib/seo";
import { BookOpen, ArrowRight, Calendar, Clock, Filter, Globe, ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AdsterraResponsiveBanner from "@/components/AdsterraResponsiveBanner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

type CategoryKey = null | "country";

export default function Blog() {
  const seo = PAGE_SEO.blog;

  const [activeCategory, setActiveCategory] = useState<CategoryKey>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>("usa");

  const visiblePosts = useMemo(() => {
    if (activeCategory === "country") {
      return blogPosts.filter((p) => p.country === selectedCountry);
    }
    // Default: show original blogs (no country tag)
    return blogPosts.filter((p) => !p.country);
  }, [activeCategory, selectedCountry]);

  const currentCountry = BLOG_COUNTRIES.find((c) => c.key === selectedCountry);

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
      <AdsterraResponsiveBanner />

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

      {/* Filters */}
      <section className="container mx-auto px-6 pb-4">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center gap-3">
          {/* Category dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-border hover:border-primary/40 transition-all text-sm font-medium text-foreground"
                aria-label="Filter by category"
              >
                <Filter className="w-4 h-4 text-primary" />
                Category
                {activeCategory === "country" && (
                  <span className="ml-1 px-2 py-0.5 rounded-md bg-primary/15 text-primary text-xs">
                    Country
                  </span>
                )}
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setActiveCategory("country");
                  setSelectedCountry("usa");
                }}
                className="gap-2 cursor-pointer"
              >
                <Globe className="w-4 h-4 text-primary" />
                Country
                <span className="ml-auto text-xs text-muted-foreground">
                  {blogPosts.filter((p) => p.country).length}
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled className="opacity-60">
                <span className="text-xs">More filters coming soon…</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Country dropdown - only when Country is active */}
          <AnimatePresence>
            {activeCategory === "country" && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                className="flex items-center gap-2"
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 hover:border-primary/60 transition-all text-sm font-medium text-foreground"
                      aria-label="Select country"
                    >
                      <span className="text-lg leading-none">{currentCountry?.flag}</span>
                      {currentCountry?.name}
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuLabel>Select country</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {BLOG_COUNTRIES.map((c) => (
                      <DropdownMenuItem
                        key={c.key}
                        onClick={() => setSelectedCountry(c.key)}
                        className="gap-3 cursor-pointer"
                      >
                        <span className="text-lg leading-none">{c.flag}</span>
                        <span>{c.name}</span>
                        {c.key === selectedCountry && (
                          <span className="ml-auto text-xs text-primary">✓</span>
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <button
                  onClick={() => setActiveCategory(null)}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                  aria-label="Clear filter"
                >
                  <X className="w-3.5 h-3.5" />
                  Clear
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {activeCategory === "country" && currentCountry && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto text-sm text-muted-foreground mt-4"
          >
            Showing <span className="text-foreground font-semibold">{visiblePosts.length}</span> 2026 tech salary guides for{" "}
            <span className="text-foreground font-semibold">
              {currentCountry.flag} {currentCountry.name}
            </span>
            .
          </motion.p>
        )}
      </section>

      {/* Blog Grid */}
      <section className="container mx-auto px-6 pb-20 pt-6">
        <div className="grid gap-8 max-w-4xl mx-auto">
          <AnimatePresence mode="popLayout">
            {visiblePosts.map((post, i) => (
              <motion.article
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: Math.min(i * 0.04, 0.3) }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="block group bg-card border border-border rounded-2xl p-6 md:p-8 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      {post.category}
                    </span>
                    {post.country && (
                      <span className="text-xs">
                        {BLOG_COUNTRIES.find((c) => c.key === post.country)?.flag}
                      </span>
                    )}
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
          </AnimatePresence>

          {visiblePosts.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No articles yet for this selection.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
