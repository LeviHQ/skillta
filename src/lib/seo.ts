// Centralized SEO configuration — domain-agnostic
export const SITE_CONFIG = {
  name: "SkillTa",
  tagline: "Find Your Perfect Tech Career Path",
  description: "AI-powered career guidance for tech. Take our quiz to discover your ideal career path — frontend, backend, data science, cybersecurity & more. Get a personalized roadmap.",
  keywords: "tech career roadmap, how to become a developer, best tech careers, career guidance for programmers, learn to code, tech career quiz, career path finder",
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
  return "https://skillta.app";
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
    title: "SkillTa — Find Your Perfect Tech Career Path",
    description: "AI-powered career guidance for tech. Take our quiz to discover your ideal career path — frontend, backend, data science, cybersecurity & more. Get a personalized roadmap.",
    keywords: "tech career quiz, career path finder, best tech careers 2024, learn to code, career guidance for programmers, tech career roadmap",
    path: "/",
  },
  quiz: {
    title: "Career Quiz — Discover Your Ideal Tech Career | SkillTa",
    description: "Answer 10 smart questions to find your perfect tech career match. Our AI-powered quiz analyzes your skills, interests, and personality to recommend the best path.",
    keywords: "tech career quiz, which tech career is right for me, career aptitude test, coding career quiz",
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
    title: "Tech Career Roadmaps — Step-by-Step Learning Paths | SkillTa",
    description: "Browse curated roadmaps for 9+ tech careers including frontend, backend, data science, cybersecurity, and more. Each roadmap includes resources, projects, and timelines.",
    keywords: "tech career roadmap, learning path, how to become a developer, frontend roadmap, backend roadmap, data science roadmap",
    path: "/roadmaps",
  },
  about: {
    title: "About SkillTa — AI-Powered Career Guidance for Tech",
    description: "SkillTa helps aspiring tech professionals find their ideal career path with honest, data-driven guidance. Learn about our mission, team, and vision.",
    keywords: "about skillta, tech career guidance, career mentoring platform",
    path: "/about",
  },
  dashboard: {
    title: "Dashboard — Your Career Journey | SkillTa",
    description: "Track your quiz results, view personalized career recommendations, and monitor your progress on your tech career journey.",
    path: "/dashboard",
    noIndex: true,
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
    description: "AI-powered career guidance platform for tech professionals",
    sameAs: [],
    logo: `${baseUrl}/favicon.png`,
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
