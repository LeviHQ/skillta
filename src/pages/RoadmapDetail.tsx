import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { careers } from "@/data/careers";
import { ArrowLeft, Download, Clock, TrendingUp, DollarSign, AlertTriangle, BookOpen, Wrench, FolderOpen } from "lucide-react";
import { useRef } from "react";
import SEOHead from "@/components/SEOHead";
import { getCourseSchema, getBreadcrumbSchema } from "@/lib/seo";

export default function RoadmapDetail() {
  const { careerId } = useParams();
  const career = careers.find((c) => c.id === careerId);
  const roadmapRef = useRef<HTMLDivElement>(null);

  if (!career) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-foreground">Career not found</h1>
          <Link to="/roadmaps" className="text-primary hover:underline">Browse all roadmaps</Link>
        </div>
      </div>
    );
  }

  const handleDownloadPDF = async () => {
    if (!career) return;

    const html2pdf = (await import("html2pdf.js")).default;

    // Build a clean, print-friendly HTML string
    const phasesHTML = career.roadmap.map((phase, i) => `
      <div style="margin-bottom:18px; page-break-inside:avoid; border:1.5px solid #334155; border-radius:12px; padding:18px 20px; background:#1e293b;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="display:inline-flex; align-items:center; justify-content:center; width:32px; height:32px; border-radius:50%; background:#6366f1; color:#fff; font-weight:700; font-size:14px;">${phase.phase}</span>
            <span style="font-size:16px; font-weight:700; color:#f1f5f9;">${phase.title}</span>
          </div>
          <span style="font-size:11px; color:#94a3b8; background:#334155; padding:3px 10px; border-radius:6px; font-family:monospace;">${phase.duration}</span>
        </div>
        ${phase.items.map(item => `
          <div style="margin-bottom:6px; padding-left:42px;">
            <span style="font-size:13px; font-weight:600; color:#e2e8f0;">🔧 ${item.name}</span>
            <span style="font-size:11px; color:#94a3b8; margin-left:6px;">${item.description}</span>
          </div>
        `).join("")}
        <div style="padding-left:42px; margin-top:10px;">
          <p style="font-size:10px; font-weight:700; color:#818cf8; text-transform:uppercase; margin-bottom:4px;">📚 Resources</p>
          <div style="display:flex; flex-wrap:wrap; gap:4px;">
            ${phase.resources.map(r => `<span style="font-size:10px; background:#312e81; color:#a5b4fc; padding:2px 8px; border-radius:4px;">${r}</span>`).join("")}
          </div>
        </div>
        <div style="padding-left:42px; margin-top:8px;">
          <p style="font-size:10px; font-weight:700; color:#34d399; text-transform:uppercase; margin-bottom:4px;">🚀 Projects</p>
          <div style="display:flex; flex-wrap:wrap; gap:4px;">
            ${phase.projects.map(p => `<span style="font-size:10px; background:#064e3b; color:#6ee7b7; padding:2px 8px; border-radius:4px;">${p}</span>`).join("")}
          </div>
        </div>
      </div>
    `).join("");

    const pdfHTML = `
      <div style="font-family:'Segoe UI',Arial,sans-serif; color:#e2e8f0; padding:0; background:#0f172a;">
        <!-- Header -->
        <div style="text-align:center; margin-bottom:24px; padding-bottom:18px; border-bottom:2px solid #334155;">
          <div style="font-size:36px; margin-bottom:6px;">${career.icon}</div>
          <h1 style="font-size:28px; font-weight:800; color:#818cf8; margin:0 0 4px;">${career.title}</h1>
          <p style="font-size:13px; color:#94a3b8; margin:0 0 8px;">${career.tagline}</p>
          <p style="font-size:11px; color:#64748b; max-width:480px; margin:0 auto;">${career.description}</p>
        </div>

        <!-- Quick Stats -->
        <div style="display:flex; gap:10px; justify-content:center; margin-bottom:28px;">
          <div style="flex:1; text-align:center; padding:10px; border:1px solid #334155; border-radius:10px; background:#1e293b;">
            <p style="font-size:10px; color:#94a3b8; margin:0;">Timeline</p>
            <p style="font-size:13px; font-weight:700; color:#f1f5f9; margin:2px 0 0;">${career.estimatedTime}</p>
          </div>
          <div style="flex:1; text-align:center; padding:10px; border:1px solid #334155; border-radius:10px; background:#1e293b;">
            <p style="font-size:10px; color:#94a3b8; margin:0;">Demand</p>
            <p style="font-size:13px; font-weight:700; color:#f1f5f9; margin:2px 0 0;">${career.demandLevel}</p>
          </div>
          <div style="flex:1; text-align:center; padding:10px; border:1px solid #334155; border-radius:10px; background:#1e293b;">
            <p style="font-size:10px; color:#94a3b8; margin:0;">Difficulty</p>
            <p style="font-size:13px; font-weight:700; color:#f1f5f9; margin:2px 0 0;">${career.learningDifficulty}</p>
          </div>
          <div style="flex:1; text-align:center; padding:10px; border:1px solid #334155; border-radius:10px; background:#1e293b;">
            <p style="font-size:10px; color:#94a3b8; margin:0;">Entry Barrier</p>
            <p style="font-size:13px; font-weight:700; color:#f1f5f9; margin:2px 0 0;">${career.realityCheck.entryBarrier}</p>
          </div>
        </div>

        <!-- Roadmap -->
        <h2 style="text-align:center; font-size:20px; font-weight:700; color:#f1f5f9; margin-bottom:16px;">📍 Learning Roadmap</h2>
        ${phasesHTML}

        <!-- Reality Check -->
        <div style="page-break-inside:avoid; margin-top:24px; padding:18px 20px; border:1.5px solid #854d0e; border-radius:12px; background:#1c1917;">
          <h2 style="font-size:17px; font-weight:700; color:#fbbf24; margin:0 0 12px;">⚠️ Reality Check</h2>
          <div style="display:flex; gap:16px; margin-bottom:10px;">
            <div><p style="font-size:10px; color:#fbbf24; margin:0;">Competition</p><p style="font-size:13px; font-weight:600; color:#fde68a; margin:2px 0 0;">${career.realityCheck.competition}</p></div>
            <div><p style="font-size:10px; color:#fbbf24; margin:0;">Entry Barrier</p><p style="font-size:13px; font-weight:600; color:#fde68a; margin:2px 0 0;">${career.realityCheck.entryBarrier}</p></div>
          </div>
          <p style="font-size:11px; color:#fde68a; margin:0 0 6px;"><strong>Salary:</strong> ${career.realityCheck.salaryExpectation}</p>
          <p style="font-size:11px; color:#fbbf24; font-style:italic; border-left:3px solid #fbbf24; padding-left:10px; margin:0;">${career.realityCheck.honestNote}</p>
        </div>

        <!-- Salary -->
        <div style="page-break-inside:avoid; margin-top:18px; padding:18px 20px; border:1.5px solid #334155; border-radius:12px; background:#042f2e;">
          <h2 style="font-size:17px; font-weight:700; color:#34d399; margin:0 0 10px;">💰 Salary Range</h2>
          <div style="display:flex; gap:12px; margin-bottom:8px;">
            <div style="flex:1; padding:8px 12px; background:#064e3b; border-radius:8px;">
              <p style="font-size:10px; color:#6ee7b7; margin:0;">🇮🇳 India</p>
              <p style="font-size:12px; font-weight:600; color:#a7f3d0; margin:2px 0 0;">${career.salaryIndia}</p>
            </div>
            <div style="flex:1; padding:8px 12px; background:#064e3b; border-radius:8px;">
              <p style="font-size:10px; color:#6ee7b7; margin:0;">🌍 Global</p>
              <p style="font-size:12px; font-weight:600; color:#a7f3d0; margin:2px 0 0;">${career.salaryGlobal}</p>
            </div>
          </div>
          <p style="font-size:11px; color:#6ee7b7; margin:0;">${career.growthPotential}</p>
        </div>

        <!-- Footer -->
        <div style="text-align:center; margin-top:24px; padding-top:14px; border-top:1px solid #334155;">
          <p style="font-size:10px; color:#64748b; margin:0;">Generated by SkillTa — skillta.app</p>
        </div>
      </div>
    `;

    const container = document.createElement("div");
    container.innerHTML = pdfHTML;
    document.body.appendChild(container);

    await (html2pdf() as any)
      .set({
        margin: [12, 14],
        filename: `${career.title}-Roadmap-SkillTa.pdf`,
        html2canvas: { scale: 2, useCORS: true, backgroundColor: "#0f172a" },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      })
      .from(container)
      .save();

    document.body.removeChild(container);
  };

  const phaseColors = [
    "border-primary",
    "border-accent",
    "border-info",
    "border-success",
    "border-warning",
  ];

  const difficultyBar = (level: number) => (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className={`w-4 h-2 rounded-sm ${i < level ? "bg-primary" : "bg-border"}`} />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-hero relative">
      <SEOHead
        title={`${career.title} Roadmap — Step-by-Step Learning Path | SkillTa`}
        description={`Complete ${career.title} roadmap: ${career.tagline}. Learn ${career.requiredSkills.slice(0, 4).join(", ")} and more. Includes resources, projects, salary info & reality check.`}
        keywords={`${career.title.toLowerCase()} roadmap, how to become a ${career.title.toLowerCase()}, ${career.requiredSkills.slice(0, 3).join(", ").toLowerCase()}`}
        path={`/roadmaps/${career.id}`}
        jsonLd={[
          getCourseSchema(career),
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Roadmaps", path: "/roadmaps" },
            { name: career.title, path: `/roadmaps/${career.id}` },
          ]),
        ]}
      />
      <div className="container mx-auto px-6 py-12 relative z-10">

        {/* Back + Download */}
        <div className="flex items-center justify-between mb-8 no-print">
          <Link to="/roadmaps" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Roadmaps
          </Link>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>

        <div ref={roadmapRef}>
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-6xl mb-4">{career.icon}</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="text-gradient">{career.title}</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-6">{career.tagline}</p>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">{career.description}</p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="p-4 rounded-xl bg-gradient-card border border-border text-center">
              <Clock className="w-5 h-5 text-info mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Timeline</p>
              <p className="text-sm font-semibold text-foreground">{career.estimatedTime}</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-card border border-border text-center">
              <TrendingUp className="w-5 h-5 text-success mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Demand</p>
              <p className="text-sm font-semibold text-foreground">{career.demandLevel}</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-card border border-border text-center">
              <DollarSign className="w-5 h-5 text-warning mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Difficulty</p>
              <p className="text-sm font-semibold text-foreground">{career.learningDifficulty}</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-card border border-border text-center">
              <AlertTriangle className="w-5 h-5 text-accent mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Entry Barrier</p>
              <p className="text-sm font-semibold text-foreground">{career.realityCheck.entryBarrier}</p>
            </div>
          </motion.div>

          {/* Roadmap Timeline */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              Learning <span className="text-gradient">Roadmap</span>
            </h2>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden md:block" />

              {career.roadmap.map((phase, i) => (
                <motion.div
                  key={phase.phase}
                  className="relative mb-8"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                >
                  <div className="flex gap-6">
                    {/* Phase indicator */}
                    <div className="hidden md:flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full border-2 ${phaseColors[i]} bg-card flex items-center justify-center text-sm font-bold text-foreground z-10`}>
                        {phase.phase}
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`flex-1 p-6 rounded-2xl bg-gradient-card border ${phaseColors[i]} border-opacity-30`}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-foreground">
                          <span className="md:hidden text-muted-foreground">Phase {phase.phase}: </span>
                          {phase.title}
                        </h3>
                        <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-1 rounded">{phase.duration}</span>
                      </div>

                      {/* Topics */}
                      <div className="space-y-3 mb-5">
                        {phase.items.map((item) => (
                          <div key={item.name} className="flex items-start gap-3">
                            <Wrench className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-foreground">{item.name}</p>
                              <p className="text-xs text-muted-foreground">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Resources */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen className="w-3.5 h-3.5 text-info" />
                          <p className="text-xs font-semibold text-info uppercase tracking-wider">Resources</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {phase.resources.map((r) => (
                            <span key={r} className="text-xs px-2 py-1 rounded bg-info/10 text-info">{r}</span>
                          ))}
                        </div>
                      </div>

                      {/* Projects */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <FolderOpen className="w-3.5 h-3.5 text-success" />
                          <p className="text-xs font-semibold text-success uppercase tracking-wider">Project Ideas</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {phase.projects.map((p) => (
                            <span key={p} className="text-xs px-2 py-1 rounded bg-success/10 text-success">{p}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Reality Check */}
          <motion.div
            className="max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="p-8 rounded-2xl bg-gradient-card border border-border">
              <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" /> Reality Check
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Difficulty Level</p>
                  {difficultyBar(career.realityCheck.difficulty)}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Competition</p>
                  <p className="text-sm font-semibold text-foreground">{career.realityCheck.competition}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Entry Barrier</p>
                  <p className="text-sm font-semibold text-foreground">{career.realityCheck.entryBarrier}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Salary Expectation</p>
                  <p className="text-sm text-foreground">{career.realityCheck.salaryExpectation}</p>
                </div>
                <div className="border-l-2 border-warning pl-4">
                  <p className="text-sm text-muted-foreground italic">{career.realityCheck.honestNote}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Salary Section */}
          <motion.div
            className="max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="p-8 rounded-2xl bg-gradient-card border border-border">
              <h2 className="text-xl font-bold text-foreground mb-4">💰 Salary Range</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="p-4 rounded-xl bg-secondary/50">
                  <p className="text-xs text-muted-foreground mb-1">🇮🇳 India</p>
                  <p className="text-sm font-semibold text-foreground">{career.salaryIndia}</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/50">
                  <p className="text-xs text-muted-foreground mb-1">🌍 Global</p>
                  <p className="text-sm font-semibold text-foreground">{career.salaryGlobal}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{career.growthPotential}</p>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto text-center no-print">
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            Take the Career Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}
