import type { ReactNode } from 'react';
import type { Tone } from '../shared/tones';
/** Row tint. `neutral` (and absent) draws none. */
export type ActionRowTone = Exclude<Tone, 'neutral'> | 'neutral';
/**
 * A fact column at the row's right. Widths come from a fixed scale so cells
 * line up across rows: xs 64, sm 88, md 120, lg 152, xl 184 (px).
 */
export interface ActionRowColumn {
    id: string;
    width: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /** Where the cell's content sits inside its width. Default `start`. */
    align?: 'start' | 'end';
    /** A 1px rule before this column. Default: every column after the first. */
    divider?: boolean;
    /** Screen-reader name for the column's cells, e.g. "Assignee". */
    label?: string;
}
export interface ActionRowItem {
    id: string;
    title: string;
    /** One line under the title. Truncates; absent, no second line. */
    description?: ReactNode;
    /** Right-aligned facts, already worded — "Layla Hassan · 5 points". */
    meta?: ReactNode;
    /** A link target. Without it the row is a button calling `onOpen`. */
    href?: string;
    disabled?: boolean;
    /** Tooltip on a disabled row: why it cannot be opened. */
    disabledReason?: string;
    /** Content per `ActionRowListProps.columns` id. Since 2.392.0. */
    cells?: Record<string, ReactNode>;
    /** Before the title — a toned `Chip` ("Blocked"). Since 2.392.0. */
    leading?: ReactNode;
    /** This row's tint; overrides the list's `tone`. Since 2.392.0. */
    tone?: ActionRowTone;
    /** This row's edge accent; overrides the list's `accent`. Since 2.392.0. */
    accent?: 'none' | 'bar';
    /**
     * A worded target in place of the chevron — "Open" draws "Open →" in the
     * primary colour. Not a separate control: the whole row is still the
     * target. Overrides the list's `action`. Since 2.392.0.
     */
    action?: string;
}
export interface ActionRowListProps {
    items: ActionRowItem[];
    /** A row was activated (click, Enter, Space). Also called for `href` rows. */
    onOpen?: (item: ActionRowItem) => void;
    /** Under the list — normally a link, "See all 11 work items →". */
    footer?: ReactNode;
    /** Shown instead of the rows when `items` is empty. Absent, nothing renders. */
    emptyLabel?: ReactNode;
    /**
     * Fact columns at every row's right, declared once so their edges line up
     * down the list; each item fills `cells`. Since 2.392.0.
     */
    columns?: ActionRowColumn[];
    /**
     * Tints every row — `warning` for "Needs attention". A toned list drops the
     * grey rules (the tint separates the rows) and rounds the rows' right
     * corners. Default `neutral`: no tint, ruled. Since 2.392.0.
     */
    tone?: ActionRowTone;
    /** `bar`: a 3px bar in the row's tone on its left edge. Default `none`. Since 2.392.0. */
    accent?: 'none' | 'bar';
    /** Every row's worded target in place of the chevron ("Open"). Since 2.392.0. */
    action?: string;
    'aria-label'?: string;
    className?: string;
    'data-testid'?: string;
}
export interface ActionRowPersonProps {
    name: string;
    /** A photo; initials when absent (or when it fails to load). */
    avatarUrl?: string;
    /** Avatar diameter in px. Default 28. */
    size?: number;
}
/**
 * The person cell of an `ActionRowList` column — a 28px avatar then the name,
 * truncating inside the column's width. Since 2.392.0.
 */
export declare function ActionRowPerson({ name, avatarUrl, size }: ActionRowPersonProps): import("react").JSX.Element;
export declare function ActionRowList({ items, onOpen, footer, emptyLabel, columns, tone, accent, action, 'aria-label': ariaLabel, className, 'data-testid': testId, }: ActionRowListProps): import("react").JSX.Element | null;
export default ActionRowList;
//# sourceMappingURL=ActionRowList.d.ts.map