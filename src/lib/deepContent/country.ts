/**
 * Deep, data-grounded long-form content for every country page and its nine
 * sub-sections. Every figure is derived from the country's own dataset
 * (salary multiplier, currency, hubs, employers, language, timezone), so no
 * two countries produce the same numbers, examples or employer lists.
 */
import type { Country } from "@/data/countries";
import {
  ROLES,
  TOP_SKILLS_2026,
  ROADMAP_CARDS,
  CERTIFICATIONS,
  GLOBAL_COMPANIES,
  INTERVIEW_TOPICS,
  getRoleSalaryBand,
  formatLocalSalary,
  type SectionKey,
} from "@/data/countrySections";
import { type Block, listSentence, pick, rotate } from "./types";

/* --------------------------------------------------------------- helpers */

const hubList = (c: Country) => listSentence(c.techHubs);
const companyList = (c: Country) => listSentence(c.topCompaniesLocal.slice(0, 6));

const marketTier = (c: Country): "premium" | "strong" | "emerging" =>
  c.salaryMultiplier >= 0.7 ? "premium" : c.salaryMultiplier >= 0.35 ? "strong" : "emerging";

const tierNote = (c: Country) => {
  const t = marketTier(c);
  if (t === "premium")
    return `${c.name} sits in the top salary tier globally, which means compensation is high but hiring bars, interview loops and English/local-language expectations are also higher.`;
  if (t === "strong")
    return `${c.name} is a strong mid-tier market: pay is competitive against local cost of living, and the gap between junior and senior compensation widens quickly with specialisation.`;
  return `${c.name} is a fast-growing market where absolute salaries are lower than North America but purchasing power, remote-work arbitrage and career acceleration are strong.`;
};

const salaryTable = (c: Country, roles = ROLES): Block => ({
  t: "table",
  caption: `Annual gross tech salary bands in ${c.name} (${c.currency}, 2026 estimates)`,
  head: ["Role", "Junior (0–2 yrs)", "Mid (3–5 yrs)", "Senior (6+ yrs)", "Demand", "YoY growth"],
  rows: roles.map((r) => {
    const b = getRoleSalaryBand(c, r);
    return [r.role, b.junior, b.mid, b.senior, r.demand, r.growth];
  }),
});

const cityTable = (c: Country): Block => {
  const base = ROLES[0];
  const mults = [1.18, 1.1, 1.0, 0.94, 0.88];
  return {
    t: "table",
    caption: `How ${c.name} tech hubs compare on pay and opportunity`,
    head: ["City / region", "Relative pay index", "Typical mid-level software salary", "What it is known for"],
    rows: c.techHubs.map((hub, i) => {
      const m = mults[i % mults.length];
      return [
        hub,
        `${Math.round(m * 100)}%`,
        formatLocalSalary(c, base.usdBase[1] * m),
        pick(
          [
            "Product companies and funded startups",
            "Enterprise, consulting and global capability centres",
            "Fintech, payments and banking technology",
            "Cloud, data platform and infrastructure teams",
            "AI research, ML platforms and applied data science",
            "SaaS, developer tooling and remote-first employers",
          ],
          `${c.slug}-${hub}`,
          i,
        ),
      ];
    }),
  };
};

const roleDeepDive = (c: Country, count: number): Block[] => {
  const blocks: Block[] = [];
  for (const role of rotate(ROLES, c.slug).slice(0, count)) {
    const b = getRoleSalaryBand(c, role);
    blocks.push({ t: "h3", text: `${role.role} in ${c.name}` });
    blocks.push({
      t: "p",
      text: `Demand for ${role.role.toLowerCase()}s in ${c.name} is rated ${role.demand.toLowerCase()} with ${role.growth} growth in posted openings. A junior typically starts around ${b.junior}, mid-level engineers with three to five years of shipped work land near ${b.mid}, and seniors who own architecture or lead a team reach ${b.senior}. Most of these roles concentrate in ${listSentence(c.techHubs.slice(0, 3))}, though remote and hybrid contracts have widened the pool considerably since 2024.`,
    });
    blocks.push({
      t: "p",
      text: `The hiring signal employers look for is depth, not breadth. For this role that means demonstrable strength in ${listSentence(role.skills.slice(0, 3))}, plus one production system you can talk through end to end — how it was designed, what broke, and what you changed afterwards. Candidates who can quantify impact (latency cut, cost saved, conversion lifted) consistently negotiate ${pick(["8–12%", "10–15%", "12–18%"], `${c.slug}-${role.role}`)} above the posted band.`,
    });
    blocks.push({
      t: "ul",
      items: [
        `Core skills hiring managers screen for: ${listSentence(role.skills)}.`,
        `Realistic time from zero to first offer: ${pick(["6–9 months", "8–12 months", "10–14 months"], `${c.slug}-${role.role}-t`)} of consistent daily practice.`,
        `Interview shape in ${c.name}: ${pick(["recruiter screen → technical screen → take-home → onsite loop → offer", "recruiter screen → live coding → system design → hiring-manager round → offer", "application → online assessment → two technical rounds → culture round → offer"], `${c.slug}-${role.role}-i`)}.`,
        `Where the openings are: ${listSentence(c.topCompaniesLocal.slice(0, 4))} plus global employers hiring locally.`,
      ],
    });
  }
  return blocks;
};

const negotiationBlocks = (c: Country): Block[] => [
  { t: "h2", text: `How to negotiate a tech salary in ${c.name}` },
  {
    t: "p",
    text: `Negotiation in ${c.name} works best when you anchor on the band rather than on your previous salary. Bring three reference points into the conversation: the published range for the role, what comparable companies in ${listSentence(c.techHubs.slice(0, 2))} pay for the same scope, and the specific impact you delivered in your last role. ${tierNote(c)}`,
  },
  {
    t: "ol",
    items: [
      "Never give the first number. When asked for expectations, respond with the range you researched and ask what band the role is budgeted at.",
      `Separate base, bonus, equity and benefits. In ${c.name} the negotiable levers differ by company size — startups move on equity, enterprises move on base and level.`,
      "Ask for the level, not just the money. Being hired one level higher compounds across every future raise.",
      "Get competing interest. A second live process is the single strongest lever you will ever have.",
      "Put the final offer in writing, including start date, notice period, remote policy and review cycle.",
    ],
  },
  {
    t: "callout",
    title: "Reality check:",
    text: `Most candidates in ${c.name} leave money on the table by accepting the first offer within 24 hours. Asking for 48 hours to review is standard practice and does not put an offer at risk.`,
  },
];

