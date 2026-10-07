import type { ConflictResolution, SyncConflict } from '../types/ingest';
export interface UseSyncConflictsReturn {
    conflicts: SyncConflict[];
    loading: boolean;
    /** Why the LIST fetch failed. Never set by resolve/discard — see `actionError`. */
    error: string | null;
    /** True when the data came from the local mock fallback. */
    usingMock: boolean;
    refresh: () => Promise<void>;
    resolveConflict: (id: string, resolution: ConflictResolution) => Promise<boolean>;
    discardConflict: (id: string) => Promise<boolean>;
    /**
     * Why the last `resolveConflict` / `discardConflict` failed, or `null`.
     * Additive.
     *
     * These used to write into `error`, which `ConflictsPage` renders as
     * "Failed to load conflicts: …". A rejected Resolve therefore reported a
     * load failure for a queue that had loaded perfectly and was still on
     * screen, while the conflict itself stayed pending — and the next poll
     * cleared `error`, so the operator was left believing the resolve landed.
     */
    actionError: string | null;
    /** Dismiss `actionError`. Additive. */
    clearActionError: () => void;
}
export declare function useSyncConflicts(): UseSyncConflictsReturn;
//# sourceMappingURL=useSyncConflicts.d.ts.map