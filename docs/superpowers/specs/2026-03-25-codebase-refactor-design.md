# Codebase Refactor: Organization, Duplication & Maintainability

**Date:** 2026-03-25
**Approach:** Moderate restructure ("Extract & Barrel")
**Branch:** Created from `dev`, PR back into `dev`

## Problem Statement

The codebase is well-structured but has accumulated four categories of organizational debt:

1. **Code duplication** — `CAT_KEYS` mapping in 3 components, `DIFF_KEYS` mapping in 3 components, quiz scoring logic in 3 places, difficulty styles in 2 places
2. **Large components** — `Canvas.tsx` (319 lines), `QuestionCard.tsx` (261 lines) do too much
3. **Mixed concerns in types** — `types/index.ts` combines TypeScript types with runtime constants
4. **Missing barrel exports** — feature directories expose internals; pages import implementation details directly

## Design

### 1. Constants Extraction

**New file:** `src/constants/index.ts`

Move from `src/types/index.ts`:
- `CATEGORY_COLORS` — `Record<Category, string>` (category hex colors)

Delete from `src/types/index.ts` (dead code — never imported anywhere):
- `CATEGORY_LABELS` — superseded by i18n system (`CAT_KEYS` + `t[]`)
- `DIFFICULTY_LABELS` — superseded by i18n system (`DIFF_KEYS` + `t[]`)

Consolidate duplicates into shared constants:
- `CAT_KEYS` — `Record<Category, keyof Translations>` mapping categories to i18n keys. Currently duplicated in `Sidebar.tsx`, `Dashboard.tsx`, and `CategoryTag.tsx`
- `DIFF_KEYS` — `Record<Difficulty, keyof Translations>` mapping difficulty levels to i18n keys. Currently duplicated in `DifficultyBadge.tsx`, `Quizzes.tsx`, `Sandbox.tsx`
- `DIFFICULTY_STYLES` — `Record<Difficulty, string>` mapping difficulty levels to Tailwind color classes. Currently in `DifficultyBadge.tsx` (shade `500`) and `Sandbox.tsx` as `DIFFICULTY_COLORS` (shade `600`). Canonical value: use `500` shade from `DifficultyBadge.tsx` (`bg-green-500/20`, `bg-yellow-500/20`, `bg-red-500/20`). `Sandbox.tsx` will adopt the `500` shade (minor visual change: `600` → `500`) and rename from `DIFFICULTY_COLORS` to `DIFFICULTY_STYLES`

**Result:** `src/types/index.ts` becomes pure type definitions only. All components import constants from `../constants`.

### 2. Shared Quiz Utilities

**New file:** `src/utils/quiz.ts`

Extract duplicated quiz scoring logic into:
- `isAnswerCorrect(question: QuizQuestion, answer: unknown): boolean` — handles all 3 question types (multiple-choice, true-false, matching)

**Consumers (3 call sites across 2 files):**
- `src/hooks/useQuizEngine.ts` `next()` callback — replaces inline scoring logic
- `src/hooks/useQuizEngine.ts` `retryWrong()` callback — replaces inline wrong-answer filtering
- `src/features/quiz/ScoreBoard.tsx` — replaces local `isCorrect()` function

### 3. Large Component Splitting

#### QuestionCard.tsx (261 lines) → 4 files

| File | Responsibility |
|------|---------------|
| `QuestionCard.tsx` | Already a dispatcher — extract inline sub-components to separate files |
| `MultipleChoiceCard.tsx` | Renders option list with selection state |
| `TrueFalseCard.tsx` | Renders true/false toggle |
| `MatchingCard.tsx` | Renders matching pairs UI |

All new files in `src/features/quiz/`.

#### Canvas.tsx (319 lines) → 3 files

| File | Responsibility |
|------|---------------|
| `Canvas.tsx` | Layout + DndContext wiring (slimmed) |
| `CanvasToolbar.tsx` | Toolbar controls: save, load, clear, design name |
| `useCanvasState.ts` | Hook: component placement, connections, drag state |

All files in `src/features/sandbox/`.

#### GuidedExercise.tsx (217 lines)

Left as-is. At 217 lines with sequential step logic, splitting would reduce clarity.

### 4. Barrel Exports for Feature Directories

