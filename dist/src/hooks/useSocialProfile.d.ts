import { GatewayMessage } from '../types/gateway';
export interface ProfileItem {
    userId: string;
    displayName: string;
    bio?: string;
    avatarUrl?: string;
    visibility: 'public' | 'private';
    createdAt: string;
    updatedAt: string;
}
export interface UseSocialProfileOptions {
    idToken: string | null;
}
export interface UseSocialProfileReturn {
    profile: ProfileItem | null;
    loading: boolean;
    error: string | null;
    updateProfile: (updates: Partial<ProfileItem>) => Promise<void>;
    viewProfile: (userId: string) => Promise<ProfileItem | null>;
}
export type OnMessageFn = (handler: (msg: GatewayMessage) => void) => () => void;
export declare function useSocialProfile({ idToken }: UseSocialProfileOptions): UseSocialProfileReturn;
//# sourceMappingURL=useSocialProfile.d.ts.map