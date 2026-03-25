import { useMemo } from 'react';
import { useLanguage } from '../i18n';
import { allTopics as enTopics, topicById as enTopicById, topicsByCategory as enTopicsByCategory } from '../data/topics';
import { allTopics as ruTopics, topicById as ruTopicById, topicsByCategory as ruTopicsByCategory } from '../data/ru/topics';
import { quizQuestions as enQuizzes } from '../data/quizzes';
import { quizQuestions as ruQuizzes } from '../data/ru/quizzes';
import { flashcards as enFlashcards } from '../data/flashcards';
import { flashcards as ruFlashcards } from '../data/ru/flashcards';
import { exercises as enExercises } from '../data/exercises';
import { exercises as ruExercises } from '../data/ru/exercises';
import { sandboxComponentDefs as enSandboxDefs } from '../data/sandbox-components';
import { sandboxComponentDefs as ruSandboxDefs } from '../data/ru/sandbox-components';

export function useTranslatedData() {
  const { language } = useLanguage();

  return useMemo(() => {
    const isRu = language === 'ru';
    return {
      allTopics: isRu ? ruTopics : enTopics,
      topicById: isRu ? ruTopicById : enTopicById,
      topicsByCategory: isRu ? ruTopicsByCategory : enTopicsByCategory,
      quizQuestions: isRu ? ruQuizzes : enQuizzes,
      flashcards: isRu ? ruFlashcards : enFlashcards,
      exercises: isRu ? ruExercises : enExercises,
      sandboxComponentDefs: isRu ? ruSandboxDefs : enSandboxDefs,
    };
  }, [language]);
}
