# System Design Interview Prep App — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an interactive React SPA for system design interview preparation with topics browser, quizzes, flashcards, and a drag-and-drop design sandbox.

**Architecture:** Vite + React 18 + TypeScript SPA with Tailwind CSS dark theme. All content is hardcoded TypeScript data. Progress persisted in localStorage with schema versioning. React Router v6 for client-side routing. dnd-kit for sandbox drag-and-drop.

**Tech Stack:** Vite, React 18, TypeScript, React Router v6, Tailwind CSS, dnd-kit, react-markdown, Vitest + React Testing Library

**Spec:** `docs/superpowers/specs/2026-03-25-system-design-prep-app-design.md`

---

## Phase 1: Project Scaffolding & Foundation

### Task 1: Scaffold Vite + React + TypeScript project

**Files:**
- Create: `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`
- Create: `src/main.tsx`, `src/App.tsx`, `src/index.css`

Note: Using Tailwind CSS v4 with `@tailwindcss/vite` plugin — no `tailwind.config.js` or `postcss.config.js` needed.

- [ ] **Step 0: Initialize git**

```bash
git init
```

- [ ] **Step 1: Initialize Vite project**

```bash
npm create vite@latest . -- --template react-ts
```

Accept overwrite prompts. This creates the base project structure.

- [ ] **Step 2: Install dependencies**

```bash
npm install react-router-dom @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities react-markdown
npm install -D tailwindcss @tailwindcss/vite
```

- [ ] **Step 3: Configure Tailwind CSS**

Replace `src/index.css` with:

```css
@import "tailwindcss";
```

Update `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

- [ ] **Step 4: Set up dark theme base in `src/App.tsx`**

```tsx
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0f0f1a] text-gray-200">
        <p className="p-8 text-2xl">SystemPrep — Coming Soon</p>
      </div>
    </BrowserRouter>
  )
}

export default App
```

- [ ] **Step 5: Verify app runs**

```bash
npm run dev
```

Open browser, confirm dark page with "SystemPrep — Coming Soon" text.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: scaffold Vite + React + TS + Tailwind project"
```

---

### Task 2: TypeScript types and interfaces

**Files:**
- Create: `src/types/index.ts`

- [ ] **Step 1: Create all TypeScript interfaces**

```typescript
// src/types/index.ts

export type Category =
  | "networking"
  | "storage"
  | "caching"
  | "scaling"
  | "reliability"
  | "messaging"
  | "security"
  | "patterns";

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
  // Note: `diagram` field from spec is deferred. Topics use markdown explanation for visuals.
}

// Quiz question types — discriminated union
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

export type QuizQuestion =
  | MultipleChoiceQuestion
  | TrueFalseQuestion
  | MatchingQuestion;

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
  options: {
    label: string;
    correct: boolean;
    explanation: string;
  }[];
  hint?: string;
}

// Sandbox types
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

// Progress tracking
export interface UserProgress {
  topicsStudied: Record<string, {
    visited: boolean;
    lastVisited: number;
  }>;
  quizScores: Record<string, {
    correct: number;
    total: number;
    lastAttempt: number;
  }>;
  flashcardStatus: Record<string, "new" | "learning" | "mastered">;
  exercisesCompleted: string[];
}

export interface StoredData<T> {
  version: number;
  data: T;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/types/
git commit -m "feat: add all TypeScript interfaces and types"
```

---

### Task 3: localStorage hooks with resilience

**Files:**
- Create: `src/hooks/useLocalStorage.ts`
- Create: `src/hooks/useProgress.ts`

- [ ] **Step 1: Create generic `useLocalStorage` hook**

```typescript
// src/hooks/useLocalStorage.ts
import { useState, useCallback } from 'react';
import type { StoredData } from '../types';

const CURRENT_VERSION = 1;

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return defaultValue;
      const parsed: StoredData<T> = JSON.parse(raw);
      if (parsed.version !== CURRENT_VERSION) return defaultValue;
      return parsed.data;
    } catch {
      return defaultValue;
    }
  });

  const set = useCallback((newValue: T | ((prev: T) => T)) => {
    setValue((prev) => {
      const resolved = typeof newValue === 'function'
        ? (newValue as (prev: T) => T)(prev)
        : newValue;
      try {
        const stored: StoredData<T> = { version: CURRENT_VERSION, data: resolved };
        localStorage.setItem(key, JSON.stringify(stored));
      } catch {
        // localStorage full — silently fail, value still updates in memory
        console.warn(`Failed to persist ${key} to localStorage`);
      }
      return resolved;
    });
  }, [key]);

  return [value, set] as const;
}
```

- [ ] **Step 2: Create `useProgress` hook**

