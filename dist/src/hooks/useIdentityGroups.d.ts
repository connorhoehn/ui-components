import { IdentityGroup, CreateGroupInput, UpdateGroupInput } from '../types/identity';
export interface UseIdentityGroupsReturn {
    groups: IdentityGroup[];
    loading: boolean;
    error: string | null;
    createGroup: (input: CreateGroupInput) => Promise<IdentityGroup | null>;
    updateGroup: (groupId: string, input: UpdateGroupInput) => Promise<IdentityGroup | null>;
    deleteGroup: (groupId: string) => Promise<void>;
    addMember: (groupId: string, userId: string) => Promise<void>;
    removeMember: (groupId: string, userId: string) => Promise<void>;
    refresh: () => Promise<void>;
}
export declare function useIdentityGroups(poolId: string | null): UseIdentityGroupsReturn;
//# sourceMappingURL=useIdentityGroups.d.ts.map