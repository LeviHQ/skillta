import { Link } from "react-router-dom";
import { getResearchStats, getResearchFindings, CATALOG_MODIFIED } from "@/lib/researchStats";
import { getResearchFaqs, getResearchBreakdowns, methodology, researchTitle, researchDescription, RESEARCH_PATH } from "@/lib/researchContent";

export function ResearchAnswers() {
  return <div className="divide-y divide-border">{getResearchFaqs().map((faq) => <section id={faq.id} key={faq.id} className="scroll-mt-24 py-7">
    <h2 className="text-xl font-semibold mb-3">{faq.question}</h2>
    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
    <a href={`#${faq.id}`} className="inline-block mt-3 text-sm text-primary hover:underline">Link to this answer</a>
  </section>)}</div>;
}

export function ResearchHubBody() {
  return <>
    <h1 className="text-4xl md:text-5xl font-bold mb-5">SkillTa Research</h1>
    <p className="text-lg text-muted-foreground max-w-2xl mb-10">Counts and editorial assessments from SkillTa's public career catalog. No private user data.</p>
    <article className="border-y border-border py-8">
      <p className="text-sm text-muted-foreground mb-3">Career catalog · Source version {CATALOG_MODIFIED}</p>
      <h2 className="text-2xl font-semibold mb-4"><Link to={RESEARCH_PATH} className="hover:text-primary">{researchTitle()}</Link></h2>
      <p className="text-muted-foreground max-w-2xl mb-5">{researchDescription()}</p>
      <Link to={RESEARCH_PATH} className="text-primary hover:underline">Read the report →</Link>
    </article>
    <p className="mt-8 text-sm text-muted-foreground">Catalog counts describe our published learning content, not the entire technology job market.</p>
  </>;
}

export function TechCareerResearchBody() {
  const stats = getResearchStats();
  return <>
    <p className="text-sm font-mono text-primary mb-4">Career catalog · Source version {CATALOG_MODIFIED}</p>
    <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">{researchTitle()}</h1>
    <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">{researchDescription()}</p>
    <p className="mt-4 text-sm text-muted-foreground">Editorial catalog analysis · {stats.totalCareers} distinct career records · Not a labor-market survey</p>
    <section aria-labelledby="findings-heading" className="mt-12">
      <h2 id="findings-heading" className="text-2xl font-semibold mb-6">Key findings</h2>
      <div className="grid md:grid-cols-2 gap-x-10">{getResearchFindings(stats).map((finding, i) => <article id={finding.id} key={finding.id} className="scroll-mt-24 border-t border-border py-7">
        <span className="text-sm font-mono text-primary">{String(i + 1).padStart(2, "0")}</span>
        <h3 className="text-xl font-semibold mt-2 mb-3">{finding.title}</h3>
        <p className="text-muted-foreground leading-relaxed">{finding.text}</p>
        <a href={`#${finding.id}`} className="inline-block text-sm text-primary mt-4 hover:underline">Link to this finding</a>
      </article>)}</div>
    </section>
    <section className="mt-10" aria-labelledby="breakdowns-heading">
      <h2 id="breakdowns-heading" className="text-2xl font-semibold mb-6">Catalog breakdowns</h2>
      <div className="grid md:grid-cols-2 gap-10">{getResearchBreakdowns().map((breakdown) => <div key={breakdown.title} className="min-w-0">
        <h3 className="text-lg font-semibold mb-3">{breakdown.title}</h3>
        <table className="w-full text-sm text-left"><caption className="text-left text-muted-foreground pb-3">Denominator: {stats.totalCareers} careers</caption>
          <thead className="bg-muted"><tr>{["Label", "Careers", "Share"].map((label) => <th key={label} scope="col" className="p-3 font-medium">{label}</th>)}</tr></thead>
          <tbody>{breakdown.rows.map((row) => <tr key={row[0]} className="border-b border-border">{row.map((cell, i) => i === 0 ? <th key={i} scope="row" className="p-3 font-normal">{cell}</th> : <td key={i} className="p-3 font-mono">{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>)}</div>
    </section>
    <section className="mt-12 border-t border-border pt-8" id="methodology">
      <h2 className="text-2xl font-semibold mb-5">Methodology & limitations</h2>
      <ul className="list-disc pl-5 space-y-4 text-muted-foreground leading-relaxed">{methodology.map((text) => <li key={text}>{text}</li>)}</ul>
    </section>
    <section className="mt-10 border-l-2 border-primary pl-5" id="suggested-citation">
      <h2 className="text-xl font-semibold mb-3">Suggested citation</h2>
      <p className="text-muted-foreground break-words leading-relaxed">{getResearchFaqs().find((faq) => faq.id === "citation")?.answer}</p>
    </section>
    <section className="mt-12"><h2 className="text-2xl font-semibold mb-3">Questions about this report</h2><ResearchAnswers /></section>
    <nav className="flex flex-wrap gap-6 mt-8 text-primary" aria-label="Related research"><Link to="/research">All research</Link><Link to="/roadmaps">Career roadmap library</Link><Link to="/faq">All research questions</Link></nav>
  </>;
}