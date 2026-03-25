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

const categories = Object.keys(CAT_KEYS) as Category[];

interface SidebarProps {
  selected: Category | null;
  onSelect: (cat: Category | null) => void;
}

export default function Sidebar({ selected, onSelect }: SidebarProps) {
  const { t } = useLanguage();

  return (
    <aside className="w-56 shrink-0 border-r border-[#2a2a4a] bg-[#16162a] p-4">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
        {t.sidebar_categories}
      </h2>

      <button
        onClick={() => onSelect(null)}
        className={`mb-1 w-full rounded px-3 py-1.5 text-left text-sm transition-colors ${
          selected === null
            ? 'bg-purple-500/20 text-purple-300'
            : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        {t.sidebar_all}
      </button>

      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`mb-1 flex w-full items-center gap-2 rounded px-3 py-1.5 text-left text-sm transition-colors ${
            selected === cat
              ? 'bg-purple-500/20 text-purple-300'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: CATEGORY_COLORS[cat] }}
          />
          {t[CAT_KEYS[cat]]}
        </button>
      ))}
    </aside>
  );
}
