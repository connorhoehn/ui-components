export interface IdentityAdminLayoutProps {
    children: React.ReactNode;
    activePath?: string;
    adminEmail?: string;
    onNavigate: (path: string) => void;
    onLogout?: () => void;
}
export declare function IdentityAdminLayout({ children, activePath, adminEmail, onNavigate, onLogout, }: IdentityAdminLayoutProps): import("react").JSX.Element;
//# sourceMappingURL=IdentityAdminLayout.d.ts.map