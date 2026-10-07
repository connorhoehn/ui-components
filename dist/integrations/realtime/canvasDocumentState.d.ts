import type { DocumentSaveState } from '../../components/doc-editor/DocumentSaveStatus';
/**
 * Save-state line for a canvas document. Only a durable backend receipt may
 * select `saved`; `idle` shows nothing.
 */
export declare function canvasDocumentSaveState(state: 'idle' | 'pending' | 'saved' | 'error', pending: number, online: boolean, retry: () => void): DocumentSaveState | undefined;
/** Auth expiry is independent of whether a socket is open; the app adds its own mode rules. */
export declare function canEditCanvasGrant(grant: {
    canEdit: boolean;
    expiresAt: number;
}, accessValid: boolean, now?: number): boolean;
//# sourceMappingURL=canvasDocumentState.d.ts.map