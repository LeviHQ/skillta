import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { blogPosts } from "@/data/blogPosts";
import SEOHead from "@/components/SEOHead";
import { getBreadcrumbSchema, getArticleSchema, getFAQSchema } from "@/lib/seo";
import {
  ArrowLeft,
  Calendar,
  Clock,
  BookOpen,
  ArrowRight,
  ListTree,
  Sparkles,
  CheckCircle2,
  Share2,
  Twitter,
  Linkedin,
  Copy,
  Check,
  MessageSquare,
  Map,
  FileText,
  Target,
  DollarSign,
  Globe2,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import AdsterraNativeBanner from "@/components/AdsterraNativeBanner";
import AdsterraResponsiveBanner from "@/components/AdsterraResponsiveBanner";
import ResumeReviewerCTA from "@/components/ResumeReviewerCTA";

// ---------- helpers ----------
const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

function extractHeadings(md: string) {
  const lines = md.split("\n");
  const headings: { level: 2 | 3; text: string; id: string }[] = [];
  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+?)\s*$/);
    const h3 = line.match(/^###\s+(.+?)\s*$/);
    if (h2) headings.push({ level: 2, text: h2[1], id: slugify(h2[1]) });
    else if (h3) headings.push({ level: 3, text: h3[1], id: slugify(h3[1]) });
  }
  return headings;
}

function extractKeyTakeaways(md: string): string[] {
  // Pull first 4 unique bullet points from the article for a takeaways box
  const bullets: string[] = [];
  for (const line of md.split("\n")) {
    const m = line.match(/^\s*[-*]\s+(.+?)\s*$/);
    if (m) {
      const t = m[1].replace(/\*\*/g, "").trim();
      if (t.length > 20 && t.length < 180 && !bullets.includes(t)) bullets.push(t);
    }
    if (bullets.length >= 4) break;
  }
  return bullets;
}

// Category → recommended service block
function getServiceForCategory(category: string) {
  const c = category.toLowerCase();
  if (c.includes("salary") || c.includes("pay") || c.includes("compensation"))
    return {
      icon: DollarSign,
      title: "Predict Your Salary — Free",
      text: "Get an instant AI-powered salary estimate based on your role, skills, city and experience.",
      href: "/salary-predictor",
      cta: "Try Salary Predictor",
    };
  if (c.includes("interview") || c.includes("resume") || c.includes("job"))
    return {
      icon: FileText,
      title: "Free AI Resume Reviewer",
      text: "Upload your resume and get ATS score, gap analysis, and role-specific feedback in seconds.",
      href: "/resume-reviewer",
      cta: "Review My Resume",
    };
  if (c.includes("skill") || c.includes("learn"))
    return {
      icon: Target,
      title: "Find Your Skill Gaps",
      text: "Compare your current skills with your target role and get a personalized 8-week roadmap.",
      href: "/skill-gap-analyzer",
      cta: "Analyze My Skills",
    };
  if (c.includes("country") || c.includes("global") || c.includes("abroad"))
    return {
      icon: Globe2,
      title: "Explore Country Ecosystems",
      text: "Deep-dive salary, roles, roadmaps, resumes & interviews for 50+ countries — all free.",
      href: "/",
      cta: "Browse Countries",
    };
  return {
    icon: Map,
    title: "Get Your Personalized Roadmap",
    text: "Take the free 5-min AI quiz to find your ideal tech career and unlock a step-by-step roadmap.",
    href: "/quiz",
    cta: "Take the Career Quiz",
  };
}

function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      setP(height > 0 ? Math.min(100, (scrolled / height) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-[width] duration-150"
        style={{ width: `${p}%` }}
      />
    </div>
  );
}

