import type { IngestItem, IngestItemStatus } from '../types/ingest';
export interface UseIngestItemsOptions {
    sourceId?: string | null;
    status?: IngestItemStatus | null;
    /** Wins over this library's `useIdentityContext().idToken`. */
    idToken?: string | null;
    /** Wins over the build-time `VITE_SOCIAL_API_URL` / module `setApiBaseUrl`. */
    baseUrl?: string;
}
export interface UseIngestItemsReturn {
    items: IngestItem[];
    loading: boolean;
    /** Why the LIST fetch failed. Never set by retry/skip — see `actionError`. */
    error: string | null;
    refresh: () => Promise<void>;
    retryItem: (itemId: string) => Promise<boolean>;
    skipItem: (itemId: string) => Promise<boolean>;
    /**
     * Why the last `retryItem`/`skipItem` failed, or `null`. Additive
     * (v2.95.0).
     *
     * These used to write into `error`, the same state the list loader owns.
     * A failed Skip therefore made `IngestItemsPage` hide the entire,
     * correctly-loaded table behind a banner reading "Failed to load ingest
     * items." — a statement that was simply false — whose Retry button
     * re-fetched the list rather than re-trying the skip. The next refresh
     * cleared `error`, everything reappeared, and the operator concluded the
     * skip had worked. It had not.
     */
    actionError: string | null;
    /** Dismiss `actionError`. Additive (v2.95.0). */
    clearActionError: () => void;
}
export declare function useIngestItems(options?: UseIngestItemsOptions): UseIngestItemsReturn;
//# sourceMappingURL=useIngestItems.d.ts.map