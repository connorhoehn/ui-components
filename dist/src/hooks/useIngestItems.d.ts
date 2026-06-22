import { IngestItem, IngestItemStatus } from '../types/ingest';
export interface UseIngestItemsOptions {
    sourceId?: string | null;
    status?: IngestItemStatus | null;
}
export interface UseIngestItemsReturn {
    items: IngestItem[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
    retryItem: (itemId: string) => Promise<boolean>;
    skipItem: (itemId: string) => Promise<boolean>;
}
export declare function useIngestItems(options?: UseIngestItemsOptions): UseIngestItemsReturn;
//# sourceMappingURL=useIngestItems.d.ts.map