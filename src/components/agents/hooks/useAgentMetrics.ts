import { useState, useEffect, useCallback, useMemo } from 'react';
import type { AgentMetrics } from '../../../types/agents';
import { fixtureMetrics } from '../fixtures/agentsFixture';

interface UseAgentMetricsOptions {
  baseUrl?: string;
  agentId?: string;
  pollIntervalMs?: number;
  enabled?: boolean;
}

interface UseAgentMetricsReturn {
  metrics: AgentMetrics[];
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    if (!baseUrl) {
      setMetrics(fixtureMetrics);
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
      setMetrics(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch metrics');
    } finally {
      setIsLoading(false);
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
    isLoading,
    error,
    refresh: fetchMetrics,
    getMetricsForAgent,
    totalInvocations24h,
    totalErrors24h,
    avgLatencyMs,
  };
}
