export interface DLQEntryRow {
    /** Envelope id — primary key for replay / purge. */
    id: string;
    /** Failed payload, T-untyped. The page renders a few well-known fields. */
    envelope: {
        id?: string;
        body?: unknown;
    };
    lastError: string;
    failedAtMs: number;
    totalAttempts: number;
}
export interface UseIngestDLQResult {
    entries: DLQEntryRow[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
    replay: (id: string) => Promise<void>;
    drop: (id: string) => Promise<void>;
}
export declare function useIngestDLQ(): UseIngestDLQResult;
export default useIngestDLQ;
//# sourceMappingURL=useIngestDLQ.d.ts.map