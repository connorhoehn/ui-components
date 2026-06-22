import { DocumentMeta } from '../types/document';
export interface UseVideoCallOptions {
    documentId: string;
    idToken: string | null;
    /** Current document meta (from Y.js). */
    meta: DocumentMeta | null;
    /** Update document meta (writes to Y.js). */
    updateMeta: (partial: Partial<DocumentMeta>) => void;
    /** Send WebSocket message to gateway (for document list metadata sync). */
    sendMessage: (msg: Record<string, unknown>) => void;
    /** Display name for participant tracking. */
    displayName?: string;
}
export type CallState = 'idle' | 'creating' | 'joining' | 'active' | 'error';
export interface UseVideoCallReturn {
    callState: CallState;
    sessionId: string | null;
    stageToken: string | null;
    participantId: string | null;
    userId: string | null;
    error: string | null;
    /** Whether another user started a call (detected via Y.js meta). */
    hasActiveCall: boolean;
    /** Start a new call (creates session + joins). */
    startCall: () => Promise<void>;
    /** Join an existing call by sessionId. */
    joinCall: (sessionId: string) => Promise<void>;
    /** End/leave the call. */
    endCall: () => Promise<void>;
}
export declare function useVideoCall(options: UseVideoCallOptions): UseVideoCallReturn;
//# sourceMappingURL=useVideoCall.d.ts.map