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
      { label: "📝 How to take the quiz?", nextId: "quiz_help" },
      { label: "🗺️ View roadmaps", nextId: "roadmap_help" },
      { label: "📊 Where's my dashboard?", nextId: "dashboard_help" },
      { label: "💰 Pricing info", nextId: "pricing_help" },
      { label: "🤔 Something else", nextId: "other" },
    ],
  },
  career: {
    id: "career",
    message: "For career guidance, our AI-powered Career Quiz is the best place to start! 10 questions to find your perfect career match. 🎯",
    options: [
      { label: "Start the quiz", nextId: "quiz_go" },
      { label: "Explore careers first", nextId: "roadmap_go" },
      { label: "Compare careers", nextId: "compare_go" },
    ],
  },
  quiz_help: {
    id: "quiz_help",
    message: "Taking the quiz is super easy! 🎮 Just 10 objective questions — no right or wrong answers, only your preferences matter.",
    options: [
      { label: "Let's go to the quiz!", nextId: "quiz_go" },
      { label: "How do I see results?", nextId: "results_help" },
      { label: "Do I need to sign in?", nextId: "signin_help" },
    ],
  },
  quiz_go: {
    id: "quiz_go",
    message: "Perfect! Let me take you to the quiz page. ✨ Good luck!",
    action: { label: "🚀 Start Quiz", path: "/quiz" },
  },
  results_help: {
    id: "results_help",
    message: "After completing the quiz, you'll be automatically redirected to the results page. Your top career matches will be shown with match percentages! 📊",
    options: [
      { label: "Take the quiz now", nextId: "quiz_go" },
      { label: "Are results saved?", nextId: "dashboard_help" },
    ],
  },
  signin_help: {
    id: "signin_help",
    message: "Sign in is NOT required to take the quiz! 🎉 But if you want to save your results and access the dashboard, sign in with Google.",
    options: [
      { label: "Let's take the quiz", nextId: "quiz_go" },
      { label: "Show me the dashboard", nextId: "dashboard_go" },
    ],
  },
  roadmap_help: {
    id: "roadmap_help",
    message: "The Roadmap Library has 50+ tech career roadmaps with complete step-by-step guides — skills, tools, timeline, everything! 🗺️",
    options: [
      { label: "View roadmaps", nextId: "roadmap_go" },
      { label: "Find my match via quiz first", nextId: "quiz_go" },
    ],
  },
  roadmap_go: {
    id: "roadmap_go",
    message: "Let's head to the Roadmap Library! Explore and choose your path. 💪",
    action: { label: "🗺️ Roadmap Library", path: "/roadmaps" },
  },
  compare_go: {
    id: "compare_go",
    message: "On the Compare page you can view 2 careers side-by-side — salary, skills, demand and more! ⚖️",
    action: { label: "⚖️ Compare Careers", path: "/compare" },
  },
  dashboard_help: {
    id: "dashboard_help",
    message: "Your Dashboard holds your saved quiz results, career matches and progress — just make sure you're signed in! 🔐",
    options: [
      { label: "Go to dashboard", nextId: "dashboard_go" },
      { label: "How do I sign in?", nextId: "signin_help" },
    ],
  },
  dashboard_go: {
    id: "dashboard_go",
    message: "Dashboard is ready! 🎯 You'll get direct access once signed in.",
    action: { label: "📊 Dashboard", path: "/dashboard" },
  },
  pricing_help: {
    id: "pricing_help",
    message: "SkillTa's quiz and basic features are completely FREE! Premium plans offer advanced roadmaps and AI mentoring. 💎",
    options: [
      { label: "View pricing", nextId: "pricing_go" },
      { label: "What's free?", nextId: "free_features" },
    ],
  },
  pricing_go: {
    id: "pricing_go",
    message: "Let me take you to the pricing section! 💰",
    action: { label: "💰 View Pricing", path: "/#pricing" },
  },
  free_features: {
    id: "free_features",
    message: "Free tier includes: Career Quiz, Top 3 Matches, Roadmap Library, and Blog/Resources! 🎁 Plenty to explore without paying a thing.",
    options: [
      { label: "Take the free quiz", nextId: "quiz_go" },
      { label: "Read the blog", nextId: "blog_go" },
    ],
  },
  blog_go: {
    id: "blog_go",
    message: "The blog has the latest tech career articles, tips and guides. Read and grow! 📚",
    action: { label: "📚 Read Blog", path: "/blog" },
  },
  other: {
    id: "other",
    message: "No problem! What are you looking for? 🤗",
    options: [
      { label: "Contact / Support", nextId: "contact_go" },
      { label: "About SkillTa", nextId: "about_go" },
      { label: "Blog articles", nextId: "blog_go" },
      { label: "Terms & Privacy", nextId: "legal" },
    ],
  },
  contact_go: {
    id: "contact_go",
    message: "You can reach us on the Contact page! 📬 We reply quickly.",
    action: { label: "📬 Contact Us", path: "/contact" },
  },
  about_go: {
    id: "about_go",
    message: "The About page has SkillTa's mission, team and vision! 🌟",
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
    message: "Let me take you to the Terms of Service! 📜",
    action: { label: "📜 Terms", path: "/terms" },
  },
  privacy_go: {
    id: "privacy_go",
    message: "Let's check the Privacy Policy! 🔒",
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
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg shadow-primary/30 flex items-center justify-center no-print"
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
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-6rem)] rounded-2xl border border-border bg-card shadow-2xl shadow-primary/10 flex flex-col overflow-hidden no-print"
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
