import { Link } from 'react-router-dom';
import Canvas from '../features/sandbox/Canvas';
import { useTranslatedData } from '../hooks/useTranslatedData';
import { useLanguage } from '../i18n';
import type { Translations } from '../i18n';
import type { Difficulty } from '../types';

const DIFFICULTY_COLORS: Record<number, string> = {
  1: 'bg-green-600/20 text-green-400',
  2: 'bg-yellow-600/20 text-yellow-400',
  3: 'bg-red-600/20 text-red-400',
};

const DIFF_KEYS: Record<Difficulty, keyof Translations> = {
  1: 'diff_beginner',
  2: 'diff_intermediate',
  3: 'diff_advanced',
};

export default function Sandbox() {
  const { t } = useLanguage();
  const { exercises } = useTranslatedData();

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* Canvas takes most of the vertical space */}
      <div className="flex-1 min-h-0">
        <Canvas />
      </div>

      {/* Exercise links section below canvas */}
      {exercises.length > 0 && (
        <div className="border-t border-[#2a2a4a] bg-[#16162a] p-4">
          <h2 className="mb-3 text-sm font-semibold text-gray-300">
            {t.sandbox_guided_exercises}
          </h2>
          <div className="flex flex-wrap gap-3">
            {exercises.map((ex) => (
              <Link
                key={ex.id}
                to={`/exercises/${ex.id}`}
                className="flex items-center gap-2 rounded-lg border border-[#2a2a4a] bg-[#1a1a2e] px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-[#1f1f3a]"
              >
                <span>{ex.title}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${DIFFICULTY_COLORS[ex.difficulty] ?? ''}`}
                >
                  {t[DIFF_KEYS[ex.difficulty as Difficulty]]}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