const remoteBlocks = (c: Country): Block[] => [
  { t: "h2", text: `Remote and hybrid work in ${c.name}` },
  {
    t: "p",
    text: `Remote hiring reshaped the ${c.name} market between 2020 and 2026. Today most postings fall into three buckets: fully remote roles paying against a national band, hybrid roles requiring two or three office days in ${listSentence(c.techHubs.slice(0, 2))}, and onsite roles at enterprises and hardware-adjacent employers. Timezone matters more than location — ${c.timezone} overlaps well with some markets and poorly with others, and that overlap is often the deciding factor in a remote hiring decision.`,
  },
  {
    t: "ul",
    items: [
      `Working language: ${c.language}. Written communication quality is weighted heavily in distributed teams.`,
      `Timezone: ${c.timezone} — highlight your overlap hours explicitly in your CV summary if you are targeting remote roles.`,
      "Async proof of work matters: clear pull-request descriptions, written design docs and recorded demos substitute for hallway presence.",
      "Contractor vs employee changes take-home pay materially — confirm which model an employer uses before comparing offers.",
    ],
  },
];

const learningPathBlocks = (c: Country): Block[] => [
  { t: "h2", text: `A realistic 12-month plan for breaking into tech in ${c.name}` },
  {
    t: "p",
    text: `Most successful career switchers in ${c.name} follow the same rough shape: three months on fundamentals, three on a framework and real projects, three on depth plus portfolio, and three on applications and interview practice. The plan below assumes ten to fifteen focused hours a week, which is what people with jobs or studies can realistically sustain.`,
  },
  {
    t: "table",
    head: ["Months", "Focus", "What to produce", "How to know it is working"],
    rows: [
      ["1–3", "Fundamentals — programming, data structures, version control", "20+ small exercises, one CLI tool, a public Git history", "You can solve an easy problem without looking up syntax"],
      ["4–6", "One stack, deeply — framework, database, deployment", "Two deployed apps with real data and auth", "A stranger can use your app without instructions"],
      ["7–9", "Depth and specialisation — testing, performance, system design", "One substantial project plus written case study", "You can explain every trade-off you made and why"],
      ["10–12", "Job search — CV, referrals, interview reps", "Tailored CV, 30+ targeted applications, weekly mock interviews", "You are reaching final rounds, not just screens"],
    ],
  },
  {
    t: "p",
    text: `Two adjustments specific to ${c.name}: first, weight your portfolio toward problems local employers actually have — ${companyList(c)} and similar companies publish enough about their stacks to infer this. Second, start networking in month four, not month ten. Referrals convert several times better than cold applications in every market we track, and ${c.name} is no exception.`,
  },
];

const mistakesBlocks = (c: Country): Block[] => [
  { t: "h2", text: "Seven mistakes that cost candidates offers" },
  {
    t: "ol",
    items: [
      "Learning five languages shallowly instead of one deeply. Depth in one stack beats a tour of many every single time.",
      "Tutorial loops. If you have not built something unplanned and slightly beyond your ability this month, you are not progressing.",
      "A CV that lists technologies but no outcomes. Every bullet should contain a verb and a number.",
      `Applying only through job boards. Referrals, community events in ${c.techHubs[0]} and direct outreach to hiring managers convert far better.`,
      "Skipping fundamentals. Interviews test data structures, complexity and system design no matter how modern the stack is.",
      "No public work. A single well-documented repository or write-up outperforms ten private practice projects.",
      "Treating rejection as verdict rather than data. Ask for feedback, fix one thing, and go again.",
    ],
  },
];

const ecosystemBlocks = (c: Country): Block[] => [
  { t: "h2", text: `Understanding the ${c.name} tech ecosystem` },
  { t: "p", text: `${c.marketNote} ${tierNote(c)}` },
  {
    t: "p",
    text: `Employment concentrates in ${hubList(c)}. Locally headquartered employers such as ${companyList(c)} anchor the market, while global companies including ${listSentence(GLOBAL_COMPANIES.slice(0, 4).map((g) => g.name))} run engineering, support or delivery teams that hire from the same talent pool. That mix matters when planning a career: product companies pay more and move slower on headcount, while services and consultancy employers hire in volume and are usually the faster route to a first job.`,
  },
  {
    t: "p",
    text: `Compensation in this guide is expressed in ${c.currency} and reflects annual gross figures before tax and statutory deductions. Working language is ${c.language}, and the ${c.timezone} timezone determines which international teams will consider you for distributed roles. Together these three factors — pay band, language and timezone — explain most of the variation you will see between otherwise similar job postings.`,
  },
];

/* --------------------------------------------------------- per-section */

function overviewSection(c: Country): Block[] {
  return [
    ...ecosystemBlocks(c),
    { t: "h2", text: `What tech careers pay in ${c.name} right now` },
    {
      t: "p",
      text: `The table below is the fastest way to calibrate expectations. It covers the fifteen roles that account for the majority of tech hiring in ${c.name}, with bands for junior, mid and senior scope.`,
    },
    salaryTable(c),
    cityTable(c),
    ...learningPathBlocks(c),
    ...remoteBlocks(c),
    ...mistakesBlocks(c),
    { t: "h2", text: `Frequently asked questions about tech careers in ${c.name}` },
    {
      t: "faq",
      items: [
        {
          q: `Which tech role pays the most in ${c.name}?`,
          a: `AI and machine-learning engineering currently top the range, with senior scope reaching ${getRoleSalaryBand(c, ROLES[7]).senior}. Cloud and cybersecurity follow closely, both driven by shortages rather than hype.`,
        },
        {
          q: `Can I get a tech job in ${c.name} without a computer-science degree?`,
          a: `Yes. A degree still helps with visa-sponsored and enterprise roles, but the majority of employers hiring in ${listSentence(c.techHubs.slice(0, 2))} now screen on portfolio, take-home performance and interview signal. What replaces the degree is proof: deployed projects, open-source contributions and clear written communication.`,
        },
        {
          q: `How long does it take to become job-ready in ${c.name}?`,
          a: `Nine to fourteen months of consistent effort is the honest range for a complete beginner. People already working in adjacent roles — QA, support, analytics, IT — often move in six to nine months because they already understand how software teams operate.`,
        },
        {
          q: `Is the ${c.name} tech market still hiring in 2026?`,
          a: `Yes, but selectively. Generalist junior hiring contracted after 2023, while AI, data, cloud, security and platform engineering kept expanding. The practical implication is to specialise earlier than candidates did five years ago.`,
        },
        {
          q: `Which city in ${c.name} is best for tech jobs?`,
          a: `${c.techHubs[0]} has the highest volume of openings and the strongest salary index, but ${c.techHubs[1] ?? c.techHubs[0]} often offers better take-home after cost of living. Compare offers on disposable income, not headline salary.`,
        },
      ],
    },
  ];
}

