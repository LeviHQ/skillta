import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Globe, Search, ChevronDown, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { COUNTRIES } from "@/data/countries";

/**
 * Glassmorphism country dropdown for the navbar.
 * - Search-first UI
 * - Shows ~5 items at a time; scrolls for more
 * - Friendly "we're working on it" state for unlisted countries
 */
export default function CountryDropdown({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    if (variant !== "desktop") return;
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [variant]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter((c) => c.name.toLowerCase().includes(q) || c.slug.includes(q));
  }, [query]);

  const showEmpty = query.trim().length > 0 && filtered.length === 0;

  if (variant === "mobile") {
    return (
      <div className="flex flex-col gap-2">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <span className="flex items-center gap-2"><Globe className="w-4 h-4" /> Country</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="pl-3 flex flex-col gap-1 border-l border-border ml-4">
            <div className="relative px-2 pb-2">
              <Search className="w-3.5 h-3.5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search country..."
                className="w-full pl-8 pr-3 py-2 rounded-md bg-background/60 border border-border text-sm focus:outline-none focus:border-primary/60"
              />
            </div>
            <div className="max-h-64 overflow-y-auto pr-1">
              {filtered.map((c) => (
                <Link
                  key={c.slug}
                  to={`/${c.slug}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <span className="text-lg leading-none">{c.flag}</span>
                  <span className="truncate">{c.name}</span>
                </Link>
              ))}
              {showEmpty && (
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/30 text-xs text-primary flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  <span>We're working on <b>{query}</b> soon! Meanwhile, explore any of our 50 supported countries.</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors text-muted-foreground hover:text-foreground`}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Globe className="w-4 h-4 mr-1" /> Country
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-80 glass border border-border rounded-xl shadow-2xl overflow-hidden"
            role="menu"
          >
            <div className="p-3 border-b border-border bg-primary/5">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search 50+ countries..."
                  className="w-full pl-10 pr-3 py-2 rounded-lg bg-background/70 backdrop-blur border border-border text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30"
                />
              </div>
              <p className="text-[10px] text-muted-foreground mt-2 tracking-wide uppercase">Complete tech ecosystem per country</p>
            </div>

            {/* 5 items visible at once — 5 * ~56px = ~280px */}
            <div className="max-h-[280px] overflow-y-auto scrollbar-thin py-1">
              {filtered.map((c) => (
                <Link
                  key={c.slug}
                  to={`/${c.slug}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-primary/10 transition-colors group border-b border-border/40 last:border-0"
                >
                  <span className="text-2xl leading-none">{c.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                      {c.name}
                    </div>
                    <div className="text-[10px] text-muted-foreground truncate">
                      {c.techHubs.slice(0, 2).join(" · ")}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    /{c.slug}
                  </span>
                </Link>
              ))}
              {showEmpty && (
                <div className="m-3 p-4 rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/30">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-semibold text-foreground mb-1">
                        We're working on <span className="text-primary">{query}</span> too! 🎉
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Your country will be added soon. Meanwhile, explore any of our 50 supported countries.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-2 border-t border-border bg-background/40 text-[10px] text-muted-foreground text-center">
              Scroll for more · 50 countries live
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
