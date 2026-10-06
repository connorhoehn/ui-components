import type { ReactNode } from 'react';
export interface AppShellProps {
    /** Slot: full-height left sidebar (CollapsibleSidebar etc.) */
    sidebar?: ReactNode;
    /**
     * Slot: the header row's content. The shell draws the row itself — a
     * flex row of `headerHeight`, padded, bordered, sticky — so its height is
     * pinned rather than derived from the tallest control in it. Every offset
     * below (the sidebar's top, the body's minimum height) reads that one
     * number, so a taller control can never move the anchors.
     */
    header: ReactNode;
    /**
     * Slot: a second row of chrome under the header — a section band. Sticky
     * with the header, full window width, and the sidebar hangs beneath both.
     * Rendered only when present; its height counts only then.
     */
    subheader?: ReactNode;
    /** Page content */
    children: ReactNode;
    /** Slot: override default ToastProvider region (pass null to suppress) */
    toastRegion?: ReactNode | null;
    /** When truthy, renders a full-screen loading overlay */
    loading?: boolean | ReactNode;
    /** When truthy, renders an API-degraded banner below the header */
    apiDegraded?: ReactNode;
    /**
     * Slot: a global command palette (e.g. `<CommandPalette />`). Rendered
     * once at the shell level so any page can open it via `useCommandPalette`.
     * Wrap the AppShell in `<CommandPaletteProvider>` so the palette and the
     * pages inside share the same registry.
     */
    commandPalette?: ReactNode;
    className?: string;
    /** Width of the sidebar slot in px (default 260) */
    sidebarWidth?: number;
    /** The header row's height in px (default 53). Also published as `--app-shell-header-h`. */
    headerHeight?: number;
    /** The subheader row's height in px (default 36), counted only when `subheader` is present. */
    subheaderHeight?: number;
    /**
     * Left inset of the subheader's content in px, so its tabs can share a
     * left edge with the header's own nav rather than with whatever the
     * sidebar's width happens to be. Default: the header's padding.
     */
    subheaderInset?: number;
    /** Padding around the routed page. `none` for a full-bleed surface. Default `md`. */
    contentPadding?: 'none' | 'md';
    /** Classes for the sidebar column — its padding when open vs folded, say. */
    sidebarClassName?: string;
    /** Accessible name of the sidebar landmark. Default "App sidebar". */
    sidebarLabel?: string;
    sidebarTestId?: string;
    subheaderTestId?: string;
    /**
     * The sidebar runs the full window height and the header row starts beside
     * it (2.386.0) — the collapsed icon strip's layout, where the strip's first
     * button sits in the header row. Default false: the header spans the window
     * and the sidebar hangs below the chrome.
     */
    sidebarFullHeight?: boolean;
}
/**
 * AppShell wraps its children in a ToastProvider by default.
 * Pass `toastRegion={null}` to opt out (e.g. parent already has one).
 */
export declare function AppShell({ sidebar, header, subheader, children, toastRegion, loading, apiDegraded, commandPalette, className, sidebarWidth, headerHeight, subheaderHeight, subheaderInset, contentPadding, sidebarClassName, sidebarLabel, sidebarTestId, subheaderTestId, sidebarFullHeight, }: AppShellProps): import("react").JSX.Element;
export default AppShell;
//# sourceMappingURL=AppShell.d.ts.map