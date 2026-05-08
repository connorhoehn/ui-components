import { useCallback } from 'react';
import { useIdentityResource } from './useIdentityResource';
import type {
  IdentityUser,
  CreateUserInput,
  UpdateUserInput,
} from '../types/identity';

export interface UseIdentityUsersReturn {
  users: IdentityUser[];
  loading: boolean;
  error: string | null;
  createUser: (input: CreateUserInput) => Promise<IdentityUser | null>;
  updateUser: (userId: string, input: UpdateUserInput) => Promise<IdentityUser | null>;
  deleteUser: (userId: string) => Promise<void>;
  refresh: () => Promise<void>;
}

export function useIdentityUsers(poolId: string | null): UseIdentityUsersReturn {
  const { data: users, loading, error, setData: setUsers, refresh, mutate } =
    useIdentityResource<IdentityUser[]>([], {
      url: poolId ? `/api/pools/${poolId}/users` : null,
    });

  const createUser = useCallback(async (input: CreateUserInput): Promise<IdentityUser | null> => {
    const user = await mutate<IdentityUser>(`/api/pools/${poolId}/users`, {
      method: 'POST',
      body: JSON.stringify(input),
    });
    if (user) setUsers((prev) => [...prev, user]);
    return user;
  }, [poolId, mutate, setUsers]);

  const updateUser = useCallback(async (userId: string, input: UpdateUserInput): Promise<IdentityUser | null> => {
    const user = await mutate<IdentityUser>(`/api/pools/${poolId}/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(input),
    });
    if (user) setUsers((prev) => prev.map((u) => (u.userId === userId ? user : u)));
    return user;
  }, [poolId, mutate, setUsers]);

  const deleteUser = useCallback(async (userId: string): Promise<void> => {
    const result = await mutate<void>(`/api/pools/${poolId}/users/${userId}`, { method: 'DELETE' });
    if (result !== null) setUsers((prev) => prev.filter((u) => u.userId !== userId));
  }, [poolId, mutate, setUsers]);

  return { users, loading, error, createUser, updateUser, deleteUser, refresh };
}
