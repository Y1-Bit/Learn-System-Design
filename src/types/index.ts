export type Category = "networking" | "storage" | "caching" | "scaling" | "reliability" | "messaging" | "security" | "patterns";

export type Difficulty = 1 | 2 | 3;

export const CATEGORY_LABELS: Record<Category, string> = {
  networking: "Networking",
  storage: "Storage & Databases",
  caching: "Caching",
  scaling: "Scaling",
  reliability: "Reliability",
  messaging: "Messaging",
  security: "Security",
  patterns: "Design Patterns",
};

export const CATEGORY_COLORS: Record<Category, string> = {
  networking: "#a78bfa",
  storage: "#10b981",
  caching: "#3b82f6",
  scaling: "#f59e0b",
  reliability: "#ef4444",
  messaging: "#ec4899",
  security: "#14b8a6",
  patterns: "#8b5cf6",
};

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  1: "Beginner",
  2: "Intermediate",
  3: "Advanced",
};

export interface Topic {
  id: string;
  title: string;
  category: Category;
  difficulty: Difficulty;
  summary: string;
  explanation: string;
  keyPoints: string[];
  realWorld: string[];
  interviewTips: string[];
  relatedTopics: string[];
}

interface BaseQuestion {
  id: string;
  topicId: string;
  difficulty: Difficulty;
  explanation: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: "multiple-choice";
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: "true-false";
  question: string;
  correctAnswer: boolean;
}

export interface MatchingQuestion extends BaseQuestion {
  type: "matching";
  question: string;
  pairs: { left: string; right: string }[];
}

export type QuizQuestion = MultipleChoiceQuestion | TrueFalseQuestion | MatchingQuestion;

export interface Flashcard {
  id: string;
  topicId: string;
  front: string;
  back: string;
  difficulty: Difficulty;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  steps: ExerciseStep[];
}

export interface ExerciseStep {
  prompt: string;
  options: { label: string; correct: boolean; explanation: string }[];
  hint?: string;
}

export interface SandboxComponentDef {
  type: string;
  label: string;
  icon: string;
  category: "compute" | "storage" | "network" | "messaging";
}

export interface SandboxComponentInstance {
  id: string;
  type: string;
  position: { x: number; y: number };
}

export interface SandboxConnection {
  id: string;
  from: string;
  to: string;
  label?: string;
}

export interface SandboxState {
  components: SandboxComponentInstance[];
  connections: SandboxConnection[];
}

export interface UserProgress {
  topicsStudied: Record<string, { visited: boolean; lastVisited: number }>;
  quizScores: Record<string, { correct: number; total: number; lastAttempt: number }>;
  flashcardStatus: Record<string, "new" | "learning" | "mastered">;
  exercisesCompleted: string[];
}

export interface StoredData<T> {
  version: number;
  data: T;
}
