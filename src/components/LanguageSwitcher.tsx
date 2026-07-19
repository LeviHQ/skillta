import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown, Check } from "lucide-react";

type Lang = { code: string; label: string; native: string; flag: string };

// Google Translate language codes
const LANGUAGES: Lang[] = [
  { code: "en", label: "English", native: "English", flag: "🇬🇧" },
  { code: "hi", label: "Hindi", native: "हिंदी", flag: "🇮🇳" },
  { code: "es", label: "Spanish", native: "Español", flag: "🇪🇸" },
  { code: "fr", label: "French", native: "Français", flag: "🇫🇷" },
  { code: "de", label: "German", native: "Deutsch", flag: "🇩🇪" },
  { code: "zh-CN", label: "Chinese", native: "中文", flag: "🇨🇳" },
  { code: "ja", label: "Japanese", native: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "Korean", native: "한국어", flag: "🇰🇷" },
  { code: "ar", label: "Arabic", native: "العربية", flag: "🇸🇦" },
  { code: "ru", label: "Russian", native: "Русский", flag: "🇷🇺" },
  { code: "pt", label: "Portuguese", native: "Português", flag: "🇵🇹" },
  { code: "it", label: "Italian", native: "Italiano", flag: "🇮🇹" },
  { code: "tr", label: "Turkish", native: "Türkçe", flag: "🇹🇷" },
  { code: "nl", label: "Dutch", native: "Nederlands", flag: "🇳🇱" },
  { code: "id", label: "Indonesian", native: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "vi", label: "Vietnamese", native: "Tiếng Việt", flag: "🇻🇳" },
  { code: "th", label: "Thai", native: "ไทย", flag: "🇹🇭" },
  { code: "bn", label: "Bengali", native: "বাংলা", flag: "🇧🇩" },
  { code: "ur", label: "Urdu", native: "اردو", flag: "🇵🇰" },
  { code: "fa", label: "Persian", native: "فارسی", flag: "🇮🇷" },
  { code: "pl", label: "Polish", native: "Polski", flag: "🇵🇱" },
  { code: "uk", label: "Ukrainian", native: "Українська", flag: "🇺🇦" },
  { code: "sv", label: "Swedish", native: "Svenska", flag: "🇸🇪" },
  { code: "ms", label: "Malay", native: "Bahasa Melayu", flag: "🇲🇾" },
  { code: "fil", label: "Filipino", native: "Filipino", flag: "🇵🇭" },
];

const STORAGE_KEY = "skillta_lang";

// Load the Google Translate widget script exactly once
let googleLoaded = false;
function loadGoogleTranslate() {
  if (googleLoaded || typeof window === "undefined") return;
  googleLoaded = true;

  // hidden target element for the Google widget
  if (!document.getElementById("google_translate_element")) {
    const el = document.createElement("div");
    el.id = "google_translate_element";
    el.style.display = "none";
    document.body.appendChild(el);
  }

  (window as any).googleTranslateElementInit = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const g = (window as any).google;
    if (!g?.translate) return;
    new g.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: LANGUAGES.map((l) => l.code).join(","),
        autoDisplay: false,
        layout: g.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      "google_translate_element"
    );

    // Re-apply saved language once widget is ready
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && saved !== "en") setLangCookie(saved);
  };

  const s = document.createElement("script");
  s.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  s.async = true;
  document.head.appendChild(s);
}

function setLangCookie(code: string) {
  // The Google Translate widget reacts to the "googtrans" cookie
  const val = code === "en" ? "" : `/en/${code}`;
  const domains = [window.location.hostname, "." + window.location.hostname];
  domains.forEach((d) => {
    document.cookie = `googtrans=${val}; path=/; domain=${d}`;
    document.cookie = `googtrans=${val}; path=/`;
  });
}

function applyLanguage(code: string) {
  localStorage.setItem(STORAGE_KEY, code);
  setLangCookie(code);
  // The widget applies translation on page load via cookie — reload to activate cleanly
  window.location.reload();
}

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Lang>(LANGUAGES[0]);
  const [query, setQuery] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadGoogleTranslate();
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const found = LANGUAGES.find((l) => l.code === saved);
      if (found) setCurrent(found);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const filtered = query
    ? LANGUAGES.filter(
        (l) =>
          l.label.toLowerCase().includes(query.toLowerCase()) ||
          l.native.toLowerCase().includes(query.toLowerCase())
      )
    : LANGUAGES;

  return (
    <div ref={wrapRef} className="relative notranslate" translate="no">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 rounded-lg border border-border bg-secondary/40 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors ${
          compact ? "px-2.5 py-1.5" : "px-3 py-2"
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
        title="Change language"
      >
        <Globe className="w-4 h-4 text-primary" />
        <span className="text-base leading-none">{current.flag}</span>
        {!compact && <span className="hidden lg:inline">{current.native}</span>}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-72 glass border border-border rounded-xl shadow-2xl overflow-hidden z-[60]"
            role="listbox"
          >
            <div className="p-2 border-b border-border">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search language…"
                className="w-full px-3 py-1.5 rounded-lg bg-background/60 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                autoFocus
              />
            </div>
            <div className="max-h-72 overflow-y-auto scrollbar-thin py-1">
              {filtered.length === 0 && (
                <div className="px-4 py-3 text-xs text-muted-foreground">No match.</div>
              )}
              {filtered.map((l) => {
                const active = l.code === current.code;
                return (
                  <button
                    key={l.code}
                    onClick={() => {
                      setOpen(false);
                      if (l.code !== current.code) applyLanguage(l.code);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors ${
                      active
                        ? "bg-primary/15 text-primary"
                        : "text-foreground hover:bg-primary/10 hover:text-primary"
                    }`}
                    role="option"
                    aria-selected={active}
                  >
                    <span className="text-lg leading-none">{l.flag}</span>
                    <span className="flex-1 text-left">
                      <span className="font-medium">{l.native}</span>
                      <span className="text-xs text-muted-foreground ml-2">{l.label}</span>
                    </span>
                    {active && <Check className="w-4 h-4" />}
                  </button>
                );
              })}
            </div>
            <div className="px-3 py-2 border-t border-border bg-background/40 text-[10px] text-muted-foreground text-center">
              Powered by Google Translate
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
