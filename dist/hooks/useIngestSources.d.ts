import type { IngestSource } from '../types/ingest';
export interface UseIngestSourcesReturn {
    sources: IngestSource[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
    createSource: (data: Omit<IngestSource, 'sourceId' | 'createdAt' | 'updatedAt' | 'lastSyncAt' | 'lastSyncStats'>) => Promise<IngestSource | null>;
    deleteSource: (sourceId: string) => Promise<boolean>;
    triggerSync: (sourceId: string) => Promise<boolean>;
}
export declare function useIngestSources(): UseIngestSourcesReturn;
//# sourceMappingURL=useIngestSources.d.ts.map