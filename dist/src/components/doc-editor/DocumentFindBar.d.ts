import type { Editor } from '@tiptap/react';
export interface DocumentFindBarProps {
    editor: Editor | null;
    /** Closes the bar — Escape, or the × . */
    onClose: () => void;
    /** Hidden when the document cannot be edited; find still works. */
    canReplace?: boolean;
    /**
     * Bump to pull focus back into the query field and select what is in it.
     *
     * This is what makes a SECOND Cmd/Ctrl+F do something. With the bar already
     * open the host's shortcut handler has nothing left to change — `findOpen`
     * is already true — so the keystroke read as dead while the caret stayed in
     * the document. A monotonic token is the smallest thing that can say "focus
     * again" without the parent holding a ref into this component; selecting the
     * existing text is the word-processor behaviour, so the next keystroke
     * starts a new search instead of appending to the last one.
     *
     * Mount focuses regardless — the effect runs on the initial value too.
     */
    focusNonce?: number;
    className?: string;
    'data-testid'?: string;
}
export declare function DocumentFindBar({ editor, onClose, canReplace, focusNonce, className, 'data-testid': testId, }: DocumentFindBarProps): import("react").JSX.Element;
export default DocumentFindBar;
//# sourceMappingURL=DocumentFindBar.d.ts.map