import type { MouseEvent, ReactNode } from 'react';
export interface RailNavListItem {
    id: string;
    label: string;
    /** A link target. Without it the item is a button calling `onSelect`. */
    href?: string;
    /** Called on activation — also for `href` items (the host's router). */
    onSelect?: () => void;
    /** Router interception; keep modified clicks native by checking the event. */
    onNavigate?: (event: MouseEvent<HTMLAnchorElement>) => void;
    /** The view on screen. Marked `aria-current="page"` and drawn semibold. */
    current?: boolean;
    /** Muted number at the item's right edge. Absent draws none; 0 shows "0". */
    count?: number;
    /** A glyph before the label. */
    icon?: ReactNode;
    disabled?: boolean;
    /** Tooltip on a disabled item: why it cannot be opened. */
    disabledReason?: string;
}
export interface RailNavListProps {
    items: RailNavListItem[];
    /** A tinted current view for a rail that also contains selected records. */
    currentStyle?: 'weight' | 'tint';
    /** The nav landmark's name. Default "Views". */
    'aria-label'?: string;
    className?: string;
    'data-testid'?: string;
}
/** The row control's classes. Not in the barrel. */
export declare const RAIL_NAV_ITEM_CLASS: string;
export declare function RailNavList({ items, currentStyle, 'aria-label': ariaLabel, className, 'data-testid': testId, }: RailNavListProps): import("react").JSX.Element | null;
export default RailNavList;
//# sourceMappingURL=RailNavList.d.ts.map