// Generic evergreen FAQs — combined with category-aware entries
function buildFAQs(post: (typeof blogPosts)[number]) {
  const base = [
    {
      question: "Is SkillTa really free to use?",
      answer:
        "Yes. The career quiz, 50+ roadmaps, salary predictor, resume reviewer, skill gap analyzer and country ecosystems are all free. Free plan users get 3 attempts per day on AI tools.",
    },
    {
      question: "How accurate are SkillTa's salary and career insights?",
      answer:
        "Salary bands are sourced from public 2026 datasets (Levels.fyi, Glassdoor, LinkedIn Salary, StackOverflow) and localized per country. Career recommendations use a scoring algorithm across 10 quiz dimensions.",
    },
    {
      question: "Do I need experience to start a tech career in 2026?",
      answer:
        "No. Most roadmaps on SkillTa are built for absolute beginners. The average learner ships their first hireable project in 4–6 months of consistent study.",
    },
  ];
  const cat = post.category.toLowerCase();
  if (cat.includes("salary"))
    base.unshift({
      question: `How is ${post.title.replace(/salary.*/i, "salary").trim()} calculated?`,
      answer:
        "We use median public compensation data for 2026 (base + bonus + stock) and adjust for city, company tier, and years of experience. Use our free Salary Predictor for a personalized estimate.",
    });
  if (cat.includes("ai") || cat.includes("ml"))
    base.unshift({
      question: "Do I need a PhD to work in AI/ML in 2026?",
      answer:
        "Not for most roles. Applied AI, MLOps, agentic AI and prompt engineering are open to strong self-taught engineers with a solid portfolio.",
    });
  if (cat.includes("interview") || cat.includes("resume"))
    base.unshift({
      question: "How do I make my resume ATS-friendly?",
      answer:
        "Use single-column layouts, standard section names, keywords from the target job description, and quantified impact bullets. SkillTa's free AI Resume Reviewer scores your resume against ATS parsers in seconds.",
    });
  return base.slice(0, 5);
}