```typescript
// src/hooks/useProgress.ts
import { useLocalStorage } from './useLocalStorage';
import type { UserProgress } from '../types';

const DEFAULT_PROGRESS: UserProgress = {
  topicsStudied: {},
  quizScores: {},
  flashcardStatus: {},
  exercisesCompleted: [],
};

export function useProgress() {
  const [progress, setProgress] = useLocalStorage<UserProgress>(
    'systemprep-progress',
    DEFAULT_PROGRESS
  );

  const markTopicVisited = (topicId: string) => {
    setProgress((prev) => ({
      ...prev,
      topicsStudied: {
        ...prev.topicsStudied,
        [topicId]: { visited: true, lastVisited: Date.now() },
      },
    }));
  };

  const saveQuizScore = (topicId: string, correct: number, total: number) => {
    setProgress((prev) => {
      const existing = prev.quizScores[topicId];
      const existingPct = existing ? existing.correct / existing.total : 0;
      const newPct = correct / total;
      // Only save if better than previous best
      if (existing && existingPct >= newPct) {
        return {
          ...prev,
          quizScores: {
            ...prev.quizScores,
            [topicId]: { ...existing, lastAttempt: Date.now() },
          },
        };
      }
      return {
        ...prev,
        quizScores: {
          ...prev.quizScores,
          [topicId]: { correct, total, lastAttempt: Date.now() },
        },
      };
    });
  };

  const setFlashcardStatus = (cardId: string, status: "new" | "learning" | "mastered") => {
    setProgress((prev) => ({
      ...prev,
      flashcardStatus: {
        ...prev.flashcardStatus,
        [cardId]: status,
      },
    }));
  };

  const markExerciseCompleted = (exerciseId: string) => {
    setProgress((prev) => ({
      ...prev,
      exercisesCompleted: prev.exercisesCompleted.includes(exerciseId)
        ? prev.exercisesCompleted
        : [...prev.exercisesCompleted, exerciseId],
    }));
  };

  return {
    progress,
    markTopicVisited,
    saveQuizScore,
    setFlashcardStatus,
    markExerciseCompleted,
  };
}
```

- [ ] **Step 3: Commit**

```bash
git add src/hooks/
git commit -m "feat: add localStorage hooks with resilience and progress tracking"
```

---

### Task 4: Shared UI components and routing

**Files:**
- Create: `src/components/Navbar.tsx`
- Create: `src/components/Sidebar.tsx`
- Create: `src/components/ProgressBar.tsx`
- Create: `src/components/DifficultyBadge.tsx`
- Create: `src/components/CategoryTag.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create `Navbar.tsx`**

Top navigation bar with logo and links to all 5 sections. Uses `NavLink` from React Router for active state styling. Purple accent for active link.

```tsx
// src/components/Navbar.tsx
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/topics', label: 'Topics' },
  { to: '/quizzes', label: 'Quizzes' },
  { to: '/flashcards', label: 'Flashcards' },
  { to: '/sandbox', label: 'Sandbox' },
];

export function Navbar() {
  return (
    <nav className="flex items-center gap-6 px-6 py-3 bg-[#1a1a2e] border-b border-[#2a2a4a]">
      <NavLink to="/" className="text-lg font-bold text-purple-500 mr-4">
        SystemPrep
      </NavLink>
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.to === '/'}
          className={({ isActive }) =>
            `text-sm transition-colors ${
              isActive ? 'text-purple-400 font-medium' : 'text-gray-400 hover:text-gray-200'
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
```

- [ ] **Step 2: Create `Sidebar.tsx`**

Category filter sidebar used on Topics, Quizzes, Flashcards pages.

```tsx
// src/components/Sidebar.tsx
import { type Category, CATEGORY_LABELS, CATEGORY_COLORS } from '../types';

const categories: Category[] = [
  'networking', 'storage', 'caching', 'scaling',
  'reliability', 'messaging', 'security', 'patterns',
];

interface SidebarProps {
  selected: Category | null;
  onSelect: (category: Category | null) => void;
}

export function Sidebar({ selected, onSelect }: SidebarProps) {
  return (
    <aside className="w-56 shrink-0 p-4 bg-[#16162a] border-r border-[#2a2a4a]">
      <div className="text-xs font-bold uppercase tracking-wider text-purple-500 mb-3">
        Categories
      </div>
      <button
        onClick={() => onSelect(null)}
        className={`w-full text-left text-sm px-2 py-1.5 rounded mb-1 transition-colors ${
          selected === null ? 'bg-purple-500/15 text-purple-400' : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`w-full text-left text-sm px-2 py-1.5 rounded mb-1 transition-colors ${
            selected === cat ? 'bg-purple-500/15' : 'hover:text-gray-200'
          }`}
          style={{ color: selected === cat ? CATEGORY_COLORS[cat] : undefined }}
        >
          {CATEGORY_LABELS[cat]}
        </button>
      ))}
    </aside>
  );
}
```

- [ ] **Step 3: Create small shared components**

```tsx
// src/components/ProgressBar.tsx
interface ProgressBarProps {
  value: number; // 0-100
  color?: string;
}

