import { useState, useEffect, useCallback } from 'react';
import type { AgentDefinition } from '../../../types/agents';
import { fixtureAgents } from '../fixtures/agentsFixture';

interface UseAgentRegistryOptions {
  baseUrl?: string;
  pollIntervalMs?: number;
  enabled?: boolean;
}

interface UseAgentRegistryReturn {
  agents: AgentDefinition[];
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAgents = useCallback(async () => {
    if (!baseUrl) {
      setAgents(fixtureAgents);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${baseUrl}/agents`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as AgentDefinition[];
      setAgents(data);
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
    isLoading,
    error,
    refresh: fetchAgents,
    getAgent,
    healthyCount,
    degradedCount,
    offlineCount,
  };
}
