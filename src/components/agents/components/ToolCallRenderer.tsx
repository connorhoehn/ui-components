import { useState } from 'react';
import { cn } from '../../../lib/cn';
import type { AgUiToolCall } from '../../../types/agents';

interface ToolCallRendererProps {
  toolCall: AgUiToolCall;
  className?: string;
}

const STATUS_ICON: Record<string, string> = {
  streaming: '⏳',
  completed: '✓',
  error: '✗',
};

export function ToolCallRenderer({ toolCall, className }: ToolCallRendererProps) {
  const [expanded, setExpanded] = useState(false);

  const duration = toolCall.endedAt != null ? toolCall.endedAt - toolCall.startedAt : null;

  return (
    <div
      className={cn(
        'border rounded text-xs font-mono overflow-hidden',
        toolCall.status === 'streaming' && 'border-info-border bg-info-bg/50',
        toolCall.status === 'completed' && 'border-border bg-surface-panel',
        toolCall.status === 'error' && 'border-danger-border bg-danger-bg/50',
        className,
      )}
    >
      <button
        className="flex items-center gap-2 w-full px-2 py-1.5 text-left hover:bg-surface-hover/50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <span className={cn(
          toolCall.status === 'streaming' && 'animate-pulse',
          toolCall.status === 'completed' && 'text-success-fg',
          toolCall.status === 'error' && 'text-danger-fg',
        )}>
          {STATUS_ICON[toolCall.status]}
        </span>
        <span className="text-text-primary font-medium">{toolCall.name}</span>
        {duration != null && (
          <span className="text-text-tertiary ml-auto">{duration}ms</span>
        )}
        <span className="text-text-tertiary ml-1">{expanded ? '▾' : '▸'}</span>
      </button>

      {expanded && (
        <div className="px-2 pb-2 space-y-1 border-t border-border-subtle">
          {toolCall.args && (
            <div>
              <div className="text-[10px] text-text-tertiary uppercase mt-1">args</div>
              <pre className="text-[11px] text-text-secondary whitespace-pre-wrap break-all max-h-[100px] overflow-y-auto">
                {formatJson(toolCall.args)}
              </pre>
            </div>
          )}
          {toolCall.result != null && (
            <div>
              <div className="text-[10px] text-text-tertiary uppercase mt-1">result</div>
              <pre className="text-[11px] text-text-secondary whitespace-pre-wrap break-all max-h-[100px] overflow-y-auto">
                {formatUnknown(toolCall.result)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function formatJson(str: string): string {
  try {
    return JSON.stringify(JSON.parse(str), null, 2);
  } catch {
    return str;
  }
}

function formatUnknown(value: unknown): string {
  if (typeof value === 'string') return formatJson(value);
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}
