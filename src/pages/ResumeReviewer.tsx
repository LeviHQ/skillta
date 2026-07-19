import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  FileText,
  Upload,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Target,
  TrendingUp,
  ClipboardList,
  Wand2,
  X,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import SupportBanner from "@/components/SupportBanner";
import AdsterraNativeBanner from "@/components/AdsterraNativeBanner";
import SignInModal from "@/components/SignInModal";
import { useAuth } from "@/contexts/AuthContext";

interface RewriteItem {
  original: string;
  improved: string;
  why: string;
}
interface Review {
  atsScore: number;
  verdict: string;
  strengths: string[];
  weaknesses: string[];
  missingKeywords: string[];
  sectionFeedback: {
    summary?: string;
    experience?: string;
    skills?: string;
    projects?: string;
    education?: string;
    formatting?: string;
  };
  rewriteSuggestions: RewriteItem[];
  actionPlan: string[];
  roleFit: { role: string; fitScore: number; reasoning: string };
}

async function extractPdfText(file: File): Promise<string> {
  const pdfjsLib: any = await import("pdfjs-dist");
  // Point worker to the matching version on a CDN.
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
  const buf = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((it: any) => it.str).join(" ") + "\n\n";
  }
  return text.trim();
}

function ScoreRing({ score, label }: { score: number; label: string }) {
  const s = Math.max(0, Math.min(100, score || 0));
  const color =
    s >= 80 ? "text-emerald-400" : s >= 60 ? "text-amber-400" : "text-rose-400";
  const stroke =
    s >= 80 ? "#10b981" : s >= 60 ? "#f59e0b" : "#f43f5e";
  const r = 44;
  const c = 2 * Math.PI * r;
  const offset = c - (s / 100) * c;
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-28 h-28">
        <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={r} stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="none" />
          <motion.circle
            cx="50" cy="50" r={r} stroke={stroke} strokeWidth="8" fill="none"
            strokeLinecap="round"
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: "easeOut" }}
            strokeDasharray={c}
          />
        </svg>
        <div className={`absolute inset-0 flex items-center justify-center text-2xl font-bold ${color}`}>
          {s}
        </div>
      </div>
      <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

