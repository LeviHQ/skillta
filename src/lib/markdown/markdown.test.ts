import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { createMarkdownRegistry, renderMarkdownPage } from './registry';
import { discoveryFiles } from './discovery';
import { STATIC_PUBLIC_PATHS, SKIPPED_ROUTES, PUBLIC_PATTERNS } from './policy';
import { absoluteLinks } from './format';

const pages = createMarkdownRegistry();
describe('Public Markdown exports', () => {
  it('accounts for every declared app route with a renderer or explicit exclusion', () => {
    const routes = [...readFileSync('src/App.tsx', 'utf8').matchAll(/<Route path="([^"]+)"/g)].map((match) => match[1]);
    for (const path of routes) expect([...STATIC_PUBLIC_PATHS, ...PUBLIC_PATTERNS, ...Object.keys(SKIPPED_ROUTES)]).toContain(path);
    for (const path of STATIC_PUBLIC_PATHS) expect(pages.some((page) => page.path === path)).toBe(true);
    for (const pattern of PUBLIC_PATTERNS) {
      const regex = new RegExp(`^${pattern.replace(/:[^/]+/g, '[^/]+')}$`);
      expect(pages.some((page) => regex.test(page.path))).toBe(true);
    }
  });
  it('never exports personalized results or account history', () => {
    expect(pages.some((page) => ['/results', '/dashboard'].includes(page.path))).toBe(false);
    expect(pages.some((page) => page.path.startsWith('/admin'))).toBe(false);
    const files = discoveryFiles(pages, '2026-10-26');
    expect(JSON.parse(files.catalog).routes.some((route: { path: string }) => route.path === '/dashboard')).toBe(false);
  });
  it('renders real dynamic data and retains genuine publication dates', () => {
    const roadmap = pages.find((page) => page.path === '/roadmaps/frontend-developer');
    expect(roadmap && renderMarkdownPage(roadmap)).toContain('JavaScript Basics');
    const post = pages.find((page) => page.path === '/blog/agentic-ai-developer-roadmap-2026');
    expect(post && renderMarkdownPage(post)).toContain('Published: 2026-07-06');
    expect(post && renderMarkdownPage(post)).toContain('LangGraph');
    const country = pages.find((page) => page.path === '/india/salary-explorer');
    expect(country && renderMarkdownPage(country)).toContain('Software Engineer');
  });
  it('makes reading links absolute without rewriting code examples', () => {
    expect(absoluteLinks('[Home](/)\n```\n[Home](/)\n```')).toBe('[Home](https://www.skillta.tech/)\n```\n[Home](/)\n```');
  });
  it('keeps the full export below its declared budget', () => {
    expect(discoveryFiles(pages, '2026-10-26').full.length).toBeLessThan(500_000);
  });
});
