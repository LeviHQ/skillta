import { Link, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getCountryBySlug } from "@/data/countries";
import {
  SECTIONS,
  SectionKey,
  ROLES,
  ROADMAP_CARDS,
  CERTIFICATIONS,
  GLOBAL_COMPANIES,
  INTERVIEW_TOPICS,
  TOP_SKILLS_2026,
  getRoleSalaryBand,
  formatLocalSalary,
} from "@/data/countrySections";
import CountryDocLayout from "@/components/CountryDocLayout";
import AdsterraResponsiveBanner from "@/components/AdsterraResponsiveBanner";
import AdsterraNativeBanner from "@/components/AdsterraNativeBanner";
import ResumeReviewerCTA from "@/components/ResumeReviewerCTA";
import SupportBanner from "@/components/SupportBanner";
import { getBaseUrl } from "@/lib/seo";
import { CheckCircle2, TrendingUp, Award, Building2, GraduationCap, FileText, MessageSquare, Rocket, Sparkles, ExternalLink } from "lucide-react";

export default function CountryPage() {
  const { country: countrySlug, section: sectionSlug } = useParams<{ country: string; section?: string }>();
  const country = getCountryBySlug(countrySlug || "");

  if (!country) return <Navigate to="/" replace />;

  const currentSection = SECTIONS.find((s) => (sectionSlug ? s.slug === sectionSlug : s.key === "overview"));
  if (!currentSection) return <Navigate to={`/${country.slug}`} replace />;

  const baseUrl = getBaseUrl();
  const path = sectionSlug ? `/${country.slug}/${sectionSlug}` : `/${country.slug}`;
  const title = `${country.name} Tech Career Guide 2026 — ${currentSection.title} | SkillTa`;
  const description = `${currentSection.title} for tech professionals in ${country.name}. Roles, salaries, roadmaps, resume tips, interview prep, top companies, certifications and more — updated for 2026.`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={`${country.name} tech jobs, ${country.name} software engineer salary, ${country.name} tech career, tech roadmap ${country.name}, ${currentSection.title} ${country.name} 2026`} />
        <link rel="canonical" href={`${baseUrl}${path}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${baseUrl}${path}`} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
            { "@type": "ListItem", position: 2, name: country.name, item: `${baseUrl}/${country.slug}` },
            ...(sectionSlug ? [{ "@type": "ListItem", position: 3, name: currentSection.title, item: `${baseUrl}${path}` }] : []),
          ],
        })}</script>
      </Helmet>

      <AdsterraResponsiveBanner />

      <CountryDocLayout country={country} currentKey={currentSection.key}>
        {currentSection.key === "overview" && <OverviewSection />}
        {currentSection.key === "jobs" && <JobsSection />}
        {currentSection.key === "salary" && <SalarySection />}
        {currentSection.key === "roadmaps" && <RoadmapsSection />}
        {currentSection.key === "resume" && <ResumeSection />}
        {currentSection.key === "interview" && <InterviewSection />}
        {currentSection.key === "companies" && <CompaniesSection />}
        {currentSection.key === "certifications" && <CertsSection />}
        {currentSection.key === "skills" && <SkillsSection />}
        {currentSection.key === "resources" && <ResourcesSection />}
      </CountryDocLayout>

      <div className="container mx-auto px-6">
        <SupportBanner />
      </div>
    </>
  );

  // ---------- Sections (inline for shared country access) ----------

  function H2({ children }: { children: React.ReactNode }) {
    return <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{children}</h2>;
  }
  function P({ children }: { children: React.ReactNode }) {
    return <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>;
  }
  function H3({ children }: { children: React.ReactNode }) {
    return <h3 className="text-lg font-semibold text-foreground mt-6 mb-2 flex items-center gap-2">{children}</h3>;
  }

  function OverviewSection() {
    return (
      <div>
        <div className="text-xs uppercase tracking-widest text-primary font-mono mb-2">Introduction</div>
        <H2>Everything you need to build a tech career in {country.name}</H2>
        <P>
          Welcome to your complete {country.name} tech ecosystem — built by SkillTa. This is a single, focused hub
          that walks you through every step of your tech journey inside {country.name}: which roles are hiring,
          how much they pay, what to learn, how to write a country-appropriate resume, and how to crack interviews at
          top local and global companies. No jumping between 12 tabs.
        </P>

        <div className="grid sm:grid-cols-2 gap-3 my-4">
          <Stat label="Currency" value={`${country.currency} (${country.currencySymbol})`} />
          <Stat label="Timezone" value={country.timezone} />
          <Stat label="Working Language" value={country.language} />
          <Stat label="Top Tech Hubs" value={country.techHubs.join(", ")} />
        </div>

        <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 my-4">
          <div className="flex items-start gap-2">
            <TrendingUp className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-foreground">Market Snapshot</div>
              <p className="text-sm text-muted-foreground mt-1">{country.marketNote}</p>
            </div>
          </div>
        </div>

        <H3><Sparkles className="w-4 h-4 text-primary" /> What this guide covers</H3>
        <div className="grid sm:grid-cols-2 gap-2 mb-4">
          {SECTIONS.filter((s) => s.key !== "overview").map((s) => (
            <Link
              key={s.key}
              to={s.slug ? `/${country.slug}/${s.slug}` : `/${country.slug}`}
              className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group"
            >
              <span className="text-sm text-foreground group-hover:text-primary">{s.title}</span>
              <span className="text-[10px] font-mono text-muted-foreground">→</span>
            </Link>
          ))}
        </div>

        <H3><Rocket className="w-4 h-4 text-primary" /> Related SkillTa tools</H3>
        <div className="grid sm:grid-cols-2 gap-2">
          <ToolLink to="/quiz" title="AI Career Quiz" desc="Find your best-fit tech role in 5 minutes." />
          <ToolLink to="/salary-predictor" title="Salary Predictor" desc="Real 2026 salary estimates for your role & city." />
          <ToolLink to="/resume-reviewer" title="AI Resume Reviewer" desc="ATS score + rewrites for your resume." />
          <ToolLink to="/skill-gap-analyzer" title="Skill Gap Analyzer" desc="See exactly what to learn for your target role." />
        </div>
      </div>
    );
  }

  function JobsSection() {
    return (
      <div>
        <div className="text-xs uppercase tracking-widest text-primary font-mono mb-2">02 · Top Tech Jobs</div>
        <H2>The most in-demand tech roles in {country.name}</H2>
        <P>
          These are the tech roles hiring aggressively across {country.techHubs.slice(0, 2).join(" and ")} and remote in
          2026 — with realistic salary bands, growth outlook and the exact skills you need to land them.
        </P>

        <div className="grid gap-3 mt-4">
          {ROLES.map((role) => {
            const bands = getRoleSalaryBand(country, role);
            return (
              <div key={role.role} className="p-4 rounded-xl border border-border bg-background/40 hover:border-primary/40 transition-colors">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="text-base font-semibold text-foreground">{role.role}</div>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-primary bg-primary/15 px-2 py-0.5 rounded">
                        Demand: {role.demand}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground bg-muted/40 px-2 py-0.5 rounded">
                        Growth: {role.growth}
                      </span>
                    </div>
                  </div>
                  <div className="text-right text-xs">
                    <div className="text-muted-foreground">Mid-level</div>
                    <div className="text-primary font-mono font-semibold">{bands.mid}</div>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {role.skills.map((s) => (
                    <span key={s} className="text-[11px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  function SalarySection() {
    return (
      <div>
        <div className="text-xs uppercase tracking-widest text-primary font-mono mb-2">03 · Salary Explorer</div>
        <H2>Tech salaries in {country.name} — Junior, Mid & Senior (2026)</H2>
        <P>
          Salaries below are gross yearly compensation in <b>{country.currency}</b>, calibrated to {country.name}'s market
          in 2026. Actual numbers vary by city ({country.techHubs.join(", ")}), company tier and remote status.
        </P>

        <div className="overflow-x-auto border border-border rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-secondary/40">
              <tr>
                <th className="text-left p-3 font-semibold">Role</th>
                <th className="text-right p-3 font-semibold">Junior</th>
                <th className="text-right p-3 font-semibold">Mid</th>
                <th className="text-right p-3 font-semibold">Senior</th>
              </tr>
            </thead>
            <tbody>
              {ROLES.map((r) => {
                const b = getRoleSalaryBand(country, r);
                return (
                  <tr key={r.role} className="border-t border-border">
                    <td className="p-3 font-medium text-foreground">{r.role}</td>
                    <td className="p-3 text-right font-mono text-muted-foreground">{b.junior}</td>
                    <td className="p-3 text-right font-mono text-primary font-semibold">{b.mid}</td>
                    <td className="p-3 text-right font-mono text-foreground">{b.senior}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-4 rounded-xl border border-primary/30 bg-primary/10">
          <div className="flex items-start gap-2">
            <TrendingUp className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <b className="text-foreground">Want an exact number for your role & city?</b>{" "}
              <Link to="/salary-predictor" className="text-primary underline underline-offset-2">Try Salary Predictor →</Link>
            </div>
          </div>
        </div>

        <H3>Highest-paying tech roles right now</H3>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>AI Engineer — {formatLocalSalary(country, 155000)} median</li>
          <li>ML Engineer — {formatLocalSalary(country, 150000)} median</li>
          <li>Cloud / DevOps Engineer — {formatLocalSalary(country, 135000)} median</li>
          <li>Cybersecurity Engineer — {formatLocalSalary(country, 130000)} median</li>
          <li>Product Manager — {formatLocalSalary(country, 140000)} median</li>
        </ul>
      </div>
    );
  }

  function RoadmapsSection() {
    return (
      <div>
        <div className="text-xs uppercase tracking-widest text-primary font-mono mb-2">04 · Tech Roadmaps</div>
        <H2>Step-by-step tech roadmaps for {country.name}</H2>
        <P>
          Every roadmap below is free, curated, and includes resources, project ideas and salary info. Follow one
          all the way through to become job-ready in {country.name}.
        </P>

        <div className="grid sm:grid-cols-2 gap-3">
          {ROADMAP_CARDS.map((r) => (
            <Link
              key={r.title}
              to={`/roadmaps/${r.slug}`}
              className="p-4 rounded-xl border border-border bg-background/40 hover:border-primary/50 hover:bg-primary/5 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div className="text-base font-semibold text-foreground group-hover:text-primary">{r.title}</div>
                <span className="text-[10px] font-mono text-muted-foreground">{r.level}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{r.desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/roadmaps" className="px-4 py-2 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-semibold">
            View all 50+ roadmaps →
          </Link>
          <Link to="/skill-gap-analyzer" className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:border-primary/40">
            Find your skill gap →
          </Link>
        </div>
      </div>
    );
  }

  function ResumeSection() {
    const isUS = country.slug === "usa" || country.slug === "canada";
    const isEU = ["united-kingdom", "germany", "france", "netherlands", "ireland", "spain", "italy", "portugal", "sweden", "denmark", "norway", "finland", "belgium", "austria", "switzerland", "poland", "czech-republic", "romania", "hungary", "greece", "ukraine"].includes(country.slug);
    return (
      <div>
        <div className="text-xs uppercase tracking-widest text-primary font-mono mb-2">05 · Resume Guide</div>
        <H2>How to write a resume that gets shortlisted in {country.name}</H2>
        <P>
          Recruiters in {country.name} scan resumes for {isUS ? "impact-first bullets with measurable outcomes" : isEU ? "structured, honest experience with EU-friendly formatting" : "clarity, English fluency and demonstrable projects"}.
          Here's exactly how to format yours in 2026.
        </P>

        <H3><FileText className="w-4 h-4 text-primary" /> {country.name}-specific format</H3>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 mb-4">
          <li>Length: <b>{isEU ? "2 pages (Europass-style OK)" : "1 page for &lt;5 yrs experience, 2 pages otherwise"}</b></li>
          <li>Photo: <b>{isEU && !["united-kingdom", "ireland"].includes(country.slug) ? "Optional (common in DACH & LATAM)" : "Never include a photo"}</b></li>
          <li>Address: City + country only (never full address for privacy)</li>
          <li>File format: <b>PDF</b>, named <code className="text-primary">FirstName_LastName_Role.pdf</code></li>
          <li>Font: Inter, Calibri or Arial · 10–11pt body</li>
        </ul>

        <H3>ATS optimization tips</H3>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 mb-4">
          <li>Match 60–80% of the job description keywords verbatim.</li>
          <li>No columns, tables, icons or graphics — ATS parsers break on them.</li>
          <li>Standard section headings: <i>Experience, Education, Skills, Projects</i>.</li>
          <li>Every bullet: <b>Action verb → Measurable result → Tool/tech</b>.</li>
          <li>Include a Skills section with the exact tech names (React, Kubernetes, PostgreSQL).</li>
        </ul>

        <H3>Top mistakes to avoid</H3>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 mb-4">
          <li>Writing "responsible for..." instead of outcomes.</li>
          <li>Listing every technology you've ever touched — recruiters test the ones you claim.</li>
          <li>Buzzword soup (synergy, ninja, rockstar).</li>
          <li>Uploading a Canva-style visual resume for corporate roles.</li>
        </ul>

        <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-primary mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-foreground">Get an instant ATS score</div>
              <p className="text-xs text-muted-foreground mb-3">Upload your resume and get an ATS score, keyword gaps and bullet rewrites — free (3/day).</p>
              <Link to="/resume-reviewer" className="inline-block px-4 py-2 rounded-lg bg-gradient-primary text-primary-foreground text-xs font-semibold">
                Try AI Resume Reviewer →
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <ResumeReviewerCTA />
        </div>
      </div>
    );
  }

  function InterviewSection() {
    return (
      <div>
        <div className="text-xs uppercase tracking-widest text-primary font-mono mb-2">06 · Interview Preparation</div>
        <H2>How tech interviews work in {country.name}</H2>
        <P>
          Most product companies in {country.name} run a 3–5 round loop: recruiter screen → technical (coding + fundamentals) →
          system design (for mid+) → behavioral → hiring manager. Below is exactly what to prepare for each.
        </P>

        <H3><MessageSquare className="w-4 h-4 text-primary" /> Coding round topics</H3>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 mb-4">
          {INTERVIEW_TOPICS.coding.map((t) => <li key={t}>{t}</li>)}
        </ul>

        <H3>System design questions</H3>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 mb-4">
          {INTERVIEW_TOPICS.systemDesign.map((t) => <li key={t}>{t}</li>)}
        </ul>

        <H3>Behavioral / STAR questions</H3>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 mb-4">
          {INTERVIEW_TOPICS.behavioral.map((t) => <li key={t}>{t}</li>)}
        </ul>

        <H3>HR round questions</H3>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 mb-4">
          {INTERVIEW_TOPICS.hr.map((t) => <li key={t}>{t}</li>)}
        </ul>

        <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
          <div className="flex items-start gap-2">
            <MessageSquare className="w-4 h-4 text-primary mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-foreground">Practice mock interviews</div>
              <p className="text-xs text-muted-foreground mb-3">SkillTa's interview lab has role-specific rounds — MCQs, coding writing and behavioral. Coming soon to your dashboard.</p>
              <Link to="/quiz" className="text-primary text-xs underline underline-offset-2">Start with the career quiz →</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function CompaniesSection() {
    return (
      <div>
        <div className="text-xs uppercase tracking-widest text-primary font-mono mb-2">07 · Top Companies</div>
        <H2>Top tech companies hiring in {country.name}</H2>
        <P>These are the companies where {country.name}-based engineers are landing offers in 2026 — global giants + local unicorns.</P>

        <H3><Building2 className="w-4 h-4 text-primary" /> Local & regional leaders</H3>
        <div className="grid sm:grid-cols-2 gap-2 mb-6">
          {country.topCompaniesLocal.map((c) => (
            <div key={c} className="p-3 rounded-lg border border-border bg-background/40">
              <div className="text-sm font-semibold text-foreground">{c}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">Based in / operating in {country.name}</div>
            </div>
          ))}
        </div>

        <H3>Global tech giants (with offices or remote hiring in {country.name})</H3>
        <div className="grid sm:grid-cols-2 gap-2">
          {GLOBAL_COMPANIES.map((c) => (
            <a
              key={c.name}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-lg border border-border bg-background/40 hover:border-primary/50 transition-colors group"
            >
              <span className="text-sm font-semibold text-foreground group-hover:text-primary">{c.name}</span>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
            </a>
          ))}
        </div>
      </div>
    );
  }

  function CertsSection() {
    return (
      <div>
        <div className="text-xs uppercase tracking-widest text-primary font-mono mb-2">08 · Certifications</div>
        <H2>Certifications that actually get you hired in {country.name}</H2>
        <P>Not every certification is worth your time. These are the ones {country.name} recruiters and hiring managers actively look for in 2026.</P>

        <div className="grid gap-3 mt-4">
          {CERTIFICATIONS.map((c) => (
            <a
              key={c.name}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-border bg-background/40 hover:border-primary/50 transition-colors group block"
            >
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-primary flex-shrink-0" />
                <div className="text-sm font-semibold text-foreground group-hover:text-primary">{c.name}</div>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                <b>Provider:</b> {c.provider} · {c.why}
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }

  function SkillsSection() {
    return (
      <div>
        <div className="text-xs uppercase tracking-widest text-primary font-mono mb-2">09 · Skills in Demand</div>
        <H2>Top 20 tech skills in demand in {country.name} (2026)</H2>
        <P>Ranked by job posting frequency across {country.techHubs[0]} and remote listings.</P>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
          {TOP_SKILLS_2026.map((s, i) => (
            <div key={s} className="flex items-center gap-2 p-3 rounded-lg border border-border bg-background/40">
              <span className="text-xs font-mono text-primary w-6">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-sm text-foreground">{s}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/skill-gap-analyzer" className="px-4 py-2 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-semibold">
            Find your skill gap →
          </Link>
          <Link to="/quiz" className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:border-primary/40">
            Take career quiz →
          </Link>
        </div>
      </div>
    );
  }

  function ResourcesSection() {
    return (
      <div>
        <div className="text-xs uppercase tracking-widest text-primary font-mono mb-2">10 · Career Resources</div>
        <H2>Best career resources for {country.name}-based tech folks</H2>
        <P>The blogs, videos, communities and official portals we recommend for {country.name} tech professionals.</P>

        <H3><GraduationCap className="w-4 h-4 text-primary" /> Learning platforms</H3>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 mb-4">
          <li><a href="https://www.freecodecamp.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">freeCodeCamp</a> — full-stack, DS, ML tracks for free</li>
          <li><a href="https://www.theodinproject.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">The Odin Project</a> — practical full-stack path</li>
          <li><a href="https://roadmap.sh" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">roadmap.sh</a> — visual role roadmaps</li>
          <li><a href="https://www.coursera.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Coursera</a> — Google, IBM, Meta certificates</li>
          <li><a href="https://www.udemy.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Udemy</a> — affordable role-specific courses</li>
        </ul>

        <H3>Communities</H3>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 mb-4">
          <li><a href="https://dev.to" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">DEV Community</a></li>
          <li><a href="https://www.reddit.com/r/cscareerquestions" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">r/cscareerquestions</a></li>
          <li><a href="https://www.reddit.com/r/ExperiencedDevs" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">r/ExperiencedDevs</a></li>
          <li><a href="https://leetcode.com/discuss" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">LeetCode Discuss</a></li>
        </ul>

        <H3>Video channels</H3>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 mb-4">
          <li>Fireship, ThePrimeagen, Theo, Web Dev Simplified</li>
          <li>Gaurav Sen (system design), NeetCode (DSA)</li>
        </ul>

        <H3>Official portals</H3>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 mb-4">
          <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub</a> — build a public portfolio</li>
          <li><a href="https://stackoverflow.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Stack Overflow</a></li>
          <li><a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">MDN Web Docs</a></li>
        </ul>

        <H3>SkillTa tools built for you</H3>
        <div className="grid sm:grid-cols-2 gap-2">
          <ToolLink to="/blog" title="SkillTa Blog" desc="60+ country & role-specific salary guides." />
          <ToolLink to="/compare" title="Compare Careers" desc="Side-by-side comparison of any 2 tech roles." />
          <ToolLink to="/resume-reviewer" title="AI Resume Reviewer" desc="Free ATS score & rewrites." />
          <ToolLink to="/skill-gap-analyzer" title="Skill Gap Analyzer" desc="Personalized 8-week learning plan." />
        </div>
      </div>
    );
  }

  function Stat({ label, value }: { label: string; value: string }) {
    return (
      <div className="p-3 rounded-lg border border-border bg-background/40">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">{label}</div>
        <div className="text-sm font-semibold text-foreground mt-0.5">{value}</div>
      </div>
    );
  }

  function ToolLink({ to, title, desc }: { to: string; title: string; desc: string }) {
    return (
      <Link to={to} className="p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group block">
        <div className="text-sm font-semibold text-foreground group-hover:text-primary flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> {title}
        </div>
        <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
      </Link>
    );
  }
}
