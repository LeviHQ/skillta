// Lightweight localStorage-backed history for interview practice attempts.
// Keeps things simple and avoids extra backend schema for now.

export interface InterviewAnswer {
  questionId: string;
  question: string;
  type: "mcq" | "written";
  options?: string[];
  correctAnswer?: string; // for MCQ
  userAnswer: string;
  isCorrect?: boolean; // for MCQ
  aiFeedback?: string; // for written (short)
  score?: number; // 0-10 for written
}

export interface InterviewAttempt {
  id: string;
  role: string;
  level: string;
  skills: string[];
  round: string;
  createdAt: string; // ISO
  overallScore: number; // 0-100
  correctCount: number;
  totalCount: number;
  strengths: string;
  improvements: string;
  answers: InterviewAnswer[];
}

const KEY = "skillta_interview_history_v1";

function getUserKey(userId: string | null | undefined) {
  return `${KEY}:${userId || "guest"}`;
}

export function getInterviewHistory(userId: string | null | undefined): InterviewAttempt[] {
  try {
    const raw = localStorage.getItem(getUserKey(userId));
    if (!raw) return [];
    const arr = JSON.parse(raw) as InterviewAttempt[];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function saveInterviewAttempt(userId: string | null | undefined, attempt: InterviewAttempt) {
  const existing = getInterviewHistory(userId);
  const next = [attempt, ...existing].slice(0, 50); // keep last 50
  try {
    localStorage.setItem(getUserKey(userId), JSON.stringify(next));
  } catch {
    // ignore quota errors
  }
  return next;
}

export function deleteInterviewAttempt(userId: string | null | undefined, id: string) {
  const next = getInterviewHistory(userId).filter((a) => a.id !== id);
  try {
    localStorage.setItem(getUserKey(userId), JSON.stringify(next));
  } catch {
    // ignore
  }
  return next;
}