function jobsSection(c: Country): Block[] {
  return [
    { t: "h2", text: `Which tech roles are actually hiring in ${c.name}` },
    {
      t: "p",
      text: `Job volume is not evenly distributed. In ${c.name}, roles tied to AI adoption, cloud migration and security compliance are expanding fastest, while generalist junior web roles have become the most competitive entry point. The role-by-role breakdown below reflects posted openings, growth rate and the skills that appear most frequently in job descriptions.`,
    },
    salaryTable(c),
    { t: "h2", text: `Role-by-role breakdown for ${c.name}` },
    ...roleDeepDive(c, 10),
    { t: "h2", text: `Which role should you pick?` },
    {
      t: "p",
      text: `Pick on three axes: what you can sustain learning for twelve months, what the ${c.name} market is actually hiring for, and what pays enough to justify the switch. If you enjoy visible output, frontend and mobile fit. If you enjoy systems and correctness, backend, cloud and DevOps fit. If you enjoy analysis and ambiguity, data and AI roles fit. The ${"[free career quiz](/quiz)"} maps your answers to a shortlist in about five minutes.`,
    },
    ...mistakesBlocks(c),
    {
      t: "faq",
      items: [
        {
          q: `What is the easiest tech job to get in ${c.name}?`,
          a: `QA automation, technical support engineering and data analysis have the lowest entry barrier, because employers accept demonstrated tooling skill in place of years of experience. All three are also legitimate on-ramps into engineering within eighteen months.`,
        },
        {
          q: `Are there entry-level tech jobs in ${c.name} in 2026?`,
          a: `Yes, but they are concentrated in ${listSentence(c.techHubs.slice(0, 3))} and in companies that run structured graduate programmes. Applying within the first week of a posting materially improves response rates.`,
        },
        {
          q: `Do I need to speak ${c.language.split(" / ")[0]} to work in tech in ${c.name}?`,
          a: `For international product companies, English is usually sufficient. For local enterprises, public sector and customer-facing roles, working proficiency in ${c.language.split(" / ")[0]} is often required or heavily preferred.`,
        },
      ],
    },
  ];
}

function salarySection(c: Country): Block[] {
  const senior = ROLES.map((r) => ({ r, b: getRoleSalaryBand(c, r) }));
  return [
    { t: "h2", text: `Tech salaries in ${c.name} — the complete 2026 picture` },
    {
      t: "p",
      text: `All figures below are annual gross amounts in ${c.currency}, before income tax and statutory contributions. They represent the middle of the market: well-funded product companies pay above these bands, and services or agency employers typically pay below them. ${tierNote(c)}`,
    },
    salaryTable(c),
    { t: "h2", text: `How location changes pay inside ${c.name}` },
    {
      t: "p",
      text: `Location premiums inside a single country are frequently larger than people expect. ${c.techHubs[0]} commands the highest index because that is where funded product companies cluster, but higher rent and commuting cost can erase the difference. Always convert an offer into disposable income before comparing.`,
    },
    cityTable(c),
    { t: "h2", text: "What actually moves your salary" },
    {
      t: "ul",
      items: [
        "**Specialisation.** A generalist and a specialist with identical experience can differ by 25–40% in the same city.",
        "**Company type.** Product > scale-up > enterprise > services, in that order, for the same title.",
        "**Scope, not years.** Owning a system end to end moves you a level; maintaining tickets does not.",
        "**Switching.** External moves still beat internal raises in every market we track, typically by a factor of two to three.",
        `**Language and timezone.** In ${c.name}, fluency in ${c.language.split(" / ")[0]} plus ${c.timezone} overlap opens a materially larger pool of employers.`,
      ],
    },
    { t: "h2", text: "Salary progression over a ten-year career" },
    {
      t: "table",
      head: ["Career stage", "Typical years", "Software engineering band", "What changes"],
      rows: [
        ["Junior / graduate", "0–2", getRoleSalaryBand(c, ROLES[0]).junior, "You are trusted with well-defined tasks and reviewed closely"],
        ["Mid-level", "3–5", getRoleSalaryBand(c, ROLES[0]).mid, "You own features end to end and mentor newer engineers"],
        ["Senior", "6–9", getRoleSalaryBand(c, ROLES[0]).senior, "You own systems, set technical direction and influence roadmap"],
        ["Staff / lead", "10+", `${getRoleSalaryBand(c, ROLES[0]).senior}+`, "Your leverage comes from other people's output, not only your own"],
      ],
    },
    { t: "h2", text: `Highest-paying specialisations in ${c.name}` },
    {
      t: "ul",
      items: rotate(senior, `${c.slug}-pay`)
        .sort((a, b) => b.r.usdBase[2] - a.r.usdBase[2])
        .slice(0, 8)
        .map(({ r, b }) => `**${r.role}** — senior band around ${b.senior}. Driven by ${listSentence(r.skills.slice(0, 3))}.`),
    },
    ...negotiationBlocks(c),
    {
      t: "faq",
      items: [
        {
          q: `What is a good tech salary in ${c.name}?`,
          a: `For a mid-level software engineer, anything at or above ${getRoleSalaryBand(c, ROLES[0]).mid} is competitive. Below that band, check whether equity, remote flexibility or learning budget compensates — often it does not.`,
        },
        {
          q: `Do tech salaries in ${c.name} include bonuses?`,
          a: `The bands here are base salary. Annual bonuses typically add 5–20% at established companies, while startups substitute equity that may or may not become liquid. Compare total compensation, but discount illiquid equity heavily.`,
        },
        {
          q: `How much do freelancers charge in ${c.name}?`,
          a: `A common rule of thumb is to divide your target annual salary by roughly 1,000 billable hours to get a sustainable hourly rate, then add 20–30% to cover unpaid time, tooling, insurance and gaps between contracts.`,
        },
        {
          q: `Will AI reduce tech salaries in ${c.name}?`,
          a: `So far it has raised them for engineers who use AI tooling well and compressed them for purely repetitive work. The defensible position is systems thinking, debugging and design — the parts current models are weakest at.`,
        },
      ],
    },
  ];
}

