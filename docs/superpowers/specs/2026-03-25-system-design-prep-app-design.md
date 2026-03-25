# System Design Interview Prep App — Design Spec

## Overview

An interactive web application for preparing for system design interviews. Covers 40-50 system design concepts across 8 categories with four learning modes: topic browsing, quizzes, flashcards, and a drag-and-drop design sandbox.

**Key constraints:**
- Client-side only (no backend) — all progress stored in localStorage
- React + TypeScript + Vite
- All content is hardcoded TypeScript data (type-safe, easy to extend)
- Dark theme, single-page app

## Tech Stack

| Tool | Purpose |
|------|---------|
| Vite | Build tool & dev server |
| React 18 | UI framework |
| TypeScript | Type safety |
| React Router v6 | Client-side routing |
| Tailwind CSS | Styling (dark theme) |
| dnd-kit | Drag-and-drop for sandbox canvas |
| react-markdown | Render topic explanations |
| localStorage | Progress persistence |

No backend, no external APIs, no database.

## Routes

| Path | Page |
|------|------|
| `/` | Dashboard |
| `/topics` | Topics Browser |
| `/topics/:topicId` | Topic Detail |
| `/quizzes` | Quizzes (supports `?category=X&difficulty=Y` query params) |
| `/flashcards` | Flashcards (supports `?category=X` query params) |
| `/sandbox` | Free-form Sandbox Canvas |
| `/exercises/:exerciseId` | Guided Exercise |

## App Structure

### 5 Main Pages

1. **Dashboard** — Progress overview with stats (topics studied, quiz scores, cards mastered, exercises completed). "Continue studying" shortcuts to recently-active topics.

2. **Topics Browser** — Browse all concepts by category via a sidebar. Each topic page shows: summary, detailed explanation (markdown), key bullet points, optional diagram, real-world examples ("Netflix uses X for Y"), interview tips, and links to related topics.

3. **Quizzes** — Question bank filtered by category or difficulty. Four question types: multiple choice, true/false, matching, and scenario-based. Each question shows an explanation after answering. Tracks scores per topic.

4. **Flashcards** — Flip cards with concept/question on front, definition/answer on back. Users mark cards as "mastered" or "needs review". Filterable by category, difficulty, and mastery status.

5. **Design Sandbox** — Two modes:
   - **Free-form canvas**: Drag system components (Client, Load Balancer, Cache, Database, Message Queue, etc.) from a palette onto a canvas. Connect components with labeled arrows to model data flow.
   - **Guided exercises**: Step-by-step scenarios ("Design a URL Shortener") where each step presents a design decision with multiple options, hints, and explanations.

### Layout

- **Top navbar**: Logo ("SystemPrep") + navigation links to all 5 pages
- **Left sidebar**: Category filter (visible on Topics, Quizzes, Flashcards pages)
- **Main content area**: Page-specific content

## Data Model

### TypeScript Interfaces

```typescript
type Category =
  | "networking"
  | "storage"
  | "caching"
  | "scaling"
  | "reliability"
  | "messaging"
  | "security"
  | "patterns";

interface Topic {
  id: string;              // "load-balancing"
  title: string;           // "Load Balancing"
  category: Category;
  difficulty: 1 | 2 | 3;  // beginner, intermediate, advanced
  summary: string;         // 1-2 sentence overview
  explanation: string;     // Detailed markdown (rendered via react-markdown)
  keyPoints: string[];     // Bullet-point takeaways
  diagram?: React.FC;      // Optional: React component rendering an SVG diagram
  realWorld: string[];     // Real-world usage examples
  interviewTips: string[]; // Tips for discussing in interviews
  relatedTopics: string[]; // IDs of related topics
}

// Discriminated union for quiz question types
interface BaseQuestion {
  id: string;
  topicId: string;
  difficulty: 1 | 2 | 3;
  explanation: string;      // Shown after answering
}

interface MultipleChoiceQuestion extends BaseQuestion {
  type: "multiple-choice";
  question: string;
  options: string[];
  correctAnswer: string;    // The correct option text
}

interface TrueFalseQuestion extends BaseQuestion {
  type: "true-false";
  question: string;         // A statement
  correctAnswer: boolean;
}

interface MatchingQuestion extends BaseQuestion {
  type: "matching";
  question: string;         // e.g., "Match each concept with its description"
  pairs: { left: string; right: string }[];  // Correct pairings
  // UI shuffles the right column; user must match them
}

type QuizQuestion =
  | MultipleChoiceQuestion
  | TrueFalseQuestion
  | MatchingQuestion;
// Note: "scenario" type removed — can be added later once the format is defined.
// For now, scenario-style questions can use multiple-choice with a longer question text.

interface Flashcard {
  id: string;
  topicId: string;
  front: string;
  back: string;
  difficulty: 1 | 2 | 3;
}

interface Exercise {
  id: string;
  title: string;           // "Design a URL Shortener"
  description: string;
  difficulty: 1 | 2 | 3;
  steps: ExerciseStep[];
}

interface ExerciseStep {
  prompt: string;           // "Which database would you choose?"
  options: {
    label: string;
    correct: boolean;
    explanation: string;
  }[];
  hint?: string;
}
```

