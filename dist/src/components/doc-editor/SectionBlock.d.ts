import type { XmlFragment } from 'yjs';
import * as Y from 'yjs';
import type { Section, TaskItem, Participant } from '../../types/document';
import type { CollaborationProvider } from './TiptapEditor';
import type { CommentThread } from '../../types/document';
export interface SectionBlockProps {
    section: Section;
    fragment: XmlFragment | null;
    ydoc: Y.Doc;
    provider: CollaborationProvider | null;
    user: {
        name: string;
        color: string;
    };
    editable: boolean;
    onUpdateSection: (patch: Partial<Section>) => void;
    onAddItem: (item: Omit<TaskItem, 'id'>) => void;
    onUpdateItem: (itemId: string, patch: Partial<TaskItem>) => void;
    onRemoveItem: (itemId: string) => void;
    participants?: Participant[];
    onFocus?: () => void;
    isFocused?: boolean;
    comments?: CommentThread[];
    onAddComment?: (text: string, parentCommentId?: string | null) => void;
    onResolveThread?: (commentId: string) => void;
    onUnresolveThread?: (commentId: string) => void;
    /** Merge-safe awareness updater for Tiptap cursor info. */
    onUpdateCursorInfo?: (name: string, color: string) => void;
    /** Number of comments for this section (used for badge on comment icon). */
    commentCount?: number;
    /** Called when the user clicks the comment icon to open the sidebar. */
    onOpenComments?: (sectionId: string) => void;
    /** Participants who currently have comments open for this section. */
    commentPresence?: Participant[];
}
/**
 * @deprecated Part of the legacy SECTIONED document editor, which is deprecated
 * (2026-09-22). New documents are pages — use the page editor (`CanvasDocumentView`); decks use
 * `PresentationView`, whiteboards the diagram surface. Kept so existing
 * sectioned documents still open until they are converted to a page.
 */
export default function SectionBlock({ section, fragment, ydoc, provider, user, editable, onUpdateSection, onAddItem, onUpdateItem, onRemoveItem, participants, onFocus, isFocused, comments, onUpdateCursorInfo, commentCount, onOpenComments, commentPresence, }: SectionBlockProps): import("react").JSX.Element;
//# sourceMappingURL=SectionBlock.d.ts.map