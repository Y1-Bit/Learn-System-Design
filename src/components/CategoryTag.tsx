import { CATEGORY_COLORS, CAT_KEYS } from '../constants';
import type { Category } from '../types';
import { useLanguage } from '../i18n';

interface CategoryTagProps {
  category: Category;
}

export default function CategoryTag({ category }: CategoryTagProps) {
  const { t } = useLanguage();
  const color = CATEGORY_COLORS[category];

  return (
    <span
      className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={{ backgroundColor: `${color}33`, color }}
    >
      {t[CAT_KEYS[category]]}
    </span>
  );
}
