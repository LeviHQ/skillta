/**
 * Static SEO prerender (post-build).
 *
 * For the top N routes it writes `dist/<route>/index.html`: the exact same
 * built SPA shell, but with route-specific <title>, meta, canonical, og/twitter
 * tags and JSON-LD baked into the head, plus a crawlable HTML snapshot of the
 * page's main content inside #root.
 *
 * Nothing about the runtime app changes: React `createRoot().render()` clears
 * the container on mount, so users still get the normal SPA. Crawlers that do
 * not execute JS now get real HTML instead of an empty shell.
 *
 * Safe by design: if anything fails, the build still succeeds and Vercel falls
 * back to the SPA rewrite (existing behaviour).
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { careers } from "../src/data/careers";
import { blogPosts } from "../src/data/blogPosts";
import { countryBlogs } from "../src/data/countryBlogs";
import { COUNTRIES } from "../src/data/countries";
import {
  SECTIONS,
  ROLES,
  TOP_SKILLS_2027,
  ROADMAP_CARDS,
  CERTIFICATIONS,
  GLOBAL_COMPANIES,
  INTERVIEW_TOPICS,
  getRoleSalaryBand,
} from "../src/data/countrySections";
import { getCountryMeta } from "../src/lib/countryMeta";
import {
  SITE_CONFIG,
  getBaseUrl,
  PAGE_SEO,
  getArticleSchema,
  getBreadcrumbSchema,
  getCourseSchema,
  getOrganizationSchema,
  getWebsiteSchema,
  getSoftwareAppSchema,
  getItemListSchema,
} from "../src/lib/seo";
import { blocksToHtml } from "../src/lib/deepContent/types";
import { countryDeepBlocks } from "../src/lib/deepContent/country";
import { roadmapDeepBlocks } from "../src/lib/deepContent/roadmap";
import { blogDeepBlocks } from "../src/lib/deepContent/blog";
import { markdownPath } from "../src/lib/markdown/format";
import { isPublicPath } from "../src/lib/markdown/policy";
import { cleanCareerRows, getCatalogSummary, getCareerCatalogSchema, getCareerFacts, getRoadmapDescription, REPORT_YEAR } from "../src/lib/researchStats";
import { researchTitle, researchDescription, getResearchSchemas, getResearchFaqs, renderResearchHtml, renderFaqHtml, RESEARCH_PATH } from "../src/lib/researchContent";
import { getFAQSchema } from "../src/lib/seo";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = resolve(ROOT, "dist");
const BASE = getBaseUrl();

/**
 * Hard cap — safety valve only. Publish limits are 50,000 files / 3 GiB, so the
 * full site (~1,300 routes) sits far below. Lower via PRERENDER_MAX if needed.
 */
const MAX_PAGES = Number(process.env.PRERENDER_MAX ?? 5000);

interface Route {
  path: string;
  title: string;
  description: string;
  keywords?: string;
  type?: "website" | "article";
  publishedTime?: string;
  jsonLd?: object[];
  body: string;
}

/* ------------------------------------------------------------------ utils */

const esc = (s: string) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const ldEsc = (o: object) => JSON.stringify(o).replace(/</g, "\\u003c");

/** Minimal, dependency-free markdown → HTML for the crawlable snapshot. */
function mdToHtml(md: string): string {
  const lines = md.split("\n");
  const out: string[] = [];
  let inList = false;

  const inline = (t: string) =>
    esc(t)
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, txt, href) => `<a href="${esc(href)}">${txt}</a>`)
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/`([^`]+)`/g, "<code>$1</code>");

  const closeList = () => {
    if (inList) {
      out.push("</ul>");
      inList = false;
    }
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      closeList();
      continue;
    }
    if (/^\|/.test(line)) continue; // tables: skipped in the snapshot
    const h = /^(#{2,4})\s+(.*)$/.exec(line);
    if (h) {
      closeList();
      const level = Math.min(h[1].length, 4);
      out.push(`<h${level}>${inline(h[2])}</h${level}>`);
      continue;
    }
    if (/^[-*]\s+/.test(line)) {
      if (!inList) {
        out.push("<ul>");
        inList = true;
      }
      out.push(`<li>${inline(line.replace(/^[-*]\s+/, ""))}</li>`);
      continue;
    }
    closeList();
    out.push(`<p>${inline(line)}</p>`);
  }
  closeList();
  return out.join("\n");
}

const link = (href: string, text: string) => `<a href="${esc(href)}">${esc(text)}</a>`;

function shell(inner: string) {
  return `<div class="container mx-auto px-6 py-12 prose prose-invert max-w-3xl">${inner}</div>`;
}

const siteNav = `<nav aria-label="Primary"><ul>
${["/", "/quiz", "/roadmaps", "/compare", "/blog", "/research", "/faq", "/salary-predictor", "/resume-reviewer", "/skill-gap-analyzer", "/about", "/contact"]
  .map((p) => `<li>${link(p, p === "/" ? "Home" : p.replace(/^\//, "").replace(/-/g, " "))}</li>`)
  .join("\n")}