export function ProgressBar({ value, color = '#7c3aed' }: ProgressBarProps) {
  return (
    <div className="h-1 bg-[#2a2a4a] rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-300"
        style={{ width: `${Math.min(100, Math.max(0, value))}%`, backgroundColor: color }}
      />
    </div>
  );
}
```

```tsx
// src/components/DifficultyBadge.tsx
import { type Difficulty, DIFFICULTY_LABELS } from '../types';

const colors: Record<Difficulty, string> = {
  1: 'bg-green-500/20 text-green-400',
  2: 'bg-yellow-500/20 text-yellow-400',
  3: 'bg-red-500/20 text-red-400',
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${colors[difficulty]}`}>
      {DIFFICULTY_LABELS[difficulty]}
    </span>
  );
}
```

```tsx
// src/components/CategoryTag.tsx
import { type Category, CATEGORY_LABELS, CATEGORY_COLORS } from '../types';

export function CategoryTag({ category }: { category: Category }) {
  return (
    <span
      className="text-xs px-2 py-0.5 rounded-full"
      style={{
        backgroundColor: `${CATEGORY_COLORS[category]}20`,
        color: CATEGORY_COLORS[category],
      }}
    >
      {CATEGORY_LABELS[category]}
    </span>
  );
}
```

- [ ] **Step 4: Set up routing in `App.tsx`**

```tsx
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { Topics } from './pages/Topics';
import { TopicDetail } from './pages/TopicDetail';
import { Quizzes } from './pages/Quizzes';
import { Flashcards } from './pages/Flashcards';
import { Sandbox } from './pages/Sandbox';
import { GuidedExercisePage } from './pages/GuidedExercisePage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0f0f1a] text-gray-200">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/topics/:topicId" element={<TopicDetail />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/sandbox" element={<Sandbox />} />
          <Route path="/exercises/:exerciseId" element={<GuidedExercisePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
```

- [ ] **Step 5: Create placeholder pages**

Create minimal placeholder components for each page so routing works:

```tsx
// src/pages/Dashboard.tsx
export function Dashboard() {
  return <div className="p-8"><h1 className="text-2xl font-bold">Dashboard</h1></div>;
}
```

Same pattern for: `Topics.tsx`, `TopicDetail.tsx`, `Quizzes.tsx`, `Flashcards.tsx`, `Sandbox.tsx`, `GuidedExercisePage.tsx`. Each just renders an `<h1>` with the page name.

- [ ] **Step 6: Verify routing works**

```bash
npm run dev
```

Click through all nav links. Each page should show its name. Verify active state highlights in nav.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add shared components, routing, and placeholder pages"
```

---

## Phase 2: Topic Data & Topic Pages

### Task 5: Create topic data for all 8 categories

**Files:**
- Create: `src/data/topics/networking.ts`
- Create: `src/data/topics/storage.ts`
- Create: `src/data/topics/caching.ts`
- Create: `src/data/topics/scaling.ts`
- Create: `src/data/topics/reliability.ts`
- Create: `src/data/topics/messaging.ts`
- Create: `src/data/topics/security.ts`
- Create: `src/data/topics/patterns.ts`
- Create: `src/data/topics/index.ts`

- [ ] **Step 1: Create `networking.ts`** with ~7 topics

Each topic must have: `id`, `title`, `category: "networking"`, `difficulty`, `summary` (1-2 sentences), `explanation` (3-5 paragraphs of markdown), `keyPoints` (4-6 bullets), `realWorld` (2-3 examples like "Netflix uses CDN..."), `interviewTips` (2-3 tips), `relatedTopics` (2-3 IDs).

Topics: `rest-api`, `graphql`, `grpc`, `websockets`, `dns`, `cdn`, `http-https-tls`

- [ ] **Step 2: Create `storage.ts`** with ~7 topics

Topics: `sql-vs-nosql`, `acid-properties`, `database-indexing`, `replication`, `sharding`, `lsm-trees`, `object-storage`

- [ ] **Step 3: Create `caching.ts`** with ~5 topics

Topics: `caching-strategies`, `cache-invalidation`, `redis-memcached`, `cdn-caching`, `cache-eviction-policies`

- [ ] **Step 4: Create `scaling.ts`** with ~6 topics

Topics: `horizontal-vs-vertical-scaling`, `load-balancing`, `auto-scaling`, `database-partitioning`, `read-replicas`, `connection-pooling`

- [ ] **Step 5: Create `reliability.ts`** with ~6 topics

Topics: `cap-theorem`, `failover-strategies`, `circuit-breaker`, `health-checks-monitoring`, `redundancy`, `disaster-recovery`

- [ ] **Step 6: Create `messaging.ts`** with ~5 topics

Topics: `message-queues`, `pub-sub`, `apache-kafka`, `event-sourcing`, `cqrs`

- [ ] **Step 7: Create `security.ts`** with ~5 topics

Topics: `authentication-oauth-jwt`, `authorization-rbac`, `rate-limiting`, `encryption`, `api-security`

- [ ] **Step 8: Create `patterns.ts`** with ~7 topics

Topics: `microservices-vs-monolith`, `api-gateway`, `saga-pattern`, `bloom-filters`, `leader-election`, `consistent-hashing`, `gossip-protocol`

- [ ] **Step 9: Create `index.ts`** to re-export all topics

```typescript
// src/data/topics/index.ts
import { networkingTopics } from './networking';
import { storageTopics } from './storage';
import { cachingTopics } from './caching';
import { scalingTopics } from './scaling';
import { reliabilityTopics } from './reliability';
import { messagingTopics } from './messaging';
import { securityTopics } from './security';
import { patternsTopics } from './patterns';
import type { Topic } from '../../types';

export const allTopics: Topic[] = [
  ...networkingTopics,
  ...storageTopics,
  ...cachingTopics,
  ...scalingTopics,
  ...reliabilityTopics,
  ...messagingTopics,
  ...securityTopics,
  ...patternsTopics,
];

export const topicById = (id: string): Topic | undefined =>
  allTopics.find((t) => t.id === id);

export const topicsByCategory = (category: string): Topic[] =>
  allTopics.filter((t) => t.category === category);
```

- [ ] **Step 10: Commit**

```bash
git add src/data/topics/
git commit -m "feat: add all 48 system design topic data across 8 categories"
```

---

### Task 6: Topics Browser page

**Files:**
- Modify: `src/pages/Topics.tsx`

- [ ] **Step 1: Implement Topics page**

Grid of topic cards with sidebar category filter. Each card shows: title, category tag, difficulty badge, summary. Clicking navigates to `/topics/:topicId`.

Uses `Sidebar` component for category filtering. Cards are a responsive grid. Filter state stored in component state (optionally synced to URL query params).

- [ ] **Step 2: Verify topics display and filtering works**

```bash
npm run dev
```

Navigate to `/topics`, verify all ~48 topics display. Click categories in sidebar, verify filtering. Click a card, verify navigation to topic detail (still placeholder).

- [ ] **Step 3: Commit**

```bash
git add src/pages/Topics.tsx
git commit -m "feat: implement Topics browser page with category filtering"
```

---

### Task 7: Topic Detail page

**Files:**
- Modify: `src/pages/TopicDetail.tsx`

- [ ] **Step 1: Implement TopicDetail page**

Reads `:topicId` from URL params. Displays:
- Title + category tag + difficulty badge
- Summary (highlighted)
- Full explanation rendered via `react-markdown`
- Key points as a styled bullet list
- Real-world examples section
- Interview tips section
- Related topics as clickable links

On mount, calls `markTopicVisited(topicId)` from `useProgress`.

Shows a "Topic not found" message if ID doesn't match any topic.

- [ ] **Step 2: Verify topic detail rendering**

Navigate to a specific topic. Verify markdown renders, all sections display. Check that progress updates in localStorage.

- [ ] **Step 3: Commit**

```bash
git add src/pages/TopicDetail.tsx
git commit -m "feat: implement Topic detail page with markdown rendering"
```

---

## Phase 3: Quiz Feature

### Task 8: Quiz data

**Files:**
- Create: `src/data/quizzes.ts`

- [ ] **Step 1: Create quiz questions**

Write at least 3-4 questions per category (~30+ total). Mix of `multiple-choice`, `true-false`, and `matching` types. Note: `scenario` type is deferred per spec — use `multiple-choice` with longer question text for scenario-style questions. Each question links to a `topicId`, has a `difficulty`, and includes an `explanation`.

Example structure:

```typescript
import type { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q-rest-1',
    topicId: 'rest-api',
    type: 'multiple-choice',
    difficulty: 1,
    question: 'Which HTTP method is idempotent?',
    options: ['POST', 'PUT', 'PATCH', 'None of the above'],
    correctAnswer: 'PUT',
    explanation: 'PUT is idempotent because...',
  },
  // ... more questions
];
```

- [ ] **Step 2: Commit**

```bash
git add src/data/quizzes.ts
git commit -m "feat: add quiz question data for all categories"
```

---

### Task 9: Quiz Engine & UI

**Files:**
- Create: `src/hooks/useQuizEngine.ts`
- Create: `src/features/quiz/QuizEngine.tsx`
- Create: `src/features/quiz/QuestionCard.tsx`
- Create: `src/features/quiz/ScoreBoard.tsx`
- Modify: `src/pages/Quizzes.tsx`

- [ ] **Step 1: Create `useQuizEngine` hook**

State machine managing quiz flow:
- `idle` → user selects filters and starts quiz
- `active` → showing questions one at a time
- `answered` → user answered, showing explanation
- `complete` → all questions answered, showing score

Tracks: current question index, user answers, score. Shuffles questions. Supports retry of wrong answers.

```typescript
// src/hooks/useQuizEngine.ts
import { useState, useCallback } from 'react';
import type { QuizQuestion } from '../types';

