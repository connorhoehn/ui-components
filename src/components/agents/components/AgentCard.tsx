import { cn } from '../../../lib/cn';
import type { AgentDefinition, AgentMetrics } from '../../../types/agents';

interface AgentCardProps {
  agent: AgentDefinition;
  metrics?: AgentMetrics;
  selected?: boolean;
  onClick?: () => void;
}

const STATUS_STYLES: Record<string, string> = {
  healthy: 'bg-emerald-100 text-emerald-800',
  degraded: 'bg-amber-100 text-amber-800',
  offline: 'bg-red-100 text-red-800',
  deploying: 'bg-blue-100 text-blue-800',
};

const STATUS_DOT: Record<string, string> = {
  healthy: 'bg-emerald-500',
  degraded: 'bg-amber-500',
  offline: 'bg-red-500',
  deploying: 'bg-blue-500',
};

export function AgentCard({ agent, metrics, selected, onClick }: AgentCardProps) {
  return (
    <div
      className={cn(
        'border rounded-lg p-4 cursor-pointer transition-all hover:shadow-sm',
        selected
          ? 'border-blue-500 bg-blue-50/50 shadow-sm'
          : 'border-slate-200 bg-white hover:border-slate-300',
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">🤖</span>
          <div>
            <div className="font-medium text-sm text-slate-900">{agent.name}</div>
            <div className="text-xs text-slate-500 font-mono">{agent.id}</div>
          </div>
        </div>
        <span
          className={cn(
            'inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full',
            STATUS_STYLES[agent.status],
          )}
        >
          <span className={cn('w-1.5 h-1.5 rounded-full', STATUS_DOT[agent.status])} />
          {agent.status}
        </span>
      </div>

      {agent.description && (
        <p className="text-xs text-slate-600 mb-3 line-clamp-2">{agent.description}</p>
      )}

      <div className="flex items-center gap-3 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1">
          <span className="font-mono uppercase text-[10px] px-1 py-0.5 bg-slate-100 rounded">
            {agent.protocol}
          </span>
        </span>
        <span>{agent.model}</span>
        {metrics && (
          <>
            <span className="text-slate-300">|</span>
            <span>{metrics.invocationsLast24h} inv/24h</span>
            <span>{metrics.avgLatencyMs}ms avg</span>
          </>
        )}
        {!metrics && agent.avgLatencyMs != null && (
          <>
            <span className="text-slate-300">|</span>
            <span>{agent.invocationsLast24h ?? 0} inv/24h</span>
            <span>{agent.avgLatencyMs}ms avg</span>
          </>
        )}
      </div>

      {agent.tools.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {agent.tools.slice(0, 4).map((tool) => (
            <span
              key={tool}
              className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded font-mono"
            >
              {tool}
            </span>
          ))}
          {agent.tools.length > 4 && (
            <span className="text-[10px] px-1.5 py-0.5 text-slate-400">
              +{agent.tools.length - 4}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
