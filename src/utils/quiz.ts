import type { QuizQuestion } from '../types';

export function isAnswerCorrect(
  question: QuizQuestion,
  answer: string | boolean | string[] | undefined,
): boolean {
  if (answer === undefined) return false;
  if (question.type === 'multiple-choice') return answer === question.correctAnswer;
  if (question.type === 'true-false') return answer === question.correctAnswer;
  if (question.type === 'matching' && Array.isArray(answer)) {
    const correctOrder = question.pairs.map((p) => p.right);
    return JSON.stringify(answer) === JSON.stringify(correctOrder);
  }
  return false;
}
