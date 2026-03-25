import { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import CategoryTag from '../components/CategoryTag';
import DifficultyBadge from '../components/DifficultyBadge';
import { allTopics, topicsByCategory } from '../data/topics';
import type { Category, Topic } from '../types';

function TopicCard({ topic }: { topic: Topic }) {
  return (
    <Link
      to={`/topics/${topic.id}`}
      className="block rounded-lg border border-[#2a2a4a] bg-[#1a1a2e] p-5 transition-colors hover:border-purple-500/50 hover:bg-[#1f1f3a]"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <CategoryTag category={topic.category} />
        <DifficultyBadge difficulty={topic.difficulty} />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-gray-100">{topic.title}</h3>
      <p className="text-sm leading-relaxed text-gray-400">{topic.summary}</p>
    </Link>
  );
}

export default function Topics() {
  const [category, setCategory] = useState<Category | null>(null);

  const filteredTopics = category ? topicsByCategory(category) : allTopics;

  return (
    <div className="flex">
      <Sidebar selected={category} onSelect={setCategory} />
      <main className="flex-1 p-6">
        <h1 className="mb-6 text-2xl font-bold text-gray-100">System Design Topics</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTopics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </main>
    </div>
  );
}