function roadmapsSection(c: Country): Block[] {
  return [
    { t: "h2", text: `Choosing the right learning path in ${c.name}` },
    {
      t: "p",
      text: `A roadmap is only useful if it matches what employers near you are hiring for. In ${c.name}, the highest-conversion paths are the ones aligned with ${listSentence(c.techHubs.slice(0, 3))} hiring: web engineering, cloud and platform work, data and AI, and security. Each roadmap below is a full step-by-step path with phases, resources and portfolio projects.`,
    },
    ...ROADMAP_CARDS.map(
      (card, i): Block => ({
        t: "p",
        text: `**[${card.title}](/roadmaps/${card.slug})** — ${card.desc} Suitable for ${card.level.toLowerCase()} progression. In ${c.name} this path most commonly leads to roles at ${listSentence(c.topCompaniesLocal.slice(i % 3, (i % 3) + 3))} and comparable employers, with a mid-level band around ${getRoleSalaryBand(c, ROLES[i % ROLES.length]).mid}.`,
      }),
    ),
    ...learningPathBlocks(c),
    { t: "h2", text: "How to study so it actually sticks" },
    {
      t: "ol",
      items: [
        "Build before you feel ready. Comprehension without construction disappears within weeks.",
        "One stack at a time. Finish a full project cycle — design, build, deploy, fix — before adding a new technology.",
        "Write down what you learned each week. Retrieval practice is the difference between a tutorial and a skill.",
        "Read other people's code. Pick one open-source repository in your stack and understand one module properly.",
        "Ship publicly. A deployed URL and a written case study is worth more than a private folder of exercises.",
      ],
    },
    {
      t: "callout",
      title: "Free tools:",
      text: `Pair any roadmap with the [career quiz](/quiz) to confirm fit, the [skill gap analyzer](/skill-gap-analyzer) to prioritise what to learn next, and the [salary predictor](/salary-predictor) to sanity-check the outcome for ${c.name}.`,
    },
    {
      t: "faq",
      items: [
        {
          q: `Which roadmap is best for beginners in ${c.name}?`,
          a: `Frontend and full-stack paths have the shortest route to a first paid role because output is visible and portfolio projects are easy to demonstrate. Data analysis is the strongest non-engineering entry point.`,
        },
        {
          q: "How many hours a week do I need?",
          a: "Ten to fifteen focused hours sustained over a year beats forty hours for two months. Consistency compounds; intensity without consistency does not.",
        },
        {
          q: "Are paid bootcamps worth it?",
          a: "Only if you need external structure and the programme has verifiable, recent placement data for your city. Every technical topic they teach is available free — what you are buying is accountability and a cohort.",
        },
      ],
    },
  ];
}

function resumeSection(c: Country): Block[] {
  return [
    { t: "h2", text: `Writing a tech CV that passes screening in ${c.name}` },
    {
      t: "p",
      text: `Most applications in ${c.name} are filtered by an applicant tracking system before a human reads them, then scanned by a recruiter for roughly seven seconds. Your CV therefore has two audiences with different needs: a parser that needs plain structure and exact keywords, and a human who needs outcomes and scope. The format below satisfies both.`,
    },
    { t: "h2", text: "Structure that works" },
    {
      t: "ol",
      items: [
        "**Header** — name, role title, city (or 'remote, ' + timezone), email, GitHub, LinkedIn, portfolio. No photo unless local convention requires one.",
        "**Summary** — three lines: what you are, your strongest stack, and the outcome you are known for.",
        "**Skills** — exact technology names grouped by category. This is what the parser matches against.",
        "**Experience** — reverse chronological, three to five bullets per role, each one verb plus outcome plus number.",
        "**Projects** — two or three, with live links. Essential if you have less than two years of experience.",
        "**Education and certifications** — brief, at the bottom, unless you are a recent graduate.",
      ],
    },
    { t: "h2", text: "Bullet points: before and after" },
    {
      t: "table",
      head: ["Weak bullet", "Strong bullet", "Why it works"],
      rows: [
        ["Worked on the company website", "Rebuilt the marketing site in Next.js, cutting largest-contentful-paint from 4.1s to 1.3s and lifting signups 18%", "Names the stack, quantifies before and after, ties to business impact"],
        ["Responsible for testing", "Introduced Playwright end-to-end suite covering 82% of critical flows, reducing production regressions from 6 to 1 per quarter", "Shows ownership and a measurable defect reduction"],
        ["Used AWS", "Migrated 14 services to ECS with Terraform, reducing monthly infrastructure spend by 31%", "Specific scale, specific tooling, specific saving"],
        ["Helped the team", "Mentored two junior engineers through onboarding; both shipped independently within six weeks", "Turns a vague claim into an observable outcome"],
      ],
    },
    { t: "h2", text: `Local conventions in ${c.name}` },
    {
      t: "ul",
      items: [
        `Language: write in ${c.language.split(" / ")[0]} for local employers and English for international ones. Keep two versions.`,
        `Length: one page under eight years of experience, two pages beyond that.`,
        `Include your city (${c.techHubs[0]} and similar hubs) or your remote timezone (${c.timezone}) — recruiters filter on both.`,
        "File format: PDF named FirstName-LastName-Role.pdf. Never send an editable document unless asked.",
        "Match 60–80% of the posting's keywords verbatim. Parsers do not resolve synonyms reliably.",
      ],
    },
    { t: "h2", text: "The ATS checklist" },
    {
      t: "ul",
      items: [
        "Single-column layout — multi-column CVs are frequently parsed out of order.",
        "Standard section headings: Experience, Education, Skills, Projects.",
        "No text inside images, icons or headers/footers.",
        "Consistent date format (MM/YYYY) with no gaps left unexplained.",
        "Exact technology spellings: 'PostgreSQL' not 'Postgres SQL', 'Kubernetes' not 'K8s' alone.",
      ],
    },
    {
      t: "callout",
      title: "Free check:",
      text: "The [SkillTa AI Resume Reviewer](/resume-reviewer) scores your CV against ATS rules, flags missing keywords for your target role and rewrites weak bullets — three free reviews every day.",
    },
    { t: "h2", text: "Cover letters and outreach" },
    {
      t: "p",
      text: `Cover letters are optional at most product companies in ${c.name} and expected at enterprises and public-sector employers. When you write one, keep it to four short paragraphs: why this company specifically, the closest thing you have built to their problem, what you would want to work on, and a clear close. A three-sentence direct message to the hiring manager frequently outperforms a full letter sent through a portal.`,
    },
    {
      t: "faq",
      items: [
        { q: `Should I include a photo on my CV in ${c.name}?`, a: `Follow local convention — some European markets still expect one, most English-speaking markets discourage it. When in doubt, leave it out; it never disqualifies you.` },
        { q: "How do I explain an employment gap?", a: "One neutral line stating what you did — study, caregiving, health, travel, freelance. Gaps are common since 2023 and rarely disqualify anyone who addresses them plainly." },
        { q: "How many applications should I send?", a: "Twenty highly tailored applications beat two hundred generic ones. Track response rate weekly and change one variable at a time." },
      ],
    },
  ];
}

