import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Users, Trophy, Clock, ChevronRight } from "lucide-react";

const rotatingWords = [
  "Tech Career",
  "Dream Job",
  "Future Path",
  "Passion",
];

const socialProof = [
  { icon: Users, value: "10,000+", label: "Students Guided" },
  { icon: Trophy, value: "50+", label: "Career Paths" },
  { icon: Clock, value: "5 Min", label: "Quick Quiz" },
];

const floatingTags = [
  { text: "Frontend Dev", x: "10%", y: "20%", delay: 0 },
  { text: "Data Science", x: "80%", y: "15%", delay: 0.5 },
  { text: "AI/ML", x: "85%", y: "65%", delay: 1 },
  { text: "DevOps", x: "5%", y: "70%", delay: 1.5 },
  { text: "Cybersecurity", x: "70%", y: "85%", delay: 2 },
  { text: "Backend", x: "15%", y: "85%", delay: 0.8 },
];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[100px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[100px]"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.08, 0.14, 0.08] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px]"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating career tags */}
      {floatingTags.map((tag) => (
        <motion.div
          key={tag.text}
          className="absolute hidden lg:block px-3 py-1.5 rounded-full border border-border/50 bg-card/30 backdrop-blur-sm text-xs text-muted-foreground/60 select-none"
          style={{ left: tag.x, top: tag.y }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: [0.3, 0.7, 0.3], y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: tag.delay, ease: "easeInOut" }}
        >
          {tag.text}
        </motion.div>
      ))}

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm text-sm text-primary mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span className="font-medium">AI-Powered Career Guidance</span>
            <ChevronRight className="w-3 h-3" />
          </motion.div>

          {/* Main headline with rotating text */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-6 tracking-tight">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Discover Your
            </motion.span>
            <br />
            <span className="relative inline-block h-[1.2em] overflow-hidden align-bottom">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  className="text-gradient inline-block"
                  initial={{ y: 50, opacity: 0, rotateX: -40 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  exit={{ y: -50, opacity: 0, rotateX: 40 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  {rotatingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          {/* Subheadline */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Confused about which tech career to choose?{" "}
            <span className="text-foreground font-medium">Take a 5-minute AI quiz</span> and get
            a personalized roadmap with skills, resources & salary insights.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              to="/quiz"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-primary text-primary-foreground font-semibold text-lg transition-all shadow-glow hover:shadow-[0_0_60px_-10px_hsl(174_72%_50%_/_0.5)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Take the Career Quiz</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              {/* Shimmer effect */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                  animate={{ x: ["-200%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                />
              </div>
            </Link>
            <Link
              to="/roadmaps"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-border bg-card/50 backdrop-blur-sm text-foreground font-semibold text-lg hover:bg-secondary hover:border-primary/30 transition-all"
            >
              Browse Roadmaps
            </Link>
          </motion.div>

          {/* Social proof bar */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-6 md:gap-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            {socialProof.map((item, i) => (
              <motion.div
                key={item.label}
                className="flex items-center gap-2.5"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + i * 0.1 }}
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-foreground leading-tight">{item.value}</p>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                </div>
              </motion.div>
            ))}

            {/* Avatars cluster */}
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {["🧑‍💻", "👩‍💻", "🧑‍🎓", "👨‍💻"].map((emoji, i) => (
                  <motion.div
                    key={i}
                    className="w-8 h-8 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + i * 0.08 }}
                  >
                    {emoji}
                  </motion.div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-primary font-semibold">200+</span> joined this week
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
