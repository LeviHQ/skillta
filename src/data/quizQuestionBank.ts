export interface QuizQuestion {
  id: string;
  question: string;
  subtitle?: string;
  options: { label: string; value: string; icon: string; tags?: string[] }[];
  category: "nature" | "skill" | "helper";
  // For adaptive questions - which answers trigger this question
  triggeredBy?: { questionId: string; answerValues: string[] }[];
  // Scoring weights for different careers
  scoring?: {
    [optionValue: string]: {
      [careerId: string]: number;
    };
  };
}

// NATURE-BASED QUESTIONS (Personality, Work Style, Motivation)
export const natureQuestions: QuizQuestion[] = [
  // Personality & Motivation
  {
    id: "n_motivation_1",
    question: "What motivates you the most?",
    subtitle: "What drives your career ambitions?",
    category: "nature",
    options: [
      { label: "High salary and financial growth", value: "money", icon: "💰" },
      { label: "Making an impact and solving real problems", value: "impact", icon: "🌟" },
      { label: "Work-life balance and flexibility", value: "balance", icon: "☯️" },
      { label: "Continuous learning and mastery", value: "growth", icon: "📖" },
    ],
  },
  {
    id: "n_work_environment_1",
    question: "What's your ideal work environment?",
    subtitle: "Where do you see yourself thriving?",
    category: "nature",
    options: [
      { label: "Remote — pajamas and coffee at home", value: "remote", icon: "🏠" },
      { label: "Office — I need the team energy", value: "office", icon: "🏢" },
      { label: "Freelance — complete freedom and independence", value: "freelance", icon: "🌍" },
      { label: "Hybrid — best of both worlds", value: "hybrid", icon: "🔄" },
    ],
  },
  {
    id: "n_personality_1",
    question: "How do you recharge after work?",
    subtitle: "What helps you unwind?",
    category: "nature",
    options: [
      { label: "Socializing with friends and colleagues", value: "social", icon: "🎉" },
      { label: "Alone time with books, games, or hobbies", value: "introvert", icon: "📚" },
      { label: "Physical activities and outdoor adventures", value: "active", icon: "🏃" },
      { label: "Creative pursuits like art, music, or writing", value: "creative", icon: "🎨" },
    ],
  },
  {
    id: "n_decision_making_1",
    question: "How do you make important decisions?",
    subtitle: "Think about your decision-making process",
    category: "nature",
    options: [
      { label: "Data and research-driven analysis", value: "analytical", icon: "📊" },
      { label: "Gut feeling and intuition", value: "intuitive", icon: "💭" },
      { label: "Seeking advice from others", value: "collaborative", icon: "🤝" },
      { label: "Experimenting and learning from mistakes", value: "experimental", icon: "🔬" },
    ],
  },
  {
    id: "n_stress_1",
    question: "How do you handle stress and pressure?",
    subtitle: "Deadlines, complex problems, high stakes",
    category: "nature",
    options: [
      { label: "I thrive under pressure — it brings out my best", value: "thrives", icon: "🔥" },
      { label: "I need calm and structured environments", value: "structured", icon: "🧘" },
      { label: "I handle it okay but prefer low-stress work", value: "moderate", icon: "😌" },
      { label: "I get stressed easily but I'm working on it", value: "struggles", icon: "😰" },
    ],
  },
  {
    id: "n_communication_1",
    question: "How do you feel about communication?",
    subtitle: "Presenting ideas, writing docs, client calls",
    category: "nature",
    options: [
      { label: "Love it — I enjoy presenting and explaining", value: "high", icon: "🎤" },
      { label: "Comfortable but prefer writing over talking", value: "written", icon: "✍️" },
      { label: "I'd rather let my work speak for itself", value: "low", icon: "🤫" },
      { label: "I'm working on improving it", value: "growing", icon: "📚" },
    ],
  },
  {
    id: "n_risk_tolerance_1",
    question: "How do you feel about career risks?",
    subtitle: "Startups, freelancing, new tech fields",
    category: "nature",
    options: [
      { label: "High risk, high reward — I'm all in", value: "high_risk", icon: "🎲" },
      { label: "Calculated risks with backup plans", value: "moderate_risk", icon: "🎯" },
      { label: "I prefer stable, established paths", value: "low_risk", icon: "🛡️" },
      { label: "I'll take risks if the opportunity is right", value: "situational", icon: "🔍" },
    ],
  },
  {
    id: "n_patience_1",
    question: "How patient are you with learning?",
    subtitle: "Some careers need years of deep learning",
    category: "nature",
    options: [
      { label: "Very patient — I can invest 2+ years", value: "high", icon: "🎯" },
      { label: "Moderate — 6-12 months is my sweet spot", value: "medium", icon: "⏱️" },
      { label: "I want quick results and fast progress", value: "low", icon: "🚀" },
      { label: "Depends on how interesting the topic is", value: "conditional", icon: "🤔" },
    ],
  },
  {
    id: "n_work_pace_1",
    question: "What work pace suits you best?",
    subtitle: "How do you like to work?",
    category: "nature",
    options: [
      { label: "Fast-paced with quick iterations", value: "fast", icon: "⚡" },
      { label: "Steady and methodical progress", value: "steady", icon: "🐢" },
      { label: "Intense sprints followed by breaks", value: "sprint", icon: "🏃" },
      { label: "Flexible — depends on the project", value: "flexible", icon: "🔄" },
    ],
  },
  {
    id: "n_failure_1",
    question: "How do you handle failure?",
    subtitle: "When things don't work as planned",
    category: "nature",
    options: [
      { label: "Learn from it and move on quickly", value: "resilient", icon: "💪" },
      { label: "Analyze deeply to understand what went wrong", value: "analytical", icon: "🔍" },
      { label: "Get discouraged but eventually recover", value: "sensitive", icon: "😔" },
      { label: "See it as an opportunity to pivot", value: "adaptive", icon: "🔄" },
    ],
  },
  {
    id: "n_recognition_1",
    question: "How important is recognition to you?",
    subtitle: "Appreciation for your work",
    category: "nature",
    options: [
      { label: "Very important — I want my work noticed", value: "high", icon: "🏆" },
      { label: "Nice to have but not essential", value: "moderate", icon: "👍" },
      { label: "I'm satisfied with personal accomplishment", value: "low", icon: "🧘" },
      { label: "I prefer working behind the scenes", value: "minimal", icon: "👤" },
    ],
  },
  {
    id: "n_team_preference_1",
    question: "What's your ideal team size?",
    subtitle: "How do you work best?",
    category: "nature",
    options: [
      { label: "Solo — I'm most productive alone", value: "solo", icon: "🧑‍💻" },
      { label: "Small team (2-5 people)", value: "small", icon: "👥" },
      { label: "Medium team (5-15 people)", value: "medium", icon: "👨‍👩‍👧‍👦" },
      { label: "Large team/organization (15+ people)", value: "large", icon: "🏢" },
    ],
  },
  {
    id: "n_change_1",
    question: "How do you feel about constant change?",
    subtitle: "New tools, technologies, and processes",
    category: "nature",
    options: [
      { label: "Love it — change keeps things exciting", value: "embraces", icon: "🚀" },
      { label: "Okay with it but prefer some stability", value: "moderate", icon: "⚖️" },
      { label: "I prefer consistency and routine", value: "prefers_stability", icon: "🏛️" },
      { label: "Depends on the type of change", value: "selective", icon: "🤔" },
    ],
  },
  {
    id: "n_leadership_1",
    question: "Do you see yourself in a leadership role?",
    subtitle: "Managing teams and making decisions",
    category: "nature",
    options: [
      { label: "Yes — I want to lead teams eventually", value: "aspiring_leader", icon: "👑" },
      { label: "Maybe as a tech lead, not people management", value: "tech_lead", icon: "🎯" },
      { label: "No — I prefer individual contributor role", value: "ic", icon: "🧑‍💻" },
      { label: "Not sure yet, open to exploring", value: "undecided", icon: "🤷" },
    ],
  },
  {
    id: "n_perfectionism_1",
    question: "How perfectionistic are you?",
    subtitle: "Getting things just right vs shipping fast",
    category: "nature",
    options: [
      { label: "Very — every detail must be perfect", value: "high", icon: "💎" },
      { label: "Balanced — good enough is fine", value: "balanced", icon: "⚖️" },
      { label: "Done is better than perfect", value: "pragmatic", icon: "✅" },
      { label: "Depends on the stakes", value: "contextual", icon: "🎯" },
    ],
  },
];

