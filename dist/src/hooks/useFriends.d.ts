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
    /**
     * Failure of the three list loads specifically. Kept separate from `error`,
     * which is whatever the last follow/unfollow reported.
     *
     * A caller cannot use `error` to decide between "you follow nobody" and "we
     * never managed to read your graph": a refused *follow* also sets `error`,
     * so keying an error state off it made a rejected button click claim the
     * whole graph had failed to load. Only `loadError` means the lists below are
     * empty because we do not know, not because they are empty.
     */
    loadError: string | null;
}
export declare function useFriends({ idToken }: UseFriendsOptions): UseFriendsReturn;
//# sourceMappingURL=useFriends.d.ts.map