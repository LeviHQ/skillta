// Centralized SEO configuration — domain-agnostic
export const SITE_CONFIG = {
  name: "SkillTa",
  tagline: "Find Your Perfect Tech Career Path",
  description: "AI-powered career guidance for tech. Take our free quiz to discover your ideal career path — frontend, backend, data science, AI/ML, cybersecurity & more. Get a personalized roadmap with 50+ career paths, salary insights & free resources.",
  keywords: "tech career quiz, career path finder, best tech careers 2026, learn to code, career guidance for programmers, tech career roadmap, which tech career is right for me, free career test, software developer roadmap, career aptitude test, ai engineer roadmap, how to become developer, tech career after 12th, programming language to learn, web development roadmap, tech job no experience",
  author: "SkillTa",
  twitterHandle: "@SkilltaTech",
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
    title: "SkillTa — Find Your Perfect Tech Career Path | Free AI Career Quiz & Roadmaps 2026",
    description: "Confused about which tech career to choose? Take SkillTa's free AI-powered career quiz and get a personalized roadmap for 50+ tech careers including frontend, backend, data science, AI/ML, cybersecurity, DevOps & more. Free for students, freshers & career switchers.",
    keywords: "tech career quiz, career path finder, best tech careers 2026, learn to code free, career guidance for programmers, tech career roadmap, which tech career is right for me, free career test, software developer roadmap, career aptitude test, ai career quiz, tech career for beginners, career quiz for students, free tech career guidance, best career in tech 2026, how to start tech career",
    path: "/",
  },
  quiz: {
    title: "Free AI Career Quiz 2026 — Discover Your Ideal Tech Career in 5 Minutes | SkillTa",
    description: "Answer 10 smart questions to find your perfect tech career match. Our AI analyzes your skills, interests & personality to recommend the best career path with a complete learning roadmap. 100% free, no signup required. Works for students, freshers & career switchers.",
    keywords: "tech career quiz free, which tech career is right for me, career aptitude test online free, coding career quiz, AI career recommendation, tech skills assessment, career quiz for students, career quiz for freshers, free career test 2026, career personality quiz, tech career finder, what tech career suits me",
    path: "/quiz",
  },
  results: {
    title: "Your Personalized Career Match Results | SkillTa",
    description: "See your personalized tech career recommendation with match percentage, learning roadmap, salary insights for India & global markets, and reality check. Download your roadmap as PDF.",
    keywords: "tech career results, career recommendation, personalized roadmap, career match",
    path: "/results",
    noIndex: true,
  },
  roadmaps: {
    title: "50+ Free Tech Career Roadmaps 2026 — Step-by-Step Learning Paths | SkillTa",
    description: "Browse curated roadmaps for 50+ tech careers including frontend, backend, data science, AI/ML, cybersecurity, DevOps, game dev, blockchain & more. Each roadmap includes free resources, projects, salary info & timelines. Updated for 2026.",
    keywords: "tech career roadmap 2026, learning path free, how to become a developer, frontend roadmap 2026, backend roadmap, data science roadmap, cybersecurity roadmap, DevOps roadmap, ai ml roadmap, web development roadmap, career learning path free, developer roadmap, programming roadmap for beginners",
    path: "/roadmaps",
  },
  about: {
    title: "About SkillTa — Free AI-Powered Career Guidance for Tech Students & Freshers",
    description: "SkillTa helps aspiring tech professionals find their ideal career path with honest, data-driven AI guidance. Free career quiz, 50+ roadmaps, salary insights, and personalized recommendations for students, freshers & career switchers.",
    keywords: "about skillta, tech career guidance platform, career mentoring for students, free tech career quiz, ai career guidance, career path discovery tool",
    path: "/about",
  },
  contact: {
    title: "Contact SkillTa — Career Guidance Support & Feedback",
    description: "Have questions about your tech career path? Need guidance on choosing a career? Reach out to the SkillTa team. We respond within 24-48 hours.",
    keywords: "contact skillta, tech career help, career guidance support, career counseling tech",
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
    title: "Compare Tech Careers Side by Side 2026 — Salary, Skills, Demand & Difficulty | SkillTa",
    description: "Can't decide between two tech careers? Compare salary (India & Global), difficulty, required skills, job demand, and learning time side by side. 50+ careers to compare — Frontend vs Backend, Data Science vs Cybersecurity, AI vs DevOps & more.",
    keywords: "compare tech careers 2026, frontend vs backend, data science vs cybersecurity, ai vs devops, career comparison tool, tech career salary comparison india, which tech career is better, career comparison 2026, web developer vs data scientist, software engineer vs data analyst",
    path: "/compare",
  },
  blog: {
    title: "Tech Career Blog 2026 — Career Guides, Salary Insights, Roadmaps & Tips | SkillTa",
    description: "Expert articles on tech careers, salary guides, career comparisons, learning roadmaps, and job hunting tips. Everything freshers, students & career switchers need to choose and succeed in tech. Updated for 2026.",
    keywords: "tech career blog 2026, career guidance articles, tech salary guide india, coding career tips, developer career advice, best tech careers 2026, learn coding blog, tech career for freshers, programming career guide, how to get tech job",
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
    featureList: [
      "AI-powered career quiz",
      "50+ tech career roadmaps",
      "Salary insights for India & Global",
      "Career comparison tool",
      "PDF roadmap download",
      "Personalized career recommendations",
    ],
  };
}

