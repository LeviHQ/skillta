import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Sparkles,
  Plus,
  X,
  CheckCircle2,
  XCircle,
  BookOpen,
  Zap,
  ArrowRight,
  Calendar,
  Trophy,
  AlertCircle,
  Award,
  Rocket,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  TARGET_ROLES,
  analyzeSkillGap,
  type GapResult,
} from "@/data/skillGapData";
import { useAuth } from "@/contexts/AuthContext";
import SignInModal from "@/components/SignInModal";
import AdsterraNativeBanner from "@/components/AdsterraNativeBanner";
import SEOHead from "@/components/SEOHead";

const DAILY_LIMIT = 3;

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}
function usageKey(uid: string) {
  return `skillgap_usage_${uid}_${todayKey()}`;
}
function getTodayUsage(uid: string): number {
  try {
    return parseInt(localStorage.getItem(usageKey(uid)) || "0", 10) || 0;
  } catch {
    return 0;
  }
}
function incrementUsage(uid: string) {
  try {
    localStorage.setItem(usageKey(uid), String(getTodayUsage(uid) + 1));
  } catch {
    /* ignore */
  }
}

const SUGGESTED_SKILLS = [
  "HTML", "CSS", "JavaScript", "TypeScript", "React", "Node.js", "Python",
  "SQL", "MongoDB", "Git", "Docker", "AWS", "Tailwind CSS", "Next.js",
  "Express.js", "REST APIs", "Pandas", "NumPy", "Machine Learning",
  "Linux", "Figma", "Java", "C++", "Kubernetes", "TensorFlow",
];

