import type { ReactNode } from 'react';
import { AgentsProvider } from './context/AgentsContext';
import type { AgentDefinition, AgentMetrics } from '../../types/agents';

interface AgentsLayoutProps {
  children: ReactNode;
  agents?: AgentDefinition[];
  metrics?: AgentMetrics[];
  baseUrl?: string;
}

export function AgentsLayout({ children, agents, metrics, baseUrl }: AgentsLayoutProps) {
  return (
    <AgentsProvider agents={agents} metrics={metrics} baseUrl={baseUrl}>
      <div className="flex flex-col h-full">{children}</div>
    </AgentsProvider>
  );
}
