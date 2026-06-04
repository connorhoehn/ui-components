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
export declare function useUrlFilterState<T extends Record<string, string | undefined>>(defaults: T): UrlFilterState<T>;
//# sourceMappingURL=useUrlFilterState.d.ts.map