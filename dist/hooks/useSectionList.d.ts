import * as Y from 'yjs';
import type { Section, TaskItem, CommentThread } from '../types/document';
export interface UseSectionListReturn {
    sections: Section[];
    comments: Record<string, CommentThread[]>;
    addSection: (section: Section) => void;
    updateSection: (sectionId: string, partial: Partial<Section>) => void;
    removeSection: (sectionId: string) => void;
    addItem: (sectionId: string, item: TaskItem) => void;
    updateItem: (sectionId: string, itemId: string, partial: Partial<TaskItem>) => void;
    removeItem: (sectionId: string, itemId: string) => void;
    ackItem: (sectionId: string, itemId: string, userId: string) => void;
    rejectItem: (sectionId: string, itemId: string, userId: string) => void;
    getSectionFragment: (sectionId: string) => Y.XmlFragment | null;
    addComment: (sectionId: string, opts: {
        text: string;
        userId: string;
        displayName: string;
        color: string;
        parentCommentId?: string | null;
    }) => void;
    resolveThread: (sectionId: string, commentId: string, resolverDisplayName: string) => void;
    unresolveThread: (sectionId: string, commentId: string) => void;
}
export declare function useSectionList(ydoc: Y.Doc | null): UseSectionListReturn;
//# sourceMappingURL=useSectionList.d.ts.map