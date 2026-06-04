import type { XmlFragment } from 'yjs';
import * as Y from 'yjs';
import type { Section, CommentThread, Participant } from '../../types/document';
import type { CollaborationProvider } from './TiptapEditor';
interface ChunkViewerProps {
    section: Section;
    onAckItem: (itemId: string, notes?: string) => void;
    onRejectItem: (itemId: string, reason: string) => void;
    fragment: XmlFragment | null;
    ydoc: Y.Doc;
    provider: CollaborationProvider | null;
    comments?: CommentThread[];
    onAddComment?: (text: string, parentCommentId?: string | null) => void;
    onResolveThread?: (commentId: string) => void;
    onUnresolveThread?: (commentId: string) => void;
    participants?: Participant[];
}
export default function ChunkViewer({ section, onAckItem, onRejectItem, fragment, ydoc, provider, comments, onAddComment, onResolveThread, onUnresolveThread, participants }: ChunkViewerProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ChunkViewer.d.ts.map