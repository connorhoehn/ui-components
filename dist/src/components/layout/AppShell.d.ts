import { ReactNode } from 'react';
export interface AppShellProps {
    /** Slot: full-height left sidebar (CollapsibleSidebar etc.) */
    sidebar?: ReactNode;
    /** Slot: fixed top header bar */
    header: ReactNode;
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
}
/**
 * AppShell wraps its children in a ToastProvider by default.
 * Pass `toastRegion={null}` to opt out (e.g. parent already has one).
 */
export declare function AppShell({ sidebar, header, children, toastRegion, loading, apiDegraded, commandPalette, className, sidebarWidth, }: AppShellProps): import("react").JSX.Element;
export default AppShell;
//# sourceMappingURL=AppShell.d.ts.map