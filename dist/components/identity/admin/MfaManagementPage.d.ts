export interface MfaManagementPageProps {
    metrics?: {
        totalUsers: number;
        mfaEnabled: number;
        mfaDisabled: number;
        adoptionRate: number;
    };
    users?: Array<{
        userId: string;
        email: string;
        mfaEnabled: boolean;
        deviceCount: number;
    }>;
    pools?: Array<{
        poolId: string;
        poolName: string;
        userCount: number;
    }>;
    onRefresh: () => void;
    loading?: boolean;
}
export declare function MfaManagementPage({ metrics, users, pools, onRefresh, loading, }: MfaManagementPageProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=MfaManagementPage.d.ts.map