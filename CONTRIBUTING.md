# Contributing to SystemPrep

Thank you for your interest in contributing! This guide will help you get started.

## How to Contribute

### Reporting Bugs

- Use the [Bug Report](https://github.com/Y1-Bit/Learn-System-Design/issues/new?template=bug_report.yml) issue template
- Include steps to reproduce, expected vs actual behavior
- Add screenshots if it's a visual issue

### Suggesting Features

- Use the [Feature Request](https://github.com/Y1-Bit/Learn-System-Design/issues/new?template=feature_request.yml) issue template
- Describe the use case and why it would help interview prep

### Adding Content

One of the best ways to contribute is adding or improving study content:

- **New topics** — Add a topic file in `src/data/topics/` following the existing pattern
- **Quiz questions** — Add questions to `src/data/quizzes.ts`
- **Flashcards** — Add cards to `src/data/flashcards.ts`
- **Exercises** — Add guided exercises to `src/data/exercises.ts`
- **Translations** — Add or improve Russian translations in `src/data/ru/`

### Adding a New Language

1. Create a new translation file in `src/i18n/` (e.g., `es.ts`) implementing the `Translations` interface
2. Create translated data files in `src/data/<lang>/`
3. Add the language to `Language` type in `src/i18n/types.ts`
4. Register it in `LanguageContext.tsx`
5. Add a toggle button in `Navbar.tsx`

## Development Setup

```bash
# Fork and clone
git clone https://github.com/<your-username>/Learn-System-Design.git
cd Learn-System-Design

# Install dependencies
npm install

# Start dev server
npm run dev

# Run type checks
npx tsc --noEmit

# Run tests
npm test

# Production build
npm run build
```

## Pull Request Process

1. **Fork** the repo and create a branch from `dev`
2. **Name your branch** descriptively: `feat/add-topic-xyz`, `fix/quiz-scoring`, `i18n/add-spanish`
3. **Make your changes** — keep commits focused and atomic
4. **Test** — ensure `npx tsc --noEmit` and `npm run build` pass with zero errors
5. **Submit a PR** to `dev` branch (not `main`)
6. **Fill out the PR template** — describe what you changed and why

### Content Guidelines

When adding study content:

- Keep explanations clear and concise — target someone preparing for interviews
- Include practical examples, not just theory
- Add 4-6 key points per topic
- Include 2-3 real-world examples
- Include 2-3 interview tips
- Use difficulty levels consistently: 1 = Beginner, 2 = Intermediate, 3 = Advanced
- Technical terms should remain in English even in translations

### Code Guidelines

- TypeScript strict mode — no `any` types
- Follow existing patterns and file structure
- Use Tailwind CSS for styling (dark theme: `bg-[#0f0f1a]`, `bg-[#1a1a2e]`, etc.)
- Keep components focused and small
- No external API calls — all data is local

## Project Structure

```
src/
  i18n/            # Internationalization (translations, context)
  components/      # Shared UI components
  pages/           # Route pages
  features/        # Feature-specific components (quiz, flashcard, sandbox)
  data/            # English content (topics, quizzes, flashcards, exercises)
    ru/            # Russian translations
  hooks/           # Custom React hooks
  types/           # TypeScript interfaces
```

## Questions?

Open a [Discussion](https://github.com/Y1-Bit/Learn-System-Design/discussions) or reach out via Issues.
