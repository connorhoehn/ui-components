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
export default function AckMode({ sections, onAckItem, onRejectItem, participants, onSectionFocus, jumpToIndex, onJumpComplete, getSectionFragment, ydoc, provider, comments, onAddComment, onResolveThread, onUnresolveThread }: AckModeProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=AckMode.d.ts.map