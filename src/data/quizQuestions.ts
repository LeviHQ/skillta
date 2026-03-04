export interface QuizQuestion {
  id: number;
  question: string;
  subtitle?: string;
  options: { label: string; value: string; icon: string }[];
  category: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What excites you the most?",
    subtitle: "Pick the activity that sparks your curiosity",
    category: "interest",
    options: [
      { label: "Building things that work behind the scenes", value: "backend", icon: "⚙️" },
      { label: "Creating beautiful, interactive interfaces", value: "frontend", icon: "🎨" },
      { label: "Finding patterns in numbers and data", value: "data", icon: "📊" },
      { label: "Breaking and securing systems", value: "security", icon: "🔐" },
    ],
  },
  {
    id: 2,
    question: "How comfortable are you with math?",
    subtitle: "Be honest — there's no wrong answer",
    category: "math",
    options: [
      { label: "Love it — algebra, stats, calculus, bring it on", value: "high", icon: "🧮" },
      { label: "Comfortable with basics, not a math nerd", value: "medium", icon: "📐" },
      { label: "I avoid math whenever possible", value: "low", icon: "😅" },
      { label: "I can handle it if the career demands it", value: "willing", icon: "💪" },
    ],
  },
  {
    id: 3,
    question: "How do you approach problem-solving?",
    subtitle: "Think about how you handle complex puzzles",
    category: "logic",
    options: [
      { label: "Step-by-step logical breakdown", value: "systematic", icon: "🧩" },
      { label: "Visual thinking and intuition", value: "visual", icon: "👁️" },
      { label: "Trial and error until it clicks", value: "experimental", icon: "🔬" },
      { label: "Collaborate and discuss with others", value: "collaborative", icon: "🤝" },
    ],
  },
  {
    id: 4,
    question: "How creative do you consider yourself?",
    subtitle: "Creativity comes in many forms",
    category: "creativity",
    options: [
      { label: "Very creative — I love designing and aesthetics", value: "high", icon: "✨" },
      { label: "I'm more analytical than creative", value: "low", icon: "📈" },
      { label: "I'm creative with solutions, not visuals", value: "technical", icon: "💡" },
      { label: "Somewhere in between", value: "medium", icon: "🎭" },
    ],
  },
  {
    id: 5,
    question: "What's your ideal work style?",
    subtitle: "Where do you see yourself thriving?",
    category: "workstyle",
    options: [
      { label: "Remote — pajamas and coffee", value: "remote", icon: "🏠" },
      { label: "Office — I need the team energy", value: "office", icon: "🏢" },
      { label: "Freelance — freedom is everything", value: "freelance", icon: "🌍" },
      { label: "Hybrid — best of both worlds", value: "hybrid", icon: "🔄" },
    ],
  },
  {
    id: 6,
    question: "How patient are you with learning?",
    subtitle: "Some careers need years of deep learning",
    category: "patience",
    options: [
      { label: "Very patient — I can invest 2+ years", value: "high", icon: "🎯" },
      { label: "Moderate — 6-12 months is my sweet spot", value: "medium", icon: "⏱️" },
      { label: "I want quick results and fast progress", value: "low", icon: "🚀" },
      { label: "Depends on how interesting the topic is", value: "conditional", icon: "🤔" },
    ],
  },
  {
    id: 7,
    question: "How do you feel about communication?",
    subtitle: "Presenting ideas, writing docs, client calls",
    category: "communication",
    options: [
      { label: "Love it — I enjoy presenting and explaining", value: "high", icon: "🎤" },
      { label: "Comfortable but prefer writing over talking", value: "written", icon: "✍️" },
      { label: "I'd rather let my work speak for itself", value: "low", icon: "🤫" },
      { label: "I'm working on improving it", value: "growing", icon: "📚" },
    ],
  },
  {
    id: 8,
    question: "What type of projects excite you?",
    subtitle: "Imagine your dream project",
    category: "project_type",
    options: [
      { label: "Building web/mobile apps people use daily", value: "apps", icon: "📱" },
      { label: "Analyzing data to uncover insights", value: "analytics", icon: "🔍" },
      { label: "Automating processes and infrastructure", value: "automation", icon: "🤖" },
      { label: "Testing and ensuring quality", value: "quality", icon: "✅" },
    ],
  },
  {
    id: 9,
    question: "How do you feel about attention to detail?",
    subtitle: "Pixel-perfect or big-picture thinker?",
    category: "detail",
    options: [
      { label: "Pixel-perfect — every detail matters", value: "high", icon: "🔎" },
      { label: "Big picture first, details later", value: "low", icon: "🌐" },
      { label: "Depends on the context", value: "balanced", icon: "⚖️" },
      { label: "I focus on logic and efficiency", value: "efficiency", icon: "⚡" },
    ],
  },
  {
    id: 10,
    question: "What motivates you the most?",
    subtitle: "What drives your career ambitions?",
    category: "motivation",
    options: [
      { label: "High salary and financial growth", value: "money", icon: "💰" },
      { label: "Making an impact and solving real problems", value: "impact", icon: "🌟" },
      { label: "Work-life balance and flexibility", value: "balance", icon: "☯️" },
      { label: "Continuous learning and mastery", value: "growth", icon: "📖" },
    ],
  },
];
