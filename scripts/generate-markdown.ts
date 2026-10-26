import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import ts from 'typescript';
import { fileURLToPath } from 'node:url';
import { createMarkdownRegistry, renderMarkdownPage } from '../src/lib/markdown/registry';
import { markdownPath } from '../src/lib/markdown/format';
import { discoveryFiles } from '../src/lib/markdown/discovery';
import { staticPageContent } from './static-page-content';
import { bullets, table } from '../src/lib/markdown/format';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
/** Read literal plan data from its existing source; no second set of prices. */
function pricingContent() {
  const filename = resolve(root, 'src/components/PricingSection.tsx');
  const source = ts.createSourceFile(filename, readFileSync(filename, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const data = new Map<string, ts.Expression>();
  function visit(node: ts.Node) {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer) data.set(node.name.text, node.initializer);
    ts.forEachChild(node, visit);
  }
  visit(source);
  const strings = (key: string) => { const node = data.get(key); return node && ts.isArrayLiteralExpression(node) ? node.elements.filter(ts.isStringLiteral).map((item) => item.text) : []; };
  const plans = data.get('plans');
  const rows = plans && ts.isArrayLiteralExpression(plans) ? plans.elements.filter(ts.isObjectLiteralExpression).map((node) => {
    const values = new Map(node.properties.filter(ts.isPropertyAssignment).map((property) => [property.name.getText(source), ts.isStringLiteral(property.initializer) ? property.initializer.text : '']));
    return ['name', 'price', 'period', 'description'].map((key) => values.get(key) ?? '');
  }) : [];
  return `## Access plans\n\n${table(['Plan', 'Price (USD)', 'Duration', 'Description'], rows)}\n\n### Pro\n\n${bullets(strings('proFeatures'))}\n\n### Lifetime\n\n${bullets(strings('lifetimeFeatures'))}\n\nOne-time payment, no auto-renewal. Secure checkout by Dodo Payments.`;
}
function faqContent() {
  const filename = resolve(root, 'src/components/FAQSection.tsx');
  const source = ts.createSourceFile(filename, readFileSync(filename, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const blocks: string[] = [];
  function visit(node: ts.Node) {
    if (ts.isObjectLiteralExpression(node)) {
      const values = new Map(node.properties.filter(ts.isPropertyAssignment).map((property) => [property.name.getText(source), property.initializer]));
      const q = values.get('question'); const a = values.get('answer');
      if (q && a && ts.isStringLiteral(q) && ts.isStringLiteral(a)) blocks.push(`### ${q.text}\n\n${a.text}`);
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  return `## Frequently asked questions\n\n${blocks.join('\n\n')}`;
}
export function generateMarkdown(output = resolve(root, 'public')) {
  const content: Record<string, string> = { pricing: pricingContent(), faq: faqContent(), home: staticPageContent(resolve(root, 'src/components/HeroSection.tsx')) };
  for (const [path, filename] of Object.entries({ '/about': 'About', '/privacy': 'Privacy', '/terms': 'Terms', '/story': 'Story', '/contact': 'Contact' })) content[path] = staticPageContent(resolve(root, `src/pages/${filename}.tsx`));
  const pages = createMarkdownRegistry(content);
  const write = (path: string, text: string) => { const destination = resolve(output, `.${path}`); mkdirSync(dirname(destination), { recursive: true }); writeFileSync(destination, text); };
  for (const page of pages) write(markdownPath(page.path), renderMarkdownPage(page));
  const files = discoveryFiles(pages, new Date().toISOString().slice(0, 10));
  write('/llms.txt', files.llms); write('/llms-full.txt', files.full); write('/ai.txt', files.ai); write('/robots.txt', files.robots);
  write('/api/md/_catalog', files.catalog);
  write('/markdown-404.md', '# Not found\n\nNo public Markdown page exists at this address.\n');
  console.log(`[markdown] ${pages.length} public pages; full export ${files.full.length} characters; no private data queried.`);
  return pages;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) generateMarkdown(process.argv[2] ? resolve(process.argv[2]) : undefined);
