import { cn } from '../../lib/cn';
import { useAgentsContext } from './context/AgentsContext';
import { AgentFlowCanvas } from './components/AgentFlowCanvas';

interface AgentFlowPageProps {
  edges?: { from: string; to: string }[];
  onAgentClick?: (agentId: string) => void;
  className?: string;
}

const DEFAULT_EDGES = [
  { from: 'orgiq-supervisor', to: 'orgiq-search' },
  { from: 'orgiq-supervisor', to: 'orgiq-advisor' },
  { from: 'orgiq-advisor', to: 'orgiq-search' },
  { from: 'orgiq-advisor', to: 'orgiq-scoring' },
  { from: 'orgiq-ingestion', to: 'orgiq-graph-builder' },
  { from: 'orgiq-graph-builder', to: 'orgiq-scoring' },
];

export function AgentFlowPage({ edges = DEFAULT_EDGES, onAgentClick, className }: AgentFlowPageProps) {
  const { agents } = useAgentsContext();

  const a2aAgents = agents.filter((a) => a.protocol === 'a2a');
  const directAgents = agents.filter((a) => a.protocol === 'direct');

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Agent Flow (A2A)</h2>
          <p className="text-xs text-neutral">
            {a2aAgents.length} A2A agents · {directAgents.length} direct agents ·{' '}
            {edges.length} connections
          </p>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-neutral">
          <span className="flex items-center gap-1">
            <span className="w-3 h-0.5 bg-info inline-block" /> A2A (animated)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-0.5 bg-slate-400 inline-block" /> Direct
          </span>
        </div>
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <AgentFlowCanvas
          agents={agents}
          edges={edges}
          onAgentClick={onAgentClick}
        />
      </div>
    </div>
  );
}
