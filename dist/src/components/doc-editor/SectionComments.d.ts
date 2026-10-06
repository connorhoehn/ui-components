import type { CommentThread, Participant } from '../../types/document';
interface SectionCommentsProps {
    comments: CommentThread[];
    onAddComment: (text: string, parentCommentId?: string | null) => void;
    participants?: Participant[];
    onResolveThread?: (commentId: string) => void;
    onUnresolveThread?: (commentId: string) => void;
}
/**
 * @deprecated Part of the legacy SECTIONED document editor, which is deprecated
 * (2026-09-22). New documents are pages — use the page editor's margin comments (`CanvasDocumentView` + `DocumentGutter`); decks use
 * `PresentationView`, whiteboards the diagram surface. Kept so existing
 * sectioned documents still open until they are converted to a page.
 */
export default function SectionComments({ comments, onAddComment, participants, onResolveThread, onUnresolveThread, }: SectionCommentsProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=SectionComments.d.ts.map