import { useState, useCallback } from 'react';
import type { StoredData } from '../types';

const CURRENT_VERSION = 1;

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return defaultValue;
      const parsed: StoredData<T> = JSON.parse(raw);
      if (parsed.version !== CURRENT_VERSION) return defaultValue;
      return parsed.data;
    } catch {
      return defaultValue;
    }
  });

  const set = useCallback((newValue: T | ((prev: T) => T)) => {
    setValue((prev) => {
      const resolved = typeof newValue === 'function'
        ? (newValue as (prev: T) => T)(prev)
        : newValue;
      try {
        const stored: StoredData<T> = { version: CURRENT_VERSION, data: resolved };
        localStorage.setItem(key, JSON.stringify(stored));
      } catch {
        console.warn(`Failed to persist ${key} to localStorage`);
      }
      return resolved;
    });
  }, [key]);

  return [value, set] as const;
}
