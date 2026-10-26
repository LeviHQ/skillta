import { SITE_CONFIG, getBaseUrl } from '../seo';
import { absoluteUrl, link, markdownPath } from './format';
import { PRIVATE_PREFIXES, SEARCH_BOTS } from './policy';
import { listMarkdownRoutes, renderMarkdownPage, type MarkdownPage } from './registry';

export function discoveryFiles(pages: MarkdownPage[], generated: string) {
  const core = pages.filter((page) => page.group === 'core');
  const legal = pages.filter((page) => page.group === 'legal');
  const guides = pages.filter((page) => page.group === 'roadmaps').slice(0, 12);
  const posts = pages.filter((page) => page.group === 'blog').sort((a, b) => (b.updated ?? '').localeCompare(a.updated ?? '')).slice(0, 20);
  const countries = pages.filter((page) => page.group === 'countries' && page.path.split('/').length === 2).slice(0, 12);
  const section = (name: string, items: MarkdownPage[]) => `## ${name}\n\n${items.map((page) => `- ${link(page.title, markdownPath(page.path))}: ${page.description}`).join('\n')}\n\n`;
  const llms = `# ${SITE_CONFIG.name}\n\n> ${SITE_CONFIG.description}\n\nContact: ${SITE_CONFIG.contactEmail}. Access plans are described on the homepage.\n\nKeep in sync with /robots.txt and /ai.txt.\n\n${section('Core pages', core)}${section('Career roadmaps', guides)}${section('Recent articles', posts)}${section('Country guides', countries)}## Machine-readable\n\n- ${link('Full content', '/llms-full.txt')}: Selected public pages within the size limit.\n- ${link('Markdown catalog', '/api/md/_catalog')}: Complete list of available public Markdown pages.\n- ${link('Sitemap', '/sitemap.xml')}: Canonical HTML URLs.\n- ${link('AI usage policy', '/ai.txt')}: Scope and attribution.\n\n${section('Optional', legal)}`;
  const ordered = [...core, ...guides, ...posts, ...countries, ...legal];
  let full = `# ${SITE_CONFIG.name} — full content\n\n> ${SITE_CONFIG.description}\n\nGenerated: ${generated}\n\nThis export is capped at 500,000 characters. The complete catalog is at ${absoluteUrl('/api/md/_catalog')}.\n`;
  let included = 0;
  for (const page of ordered) {
    const text = `\n---\n\n<!-- source: ${absoluteUrl(page.path)} -->\n\n${renderMarkdownPage(page)}`;
    if (full.length + text.length > 500_000) continue;
    full += text;
    included++;
  }
  full += `\nIncluded: ${included} selected pages out of ${pages.length} public pages. Other pages remain individually available through the catalog.\n`;
  const excluded = PRIVATE_PREFIXES.join(', ');
  const ai = `[identity]\nname: ${SITE_CONFIG.name}\nurl: ${getBaseUrl()}\ndescription: ${SITE_CONFIG.description}\ncontact: ${SITE_CONFIG.contactEmail}\n\n[permissions]\nPublic search indexing, citation, and attributed summaries of the deliberately published Markdown exports are allowed. Other reproduction remains subject to the Terms of Service.\n\n[restrictions]\nNo fabricated quotes, reviews or ratings. Do not claim this content as your own. No access to, publication of, or training on private user data. Do not bypass authentication, payment requirements or access controls.\n\n[attribution]\nCite ${SITE_CONFIG.name} and the canonical HTML URL shown in each export.\n\n[scope]\nincluded: Public pages enumerated at ${absoluteUrl('/api/md/_catalog')}\nexcluded: ${excluded}, /api/* (except the public Markdown catalog), /webhooks/*\n\n[contact]\nemail: ${SITE_CONFIG.contactEmail}\nLast updated: ${generated}\nKeep in sync with /robots.txt and /llms.txt.\n`;
  const rules = PRIVATE_PREFIXES.map((path) => `Disallow: ${path}\nDisallow: ${path}/`).join('\n');
  const robots = `# Keep in sync with /llms.txt and /ai.txt.\n# AI discovery: ${absoluteUrl('/llms.txt')}\n# AI policy: ${absoluteUrl('/ai.txt')}\nUser-agent: *\nAllow: /\n${rules}\nDisallow: /webhooks/\n\n${[...SEARCH_BOTS, 'Googlebot', 'Bingbot', 'Twitterbot', 'facebookexternalhit', 'LinkedInBot', 'Slurp', 'YandexBot', 'DuckDuckBot', 'Applebot', 'Pinterest', 'GPTBot'].map((bot) => `User-agent: ${bot}\nAllow: /\n${rules}\nDisallow: /webhooks/\n`).join('\n')}\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`;
  return { llms, full, ai, robots, catalog: JSON.stringify({ site: SITE_CONFIG.name, generated, count: pages.length, routes: listMarkdownRoutes(pages) }, null, 2) };
}
