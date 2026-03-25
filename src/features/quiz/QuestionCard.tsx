import { useState } from 'react';
import type { QuizQuestion } from '../../types';

interface QuestionCardProps {
  question: QuizQuestion;
  onAnswer: (id: string, answer: string | boolean | string[]) => void;
  answered: boolean;
  userAnswer: string | boolean | string[] | undefined;
  onNext: () => void;
}

function MultipleChoiceCard({
  question,
  onAnswer,
  answered,
  userAnswer,
  onNext,
}: QuestionCardProps & { question: Extract<QuizQuestion, { type: 'multiple-choice' }> }) {
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
            Explanation
          </p>
          <p className="text-sm text-gray-300">{question.explanation}</p>
        </div>
      )}

      {answered && (
        <button
          onClick={onNext}
          className="rounded-lg bg-purple-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-500"
        >
          Next
        </button>
      )}
    </div>
  );
}

function TrueFalseCard({
  question,
  onAnswer,
  answered,
  userAnswer,
  onNext,
}: QuestionCardProps & { question: Extract<QuizQuestion, { type: 'true-false' }> }) {
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
            {val ? 'True' : 'False'}
          </button>
        ))}
      </div>

      {answered && (
        <div className="rounded-lg border border-[#2a2a4a] bg-[#16162a] p-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Explanation
          </p>
          <p className="text-sm text-gray-300">{question.explanation}</p>
        </div>
      )}

      {answered && (
        <button
          onClick={onNext}
          className="rounded-lg bg-purple-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-500"
        >
          Next
        </button>
      )}
    </div>
  );
}

function MatchingCard({
  question,
  onAnswer,
  answered,
  userAnswer,
  onNext,
}: QuestionCardProps & { question: Extract<QuizQuestion, { type: 'matching' }> }) {
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
                      (correct: {correctOrder[idx]})
                    </span>
                  )}
                </span>
              ) : (
                <select
                  value={selections[idx]}
                  onChange={(e) => handleSelect(idx, e.target.value)}
                  className="flex-1 rounded-lg border border-[#2a2a4a] bg-[#1a1a2e] px-3 py-2 text-sm text-gray-200 outline-none focus:border-purple-500"
                >
                  <option value="">Select a match...</option>
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
          Submit Matches
        </button>
      )}

      {answered && (
        <div className="rounded-lg border border-[#2a2a4a] bg-[#16162a] p-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Explanation
          </p>
          <p className="text-sm text-gray-300">{question.explanation}</p>
        </div>
      )}

      {answered && (
        <button
          onClick={onNext}
          className="rounded-lg bg-purple-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-500"
        >
          Next
        </button>
      )}
    </div>
  );
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
