import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { FlashcardDeck } from '../features/flashcard';
import { useTranslatedData } from '../hooks/useTranslatedData';
import { useLanguage } from '../i18n';
import { useProgress } from '../hooks/useProgress';
import type { Category } from '../types';

export default function Flashcards() {
  const { t } = useLanguage();
  const { flashcards, allTopics } = useTranslatedData();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') as Category | null;
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(initialCategory);
  const { progress, setFlashcardStatus } = useProgress();

  // Build a topicId -> category lookup
  const topicCategoryMap = useMemo(() => {
    const map: Record<string, Category> = {};
    for (const t of allTopics) {
      map[t.id] = t.category;
    }
    return map;
  }, [allTopics]);

  // Filter flashcards by selected category
  const filteredCards = useMemo(() => {
    if (!selectedCategory) return flashcards;
    return flashcards.filter((fc) => topicCategoryMap[fc.topicId] === selectedCategory);
  }, [selectedCategory, topicCategoryMap, flashcards]);

  const handleCategorySelect = (cat: Category | null) => {
    setSelectedCategory(cat);
    if (cat) {
      setSearchParams({ category: cat });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="flex h-full">
      <Sidebar selected={selectedCategory} onSelect={handleCategorySelect} />

      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="mb-6 text-2xl font-bold text-gray-100">{t.flashcards_title}</h1>

        {filteredCards.length === 0 ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-[#2a2a4a] bg-[#1a1a2e] p-8">
            <p className="text-center text-gray-400">
              {t.flashcards_no_match}
            </p>
          </div>
        ) : (
          <FlashcardDeck
            cards={filteredCards}
            statuses={progress.flashcardStatus}
            onStatusChange={setFlashcardStatus}
          />
        )}
      </main>
    </div>
  );
}