export default function ResumeReviewer() {
  const [resume, setResume] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [review, setReview] = useState<Review | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [showSignIn, setShowSignIn] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  const clearAll = () => {
    setResume("");
    setRole("");
    setReview(null);
    setError(null);
    setFileName(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleFile = async (file: File) => {
    setError(null);
    setFileName(file.name);
    try {
      let text = "";
      if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
        text = await extractPdfText(file);
      } else if (file.type.startsWith("text/") || file.name.toLowerCase().endsWith(".txt")) {
        text = await file.text();
      } else {
        setError("Unsupported file. Please upload a PDF or TXT, or paste the text directly.");
        setFileName(null);
        return;
      }
      if (!text || text.length < 80) {
        setError("Could not extract enough text. Try pasting directly.");
        return;
      }
      setResume(text);
    } catch (e) {
      console.error(e);
      setError("Failed to read file. Please paste the text instead.");
    }
  };

  const handleSubmit = async () => {
    setError(null);
    setReview(null);
    if (resume.trim().length < 100) {
      setError("Please paste your resume (at least a few sections) or upload a file.");
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("review-resume", {
        body: { resume, targetRole: role },
      });
      if (error) {
        // Supabase wraps non-2xx as a generic error; try to read the server body.
        const ctx: any = (error as any)?.context;
        let serverMsg: string | null = null;
        try {
          const text = ctx && typeof ctx.text === "function" ? await ctx.text() : null;
          if (text) {
            const parsed = JSON.parse(text);
            serverMsg = parsed?.message || parsed?.error || null;
          }
        } catch { /* ignore */ }
        throw new Error(serverMsg || error.message || "Request failed");
      }
      if (data?.error) throw new Error(data.message || data.error);
      setReview(data.review as Review);
      // Scroll to results
      setTimeout(() => {
        document.getElementById("review-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (e: any) {
      console.error(e);
      setError(e?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResume("");
    setRole("");
    setReview(null);
    setError(null);
    setFileName(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <>
      <Helmet>
        <title>AI Resume Reviewer — Free ATS Score & Feedback | SkillTa</title>
        <meta
          name="description"
          content="Get an instant AI-powered ATS score, section-wise feedback, missing keywords, and bullet rewrites for your tech resume — completely free on SkillTa."
        />
        <link rel="canonical" href="https://skillta.tech/resume-reviewer" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
          <div className="container mx-auto px-6 pt-16 pb-10 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5" /> 100% Free · No sign-in required
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                AI <span className="text-gradient">Resume Reviewer</span>
              </h1>
              <p className="text-muted-foreground text-base md:text-lg">
                Get a brutally honest ATS score, section-wise feedback, missing keywords, and
                bullet-point rewrites — powered by SkillTa AI, tuned for 2026 tech hiring.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Form */}
        <section className="container mx-auto px-6 pb-12">
          <div className="max-w-4xl mx-auto glass border border-border rounded-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-end gap-4 mb-5">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Target Role <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Frontend Engineer, Data Scientist, DevOps Engineer"
                  className="w-full px-4 py-3 rounded-lg bg-background/60 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors"
                  maxLength={120}
                />
              </div>
              <div>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.txt,application/pdf,text/plain"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFile(f);
                  }}
                />
                <button
                  onClick={() => fileRef.current?.click()}
                  className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-primary/40 text-primary hover:bg-primary/10 transition-colors text-sm font-semibold"
                >
                  <Upload className="w-4 h-4" /> Upload PDF / TXT
                </button>
              </div>
            </div>

            {fileName && (
              <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                <FileText className="w-3.5 h-3.5 text-primary" />
                <span>Loaded: <span className="text-foreground font-medium">{fileName}</span></span>
                <button
                  onClick={() => { setFileName(null); setResume(""); if (fileRef.current) fileRef.current.value = ""; }}
                  className="ml-1 text-muted-foreground hover:text-rose-400"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <label className="block text-sm font-semibold text-foreground mb-2">
              Your Resume Text
            </label>
            <textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              placeholder="Paste your full resume here — summary, experience, skills, projects, education…"
              rows={14}
              className="w-full px-4 py-3 rounded-lg bg-background/60 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors font-mono text-sm resize-y"
            />
            <div className="mt-2 text-xs text-muted-foreground flex justify-between">
              <span>{resume.length.toLocaleString()} characters</span>
              <span>Tip: Include quantified achievements for the best review.</span>
            </div>

            {error && (
              <div className="mt-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-gradient-primary text-primary-foreground font-semibold hover:opacity-95 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Analyzing your resume…
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> Review My Resume
                  </>
                )}
              </button>
              {(resume || review) && !loading && (
                <button
                  onClick={reset}
                  className="px-5 py-3.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors text-sm font-medium"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Sponsored — Native Banner */}
        <AdsterraNativeBanner />


        {/* Results */}
        {review && (
          <section id="review-results" className="container mx-auto px-6 pb-16">
            <div className="max-w-5xl mx-auto space-y-6">
              {/* Score card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass border border-border rounded-2xl p-6 md:p-8"
              >
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex gap-6">
                    <ScoreRing score={review.atsScore} label="ATS Score" />
                    {review.roleFit?.fitScore != null && (
                      <ScoreRing score={review.roleFit.fitScore} label="Role Fit" />
                    )}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">
                      Verdict
                    </div>
                    <p className="text-lg md:text-xl text-foreground font-medium leading-relaxed">
                      {review.verdict}
                    </p>
                    {review.roleFit?.role && (
                      <p className="mt-3 text-sm text-muted-foreground">
                        <Target className="w-3.5 h-3.5 inline mr-1 text-primary" />
                        Best fit: <span className="text-foreground font-semibold">{review.roleFit.role}</span> — {review.roleFit.reasoning}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Strengths & Weaknesses */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass border border-emerald-500/20 rounded-2xl p-6">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-emerald-400 mb-4">
                    <CheckCircle2 className="w-5 h-5" /> Strengths
                  </h3>
                  <ul className="space-y-2.5">
                    {review.strengths?.map((s, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-emerald-400 mt-0.5">✓</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="glass border border-rose-500/20 rounded-2xl p-6">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-rose-400 mb-4">
                    <AlertTriangle className="w-5 h-5" /> Weaknesses
                  </h3>
                  <ul className="space-y-2.5">
                    {review.weaknesses?.map((s, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-rose-400 mt-0.5">!</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Missing keywords */}
              {review.missingKeywords?.length > 0 && (
                <div className="glass border border-border rounded-2xl p-6">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-foreground mb-4">
                    <TrendingUp className="w-5 h-5 text-primary" /> Missing Keywords for ATS
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {review.missingKeywords.map((k, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/30"
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Section feedback */}
              {review.sectionFeedback && (
                <div className="glass border border-border rounded-2xl p-6">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-foreground mb-4">
                    <FileText className="w-5 h-5 text-primary" /> Section-by-Section Feedback
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(review.sectionFeedback).map(([key, val]) =>
                      val ? (
                        <div key={key} className="p-4 rounded-lg bg-background/40 border border-border/60">
                          <div className="text-xs uppercase tracking-wider text-primary font-semibold mb-1.5">
                            {key}
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{val}</p>
                        </div>
                      ) : null,
                    )}
                  </div>
                </div>
              )}

              {/* Rewrites */}
              {review.rewriteSuggestions?.length > 0 && (
                <div className="glass border border-border rounded-2xl p-6">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-foreground mb-4">
                    <Wand2 className="w-5 h-5 text-primary" /> Bullet Rewrites
                  </h3>
                  <div className="space-y-4">
                    {review.rewriteSuggestions.map((r, i) => (
                      <div key={i} className="p-4 rounded-lg bg-background/40 border border-border/60">
                        <div className="text-xs uppercase tracking-wider text-rose-400 font-semibold mb-1">Before</div>
                        <p className="text-sm text-muted-foreground mb-3 line-through opacity-80">{r.original}</p>
                        <div className="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-1">After</div>
                        <p className="text-sm text-foreground mb-3 font-medium">{r.improved}</p>
                        <p className="text-xs text-primary/90 italic">Why: {r.why}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action plan */}
              {review.actionPlan?.length > 0 && (
                <div className="glass border border-primary/30 rounded-2xl p-6 bg-primary/5">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-foreground mb-4">
                    <ClipboardList className="w-5 h-5 text-primary" /> Your Action Plan
                  </h3>
                  <ol className="space-y-2.5 list-none">
                    {review.actionPlan.map((s, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center">
                          {i + 1}
                        </span>
                        <span className="pt-0.5">{s}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </section>
        )}

        <SupportBanner />
      </div>
    </>
  );
}
