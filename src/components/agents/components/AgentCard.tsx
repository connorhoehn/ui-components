import type { ElementType } from 'react';
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
  // `onClick` is optional, but the card rendered as a <button> either way: a
  // focusable tab stop with a pointer cursor and a hover lift, announced to a
  // screen reader as a button, that swallowed every click. In a 20-agent grid
  // that is 20 dead tab stops. Same treatment as StatCard / ThumbnailCard /
  // KPICard, which all drop to a plain element when nothing is wired.
  const Tag: ElementType = onClick ? 'button' : 'div';
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      className={cn(
        // `flex flex-col`, not `block`: in the dashboard grid the card
        // stretches to the tallest card in its row, and Chrome vertically
        // CENTERS a <button>'s content when the button is taller than it —
        // which `display: block` does not prevent. As a div this content sat
        // at the top; as a block button the shorter cards' contents drifted to
        // the middle of the frame. Flex column pins it back to the top.
        'flex flex-col w-full text-left font-[inherit] border rounded-lg transition-all overflow-hidden',
        onClick && 'cursor-pointer hover:shadow-sm',
        selected
          ? 'border-info bg-info-bg/50 shadow-sm'
          : cn('border-border bg-surface', onClick && 'hover:border-border-emphasis'),
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
            <div className="font-medium text-sm text-text-primary truncate">{agent.name}</div>
            <div className="text-xs text-neutral font-mono truncate">{agent.id}</div>
          </div>
        </div>

        {agent.description && (
          <p className="text-xs text-text-secondary mb-3 line-clamp-2">{agent.description}</p>
        )}

        <div className="flex flex-wrap items-center gap-2 text-xs text-neutral">
          <span className="font-mono uppercase text-[10px] px-1.5 py-0.5 bg-surface-hover rounded shrink-0">
            {agent.protocol}
          </span>
          <span className="truncate">{agent.model}</span>
          {metrics && (
            <>
              <span className="text-text-disabled">|</span>
              <span className="shrink-0">{metrics.invocationsLast24h} inv/24h</span>
              <span className="shrink-0">{metrics.avgLatencyMs}ms avg</span>
            </>
          )}
          {!metrics && agent.avgLatencyMs != null && (
            <>
              <span className="text-text-disabled">|</span>
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
                className="text-[10px] px-1.5 py-0.5 bg-surface-hover text-text-secondary rounded font-mono"
              >
                {tool}
              </span>
            ))}
            {agent.tools.length > 4 && (
              <span className="text-[10px] px-1.5 py-0.5 text-text-tertiary">
                +{agent.tools.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </Tag>
  );
}
