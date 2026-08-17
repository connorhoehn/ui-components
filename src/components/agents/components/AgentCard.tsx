import { cn } from '../../../lib/cn';
import type { AgentDefinition, AgentMetrics } from '../../../types/agents';

interface AgentCardProps {
  agent: AgentDefinition;
  metrics?: AgentMetrics;
  selected?: boolean;
  onClick?: () => void;
}

const STATUS_STYLES: Record<string, string> = {
  healthy: 'bg-success-bg text-success-fg',
  degraded: 'bg-warning-bg text-warning-fg',
  offline: 'bg-danger-bg text-danger-fg',
  deploying: 'bg-info-bg text-info-fg',
};

const STATUS_DOT: Record<string, string> = {
  healthy: 'bg-success',
  degraded: 'bg-warning',
  offline: 'bg-danger',
  deploying: 'bg-info',
};

export function AgentCard({ agent, metrics, selected, onClick }: AgentCardProps) {
  return (
    <div
      className={cn(
        'border rounded-lg cursor-pointer transition-all hover:shadow-sm overflow-hidden',
        selected
          ? 'border-info bg-info-bg/50 shadow-sm'
          : 'border-slate-200 bg-white hover:border-slate-300',
      )}
      onClick={onClick}
    >
      {/* Status bar — full width top */}
      <div className={cn(
        'flex items-center justify-end px-3 py-1.5',
        agent.status === 'healthy' && 'bg-success-bg',
        agent.status === 'degraded' && 'bg-warning-bg',
        agent.status === 'offline' && 'bg-danger-bg',
        agent.status === 'deploying' && 'bg-info-bg',
      )}>
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

      <div className="p-4 pt-3">
        {/* Name + ID — full width */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg shrink-0">🤖</span>
          <div className="min-w-0">
            <div className="font-medium text-sm text-slate-900 truncate">{agent.name}</div>
            <div className="text-xs text-slate-500 font-mono truncate">{agent.id}</div>
          </div>
        </div>

        {agent.description && (
          <p className="text-xs text-slate-600 mb-3 line-clamp-2">{agent.description}</p>
        )}

        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="font-mono uppercase text-[10px] px-1.5 py-0.5 bg-slate-100 rounded shrink-0">
            {agent.protocol}
          </span>
          <span className="truncate">{agent.model}</span>
          {metrics && (
            <>
              <span className="text-slate-300">|</span>
              <span className="shrink-0">{metrics.invocationsLast24h} inv/24h</span>
              <span className="shrink-0">{metrics.avgLatencyMs}ms avg</span>
            </>
          )}
          {!metrics && agent.avgLatencyMs != null && (
            <>
              <span className="text-slate-300">|</span>
              <span className="shrink-0">{agent.invocationsLast24h ?? 0} inv/24h</span>
              <span className="shrink-0">{agent.avgLatencyMs}ms avg</span>
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
    </div>
  );
}
