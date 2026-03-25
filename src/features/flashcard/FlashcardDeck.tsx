import { useState, useEffect, useCallback } from 'react';
import FlashcardCard from './FlashcardCard';
import MasteryControls from './MasteryControls';
import ProgressBar from '../../components/ProgressBar';
import DifficultyBadge from '../../components/DifficultyBadge';
import { useLanguage } from '../../i18n';
import type { Flashcard, Difficulty } from '../../types';

type MasteryStatus = 'new' | 'learning' | 'mastered';

interface FlashcardDeckProps {
  cards: Flashcard[];
  statuses: Record<string, MasteryStatus>;
  onStatusChange: (cardId: string, status: MasteryStatus) => void;
}

export default function FlashcardDeck({ cards, statuses, onStatusChange }: FlashcardDeckProps) {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all');
  const [masteryFilter, setMasteryFilter] = useState<'all' | 'unmastered'>('all');

  // Apply filters
  const filtered = cards.filter((c) => {
    if (difficulty !== 'all' && c.difficulty !== difficulty) return false;
    if (masteryFilter === 'unmastered' && statuses[c.id] === 'mastered') return false;
    return true;
  });

  // Clamp index when filters change
  useEffect(() => {
    setIndex((prev) => (filtered.length === 0 ? 0 : Math.min(prev, filtered.length - 1)));
    setFlipped(false);
  }, [filtered.length]);

  const current = filtered[index] as Flashcard | undefined;

  const goPrev = useCallback(() => {
    if (filtered.length === 0) return;
    setFlipped(false);
    setIndex((prev) => (prev <= 0 ? filtered.length - 1 : prev - 1));
  }, [filtered.length]);

  const goNext = useCallback(() => {
    if (filtered.length === 0) return;
    setFlipped(false);
    setIndex((prev) => (prev >= filtered.length - 1 ? 0 : prev + 1));
  }, [filtered.length]);

  const toggleFlip = useCallback(() => setFlipped((f) => !f), []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
      else if (e.key === ' ') {
        e.preventDefault();
        toggleFlip();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goPrev, goNext, toggleFlip]);

  return (
    <div className="flex flex-col gap-6">
      {/* Filter controls */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-400">{t.fc_difficulty}</label>
          <select
            value={difficulty}
            onChange={(e) => {
              setDifficulty(e.target.value === 'all' ? 'all' : (Number(e.target.value) as Difficulty));
              setIndex(0);
              setFlipped(false);
            }}
            className="rounded-lg border border-[#2a2a4a] bg-[#1a1a2e] px-3 py-1.5 text-sm text-gray-200 outline-none focus:border-purple-500"
          >
            <option value="all">{t.fc_all}</option>
            <option value="1">{t.fc_beginner}</option>
            <option value="2">{t.fc_intermediate}</option>
            <option value="3">{t.fc_advanced}</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-400">{t.fc_show}</label>
          <select
            value={masteryFilter}
            onChange={(e) => {
              setMasteryFilter(e.target.value as 'all' | 'unmastered');
              setIndex(0);
              setFlipped(false);
            }}
            className="rounded-lg border border-[#2a2a4a] bg-[#1a1a2e] px-3 py-1.5 text-sm text-gray-200 outline-none focus:border-purple-500"
          >
            <option value="all">{t.fc_all_cards}</option>
            <option value="unmastered">{t.fc_unmastered}</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-[#2a2a4a] bg-[#1a1a2e] p-8">
          <p className="text-center text-gray-400">
            {t.flashcards_no_match}
          </p>
        </div>
      ) : (
        <>
          {/* Progress indicator */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">
              {index + 1} {t.fc_card_of} {filtered.length}
            </span>
            {current && <DifficultyBadge difficulty={current.difficulty} />}
          </div>

          <ProgressBar value={((index + 1) / filtered.length) * 100} />

          {/* Card with navigation arrows */}
          <div className="flex items-center gap-4">
            <button
              onClick={goPrev}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#2a2a4a] bg-[#1a1a2e] text-gray-400 transition-colors hover:border-purple-500 hover:text-purple-300"
              aria-label={t.fc_prev}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>

            <div className="flex-1">
              <FlashcardCard
                front={current!.front}
                back={current!.back}
                flipped={flipped}
                onFlip={toggleFlip}
              />
            </div>

            <button
              onClick={goNext}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#2a2a4a] bg-[#1a1a2e] text-gray-400 transition-colors hover:border-purple-500 hover:text-purple-300"
              aria-label={t.fc_next}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Mastery controls */}
          <MasteryControls
            status={statuses[current!.id] ?? 'new'}
            onChange={(status) => onStatusChange(current!.id, status)}
          />

          <p className="text-center text-xs text-gray-600">
            {t.fc_keyboard_hint}
          </p>
        </>
      )}
    </div>
  );
}