### Sandbox Components

Draggable building blocks for the canvas:

- Client/Browser
- Load Balancer
- Web Server
- App Server
- SQL Database
- NoSQL Database
- Cache (Redis)
- Message Queue
- CDN
- API Gateway
- Object Storage (S3)
- DNS
- Search Engine (Elasticsearch)
- Rate Limiter
- Notification Service

```typescript
interface SandboxComponentDef {
  type: string;            // "load-balancer", "cache", "sql-db", etc.
  label: string;           // "Load Balancer"
  icon: string;            // Icon identifier for rendering
  category: "compute" | "storage" | "network" | "messaging";
}

interface SandboxComponentInstance {
  id: string;              // Unique instance ID on the canvas
  type: string;            // References SandboxComponentDef.type
  position: { x: number; y: number };
}

interface Connection {
  id: string;
  from: string;            // SandboxComponentInstance.id
  to: string;              // SandboxComponentInstance.id
  label?: string;          // "HTTP", "TCP", "pub/sub", etc.
}

interface SandboxState {
  components: SandboxComponentInstance[];
  connections: Connection[];
}
```

### Sandbox Persistence

Saved designs stored under key `"systemprep-designs"` in localStorage as `Record<string, { name: string; createdAt: number; state: SandboxState }>`. Users can save multiple designs, name them, and load previous designs.

### Progress Tracking (localStorage)

```typescript
interface UserProgress {
  topicsStudied: Record<string, {
    visited: boolean;
    lastVisited: number;       // timestamp
  }>;
  quizScores: Record<string, {
    correct: number;
    total: number;
    lastAttempt: number;
  }>;
  flashcardStatus: Record<string, "new" | "learning" | "mastered">;
  exercisesCompleted: string[];  // exercise IDs
}
```

Stored under key `"systemprep-progress"` in localStorage.

### localStorage Resilience

```typescript
interface StoredData<T> {
  version: number;    // Schema version for future migrations
  data: T;
}
```

- All localStorage reads wrapped in try/catch — on parse failure, reset to defaults
- Schema version field allows future migrations without data loss
- If localStorage is full (quota exceeded), show a warning toast and continue without persisting

## Categories & Topics

### 1. Networking (~7 topics)
REST API, GraphQL, gRPC, WebSockets, DNS, CDN, HTTP/HTTPS & TLS

### 2. Storage & Databases (~7 topics)
SQL vs NoSQL, ACID properties, Database indexing, Replication, Sharding, LSM Trees, Object storage

### 3. Caching (~5 topics)
Caching strategies (write-through, write-back, write-around), Cache invalidation, Redis/Memcached, CDN caching, Cache eviction policies (LRU, LFU)

### 4. Scaling (~6 topics)
Horizontal vs Vertical scaling, Load balancing (Round Robin, Least Connections, Consistent Hashing), Auto-scaling, Database partitioning, Read replicas, Connection pooling

### 5. Reliability (~6 topics)
CAP theorem, Failover strategies, Circuit breaker pattern, Health checks & monitoring, Redundancy, Disaster recovery

### 6. Messaging (~5 topics)
Message queues, Pub/Sub, Apache Kafka, Event sourcing, CQRS

### 7. Security (~5 topics)
Authentication (OAuth, JWT), Authorization (RBAC), Rate limiting, Encryption (at rest, in transit), API security (keys, CORS)

### 8. Design Patterns (~7 topics)
Microservices vs Monolith, API Gateway, Saga pattern, Bloom filters, Leader election, Consistent hashing, Gossip protocol

**Total: ~48 topics**

## Guided Exercises