type QuizState = 'idle' | 'active' | 'answered' | 'complete';

export function useQuizEngine(questions: QuizQuestion[]) {
  const [state, setState] = useState<QuizState>('idle');
  const [shuffled, setShuffled] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | boolean | string[]>>({});
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const start = useCallback(() => {
    const s = [...questions].sort(() => Math.random() - 0.5);
    setShuffled(s);
    setCurrentIndex(0);
    setAnswers({});
    setScore({ correct: 0, total: 0 });
    setState('active');
  }, [questions]);

  const answer = useCallback((questionId: string, userAnswer: string | boolean | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: userAnswer }));
    setState('answered');
  }, []);

  const next = useCallback(() => {
    if (currentIndex + 1 >= shuffled.length) {
      // Calculate final score
      let correct = 0;
      shuffled.forEach((q) => {
        const a = answers[q.id];
        if (q.type === 'multiple-choice' && a === q.correctAnswer) correct++;
        if (q.type === 'true-false' && a === q.correctAnswer) correct++;
        if (q.type === 'matching' && Array.isArray(a)) {
          // User answer is array of right-side values in order matching left-side
          const correctOrder = q.pairs.map((p) => p.right);
          if (JSON.stringify(a) === JSON.stringify(correctOrder)) correct++;
        }
      });
      setScore({ correct, total: shuffled.length });
      setState('complete');
    } else {
      setCurrentIndex((i) => i + 1);
      setState('active');
    }
  }, [currentIndex, shuffled, answers]);

  const retryWrong = useCallback(() => {
    const wrong = shuffled.filter((q) => {
      const a = answers[q.id];
      if (q.type === 'multiple-choice') return a !== q.correctAnswer;
      if (q.type === 'true-false') return a !== q.correctAnswer;
      if (q.type === 'matching' && Array.isArray(a)) {
        const correctOrder = q.pairs.map((p) => p.right);
        return JSON.stringify(a) !== JSON.stringify(correctOrder);
      }
      return true;
    });
    setShuffled(wrong);
    setCurrentIndex(0);
    setAnswers({});
    setState('active');
  }, [shuffled, answers]);

  const reset = useCallback(() => {
    setState('idle');
    setShuffled([]);
    setCurrentIndex(0);
    setAnswers({});
    setScore({ correct: 0, total: 0 });
  }, []);

  return {
    state,
    currentQuestion: shuffled[currentIndex] ?? null,
    currentIndex,
    totalQuestions: shuffled.length,
    answers,
    score,
    start,
    answer,
    next,
    retryWrong,
    reset,
  };
}
```

- [ ] **Step 2: Create `QuestionCard.tsx`**

Renders a single question based on its type:
- **multiple-choice**: Radio buttons for options, highlight correct/incorrect after answer
- **true-false**: Two buttons (True/False)
- **matching**: Two columns, user matches left to right (simple dropdown select per left item)

Shows explanation after answering. "Next" button to advance.

- [ ] **Step 3: Create `ScoreBoard.tsx`**

Shows final score (X/Y correct, percentage), breakdown of right/wrong per question, "Retry Wrong Answers" button, "Back to Quizzes" button.

- [ ] **Step 4: Create `QuizEngine.tsx`**

Orchestrates the flow: filter selection → start → questions → scoreboard. Uses `useQuizEngine` hook.

- [ ] **Step 5: Implement `Quizzes.tsx` page**

Sidebar for category filter + difficulty filter. Shows quiz start screen with question count. Embeds `QuizEngine` component. Saves score to progress on completion.

Read initial filter state from `useSearchParams()` (e.g., `/quizzes?category=caching&difficulty=2`). Sync filter changes back to URL. Show empty state "No questions match your filters. Try broadening your selection." when filters yield zero questions.

- [ ] **Step 6: Verify full quiz flow**

Start a quiz, answer questions, see explanations, complete quiz, see score, retry wrong answers. Check localStorage for saved scores.

- [ ] **Step 7: Commit**

```bash
git add src/hooks/useQuizEngine.ts src/features/quiz/ src/pages/Quizzes.tsx
git commit -m "feat: implement quiz engine with multiple question types and scoring"
```

---

## Phase 4: Flashcard Feature

### Task 10: Flashcard data

**Files:**
- Create: `src/data/flashcards.ts`

- [ ] **Step 1: Create flashcard data**

At least 2-3 cards per topic (~100+ total). Each card has front (question/concept), back (answer/definition), `topicId`, `difficulty`.

- [ ] **Step 2: Commit**

```bash
git add src/data/flashcards.ts
git commit -m "feat: add flashcard data for all topics"
```

---

### Task 11: Flashcard feature UI

**Files:**
- Create: `src/features/flashcard/FlashcardCard.tsx`
- Create: `src/features/flashcard/FlashcardDeck.tsx`
- Create: `src/features/flashcard/MasteryControls.tsx`
- Modify: `src/pages/Flashcards.tsx`

- [ ] **Step 1: Create `FlashcardCard.tsx`**

Single card with CSS flip animation. Click to flip front ↔ back. Card styled as a centered rectangle with rounded corners and shadow.

```tsx
// Key CSS: use CSS transform with rotateY for 3D flip effect
// perspective on parent container, backface-visibility: hidden on both sides
```

- [ ] **Step 2: Create `MasteryControls.tsx`**

Three buttons below the card: "New" (gray), "Learning" (yellow), "Mastered" (green). Highlights current status. Calls `setFlashcardStatus` from `useProgress`.

- [ ] **Step 3: Create `FlashcardDeck.tsx`**

Manages deck navigation:
- Left/Right arrows for prev/next
- Keyboard support: ArrowLeft, ArrowRight, Space to flip
- Progress bar (current card / total)
- Filter controls: category dropdown, difficulty dropdown, mastery filter (all / unmastered)

- [ ] **Step 4: Implement `Flashcards.tsx` page**

Sidebar for category filter. Embeds `FlashcardDeck`. Read initial category from `useSearchParams()` (e.g., `/flashcards?category=caching`). Show empty state "No cards match your filters. Try broadening your selection." when filters yield zero cards.

- [ ] **Step 5: Verify flashcard flow**

Navigate through cards, flip them, mark mastery. Verify keyboard controls. Filter by category. Check localStorage persistence.

- [ ] **Step 6: Commit**

```bash
git add src/features/flashcard/ src/pages/Flashcards.tsx
git commit -m "feat: implement flashcard deck with flip animation and mastery tracking"
```

---

## Phase 5: Dashboard

### Task 12: Dashboard page

**Files:**
- Modify: `src/pages/Dashboard.tsx`

- [ ] **Step 1: Implement Dashboard**

Four stat cards at top:
- Topics Studied: X/48 (purple)
- Quiz Score: average % across all quizzes (green)
- Cards Mastered: X/total (amber)
- Exercises Done: X/10 (blue)

"Continue Studying" section showing 3 most recently visited topics with progress bars.

Empty state for first launch: "Welcome to SystemPrep! Start by exploring a topic." with a CTA link to `/topics`.

All data sourced from `useProgress` hook.

- [ ] **Step 2: Verify dashboard renders with fresh and existing progress**

Clear localStorage, verify empty state. Visit some topics, take a quiz, verify stats update.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Dashboard.tsx
git commit -m "feat: implement Dashboard with progress stats and continue studying"
```

