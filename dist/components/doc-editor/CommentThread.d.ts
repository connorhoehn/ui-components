import type { CommentThread } from '../../types/document';
import type { MentionUser } from '../../hooks/useMentionUsers';
export declare function getInitials(name: string): string;
export declare function relativeTime(iso: string): string;
export declare function countAllComments(threads: CommentThread[]): number;
/** Render comment text with styled @mention spans. */
export declare function renderCommentText(text: string): React.ReactNode;
export interface MentionState {
    active: boolean;
    query: string;
    position: {
        top: number;
        left: number;
    };
    /** Character index in the textarea where the `@` was typed */
    atIndex: number;
}
export declare const MENTION_INITIAL: MentionState;
export declare function detectMention(value: string, cursorPos: number, textareaEl: HTMLTextAreaElement | null): MentionState;
export declare function insertMention(value: string, mention: MentionState, user: MentionUser): {
    newValue: string;
    newCursor: number;
};
export interface CommentThreadNodeProps {
    comment: CommentThread;
    depth: number;
    onReply: (parentId: string, text: string) => void;
    mentionUsers: MentionUser[];
    onResolveThread?: (commentId: string) => void;
    onUnresolveThread?: (commentId: string) => void;
}
declare function CommentThreadNode({ comment, depth, onReply, mentionUsers, onResolveThread, onUnresolveThread, }: CommentThreadNodeProps): import("react").JSX.Element;
export default CommentThreadNode;
//# sourceMappingURL=CommentThread.d.ts.map