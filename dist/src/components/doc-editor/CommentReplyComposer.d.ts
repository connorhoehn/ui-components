import { type ComposedMessage } from '../social/RichChatComposer';
import type { MentionUser } from '../../hooks/useMentionUsers';
import { type DictationButtonState } from './DictationButton';
export interface CommentReplyDictation {
    /** Mirrors the dictation hook's state; `unsupported` hides nothing, it says why. */
    state: DictationButtonState;
    /** True only while a microphone track is live. */
    micActive: boolean;
    /** Why pressing will not record (signed out, no transcriber) — shown as the tooltip. */
    unavailableReason?: string;
    start: () => void;
    stop: () => void;
}
export interface CommentReplyComposerHandle {
    focus: () => void;
    /** Inserts words at the caret — where a dictated utterance goes. */
    insertText: (text: string) => void;
}
export interface CommentReplyComposerProps {
    mentionUsers: MentionUser[];
    /** A plain reply. Resolve `false` to keep the draft. */
    onReply: (text: string) => void | boolean | Promise<void | boolean>;
    /** `/resolve` — absent on a reply-to-a-reply or a resolved thread. */
    onResolve?: () => void;
    /** `/agent <instruction>`; absent when no agent can edit the page. */
    onAskAgent?: (instruction: string) => void;
    /** `/assign @person`; absent hides the command. */
    onAssign?: (user: MentionUser) => void;
    onCancel?: () => void;
    dictation?: CommentReplyDictation;
    placeholder?: string;
    /**
     * `card` (default): the 280px margin card's compact box. `dock`: the page's
     * docked composer in Reply mode — the dock's comfortable density and
     * `editor` strip, so switching Agent → Reply does not change the box's size.
     */
    variant?: 'card' | 'dock';
    /** Send's label. Default `Reply`. */
    submitLabel?: string;
    className?: string;
    'data-testid'?: string;
}
export declare const COMMENT_REPLY_COMMANDS: {
    readonly resolve: '/resolve';
    readonly agent: '/agent';
    readonly assign: '/assign';
};
/** What a sent draft asks for. Pure, so the routing is testable without an editor. */
export type CommentReplyIntent = {
    kind: 'reply';
    text: string;
} | {
    kind: 'resolve';
    note: string;
} | {
    kind: 'agent';
    instruction: string;
} | {
    kind: 'assign';
    userId: string | null;
    name: string;
} | {
    kind: 'empty';
};
export declare function commentReplyIntent(message: Pick<ComposedMessage, 'text'> & {
    command?: ComposedMessage['command'];
}): CommentReplyIntent;
export declare const CommentReplyComposer: import("react").ForwardRefExoticComponent<CommentReplyComposerProps & import("react").RefAttributes<CommentReplyComposerHandle>>;
export default CommentReplyComposer;
//# sourceMappingURL=CommentReplyComposer.d.ts.map