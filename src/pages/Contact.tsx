import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Heart, Sparkles, MapPin, Code2 } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { PAGE_SEO, getBreadcrumbSchema } from "@/lib/seo";
import founderPhoto from "@/assets/adarsh-founder.jpg.asset.json";

const EMAIL = "adarshmishra70931@gmail.com";
const GITHUB = "https://github.com/Code-By-Adarsh";
const LINKEDIN = "https://www.linkedin.com/in/adarsh-jayprakash-mishra";
const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`;

export default function Contact() {
  return (
    <>
      <SEOHead
        {...PAGE_SEO.contact}
        title="Contact the Founder — SkillTa"
        description="Reach out to Adarsh Mishra, founder of SkillTa. Connect via email, GitHub, or LinkedIn."
        jsonLd={getBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])}
      />
      <div className="min-h-screen py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">One-person indie project</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Contact the <span className="text-gradient">Founder</span>
            </h1>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              No support desk, no ticket queue — just me. Reach out directly.
            </p>
          </motion.div>

          {/* Founder Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative p-6 md:p-8 rounded-3xl border border-border bg-gradient-card backdrop-blur-sm mb-8 overflow-hidden"
          >
            {/* decorative glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Photo */}
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent blur-md opacity-60" />
                <img
                  src={founderPhoto.url}
                  alt="Adarsh Jayprakash Mishra — Founder of SkillTa"
                  className="relative w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border-2 border-primary/40 shadow-glow"
                />
              </div>

              {/* Intro */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-foreground mb-1">Adarsh Jayprakash Mishra</h2>
                <p className="text-primary text-sm font-medium mb-3 flex items-center justify-center md:justify-start gap-1.5">
                  <Code2 className="w-4 h-4" /> Founder & Developer · SkillTa
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  Hey! I'm Adarsh — a student developer from India who got tired of watching friends
                  pick tech careers based on YouTube hype and random Reddit threads. So I built
                  SkillTa: a free, honest, AI-powered career guide that actually listens.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  I'm the only one behind every quiz, roadmap, blog, and line of code here. If you
                  have feedback, a bug report, a collab idea, or just want to say hi — my inbox is
                  open. I read everything myself.
                </p>
                <div className="mt-3 flex items-center justify-center md:justify-start gap-2 text-xs text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5" /> Remote · India 🇮🇳
                </div>
              </div>
            </div>
          </motion.div>

          {/* Primary Contact — Email */}
          <motion.a
            href={GMAIL_COMPOSE}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="group flex items-center gap-4 p-5 rounded-2xl border border-border bg-card/60 backdrop-blur-sm hover:border-primary/50 hover:bg-card/80 transition-all mb-6"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-foreground">Email me directly</h3>
              <p className="text-sm text-muted-foreground truncate">{EMAIL}</p>
            </div>
            <span className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline">
              Open Gmail →
            </span>
          </motion.a>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid sm:grid-cols-2 gap-4 mb-12"
          >
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-2xl border border-border bg-card/60 backdrop-blur-sm hover:border-foreground/40 hover:bg-card/80 transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-foreground/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Github className="w-5 h-5 text-foreground" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-foreground">GitHub</h3>
                <p className="text-xs text-muted-foreground truncate">@Code-By-Adarsh</p>
              </div>
            </a>

            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-2xl border border-border bg-card/60 backdrop-blur-sm hover:border-[#0A66C2]/60 hover:bg-card/80 transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-[#0A66C2]/15 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Linkedin className="w-5 h-5 text-[#0A66C2]" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-foreground">LinkedIn</h3>
                <p className="text-xs text-muted-foreground truncate">Adarsh Jayprakash Mishra</p>
              </div>
            </a>
          </motion.div>

          {/* Thank You Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative p-6 md:p-8 rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 text-center overflow-hidden"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 border border-primary/40 mb-4">
              <Heart className="w-6 h-6 text-primary" fill="currentColor" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              Thank you for using SkillTa 💜
            </h3>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Every quiz you take, every roadmap you open, every blog you share — it genuinely means
              the world to a solo builder. You're the reason SkillTa exists, and the reason it
              stays free and ad-free. Keep learning, keep building. I'm rooting for you. 🚀
            </p>
            <p className="text-xs text-primary/80 font-medium mt-4">— Adarsh</p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