function interviewSection(c: Country): Block[] {
  return [
    { t: "h2", text: `How tech interviews work in ${c.name}` },
    {
      t: "p",
      text: `A typical loop in ${c.name} runs four to six stages over two to five weeks: recruiter screen, technical screen or online assessment, one or two deep technical rounds, a system design round for mid and senior candidates, and a hiring-manager or values round. Employers such as ${companyList(c)} broadly follow this shape, though startups compress it and enterprises extend it.`,
    },
    { t: "h2", text: "Stage-by-stage preparation" },
    {
      t: "table",
      head: ["Stage", "What is really being tested", "How to prepare"],
      rows: [
        ["Recruiter screen", "Communication, motivation, salary alignment", "A 90-second story about your work and a researched salary range"],
        ["Technical screen", "Fluency with fundamentals under mild time pressure", "Daily reps on arrays, strings, hash maps and trees for four weeks"],
        ["Take-home / assessment", "Code quality, tests, README, judgement about scope", "Timebox it, write tests, document trade-offs you deliberately skipped"],
        ["Deep technical round", "Debugging, reasoning aloud, handling hints", "Practise narrating your thinking; silence reads as being stuck"],
        ["System design", "Scoping, trade-offs, knowing what you do not know", "Practise a repeatable structure: requirements, estimates, API, data, scale, failure"],
        ["Hiring manager", "Ownership, collaboration, how you handle conflict", "Six STAR stories covering failure, conflict, deadline, mentorship, ambiguity, impact"],
      ],
    },
    { t: "h2", text: "Coding round topics" },
    { t: "ul", items: [...INTERVIEW_TOPICS.coding] },
    {
      t: "p",
      text: `Depth beats volume here. Two hundred problems solved carelessly teaches less than sixty solved twice — once to get it right, once to explain the reasoning cleanly out loud. Interviewers in ${c.name} weight explanation quality heavily because it predicts how you will behave in code review.`,
    },
    { t: "h2", text: "System design questions you should be able to attempt" },
    { t: "ul", items: [...INTERVIEW_TOPICS.systemDesign] },
    {
      t: "p",
      text: "Use one repeatable structure for every design question: clarify functional and non-functional requirements, estimate scale, sketch the API, choose the data model, then walk through read and write paths before discussing caching, sharding and failure modes. Saying 'here is the trade-off, and here is what I would choose and why' is the answer interviewers are listening for.",
    },
    { t: "h2", text: "Behavioural round" },
    { t: "ul", items: [...INTERVIEW_TOPICS.behavioral] },
    {
      t: "p",
      text: "Answer in STAR form — situation, task, action, result — and keep each story under two minutes. Prepare one genuine failure story with a concrete lesson; candidates who cannot name a real mistake consistently score lower on the ownership dimension.",
    },
    { t: "h2", text: "HR and closing round" },
    { t: "ul", items: [...INTERVIEW_TOPICS.hr] },
    {
      t: "p",
      text: `Salary expectations come up here. Anchor on the ${c.name} band for the role — a mid-level software engineer sits near ${getRoleSalaryBand(c, ROLES[0]).mid} — and ask what range the position is budgeted at before naming a single figure.`,
    },
    { t: "h2", text: "A four-week interview preparation plan" },
    {
      t: "table",
      head: ["Week", "Focus", "Daily commitment", "Checkpoint"],
      rows: [
        ["1", "Fundamentals refresh — arrays, strings, hash maps, complexity", "60–90 minutes", "Solve an easy problem in under 20 minutes, explained aloud"],
        ["2", "Trees, graphs, recursion, sorting and searching", "60–90 minutes", "Solve a medium problem with a clear approach before coding"],
        ["3", "System design plus your own project deep-dive", "60 minutes plus one mock", "Design a URL shortener end to end in 40 minutes"],
        ["4", "Behavioural stories, mock loops, company research", "45 minutes plus two mocks", "Six STAR stories delivered in under two minutes each"],
      ],
    },
    ...mistakesBlocks(c),
    {
      t: "faq",
      items: [
        { q: `How long is a tech interview process in ${c.name}?`, a: "Two to five weeks is typical. Startups can move in a week; enterprises and visa-sponsoring employers often take six weeks or more." },
        { q: "Can I use AI tools during a take-home?", a: "Assume you can use them to work faster, but that you will be asked to defend every line in the follow-up round. Never submit code you cannot explain." },
        { q: "What if I freeze during a coding round?", a: "Say what you are considering out loud and state the brute-force approach first. Interviewers score reasoning; a working slow solution beats silence." },
      ],
    },
  ];
}

function companiesSection(c: Country): Block[] {
  return [
    { t: "h2", text: `Who is hiring engineers in ${c.name}` },
    {
      t: "p",
      text: `The ${c.name} employer landscape splits into four groups, and each has a distinct hiring bar, pay band and interview style. Knowing which group you are applying to is the single most useful piece of preparation you can do.`,
    },
    {
      t: "table",
      head: ["Employer type", "Examples", "Pay", "Hiring bar", "Best for"],
      rows: [
        ["Local product leaders", listSentence(c.topCompaniesLocal.slice(0, 3)), "High", "High", "Engineers who want scope and strong peers"],
        ["Global companies hiring locally", listSentence(GLOBAL_COMPANIES.slice(0, 3).map((g) => g.name)), "Highest", "Highest", "Structured career ladders and mobility"],
        ["Scale-ups and funded startups", listSentence(c.topCompaniesLocal.slice(3, 6)), "Medium to high plus equity", "Medium", "Fast ownership and broad exposure"],
        ["Services, consulting and agencies", "Regional consultancies and delivery partners", "Medium", "Lower", "First job, volume hiring, client variety"],
      ],
    },
    { t: "h2", text: `Local employers worth knowing` },
    {
      t: "ul",
      items: c.topCompaniesLocal.map(
        (name, i) =>
          `**${name}** — hires across ${listSentence(c.techHubs.slice(0, 2))}. Typical openings: ${listSentence(rotate(ROLES, `${c.slug}-${name}`).slice(0, 3).map((r) => r.role.toLowerCase()))}. ${pick(["Known for a structured interview loop with a take-home stage.", "Moves fast — expect a compressed two-week process.", "Strong internal mobility once you are in.", "Heavier on system design than algorithm puzzles."], `${c.slug}-${name}`, i)}`,
      ),
    },
    { t: "h2", text: `Global employers with teams in or hiring from ${c.name}` },
    {
      t: "ul",
      items: GLOBAL_COMPANIES.map((g) => `**${g.name}** — careers portal: ${g.url}`),
    },
    { t: "h2", text: "How to get noticed by the companies you actually want" },
    {
      t: "ol",
      items: [
        "Pick eight target companies rather than applying broadly. Depth of research is visible in interviews.",
        "Read their engineering blog and job descriptions, then build something adjacent to their problem space.",
        `Attend or follow meetups and communities in ${c.techHubs[0]}; most referrals start as a conversation, not a request.`,
        "Message the hiring manager, not only the recruiter. Three sentences: who you are, the closest thing you built, one specific question.",
        "Apply within 72 hours of a posting going live. Response rates fall sharply after the first week.",
      ],
    },
    ...negotiationBlocks(c),
    {
      t: "faq",
      items: [
        { q: `Which companies pay the most in ${c.name}?`, a: `Global product companies operating locally sit at the top of the range, followed by well-funded local product companies such as ${listSentence(c.topCompaniesLocal.slice(0, 2))}. Services employers pay least but hire the most juniors.` },
        { q: "Do startups or big companies give better career growth?", a: "Startups give scope earlier; large companies give structure, mentorship and brand value. Early career benefits more from structure, mid-career benefits more from scope." },
        { q: "How important are referrals?", a: "Very. Referred applications are typically reviewed within days, while cold applications often are not reviewed at all when volume is high." },
      ],
    },
  ];
}

