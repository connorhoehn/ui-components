import type { XmlFragment } from 'yjs';
import * as Y from 'yjs';
import type { Section, Participant, CommentThread } from '../../types/document';
import type { CollaborationProvider } from './TiptapEditor';
interface AckModeProps {
    sections: Section[];
    onAckItem: (sectionId: string, itemId: string, notes?: string) => void;
    onRejectItem: (sectionId: string, itemId: string, reason: string) => void;
    participants: Participant[];
    onSectionFocus?: (sectionId: string) => void;
    /** Jump to a specific section page (set by handleJumpToUser) */
    jumpToIndex?: number | null;
    onJumpComplete?: () => void;
    getSectionFragment: (sectionId: string) => XmlFragment | null;
    ydoc: Y.Doc;
    provider: CollaborationProvider | null;
    comments?: Record<string, CommentThread[]>;
    onAddComment?: (sectionId: string, text: string, parentCommentId?: string | null) => void;
    onResolveThread?: (sectionId: string, commentId: string) => void;
    onUnresolveThread?: (sectionId: string, commentId: string) => void;
}
/**
 * @deprecated Part of the legacy SECTIONED document editor, which is deprecated
 * (2026-09-22). New documents are pages — use the page editor (`CanvasDocumentView`); decks use
 * `PresentationView`, whiteboards the diagram surface. Kept so existing
 * sectioned documents still open until they are converted to a page.
 */
export default function AckMode({ sections, onAckItem, onRejectItem, participants, onSectionFocus, jumpToIndex, onJumpComplete, getSectionFragment, ydoc, provider, comments, onAddComment, onResolveThread, onUnresolveThread }: AckModeProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=AckMode.d.ts.map