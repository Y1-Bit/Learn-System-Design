import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import type { Exercise } from '../../types';
import { useLanguage } from '../../i18n';
import ProgressBar from '../../components/ProgressBar';

interface GuidedExerciseProps {
  exercise: Exercise;
  onComplete: () => void;
}

interface StepAnswer {
  selectedIndex: number;
  correct: boolean;
}

export default function GuidedExercise({ exercise, onComplete }: GuidedExerciseProps) {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, StepAnswer>>({});
  const [showHint, setShowHint] = useState<Record<number, boolean>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});
  const [completed, setCompleted] = useState(false);

  const steps = exercise.steps;
  const totalSteps = steps.length;
  const step = steps[currentStep];

  const handleSelectOption = useCallback(
    (optionIndex: number) => {
      if (answers[currentStep] !== undefined) return;

      const option = step.options[optionIndex];
      setAnswers((prev) => ({
        ...prev,
        [currentStep]: { selectedIndex: optionIndex, correct: option.correct },
      }));
      setShowExplanation((prev) => ({ ...prev, [currentStep]: true }));
    },
    [currentStep, answers, step],
  );

  const handleNextStep = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setCompleted(true);
      onComplete();
    }
  }, [currentStep, totalSteps, onComplete]);

  const toggleHint = useCallback(() => {
    setShowHint((prev) => ({ ...prev, [currentStep]: !prev[currentStep] }));
  }, [currentStep]);

  const correctCount = Object.values(answers).filter((a) => a.correct).length;

  if (completed) {
    return (
      <div className="mx-auto max-w-3xl space-y-8">
        {/* Summary header */}
        <div className="rounded-xl border border-[#2a2a4a] bg-[#1a1a2e] p-8 text-center">
          <h2 className="mb-2 text-2xl font-bold text-gray-100">{t.exercise_complete}</h2>
          <p className="text-4xl font-bold text-purple-400">
            {correctCount} / {totalSteps}
          </p>
          <p className="mt-1 text-sm text-gray-400">{t.exercise_correct_answers}</p>
          <ProgressBar value={(correctCount / totalSteps) * 100} color="#a855f7" />
        </div>

        {/* Review of all steps */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-200">{t.exercise_review}</h3>
          {steps.map((s, idx) => {
            const answer = answers[idx];
            const selectedOption = answer ? s.options[answer.selectedIndex] : null;
            return (
              <div key={idx} className="rounded-lg border border-[#2a2a4a] bg-[#1a1a2e] p-5">
                <p className="mb-2 text-sm font-medium text-gray-400">{t.exercise_step} {idx + 1}</p>
                <p className="mb-3 text-gray-200">{s.prompt}</p>
                {selectedOption && (
                  <div
                    className={`rounded-md border p-3 ${
                      answer.correct
                        ? 'border-green-500/50 bg-green-500/10'
                        : 'border-red-500/50 bg-red-500/10'
                    }`}
                  >
                    <p className="text-sm text-gray-300">
                      <span className="font-medium text-gray-100">{t.exercise_your_answer}</span>{' '}
                      {selectedOption.label}
                    </p>
                    <p className="mt-1 text-sm text-gray-400">{selectedOption.explanation}</p>
                    {!answer.correct && (
                      <p className="mt-2 text-sm text-green-400">
                        {t.exercise_correct_answer}{' '}
                        {s.options.find((o) => o.correct)?.label}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            to="/sandbox"
            className="inline-block rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition-colors hover:bg-purple-500"
          >
            {t.exercise_back}
          </Link>
        </div>
      </div>
    );
  }

  const currentAnswer = answers[currentStep];
  const progressPercent = ((currentStep + (currentAnswer ? 1 : 0)) / totalSteps) * 100;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Progress header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>
            {t.exercise_step} {currentStep + 1} {t.exercise_step_of} {totalSteps}
          </span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <ProgressBar value={progressPercent} color="#a855f7" />
      </div>

      {/* Prompt */}
      <div className="rounded-xl border border-[#2a2a4a] bg-[#1a1a2e] p-6">
        <p className="text-lg text-gray-100">{step.prompt}</p>
      </div>

      {/* Options */}
      <div className="grid gap-3">
        {step.options.map((option, idx) => {
          let borderClass = 'border-transparent hover:border-purple-500/50';
          if (currentAnswer !== undefined) {
            if (idx === currentAnswer.selectedIndex) {
              borderClass = option.correct ? 'border-green-500' : 'border-red-500';
            } else if (option.correct) {
              borderClass = 'border-green-500/40';
            } else {
              borderClass = 'border-transparent opacity-50';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              disabled={currentAnswer !== undefined}
              className={`w-full rounded-lg border-2 bg-[#1a1a2e] p-4 text-left text-gray-200 transition-all ${borderClass} ${
                currentAnswer === undefined
                  ? 'cursor-pointer hover:bg-[#22224a]'
                  : 'cursor-default'
              }`}
            >
              <span className="font-medium">{option.label}</span>
            </button>
          );
        })}
      </div>

      {/* Hint button */}
      {step.hint && (
        <div>
          <button
            onClick={toggleHint}
            className="text-sm font-medium text-purple-400 transition-colors hover:text-purple-300"
          >
            {showHint[currentStep] ? t.exercise_hide_hint : t.exercise_show_hint}
          </button>
          {showHint[currentStep] && (
            <div className="mt-2 rounded-lg bg-purple-500/10 p-4 text-sm text-purple-200">
              {step.hint}
            </div>
          )}
        </div>
      )}

      {/* Explanation after selection */}
      {showExplanation[currentStep] && currentAnswer !== undefined && (
        <div
          className={`rounded-lg p-4 text-sm ${
            currentAnswer.correct
              ? 'bg-green-500/10 text-green-200'
              : 'bg-red-500/10 text-red-200'
          }`}
        >
          <p className="mb-1 font-medium">
            {currentAnswer.correct ? t.exercise_correct : t.exercise_incorrect}
          </p>
          <p>{step.options[currentAnswer.selectedIndex].explanation}</p>
        </div>
      )}

      {/* Next Step button */}
      {currentAnswer !== undefined && (
        <div className="flex justify-end">
          <button
            onClick={handleNextStep}
            className="rounded-lg bg-purple-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-purple-500"
          >
            {currentStep < totalSteps - 1 ? t.exercise_next_step : t.exercise_see_results}
          </button>
        </div>
      )}
    </div>
  );
}