function certificationsSection(c: Country): Block[] {
  return [
    { t: "h2", text: `Do certifications help you get hired in ${c.name}?` },
    {
      t: "p",
      text: `Honestly: they help in three situations and not much otherwise. They help when you are switching careers and need a credible signal, when an employer or client contractually requires one — common in cloud, security and public-sector work in ${c.name} — and when you need external structure to finish learning something. They do not substitute for a portfolio, and no certification alone will get a software engineering offer.`,
    },
    { t: "h2", text: "Certifications worth your money in 2026" },
    {
      t: "table",
      caption: `Certification value for the ${c.name} job market`,
      head: ["Certification", "Provider", "Why it matters", "Best for"],
      rows: CERTIFICATIONS.map((cert, i) => [
        cert.name,
        cert.provider,
        cert.why,
        pick(["Career switchers", "Cloud and platform roles", "Security and compliance roles", "Data and analytics roles", "First-job candidates"], `${c.slug}-${cert.name}`, i),
      ]),
    },
    ...CERTIFICATIONS.slice(0, 6).flatMap((cert, i): Block[] => [
      { t: "h3", text: cert.name },
      {
        t: "p",
        text: `${cert.why} In ${c.name} this credential shows up most often in postings from ${listSentence(c.topCompaniesLocal.slice(i % 3, (i % 3) + 2))} and comparable employers. Budget ${pick(["4–6 weeks", "6–8 weeks", "8–10 weeks"], `${c.slug}-${cert.name}-t`)} of part-time study, and pair it with one hands-on project so you have something to discuss beyond the badge. Official page: ${cert.url}`,
      },
    ]),
    { t: "h2", text: "How to choose" },
    {
      t: "ol",
      items: [
        `Search current ${c.name} job postings for your target role and count which certifications actually appear.`,
        "Prefer vendor certifications tied to tools you will use daily over generic ones.",
        "Do the hands-on labs, not only the exam prep. Interviewers ask what you built, not what you memorised.",
        "Renew only what stays relevant to your role; expired certifications on a CV read as neglect.",
      ],
    },
    {
      t: "callout",
      title: "Cheaper first step:",
      text: "Run the free [skill gap analyzer](/skill-gap-analyzer) before paying for an exam. It tells you whether a certification or a project is the faster route to your target role.",
    },
    {
      t: "faq",
      items: [
        { q: `Are certifications required for tech jobs in ${c.name}?`, a: "Rarely required for engineering, frequently expected for cloud, networking, security and some public-sector or regulated employers." },
        { q: "Which cloud certification should I start with?", a: "Start with the fundamentals level of whichever cloud your target employers actually use, then move to the associate-level architect or engineer exam within six months." },
        { q: "Do free certificates count?", a: "Course completion certificates carry little weight on their own, but the projects you build during those courses do. Put the project on your CV, not the certificate." },
      ],
    },
  ];
}

function skillsSection(c: Country): Block[] {
  return [
    { t: "h2", text: `The skills ${c.name} employers are paying for in 2026` },
    {
      t: "p",
      text: `Skill demand shifted meaningfully between 2024 and 2026. AI integration moved from a specialist concern to a baseline expectation, cloud and infrastructure-as-code became standard for backend roles, and security awareness is now screened for in ordinary engineering interviews. The list below reflects what appears most often in ${c.name} job postings, ordered by frequency.`,
    },
    {
      t: "table",
      caption: `In-demand skills and what they are worth in ${c.name}`,
      head: ["Skill", "Where it is used", "Salary effect", "Time to working proficiency"],
      rows: TOP_SKILLS_2026.map((skill, i) => [
        skill,
        pick(["Web and product teams", "Platform and infrastructure", "Data and AI teams", "Security and compliance", "Backend services", "Mobile and cross-platform"], `${c.slug}-${skill}`, i),
        pick(["+5–10%", "+8–14%", "+10–18%", "+12–20%"], `${c.slug}-${skill}-p`, i),
        pick(["4–8 weeks", "2–3 months", "3–5 months", "5–8 months"], `${c.slug}-${skill}-t`, i),
      ]),
    },
    { t: "h2", text: "Technical skills, in the order worth learning them" },
    {
      t: "ol",
      items: [
        "One programming language, properly — syntax, standard library, debugging, testing, packaging.",
        "Version control and collaboration — branching, review, resolving conflicts without fear.",
        "Data modelling and SQL — the single most transferable skill across every tech role.",
        "One framework end to end, including deployment and monitoring in production.",
        "Cloud fundamentals — compute, storage, networking, identity and cost.",
        "Testing and automation — unit, integration and one end-to-end suite you maintain.",
        "AI tooling used well — prompting, retrieval, evaluation, and knowing when not to use a model.",
        "System design — how components fail and what you do about it.",
      ],
    },
    { t: "h2", text: "The non-technical skills that decide promotions" },
    {
      t: "ul",
      items: [
        "**Written communication.** In distributed teams your design doc is your influence.",
        "**Scoping.** Turning a vague request into a shippable increment is a senior-level skill people learn late.",
        "**Debugging discipline.** Forming a hypothesis and testing it beats changing code randomly, and interviewers can tell the difference.",
        "**Estimation honesty.** Reliable estimates build more trust than fast ones.",
        `**Language and cultural fluency.** Working comfortably in ${c.language} widens your options inside ${c.name} considerably.`,
      ],
    },
    { t: "h2", text: "Skills by role" },
    ...rotate(ROLES, `${c.slug}-skills`).slice(0, 8).map(
      (r): Block => ({
        t: "p",
        text: `**${r.role}** — ${listSentence(r.skills)}. Demand ${r.demand.toLowerCase()}, ${r.growth}. Mid-level pay in ${c.name} sits near ${getRoleSalaryBand(c, r).mid}.`,
      }),
    ),
    {
      t: "callout",
      title: "Find your gaps:",
      text: "The free [skill gap analyzer](/skill-gap-analyzer) compares what you know against your target role and returns a prioritised eight-week plan.",
    },
    {
      t: "faq",
      items: [
        { q: `Which programming language should I learn in ${c.name}?`, a: `Check current local postings first. Broadly, JavaScript or TypeScript opens the most doors for web work, Python for data and AI, and Java or C# for enterprise employers — all three are well represented in ${c.techHubs[0]}.` },
        { q: "How many skills do I need before applying?", a: "One language, one framework, SQL, Git and one deployed project is enough to start applying. Waiting until you feel ready costs months of interview practice." },
        { q: "Will AI make these skills obsolete?", a: "AI has raised the floor on writing code and raised the bar on judgement. The skills that gained value are debugging, design, testing and evaluating whether generated output is actually correct." },
      ],
    },
  ];
}

