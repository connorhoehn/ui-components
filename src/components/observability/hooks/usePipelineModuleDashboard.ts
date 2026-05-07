// frontend/src/components/observability/hooks/usePipelineModuleDashboard.ts
//
// Polls GET /api/pipelines/dashboard-data — the social-api endpoint that
// passes through `PipelineModule.getDashboardData()` from distributed-core.
// Hook keeps the most recent snapshot, surfaces the source tag (bridge/stub/
// error), and exposes `refresh()` for manual re-fetch.
//
// Lives alongside `usePipelineMetrics` rather than replacing it: that hook
// covers the raw counters (runsStarted etc.), this one covers the
// module-shaped payload (chart definitions, summary KPIs, alerts) the
// frontend can render uniformly across modules without re-deriving shapes.

import { useCallback, useEffect, useRef, useState } from 'react';

const SOCIAL_API_URL = import.meta.env.VITE_SOCIAL_API_URL || '';
const POLL_INTERVAL_MS = 10_000;

export type PipelineModuleDashboardSource = 'bridge' | 'stub' | 'error';

export interface PipelineModuleDashboardSummary {
  totalResources: number;
  healthyResources: number;
  activeConnections: number;
  throughput: number;
}

export interface PipelineModuleDashboardChart {
  title: string;
  type: 'line' | 'bar' | 'pie' | 'gauge';
  data: unknown;
}

export interface PipelineModuleDashboardAlert {
  level: 'info' | 'warning' | 'error' | 'critical';
  message: string;
  timestamp: number;
}

export interface PipelineModuleDashboard {
  moduleId: string;
  moduleName: string;
  state: string;
  summary: PipelineModuleDashboardSummary;
  charts: PipelineModuleDashboardChart[];
  alerts?: PipelineModuleDashboardAlert[];
  source: PipelineModuleDashboardSource;
}

export interface UsePipelineModuleDashboardResult {
  data: PipelineModuleDashboard | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function usePipelineModuleDashboard(): UsePipelineModuleDashboardResult {
  const [data, setData] = useState<PipelineModuleDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cancelledRef = useRef(false);

  const fetchOnce = useCallback(async () => {
    try {
      const res = await fetch(`${SOCIAL_API_URL}/api/pipelines/dashboard-data`, {
        credentials: 'same-origin',
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        const msg = body?.error ?? `HTTP ${res.status}`;
        if (!cancelledRef.current) setError(msg);
        return;
      }
      const body = (await res.json()) as PipelineModuleDashboard;
      if (!cancelledRef.current) {
        setData(body);
        setError(null);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (!cancelledRef.current) setError(msg);
    } finally {
      if (!cancelledRef.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    cancelledRef.current = false;
    void fetchOnce();
    const handle = window.setInterval(() => {
      if (!document.hidden) void fetchOnce();
    }, POLL_INTERVAL_MS);
    return () => {
      cancelledRef.current = true;
      window.clearInterval(handle);
    };
  }, [fetchOnce]);

  return { data, loading, error, refresh: fetchOnce };
}

export default usePipelineModuleDashboard;
