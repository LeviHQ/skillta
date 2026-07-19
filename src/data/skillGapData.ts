// Skill Gap Analyzer — role definitions with required skills + roadmap metadata
// Algorithm-driven (no AI). Each skill has priority, category and preferred week for a 6-8 week study plan.

export type SkillPriority = "core" | "important" | "nice-to-have";
export type SkillCategory =
  | "fundamentals"
  | "language"
  | "framework"
  | "tools"
  | "database"
  | "cloud"
  | "testing"
  | "soft"
  | "advanced";

export interface RequiredSkill {
  name: string;
  aliases?: string[];
  priority: SkillPriority;
  category: SkillCategory;
  week: number; // 1..8
  resource: string;
  project?: string;
}

export interface TargetRole {
  id: string;
  name: string;
  emoji: string;
  description: string;
  weeks: number; // total plan length
  skills: RequiredSkill[];
}

/**
 * Skill alias normalizer — handles common variants users type.
 */
const GLOBAL_ALIASES: Record<string, string[]> = {
  javascript: ["js", "es6", "ecmascript", "vanilla js"],
  typescript: ["ts"],
  react: ["reactjs", "react.js"],
  "node.js": ["node", "nodejs"],
  "next.js": ["next", "nextjs"],
  html: ["html5"],
  css: ["css3"],
  "rest apis": ["rest", "rest api", "restful", "http apis"],
  git: ["github", "version control", "gitlab"],
  sql: ["mysql", "postgres", "postgresql", "sqlite"],
  mongodb: ["mongo", "nosql"],
  docker: ["containers", "containerization"],
  kubernetes: ["k8s"],
  aws: ["amazon web services"],
  gcp: ["google cloud"],
  python: ["py"],
  "machine learning": ["ml"],
  "deep learning": ["dl", "neural networks"],
  pandas: ["dataframes"],
  numpy: ["np"],
  tensorflow: ["tf"],
  pytorch: ["torch"],
  figma: ["design tool"],
  tailwind: ["tailwindcss", "tailwind css"],
  jest: ["unit testing js"],
  cypress: ["e2e testing"],
  linux: ["unix", "bash", "shell"],
  redux: ["redux toolkit", "rtk"],
  graphql: ["gql"],
};

export function normalizeSkill(raw: string): string {
  return raw.trim().toLowerCase().replace(/[.\-_]+/g, " ").replace(/\s+/g, " ");
}

export function matchesSkill(userSkill: string, required: RequiredSkill): boolean {
  const u = normalizeSkill(userSkill);
  const target = normalizeSkill(required.name);
  if (u === target) return true;
  if (u.includes(target) || target.includes(u)) return true;
  const localAliases = (required.aliases || []).map(normalizeSkill);
  if (localAliases.some((a) => a === u || u.includes(a) || a.includes(u))) return true;
  const global = GLOBAL_ALIASES[target] || [];
  if (global.some((a) => normalizeSkill(a) === u)) return true;
  return false;
}

/* -------------------------- ROLE DEFINITIONS -------------------------- */

const s = (
  name: string,
  priority: SkillPriority,
  category: SkillCategory,
  week: number,
  resource: string,
  project?: string,
  aliases?: string[]
): RequiredSkill => ({ name, priority, category, week, resource, project, aliases });

