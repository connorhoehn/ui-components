import { type ReactNode, type RefObject } from 'react';
export type InlineMenuPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
export interface InlineMenuProps {
    /** Whether the panel is currently open. Controlled by the caller. */
    open: boolean;
    /** Fires when the panel should dismiss (outside click / Esc). */
    onClose: () => void;
    /**
     * Placement relative to the nearest `position: relative` ancestor —
     * normally a wrapper around the trigger this panel is anchored to.
     * Defaults to 'bottom-start'.
     */
    placement?: InlineMenuPlacement;
    /**
     * Ref to the trigger element, so a pointerdown on it doesn't count as an
     * "outside" click. Optional — omit it if the caller handles its own
     * open/close toggling some other way.
     */
    trigger?: RefObject<HTMLElement | null>;
    /**
     * ARIA role for the panel. Default `'group'` — a plain labelled
     * container, appropriate when the panel isn't a focus-trapping dialog
     * (this component doesn't trap focus) and may or may not hold menu items.
     * Pass `'menu'` when every child is a `menuitem`.
     */
    role?: string;
    /** Optional className for the panel. */
    className?: string;
    /** Optional testid for the panel. Default 'inline-menu'. */
    'data-testid'?: string;
    /** Accessible name for the panel. */
    'aria-label'?: string;
    /** Id of an element inside the panel that names it. */
    'aria-labelledby'?: string;
    children: ReactNode;
}
export declare function InlineMenu({ open, onClose, placement, trigger, role, className, 'data-testid': testId, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, children, }: InlineMenuProps): import("react").JSX.Element | null;
export default InlineMenu;
//# sourceMappingURL=InlineMenu.d.ts.map