---

## Phase 6: Sandbox — Drag & Drop

### Task 13: Sandbox component definitions

**Files:**
- Create: `src/data/sandbox-components.ts`

- [ ] **Step 1: Define all 15 sandbox component types**

```typescript
import type { SandboxComponentDef } from '../types';

export const sandboxComponentDefs: SandboxComponentDef[] = [
  { type: 'client', label: 'Client/Browser', icon: '🖥️', category: 'compute' },
  { type: 'load-balancer', label: 'Load Balancer', icon: '⚖️', category: 'network' },
  { type: 'web-server', label: 'Web Server', icon: '🌐', category: 'compute' },
  { type: 'app-server', label: 'App Server', icon: '⚙️', category: 'compute' },
  { type: 'sql-db', label: 'SQL Database', icon: '🗄️', category: 'storage' },
  { type: 'nosql-db', label: 'NoSQL Database', icon: '📦', category: 'storage' },
  { type: 'cache', label: 'Cache (Redis)', icon: '⚡', category: 'storage' },
  { type: 'message-queue', label: 'Message Queue', icon: '📨', category: 'messaging' },
  { type: 'cdn', label: 'CDN', icon: '🌍', category: 'network' },
  { type: 'api-gateway', label: 'API Gateway', icon: '🚪', category: 'network' },
  { type: 'object-storage', label: 'Object Storage', icon: '💾', category: 'storage' },
  { type: 'dns', label: 'DNS', icon: '📡', category: 'network' },
  { type: 'search-engine', label: 'Search Engine', icon: '🔍', category: 'compute' },
  { type: 'rate-limiter', label: 'Rate Limiter', icon: '🚦', category: 'network' },
  { type: 'notification', label: 'Notification Service', icon: '🔔', category: 'messaging' },
];
```

