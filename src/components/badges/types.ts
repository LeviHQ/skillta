export type BadgeType = "quiz" | "resume";

export interface QuizBadgePayload {
  topCareer: string;
  topMatchPercentage: number;
  allResults: { careerId: string; title: string; matchPercentage: number }[];
}

export interface ResumeBadgePayload {
  atsScore: number;
  verdict: string;
  strengths: string[];
  targetRole: string;
  roleFit?: { role: string; fitScore: number; reasoning: string };
}

export interface SkillTaBadgeRecord {
  id: string;
  badgeType: BadgeType;
  payload: QuizBadgePayload | ResumeBadgePayload;
  createdAt: string;
}

export function getAchievementRank(score: number) {
  if (score >= 90) return "Legend";
  if (score >= 80) return "Master";
  if (score >= 65) return "Pro";
  return "Rising Talent";
}