export interface AdminDashboardPageProps {
    stats: {
        userPools: number;
        clients: number;
        totalUsers: number;
    };
    pools: Array<{
        poolId: string;
        poolName: string;
        createdAt: string;
    }>;
    onNavigate: (path: string) => void;
    loading?: boolean;
}
export declare function AdminDashboardPage({ stats, pools, onNavigate, loading }: AdminDashboardPageProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=AdminDashboardPage.d.ts.map