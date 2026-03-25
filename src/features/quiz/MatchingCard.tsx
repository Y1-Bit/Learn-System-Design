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
