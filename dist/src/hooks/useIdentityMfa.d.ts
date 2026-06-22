import { MfaDevice, MfaSetupResult } from '../types/identity';
export interface UseIdentityMfaReturn {
    devices: MfaDevice[];
    loading: boolean;
    error: string | null;
    setupDevice: (poolId: string, userId: string, deviceName: string) => Promise<MfaSetupResult | null>;
    verifySetup: (poolId: string, userId: string, deviceId: string, code: string) => Promise<boolean>;
    renameDevice: (poolId: string, userId: string, deviceId: string, newName: string) => Promise<void>;
    removeDevice: (poolId: string, userId: string, deviceId: string) => Promise<void>;
    refresh: (poolId: string, userId: string) => Promise<void>;
}
export declare function useIdentityMfa(): UseIdentityMfaReturn;
//# sourceMappingURL=useIdentityMfa.d.ts.map