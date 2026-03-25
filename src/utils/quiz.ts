import type { QuizQuestion } from '../types';

export function isAnswerCorrect(
  question: QuizQuestion,
  answer: string | boolean | string[] | undefined,
): boolean {
  if (answer === undefined) return false;

  switch (question.type) {
    case 'multiple-choice':
      return answer === question.correctAnswer;
    case 'true-false':
      return answer === question.correctAnswer;
    case 'matching': {
      if (!Array.isArray(answer)) return false;
      const correctOrder = question.pairs.map((p) => p.right);
      return JSON.stringify(answer) === JSON.stringify(correctOrder);
    }
    default: {
      const _exhaustive: never = question;
      void _exhaustive;
      return false;
    }
  }
}
