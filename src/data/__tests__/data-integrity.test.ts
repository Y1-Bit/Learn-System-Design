import { describe, test, expect } from 'vitest';
import { allTopics } from '../topics';
import { quizQuestions } from '../quizzes';
import { flashcards } from '../flashcards';
import { exercises } from '../exercises';

describe('Data integrity', () => {
  const topicIds = new Set(allTopics.map((t) => t.id));

  test('all quiz topicIds reference existing topics', () => {
    quizQuestions.forEach((q) => {
      expect(topicIds.has(q.topicId), `Quiz ${q.id} references non-existent topic ${q.topicId}`).toBe(true);
    });
  });

  test('all flashcard topicIds reference existing topics', () => {
    flashcards.forEach((f) => {
      expect(topicIds.has(f.topicId), `Flashcard ${f.id} references non-existent topic ${f.topicId}`).toBe(true);
    });
  });

  test('all relatedTopics reference existing topics', () => {
    allTopics.forEach((t) => {
      t.relatedTopics.forEach((rt) => {
        expect(topicIds.has(rt), `Topic ${t.id} has non-existent relatedTopic ${rt}`).toBe(true);
      });
    });
  });

  test('no duplicate topic IDs', () => {
    const ids = allTopics.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('no duplicate quiz question IDs', () => {
    const ids = quizQuestions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('no duplicate flashcard IDs', () => {
    const ids = flashcards.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('all exercises have at least one correct option per step', () => {
    exercises.forEach((ex) => {
      ex.steps.forEach((step, i) => {
        const hasCorrect = step.options.some((o) => o.correct);
        expect(hasCorrect, `Exercise ${ex.id} step ${i} has no correct option`).toBe(true);
      });
    });
  });

  test('expected topic count', () => {
    expect(allTopics.length).toBe(48);
  });
});