</ul></nav>
<section aria-label="Featured Badges" style="margin-top: 2rem;">
  <p>Featured on:</p>
  <p>
    <a href="https://www.scrolllaunch.com/products/skillta?ref=badge" target="_blank" rel="noopener">
      <img src="https://www.scrolllaunch.com/api/badge/skillta?variant=featured&theme=light" alt="SkillTa - Featured on ScrollLaunch" width="220" height="48" />
    </a>
    <a href="https://www.producthunt.com/products/skillta?utm_source=badge-follow&utm_medium=badge&utm_source=badge-skillta" target="_blank" rel="noopener noreferrer">
      <img src="https://api.producthunt.com/widgets/embed-image/v1/follow.svg?product_id=1242760&theme=light" alt="SkillTa on Product Hunt" width="160" height="40" />
    </a>
    <a href="https://fazier.com/launches/www.skillta.tech" target="_blank" rel="noopener noreferrer">
      <img src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=featured&theme=light" alt="Featured on Fazier" width="160" height="40" />
    </a>
    <a href="https://codehype.ai/product/skillta?utm_source=codehype_badge" target="_blank" rel="noopener noreferrer">
      <img src="https://codehype.ai/badges/skillta.svg?variant=find-us&v=20" alt="Featured on CodeHype" width="160" height="40" />
    </a>
    <a href="https://launchbuff.com/products/skillta-dz3ysa" target="_blank" rel="noopener noreferrer">
      <img src="https://launchbuff.com/badge-featured-light.svg" alt="Featured on LaunchBuff" width="160" height="40" />
    </a>
    <a href="https://launchnest.io/p/skillta" target="_blank" rel="noopener noreferrer">
      <img src="https://launchnest.io/badge/skillta.svg?variant=featured&theme=light" alt="Featured on LaunchNest" width="160" height="40" />
    </a>
    <a href="https://launchpadly.co/startup/skillta?ref=badge" target="_blank" rel="noopener noreferrer">
      <img src="https://launchpadly.co/embed/badges/startup/skillta.svg?variant=light" alt="Featured on Launchpadly" width="160" height="40" />
    </a>
    <a href="https://startupfa.st/projects/skillta" target="_blank" rel="noopener noreferrer">
      <img src="https://startupfa.st/badge-light.png" alt="Featured on Startup Fast" width="160" height="40" />
    </a>
    <a href="https://twelve.tools" target="_blank" rel="noopener noreferrer">
      <img src="https://twelve.tools/badge0-white.svg" alt="Featured on Twelve Tools" width="160" height="40" />
    </a>
    <a href="https://findly.tools/skillta?utm_source=skillta" target="_blank" rel="noopener noreferrer">
      <img src="https://findly.tools/badges/findly-tools-badge-light.svg" alt="Featured on Findly.tools" width="160" height="55" />
    </a>
    <a href="https://dofollow.tools" target="_blank" rel="noopener noreferrer">
      <img src="https://dofollow.tools/badge/badge_light.svg" alt="Featured on Dofollow.Tools" width="160" height="40" />
    </a>
    <a href="https://startupfa.me/s/skillta?utm_source=www.skillta.tech" target="_blank" rel="noopener noreferrer">
      <img src="https://startupfa.me/badges/featured-badge.webp" alt="SkillTa - Featured on Startup Fame" width="160" height="40" />
    </a>
    <a href="https://ufind.best/products/skillta" target="_blank" rel="noopener">
      <img src="https://ufind.best/badges/ufind-best-badge-light.svg" alt="Featured on ufind.best" width="160" height="40" />
    </a>
    <a href="https://verifieddr.com/website/skillta-tech" target="_blank" rel="noopener noreferrer">
      <img src="https://verifieddr.com/badge/skillta-tech.svg?metric=truedr" alt="Verified DR - Verified Domain Rating for skillta.tech" width="160" height="40" />
    </a>
  </p>
