import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { careers } from "@/data/careers";
import { ArrowLeft, Download, Clock, TrendingUp, DollarSign, AlertTriangle, BookOpen, Wrench, FolderOpen } from "lucide-react";
import { useRef } from "react";
import SEOHead from "@/components/SEOHead";
import AdsterraNativeBanner from "@/components/AdsterraNativeBanner";
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

    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });

    const PAGE_W = 210;
    const PAGE_H = 297;
    const M = 15;
    const CONTENT_W = PAGE_W - M * 2;
    const BOTTOM = PAGE_H - 18; // reserve for footer

    const C = {
      brand: [99, 102, 241] as [number, number, number],
      brandDark: [67, 56, 202] as [number, number, number],
      text: [15, 23, 42] as [number, number, number],
      muted: [100, 116, 139] as [number, number, number],
      subtle: [226, 232, 240] as [number, number, number],
      card: [248, 250, 252] as [number, number, number],
      warn: [180, 83, 9] as [number, number, number],
      warnAccent: [234, 179, 8] as [number, number, number],
      ok: [6, 95, 70] as [number, number, number],
      okAccent: [16, 185, 129] as [number, number, number],
      chipBg: [238, 242, 255] as [number, number, number],
      chipText: [67, 56, 202] as [number, number, number],
      chipOkBg: [220, 252, 231] as [number, number, number],
      chipOkText: [22, 101, 52] as [number, number, number],
      white: [255, 255, 255] as [number, number, number],
    };

    const setFill = (c: [number, number, number]) => doc.setFillColor(c[0], c[1], c[2]);
    const setDraw = (c: [number, number, number]) => doc.setDrawColor(c[0], c[1], c[2]);
    const setText = (c: [number, number, number]) => doc.setTextColor(c[0], c[1], c[2]);

    let y = M;

    const newPage = () => {
      doc.addPage();
      y = M;
    };

    const ensureSpace = (needed: number) => {
      if (y + needed > BOTTOM) newPage();
    };

    // Draw one wrapped block of text; auto page-break line by line
    const writeWrapped = (
      text: string,
      x: number,
      maxW: number,
      lineH: number
    ) => {
      const lines = doc.splitTextToSize(text || "", maxW) as string[];
      for (const ln of lines) {
        ensureSpace(lineH);
        doc.text(ln, x, y);
        y += lineH;
      }
    };

    const drawChips = (
      items: string[],
      startX: number,
      maxW: number,
      bg: [number, number, number],
      fg: [number, number, number]
    ) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      const padX = 2.4;
      const gap = 2;
      const rowH = 5.2; // full row height for a chip
      const textOffset = 3.6; // baseline offset from row top
      let cx = startX;
      ensureSpace(rowH);
      // rowTop = y (top of current chip row); draw chips as top-anchored rects
      let rowTop = y;
      for (const raw of items) {
        const t = String(raw);
        const w = doc.getTextWidth(t) + padX * 2;
        if (cx + w > startX + maxW && cx !== startX) {
          rowTop += rowH + gap;
          cx = startX;
          if (rowTop + rowH > BOTTOM) {
            y = rowTop;
            newPage();
            rowTop = y;
          }
        }
        setFill(bg);
        doc.roundedRect(cx, rowTop, w, rowH, 1.2, 1.2, "F");
        setText(fg);
        doc.text(t, cx + padX, rowTop + textOffset);
        cx += w + gap;
      }
      y = rowTop + rowH + 2;
    };

    // ===== Header bar (only page 1) =====
    setFill(C.brand);
    doc.rect(0, 0, PAGE_W, 26, "F");
    setText(C.white);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("SkillTa", M, 15);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Career Roadmap", M, 21);
    doc.setFontSize(9);
    doc.text("skillta.tech", PAGE_W - M, 15, { align: "right" });
    doc.setFontSize(8);
    doc.text(new Date().toLocaleDateString(), PAGE_W - M, 21, { align: "right" });

    y = 38;

    // ===== Title =====
    setText(C.text);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    const titleLines = doc.splitTextToSize(career.title, CONTENT_W) as string[];
    titleLines.forEach((ln) => {
      ensureSpace(9);
      doc.text(ln, M, y);
      y += 8.5;
    });
    y += 1;

    setText(C.brandDark);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    writeWrapped(career.tagline, M, CONTENT_W, 5);
    y += 2;

    setText(C.muted);
    doc.setFontSize(10);
    writeWrapped(career.description, M, CONTENT_W, 4.8);
    y += 5;

    // ===== Quick Stats grid =====
    const stats: [string, string][] = [
      ["Timeline", career.estimatedTime],
      ["Demand", career.demandLevel],
      ["Difficulty", career.learningDifficulty],
      ["Entry Barrier", career.realityCheck.entryBarrier],
    ];
    const cardGap = 3;
    const cardW = (CONTENT_W - cardGap * 3) / 4;
    const cardH = 18;
    ensureSpace(cardH + 3);
    const gridTop = y;
    stats.forEach(([label, val], i) => {
      const x = M + i * (cardW + cardGap);
      setFill(C.card);
      setDraw(C.subtle);
      doc.setLineWidth(0.3);
      doc.roundedRect(x, gridTop, cardW, cardH, 2, 2, "FD");
      setText(C.muted);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text(label, x + 3, gridTop + 5);
      setText(C.text);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      const vLines = (doc.splitTextToSize(val, cardW - 6) as string[]).slice(0, 2);
      vLines.forEach((ln, idx) => doc.text(ln, x + 3, gridTop + 11 + idx * 4));
    });
    y = gridTop + cardH + 10;

    // ===== Section title (accent bar + heading) =====
    const sectionTitle = (title: string, accent: [number, number, number] = C.brand) => {
      ensureSpace(14);
      setFill(accent);
      doc.rect(M, y - 4, 2, 6, "F");
      setText(C.text);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text(title, M + 5, y);
      y += 8;
    };

    sectionTitle("Learning Roadmap");

    // ===== Phases =====
    career.roadmap.forEach((phase, idx) => {
      // Phase header row
      ensureSpace(14);
      const headerTop = y;
      const circleY = headerTop + 2;

      setFill(C.brand);
      doc.circle(M + 4, circleY, 3.4, "F");
      setText(C.white);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(String(phase.phase), M + 4, circleY + 1.4, { align: "center" });

      setText(C.text);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      const titleMaxW = CONTENT_W - 12 - 40;
      const pTitle = (doc.splitTextToSize(phase.title, titleMaxW) as string[])[0];
      doc.text(pTitle, M + 10, circleY + 1.4);

      setText(C.muted);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(phase.duration, PAGE_W - M, circleY + 1.4, { align: "right" });

      y = headerTop + 9;

      // Items
      phase.items.forEach((item) => {
        ensureSpace(10);
        setText(C.text);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        // bullet
        setFill(C.brand);
        doc.circle(M + 4, y - 1.2, 0.9, "F");
        setText(C.text);
        const nameLines = doc.splitTextToSize(item.name, CONTENT_W - 10) as string[];
        nameLines.forEach((ln, i) => {
          if (i > 0) ensureSpace(5);
          doc.text(ln, M + 8, y);
          y += 4.6;
        });
        setText(C.muted);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        writeWrapped(item.description, M + 8, CONTENT_W - 10, 4.2);
        y += 1.5;
      });

      // Resources
      if (phase.resources?.length) {
        ensureSpace(10);
        setText(C.brandDark);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.text("Resources", M + 4, y);
        y += 3.8;
        drawChips(phase.resources, M + 4, CONTENT_W - 4, C.chipBg, C.chipText);
      }

      // Projects
      if (phase.projects?.length) {
        ensureSpace(10);
        setText(C.ok);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.text("Projects", M + 4, y);
        y += 3.8;
        drawChips(phase.projects, M + 4, CONTENT_W - 4, C.chipOkBg, C.chipOkText);
      }

      // Divider between phases (skip after last)
      if (idx < career.roadmap.length - 1) {
        y += 3;
        ensureSpace(4);
        setDraw(C.subtle);
        doc.setLineWidth(0.2);
        doc.line(M, y, PAGE_W - M, y);
        y += 6;
      } else {
        y += 4;
      }
    });

    // ===== Reality Check =====
    ensureSpace(30);
    sectionTitle("Reality Check", C.warnAccent);

    const rcRow = (label: string, val: string) => {
      ensureSpace(7);
      setText(C.warn);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.text(`${label}`, M, y);
      const labelW = doc.getTextWidth(label) + 2;
      setText(C.text);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      // If label + value fits on one line, keep inline; else wrap under
      const inlineMaxW = CONTENT_W - labelW - 2;
      const firstLine = (doc.splitTextToSize(val, inlineMaxW) as string[])[0];
      const fullLines = doc.splitTextToSize(val, CONTENT_W) as string[];
      if (fullLines.length === 1 && doc.getTextWidth(firstLine) <= inlineMaxW) {
        doc.text(val, M + labelW, y);
        y += 5.5;
      } else {
        y += 5;
        writeWrapped(val, M, CONTENT_W, 4.6);
        y += 1;
      }
    };
    rcRow("Competition:", career.realityCheck.competition);
    rcRow("Entry Barrier:", career.realityCheck.entryBarrier);
    rcRow("Salary Expectation:", career.realityCheck.salaryExpectation);

    y += 2;
    // Honest note in a soft callout
    ensureSpace(12);
    const noteLines = doc.splitTextToSize(
      `"${career.realityCheck.honestNote}"`,
      CONTENT_W - 6
    ) as string[];
    const noteH = noteLines.length * 4.6 + 6;
    ensureSpace(noteH);
    setFill([254, 252, 232]);
    doc.roundedRect(M, y, CONTENT_W, noteH, 2, 2, "F");
    setFill(C.warnAccent);
    doc.rect(M, y, 1.6, noteH, "F");
    setText(C.warn);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9.5);
    let noteY = y + 5;
    noteLines.forEach((ln) => {
      doc.text(ln, M + 4, noteY);
      noteY += 4.6;
    });
    y += noteH + 8;

    // ===== Salary =====
    ensureSpace(40);
    sectionTitle("Salary Range", C.okAccent);

    const halfGap = 4;
    const halfW = (CONTENT_W - halfGap) / 2;
    const salCardH = 20;
    ensureSpace(salCardH + 3);
    const salTop = y;

    [
      { label: "India", val: career.salaryIndia, x: M },
      { label: "Global", val: career.salaryGlobal, x: M + halfW + halfGap },
    ].forEach(({ label, val, x }) => {
      setFill([236, 253, 245]);
      setDraw(C.okAccent);
      doc.setLineWidth(0.3);
      doc.roundedRect(x, salTop, halfW, salCardH, 2, 2, "FD");
      setText(C.ok);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text(label, x + 4, salTop + 6);
      setText(C.text);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      const vLines = (doc.splitTextToSize(val, halfW - 8) as string[]).slice(0, 2);
      vLines.forEach((ln, i) => doc.text(ln, x + 4, salTop + 12.5 + i * 5));
    });
    y = salTop + salCardH + 6;

    ensureSpace(10);
    setText(C.ok);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text("Growth Potential", M, y);
    y += 5;
    setText(C.text);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    writeWrapped(career.growthPotential, M, CONTENT_W, 4.6);
    y += 4;

    // ===== Footer on every page =====
    const total = doc.getNumberOfPages();
    for (let i = 1; i <= total; i++) {
      doc.setPage(i);
      setDraw(C.subtle);
      doc.setLineWidth(0.2);
      doc.line(M, PAGE_H - 12, PAGE_W - M, PAGE_H - 12);
      setText(C.muted);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text("Generated by SkillTa — skillta.tech", M, PAGE_H - 7);
      doc.text(`Page ${i} of ${total}`, PAGE_W - M, PAGE_H - 7, { align: "right" });
    }

    doc.save(`${career.title}-Roadmap-SkillTa.pdf`);
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

          {/* Sponsored - Native Banner (between Reality Check & Salary Range) */}
          <AdsterraNativeBanner />

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
