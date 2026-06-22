import { IngestItem } from '../types/ingest';
export interface UseMappingReviewQueueResult {
    items: IngestItem[];
    threshold: number;
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
    remap: (itemId: string, typeId: string) => Promise<void>;
    skip: (itemId: string) => Promise<void>;
}
export declare function useMappingReviewQueue(): UseMappingReviewQueueResult;
export default useMappingReviewQueue;
//# sourceMappingURL=useMappingReviewQueue.d.ts.map