Pre-built step-by-step design exercises:

1. Design a URL Shortener
2. Design a Chat Application
3. Design a News Feed
4. Design a Rate Limiter
5. Design a Key-Value Store
6. Design a Notification System
7. Design a File Storage Service
8. Design a Search Autocomplete
9. Design a Video Streaming Platform
10. Design a Ride-Sharing Service

Each exercise has 5-8 steps with design decisions, hints, and explanations.

## File Structure

```
src/
  components/              # Shared UI components
    Navbar.tsx
    Sidebar.tsx
    ProgressBar.tsx
    DifficultyBadge.tsx
    CategoryTag.tsx
  pages/
    Dashboard.tsx
    Topics.tsx
    TopicDetail.tsx
    Quizzes.tsx
    Flashcards.tsx
    Sandbox.tsx
  features/
    quiz/
      QuizEngine.tsx       # Quiz flow: question → answer → explanation → next
      QuestionCard.tsx      # Renders a single question
      ScoreBoard.tsx        # Results summary
    flashcard/
      FlashcardDeck.tsx     # Card flip animation, navigation
      FlashcardCard.tsx     # Single card with flip
      MasteryControls.tsx   # Mark as mastered/learning/new
    sandbox/
      Canvas.tsx            # dnd-kit droppable area with SVG connections
      ComponentPalette.tsx  # Sidebar with draggable components
      SandboxComponent.tsx  # A single component on the canvas
      ConnectionLines.tsx   # SVG arrows between components
      GuidedExercise.tsx    # Step-by-step exercise UI
  data/
    topics/
      networking.ts
      storage.ts
      caching.ts
      scaling.ts
      reliability.ts
      messaging.ts
      security.ts
      patterns.ts
      index.ts             # Re-exports all topics as flat array
    quizzes.ts
    flashcards.ts
    exercises.ts
  hooks/
    useProgress.ts         # Read/write localStorage progress
    useLocalStorage.ts     # Generic localStorage hook
    useQuizEngine.ts       # Quiz state machine
  types/
    index.ts               # All TypeScript interfaces
  utils/
    filters.ts             # Filter by category, difficulty
    scoring.ts             # Calculate quiz scores, progress %
  App.tsx
  main.tsx
```

## Key Behaviors

### Quiz Engine
- Shuffles questions from selected categories/difficulties
- Shows one question at a time
- After answering: highlights correct/incorrect, shows explanation
- Score summary at the end with option to retry wrong answers (creates a sub-session with only missed questions; best score across all attempts is persisted)
- Persists best score per topic to localStorage

### Flashcard Deck
- Flip animation on click (front → back)
- Navigation: previous/next arrows, keyboard support (arrow keys, space to flip)
- Three states per card: new → learning → mastered
- Filter view: show all, only unmastered, only a specific category
- Progress bar showing mastered/total

### Sandbox Canvas
- Left palette: draggable component tiles grouped by type
- Center canvas: drop zone, components snap to grid
- Click a component to select it, drag to reposition
- Draw connections by clicking source → target (SVG arrow rendered)
- Label connections (HTTP, TCP, pub/sub, etc.)
- Clear canvas / save design to localStorage

### Guided Exercises
- Linear step-by-step flow
- Each step: question + multiple options
- Selecting an option reveals explanation (correct or not)
- "Hint" button available per step
- Summary at end showing score and review of decisions

## Styling

- **Dark theme** throughout (backgrounds: #0f0f1a, #1a1a2e; text: #e0e0e0)
- **Tailwind CSS** for utility classes
- **Purple accent** (#7c3aed) as primary color
- **Color-coded categories** (each category gets a distinct color)
- Responsive: works on desktop (primary) and tablet; mobile is secondary

## Testing Strategy

- Component tests with Vitest + React Testing Library for quiz engine, flashcard deck, and progress tracking
- Data validation: ensure all topic IDs referenced in quizzes/flashcards/exercises exist
- Manual testing for drag-and-drop sandbox interactions

## Empty States

All pages handle zero-data gracefully:
- **Dashboard** (first launch): Welcome message with "Start by exploring a topic" CTA
- **Quizzes/Flashcards** (no matching filters): "No items match your filters. Try broadening your selection."
- **Sandbox** (empty canvas): Instructional overlay: "Drag components from the palette to start designing"

## Deployment

Static site export. Deploy to Vercel, Netlify, or GitHub Pages. No server required.