// Auto-inject contextual internal links into markdown text (only in paragraphs, once per keyword)
function autoInternalLink(md: string): string {
  const rules: { pattern: RegExp; url: string; label: string }[] = [
    { pattern: /\bcareer quiz\b/i, url: "/quiz", label: "career quiz" },
    { pattern: /\bresume reviewer?\b/i, url: "/resume-reviewer", label: "resume reviewer" },
    { pattern: /\bskill gap\b/i, url: "/skill-gap-analyzer", label: "skill gap analyzer" },
    { pattern: /\bsalary predictor\b/i, url: "/salary-predictor", label: "salary predictor" },
    { pattern: /\broadmaps?\b/i, url: "/roadmaps", label: "roadmaps" },
    { pattern: /\bcompare careers?\b/i, url: "/compare", label: "compare careers" },
  ];
  const used = new Set<string>();
  return md
    .split("\n")
    .map((line) => {
      // skip headings, code, lists, existing links
      if (/^\s*(#|`|\||>|-|\*|\d+\.)/.test(line)) return line;
      let out = line;
      for (const r of rules) {
        if (used.has(r.url)) continue;
        if (out.includes("](")) continue;
        if (r.pattern.test(out)) {
          out = out.replace(r.pattern, (m) => `[${m}](${r.url})`);
          used.add(r.url);
        }
      }
      return out;
    })
    .join("\n");
}

// ---------- component ----------
export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);
  const [copied, setCopied] = useState(false);

  if (!post) return <Navigate to="/blog" replace />;

  const headings = useMemo(() => extractHeadings(post.content), [post.content]);
  const takeaways = useMemo(() => extractKeyTakeaways(post.content), [post.content]);
  const faqs = useMemo(() => buildFAQs(post), [post]);
  const service = useMemo(() => getServiceForCategory(post.category), [post.category]);
  const enhancedContent = useMemo(() => autoInternalLink(post.content), [post.content]);

  // Related: prefer same category, then same country, then latest
  const related = useMemo(() => {
    const others = blogPosts.filter((p) => p.slug !== post.slug);
    const sameCat = others.filter((p) => p.category === post.category);
    const sameCountry = post.country
      ? others.filter((p) => p.country === post.country && p.category !== post.category)
      : [];
    const rest = others.filter(
      (p) => p.category !== post.category && (!post.country || p.country !== post.country),
    );
    return [...sameCat, ...sameCountry, ...rest].slice(0, 6);
  }, [post]);

  const shareUrl = `https://skillta.tech/blog/${post.slug}`;
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const proseClass = `prose prose-invert prose-lg max-w-none
    prose-headings:text-foreground prose-headings:font-bold prose-headings:scroll-mt-24
    prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-border/60
    prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
    prose-p:text-muted-foreground prose-p:leading-[1.85]
    prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium
    prose-strong:text-foreground
    prose-li:text-muted-foreground prose-li:leading-relaxed
    prose-table:border-border prose-table:rounded-lg prose-table:overflow-hidden
    prose-th:text-foreground prose-th:bg-muted/40 prose-th:px-4 prose-th:py-2
    prose-td:text-muted-foreground prose-td:px-4 prose-td:py-2 prose-td:border-border
    prose-tr:border-border
    prose-code:text-primary prose-code:bg-muted/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
    prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-blockquote:bg-muted/20 prose-blockquote:py-1 prose-blockquote:rounded-r
    prose-hr:border-border prose-img:rounded-xl`;

  const mdComponents = {
    a: ({ href, children }: { href?: string; children?: React.ReactNode }) => {
      if (href?.startsWith("/")) {
        return (
          <Link to={href} className="text-primary hover:underline">
            {children}
          </Link>
        );
      }
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    },
    h2: ({ children }: { children?: React.ReactNode }) => {
      const text = String(Array.isArray(children) ? children.join("") : children ?? "");
      return <h2 id={slugify(text)}>{children}</h2>;
    },
    h3: ({ children }: { children?: React.ReactNode }) => {
      const text = String(Array.isArray(children) ? children.join("") : children ?? "");
      return <h3 id={slugify(text)}>{children}</h3>;
    },
  };

  // Split content at an H2 boundary near the midpoint so headings stay with their sections
  const splitAtMidH2 = (md: string): [string, string] => {
    const lines = md.split("\n");
    const h2Idx: number[] = [];
    lines.forEach((l, i) => { if (/^##\s+/.test(l)) h2Idx.push(i); });
    if (h2Idx.length < 3) return [md, ""];
    const target = h2Idx[Math.floor(h2Idx.length / 2)];
    return [lines.slice(0, target).join("\n"), lines.slice(target).join("\n")];
  };
  const [first, second] = splitAtMidH2(enhancedContent);

  const ServiceIcon = service.icon;
  const wordCount = enhancedContent.split(/\s+/).filter(Boolean).length;

  // Cleaner SEO title (avoid duplicated brand when title already contains it)
  const seoTitle = /skillta/i.test(post.title) ? post.title : `${post.title} | SkillTa`;

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
          getArticleSchema(post),
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
          getFAQSchema(faqs),
        ]}
      />
      <ReadingProgress />
      <AdsterraResponsiveBanner />

      <article className="container mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_260px] gap-10">
          {/* MAIN */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-w-0"
          >
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground mb-6 flex-wrap">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-primary">Blog</Link>
              <span>/</span>
              <span className="text-foreground truncate max-w-[200px] sm:max-w-none">{post.category}</span>
            </nav>

            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            {/* Meta */}
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <BookOpen className="w-3.5 h-3.5" />
                {wordCount.toLocaleString()} words
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.15] mb-5 tracking-tight">
              {post.title}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 border-l-2 border-primary/40 pl-4">
              {post.description}
            </p>

            {/* Author + Share */}
            <div className="flex items-center justify-between flex-wrap gap-4 pb-6 mb-8 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm">
                  ST
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">SkillTa Editorial</p>
                  <p className="text-xs text-muted-foreground">AI-assisted, human-reviewed for 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground mr-1 hidden sm:inline">Share:</span>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on X"
                  className="w-9 h-9 rounded-lg bg-card border border-border hover:border-primary/50 flex items-center justify-center transition-colors"
                >
                  <Twitter className="w-4 h-4 text-muted-foreground" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                  className="w-9 h-9 rounded-lg bg-card border border-border hover:border-primary/50 flex items-center justify-center transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-muted-foreground" />
                </a>
                <button
                  onClick={onCopy}
                  aria-label="Copy link"
                  className="w-9 h-9 rounded-lg bg-card border border-border hover:border-primary/50 flex items-center justify-center transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                </button>
              </div>
            </div>

            {/* Key Takeaways */}
            {takeaways.length > 0 && (
              <div className="mb-10 p-6 rounded-2xl bg-gradient-to-br from-primary/5 via-card to-accent/5 border border-primary/20">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-primary m-0">Key Takeaways</h2>
                </div>
                <ul className="space-y-2.5 list-none p-0 m-0">
                  {takeaways.map((t, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/90 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Mobile TOC */}
            {headings.length > 2 && (
              <details className="lg:hidden mb-8 rounded-xl border border-border bg-card p-4 group">
                <summary className="flex items-center gap-2 text-sm font-semibold text-foreground cursor-pointer list-none">
                  <ListTree className="w-4 h-4 text-primary" />
                  Table of Contents
                  <span className="ml-auto text-xs text-muted-foreground group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {headings.map((h) => (
                    <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
                      <a href={`#${h.id}`} className="text-muted-foreground hover:text-primary transition-colors">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            )}

            {/* Content — first half */}
            <div className={proseClass}>
              <ReactMarkdown components={mdComponents}>{first}</ReactMarkdown>
            </div>

            {/* Contextual mid-article service CTA */}
            <div className="my-10 p-6 md:p-7 rounded-2xl bg-card border border-border relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
              <div className="relative flex items-start gap-4 flex-wrap">
                <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <ServiceIcon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-[220px]">
                  <h3 className="text-lg font-bold text-foreground mb-1">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{service.text}</p>
                  <Link
                    to={service.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
                  >
                    {service.cta} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            <AdsterraNativeBanner />

            {/* Content — second half */}
            <div className={proseClass}>
              <ReactMarkdown components={mdComponents}>{second}</ReactMarkdown>
            </div>

            {/* FAQ */}
            <section className="mt-14" aria-labelledby="faq-heading">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-5 h-5 text-primary" />
                <h2 id="faq-heading" className="text-2xl font-bold text-foreground m-0">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-3">
                {faqs.map((f, i) => (
                  <details
                    key={i}
                    className="group rounded-xl bg-card border border-border p-5 open:border-primary/40 transition-colors"
                  >
                    <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                      <span className="font-semibold text-foreground">{f.question}</span>
                      <span className="text-primary text-xl leading-none group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{f.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* Final CTA */}
            <div className="mt-14 p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-primary/20 text-center">
              <BookOpen className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">Find Your Perfect Career Path</h3>
              <p className="text-muted-foreground text-sm mb-5 max-w-md mx-auto">
                Take our free AI-powered quiz to get a personalized career recommendation with a complete learning roadmap.
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <Link
                  to="/quiz"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                >
                  Take the Career Quiz <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/roadmaps"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-card border border-border font-semibold text-foreground hover:border-primary/50 transition-colors"
                >
                  Browse Roadmaps
                </Link>
              </div>
            </div>

            <ResumeReviewerCTA />

            {/* Related Posts */}
            <div className="mt-14">
              <h3 className="text-lg font-bold text-foreground mb-5">Continue Reading</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/blog/${p.slug}`}
                    className="block p-4 rounded-xl bg-card border border-border hover:border-primary/40 transition-all group"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-primary/10 text-primary">
                        {p.category}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{p.readTime}</span>
                    </div>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm leading-snug">
                      {p.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Explore More services grid */}
            <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { to: "/quiz", icon: Sparkles, label: "AI Career Quiz" },
                { to: "/roadmaps", icon: Map, label: "50+ Roadmaps" },
                { to: "/resume-reviewer", icon: FileText, label: "Resume Reviewer" },
                { to: "/skill-gap-analyzer", icon: Target, label: "Skill Gap Analyzer" },
                { to: "/salary-predictor", icon: DollarSign, label: "Salary Predictor" },
                { to: "/compare", icon: Share2, label: "Compare Careers" },
              ].map((s) => (
                <Link
                  key={s.to}
                  to={s.to}
                  className="flex items-center gap-2 p-3 rounded-xl bg-card border border-border hover:border-primary/40 transition-all group"
                >
                  <s.icon className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
                    {s.label}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* SIDEBAR — sticky TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {headings.length > 1 && (
                <nav aria-label="Table of contents" className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <ListTree className="w-4 h-4 text-primary" />
                    <p className="text-xs font-bold uppercase tracking-wider text-foreground">On this page</p>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {headings.map((h) => (
                      <li key={h.id} className={h.level === 3 ? "pl-3" : ""}>
                        <a
                          href={`#${h.id}`}
                          className="text-muted-foreground hover:text-primary transition-colors line-clamp-2 leading-snug"
                        >
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
              <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-accent/5 p-5">
                <Sparkles className="w-5 h-5 text-primary mb-2" />
                <p className="text-sm font-bold text-foreground mb-1">Not sure where to start?</p>
                <p className="text-xs text-muted-foreground mb-3">
                  Take the free 5-min AI quiz — get your ideal role + roadmap.
                </p>
                <Link
                  to="/quiz"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:gap-2 transition-all"
                >
                  Start Quiz <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}
