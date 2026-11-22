import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, BarChart3, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeaturedTicker } from "@/components/FeaturedTicker";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-hero">
      
      {/* 100% Full Screen Edge-to-Edge Golden Foil Ribbon */}
      <a
        href="#pricing"
        className="group relative z-30 block w-full overflow-hidden border-b border-amber-500/60 shadow-[0_4px_30px_rgba(234,179,8,0.35)]"
      >
        <div className="relative w-full bg-gradient-to-r from-[#C59B27] via-[#FFF3B3] to-[#AA771C] px-4 py-3 sm:py-3.5 text-stone-950 shadow-inner">
          
          {/* Continuous Slow-Motion Shimmer Sweep */}
          <motion.div
            className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/85 to-transparent pointer-events-none"
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{
              repeat: Infinity,
              duration: 3.5,
              ease: "easeInOut",
              repeatDelay: 0.8,
            }}
          />

          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
            
            {/* Offer details with $1.50 and $5 */}
            <div className="relative z-10 flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 text-xs sm:text-sm">
              <span className="flex items-center gap-1.5 rounded-full bg-stone-950 px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider text-amber-300 shadow">
                🎉 NEW YEAR 2027 SALE
              </span>
              <span className="font-extrabold uppercase tracking-tight text-stone-950">
                90% Launch OFF + Extra 50% New Year OFF
              </span>
              <span className="hidden lg:inline text-stone-950/40">|</span>
              <span className="font-bold text-stone-900">
                Pro at just <span className="font-black text-stone-950 bg-stone-950/15 px-1.5 py-0.5 rounded border border-stone-950/20">$1.50</span> · Lifetime at just <span className="font-black text-stone-950 bg-stone-950/15 px-1.5 py-0.5 rounded border border-stone-950/20">$5</span>
              </span>
            </div>

            {/* Code SKILLTA50 and Button */}
            <div className="relative z-10 flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <div className="flex items-center gap-1.5 rounded-lg border border-dashed border-stone-950/50 bg-stone-950/15 px-2.5 py-1 font-mono text-xs font-black text-stone-950">
                <span className="text-[10px] uppercase font-bold text-stone-800">Code:</span>
                <span className="tracking-wider text-stone-950">SKILLTA50</span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-stone-950 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-amber-300 shadow-md group-hover:bg-stone-900 transition-colors">
                Claim Offer →
              </span>
            </div>

          </div>
        </div>
      </a>

      <div className="absolute inset-0 grid-pattern opacity-25" />
      <div className="container relative z-10 mx-auto px-6 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="mb-7 inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/5 px-3 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="font-mono text-[11px] font-bold uppercase text-primary">
                Your career intelligence workspace
              </span>
            </div>

            <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-[1.08] text-foreground sm:text-5xl md:text-7xl">
              Build a tech career with
              <span className="mt-2 block text-gradient">clarity, proof, and momentum.</span>
            </h1>

            <p className="mx-auto mb-8 mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Find your best-fit role, audit your resume, close skill gaps, and track every improvement
              from one focused career suite.
            </p>

            <div className="mb-11 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="group shadow-glow">
                <Link to="/quiz">
                  Start Career Quiz
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
              size="lg"
              variant="outline"
              className="bg-card/70"
              onClick={() => {
                document.getElementById("sample-results")?.scrollIntoView({ behavior: "smooth" });
              }}
              >
  Explore Sample Results
  <ArrowDown />
</Button>
            </div>

            {/* Featured Marquee Ticker */}
            <FeaturedTicker />

            <div className="mx-auto max-w-4xl border-t border-border pt-8">
              <div className="grid overflow-hidden rounded-lg border border-border bg-card text-left shadow-card md:grid-cols-[1.1fr_0.9fr]">
                <div className="border-b border-border p-5 sm:p-6 md:border-b-0 md:border-r">
                  <div className="mb-6 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10">
                        <BarChart3 className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">Career DNA Report</p>
                        <p className="font-mono text-[10px] uppercase text-muted-foreground">Illustrative preview</p>
                      </div>
                    </div>
                    <span className="font-mono text-xl font-bold text-primary">92%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-[92%] rounded-full bg-gradient-primary" />
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-4">
                    <span className="text-sm text-muted-foreground">Top career match</span>
                    <span className="text-sm font-bold text-foreground">AI Engineer</span>
                  </div>
                </div>
                <div className="grid gap-3 p-5 sm:grid-cols-3 sm:p-6 md:grid-cols-1">
                  {["Role match explained", "Skill gaps prioritized", "Roadmap ready to follow"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-foreground/85">
                      <Check className="h-4 w-4 shrink-0 text-success" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
