# Codebase Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminate code duplication, split oversized components, separate types from constants, and add barrel exports for feature directories.

**Architecture:** Extract shared constants and quiz utilities into new modules. Split `QuestionCard.tsx` (261 lines) into 3 sub-components + dispatcher. Split `Canvas.tsx` (319 lines) into toolbar + state hook + layout. Add barrel `index.ts` for each feature directory. All work on a branch off `dev`, PR back into `dev`.

**Tech Stack:** React 19, TypeScript (strict), Vite 8, Tailwind CSS v4

**Spec:** `docs/superpowers/specs/2026-03-25-codebase-refactor-design.md`

---

## File Structure

### Files Created

| File | Responsibility |
|------|---------------|
| `src/constants/index.ts` | `CATEGORY_COLORS`, `CAT_KEYS`, `DIFF_KEYS`, `DIFFICULTY_STYLES` |
| `src/utils/quiz.ts` | `isAnswerCorrect(question, answer)` |
| `src/features/quiz/MultipleChoiceCard.tsx` | Multiple-choice question sub-component |
| `src/features/quiz/TrueFalseCard.tsx` | True/false question sub-component |
| `src/features/quiz/MatchingCard.tsx` | Matching question sub-component |
| `src/features/sandbox/CanvasToolbar.tsx` | Toolbar: connect, clear, save, load |
| `src/features/sandbox/useCanvasState.ts` | Hook: canvas state, handlers, sensors |
| `src/features/quiz/index.ts` | Barrel: `QuizEngine` |
| `src/features/flashcard/index.ts` | Barrel: `FlashcardDeck` |
| `src/features/sandbox/index.ts` | Barrel: `Canvas`, `GuidedExercise`, `ComponentPalette` |

### Files Modified

| File | Change |
|------|--------|
| `src/types/index.ts` | Remove `CATEGORY_COLORS`, `CATEGORY_LABELS`, `DIFFICULTY_LABELS` |
| `src/components/Sidebar.tsx` | Import `CAT_KEYS`, `CATEGORY_COLORS` from constants |
| `src/components/CategoryTag.tsx` | Import `CAT_KEYS`, `CATEGORY_COLORS` from constants |
| `src/components/DifficultyBadge.tsx` | Import `DIFF_KEYS`, `DIFFICULTY_STYLES` from constants |
| `src/pages/Dashboard.tsx` | Import `CAT_KEYS`, `CATEGORY_COLORS` from constants |
| `src/pages/Quizzes.tsx` | Import `DIFF_KEYS` from constants, barrel import |
| `src/pages/Flashcards.tsx` | Barrel import |
| `src/pages/Sandbox.tsx` | Import `DIFF_KEYS`, `DIFFICULTY_STYLES` from constants, barrel import |
| `src/pages/GuidedExercisePage.tsx` | Barrel import |
| `src/hooks/useQuizEngine.ts` | Use `isAnswerCorrect` from utils |
| `src/features/quiz/ScoreBoard.tsx` | Use `isAnswerCorrect` from utils |
| `src/features/quiz/QuestionCard.tsx` | Import sub-components from separate files |
| `src/features/sandbox/Canvas.tsx` | Extract toolbar + state hook |

---

### Task 0: Create feature branch

**Files:** None

- [ ] **Step 1: Create and switch to feature branch**

```bash
git checkout -b refactor/code-organization dev
```

- [ ] **Step 2: Verify branch**

Run: `git branch --show-current`
Expected: `refactor/code-organization`

---

### Task 1: Create `src/constants/index.ts` and clean `src/types/index.ts`

**Files:**
- Create: `src/constants/index.ts`
- Modify: `src/types/index.ts`

- [ ] **Step 1: Create the constants file**

```typescript
// src/constants/index.ts
import type { Category, Difficulty } from '../types';
import type { Translations } from '../i18n';

export const CATEGORY_COLORS: Record<Category, string> = {
  networking: '#a78bfa',
  storage: '#10b981',
  caching: '#3b82f6',
  scaling: '#f59e0b',
  reliability: '#ef4444',
  messaging: '#ec4899',
  security: '#14b8a6',
  patterns: '#8b5cf6',
};

export const CAT_KEYS: Record<Category, keyof Translations> = {
  networking: 'cat_networking',
  storage: 'cat_storage',
  caching: 'cat_caching',
  scaling: 'cat_scaling',
  reliability: 'cat_reliability',
  messaging: 'cat_messaging',
  security: 'cat_security',
  patterns: 'cat_patterns',
};

export const DIFF_KEYS: Record<Difficulty, keyof Translations> = {
  1: 'diff_beginner',
  2: 'diff_intermediate',
  3: 'diff_advanced',
};

export const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  1: 'bg-green-500/20 text-green-400',
  2: 'bg-yellow-500/20 text-yellow-400',
  3: 'bg-red-500/20 text-red-400',
};
```