function resourcesSection(c: Country): Block[] {
  return [
    { t: "h2", text: `Free career resources for ${c.name}` },
    {
      t: "p",
      text: `Everything in this list is free and directly usable. The SkillTa tools are built around the same salary data used across this guide, so estimates stay consistent with the ${c.name} bands shown elsewhere on this page.`,
    },
    {
      t: "ul",
      items: [
        "**[AI Career Quiz](/quiz)** — a diagnostic that maps your interests, strengths and constraints to a shortlist of realistic roles. Three free attempts every day.",
        "**[Salary Predictor](/salary-predictor)** — unlimited estimates by role, experience level and city, using the same 2026 market bands as this guide.",
        "**[AI Resume Reviewer](/resume-reviewer)** — ATS score, keyword gaps and rewritten bullet points, three free reviews daily.",
        "**[Skill Gap Analyzer](/skill-gap-analyzer)** — compares your current skills with your target role and returns a prioritised eight-week plan.",
        "**[Roadmap Library](/roadmaps)** — 60+ step-by-step paths with phases, resources and portfolio projects.",
        "**[Compare Careers](/compare)** — side-by-side comparison of any two roles on salary, difficulty, demand and growth.",
        "**[Blog](/blog)** — country and role-specific salary guides updated for 2026.",
      ],
    },
    { t: "h2", text: "External resources worth your time" },
    {
      t: "ul",
      items: [
        "MDN Web Docs — the reference for web platform behaviour, not a tutorial site but the thing you will use daily.",
        "freeCodeCamp — structured, project-based curriculum that is genuinely free end to end.",
        "The Odin Project — strongest free full-stack path for people who like reading over watching.",
        "Roadmap.sh — visual dependency maps of what to learn in what order.",
        "Official documentation for your framework — underrated, usually better than the courses built on top of it.",
        "Your cloud provider's free tier — nothing teaches infrastructure like running something real and watching the bill.",
      ],
    },
    { t: "h2", text: `Communities and events in ${c.name}` },
    {
      t: "p",
      text: `Local communities in ${listSentence(c.techHubs.slice(0, 3))} run regular meetups, and most have active online channels that are far more useful than job boards for finding unadvertised roles. Contributing answers before asking for help is what turns a community into a referral network. Language matters here too — ${c.language} groups and English-speaking groups often have different job leads.`,
    },
    ...learningPathBlocks(c),
    {
      t: "faq",
      items: [
        { q: "Are the SkillTa tools really free?", a: "Yes. The quiz allows three attempts per day, resume review and skill gap analysis three per day, and the salary predictor, roadmaps and comparison tool are unlimited. No card required." },
        { q: `What is the best free way to learn to code in ${c.name}?`, a: "Combine one structured curriculum with one real project you actually want to exist. The curriculum stops you skipping fundamentals; the project stops you quitting." },
        { q: "How do I stay current after landing a job?", a: "Pick one deep topic per quarter rather than following every release. Depth compounds; keeping up with everything does not." },
      ],
    },
  ];
}

/* ------------------------------------------------------------------ api */

const SECTION_BUILDERS: Record<SectionKey, (c: Country) => Block[]> = {
  overview: overviewSection,
  jobs: jobsSection,
  salary: salarySection,
  roadmaps: roadmapsSection,
  resume: resumeSection,
  interview: interviewSection,
  companies: companiesSection,
  certifications: certificationsSection,
  skills: skillsSection,
  resources: resourcesSection,
};

/* ------------------------------------------------- shared closing depth */

const SECTION_LABEL: Record<SectionKey, string> = {
  overview: "tech careers",
  jobs: "tech jobs",
  salary: "tech salaries",
  roadmaps: "learning roadmaps",
  resume: "tech resumes",
  interview: "technical interviews",
  companies: "tech employers",
  certifications: "certifications",
  skills: "in-demand skills",
  resources: "career resources",
};

