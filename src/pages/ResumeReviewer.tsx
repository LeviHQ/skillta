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
  Download,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import SupportBanner from "@/components/SupportBanner";
import AdsterraNativeBanner from "@/components/AdsterraNativeBanner";
import AdsterraResponsiveBanner from "@/components/AdsterraResponsiveBanner";
import SignInModal from "@/components/SignInModal";
import SubscribeRequiredModal from "@/components/SubscribeRequiredModal";
import CongratsModal from "@/components/CongratsModal";
import { useAuth } from "@/contexts/AuthContext";
import { usePlan } from "@/contexts/PlanContext";
import jsPDF from "jspdf";


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

const TECH_ROLES = [
  "Frontend Engineer",
  "Backend Engineer",
  "Full Stack Engineer",
  "Mobile Engineer (iOS/Android)",
  "React Native Developer",
  "Flutter Developer",
  "Software Engineer (Generalist)",
  "DevOps Engineer",
  "Site Reliability Engineer (SRE)",
  "Cloud Engineer (AWS/GCP/Azure)",
  "Platform Engineer",
  "Data Engineer",
  "Data Analyst",
  "Data Scientist",
  "Machine Learning Engineer",
  "AI/ML Research Engineer",
  "MLOps Engineer",
  "Prompt Engineer",
  "Generative AI Engineer",
  "Computer Vision Engineer",
  "NLP Engineer",
  "Analytics Engineer",
  "Business Intelligence Analyst",
  "QA Engineer / SDET",
  "Automation Test Engineer",
  "Security Engineer",
  "Cybersecurity Analyst",
  "Penetration Tester",
  "Blockchain Developer",
  "Smart Contract Engineer",
  "Web3 Engineer",
  "Game Developer",
  "AR/VR Engineer",
  "Embedded Systems Engineer",
  "IoT Engineer",
  "Systems / Rust Engineer",
  "Database Administrator (DBA)",
  "Solutions Architect",
  "Technical Lead",
  "Engineering Manager",
  "Product Manager (Tech)",
  "Technical Program Manager",
  "UI/UX Designer",
  "Product Designer",
  "Technical Writer",
  "Developer Advocate",
  "Salesforce Developer",
  "SAP Consultant",
  "Support / Solutions Engineer",
];

