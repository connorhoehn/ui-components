import type { IngestSource } from '../types/ingest';
export interface UseIngestSourcesReturn {
    sources: IngestSource[];
    loading: boolean;
    /** Why the LIST fetch failed. Never set by the mutations — see `actionError`. */
    error: string | null;
    refresh: () => Promise<void>;
    createSource: (data: Omit<IngestSource, 'sourceId' | 'createdAt' | 'updatedAt' | 'lastSyncAt' | 'lastSyncStats'>) => Promise<IngestSource | null>;
    deleteSource: (sourceId: string) => Promise<boolean>;
    triggerSync: (sourceId: string) => Promise<boolean>;
    /**
     * Why the last create/delete/sync failed, or `null`. Additive (v2.95.0).
     *
     * These used to write into `error`, which `SourcesPage` renders as the
     * hard-coded "Failed to load sources." — blaming the wrong operation — and
     * which `refresh()` clears unconditionally. A failed "Sync now" was
     * therefore erased before it could be rendered at all: the spinner stopped
     * and nothing else happened, exactly like a successful trigger, and the
     * operator walked away believing a sync was running.
     */
    actionError: string | null;
    /** Dismiss `actionError`. Additive (v2.95.0). */
    clearActionError: () => void;
}
export declare function useIngestSources(): UseIngestSourcesReturn;
//# sourceMappingURL=useIngestSources.d.ts.map