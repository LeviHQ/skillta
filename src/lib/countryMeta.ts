// Country ecosystem SEO meta generation.
// ONE reusable mapping for all 10 country templates × 50 countries.
// Only title + meta description are produced here — no page content.

import type { SectionKey } from "@/data/countrySections";

const TITLE_MAX = 60;
const META_MAX = 160;
const SUFFIX = " | Skillta";

// Acronym countries that must render all-caps (never "Uae"/"Usa").
const ACRONYMS: Record<string, string> = {
  usa: "USA",
  uae: "UAE",
  uk: "UK",
  eu: "EU",
};

/** Properly capitalize a country name coming from a slug or raw string. */
export function displayCountryName(raw: string): string {
  const trimmed = raw.trim();
  const key = trimmed.toLowerCase().replace(/[-_]/g, "");
  if (ACRONYMS[key]) return ACRONYMS[key];

  return trimmed
    .replace(/[-_]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => {
      const k = word.toLowerCase();
      if (ACRONYMS[k]) return ACRONYMS[k];
      if (["and", "of", "the"].includes(k)) return k;
      return k.charAt(0).toUpperCase() + k.slice(1);
    })
    .join(" ");
}

/** Shorter alias used when the full name would blow the character budget. */
const SHORT_NAMES: Record<string, string> = {
  "United States": "USA",
  "United Arab Emirates": "UAE",
  "United Kingdom": "UK",
  "Czech Republic": "Czechia",
  "Saudi Arabia": "Saudi Arabia",
  "South Korea": "South Korea",
  "New Zealand": "New Zealand",
  "South Africa": "South Africa",
  "Dominican Republic": "Dominican Rep.",
  "Bosnia and Herzegovina": "Bosnia",
  "Trinidad and Tobago": "Trinidad",
};

export function shortCountryName(name: string): string {
  return SHORT_NAMES[name] || name;
}

interface Template {
  title: (c: string) => string;
  meta: (c: string) => string;
}

export const COUNTRY_META_TEMPLATES: Record<SectionKey, Template> = {
  overview: {
    title: (c) => `${c} Tech Salaries 2026: Real Pay Data & Trends`,
    meta: (c) =>
      `See real 2026 tech salary data for ${c} — compare roles, cities and experience levels. Real, data-backed insights. Explore now →`,
  },
  salary: {
    title: (c) => `${c} Salary Explorer 2026 — Compare Tech Roles & Pay`,
    meta: (c) =>
      `Compare tech salaries across ${c} by role, city and experience level. Interactive, up-to-date salary explorer. Explore now →`,
  },
  jobs: {
    title: (c) => `Top Tech Jobs in ${c} (2026) — Live Listings`,
    meta: (c) =>
      `Browse the latest tech job openings in ${c}. Updated listings across software, QA, DevOps, AI/ML and more. Find your next role →`,
  },
  companies: {
    title: (c) => `Top Tech Companies in ${c} (2026)`,
    meta: (c) =>
      `Discover the leading tech employers in ${c} — company profiles, hiring trends and what they pay. Start exploring →`,
  },
  certifications: {
    title: (c) => `Best Tech Certifications in ${c} (2026)`,
    meta: (c) =>
      `Which certifications actually boost tech salaries in ${c}? See the top-rated picks by role and ROI. Check the list →`,
  },
  resources: {
    title: (c) => `${c} Tech Career Resources & Guides (2026)`,
    meta: (c) =>
      `Expert guides, tools and resources to grow your tech career in ${c} — from salary data to skill roadmaps. Browse now →`,
  },
  roadmaps: {
    title: (c) => `Tech Career Roadmaps for ${c} (2026)`,
    meta: (c) =>
      `Step-by-step career roadmaps for tech roles in ${c} — skills, timelines and salary milestones. Plan your path →`,
  },
  interview: {
    title: (c) => `${c} Tech Interview Prep Guide (2026)`,
    meta: (c) =>
      `Prepare for tech interviews in ${c} with real questions, salary benchmarks and negotiation tips. Get ready →`,
  },
  skills: {
    title: (c) => `Most In-Demand Tech Skills in ${c} (2026)`,
    meta: (c) =>
      `See which tech skills employers in ${c} are hiring for right now, ranked by demand and salary impact. View the list →`,
  },
  resume: {
    title: (c) => `Tech Resume Guide for ${c} (2026)`,
    meta: (c) =>
      `Build a tech resume that gets noticed in ${c} — formats, keywords and examples tailored to local hiring. Get the guide →`,
  },
};

/** Trim at a word boundary, preserving the trailing call-to-action arrow. */
function trimMeta(text: string, max: number): string {
  if (text.length <= max) return text;
  const hasArrow = text.trimEnd().endsWith("→");
  const budget = max - (hasArrow ? 2 : 1);
  let cut = text.slice(0, budget);
  const space = cut.lastIndexOf(" ");
  if (space > 40) cut = cut.slice(0, space);
  cut = cut.replace(/[\s—,.–-]+$/, "");
  return hasArrow ? `${cut} →` : `${cut}…`;
}

export interface CountryMeta {
  title: string;
  description: string;
}

/**
 * Build the <title> and meta description for one country template.
 * Handles long country names by falling back to a short alias, then by
 * dropping the "| Skillta" suffix, then by trimming — never eyeballed.
 */
export function getCountryMeta(section: SectionKey, countryName: string): CountryMeta {
  const tpl = COUNTRY_META_TEMPLATES[section] || COUNTRY_META_TEMPLATES.overview;
  const full = displayCountryName(countryName);
  const short = shortCountryName(full);

  const candidates = [
    tpl.title(full) + SUFFIX,
    tpl.title(short) + SUFFIX,
    tpl.title(full),
    tpl.title(short),
  ];
  let title = candidates.find((t) => t.length <= TITLE_MAX) || candidates[3];
  if (title.length > TITLE_MAX) title = title.slice(0, TITLE_MAX).trimEnd();

  const metaFull = tpl.meta(full);
  const description =
    metaFull.length <= META_MAX ? metaFull : trimMeta(tpl.meta(short), META_MAX);

  return { title, description };
}