export default function ResumeReviewer() {
  const [resume, setResume] = useState("");
  const [role, setRole] = useState("");
  const [roleSelect, setRoleSelect] = useState("");
  const [customRole, setCustomRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [review, setReview] = useState<Review | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [congratsExpiry, setCongratsExpiry] = useState<string | undefined>();
  const fileRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const { plan, resumeUsage, resumeDailyLimit, activateFreePlan, refreshPlan } = usePlan();

  const noPlan = !!user && !plan;
  const limitReached = !!plan && resumeUsage >= resumeDailyLimit;
  const locked = noPlan || limitReached;


  const clearAll = () => {
    setResume("");
    setRole("");
    setRoleSelect("");
    setCustomRole("");
    setJobDescription("");
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

  const resolvedRole = (roleSelect === "__custom__" ? customRole : roleSelect).trim();

  const handleSubmit = async () => {
    setError(null);
    setReview(null);
    if (!user) {
      setShowSignIn(true);
      return;
    }
    if (noPlan) {
      setShowSubscribe(true);
      return;
    }
    if (limitReached) {
      setError(`Daily limit reached — you've used all ${resumeDailyLimit} free resume reviews today. Your quota resets tomorrow at 00:00 UTC.`);
      return;
    }
    if (!resolvedRole) {
      setError("Please select a target role (or choose Custom and type one).");
      return;
    }
    if (resume.trim().length < 100) {
      setError("Please upload your resume (PDF or TXT) to continue.");
      return;
    }
    setRole(resolvedRole);
    setLoading(true);
    try {
      const token = await user.getIdToken();
      const { data, error } = await supabase.functions.invoke("review-resume", {
        body: { resume, targetRole: resolvedRole, jobDescription: jobDescription.trim() },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (error) {
        const ctx: any = (error as any)?.context;
        let serverMsg: string | null = null;
        let serverCode: string | null = null;
        try {
          const text = ctx && typeof ctx.text === "function" ? await ctx.text() : null;
          if (text) {
            const parsed = JSON.parse(text);
            serverMsg = parsed?.message || parsed?.error || null;
            serverCode = parsed?.error || null;
          }
        } catch { /* ignore */ }
        if (serverCode === "no_plan") {
          await refreshPlan();
          setShowSubscribe(true);
          return;
        }
        throw new Error(serverMsg || error.message || "Request failed");
      }
      if (data?.error) {
        if (data.error === "no_plan") {
          await refreshPlan();
          setShowSubscribe(true);
          return;
        }
        throw new Error(data.message || data.error);
      }
      setReview(data.review as Review);
      // Keep dashboard usage counter in sync
      refreshPlan().catch(() => {});
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


  const reset = () => clearAll();

  const downloadPdf = () => {
    if (!review) return;
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 40;
    const maxW = pageW - margin * 2;
    let y = margin;

    const sanitize = (s: string) =>
      String(s || "")
        .replace(/₹/g, "Rs ")
        .replace(/→/g, "->")
        .replace(/[""]/g, '"')
        .replace(/['']/g, "'")
        .replace(/•/g, "-")
        .replace(/[^\x00-\x7F]/g, "");

    const ensure = (h: number) => {
      if (y + h > pageH - margin) {
        doc.addPage();
        y = margin;
      }
    };

    const heading = (text: string, size = 14, color: [number, number, number] = [124, 58, 237]) => {
      ensure(size + 12);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(size);
      doc.setTextColor(...color);
      doc.text(sanitize(text), margin, y);
      y += size + 6;
      doc.setDrawColor(230, 230, 235);
      doc.line(margin, y, pageW - margin, y);
      y += 10;
      doc.setTextColor(40, 40, 50);
    };

    const para = (text: string, size = 10) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(size);
      doc.setTextColor(60, 60, 70);
      const lines = doc.splitTextToSize(sanitize(text), maxW);
      lines.forEach((ln: string) => {
        ensure(size + 4);
        doc.text(ln, margin, y);
        y += size + 4;
      });
      y += 4;
    };

    const bullets = (items: string[], size = 10) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(size);
      doc.setTextColor(60, 60, 70);
      items.forEach((it) => {
        const lines = doc.splitTextToSize("- " + sanitize(it), maxW - 12);
        lines.forEach((ln: string, i: number) => {
          ensure(size + 4);
          doc.text(ln, margin + (i === 0 ? 0 : 12), y);
          y += size + 4;
        });
      });
      y += 4;
    };

    // Header
    doc.setFillColor(20, 20, 30);
    doc.rect(0, 0, pageW, 60, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("SkillTa - AI Resume Review Report", margin, 38);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(180, 180, 200);
    doc.text(new Date().toLocaleString(), pageW - margin, 38, { align: "right" });
    y = 90;

    doc.setTextColor(40, 40, 50);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`Target Role: ${sanitize(role || review.roleFit?.role || "-")}`, margin, y);
    y += 18;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`ATS Score: ${review.atsScore}/100`, margin, y);
    if (review.roleFit?.fitScore != null) {
      doc.text(`Role Fit: ${review.roleFit.fitScore}/100`, margin + 200, y);
    }
    y += 20;

    heading("Verdict");
    para(review.verdict);

    if (review.roleFit?.reasoning) {
      heading("Role Fit");
      para(`${review.roleFit.role || ""} - ${review.roleFit.reasoning}`);
    }

    if (review.strengths?.length) {
      heading("Strengths", 14, [16, 185, 129]);
      bullets(review.strengths);
    }
    if (review.weaknesses?.length) {
      heading("Weaknesses", 14, [244, 63, 94]);
      bullets(review.weaknesses);
    }
    if (review.missingKeywords?.length) {
      heading("Missing Keywords (ATS)");
      para(review.missingKeywords.join(", "));
    }
    if (review.sectionFeedback) {
      heading("Section-by-Section Feedback");
      Object.entries(review.sectionFeedback).forEach(([k, v]) => {
        if (!v) return;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(124, 58, 237);
        ensure(16);
        doc.text(sanitize(k.toUpperCase()), margin, y);
        y += 14;
        para(v as string);
      });
    }
    if (review.rewriteSuggestions?.length) {
      heading("Bullet Rewrites");
      review.rewriteSuggestions.forEach((r, i) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(244, 63, 94);
        ensure(14);
        doc.text(`#${i + 1} Before:`, margin, y);
        y += 12;
        para(r.original);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(16, 185, 129);
        ensure(14);
        doc.text("After:", margin, y);
        y += 12;
        para(r.improved);
        doc.setFont("helvetica", "italic");
        doc.setFontSize(9);
        doc.setTextColor(124, 58, 237);
        const wlines = doc.splitTextToSize(sanitize("Why: " + r.why), maxW);
        wlines.forEach((ln: string) => {
          ensure(12);
          doc.text(ln, margin, y);
          y += 12;
        });
        y += 6;
      });
    }
    if (review.actionPlan?.length) {
      heading("Your Action Plan");
      review.actionPlan.forEach((s, i) => {
        const lines = doc.splitTextToSize(sanitize(`${i + 1}. ${s}`), maxW);
        lines.forEach((ln: string) => {
          ensure(14);
          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
          doc.setTextColor(60, 60, 70);
          doc.text(ln, margin, y);
          y += 12;
        });
        y += 4;
      });
    }

    // Footer on all pages
    const pages = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pages; i++) {
      doc.setPage(i);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 160);
      doc.text("Generated by SkillTa AI Resume Reviewer - skillta.tech", margin, pageH - 20);
      doc.text(`Page ${i} of ${pages}`, pageW - margin, pageH - 20, { align: "right" });
    }

    doc.save(`SkillTa-Resume-Review-${Date.now()}.pdf`);
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
        <AdsterraResponsiveBanner />
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
                <Sparkles className="w-3.5 h-3.5" /> 100% Free · Sign in required
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
                  Target Role <span className="text-rose-400 font-normal">*</span>
                </label>
                <select
                  value={roleSelect}
                  onChange={(e) => setRoleSelect(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-background/60 border border-border text-foreground focus:outline-none focus:border-primary/60 transition-colors"
                >
                  <option value="">Select a target role…</option>
                  {TECH_ROLES.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                  <option value="__custom__">Other (type your own)…</option>
                </select>
                {roleSelect === "__custom__" && (
                  <input
                    type="text"
                    value={customRole}
                    onChange={(e) => setCustomRole(e.target.value)}
                    placeholder="Type your target role (e.g. Robotics Software Engineer)"
                    className="mt-2 w-full px-4 py-3 rounded-lg bg-background/60 border border-primary/40 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors"
                    maxLength={120}
                    autoFocus
                  />
                )}
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

            {resume && !fileName && (
              <div className="text-xs text-muted-foreground">
                {resume.length.toLocaleString()} characters loaded
              </div>
            )}

            <div className="mt-5">
              <label className="block text-sm font-semibold text-foreground mb-2">
                Job Description <span className="text-muted-foreground font-normal">(optional — paste the JD to tailor the review to a specific opening)</span>
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value.slice(0, 4000))}
                placeholder="Paste the full job description here to get a JD-specific ATS score, matched keywords, and gap analysis. Leave blank for a general review."
                rows={6}
                className="w-full px-4 py-3 rounded-lg bg-background/60 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors font-mono text-sm resize-y"
              />
              <div className="mt-1 text-xs text-muted-foreground flex justify-between">
                <span>{jobDescription.length.toLocaleString()} / 4,000 characters</span>
                {jobDescription.trim() && (
                  <span className="text-primary">✓ Review will be tailored to this JD</span>
                )}
              </div>
            </div>

            {error && (
              <div className="mt-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {user && plan && (
              <div className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                {Math.max(0, resumeDailyLimit - resumeUsage)} of {resumeDailyLimit} free reviews left today
              </div>
            )}

            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSubmit}
                disabled={loading || (!!user && locked)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-gradient-primary text-primary-foreground font-semibold hover:opacity-95 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Analyzing your resume…
                  </>
                ) : noPlan ? (
                  <>
                    <Sparkles className="w-4 h-4" /> Subscription required
                  </>
                ) : limitReached ? (
                  <>
                    <Sparkles className="w-4 h-4" /> Daily limit reached — try tomorrow
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
              <div className="flex justify-end">
                <button
                  onClick={downloadPdf}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-primary text-primary-foreground font-semibold text-sm hover:opacity-95 transition-opacity shadow-lg"
                >
                  <Download className="w-4 h-4" /> Download Report (PDF)
                </button>
              </div>
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

      <SignInModal
        open={showSignIn}
        onClose={() => { setShowSignIn(false); clearAll(); }}
        message="Please sign in to get your free AI-powered resume review."
      />
      <SubscribeRequiredModal
        open={showSubscribe}
        onClose={() => setShowSubscribe(false)}
        onGetStartedFree={async () => {
          const p = await activateFreePlan();
          if (p) {
            setCongratsExpiry(p.expiresAt);
            setShowCongrats(true);
          }
        }}
      />
      <CongratsModal
        open={showCongrats}
        onClose={() => setShowCongrats(false)}
        planName="Free"
        expiresAt={congratsExpiry}
      />


    </>
  );
}
