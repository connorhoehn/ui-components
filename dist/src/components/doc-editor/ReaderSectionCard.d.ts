import { XmlFragment } from 'yjs';
import { Section, TaskItem, CommentThread } from '../../types/document';
import { CollaborationProvider } from './TiptapEditor';
import * as Y from 'yjs';
export declare function KeyDecisionsCard({ sections }: {
    sections: Section[];
}): import("react").JSX.Element;
export declare function ActionItemsCard({ allItems }: {
    allItems: TaskItem[];
}): import("react").JSX.Element;
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