import { Link } from "react-router-dom";
import { Mail, Heart, ArrowUpRight, ShieldCheck, Lock, CreditCard } from "lucide-react";
import logo from "@/assets/logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/80 backdrop-blur-sm no-print">
      <div className="container mx-auto px-6 py-14">
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3">
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
                href="https://x.com/AdarshMi18"
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
              <Link to="/compare" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group">
                Compare Careers
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group">
                Blog & Guides
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
              <Link to="/salary-predictor" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Salary Predictor
              </Link>
              <Link to="/resume-reviewer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                AI Resume Reviewer
              </Link>
              <Link to="/skill-gap-analyzer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Skill Gap Analyzer
              </Link>
              <Link to="/resume-version-control" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Resume Version Control
              </Link>

            </nav>

            <h4 className="font-semibold text-foreground mt-8 mb-4 text-xs uppercase tracking-widest">
              Top Countries
            </h4>
            <nav className="flex flex-wrap gap-x-4 gap-y-2">
              {[
                { slug: "usa", name: "USA" },
                { slug: "united-kingdom", name: "UK" },
                { slug: "canada", name: "Canada" },
                { slug: "germany", name: "Germany" },
                { slug: "australia", name: "Australia" },
                { slug: "india", name: "India" },
                { slug: "uae", name: "UAE" },
                { slug: "singapore", name: "Singapore" },
              ].map((c) => (
                <Link
                  key={c.slug}
                  to={`/${c.slug}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {c.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Alternatives Column */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-semibold text-foreground mb-4 text-xs uppercase tracking-widest">
              Alternatives
            </h4>
            <nav className="flex flex-col gap-3">
              <Link to="/vs/roadmap-sh" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group">
                vs Roadmap.sh
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link to="/vs/careerexplorer" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group">
                vs CareerExplorer
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link to="/vs/coding-bootcamps" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group">
                vs Coding Bootcamps
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link to="/vs/leetcode" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group">
                vs LeetCode
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link to="/vs/coursera" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group">
                vs Coursera
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link to="/vs/freecodecamp" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group">
                vs freeCodeCamp
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link to="/vs/levels-fyi" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group">
                vs Levels.fyi
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </nav>
          </div>

          {/* Company Column */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-semibold text-foreground mb-4 text-xs uppercase tracking-widest">
              Company
            </h4>
            <nav className="flex flex-col gap-3">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/research" className="text-sm text-muted-foreground hover:text-primary transition-colors">Research</Link>
              <Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">Career Catalog FAQ</Link>
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

        {/* Featured & Recognized Badges Section */}
        <div className="border-t border-border mt-12 pt-8 text-center">
          <h4 className="text-xs uppercase tracking-widest font-semibold text-foreground mb-1.5">
            Featured & Recognized On
          </h4>
          <p className="text-xs text-muted-foreground max-w-lg mx-auto mb-6">
            Independently verified and listed across premier developer platforms and product launch directories.
          </p>

          {/* Badges Container */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 max-w-5xl mx-auto">
            {/* Product Hunt */}
            <a
              href="https://www.producthunt.com/products/skillta?utm_source=badge-follow&utm_medium=badge&utm_source=badge-skillta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center transition-opacity hover:opacity-100 opacity-90"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/follow.svg?product_id=1242760&theme=light"
                alt="SkillTa on Product Hunt"
                width="160"
                height="40"
                className="h-9 sm:h-10 w-auto object-contain"
                loading="lazy"
              />
            </a>

            {/* Fazier */}
            <a
              href="https://fazier.com/launches/www.skillta.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center transition-opacity hover:opacity-100 opacity-90"
            >
              <img
                src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=featured&theme=light"
                alt="Featured on Fazier"
                width="160"
                height="40"
                className="h-9 sm:h-10 w-auto object-contain"
                loading="lazy"
              />
            </a>

                        {/* ScrollLaunch */}
            <a
              href="https://www.scrolllaunch.com/products/skillta?ref=badge"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center transition-opacity hover:opacity-100 opacity-90"
            >
              <img
                src="https://www.scrolllaunch.com/api/badge/skillta?variant=featured&theme=light"
                alt="SkillTa - Featured on ScrollLaunch"
                width="220"
                height="48"
                className="h-10 sm:h-11 w-auto object-contain"
                loading="lazy"
              />
            </a>

            {/* CodeHype */}
            <a
              href="https://codehype.ai/product/skillta?utm_source=codehype_badge"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center transition-opacity hover:opacity-100 opacity-90"
            >
              <img
                src="https://codehype.ai/badges/skillta.svg?variant=find-us&v=20"
                alt="Featured on CodeHype"
                width="160"
                height="40"
                className="h-9 sm:h-10 w-auto object-contain"
                loading="lazy"
              />
            </a>

            {/* LaunchBuff */}
            <a
              href="https://launchbuff.com/products/skillta-dz3ysa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center transition-opacity hover:opacity-100 opacity-90"
            >
              <img
                src="https://launchbuff.com/badge-featured-light.svg"
                alt="Featured on LaunchBuff"
                width="160"
                height="40"
                className="h-9 sm:h-10 w-auto object-contain"
                loading="lazy"
              />
            </a>

            {/* LaunchNest */}
            <a
              href="https://launchnest.io/p/skillta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center transition-opacity hover:opacity-100 opacity-90"
            >
              <img
                src="https://launchnest.io/badge/skillta.svg?variant=featured&theme=light"
                alt="Featured on LaunchNest"
                width="160"
                height="40"
                className="h-9 sm:h-10 w-auto object-contain"
                loading="lazy"
              />
            </a>

            {/* Launchpadly */}
            <a
              href="https://launchpadly.co/startup/skillta?ref=badge"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center transition-opacity hover:opacity-100 opacity-90"
            >
              <img
                src="https://launchpadly.co/embed/badges/startup/skillta.svg?variant=light"
                alt="Featured on Launchpadly"
                width="160"
                height="40"
                className="h-9 sm:h-10 w-auto object-contain"
                loading="lazy"
              />
            </a>

            {/* Startup Fast */}
            <a 
              href="https://startupfa.st/projects/skillta" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center transition-opacity hover:opacity-100 opacity-90"
            >
              <img
                src="https://startupfa.st/badge-light.png"
                alt="Featured on Startup Fast"
                width="160"
                height="40"
                className="h-9 sm:h-10 w-auto object-contain"
                loading="lazy"
              />
            </a>

            {/* Twelve Tools */}
            <a
              href="https://twelve.tools"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center transition-opacity hover:opacity-100 opacity-90"
            >
              <img
                src="https://twelve.tools/badge0-white.svg"
                alt="Featured on Twelve Tools"
                width="160"
                height="40"
                className="h-9 sm:h-10 w-auto object-contain"
                loading="lazy"
              />
            </a>

            {/* Findly */}
            <a
              href="https://findly.tools/skillta?utm_source=skillta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center transition-opacity hover:opacity-100 opacity-90"
            >
              <img
                src="https://findly.tools/badges/findly-tools-badge-light.svg"
                alt="Featured on Findly.tools"
                width="160"
                height="40"
                className="h-9 sm:h-10 w-auto object-contain"
                loading="lazy"
              />
            </a>

            {/* Dofollow.Tools */}
            <a
              href="https://dofollow.tools"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center transition-opacity hover:opacity-100 opacity-90"
            >
              <img
                src="https://dofollow.tools/badge/badge_light.svg"
                alt="Featured on Dofollow.Tools"
                width="160"
                height="40"
                className="h-10 sm:h-11 w-auto object-contain"
                loading="lazy"
              />
            </a>

            {/* Startup Fame */}
            <a
              href="https://startupfa.me/s/skillta?utm_source=www.skillta.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center transition-opacity hover:opacity-100 opacity-90"
            >
              <img
                src="https://startupfa.me/badges/featured-badge.webp"
                alt="SkillTa - Featured on Startup Fame"
                width="160"
                height="40"
                className="h-10 sm:h-11 w-auto object-contain"
                loading="lazy"
              />
            </a>

            {/* ufind.best */}
            <a
              href="https://ufind.best/products/skillta"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center transition-opacity hover:opacity-100 opacity-90"
            >
              <img
                src="https://ufind.best/badges/ufind-best-badge-light.svg"
                alt="Featured on ufind.best"
                width="160"
                height="40"
                className="h-10 sm:h-11 w-auto object-contain"
                loading="lazy"
              />
            </a>

            {/* Verified DR */}
            <a
              href="https://verifieddr.com/website/skillta-tech"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center transition-opacity hover:opacity-100 opacity-90"
            >
              <img
                src="https://verifieddr.com/badge/skillta-tech.svg?metric=truedr"
                alt="Verified DR - Verified Domain Rating for skillta.tech"
                width="160"
                height="40"
                className="h-10 sm:h-11 w-auto object-contain"
                loading="lazy"
              />
            </a>
          </div>
        </div>

        {/* AI Discovery & Machine Intelligence Bar */}
        <div className="mt-12 pt-8 border-t border-border/60">
          <div className="rounded-xl border border-border/60 bg-muted/20 p-5 md:p-6 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              
              {/* Ask AI About SkillTa */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[11px] font-bold tracking-wide">
                    AI
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                    Ask AI About SkillTa
                  </span>
                  <span className="text-[11px] text-muted-foreground hidden sm:inline">
                    (1-Click Verified Queries)
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {/* ChatGPT */}
                  <a
                    href="https://chatgpt.com/?q=What+is+SkillTa+(https://www.skillta.tech)+and+how+does+it+help+with+tech+careers%3F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-background/80 hover:bg-background border border-border text-foreground hover:text-primary transition-all hover:border-primary/50 shadow-sm group"
                  >
                    <svg className="w-3.5 h-3.5 text-[#10A37F] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zm-1.64-10.43a4.477 4.477 0 0 1 2.34-1.975v5.674a.793.793 0 0 0 .392.682l5.842 3.37-2.02 1.168a.076.076 0 0 1-.064.004L3.6 14.007a4.502 4.502 0 0 1-1.64-6.133zm16.505 4.088l-5.84-3.37 2.019-1.168a.077.077 0 0 1 .064-.004l4.85 2.799a4.504 4.504 0 0 1-1.093 1.743zm2.535-3.014a4.476 4.476 0 0 1 .535 3.014l-.142-.085-4.783-2.759a.771.771 0 0 0-.78 0l-5.843 3.369V9.544a.08.08 0 0 1 .033-.062l4.84-2.793a4.5 4.5 0 0 1 6.14 1.646zm-9.5-3.522l-2.02-1.168a.076.076 0 0 1-.038-.052V2.62a4.504 4.504 0 0 1 7.37 2.502l-4.779 2.76a.795.795 0 0 0-.392.68v.01l-.141-.146zm-1.88 4.296l2.84 1.639v3.279l-2.84 1.64-2.84-1.64V11.36z"/>
                    </svg>
                    <span>ChatGPT</span>
                    <ArrowUpRight className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>

                  {/* Claude */}
                  <a
                    href="https://claude.ai/new?q=What+is+SkillTa+(https://www.skillta.tech)+career+guidance+platform+and+its+2027+roadmaps%3F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-background/80 hover:bg-background border border-border text-foreground hover:text-primary transition-all hover:border-primary/50 shadow-sm group"
                  >
                    <svg className="w-3.5 h-3.5 text-[#D97706] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.5c-.4 0-.8.3-.9.7l-1.6 5.5-5.5 1.6c-.4.1-.7.5-.7.9s.3.8.7.9l5.5 1.6 1.6 5.5c.1.4.5.7.9.7s.8-.3.9-.7l1.6-5.5 5.5-1.6c.4-.1.7-.5.7-.9s-.3-.8-.7-.9l-5.5-1.6-1.6-5.5c-.1-.4-.5-.7-.9-.7z" />
                    </svg>
                    <span>Claude</span>
                    <ArrowUpRight className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>

                  {/* Perplexity */}
                  <a
                    href="https://www.perplexity.ai/search?q=What+is+SkillTa+(https://www.skillta.tech)+career+guidance+platform%3F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-background/80 hover:bg-background border border-border text-foreground hover:text-primary transition-all hover:border-primary/50 shadow-sm group"
                  >
                    <svg className="w-3.5 h-3.5 text-[#00A3A6] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" />
                    </svg>
                    <span>Perplexity</span>
                    <ArrowUpRight className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>

                  {/* Gemini */}
                  <a
                    href="https://gemini.google.com/app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-background/80 hover:bg-background border border-border text-foreground hover:text-primary transition-all hover:border-primary/50 shadow-sm group"
                  >
                    <svg className="w-3.5 h-3.5 text-[#4E80EE] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C12 7.523 7.523 12 2 12c5.523 0 10 4.477 10 10 0-5.523 4.477-10 10-10-5.523 0-10-4.477-10-10z" />
                    </svg>
                    <span>Gemini</span>
                    <ArrowUpRight className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>

                  {/* Copilot */}
                  <a
                    href="https://copilot.microsoft.com/?q=What+is+SkillTa+(https://www.skillta.tech)+and+how+does+it+guide+tech+careers%3F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-background/80 hover:bg-background border border-border text-foreground hover:text-primary transition-all hover:border-primary/50 shadow-sm group"
                  >
                    <svg className="w-3.5 h-3.5 text-[#0078D4] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.5 7.5a4.5 4.5 0 0 0-7.79-3.18l-5.2 5.2a4.5 4.5 0 0 0 6.36 6.36l1.41-1.41a1 1 0 1 0-1.41-1.41l-1.41 1.41a2.5 2.5 0 0 1-3.54-3.54l5.2-5.2a2.5 2.5 0 1 1 4.33 1.77v1a1 1 0 1 0 2 0v-1zM5.5 16.5a4.5 4.5 0 0 0 7.79 3.18l5.2-5.2a4.5 4.5 0 0 0-6.36-6.36l-1.41 1.41a1 1 0 1 0 1.41 1.41l1.41-1.41a2.5 2.5 0 0 1 3.54 3.54l-5.2 5.2a2.5 2.5 0 1 1-4.33-1.77v-1a1 1 0 1 0-2 0v1z"/>
                    </svg>
                    <span>Copilot</span>
                    <ArrowUpRight className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>

                  {/* Grok */}
                  <a
                    href="https://x.com/i/grok?text=What+is+SkillTa+(https://www.skillta.tech)+and+how+does+it+guide+software+developers%3F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-background/80 hover:bg-background border border-border text-foreground hover:text-primary transition-all hover:border-primary/50 shadow-sm group"
                  >
                    <svg className="w-3.5 h-3.5 text-foreground flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <span>Grok</span>
                    <ArrowUpRight className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>

                  {/* DeepSeek */}
                  <a
                    href="https://chat.deepseek.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-background/80 hover:bg-background border border-border text-foreground hover:text-primary transition-all hover:border-primary/50 shadow-sm group"
                  >
                    <svg className="w-3.5 h-3.5 text-[#1E88E5] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.93V15a1 1 0 0 1 2 0v1.93A8 8 0 0 1 8.07 15H10a1 1 0 0 1 0-2H8.07A8 8 0 0 1 11 8.07V10a1 1 0 0 1 2 0V8.07A8 8 0 0 1 16.93 11H15a1 1 0 0 1 0 2h1.93A8 8 0 0 1 13 16.93z" />
                    </svg>
                    <span>DeepSeek</span>
                    <ArrowUpRight className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                </div>
              </div>

              {/* For AI Agents & Crawlers */}
              <div className="space-y-3 lg:border-l lg:border-border/60 lg:pl-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                    For AI Agents & Crawlers
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    (Specifications & Endpoints)
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs">
                  <a
                    href="/llms.txt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors font-mono"
                  >
                    /llms.txt
                  </a>
                  <span className="text-muted-foreground/30">·</span>
                  <a
                    href="/llms-full.txt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors font-mono"
                  >
                    /llms-full.txt
                  </a>
                  <span className="text-muted-foreground/30">·</span>
                  <a
                    href="/ai.txt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors font-mono"
                  >
                    /ai.txt
                  </a>
                  <span className="text-muted-foreground/30">·</span>
                  <a
                    href="/ai-snapshot.json"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors font-mono"
                  >
                    /ai-snapshot.json
                  </a>
                  <span className="text-muted-foreground/30">·</span>
                  <a
                    href="/mcp.json"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors font-mono"
                  >
                    /mcp.json
                  </a>
                  <span className="text-muted-foreground/30">·</span>
                  <a
                    href="/openapi.json"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors font-mono"
                  >
                    /openapi.json
                  </a>
                  <span className="text-muted-foreground/30">·</span>
                  <a
                    href="/auth.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors font-mono"
                  >
                    /auth.md
                  </a>
                  <span className="text-muted-foreground/30">·</span>
                  <a
                    href="/api/md/_catalog"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors font-mono"
                  >
                    /api/md/_catalog
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mt-10 pt-8">
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
