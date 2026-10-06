import { type ReactNode } from 'react';
export interface DropdownMenuItem {
    /** Visible item label. */
    label: string;
    /** Optional leading icon / glyph. */
    icon?: ReactNode;
    /** Highlight this item as the currently-active selection. */
    active?: boolean;
    /** Style this item as destructive. */
    danger?: boolean;
    /** Fires on click / Enter; the menu closes afterwards. Not needed on a row with a `submenu`. */
    onSelect?: () => void;
    /** Right-aligned hint after the label — a shortcut (`⌘P`), a count. */
    trailing?: ReactNode;
    /** A second, quieter line under the label. */
    description?: string;
    /** A setting that is on: a check leads the row (menuitemcheckbox). */
    checked?: boolean;
    /**
     * A flyout of further choices, opened from this row — "Share to ›",
     * "Download as ›". Opens on hover, click or ArrowRight; the row itself
     * runs no `onSelect`.
     */
    submenu?: DropdownMenuSection[];
    /**
     * Shown but not actionable: muted, `aria-disabled="true"` yet still
     * focusable (WAI-ARIA menu practice, so a screen reader can reach it and
     * hear why), and click / Enter / Space never run `onSelect` — the menu
     * stays open. A disabled row with a `submenu` does not open it. Since 2.390.3.
     */
    disabled?: boolean;
    /**
     * Why it is disabled — shown as the row's secondary line (in place of
     * `description`), its hover tooltip, and its `aria-describedby`.
     * Since 2.390.3; the visible line since 2.390.4.
     */
    disabledReason?: string;
    /** A hook for the spec that addresses this row. Without one the row is reachable by its label. */
    'data-testid'?: string;
}
export interface DropdownMenuSection {
    /** Optional uppercase section heading. */
    label?: string;
    items: DropdownMenuItem[];
    /**
     * The group scrolls in place (`uic-menu-group-scroll`) so the sections
     * after it stay put. For a generated list — one row per room — that would
     * otherwise push the fixed actions below the fold.
     */
    scroll?: boolean;
    /**
     * A quiet line under the group's rows — what the group does as a whole
     * ("Creates a new document."). Since 2.390.3.
     */
    caption?: string;
    'data-testid'?: string;
}
export interface DropdownMenuProps {
    /** Content of the built-in trigger button (icon, glyph, text…). */
    trigger: ReactNode;
    /** Accessible label for the trigger button. Default 'Open menu'. */
    triggerLabel?: string;
    /** Optional title attribute (hover tooltip) for the trigger button. */
    triggerTitle?: string;
    /** Optional className for the trigger button. */
    triggerClassName?: string;
    /**
     * The trigger's look. `default` is the small bordered menu button;
     * `primary` is a 36px brand button ("New ▾"), `secondary` a 36px bordered
     * one, `link` bare secondary text ("Relevance ▾"). Since 2.389.6.
     */
    triggerVariant?: 'default' | 'primary' | 'secondary' | 'link';
    /**
     * Tab order of the trigger. Default undefined (a normal tab stop).
     *
     * `-1` is for a menu that lives inside a ROVING-FOCUS list — one trigger per
     * row, forty rows: leaving them all tabbable puts forty stops back in front
     * of everything after the list, which is the cost the roving cursor exists
     * to avoid. The host makes only the cursor row's trigger tabbable.
     */
    triggerTabIndex?: number;
    /** Test hook for the trigger itself; `data-testid` addresses the panel. */
    triggerTestId?: string;
    /**
     * Panel alignment relative to the trigger. 'start' (default) anchors the
     * panel's left edge to the trigger's left edge; 'end' anchors the panel's
     * RIGHT edge to the trigger's right edge.
     */
    align?: 'start' | 'end';
    sections: DropdownMenuSection[];
    /** Optional className for the dropdown panel. */
    className?: string;
    /** Optional testid for the panel. Default 'dropdown-menu'. */
    'data-testid'?: string;
}
export declare function DropdownMenu({ trigger, triggerLabel, triggerTitle, triggerClassName, triggerVariant, triggerTabIndex, triggerTestId, align, sections, className, 'data-testid': testId, }: DropdownMenuProps): import("react").JSX.Element;
export default DropdownMenu;
//# sourceMappingURL=DropdownMenu.d.ts.map