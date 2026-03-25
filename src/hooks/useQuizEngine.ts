import { useState, useCallback } from 'react';
import type { QuizQuestion } from '../types';
import { isAnswerCorrect } from '../utils/quiz';

type QuizState = 'idle' | 'active' | 'answered' | 'complete';

export function useQuizEngine(questions: QuizQuestion[]) {
  const [state, setState] = useState<QuizState>('idle');
  const [shuffled, setShuffled] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | boolean | string[]>>({});
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const start = useCallback(() => {
    const s = [...questions].sort(() => Math.random() - 0.5);
    setShuffled(s);
    setCurrentIndex(0);
    setAnswers({});
    setScore({ correct: 0, total: 0 });
    setState('active');
  }, [questions]);

  const answer = useCallback((questionId: string, userAnswer: string | boolean | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: userAnswer }));
    setState('answered');
  }, []);

  const next = useCallback(() => {
    if (currentIndex + 1 >= shuffled.length) {
      let correct = 0;
      shuffled.forEach((q) => {
        if (isAnswerCorrect(q, answers[q.id])) correct++;
      });
      setScore({ correct, total: shuffled.length });
      setState('complete');
    } else {
      setCurrentIndex((i) => i + 1);
      setState('active');
    }
  }, [currentIndex, shuffled, answers]);

  const retryWrong = useCallback(() => {
    const wrong = shuffled.filter((q) => !isAnswerCorrect(q, answers[q.id]));
    if (wrong.length === 0) return;
    setShuffled(wrong);
    setCurrentIndex(0);
    setAnswers({});
    setState('active');
  }, [shuffled, answers]);

  const reset = useCallback(() => {
    setState('idle');
    setShuffled([]);
    setCurrentIndex(0);
    setAnswers({});
    setScore({ correct: 0, total: 0 });
  }, []);

  return {
    state,
    currentQuestion: shuffled[currentIndex] ?? null,
    currentIndex,
    totalQuestions: shuffled.length,
    shuffled,
    answers,
    score,
    start,
    answer,
    next,
    retryWrong,
    reset,
  };
}
