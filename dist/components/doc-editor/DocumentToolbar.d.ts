import { type ReactNode } from 'react';
import { type Editor } from '@tiptap/react';
export interface DocumentToolbarProps {
    editor: Editor | null;
    /** Rendered at the end of the bar — insert-macro menus, share, etc. */
    actions?: ReactNode;
    /**
     * How many comment threads the margin gutter holds.
     *
     * A first-class prop rather than something the page shoves into `actions`,
     * because `actions` is the HOST's slot: whatever the app passes (presence,
     * share) lands there, and merging a library-owned control into it means the
     * toolbar can no longer decide where its own control sits, nor keep a host
     * that fills the slot from displacing it.
     */
    commentCount?: number;
    /** Whether the gutter is currently showing. Drives `aria-pressed`. */
    gutterVisible?: boolean;
    /**
     * Toggles the gutter. Its absence — or a zero count — means no control at
     * all: a toggle for a gutter with nothing in it is a button that does
     * nothing visible, which reads as broken rather than as empty.
     */
    onToggleGutter?: () => void;
    'data-testid'?: string;
}
export default function DocumentToolbar({ editor, actions, commentCount, gutterVisible, onToggleGutter, 'data-testid': testId, }: DocumentToolbarProps): import("react").JSX.Element | null;
//# sourceMappingURL=DocumentToolbar.d.ts.map