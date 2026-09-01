export interface GroupItem {
    groupId: string;
    name: string;
    description?: string;
    visibility: 'public' | 'private';
    ownerId: string;
    createdAt: string;
}
export interface MemberItem {
    groupId: string;
    userId: string;
    role: 'owner' | 'admin' | 'member';
    joinedAt: string;
    displayName?: string;
    status?: string;
}
export interface UseGroupsOptions {
    idToken: string | null;
}
export interface UseGroupsReturn {
    groups: GroupItem[];
    /**
     * Re-run `GET /api/groups`. Called once on mount (and on every `idToken`
     * change); exposed so a failed load can be retried without a remount.
     */
    refresh: () => Promise<void>;
    /**
     * `false` until the first `GET /api/groups` has settled. Distinguishes
     * "the server says you have no groups" from "we have not asked yet" —
     * without it an empty `groups` array renders the same "No groups yet"
     * empty state in both cases.
     */
    loaded: boolean;
    /**
     * Failure of the list load specifically. Kept separate from `error`, which
     * is whatever the last create/join/invite/… attempt reported: a refused
     * invite must not blank out a list that loaded perfectly well.
     */
    loadError: string | null;
    createGroup: (name: string, description?: string, visibility?: 'public' | 'private') => Promise<void>;
    deleteGroup: (groupId: string) => Promise<void>;
    joinGroup: (groupId: string) => Promise<void>;
    leaveGroup: (groupId: string) => Promise<void>;
    inviteUser: (groupId: string, userId: string) => Promise<void>;
    acceptInvite: (groupId: string, accept: boolean) => Promise<void>;
    loadMembers: (groupId: string) => Promise<void>;
    members: MemberItem[];
    loading: boolean;
    error: string | null;
}
export declare function useGroups({ idToken }: UseGroupsOptions): UseGroupsReturn;
//# sourceMappingURL=useGroups.d.ts.map