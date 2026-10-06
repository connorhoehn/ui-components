import type { GatewayMessage } from '../types/gateway';
import type { TaskItem } from '../types/document';
export interface UseDocumentItemsOptions {
    documentId: string;
    /** Section IDs to load items for. Items are fetched per-section. */
    sectionIds: string[];
    idToken: string | null;
    sendMessage: (msg: Record<string, unknown>) => void;
    onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
    connectionState: string;
}
export interface UseDocumentItemsReturn {
    items: Record<string, TaskItem[]>;
    addItem: (sectionId: string, item: Partial<TaskItem>) => Promise<void>;
    updateItem: (sectionId: string, itemId: string, updates: Partial<TaskItem>) => Promise<void>;
    removeItem: (sectionId: string, itemId: string) => Promise<void>;
    ackItem: (sectionId: string, itemId: string) => Promise<void>;
    loading: boolean;
    /**
     * Per-section load failures, keyed by sectionId. A section present here
     * failed to load — which is NOT the same as having no items, and the two
     * used to be indistinguishable (see the catch in the load effect).
     * Sections that loaded fine are absent from this map.
     */
    itemErrors: Record<string, string>;
}
export declare function useDocumentItems(options: UseDocumentItemsOptions): UseDocumentItemsReturn;
//# sourceMappingURL=useDocumentItems.d.ts.map