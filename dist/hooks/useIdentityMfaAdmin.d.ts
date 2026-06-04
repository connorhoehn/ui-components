import type { MfaMetrics, IdentityUser, IdentityPool } from '../types/identity';
export interface UseIdentityMfaAdminReturn {
    metrics: MfaMetrics | null;
    users: IdentityUser[];
    pools: IdentityPool[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
}
export declare function useIdentityMfaAdmin(): UseIdentityMfaAdminReturn;
//# sourceMappingURL=useIdentityMfaAdmin.d.ts.map