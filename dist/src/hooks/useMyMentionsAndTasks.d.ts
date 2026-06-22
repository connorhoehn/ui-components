import { Section, CommentThread } from '../types/document';
export interface MentionItem {
    kind: 'mention';
    sectionId: string;
    sectionTitle: string;
    commentId: string;
    authorName: string;
    authorColor: string;
    commentText: string;
    timestamp: string;
}
export interface TaskAssignment {
    kind: 'task';
    sectionId: string;
    sectionTitle: string;
    itemId: string;
    taskText: string;
    status: string;
    priority: string;
}
export type MyItem = MentionItem | TaskAssignment;
interface UseMyMentionsAndTasksArgs {
    sections: Section[];
    comments: Record<string, CommentThread[]>;
    displayName: string;
    userId: string;
}
export declare function useMyMentionsAndTasks({ sections, comments, displayName, userId, }: UseMyMentionsAndTasksArgs): MyItem[];
export {};
//# sourceMappingURL=useMyMentionsAndTasks.d.ts.map