import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import type { AgentMetrics } from '../../../types/agents';
import { fixtureMetrics } from '../fixtures/agentsFixture';

interface UseAgentMetricsOptions {
  baseUrl?: string;
  agentId?: string;
  pollIntervalMs?: number;
  enabled?: boolean;
}

/**
 * Where `metrics` came from — same discriminator `useAgentRegistry` exposes
 * as `AgentRegistrySource`.
 *
 * This hook seeds state with `fixtureMetrics` and keeps them when no
 * `baseUrl` is configured or when the first fetch fails. Without this tag
 * `AgentsDashboardPage` renders "Invocations (24h): 22,290" and an average
 * latency in the same type as it would for a live registry — an operator
 * looking at a dashboard whose backend is down cannot tell the difference
 * between a healthy fleet and invented numbers.
 */
export type AgentMetricsSource = 'fixture' | 'remote';

interface UseAgentMetricsReturn {
  metrics: AgentMetrics[];
  /** `'fixture'` means `metrics` is synthetic sample data — surface that in the UI. */
  source: AgentMetricsSource;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
  getMetricsForAgent: (id: string) => AgentMetrics | undefined;
  totalInvocations24h: number;
  totalErrors24h: number;
  avgLatencyMs: number;
}

export function useAgentMetrics({
  baseUrl,
  agentId,
  pollIntervalMs = 60000,
  enabled = true,
}: UseAgentMetricsOptions = {}): UseAgentMetricsReturn {
  const [metrics, setMetrics] = useState<AgentMetrics[]>(fixtureMetrics);
  const [source, setSource] = useState<AgentMetricsSource>('fixture');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Monotonic request id. `baseUrl`/`agentId` can change while a fetch is in
  // flight — switching the detail page from agent A to agent B — and without
  // this the slower response wins whichever order it lands in, so B's page
  // shows A's invocation counts.
  const requestIdRef = useRef(0);

  const fetchMetrics = useCallback(async () => {
    const requestId = ++requestIdRef.current;
    const isCurrent = () => requestIdRef.current === requestId;

    if (!baseUrl) {
      setMetrics(fixtureMetrics);
      setSource('fixture');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const endpoint = agentId
        ? `${baseUrl}/agents/${agentId}/metrics`
        : `${baseUrl}/agents/metrics`;
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as AgentMetrics[];
      if (!isCurrent()) return;
      setMetrics(data);
      setSource('remote');
    } catch (err: unknown) {
      if (!isCurrent()) return;
      setError(err instanceof Error ? err.message : 'Failed to fetch metrics');
    } finally {
      if (isCurrent()) setIsLoading(false);
    }
  }, [baseUrl, agentId]);

  useEffect(() => {
    if (!enabled) return;
    fetchMetrics();

    if (!baseUrl || pollIntervalMs <= 0) return;
    const interval = setInterval(fetchMetrics, pollIntervalMs);
    return () => clearInterval(interval);
  }, [enabled, fetchMetrics, baseUrl, pollIntervalMs]);

  const getMetricsForAgent = useCallback(
    (id: string) => metrics.find((m) => m.agentId === id),
    [metrics],
  );

  const totalInvocations24h = useMemo(
    () => metrics.reduce((sum, m) => sum + m.invocationsLast24h, 0),
    [metrics],
  );

  const totalErrors24h = useMemo(
    () => metrics.reduce((sum, m) => sum + m.errorsLast24h, 0),
    [metrics],
  );

  const avgLatencyMs = useMemo(() => {
    if (metrics.length === 0) return 0;
    return Math.round(metrics.reduce((sum, m) => sum + m.avgLatencyMs, 0) / metrics.length);
  }, [metrics]);

  return {
    metrics,
    source,
    isLoading,
    error,
    refresh: fetchMetrics,
    getMetricsForAgent,
    totalInvocations24h,
    totalErrors24h,
    avgLatencyMs,
  };
}
