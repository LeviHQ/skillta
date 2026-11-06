/**
 * Research statistics derived at build/runtime from the authored datasets.
 * Every number is computed from the source data — never hardcode a figure
 * here; if the data changes, the published numbers change with it.
 */
import { careers } from "@/data/careers";
import { COUNTRIES } from "@/data/countries";
import { TARGET_ROLES } from "@/data/skillGapData";

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

const pct = (part: number, whole: number) => Math.round((part / whole) * 1000) / 10;

export function getResearchStats(): ResearchStats {
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
