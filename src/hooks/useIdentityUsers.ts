// Identity users hook — CRUD users within a pool.

import { useState, useEffect, useCallback } from 'react';
import { useIdentityContext } from '../contexts/IdentityContext';
import { apiFetch } from './identityApi';
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
  const { idToken } = useIdentityContext();
  const [users, setUsers] = useState<IdentityUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    if (!idToken || !poolId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch<IdentityUser[]>(`/api/pools/${poolId}/users`, idToken);
      setUsers(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [idToken, poolId]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const createUser = useCallback(async (input: CreateUserInput): Promise<IdentityUser | null> => {
    if (!idToken || !poolId) return null;
    setLoading(true);
    setError(null);
    try {
      const user = await apiFetch<IdentityUser>(`/api/pools/${poolId}/users`, idToken, {
        method: 'POST',
        body: JSON.stringify(input),
      });
      setUsers((prev) => [...prev, user]);
      return user;
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [idToken, poolId]);

  const updateUser = useCallback(async (userId: string, input: UpdateUserInput): Promise<IdentityUser | null> => {
    if (!idToken || !poolId) return null;
    setLoading(true);
    setError(null);
    try {
      const user = await apiFetch<IdentityUser>(`/api/pools/${poolId}/users/${userId}`, idToken, {
        method: 'PUT',
        body: JSON.stringify(input),
      });
      setUsers((prev) => prev.map((u) => (u.userId === userId ? user : u)));
      return user;
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [idToken, poolId]);

  const deleteUser = useCallback(async (userId: string): Promise<void> => {
    if (!idToken || !poolId) return;
    setLoading(true);
    setError(null);
    try {
      await apiFetch<void>(`/api/pools/${poolId}/users/${userId}`, idToken, { method: 'DELETE' });
      setUsers((prev) => prev.filter((u) => u.userId !== userId));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [idToken, poolId]);

  return { users, loading, error, createUser, updateUser, deleteUser, refresh: fetchUsers };
}