- [ ] **Step 2: Remove constants from `src/types/index.ts`**

Delete `CATEGORY_LABELS` (lines 5-14), `CATEGORY_COLORS` (lines 16-25), and `DIFFICULTY_LABELS` (lines 27-31). Keep all type/interface definitions.

The file should start with:
```typescript
export type Category = "networking" | "storage" | "caching" | "scaling" | "reliability" | "messaging" | "security" | "patterns";

export type Difficulty = 1 | 2 | 3;

export interface Topic {
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: Errors about missing imports in consumer files (this is expected — we fix them in the next steps).

- [ ] **Step 4: Commit**

```bash
git add src/constants/index.ts src/types/index.ts
git commit -m "refactor: extract constants from types into dedicated module"
```

---

### Task 2: Update shared components to use constants

**Files:**
- Modify: `src/components/Sidebar.tsx`
- Modify: `src/components/CategoryTag.tsx`
- Modify: `src/components/DifficultyBadge.tsx`

- [ ] **Step 1: Update `Sidebar.tsx`**

Replace lines 1-15 with:
```typescript
import { CATEGORY_COLORS, CAT_KEYS } from '../constants';
import type { Category } from '../types';
import { useLanguage } from '../i18n';

const categories = Object.keys(CAT_KEYS) as Category[];
```

Remove the local `CAT_KEYS` definition entirely. Also remove `import type { Translations } from '../i18n';` (now unused — `CAT_KEYS` comes from constants).

- [ ] **Step 2: Update `CategoryTag.tsx`**

Replace lines 1-15 with:
```typescript
import { CATEGORY_COLORS, CAT_KEYS } from '../constants';
import type { Category } from '../types';
import { useLanguage } from '../i18n';
```

Remove the local `CAT_KEYS` definition and `import type { Translations } from '../i18n';` (now unused).

- [ ] **Step 3: Update `DifficultyBadge.tsx`**

Replace lines 1-15 with:
```typescript
import { DIFF_KEYS, DIFFICULTY_STYLES } from '../constants';
import type { Difficulty } from '../types';
import { useLanguage } from '../i18n';
```

Remove the local `DIFFICULTY_STYLES`, `DIFF_KEYS` definitions, and `import type { Translations } from '../i18n';` (now unused).

- [ ] **Step 4: Verify TypeScript compiles for these files**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: Remaining errors only from pages (Dashboard, Quizzes, Sandbox) — shared components should be clean.

- [ ] **Step 5: Commit**

```bash
git add src/components/Sidebar.tsx src/components/CategoryTag.tsx src/components/DifficultyBadge.tsx
git commit -m "refactor: update shared components to import from constants module"
```

---

### Task 3: Update pages to use constants

**Files:**
- Modify: `src/pages/Dashboard.tsx`
- Modify: `src/pages/Quizzes.tsx`
- Modify: `src/pages/Sandbox.tsx`

- [ ] **Step 1: Update `Dashboard.tsx`**

Replace line 7 (`import { CATEGORY_COLORS } from '../types';`) with:
```typescript
import { CATEGORY_COLORS, CAT_KEYS } from '../constants';
```

Delete the local `CAT_KEYS` definition (lines 11-20). Remove `import type { Translations } from '../i18n';` (line 6, now unused — `CAT_KEYS` comes from constants).

Keep `import type { Category } from '../types';` (line 8) as-is.

- [ ] **Step 2: Update `Quizzes.tsx`**

Replace line 3 (`import type { Category, Difficulty } from '../types';`) and lines 52-56 (local `DIFF_KEYS`):

New imports at top:
```typescript
import type { Category, Difficulty } from '../types';
import { DIFF_KEYS } from '../constants';
```

Delete the local `DIFF_KEYS` definition (lines 52-56). Remove `import type { Translations } from '../i18n';` (line 4) since `DIFF_KEYS` now comes from constants.

- [ ] **Step 3: Update `Sandbox.tsx`**

Replace lines 5-18 with:
```typescript
import { DIFF_KEYS, DIFFICULTY_STYLES } from '../constants';
import type { Difficulty } from '../types';
```

Remove `import type { Translations } from '../i18n';` (no longer needed). Remove local `DIFFICULTY_COLORS` and `DIFF_KEYS` definitions.

On line 46, change `DIFFICULTY_COLORS[ex.difficulty] ?? ''` to `DIFFICULTY_STYLES[ex.difficulty as Difficulty]` (remove the `?? ''` fallback — `DIFFICULTY_STYLES` is typed as `Record<Difficulty, string>` so it always returns a value).

- [ ] **Step 4: Verify full build**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 5: Run existing tests**

Run: `npm test`
Expected: All data integrity tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/pages/Dashboard.tsx src/pages/Quizzes.tsx src/pages/Sandbox.tsx
git commit -m "refactor: update pages to import from constants module"
```

