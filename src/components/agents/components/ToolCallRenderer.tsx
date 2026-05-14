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
        toolCall.status === 'streaming' && 'border-blue-200 bg-blue-50/50',
        toolCall.status === 'completed' && 'border-slate-200 bg-slate-50',
        toolCall.status === 'error' && 'border-red-200 bg-red-50/50',
        className,
      )}
    >
      <button
        className="flex items-center gap-2 w-full px-2 py-1.5 text-left hover:bg-slate-100/50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <span className={cn(
          toolCall.status === 'streaming' && 'animate-pulse',
          toolCall.status === 'completed' && 'text-emerald-600',
          toolCall.status === 'error' && 'text-red-600',
        )}>
          {STATUS_ICON[toolCall.status]}
        </span>
        <span className="text-slate-700 font-medium">{toolCall.name}</span>
        {duration != null && (
          <span className="text-slate-400 ml-auto">{duration}ms</span>
        )}
        <span className="text-slate-400 ml-1">{expanded ? '▾' : '▸'}</span>
      </button>

      {expanded && (
        <div className="px-2 pb-2 space-y-1 border-t border-slate-100">
          {toolCall.args && (
            <div>
              <div className="text-[10px] text-slate-400 uppercase mt-1">args</div>
              <pre className="text-[11px] text-slate-600 whitespace-pre-wrap break-all max-h-[100px] overflow-y-auto">
                {formatJson(toolCall.args)}
              </pre>
            </div>
          )}
          {toolCall.result != null && (
            <div>
              <div className="text-[10px] text-slate-400 uppercase mt-1">result</div>
              <pre className="text-[11px] text-slate-600 whitespace-pre-wrap break-all max-h-[100px] overflow-y-auto">
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
