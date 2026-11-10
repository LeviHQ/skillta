import { describe, expect, it } from "vitest";
import { careers } from "../data/careers";
import { cleanCareerRows, computeStudy, getCareerFacts, getResearchFindings, getResearchStats, MIN_STUDY_SIZE, percentage } from "./researchStats";
import { getResearchFaqs, getResearchSchemas } from "./researchContent";

describe("Authored career catalog calculations", () => {
  it("counts the approved authored inventory exactly", () => {
    expect(getResearchStats()).toMatchObject({ totalCareers: 60, totalPhases: 290, totalTopics: 870, totalProjects: 815, totalResources: 852, totalCountries: 50, totalSkillGapRoles: 15 });
  });
  it("calculates editorial difficulty shares from 35 of 60 records", () => {
    const s = getResearchStats();
    expect(s.difficulty.Hard + s.difficulty["Very Hard"]).toBe(35);
    expect(s.pctHardOrVeryHard).toBe(58.3);
  });
  it("calculates editorial demand shares from 52 of 60 records", () => {
    const s = getResearchStats();
    expect(s.demand.High + s.demand["Very High"]).toBe(52);
    expect(s.pctHighOrVeryHighDemand).toBe(86.7);
  });
  it("calculates low entry-barrier shares from 19 of 60 records", () => {
    expect(getResearchStats().entryBarrier.Low).toBe(19);
    expect(getResearchStats().pctLowEntryBarrier).toBe(31.7);
  });
  it("deduplicates IDs and excludes empty records before counting", () => {
    const row = careers[0];
    expect(cleanCareerRows([row, row, { ...row, id: " " }, { ...row, id: "no-title", title: " " }, { ...row, id: "empty", roadmap: [] }])).toEqual([row]);
  });
  it("partitions every record into one band per classification", () => {
    const s = getResearchStats();
    for (const counts of [s.difficulty, s.demand, s.entryBarrier, s.competition]) {
      expect(Object.values(counts).reduce((sum, n) => sum + n, 0)).toBe(60);
      expect(Object.values(counts).reduce((sum, n) => sum + percentage(n, 60), 0)).toBeCloseTo(100, 0);
    }
  });
  it("handles empty denominators and suppresses findings under 20 careers", () => {
    expect(percentage(0, 0)).toBe(0);
    expect(getResearchFindings(computeStudy(careers.slice(0, 19)))).toEqual([]);
    expect(getResearchFindings(computeStudy(careers.slice(0, 20)))).toHaveLength(6);
  });
  it("recalculates classifications when authored labels change", () => {
    const rows = careers.slice(0, 20);
    expect(computeStudy(rows.map((row) => ({ ...row, learningDifficulty: "Easy" as const }))).pctHardOrVeryHard).toBe(0);
    expect(computeStudy(rows.map((row) => ({ ...row, learningDifficulty: "Hard" as const }))).pctHardOrVeryHard).toBe(100);
  });
  it("uses the same nested entry totals for entity facts and study", () => {
    const facts = getCareerFacts(careers[0]);
    const study = computeStudy([careers[0]]);
    expect([facts.phases, facts.topics, facts.projects, facts.resources]).toEqual([study.totalPhases, study.totalTopics, study.totalProjects, study.totalResources]);
  });
  it("keeps public citation identifiers unique and FAQ data identical", () => {
    const findings = getResearchFindings(getResearchStats());
    const faqs = getResearchFaqs();
    const ids = [...findings, ...faqs].map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
    const schema = getResearchSchemas().find((item) => item["@type"] === "FAQPage");
    expect(schema && "mainEntity" in schema ? schema.mainEntity : []).toEqual(faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })));
    expect(cleanCareerRows(careers).length).toBeGreaterThanOrEqual(MIN_STUDY_SIZE);
  });
});