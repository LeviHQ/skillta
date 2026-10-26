import { careers } from '../../data/careers';
import { blogPosts } from '../../data/blogPosts';
import { COUNTRIES } from '../../data/countries';
import { SECTIONS, ROLES, TOP_SKILLS_2027, ROADMAP_CARDS, CERTIFICATIONS, GLOBAL_COMPANIES, INTERVIEW_TOPICS, getRoleSalaryBand } from '../../data/countrySections';
import { countryDeepBlocks } from '../deepContent/country';
import { roadmapDeepBlocks } from '../deepContent/roadmap';
import { blogDeepBlocks } from '../deepContent/blog';
import { getCountryMeta } from '../countryMeta';
import { PAGE_SEO, SITE_CONFIG } from '../seo';
import { absoluteLinks, absoluteUrl, blocksToMarkdown, bullets, link, markdownPath, table } from './format';
import { STATIC_PUBLIC_PATHS } from './policy';

export interface MarkdownPage {
  path: string;
  title: string;
  description: string;
  group: 'core' | 'roadmaps' | 'blog' | 'countries' | 'legal';
  updated?: string;
  render: () => string;
}
export type StaticContent = Record<string, string>;
const tools: Record<string, [string, string]> = {
  '/salary-predictor': ['Tech Salary Predictor', 'Estimate tech salary by role, experience, location and skills.'],
  '/resume-reviewer': ['AI Resume Reviewer', 'Review a resume for ATS compatibility, keyword gaps and improvement suggestions.'],
  '/skill-gap-analyzer': ['Skill Gap Analyzer', 'Compare current skills with a target tech role and identify a learning plan.'],
  '/story': ['The SkillTa Story', 'Why SkillTa was built and how plan purchases and guest advertising support the platform.'],
};
const featureNames = ['AI Career Quiz', 'AI Resume Reviewer', 'Resume Version Control', 'Skill Gap Analyzer', 'Salary Predictor', 'Career Comparison', 'Career Roadmaps', 'Country Tech Ecosystems'];

