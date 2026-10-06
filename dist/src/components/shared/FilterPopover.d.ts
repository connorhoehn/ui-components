import { type ReactNode } from 'react';
import { type ButtonSize } from '../ui/Button';
import type { InlineMenuPlacement } from './InlineMenu';
export interface FilterPopoverProps {
    /** The filter controls. */
    children: ReactNode;
    /** Button text. Default "Filter". */
    label?: string;
    /** How many filters are narrowing the list; `> 0` shows the badge. */
    activeCount?: number;
    /** Renders a "Clear filters" row at the foot of the panel. */
    onClear?: () => void;
    /** Default "Clear filters". */
    clearLabel?: string;
    /** Controlled open state. */
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    /**
     * Which edge of the button the panel hangs from. The panel is
     * collision-aware — a `bottom-*` placement flips above the button on its
     * own when there is no room below — so the `top-*` values (kept for
     * callers written against the in-place panel) resolve to their `bottom-*`
     * counterpart and let the flip decide.
     */
    placement?: InlineMenuPlacement;
    size?: ButtonSize;
    /**
     * `icon`: a square button holding only the funnel (the label becomes its
     * accessible name); an active filter shows as a small primary dot on its
     * corner, the count in the accessible name. Default `label`.
     */
    trigger?: 'label' | 'icon';
    /** Accessible name of the panel. Default "Filters". */
    panelLabel?: string;
    className?: string;
    panelClassName?: string;
    /** Replaces the funnel glyph (e.g. `SlidersIcon`). Since 2.389.6. */
    icon?: ReactNode;
    'data-testid'?: string;
}
export declare function FilterPopover({ children, label, activeCount, onClear, clearLabel, open: controlledOpen, onOpenChange, placement, size, trigger, panelLabel, className, panelClassName, icon, 'data-testid': testId, }: FilterPopoverProps): import("react").JSX.Element;
export default FilterPopover;
//# sourceMappingURL=FilterPopover.d.ts.map