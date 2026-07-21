import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X, LayoutDashboard, ChevronDown, Brain, TrendingUp, Icon, BookOpen, ArrowLeftRight, FileText, Target } from "lucide-react";
import logo from "@/assets/logo.png";
import { useAuth } from "@/contexts/AuthContext";
import { usePlan } from "@/contexts/PlanContext";
import SignInModal from "./SignInModal";
import CountryDropdown from "./CountryDropdown";


const navLinks = [
  { label: "Home", path: "/" },
  { label: "Blog", path: "/blog" },
  { label: "Our Story", path: "/story" },
  { label: "About", path: "/about" },
  { label: "Contact Us", path: "/contact" },
];

const services = [
  { label: "AI-Powered Career Quiz", path: "/quiz", desc: "Find your best-fit tech career in 5 minutes.", Icon: Brain },
  { label: "AI Resume Reviewer", path: "/resume-reviewer", desc: "Instant ATS score, keyword gaps and bullet rewrites — free.", Icon: FileText },
  { label: "Skill Gap Analyzer", path: "/skill-gap-analyzer", desc: "See exactly what to learn next for your target role.", Icon: Target },
  { label: "Salary Predictor", path: "/salary-predictor", desc: "Real 2025-2026 market salary + growth advice.", Icon: TrendingUp },
  { label: "Roadmap Library", path: "/roadmaps", desc: "60+ curated step-by-step roadmaps with resources, projects and salary info.", Icon: BookOpen},
  { label: "Compare Careers", path: "/compare", desc: "Side-by-side comparison of any two tech careers — salary, demand, difficulty.", Icon: ArrowLeftRight}
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const { user } = useAuth();
  const { plan } = usePlan();

  const handleNavClick = (path: string) => {
    if (path.startsWith("/#")) {
      const id = path.slice(2);
      if (location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 300);
      }
      return true;
    }
    return false;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass no-print">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logo} alt="SkillTa Logo" className="w-8 h-8 rounded-lg object-contain" />
            <span className="text-lg font-bold text-foreground">
              Skill<span className="text-gradient">Ta</span>
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, idx) => {
              const isActive = location.pathname === link.path;
              const linkEl = (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );

              // Insert Services dropdown right after "Home"
              if (idx === 1) {
                return (
                  <div key="__wrap" className="flex items-center">
                    <div
                      className="relative"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <button
                        onClick={() => setServicesOpen((v) => !v)}
                        className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          services.some((s) => s.path === location.pathname)
                            ? "text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                        aria-haspopup="menu"
                        aria-expanded={servicesOpen}
                      >
                        Services <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.15 }}
                            className={`absolute left-0 top-full mt-2 glass border border-border rounded-xl p-2 shadow-xl grid grid-flow-col grid-rows-4 auto-cols-[20rem] gap-1`}
                            role="menu"
                          >
                            {services.map(({ label, path, desc, Icon }) => (
                              <Link
                                key={path}
                                to={path}
                                onClick={() => setServicesOpen(false)}
                                className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors group"
                              >
                                <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                                  <Icon className="w-4.5 h-4.5 text-primary" />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{label}</div>
                                  <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
                                </div>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    {linkEl}
                  </div>
                );
              }
              return linkEl;
            })}
            <CountryDropdown variant="desktop" />
          </div>

          <div className="hidden md:flex items-center gap-3">


            {user ? (
              <>
                {plan && (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/15 text-primary border border-primary/30">
                    {plan.name} Plan
                  </span>
                )}
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="" className="w-5 h-5 rounded-full" />
                  ) : (
                    <LayoutDashboard className="w-4 h-4" />
                  )}
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowSignIn(true)}
                  className="px-4 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                >
                  Sign In
                </button>
                <Link
                  to="/quiz"
                  className="px-5 py-2 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Take the Quiz
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden glass border-t border-border"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-2">
              {navLinks.map((link, idx) => {
                const linkEl = (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === link.path
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
                if (idx === 1) {
                  return (
                    <div key="__m_wrap" className="flex flex-col gap-2">
                      <button
                        onClick={() => setMobileServicesOpen((v) => !v)}
                        className="flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground"
                      >
                        Services
                        <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
                      </button>
                      {mobileServicesOpen && (
                        <div className="pl-3 flex flex-col gap-1 border-l border-border ml-4">
                          {services.map(({ label, path, Icon }) => (
                            <Link
                              key={path}
                              to={path}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                            >
                              <Icon className="w-4 h-4 text-primary" /> {label}
                            </Link>
                          ))}
                        </div>
                      )}
                      {linkEl}
                    </div>
                  );
                }
                return linkEl;
              })}
              <CountryDropdown variant="mobile" />
              {user ? (
                <Link
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-semibold text-center"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => { setShowSignIn(true); setMobileOpen(false); }}
                    className="px-4 py-3 rounded-lg border border-border text-sm font-medium text-muted-foreground text-center"
                  >
                    Sign In
                  </button>
                  <Link
                    to="/quiz"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-semibold text-center"
                  >
                    Take the Quiz
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </nav>

      <SignInModal open={showSignIn} onClose={() => setShowSignIn(false)} />
    </>
  );
}
