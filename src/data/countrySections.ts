// Section definitions and shared content templates for the country ecosystem.
// Content is generated dynamically per country using shared templates + country stats.

import type { Country } from "./countries";

export const SECTIONS = [
  { slug: "", key: "overview", title: "Overview", short: "Overview" },
  { slug: "top-tech-jobs", key: "jobs", title: "Top Tech Jobs", short: "Top Jobs" },
  { slug: "salary-explorer", key: "salary", title: "Salary Explorer", short: "Salary Explorer" },
  { slug: "tech-roadmaps", key: "roadmaps", title: "Tech Roadmaps", short: "Roadmaps" },
  { slug: "resume-guide", key: "resume", title: "Resume Guide", short: "Resume Guide" },
  { slug: "interview-preparation", key: "interview", title: "Interview Preparation", short: "Interview Prep" },
  { slug: "top-companies", key: "companies", title: "Top Companies", short: "Top Companies" },
  { slug: "certifications", key: "certifications", title: "Certifications", short: "Certifications" },
  { slug: "skills-in-demand", key: "skills", title: "Skills in Demand", short: "Skills in Demand" },
  { slug: "career-resources", key: "resources", title: "Career Resources", short: "Career Resources" },
] as const;

export type SectionKey = (typeof SECTIONS)[number]["key"];

export interface RoleData {
  role: string;
  demand: "Very High" | "High" | "Medium" | "Growing";
  growth: string;
  skills: string[];
  // USD base salary bands (junior, mid, senior). Scaled per country.
  usdBase: [number, number, number];
}

export const ROLES: RoleData[] = [
  { role: "Software Engineer", demand: "Very High", growth: "+18% YoY", skills: ["Data Structures", "Algorithms", "System Design", "Git", "One backend language"], usdBase: [75000, 120000, 180000] },
  { role: "Frontend Developer", demand: "Very High", growth: "+16% YoY", skills: ["React / Next.js", "TypeScript", "Tailwind CSS", "Performance", "Accessibility"], usdBase: [65000, 105000, 160000] },
  { role: "Backend Developer", demand: "Very High", growth: "+17% YoY", skills: ["Node.js / Go / Java / Python", "PostgreSQL", "REST / gRPC", "Caching", "Auth"], usdBase: [70000, 115000, 175000] },
  { role: "Full Stack Developer", demand: "Very High", growth: "+20% YoY", skills: ["React", "Node.js", "PostgreSQL", "Deployment", "TypeScript"], usdBase: [70000, 115000, 170000] },
  { role: "QA Automation Engineer", demand: "High", growth: "+14% YoY", skills: ["Playwright / Cypress", "Selenium", "API testing", "CI/CD", "Bug triage"], usdBase: [60000, 95000, 145000] },
  { role: "Cybersecurity Engineer", demand: "Very High", growth: "+22% YoY", skills: ["Network security", "SIEM", "Threat modeling", "OWASP", "Cloud security"], usdBase: [80000, 130000, 195000] },
  { role: "Cloud Engineer", demand: "Very High", growth: "+21% YoY", skills: ["AWS / Azure / GCP", "Terraform", "Kubernetes", "Networking", "IAM"], usdBase: [85000, 135000, 200000] },
  { role: "AI Engineer", demand: "Very High", growth: "+34% YoY", skills: ["Python", "LLMs", "RAG", "PyTorch", "Vector DBs"], usdBase: [95000, 155000, 240000] },
  { role: "Machine Learning Engineer", demand: "Very High", growth: "+28% YoY", skills: ["Python", "PyTorch / TF", "MLOps", "Statistics", "Model serving"], usdBase: [90000, 150000, 230000] },
  { role: "DevOps Engineer", demand: "Very High", growth: "+19% YoY", skills: ["CI/CD", "Kubernetes", "Terraform", "Observability", "Cloud"], usdBase: [85000, 130000, 195000] },
  { role: "Data Analyst", demand: "High", growth: "+15% YoY", skills: ["SQL", "Excel", "Power BI / Tableau", "Python", "Statistics"], usdBase: [55000, 90000, 130000] },
  { role: "Data Scientist", demand: "Very High", growth: "+22% YoY", skills: ["Python", "Statistics", "ML", "SQL", "Storytelling"], usdBase: [80000, 130000, 195000] },
  { role: "Mobile Developer", demand: "High", growth: "+13% YoY", skills: ["React Native / Flutter", "Swift / Kotlin", "App Store deployment"], usdBase: [70000, 110000, 165000] },
  { role: "UI / UX Designer", demand: "High", growth: "+12% YoY", skills: ["Figma", "User research", "Prototyping", "Design systems"], usdBase: [60000, 100000, 150000] },
  { role: "Product Manager", demand: "Very High", growth: "+16% YoY", skills: ["Roadmapping", "Analytics", "User research", "Prioritization"], usdBase: [85000, 140000, 210000] },
];

