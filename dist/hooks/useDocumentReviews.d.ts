import type { GatewayMessage } from '../types/gateway';
import type { SectionReview } from '../types/document';
export interface UseDocumentReviewsOptions {
    documentId: string;
    idToken: string | null;
    sendMessage: (msg: Record<string, unknown>) => void;
    onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
    connectionState: string;
}
export interface UseDocumentReviewsReturn {
    sectionReviews: Record<string, SectionReview[]>;
    reviewSection: (sectionId: string, status: string, comment?: string) => Promise<void>;
    loading: boolean;
}
export declare function useDocumentReviews(options: UseDocumentReviewsOptions): UseDocumentReviewsReturn;
//# sourceMappingURL=useDocumentReviews.d.ts.map