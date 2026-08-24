import { memo } from "react";
import { Link } from "react-router-dom";
import type { Block } from "@/lib/deepContent/types";

/**
 * Renders the shared deep-content block model. The build-time prerenderer
 * (scripts/prerender.ts) emits the exact same content as static HTML, so
 * crawlers and users see identical text.
 */

/** Inline markdown subset: **bold** and [text](href). */
function renderInline(text: string, keyPrefix: string) {
  const nodes: React.ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*)|(\[[^\]]+\]\([^)\s]+\))/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(
        <strong key={`${keyPrefix}-b-${i++}`} className="text-foreground font-semibold">
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      const m = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(token);
      if (m) {
        const [, label, href] = m;
        nodes.push(
          href.startsWith("/") ? (
            <Link key={`${keyPrefix}-l-${i++}`} to={href} className="text-primary hover:underline">
              {label}
            </Link>
          ) : (
            <a
              key={`${keyPrefix}-l-${i++}`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {label}
            </a>
          ),
        );
      } else {
        nodes.push(token);
      }
    }
    last = match.index + token.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function BlockView({ block, idx }: { block: Block; idx: number }) {
  const k = `b${idx}`;
  switch (block.t) {
    case "h2":
      return (
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-12 mb-4 scroll-mt-24">
          {renderInline(block.text, k)}
        </h2>
      );
    case "h3":
      return (
        <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">{renderInline(block.text, k)}</h3>
      );
    case "p":
      return <p className="text-muted-foreground leading-relaxed mb-4">{renderInline(block.text, k)}</p>;
    case "ul":
      return (
        <ul className="space-y-2 mb-6">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-muted-foreground leading-relaxed">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
              <span>{renderInline(item, `${k}-${i}`)}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="space-y-2 mb-6 list-decimal pl-5 marker:text-primary marker:font-semibold">
          {block.items.map((item, i) => (
            <li key={i} className="text-muted-foreground leading-relaxed pl-1">
              {renderInline(item, `${k}-${i}`)}
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="mb-8 overflow-x-auto rounded-xl border border-border/60">
          <table className="w-full text-sm min-w-[640px]">
            {block.caption && (
              <caption className="text-left text-xs text-muted-foreground px-4 py-3 border-b border-border/60">
                {block.caption}
              </caption>
            )}
            <thead className="bg-secondary/40">
              <tr>
                {block.head.map((h, i) => (
                  <th key={i} className="text-left font-semibold text-foreground px-4 py-3 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-t border-border/40">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3 text-muted-foreground align-top">
                      {renderInline(cell, `${k}-${ri}-${ci}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "callout":
      return (
        <aside className="mb-8 rounded-xl border border-primary/25 bg-primary/5 px-5 py-4">
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground font-semibold">{block.title} </strong>
            {renderInline(block.text, k)}
          </p>
        </aside>
      );
    case "faq":
      return (
        <div className="mb-8 space-y-5">
          {block.items.map((item, i) => (
            <div key={i} className="rounded-xl border border-border/60 bg-card/40 px-5 py-4">
              <h3 className="text-base font-semibold text-foreground mb-2">{item.q}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {renderInline(item.a, `${k}-${i}`)}
              </p>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

function DeepContentImpl({ blocks, className = "" }: { blocks: Block[]; className?: string }) {
  if (!blocks.length) return null;
  return (
    <section className={className}>
      {blocks.map((block, i) => (
        <BlockView key={i} block={block} idx={i} />
      ))}
    </section>
  );
}

export const DeepContent = memo(DeepContentImpl);
export default DeepContent;