export const TARGET_ROLES: TargetRole[] = [
  {
    id: "frontend-developer",
    name: "Frontend Developer",
    emoji: "🎨",
    description: "Build modern, responsive user interfaces for web apps.",
    weeks: 8,
    skills: [
      s("HTML", "core", "fundamentals", 1, "MDN HTML Basics", "Static portfolio page"),
      s("CSS", "core", "fundamentals", 1, "MDN CSS + Flexbox/Grid guide", "Responsive landing page"),
      s("JavaScript", "core", "language", 2, "javascript.info full course", "DOM to-do list app"),
      s("Git", "core", "tools", 2, "Pro Git book (ch 1-3)", "Push your project to GitHub"),
      s("React", "core", "framework", 3, "React official docs (learn)", "Weather app with hooks"),
      s("Tailwind CSS", "important", "framework", 3, "Tailwind docs", "Redesign your landing page"),
      s("REST APIs", "core", "fundamentals", 4, "MDN Fetch + Postman basics", "Movie search app using TMDB"),
      s("TypeScript", "important", "language", 4, "TypeScript in 50 Lessons", "Add TS to your React app"),
      s("Testing", "important", "testing", 5, "Testing Library + Vitest docs", "Add tests to weather app", ["react testing library", "vitest", "jest"]),
      s("Accessibility", "important", "fundamentals", 5, "web.dev a11y course", "Audit your app with Lighthouse", ["a11y", "wcag"]),
      s("Next.js", "important", "framework", 6, "Next.js learn tutorial", "Build a blog with SSR"),
      s("Performance Optimization", "nice-to-have", "advanced", 7, "web.dev performance patterns", "Beat Lighthouse 90+ scores"),
      s("Deployment", "important", "cloud", 7, "Vercel / Netlify docs", "Ship 3 projects live", ["vercel", "netlify", "hosting"]),
    ],
  },
  {
    id: "backend-developer",
    name: "Backend Developer",
    emoji: "⚙️",
    description: "Design APIs, business logic and data layers that power apps.",
    weeks: 8,
    skills: [
      s("JavaScript", "core", "language", 1, "javascript.info", "CLI calculator"),
      s("Node.js", "core", "framework", 2, "Node.js docs + FreeCodeCamp", "File organizer script"),
      s("Express.js", "core", "framework", 3, "Express getting started", "REST API for a todo app", ["express"]),
      s("REST APIs", "core", "fundamentals", 3, "REST API design guide (Microsoft)", "Blog API with CRUD"),
      s("SQL", "core", "database", 4, "PostgreSQL tutorial", "E-commerce DB schema"),
      s("MongoDB", "important", "database", 4, "MongoDB University M001", "Chat app storage"),
      s("Git", "core", "tools", 1, "Pro Git", "Push all mini-projects"),
      s("Authentication", "core", "fundamentals", 5, "JWT + OAuth 2.0 guides", "Auth service with JWT", ["jwt", "auth", "oauth"]),
      s("Docker", "important", "tools", 6, "Docker for beginners (Docker Curriculum)", "Containerize your API"),
      s("Testing", "important", "testing", 6, "Jest + Supertest", "Write API tests"),
      s("AWS", "important", "cloud", 7, "AWS Cloud Practitioner path", "Deploy API to EC2/Lambda"),
      s("System Design", "nice-to-have", "advanced", 8, "System Design Primer (GitHub)", "Design URL shortener"),
      s("GraphQL", "nice-to-have", "framework", 8, "How to GraphQL", "Convert one REST endpoint to GQL"),
    ],
  },
  {
    id: "fullstack-developer",
    name: "Fullstack Developer",
    emoji: "🧩",
    description: "Ship complete web products end-to-end.",
    weeks: 8,
    skills: [
      s("HTML", "core", "fundamentals", 1, "MDN HTML", "Portfolio"),
      s("CSS", "core", "fundamentals", 1, "MDN CSS", "Responsive design"),
      s("JavaScript", "core", "language", 2, "javascript.info", "DOM projects"),
      s("Git", "core", "tools", 1, "Pro Git", "GitHub push"),
      s("React", "core", "framework", 3, "React docs", "SPA with routing"),
      s("Node.js", "core", "framework", 4, "Node.js docs", "REST API"),
      s("Express.js", "core", "framework", 4, "Express docs", "CRUD API"),
      s("MongoDB", "important", "database", 5, "MongoDB M001", "Blog DB"),
      s("SQL", "important", "database", 5, "PG tutorial", "Query practice"),
      s("REST APIs", "core", "fundamentals", 5, "REST guide", "Frontend + backend link"),
      s("TypeScript", "important", "language", 6, "TS handbook", "Add TS everywhere"),
      s("Authentication", "core", "fundamentals", 6, "JWT + Supabase auth", "Full login flow"),
      s("Deployment", "important", "cloud", 7, "Vercel + Render docs", "Ship MERN app"),
      s("Testing", "important", "testing", 7, "Jest + RTL", "Add tests"),
      s("Docker", "nice-to-have", "tools", 8, "Docker Curriculum", "Containerize"),
    ],
  },
  {
    id: "data-analyst",
    name: "Data Analyst",
    emoji: "📊",
    description: "Turn raw data into decisions using SQL, Excel, Python and BI tools.",
    weeks: 6,
    skills: [
      s("Excel", "core", "tools", 1, "Excel to Excellence (Coursera)", "Sales dashboard in Excel"),
      s("SQL", "core", "database", 2, "Mode SQL Tutorial", "Analyze e-commerce dataset"),
      s("Statistics", "core", "fundamentals", 2, "Khan Academy Statistics", "A/B test simulation"),
      s("Python", "important", "language", 3, "Python for Everybody", "Automate CSV cleanup"),
      s("Pandas", "important", "framework", 3, "Pandas 10 min guide", "Clean & analyze dataset"),
      s("Data Visualization", "core", "framework", 4, "Storytelling with Data (book)", "Portfolio dashboard", ["matplotlib", "seaborn"]),
      s("Power BI", "important", "tools", 4, "MS Learn Power BI path", "Live dashboard"),
      s("Tableau", "nice-to-have", "tools", 5, "Tableau free training", "Public visualization"),
      s("Business Communication", "important", "soft", 5, "HBR articles", "Present a data story"),
      s("Git", "important", "tools", 6, "Pro Git", "GitHub notebook portfolio"),
    ],
  },
  {
    id: "data-scientist",
    name: "Data Scientist",
    emoji: "🔬",
    description: "Build predictive models and derive insights from complex data.",
    weeks: 8,
    skills: [
      s("Python", "core", "language", 1, "Python for Everybody", "Small analytics script"),
      s("Statistics", "core", "fundamentals", 2, "Statistical Learning (Stanford)", "Hypothesis tests"),
      s("Linear Algebra", "important", "fundamentals", 2, "3Blue1Brown Essence of LA", "PCA from scratch"),
      s("Pandas", "core", "framework", 3, "Pandas docs", "EDA notebook"),
      s("NumPy", "core", "framework", 3, "NumPy quickstart", "Matrix operations"),
      s("SQL", "core", "database", 4, "Mode SQL", "Query 1M row dataset"),
      s("Machine Learning", "core", "advanced", 5, "Andrew Ng ML Specialization", "Predict churn"),
      s("Scikit-learn", "core", "framework", 5, "sklearn docs", "Classification project"),
      s("Deep Learning", "important", "advanced", 6, "fast.ai course", "Image classifier"),
      s("TensorFlow", "important", "framework", 6, "TF tutorials", "Deploy a small model"),
      s("Data Visualization", "important", "framework", 7, "Storytelling with Data", "Model results dashboard"),
      s("Git", "core", "tools", 1, "Pro Git", "Notebook portfolio"),
      s("MLOps", "nice-to-have", "advanced", 8, "MLOps zoomcamp", "Model deployment pipeline"),
    ],
  },
  {
    id: "ml-engineer",
    name: "Machine Learning Engineer",
    emoji: "🤖",
    description: "Ship production ML systems that scale.",
    weeks: 8,
    skills: [
      s("Python", "core", "language", 1, "Python for Everybody", "Practice scripts"),
      s("Machine Learning", "core", "advanced", 3, "Andrew Ng ML", "Baseline models"),
      s("Deep Learning", "core", "advanced", 4, "fast.ai", "CNN classifier"),
      s("PyTorch", "important", "framework", 4, "PyTorch tutorials", "Train a small model"),
      s("TensorFlow", "important", "framework", 5, "TF tutorials", "Serve a model"),
      s("MLOps", "core", "advanced", 6, "Made With ML", "CI/CD for ML"),
      s("Docker", "core", "tools", 6, "Docker Curriculum", "Containerize model"),
      s("AWS", "important", "cloud", 7, "AWS ML learning path", "Deploy on SageMaker"),
      s("SQL", "important", "database", 2, "Mode SQL", "Feature queries"),
      s("Git", "core", "tools", 1, "Pro Git", "Version code + models"),
      s("System Design", "nice-to-have", "advanced", 8, "Designing ML Systems (book)", "Design a feed ranking system"),
    ],
  },
  {
    id: "devops-engineer",
    name: "DevOps Engineer",
    emoji: "🛠️",
    description: "Automate build, deploy and observability pipelines.",
    weeks: 8,
    skills: [
      s("Linux", "core", "fundamentals", 1, "Linux Journey", "Automate 5 shell tasks", ["bash", "shell"]),
      s("Git", "core", "tools", 1, "Pro Git", "Multi-branch workflow"),
      s("Docker", "core", "tools", 2, "Docker Curriculum", "Dockerize a webapp"),
      s("Kubernetes", "core", "tools", 3, "KodeKloud K8s beginner", "Deploy k8s cluster locally"),
      s("CI/CD", "core", "advanced", 4, "GitHub Actions docs", "Full pipeline"),
      s("AWS", "core", "cloud", 5, "AWS Cloud Practitioner + SAA-C03", "3-tier deploy"),
      s("Terraform", "important", "tools", 6, "HashiCorp Learn", "Provision infra as code"),
      s("Monitoring", "important", "tools", 7, "Prometheus + Grafana docs", "Add observability", ["prometheus", "grafana"]),
      s("Networking", "important", "fundamentals", 2, "Computer Networking Fundamentals (freeCodeCamp)", "Debug DNS + firewalls"),
      s("Python", "nice-to-have", "language", 8, "Python for DevOps", "Write automation scripts"),
    ],
  },
  {
    id: "cybersecurity-analyst",
    name: "Cybersecurity Analyst",
    emoji: "🛡️",
    description: "Defend systems, detect intrusions and respond to threats.",
    weeks: 8,
    skills: [
      s("Networking", "core", "fundamentals", 1, "Practical Networking YT", "Wireshark exercises"),
      s("Linux", "core", "fundamentals", 2, "Linux Journey", "CLI mastery"),
      s("Security Fundamentals", "core", "fundamentals", 3, "CompTIA Security+ SY0-701", "Practice tests"),
      s("Python", "important", "language", 3, "Python for Security", "Port scanner script"),
      s("SIEM Tools", "important", "tools", 4, "Splunk Free training", "Investigate alerts", ["splunk", "elk"]),
      s("Ethical Hacking", "important", "advanced", 5, "TryHackMe learning path", "Complete 20 rooms", ["penetration testing", "pentest"]),
      s("OWASP Top 10", "core", "fundamentals", 4, "OWASP official docs", "Fix vulnerable webapp"),
      s("Incident Response", "important", "advanced", 6, "SANS IR guides", "Runbook creation"),
      s("Cloud Security", "important", "cloud", 7, "AWS Security Learning Plan", "Harden a VPC"),
      s("Cryptography", "nice-to-have", "fundamentals", 8, "Stanford Crypto I", "Implement AES demo"),
    ],
  },
  {
    id: "product-manager",
    name: "Product Manager",
    emoji: "🧭",
    description: "Own product strategy, discovery, roadmap and delivery.",
    weeks: 6,
    skills: [
      s("Product Thinking", "core", "fundamentals", 1, "Inspired (Marty Cagan)", "Teardown of 3 apps"),
      s("User Research", "core", "fundamentals", 2, "Interviewing Users (book)", "Run 5 user interviews"),
      s("Data Analysis", "core", "fundamentals", 3, "Mode SQL + Amplitude academy", "Cohort analysis"),
      s("SQL", "important", "database", 3, "Mode SQL", "Product metrics queries"),
      s("Wireframing", "important", "tools", 4, "Figma basics", "Wireframe a feature", ["figma"]),
      s("Roadmapping", "core", "soft", 4, "Roadmap templates (ProductPlan)", "Draft quarterly roadmap"),
      s("Agile/Scrum", "core", "fundamentals", 5, "Scrum Guide", "Facilitate mock sprint"),
      s("A/B Testing", "important", "advanced", 5, "Trustworthy Online Experiments (book)", "Design an A/B test"),
      s("Communication", "core", "soft", 6, "HBR communication reads", "Present PRD to peers"),
      s("Business Metrics", "important", "fundamentals", 6, "Lean Analytics (book)", "Build metric tree"),
    ],
  },
  {
    id: "ai-engineer",
    name: "AI Engineer (LLM / GenAI)",
    emoji: "🧠",
    description: "Build LLM-powered products with RAG, evals and agents.",
    weeks: 8,
    skills: [
      s("Python", "core", "language", 1, "Python for Everybody", "CLI utils"),
      s("Machine Learning", "important", "advanced", 2, "Andrew Ng ML", "Baseline models"),
      s("LLM Fundamentals", "core", "advanced", 3, "Karpathy: LLM from scratch series", "Understand tokens/context"),
      s("Prompt Engineering", "core", "advanced", 3, "Anthropic Prompt Course", "Design 5 prompts"),
      s("LangChain", "important", "framework", 4, "LangChain docs", "Simple chain"),
      s("Vector Databases", "core", "database", 4, "Pinecone / pgvector docs", "Embed 1000 docs"),
      s("RAG", "core", "advanced", 5, "LlamaIndex tutorials", "Q&A over PDFs"),
      s("REST APIs", "core", "fundamentals", 2, "MDN Fetch", "Wrap OpenAI in an API"),
      s("Evals", "important", "advanced", 6, "OpenAI Evals + Braintrust", "Evaluate a chatbot"),
      s("Deployment", "important", "cloud", 7, "Vercel + Modal docs", "Deploy an agent"),
      s("Fine-tuning", "nice-to-have", "advanced", 8, "HuggingFace PEFT", "LoRA a small model"),
      s("Git", "core", "tools", 1, "Pro Git", "Version everything"),
    ],
  },
  {
    id: "mobile-developer",
    name: "Mobile Developer",
    emoji: "📱",
    description: "Ship iOS and Android apps with cross-platform frameworks.",
    weeks: 8,
    skills: [
      s("JavaScript", "core", "language", 1, "javascript.info", "JS basics"),
      s("React", "core", "framework", 2, "React docs", "Web starter"),
      s("React Native", "core", "framework", 3, "React Native docs", "Todo app on device"),
      s("TypeScript", "important", "language", 3, "TS handbook", "Convert your app"),
      s("REST APIs", "core", "fundamentals", 4, "REST guide", "Consume APIs"),
      s("State Management", "important", "framework", 4, "Zustand / Redux Toolkit docs", "Global store", ["redux", "zustand"]),
      s("Firebase", "important", "cloud", 5, "Firebase docs", "Add auth + Firestore"),
      s("Native Modules", "nice-to-have", "advanced", 6, "RN native module guide", "Bridge a native API"),
      s("Testing", "important", "testing", 7, "Detox / Jest", "E2E tests"),
      s("App Store Deployment", "core", "cloud", 8, "Expo EAS docs", "Ship to Play Store"),
      s("Git", "core", "tools", 1, "Pro Git", "Version control"),
    ],
  },
  {
    id: "ui-ux-designer",
    name: "UI/UX Designer",
    emoji: "✨",
    description: "Design intuitive, beautiful, research-driven interfaces.",
    weeks: 6,
    skills: [
      s("Design Principles", "core", "fundamentals", 1, "Refactoring UI (book)", "Redesign a landing page"),
      s("Figma", "core", "tools", 1, "Figma tutorials on YT", "Design system starter"),
      s("Typography", "important", "fundamentals", 2, "Butterick's Practical Typography", "Type-only poster"),
      s("Color Theory", "important", "fundamentals", 2, "Refactoring UI ch. on color", "Palette exploration"),
      s("User Research", "core", "fundamentals", 3, "Interviewing Users", "5 user interviews"),
      s("Wireframing", "core", "tools", 3, "Figma", "Wireframe a mobile app"),
      s("Prototyping", "core", "tools", 4, "Figma prototyping", "Interactive prototype"),
      s("Accessibility", "important", "fundamentals", 4, "web.dev a11y", "Audit your design"),
      s("Design Systems", "important", "advanced", 5, "Atomic Design (book)", "Component library"),
      s("Portfolio", "core", "soft", 6, "Bestfolios inspiration", "Publish 3 case studies"),
    ],
  },
  {
    id: "cloud-engineer",
    name: "Cloud Engineer",
    emoji: "☁️",
    description: "Design, deploy and operate cloud infrastructure at scale.",
    weeks: 8,
    skills: [
      s("Linux", "core", "fundamentals", 1, "Linux Journey", "CLI drills"),
      s("Networking", "core", "fundamentals", 2, "Practical Networking", "VPC exercises"),
      s("AWS", "core", "cloud", 3, "AWS SAA-C03 course", "3-tier arch"),
      s("Docker", "core", "tools", 4, "Docker Curriculum", "Containerize app"),
      s("Kubernetes", "important", "tools", 5, "KodeKloud K8s", "EKS cluster"),
      s("Terraform", "core", "tools", 6, "HashiCorp Learn", "IaC full stack"),
      s("CI/CD", "important", "advanced", 6, "GH Actions docs", "Deploy pipeline"),
      s("Monitoring", "important", "tools", 7, "CloudWatch + Grafana", "Full observability"),
      s("Python", "important", "language", 2, "Python for DevOps", "Automation scripts"),
      s("Cloud Security", "important", "cloud", 8, "AWS Security path", "IAM hardening"),
      s("Git", "core", "tools", 1, "Pro Git", "Everything versioned"),
    ],
  },
  {
    id: "qa-engineer",
    name: "QA / Test Engineer",
    emoji: "🧪",
    description: "Ensure software quality through manual and automated testing.",
    weeks: 6,
    skills: [
      s("Testing Fundamentals", "core", "fundamentals", 1, "ISTQB Foundation syllabus", "Write test cases"),
      s("Manual Testing", "core", "testing", 1, "Ministry of Testing free content", "Test a live app"),
      s("SQL", "important", "database", 2, "Mode SQL", "Validate DB after tests"),
      s("JavaScript", "important", "language", 3, "javascript.info", "Basics"),
      s("Selenium", "important", "testing", 4, "Selenium Python bindings", "Automate login flow"),
      s("Cypress", "core", "testing", 4, "Cypress docs", "E2E for a webapp"),
      s("Postman", "core", "tools", 3, "Postman learning center", "API test suite"),
      s("CI/CD", "important", "advanced", 5, "GH Actions docs", "Run tests on PR"),
      s("Performance Testing", "nice-to-have", "testing", 6, "k6.io docs", "Load test an API"),
      s("Git", "core", "tools", 2, "Pro Git", "Version tests"),
    ],
  },
  {
    id: "blockchain-developer",
    name: "Blockchain Developer",
    emoji: "⛓️",
    description: "Build smart contracts and decentralized apps.",
    weeks: 8,
    skills: [
      s("JavaScript", "core", "language", 1, "javascript.info", "JS basics"),
      s("Blockchain Fundamentals", "core", "fundamentals", 2, "Mastering Ethereum (book)", "Notes/summary"),
      s("Solidity", "core", "language", 3, "CryptoZombies", "ERC-20 token"),
      s("Smart Contracts", "core", "advanced", 4, "Solidity by Example", "NFT contract"),
      s("Hardhat", "important", "tools", 4, "Hardhat docs", "Deploy to testnet"),
      s("Ethers.js", "core", "framework", 5, "Ethers docs", "Frontend for your contract"),
      s("React", "core", "framework", 5, "React docs", "dApp UI"),
      s("Security", "important", "advanced", 6, "Secureum bootcamp", "Audit a small contract"),
      s("IPFS", "nice-to-have", "tools", 7, "IPFS docs", "Store NFT metadata"),
      s("Git", "core", "tools", 1, "Pro Git", "Version contracts"),
      s("The Graph", "nice-to-have", "tools", 8, "The Graph docs", "Index your contract"),
    ],
  },
];

