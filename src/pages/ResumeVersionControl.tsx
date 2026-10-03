import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  GitCommitHorizontal, GitBranch, Upload, Download, Trash2, Copy, Check, FileText,
  Loader2, TrendingUp, TrendingDown, Minus, Lock, History, ShieldCheck, Target, X,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { usePlan } from "@/contexts/PlanContext";
import SignInModal from "@/components/SignInModal";
import SEOHead from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import { getBreadcrumbSchema, getFAQSchema, getBaseUrl } from "@/lib/seo";

interface ResumeVersion {
  id: string;
  version_number: number;
  title: string;
  target_role: string;
  ats_score: number;
  jd_summary: string | null;
  notes: string | null;
  file_name: string;
  file_size: number;
  mime_type: string;
  created_at: string;
}

const MAX_BYTES = 5 * 1024 * 1024;
const ACCEPTED = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "text/plain",
];

const FAQS = [
  { question: "What is Resume Version Control?", answer: "It is a commit-style history of your resume. Every time you improve your resume, you save a new version with its ATS score, target role and an optional job description summary, so you can track progress over time." },
  { question: "Can I download older resume versions?", answer: "Yes. Every uploaded file is stored privately and can be downloaded again at any time from your version history." },
  { question: "Which file types are supported?", answer: "PDF, DOCX, DOC and TXT files up to 5 MB each." },
  { question: "Who can see my resumes?", answer: "Only you. Files are stored in private storage and download links are generated on demand for your account only." },
];

async function fileToBase64(file: File): Promise<string> {
  const buf = new Uint8Array(await file.arrayBuffer());
  let bin = "";
  const chunk = 0x8000;
  for (let i = 0; i < buf.length; i += chunk) bin += String.fromCharCode(...buf.subarray(i, i + chunk));
  return btoa(bin);
}

function formatSize(n: number) {
  return n < 1024 * 1024 ? `${(n / 1024).toFixed(0)} KB` : `${(n / 1024 / 1024).toFixed(1)} MB`;
}

