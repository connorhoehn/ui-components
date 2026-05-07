// frontend/src/hooks/useUrlFilterState.ts
//
// URL-synced filter state using React Router's useSearchParams.

import { useSearchParams } from 'react-router';
import { useCallback, useMemo } from 'react';

export interface UrlFilterState<T extends Record<string, string | undefined>> {
  filters: T;
  setFilter: <K extends keyof T>(key: K, value: T[K]) => void;
  clearFilters: () => void;
}

/**
 * Sync filter state with URL search params for shareable filter links.
 * Each filter key maps to a query param; undefined values are omitted.
 *
 * @param defaults Default filter values (used when param is missing)
 * @returns { filters, setFilter, clearFilters }
 *
 * @example
 * const { filters, setFilter } = useUrlFilterState({
 *   status: 'all',
 *   search: undefined,
 * });
 *
 * // URL: /pipelines?status=running&search=test
 * // filters = { status: 'running', search: 'test' }
 */
export function useUrlFilterState<T extends Record<string, string | undefined>>(
  defaults: T,
): UrlFilterState<T> {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => {
    const result = { ...defaults };
    for (const key in defaults) {
      const param = searchParams.get(key);
      if (param !== null) {
        result[key] = param as T[Extract<keyof T, string>];
      }
    }
    return result;
  }, [searchParams, defaults]);

  const setFilter = useCallback(
    <K extends keyof T>(key: K, value: T[K]) => {
      setSearchParams((prev: any) => {
        const next = new URLSearchParams(prev);
        if (value === undefined || value === defaults[key]) {
          next.delete(String(key));
        } else {
          next.set(String(key), value);
        }
        return next;
      });
    },
    [setSearchParams, defaults],
  );

  const clearFilters = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  return { filters, setFilter, clearFilters };
}