</section>`;

/* ----------------------------------------------------------------- routes */

export function staticRoutes(): Route[] {
  const page = (key: keyof typeof PAGE_SEO, body: string, jsonLd?: object[]): Route => {
    const s = PAGE_SEO[key];
    return {
      path: s.path,
      title: s.title,
      description: s.description,
      keywords: s.keywords,
      jsonLd,
      body,
    };
  };

  const list = (items: string[]) => `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;

  const routes: Route[] = [
    page(
      "home",
      shell(`<h1>SkillTa — Free AI Career Quiz &amp; Tech Career Roadmaps 2027</h1>
<p>${esc(SITE_CONFIG.description)}</p>
<h2>Free services</h2>
${list([
  `${link("/quiz", "AI Career Quiz")} — 3 free attempts every day`,
  `${link("/salary-predictor", "Salary Predictor")} — unlimited 2027 salary estimates`,
  `${link("/roadmaps", "Roadmap Library")} — 60+ free step-by-step tech roadmaps`,
  `${link("/compare", "Compare Careers")} — side-by-side role comparison`,
  `${link("/resume-reviewer", "AI Resume Reviewer")} — ATS score and rewrites`,
  `${link("/skill-gap-analyzer", "Skill Gap Analyzer")} — personalized learning plan`,
])}
<h2>Popular roadmaps</h2>
${list(careers.slice(0, 12).map((c) => link(`/roadmaps/${c.id}`, `${c.title} Roadmap`)))}
<h2>Country tech career guides</h2>
${list(COUNTRIES.slice(0, 12).map((c) => link(`/${c.slug}`, `${c.name} Tech Career Guide 2027`)))}
${siteNav}`),
      [getWebsiteSchema(), getOrganizationSchema(), getSoftwareAppSchema(), getItemListSchema()],
    ),
    page(
      "quiz",
      shell(`<h1>Free AI Career Quiz 2027</h1>
<p>${esc(PAGE_SEO.quiz.description)}</p>
<p>${link("/roadmaps", "Browse roadmaps")} · ${link("/compare", "Compare careers")}</p>${siteNav}`),
      [getSoftwareAppSchema()],
    ),
    page(
      "roadmaps",
      shell(`<h1>${cleanCareerRows(careers).length} Tech Career Roadmaps (${REPORT_YEAR})</h1>
<p>${esc(getCatalogSummary())}</p><p>${link(RESEARCH_PATH, "Career catalog statistics & methodology")}</p>
${list(cleanCareerRows(careers).map((c) => `${link(`/roadmaps/${c.id}`, c.title)} — ${esc(c.tagline)}`))}
${siteNav}`),
      [getCareerCatalogSchema()],
    ),
    page(
      "compare",
      shell(`<h1>Compare Tech Careers — Salary, Skills &amp; Demand (2027)</h1>
<p>${esc(PAGE_SEO.compare.description)}</p>
${list(careers.slice(0, 20).map((c) => `${link(`/roadmaps/${c.id}`, c.title)} — ${esc(c.salaryGlobal)}`))}
${siteNav}`),
    ),
    page(
      "blog",
      shell(`<h1>SkillTa Tech Career Blog — Guides, Salaries &amp; Roadmaps</h1>
<p>${esc(PAGE_SEO.blog.description)}</p>
${list(blogPosts.slice(0, 60).map((p) => `${link(`/blog/${p.slug}`, p.title)} — ${esc(p.description.slice(0, 140))}`))}
${siteNav}`),
    ),
    page(
      "about",
      shell(`<h1>About SkillTa</h1><p>${esc(PAGE_SEO.about.description)}</p>${siteNav}`),
      [getOrganizationSchema()],
    ),
    page(
      "contact",
      shell(`<h1>Contact SkillTa</h1><p>${esc(PAGE_SEO.contact.description)}</p>${siteNav}`),
    ),
    page("privacy", shell(`<h1>Privacy Policy</h1><p>${esc(PAGE_SEO.privacy.description)}</p>${siteNav}`)),
    page("terms", shell(`<h1>Terms of Service</h1><p>${esc(PAGE_SEO.terms.description)}</p>${siteNav}`)),
  ];

  const roadmapList = routes.find((route) => route.path === "/roadmaps");
  if (roadmapList) {
    roadmapList.title = `${cleanCareerRows(careers).length} Tech Career Roadmaps (${REPORT_YEAR}) | SkillTa`;
    roadmapList.description = getCatalogSummary();
  }
  routes.push(
    { path: "/research", title: "SkillTa Research — Public Career Catalog Data", description: "Explore SkillTa's authored career catalog statistics, with calculated counts, editorial-label breakdowns and transparent methodology.", body: shell(`<h1>SkillTa Research</h1><p>Counts and editorial assessments from SkillTa's public career catalog. No private user data.</p><h2>${link(RESEARCH_PATH, researchTitle())}</h2><p>${esc(researchDescription())}</p>${siteNav}`) },
    { path: RESEARCH_PATH, title: researchTitle(), description: researchDescription(), jsonLd: [...getResearchSchemas(), getBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Research", path: "/research" }, { name: "Tech Careers", path: RESEARCH_PATH }])], body: shell(`${renderResearchHtml()}${siteNav}`) },
    { path: "/faq", title: "Tech Career Catalog FAQ — SkillTa", description: "Answers about SkillTa's career counts, editorial labels, learning resources, public data sources and research citations.", jsonLd: [getFAQSchema(getResearchFaqs()), getBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }])], body: shell(`<h1>Tech Career Catalog FAQ</h1>${renderFaqHtml()}<p>${link(RESEARCH_PATH, "Read the full report")}</p>${siteNav}`) },
    { path: "/vs/roadmap-sh", title: "SkillTa vs Roadmap.sh — Which Developer Career Platform is Right for You? (2027)", description: "Comprehensive 2027 comparison between SkillTa and Roadmap.sh. Compare learning structures, AI career quizzes, ATS resume reviews, skill gap analysis, and global salary predictors.", keywords: "roadmap sh alternative, skillta vs roadmap.sh, best developer roadmaps, tech career roadmaps 2027, learn coding roadmap", body: shell(`<h1>SkillTa vs Roadmap.sh: Which Platform is Right for You? (2027)</h1> <p>Comparing open-source flowcharts against an AI-powered career guidance suite. Discover how each platform helps software developers and career switchers navigate modern tech careers.</p> <h2>At a Glance Comparison</h2> <ul>
<li><strong>Learning Structure:</strong> Roadmap.sh uses open-source mindmaps &amp; flowcharts; SkillTa provides a structured 4-phase progressive curriculum with hands-on projects.</li>
<li><strong>AI Career Guidance Quiz:</strong> Roadmap.sh has no diagnostic quiz; SkillTa features a personalized 10-question AI diagnostic matching personality and skills.</li>
<li><strong>Skill Gap Analyzer:</strong> Roadmap.sh has none; SkillTa pinpoints missing skills and generates a tailored bridge plan.</li>
<li><strong>ATS Resume Reviewer:</strong> Roadmap.sh has none; SkillTa offers instant ATS scoring, bullet rewrites, and resume version control.</li>
<li><strong>2027 Salary Predictor:</strong> Roadmap.sh has none; SkillTa covers real salary bands across 50+ countries and global tech hubs.</li>
</ul>
<h2>Frequently Asked Questions</h2>
<h3>Is SkillTa a complete alternative to Roadmap.sh?</h3>
<p>Yes. Beyond developer roadmaps, SkillTa provides an end-to-end guidance suite with an AI Career Quiz, ATS Resume Reviewer, and country-wise salary benchmarks.</p>
<h3>Can I use both platforms together?</h3>
<p>Absolutely. Many developers explore Roadmap.sh for high-level ecosystem charts and rely on SkillTa to test fit, follow structured phases, and optimize their resumes.</p>
${siteNav}`),
    },
        {
      path: "/vs/careerexplorer",
      title: "SkillTa vs CareerExplorer (2027) — Best Tech Career Guidance Alternative",
      description: "Looking for a CareerExplorer alternative? Compare SkillTa vs CareerExplorer. Discover free structured tech roadmaps, fast AI career diagnosis, ATS resume scoring, and 2027 salary data across 50+ countries.",
      keywords: "careerexplorer alternative, skillta vs careerexplorer, free career test tech, career quiz software engineer, tech career roadmaps 2027",
      body: shell(`<h1>SkillTa vs CareerExplorer: Which Platform is Right for You? (2027)</h1> <p>Comparing general psychometric tests against an actionable, tech-specialized career guidance suite. Discover why software engineers, students, and tech switchers choose SkillTa.</p> <h2>At a Glance Comparison</h2> <ul>
<li><strong>Tech Specialization:</strong> CareerExplorer covers broad non-tech industries; SkillTa is deeply focused on 60+ specialized tech and AI engineering roles.</li>
<li><strong>Actionable Curricula:</strong> CareerExplorer has no curricula; SkillTa provides curated 4-phase progressive roadmaps with hands-on projects.</li>
<li><strong>Diagnostic Speed:</strong> CareerExplorer uses a 30+ minute general assessment; SkillTa offers a fast 10-question AI diagnostic matching tech mindsets.</li>
<li><strong>ATS Resume Reviewer:</strong> CareerExplorer has none; SkillTa includes AI bullet optimization, ATS compatibility scoring, and version control.</li>
<li><strong>2027 Salary Predictor:</strong> CareerExplorer locks international data behind paywalls; SkillTa provides free verified benchmarks across 50+ countries.</li>
</ul>
<h2>Frequently Asked Questions</h2>
<h3>How does SkillTa differ from CareerExplorer by Sokanu?</h3>
<p>CareerExplorer is a broad psychometric quiz platform with paid paywalls. SkillTa is laser-focused on technology careers with 100% free roadmaps, ATS resume optimization, and global salary data.</p>
${siteNav}`),
    },
        {
      path: "/vs/coding-bootcamps",
      title: "SkillTa vs Coding Bootcamps (2027) — Free Self-Paced Developer Roadmaps",
      description: "Looking for an alternative to $15,000 coding bootcamps? Compare SkillTa vs Coding Bootcamps. Get 100% free structured 4-phase roadmaps, AI career diagnosis, ATS resume scoring, and 2027 salary data.",
      keywords: "coding bootcamp alternative, free coding bootcamp alternative, self taught developer vs bootcamp 2027, learn coding free, tech career roadmaps",
      body: shell(`<h1>SkillTa vs Coding Bootcamps: Skip the $15,000 Debt, Keep the Career Growth (2027)</h1> <p>Comparing high-cost, high-pressure 12-week coding bootcamps against a flexible, free, AI-guided career suite. Discover how self-directed learners build standout portfolios in 2027.</p> <h2>At a Glance Comparison</h2> <ul>
<li><strong>Cost &amp; Tuition:</strong> Bootcamps charge $10,000 to $25,000+ or income share agreements; SkillTa offers 100% free core roadmaps, quizzes, and career tools.</li>
<li><strong>Schedule:</strong> Bootcamps use rigid full-time cohort calendars; SkillTa is completely self-paced across 4 structured phases.</li>
<li><strong>Curriculum Scope:</strong> Bootcamps focus mostly on web dev; SkillTa features 60+ specialized paths across AI/ML, DevOps, Cybersecurity, Cloud, and Software Engineering.</li>
<li><strong>Projects:</strong> Bootcamps produce identical student clone apps; SkillTa provides curated milestone projects for distinct resume portfolios.</li>
<li><strong>ATS Resume Reviewer:</strong> Bootcamps rely on generic manual templates; SkillTa includes instant AI bullet scoring, keyword matching, and version control.</li>
<li><strong>2027 Salary Bands:</strong> Bootcamps quote narrow US medians; SkillTa provides verified localized benchmarks across 50+ countries.</li>
</ul>
<h2>Frequently Asked Questions</h2>
<h3>Can I realistically land a tech job using SkillTa instead of an expensive coding bootcamp?</h3>
<p>Yes. Tech employers prioritize demonstrated portfolio projects and problem-solving over bootcamp certificates. SkillTa gives you 4-phase curricula and ATS resume tools with zero tuition debt.</p>
${siteNav}`),
    },
        {
      path: "/vs/leetcode",
      title: "SkillTa vs LeetCode (2027) — Beyond the DSA Grind to Real Tech Careers",
      description: "Wondering if LeetCode is enough to get hired in 2027? Compare SkillTa vs LeetCode. Get free structured 4-phase tech roadmaps, real portfolio projects, AI career quiz, ATS resume scoring, and global salary data.",
      keywords: "leetcode alternative, skillta vs leetcode, is leetcode enough to get a job 2027, learn software engineering without leetcode, tech career roadmap",
      body: shell(`<h1>SkillTa vs LeetCode: Real Software Engineering vs Algorithmic Grinding (2027)</h1> <p>Comparing isolated algorithm puzzles against an end-to-end career guidance platform. Discover how modern developers land top roles by building real software instead of grinding hundreds of DSA problems.</p> <h2>At a Glance Comparison</h2> <ul>
<li><strong>Scope:</strong> LeetCode focuses exclusively on isolated competitive coding and DSA puzzles; SkillTa guides full-cycle careers with 4-phase curricula and production architecture.</li>
<li><strong>Portfolio Projects:</strong> LeetCode provides zero real-world portfolio projects; SkillTa delivers milestone project specs for distinct GitHub portfolios.</li>
<li><strong>Career Diagnostics:</strong> LeetCode offers no career fit tools; SkillTa features an intelligent 10-question AI Career Quiz.</li>
<li><strong>ATS Resume Reviewer:</strong> LeetCode has none; SkillTa includes AI bullet optimization, ATS compatibility scoring, and version control.</li>
<li><strong>2027 Global Salaries:</strong> LeetCode has no salary tools; SkillTa covers verified benchmarks across 50+ countries.</li>
<li><strong>Cost:</strong> LeetCode charges up to $159/year for company interview tags; SkillTa provides 100% free core roadmaps and career tools.</li>
</ul>
<h2>Frequently Asked Questions</h2>
<h3>Is grinding LeetCode alone enough to get a tech job in 2027?</h3>
<p>No. Modern engineering teams prioritize production architecture, system design, and hands-on portfolio projects. SkillTa gives you complete 4-phase roadmaps from fundamentals to deployment.</p>
${siteNav}`),
    },
        {
      path: "/vs/coursera",
      title: "SkillTa vs Coursera (2027) — Free Actionable Developer Roadmaps vs Video Courses",
      description: "Looking for a Coursera alternative? Compare SkillTa vs Coursera. Skip 40-hour video lectures and expensive certificates for free structured 4-phase tech roadmaps, ATS resume reviews, and 2027 salary data.",
      keywords: "coursera alternative, skillta vs coursera, are coursera certificates worth it 2027, free developer roadmap vs courses, learn tech free",
      body: shell(`<h1>SkillTa vs Coursera: Actionable Tech Roadmaps vs 40-Hour Video Lectures (2027)</h1> <p>Comparing long, passive video marathons against progressive 4-phase project curricula. Discover why developers escape tutorial hell with SkillTa’s free execution suite.</p> <h2>At a Glance Comparison</h2> <ul>
<li><strong>Learning Style:</strong> Coursera uses 40-hour passive video lecture marathons; SkillTa delivers progressive 4-phase hands-on milestone roadmaps.</li>
<li><strong>Certificates &amp; Cost:</strong> Coursera charges $49/month or $399/year for certificates; SkillTa provides 100% free core roadmaps, quizzes, and developer career tools.</li>
<li><strong>Completion Velocity:</strong> Coursera suffers from video fatigue and tutorial hell; SkillTa breaks down roadmaps into manageable project milestones.</li>
<li><strong>AI Career Guidance:</strong> Coursera offers generic browsing suggestions; SkillTa features an intelligent 10-question AI Career Quiz.</li>
<li><strong>ATS Resume Reviewer:</strong> Coursera has none; SkillTa includes AI bullet rewrites, ATS match scoring, and version control.</li>
<li><strong>2027 Global Salaries:</strong> Coursera has none; SkillTa provides verified developer compensation data across 50+ countries.</li>
</ul>
<h2>Frequently Asked Questions</h2>
<h3>Are Coursera certificates worth paying for in 2027?</h3>
<p>Modern engineering managers prioritize verifiable GitHub repositories, deployed applications, and ATS-optimized resumes over paid video certificates. SkillTa focuses directly on portfolio building and real-world skills.</p>
${siteNav}`),
    },
  );

  const tool = (path: string, title: string, description: string, keywords: string, h1: string, points: string[]): Route => ({
    path,
    title,
    description,
    keywords,
    body: shell(`<h1>${esc(h1)}</h1><p>${esc(description)}</p>${list(points.map(esc))}${siteNav}`),
  });

  routes.push(
    tool(
      "/salary-predictor",
      "Free Tech Salary Predictor 2027 — Role, City & Experience | SkillTa",
      "Estimate your 2027 tech salary by role, experience, city and skills. Free, unlimited and based on real market bands.",
      "tech salary predictor 2027, software engineer salary calculator, it salary estimator, developer salary by city",
      "Tech Salary Predictor 2027",
      ["Unlimited free predictions", "Role, city and experience aware", "Skill premium adjustments", "Backed by 2027 market bands"],
    ),
    tool(
      "/resume-reviewer",
      "Free AI Resume Reviewer — ATS Score & Rewrites 2027 | SkillTa",
      "Upload your resume and get an instant ATS score, section-by-section feedback and rewritten bullet points. 3 free reviews every day.",
      "ai resume reviewer free, ats resume checker, resume score online, tech resume review 2027",
      "AI Resume Reviewer",
      ["Instant ATS compatibility score", "Bullet point rewrites", "Keyword gap detection", "Downloadable PDF report"],
    ),
    tool(
      "/skill-gap-analyzer",
      "Free Skill Gap Analyzer — Learn Exactly What You're Missing | SkillTa",
      "Compare your current skills against any tech role and get a prioritized 8-week learning plan. Free, 3 analyses per day.",
      "skill gap analysis tool, tech skills assessment free, learning plan generator, what skills do i need for developer job",
      "Skill Gap Analyzer",
      ["Role-by-role skill matching", "Prioritized 8-week plan", "Free curated resources", "Progress-friendly checklists"],
    ),
    tool(
      "/story",
      "The SkillTa Story — Why We Built Free Career Guidance | SkillTa",
      "How SkillTa started and why every core career tool on the platform is free for students, freshers and switchers.",
      "skillta story, about founder, free career guidance platform",
      "The SkillTa Story",
      ["Built for students and freshers", "Free core tools, forever", "Honest, data-driven guidance"],
    ),
    tool(
      "/resume-version-control",
      "Resume Version Control — Track ATS Score Evolution | SkillTa",
      "GitHub-style commit timeline for your resume. Track ATS score evolution, file history, and role-specific versions with secure cloud storage.",
      "resume version control, resume commit history, track ats score, resume changelog, resume iteration tracker",
      "Resume Version Control",
      [
        "GitHub-style dated commit timeline",
        "ATS score delta tracking (+/- score improvements)",
        "Role-specific resume versions & job descriptions",
        "Secure cloud file storage with instant 1-click download",
      ],
    ),
  );

  return routes;
}

