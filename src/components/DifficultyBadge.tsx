import type { Difficulty } from '../types';
import type { Translations } from '../i18n';
import { useLanguage } from '../i18n';

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  1: 'bg-green-500/20 text-green-400',
  2: 'bg-yellow-500/20 text-yellow-400',
  3: 'bg-red-500/20 text-red-400',
};

const DIFF_KEYS: Record<Difficulty, keyof Translations> = {
  1: 'diff_beginner',
  2: 'diff_intermediate',
  3: 'diff_advanced',
};

interface DifficultyBadgeProps {
  difficulty: Difficulty;
}

export default function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  const { t } = useLanguage();

  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${DIFFICULTY_STYLES[difficulty]}`}
    >
      {t[DIFF_KEYS[difficulty]]}
    </span>
  );
}
