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
  TOP_SKILLS_2026,
  ROADMAP_CARDS,
  CERTIFICATIONS,
  GLOBAL_COMPANIES,
  INTERVIEW_TOPICS,
  getRoleSalaryBand,
} from "../src/data/countrySections";
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
${["/", "/quiz", "/roadmaps", "/compare", "/blog", "/salary-predictor", "/resume-reviewer", "/skill-gap-analyzer", "/about", "/contact"]
  .map((p) => `<li>${link(p, p === "/" ? "Home" : p.replace(/^\//, "").replace(/-/g, " "))}</li>`)
  .join("\n")}
</ul></nav>`;

/* ----------------------------------------------------------------- routes */

function staticRoutes(): Route[] {
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
      shell(`<h1>SkillTa — Free AI Career Quiz &amp; Tech Career Roadmaps 2026</h1>
<p>${esc(SITE_CONFIG.description)}</p>
<h2>Free services</h2>
${list([
  `${link("/quiz", "AI Career Quiz")} — 3 free attempts every day`,
  `${link("/salary-predictor", "Salary Predictor")} — unlimited 2026 salary estimates`,
  `${link("/roadmaps", "Roadmap Library")} — 60+ free step-by-step tech roadmaps`,
  `${link("/compare", "Compare Careers")} — side-by-side role comparison`,
  `${link("/resume-reviewer", "AI Resume Reviewer")} — ATS score and rewrites`,
  `${link("/skill-gap-analyzer", "Skill Gap Analyzer")} — personalized learning plan`,
])}
<h2>Popular roadmaps</h2>
${list(careers.slice(0, 12).map((c) => link(`/roadmaps/${c.id}`, `${c.title} Roadmap`)))}
<h2>Country tech career guides</h2>
${list(COUNTRIES.slice(0, 12).map((c) => link(`/${c.slug}`, `${c.name} Tech Career Guide 2026`)))}
${siteNav}`),
      [getWebsiteSchema(), getOrganizationSchema(), getSoftwareAppSchema(), getItemListSchema()],
    ),
    page(
      "quiz",
      shell(`<h1>Free AI Career Quiz 2026</h1>
<p>${esc(PAGE_SEO.quiz.description)}</p>
<p>${link("/roadmaps", "Browse roadmaps")} · ${link("/compare", "Compare careers")}</p>${siteNav}`),
      [getSoftwareAppSchema()],
    ),
    page(
      "roadmaps",
      shell(`<h1>60+ Free Tech Career Roadmaps (2026)</h1>
<p>${esc(PAGE_SEO.roadmaps.description)}</p>
${list(careers.map((c) => `${link(`/roadmaps/${c.id}`, c.title)} — ${esc(c.tagline)}`))}
${siteNav}`),
      [getItemListSchema()],
    ),
    page(
      "compare",
      shell(`<h1>Compare Tech Careers — Salary, Skills &amp; Demand (2026)</h1>
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
      "Free Tech Salary Predictor 2026 — Role, City & Experience | SkillTa",
      "Estimate your 2026 tech salary by role, experience, city and skills. Free, unlimited and based on real market bands.",
      "tech salary predictor 2026, software engineer salary calculator, it salary estimator, developer salary by city",
      "Tech Salary Predictor 2026",
      ["Unlimited free predictions", "Role, city and experience aware", "Skill premium adjustments", "Backed by 2026 market bands"],
    ),
    tool(
      "/resume-reviewer",
      "Free AI Resume Reviewer — ATS Score & Rewrites 2026 | SkillTa",
      "Upload your resume and get an instant ATS score, section-by-section feedback and rewritten bullet points. 3 free reviews every day.",
      "ai resume reviewer free, ats resume checker, resume score online, tech resume review 2026",
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

function roadmapRoutes(): Route[] {
  return careers.map((career) => ({
    path: `/roadmaps/${career.id}`,
    title: `${career.title} Roadmap — Step-by-Step Learning Path | SkillTa`,
    description: `Complete ${career.title} roadmap: ${career.tagline}. Learn ${career.requiredSkills
      .slice(0, 4)
      .join(", ")} and more. Includes resources, projects, salary info & reality check.`,
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
<h1>${esc(career.title)} Roadmap 2026</h1>
<p>${esc(career.tagline)}</p>
<p>${esc(career.description)}</p>
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
    const title = `${country.name} Tech Career Guide 2026 — Overview | SkillTa`;
    const description = `Overview for tech professionals in ${country.name}. Roles, salaries, roadmaps, resume tips, interview prep, top companies, certifications and more — updated for 2026.`;
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
<h1>${esc(country.name)} Tech Career Guide 2026</h1>
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
      const title = `${country.name} Tech Career Guide 2026 — ${section.title} | SkillTa`;
      const description = `${section.title} for tech professionals in ${country.name}. Roles, salaries, roadmaps, resume tips, interview prep, top companies, certifications and more — updated for 2026.`;

      let inner = "";
      switch (section.key) {
        case "jobs":
          inner = `<h2>Most in-demand tech roles in ${esc(country.name)}</h2>
<ul>${ROLES.map((r) => `<li><strong>${esc(r.role)}</strong> — demand ${esc(r.demand)}, growth ${esc(r.growth)}. Key skills: ${r.skills.slice(0, 4).map(esc).join(", ")}.</li>`).join("")}</ul>
<p>Hiring hubs: ${country.techHubs.map(esc).join(", ")}.</p>`;
          break;
        case "salary":
          inner = `<h2>${esc(country.name)} tech salaries 2026 (${esc(country.currency)})</h2>
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
          inner = `<h2>Skills in demand in ${esc(country.name)} for 2026</h2>
<ul>${TOP_SKILLS_2026.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
<p>${link("/skill-gap-analyzer", "Run a free skill gap analysis")} to see exactly what you are missing for your target role.</p>`;
          break;
        default:
          inner = `<h2>Career resources for ${esc(country.name)}</h2>
<ul>
<li>${link("/quiz", "AI Career Quiz")} — find your best-fit tech role.</li>
<li>${link("/salary-predictor", "Salary Predictor")} — unlimited 2026 estimates.</li>
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
        keywords: `${country.name} tech jobs, ${country.name} software engineer salary, ${country.name} tech career, tech roadmap ${country.name}, ${section.title} ${country.name} 2026`,
        type: "article",
        jsonLd: [
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: country.name, path: `/${country.slug}` },
            { name: section.title, path },
          ]),
        ],
        body: shell(`<article>
<h1>${esc(section.title)} in ${esc(country.name)} — Tech Career Guide 2026</h1>
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

function headFor(route: Route): string {
  const url = `${BASE}${route.path === "/" ? "/" : route.path}`;
  const ogImage = `${BASE}${SITE_CONFIG.ogImage}`;
  const tags = [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}" />`,
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

try {
  main();
} catch (err) {
  // Never fail the production build because of SEO prerendering.
  console.warn("[prerender] skipped due to error:", err);
}
