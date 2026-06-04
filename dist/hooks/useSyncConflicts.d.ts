import type { ConflictResolution, SyncConflict } from '../types/ingest';
export interface UseSyncConflictsReturn {
    conflicts: SyncConflict[];
    loading: boolean;
    error: string | null;
    /** True when the data came from the local mock fallback. */
    usingMock: boolean;
    refresh: () => Promise<void>;
    resolveConflict: (id: string, resolution: ConflictResolution) => Promise<boolean>;
    discardConflict: (id: string) => Promise<boolean>;
}
export declare function useSyncConflicts(): UseSyncConflictsReturn;
//# sourceMappingURL=useSyncConflicts.d.ts.map