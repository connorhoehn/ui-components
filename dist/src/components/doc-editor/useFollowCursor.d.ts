import type { Editor } from '@tiptap/react';
import type { Awareness } from 'y-protocols/awareness';
/** Find the awareness clientID whose `user` payload matches. Null when absent. */
export declare function clientIdForUser(awareness: Awareness, match: (user: Record<string, unknown>) => boolean): number | null;
export interface UseFollowCursorOptions {
    editor: Editor | null;
    /** Anything carrying the doc's awareness — the same shape TiptapEditor takes. */
    provider: {
        awareness: Awareness;
    } | null | undefined;
    /** Awareness clientID to track. Null disables — the hook is always mounted. */
    followClientId: number | null;
    /**
     * Fired when the followed client disappears from awareness (closed the tab,
     * lost the connection). The host should clear its follow state — a lock on
     * a ghost scrolls nowhere and the banner would name someone who left.
     */
    onLost?: () => void;
}
export declare function useFollowCursor({ editor, provider, followClientId, onLost }: UseFollowCursorOptions): void;
export default useFollowCursor;
//# sourceMappingURL=useFollowCursor.d.ts.map