import type { Category, Difficulty } from '../types';
import type { Translations } from '../i18n';

export const CATEGORY_COLORS: Record<Category, string> = {
  networking: '#a78bfa',
  storage: '#10b981',
  caching: '#3b82f6',
  scaling: '#f59e0b',
  reliability: '#ef4444',
  messaging: '#ec4899',
  security: '#14b8a6',
  patterns: '#8b5cf6',
};

export const CAT_KEYS: Record<Category, keyof Translations> = {
  networking: 'cat_networking',
  storage: 'cat_storage',
  caching: 'cat_caching',
  scaling: 'cat_scaling',
  reliability: 'cat_reliability',
  messaging: 'cat_messaging',
  security: 'cat_security',
  patterns: 'cat_patterns',
};

export const DIFF_KEYS: Record<Difficulty, keyof Translations> = {
  1: 'diff_beginner',
  2: 'diff_intermediate',
  3: 'diff_advanced',
};

export const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  1: 'bg-green-500/20 text-green-400',
  2: 'bg-yellow-500/20 text-yellow-400',
  3: 'bg-red-500/20 text-red-400',
};
