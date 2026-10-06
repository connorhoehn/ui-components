import React from 'react';
export interface DrawerProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    subtitle?: string;
    /**
     * Panel width in pixels. Defaults to 460 floating; docked it defaults to
     * filling its parent, because the column a docked panel sits in is normally
     * already sized by the layout.
     */
    width?: number;
    children: React.ReactNode;
    footer?: React.ReactNode;
    /**
     * Render inline in the layout instead of as an overlay: no portal, no
     * backdrop, no focus trap, no Escape handler. `open={false}` still renders
     * nothing, so the same flag drives both forms.
     *
     * A docked panel is not a dialog — it does not take focus and does not trap
     * it — so it is a `<complementary>` region rather than `role="dialog"`,
     * named by its title (or `aria-label`) the same way.
     */
    docked?: boolean;
    /**
     * Controls beside the close button in the header — a filter toggle, an
     * "open in full page" link. Rendered in both forms.
     */
    actions?: React.ReactNode;
    /** Classes on the panel element itself. */
    className?: string;
    /** Classes on the scrolling body. Overrides its default padding via tw-merge. */
    bodyClassName?: string;
    /** Classes on the header row (e.g. `border-b-0` for a header with no rule under it). Since 2.391.0. */
    headerClassName?: string;
    /** Classes on the title heading (e.g. `text-lg`). Since 2.391.0. */
    titleClassName?: string;
    /** Classes on the footer row. Since 2.391.0. */
    footerClassName?: string;
    /** `data-testid` on the built-in close button. Since 2.391.0. */
    closeTestId?: string;
    /**
     * Accessible name for the dialog when there is no visible `title` to point
     * at. When `title` IS set the heading labels the dialog via
     * `aria-labelledby` and this prop is unnecessary.
     */
    'aria-label'?: string;
    'data-testid'?: string;
    /**
     * Accessible name for the built-in close button. Defaults to `"Close"`.
     * Set this when a host's own tests (or design system) key on a specific
     * label — e.g. `aria-label="Close panel"` — instead of forking the whole
     * component the way a local `Panel.tsx` had to.
     */
    closeLabel?: string;
    /**
     * Dialog semantics for the floating form: `role="dialog"`, `aria-modal`,
     * and Escape closes it (when this is the top overlay layer). `false`
     * drops all three — the panel renders `role="complementary"`, the same
     * non-modal role a docked Drawer uses, and Escape no longer closes it.
     * Ignored when `docked` (already non-modal). Default `true`.
     */
    modal?: boolean;
    /**
     * Tab-trap the panel and move focus into it on open, restoring it on
     * close. `false` leaves focus wherever the host's own handling put it —
     * for a floating panel driven by direct DOM dispatch rather than real
     * keyboard navigation. Ignored when `docked` (never traps). Default
     * `true`.
     */
    trapFocus?: boolean;
    /**
     * Render the dimmed backdrop behind the floating panel, and close on a
     * click through it. `false` renders the panel with nothing behind it —
     * what a local `Panel.tsx` did before Drawer replaced it — and, because
     * there is then no backdrop that should be catching clicks, makes the
     * full-viewport wrapper `pointer-events-none` so the page behind the panel
     * stays usable. Ignored when `docked` (never has one). Default `true`.
     */
    backdrop?: boolean;
}
declare function Drawer({ open, onClose, title, subtitle, width, children, footer, docked, actions, className, bodyClassName, headerClassName, titleClassName, footerClassName, closeTestId, 'aria-label': ariaLabel, 'data-testid': testId, closeLabel, modal, trapFocus, backdrop, }: DrawerProps): React.JSX.Element | null;
export { Drawer };
export default Drawer;
//# sourceMappingURL=Drawer.d.ts.map