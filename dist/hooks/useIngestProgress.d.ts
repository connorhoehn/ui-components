export interface IngestProgressEvent {
    type: string;
    timestamp: string;
    [key: string]: unknown;
}
export interface ActiveSync {
    sourceId: string;
    sourceName: string;
    fileCount: number;
    filesFetched: number;
    itemsMapped: number;
    itemsMaterialized: number;
    startedAt: string;
}
export interface UseIngestProgressResult {
    events: IngestProgressEvent[];
    activeSyncs: Map<string, ActiveSync>;
    clearEvents: () => void;
}
export declare function useIngestProgress(): UseIngestProgressResult;
//# sourceMappingURL=useIngestProgress.d.ts.map