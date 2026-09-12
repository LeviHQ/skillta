import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  RotateCcw,
  MousePointerClick,
} from "lucide-react";

type Stage = {
  id: string;
  step: number;
  title: string;
  short: string;
  detail: string;
  points: string[];
  time: string;
  href: string;
  cta: string;
  x: number;
  y: number;
  tone: "primary" | "accent" | "success" | "warning";
};

const STAGES: Stage[] = [
  {
    id: "start",
    step: 1,
    title: "Start Free",
    short: "Sign in & activate",
    detail:
      "Sign in with Google and activate the Free plan in one click. No card, no trial trap — you get daily free attempts across every SkillTa tool.",
    points: ["Google sign-in", "Free plan in 1 click", "3 free attempts / day"],
    time: "1 min",
    href: "/#pricing",
    cta: "Activate free plan",
    x: 90,
    y: 300,
    tone: "primary",
  },
  {
    id: "quiz",
    step: 2,
    title: "Career Quiz",
    short: "Find your direction",
    detail:
      "A 10-question diagnostic quiz reads your interests, strengths and work style, then ranks the tech careers that actually fit you — with a match score for each.",
    points: ["10 smart questions", "Ranked career matches", "Match score + reasoning"],
    time: "5 min",
    href: "/quiz",
    cta: "Take the quiz",
    x: 330,
    y: 150,
    tone: "accent",
  },
  {
    id: "compare",
    step: 3,
    title: "Compare Careers",
    short: "Pick with evidence",
    detail:
      "Put two or three roles side by side — salary range, demand, difficulty, remote friendliness and growth — so you commit to one path with real data, not vibes.",
    points: ["Side-by-side metrics", "Salary & demand", "Difficulty vs growth"],
    time: "10 min",
    href: "/compare",
    cta: "Compare roles",
    x: 330,
    y: 450,
    tone: "warning",
  },
  {
    id: "roadmap",
    step: 4,
    title: "Career Roadmap",
    short: "Your week-by-week plan",
    detail:
      "Open the full roadmap for your role: phases, skills per phase, projects to build, free resources and a realistic timeline. Download it as a PDF and follow it offline.",
    points: ["Phase-wise plan", "Projects to build", "PDF download"],
    time: "3-9 months",
    href: "/roadmaps",
    cta: "Open roadmaps",
    x: 580,
    y: 300,
    tone: "primary",
  },
  {
    id: "gap",
    step: 5,
    title: "Skill Gap Analyzer",
    short: "Know what's missing",
    detail:
      "Enter your current skills and your target role. You get a gap score, the exact missing skills ranked by hiring impact, and what to learn first.",
    points: ["Gap score", "Missing skills ranked", "Learn-next order"],
    time: "5 min",
    href: "/skill-gap-analyzer",
    cta: "Analyse my gap",
    x: 830,
    y: 150,
    tone: "accent",
  },
  {
    id: "resume",
    step: 6,
    title: "Resume Reviewer",
    short: "Get past the filter",
    detail:
      "AI reviews your resume like a recruiter and an ATS at once: formatting, keywords, impact lines and red flags — with a rewritten version of weak bullet points.",
    points: ["ATS score", "Line-by-line feedback", "Downloadable report"],
    time: "10 min",
    href: "/resume-reviewer",
    cta: "Review my resume",
    x: 830,
    y: 450,
    tone: "success",
  },
  {
    id: "country",
    step: 7,
    title: "Country Ecosystem",
    short: "Localise everything",
    detail:
      "Choose your country and every piece of guidance re-shapes around it: local salaries, hiring companies, visa and relocation notes, resume rules and interview patterns.",
    points: ["Local salary data", "Hiring companies", "Visa & resume rules"],
    time: "Ongoing",
    href: "/usa",
    cta: "Explore ecosystems",
    x: 1080,
    y: 300,
    tone: "warning",
  },
  {
    id: "hired",
    step: 8,
    title: "Interview & Offer",
    short: "Land the role",
    detail:
      "Practice country-specific interview questions — coding, system design and behavioural — track every attempt in your dashboard, and walk in prepared.",
    points: ["Round-wise practice", "Attempt history", "Progress analytics"],
    time: "2-6 weeks",
    href: "/dashboard",
    cta: "Open dashboard",
    x: 1320,
    y: 300,
    tone: "success",
  },
];

