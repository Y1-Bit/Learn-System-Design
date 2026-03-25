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
