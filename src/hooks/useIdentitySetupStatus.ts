// Identity setup status hook — fetches the setup guide status.

import { useState, useEffect, useCallback } from 'react';
import { useIdentityContext } from '../contexts/IdentityContext';
import { apiFetch } from './identityApi';
import type { SetupStatus } from '../types/identity';

export interface UseIdentitySetupStatusReturn {
  status: SetupStatus | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useIdentitySetupStatus(): UseIdentitySetupStatusReturn {
  const { idToken } = useIdentityContext();
  const [status, setStatus] = useState<SetupStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    if (!idToken) return;
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch<SetupStatus>('/api/admin/setup-status', idToken);
      setStatus(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [idToken]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  return { status, loading, error, refresh: fetchStatus };
}