/** Fully enumerated allowlist. It never queries auth, storage or user tables. */
export function createMarkdownRegistry(staticContent: StaticContent = {}): MarkdownPage[] {
  const pages: MarkdownPage[] = STATIC_PUBLIC_PATHS.map((path) => {
    const seo = Object.values(PAGE_SEO).find((value) => value.path === path);
    const fallback = tools[path];
    const title = seo?.title ?? fallback?.[0] ?? SITE_CONFIG.name;
    const description = seo?.description ?? fallback?.[1] ?? SITE_CONFIG.description;
    const render = () => {
      if (path === '/') return `${staticContent.home ?? SITE_CONFIG.description}\n\n## Career Suite\n\n${bullets(featureNames)}\n\n${staticContent.pricing ?? ''}\n\n${staticContent.faq ?? ''}`;
      if (path === '/roadmaps') return bullets(careers.map((career) => `${link(career.title, `/roadmaps/${career.id}`)} — ${career.tagline}`));
      if (path === '/blog') return bullets(blogPosts.filter((post) => !post.country).map((post) => `${link(post.title, `/blog/${post.slug}`)} — ${post.description}`));
      if (staticContent[path]) return staticContent[path];
      if (path === '/contact') return `${description}\n\n${link('Email support', `mailto:${SITE_CONFIG.contactEmail}`)}`;
      // Tool pages describe the public interface only; inputs and outputs stay private.
      return `${description}\n\nPersonalized tools require sign-in and an active Pro or Lifetime plan.\n\n${link('Access plans', '/#pricing')}`;
    };
    return { path, title, description, group: path === '/terms' || path === '/privacy' ? 'legal' : 'core', render };
  });
  for (const career of careers) pages.push({
    path: `/roadmaps/${career.id}`, title: `${career.title} Roadmap`, description: career.tagline, group: 'roadmaps',
    render: () => `${career.description}\n\n## Key facts\n\n${table(['Metric', 'Value'], [['Difficulty', career.learningDifficulty], ['Time to job-ready', career.estimatedTime], ['Demand', career.demandLevel], ['Salary (India)', career.salaryIndia], ['Salary (Global)', career.salaryGlobal], ['Growth', career.growthPotential]])}\n\n## Required skills\n\n${bullets(career.requiredSkills)}\n\n## Learning roadmap\n\n${career.roadmap.map((phase) => `### Phase ${phase.phase}: ${phase.title} (${phase.duration})\n\n${bullets(phase.items.map((item) => `**${item.name}** — ${item.description}`))}\n\nResources:\n\n${bullets(phase.resources)}\n\nProjects:\n\n${bullets(phase.projects)}`).join('\n\n')}\n\n## Reality check\n\n${career.realityCheck.honestNote}\n\n${blocksToMarkdown(roadmapDeepBlocks(career))}`,
  });
  for (const post of blogPosts) pages.push({
    path: `/blog/${post.slug}`, title: post.title, description: post.description, updated: post.date, group: 'blog',
    render: () => `Published: ${post.date} · ${post.readTime} · ${post.category}\n\n${post.content}\n\n${blocksToMarkdown(blogDeepBlocks(post))}`,
  });
  for (const country of COUNTRIES) for (const section of SECTIONS) {
    const path = `/${country.slug}${section.slug ? `/${section.slug}` : ''}`;
    const meta = getCountryMeta(section.key, country.name);
    pages.push({ path, title: meta.title, description: meta.description, group: 'countries', render: () => {
      let content = '';
      switch (section.key) {
        case 'overview': content = `## Tech hubs\n\n${bullets(country.techHubs)}\n\n## Local employers\n\n${bullets(country.topCompaniesLocal)}\n\n${table(['Currency', 'Timezone', 'Language'], [[country.currency, country.timezone, country.language]])}\n\n## Sections\n\n${bullets(SECTIONS.filter((item) => item.slug).map((item) => link(item.title, `/${country.slug}/${item.slug}`)))}`; break;
        case 'jobs': content = table(['Role', 'Demand', 'Growth', 'Skills'], ROLES.map((role) => [role.role, role.demand, role.growth, role.skills.join(', ')])); break;
        case 'salary': content = table(['Role', 'Junior', 'Mid', 'Senior'], ROLES.map((role) => { const band = getRoleSalaryBand(country, role); return [role.role, band.junior, band.mid, band.senior]; })); break;
        case 'roadmaps': content = bullets(ROADMAP_CARDS.map((card) => `${link(card.title, `/roadmaps/${card.slug}`)} — ${card.desc}`)); break;
        case 'skills': content = bullets(TOP_SKILLS_2027); break;
        case 'companies': content = bullets([...country.topCompaniesLocal, ...GLOBAL_COMPANIES.map((company) => company.name)]); break;
        case 'certifications': content = bullets(CERTIFICATIONS.map((cert) => `${link(cert.name, cert.url)} — ${cert.provider}: ${cert.why}`)); break;
        case 'interview': content = Object.entries(INTERVIEW_TOPICS).map(([name, topics]) => `## ${name}\n\n${bullets(topics)}`).join('\n\n'); break;
        case 'resources': content = bullets([link('Roadmap Library', '/roadmaps'), link('Blog', '/blog'), link('Career Quiz', '/quiz')]); break;
        case 'resume': break;
      }
      return `${country.marketNote}\n\n${content}\n\n${blocksToMarkdown(countryDeepBlocks(country, section.key))}`;
    } });
  }
  return [...new Map(pages.map((page) => [page.path, page])).values()];
}
export function renderMarkdownPage(page: MarkdownPage): string {
  return absoluteLinks(`# ${page.title}\n\n> ${page.description}\n\nCanonical: ${absoluteUrl(page.path)}\n${page.updated ? `Last updated: ${page.updated}\n` : ''}\n${page.render()}\n\n## Related\n\n${bullets([link('Home', '/'), link('Roadmap Library', '/roadmaps'), link('Blog', '/blog')])}\n`);
}
export function listMarkdownRoutes(pages: MarkdownPage[]) {
  return pages.map(({ path, title, description, group, updated }) => ({ path, title, description, group, updated, markdown: absoluteUrl(markdownPath(path)), canonical: absoluteUrl(path) }));
}
