/**
 * Deep, role-specific long-form content for every /roadmaps/:id page.
 * Built entirely from the career's own dataset (phases, skills, salary bands,
 * reality check), so each of the 60+ roadmaps produces distinct content.
 */
import type { Career } from "@/data/careers";
import { type Block, listSentence, pick, rotate } from "./types";

const LEARNING_HOURS: Record<Career["learningDifficulty"], string> = {
  Easy: "8–10 hours a week",
  Moderate: "10–15 hours a week",
  Hard: "15–20 hours a week",
  "Very Hard": "20+ hours a week",
};

const weekPlan = (career: Career): Block => {
  const rows: string[][] = [];
  let week = 1;
  for (const phase of career.roadmap) {
    const span = Math.max(2, Math.round(phase.items.length * 1.6));
    for (let i = 0; i < phase.items.length; i++) {
      const item = phase.items[i];
      const chunk = Math.max(1, Math.round(span / phase.items.length));
      const label = chunk === 1 ? `Week ${week}` : `Weeks ${week}–${week + chunk - 1}`;
      rows.push([
        label,
        `Phase ${phase.phase}: ${phase.title}`,
        `${item.name} — ${item.description}`,
        phase.projects[i % phase.projects.length] ?? phase.projects[0] ?? "Ship a small project using what you learned",
      ]);
      week += chunk;
    }
  }
  return {
    t: "table",
    caption: `Week-by-week ${career.title} study plan (${LEARNING_HOURS[career.learningDifficulty]})`,
    head: ["Timeline", "Phase", "What to learn", "What to build that week"],
    rows,
  };
};

const salaryTable = (career: Career): Block => ({
  t: "table",
  caption: `${career.title} salary bands, 2026`,
  head: ["Level", "Experience", "India", "Global (USD)", "What the role owns"],
  rows: [
    ["Entry / junior", "0–2 years", career.salaryIndia.split("→")[0].trim(), career.salaryGlobal.split("→")[0].trim(), "Well-scoped tasks with close review"],
    ["Mid-level", "3–5 years", "Between the entry and senior bands", "Between the entry and senior bands", "Owns features end to end, mentors juniors"],
    ["Senior", "6+ years", (career.salaryIndia.split("→")[1] ?? career.salaryIndia).trim(), (career.salaryGlobal.split("→")[1] ?? career.salaryGlobal).trim(), "Owns systems, sets technical direction"],
    ["Lead / staff", "9+ years", "Above the senior band, plus equity at product companies", "Above the senior band, plus equity", "Leverage through other engineers and architecture"],
  ],
});

const toolsTable = (career: Career): Block => ({
  t: "table",
  caption: `Core ${career.title} skills and how they are assessed`,
  head: ["Skill", "Why it matters", "How interviewers test it", "Time to proficiency"],
  rows: career.requiredSkills.map((skill, i) => [
    skill,
    pick(
      [
        "Appears in the majority of job descriptions for this role",
        "Foundation that every later topic depends on",
        "The difference between shipping and shipping something maintainable",
        "Most common source of production incidents when done badly",
        "What separates a mid-level candidate from a junior one",
      ],
      `${career.id}-${skill}`,
      i,
    ),
    pick(
      ["Live coding exercise", "Take-home review and follow-up questions", "Whiteboard or design discussion", "Debugging a broken example", "Deep questions about a project on your CV"],
      `${career.id}-${skill}-q`,
      i,
    ),
    pick(["2–4 weeks", "4–8 weeks", "2–3 months", "3–5 months"], `${career.id}-${skill}-t`, i),
  ]),
});

