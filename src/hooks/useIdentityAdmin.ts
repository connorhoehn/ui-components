// Identity admin session hook — login, logout, session check.

import { useState, useCallback } from 'react';
import { useIdentityContext } from '../contexts/IdentityContext';
import { apiFetch } from './identityApi';

export interface UseIdentityAdminReturn {
  authenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

export function useIdentityAdmin(): UseIdentityAdminReturn {
  const { idToken } = useIdentityContext();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkSession = useCallback(async () => {
    if (!idToken) {
      setAuthenticated(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await apiFetch<{ authenticated: boolean }>('/api/admin/session', idToken);
      setAuthenticated(true);
    } catch (err) {
      setAuthenticated(false);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [idToken]);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await apiFetch<{ token: string }>('/api/admin/login', idToken, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      setAuthenticated(true);
    } catch (err) {
      setAuthenticated(false);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [idToken]);

  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await apiFetch<void>('/api/admin/logout', idToken, { method: 'POST' });
      setAuthenticated(false);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [idToken]);

  return { authenticated, loading, error, login, logout, checkSession };
}
