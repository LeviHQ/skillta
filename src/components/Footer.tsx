import { Link } from "react-router-dom";
import { Mail, Heart, ArrowUpRight } from "lucide-react";
import logo from "@/assets/logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/80 backdrop-blur-sm no-print">
      <div className="container mx-auto px-6 py-14">
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4">
            <Link to="/" className="flex items-center gap-2.5 mb-5 group">
              <img
                src={logo}
                alt="SkillTa Logo"
                className="w-9 h-9 rounded-lg object-contain transition-transform group-hover:scale-110"
              />
              <span className="text-xl font-bold text-foreground tracking-tight">
                Skill<span className="text-gradient">Ta</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-6">
              AI-powered career guidance to help you discover the perfect tech career path. Take the quiz, get your roadmap, start your journey.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://x.com/SkilltaTech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                aria-label="X (Twitter)"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a
                href="mailto:adarshmishra70931@gmail.com"
                className="w-9 h-9 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-semibold text-foreground mb-4 text-xs uppercase tracking-widest">
              Product
            </h4>
            <nav className="flex flex-col gap-3">
              <Link to="/quiz" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group">
                Career Quiz
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link to="/roadmaps" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group">
                Roadmap Library
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group">
                Dashboard
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </nav>
          </div>

          {/* Popular Paths Column */}
          <div className="col-span-1 md:col-span-3">
            <h4 className="font-semibold text-foreground mb-4 text-xs uppercase tracking-widest">
              Popular Paths
            </h4>
            <nav className="flex flex-col gap-3">
              <Link to="/roadmaps/frontend-developer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Frontend Development
              </Link>
              <Link to="/roadmaps/backend-developer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Backend Development
              </Link>
              <Link to="/roadmaps/data-scientist" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Data Science
              </Link>
              <Link to="/roadmaps/cybersecurity-analyst" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Cybersecurity
              </Link>
            </nav>
          </div>

          {/* Company Column */}
          <div className="col-span-1 md:col-span-3">
            <h4 className="font-semibold text-foreground mb-4 text-xs uppercase tracking-widest">
              Company
            </h4>
            <nav className="flex flex-col gap-3">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact Us
              </Link>
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © {currentYear} SkillTa. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> to help you find your path in tech
            </p>
            <div className="flex items-center gap-4">
              <Link to="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                Terms
              </Link>
              <span className="text-muted-foreground/30">·</span>
              <Link to="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
