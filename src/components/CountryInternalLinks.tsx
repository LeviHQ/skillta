import { Link } from "react-router-dom";
import { COUNTRIES, type Country } from "@/data/countries";
import { SECTIONS, type SectionKey } from "@/data/countrySections";
import { countryBlogs } from "@/data/countryBlogs";
import { Globe2, FileText, Sparkles } from "lucide-react";

// Country ecosystem slug -> countryBlogs `country` key (they differ for the UK).
const BLOG_KEY_BY_SLUG: Record<string, string> = {
  usa: "usa",
  "united-kingdom": "uk",
  canada: "canada",
  australia: "australia",
  germany: "germany",
  russia: "russia",
};

interface Props {
  country: Country;
  currentKey: SectionKey;
}

/**
 * Sitewide internal-linking block for the country ecosystem.
 * Every country/section page links out to the same section in other
 * countries, to that country's salary guides, and to the core tools —
 * removing orphan pages and spreading crawl equity across the ecosystem.
 */
export default function CountryInternalLinks({ country, currentKey }: Props) {
  const section = SECTIONS.find((s) => s.key === currentKey) ?? SECTIONS[0];
  const sectionPath = section.slug ? `/${section.slug}` : "";

  const otherCountries = COUNTRIES.filter((c) => c.slug !== country.slug).slice(0, 24);

  const blogKey = BLOG_KEY_BY_SLUG[country.slug];
  const relatedBlogs = blogKey
    ? countryBlogs.filter((p) => (p as { country?: string }).country === blogKey).slice(0, 10)
    : [];

  const tools = [
    { to: "/quiz", label: "Free AI Career Quiz" },
    { to: "/roadmaps", label: "50+ Career Roadmaps" },
    { to: "/compare", label: "Compare Tech Careers" },
    { to: "/salary-predictor", label: "Salary Predictor" },
    { to: "/resume-reviewer", label: "AI Resume Reviewer" },
    { to: "/skill-gap-analyzer", label: "Skill Gap Analyzer" },
    { to: "/blog", label: "Tech Career Blog" },
  ];

  return (
    <section className="mt-8 space-y-4" aria-label="Related pages">
      {/* Same section, other countries */}
      <div className="glass rounded-2xl border border-border p-5 md:p-6">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-1">
          <Globe2 className="w-4 h-4 text-primary" />
          {section.title} in other countries
        </h2>
        <p className="text-xs text-muted-foreground mb-4">
          Compare {section.title.toLowerCase()} for tech professionals across {COUNTRIES.length} markets.
        </p>
        <div className="flex flex-wrap gap-2">
          {otherCountries.map((c) => (
            <Link
              key={c.slug}
              to={`/${c.slug}${sectionPath}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-muted/40 border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
            >
              <span aria-hidden="true">{c.flag}</span>
              {c.name} {section.short}
            </Link>
          ))}
        </div>
      </div>

      {/* Country salary guides */}
      {relatedBlogs.length > 0 && (
        <div className="glass rounded-2xl border border-border p-5 md:p-6">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
            <FileText className="w-4 h-4 text-primary" />
            {country.name} salary guides 2026
          </h2>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
            {relatedBlogs.map((p) => (
              <li key={p.slug}>
                <Link
                  to={`/blog/${p.slug}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Core tools */}
      <div className="glass rounded-2xl border border-border p-5 md:p-6">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
          <Sparkles className="w-4 h-4 text-primary" />
          Free SkillTa tools for {country.name}
        </h2>
        <div className="flex flex-wrap gap-2">
          {tools.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              className="px-3 py-1.5 rounded-lg text-xs bg-primary/10 border border-primary/25 text-primary hover:bg-primary/20 transition-colors"
            >
              {t.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
