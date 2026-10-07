import * as Y from 'yjs';
import { type CanvasRecovery } from './canvasRecovery';
/**
 * Tab-local recovery is partitioned by verified identity and document; it never
 * stores grants. `keyPrefix` lets an app keep the storage keys it already wrote.
 */
export declare function useCanvasRecovery(tenant: string, subject: string, documentId: string, keyPrefix?: string): {
    recovered: CanvasRecovery | null;
    storageError: boolean;
    retain: (bytes: Uint8Array) => void;
    clear: () => void;
    track: (ydoc: Y.Doc | null, provider: {
        pendingUpdateCount: number;
    } | null) => () => void;
    acknowledged: () => void;
    download: () => void;
    restore: (ydoc: Y.Doc) => void;
};
//# sourceMappingURL=useCanvasRecovery.d.ts.map