function blogRoutes(): Route[] {
  return blogPosts.map((post) => {
    const title = /skillta/i.test(post.title) ? post.title : `${post.title} | SkillTa`;
    return {
      path: `/blog/${post.slug}`,
      title,
      description: post.description,
      keywords: post.keywords,
      type: "article" as const,
      publishedTime: post.date,
      jsonLd: [
        getArticleSchema(post),
        getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]),
      ],
      body: shell(`<article>
<h1>${esc(post.title)}</h1>
<p><time datetime="${esc(post.date)}">${esc(post.date)}</time> · ${esc(post.readTime)} · ${esc(post.category)}</p>
<p>${esc(post.description)}</p>
${mdToHtml(post.content)}
${blocksToHtml(blogDeepBlocks(post))}
</article>
<p>${link("/blog", "More career guides")} · ${link("/quiz", "Take the free career quiz")} · ${link("/roadmaps", "Browse roadmaps")}</p>
${siteNav}`),
    };
  });
}

export function roadmapRoutes(): Route[] {
  return cleanCareerRows(careers).map((career) => ({
    path: `/roadmaps/${career.id}`,
    title: `${career.title} Roadmap — Step-by-Step Learning Path | SkillTa`,
    description: getRoadmapDescription(career),
    keywords: `${career.title.toLowerCase()} roadmap, how to become a ${career.title.toLowerCase()}, ${career.requiredSkills
      .slice(0, 3)
      .join(", ")
      .toLowerCase()}`,
    jsonLd: [
      getCourseSchema(career),
      getBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Roadmaps", path: "/roadmaps" },
        { name: career.title, path: `/roadmaps/${career.id}` },
      ]),
    ],
    body: shell(`<article>
<h1>${esc(career.title)} Roadmap 2027</h1>
<p>${esc(career.tagline)}</p>
<p>${esc(career.description)}</p>
<section aria-labelledby="at-a-glance"><h2 id="at-a-glance">At a Glance</h2><dl>${Object.entries(getCareerFacts(career)).map(([label, value]) => `<dt>${esc(label)}</dt><dd>${value}</dd>`).join("")}</dl><p>Counts are entries in this authored roadmap, not unique projects or providers.</p><p>${link(RESEARCH_PATH, "Career catalog research")}</p></section>
<h2>Key facts</h2>
<ul>
<li>Difficulty: ${esc(career.learningDifficulty)}</li>
<li>Time to job-ready: ${esc(career.estimatedTime)}</li>
<li>Demand: ${esc(career.demandLevel)}</li>
<li>Salary (India): ${esc(career.salaryIndia)}</li>
<li>Salary (Global): ${esc(career.salaryGlobal)}</li>
<li>Growth: ${esc(career.growthPotential)}</li>
</ul>
<h2>Skills you need</h2>
<ul>${career.requiredSkills.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
<h2>Step-by-step roadmap</h2>
${career.roadmap
  .map(
    (phase) => `<h3>Phase ${phase.phase}: ${esc(phase.title)} (${esc(phase.duration)})</h3>
<ul>${phase.items.map((i) => `<li><strong>${esc(i.name)}</strong> — ${esc(i.description)}</li>`).join("")}</ul>
<p><strong>Resources:</strong> ${phase.resources.map(esc).join(", ")}</p>
<p><strong>Projects:</strong> ${phase.projects.map(esc).join(", ")}</p>`,
  )
  .join("\n")}
<h2>Reality check</h2>
<p>${esc(career.realityCheck.honestNote)}</p>
${blocksToHtml(roadmapDeepBlocks(career))}
</article>
<p>${link("/roadmaps", "All roadmaps")} · ${link("/quiz", "Is this career right for me?")} · ${link("/compare", "Compare with other careers")}</p>
${siteNav}`),
  }));
}

