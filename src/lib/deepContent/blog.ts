/**
 * Supplementary long-form sections appended to every blog article.
 * Derived from the post's own metadata (category, keywords, country) so that
 * each article gets distinct additional depth rather than a boilerplate block.
 */
import type { BlogPost } from "@/data/blogPosts";
import { type Block, listSentence, pick, rotate } from "./types";

const keywordList = (post: BlogPost): string[] =>
  post.keywords
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);

const topicNoun = (post: BlogPost): string => {
  const k = keywordList(post)[0] ?? post.category;
  return k.replace(/\b20\d\d\b/g, "").replace(/\s+/g, " ").trim() || post.category;
};

export function blogDeepBlocks(post: BlogPost): Block[] {
  const topic = topicNoun(post);
  const kws = rotate(keywordList(post), post.slug);
  const isSalary = /salary|pay|compensation/i.test(`${post.title} ${post.keywords}`);
  const isCountry = Boolean(post.country);

  const blocks: Block[] = [
    { t: "h2", text: `Why ${topic} matters in 2026` },
    {
      t: "p",
      text: `${post.description} The context behind that has shifted quickly. Hiring in this area contracted for generalists after 2023 and expanded for specialists, which means the advice that worked five years ago — learn broadly, apply widely — now produces worse results than picking one area and going deep. Everything below is written with that in mind.`,
    },
    {
      t: "p",
      text: `Three forces are shaping ${post.category.toLowerCase()} right now: AI tooling raising the baseline of what one engineer can produce, distributed hiring widening the candidate pool for every posting, and employers weighting demonstrated output over credentials. Each of those cuts both ways — the bar is higher, but so is the ceiling for anyone with visible proof of work.`,
    },
    { t: "h2", text: "Who this guide is for" },
    {
      t: "ul",
      items: [
        "**Students and final-year candidates** deciding what to specialise in before graduating.",
        "**Career switchers** coming from non-technical or adjacent roles who need a realistic timeline, not a motivational one.",
        "**Working engineers** benchmarking their compensation and planning their next move.",
        "**Freelancers and contractors** setting rates against employed-market bands.",
      ],
    },
    { t: "h2", text: "Practical action plan" },
    {
      t: "table",
      caption: "A 90-day plan you can start this week",
      head: ["Weeks", "Focus", "Concrete output", "How you know it worked"],
      rows: [
        ["1–2", "Baseline and target", "A written target role, target band and gap list", "You can name three specific skills to close"],
        ["3–6", "Close the biggest gap", "One project that uses the missing skill in anger", "It is deployed and someone other than you has used it"],
        ["7–10", "Proof and positioning", "Rewritten CV, portfolio page, written case study", "Your CV passes an ATS check and reads in outcomes"],
        ["11–13", "Market contact", "30 targeted applications, 5 referral conversations, weekly mocks", "You are reaching final rounds, not just screens"],
      ],
    },
    { t: "h2", text: "What most people get wrong" },
    {
      t: "ol",
      items: [
        "Optimising for the highest advertised salary rather than the role they can sustain for three years.",
        "Reading about the topic instead of producing something with it. Consumption feels like progress and rarely is.",
        "Applying with an untailored CV, then concluding the market is closed.",
        "Ignoring the fundamentals because the surface layer changes fast — the fundamentals are what interviews test.",
        "Waiting for certainty. The information in this guide is enough to start; the rest is learned by doing.",
      ],
    },
    { t: "h2", text: "Frequently asked questions" },
    {
      t: "faq",
      items: [
        {
          q: `Is ${topic} still worth pursuing in 2026?`,
          a: `Yes, with the caveat that generalist entry has become harder while specialist demand keeps rising. The realistic route is to pick one lane, build visible proof, and target employers whose stack you actually match.`,
        },
        {
          q: "How long before I see results?",
          a: "Skill-building shows up in three to six months; job-search results show up in six to twelve weeks of consistent, tailored applications. Both timelines assume weekly output rather than occasional bursts.",
        },
        {
          q: isSalary ? "How accurate are these salary figures?" : "How current is this guide?",
          a: isSalary
            ? "They are market-band estimates compiled from public compensation datasets and job postings, expressed as annual gross. Treat them as a negotiating anchor rather than a guarantee — company type and scope move a band more than job title does."
            : `It reflects the 2026 market and is revised as hiring patterns shift. Where numbers appear, they are estimates from public data and job postings rather than fixed figures.`,
        },
        {
          q: "What should I do first?",
          a: `Take the [free career quiz](/quiz) if you are still choosing a direction, or run the [skill gap analyzer](/skill-gap-analyzer) if you already have a target role and need to know what to learn next.`,
        },
      ],
    },
    { t: "h2", text: "Related reading" },
    {
      t: "ul",
      items: [
        `[Browse all 60+ tech career roadmaps](/roadmaps) — step-by-step paths with phases, resources and portfolio projects.`,
        `[Compare two careers side by side](/compare) — salary, difficulty, demand and growth in one view.`,
        `[Free salary predictor](/salary-predictor) — unlimited 2026 estimates by role, city and experience.`,
        `[AI resume reviewer](/resume-reviewer) — ATS score, keyword gaps and rewritten bullets.`,
        isCountry ? `[More ${post.category} guides](/blog) — country and role-specific salary breakdowns.` : `[More career guides on the blog](/blog).`,
      ],
    },
    {
      t: "p",
      text: `Search terms covered by this guide: ${listSentence(kws.slice(0, 8))}. ${pick(["Bookmark it — the figures are revised each quarter.", "The tools linked above use the same underlying dataset, so estimates stay consistent.", "If a section is out of date for your market, the salary predictor is the faster sanity check."], post.slug)}`,
    },
  ];

  return blocks;
}