export const TOP_SKILLS_2026 = [
  "React / Next.js",
  "TypeScript",
  "Python",
  "Java",
  "Go",
  "SQL / PostgreSQL",
  "AWS",
  "Docker",
  "Kubernetes",
  "Terraform",
  "Playwright",
  "AI / LLM Integration",
  "Prompt Engineering",
  "System Design",
  "Cybersecurity Basics",
  "MLOps",
  "GraphQL",
  "Rust",
  "Data Engineering",
  "Cloud Architecture",
];

export const ROADMAP_CARDS = [
  { title: "Frontend", slug: "frontend-developer", desc: "React, TypeScript, Next.js — build modern web apps.", level: "Beginner → Senior" },
  { title: "Backend", slug: "backend-developer", desc: "Node / Go / Java + PostgreSQL, APIs, caching, auth.", level: "Beginner → Senior" },
  { title: "Full Stack", slug: "fullstack-developer", desc: "End-to-end web apps with React + Node + Postgres.", level: "Beginner → Senior" },
  { title: "Java Developer", slug: "backend-developer", desc: "Spring Boot, JVM tuning, microservices.", level: "Beginner → Senior" },
  { title: "Python Developer", slug: "backend-developer", desc: "FastAPI, Django, data + AI-ready stack.", level: "Beginner → Senior" },
  { title: "QA Automation", slug: "qa-engineer", desc: "Playwright / Cypress + CI/CD test pipelines.", level: "Beginner → Senior" },
  { title: "DevOps", slug: "devops-engineer", desc: "K8s, Terraform, observability, SRE practices.", level: "Intermediate → Senior" },
  { title: "AI / ML", slug: "ai-ml-engineer", desc: "PyTorch, LLMs, RAG, MLOps.", level: "Intermediate → Senior" },
  { title: "Cloud Engineer", slug: "cloud-architect", desc: "AWS / Azure / GCP + IaC + networking.", level: "Intermediate → Senior" },
  { title: "Cybersecurity", slug: "cybersecurity-specialist", desc: "Blue-team, cloud sec, threat modeling.", level: "Beginner → Senior" },
];

