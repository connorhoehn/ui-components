import { type ReactNode } from 'react';
export interface ChangeReviewListProps {
    /** The document being changed. This is the heading — not the queue's name. */
    documentTitle: string;
    /**
     * Total number of changes awaiting review. Defaults to the number of
     * children. Pass it explicitly when some children are not cards, or when the
     * host is paging server-side and the children are only part of the total.
     */
    changeCount?: number;
    /** Document type, owner, last-edited — whatever orients the reviewer. */
    documentMeta?: ReactNode;
    /** Rendered on the right of the heading, e.g. a Refresh button. */
    headerActions?: ReactNode;
    /** How many cards to show before the "show more" control. Default 3. */
    pageSize?: number;
    /** Rendered in place of the queue when there is nothing to review. */
    emptyState?: ReactNode;
    /** Banners — load errors, stale-data notices — above the queue. */
    notices?: ReactNode;
    /**
     * Rendered after the queue and OUTSIDE the `pageSize` window.
     *
     * Commit controls belong here, not in `children`: a "Apply to document"
     * button passed as a child is one of the paged items, so on a queue longer
     * than `pageSize` it disappears behind "show more" and the surface becomes
     * unsubmittable.
     */
    footer?: ReactNode;
    children?: ReactNode;
    className?: string;
    'data-testid'?: string;
}
export declare function ChangeReviewList({ documentTitle, changeCount, documentMeta, headerActions, pageSize, emptyState, notices, footer, children, className, 'data-testid': testId, }: ChangeReviewListProps): import("react").JSX.Element;
export default ChangeReviewList;
//# sourceMappingURL=ChangeReviewList.d.ts.map