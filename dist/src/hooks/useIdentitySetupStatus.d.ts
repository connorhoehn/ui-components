import type { SetupStatus } from '../types/identity';
export interface UseIdentitySetupStatusReturn {
    status: SetupStatus | null;
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
}
export declare function useIdentitySetupStatus(): UseIdentitySetupStatusReturn;
//# sourceMappingURL=useIdentitySetupStatus.d.ts.map