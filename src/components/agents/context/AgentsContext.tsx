import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';
import type {
  AgentDefinition,
  AgentMetrics,
  AgUiSession,
  A2ASession,
} from '../../../types/agents';
import { fixtureAgents, fixtureMetrics } from '../fixtures/agentsFixture';

/**
 * Where the provider's `agents` / `metrics` actually came from.
 *
 * Same discriminator `useAgentRegistry` exposes as `AgentRegistrySource` and
 * `useAgentMetrics` as `AgentMetricsSource`, with one extra member those hooks
 * don't need: the provider also accepts `agents` / `metrics` PROPS, which are
 * real host data and must not be labelled `'fixture'`.
 *
 * - `'provided'` — the host passed the array in as a prop.
 * - `'remote'`   — fetched from `baseUrl`.
 * - `'fixture'`  — synthetic sample data from `agentsFixture`. Shown when no
 *                  `baseUrl` is configured, before the first fetch settles,
 *                  and when a fetch fails. **Surface this in the UI.** Before
 *                  v2.90 the provider accepted `baseUrl` and discarded it, so
 *                  `AgentsDashboardPage` rendered invented invocation counts
 *                  and health badges that were indistinguishable from a live
 *                  fleet.
 */
export type AgentsSource = 'fixture' | 'remote' | 'provided';

interface AgentsContextValue {
  agents: AgentDefinition[];
  metrics: AgentMetrics[];
  sessions: AgUiSession[];
  a2aSessions: A2ASession[];
  selectedAgentId: string | null;
  selectAgent: (id: string | null) => void;
  refreshAgents: () => void;
  getAgent: (id: string) => AgentDefinition | undefined;
  getMetrics: (agentId: string) => AgentMetrics | undefined;
  /** Provenance of `agents`. `'fixture'` means synthetic sample data. */
  agentsSource: AgentsSource;
  /** Provenance of `metrics`. `'fixture'` means synthetic sample data. */
  metricsSource: AgentsSource;
  /** True while a `baseUrl` fetch is in flight. */
  isLoading: boolean;
  /** Last fetch failure. Non-null with a `'fixture'` source means the live data is unavailable. */
  error: string | null;
}

const AgentsContext = createContext<AgentsContextValue | null>(null);

interface AgentsProviderProps {
  children: ReactNode;
  agents?: AgentDefinition[];
  metrics?: AgentMetrics[];
  /**
   * Base URL of the agent registry. When set, the provider fetches
   * `GET {baseUrl}/agents` and `GET {baseUrl}/agents/metrics` on mount —
   * matching the endpoints `useAgentRegistry` / `useAgentMetrics` already
   * call — and flips the matching `*Source` to `'remote'`.
   *
   * Ignored for whichever of `agents` / `metrics` was passed as a prop:
   * an explicit host-supplied array always wins over a fetch.
   */
  baseUrl?: string;
}

