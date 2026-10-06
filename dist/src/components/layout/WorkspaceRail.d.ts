import type { ReactNode } from 'react';
export interface WorkspaceRailBack {
    label: string;
    href?: string;
    onClick?: () => void;
}
export interface WorkspaceRailProps {
    title?: string;
    label?: string;
    actions?: ReactNode;
    header?: ReactNode;
    footer?: ReactNode;
    children: ReactNode;
    /**
     * xs 220 (the Org rail's width — SubNavLayout's default — for a documents
     * rail beside it, since 2.407.33), sm 240, ms 264 (a one-line title list — the Initiatives v2 rail, since
     * 2.392.0), md 300, ml 320 (the Folders explorer, 2.386.0), lg 368 (a
     * two-line work list with a toolbar).
     */
    width?: 'xs' | 'sm' | 'ms' | 'md' | 'ml' | 'lg';
    /**
     * A count beside the title ("Work 11"). Omit for none; zero shows "0" —
     * an empty list is a fact, not a missing number.
     */
    count?: number;
    /**
     * `compact` (default) is the 36px, 12px-title strip a tree rail wears;
     * `prominent` is the column heading a work list wears — an 18px title and
     * count on a 56px row, no rule under it. `label` is the same 56px row with
     * the title as the rail group label — "DOCUMENTS 137", the All documents
     * mockup (since 2.389.2). Since 2.407.13 it draws the shared rail scale
     * (`RAIL_GROUP_LABEL`, 11px semibold caps, with its plain 11px
     * `RAIL_GROUP_COUNT`), so the rail matches the Workspace `NavRail` beside it
     * ("WORKSPACE"); it was a 15px label with a count chip. `caption` (since
     * 2.392.0) is the same row with a 12px letter-spaced uppercase label —
     * "INITIATIVES 11", the Initiatives v2 rail.
     */
    heading?: 'compact' | 'prominent' | 'label' | 'caption';
    /**
     * How `count` reads. `chip` (default): a neutral count chip. `plain`: muted
     * text after the title — "Initiatives 11". Since 2.390.0. A `label` heading
     * always draws its count plain (`RAIL_GROUP_COUNT`) — a rail group heading's
     * count is never a pill (railType).
     */
    countStyle?: 'chip' | 'plain';
    /**
     * A back link on its own row ABOVE the title — "‹ Initiatives" over "Work
     * 11", when the rail has drilled into one thing. `href` renders a link,
     * otherwise a button calling `onClick`. Since 2.390.0.
     */
    back?: WorkspaceRailBack | null;
    collapsed?: boolean;
    collapsedContent?: ReactNode;
    onToggle?: () => void;
    toggleLabel?: string;
    toggleTestId?: string;
    className?: string;
    'data-testid'?: string;
}
/** Shared document/chat rail: fixed header and footer, one scrollable body. */
export declare function WorkspaceRail({ title, label, actions, header, footer, children, width, count, heading, countStyle, back, collapsed, collapsedContent, onToggle, toggleLabel, toggleTestId, className, 'data-testid': testId, }: WorkspaceRailProps): import("react").JSX.Element;
//# sourceMappingURL=WorkspaceRail.d.ts.map