- [ ] **Step 2: Commit**

```bash
git add src/data/sandbox-components.ts
git commit -m "feat: add sandbox component definitions"
```

---

### Task 14: Sandbox canvas with drag-and-drop

**Files:**
- Create: `src/features/sandbox/Canvas.tsx`
- Create: `src/features/sandbox/ComponentPalette.tsx`
- Create: `src/features/sandbox/SandboxComponent.tsx`
- Create: `src/features/sandbox/ConnectionLines.tsx`
- Modify: `src/pages/Sandbox.tsx`

- [ ] **Step 1: Create `ComponentPalette.tsx`**

Left sidebar listing all component defs grouped by category. Each is a draggable item using `@dnd-kit/core`'s `useDraggable`. Styled as small tiles with emoji icon + label.

- [ ] **Step 2: Create `SandboxComponent.tsx`**

A single component instance on the canvas. Displays icon + label. Draggable for repositioning. Click to select (highlighted border). Uses `useDraggable` from dnd-kit.

- [ ] **Step 3: Create `ConnectionLines.tsx`**

SVG overlay that renders arrows between connected components. Each arrow is a line from center of source component to center of target component, with an arrowhead marker. Optional label rendered at midpoint.

- [ ] **Step 4: Create `Canvas.tsx`**

The main canvas area. Uses `@dnd-kit/core`'s `DndContext`. Handles:
- Drop from palette → creates new instance at drop position
- Drag existing component → updates position
- Connection mode: click source, click target to create connection
- Right-click or delete key to remove component/connection
- Toolbar: "Clear Canvas", "Save", "Load" buttons

