export interface PoolListPageProps {
    pools: Array<{
        poolId: string;
        poolName: string;
        clientId: string;
        createdAt: string;
    }>;
    onCreatePool: () => void;
    onEditPool: (poolId: string) => void;
    onDeletePool: (poolId: string) => Promise<void>;
    onViewPool: (poolId: string) => void;
    loading?: boolean;
}
export declare function PoolListPage({ pools, onCreatePool, onEditPool, onDeletePool, onViewPool, loading, }: PoolListPageProps): import("react").JSX.Element;
//# sourceMappingURL=PoolListPage.d.ts.map