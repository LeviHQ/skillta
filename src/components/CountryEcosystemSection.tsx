import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Globe2,
  Sparkles,
  Briefcase,
  Coins,
  Map as MapIcon,
  FileText,
  MessageSquare,
  Building2,
  Award,
  Wrench,
  BookOpen,
  Search,
  ArrowRight,
  Rocket,
  BadgeCheck,
} from "lucide-react";
import { COUNTRIES } from "@/data/countries";

const sections = [
  { Icon: Sparkles, label: "Overview", desc: "Market snapshot & ecosystem intro" },
  { Icon: Briefcase, label: "Top Tech Jobs", desc: "In-demand roles with skills & growth" },
  { Icon: Coins, label: "Salary Explorer", desc: "Junior · Mid · Senior in local currency" },
  { Icon: MapIcon, label: "Tech Roadmaps", desc: "Step-by-step localized career paths" },
  { Icon: FileText, label: "Resume Guide", desc: "Country-specific ATS format & rules" },
  { Icon: MessageSquare, label: "Interview Prep", desc: "Coding · System Design · Behavioral" },
  { Icon: Building2, label: "Top Companies", desc: "Local giants + global tech hiring" },
  { Icon: Award, label: "Certifications", desc: "AWS · GCP · Azure · Cisco · more" },
  { Icon: Wrench, label: "Skills in Demand", desc: "Top 20 skills for 2026 hiring" },
  { Icon: BookOpen, label: "Career Resources", desc: "Blogs · Videos · Communities" },
];

const featuredFlags = COUNTRIES.slice(0, 12);

export default function CountryEcosystemSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-background">
      {/* Ambient glass orbs */}
      <div className="pointer-events-none absolute top-10 -left-20 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 -right-20 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.08),transparent_60%)]" />

      <div className="container mx-auto px-4 md:px-6 relative">
        {/* Launch chip */}
        <motion.div
          className="flex justify-center mb-5"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/30 shadow-glow">
            <Rocket className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-primary">
              New Launch · Free Forever
            </span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Your Country's Entire{" "}
            <span className="text-gradient">Tech Ecosystem</span>
            <br className="hidden md:block" /> in One Place 🌍
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            50+ countries. Everything a tech aspirant needs — jobs, salaries,
            roadmaps, resume rules, interview questions, top companies,
            certifications and more — all localized, all free.
          </p>
        </motion.div>

        {/* Main glass card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative glass rounded-3xl border border-primary/20 p-6 md:p-10 shadow-2xl backdrop-blur-xl overflow-hidden"
        >
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 items-start">
            {/* Left — Feature explainer */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
                  <Globe2 className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-primary">
                    Country Ecosystem
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">
                    One tab · Every answer
                  </h3>
                </div>
              </div>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                Pick your country from the navbar and unlock a doc-style
                ecosystem — like reading a language's official documentation,
                but for your tech career.
              </p>

              {/* How to use — 3 steps */}
              <div className="space-y-3 mb-6">
                {[
                  {
                    n: "01",
                    Icon: Search,
                    title: "Open the Country tab in navbar",
                    desc: "Search 50+ countries — USA, UK, Germany, India, Japan and more.",
                  },
                  {
                    n: "02",
                    Icon: MapIcon,
                    title: "Pick your country",
                    desc: "Land on a beautiful doc-style page with 10 localized sections.",
                  },
                  {
                    n: "03",
                    Icon: Rocket,
                    title: "Read like docs · left-side nav",
                    desc: "Salaries in local currency, resume rules, interview loops — everything scoped to your country.",
                  },
                ].map((s, i) => (
                  <motion.div
                    key={s.n}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3 p-3 rounded-xl border border-border bg-background/40 hover:border-primary/40 transition-colors"
                  >
                    <span className="text-[10px] font-mono text-primary/80 pt-1 w-6">
                      {s.n}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                      <s.Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-foreground">
                        {s.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {s.desc}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/usa"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity shadow-glow"
                >
                  Explore USA Ecosystem <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/india"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-primary/30 text-sm font-semibold text-foreground hover:border-primary/60 hover:bg-primary/5 transition-colors"
                >
                  Explore India Ecosystem
                </Link>
              </div>

              <div className="flex items-center gap-2 mt-4 text-[11px] text-muted-foreground">
                <BadgeCheck className="w-3.5 h-3.5 text-success" />
                100% free · No sign-in · Updated for 2026
              </div>
            </div>

            {/* Right — What's inside grid */}
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-primary mb-3">
                What's inside every country page
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {sections.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    className="group p-3 rounded-xl glass border border-border hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <s.Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="text-xs font-semibold text-foreground">
                        {s.label}
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-snug">
                      {s.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Featured country flags row */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Featured countries · 50 live
              </div>
              <Link
                to="/usa"
                className="text-[11px] font-mono text-primary hover:underline"
              >
                Browse all →
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {featuredFlags.map((c) => (
                <Link
                  key={c.slug}
                  to={`/${c.slug}`}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group"
                >
                  <span className="text-base leading-none">{c.flag}</span>
                  <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                    {c.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