export function roadmapDeepBlocks(career: Career): Block[] {
  const allResources = Array.from(new Set(career.roadmap.flatMap((p) => p.resources)));
  const allProjects = Array.from(new Set(career.roadmap.flatMap((p) => p.projects)));
  const lower = career.title.toLowerCase();

  return [
    { t: "h2", text: `What a ${career.title} actually does day to day` },
    {
      t: "p",
      text: `${career.description} In practice the week looks less like continuous coding and more like a mix of building, reviewing, debugging and deciding. A typical day includes a short stand-up, two to four hours of focused build time, code review for teammates, and at least one conversation about scope or trade-offs. The people who progress fastest in this role are the ones who treat those conversations as part of the job rather than as an interruption to it.`,
    },
    {
      t: "ul",
      items: [
        `**Morning:** triage anything that broke overnight, then take the highest-leverage task rather than the easiest one.`,
        `**Core hours:** deep work on the current increment — ${listSentence(career.requiredSkills.slice(0, 3))} are the tools you will touch most.`,
        `**Reviews:** reading other people's changes is the fastest way to learn a codebase and the fastest way to build trust.`,
        `**Documentation:** a short written note about why a decision was made saves hours for the next person, often you in three months.`,
        `**Learning:** the field moves; an hour a week on fundamentals beats a weekend binge every quarter.`,
      ],
    },
    { t: "h2", text: `Is ${career.title} the right fit for you?` },
    {
      t: "p",
      text: `This path suits you if several of the following are true. It is worth being honest here — switching after six months costs far more than choosing carefully now.`,
    },
    { t: "ul", items: career.whySuits },
    {
      t: "callout",
      title: "Honest difficulty:",
      text: `${career.realityCheck.honestNote} Competition is rated ${career.realityCheck.competition.toLowerCase()} and the entry barrier ${career.realityCheck.entryBarrier.toLowerCase()}, with realistic time to job-ready around ${career.realityCheck.learningTime}.`,
    },
    { t: "h2", text: `${career.title} salary in 2026` },
    {
      t: "p",
      text: `Compensation for ${lower}s reflects scope more than years served. ${career.growthPotential} The bands below are annual gross figures; product companies pay above them, services and agency employers below.`,
    },
    salaryTable(career),
    {
      t: "p",
      text: `Three factors move you up these bands faster than time does: specialising in one high-demand area rather than staying general, owning a system end to end so you can describe impact in numbers, and changing employer at the right moment — external moves still outpace internal raises in most markets. Use the [salary predictor](/salary-predictor) to check the band for your specific city and experience level.`,
    },
    { t: "h2", text: `The complete ${career.title} skill map` },
    {
      t: "p",
      text: `You need ${career.requiredSkills.length} core competencies to be credible in interviews for this role. The table maps each one to why employers care and how it gets tested, so you can prioritise instead of trying to learn everything at once.`,
    },
    toolsTable(career),
    { t: "h2", text: `Week-by-week ${career.title} learning plan` },
    {
      t: "p",
      text: `The roadmap phases above tell you what to learn. This plan tells you when, assuming ${LEARNING_HOURS[career.learningDifficulty]} of focused study. Slipping a week is normal; skipping the build column is not — the projects are what make the learning stick and what fills your portfolio.`,
    },
    weekPlan(career),
    { t: "h2", text: "Portfolio projects that get interviews" },
    {
      t: "p",
      text: `Recruiters skim portfolios in under a minute, so two strong projects beat six weak ones. Each project below should be deployed, documented with a short README explaining the problem and the trade-offs, and something you can talk through for ten minutes without notes.`,
    },
    { t: "ol", items: allProjects.slice(0, 10) },
    {
      t: "p",
      text: `Make at least one project unmistakably yours — solve a problem you actually have, use real data, and write up what broke. Interviewers ask far better questions about original work than about a cloned tutorial app, and those questions are the ones you will answer best.`,
    },
    { t: "h2", text: "Free resources worth using" },
    { t: "ul", items: allResources },
    {
      t: "p",
      text: `Pick one primary resource and one reference. Rotating between five courses feels productive and teaches very little; finishing one and building alongside it teaches a lot. Official documentation should become your default reference within the first two months.`,
    },
    { t: "h2", text: `${career.title} interview preparation` },
    {
      t: "p",
      text: `Interview loops for this role typically run four to six stages. Expect a recruiter screen, a technical screen on fundamentals, a practical exercise or take-home, a deep-dive on your own projects, and a hiring-manager conversation about ownership and collaboration.`,
    },
    {
      t: "table",
      head: ["Round", "What is tested", "Preparation that works"],
      rows: [
        ["Screening", "Motivation, communication, salary alignment", "A 90-second summary of your work and a researched range"],
        ["Technical fundamentals", listSentence(career.requiredSkills.slice(0, 3)), "Daily reps for four weeks, explained out loud"],
        ["Practical exercise", "Code quality, tests, judgement about scope", "Timebox it and document what you deliberately left out"],
        ["Project deep-dive", "Whether you actually built what your CV claims", "Be able to justify every architectural choice you made"],
        ["Hiring manager", "Ownership, conflict, how you handle being wrong", "Six STAR stories including one genuine failure"],
      ],
    },
    {
      t: "ul",
      items: rotate(career.requiredSkills, career.id)
        .slice(0, 8)
        .map(
          (skill, i) =>
            `**${skill}:** ${pick([`explain how you would debug a problem involving ${skill.toLowerCase()} in production`, `walk through a trade-off you made using ${skill.toLowerCase()} and what you would do differently`, `describe how ${skill.toLowerCase()} fits into the systems you have built`, `compare two approaches within ${skill.toLowerCase()} and justify your default choice`], `${career.id}-q-${skill}`, i)}.`,
        ),
    },
    { t: "h2", text: "Career progression and where this path leads" },
    {
      t: "table",
      head: ["Stage", "Typical years", "Scope", "Common next step"],
      rows: [
        ["Junior", "0–2", "Well-defined tasks, close review", "Own a full feature without supervision"],
        ["Mid-level", "3–5", "Features end to end, some mentoring", "Own a service or subsystem"],
        ["Senior", "6–9", "Systems, technical direction, cross-team work", "Staff engineer or engineering manager"],
        ["Lead / staff / manager", "10+", "Organisational leverage, architecture, hiring", "Principal engineer, head of engineering, or founder"],
      ],
    },
    {
      t: "p",
      text: `Lateral moves are common and healthy from this role. ${career.title} experience transfers well into adjacent specialisations, product engineering, and technical leadership. Use [compare careers](/compare) to see how the salary, difficulty and demand of two paths stack up before committing.`,
    },
    { t: "h2", text: "Mistakes that slow people down" },
    {
      t: "ol",
      items: [
        "Collecting tutorials instead of finishing projects. Completion is the skill being trained.",
        `Learning adjacent tools before the core ones. Get ${listSentence(career.requiredSkills.slice(0, 2))} solid first.`,
        "Building only what the tutorial shows. The learning happens when something breaks and nobody has written the fix down.",
        "Waiting until you feel ready to apply. Interview practice is a skill and it is trained by interviewing.",
        "No public trail. A deployed link and a written case study is worth more than a private repository.",
        "Ignoring fundamentals because the stack is modern. Complexity, data modelling and debugging are still what interviews test.",
      ],
    },
    { t: "h2", text: `${career.title} — frequently asked questions` },
    {
      t: "faq",
      items: [
        {
          q: `How long does it take to become a ${lower}?`,
          a: `${career.estimatedTime} for someone starting from scratch and studying ${LEARNING_HOURS[career.learningDifficulty]}. People coming from an adjacent technical role usually move faster because they already understand how teams ship software.`,
        },
        {
          q: `Is ${career.title} a good career in 2026?`,
          a: `Demand is rated ${career.demandLevel.toLowerCase()}. ${career.growthPotential}`,
        },
        {
          q: `Do I need a degree to become a ${lower}?`,
          a: `No, though it still helps for visa-sponsored roles and large enterprises. What replaces it is evidence: deployed projects, a public code history, and the ability to explain your decisions clearly.`,
        },
        {
          q: `How hard is it really?`,
          a: `Difficulty is ${career.learningDifficulty.toLowerCase()} — roughly ${career.realityCheck.difficulty} out of 10. ${career.realityCheck.honestNote}`,
        },
        {
          q: `What should I learn first?`,
          a: `Start with ${career.roadmap[0]?.title ?? "the fundamentals"} — specifically ${listSentence((career.roadmap[0]?.items ?? []).slice(0, 3).map((i) => i.name))}. Everything later in the roadmap assumes this foundation.`,
        },
        {
          q: `Can I switch to ${career.title} from a non-technical background?`,
          a: `Yes, and thousands do each year. The realistic timeline is ${career.realityCheck.learningTime}, the main risk is quitting in month four, and the strongest mitigation is a public build streak plus one person who expects progress from you weekly.`,
        },
        {
          q: `Will AI replace ${lower}s?`,
          a: `AI has changed the work rather than removed it. Code generation raised the floor, and the value moved toward design, debugging, evaluating correctness and understanding systems — the parts current models handle least reliably.`,
        },
      ],
    },
    {
      t: "callout",
      title: "Next step:",
      text: `Not certain this is your best fit? The [free career quiz](/quiz) takes five minutes, or run the [skill gap analyzer](/skill-gap-analyzer) to see exactly what stands between you and a ${lower} role.`,
    },
  ];
}
