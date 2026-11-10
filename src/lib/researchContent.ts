import { getResearchStats, getResearchFindings, CATALOG_MODIFIED, REPORT_YEAR, percentage } from "./researchStats";
import { getBaseUrl, getFAQSchema } from "./seo";
import { table, link, bullets } from "./markdown/format";

export const RESEARCH_PATH = "/research/tech-careers";
export const researchTitle = () => `Tech Career Statistics ${REPORT_YEAR}: ${getResearchStats().totalCareers} Analyzed`;
export const researchDescription = () => {
  const s = getResearchStats();
  return `SkillTa's ${s.totalCareers}-career catalog: ${s.pctHardOrVeryHard}% labeled Hard/Very Hard, ${s.totalPhases} phases and ${s.totalProjects} project entries. Editorial data, not a labor-market survey.`;
};
export const methodology = [
  "Source: SkillTa's authored careers, additional careers and trending careers catalogs. One row represents one career; blank IDs, blank titles and empty roadmaps are excluded, and duplicate career IDs are deduplicated.",
  "Difficulty, demand, competition and entry barriers are editorial labels, not measured hiring statistics. The catalog is not a representative sample of all technology jobs, a salary survey or an employment forecast.",
  "Each percentage uses the distinct career count as its denominator and is rounded to one decimal place. Rounded breakdown shares may not sum to exactly 100%. Findings require at least 20 career records.",
  "Phases, topics, projects and resources are counted as entries; repeated entries across roadmaps are not deduplicated into unique concepts or providers.",
  "Country coverage and the skill-gap role matrix are inventory counts only. The 15-role matrix is too small for a separate statistical study; country guide estimates are not comparable measured observations.",
  "Private profiles, quiz histories, resume files, badges, account plans and tool outputs are excluded. No user-entered fields or private records contribute to this report.",
  `Recalculated from the authored catalog when pages are loaded or exported. Source last changed: ${CATALOG_MODIFIED}, based on the latest recorded change to its source files; rebuilds do not change that date.`,
];
export function getResearchFaqs() {
  const s = getResearchStats();
  return [
    { id: "career-count", question: "How many tech career roadmaps does SkillTa cover?", answer: `SkillTa's authored catalog contains ${s.totalCareers} distinct tech career roadmaps, covering ${s.totalPhases} learning phases and ${s.totalTopics} topic entries.` },
    { id: "hard-careers", question: "What share of SkillTa careers is labeled hard to learn?", answer: `${(s.difficulty.Hard ?? 0) + (s.difficulty["Very Hard"] ?? 0)} of ${s.totalCareers} careers (${s.pctHardOrVeryHard}%) are labeled Hard or Very Hard. These are SkillTa editorial assessments, not measured learner outcomes.` },
    { id: "high-demand", question: "What share of SkillTa careers has a high demand label?", answer: `${(s.demand.High ?? 0) + (s.demand["Very High"] ?? 0)} of ${s.totalCareers} careers (${s.pctHighOrVeryHighDemand}%) have an editorial High or Very High demand label. This does not measure actual job vacancies or guarantee employment.` },
    { id: "beginner-entry", question: "How many SkillTa careers have a low entry barrier?", answer: `${s.entryBarrier.Low ?? 0} of ${s.totalCareers} careers (${s.pctLowEntryBarrier}%) have an editorial Low entry-barrier label. Low entry barrier does not mean no learning or experience is needed.` },
    { id: "learning-entries", question: "How many projects and resources are in the career catalog?", answer: `SkillTa's ${s.totalCareers} career roadmaps contain ${s.totalProjects} project entries and ${s.totalResources} resource entries. Repeated ideas and resources are counted per occurrence.` },
    { id: "country-coverage", question: "How many countries and skill-gap roles does SkillTa cover?", answer: `SkillTa's public inventories contain ${s.totalCountries} country guides and ${s.totalSkillGapRoles} target roles in the skill-gap matrix. These are coverage counts, not labor-market measurements.` },
    { id: "data-source", question: "Where do the research numbers come from?", answer: `The numbers are calculated from SkillTa's authored public career catalog. The source last changed on ${CATALOG_MODIFIED}. Private quiz results, resumes and account histories are not included.` },
    { id: "citation", question: "How should this report be cited?", answer: `Cite SkillTa, “${researchTitle()},” source version ${CATALOG_MODIFIED}, ${getBaseUrl()}${RESEARCH_PATH}. Describe the results as counts and editorial labels in SkillTa's catalog, not findings about the entire tech labor market.` },
  ];
}
export function getResearchBreakdowns() {
  const s = getResearchStats();
  return [ ["Learning difficulty", s.difficulty], ["Demand labels", s.demand], ["Entry barrier", s.entryBarrier], ["Competition", s.competition] ].map(([title, counts]) => ({ title: title as string, rows: Object.entries(counts).map(([label, count]) => [label, String(count), `${percentage(count, s.totalCareers)}%`]) }));
}
export function getResearchSchemas() {
  return [
    { "@context": "https://schema.org", "@type": "WebPage", name: researchTitle(), description: researchDescription(), url: `${getBaseUrl()}${RESEARCH_PATH}` },
    { "@context": "https://schema.org", "@type": "Dataset", name: researchTitle(), description: researchDescription(), url: `${getBaseUrl()}${RESEARCH_PATH}`, creator: { "@type": "Organization", name: "SkillTa", url: getBaseUrl() }, dateModified: CATALOG_MODIFIED, variableMeasured: ["Career count", "Editorial learning difficulty", "Editorial demand label", "Editorial entry barrier", "Editorial competition", "Learning phases", "Topic entries", "Project entries", "Resource entries"], measurementTechnique: "Deduplicated count of authored career records and nested entries; category shares rounded to one decimal place. Not a labor-market survey.", distribution: { "@type": "DataDownload", encodingFormat: "text/markdown", contentUrl: `${getBaseUrl()}${RESEARCH_PATH}.md` } },
    getFAQSchema(getResearchFaqs()),
  ];
}
export function renderFaqMarkdown() {
  return getResearchFaqs().map((faq) => `<a id="${faq.id}"></a>\n\n## ${faq.question}\n\n${faq.answer}\n\n${link("Link to this answer", `/faq#${faq.id}`)}`).join("\n\n");
}
export function renderResearchMarkdown() {
  return `${getResearchFindings(getResearchStats()).map((f) => `<a id="${f.id}"></a>\n\n## ${f.title}\n\n${f.text}\n\n${link("Link to this finding", `${RESEARCH_PATH}#${f.id}`)}`).join("\n\n")}\n\n${getResearchBreakdowns().map((b) => `## ${b.title}\n\n${table(["Label", "Careers", "Share of catalog"], b.rows)}`).join("\n\n")}\n\n## Methodology\n\n${bullets(methodology)}\n\n## Suggested citation\n\n${getResearchFaqs().find((f) => f.id === "citation")?.answer}\n\n## Questions about this report\n\n${renderFaqMarkdown()}`;
}

const escapeHtml = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Static snapshots consume exactly the same findings, tables and answers as React. */
export function renderFaqHtml() {
  return getResearchFaqs().map((faq) => `<section id="${faq.id}"><h2>${escapeHtml(faq.question)}</h2><p>${escapeHtml(faq.answer)}</p><a href="#${faq.id}">Link to this answer</a></section>`).join("\n");
}

export function renderResearchHtml() {
  const stats = getResearchStats();
  return `<h1>${escapeHtml(researchTitle())}</h1><p>${escapeHtml(researchDescription())}</p><p>Source version: ${CATALOG_MODIFIED}. Editorial catalog analysis, not a labor-market survey.</p>
<h2>Key findings</h2>${getResearchFindings(stats).map((finding) => `<section id="${finding.id}"><h3>${escapeHtml(finding.title)}</h3><p>${escapeHtml(finding.text)}</p><a href="#${finding.id}">Link to this finding</a></section>`).join("\n")}
<h2>Catalog breakdowns</h2>${getResearchBreakdowns().map((breakdown) => `<h3>${escapeHtml(breakdown.title)}</h3><table><caption>Denominator: ${stats.totalCareers} careers</caption><thead><tr><th scope="col">Label</th><th scope="col">Careers</th><th scope="col">Share of catalog</th></tr></thead><tbody>${breakdown.rows.map(([label, count, share]) => `<tr><th scope="row">${escapeHtml(label)}</th><td>${count}</td><td>${share}</td></tr>`).join("")}</tbody></table>`).join("\n")}
<section id="methodology"><h2>Methodology &amp; limitations</h2><ul>${methodology.map((text) => `<li>${escapeHtml(text)}</li>`).join("")}</ul></section>
<section id="suggested-citation"><h2>Suggested citation</h2><p>${escapeHtml(getResearchFaqs().find((faq) => faq.id === "citation")?.answer ?? "")}</p></section>
<h2>Questions about this report</h2>${renderFaqHtml()}<nav><a href="/research">All research</a> · <a href="/roadmaps">Career roadmap library</a> · <a href="/faq">All research questions</a></nav>`;
}