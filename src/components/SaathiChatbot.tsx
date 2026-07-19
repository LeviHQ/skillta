import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, RotateCcw, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

type ChatNode = {
  id: string;
  message: string;
  options?: { label: string; nextId: string }[];
  action?: { label: string; path: string };
  solved?: boolean;
};

const chatTree: Record<string, ChatNode> = {
  root: {
    id: "root",
    message: "Hey there! 👋 I'm Saathi, your SkillTa guide. How can I help you today?",
    options: [
      { label: "🧭 Career guidance", nextId: "career" },
      { label: "📝 Career Quiz", nextId: "quiz_help" },
      { label: "🗺️ Roadmap Library", nextId: "roadmap_help" },
      { label: "💰 Salary Predictor", nextId: "salary_help" },
      { label: "🎤 Interview Prep", nextId: "interview_help" },
      { label: "📄 AI Resume Reviewer", nextId: "resume_help" },
      { label: "🎯 Skill Gap Analyzer", nextId: "skillgap_help" },
      { label: "⚖️ Compare Careers", nextId: "compare_help" },
      { label: "📚 Blogs & Country Guides", nextId: "blog_help" },
      { label: "📊 Dashboard & History", nextId: "dashboard_help" },
      { label: "💎 Pricing & Free Plan", nextId: "pricing_help" },
      { label: "🤔 Something else", nextId: "other" },
    ],
  },
  career: {
    id: "career",
    message: "For career guidance, start with our AI Career Quiz — 10 questions to find your perfect match. Then explore roadmaps, compare careers, or predict salary. 🎯",
    options: [
      { label: "Start the quiz", nextId: "quiz_go" },
      { label: "Explore roadmaps", nextId: "roadmap_go" },
      { label: "Compare careers", nextId: "compare_go" },
      { label: "Predict my salary", nextId: "salary_go" },
    ],
  },
  quiz_help: {
    id: "quiz_help",
    message: "The Career Quiz is 10 objective questions — no right/wrong, only your preferences. Free plan = 3 attempts per day. Results are saved in your dashboard. 🎮",
    options: [
      { label: "Take the quiz now", nextId: "quiz_go" },
      { label: "How do results work?", nextId: "results_help" },
      { label: "Do I need to sign in?", nextId: "signin_help" },
    ],
  },
  quiz_go: {
    id: "quiz_go",
    message: "Perfect! Taking you to the quiz. ✨ Good luck!",
    action: { label: "🚀 Start Quiz", path: "/quiz" },
  },
  results_help: {
    id: "results_help",
    message: "After the quiz you're redirected to results with your top career matches + match %. Signed-in users get everything saved in the dashboard. 📊",
    options: [
      { label: "Take the quiz now", nextId: "quiz_go" },
      { label: "Show me dashboard", nextId: "dashboard_go" },
    ],
  },
  signin_help: {
    id: "signin_help",
    message: "Sign in is NOT required to take the quiz. But sign in with Google to save results, track history, and unlock the dashboard. 🔐",
    options: [
      { label: "Take the quiz", nextId: "quiz_go" },
      { label: "Show me dashboard", nextId: "dashboard_go" },
    ],
  },
  roadmap_help: {
    id: "roadmap_help",
    message: "Roadmap Library has 60+ tech career roadmaps (including 2026 trending: GenAI, Prompt Engineer, Rust, Web3 & more). Each has skills, tools, timeline, resources + downloadable PDF. 🗺️",
    options: [
      { label: "Open Roadmap Library", nextId: "roadmap_go" },
      { label: "Find my match first", nextId: "quiz_go" },
      { label: "Compare 2 careers", nextId: "compare_go" },
    ],
  },
  roadmap_go: {
    id: "roadmap_go",
    message: "Let's head to the Roadmap Library! Pick your path. 💪",
    action: { label: "🗺️ Roadmap Library", path: "/roadmaps" },
  },
  salary_help: {
    id: "salary_help",
    message: "Salary Predictor uses AI to estimate CTC based on your role, experience, skills & location. Unlimited on free plan! 💰",
    options: [
      { label: "Predict my salary", nextId: "salary_go" },
      { label: "Read country salary guides", nextId: "blog_country_go" },
    ],
  },
  salary_go: {
    id: "salary_go",
    message: "Taking you to Salary Predictor. Fill in details & get your instant estimate! 💸",
    action: { label: "💰 Salary Predictor", path: "/salary-predictor" },
  },
  interview_help: {
    id: "interview_help",
    message: "Interview Prep gives you a real mock interview — pick your role, level & skills. 10 questions per round (MCQ + writing). Every attempt is saved in your dashboard for review. 🎤",
    options: [
      { label: "Start Interview Prep", nextId: "interview_go" },
      { label: "See my past attempts", nextId: "dashboard_go" },
    ],
  },
  interview_go: {
    id: "interview_go",
    message: "Time to practice! Choose your role & level and let's go. 🎯",
    action: { label: "🎤 Interview Prep", path: "/interview-prep" },
  },
  resume_help: {
    id: "resume_help",
    message: "AI Resume Reviewer gives you an instant ATS score, section-wise feedback, missing keywords, and rewritten bullet points — free, no sign-in needed. 📄",
    options: [
      { label: "Review my resume", nextId: "resume_go" },
      { label: "See other services", nextId: "root" },
    ],
  },
  resume_go: {
    id: "resume_go",
    message: "Opening the AI Resume Reviewer — paste your resume or upload a PDF! 📄",
    action: { label: "📄 AI Resume Reviewer", path: "/resume-reviewer" },
  },
  skillgap_help: {
    id: "skillgap_help",
    message: "Skill Gap Analyzer compares your current skills against your target tech role — you get missing skills, a match %, and a personalised week-by-week roadmap. Sign-in required, 3 free/day. 🎯",
    options: [
      { label: "Analyse my skills", nextId: "skillgap_go" },
      { label: "See other services", nextId: "root" },
    ],
  },
  skillgap_go: {
    id: "skillgap_go",
    message: "Opening Skill Gap Analyzer — add your skills, pick a target role, and get your plan! 🎯",
    action: { label: "🎯 Skill Gap Analyzer", path: "/skill-gap-analyzer" },
  },
  compare_help: {
    id: "compare_help",
    message: "Compare Careers lets you evaluate 2 roles side-by-side — salary, demand, skills, difficulty, growth. Unlimited on free plan. ⚖️",
    options: [
      { label: "Open Compare Careers", nextId: "compare_go" },
      { label: "Browse roadmaps first", nextId: "roadmap_go" },
    ],
  },
  compare_go: {
    id: "compare_go",
    message: "Opening Compare Careers — pick any 2 and analyze! ⚖️",
    action: { label: "⚖️ Compare Careers", path: "/compare" },
  },
  blog_help: {
    id: "blog_help",
    message: "Our Blog has 90+ SEO-optimized articles — trending tech topics, career guides, and country-wise salary guides (USA, UK, Canada, Australia, Germany, Russia). Use the Country filter on the Blog page! 📚",
    options: [
      { label: "Read the blog", nextId: "blog_go" },
      { label: "Country salary guides", nextId: "blog_country_go" },
    ],
  },
  blog_go: {
    id: "blog_go",
    message: "Latest tech + career articles await. 📚",
    action: { label: "📚 Read Blog", path: "/blog" },
  },
  blog_country_go: {
    id: "blog_country_go",
    message: "On the Blog page, tap the Category dropdown → Country → pick a flag (USA, UK, etc.) to see local salary guides. 🌍",
    action: { label: "🌍 Open Blog", path: "/blog" },
  },
  dashboard_help: {
    id: "dashboard_help",
    message: "Your Dashboard has: saved quiz results, career matches, salary predictions, and Interview Prep history (previous attempts + analysis). Sign in to unlock. 📊",
    options: [
      { label: "Go to dashboard", nextId: "dashboard_go" },
      { label: "How do I sign in?", nextId: "signin_help" },
    ],
  },
  dashboard_go: {
    id: "dashboard_go",
    message: "Dashboard ready — sign in to access all your saved data. 🎯",
    action: { label: "📊 Dashboard", path: "/dashboard" },
  },
  pricing_help: {
    id: "pricing_help",
    message: "Free plan: 3 quiz attempts/day + UNLIMITED Salary Predictor, Interview Prep, Roadmap Library & Compare Careers. Plan is 1-month; auto-deactivates on expiry — reactivate anytime. 💎",
    options: [
      { label: "View pricing", nextId: "pricing_go" },
      { label: "What's included free?", nextId: "free_features" },
    ],
  },
  pricing_go: {
    id: "pricing_go",
    message: "Taking you to pricing! 💰",
    action: { label: "💰 View Pricing", path: "/#pricing" },
  },
  free_features: {
    id: "free_features",
    message: "Free tier: Career Quiz (3/day), Top matches, Unlimited Salary Predictor, Unlimited Interview Prep, AI Resume Reviewer (3/day), Skill Gap Analyzer (3/day), Roadmap Library, Compare Careers, Blogs. 🎁",
    options: [
      { label: "Start free quiz", nextId: "quiz_go" },
      { label: "Review my resume", nextId: "resume_go" },
      { label: "Try Interview Prep", nextId: "interview_go" },
      { label: "Predict salary", nextId: "salary_go" },
    ],
  },
  other: {
    id: "other",
    message: "No problem! What are you looking for? 🤗",
    options: [
      { label: "Contact founder", nextId: "contact_go" },
      { label: "About SkillTa", nextId: "about_go" },
      { label: "Blog articles", nextId: "blog_go" },
      { label: "Terms & Privacy", nextId: "legal" },
    ],
  },
  contact_go: {
    id: "contact_go",
    message: "Reach the founder directly via email, GitHub or LinkedIn on the Contact page. 📬",
    action: { label: "📬 Contact Founder", path: "/contact" },
  },
  about_go: {
    id: "about_go",
    message: "About page has SkillTa's mission, vision & story. 🌟",
    action: { label: "🌟 About SkillTa", path: "/about" },
  },
  legal: {
    id: "legal",
    message: "What would you like to view? 📄",
    options: [
      { label: "Terms of Service", nextId: "terms_go" },
      { label: "Privacy Policy", nextId: "privacy_go" },
    ],
  },
  terms_go: {
    id: "terms_go",
    message: "Opening Terms of Service. 📜",
    action: { label: "📜 Terms", path: "/terms" },
  },
  privacy_go: {
    id: "privacy_go",
    message: "Opening Privacy Policy. 🔒",
    action: { label: "🔒 Privacy Policy", path: "/privacy" },
  },
};

