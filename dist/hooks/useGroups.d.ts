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