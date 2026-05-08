import { useState, useEffect, useCallback } from 'react';
import { useIdentityContext } from '../contexts/IdentityContext';
import { apiFetch } from './identityApi';

export interface UseIdentityResourceOptions {
  url: string | null;
  fetchOnMount?: boolean;
}

export interface UseIdentityResourceReturn<T> {
  data: T;
  loading: boolean;
  error: string | null;
  setData: React.Dispatch<React.SetStateAction<T>>;
  refresh: () => Promise<void>;
  mutate: <R>(url: string, options?: RequestInit) => Promise<R | null>;
}

export function useIdentityResource<T>(
  initialData: T,
  opts: UseIdentityResourceOptions,
): UseIdentityResourceReturn<T> {
  const { idToken } = useIdentityContext();
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!idToken || !opts.url) return;
    setLoading(true);
    setError(null);
    try {
      const result = await apiFetch<T>(opts.url, idToken);
      setData(result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [idToken, opts.url]);

  useEffect(() => {
    if (opts.fetchOnMount !== false) refresh();
  }, [refresh, opts.fetchOnMount]);

  const mutate = useCallback(
    async <R>(url: string, options?: RequestInit): Promise<R | null> => {
      if (!idToken) return null;
      setLoading(true);
      setError(null);
      try {
        return await apiFetch<R>(url, idToken, options);
      } catch (err) {
        setError((err as Error).message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [idToken],
  );

  return { data, loading, error, setData, refresh, mutate };
}
