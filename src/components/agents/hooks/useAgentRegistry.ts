import { useState, useEffect, useCallback } from 'react';
import type { AgentDefinition } from '../../../types/agents';
import { fixtureAgents } from '../fixtures/agentsFixture';

interface UseAgentRegistryOptions {
  baseUrl?: string;
  pollIntervalMs?: number;
  enabled?: boolean;
}

/**
 * Where `agents` came from. Mirrors the `source` discriminator that
 * `usePipelineMetrics` already exposes in `/observability`.
 *
 * This hook seeds state with `fixtureAgents` and keeps them when no
 * `baseUrl` is configured or when a fetch fails — so without this tag a
 * consumer cannot tell a real, healthy registry from synthetic sample data.
 * A failed fetch previously surfaced `error` while still rendering
 * plausible-looking fake agents.
 */
export type AgentRegistrySource = 'fixture' | 'remote';

interface UseAgentRegistryReturn {
  agents: AgentDefinition[];
  /** `'fixture'` means `agents` is synthetic sample data — surface that in the UI. */
  source: AgentRegistrySource;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
  getAgent: (id: string) => AgentDefinition | undefined;
  healthyCount: number;
  degradedCount: number;
  offlineCount: number;
}

export function useAgentRegistry({
  baseUrl,
  pollIntervalMs = 30000,
  enabled = true,
}: UseAgentRegistryOptions = {}): UseAgentRegistryReturn {
  const [agents, setAgents] = useState<AgentDefinition[]>(fixtureAgents);
  const [source, setSource] = useState<AgentRegistrySource>('fixture');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAgents = useCallback(async () => {
    if (!baseUrl) {
      setAgents(fixtureAgents);
      setSource('fixture');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${baseUrl}/agents`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as AgentDefinition[];
      setAgents(data);
      setSource('remote');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch agents');
    } finally {
      setIsLoading(false);
    }
  }, [baseUrl]);

  useEffect(() => {
    if (!enabled) return;
    fetchAgents();

    if (!baseUrl || pollIntervalMs <= 0) return;
    const interval = setInterval(fetchAgents, pollIntervalMs);
    return () => clearInterval(interval);
  }, [enabled, fetchAgents, baseUrl, pollIntervalMs]);

  const getAgent = useCallback(
    (id: string) => agents.find((a) => a.id === id),
    [agents],
  );

  const healthyCount = agents.filter((a) => a.status === 'healthy').length;
  const degradedCount = agents.filter((a) => a.status === 'degraded').length;
  const offlineCount = agents.filter((a) => a.status === 'offline').length;

  return {
    agents,
    source,
    isLoading,
    error,
    refresh: fetchAgents,
    getAgent,
    healthyCount,
    degradedCount,
    offlineCount,
  };
}
