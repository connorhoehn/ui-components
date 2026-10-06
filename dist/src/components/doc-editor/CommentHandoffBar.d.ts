export interface CommentHandoffBarProps {
    author: string;
    /** The anchored text, when the comment has one. */
    quote?: string;
    /** `agent` (default): answering through the agent. `reply`: the composer is posting a reply. */
    variant?: 'agent' | 'reply';
    /** Agent variant only. */
    resolveOnApply?: boolean;
    onResolveOnApplyChange?: (next: boolean) => void;
    onDismiss: () => void;
    className?: string;
    'data-testid'?: string;
}
export declare function CommentHandoffBar({ author, quote, variant, resolveOnApply, onResolveOnApplyChange, onDismiss, className, 'data-testid': testId, }: CommentHandoffBarProps): import("react").JSX.Element;
export default CommentHandoffBar;
//# sourceMappingURL=CommentHandoffBar.d.ts.map