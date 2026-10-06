import type { XmlFragment } from 'yjs';
import * as Y from 'yjs';
import type { Section, TaskItem, CommentThread } from '../../types/document';
import type { CollaborationProvider } from './TiptapEditor';
/**
 * @deprecated Part of the legacy SECTIONED document editor, which is deprecated
 * (2026-09-22). New documents are pages — use the page editor (`CanvasDocumentView`); decks use
 * `PresentationView`, whiteboards the diagram surface. Kept so existing
 * sectioned documents still open until they are converted to a page.
 */
export declare function KeyDecisionsCard({ sections }: {
    sections: Section[];
}): import("react").JSX.Element;
/**
 * @deprecated Part of the legacy SECTIONED document editor, which is deprecated
 * (2026-09-22). New documents are pages — use the page editor (`CanvasDocumentView`); decks use
 * `PresentationView`, whiteboards the diagram surface. Kept so existing
 * sectioned documents still open until they are converted to a page.
 */
export declare function ActionItemsCard({ allItems }: {
    allItems: TaskItem[];
}): import("react").JSX.Element;
/**
 * @deprecated Part of the legacy SECTIONED document editor, which is deprecated
 * (2026-09-22). New documents are pages — use the page editor (`CanvasDocumentView`); decks use
 * `PresentationView`, whiteboards the diagram surface. Kept so existing
 * sectioned documents still open until they are converted to a page.
 */
export declare function SectionSummariesCard({ sections, commentCounts, sectionContentTexts, comments, getSectionFragment, ydoc, provider, }: {
    sections: Section[];
    commentCounts?: Record<string, number>;
    sectionContentTexts?: Record<string, string>;
    comments?: Record<string, CommentThread[]>;
    getSectionFragment?: (sectionId: string) => XmlFragment | null;
    ydoc?: Y.Doc | null;
    provider?: CollaborationProvider | null;
}): import("react").JSX.Element;
//# sourceMappingURL=ReaderSectionCard.d.ts.map