type ChatMessage = {
  type: "bot" | "user";
  text: string;
  nodeId?: string;
};

export default function SaathiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { type: "bot", text: chatTree.root.message, nodeId: "root" },
  ]);
  const [currentNodeId, setCurrentNodeId] = useState("root");
  const [solved, setSolved] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const currentNode = chatTree[currentNodeId];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleOption = (label: string, nextId: string) => {
    const nextNode = chatTree[nextId];
    if (!nextNode) return;

    setMessages((prev) => [
      ...prev,
      { type: "user", text: label },
      { type: "bot", text: nextNode.message, nodeId: nextId },
    ]);
    setCurrentNodeId(nextId);
  };

  const handleAction = (path: string) => {
    if (path.startsWith("/#")) {
      const id = path.slice(2);
      navigate("/");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 400);
    } else {
      navigate(path);
    }
    setIsOpen(false);
  };

  const handleRefresh = () => {
    setMessages([{ type: "bot", text: chatTree.root.message, nodeId: "root" }]);
    setCurrentNodeId("root");
    setSolved(false);
  };

  const handleSolved = () => {
    setSolved(true);
    setMessages((prev) => [
      ...prev,
      { type: "bot", text: "Glad I could help! 🎉 Keep using SkillTa and discover your best career path. All the best! 🚀✨" },
    ]);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-28 right-6 md:bottom-24 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg shadow-primary/30 flex items-center justify-center no-print"
            aria-label="Open Saathi chatbot"
          >
            <Sparkles className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-28 right-6 md:bottom-24 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-9rem)] rounded-2xl border border-border bg-card shadow-2xl shadow-primary/10 flex flex-col overflow-hidden no-print"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">Saathi</h3>
                  <p className="text-[10px] text-muted-foreground">SkillTa Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleRefresh}
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  title="Restart chat"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                {!solved && (
                  <button
                    onClick={handleSolved}
                    className="p-1.5 rounded-lg hover:bg-primary/20 transition-colors text-primary"
                    title="Problem solved!"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i === messages.length - 1 ? 0.1 : 0 }}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                      msg.type === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-secondary text-secondary-foreground rounded-bl-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Options / Actions */}
            {!solved && (
              <div className="border-t border-border px-4 py-3 space-y-2 bg-card/80 backdrop-blur-sm">
                {currentNode?.options && (
                  <div className="flex flex-wrap gap-1.5">
                    {currentNode.options.map((opt) => (
                      <motion.button
                        key={opt.nextId}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleOption(opt.label, opt.nextId)}
                        className="px-3 py-1.5 rounded-full text-xs font-medium border border-border bg-secondary/50 text-secondary-foreground hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all flex items-center gap-1"
                      >
                        {opt.label}
                        <ChevronRight className="w-3 h-3 opacity-50" />
                      </motion.button>
                    ))}
                  </div>
                )}
                {currentNode?.action && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAction(currentNode.action!.path)}
                    className="w-full py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    {currentNode.action.label}
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
