/**
 * Lightweight preview data for the homepage "Explore Career Paths" grid.
 * Mirrors the first six entries of `careers.ts` so the homepage does not have
 * to pull the full (200KB+) career dataset into the initial bundle.
 */
export interface FeaturedCareer {
  id: string;
  icon: string;
  title: string;
  tagline: string;
  demandLevel: string;
  learningDifficulty: string;
}

export const featuredCareers: FeaturedCareer[] = [
  {
    id: "frontend-developer",
    icon: "🎨",
    title: "Frontend Developer",
    tagline: "Craft beautiful, interactive user experiences",
    demandLevel: "Very High",
    learningDifficulty: "Moderate",
  },
  {
    id: "backend-developer",
    icon: "⚙️",
    title: "Backend Developer",
    tagline: "Build the engines that power applications",
    demandLevel: "Very High",
    learningDifficulty: "Hard",
  },
  {
    id: "data-scientist",
    icon: "📊",
    title: "Data Scientist",
    tagline: "Turn data into actionable intelligence",
    demandLevel: "Very High",
    learningDifficulty: "Very Hard",
  },
  {
    id: "cybersecurity-specialist",
    icon: "🔐",
    title: "Cybersecurity Specialist",
    tagline: "Protect systems and hunt vulnerabilities",
    demandLevel: "Very High",
    learningDifficulty: "Hard",
  },
  {
    id: "uiux-designer",
    icon: "✨",
    title: "UI/UX Designer",
    tagline: "Design experiences people love to use",
    demandLevel: "High",
    learningDifficulty: "Moderate",
  },
  {
    id: "devops-engineer",
    icon: "🔄",
    title: "DevOps Engineer",
    tagline: "Bridge development and operations seamlessly",
    demandLevel: "Very High",
    learningDifficulty: "Hard",
  },
];
