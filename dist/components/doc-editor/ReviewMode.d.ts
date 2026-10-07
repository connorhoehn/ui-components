import type { XmlFragment } from 'yjs';
import * as Y from 'yjs';
import type { Section, Participant, CommentThread, SectionReview } from '../../types/document';
import type { CollaborationProvider } from './TiptapEditor';
interface ReviewModeProps {
    sections: Section[];
    participants: Participant[];
    userId: string;
    getSectionFragment: (sectionId: string) => XmlFragment | null;
    ydoc: Y.Doc;
    provider: CollaborationProvider | null;
    sectionReviews: Record<string, SectionReview[]>;
    reviewSection: (sectionId: string, status: SectionReview['status'], comment?: string) => void;
    comments?: Record<string, CommentThread[]>;
    onAddComment?: (sectionId: string, text: string, parentCommentId?: string | null) => void;
    onResolveThread?: (sectionId: string, commentId: string) => void;
    onUnresolveThread?: (sectionId: string, commentId: string) => void;
    onSectionFocus?: (sectionId: string) => void;
}
/**
 * @deprecated Part of the legacy SECTIONED document editor, which is deprecated
 * (2026-09-22). New documents are pages — use the page editor's suggestion review (`SuggestionReviewList`); decks use
 * `PresentationView`, whiteboards the diagram surface. Kept so existing
 * sectioned documents still open until they are converted to a page.
 */
export default function ReviewMode({ sections, participants, userId, getSectionFragment, ydoc, provider, sectionReviews, reviewSection, comments, onAddComment, onResolveThread, onUnresolveThread, onSectionFocus, }: ReviewModeProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=ReviewMode.d.ts.map