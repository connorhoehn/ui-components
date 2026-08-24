import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react';
import type {
  AgentDefinition,
  AgentMetrics,
  AgUiSession,
  A2ASession,
} from '../../../types/agents';
import { fixtureAgents, fixtureMetrics } from '../fixtures/agentsFixture';

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
}

const AgentsContext = createContext<AgentsContextValue | null>(null);

interface AgentsProviderProps {
  children: ReactNode;
  agents?: AgentDefinition[];
  metrics?: AgentMetrics[];
  baseUrl?: string;
}

export function AgentsProvider({
  children,
  agents: initialAgents,
  metrics: initialMetrics,
  baseUrl: _baseUrl,
}: AgentsProviderProps) {
  const [agents, setAgents] = useState<AgentDefinition[]>(initialAgents ?? fixtureAgents);
  const [metrics, setMetrics] = useState<AgentMetrics[]>(initialMetrics ?? fixtureMetrics);
  const [sessions, setSessions] = useState<AgUiSession[]>([]);
  const [a2aSessions, setA2aSessions] = useState<A2ASession[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

  useEffect(() => {
    if (initialAgents) setAgents(initialAgents);
  }, [initialAgents]);

  useEffect(() => {
    if (initialMetrics) setMetrics(initialMetrics);
  }, [initialMetrics]);

  const refreshAgents = useCallback(() => {
    setAgents(initialAgents ?? fixtureAgents);
    setMetrics(initialMetrics ?? fixtureMetrics);
  }, [initialAgents, initialMetrics]);

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
