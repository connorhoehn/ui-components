export interface PublicProfile {
    userId: string;
    displayName: string;
    avatarUrl?: string;
    visibility: 'public' | 'private';
}
export interface UseFriendsOptions {
    idToken: string | null;
}
export interface UseFriendsReturn {
    followers: PublicProfile[];
    following: PublicProfile[];
    friends: PublicProfile[];
    follow: (userId: string) => Promise<void>;
    unfollow: (userId: string) => Promise<void>;
    loading: boolean;
    error: string | null;
}
export declare function useFriends({ idToken }: UseFriendsOptions): UseFriendsReturn;
//# sourceMappingURL=useFriends.d.ts.map