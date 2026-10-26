import type { Block } from '../deepContent/types';
import { getBaseUrl } from '../seo';

export const absoluteUrl = (path: string) => new URL(path, `${getBaseUrl()}/`).href;
export const markdownPath = (path: string) => path === '/' ? '/index.md' : `${path}.md`;
export const link = (label: string, path: string) => `[${label.replace(/[\[\]]/g, '\\$&')}](${absoluteUrl(path)})`;
export const bullets = (items: string[]) => items.map((item) => `- ${item}`).join('\n');
export function table(head: string[], rows: string[][]): string {
  const row = (cells: string[]) => `| ${cells.map((cell) => cell.replace(/\|/g, '\\|').replace(/\n/g, ' ')).join(' | ')} |`;
  return [row(head), row(head.map(() => '---')), ...rows.map(row)].join('\n');
}
export function blocksToMarkdown(blocks: Block[]): string {
  return blocks.map((block) => {
    switch (block.t) {
      case 'h2': return `## ${block.text}`;
      case 'h3': return `### ${block.text}`;
      case 'p': return block.text;
      case 'ul': return bullets(block.items);
      case 'ol': return block.items.map((item, index) => `${index + 1}. ${item}`).join('\n');
      case 'table': return `${block.caption ? `${block.caption}\n\n` : ''}${table(block.head, block.rows)}`;
      case 'callout': return `> **${block.title}** ${block.text}`;
      case 'faq': return block.items.map((item) => `### ${item.q}\n\n${item.a}`).join('\n\n');
    }
  }).join('\n\n');
}
/** Change link destinations only; fenced code remains byte-for-byte intact. */
export function absoluteLinks(markdown: string): string {
  return markdown.split(/(^\s*```[^\n]*\n[\s\S]*?^\s*```\s*$)/gm).map((part, index) => {
    if (index % 2) return part;
    return part.replace(/\]\(([^\s)]+)\)/g, (_match, href: string) => `](${absoluteUrl(href)})`);
  }).join('');
}
