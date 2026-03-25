import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { useTranslatedData } from '../hooks/useTranslatedData';
import { useLanguage } from '../i18n';
import { CATEGORY_COLORS, CAT_KEYS } from '../constants';
import type { Category } from '../types';
import ProgressBar from '../components/ProgressBar';

const TOTAL_EXERCISES = 10;

export default function Dashboard() {
  const { t } = useLanguage();
  const { allTopics, quizQuestions, flashcards } = useTranslatedData();
  const { progress } = useProgress();

  const TOTAL_TOPICS = allTopics.length;
  const TOTAL_FLASHCARDS = flashcards.length;

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
  }, [progress.topicsStudied, allTopics]);

  const hasAnyProgress =
    topicsStudiedCount > 0 ||
    Object.keys(progress.quizScores).length > 0 ||
    cardsMastered > 0 ||
    exercisesDone > 0;

  const stats = [
    {
      label: t.dashboard_topics_studied,
      value: `${topicsStudiedCount}/${TOTAL_TOPICS}`,
      color: '#7c3aed',
    },
    {
      label: t.dashboard_quiz_score,
      value: quizAverage !== null ? `${quizAverage}%` : '\u2014',
      color: '#10b981',
    },
    {
      label: t.dashboard_cards_mastered,
      value: `${cardsMastered}/${TOTAL_FLASHCARDS}`,
      color: '#f59e0b',
    },
    {
      label: t.dashboard_exercises_done,
      value: `${exercisesDone}/${TOTAL_EXERCISES}`,
      color: '#3b82f6',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f1a] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-200">{t.dashboard_title}</h1>

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
              {t.dashboard_continue_studying}
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
                      {t[CAT_KEYS[topic.category as Category]] ??
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
              {t.dashboard_welcome}
            </h2>
            <p className="mb-6 text-gray-500">
              {t.dashboard_welcome_text}
            </p>
            <Link
              to="/topics"
              className="inline-block rounded-lg bg-[#7c3aed] px-6 py-3 font-medium text-white transition-colors hover:bg-[#6d28d9]"
            >
              {t.dashboard_browse_topics}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