function countryRoutes(): Route[] {
  return COUNTRIES.map((country) => {
    const { title, description } = getCountryMeta("overview", country.name);
    return {
      path: `/${country.slug}`,
      title,
      description,
      keywords: `${country.name} tech jobs, ${country.name} software engineer salary, ${country.name} tech career, tech roadmap ${country.name}`,
      type: "article" as const,
      jsonLd: [
        getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: country.name, path: `/${country.slug}` },
        ]),
      ],
      body: shell(`<article>
<h1>${esc(country.name)} Tech Career Guide 2027</h1>
<p>${esc(country.marketNote)}</p>
<h2>Tech hubs</h2>
<ul>${country.techHubs.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
<h2>Top local employers</h2>
<ul>${country.topCompaniesLocal.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
<h2>Sections in this guide</h2>
<ul>
${[
  ["top-tech-jobs", "Top Tech Jobs"],
  ["salary-explorer", "Salary Explorer"],
  ["tech-roadmaps", "Tech Roadmaps"],
  ["resume-guide", "Resume Guide"],
  ["interview-preparation", "Interview Preparation"],
  ["top-companies", "Top Companies"],
  ["certifications", "Certifications"],
  ["skills-in-demand", "Skills in Demand"],
  ["career-resources", "Career Resources"],
]
  .map(([slug, label]) => `<li>${link(`/${country.slug}/${slug}`, `${label} in ${country.name}`)}</li>`)
  .join("\n")}
</ul>
<p>Currency: ${esc(country.currency)} · Timezone: ${esc(country.timezone)} · Language: ${esc(country.language)}</p>
${blocksToHtml(countryDeepBlocks(country, "overview"))}
</article>
${siteNav}`),
    };
  });
}

