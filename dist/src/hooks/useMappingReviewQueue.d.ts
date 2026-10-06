import type { IngestItem } from '../types/ingest';
export interface UseMappingReviewQueueOptions {
    /** Wins over this library's `useIdentityContext().idToken`. */
    idToken?: string | null;
    /** Wins over the build-time `VITE_SOCIAL_API_URL` / module `setApiBaseUrl`. */
    baseUrl?: string;
}
export interface UseMappingReviewQueueResult {
    items: IngestItem[];
    threshold: number;
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
    remap: (itemId: string, typeId: string) => Promise<void>;
    skip: (itemId: string) => Promise<void>;
}
export declare function useMappingReviewQueue(options?: UseMappingReviewQueueOptions): UseMappingReviewQueueResult;
export default useMappingReviewQueue;
//# sourceMappingURL=useMappingReviewQueue.d.ts.map