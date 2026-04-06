import { useParams, Link, Navigate } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import SEOHead from "@/components/SEOHead";
import { getBreadcrumbSchema, getArticleSchema } from "@/lib/seo";
import { ArrowLeft, Calendar, Clock, BookOpen } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const articleSchema = getArticleSchema(post);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${post.title} | SkillTa Blog`}
        description={post.description}
        keywords={post.keywords}
        path={`/blog/${post.slug}`}
        type="article"
        publishedTime={post.date}
        jsonLd={[
          articleSchema,
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <article className="container mx-auto px-6 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          {/* Back */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-8">
            {post.title}
          </h1>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none
            prose-headings:text-foreground prose-headings:font-bold
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground
            prose-li:text-muted-foreground
            prose-table:border-border
            prose-th:text-foreground prose-th:bg-muted/30 prose-th:px-4 prose-th:py-2
            prose-td:text-muted-foreground prose-td:px-4 prose-td:py-2 prose-td:border-border
            prose-tr:border-border
            prose-code:text-primary prose-code:bg-muted/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
            prose-hr:border-border
          ">
            <ReactMarkdown
              components={{
                a: ({ href, children }) => {
                  if (href?.startsWith("/")) {
                    return <Link to={href} className="text-primary hover:underline">{children}</Link>;
                  }
                  return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* CTA */}
          <div className="mt-14 p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-primary/20 text-center">
            <BookOpen className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="text-xl font-bold text-foreground mb-2">Find Your Perfect Career Path</h3>
            <p className="text-muted-foreground text-sm mb-5 max-w-md mx-auto">
              Take our free AI-powered quiz to get a personalized career recommendation with a complete learning roadmap.
            </p>
            <Link
              to="/quiz"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              Take the Career Quiz →
            </Link>
          </div>

          {/* Related Posts */}
          <div className="mt-14">
            <h3 className="text-lg font-bold text-foreground mb-5">More Articles</h3>
            <div className="space-y-4">
              {blogPosts.filter(p => p.slug !== post.slug).slice(0, 3).map(p => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="block p-4 rounded-xl bg-card border border-border hover:border-primary/40 transition-all group"
                >
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">{p.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{p.category} · {p.readTime}</p>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </article>
    </div>
  );
}
