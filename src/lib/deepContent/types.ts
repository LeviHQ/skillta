/**
 * Deep content engine — shared block model.
 *
 * One source of truth for long-form page content so that the React pages and
 * the build-time prerenderer (scripts/prerender.ts) emit *identical* content.
 * Everything here is pure and deterministic (no Math.random / Date.now) so the
 * prerendered HTML and the hydrated SPA always match.
 */

export type Block =
  | { t: "h2"; text: string }
  | { t: "h3"; text: string }
  | { t: "p"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "table"; caption?: string; head: string[]; rows: string[][] }
  | { t: "callout"; title: string; text: string }
  | { t: "faq"; items: { q: string; a: string }[] };

/* --------------------------------------------------------------- helpers */

/** Stable 32-bit string hash — used to vary phrasing per page. */
export function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

/** Deterministically pick one variant for a given seed. */
export function pick<T>(items: readonly T[], seed: string, offset = 0): T {
  return items[(hash(seed) + offset * 7919) % items.length];
}

/** Deterministically rotate an array so different pages lead with different items. */
export function rotate<T>(items: readonly T[], seed: string): T[] {
  if (items.length === 0) return [];
  const n = hash(seed) % items.length;
  return [...items.slice(n), ...items.slice(0, n)];
}

export const listSentence = (items: string[]): string => {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
};

/* ----------------------------------------------------------------- stats */

export function blockWords(blocks: Block[]): number {
  const count = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
  let total = 0;
  for (const b of blocks) {
    switch (b.t) {
      case "h2":
      case "h3":
      case "p":
        total += count(b.text);
        break;
      case "ul":
      case "ol":
        total += b.items.reduce((a, i) => a + count(i), 0);
        break;
      case "table":
        total += b.head.reduce((a, i) => a + count(i), 0);
        total += b.rows.reduce((a, r) => a + r.reduce((x, c) => x + count(c), 0), 0);
        break;
      case "callout":
        total += count(b.title) + count(b.text);
        break;
      case "faq":
        total += b.items.reduce((a, i) => a + count(i.q) + count(i.a), 0);
        break;
    }
  }
  return total;
}

/* ------------------------------------------------------- html (prerender) */

const esc = (s: string) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Inline markdown subset shared with the SPA renderer: **bold**, [text](href). */
export function inlineHtml(text: string): string {
  return esc(text)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, txt: string, href: string) => `<a href="${esc(href)}">${txt}</a>`)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

/** Render blocks to static HTML for the build-time prerenderer. */
export function blocksToHtml(blocks: Block[]): string {
  const out: string[] = [];
  for (const b of blocks) {
    switch (b.t) {
      case "h2":
        out.push(`<h2>${inlineHtml(b.text)}</h2>`);
        break;
      case "h3":
        out.push(`<h3>${inlineHtml(b.text)}</h3>`);
        break;
      case "p":
        out.push(`<p>${inlineHtml(b.text)}</p>`);
        break;
      case "ul":
        out.push(`<ul>${b.items.map((i) => `<li>${inlineHtml(i)}</li>`).join("")}</ul>`);
        break;
      case "ol":
        out.push(`<ol>${b.items.map((i) => `<li>${inlineHtml(i)}</li>`).join("")}</ol>`);
        break;
      case "table":
        out.push(
          `<table>${b.caption ? `<caption>${inlineHtml(b.caption)}</caption>` : ""}<thead><tr>${b.head
            .map((h) => `<th>${inlineHtml(h)}</th>`)
            .join("")}</tr></thead><tbody>${b.rows
            .map((r) => `<tr>${r.map((c) => `<td>${inlineHtml(c)}</td>`).join("")}</tr>`)
            .join("")}</tbody></table>`,
        );
        break;
      case "callout":
        out.push(`<aside><p><strong>${inlineHtml(b.title)}</strong> ${inlineHtml(b.text)}</p></aside>`);
        break;
      case "faq":
        out.push(
          b.items.map((i) => `<h3>${inlineHtml(i.q)}</h3><p>${inlineHtml(i.a)}</p>`).join(""),
        );
        break;
    }
  }
  return out.join("\n");
}
