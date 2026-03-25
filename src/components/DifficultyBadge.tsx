import { DIFF_KEYS, DIFFICULTY_STYLES } from '../constants';
import type { Difficulty } from '../types';
import { useLanguage } from '../i18n';

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
