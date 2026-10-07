import { type ReactNode } from 'react';
import type { SurfaceTone } from './tones';
/** @see SurfaceTone — which colour family the toolbar paints in. */
export type ToolbarTone = SurfaceTone;
export interface ToolbarProps {
    /** Start-aligned content. Wrap related controls in `<ToolbarGroup>`. */
    children?: ReactNode;
    /** Right-aligned content — the low-frequency verbs (refresh, overflow ⋯). */
    end?: ReactNode;
    tone?: ToolbarTone;
    /** `sm` (default) is the shell scale; `md` is for a toolbar that owns a pane. */
    size?: 'sm' | 'md';
    /**
     * Stick to the top of the scroll container. Off by default: a toolbar
     * inside `WorkArea` is already outside the scrolling region, and stacking
     * two sticky layers is how you get a row that hovers over its own header.
     */
    sticky?: boolean;
    /** Bottom hairline separating the row from content. Default true. */
    bordered?: boolean;
    /**
     * Let the row wrap onto a second line instead of scrolling horizontally.
     *
     * The default single row is right for a handful of verbs — run, stop,
     * refresh — where an overflowing control is rare and reachable. It is wrong
     * for a FILTER bar: six controls plus a view switch do not fit a narrow
     * pane, and `overflow-x-auto` then hides real filters behind a scrollbar
     * nobody looks for, which reads as "this toolbar has no status filter"
     * rather than "scroll right". A wrapping row shows every control it holds.
     */
    wrap?: boolean;
    className?: string;
    /**
     * Names the toolbar for screen readers. Default 'Toolbar' — override it
     * whenever a page shows more than one ("Canvas actions", "Run filters").
     */
    'aria-label'?: string;
    'data-testid'?: string;
}
export declare function Toolbar({ children, end, tone, size, sticky, bordered, wrap, className, 'aria-label': ariaLabel, 'data-testid': testId, }: ToolbarProps): import("react").JSX.Element;
export interface ToolbarGroupProps {
    children: ReactNode;
    /**
     * Draw a divider before the group. Cheaper than asking every caller to
     * interleave `<ToolbarSeparator>` by hand, and it cannot end up orphaned at
     * the start of a row when the group before it renders conditionally.
     */
    divided?: boolean;
    tone?: ToolbarTone;
    className?: string;
    /** Names the group for screen readers, e.g. "Zoom". */
    'aria-label'?: string;
}
export declare function ToolbarGroup({ children, divided, tone, className, 'aria-label': ariaLabel, }: ToolbarGroupProps): import("react").JSX.Element;
export interface ToolbarSeparatorProps {
    tone?: ToolbarTone;
    className?: string;
}
export declare function ToolbarSeparator({ tone, className }: ToolbarSeparatorProps): import("react").JSX.Element;
export interface ToolbarLabelProps {
    children: ReactNode;
    tone?: ToolbarTone;
    className?: string;
}
/** Muted, non-interactive text in the row — "12 selected", "us-east-1". */
export declare function ToolbarLabel({ children, tone, className }: ToolbarLabelProps): import("react").JSX.Element;
export default Toolbar;
//# sourceMappingURL=Toolbar.d.ts.map