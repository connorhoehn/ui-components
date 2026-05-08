import { useCallback } from 'react';
import { useIdentityContext } from '../contexts/IdentityContext';
import { useIdentityResource } from './useIdentityResource';
import { apiFetch } from './identityApi';
import type {
  IdentityPool,
  CreatePoolInput,
  UpdatePoolInput,
  PoolStats,
} from '../types/identity';

export interface UseIdentityPoolsReturn {
  pools: IdentityPool[];
  loading: boolean;
  error: string | null;
  createPool: (input: CreatePoolInput) => Promise<IdentityPool | null>;
  updatePool: (poolId: string, input: UpdatePoolInput) => Promise<IdentityPool | null>;
  deletePool: (poolId: string) => Promise<void>;
  getStats: () => Promise<PoolStats[]>;
  refresh: () => Promise<void>;
}

export function useIdentityPools(): UseIdentityPoolsReturn {
  const { idToken } = useIdentityContext();
  const { data: pools, loading, error, setData: setPools, refresh, mutate } =
    useIdentityResource<IdentityPool[]>([], { url: '/api/pools' });

  const createPool = useCallback(async (input: CreatePoolInput): Promise<IdentityPool | null> => {
    const pool = await mutate<IdentityPool>('/api/pools', {
      method: 'POST',
      body: JSON.stringify(input),
    });
    if (pool) setPools((prev) => [...prev, pool]);
    return pool;
  }, [mutate, setPools]);

  const updatePool = useCallback(async (poolId: string, input: UpdatePoolInput): Promise<IdentityPool | null> => {
    const pool = await mutate<IdentityPool>(`/api/pools/${poolId}`, {
      method: 'PUT',
      body: JSON.stringify(input),
    });
    if (pool) setPools((prev) => prev.map((p) => (p.poolId === poolId ? pool : p)));
    return pool;
  }, [mutate, setPools]);

  const deletePool = useCallback(async (poolId: string): Promise<void> => {
    const result = await mutate<void>(`/api/pools/${poolId}`, { method: 'DELETE' });
    if (result !== null) setPools((prev) => prev.filter((p) => p.poolId !== poolId));
  }, [mutate, setPools]);

  const getStats = useCallback(async (): Promise<PoolStats[]> => {
    if (!idToken) return [];
    try {
      return await apiFetch<PoolStats[]>('/api/pools/stats', idToken);
    } catch {
      return [];
    }
  }, [idToken]);

  return { pools, loading, error, createPool, updatePool, deletePool, getStats, refresh };
}
