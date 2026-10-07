import type { ReactNode } from 'react';
export interface BoardColumnProps {
    /** The lane's name — "In progress", "Blocked". */
    label: ReactNode;
    /**
     * Count shown at the end of the header. Pass it explicitly rather than
     * counting children: a lane that paginates or virtualises still knows its
     * real total.
     */
    count?: number;
    /** Cards in the lane. When absent, `emptyLabel` is shown instead. */
    children?: ReactNode;
    /** Shown when the lane holds nothing. Default "Nothing here". */
    emptyLabel?: string;
    /** Right-aligned control in the header, e.g. a per-lane "add" button. */
    action?: ReactNode;
    className?: string;
    'data-testid'?: string;
}
export declare function BoardColumn({ label, count, children, emptyLabel, action, className, 'data-testid': testId, }: BoardColumnProps): import("react").JSX.Element;
export default BoardColumn;
//# sourceMappingURL=BoardColumn.d.ts.map