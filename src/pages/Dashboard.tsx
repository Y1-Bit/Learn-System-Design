import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { allTopics } from '../data/topics/index';
import { quizQuestions } from '../data/quizzes';
import { flashcards } from '../data/flashcards';
import { CATEGORY_COLORS, CATEGORY_LABELS } from '../types';
import type { Category } from '../types';
import ProgressBar from '../components/ProgressBar';

const TOTAL_TOPICS = allTopics.length;
const TOTAL_FLASHCARDS = flashcards.length;
const TOTAL_EXERCISES = 10;

export default function Dashboard() {
  const { progress } = useProgress();

  const topicsStudiedCount = useMemo(
    () => Object.values(progress.topicsStudied).filter((t) => t.visited).length,
    [progress.topicsStudied],
  );

  const quizAverage = useMemo(() => {
    const entries = Object.values(progress.quizScores);
    if (entries.length === 0) return null;
    const sum = entries.reduce((acc, e) => acc + (e.correct / e.total) * 100, 0);
    return Math.round(sum / entries.length);
  }, [progress.quizScores]);

  const cardsMastered = useMemo(
    () => Object.values(progress.flashcardStatus).filter((s) => s === 'mastered').length,
    [progress.flashcardStatus],
  );

  const exercisesDone = progress.exercisesCompleted.length;

  const recentTopics = useMemo(() => {
    const visited = Object.entries(progress.topicsStudied)
      .filter(([, v]) => v.visited && v.lastVisited)
      .sort(([, a], [, b]) => b.lastVisited - a.lastVisited)
      .slice(0, 3)
      .map(([id]) => id);

    return visited
      .map((id) => allTopics.find((t) => t.id === id))
      .filter(Boolean) as typeof allTopics;
  }, [progress.topicsStudied]);

  const hasAnyProgress =
    topicsStudiedCount > 0 ||
    Object.keys(progress.quizScores).length > 0 ||
    cardsMastered > 0 ||
    exercisesDone > 0;

  const stats = [
    {
      label: 'Topics Studied',
      value: `${topicsStudiedCount}/${TOTAL_TOPICS}`,
      color: '#7c3aed',
    },
    {
      label: 'Quiz Score',
      value: quizAverage !== null ? `${quizAverage}%` : '\u2014',
      color: '#10b981',
    },
    {
      label: 'Cards Mastered',
      value: `${cardsMastered}/${TOTAL_FLASHCARDS}`,
      color: '#f59e0b',
    },
    {
      label: 'Exercises Done',
      value: `${exercisesDone}/${TOTAL_EXERCISES}`,
      color: '#3b82f6',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f1a] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-200">Dashboard</h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-[#2a2a4a] bg-[#1a1a2e] p-4"
            >
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-3xl font-bold" style={{ color: stat.color }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Continue Studying */}
        {recentTopics.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-4 text-xl font-semibold text-gray-200">
              Continue Studying
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recentTopics.map((topic) => {
                const topicProgress = progress.topicsStudied[topic.id];
                const topicQuizzes = quizQuestions.filter(
                  (q) => q.topicId === topic.id,
                );
                const totalQs = topicQuizzes.length;
                const score = progress.quizScores[topic.id];
                const pct =
                  score && totalQs > 0
                    ? Math.round((score.correct / score.total) * 100)
                    : topicProgress?.visited
                      ? 10
                      : 0;

                return (
                  <Link
                    key={topic.id}
                    to={`/topics/${topic.id}`}
                    className="block rounded-lg border border-[#2a2a4a] bg-[#1a1a2e] p-4 transition-colors hover:border-[#3a3a5a]"
                  >
                    <h3
                      className="text-lg font-semibold"
                      style={{
                        color:
                          CATEGORY_COLORS[topic.category as Category] ??
                          '#a78bfa',
                      }}
                    >
                      {topic.title}
                    </h3>
                    <p className="mb-3 text-sm text-gray-500">
                      {CATEGORY_LABELS[topic.category as Category] ??
                        topic.category}
                    </p>
                    <ProgressBar
                      value={pct}
                      color={
                        CATEGORY_COLORS[topic.category as Category] ?? '#a78bfa'
                      }
                    />
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Empty State */}
        {!hasAnyProgress && (
          <div className="mt-16 text-center">
            <h2 className="mb-3 text-2xl font-bold text-gray-200">
              Welcome to SystemPrep!
            </h2>
            <p className="mb-6 text-gray-500">
              Start by exploring a topic to begin your system design interview
              prep.
            </p>
            <Link
              to="/topics"
              className="inline-block rounded-lg bg-[#7c3aed] px-6 py-3 font-medium text-white transition-colors hover:bg-[#6d28d9]"
            >
              Browse Topics
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
