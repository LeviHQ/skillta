import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X, User, LayoutDashboard } from "lucide-react";
import logo from "@/assets/logo.png";
import { useAuth } from "@/contexts/AuthContext";
import SignInModal from "./SignInModal";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Career Quiz", path: "/quiz" },
  { label: "Roadmap Library", path: "/roadmaps" },
  { label: "Pricing", path: "/#pricing" },
  { label: "About", path: "/about" },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const { user } = useAuth();

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
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
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
              {navLinks.map((link) => (
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
              ))}
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