// SKILL-BASED QUESTIONS (Technical abilities, problem-solving, learning)
export const skillQuestions: QuizQuestion[] = [
  // Core Technical Skills
  {
    id: "s_interest_1",
    question: "What excites you the most?",
    subtitle: "Pick the activity that sparks your curiosity",
    category: "skill",
    options: [
      { label: "Building things that work behind the scenes", value: "backend", icon: "⚙️", tags: ["backend", "systems"] },
      { label: "Creating beautiful, interactive interfaces", value: "frontend", icon: "🎨", tags: ["frontend", "design"] },
      { label: "Finding patterns in numbers and data", value: "data", icon: "📊", tags: ["data", "analytics"] },
      { label: "Breaking and securing systems", value: "security", icon: "🔐", tags: ["security", "ethical-hacking"] },
    ],
  },
  {
    id: "s_math_1",
    question: "How comfortable are you with math?",
    subtitle: "Be honest — there's no wrong answer",
    category: "skill",
    options: [
      { label: "Love it — algebra, stats, calculus, bring it on", value: "high", icon: "🧮" },
      { label: "Comfortable with basics, not a math nerd", value: "medium", icon: "📐" },
      { label: "I avoid math whenever possible", value: "low", icon: "😅" },
      { label: "I can handle it if the career demands it", value: "willing", icon: "💪" },
    ],
  },
  {
    id: "s_problem_solving_1",
    question: "How do you approach problem-solving?",
    subtitle: "Think about how you handle complex puzzles",
    category: "skill",
    options: [
      { label: "Step-by-step logical breakdown", value: "systematic", icon: "🧩" },
      { label: "Visual thinking and intuition", value: "visual", icon: "👁️" },
      { label: "Trial and error until it clicks", value: "experimental", icon: "🔬" },
      { label: "Collaborate and discuss with others", value: "collaborative", icon: "🤝" },
    ],
  },
  {
    id: "s_creativity_1",
    question: "How creative do you consider yourself?",
    subtitle: "Creativity comes in many forms",
    category: "skill",
    options: [
      { label: "Very creative — I love designing and aesthetics", value: "high", icon: "✨" },
      { label: "I'm more analytical than creative", value: "low", icon: "📈" },
      { label: "I'm creative with solutions, not visuals", value: "technical", icon: "💡" },
      { label: "Somewhere in between", value: "medium", icon: "🎭" },
    ],
  },
  {
    id: "s_project_type_1",
    question: "What type of projects excite you?",
    subtitle: "Imagine your dream project",
    category: "skill",
    options: [
      { label: "Building web/mobile apps people use daily", value: "apps", icon: "📱" },
      { label: "Analyzing data to uncover insights", value: "analytics", icon: "🔍" },
      { label: "Automating processes and infrastructure", value: "automation", icon: "🤖" },
      { label: "Testing and ensuring quality", value: "quality", icon: "✅" },
    ],
  },
  {
    id: "s_detail_1",
    question: "How do you feel about attention to detail?",
    subtitle: "Pixel-perfect or big-picture thinker?",
    category: "skill",
    options: [
      { label: "Pixel-perfect — every detail matters", value: "high", icon: "🔎" },
      { label: "Big picture first, details later", value: "low", icon: "🌐" },
      { label: "Depends on the context", value: "balanced", icon: "⚖️" },
      { label: "I focus on logic and efficiency", value: "efficiency", icon: "⚡" },
    ],
  },
  {
    id: "s_coding_interest_1",
    question: "Which coding challenge sounds most interesting?",
    subtitle: "Pick what you'd enjoy working on",
    category: "skill",
    options: [
      { label: "Building a responsive dashboard UI", value: "ui", icon: "🖥️" },
      { label: "Designing a scalable database system", value: "database", icon: "🗄️" },
      { label: "Creating a machine learning model", value: "ml", icon: "🤖" },
      { label: "Optimizing application performance", value: "performance", icon: "⚡" },
    ],
  },
  {
    id: "s_learning_style_1",
    question: "How do you learn best?",
    subtitle: "What's your preferred learning method?",
    category: "skill",
    options: [
      { label: "Reading documentation and books", value: "reading", icon: "📖" },
      { label: "Watching video tutorials", value: "visual", icon: "🎥" },
      { label: "Building projects hands-on", value: "practical", icon: "🔨" },
      { label: "Taking structured courses", value: "structured", icon: "🎓" },
    ],
  },
  {
    id: "s_technical_depth_1",
    question: "What level of technical depth interests you?",
    subtitle: "How deep do you want to go?",
    category: "skill",
    options: [
      { label: "Deep expertise in one area", value: "specialist", icon: "🎯" },
      { label: "Broad knowledge across multiple areas", value: "generalist", icon: "🌐" },
      { label: "Balance between depth and breadth", value: "t_shaped", icon: "📐" },
      { label: "Whatever gets the job done", value: "pragmatic", icon: "🛠️" },
    ],
  },
  {
    id: "s_debug_approach_1",
    question: "How do you approach debugging?",
    subtitle: "When code breaks or doesn't work",
    category: "skill",
    options: [
      { label: "Systematic debugging with logs and breakpoints", value: "systematic", icon: "🔍" },
      { label: "Google and Stack Overflow first", value: "research", icon: "🌐" },
      { label: "Ask experienced developers for help", value: "collaborative", icon: "🤝" },
      { label: "Trial and error until it works", value: "experimental", icon: "🎲" },
    ],
  },
  {
    id: "s_tool_preference_1",
    question: "What tools/technologies interest you most?",
    subtitle: "Pick what sounds coolest",
    category: "skill",
    options: [
      { label: "Modern frameworks like React, Vue, Angular", value: "frameworks", icon: "⚛️" },
      { label: "Databases and data pipelines", value: "data_tools", icon: "🗄️" },
      { label: "Cloud platforms like AWS, Azure, GCP", value: "cloud", icon: "☁️" },
      { label: "AI/ML libraries like TensorFlow, PyTorch", value: "ai_tools", icon: "🧠" },
    ],
  },
  {
    id: "s_code_quality_1",
    question: "How important is code quality to you?",
    subtitle: "Clean code vs getting things done",
    category: "skill",
    options: [
      { label: "Extremely — clean, maintainable code is crucial", value: "high", icon: "✨" },
      { label: "Important but pragmatic about deadlines", value: "balanced", icon: "⚖️" },
      { label: "Get it working first, refactor later", value: "pragmatic", icon: "🚀" },
      { label: "Depends on the project context", value: "contextual", icon: "🎯" },
    ],
  },
  {
    id: "s_documentation_1",
    question: "How do you feel about writing documentation?",
    subtitle: "README files, API docs, code comments",
    category: "skill",
    options: [
      { label: "Love it — documentation is crucial", value: "loves", icon: "📝" },
      { label: "I do it when necessary", value: "pragmatic", icon: "✍️" },
      { label: "I prefer self-documenting code", value: "minimal", icon: "💻" },
      { label: "Not my favorite but I understand its value", value: "accepts", icon: "📄" },
    ],
  },
  {
    id: "s_new_tech_1",
    question: "How do you keep up with new technologies?",
    subtitle: "The tech world moves fast",
    category: "skill",
    options: [
      { label: "Actively follow tech news and blogs", value: "active", icon: "📰" },
      { label: "Learn when needed for projects", value: "as_needed", icon: "🎯" },
      { label: "Focus on fundamentals over trends", value: "fundamentals", icon: "📚" },
      { label: "Experiment with new tech in side projects", value: "experimental", icon: "🔬" },
    ],
  },
  {
    id: "s_architecture_1",
    question: "What interests you about system design?",
    subtitle: "How things are built at scale",
    category: "skill",
    options: [
      { label: "Designing user-facing features", value: "frontend_arch", icon: "🎨" },
      { label: "Building scalable backend systems", value: "backend_arch", icon: "🏗️" },
      { label: "Data flow and processing pipelines", value: "data_arch", icon: "🔄" },
      { label: "Security and infrastructure", value: "infra_arch", icon: "🔐" },
    ],
  },
  // Add more skill questions...
  {
    id: "s_testing_1",
    question: "How do you feel about testing?",
    subtitle: "Unit tests, integration tests, QA",
    category: "skill",
    options: [
      { label: "Essential — I write tests for everything", value: "thorough", icon: "✅" },
      { label: "Important for critical features", value: "selective", icon: "🎯" },
      { label: "Manual testing is enough for me", value: "manual", icon: "👨‍💻" },
      { label: "I struggle with testing discipline", value: "minimal", icon: "😅" },
    ],
  },
  {
    id: "s_ui_interest_1",
    question: "How interested are you in user interface design?",
    subtitle: "Making things look good and work well",
    category: "skill",
    options: [
      { label: "Very interested — design is my passion", value: "high", icon: "🎨" },
      { label: "Moderately — I appreciate good design", value: "moderate", icon: "👍" },
      { label: "Not really — I prefer backend logic", value: "low", icon: "⚙️" },
      { label: "I can do it but don't love it", value: "capable", icon: "🤷" },
    ],
  },
  {
    id: "s_algorithm_1",
    question: "How do you feel about algorithms and data structures?",
    subtitle: "Sorting, searching, optimization problems",
    category: "skill",
    options: [
      { label: "Love them — they're like puzzles", value: "loves", icon: "🧩" },
      { label: "Understand them but don't seek them out", value: "capable", icon: "📚" },
      { label: "Find them challenging and intimidating", value: "struggles", icon: "😰" },
      { label: "I use libraries — don't reinvent the wheel", value: "pragmatic", icon: "🛠️" },
    ],
  },
  {
    id: "s_api_interest_1",
    question: "What aspect of APIs interests you most?",
    subtitle: "How different systems talk to each other",
    category: "skill",
    options: [
      { label: "Designing clean, intuitive API interfaces", value: "design", icon: "📐" },
      { label: "Building robust backend API logic", value: "backend", icon: "⚙️" },
      { label: "Consuming APIs to build features", value: "consumer", icon: "🔌" },
      { label: "API security and authentication", value: "security", icon: "🔐" },
    ],
  },
  {
    id: "s_performance_1",
    question: "How much do you care about performance optimization?",
    subtitle: "Speed, efficiency, resource usage",
    category: "skill",
    options: [
      { label: "Very much — I obsess over milliseconds", value: "high", icon: "⚡" },
      { label: "Important but not my top priority", value: "moderate", icon: "⚖️" },
      { label: "Only when there's a noticeable problem", value: "reactive", icon: "🔥" },
      { label: "I trust frameworks to handle it", value: "trusting", icon: "🛡️" },
    ],
  },
];

