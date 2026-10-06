import { type DragEventHandler, type MouseEvent, type ReactNode } from 'react';
/** `data-*` attributes passed straight through to a row or group heading. */
export type StackedRailDataAttributes = Record<`data-${string}`, string | number | boolean | undefined>;
/** Drag pass-through: the host owns what a drag and a drop mean. */
export interface StackedRailDragProps {
    draggable?: boolean;
    onDragStart?: DragEventHandler<HTMLElement>;
    onDragOver?: DragEventHandler<HTMLElement>;
    onDragEnter?: DragEventHandler<HTMLElement>;
    onDragLeave?: DragEventHandler<HTMLElement>;
    onDrop?: DragEventHandler<HTMLElement>;
    onDragEnd?: DragEventHandler<HTMLElement>;
    /** Extra `data-*` attributes for the element that carries the testid. */
    data?: StackedRailDataAttributes;
}
export interface StackedRailRow extends StackedRailDragProps {
    id: string;
    label: string;
    /** A link target. Without it the row is a button calling `onSelect`. */
    href?: string;
    /** Called on activation — also for `href` rows (the host's router). */
    onSelect?: () => void;
    /** Router interception; keep modified clicks native by checking the event. */
    onNavigate?: (event: MouseEvent<HTMLAnchorElement>) => void;
    /** The view on screen. Also set by `selectedId`. */
    current?: boolean;
    /** Right-aligned muted meta: a number is a count ("0" shows), a string an age ("3h"). */
    meta?: number | string;
    /**
     * After `meta`, at the row's right edge: a small presence stack (20px
     * avatars), a status dot. It never moves the text column or the 36px pitch.
     */
    trailing?: ReactNode;
    /** A small glyph before the label. None by default — the rail is words. */
    icon?: ReactNode;
    children?: StackedRailRow[];
    /** Controlled disclosure. With `onToggle`, the host owns it; alone, the initial state. */
    open?: boolean;
    onToggle?: (open: boolean) => void;
    disabled?: boolean;
    /** Tooltip on a disabled row: why it cannot be opened. */
    disabledReason?: string;
    /** Busy (a move or pull in flight): translucent and `aria-busy`. */
    pending?: boolean;
    /** The hover/focus-revealed row menu slot (a ⋯ `DropdownMenu`, usually). */
    menu?: ReactNode | ((row: StackedRailRow) => ReactNode);
    /** The row control's testid. Default `${listTestId}-row-${id}`. */
    testId?: string;
}
/** A group heading action: a 28px ghost icon button. */
export interface StackedRailAction {
    label: string;
    icon: ReactNode;
    onClick: () => void;
    disabled?: boolean;
    'data-testid'?: string;
}
export interface StackedRailGroup extends StackedRailDragProps {
    id: string;
    /** The heading's label; also its `title`, so a truncated one reads whole on hover. */
    title: string;
    /** Plain count after the heading ("KIND 6"). */
    count?: number;
    /** Default true. A non-collapsible group draws its heading as text. */
    collapsible?: boolean;
    /** Controlled open state (with `onToggle`), else the initial one. Default open. */
    open?: boolean;
    onToggle?: (open: boolean) => void;
    /** Right of the heading — presence avatars, a status. */
    trailing?: ReactNode;
    /**
     * 28px icon buttons at the heading's right edge, or the host's own nodes (a
     * ⋯ `DropdownMenu`). Revealed, not always drawn (2.407.36): they take no
     * width until the heading is hovered, holds keyboard focus (Tab onto the
     * heading or into the actions — `:focus-visible`, so a mouse click on the
     * heading does not pin them), has a menu open (`aria-expanded="true"`
     * inside), or the group is current; on a touch screen (`hover: none`)
     * they are always out. Hidden they stay in the tab order and the
     * accessibility tree (visually hidden, like `sr-only`), never `display:none`.
     * `trailing` and `count` are not part of this and always show.
     */
    actions?: StackedRailAction[] | ReactNode;
    /**
     * The group holds the view on screen: its actions stay out. Derived when
     * any row in it (at any depth) is current; set it to force either way.
     */
    current?: boolean;
    rows: StackedRailRow[];
    /** The line an empty open group shows. Default "Nothing here yet." */
    emptyLabel?: ReactNode;
    /** Busy (the whole source mid-pull): translucent and `aria-busy`. */
    pending?: boolean;
    /** The group section's testid. Default `${listTestId}-group-${id}`. */
    testId?: string;
}
export interface StackedRailProps {
    /** The rail's caption ("AGENT LIBRARY"). */
    title?: string;
    /** Plain count directly after the caption ("DOCUMENTS 187"), like a group's. */
    count?: number;
    /**
     * The caption's actions. A `ReactNode`, or a single `StackedRailAction`,
     * draws as-is at the right edge. Two or more `StackedRailAction`s draw as
     * 28px icon buttons while the rail is 240px or wider (`railWidth="sm"` and
     * up), and fold into one ⋯ menu (`${data-testid}-actions-menu`, one item
     * per action, disabled carried over) below that — at `xs` (220px) three
     * buttons would leave the caption "DOCUM… 187". A container query on the
     * caption row decides, so the rail needs no width prop. (2.407.36)
     */
    actions?: StackedRailAction[] | ReactNode;
    groups: StackedRailGroup[];
    /** The current row, in place of (or as well as) `row.current`. */
    selectedId?: string | null;
    /**
     * The current row always wears the 3px primary edge. `tint` (default, the
     * Org rail) adds the 8% primary fill; `weight` draws it semibold instead.
     */
    currentStyle?: 'tint' | 'weight';
    /** The nav landmark's name. Default "Navigation". */
    'aria-label'?: string;
    className?: string;
    'data-testid'?: string;
}
/**
 * The row control — the Org rail's (SubNavLayout) row: 13px/500 on a 36px
 * pitch (8px + a 20px line + 8px, `RAIL_ROW_PITCH`), no gap between rows, no
 * radius. Group headings and the caption sit at the same 36px.
 */
export declare const STACKED_RAIL_ROW_CLASS: string;
/**
 * One gutter cell: the single 18px indent step. A nesting level is one empty
 * cell; a caret is one cell with the caret at its left edge (so the caret's x
 * is the text x of a leaf at the same level). Exported for the geometry test.
 */
export declare const STACKED_RAIL_STEP_CLASS = "flex h-5 w-[18px] shrink-0 items-center justify-start text-text-secondary";
/**
 * A group heading's actions slot (2.407.36): visually hidden (`sr-only`, so
 * it takes no width yet stays a tab stop and in the accessibility tree) until
 * the heading strip (`group/head`) is hovered, holds a `:focus-visible`
 * element (the heading or an action, reached by Tab), a menu inside is open,
 * or the group is current (`data-current` on the strip); always out when the
 * primary pointer cannot hover (touch). Exported for the test.
 */
export declare const STACKED_RAIL_GROUP_ACTIONS_CLASS: string;
export declare function StackedRail({ title, count, actions, groups, selectedId, currentStyle, 'aria-label': ariaLabel, className, 'data-testid': testId, }: StackedRailProps): import("react").JSX.Element | null;
export default StackedRail;
//# sourceMappingURL=StackedRail.d.ts.map