export function AgentsProvider({
  children,
  agents: initialAgents,
  metrics: initialMetrics,
  baseUrl,
}: AgentsProviderProps) {
  const [agents, setAgents] = useState<AgentDefinition[]>(initialAgents ?? fixtureAgents);
  const [metrics, setMetrics] = useState<AgentMetrics[]>(initialMetrics ?? fixtureMetrics);
  const [sessions, setSessions] = useState<AgUiSession[]>([]);
  const [a2aSessions, setA2aSessions] = useState<A2ASession[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [agentsSource, setAgentsSource] = useState<AgentsSource>(
    initialAgents ? 'provided' : 'fixture',
  );
  const [metricsSource, setMetricsSource] = useState<AgentsSource>(
    initialMetrics ? 'provided' : 'fixture',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Monotonic request id, not a boolean each effect run resets. `baseUrl` can
  // change while a fetch is in flight (host switching environments), and a
  // shared flag lets the cleanup's "cancelled" be immediately un-set by the
  // next run — so the slower response wins whichever order it was issued in.
  const requestIdRef = useRef(0);

  useEffect(() => {
    if (initialAgents) {
      setAgents(initialAgents);
      setAgentsSource('provided');
    }
  }, [initialAgents]);

  useEffect(() => {
    if (initialMetrics) {
      setMetrics(initialMetrics);
      setMetricsSource('provided');
    }
  }, [initialMetrics]);

  const fetchRemote = useCallback(async () => {
    // Nothing to fetch: no endpoint, or the host supplied both arrays itself.
    if (!baseUrl || (initialAgents && initialMetrics)) return;

    const requestId = ++requestIdRef.current;
    const isCurrent = () => requestIdRef.current === requestId;

    setIsLoading(true);
    setError(null);

    const readJson = async <T,>(path: string): Promise<T> => {
      const res = await fetch(`${baseUrl}${path}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json()) as T;
    };

    const failures: string[] = [];

    if (!initialAgents) {
      try {
        const data = await readJson<AgentDefinition[]>('/agents');
        if (isCurrent()) {
          setAgents(data);
          setAgentsSource('remote');
        }
      } catch (err: unknown) {
        failures.push(err instanceof Error ? err.message : 'Failed to fetch agents');
      }
    }

    if (!initialMetrics) {
      try {
        const data = await readJson<AgentMetrics[]>('/agents/metrics');
        if (isCurrent()) {
          setMetrics(data);
          setMetricsSource('remote');
        }
      } catch (err: unknown) {
        failures.push(err instanceof Error ? err.message : 'Failed to fetch metrics');
      }
    }

    if (isCurrent()) {
      // A failure deliberately leaves the source at whatever it was — usually
      // `'fixture'` — so the UI can say the numbers on screen are not real.
      if (failures.length > 0) setError(failures.join('; '));
      setIsLoading(false);
    }
  }, [baseUrl, initialAgents, initialMetrics]);

  useEffect(() => {
    void fetchRemote();
    return () => {
      // Retire anything in flight so a superseded run can never write.
      requestIdRef.current += 1;
    };
  }, [fetchRemote]);

  const refreshAgents = useCallback(() => {
    if (baseUrl) {
      void fetchRemote();
      return;
    }
    setAgents(initialAgents ?? fixtureAgents);
    setMetrics(initialMetrics ?? fixtureMetrics);
    setAgentsSource(initialAgents ? 'provided' : 'fixture');
    setMetricsSource(initialMetrics ? 'provided' : 'fixture');
  }, [baseUrl, fetchRemote, initialAgents, initialMetrics]);

  const selectAgent = useCallback((id: string | null) => {
    setSelectedAgentId(id);
  }, []);

  const getAgent = useCallback(
    (id: string) => agents.find((a) => a.id === id),
    [agents],
  );

  const getMetrics = useCallback(
    (agentId: string) => metrics.find((m) => m.agentId === agentId),
    [metrics],
  );

  // Suppress unused setter warnings — these are wired up by hooks
  void setSessions;
  void setA2aSessions;

  // Memoised: without this, every re-render of whatever renders
  // <AgentsProvider> handed a brand-new object to every `useAgentsContext()`
  // consumer (agent directory rows, chat panel, metrics cards), re-rendering
  // all of them even when nothing about the agents actually changed.
  const value = useMemo<AgentsContextValue>(
    () => ({
      agents,
      metrics,
      sessions,
      a2aSessions,
      selectedAgentId,
      selectAgent,
      refreshAgents,
      getAgent,
      getMetrics,
      agentsSource,
      metricsSource,
      isLoading,
      error,
    }),
    [
      agents,
      metrics,
      sessions,
      a2aSessions,
      selectedAgentId,
      selectAgent,
      refreshAgents,
      getAgent,
      getMetrics,
      agentsSource,
      metricsSource,
      isLoading,
      error,
    ],
  );

  return (
    <AgentsContext.Provider value={value}>
      {children}
    </AgentsContext.Provider>
  );
}

export function useAgentsContext(): AgentsContextValue {
  const ctx = useContext(AgentsContext);
  if (!ctx) throw new Error('useAgentsContext must be used within AgentsProvider');
  return ctx;
}