State: `SandboxState` (components array + connections array). Save/load uses localStorage key `"systemprep-designs"` as `Record<string, { name: string; createdAt: number; state: SandboxState }>`.

Save flow: "Save" button opens a small modal/popover prompting for a design name. Load flow: "Load" button shows a dropdown listing saved designs by name and date. Each entry has a delete button. Clear canvas button resets current state.

Connection labeling: When a new connection is created (user clicks source → target), show a small popover at the midpoint where user can type a label (HTTP, TCP, pub/sub, etc.) or leave blank. Double-click an existing connection line to edit its label.

- [ ] **Step 5: Implement `Sandbox.tsx` page**

Layout: ComponentPalette on left, Canvas in center. Toolbar at top with save/load/clear. Instructional overlay when canvas is empty: "Drag components from the palette to start designing."

Also shows a link section at bottom to guided exercises.

- [ ] **Step 6: Verify drag-and-drop works**

Drag components from palette to canvas. Reposition them. Create connections. Save and reload.

- [ ] **Step 7: Commit**

```bash
git add src/features/sandbox/ src/pages/Sandbox.tsx
git commit -m "feat: implement drag-and-drop sandbox canvas with connections"
```

---

## Phase 7: Guided Exercises

### Task 15: Exercise data

**Files:**
- Create: `src/data/exercises.ts`

- [ ] **Step 1: Create exercise data for all 10 exercises**

Each exercise has 5-8 steps. Each step has a prompt, 3-4 options (one or more correct), optional hint, and explanations for each option.

Exercises:
1. URL Shortener
2. Chat Application
3. News Feed
4. Rate Limiter
5. Key-Value Store
6. Notification System
7. File Storage Service
8. Search Autocomplete
9. Video Streaming Platform
10. Ride-Sharing Service

- [ ] **Step 2: Commit**

```bash
git add src/data/exercises.ts
git commit -m "feat: add guided exercise data for 10 system design problems"
```

---

### Task 16: Guided Exercise UI

**Files:**
- Create: `src/features/sandbox/GuidedExercise.tsx`
- Modify: `src/pages/GuidedExercisePage.tsx`

- [ ] **Step 1: Create `GuidedExercise.tsx`**

Step-by-step UI:
- Shows current step prompt
- Options as clickable cards
- "Show Hint" button (toggles hint text)
- After selecting: highlights correct/incorrect, shows explanation
- "Next Step" button to advance
- Progress indicator (Step X of Y)
- Summary screen at end: score + review of all decisions

- [ ] **Step 2: Implement `GuidedExercisePage.tsx`**

Reads `:exerciseId` from URL params. Loads exercise data. Renders `GuidedExercise` component. On completion, calls `markExerciseCompleted`. Shows "Exercise not found" for invalid IDs.

Also add an exercise listing section to the Sandbox page (or as a sub-nav) so users can browse and start exercises.

