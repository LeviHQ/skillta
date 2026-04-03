// Centralized SEO configuration — domain-agnostic
export const SITE_CONFIG = {
  name: "SkillTa",
  tagline: "Find Your Perfect Tech Career Path",
  description: "AI-powered career guidance for tech. Take our quiz to discover your ideal career path — frontend, backend, data science, cybersecurity & more. Get a personalized roadmap with 50+ career paths.",
  keywords: "tech career roadmap, how to become a developer, best tech careers 2025, career guidance for programmers, learn to code, tech career quiz, career path finder, which tech career is right for me, career aptitude test, software developer roadmap",
  author: "SkillTa",
  twitterHandle: "@skillta_app",
  locale: "en_US",
  themeColor: "#6366f1",
};

// Dynamically resolve base URL from current window location
export function getBaseUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "https://skillta.tech";
}

export interface PageSEO {
  title: string;
  description: string;
  keywords?: string;
  path: string;
  type?: "website" | "article";
  noIndex?: boolean;
}

export const PAGE_SEO: Record<string, PageSEO> = {
  home: {
    title: "SkillTa — Find Your Perfect Tech Career Path | AI Career Quiz & Roadmaps",
    description: "Confused about which tech career to choose? Take SkillTa's free AI-powered career quiz and get a personalized roadmap for 50+ tech careers including frontend, backend, data science, cybersecurity, AI/ML & more.",
    keywords: "tech career quiz, career path finder, best tech careers 2025, learn to code, career guidance for programmers, tech career roadmap, which tech career is right for me, free career test, software developer roadmap, career aptitude test",
    path: "/",
  },
  quiz: {
    title: "Free AI Career Quiz — Discover Your Ideal Tech Career | SkillTa",
    description: "Answer 10 smart questions to find your perfect tech career match. Our AI analyzes your skills, interests & personality to recommend the best career path with a complete learning roadmap. 100% free.",
    keywords: "tech career quiz, which tech career is right for me, career aptitude test, coding career quiz, free career test, AI career recommendation, tech skills assessment",
    path: "/quiz",
  },
  results: {
    title: "Your Career Match Results | SkillTa",
    description: "See your personalized tech career recommendation with match percentage, learning roadmap, salary insights, and reality check. Download your roadmap as PDF.",
    keywords: "tech career results, career recommendation, personalized roadmap",
    path: "/results",
    noIndex: true,
  },
  roadmaps: {
    title: "50+ Tech Career Roadmaps — Step-by-Step Learning Paths | SkillTa",
    description: "Browse curated roadmaps for 50+ tech careers including frontend, backend, data science, cybersecurity, AI/ML, DevOps, game dev & more. Each roadmap includes free resources, projects, salary info & timelines.",
    keywords: "tech career roadmap, learning path, how to become a developer, frontend roadmap, backend roadmap, data science roadmap, cybersecurity roadmap, DevOps roadmap, career learning path free",
    path: "/roadmaps",
  },
  about: {
    title: "About SkillTa — Free AI-Powered Career Guidance for Tech",
    description: "SkillTa helps aspiring tech professionals find their ideal career path with honest, data-driven AI guidance. Free career quiz, 50+ roadmaps, and personalized recommendations.",
    keywords: "about skillta, tech career guidance, career mentoring platform, free tech career quiz",
    path: "/about",
  },
  contact: {
    title: "Contact SkillTa — Get in Touch With Our Team",
    description: "Have questions, feedback, or partnership ideas? Reach out to the SkillTa team. We respond within 24-48 hours.",
    keywords: "contact skillta, tech career help, career guidance support",
    path: "/contact",
  },
  dashboard: {
    title: "Dashboard — Your Career Journey | SkillTa",
    description: "Track your quiz results, view personalized career recommendations, and monitor your progress on your tech career journey.",
    path: "/dashboard",
    noIndex: true,
  },
  privacy: {
    title: "Privacy Policy — SkillTa",
    description: "Learn how SkillTa collects, uses, and protects your personal data. Your privacy matters to us.",
    path: "/privacy",
  },
  terms: {
    title: "Terms of Service — SkillTa",
    description: "Read the Terms of Service for SkillTa, the AI-powered tech career guidance platform.",
    path: "/terms",
  },
  compare: {
    title: "Compare Tech Careers Side by Side — Salary, Skills & Demand | SkillTa",
    description: "Can't decide between two tech careers? Compare salary, difficulty, required skills, job demand, and learning time side by side. 50+ careers to compare — Frontend vs Backend, Data Science vs Cybersecurity & more.",
    keywords: "compare tech careers, frontend vs backend, data science vs cybersecurity, career comparison tool, tech career salary comparison, which tech career is better, career comparison 2025",
    path: "/compare",
  },
  blog: {
    title: "Tech Career Blog — Guides, Salary Insights & Career Tips | SkillTa",
    description: "Expert articles on tech careers, salary guides, career comparisons, and step-by-step learning roadmaps. Everything you need to choose and succeed in your tech career.",
    keywords: "tech career blog, career guidance articles, tech salary guide, coding career tips, developer career advice, best tech careers 2025, learn coding blog",
    path: "/blog",
  },
};

// Generate JSON-LD structured data
export function getWebApplicationSchema() {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_CONFIG.name,
    url: baseUrl,
    description: SITE_CONFIG.description,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "2400",
    },
  };
}

export function getEducationalOrgSchema() {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SITE_CONFIG.name,
    url: baseUrl,
    description: "Free AI-powered career guidance platform helping people discover their ideal tech career path with personalized roadmaps",
    sameAs: [],
    logo: `${baseUrl}/favicon.png`,
  };
}

export function getWebsiteSchema() {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: baseUrl,
    description: SITE_CONFIG.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/roadmaps?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; path: string }[]) {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${baseUrl}${item.path}`,
    })),
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getCourseSchema(career: { title: string; description: string; id: string }) {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${career.title} Career Roadmap`,
    description: career.description,
    provider: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: baseUrl,
    },
    url: `${baseUrl}/roadmaps/${career.id}`,
    isAccessibleForFree: true,
  };
}

export function getHowToSchema() {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Find Your Perfect Tech Career",
    description: "Use SkillTa's AI-powered quiz to discover your ideal tech career path in under 5 minutes",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Take the AI Career Quiz",
        text: "Answer 10 smart questions about your interests, skills, and personality",
        url: `${baseUrl}/quiz`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Get Your Career Match",
        text: "Receive a personalized career recommendation with match percentage and detailed analysis",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Follow Your Roadmap",
        text: "Get a step-by-step learning path with free resources, project ideas, and timelines",
        url: `${baseUrl}/roadmaps`,
      },
    ],
    totalTime: "PT5M",
  };
}
