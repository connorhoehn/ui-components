// frontend/src/hooks/useSourceSloMetrics.ts
//
// Fetches GET /api/ingest/sources/:id/metrics?window= — the per-source
// SLO panel data feed (AGENTIC_ETL_VISION §F).

import { useCallback, useEffect, useState } from 'react';
import { useIdentityContext } from '../contexts/IdentityContext';

const BASE_URL = (import.meta.env as Record<string, string>).VITE_SOCIAL_API_URL ?? '';
const POLL_INTERVAL_MS = 30_000;

export type SloWindow = '15m' | '1h' | '6h' | '24h';

export interface SloPoint {
  at: string;
  value: number | null;
}

export interface SourceSloMetrics {
  sourceId: string;
  window: string;
  bucketSizeMs: number;
  latencyP95: SloPoint[];
  errorRate: SloPoint[];
  queueDepth: SloPoint[];
}

export interface UseSourceSloMetricsResult {
  metrics: SourceSloMetrics | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useSourceSloMetrics(sourceId: string | undefined, window: SloWindow = '1h'): UseSourceSloMetricsResult {
  const { idToken } = useIdentityContext();
  const [metrics, setMetrics] = useState<SourceSloMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!sourceId) return;
    setLoading(true);
    setError(null);
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (idToken) headers['Authorization'] = `Bearer ${idToken}`;
      const res = await fetch(
        `${BASE_URL}/api/ingest/sources/${encodeURIComponent(sourceId)}/metrics?window=${window}`,
        { headers },
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const body = (await res.json()) as SourceSloMetrics;
      setMetrics(body);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [sourceId, window, idToken]);

  useEffect(() => {
    void refresh();
    const handle = globalThis.setInterval(() => {
      if (!document.hidden) void refresh();
    }, POLL_INTERVAL_MS);
    return () => globalThis.clearInterval(handle);
  }, [refresh]);

  return { metrics, loading, error, refresh };
}

export default useSourceSloMetrics;
