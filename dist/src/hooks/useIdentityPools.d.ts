import { IdentityPool, CreatePoolInput, UpdatePoolInput, PoolStats } from '../types/identity';
export interface UseIdentityPoolsReturn {
    pools: IdentityPool[];
    loading: boolean;
    error: string | null;
    createPool: (input: CreatePoolInput) => Promise<IdentityPool | null>;
    updatePool: (poolId: string, input: UpdatePoolInput) => Promise<IdentityPool | null>;
    deletePool: (poolId: string) => Promise<void>;
    getStats: () => Promise<PoolStats[]>;
    refresh: () => Promise<void>;
}
export declare function useIdentityPools(): UseIdentityPoolsReturn;
//# sourceMappingURL=useIdentityPools.d.ts.map