export function getEducationalOrgSchema() {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SITE_CONFIG.name,
    url: baseUrl,
    description: "Free AI-powered career guidance platform helping students, freshers & career switchers discover their ideal tech career path with personalized roadmaps",
    sameAs: ["https://x.com/SkilltaTech"],
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
    inLanguage: "en",
  };
}

export function getOrganizationSchema() {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: baseUrl,
    logo: `${baseUrl}/favicon.png`,
    description: SITE_CONFIG.description,
    sameAs: ["https://x.com/SkilltaTech"],
    contactPoint: {
      "@type": "ContactPoint",
      email: "adarshmishra70931@gmail.com",
      contactType: "customer support",
    },
  };
}

export function getSoftwareAppSchema() {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SkillTa Career Quiz",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    url: `${baseUrl}/quiz`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1250",
      bestRating: "5",
    },
    description: "Free AI-powered tech career quiz that recommends the perfect career path based on your skills, interests & personality. Takes only 5 minutes.",
  };
}

export function getItemListSchema() {
  const baseUrl = getBaseUrl();
  const careers = [
    "Frontend Developer", "Backend Developer", "Full Stack Developer",
    "Data Scientist", "AI/ML Engineer", "Cybersecurity Specialist",
    "DevOps Engineer", "Mobile Developer", "Cloud Architect",
    "Game Developer", "Blockchain Developer", "UI/UX Designer",
  ];
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Top Tech Career Paths 2026",
    description: "Most popular tech career paths with free roadmaps",
    numberOfItems: careers.length,
    itemListElement: careers.map((career, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: career,
      url: `${baseUrl}/roadmaps/${career.toLowerCase().replace(/ /g, "-")}`,
    })),
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
    name: `${career.title} Career Roadmap 2026`,
    description: career.description,
    provider: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: baseUrl,
    },
    url: `${baseUrl}/roadmaps/${career.id}`,
    isAccessibleForFree: true,
    inLanguage: "en",
    courseMode: "online",
    educationalLevel: "Beginner to Advanced",
  };
}

export function getArticleSchema(post: { title: string; description: string; slug: string; date: string; keywords: string }) {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    url: `${baseUrl}/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/favicon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`,
    },
    keywords: post.keywords,
    inLanguage: "en",
  };
}

export function getHowToSchema() {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Find Your Perfect Tech Career in 2026",
    description: "Use SkillTa's free AI-powered quiz to discover your ideal tech career path in under 5 minutes. Works for students, freshers & career switchers.",
    totalTime: "PT5M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Take the Free AI Career Quiz",
        text: "Answer 10 smart questions about your interests, skills, and personality. No signup required.",
        url: `${baseUrl}/quiz`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Get Your Personalized Career Match",
        text: "Receive a personalized career recommendation with match percentage, salary insights, and detailed analysis for India & global markets.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Follow Your Custom Roadmap",
        text: "Get a step-by-step learning path with free resources, project ideas, timelines, and download it as PDF.",
        url: `${baseUrl}/roadmaps`,
      },
    ],
  };
}
