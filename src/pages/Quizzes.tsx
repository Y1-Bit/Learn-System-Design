import { useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Category, Difficulty } from '../types';
import type { Translations } from '../i18n';
import { useLanguage } from '../i18n';
import { useTranslatedData } from '../hooks/useTranslatedData';
import { useProgress } from '../hooks/useProgress';
import Sidebar from '../components/Sidebar';
import QuizEngine from '../features/quiz/QuizEngine';

/** Map topicId to category based on known topic prefixes / ids */
const TOPIC_CATEGORY: Record<string, Category> = {
  'rest-api': 'networking',
  graphql: 'networking',
  grpc: 'networking',
  websockets: 'networking',
  dns: 'networking',
  cdn: 'networking',
  'sql-vs-nosql': 'storage',
  'acid-properties': 'storage',
  'database-indexing': 'storage',
  replication: 'storage',
  sharding: 'storage',
  'caching-strategies': 'caching',
  'cache-invalidation': 'caching',
  'redis-memcached': 'caching',
  'cache-eviction-policies': 'caching',
  'horizontal-vs-vertical-scaling': 'scaling',
  'load-balancing': 'scaling',
  'auto-scaling': 'scaling',
  'connection-pooling': 'scaling',
  'cap-theorem': 'reliability',
  'failover-strategies': 'reliability',
  'circuit-breaker': 'reliability',
  'health-checks-monitoring': 'reliability',
  'message-queues': 'messaging',
  'pub-sub': 'messaging',
  'apache-kafka': 'messaging',
  cqrs: 'messaging',
  'authentication-oauth-jwt': 'security',
  'authorization-rbac': 'security',
  'rate-limiting': 'security',
  encryption: 'security',
  'microservices-vs-monolith': 'patterns',
  'api-gateway': 'patterns',
  'saga-pattern': 'patterns',
  'bloom-filters': 'patterns',
  'consistent-hashing': 'patterns',
  'gossip-protocol': 'patterns',
};

const DIFF_KEYS: Record<Difficulty, keyof Translations> = {
  1: 'diff_beginner',
  2: 'diff_intermediate',
  3: 'diff_advanced',
};

const DIFFICULTY_OPTIONS: (Difficulty | null)[] = [null, 1, 2, 3];

export default function Quizzes() {
  const { t } = useLanguage();
  const { quizQuestions } = useTranslatedData();
  const [searchParams, setSearchParams] = useSearchParams();
  const { saveQuizScore } = useProgress();

  const initialCategory = (searchParams.get('category') as Category) || null;
  const initialDifficulty = searchParams.get('difficulty')
    ? (Number(searchParams.get('difficulty')) as Difficulty)
    : null;

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(initialCategory);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(
    initialDifficulty,
  );

  const handleCategoryChange = useCallback(
    (cat: Category | null) => {
      setSelectedCategory(cat);
      const params = new URLSearchParams(searchParams);
      if (cat) params.set('category', cat);
      else params.delete('category');
      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  const handleDifficultyChange = useCallback(
    (diff: Difficulty | null) => {
      setSelectedDifficulty(diff);
      const params = new URLSearchParams(searchParams);
      if (diff) params.set('difficulty', String(diff));
      else params.delete('difficulty');
      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  const filtered = useMemo(() => {
    return quizQuestions.filter((q) => {
      if (selectedCategory && TOPIC_CATEGORY[q.topicId] !== selectedCategory) return false;
      if (selectedDifficulty && q.difficulty !== selectedDifficulty) return false;
      return true;
    });
  }, [selectedCategory, selectedDifficulty, quizQuestions]);

  const handleQuizComplete = useCallback(
    (correct: number, total: number) => {
      const key = `quiz-${selectedCategory ?? 'all'}-${selectedDifficulty ?? 'all'}`;
      saveQuizScore(key, correct, total);
    },
    [selectedCategory, selectedDifficulty, saveQuizScore],
  );

  return (
    <div className="flex h-full">
      <Sidebar selected={selectedCategory} onSelect={handleCategoryChange} />

      <main className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-3xl space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-100">{t.quizzes_title}</h1>
            <p className="mt-1 text-sm text-gray-400">
              {t.quizzes_subtitle}
            </p>
          </div>

          {/* Difficulty filter */}
          <div className="flex items-center gap-2">
            {DIFFICULTY_OPTIONS.map((diff) => (
              <button
                key={diff ?? 'all'}
                onClick={() => handleDifficultyChange(diff)}
                className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
                  selectedDifficulty === diff
                    ? 'bg-purple-500/20 text-purple-300'
                    : 'text-gray-400 hover:bg-[#1a1a2e] hover:text-gray-200'
                }`}
              >
                {diff === null ? t.quizzes_all : t[DIFF_KEYS[diff]]}
              </button>
            ))}
            <span className="ml-auto text-xs text-gray-500">
              {filtered.length} {filtered.length !== 1 ? t.quizzes_questions : t.quizzes_question}
            </span>
          </div>

          {/* Quiz or empty state */}
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-[#2a2a4a] bg-[#16162a] p-12 text-center">
              <p className="text-gray-400">{t.quizzes_no_match}</p>
            </div>
          ) : (
            <QuizEngine
              key={`${selectedCategory}-${selectedDifficulty}`}
              questions={filtered}
              onComplete={handleQuizComplete}
            />
          )}
        </div>
      </main>
    </div>
  );
}