| Barrel file | Public exports |
|-------------|---------------|
| `src/features/quiz/index.ts` | `QuizEngine` |
| `src/features/flashcard/index.ts` | `FlashcardDeck` |
| `src/features/sandbox/index.ts` | `Canvas`, `GuidedExercise`, `ComponentPalette` |

**Export strategy:** Components currently using `export default` will be re-exported as named exports from barrels:
```typescript
// src/features/quiz/index.ts
export { default as QuizEngine } from './QuizEngine';
```

**Import change in pages:**
```typescript
// Before
import QuizEngine from '../features/quiz/QuizEngine';
// After
import { QuizEngine } from '../features/quiz';
```

Internal components (`MultipleChoiceCard`, `ScoreBoard`, `SandboxComponent`, etc.) are NOT exported — they are implementation details.

## Files Created

| File | Purpose |
|------|---------|
| `src/constants/index.ts` | Shared runtime constants (`CATEGORY_COLORS`, `CAT_KEYS`, `DIFF_KEYS`, `DIFFICULTY_STYLES`) |
| `src/utils/quiz.ts` | Shared quiz scoring logic (`isAnswerCorrect`) |
| `src/features/quiz/MultipleChoiceCard.tsx` | Multiple-choice question renderer |
| `src/features/quiz/TrueFalseCard.tsx` | True/false question renderer |
| `src/features/quiz/MatchingCard.tsx` | Matching question renderer |
| `src/features/sandbox/CanvasToolbar.tsx` | Canvas toolbar controls |
| `src/features/sandbox/useCanvasState.ts` | Canvas state management hook |
| `src/features/quiz/index.ts` | Barrel export |
| `src/features/flashcard/index.ts` | Barrel export |
| `src/features/sandbox/index.ts` | Barrel export |

## Files Modified

| File | Change |
|------|--------|
| `src/types/index.ts` | Remove `CATEGORY_COLORS`, delete dead `CATEGORY_LABELS` and `DIFFICULTY_LABELS` |
| `src/features/quiz/QuestionCard.tsx` | Extract inline sub-components to separate files, keep as dispatcher |
| `src/features/quiz/ScoreBoard.tsx` | Use shared `isAnswerCorrect` from utils |
| `src/features/sandbox/Canvas.tsx` | Extract toolbar + state hook |
| `src/hooks/useQuizEngine.ts` | Use shared `isAnswerCorrect` in both `next()` and `retryWrong()` |
| `src/components/Sidebar.tsx` | Import `CAT_KEYS` from constants, remove local definition |
| `src/components/CategoryTag.tsx` | Import `CAT_KEYS`, `CATEGORY_COLORS` from constants, remove local definitions |
| `src/components/DifficultyBadge.tsx` | Import `DIFF_KEYS`, `DIFFICULTY_STYLES` from constants, remove local definitions |
| `src/pages/Dashboard.tsx` | Import `CAT_KEYS` from constants, remove local definition |
| `src/pages/Quizzes.tsx` | Import `DIFF_KEYS` from constants, use barrel import for QuizEngine |
| `src/pages/Flashcards.tsx` | Use barrel import for FlashcardDeck |
| `src/pages/Sandbox.tsx` | Import `DIFF_KEYS`, `DIFFICULTY_STYLES` from constants (replacing local `DIFFICULTY_COLORS`), use barrel import for Canvas |
| `src/pages/GuidedExercisePage.tsx` | Use barrel import for GuidedExercise |

## Known Debt (Out of Scope)

- `src/pages/Quizzes.tsx` contains a hardcoded `TOPIC_CATEGORY` record mapping every topic ID to its category. This is fragile and derivable from topics data. Flagged for a future pass.
- No changes to data files (`src/data/`)
- No changes to i18n system
- No changes to hooks directory structure
- No new test files (existing data-integrity tests remain valid)
- GuidedExercise.tsx left as-is (217 lines, sequential logic)

## Validation

- `npm run build` must pass (TypeScript + Vite)
- `npm run lint` must pass
- `npm test` must pass (data integrity tests)
- All pages must render correctly (manual check or dev server)
- No runtime regressions in quiz scoring, flashcard mastery, or sandbox drag-and-drop
