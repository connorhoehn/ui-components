import { type ReactNode } from 'react';
import type { CommentThread } from '../../types/document';
import type { MentionUser } from '../../hooks/useMentionUsers';
export declare function getInitials(name: string): string;
export declare function relativeTime(iso: string): string;
export declare function countAllComments(threads: CommentThread[]): number;
/**
 * Render comment text with styled @mention spans and in-app links.
 *
 * `[label](/path)` becomes a link — SAME-ORIGIN paths only (a leading `/`,
 * never `//`), which is what an agent's reply uses for its run
 * ("Addressed by [run 3f2a…](/pipelines/…/runs/…)"). Anything else stays text.
 */
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
/**
 * WHERE a root comment was made, shown as a quoted header above its body.
 *
 *   quote     the anchored text as it reads NOW (or its snapshot, while the
 *             editor is still syncing)
 *   removed   the anchored text was deleted — the snapshot, marked as gone
 *   document  a comment on the whole document, with no span
 */
export type CommentContext = {
    kind: 'quote';
    text: string;
} | {
    kind: 'removed';
    text: string;
} | {
    kind: 'document';
};
/** The muted, left-ruled quote a comment card leads with. */
export declare function CommentContextHeader({ context }: {
    context: CommentContext;
}): import("react").JSX.Element;
/**
 * Who resolved a thread, for people. `resolvedBy` is whatever the host stored:
 * a person's display name, or an agent's id (`agent:haiku`) on rows written
 * before the server stored names — those read "Haiku agent", never the id.
 */
export declare function resolverLabel(resolvedBy: string | undefined): string;
export interface ResolvedBannerProps {
    resolvedBy?: string;
    resolvedAt?: string;
    expanded: boolean;
    onToggle: () => void;
    /** Omitted → no Reopen button (a reader who may not reopen). */
    onReopen?: () => void;
}
/**
 * The resolved thread's one-row header: check, "Resolved by <name>", time,
 * a quiet Reopen and a chevron. The whole row toggles the thread open — the
 * chevron says so, where the old inline "— click to expand" wrapped into a
 * jumble in a ~280px margin card.
 */
export declare function ResolvedBanner({ resolvedBy, resolvedAt, expanded, onToggle, onReopen }: ResolvedBannerProps): import("react").JSX.Element;
export interface CommentThreadNodeProps {
    comment: CommentThread;
    /** Root only: where the comment was made. Omitted → no header. */
    context?: CommentContext;
    /**
     * Root only: extra actions after Reply / Resolve (WS-J lane B — Ask agent,
     * dictate…). The host owns what they do.
     */
    actions?: ReactNode;
    /**
     * Root, unresolved only: an "Ask agent" action beside Reply / Resolve (WS-J
     * lane B). The host hands the comment to its agent composer.
     */
    onAskAgent?: (commentId: string) => void;
    /**
     * Replaces the built-in reply textarea — a host passes a
     * `CommentReplyComposer` wired to dictation and its agent. `submit` posts a
     * reply to THIS comment; `close` hides the box.
     */
    renderReply?: (args: {
        commentId: string;
        depth: number;
        submit: (text: string) => void;
        close: () => void;
    }) => ReactNode;
    /**
     * Reply goes somewhere else: pressing it calls this instead of opening any
     * box in the card — the host moves the reply into its docked composer
     * (Reply mode). Reaches nested replies too.
     */
    onReplyRequest?: (args: {
        commentId: string;
        depth: number;
        author: string;
        text: string;
    }) => void;
    /** The comment whose reply is being written elsewhere: its Reply is drawn pressed (`aria-pressed`). */
    replyingToId?: string | null;
    depth: number;
    onReply: (parentId: string, text: string) => void;
    mentionUsers: MentionUser[];
    onResolveThread?: (commentId: string) => void;
    onUnresolveThread?: (commentId: string) => void;
}
declare function CommentThreadNode({ comment, context, actions, onAskAgent, renderReply, onReplyRequest, replyingToId, depth, onReply, mentionUsers, onResolveThread, onUnresolveThread, }: CommentThreadNodeProps): import("react").JSX.Element;
export default CommentThreadNode;
//# sourceMappingURL=CommentThread.d.ts.map