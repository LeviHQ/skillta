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
    message: "Namaste! 🙏 Main hoon Saathi, tumhara SkillTa guide. Kaise help kar sakta hoon?",
    options: [
      { label: "🧭 Career guidance chahiye", nextId: "career" },
      { label: "📝 Quiz kaise dein?", nextId: "quiz_help" },
      { label: "🗺️ Roadmap dekhna hai", nextId: "roadmap_help" },
      { label: "📊 Dashboard kahan hai?", nextId: "dashboard_help" },
      { label: "💰 Pricing jaanna hai", nextId: "pricing_help" },
      { label: "🤔 Kuch aur problem hai", nextId: "other" },
    ],
  },
  career: {
    id: "career",
    message: "Career guidance ke liye humara AI-powered Career Quiz best hai! 15 questions mein tumhara perfect career match milega. 🎯",
    options: [
      { label: "Quiz start karna hai", nextId: "quiz_go" },
      { label: "Pehle careers explore karunga", nextId: "roadmap_go" },
      { label: "Compare karna hai careers ko", nextId: "compare_go" },
    ],
  },
  quiz_help: {
    id: "quiz_help",
    message: "Quiz dena bahut easy hai! 🎮 Bas 15 objective questions hain — koi right ya wrong answer nahi, sirf tumhari preferences matter karti hain.",
    options: [
      { label: "Chalein quiz pe!", nextId: "quiz_go" },
      { label: "Results kaise dekhein?", nextId: "results_help" },
      { label: "Sign in zaroori hai kya?", nextId: "signin_help" },
    ],
  },
  quiz_go: {
    id: "quiz_go",
    message: "Perfect! Quiz page pe le chalta hoon. ✨ All the best!",
    action: { label: "🚀 Quiz Start Karein", path: "/quiz" },
  },
  results_help: {
    id: "results_help",
    message: "Quiz complete karne ke baad results page pe automatically redirect ho jaoge. Wahan tumhare top career matches percentage ke saath dikhenge! 📊",
    options: [
      { label: "Quiz dena hai ab", nextId: "quiz_go" },
      { label: "Dashboard mein saved hai?", nextId: "dashboard_help" },
    ],
  },
  signin_help: {
    id: "signin_help",
    message: "Quiz dene ke liye sign in zaroori nahi hai! 🎉 Lekin agar results save karne hain aur dashboard access chahiye toh sign in karo Google se.",
    options: [
      { label: "Chalein quiz dete hain", nextId: "quiz_go" },
      { label: "Dashboard dikhao", nextId: "dashboard_go" },
    ],
  },
  roadmap_help: {
    id: "roadmap_help",
    message: "Roadmap Library mein 50+ tech careers ke complete step-by-step roadmaps hain — skills, tools, timeline sab kuch! 🗺️",
    options: [
      { label: "Roadmaps dekhein", nextId: "roadmap_go" },
      { label: "Pehle quiz se match karunga", nextId: "quiz_go" },
    ],
  },
  roadmap_go: {
    id: "roadmap_go",
    message: "Chal rahe hain Roadmap Library pe! Explore karo aur apna path choose karo. 💪",
    action: { label: "🗺️ Roadmap Library", path: "/roadmaps" },
  },
  compare_go: {
    id: "compare_go",
    message: "Compare page pe 2 careers ko side-by-side dekh sakte ho — salary, skills, demand sab! ⚖️",
    action: { label: "⚖️ Compare Careers", path: "/compare" },
  },
  dashboard_help: {
    id: "dashboard_help",
    message: "Dashboard mein tumhare saved quiz results, career matches aur progress sab milega. Bas sign in hona chahiye! 🔐",
    options: [
      { label: "Dashboard pe jaayein", nextId: "dashboard_go" },
      { label: "Sign in kaise karein?", nextId: "signin_help" },
    ],
  },
  dashboard_go: {
    id: "dashboard_go",
    message: "Dashboard ready hai! 🎯 Sign in ho toh direct access milega.",
    action: { label: "📊 Dashboard", path: "/dashboard" },
  },
  pricing_help: {
    id: "pricing_help",
    message: "SkillTa ka quiz aur basic features FREE hain! Premium plans mein advanced roadmaps aur AI mentoring milta hai. 💎",
    options: [
      { label: "Pricing section dekhein", nextId: "pricing_go" },
      { label: "Free mein kya milta hai?", nextId: "free_features" },
    ],
  },
  pricing_go: {
    id: "pricing_go",
    message: "Homepage pe pricing section hai, le chalta hoon! 💰",
    action: { label: "💰 Pricing Dekhein", path: "/#pricing" },
  },
  free_features: {
    id: "free_features",
    message: "Free mein milta hai: Career Quiz, Top 3 Matches, Roadmap Library, aur Blog/Resources! 🎁 Bahut kuch explore kar sakte ho bina paisa diye.",
    options: [
      { label: "Quiz dena hai free mein", nextId: "quiz_go" },
      { label: "Blog dekhein", nextId: "blog_go" },
    ],
  },
  blog_go: {
    id: "blog_go",
    message: "Blog mein latest tech career articles, tips aur guides milenge. Padho aur grow karo! 📚",
    action: { label: "📚 Blog Padhein", path: "/blog" },
  },
  other: {
    id: "other",
    message: "Koi baat nahi! Batao kya dhundh rahe ho? 🤗",
    options: [
      { label: "Contact/Support chahiye", nextId: "contact_go" },
      { label: "About SkillTa jaanna hai", nextId: "about_go" },
      { label: "Blog articles dekhne hain", nextId: "blog_go" },
      { label: "Terms & Privacy", nextId: "legal" },
    ],
  },
  contact_go: {
    id: "contact_go",
    message: "Contact page pe humse baat kar sakte ho! 📬 Hum jaldi reply karte hain.",
    action: { label: "📬 Contact Us", path: "/contact" },
  },
  about_go: {
    id: "about_go",
    message: "About page pe SkillTa ka mission, team aur vision sab milega! 🌟",
    action: { label: "🌟 About SkillTa", path: "/about" },
  },
  legal: {
    id: "legal",
    message: "Kya dekhna hai? 📄",
    options: [
      { label: "Terms of Service", nextId: "terms_go" },
      { label: "Privacy Policy", nextId: "privacy_go" },
    ],
  },
  terms_go: {
    id: "terms_go",
    message: "Terms of Service page pe le chalta hoon! 📜",
    action: { label: "📜 Terms", path: "/terms" },
  },
  privacy_go: {
    id: "privacy_go",
    message: "Privacy Policy dekhne chalo! 🔒",
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
      { type: "bot", text: "Glad I could help! 🎉 SkillTa use karte raho aur apna best career discover karo. All the best! 🚀✨" },
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