// HELPER QUESTIONS (Narrow down specific career paths)
export const helperQuestions: QuizQuestion[] = [
  {
    id: "h_platform_1",
    question: "Which platform interests you most?",
    subtitle: "Where do you want your work to live?",
    category: "helper",
    options: [
      { label: "Web browsers (desktop & mobile web)", value: "web", icon: "🌐" },
      { label: "Mobile apps (iOS & Android)", value: "mobile", icon: "📱" },
      { label: "Desktop applications", value: "desktop", icon: "🖥️" },
      { label: "Backend servers & APIs", value: "backend", icon: "⚙️" },
    ],
  },
  {
    id: "h_industry_1",
    question: "Which industry appeals to you most?",
    subtitle: "Where do you want to make an impact?",
    category: "helper",
    options: [
      { label: "Fintech & Banking", value: "fintech", icon: "💰" },
      { label: "Healthcare & Medical Tech", value: "healthcare", icon: "🏥" },
      { label: "E-commerce & Retail", value: "ecommerce", icon: "🛒" },
      { label: "Entertainment & Gaming", value: "entertainment", icon: "🎮" },
    ],
  },
  {
    id: "h_company_size_1",
    question: "What company size do you prefer?",
    subtitle: "Different sizes have different vibes",
    category: "helper",
    options: [
      { label: "Startup (< 50 people)", value: "startup", icon: "🚀" },
      { label: "Mid-size (50-500 people)", value: "midsize", icon: "🏢" },
      { label: "Large corporation (500+ people)", value: "enterprise", icon: "🏛️" },
      { label: "Doesn't matter to me", value: "flexible", icon: "🤷" },
    ],
  },
  {
    id: "h_salary_priority_1",
    question: "What's your salary expectation priority?",
    subtitle: "Be realistic about your goals",
    category: "helper",
    options: [
      { label: "Top tier salary is crucial (₹15L+ to start)", value: "high", icon: "💎" },
      { label: "Competitive but flexible (₹8-15L range)", value: "moderate", icon: "💰" },
      { label: "Entry-level is fine to start (₹4-8L)", value: "entry", icon: "🌱" },
      { label: "Learning matters more than initial salary", value: "learning", icon: "📚" },
    ],
  },
  {
    id: "h_travel_1",
    question: "How do you feel about work-related travel?",
    subtitle: "Some roles require travel or relocation",
    category: "helper",
    options: [
      { label: "I'd love to travel for work", value: "loves", icon: "✈️" },
      { label: "Occasional travel is fine", value: "occasional", icon: "🧳" },
      { label: "Prefer minimal to no travel", value: "minimal", icon: "🏠" },
      { label: "Open to relocation but not frequent travel", value: "relocate", icon: "📍" },
    ],
  },
  {
    id: "h_specialization_1",
    question: "Do you prefer specialization or variety?",
    subtitle: "Deep expertise vs diverse experiences",
    category: "helper",
    options: [
      { label: "Specialize deeply in one area", value: "specialist", icon: "🎯" },
      { label: "Work across multiple technologies", value: "generalist", icon: "🌐" },
      { label: "Start general, specialize later", value: "evolving", icon: "🔄" },
      { label: "Full-stack everything", value: "fullstack", icon: "🔧" },
    ],
  },
  {
    id: "h_certification_1",
    question: "How important are certifications to you?",
    subtitle: "AWS, Azure, Kubernetes, etc.",
    category: "helper",
    options: [
      { label: "Very important — I want to get certified", value: "high", icon: "🏆" },
      { label: "Nice to have for career growth", value: "moderate", icon: "📜" },
      { label: "Not important — skills matter more", value: "low", icon: "💪" },
      { label: "Only if employer pays for them", value: "pragmatic", icon: "💼" },
    ],
  },
  {
    id: "h_client_interaction_1",
    question: "How much client interaction do you want?",
    subtitle: "Meetings, calls, requirement gathering",
    category: "helper",
    options: [
      { label: "A lot — I enjoy client-facing work", value: "high", icon: "🤝" },
      { label: "Moderate — through team leads", value: "moderate", icon: "👥" },
      { label: "Minimal — I prefer technical focus", value: "low", icon: "💻" },
      { label: "Depends on the project", value: "flexible", icon: "🔄" },
    ],
  },
  {
    id: "h_deadline_pressure_1",
    question: "How do you handle tight deadlines?",
    subtitle: "Shipping fast vs taking time",
    category: "helper",
    options: [
      { label: "I thrive on tight deadlines", value: "thrives", icon: "⚡" },
      { label: "I can handle them but prefer breathing room", value: "manages", icon: "⏰" },
      { label: "I struggle with deadline pressure", value: "struggles", icon: "😰" },
      { label: "I need realistic timelines to do quality work", value: "needs_time", icon: "🎯" },
    ],
  },
  {
    id: "h_open_source_1",
    question: "Interest in open-source contribution?",
    subtitle: "Building in public, community projects",
    category: "helper",
    options: [
      { label: "Very interested — I want to contribute", value: "high", icon: "🌍" },
      { label: "Somewhat interested but not a priority", value: "moderate", icon: "👍" },
      { label: "Not interested — prefer private projects", value: "low", icon: "🔒" },
      { label: "Curious but haven't tried yet", value: "curious", icon: "🤔" },
    ],
  },
  {
    id: "h_mentorship_1",
    question: "How important is mentorship to you?",
    subtitle: "Having experienced guides in your journey",
    category: "helper",
    options: [
      { label: "Critical — I need strong mentorship", value: "critical", icon: "👨‍🏫" },
      { label: "Important but I'm also self-directed", value: "moderate", icon: "🎓" },
      { label: "I prefer learning independently", value: "independent", icon: "🧑‍💻" },
      { label: "I want to be a mentor myself", value: "mentor", icon: "🧙" },
    ],
  },
  {
    id: "h_job_security_1",
    question: "How important is job security?",
    subtitle: "Stable career vs high-risk high-reward",
    category: "helper",
    options: [
      { label: "Very important — I need stability", value: "high", icon: "🛡️" },
      { label: "Somewhat important but open to risks", value: "moderate", icon: "⚖️" },
      { label: "Not a priority — growth matters more", value: "low", icon: "🚀" },
      { label: "Depends on life stage and responsibilities", value: "contextual", icon: "🤔" },
    ],
  },
  {
    id: "h_education_bg_1",
    question: "What's your educational background?",
    subtitle: "This helps us recommend realistic paths",
    category: "helper",
    options: [
      { label: "CS/IT degree or in progress", value: "cs_degree", icon: "🎓" },
      { label: "Non-CS engineering degree", value: "other_engg", icon: "⚙️" },
      { label: "Non-technical degree", value: "non_tech", icon: "📚" },
      { label: "Self-taught / bootcamp", value: "self_taught", icon: "💻" },
    ],
  },
  {
    id: "h_current_level_1",
    question: "What's your current experience level?",
    subtitle: "Be honest — everyone starts somewhere",
    category: "helper",
    options: [
      { label: "Complete beginner — never coded", value: "beginner", icon: "🌱" },
      { label: "Some coding basics", value: "basic", icon: "📚" },
      { label: "Built a few projects", value: "intermediate", icon: "🔨" },
      { label: "Professional experience", value: "experienced", icon: "💼" },
    ],
  },
  {
    id: "h_legacy_vs_modern_1",
    question: "Legacy systems or modern tech?",
    subtitle: "Where do you want to work?",
    category: "helper",
    options: [
      { label: "Cutting-edge modern tech stack", value: "modern", icon: "🚀" },
      { label: "Stable, proven legacy systems", value: "legacy", icon: "🏛️" },
      { label: "Mix of both", value: "hybrid", icon: "🔄" },
      { label: "Whatever pays well", value: "pragmatic", icon: "💰" },
    ],
  },
];

// Combine all questions
export const allQuestions = {
  nature: natureQuestions,
  skill: skillQuestions,
  helper: helperQuestions,
};

export const getRandomQuestions = () => {
  // Select 3 random nature questions
  const shuffledNature = [...natureQuestions].sort(() => Math.random() - 0.5);
  const selectedNature = shuffledNature.slice(0, 3);
  
  // Select 5 random skill questions
  const shuffledSkill = [...skillQuestions].sort(() => Math.random() - 0.5);
  const selectedSkill = shuffledSkill.slice(0, 5);
  
  // Select 2 random helper questions
  const shuffledHelper = [...helperQuestions].sort(() => Math.random() - 0.5);
  const selectedHelper = shuffledHelper.slice(0, 2);
  
  // Combine in specific order: nature -> skill -> helper
  return [...selectedNature, ...selectedSkill, ...selectedHelper];
};
