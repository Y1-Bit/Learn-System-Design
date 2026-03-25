import { CATEGORY_COLORS } from '../types';
import type { Category } from '../types';
import type { Translations } from '../i18n';
import { useLanguage } from '../i18n';

const CAT_KEYS: Record<Category, keyof Translations> = {
  networking: 'cat_networking',
  storage: 'cat_storage',
  caching: 'cat_caching',
  scaling: 'cat_scaling',
  reliability: 'cat_reliability',
  messaging: 'cat_messaging',
  security: 'cat_security',
  patterns: 'cat_patterns',
};

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
