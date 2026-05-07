// Identity groups hook — CRUD groups + member management within a pool.

import { useState, useEffect, useCallback } from 'react';
import { useIdentityContext } from '../contexts/IdentityContext';
import { apiFetch } from './identityApi';
import type {
  IdentityGroup,
  CreateGroupInput,
  UpdateGroupInput,
} from '../types/identity';

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

export function useIdentityGroups(poolId: string | null): UseIdentityGroupsReturn {
  const { idToken } = useIdentityContext();
  const [groups, setGroups] = useState<IdentityGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGroups = useCallback(async () => {
    if (!idToken || !poolId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch<IdentityGroup[]>(`/api/pools/${poolId}/groups`, idToken);
      setGroups(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [idToken, poolId]);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const createGroup = useCallback(async (input: CreateGroupInput): Promise<IdentityGroup | null> => {
    if (!idToken || !poolId) return null;
    setLoading(true);
    setError(null);
    try {
      const group = await apiFetch<IdentityGroup>(`/api/pools/${poolId}/groups`, idToken, {
        method: 'POST',
        body: JSON.stringify(input),
      });
      setGroups((prev) => [...prev, group]);
      return group;
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [idToken, poolId]);

  const updateGroup = useCallback(async (groupId: string, input: UpdateGroupInput): Promise<IdentityGroup | null> => {
    if (!idToken || !poolId) return null;
    setLoading(true);
    setError(null);
    try {
      const group = await apiFetch<IdentityGroup>(`/api/pools/${poolId}/groups/${groupId}`, idToken, {
        method: 'PUT',
        body: JSON.stringify(input),
      });
      setGroups((prev) => prev.map((g) => (g.groupId === groupId ? group : g)));
      return group;
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [idToken, poolId]);

  const deleteGroup = useCallback(async (groupId: string): Promise<void> => {
    if (!idToken || !poolId) return;
    setLoading(true);
    setError(null);
    try {
      await apiFetch<void>(`/api/pools/${poolId}/groups/${groupId}`, idToken, { method: 'DELETE' });
      setGroups((prev) => prev.filter((g) => g.groupId !== groupId));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [idToken, poolId]);

  const addMember = useCallback(async (groupId: string, userId: string): Promise<void> => {
    if (!idToken || !poolId) return;
    setError(null);
    try {
      await apiFetch<void>(`/api/pools/${poolId}/groups/${groupId}/members`, idToken, {
        method: 'POST',
        body: JSON.stringify({ userId }),
      });
      setGroups((prev) =>
        prev.map((g) =>
          g.groupId === groupId
            ? { ...g, members: [...(g.members ?? []), userId] }
            : g,
        ),
      );
    } catch (err) {
      setError((err as Error).message);
    }
  }, [idToken, poolId]);

  const removeMember = useCallback(async (groupId: string, userId: string): Promise<void> => {
    if (!idToken || !poolId) return;
    setError(null);
    try {
      await apiFetch<void>(`/api/pools/${poolId}/groups/${groupId}/members/${userId}`, idToken, {
        method: 'DELETE',
      });
      setGroups((prev) =>
        prev.map((g) =>
          g.groupId === groupId
            ? { ...g, members: (g.members ?? []).filter((m) => m !== userId) }
            : g,
        ),
      );
    } catch (err) {
      setError((err as Error).message);
    }
  }, [idToken, poolId]);

  return { groups, loading, error, createGroup, updateGroup, deleteGroup, addMember, removeMember, refresh: fetchGroups };
}
