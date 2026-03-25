import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import CategoryTag from '../components/CategoryTag';
import DifficultyBadge from '../components/DifficultyBadge';
import { topicById } from '../data/topics';
import { useProgress } from '../hooks/useProgress';

export default function TopicDetail() {
  const { topicId } = useParams<{ topicId: string }>();
  const { markTopicVisited } = useProgress();
  const topic = topicId ? topicById(topicId) : undefined;

  useEffect(() => {
    if (topicId) {
      markTopicVisited(topicId);
    }
  }, [topicId, markTopicVisited]);

  if (!topic) {
    return (
      <div className="p-8">
        <h1 className="mb-4 text-2xl font-bold text-gray-100">Topic not found</h1>
        <Link to="/topics" className="text-purple-400 hover:underline">
          Back to Topics
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      {/* Back link */}
      <Link
        to="/topics"
        className="mb-6 inline-flex items-center gap-1 text-sm text-purple-400 hover:underline"
      >
        &larr; Back to Topics
      </Link>

      {/* Header */}
      <div className="mb-6">
        <h1 className="mb-3 text-3xl font-bold text-gray-100">{topic.title}</h1>
        <div className="flex flex-wrap items-center gap-2">
          <CategoryTag category={topic.category} />
          <DifficultyBadge difficulty={topic.difficulty} />
        </div>
      </div>

      {/* Summary */}
      <div className="mb-8 rounded-lg border border-purple-500/30 bg-purple-500/10 p-5">
        <p className="text-gray-200">{topic.summary}</p>
      </div>

      {/* Explanation */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-gray-100">Explanation</h2>
        <div className="prose prose-invert max-w-none [&_h2]:text-xl [&_h2]:text-gray-100 [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:text-gray-200 [&_h3]:mt-4 [&_h3]:mb-2 [&_p]:text-gray-300 [&_ul]:text-gray-300 [&_li]:text-gray-300 [&_code]:text-purple-400 [&_code]:bg-[#2a2a4a] [&_code]:px-1 [&_code]:rounded [&_pre]:bg-[#1a1a2e] [&_pre]:p-4 [&_pre]:rounded-lg">
          <Markdown>{topic.explanation}</Markdown>
        </div>
      </section>

      {/* Key Points */}
      {topic.keyPoints.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-100">Key Points</h2>
          <ul className="space-y-2">
            {topic.keyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-300">
                <span className="mt-0.5 text-green-400">&#10003;</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Real-World Examples */}
      {topic.realWorld.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-100">Real-World Examples</h2>
          <div className="space-y-3">
            {topic.realWorld.map((example, i) => (
              <div
                key={i}
                className="rounded-lg border border-[#2a2a4a] bg-[#1a1a2e] p-4"
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg">&#127758;</span>
                  <p className="text-gray-300">{example}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Interview Tips */}
      {topic.interviewTips.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-100">Interview Tips</h2>
          <div className="space-y-3">
            {topic.interviewTips.map((tip, i) => (
              <div
                key={i}
                className="rounded-lg border border-[#2a2a4a] bg-[#1a1a2e] p-4"
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg">&#128161;</span>
                  <p className="text-gray-300">{tip}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Topics */}
      {topic.relatedTopics.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-100">Related Topics</h2>
          <div className="flex flex-wrap gap-2">
            {topic.relatedTopics.map((relatedId) => {
              const related = topicById(relatedId);
              if (!related) return null;
              return (
                <Link
                  key={relatedId}
                  to={`/topics/${relatedId}`}
                  className="rounded-lg border border-[#2a2a4a] bg-[#1a1a2e] px-4 py-2 text-sm text-purple-400 transition-colors hover:border-purple-500/50 hover:bg-[#1f1f3a]"
                >
                  {related.title}
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
