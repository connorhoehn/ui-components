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
        /**
         * Pool the user belongs to. Optional and additive.
         *
         * The "Filter by pool" control is only rendered when at least one row
         * carries this, because without it the page has no way to tell which pool
         * a row belongs to — which is exactly why the control used to be inert.
         */
        poolId?: string;
    }>;
    pools?: Array<{
        poolId: string;
        poolName: string;
        userCount: number;
    }>;
    onRefresh: () => void;
    loading?: boolean;
}
export declare function MfaManagementPage({ metrics, users, pools, onRefresh, loading, }: MfaManagementPageProps): import("react").JSX.Element;
//# sourceMappingURL=MfaManagementPage.d.ts.map