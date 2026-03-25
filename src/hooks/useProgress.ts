import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { UserProgress } from '../types';

const DEFAULT_PROGRESS: UserProgress = {
  topicsStudied: {},
  quizScores: {},
  flashcardStatus: {},
  exercisesCompleted: [],
};

export function useProgress() {
  const [progress, setProgress] = useLocalStorage<UserProgress>(
    'systemprep-progress',
    DEFAULT_PROGRESS,
  );

  const markTopicVisited = useCallback((topicId: string) => {
    setProgress((prev) => ({
      ...prev,
      topicsStudied: {
        ...prev.topicsStudied,
        [topicId]: { visited: true, lastVisited: Date.now() },
      },
    }));
  }, [setProgress]);

  const saveQuizScore = useCallback((quizId: string, correct: number, total: number) => {
    setProgress((prev) => {
      const existing = prev.quizScores[quizId];
      const existingPct = existing ? existing.correct / existing.total : 0;
      const newPct = total > 0 ? correct / total : 0;
      if (existing && existingPct >= newPct) {
        return {
          ...prev,
          quizScores: {
            ...prev.quizScores,
            [quizId]: { ...existing, lastAttempt: Date.now() },
          },
        };
      }
      return {
        ...prev,
        quizScores: {
          ...prev.quizScores,
          [quizId]: { correct, total, lastAttempt: Date.now() },
        },
      };
    });
  }, [setProgress]);

  const setFlashcardStatus = useCallback(
    (cardId: string, status: 'new' | 'learning' | 'mastered') => {
      setProgress((prev) => ({
        ...prev,
        flashcardStatus: {
          ...prev.flashcardStatus,
          [cardId]: status,
        },
      }));
    },
    [setProgress],
  );

  const markExerciseCompleted = useCallback((exerciseId: string) => {
    setProgress((prev) => {
      if (prev.exercisesCompleted.includes(exerciseId)) return prev;
      return {
        ...prev,
        exercisesCompleted: [...prev.exercisesCompleted, exerciseId],
      };
    });
  }, [setProgress]);

  return {
    progress,
    markTopicVisited,
    saveQuizScore,
    setFlashcardStatus,
    markExerciseCompleted,
  } as const;
}

