import type { QuizQuestion } from '../../types';
import { useLanguage } from '../../i18n';

interface ScoreBoardProps {
  score: { correct: number; total: number };
  questions: QuizQuestion[];
  answers: Record<string, string | boolean | string[]>;
  onRetryWrong: () => void;
  onReset: () => void;
}

export default function ScoreBoard({
  score,
  questions,
  answers,
  onRetryWrong,
  onReset,
}: ScoreBoardProps) {
  const { t } = useLanguage();
  const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
  const passed = pct >= 70;
  const hasWrong = score.correct < score.total;

  const isCorrect = (q: QuizQuestion): boolean => {
    const a = answers[q.id];
    if (q.type === 'multiple-choice') return a === q.correctAnswer;
    if (q.type === 'true-false') return a === q.correctAnswer;
    if (q.type === 'matching' && Array.isArray(a)) {
      const correctOrder = q.pairs.map((p) => p.right);
      return JSON.stringify(a) === JSON.stringify(correctOrder);
    }
    return false;
  };

  return (
    <div className="space-y-6">
      {/* Score header */}
      <div className="rounded-xl border border-[#2a2a4a] bg-[#16162a] p-8 text-center">
        <div className="mb-2 text-5xl font-bold">
          <span className={passed ? 'text-green-400' : 'text-red-400'}>{pct}%</span>
        </div>
        <p className="text-lg text-gray-300">
          {score.correct} / {score.total} {t.score_correct}
        </p>
        <p className={`mt-2 text-sm font-medium ${passed ? 'text-green-400' : 'text-red-400'}`}>
          {passed ? t.score_passed : t.score_failed}
        </p>
      </div>

      {/* Question results */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
          {t.score_results}
        </h3>
        {questions.map((q, i) => {
          const correct = isCorrect(q);
          return (
            <div
              key={q.id}
              className="flex items-start gap-3 rounded-lg border border-[#2a2a4a] bg-[#1a1a2e] px-4 py-3"
            >
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  correct ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}
              >
                {correct ? '\u2713' : '\u2717'}
              </span>
              <div className="min-w-0">
                <p className="text-sm text-gray-200">
                  {i + 1}. {q.question}
                </p>
                {!correct && (
                  <p className="mt-1 text-xs text-gray-500">{q.explanation}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        {hasWrong && (
          <button
            onClick={onRetryWrong}
            className="rounded-lg border border-purple-500/30 bg-purple-500/10 px-6 py-2.5 text-sm font-medium text-purple-300 transition-colors hover:bg-purple-500/20"
          >
            {t.score_retry}
          </button>
        )}
        <button
          onClick={onReset}
          className="rounded-lg border border-[#2a2a4a] bg-[#1a1a2e] px-6 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-[#2a2a4a]"
        >
          {t.score_back}
        </button>
      </div>
    </div>
  );
}
