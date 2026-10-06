export interface CommentListItem {
    id: string;
    author: {
        id: string;
        name: string;
        avatarUrl?: string;
    };
    role?: string | null;
    createdAt: string | number | Date;
    text: string;
}
export interface CommentListProps {
    title?: string;
    comments: CommentListItem[];
    /** Total in the full discussion, when larger than what is passed. */
    total?: number;
    onViewAll?: () => void;
    /** Clock for relative times (ms since epoch). Default Date.now(). */
    now?: number;
    emptyLabel?: string;
    /** Show at most this many comments. */
    max?: number;
    first?: boolean;
    /**
     * `heading` (default since 2.386.15): a 16px heading, 32px avatars, 14px
     * text, "View all" quiet until hover — a work item's Brief. `label`: the
     * small caption and 28px avatars, for a side panel.
     */
    variant?: 'label' | 'heading';
    className?: string;
    'data-testid'?: string;
}
export declare function CommentList({ title, comments, total, onViewAll, now, emptyLabel, max, first, variant, className, 'data-testid': testId, }: CommentListProps): import("react").JSX.Element;
export default CommentList;
//# sourceMappingURL=CommentList.d.ts.map