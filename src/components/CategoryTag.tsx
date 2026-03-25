import { CATEGORY_LABELS, CATEGORY_COLORS } from '../types';
import type { Category } from '../types';

interface CategoryTagProps {
  category: Category;
}

export default function CategoryTag({ category }: CategoryTagProps) {
  const color = CATEGORY_COLORS[category];

  return (
    <span
      className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={{ backgroundColor: `${color}33`, color }}
    >
      {CATEGORY_LABELS[category]}
    </span>
  );
}
