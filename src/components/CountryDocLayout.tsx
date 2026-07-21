import { Link } from "react-router-dom";
import { Country } from "@/data/countries";
import { SECTIONS, SectionKey } from "@/data/countrySections";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  country: Country;
  currentKey: SectionKey;
  children: React.ReactNode;
}

function sectionUrl(country: Country, slug: string) {
  return slug ? `/${country.slug}/${slug}` : `/${country.slug}`;
}

export default function CountryDocLayout({ country, currentKey, children }: Props) {
  const idx = SECTIONS.findIndex((s) => s.key === currentKey);
  const prev = idx > 0 ? SECTIONS[idx - 1] : null;
  const next = idx < SECTIONS.length - 1 ? SECTIONS[idx + 1] : null;
  const current = SECTIONS[idx];

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      {/* Country header */}
      <div className="glass rounded-2xl border border-border p-5 mb-6 flex items-center gap-4">
        <div className="text-5xl">{country.flag}</div>
        <div className="flex-1 min-w-0">
          <div className="text-xs uppercase tracking-widest text-primary font-mono">Country Ecosystem</div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground truncate">
            {country.name} <span className="text-muted-foreground font-normal">— {current.title}</span>
          </h1>
          <div className="text-xs text-muted-foreground truncate">
            {country.techHubs.slice(0, 3).join(" · ")} · {country.currency}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-[240px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="md:sticky md:top-24 md:self-start">
          <nav className="glass rounded-xl border border-border p-3">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono px-2 pb-2 border-b border-border mb-2">
              {country.name} Docs
            </div>
            <ul className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
              {SECTIONS.map((s, i) => {
                const active = s.key === currentKey;
                return (
                  <li key={s.key} className="flex-shrink-0">
                    <Link
                      to={sectionUrl(country, s.slug)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors whitespace-nowrap ${
                        active
                          ? "bg-primary/15 text-primary font-semibold border border-primary/30"
                          : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
                      }`}
                    >
                      <span className="text-[10px] font-mono opacity-60 w-4">{String(i + 1).padStart(2, "0")}</span>
                      <span>{s.short}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Content */}
        <article className="min-w-0">
          <div className="glass rounded-2xl border border-border p-6 md:p-8">
            {children}
          </div>

          {/* Prev / Next */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            {prev ? (
              <Link
                to={sectionUrl(country, prev.slug)}
                className="flex-1 glass rounded-xl border border-border p-4 hover:border-primary/50 transition-colors group"
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ChevronLeft className="w-3.5 h-3.5" /> Previous
                </div>
                <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mt-1">
                  {prev.title}
                </div>
              </Link>
            ) : <div className="flex-1" />}
            {next ? (
              <Link
                to={sectionUrl(country, next.slug)}
                className="flex-1 glass rounded-xl border border-border p-4 hover:border-primary/50 transition-colors group text-right"
              >
                <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground">
                  Next <ChevronRight className="w-3.5 h-3.5" />
                </div>
                <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mt-1">
                  {next.title}
                </div>
              </Link>
            ) : <div className="flex-1" />}
          </div>
        </article>
      </div>
    </div>
  );
}
