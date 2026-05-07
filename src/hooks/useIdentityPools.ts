// Identity pools hook — CRUD user pools.

import { useState, useEffect, useCallback } from 'react';
import { useIdentityContext } from '../contexts/IdentityContext';
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
  const [pools, setPools] = useState<IdentityPool[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPools = useCallback(async () => {
    if (!idToken) return;
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch<IdentityPool[]>('/api/pools', idToken);
      setPools(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [idToken]);

  useEffect(() => {
    fetchPools();
  }, [fetchPools]);

  const createPool = useCallback(async (input: CreatePoolInput): Promise<IdentityPool | null> => {
    if (!idToken) return null;
    setLoading(true);
    setError(null);
    try {
      const pool = await apiFetch<IdentityPool>('/api/pools', idToken, {
        method: 'POST',
        body: JSON.stringify(input),
      });
      setPools((prev) => [...prev, pool]);
      return pool;
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [idToken]);

  const updatePool = useCallback(async (poolId: string, input: UpdatePoolInput): Promise<IdentityPool | null> => {
    if (!idToken) return null;
    setLoading(true);
    setError(null);
    try {
      const pool = await apiFetch<IdentityPool>(`/api/pools/${poolId}`, idToken, {
        method: 'PUT',
        body: JSON.stringify(input),
      });
      setPools((prev) => prev.map((p) => (p.poolId === poolId ? pool : p)));
      return pool;
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [idToken]);

  const deletePool = useCallback(async (poolId: string): Promise<void> => {
    if (!idToken) return;
    setLoading(true);
    setError(null);
    try {
      await apiFetch<void>(`/api/pools/${poolId}`, idToken, { method: 'DELETE' });
      setPools((prev) => prev.filter((p) => p.poolId !== poolId));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [idToken]);

  const getStats = useCallback(async (): Promise<PoolStats[]> => {
    if (!idToken) return [];
    try {
      return await apiFetch<PoolStats[]>('/api/pools/stats', idToken);
    } catch (err) {
      setError((err as Error).message);
      return [];
    }
  }, [idToken]);

  return { pools, loading, error, createPool, updatePool, deletePool, getStats, refresh: fetchPools };
}