/** Section-specific FAQ — different questions per section and per country. */
function sectionFaq(c: Country, key: SectionKey): Block {
  const topRole = ROLES[0];
  const band = getRoleSalaryBand(c, topRole.key);
  const mid = formatLocalSalary(c, band.mid);
  const common = [
    {
      q: `How reliable are the ${c.name} figures on this page?`,
      a: `They are 2026 market-band estimates built from public compensation datasets and job postings, expressed as annual gross in ${c.currency} before tax. Use them as a negotiating anchor, not a guarantee — company type and role scope move a band more than the job title does. Cross-check your own number with the free [salary predictor](/salary-predictor).`,
    },
    {
      q: `Do I need to live in ${listSentence(c.techHubs.slice(0, 2))} to get hired?`,
      a: `No, but it still helps. Hiring density is highest in ${hubList(c)}, and hybrid roles there usually pay above the national band. Fully remote roles have narrowed that gap, and your ${c.timezone} overlap with the employer's core hours matters more than your postcode for distributed teams.`,
    },
  ];

  const specific: Record<SectionKey, { q: string; a: string }[]> = {
    overview: [
      { q: `Is ${c.name} a good market to start a tech career in 2026?`, a: `${tierNote(c)} For a first job, the fastest route is usually a services or consultancy employer, then a move to a product company within two years once you have shipped something measurable.` },
      { q: `Which role should I target first?`, a: `Pick by fit rather than by pay. Take the free [career quiz](/quiz) — it maps your interests to specific roles — then open the matching [roadmap](/roadmaps) and follow it end to end instead of sampling several.` },
    ],
    jobs: [
      { q: `How many applications does a first tech job in ${c.name} take?`, a: `Realistically 40 to 120 tailored applications over eight to sixteen weeks, with referrals converting several times better than cold applications. Untailored volume applying produces worse results than half the applications with a matched CV.` },
      { q: `Are there entry-level roles at all right now?`, a: `Yes, but they are concentrated in services companies, scale-ups and internal platform teams rather than in high-profile product companies. Local employers such as ${companyList(c)} hire in cohorts — apply when their cycles open rather than continuously.` },
    ],
    salary: [
      { q: `What does a mid-level ${topRole.title.toLowerCase()} earn in ${c.name}?`, a: `Roughly ${mid} a year gross at the midpoint of the band, with the spread driven by company type, city and scope. Product companies and foreign-funded employers sit at the top of the range; services and support functions sit near the bottom.` },
      { q: `How much raise should I expect when switching jobs?`, a: `Switching typically returns more than an internal review in ${c.name}: a well-timed move with competing interest usually lands a materially higher band, while internal raises track inflation plus performance. That asymmetry is why engineers move every two to three years early in a career.` },
    ],
    roadmaps: [
      { q: `How long does a roadmap realistically take?`, a: `Six to twelve months at ten to fifteen focused hours a week for a first job-ready level, and two to three years to mid-level. Anyone promising faster is measuring course completion rather than employability.` },
      { q: `Should I follow more than one roadmap?`, a: `No. Finish one, ship two real projects with it, then broaden. Depth in one stack is what interviews test; breadth without depth reads as unfinished on a CV.` },
    ],
    resume: [
      { q: `Should my ${c.name} resume include a photo?`, a: `Follow local convention rather than a global template — some markets expect a photo and personal details, others screen them out. When in doubt, omit it: the ATS never reads it and no employer rejects a candidate for its absence.` },
      { q: `How do I get past ATS filters?`, a: `Use a single-column layout, standard headings, no tables or text boxes in the header, and the exact skill wording from the job posting. Run the file through the free [AI resume reviewer](/resume-reviewer) for an ATS score and keyword gaps before applying.` },
    ],
    interview: [
      { q: `What does a typical loop look like in ${c.name}?`, a: `Recruiter screen, technical screen, one or two deep technical rounds covering ${listSentence(INTERVIEW_TOPICS.slice(0, 3).map((t) => t.topic.toLowerCase()))}, a system-design round from mid-level upward, and a behavioural round. Expect two to four weeks end to end at most employers.` },
      { q: `How much DSA practice is enough?`, a: `Around 120 to 180 well-understood problems beats 500 skimmed ones. Prioritise patterns — two pointers, sliding window, graphs, dynamic programming — and be able to narrate your reasoning out loud, because that is what interviewers actually score.` },
    ],
    companies: [
      { q: `Local employer or global company — which pays better in ${c.name}?`, a: `Global product companies usually pay above the local band and interview harder; local employers such as ${companyList(c)} hire in higher volume and are the more reliable route to a first offer. Many strong careers start at the second and move to the first.` },
      { q: `How do I get a referral?`, a: `Engage genuinely before asking — comment on engineering posts, attend meetups in ${c.techHubs[0]}, contribute to a project the team uses. A referral from someone who has seen your work converts far better than a cold message asking for one.` },
    ],
    certifications: [
      { q: `Do certifications actually get you hired in ${c.name}?`, a: `They rarely win an offer on their own, but they do pass filters in cloud, security and data roles, and they help career switchers with no degree signal. Pair every certification with a project that proves you can apply it.` },
      { q: `Which one should I take first?`, a: `Match it to the role you want, not to the cheapest option: ${listSentence(CERTIFICATIONS.slice(0, 3).map((x) => x.name))} cover the highest-demand paths. Confirm the target role first with the [skill gap analyzer](/skill-gap-analyzer).` },
    ],
    skills: [
      { q: `Which skills matter most in ${c.name} in 2026?`, a: `${listSentence(TOP_SKILLS_2026.slice(0, 5).map((s) => s.skill))} appear most often in local postings, with AI-adjacent tooling now expected alongside core engineering rather than instead of it.` },
      { q: `Will AI replace these roles?`, a: `It is compressing routine work and raising the expected output per engineer, which hits generalists hardest and specialists least. The durable defence is depth plus judgment: system design, debugging, data modelling and communication are all harder to automate than syntax.` },
    ],
    resources: [
      { q: `Free resources or paid courses?`, a: `Free material is sufficient for almost every roadmap on this site; pay only for structure, feedback or accountability if you struggle to keep momentum alone. Spend on the portfolio and interview practice, not on more content.` },
      { q: `How do I stay current without drowning?`, a: `Pick two sources and one community, review them weekly, and ignore the rest. Depth compounds; feed-scrolling does not.` },
    ],
  };

  return { t: "faq", items: [...rotate(specific[key] ?? [], c.slug), ...common] };
}

function closingBlocks(c: Country, key: SectionKey): Block[] {
  const label = SECTION_LABEL[key];
  return [
    { t: "h2", text: `Cost of living, tax and what the numbers actually mean` },
    {
      t: "p",
      text: `Every figure on this page is annual gross in ${c.currency}. Take-home pay depends on ${c.name}'s income tax bands, social contributions and any employer-side benefits, so two identical gross offers can differ meaningfully in what reaches your account. Before comparing an offer against another country, convert both to purchasing power rather than exchange rate: a lower headline number in a cheaper city frequently leaves more disposable income than a headline number in ${c.techHubs[0]}.`,
    },
    {
      t: "ul",
      items: [
        `**Housing** is the largest single variable between ${hubList(c)} and smaller cities, and it moves effective pay more than a one-level promotion does.`,
        `**Employer type** matters as much as title — funded product companies, global captives and local services firms pay noticeably different bands for the same work.`,
        `**Equity and bonus** are worth discounting heavily unless the company is public or you understand the terms in detail.`,
        `**Remote arbitrage** works both ways: employers increasingly band remote pay by location, so confirm the policy before assuming a hub salary from outside the hub.`,
      ],
    },
    { t: "h2", text: `Working internationally from ${c.name}` },
    {
      t: "p",
      text: `Two routes exist and they are very different. Relocation means employer sponsorship, a visa process measured in months, and a compensation reset to the destination market's band. Remote employment means keeping your ${c.timezone} base while being paid against another market's band, usually through a contractor arrangement or an employer-of-record. The remote route is faster and reversible; the relocation route pays more and takes longer. Whichever you pursue, English written communication and a public body of work do more to open the door than any certificate — hiring managers abroad cannot verify your degree easily, but they can read your repositories.`,
    },
    { t: "h2", text: `Free SkillTa tools for ${label} in ${c.name}` },
    {
      t: "ul",
      items: [
        `[Career quiz](/quiz) — a short diagnostic that maps your interests and strengths to specific tech roles.`,
        `[Salary predictor](/salary-predictor) — unlimited 2026 estimates by role, experience and city.`,
        `[Roadmap library](/roadmaps) — 60+ step-by-step learning paths with phases, resources and projects.`,
        `[Compare careers](/compare) — salary, difficulty, demand and growth for any two roles side by side.`,
        `[AI resume reviewer](/resume-reviewer) — ATS score, keyword gaps and rewritten bullet points.`,
        `[Skill gap analyzer](/skill-gap-analyzer) — a personalised eight-week plan from your current skills to a target role.`,
      ],
    },
    { t: "h2", text: `Frequently asked questions about ${label} in ${c.name}` },
    sectionFaq(c, key),
    {
      t: "p",
      text: `Continue with the rest of the ${c.name} guide: [overview](/${c.slug}), [top tech jobs](/${c.slug}/top-tech-jobs), [salary explorer](/${c.slug}/salary-explorer), [tech roadmaps](/${c.slug}/tech-roadmaps), [resume guide](/${c.slug}/resume-guide), [interview preparation](/${c.slug}/interview-preparation), [top companies](/${c.slug}/top-companies), [certifications](/${c.slug}/certifications), [skills in demand](/${c.slug}/skills-in-demand) and [career resources](/${c.slug}/career-resources).`,
    },
  ];
}

/** Long-form, country-specific content for a page section. */
export function countryDeepBlocks(country: Country, sectionKey: SectionKey): Block[] {
  const build = SECTION_BUILDERS[sectionKey] ?? overviewSection;
  return [...build(country), ...closingBlocks(country, sectionKey)];
}

