import { useEffect } from 'react';
import type { QuizQuestion } from '../../types';
import { useQuizEngine } from '../../hooks/useQuizEngine';
import { useLanguage } from '../../i18n';
import QuestionCard from './QuestionCard';
import ScoreBoard from './ScoreBoard';

interface QuizEngineProps {
  questions: QuizQuestion[];
  onComplete?: (correct: number, total: number) => void;
}

export default function QuizEngine({ questions, onComplete }: QuizEngineProps) {
  const { t } = useLanguage();
  const engine = useQuizEngine(questions);

  useEffect(() => {
    if (engine.state === 'complete' && onComplete) {
      onComplete(engine.score.correct, engine.score.total);
    }
  }, [engine.state, engine.score, onComplete]);

  if (engine.state === 'idle') {
    return (
      <div className="flex flex-col items-center gap-6 rounded-xl border border-[#2a2a4a] bg-[#16162a] p-12 text-center">
        <div className="text-4xl">&#x1F4DD;</div>
        <div>
          <h2 className="text-xl font-bold text-gray-100">{t.quiz_ready}</h2>
          <p className="mt-2 text-sm text-gray-400">
            {questions.length} {questions.length !== 1 ? t.quizzes_questions : t.quizzes_question} {t.quiz_question_count}
          </p>
        </div>
        <button
          onClick={engine.start}
          className="rounded-lg bg-purple-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-500"
        >
          {t.quiz_start}
        </button>
      </div>
    );
  }

  if (engine.state === 'complete') {
    return (
      <ScoreBoard
        score={engine.score}
        questions={engine.shuffled ?? []}
        answers={engine.answers}
        onRetryWrong={engine.retryWrong}
        onReset={engine.reset}
      />
    );
  }

  // active or answered
  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>
            {t.quizzes_question} {engine.currentIndex + 1} {t.quiz_question_of} {engine.totalQuestions}
          </span>
          <span>
            {Math.round(((engine.currentIndex + 1) / engine.totalQuestions) * 100)}%
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-[#2a2a4a]">
          <div
            className="h-full rounded-full bg-purple-500 transition-all duration-300"
            style={{
              width: `${((engine.currentIndex + 1) / engine.totalQuestions) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Question card */}
      {engine.currentQuestion && (
        <QuestionCard
          key={engine.currentQuestion.id}
          question={engine.currentQuestion}
          onAnswer={engine.answer}
          answered={engine.state === 'answered'}
          userAnswer={engine.answers[engine.currentQuestion.id]}
          onNext={engine.next}
        />
      )}
    </div>
  );
}
