import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { headFor, roadmapRoutes, staticRoutes } from "./prerender";
import { createMarkdownRegistry, renderMarkdownPage } from "../src/lib/markdown/registry";
import { discoveryFiles } from "../src/lib/markdown/discovery";
import { getResearchFindings, getResearchStats } from "../src/lib/researchStats";

describe("Public research publication", () => {
  const pages = createMarkdownRegistry();
  const routes = staticRoutes();
  it("publishes each research page as HTML, Markdown, and an HTML sitemap entry", () => {
    const sitemap = readFileSync("public/sitemap.xml", "utf8");
    for (const path of ["/research", "/research/tech-careers", "/faq"]) {
      expect(routes.some((route) => route.path === path)).toBe(true);
      expect(pages.some((page) => page.path === path)).toBe(true);
      expect(sitemap).toContain(`<loc>https://www.skillta.tech${path}</loc>`);
    }
  });
  it("shares every report finding across crawler HTML, Markdown, and discovery", () => {
    const report = routes.find((route) => route.path === "/research/tech-careers");
    const markdown = pages.find((page) => page.path === "/research/tech-careers");
    expect(report).toBeDefined();
    expect(markdown).toBeDefined();
    for (const finding of getResearchFindings(getResearchStats())) {
      expect(report?.body.replace(/&#39;|&apos;/g, "'")).toContain(finding.text);
      expect(markdown ? renderMarkdownPage(markdown) : "").toContain(finding.text);
      expect(discoveryFiles(pages, "2099-01-01").llms).toContain(finding.text);
    }
    expect(report ? headFor(report) : "").toContain('"@type":"Dataset"');
    expect(report ? headFor(report) : "").toContain('"dateModified":"2026-10-24"');
  });
  it("keeps entity routes consistent with the cleaned catalog", () => {
    expect(roadmapRoutes()).toHaveLength(60);
    expect(pages.filter((page) => page.group === "roadmaps")).toHaveLength(60);
  });
  it("applies identical private-path restrictions to named AI crawlers", () => {
    const robots = discoveryFiles(pages, "2099-01-01").robots;
    expect(robots.match(/Allow: \/\n/g)).toHaveLength(1);
    for (const bot of ["*", "GPTBot", "ClaudeBot", "Google-Extended", "Applebot-Extended", "OAI-SearchBot", "PerplexityBot"]) expect(robots).toContain(`User-agent: ${bot}\n`);
    expect(robots).toContain("Disallow: /dashboard\n");
    expect(robots).toContain("Disallow: /results\n");
  });
  it("never substitutes generation time for the catalog source version", () => {
    const files = discoveryFiles(pages, "2099-01-01");
    const report = JSON.parse(files.catalog).routes.find((route: { path: string }) => route.path === "/research/tech-careers");
    expect(report.updated).toBe("2026-10-24");
  });
});