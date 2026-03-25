import { Link } from 'react-router-dom';
import Canvas from '../features/sandbox/Canvas';
import { exercises } from '../data/exercises';
import { DIFFICULTY_LABELS } from '../types';

const DIFFICULTY_COLORS: Record<number, string> = {
  1: 'bg-green-600/20 text-green-400',
  2: 'bg-yellow-600/20 text-yellow-400',
  3: 'bg-red-600/20 text-red-400',
};

export default function Sandbox() {
  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* Canvas takes most of the vertical space */}
      <div className="flex-1 min-h-0">
        <Canvas />
      </div>

      {/* Exercise links section below canvas */}
      {exercises.length > 0 && (
        <div className="border-t border-white/10 bg-[#111128] p-4">
          <h2 className="mb-3 text-sm font-semibold text-gray-300">
            Guided Exercises
          </h2>
          <div className="flex flex-wrap gap-3">
            {exercises.map((ex) => (
              <Link
                key={ex.id}
                to={`/exercises/${ex.id}`}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-white/10"
              >
                <span>{ex.title}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${DIFFICULTY_COLORS[ex.difficulty] ?? ''}`}
                >
                  {DIFFICULTY_LABELS[ex.difficulty]}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
