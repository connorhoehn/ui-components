import { useMemo, useState } from 'react';
import { cn } from '../../../lib/cn';
import { AgentCard } from './AgentCard';
import type { AgentDefinition, AgentStatus, AgentMetrics } from '../../../types/agents';

const ALL_STATUSES: AgentStatus[] = ['healthy', 'degraded', 'offline', 'deploying'];

export interface AgentDirectoryProps {
  agents: AgentDefinition[];
  metricsById?: Record<string, AgentMetrics>;
  /** Status values shown in the filter chip row. Defaults to all four. */
  filters?: AgentStatus[];
  /** Selected agent id (controlled). */
  selectedId?: string | null;
  onSelect?: (agent: AgentDefinition) => void;
  /** Override the empty-state copy. */
  emptyMessage?: string;
  className?: string;
}

export function AgentDirectory({
  agents,
  metricsById,
  filters = ALL_STATUSES,
  selectedId = null,
  onSelect,
  emptyMessage = 'No agents match your filter.',
  className,
}: AgentDirectoryProps) {
  const [query, setQuery] = useState('');
  const [activeStatus, setActiveStatus] = useState<AgentStatus | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return agents.filter((a) => {
      if (activeStatus && a.status !== activeStatus) return false;
      if (!q) return true;
      return (
        a.name.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q) ||
        (a.description?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [agents, query, activeStatus]);

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search agents…"
          aria-label="Search agents"
          className="flex-1 rounded-md border border-border-emphasis bg-white px-3 py-1.5 text-sm placeholder:text-text-tertiary focus:border-info focus:outline-none focus:ring-1 focus:ring-info"
        />
        <div className="flex flex-wrap items-center gap-1" role="group" aria-label="Filter by status">
          <button
            type="button"
            onClick={() => setActiveStatus(null)}
            className={cn(
              'rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
              activeStatus === null
                ? 'border-slate-900 bg-slate-900 text-white'
                : 'border-border-emphasis bg-white text-text-secondary hover:bg-surface-panel',
            )}
          >
            All
          </button>
          {filters.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setActiveStatus(activeStatus === status ? null : status)}
              aria-pressed={activeStatus === status}
              className={cn(
                'rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize transition-colors',
                activeStatus === status
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-border-emphasis bg-white text-text-secondary hover:bg-surface-panel',
              )}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="rounded-md border border-dashed border-border-emphasis bg-surface-panel px-4 py-8 text-center text-sm text-neutral">
          {emptyMessage}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              metrics={metricsById?.[agent.id]}
              selected={selectedId === agent.id}
              onClick={onSelect ? () => onSelect(agent) : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
