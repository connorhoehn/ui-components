import type { IdentityUser, CreateUserInput, UpdateUserInput } from '../types/identity';
export interface UseIdentityUsersReturn {
    users: IdentityUser[];
    loading: boolean;
    error: string | null;
    createUser: (input: CreateUserInput) => Promise<IdentityUser | null>;
    updateUser: (userId: string, input: UpdateUserInput) => Promise<IdentityUser | null>;
    deleteUser: (userId: string) => Promise<void>;
    refresh: () => Promise<void>;
}
export declare function useIdentityUsers(poolId: string | null): UseIdentityUsersReturn;
//# sourceMappingURL=useIdentityUsers.d.ts.map