function timeAgo(iso: string) {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} minute${m > 1 ? "s" : ""} ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hour${h > 1 ? "s" : ""} ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d} day${d > 1 ? "s" : ""} ago`;
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function scoreTone(score: number) {
  if (score >= 80) return "text-success border-success/40 bg-success/10";
  if (score >= 60) return "text-warning border-warning/40 bg-warning/10";
  return "text-destructive border-destructive/40 bg-destructive/10";
}

async function readServerError(err: unknown): Promise<string | null> {
  const ctx = (err as { context?: { text?: () => Promise<string> } })?.context;
  try {
    const text = ctx?.text ? await ctx.text() : null;
    if (text) {
      const parsed = JSON.parse(text);
      return parsed.message || parsed.error || null;
    }
  } catch { /* ignore */ }
  return null;
}

export default function ResumeVersionControl() {
  const { user } = useAuth();
  const { plan } = usePlan();
  const [showSignIn, setShowSignIn] = useState(false);
  const [versions, setVersions] = useState<ResumeVersion[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<ResumeVersion | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [atsScore, setAtsScore] = useState("");
  const [jdSummary, setJdSummary] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const call = useCallback(async (body: Record<string, unknown>) => {
    if (!user) throw new Error("Not signed in");
    const token = await user.getIdToken();
    const { data, error } = await supabase.functions.invoke("firebase-data", {
      body,
      headers: { Authorization: `Bearer ${token}` },
    });
    if (error) throw new Error((await readServerError(error)) || "Something went wrong. Please try again.");
    return data;
  }, [user]);

  const loadVersions = useCallback(async () => {
    if (!user) return;
    setLoadingList(true);
    try {
      const data = await call({ action: "listResumeVersions" });
      setVersions(data?.versions ?? []);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setLoadingList(false);
    }
  }, [user, call]);

  useEffect(() => {
    if (user) loadVersions();
    else setVersions([]);
  }, [user, loadVersions]);

  const grouped = useMemo(() => {
    const map = new Map<string, ResumeVersion[]>();
    versions.forEach((v) => {
      const key = new Date(v.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
      map.set(key, [...(map.get(key) ?? []), v]);
    });
    return Array.from(map.entries());
  }, [versions]);

  const stats = useMemo(() => {
    if (!versions.length) return null;
    const sorted = [...versions].sort((a, b) => a.version_number - b.version_number);
    const first = sorted[0].ats_score;
    const latest = sorted[sorted.length - 1].ats_score;
    const best = Math.max(...sorted.map((v) => v.ats_score));
    return { total: versions.length, latest, best, growth: latest - first };
  }, [versions]);

  const prevScore = useCallback((v: ResumeVersion) => {
    const older = versions
      .filter((x) => x.version_number < v.version_number)
      .sort((a, b) => b.version_number - a.version_number)[0];
    return older ? v.ats_score - older.ats_score : null;
  }, [versions]);

  const pickFile = (f: File | null) => {
    setFormError(null);
    if (!f) return;
    if (!ACCEPTED.includes(f.type)) return setFormError("Please upload a PDF, DOCX, DOC or TXT file.");
    if (f.size > MAX_BYTES) return setFormError("File must be under 5 MB.");
    setFile(f);
  };

  const resetForm = () => {
    setFile(null); setTitle(""); setTargetRole(""); setAtsScore(""); setJdSummary(""); setFormError(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!user) return setShowSignIn(true);
    if (!plan) return;
    const score = Number(atsScore);
    if (!file) return setFormError("Please choose your resume file.");
    if (!targetRole.trim()) return setFormError("Please enter the targeted role.");
    if (atsScore === "" || !Number.isInteger(score) || score < 0 || score > 100) return setFormError("ATS score must be a whole number from 0 to 100.");
    setSaving(true);
    try {
      const fileBase64 = await fileToBase64(file);
      const data = await call({
        action: "createResumeVersion",
        title: title.trim(),
        targetRole: targetRole.trim(),
        atsScore: score,
        jdSummary: jdSummary.trim(),
        fileName: file.name,
        mimeType: file.type,
        fileBase64,
      });
      if (data?.version) setVersions((prev) => [data.version, ...prev]);
      toast.success(`Version v${data?.version?.version_number ?? ""} saved`);
      resetForm();
    } catch (err) {
      setFormError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = async (v: ResumeVersion) => {
    setBusyId(v.id);
    try {
      const data = await call({ action: "getResumeVersionUrl", id: v.id });
      if (data?.url) window.location.assign(data.url);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (v: ResumeVersion) => {
    setBusyId(v.id);
    try {
      await call({ action: "deleteResumeVersion", id: v.id });
      setVersions((prev) => prev.filter((x) => x.id !== v.id));
      toast.success(`v${v.version_number} deleted`);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusyId(null);
      setConfirmDelete(null);
    }
  };

  const copyId = async (v: ResumeVersion) => {
    await navigator.clipboard?.writeText(v.id.slice(0, 7));
    setCopiedId(v.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const inputCls = "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40";

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Resume Version Control — Track Every Resume & ATS Score | SkillTa"
        description="Save every version of your resume with its ATS score, target role and job description summary. Git-style history, score growth tracking and one-click downloads."
        path="/resume-version-control"
        keywords="resume version control, resume history tracker, ats score tracker, resume versions, save multiple resumes, resume manager for developers"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "SkillTa Resume Version Control",
            url: `${getBaseUrl()}/resume-version-control`,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            description: "Git-style resume history with ATS score tracking and downloads.",
          },
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Resume Version Control", path: "/resume-version-control" },
          ]),
          getFAQSchema(FAQS),
        ]}
      />

      <section className="container mx-auto px-4 pt-12 pb-8 max-w-5xl">
        <nav aria-label="Breadcrumb" className="mb-4 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-1.5">/</span>
          <span className="text-foreground">Resume Version Control</span>
        </nav>
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
          <GitBranch className="w-3.5 h-3.5" /> New in SkillTa
        </div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
          Resume <span className="gradient-text">Version Control</span>
        </h1>
        <p className="mt-3 text-muted-foreground max-w-2xl text-base sm:text-lg">
          Keep a commit-style history of every resume you create. Save the file, its ATS score, the role you targeted and a short job description summary — then download any version whenever you need it.
        </p>
      </section>

      <section className="container mx-auto px-4 pb-20 max-w-5xl">
        {!user ? (
          <GateCard
            icon={<Lock className="w-6 h-6" />}
            title="Sign in to start your resume history"
            text="Your versions are private and tied to your account."
            action={<button onClick={() => setShowSignIn(true)} className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">Sign in with Google</button>}
          />
        ) : !plan ? (
          <GateCard
            icon={<Lock className="w-6 h-6" />}
            title="Available on SkillTa Pro and Lifetime"
            text="Unlock Resume Version Control along with every SkillTa tool."
            action={<Link to="/#pricing" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">View Plans & Pricing</Link>}
          />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            {/* History */}
            <div className="order-2 lg:order-1 min-w-0">
              {stats && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  <Stat label="Versions" value={String(stats.total)} />
                  <Stat label="Latest ATS" value={`${stats.latest}`} />
                  <Stat label="Best ATS" value={`${stats.best}`} />
                  <Stat label="Growth" value={`${stats.growth > 0 ? "+" : ""}${stats.growth}`} tone={stats.growth > 0 ? "text-success" : stats.growth < 0 ? "text-destructive" : undefined} />
                </div>
              )}

              <div className="flex items-center gap-2 mb-4 text-foreground">
                <History className="w-4 h-4" />
                <h2 className="font-semibold">Version history</h2>
              </div>

              {loadingList ? (
                <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
              ) : versions.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border p-10 text-center">
                  <GitCommitHorizontal className="w-8 h-8 mx-auto text-muted-foreground mb-3" />
                  <p className="font-medium text-foreground">No versions yet</p>
                  <p className="text-sm text-muted-foreground mt-1">Save your first resume to start tracking your progress.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {grouped.map(([date, items]) => (
                    <div key={date} className="relative pl-6 sm:pl-8">
                      <div className="absolute left-[9px] sm:left-[13px] top-7 bottom-0 w-px bg-border" />
                      <div className="flex items-center gap-2 -ml-6 sm:-ml-8 mb-3">
                        <GitCommitHorizontal className="w-5 h-5 sm:w-7 sm:h-7 text-muted-foreground shrink-0" />
                        <span className="text-sm text-muted-foreground">Versions on {date}</span>
                      </div>
                      <ul className="rounded-xl border border-border bg-card overflow-hidden divide-y divide-border">
                        {items.map((v) => {
                          const delta = prevScore(v);
                          return (
                            <li key={v.id} className="p-4 hover:bg-muted/40 transition-colors">
                              <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                                <div className="min-w-0 flex-1">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="rounded-md border border-primary/30 bg-primary/10 px-1.5 py-0.5 font-mono text-xs text-primary">v{v.version_number}</span>
                                    <h3 className="font-semibold text-foreground break-words">{v.title}</h3>
                                  </div>
                                  <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                                    <span className="inline-flex items-center gap-1"><Target className="w-3.5 h-3.5" />{v.target_role}</span>
                                    <span>saved {timeAgo(v.created_at)}</span>
                                    <span className="inline-flex items-center gap-1"><FileText className="w-3.5 h-3.5" /><span className="truncate max-w-[160px]">{v.file_name}</span> · {formatSize(v.file_size)}</span>
                                  </div>
                                  {v.jd_summary && (
                                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2 break-words">{v.jd_summary}</p>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                                  <span className={`rounded-md border px-2 py-0.5 text-xs font-semibold ${scoreTone(v.ats_score)}`}>ATS {v.ats_score}</span>
                                  {delta !== null && (
                                    <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${delta > 0 ? "text-success" : delta < 0 ? "text-destructive" : "text-muted-foreground"}`}>
                                      {delta > 0 ? <TrendingUp className="w-3.5 h-3.5" /> : delta < 0 ? <TrendingDown className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
                                      {delta > 0 ? "+" : ""}{delta}
                                    </span>
                                  )}
                                  <span className="font-mono text-xs text-muted-foreground hidden sm:inline">{v.id.slice(0, 7)}</span>
                                  <IconBtn label="Copy version id" onClick={() => copyId(v)}>
                                    {copiedId === v.id ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                                  </IconBtn>
                                  <IconBtn label="Download resume" onClick={() => handleDownload(v)} disabled={busyId === v.id}>
                                    {busyId === v.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                                  </IconBtn>
                                  <IconBtn label="Delete version" onClick={() => setConfirmDelete(v)} disabled={busyId === v.id}>
                                    <Trash2 className="w-4 h-4" />
                                  </IconBtn>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="order-1 lg:order-2 h-fit lg:sticky lg:top-24 rounded-xl border border-border bg-card p-5 space-y-4">
              <div className="flex items-center gap-2 text-foreground">
                <Upload className="w-4 h-4" />
                <h2 className="font-semibold">Save a new version</h2>
              </div>

              <div>
                <input ref={fileRef} id="rv-file" type="file" accept=".pdf,.docx,.doc,.txt" className="sr-only" onChange={(e) => pickFile(e.target.files?.[0] ?? null)} />
                <label htmlFor="rv-file" className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border px-4 py-5 text-center hover:border-primary/60 transition-colors">
                  <FileText className="w-6 h-6 text-primary" />
                  {file ? (
                    <span className="text-sm font-medium text-foreground break-all">{file.name}</span>
                  ) : (
                    <span className="text-sm text-muted-foreground">Upload resume (PDF, DOCX, DOC, TXT · max 5 MB)</span>
                  )}
                </label>
                {file && (
                  <button type="button" onClick={() => { setFile(null); if (fileRef.current) fileRef.current.value = ""; }} className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                    <X className="w-3 h-3" /> Remove file
                  </button>
                )}
              </div>

              <Field label="Version title" hint="Optional">
                <input className={inputCls} value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} placeholder="e.g. Added quantified impact" />
              </Field>
              <Field label="Targeted role" hint="Required">
                <input className={inputCls} value={targetRole} onChange={(e) => setTargetRole(e.target.value)} maxLength={120} placeholder="e.g. Frontend Developer" required />
              </Field>
              <Field label="ATS score" hint="0–100">
                <input className={inputCls} type="number" min={0} max={100} step={1} value={atsScore} onChange={(e) => setAtsScore(e.target.value)} placeholder="e.g. 78" required />
              </Field>
              <Field label="Job description summary" hint="Optional">
                <textarea className={`${inputCls} min-h-[90px] resize-y`} value={jdSummary} onChange={(e) => setJdSummary(e.target.value)} maxLength={1500} placeholder="Key requirements of the job you applied for" />
              </Field>

              {formError && <p className="text-sm text-destructive">{formError}</p>}

              <button type="submit" disabled={saving} className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60">
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : <><GitCommitHorizontal className="w-4 h-4" /> Save version</>}
              </button>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="w-3.5 h-3.5" /> Files are stored privately. Only you can download them.
              </p>
              <p className="text-xs text-muted-foreground">
                Need an ATS score? Get one from the <Link to="/resume-reviewer" className="text-primary hover:underline">AI Resume Reviewer</Link>.
              </p>
            </form>
          </div>
        )}

        {/* SEO content */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            { t: "Track every improvement", d: "See how your ATS score moves from one version to the next, with clear score changes on every entry." },
            { t: "Tailor for each role", d: "Save role-specific versions with the job description summary so you always know which resume went where." },
            { t: "Download anytime", d: "Every file stays safe in your private history — grab any older version in one click." },
          ].map((f) => (
            <div key={f.t} className="rounded-xl border border-border bg-card p-5">
              <h2 className="font-semibold text-foreground">{f.t}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <details key={f.question} className="rounded-xl border border-border bg-card p-4">
                <summary className="cursor-pointer font-medium text-foreground">{f.question}</summary>
                <p className="mt-2 text-sm text-muted-foreground">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Explore related career tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { to: "/resume-reviewer", t: "AI Resume Reviewer", d: "Get your ATS score and actionable feedback before saving a new version.", c: "Review Resume →" },
              { to: "/skill-gap-analyzer", t: "Skill Gap Analyzer", d: "Find the missing skills for your target role and plan what to learn next.", c: "Analyze Skills →" },
              { to: "/quiz", t: "AI Career Quiz", d: "Discover the tech careers that best match your strengths and interests.", c: "Take Quiz →" },
              { to: "/salary-predictor", t: "Salary Predictor", d: "Estimate salary ranges for your target role across India and global markets.", c: "Check Salary →" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="group rounded-xl border border-border bg-card p-5 hover:border-primary/40 transition-colors">
                <h3 className="font-semibold text-foreground">{l.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{l.d}</p>
                <span className="mt-3 inline-block text-xs font-medium text-primary group-hover:translate-x-0.5 transition-transform">{l.c}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setConfirmDelete(null)}>
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-sm rounded-xl border border-border bg-card p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-semibold text-foreground">Delete v{confirmDelete.version_number}?</h3>
            <p className="mt-2 text-sm text-muted-foreground">The file and its details will be removed permanently.</p>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setConfirmDelete(null)} className="rounded-lg border border-border px-4 py-2 text-sm text-foreground hover:bg-muted">Cancel</button>
              <button onClick={() => handleDelete(confirmDelete)} disabled={busyId === confirmDelete.id} className="rounded-lg bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground hover:opacity-90 disabled:opacity-60">Delete</button>
            </div>
          </div>
        </div>
      )}

      <SignInModal open={showSignIn} onClose={() => setShowSignIn(false)} message="Sign in to save and track your resume versions." />
    </div>
  );
}

function GateCard({ icon, title, text, action }: { icon: React.ReactNode; title: string; text: string; action: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-8 sm:p-10 text-center max-w-xl mx-auto">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">{icon}</div>
      <h2 className="font-display text-xl font-bold text-foreground">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
      <div className="mt-6 flex justify-center">{action}</div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`mt-1 text-xl font-bold ${tone ?? "text-foreground"}`}>{value}</p>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 flex items-center justify-between text-sm font-medium text-foreground">
        {label}{hint && <span className="text-xs font-normal text-muted-foreground">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

function IconBtn({ label, onClick, disabled, children }: { label: string; onClick: () => void; disabled?: boolean; children: React.ReactNode }) {
  return (
    <button type="button" aria-label={label} title={label} onClick={onClick} disabled={disabled}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-50">
      {children}
    </button>
  );
}
