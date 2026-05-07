// frontend/src/hooks/useIngestDLQ.ts
//
// Polls GET /api/ingest/dlq for failed ingest items sitting in the
// dead-letter queue. AGENTIC_ETL_VISION slice I — operators replay or
// purge from the UI instead of grepping logs.

import { useCallback, useEffect, useState } from 'react';
import { useIdentityContext } from '../contexts/IdentityContext';

const BASE_URL = (import.meta.env as Record<string, string>).VITE_SOCIAL_API_URL ?? '';
const POLL_INTERVAL_MS = 30_000;

export interface DLQEntryRow {
  /** Envelope id — primary key for replay / purge. */
  id: string;
  /** Failed payload, T-untyped. The page renders a few well-known fields. */
  envelope: { id?: string; body?: unknown };
  lastError: string;
  failedAtMs: number;
  totalAttempts: number;
}

export interface UseIngestDLQResult {
  entries: DLQEntryRow[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  replay: (id: string) => Promise<void>;
  drop: (id: string) => Promise<void>;
}

export function useIngestDLQ(): UseIngestDLQResult {
  const { idToken } = useIdentityContext();
  const [entries, setEntries] = useState<DLQEntryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const headers = useCallback((): Record<string, string> => {
    const h: Record<string, string> = { 'Content-Type': 'application/json' };
    if (idToken) h['Authorization'] = `Bearer ${idToken}`;
    return h;
  }, [idToken]);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/api/ingest/dlq`, { headers: headers() });
      if (!res.ok) {
        if (res.status === 503) {
          setError('Ingest DLQ is not initialized yet. Start a sync to populate it.');
          setEntries([]);
          return;
        }
        throw new Error(`HTTP ${res.status}`);
      }
      const body = (await res.json()) as { items: DLQEntryRow[] };
      setEntries(body.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [headers]);

  useEffect(() => {
    void refresh();
    const handle = window.setInterval(() => {
      if (!document.hidden) void refresh();
    }, POLL_INTERVAL_MS);
    return () => window.clearInterval(handle);
  }, [refresh]);

  const replay = useCallback(
    async (id: string) => {
      const res = await fetch(`${BASE_URL}/api/ingest/dlq/${encodeURIComponent(id)}/replay`, {
        method: 'POST',
        headers: headers(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await refresh();
    },
    [headers, refresh],
  );

  const drop = useCallback(
    async (id: string) => {
      const res = await fetch(`${BASE_URL}/api/ingest/dlq/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: headers(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await refresh();
    },
    [headers, refresh],
  );

  return { entries, loading, error, refresh, replay, drop };
}

export default useIngestDLQ;
