// frontend/src/hooks/useIngestSources.ts
//
// CRUD hook for ingest sources. Fetches from GET /api/ingest/sources and
// exposes create, delete, and triggerSync actions. Uses the same fetch-based
// pattern as other hooks in the project (e.g. useApiHealth).

import { useCallback, useEffect, useRef, useState } from 'react';
import { useIdentityContext } from '../contexts/IdentityContext';
import type { IngestSource } from '../types/ingest';

const BASE_URL = (import.meta.env as Record<string, string>).VITE_SOCIAL_API_URL ?? '';

export interface UseIngestSourcesReturn {
  sources: IngestSource[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  createSource: (data: Omit<IngestSource, 'sourceId' | 'createdAt' | 'updatedAt' | 'lastSyncAt' | 'lastSyncStats'>) => Promise<IngestSource | null>;
  deleteSource: (sourceId: string) => Promise<boolean>;
  triggerSync: (sourceId: string) => Promise<boolean>;
}

export function useIngestSources(): UseIngestSourcesReturn {
  const { idToken } = useIdentityContext();
  const [sources, setSources] = useState<IngestSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cancelledRef = useRef(false);

  const headers = useCallback((): Record<string, string> => {
    const h: Record<string, string> = { 'Content-Type': 'application/json' };
    if (idToken) h['Authorization'] = `Bearer ${idToken}`;
    return h;
  }, [idToken]);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/api/ingest/sources`, { headers: headers() });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const body = await res.json() as { sources?: IngestSource[] };
      if (!cancelledRef.current) {
        setSources(body.sources ?? []);
      }
    } catch (err) {
      if (!cancelledRef.current) {
        setError(err instanceof Error ? err.message : String(err));
      }
    } finally {
      if (!cancelledRef.current) {
        setLoading(false);
      }
    }
  }, [headers]);

  useEffect(() => {
    cancelledRef.current = false;
    void refresh();
    return () => { cancelledRef.current = true; };
  }, [refresh]);

  const createSource = useCallback(async (
    data: Omit<IngestSource, 'sourceId' | 'createdAt' | 'updatedAt' | 'lastSyncAt' | 'lastSyncStats'>,
  ): Promise<IngestSource | null> => {
    try {
      const res = await fetch(`${BASE_URL}/api/ingest/sources`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const created = await res.json() as IngestSource;
      setSources((prev) => [...prev, created]);
      return created;
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      return null;
    }
  }, [headers]);

  const deleteSource = useCallback(async (sourceId: string): Promise<boolean> => {
    try {
      const res = await fetch(`${BASE_URL}/api/ingest/sources/${sourceId}`, {
        method: 'DELETE',
        headers: headers(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSources((prev) => prev.filter((s) => s.sourceId !== sourceId));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      return false;
    }
  }, [headers]);

  const triggerSync = useCallback(async (sourceId: string): Promise<boolean> => {
    try {
      const res = await fetch(`${BASE_URL}/api/ingest/sources/${sourceId}/sync`, {
        method: 'POST',
        headers: headers(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      return false;
    }
  }, [headers]);

  return { sources, loading, error, refresh, createSource, deleteSource, triggerSync };
}
