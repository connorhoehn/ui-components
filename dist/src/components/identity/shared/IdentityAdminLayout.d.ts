export interface IdentityAdminLayoutProps {
    children: React.ReactNode;
    activePath?: string;
    adminEmail?: string;
    onNavigate: (path: string) => void;
    onLogout?: () => void;
    /**
     * Whether the sidebar starts open. Optional and **initial-only** — the
     * layout still owns the state afterwards, so the header toggle keeps
     * working. Omit it and the sidebar starts open, which is the historical
     * behaviour.
     *
     * It exists because the collapsed rail was previously reachable only by
     * clicking the toggle: a host cannot restore the user's saved preference
     * on mount, a story cannot show the collapsed chrome, and a test has to
     * click before it can assert on it.
     */
    defaultSidebarOpen?: boolean;
}
export declare function IdentityAdminLayout({ children, activePath, adminEmail, onNavigate, onLogout, defaultSidebarOpen, }: IdentityAdminLayoutProps): import("react").JSX.Element;
//# sourceMappingURL=IdentityAdminLayout.d.ts.map