export function getRoleById(id: string): TargetRole | undefined {
  return TARGET_ROLES.find((r) => r.id === id);
}

/* --------------------------- ALGORITHM --------------------------- */

export interface GapResult {
  role: TargetRole;
  have: RequiredSkill[];
  missing: RequiredSkill[];
  extras: string[];
  matchPercent: number;
  matchLevel: "Beginner" | "Foundational" | "Intermediate" | "Advanced" | "Job-Ready";
  strengths: string[];
  weeklyPlan: WeeklyPlanItem[];
}

export interface WeeklyPlanItem {
  week: number;
  focus: string;
  skills: RequiredSkill[];
  microProject: string;
}

const WEIGHT: Record<SkillPriority, number> = { core: 3, important: 2, "nice-to-have": 1 };

const CATEGORY_FOCUS: Record<SkillCategory, string> = {
  fundamentals: "Foundations & Core Concepts",
  language: "Language Mastery",
  framework: "Frameworks & Libraries",
  database: "Data Layer",
  tools: "Developer Tooling",
  cloud: "Cloud & Deployment",
  testing: "Quality & Testing",
  soft: "Communication & Business",
  advanced: "Advanced Topics",
};

export function analyzeSkillGap(
  currentSkillsRaw: string[],
  roleId: string
): GapResult | null {
  const role = getRoleById(roleId);
  if (!role) return null;

  const cleaned = currentSkillsRaw
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const have: RequiredSkill[] = [];
  const missing: RequiredSkill[] = [];

  role.skills.forEach((req) => {
    const found = cleaned.some((c) => matchesSkill(c, req));
    if (found) have.push(req);
    else missing.push(req);
  });

  // Extras = user skills that don't map to required (bonus / transferable)
  const extras = cleaned.filter(
    (c) => !role.skills.some((req) => matchesSkill(c, req))
  );

  const totalWeight = role.skills.reduce((sum, r) => sum + WEIGHT[r.priority], 0);
  const haveWeight = have.reduce((sum, r) => sum + WEIGHT[r.priority], 0);
  const matchPercent = totalWeight === 0 ? 0 : Math.round((haveWeight / totalWeight) * 100);

  let matchLevel: GapResult["matchLevel"] = "Beginner";
  if (matchPercent >= 85) matchLevel = "Job-Ready";
  else if (matchPercent >= 65) matchLevel = "Advanced";
  else if (matchPercent >= 40) matchLevel = "Intermediate";
  else if (matchPercent >= 20) matchLevel = "Foundational";

  const strengths = have
    .filter((h) => h.priority !== "nice-to-have")
    .map((h) => h.name)
    .slice(0, 6);

  // Build weekly plan from missing skills, sorted by preferred week + priority
  const missingSorted = [...missing].sort((a, b) => {
    if (a.week !== b.week) return a.week - b.week;
    return WEIGHT[b.priority] - WEIGHT[a.priority];
  });

  const weekBuckets = new Map<number, RequiredSkill[]>();
  missingSorted.forEach((sk) => {
    const list = weekBuckets.get(sk.week) || [];
    list.push(sk);
    weekBuckets.set(sk.week, list);
  });

  const weeklyPlan: WeeklyPlanItem[] = Array.from(weekBuckets.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([week, skills]) => {
      // Focus = most common category in this week
      const catCount: Record<string, number> = {};
      skills.forEach((s) => (catCount[s.category] = (catCount[s.category] || 0) + 1));
      const topCat = Object.entries(catCount).sort((a, b) => b[1] - a[1])[0][0] as SkillCategory;

      const projectSkill = skills.find((s) => s.project) || skills[0];
      return {
        week,
        focus: CATEGORY_FOCUS[topCat],
        skills,
        microProject:
          projectSkill.project ||
          `Practical exercise applying ${skills.map((s) => s.name).join(", ")}`,
      };
    });

  return {
    role,
    have,
    missing,
    extras,
    matchPercent,
    matchLevel,
    strengths,
    weeklyPlan,
  };
}
