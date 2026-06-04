export interface PoolScopedLayoutProps {
    children: React.ReactNode;
    poolId: string;
    poolName: string;
    activeSection?: 'users' | 'groups' | 'mfa';
    onNavigate: (path: string) => void;
    onBack: () => void;
}
export declare function PoolScopedLayout({ children, poolId, poolName, activeSection, onNavigate, onBack, }: PoolScopedLayoutProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=PoolScopedLayout.d.ts.map