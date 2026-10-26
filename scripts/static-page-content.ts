import { readFileSync } from 'node:fs';
import ts from 'typescript';

/** Read authored JSX at build time, not rendered HTML or any account data. */
export function staticPageContent(file: string): string {
  const source = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const output: string[] = [];
  const tagName = (node: ts.JsxElement) => node.openingElement.tagName.getText(source);
  function inline(node: ts.Node): string {
    if (ts.isJsxText(node)) return node.text.replace(/\s+/g, ' ');
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
    if (ts.isJsxExpression(node)) return node.expression && (ts.isStringLiteral(node.expression) || ts.isNoSubstitutionTemplateLiteral(node.expression)) ? node.expression.text : '';
    if (ts.isJsxElement(node)) {
      const text = node.children.map(inline).join('');
      if (tagName(node) === 'strong') return `**${text.trim()}**`;
      const href = node.openingElement.attributes.properties.find((attribute) => ts.isJsxAttribute(attribute) && ['href', 'to'].includes(attribute.name.getText(source)));
      if (href && ts.isJsxAttribute(href) && href.initializer && ts.isStringLiteral(href.initializer)) return `[${text.trim()}](${href.initializer.text})`;
      return text;
    }
    return '';
  }
  function visit(node: ts.Node) {
    if (ts.isJsxElement(node)) {
      const tag = tagName(node);
      if (['nav', 'SEOHead', 'button'].includes(tag)) return;
      if (/^h[1-4]$/.test(tag) || ['p', 'li'].includes(tag)) {
        const text = node.children.map(inline).join('').replace(/\s+/g, ' ').trim();
        if (text) output.push(`${/^h[1-4]$/.test(tag) ? `${'#'.repeat(Number(tag[1]))} ` : tag === 'li' ? '- ' : ''}${text}`);
        return;
      }
    }
    // Static About cards are authored objects rather than literal JSX children.
    if (ts.isObjectLiteralExpression(node)) {
      const values = new Map(node.properties.filter(ts.isPropertyAssignment).map((property) => [property.name.getText(source), property.initializer]));
      const title = values.get('title');
      const text = values.get('text');
      if (title && text && ts.isStringLiteral(title) && ts.isStringLiteral(text)) output.push(`## ${title.text}\n\n${text.text}`);
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  return output.join('\n\n');
}
