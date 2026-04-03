import { useState, useMemo } from "react";
import { careers } from "@/data/careers";
import SEOHead from "@/components/SEOHead";
import { PAGE_SEO, getBreadcrumbSchema } from "@/lib/seo";
import { ArrowLeftRight, ChevronDown, Check, X, BarChart3, Clock, TrendingUp, IndianRupee, Globe, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CompareCareers() {
  const [career1Id, setCareer1Id] = useState<string>("");
  const [career2Id, setCareer2Id] = useState<string>("");

  const allCareers = careers;
  const career1 = useMemo(() => allCareers.find(c => c.id === career1Id), [career1Id]);
  const career2 = useMemo(() => allCareers.find(c => c.id === career2Id), [career2Id]);

  const seo = PAGE_SEO.compare;
  const bothSelected = career1 && career2;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        path={seo.path}
        jsonLd={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Compare Careers", path: "/compare" },
        ])}
      />

      {/* Hero */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <ArrowLeftRight className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Career Comparison Tool</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Compare <span className="text-gradient">Tech Careers</span> Side by Side
            </h1>
            <p className="text-muted-foreground text-lg">
              Can't decide between two career paths? Compare salary, difficulty, demand, and more to make an informed decision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Selectors */}
      <section className="container mx-auto px-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <CareerSelector
            label="Career 1"
            value={career1Id}
            onChange={setCareer1Id}
            careers={allCareers}
            excludeId={career2Id}
          />
          <CareerSelector
            label="Career 2"
            value={career2Id}
            onChange={setCareer2Id}
            careers={allCareers}
            excludeId={career1Id}
          />
        </div>
      </section>

      {/* Comparison */}
      {bothSelected && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-6 pb-20"
        >
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Overview */}
            <CompareCard title="Overview">
              <CompareRow label="Role" val1={career1.title} val2={career2.title} icon={career1.icon} icon2={career2.icon} />
              <CompareRow label="Tagline" val1={career1.tagline} val2={career2.tagline} />
            </CompareCard>

            {/* Difficulty & Time */}
            <CompareCard title="Learning Curve" icon={<Clock className="w-5 h-5 text-primary" />}>
              <CompareRow label="Difficulty" val1={career1.learningDifficulty} val2={career2.learningDifficulty} highlight />
              <CompareRow label="Time to Job-Ready" val1={career1.estimatedTime} val2={career2.estimatedTime} />
              <CompareRow label="Reality Difficulty" val1={`${career1.realityCheck.difficulty}/5`} val2={`${career2.realityCheck.difficulty}/5`} highlight />
              <CompareRow label="Competition" val1={career1.realityCheck.competition} val2={career2.realityCheck.competition} />
              <CompareRow label="Entry Barrier" val1={career1.realityCheck.entryBarrier} val2={career2.realityCheck.entryBarrier} />
            </CompareCard>

            {/* Salary & Demand */}
            <CompareCard title="Salary & Market" icon={<TrendingUp className="w-5 h-5 text-primary" />}>
              <CompareRow label="Demand Level" val1={career1.demandLevel} val2={career2.demandLevel} highlight />
              <CompareRow label="Salary (India)" val1={career1.salaryIndia} val2={career2.salaryIndia} icon={<IndianRupee className="w-3 h-3" />} />
              <CompareRow label="Salary (Global)" val1={career1.salaryGlobal} val2={career2.salaryGlobal} icon={<Globe className="w-3 h-3" />} />
              <CompareRow label="Growth Potential" val1={career1.growthPotential} val2={career2.growthPotential} />
            </CompareCard>

            {/* Skills */}
            <CompareCard title="Required Skills" icon={<BarChart3 className="w-5 h-5 text-primary" />}>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground mb-3">{career1.title}</p>
                  {career1.requiredSkills.map(skill => (
                    <div key={skill} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground mb-3">{career2.title}</p>
                  {career2.requiredSkills.map(skill => (
                    <div key={skill} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CompareCard>

            {/* Reality Check */}
            <CompareCard title="Honest Reality Check" icon={<AlertTriangle className="w-5 h-5 text-accent" />}>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-muted/30 border border-border">
                  <p className="text-sm font-semibold text-foreground mb-2">{career1.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{career1.realityCheck.honestNote}</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/30 border border-border">
                  <p className="text-sm font-semibold text-foreground mb-2">{career2.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{career2.realityCheck.honestNote}</p>
                </div>
              </div>
            </CompareCard>

            {/* Roadmap Phases */}
            <CompareCard title="Roadmap Overview">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-foreground">{career1.title} — {career1.roadmap.length} Phases</p>
                  {career1.roadmap.map(phase => (
                    <div key={phase.phase} className="flex items-start gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">{phase.phase}</span>
                      <div>
                        <p className="text-sm font-medium text-foreground">{phase.title}</p>
                        <p className="text-xs text-muted-foreground">{phase.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-foreground">{career2.title} — {career2.roadmap.length} Phases</p>
                  {career2.roadmap.map(phase => (
                    <div key={phase.phase} className="flex items-start gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">{phase.phase}</span>
                      <div>
                        <p className="text-sm font-medium text-foreground">{phase.title}</p>
                        <p className="text-xs text-muted-foreground">{phase.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CompareCard>

            {/* CTAs */}
            <div className="grid grid-cols-2 gap-6">
              <Link
                to={`/roadmaps/${career1.id}`}
                className="block p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all text-center group"
              >
                <p className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{career1.icon} {career1.title}</p>
                <p className="text-sm text-muted-foreground mt-1">View Full Roadmap →</p>
              </Link>
              <Link
                to={`/roadmaps/${career2.id}`}
                className="block p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all text-center group"
              >
                <p className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{career2.icon} {career2.title}</p>
                <p className="text-sm text-muted-foreground mt-1">View Full Roadmap →</p>
              </Link>
            </div>
          </div>
        </motion.section>
      )}

      {!bothSelected && (
        <div className="text-center py-20 text-muted-foreground">
          <ArrowLeftRight className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="text-lg">Select two careers above to compare them side by side</p>
        </div>
      )}
    </div>
  );
}

function CareerSelector({ label, value, onChange, careers, excludeId }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  careers: { id: string; title: string; icon: string }[];
  excludeId: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-muted-foreground mb-2 block">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full appearance-none bg-card border border-border rounded-xl px-4 py-3.5 pr-10 text-foreground focus:outline-none focus:border-primary/50 transition-colors cursor-pointer"
        >
          <option value="">Select a career...</option>
          {careers.filter(c => c.id !== excludeId).map(c => (
            <option key={c.id} value={c.id}>{c.icon} {c.title}</option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
}

function CompareCard({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-5">
        {icon}
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function CompareRow({ label, val1, val2, icon, icon2, highlight }: {
  label: string;
  val1: string;
  val2: string;
  icon?: React.ReactNode;
  icon2?: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className={`grid grid-cols-[1fr_2fr_2fr] gap-4 py-3 border-b border-border/50 last:border-0 items-start ${highlight ? 'bg-muted/20 -mx-2 px-2 rounded-lg' : ''}`}>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="text-sm text-foreground flex items-center gap-1.5">
        {icon && <span className="text-base">{icon}</span>}
        {val1}
      </p>
      <p className="text-sm text-foreground flex items-center gap-1.5">
        {icon2 && <span className="text-base">{icon2}</span>}
        {val2}
      </p>
    </div>
  );
}