export default function SkillGapAnalyzer() {
  const { user } = useAuth();
  const [showSignIn, setShowSignIn] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [roleId, setRoleId] = useState<string>("");
  const [result, setResult] = useState<GapResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [attemptsToday, setAttemptsToday] = useState(0);

  useEffect(() => {
    if (user) setAttemptsToday(getTodayUsage(user.uid));
  }, [user]);

  const remaining = user ? Math.max(0, DAILY_LIMIT - attemptsToday) : DAILY_LIMIT;
  const limitReached = user && remaining === 0;

  const clearAll = () => {
    setSkills([]);
    setSkillInput("");
    setRoleId("");
    setResult(null);
    setError(null);
  };

  const addSkill = (raw: string) => {
    const cleaned = raw.trim();
    if (!cleaned) return;
    if (skills.some((s) => s.toLowerCase() === cleaned.toLowerCase())) return;
    setSkills((prev) => [...prev, cleaned]);
    setSkillInput("");
  };

  const removeSkill = (s: string) => {
    setSkills((prev) => prev.filter((x) => x !== s));
  };

  const handleAnalyze = () => {
    setError(null);
    if (!user) {
      setShowSignIn(true);
      return;
    }
    if (limitReached) {
      setError("Daily limit reached — you've used all 3 free analyses today. Your quota resets tomorrow at 00:00 local time.");
      return;
    }
    if (skills.length < 2) {
      setError("Please add at least 2 of your current skills to get a meaningful analysis.");
      return;
    }
    if (!roleId) {
      setError("Please pick your target role.");
      return;
    }

    setAnalyzing(true);
    // small artificial delay for smooth animation, purely presentational
    setTimeout(() => {
      const res = analyzeSkillGap(skills, roleId);
      if (!res) {
        setError("Something went wrong — please try a different role.");
        setAnalyzing(false);
        return;
      }
      setResult(res);
      incrementUsage(user.uid);
      setAttemptsToday((n) => n + 1);
      setAnalyzing(false);
      setTimeout(() => {
        document.getElementById("skillgap-results")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }, 500);
  };

  const handleSignInClose = () => {
    setShowSignIn(false);
  };

  const unusedSuggestions = useMemo(
    () => SUGGESTED_SKILLS.filter((s) => !skills.some((x) => x.toLowerCase() === s.toLowerCase())),
    [skills]
  );

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Skill Gap Analyzer — Compare Your Skills vs Any Tech Role | SkillTa"
        description="Free algorithm-driven skill gap analyzer. Enter your current skills and target role — get missing skills, match %, and a weekly study roadmap. 3 free analyses/day."
        path="/skill-gap-analyzer"
        keywords="skill gap analyzer, tech skill assessment, learning roadmap, missing skills, career gap analysis"
      />

      {/* HERO */}
      <section className="pt-16 pb-10 border-b border-border bg-gradient-to-b from-accent/5 to-background">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/30 mb-5">
            <Target className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs font-semibold text-accent uppercase tracking-wider">Sign-in required · 3 free/day</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="text-3xl md:text-5xl font-bold mb-4">
            Skill Gap <span className="text-gradient">Analyzer</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Enter what you already know, pick your dream role — get a laser-focused list of missing skills and a week-by-week study plan built by our algorithm.
          </motion.p>
          {user && (
            <div className="mt-5 inline-flex items-center gap-2 text-xs text-muted-foreground">
              <Zap className="w-3.5 h-3.5 text-accent" />
              {remaining} of {DAILY_LIMIT} free analyses left today
            </div>
          )}
        </div>
      </section>

      <div className="container mx-auto px-6 max-w-4xl py-10">
        {/* INPUT CARD */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-card">
          {/* Current skills */}
          <label className="block">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Your current skills <span className="text-destructive">*</span></span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Add everything you know — languages, frameworks, tools, even soft skills.</p>

            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    addSkill(skillInput);
                  }
                }}
                placeholder="e.g. React, Python, SQL..."
                className="flex-1 px-4 py-2.5 rounded-lg bg-background border border-border focus:border-accent/60 focus:outline-none text-sm"
              />
              <button
                type="button"
                onClick={() => addSkill(skillInput)}
                className="px-4 py-2.5 rounded-lg bg-accent/15 text-accent border border-accent/30 hover:bg-accent/25 transition-colors text-sm font-semibold flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>

            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                <AnimatePresence>
                  {skills.map((s) => (
                    <motion.span
                      key={s}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/15 text-primary border border-primary/30"
                    >
                      {s}
                      <button onClick={() => removeSkill(s)} aria-label={`Remove ${s}`} className="hover:text-destructive transition-colors">
                        <X className="w-3 h-3" />
                      </button>
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Suggestions */}
            {unusedSuggestions.length > 0 && (
              <div>
                <p className="text-[11px] text-muted-foreground mb-2 uppercase tracking-wider">Quick add:</p>
                <div className="flex flex-wrap gap-1.5">
                  {unusedSuggestions.slice(0, 14).map((s) => (
                    <button
                      key={s}
                      onClick={() => addSkill(s)}
                      className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-secondary/60 hover:bg-accent/15 hover:text-accent text-muted-foreground border border-border transition-colors"
                    >
                      + {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </label>

          {/* Target role */}
          <label className="block mt-8">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold text-foreground">Target role <span className="text-destructive">*</span></span>
            </div>
            <select
              value={roleId}
              onChange={(e) => setRoleId(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-accent/60 focus:outline-none text-sm text-foreground"
            >
              <option value="">— Select the role you want to grow into —</option>
              {TARGET_ROLES.map((r) => (
                <option key={r.id} value={r.id}>{r.emoji} {r.name}</option>
              ))}
            </select>
          </label>

          {error && (
            <div className="mt-5 flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAnalyze}
              disabled={analyzing || !!limitReached}
              className="flex-1 py-3 rounded-xl bg-gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {analyzing ? (
                <>
                  <Sparkles className="w-4 h-4 animate-pulse" /> Analysing your gap...
                </>
              ) : (
                <>
                  <Target className="w-4 h-4" /> Analyse My Skill Gap
                </>
              )}
            </button>
            {(skills.length > 0 || roleId) && (
              <button onClick={clearAll} className="py-3 px-5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
                Clear all
              </button>
            )}
          </div>
        </motion.div>

        {/* AD */}
        <div className="my-10">
          <AdsterraNativeBanner />
        </div>

        {/* RESULTS */}
        {result && (
          <motion.div
            id="skillgap-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Match summary */}
            <div className="rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 via-background to-primary/5 p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <MatchRing value={result.matchPercent} />
                <div className="flex-1 text-center md:text-left">
                  <div className="text-xs uppercase tracking-widest text-accent font-semibold mb-1">
                    {result.role.emoji} {result.role.name}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    You're <span className="text-gradient">{result.matchLevel}</span>
                  </h2>
                  <p className="text-sm text-muted-foreground max-w-lg">
                    You already have {result.have.length} of {result.role.skills.length} required skills. Focus on the missing ones below — we've split them into a {result.weeklyPlan.length}-week plan.
                  </p>
                  {result.strengths.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5 justify-center md:justify-start">
                      {result.strengths.map((s) => (
                        <span key={s} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-success/15 text-success border border-success/30">
                          <Trophy className="w-2.5 h-2.5" /> {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Have / Missing / Extras */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-success/30 bg-success/5 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <h3 className="text-base font-bold text-foreground">You already have ({result.have.length})</h3>
                </div>
                {result.have.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No matching skills yet — start with the missing list.</p>
                ) : (
                  <ul className="space-y-1.5">
                    {result.have.map((s) => (
                      <li key={s.name} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 text-success flex-shrink-0" />
                        <span className="text-foreground">{s.name}</span>
                        <span className="text-[10px] text-muted-foreground uppercase">· {s.priority}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <XCircle className="w-5 h-5 text-destructive" />
                  <h3 className="text-base font-bold text-foreground">Missing ({result.missing.length})</h3>
                </div>
                {result.missing.length === 0 ? (
                  <p className="text-sm text-success">🎉 You have every required skill — time to build & apply!</p>
                ) : (
                  <ul className="space-y-1.5">
                    {result.missing.map((s) => (
                      <li key={s.name} className="flex items-center gap-2 text-sm">
                        <XCircle className="w-3.5 h-3.5 text-destructive flex-shrink-0" />
                        <span className="text-foreground">{s.name}</span>
                        <span className={`text-[10px] uppercase ${s.priority === "core" ? "text-destructive" : s.priority === "important" ? "text-warning" : "text-muted-foreground"}`}>
                          · {s.priority}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {result.extras.length > 0 && (
              <div className="rounded-2xl border border-info/30 bg-info/5 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-5 h-5 text-info" />
                  <h3 className="text-base font-bold text-foreground">Bonus skills you also have</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-2">Not required for this role, but great transferable assets:</p>
                <div className="flex flex-wrap gap-1.5">
                  {result.extras.map((s) => (
                    <span key={s} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-info/15 text-info border border-info/30">{s}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Weekly Roadmap */}
            {result.weeklyPlan.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">Your Personalised Study Roadmap</h3>
                </div>

                <div className="space-y-4">
                  {result.weeklyPlan.map((wk, i) => (
                    <motion.div
                      key={wk.week}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="relative pl-10 border-l-2 border-primary/30"
                    >
                      <div className="absolute -left-3.5 top-0 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                        W{wk.week}
                      </div>
                      <div className="rounded-xl border border-border bg-background p-4">
                        <div className="text-[11px] uppercase tracking-widest text-primary/80 font-semibold mb-1">Week {wk.week} · {wk.focus}</div>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {wk.skills.map((s) => (
                            <span key={s.name} className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-primary/10 text-primary border border-primary/25">
                              {s.name}
                            </span>
                          ))}
                        </div>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {wk.skills.map((s) => (
                            <li key={s.name} className="flex items-start gap-2">
                              <BookOpen className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-accent" />
                              <span><span className="text-foreground font-medium">{s.name}:</span> {s.resource}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-3 flex items-start gap-2 p-2.5 rounded-lg bg-accent/10 border border-accent/20 text-xs text-foreground">
                          <Rocket className="w-3.5 h-3.5 mt-0.5 text-accent flex-shrink-0" />
                          <span><span className="font-semibold">Micro-project:</span> {wk.microProject}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Next steps */}
            <div className="rounded-2xl border border-border bg-gradient-card p-6">
              <h3 className="text-lg font-bold text-foreground mb-3">Take the next step</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <Link to={`/roadmaps/${result.role.id}`} className="flex items-center justify-between gap-2 p-3 rounded-xl border border-border hover:border-primary/40 transition-colors group">
                  <span className="text-sm font-medium text-foreground">See the full {result.role.name} roadmap</span>
                  <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/resume-reviewer" className="flex items-center justify-between gap-2 p-3 rounded-xl border border-border hover:border-primary/40 transition-colors group">
                  <span className="text-sm font-medium text-foreground">Get an AI resume review</span>
                  <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/salary-predictor" className="flex items-center justify-between gap-2 p-3 rounded-xl border border-border hover:border-primary/40 transition-colors group">
                  <span className="text-sm font-medium text-foreground">Predict your target salary</span>
                  <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/compare" className="flex items-center justify-between gap-2 p-3 rounded-xl border border-border hover:border-primary/40 transition-colors group">
                  <span className="text-sm font-medium text-foreground">Compare with another role</span>
                  <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <SignInModal
        open={showSignIn}
        onClose={handleSignInClose}
        message="Sign in with Google to run your free skill-gap analysis (3 free per day)."
      />
    </div>
  );
}

function MatchRing({ value }: { value: number }) {
  const size = 140;
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const dash = (value / 100) * circ;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="hsl(var(--border))" strokeWidth={stroke} fill="none" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="hsl(var(--accent))"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDasharray: `0 ${circ}` }}
          animate={{ strokeDasharray: `${dash} ${circ - dash}` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-3xl font-bold text-foreground">{value}%</div>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Match</div>
      </div>
    </div>
  );
}