- [ ] **Step 3: Verify exercise flow**

Navigate to an exercise. Step through all questions. Use hints. Complete exercise. Verify progress saves.

- [ ] **Step 4: Commit**

```bash
git add src/features/sandbox/GuidedExercise.tsx src/pages/GuidedExercisePage.tsx src/pages/Sandbox.tsx
git commit -m "feat: implement guided exercises with step-by-step flow"
```

---

## Phase 8: Polish & Final Integration

### Task 17: Styling polish and responsive design

**Files:**
- Various existing files

- [ ] **Step 1: Review and polish all pages**

Ensure consistent dark theme:
- Backgrounds: `#0f0f1a` (main), `#1a1a2e` (cards/panels), `#16162a` (sidebar)
- Borders: `#2a2a4a`
- Text: `text-gray-200` (primary), `text-gray-400` (secondary)
- Accent: purple-500/purple-400

Check all pages for visual consistency, spacing, typography.

- [ ] **Step 2: Add responsive breakpoints**

Ensure sidebar collapses on tablet. Cards stack on smaller screens. Sandbox has a minimum width notice on mobile.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "style: polish dark theme and add responsive breakpoints"
```

---

### Task 18: Build verification

- [ ] **Step 1: Run TypeScript type check**

```bash
npx tsc --noEmit
```

Fix any type errors.

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Verify build succeeds with no errors.

- [ ] **Step 3: Preview production build**

```bash
npm run preview
```

Click through all pages. Verify everything works in production mode.

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve build issues and type errors"
```

---

### Task 19: Tests

**Files:**
- Create: `src/hooks/__tests__/useProgress.test.ts`
- Create: `src/hooks/__tests__/useQuizEngine.test.ts`
- Create: `src/data/__tests__/data-integrity.test.ts`

- [ ] **Step 1: Install test dependencies**

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

Add to `vite.config.ts`:

```typescript
/// <reference types="vitest" />
// in defineConfig:
test: {
  environment: 'jsdom',
  globals: true,
  setupFiles: './src/test-setup.ts',
}
```

Create `src/test-setup.ts`:

```typescript
import '@testing-library/jest-dom';
```

Add to `package.json` scripts: `"test": "vitest run"`, `"test:watch": "vitest"`

- [ ] **Step 2: Write `useProgress` tests**

Test: initial state is defaults, markTopicVisited updates state, saveQuizScore keeps best score, setFlashcardStatus updates, markExerciseCompleted is idempotent. Mock localStorage.

- [ ] **Step 3: Write `useQuizEngine` tests**

Test: starts in idle state, start shuffles and sets active, answer records response, next advances, score calculation for all three question types, retryWrong filters correctly, reset returns to idle.

- [ ] **Step 4: Write data integrity tests**

```typescript
// src/data/__tests__/data-integrity.test.ts
import { allTopics } from '../topics';
import { quizQuestions } from '../quizzes';
import { flashcards } from '../flashcards';
import { exercises } from '../exercises';

test('all quiz topicIds reference existing topics', () => {
  const topicIds = new Set(allTopics.map((t) => t.id));
  quizQuestions.forEach((q) => {
    expect(topicIds.has(q.topicId)).toBe(true);
  });
});

test('all flashcard topicIds reference existing topics', () => {
  const topicIds = new Set(allTopics.map((t) => t.id));
  flashcards.forEach((f) => {
    expect(topicIds.has(f.topicId)).toBe(true);
  });
});

test('all relatedTopics reference existing topics', () => {
  const topicIds = new Set(allTopics.map((t) => t.id));
  allTopics.forEach((t) => {
    t.relatedTopics.forEach((rt) => {
      expect(topicIds.has(rt)).toBe(true);
    });
  });
});

test('no duplicate IDs', () => {
  const topicIds = allTopics.map((t) => t.id);
  expect(new Set(topicIds).size).toBe(topicIds.length);

  const quizIds = quizQuestions.map((q) => q.id);
  expect(new Set(quizIds).size).toBe(quizIds.length);
});
```

- [ ] **Step 5: Run tests**

```bash
npm test
```

All tests should pass.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "test: add unit tests for hooks and data integrity validation"
```

---

### Notes & Deviations from Spec

- **`diagram` field**: Deferred. Topics use markdown for visual content. Can be added per-topic later.
- **`scenario` question type**: Deferred. Use multiple-choice with longer question text for scenario-style questions.
- **`utils/filters.ts` and `utils/scoring.ts`**: Logic is co-located with consumers (page components and hooks) rather than in separate utility files, keeping things simpler.
- **`SandboxConnection` naming**: Renamed from spec's `Connection` to avoid naming conflicts.
- **Deployment**: Out of scope for this plan. The app builds to a static site ready for Vercel/Netlify/GitHub Pages.