---

### Task 4: Create `src/utils/quiz.ts` and update consumers

**Files:**
- Create: `src/utils/quiz.ts`
- Modify: `src/hooks/useQuizEngine.ts`
- Modify: `src/features/quiz/ScoreBoard.tsx`

- [ ] **Step 1: Create the utility**

```typescript
// src/utils/quiz.ts
import type { QuizQuestion } from '../types';

export function isAnswerCorrect(
  question: QuizQuestion,
  answer: string | boolean | string[] | undefined,
): boolean {
  if (answer === undefined) return false;
  if (question.type === 'multiple-choice') return answer === question.correctAnswer;
  if (question.type === 'true-false') return answer === question.correctAnswer;
  if (question.type === 'matching' && Array.isArray(answer)) {
    const correctOrder = question.pairs.map((p) => p.right);
    return JSON.stringify(answer) === JSON.stringify(correctOrder);
  }
  return false;
}
```

- [ ] **Step 2: Update `useQuizEngine.ts`**

Add import at top:
```typescript
import { isAnswerCorrect } from '../utils/quiz';
```

Replace `next()` scoring logic (lines 29-37):
```typescript
  const next = useCallback(() => {
    if (currentIndex + 1 >= shuffled.length) {
      let correct = 0;
      shuffled.forEach((q) => {
        if (isAnswerCorrect(q, answers[q.id])) correct++;
      });
      setScore({ correct, total: shuffled.length });
      setState('complete');
    } else {
      setCurrentIndex((i) => i + 1);
      setState('active');
    }
  }, [currentIndex, shuffled, answers]);
```

Replace `retryWrong()` filter logic (lines 48-57):
```typescript
  const retryWrong = useCallback(() => {
    const wrong = shuffled.filter((q) => !isAnswerCorrect(q, answers[q.id]));
    if (wrong.length === 0) return;
    setShuffled(wrong);
    setCurrentIndex(0);
    setAnswers({});
    setState('active');
  }, [shuffled, answers]);
```

- [ ] **Step 3: Update `ScoreBoard.tsx`**

Add import at top:
```typescript
import { isAnswerCorrect } from '../../utils/quiz';
```

Delete the local `isCorrect` function (lines 24-33). Replace usage on line 56:
```typescript
const correct = isAnswerCorrect(q, answers[q.id]);
```

- [ ] **Step 4: Verify build**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 5: Run tests**

Run: `npm test`
Expected: All tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/utils/quiz.ts src/hooks/useQuizEngine.ts src/features/quiz/ScoreBoard.tsx
git commit -m "refactor: extract shared quiz scoring logic into utils/quiz"
```

---

### Task 5: Split `QuestionCard.tsx` into separate sub-components

**Files:**
- Create: `src/features/quiz/MultipleChoiceCard.tsx`
- Create: `src/features/quiz/TrueFalseCard.tsx`
- Create: `src/features/quiz/MatchingCard.tsx`
- Modify: `src/features/quiz/QuestionCard.tsx`

- [ ] **Step 1: Create `MultipleChoiceCard.tsx`**

Extract the `MultipleChoiceCard` function (lines 13-74 of `QuestionCard.tsx`) into its own file:

```typescript
// src/features/quiz/MultipleChoiceCard.tsx
import type { QuizQuestion } from '../../types';
import { useLanguage } from '../../i18n';

interface MultipleChoiceCardProps {
  question: Extract<QuizQuestion, { type: 'multiple-choice' }>;
  onAnswer: (id: string, answer: string | boolean | string[]) => void;
  answered: boolean;
  userAnswer: string | boolean | string[] | undefined;
  onNext: () => void;
}

