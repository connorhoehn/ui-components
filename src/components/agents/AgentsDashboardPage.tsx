import { cn } from '../../lib/cn';
import { useAgentsContext } from './context/AgentsContext';
import { AgentCard } from './components/AgentCard';
import { GuardrailBadge } from './components/GuardrailBadge';

interface AgentsDashboardPageProps {
  onAgentClick?: (agentId: string) => void;
  className?: string;
}

export function AgentsDashboardPage({ onAgentClick, className }: AgentsDashboardPageProps) {
  const { agents, metrics } = useAgentsContext();

  const healthy = agents.filter((a) => a.status === 'healthy').length;
  const degraded = agents.filter((a) => a.status === 'degraded').length;
  const offline = agents.filter((a) => a.status === 'offline').length;
  const totalInvocations = agents.reduce((sum, a) => sum + (a.invocationsLast24h ?? 0), 0);
  const avgLatency = agents.filter((a) => a.avgLatencyMs).length > 0
    ? Math.round(agents.reduce((sum, a) => sum + (a.avgLatencyMs ?? 0), 0) / agents.filter((a) => a.avgLatencyMs).length)
    : 0;

  const allGuardrails = [...new Set(agents.flatMap((a) => a.guardrails))];

  return (
    <div className={cn('space-y-6', className)}>
      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <StatCard label="Total Agents" value={agents.length} />
        <StatCard label="Healthy" value={healthy} color="emerald" />
        <StatCard label="Degraded" value={degraded} color="amber" />
        <StatCard label="Offline" value={offline} color="red" />
        <StatCard label="Invocations (24h)" value={totalInvocations} />
      </div>

      {/* Global info row */}
      <div className="flex items-center justify-between px-1">
        <div className="text-xs text-neutral">
          Avg latency: <span className="font-medium text-slate-700">{avgLatency}ms</span>
          {' · '}
          Metrics tracked: <span className="font-medium text-slate-700">{metrics.length} agents</span>
        </div>
        <GuardrailBadge guardrails={allGuardrails} />
      </div>

      {/* Agent grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            metrics={metrics.find((m) => m.agentId === agent.id)}
            onClick={() => onAgentClick?.(agent.id)}
          />
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color?: string }) {
  const colorClass = color === 'emerald' ? 'text-success-fg' : color === 'amber' ? 'text-warning-fg' : color === 'red' ? 'text-danger-fg' : 'text-slate-800';
  return (
    <div className="border border-border rounded-lg p-3 bg-white">
      <div className="text-[10px] uppercase text-text-tertiary mb-1">{label}</div>
      <div className={cn('text-xl font-semibold', colorClass)}>{value}</div>
    </div>
  );
}