/** /:country/:section — 9 sub-sections per country. */
function countrySectionRoutes(): Route[] {
  const routes: Route[] = [];

  for (const country of COUNTRIES) {
    const sectionNav = `<ul>${SECTIONS.filter((s) => s.slug)
      .map((s) => `<li>${link(`/${country.slug}/${s.slug}`, `${s.title} in ${country.name}`)}</li>`)
      .join("")}</ul>`;

    for (const section of SECTIONS) {
      if (!section.slug) continue; // overview is handled by countryRoutes()

      const path = `/${country.slug}/${section.slug}`;
      // Titles/descriptions must match CountryPage.tsx exactly.
      const { title, description } = getCountryMeta(section.key, country.name);

      let inner = "";
      switch (section.key) {
        case "jobs":
          inner = `<h2>Most in-demand tech roles in ${esc(country.name)}</h2>
<ul>${ROLES.map((r) => `<li><strong>${esc(r.role)}</strong> — demand ${esc(r.demand)}, growth ${esc(r.growth)}. Key skills: ${r.skills.slice(0, 4).map(esc).join(", ")}.</li>`).join("")}</ul>
<p>Hiring hubs: ${country.techHubs.map(esc).join(", ")}.</p>`;
          break;
        case "salary":
          inner = `<h2>${esc(country.name)} tech salaries 2027 (${esc(country.currency)})</h2>
<ul>${ROLES.map((r) => {
            const b = getRoleSalaryBand(country, r);
            return `<li><strong>${esc(r.role)}</strong> — junior ${esc(b.junior)}, mid ${esc(b.mid)}, senior ${esc(b.senior)} per year.</li>`;
          }).join("")}</ul>
<p>Figures are annual gross bands scaled to the ${esc(country.name)} market. Try the ${link("/salary-predictor", "free salary predictor")} for a personalized estimate.</p>`;
          break;
        case "roadmaps":
          inner = `<h2>Step-by-step tech roadmaps for ${esc(country.name)}</h2>
<ul>${ROADMAP_CARDS.map((c) => `<li>${link(`/roadmaps/${c.slug}`, `${c.title} Roadmap`)} — ${esc(c.desc)} (${esc(c.level)})</li>`).join("")}</ul>
<p>${link("/roadmaps", "Browse all 60+ roadmaps")} · ${link("/quiz", "Take the free career quiz")}</p>`;
          break;
        case "resume":
          inner = `<h2>How to write a tech resume for ${esc(country.name)}</h2>
<ul>
<li>Keep it to one page (two only with 8+ years of experience).</li>
<li>Match 60–80% of the job description keywords verbatim so ATS parsers score you higher.</li>
<li>Use standard headings: Experience, Education, Skills, Projects.</li>
<li>Quantify every bullet — impact, scale, percentage, latency, revenue.</li>
<li>List exact tech names (React, Kubernetes, PostgreSQL) rather than vague phrasing.</li>
<li>Save and send as PDF unless the employer asks otherwise.</li>
</ul>
<p>${link("/resume-reviewer", "Get a free ATS score and rewrites")} with the SkillTa AI Resume Reviewer.</p>`;
          break;
        case "interview":
          inner = `<h2>Interview preparation for tech roles in ${esc(country.name)}</h2>
<h3>Coding round topics</h3><ul>${INTERVIEW_TOPICS.coding.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
<h3>System design questions</h3><ul>${INTERVIEW_TOPICS.systemDesign.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
<h3>Behavioral questions</h3><ul>${INTERVIEW_TOPICS.behavioral.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
<h3>HR round questions</h3><ul>${INTERVIEW_TOPICS.hr.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;
          break;
        case "companies":
          inner = `<h2>Top tech employers hiring in ${esc(country.name)}</h2>
<h3>Local leaders</h3><ul>${country.topCompaniesLocal.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
<h3>Global companies hiring here</h3><ul>${GLOBAL_COMPANIES.map((c) => `<li>${esc(c.name)}</li>`).join("")}</ul>
<p>Main hiring locations: ${country.techHubs.map(esc).join(", ")}.</p>`;
          break;
        case "certifications":
          inner = `<h2>Certifications worth doing in ${esc(country.name)}</h2>
<ul>${CERTIFICATIONS.map((c) => `<li><strong>${esc(c.name)}</strong> (${esc(c.provider)}) — ${esc(c.why)}</li>`).join("")}</ul>`;
          break;
        case "skills":
          inner = `<h2>Skills in demand in ${esc(country.name)} for 2027</h2>
<ul>${TOP_SKILLS_2027.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
<p>${link("/skill-gap-analyzer", "Run a free skill gap analysis")} to see exactly what you are missing for your target role.</p>`;
          break;
        default:
          inner = `<h2>Career resources for ${esc(country.name)}</h2>
<ul>
<li>${link("/quiz", "AI Career Quiz")} — find your best-fit tech role.</li>
<li>${link("/salary-predictor", "Salary Predictor")} — unlimited 2027 estimates.</li>
<li>${link("/resume-reviewer", "AI Resume Reviewer")} — ATS score and rewrites.</li>
<li>${link("/skill-gap-analyzer", "Skill Gap Analyzer")} — personalized learning plan.</li>
<li>${link("/roadmaps", "Roadmap Library")} — 60+ step-by-step paths.</li>
<li>${link("/compare", "Compare Careers")} — side-by-side role comparison.</li>
<li>${link("/blog", "SkillTa Blog")} — country and role-specific salary guides.</li>
</ul>`;
      }

      routes.push({
        path,
        title,
        description,
        keywords: `${country.name} tech jobs, ${country.name} software engineer salary, ${country.name} tech career, tech roadmap ${country.name}, ${section.title} ${country.name} 2027`,
        type: "article",
        jsonLd: [
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: country.name, path: `/${country.slug}` },
            { name: section.title, path },
          ]),
        ],
        body: shell(`<article>
<h1>${esc(section.title)} in ${esc(country.name)} — Tech Career Guide 2027</h1>
<p>${esc(country.marketNote)}</p>
${inner}
${blocksToHtml(countryDeepBlocks(country, section.key))}
</article>
<h2>More ${esc(country.name)} guides</h2>
${sectionNav}
<p>${link(`/${country.slug}`, `${country.name} tech career guide overview`)}</p>
${siteNav}`),
      });
    }
  }

  return routes;
}



/* ------------------------------------------------------------------ write */

export function headFor(route: Route): string {
  const url = `${BASE}${route.path === "/" ? "/" : route.path}`;
  const ogImage = `${BASE}${SITE_CONFIG.ogImage}`;
  const tags = [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}" />`,
    isPublicPath(route.path) ? `<meta name="ai-summary" content="${esc(route.description)}" />` : "",
    isPublicPath(route.path) ? `<link rel="alternate" type="text/markdown" href="${esc(`${BASE}${markdownPath(route.path)}`)}" />` : "",
    route.keywords ? `<meta name="keywords" content="${esc(route.keywords)}" />` : "",
    `<meta name="author" content="${esc(SITE_CONFIG.author)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:type" content="${route.type ?? "website"}" />`,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(ogImage)}" />`,
    `<meta property="og:site_name" content="${esc(SITE_CONFIG.name)}" />`,
    `<meta property="og:locale" content="${esc(SITE_CONFIG.locale)}" />`,
    route.publishedTime ? `<meta property="article:published_time" content="${esc(route.publishedTime)}" />` : "",
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="${esc(SITE_CONFIG.twitterHandle)}" />`,
    `<meta name="twitter:title" content="${esc(route.title)}" />`,
    `<meta name="twitter:description" content="${esc(route.description)}" />`,
    `<meta name="twitter:image" content="${esc(ogImage)}" />`,
    ...(route.jsonLd ?? []).map((s) => `<script type="application/ld+json">${ldEsc(s)}</script>`),
  ];
  return tags.filter(Boolean).join("\n    ");
}

function main() {
  if (!existsSync(DIST)) {
    console.warn("[prerender] dist/ not found — skipping.");
    return;
  }
  const templatePath = resolve(DIST, "index.html");
  if (!existsSync(templatePath)) {
    console.warn("[prerender] dist/index.html not found — skipping.");
    return;
  }

  const template = readFileSync(templatePath, "utf8");

  // Priority order: core pages → roadmaps → editorial blogs → country hubs →
  // country/role salary blogs → country sub-sections. The cap cuts from the bottom.
  const blogs = blogRoutes();
  const editorialCount = Math.max(0, blogPosts.length - countryBlogs.length);
  const all = [
    ...staticRoutes(),
    ...roadmapRoutes(),
    ...blogs.slice(0, editorialCount),
    ...countryRoutes(),
    ...blogs.slice(editorialCount),
    ...countrySectionRoutes(),
  ];
  const seen = new Set<string>();
  const routes = all.filter((r) => (seen.has(r.path) ? false : (seen.add(r.path), true))).slice(0, MAX_PAGES);

  let written = 0;
  for (const route of routes) {
    // Strip the fallback head tags the SPA shell ships with, then inject ours.
    let html = template
      .replace(/<title>[\s\S]*?<\/title>/i, "")
      .replace(/<meta\s+(?:name="(?:description|twitter:(?:card|title|description))"|property="og:(?:title|description|type)")[^>]*>/gi, "")
      .replace(/<meta\s+property="og:image"[^>]*>/gi, "")
      .replace(/<meta\s+name="twitter:image"[^>]*>/gi, "");

    html = html.replace("</head>", `  ${headFor(route)}\n  </head>`);
    html = html.replace('<div id="root"></div>', `<div id="root">${route.body}</div>`);

    const outPath =
      route.path === "/" ? resolve(DIST, "index.html") : resolve(DIST, `.${route.path}`, "index.html");
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html, "utf8");
    written++;
  }

  console.log(`[prerender] ${written} pages written to dist/ (cap ${MAX_PAGES}).`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (err) {
    // Never fail the production build because of SEO prerendering.
    console.warn("[prerender] skipped due to error:", err);
  }
}
