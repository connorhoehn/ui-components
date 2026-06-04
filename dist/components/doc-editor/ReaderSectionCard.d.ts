import type { XmlFragment } from 'yjs';
import * as Y from 'yjs';
import type { Section, TaskItem, CommentThread } from '../../types/document';
import type { CollaborationProvider } from './TiptapEditor';
export declare function KeyDecisionsCard({ sections }: {
    sections: Section[];
}): import("react/jsx-runtime").JSX.Element;
export declare function ActionItemsCard({ allItems }: {
    allItems: TaskItem[];
}): import("react/jsx-runtime").JSX.Element;
export declare function SectionSummariesCard({ sections, commentCounts, sectionContentTexts, comments, getSectionFragment, ydoc, provider, }: {
    sections: Section[];
    commentCounts?: Record<string, number>;
    sectionContentTexts?: Record<string, string>;
    comments?: Record<string, CommentThread[]>;
    getSectionFragment?: (sectionId: string) => XmlFragment | null;
    ydoc?: Y.Doc | null;
    provider?: CollaborationProvider | null;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ReaderSectionCard.d.ts.map