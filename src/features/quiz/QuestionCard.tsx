import type { QuizQuestion } from '../../types';
import MultipleChoiceCard from './MultipleChoiceCard';
import TrueFalseCard from './TrueFalseCard';
import MatchingCard from './MatchingCard';

interface QuestionCardProps {
  question: QuizQuestion;
  onAnswer: (id: string, answer: string | boolean | string[]) => void;
  answered: boolean;
  userAnswer: string | boolean | string[] | undefined;
  onNext: () => void;
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

  const _exhaustive: never = question;
  void _exhaustive;
  return null;
}
