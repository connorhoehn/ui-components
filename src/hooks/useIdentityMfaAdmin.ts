import { useState, useCallback } from 'react';
import { useIdentityContext } from '../contexts/IdentityContext';
import { apiFetch } from './identityApi';
import type { MfaMetrics, IdentityUser, IdentityPool } from '../types/identity';

export interface UseIdentityMfaAdminReturn {
  metrics: MfaMetrics | null;
  users: IdentityUser[];
  pools: IdentityPool[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useIdentityMfaAdmin(): UseIdentityMfaAdminReturn {
  const { idToken } = useIdentityContext();
  const [metrics, setMetrics] = useState<MfaMetrics | null>(null);
  const [users, setUsers] = useState<IdentityUser[]>([]);
  const [pools, setPools] = useState<IdentityPool[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!idToken) return;
    setLoading(true);
    setError(null);
    try {
      const [metricsData, usersData, poolsData] = await Promise.all([
        apiFetch<MfaMetrics>('/api/admin/mfa/metrics', idToken),
        apiFetch<IdentityUser[]>('/api/admin/mfa/users', idToken),
        apiFetch<IdentityPool[]>('/api/admin/mfa/pools', idToken),
      ]);
      setMetrics(metricsData);
      setUsers(usersData);
      setPools(poolsData);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [idToken]);

  return { metrics, users, pools, loading, error, refresh };
}