export const CERTIFICATIONS = [
  { name: "AWS Certified Solutions Architect – Associate", provider: "AWS", why: "Most requested cloud certification in job listings.", url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/" },
  { name: "Microsoft Azure Fundamentals (AZ-900)", provider: "Microsoft", why: "Beginner-friendly entry into Azure.", url: "https://learn.microsoft.com/en-us/certifications/azure-fundamentals/" },
  { name: "Google Cloud Associate Cloud Engineer", provider: "Google Cloud", why: "Great for backend + DevOps roles.", url: "https://cloud.google.com/certification/cloud-engineer" },
  { name: "Oracle Certified Professional: Java SE", provider: "Oracle", why: "Still the gold standard for Java engineers.", url: "https://education.oracle.com/java-certification" },
  { name: "Cisco CCNA", provider: "Cisco", why: "Foundational networking cert for security & cloud.", url: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html" },
  { name: "CompTIA Security+", provider: "CompTIA", why: "Entry-level cybersecurity, DoD 8570 approved.", url: "https://www.comptia.org/certifications/security" },
  { name: "ISTQB Foundation Level", provider: "ISTQB", why: "Global QA/testing certification.", url: "https://www.istqb.org/certifications/certified-tester-foundation-level" },
  { name: "Microsoft Certified: Azure AI Engineer", provider: "Microsoft", why: "In-demand AI + cloud combo cert.", url: "https://learn.microsoft.com/en-us/certifications/azure-ai-engineer/" },
  { name: "Google Data Analytics Certificate", provider: "Coursera / Google", why: "Beginner-friendly path into data.", url: "https://www.coursera.org/professional-certificates/google-data-analytics" },
  { name: "Google IT Automation with Python", provider: "Coursera / Google", why: "Great starter cert for scripting + DevOps.", url: "https://www.coursera.org/professional-certificates/google-it-automation" },
];

export const GLOBAL_COMPANIES = [
  { name: "Google", url: "https://careers.google.com" },
  { name: "Microsoft", url: "https://careers.microsoft.com" },
  { name: "Amazon", url: "https://www.amazon.jobs" },
  { name: "Apple", url: "https://jobs.apple.com" },
  { name: "Meta", url: "https://www.metacareers.com" },
  { name: "Nvidia", url: "https://www.nvidia.com/en-us/about-nvidia/careers/" },
  { name: "Netflix", url: "https://jobs.netflix.com" },
  { name: "Adobe", url: "https://careers.adobe.com" },
];

export const INTERVIEW_TOPICS = {
  coding: [
    "Arrays & Strings — two pointers, sliding window",
    "Hash maps & sets — O(1) lookups",
    "Trees & Graphs — DFS, BFS, shortest paths",
    "Dynamic programming — memoization & tabulation",
    "Sorting & searching — binary search variants",
    "Recursion & backtracking",
    "Linked lists — reversal, cycle detection",
    "Heaps & priority queues",
  ],
  systemDesign: [
    "Design a URL shortener (bit.ly)",
    "Design Twitter feed / news feed",
    "Design WhatsApp / chat system",
    "Design a rate limiter",
    "Design YouTube / video streaming",
    "Design a distributed cache",
    "Design a payment system",
    "Design Uber / ride matching",
  ],
  behavioral: [
    "Tell me about yourself.",
    "Describe a project you're most proud of and why.",
    "Tell me about a time you disagreed with a teammate.",
    "How do you handle tight deadlines?",
    "Describe a time you failed and what you learned.",
    "Why this company, why this role?",
  ],
  hr: [
    "Walk me through your resume.",
    "Why are you leaving your current role?",
    "What are your salary expectations?",
    "Where do you see yourself in 3 years?",
    "Are you willing to relocate?",
  ],
};

// ---------- Salary helpers ----------

export function scaleUsd(usd: number, mult: number, currencyMultiplier = 1): number {
  // For non-USD, we still show a rough local-currency figure by multiplying by an approximate rate.
  // Since we do not want to hardcode FX, we display both USD-equivalent and the country's currencySymbol
  // in cases where multiplier already reflects local cost. We keep it simple: multiplier gives local
  // gross-figure "purchasing" bands; display uses the country's currency symbol as a local-market marker.
  return Math.round((usd * mult * currencyMultiplier) / 1000) * 1000;
}

export function formatLocalSalary(country: Country, usdAmount: number): string {
  const scaled = Math.round((usdAmount * country.salaryMultiplier) / 1000) * 1000;
  // Currencies where units are typically in "lakh"/"crore" or high numbers — we still show raw local number.
  return `${country.currencySymbol}${scaled.toLocaleString("en-US")}`;
}

export function getRoleSalaryBand(country: Country, role: RoleData) {
  return {
    junior: formatLocalSalary(country, role.usdBase[0]),
    mid: formatLocalSalary(country, role.usdBase[1]),
    senior: formatLocalSalary(country, role.usdBase[2]),
  };
}
