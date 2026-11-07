/**
 * Research statistics derived at build/runtime from the authored datasets.
 * Every number is computed from the source data — never hardcode a figure
 * here; if the data changes, the published numbers change with it.
 */
import { careers, type Career } from "../data/careers";
import { COUNTRIES } from "../data/countries";
import { TARGET_ROLES } from "../data/skillGapData";

// Latest recorded source change across careers/additionalCareers/trendingCareers.
export const CATALOG_MODIFIED = "2026-10-24";
export const REPORT_YEAR = Number(CATALOG_MODIFIED.slice(0, 4));
export const MIN_STUDY_SIZE = 20;

export function cleanCareerRows(rows: readonly Career[]): Career[] {
  return [...new Map(rows.filter((row) => row.id.trim() && row.title.trim() && row.roadmap.length).map((row) => [row.id, row])).values()];
}

export interface ResearchStats {
  totalCareers: number;
  totalPhases: number;
  totalTopics: number;
  totalProjects: number;
  totalResources: number;
  totalCountries: number;
  totalSkillGapRoles: number;
  difficulty: Record<string, number>;
  demand: Record<string, number>;
  entryBarrier: Record<string, number>;
  competition: Record<string, number>;
  pctHardOrVeryHard: number;
  pctHighOrVeryHighDemand: number;
  pctLowEntryBarrier: number;
}

function countBy<T>(items: T[], key: (item: T) => string): Record<string, number> {
  const out: Record<string, number> = {};
  for (const item of items) {
    const k = key(item);
    out[k] = (out[k] ?? 0) + 1;
  }
  return out;
}

export const percentage = (part: number, whole: number) => whole ? Math.round((part / whole) * 1000) / 10 : 0;
const pct = percentage;

export function computeStudy(rows: readonly Career[]): ResearchStats {
  const careers = cleanCareerRows(rows);
  let totalPhases = 0;
  let totalTopics = 0;
  let totalProjects = 0;
  let totalResources = 0;
  for (const career of careers) {
    totalPhases += career.roadmap.length;
    for (const phase of career.roadmap) {
      totalTopics += phase.items.length;
      totalProjects += phase.projects.length;
      totalResources += phase.resources.length;
    }
  }

  const difficulty = countBy(careers, (c) => c.learningDifficulty);
  const demand = countBy(careers, (c) => c.demandLevel);
  const entryBarrier = countBy(careers, (c) => c.realityCheck.entryBarrier);
  const competition = countBy(careers, (c) => c.realityCheck.competition);
  const total = careers.length;

  return {
    totalCareers: total,
    totalPhases,
    totalTopics,
    totalProjects,
    totalResources,
    totalCountries: COUNTRIES.length,
    totalSkillGapRoles: TARGET_ROLES.length,
    difficulty,
    demand,
    entryBarrier,
    competition,
    pctHardOrVeryHard: pct((difficulty["Hard"] ?? 0) + (difficulty["Very Hard"] ?? 0), total),
    pctHighOrVeryHighDemand: pct((demand["High"] ?? 0) + (demand["Very High"] ?? 0), total),
    pctLowEntryBarrier: pct(entryBarrier["Low"] ?? 0, total),
  };
}

export function getResearchStats(): ResearchStats {
  return computeStudy(careers);
}

export function getResearchFindings(stats: ResearchStats) {
  if (stats.totalCareers < MIN_STUDY_SIZE) return [];
  const n = stats.totalCareers;
  return [
    { id: "catalog-size", title: "Career catalog coverage", text: `SkillTa's authored catalog contains ${n} distinct tech career roadmaps with ${stats.totalPhases} learning phases and ${stats.totalTopics} topic entries.` },
    { id: "learning-difficulty", title: "Learning difficulty", text: `${(stats.difficulty.Hard ?? 0) + (stats.difficulty["Very Hard"] ?? 0)} of ${n} careers (${stats.pctHardOrVeryHard}%) in SkillTa's catalog are labeled Hard or Very Hard to learn.` },
    { id: "demand-labels", title: "Demand labels", text: `${(stats.demand.High ?? 0) + (stats.demand["Very High"] ?? 0)} of ${n} careers (${stats.pctHighOrVeryHighDemand}%) in SkillTa's catalog have an editorial High or Very High demand label; this is not a measured share of job vacancies.` },
    { id: "entry-barriers", title: "Low entry barriers", text: `${stats.entryBarrier.Low ?? 0} of ${n} careers (${stats.pctLowEntryBarrier}%) in SkillTa's catalog have an editorial Low entry-barrier label.` },
    { id: "project-coverage", title: "Project coverage", text: `Across ${n} career roadmaps, SkillTa lists ${stats.totalProjects} project entries in ${stats.totalPhases} phases. Repeated project ideas are counted once per occurrence, not as unique projects.` },
    { id: "resource-coverage", title: "Learning-resource coverage", text: `Across ${n} career roadmaps, SkillTa lists ${stats.totalResources} learning-resource entries. Repeated resources are counted once per occurrence, not as unique providers.` },
  ];
}

export function getRoadmapDescription(career: Career) {
  const facts = getCareerFacts(career);
  return `${career.title} roadmap: ${facts.phases} phases, ${facts.topics} topics, ${facts.projects} project entries and ${facts.resources} resource entries. Difficulty: ${career.learningDifficulty}. Timeline: ${career.estimatedTime}.`;
}

export function getCatalogSummary() {
  const rows = cleanCareerRows(careers);
  const stats = computeStudy(rows);
  return `${stats.totalCareers} tech career roadmaps, listed in editorial catalog order rather than ranked by job prospects. ${stats.pctLowEntryBarrier}% carry a Low entry-barrier label. The first three are ${rows.slice(0, 3).map((row) => row.title).join(", ")}. Source last changed: ${CATALOG_MODIFIED}.`;
}

export function getCareerCatalogSchema() {
  const rows = cleanCareerRows(careers);
  return { "@context": "https://schema.org", "@type": "ItemList", name: `${rows.length} Tech Career Roadmaps (${REPORT_YEAR})`, itemListOrder: "https://schema.org/ItemListUnordered", numberOfItems: rows.length, itemListElement: rows.map((row, i) => ({ "@type": "ListItem", position: i + 1, name: row.title, url: `https://www.skillta.tech/roadmaps/${row.id}` })) };
}

/** Per-career quotable counts for the roadmap "At a Glance" block. */
export function getCareerFacts(career: (typeof careers)[number]) {
  const phases = career.roadmap.length;
  let topics = 0;
  let projects = 0;
  let resources = 0;
  for (const phase of career.roadmap) {
    topics += phase.items.length;
    projects += phase.projects.length;
    resources += phase.resources.length;
  }
  return { phases, topics, projects, resources, skills: career.requiredSkills.length };
}