const EDGES: [string, string][] = [
  ["start", "quiz"],
  ["start", "compare"],
  ["quiz", "roadmap"],
  ["compare", "roadmap"],
  ["roadmap", "gap"],
  ["roadmap", "resume"],
  ["gap", "country"],
  ["resume", "country"],
  ["country", "hired"],
];

const toneClass: Record<Stage["tone"], { text: string; ring: string; fill: string }> = {
  primary: { text: "text-primary", ring: "border-primary/50", fill: "hsl(var(--primary))" },
  accent: { text: "text-accent", ring: "border-accent/50", fill: "hsl(var(--accent))" },
  success: { text: "text-success", ring: "border-success/50", fill: "hsl(var(--success))" },
  warning: { text: "text-warning", ring: "border-warning/50", fill: "hsl(var(--warning))" },
};

const NODE_W = 190;
const NODE_H = 96;
const WORLD_W = 1520;
const WORLD_H = 620;
const MIN_ZOOM = 0.35;
const MAX_ZOOM = 2.5;

const byId = (id: string) => STAGES.find((s) => s.id === id)!;

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

export default function JourneyMapSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(0.7);
  const [offset, setOffset] = useState({ x: 20, y: 10 });
  const [active, setActive] = useState<Stage>(STAGES[0]);
  const [fullscreen, setFullscreen] = useState(false);
  const dragRef = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const movedRef = useRef(false);

  const fit = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const z = clamp(Math.min(rect.width / WORLD_W, rect.height / WORLD_H) * 0.96, MIN_ZOOM, MAX_ZOOM);
    setZoom(z);
    setOffset({
      x: (rect.width - WORLD_W * z) / 2,
      y: (rect.height - WORLD_H * z) / 2,
    });
  }, []);

  useEffect(() => {
    fit();
  }, [fit, fullscreen]);

  // Wheel zoom anchored at cursor (native non-passive listener).
  const stateRef = useRef({ zoom, offset });
  stateRef.current = { zoom, offset };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const { zoom: z, offset: o } = stateRef.current;
      const dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 100 : 1);
      const next = clamp(z * Math.exp(-dy * 0.0018), MIN_ZOOM, MAX_ZOOM);
      const rect = el.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      const k = next / z;
      setZoom(next);
      setOffset({ x: px - (px - o.x) * k, y: py - (py - o.y) * k });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const zoomBy = (factor: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const { zoom: z, offset: o } = stateRef.current;
    const next = clamp(z * factor, MIN_ZOOM, MAX_ZOOM);
    const px = rect.width / 2;
    const py = rect.height / 2;
    const k = next / z;
    setZoom(next);
    setOffset({ x: px - (px - o.x) * k, y: py - (py - o.y) * k });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    movedRef.current = false;
    dragRef.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (Math.abs(dx) + Math.abs(dy) > 4) movedRef.current = true;
    setOffset({ x: d.ox + dx, y: d.oy + dy });
  };
  const onPointerUp = () => {
    dragRef.current = null;
  };

  const edgePath = (a: Stage, b: Stage) => {
    const x1 = a.x + NODE_W / 2;
    const y1 = a.y;
    const x2 = b.x - NODE_W / 2;
    const y2 = b.y;
    const mx = (x1 + x2) / 2;
    return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
  };

  return (
    <section className="py-24 bg-background" id="how-to-use">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How to Use <span className="text-gradient">SkillTa</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The complete journey map from absolute beginner to hired — every stage of the
            platform, in order. Drag to move, scroll or pinch to zoom, tap any stage for details.
          </p>
        </motion.div>

        <div
          className={
            fullscreen
              ? "fixed inset-0 z-[100] bg-background p-4 flex flex-col gap-4 lg:flex-row"
              : "grid lg:grid-cols-[1fr_320px] gap-4 max-w-6xl mx-auto"
          }
        >
          {/* Map canvas */}
          <div
            ref={containerRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            className={`relative overflow-hidden rounded-2xl border border-border bg-gradient-card cursor-grab active:cursor-grabbing touch-none select-none ${
              fullscreen ? "flex-1" : "h-[440px] md:h-[520px]"
            }`}
          >
            {/* grid backdrop */}
            <div
              className="absolute inset-0 opacity-[0.18]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)",
                backgroundSize: `${28 * zoom}px ${28 * zoom}px`,
                backgroundPosition: `${offset.x}px ${offset.y}px`,
              }}
            />

            <div
              className="absolute top-0 left-0 origin-top-left"
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                width: WORLD_W,
                height: WORLD_H,
              }}
            >
              <svg
                width={WORLD_W}
                height={WORLD_H}
                className="absolute inset-0 pointer-events-none"
              >
                {EDGES.map(([a, b]) => {
                  const A = byId(a);
                  const B = byId(b);
                  const on = active.id === a || active.id === b;
                  return (
                    <path
                      key={`${a}-${b}`}
                      d={edgePath(A, B)}
                      fill="none"
                      stroke={on ? "hsl(var(--primary))" : "hsl(var(--border))"}
                      strokeWidth={on ? 2.5 : 1.5}
                      strokeDasharray="6 6"
                      opacity={on ? 1 : 0.7}
                    />
                  );
                })}
              </svg>

              {STAGES.map((s) => {
                const isActive = active.id === s.id;
                const tone = toneClass[s.tone];
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      if (!movedRef.current) setActive(s);
                    }}
                    style={{
                      left: s.x - NODE_W / 2,
                      top: s.y - NODE_H / 2,
                      width: NODE_W,
                      height: NODE_H,
                    }}
                    className={`absolute text-left rounded-xl glass border p-3 transition-all ${
                      isActive
                        ? `${tone.ring} shadow-glow scale-[1.03]`
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`w-6 h-6 shrink-0 rounded-full bg-gradient-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center`}
                      >
                        {s.step}
                      </span>
                      <span className="text-sm font-semibold text-foreground truncate">
                        {s.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-snug">{s.short}</p>
                    <p className={`mt-1 text-[10px] font-mono ${tone.text}`}>{s.time}</p>
                  </button>
                );
              })}
            </div>

            {/* Controls */}
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              <button
                type="button"
                aria-label="Zoom in"
                onClick={() => zoomBy(1.25)}
                className="w-9 h-9 rounded-lg glass border border-border flex items-center justify-center text-foreground hover:border-primary/50"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="Zoom out"
                onClick={() => zoomBy(1 / 1.25)}
                className="w-9 h-9 rounded-lg glass border border-border flex items-center justify-center text-foreground hover:border-primary/50"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="Reset view"
                onClick={fit}
                className="w-9 h-9 rounded-lg glass border border-border flex items-center justify-center text-foreground hover:border-primary/50"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label={fullscreen ? "Exit full screen" : "Full screen"}
                onClick={() => setFullscreen((f) => !f)}
                className="w-9 h-9 rounded-lg glass border border-border flex items-center justify-center text-foreground hover:border-primary/50"
              >
                {fullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>

            <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-border text-[10px] font-mono text-muted-foreground">
              <MousePointerClick className="w-3 h-3 text-primary" />
              Drag · Scroll to zoom · Tap a stage
              <span className="text-primary">{Math.round(zoom * 100)}%</span>
            </div>
          </div>

          {/* Detail panel */}
          <div
            className={`rounded-2xl border border-border bg-gradient-card p-5 ${
              fullscreen ? "lg:w-[340px] overflow-y-auto" : ""
            }`}
          >
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
              Stage {active.step} of {STAGES.length} · {active.time}
            </div>
            <h3 className={`text-xl font-bold mb-2 ${toneClass[active.tone].text}`}>
              {active.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{active.detail}</p>
            <ul className="space-y-2 mb-5">
              {active.points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-xs text-foreground">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
            <Link
              to={active.href}
              className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              {active.cta}
            </Link>
            <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-1.5">
              {STAGES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActive(s)}
                  className={`w-7 h-7 rounded-lg text-[11px] font-mono border transition-colors ${
                    active.id === s.id
                      ? "border-primary text-primary bg-primary/10"
                      : "border-border text-muted-foreground hover:border-primary/40"
                  }`}
                  aria-label={s.title}
                >
                  {s.step}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