export default function MultipleChoiceCard({
  question,
  onAnswer,
  answered,
  userAnswer,
  onNext,
}: MultipleChoiceCardProps) {
  const { t } = useLanguage();
  const selected = userAnswer as string | undefined;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-100">{question.question}</h3>

      <div className="space-y-2">
        {question.options.map((opt) => {
          let style = 'border-[#2a2a4a] bg-[#1a1a2e] text-gray-300 hover:border-purple-500/50';
          if (answered) {
            if (opt === question.correctAnswer) {
              style = 'border-green-500 bg-green-500/10 text-green-300';
            } else if (opt === selected) {
              style = 'border-red-500 bg-red-500/10 text-red-300';
            } else {
              style = 'border-[#2a2a4a] bg-[#1a1a2e]/50 text-gray-500';
            }
          } else if (opt === selected) {
            style = 'border-purple-500 bg-purple-500/20 text-purple-200';
          }

          return (
            <button
              key={opt}
              disabled={answered}
              onClick={() => onAnswer(question.id, opt)}
              className={`w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors ${style}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="rounded-lg border border-[#2a2a4a] bg-[#16162a] p-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
            {t.quiz_explanation}
          </p>
          <p className="text-sm text-gray-300">{question.explanation}</p>
        </div>
      )}

      {answered && (
        <button
          onClick={onNext}
          className="rounded-lg bg-purple-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-500"
        >
          {t.quiz_next}
        </button>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create `TrueFalseCard.tsx`**

Extract the `TrueFalseCard` function (lines 76-136 of `QuestionCard.tsx`) into its own file:

```typescript
// src/features/quiz/TrueFalseCard.tsx
import type { QuizQuestion } from '../../types';
import { useLanguage } from '../../i18n';

interface TrueFalseCardProps {
  question: Extract<QuizQuestion, { type: 'true-false' }>;
  onAnswer: (id: string, answer: string | boolean | string[]) => void;
  answered: boolean;
  userAnswer: string | boolean | string[] | undefined;
  onNext: () => void;
}

export default function TrueFalseCard({
  question,
  onAnswer,
  answered,
  userAnswer,
  onNext,
}: TrueFalseCardProps) {
  const { t } = useLanguage();
  const selected = userAnswer as boolean | undefined;

  const btnStyle = (val: boolean) => {
    if (answered) {
      if (val === question.correctAnswer) {
        return 'border-green-500 bg-green-500/10 text-green-300';
      } else if (val === selected) {
        return 'border-red-500 bg-red-500/10 text-red-300';
      } else {
        return 'border-[#2a2a4a] bg-[#1a1a2e]/50 text-gray-500';
      }
    }
    if (val === selected) return 'border-purple-500 bg-purple-500/20 text-purple-200';
    return 'border-[#2a2a4a] bg-[#1a1a2e] text-gray-300 hover:border-purple-500/50';
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-100">{question.question}</h3>

      <div className="flex gap-3">
        {([true, false] as const).map((val) => (
          <button
            key={String(val)}
            disabled={answered}
            onClick={() => onAnswer(question.id, val)}
            className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${btnStyle(val)}`}
          >
            {val ? t.quiz_true : t.quiz_false}
          </button>
        ))}
      </div>

      {answered && (
        <div className="rounded-lg border border-[#2a2a4a] bg-[#16162a] p-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
            {t.quiz_explanation}
          </p>
          <p className="text-sm text-gray-300">{question.explanation}</p>
        </div>
      )}

      {answered && (
        <button
          onClick={onNext}
          className="rounded-lg bg-purple-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-500"
        >
          {t.quiz_next}
        </button>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Create `MatchingCard.tsx`**

Extract the `MatchingCard` function (lines 138-245 of `QuestionCard.tsx`) into its own file:

```typescript
// src/features/quiz/MatchingCard.tsx
import { useState } from 'react';
import type { QuizQuestion } from '../../types';
import { useLanguage } from '../../i18n';

interface MatchingCardProps {
  question: Extract<QuizQuestion, { type: 'matching' }>;
  onAnswer: (id: string, answer: string | boolean | string[]) => void;
  answered: boolean;
  userAnswer: string | boolean | string[] | undefined;
  onNext: () => void;
}

export default function MatchingCard({
  question,
  onAnswer,
  answered,
  userAnswer,
  onNext,
}: MatchingCardProps) {
  const { t } = useLanguage();
  const [selections, setSelections] = useState<string[]>(
    () => new Array(question.pairs.length).fill(''),
  );

  const rightOptions = question.pairs.map((p) => p.right);
  const correctOrder = question.pairs.map((p) => p.right);
  const userSelections = (userAnswer as string[] | undefined) ?? selections;

  const handleSelect = (idx: number, value: string) => {
    const next = [...selections];
    next[idx] = value;
    setSelections(next);
  };

  const handleSubmit = () => {
    onAnswer(question.id, selections);
  };

  const allFilled = selections.every((s) => s !== '');
  const isSubmitted = answered && Array.isArray(userAnswer);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-100">{question.question}</h3>

      <div className="space-y-3">
        {question.pairs.map((pair, idx) => {
          const isCorrect = isSubmitted && userSelections[idx] === correctOrder[idx];
          const isWrong = isSubmitted && userSelections[idx] !== correctOrder[idx];

          return (
            <div key={pair.left} className="flex items-center gap-3">
              <span className="w-40 shrink-0 rounded-lg border border-[#2a2a4a] bg-[#16162a] px-3 py-2 text-sm text-gray-200">
                {pair.left}
              </span>
              <span className="text-gray-500">&rarr;</span>
              {answered ? (
                <span
                  className={`flex-1 rounded-lg border px-3 py-2 text-sm ${
                    isCorrect
                      ? 'border-green-500 bg-green-500/10 text-green-300'
                      : 'border-red-500 bg-red-500/10 text-red-300'
                  }`}
                >
                  {userSelections[idx]}
                  {isWrong && (
                    <span className="ml-2 text-xs text-green-400">
                      ({t.quiz_correct_label}: {correctOrder[idx]})
                    </span>
                  )}
                </span>
              ) : (
                <select
                  value={selections[idx]}
                  onChange={(e) => handleSelect(idx, e.target.value)}
                  className="flex-1 rounded-lg border border-[#2a2a4a] bg-[#1a1a2e] px-3 py-2 text-sm text-gray-200 outline-none focus:border-purple-500"
                >
                  <option value="">{t.quiz_select_match}</option>
                  {rightOptions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              )}
            </div>
          );
        })}
      </div>

      {!answered && (
        <button
          disabled={!allFilled}
          onClick={handleSubmit}
          className="rounded-lg bg-purple-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {t.quiz_submit_matches}
        </button>
      )}

      {answered && (
        <div className="rounded-lg border border-[#2a2a4a] bg-[#16162a] p-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
            {t.quiz_explanation}
          </p>
          <p className="text-sm text-gray-300">{question.explanation}</p>
        </div>
      )}

      {answered && (
        <button
          onClick={onNext}
          className="rounded-lg bg-purple-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-500"
        >
          {t.quiz_next}
        </button>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Replace `QuestionCard.tsx` with thin dispatcher**

```typescript
// src/features/quiz/QuestionCard.tsx
import type { QuizQuestion } from '../../types';
import MultipleChoiceCard from './MultipleChoiceCard';
import TrueFalseCard from './TrueFalseCard';
import MatchingCard from './MatchingCard';

interface QuestionCardProps {
  question: QuizQuestion;
  onAnswer: (id: string, answer: string | boolean | string[]) => void;
  answered: boolean;
  userAnswer: string | boolean | string[] | undefined;
  onNext: () => void;
}

export default function QuestionCard(props: QuestionCardProps) {
  const { question } = props;

  if (question.type === 'multiple-choice') {
    return <MultipleChoiceCard {...props} question={question} />;
  }
  if (question.type === 'true-false') {
    return <TrueFalseCard {...props} question={question} />;
  }
  if (question.type === 'matching') {
    return <MatchingCard {...props} question={question} />;
  }

  return null;
}
```

- [ ] **Step 5: Verify build**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 6: Commit**

```bash
git add src/features/quiz/MultipleChoiceCard.tsx src/features/quiz/TrueFalseCard.tsx src/features/quiz/MatchingCard.tsx src/features/quiz/QuestionCard.tsx
git commit -m "refactor: split QuestionCard into separate sub-components"
```

---

### Task 6: Split `Canvas.tsx` into toolbar + state hook

**Files:**
- Create: `src/features/sandbox/useCanvasState.ts`
- Create: `src/features/sandbox/CanvasToolbar.tsx`
- Modify: `src/features/sandbox/Canvas.tsx`

- [ ] **Step 1: Create `useCanvasState.ts`**

Extract state management and handlers from `Canvas.tsx`:

```typescript
// src/features/sandbox/useCanvasState.ts
import { useState, useCallback, useRef } from 'react';
import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useLanguage } from '../../i18n';
import type {
  SandboxState,
  SandboxComponentInstance,
  SandboxConnection,
} from '../../types';

interface SavedDesign {
  name: string;
  createdAt: string;
  state: SandboxState;
}

type SavedDesigns = Record<string, SavedDesign>;

const EMPTY_STATE: SandboxState = { components: [], connections: [] };

let idCounter = 0;
function uid() {
  return `comp-${Date.now()}-${++idCounter}`;
}

export function useCanvasState() {
  const { t } = useLanguage();
  const [state, setState] = useState<SandboxState>(EMPTY_STATE);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [connectMode, setConnectMode] = useState(false);
  const connectSourceRef = useRef<string | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const [savedDesigns, setSavedDesigns] = useLocalStorage<SavedDesigns>(
    'systemprep-designs',
    {},
  );
  const [loadMenuOpen, setLoadMenuOpen] = useState(false);

  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 5 },
  });
  const sensors = useSensors(sensor);

  const handleSelect = useCallback(
    (id: string) => {
      if (connectMode) {
        if (!connectSourceRef.current) {
          connectSourceRef.current = id;
        } else if (connectSourceRef.current !== id) {
          const from = connectSourceRef.current;
          const to = id;
          const label = window.prompt(t.sandbox_connection_label, '') ?? '';
          const conn: SandboxConnection = {
            id: `conn-${Date.now()}`,
            from,
            to,
            label: label || undefined,
          };
          setState((prev) => ({
            ...prev,
            connections: [...prev.connections, conn],
          }));
          connectSourceRef.current = null;
        }
        return;
      }
      setSelectedId(id);
    },
    [connectMode, t],
  );

  const handleDelete = useCallback((id: string) => {
    setState((prev) => ({
      components: prev.components.filter((c) => c.id !== id),
      connections: prev.connections.filter(
        (c) => c.from !== id && c.to !== id,
      ),
    }));
    setSelectedId(null);
  }, []);

  const handleCanvasClick = useCallback(() => {
    if (connectMode) {
      connectSourceRef.current = null;
    }
    setSelectedId(null);
  }, [connectMode]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over, delta } = event;
    if (!over || over.id !== 'canvas-drop-zone') return;

    const data = active.data.current as Record<string, unknown> | undefined;
    if (!data) return;

    if (data.source === 'palette') {
      const el = canvasRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const translated = active.rect.current.translated;
      if (!translated) return;

      const x = translated.left - rect.left + el.scrollLeft;
      const y = translated.top - rect.top + el.scrollTop;

      const inst: SandboxComponentInstance = {
        id: uid(),
        type: data.componentType as string,
        position: { x: Math.max(0, x), y: Math.max(0, y) },
      };
      setState((prev) => ({
        ...prev,
        components: [...prev.components, inst],
      }));
    } else if (data.source === 'canvas') {
      const instanceId = data.instanceId as string;
      setState((prev) => ({
        ...prev,
        components: prev.components.map((c) =>
          c.id === instanceId
            ? {
                ...c,
                position: {
                  x: Math.max(0, c.position.x + delta.x),
                  y: Math.max(0, c.position.y + delta.y),
                },
              }
            : c,
        ),
      }));
    }
  }, []);

  const handleClear = () => {
    setState(EMPTY_STATE);
    setSelectedId(null);
    connectSourceRef.current = null;
  };

  const handleSave = () => {
    const name = window.prompt(t.sandbox_design_name);
    if (!name) return;
    const key = name.toLowerCase().replace(/\s+/g, '-');
    setSavedDesigns((prev) => ({
      ...prev,
      [key]: { name, createdAt: new Date().toISOString(), state },
    }));
  };

  const handleLoad = (key: string) => {
    const design = savedDesigns[key];
    if (design) {
      setState(design.state);
      setSelectedId(null);
      setLoadMenuOpen(false);
    }
  };

  const toggleConnectMode = () => {
    setConnectMode((v) => !v);
    connectSourceRef.current = null;
  };

  return {
    state,
    selectedId,
    connectMode,
    canvasRef,
    sensors,
    savedDesigns,
    loadMenuOpen,
    setLoadMenuOpen,
    handleSelect,
    handleDelete,
    handleCanvasClick,
    handleDragEnd,
    handleClear,
    handleSave,
    handleLoad,
    toggleConnectMode,
  };
}
```

- [ ] **Step 2: Create `CanvasToolbar.tsx`**

```typescript
// src/features/sandbox/CanvasToolbar.tsx
import { useLanguage } from '../../i18n';

interface SavedDesign {
  name: string;
  createdAt: string;
}

interface CanvasToolbarProps {
  connectMode: boolean;
  onToggleConnect: () => void;
  onClear: () => void;
  onSave: () => void;
  onLoad: (key: string) => void;
  savedDesigns: Record<string, SavedDesign>;
  loadMenuOpen: boolean;
  onToggleLoadMenu: () => void;
}

export default function CanvasToolbar({
  connectMode,
  onToggleConnect,
  onClear,
  onSave,
  onLoad,
  savedDesigns,
  loadMenuOpen,
  onToggleLoadMenu,
}: CanvasToolbarProps) {
  const { t } = useLanguage();
  const savedEntries = Object.entries(savedDesigns);

  return (
    <div className="flex items-center gap-2 border-b border-[#2a2a4a] bg-[#16162a] px-4 py-2">
      <button
        onClick={onToggleConnect}
        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors
          ${connectMode ? 'bg-purple-600 text-white' : 'bg-[#2a2a4a]/60 text-gray-300 hover:bg-[#2a2a4a]'}`}
      >
        {connectMode ? t.sandbox_connecting : t.sandbox_connect}
      </button>
      <div className="mx-2 h-4 w-px bg-[#2a2a4a]" />
      <button
        onClick={onClear}
        className="rounded-lg bg-[#2a2a4a]/60 px-3 py-1.5 text-xs text-gray-300 hover:bg-[#2a2a4a]"
      >
        {t.sandbox_clear}
      </button>
      <button
        onClick={onSave}
        className="rounded-lg bg-[#2a2a4a]/60 px-3 py-1.5 text-xs text-gray-300 hover:bg-[#2a2a4a]"
      >
        {t.sandbox_save}
      </button>
      <div className="relative">
        <button
          onClick={onToggleLoadMenu}
          className="rounded-lg bg-[#2a2a4a]/60 px-3 py-1.5 text-xs text-gray-300 hover:bg-[#2a2a4a]"
        >
          {t.sandbox_load}
        </button>
        {loadMenuOpen && (
          <div className="absolute left-0 top-full z-50 mt-1 min-w-48 rounded-lg border border-[#2a2a4a] bg-[#1a1a2e] p-1 shadow-xl">
            {savedEntries.length === 0 ? (
              <p className="px-3 py-2 text-xs text-gray-500">{t.sandbox_no_saved}</p>
            ) : (
              savedEntries.map(([key, d]) => (
                <button
                  key={key}
                  onClick={() => onLoad(key)}
                  className="flex w-full flex-col items-start rounded-md px-3 py-2 text-left hover:bg-[#2a2a4a]"
                >
                  <span className="text-xs text-gray-200">{d.name}</span>
                  <span className="text-[10px] text-gray-500">
                    {new Date(d.createdAt).toLocaleDateString()}
                  </span>
                </button>
              ))
            )}
          </div>
        )}
      </div>
      {connectMode && (
        <span className="ml-auto text-[11px] text-purple-400">
          {t.sandbox_connect_hint}
        </span>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Rewrite `Canvas.tsx` to use hook + toolbar**

```typescript
// src/features/sandbox/Canvas.tsx
import { useCallback, type RefObject } from 'react';
import { DndContext, useDroppable } from '@dnd-kit/core';
import SandboxComponent from './SandboxComponent';
import ConnectionLines from './ConnectionLines';
import ComponentPalette from './ComponentPalette';
import CanvasToolbar from './CanvasToolbar';
import { useCanvasState } from './useCanvasState';
import { useLanguage } from '../../i18n';
import type { SandboxState } from '../../types';

function CanvasDropZone({
  state,
  selectedId,
  connectMode,
  onSelect,
  onDelete,
  onCanvasClick,
  canvasRef,
}: {
  state: SandboxState;
  selectedId: string | null;
  connectMode: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onCanvasClick: () => void;
  canvasRef: RefObject<HTMLDivElement | null>;
}) {
  const { t } = useLanguage();
  const { setNodeRef, isOver } = useDroppable({ id: 'canvas-drop-zone' });

  const mergedRef = useCallback(
    (node: HTMLDivElement | null) => {
      setNodeRef(node);
      (canvasRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [setNodeRef, canvasRef],
  );

  return (
    <div
      ref={mergedRef}
      className={`relative flex-1 overflow-auto ${isOver ? 'ring-2 ring-purple-500/40 ring-inset' : ''}`}
      style={{
        minHeight: 600,
        backgroundColor: '#0a0a15',
        backgroundImage: 'radial-gradient(circle, #2a2a4a 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
      onClick={onCanvasClick}
    >
      <ConnectionLines
        components={state.components}
        connections={state.connections}
      />
      {state.components.length === 0 && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <p className="text-gray-600 text-sm">
            {t.sandbox_drag_hint}
          </p>
        </div>
      )}
      {state.components.map((inst) => (
        <SandboxComponent
          key={inst.id}
          instance={inst}
          selected={selectedId === inst.id}
          connectMode={connectMode}
          onSelect={onSelect}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default function Canvas() {
  const canvas = useCanvasState();

  return (
    <DndContext sensors={canvas.sensors} onDragEnd={canvas.handleDragEnd}>
      <div className="flex h-full flex-col">
        <CanvasToolbar
          connectMode={canvas.connectMode}
          onToggleConnect={canvas.toggleConnectMode}
          onClear={canvas.handleClear}
          onSave={canvas.handleSave}
          onLoad={canvas.handleLoad}
          savedDesigns={canvas.savedDesigns}
          loadMenuOpen={canvas.loadMenuOpen}
          onToggleLoadMenu={() => canvas.setLoadMenuOpen((v) => !v)}
        />

        <div className="flex flex-1 overflow-hidden">
          <ComponentPalette />
          <div className="flex-1 overflow-auto">
            <CanvasDropZone
              state={canvas.state}
              selectedId={canvas.selectedId}
              connectMode={canvas.connectMode}
              onSelect={canvas.handleSelect}
              onDelete={canvas.handleDelete}
              onCanvasClick={canvas.handleCanvasClick}
              canvasRef={canvas.canvasRef}
            />
          </div>
        </div>
      </div>
    </DndContext>
  );
}
```

- [ ] **Step 4: Verify build**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 5: Commit**

```bash
git add src/features/sandbox/useCanvasState.ts src/features/sandbox/CanvasToolbar.tsx src/features/sandbox/Canvas.tsx
git commit -m "refactor: split Canvas into toolbar component and state hook"
```

---

### Task 7: Add barrel exports and update page imports

**Files:**
- Create: `src/features/quiz/index.ts`
- Create: `src/features/flashcard/index.ts`
- Create: `src/features/sandbox/index.ts`
- Modify: `src/pages/Quizzes.tsx`
- Modify: `src/pages/Flashcards.tsx`
- Modify: `src/pages/Sandbox.tsx`
- Modify: `src/pages/GuidedExercisePage.tsx`

- [ ] **Step 1: Create barrel files**

```typescript
// src/features/quiz/index.ts
export { default as QuizEngine } from './QuizEngine';
```

```typescript
// src/features/flashcard/index.ts
export { default as FlashcardDeck } from './FlashcardDeck';
```

```typescript
// src/features/sandbox/index.ts
export { default as Canvas } from './Canvas';
export { default as GuidedExercise } from './GuidedExercise';
export { default as ComponentPalette } from './ComponentPalette';
```

- [ ] **Step 2: Update `Quizzes.tsx` import**

Replace line 9:
```typescript
// Before
import QuizEngine from '../features/quiz/QuizEngine';
// After
import { QuizEngine } from '../features/quiz';
```

- [ ] **Step 3: Update `Flashcards.tsx` import**

Replace line 4:
```typescript
// Before
import FlashcardDeck from '../features/flashcard/FlashcardDeck';
// After
import { FlashcardDeck } from '../features/flashcard';
```

- [ ] **Step 4: Update `Sandbox.tsx` import**

Replace line 2:
```typescript
// Before
import Canvas from '../features/sandbox/Canvas';
// After
import { Canvas } from '../features/sandbox';
```

- [ ] **Step 5: Update `GuidedExercisePage.tsx` import**

Replace line 5:
```typescript
// Before
import GuidedExercise from '../features/sandbox/GuidedExercise';
// After
import { GuidedExercise } from '../features/sandbox';
```

- [ ] **Step 6: Verify full build**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 7: Run all tests**

Run: `npm test`
Expected: All tests pass.

- [ ] **Step 8: Run lint**

Run: `npm run lint`
Expected: No errors.

- [ ] **Step 9: Commit**

```bash
git add src/features/quiz/index.ts src/features/flashcard/index.ts src/features/sandbox/index.ts src/pages/Quizzes.tsx src/pages/Flashcards.tsx src/pages/Sandbox.tsx src/pages/GuidedExercisePage.tsx
git commit -m "refactor: add barrel exports for feature directories and update page imports"
```

---

### Task 8: Final validation

- [ ] **Step 1: Full production build**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 2: Run all tests**

Run: `npm test`
Expected: All data integrity tests pass.

- [ ] **Step 3: Run lint**

Run: `npm run lint`
Expected: No lint errors.

- [ ] **Step 4: Start dev server and verify pages**

Run: `npm run dev`
Manually check: Dashboard, Topics, TopicDetail, Quizzes (start a quiz, answer questions, see score), Flashcards (flip cards), Sandbox (drag components, connect, save/load), Guided Exercise (step through).

- [ ] **Step 5: Review git log**

Run: `git log --oneline dev..HEAD`
Expected: ~7 clean commits covering constants, utils, component splits, and barrel exports.
