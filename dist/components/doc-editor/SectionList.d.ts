import type { XmlFragment } from 'yjs';
import * as Y from 'yjs';
import type { Section, TaskItem, Participant } from '../../types/document';
import type { CollaborationProvider } from './TiptapEditor';
import type { CommentThread } from '../../types/document';
export interface SectionListProps {
    sections: Section[];
    getSectionFragment: (sectionId: string) => XmlFragment | null;
    ydoc: Y.Doc;
    provider: CollaborationProvider | null;
    user: {
        name: string;
        color: string;
    };
    editable: boolean;
    onUpdateSection: (sectionId: string, patch: Partial<Section>) => void;
    onAddItem: (sectionId: string, item: Omit<TaskItem, 'id'>) => void;
    onUpdateItem: (sectionId: string, itemId: string, patch: Partial<TaskItem>) => void;
    onRemoveItem: (sectionId: string, itemId: string) => void;
    participants?: Participant[];
    onSectionFocus?: (sectionId: string) => void;
    focusedSectionId?: string | null;
    comments?: Record<string, CommentThread[]>;
    onAddComment?: (sectionId: string, text: string, parentCommentId?: string | null) => void;
    onResolveThread?: (sectionId: string, commentId: string) => void;
    onUnresolveThread?: (sectionId: string, commentId: string) => void;
    /** Merge-safe awareness updater for Tiptap cursor info. */
    onUpdateCursorInfo?: (name: string, color: string) => void;
    /** Called when user clicks a section's comment icon to open the sidebar. */
    onOpenComments?: (sectionId: string) => void;
}
export default function SectionList({ sections, getSectionFragment, ydoc, provider, user, editable, onUpdateSection, onAddItem, onUpdateItem, onRemoveItem, participants, onSectionFocus, focusedSectionId, comments, onAddComment, onResolveThread, onUnresolveThread, onUpdateCursorInfo, onOpenComments, }: SectionListProps): import("react").JSX.Element;
//# sourceMappingURL=SectionList.d.ts.map