import { useCallback } from 'react';
import { useIdentityResource } from './useIdentityResource';
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
  const { data: groups, loading, error, setData: setGroups, refresh, mutate } =
    useIdentityResource<IdentityGroup[]>([], {
      url: poolId ? `/api/pools/${poolId}/groups` : null,
    });

  const createGroup = useCallback(async (input: CreateGroupInput): Promise<IdentityGroup | null> => {
    const group = await mutate<IdentityGroup>(`/api/pools/${poolId}/groups`, {
      method: 'POST',
      body: JSON.stringify(input),
    });
    if (group) setGroups((prev) => [...prev, group]);
    return group;
  }, [poolId, mutate, setGroups]);

  const updateGroup = useCallback(async (groupId: string, input: UpdateGroupInput): Promise<IdentityGroup | null> => {
    const group = await mutate<IdentityGroup>(`/api/pools/${poolId}/groups/${groupId}`, {
      method: 'PUT',
      body: JSON.stringify(input),
    });
    if (group) setGroups((prev) => prev.map((g) => (g.groupId === groupId ? group : g)));
    return group;
  }, [poolId, mutate, setGroups]);

  const deleteGroup = useCallback(async (groupId: string): Promise<void> => {
    const result = await mutate<void>(`/api/pools/${poolId}/groups/${groupId}`, { method: 'DELETE' });
    if (result !== null) setGroups((prev) => prev.filter((g) => g.groupId !== groupId));
  }, [poolId, mutate, setGroups]);

  const addMember = useCallback(async (groupId: string, userId: string): Promise<void> => {
    const result = await mutate<void>(`/api/pools/${poolId}/groups/${groupId}/members`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
    if (result !== null) {
      setGroups((prev) =>
        prev.map((g) =>
          g.groupId === groupId ? { ...g, members: [...(g.members ?? []), userId] } : g,
        ),
      );
    }
  }, [poolId, mutate, setGroups]);

  const removeMember = useCallback(async (groupId: string, userId: string): Promise<void> => {
    const result = await mutate<void>(`/api/pools/${poolId}/groups/${groupId}/members/${userId}`, {
      method: 'DELETE',
    });
    if (result !== null) {
      setGroups((prev) =>
        prev.map((g) =>
          g.groupId === groupId ? { ...g, members: (g.members ?? []).filter((m) => m !== userId) } : g,
        ),
      );
    }
  }, [poolId, mutate, setGroups]);

  return { groups, loading, error, createGroup, updateGroup, deleteGroup, addMember, removeMember, refresh };
}
