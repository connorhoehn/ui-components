import { useState } from 'react';
import { cn } from '../../../lib/cn';
import type { TraceTimeline as TraceTimelineType, TraceSpan, SpanKind } from '../../../types/agents';

export interface TraceTimelineProps {
  trace: TraceTimelineType;
  className?: string;
  /**
   * Header label. Defaults to 'Trace'.
   *
   * Exists because this component is no longer only a generic OTEL viewer:
   * a caller rendering one specific thing (an agent step's tool calls, say)
   * should be able to name it, rather than leaving a bare 'Trace' above a
   * waterfall the reader has to work out for themselves.
   */
  title?: string;
  /**
   * Span kinds to show in the legend. Defaults to all six.
   *
   * A caller whose traces can only ever contain two kinds should not
   * advertise six colored swatches — four of which can never appear —
   * because a legend entry with no possible referent reads as missing data.
   */
  legendKinds?: SpanKind[];
}

const KIND_COLORS: Record<SpanKind, string> = {
  agent: 'bg-info',
  tool: 'bg-accent',
  llm: 'bg-warning',
  retrieval: 'bg-success',
  guardrail: 'bg-danger',
  internal: 'bg-surface-emphasis',
};

const KIND_LABELS: Record<SpanKind, string> = {
  agent: 'Agent',
  tool: 'Tool',
  llm: 'LLM',
  retrieval: 'Retrieval',
  guardrail: 'Guardrail',
  internal: 'Internal',
};

interface SpanRowProps {
  span: TraceSpan;
  depth: number;
  totalMs: number;
  startOffset: number;
  onSelect: (span: TraceSpan) => void;
  selected: boolean;
}

function SpanRow({ span, depth, totalMs, startOffset, onSelect, selected }: SpanRowProps) {
  const leftPct = totalMs > 0 ? (startOffset / totalMs) * 100 : 0;
  const widthPct = totalMs > 0 ? Math.max((span.durationMs / totalMs) * 100, 0.5) : 0;

  return (
    <button
      type="button"
      className={cn(
        'w-full text-left bg-transparent font-[inherit] flex items-center h-7 hover:bg-surface-panel cursor-pointer transition-colors border-b border-border-subtle',
        selected && 'bg-info-bg',
      )}
      onClick={() => onSelect(span)}
    >
      <div className="w-[200px] shrink-0 flex items-center gap-1 px-2 overflow-hidden">
        <span style={{ marginLeft: depth * 12 }} className="shrink-0" />
        <span className={cn('w-2 h-2 rounded-sm shrink-0', KIND_COLORS[span.kind])} />
        <span className="text-[11px] text-text-primary truncate">{span.name}</span>
      </div>
      <div className="flex-1 relative h-full flex items-center">
        <div
          className={cn('absolute h-4 rounded-sm opacity-80', KIND_COLORS[span.kind])}
          style={{ left: `${leftPct}%`, width: `${widthPct}%`, minWidth: 2 }}
        />
        <span
          className="absolute text-[10px] text-neutral"
          style={{ left: `${leftPct + widthPct + 0.5}%` }}
        >
          {span.durationMs}ms
        </span>
      </div>
    </button>
  );
}

function buildTree(spans: TraceSpan[], rootId: string): { span: TraceSpan; depth: number }[] {
  const result: { span: TraceSpan; depth: number }[] = [];
  const byParent = new Map<string | undefined, TraceSpan[]>();
  for (const s of spans) {
    const key = s.parentSpanId ?? '__root__';
    if (!byParent.has(key)) byParent.set(key, []);
    byParent.get(key)!.push(s);
  }

  function walk(parentId: string | undefined, depth: number) {
    const key = parentId ?? '__root__';
    const children = byParent.get(key) ?? byParent.get(parentId) ?? [];
    for (const child of children) {
      result.push({ span: child, depth });
      walk(child.spanId, depth + 1);
    }
  }

  const root = spans.find((s) => s.spanId === rootId);
  if (root) {
    result.push({ span: root, depth: 0 });
    walk(root.spanId, 1);
  } else {
    walk(undefined, 0);
  }

  return result;
}

export function TraceTimeline({ trace, className, title, legendKinds }: TraceTimelineProps) {
  const [selectedSpan, setSelectedSpan] = useState<TraceSpan | null>(null);
  const tree = buildTree(trace.spans, trace.rootSpanId);
  const traceStart = new Date(trace.startedAt).getTime();

  return (
    <div className={cn('border border-border rounded-lg overflow-hidden bg-surface', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-surface-panel">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-text-primary">{title ?? 'Trace'}</span>
          <span className="text-[10px] font-mono text-text-tertiary">{trace.traceId}</span>
        </div>
        <span className="text-xs text-neutral">{trace.totalDurationMs}ms total</span>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 px-3 py-1.5 border-b border-border-subtle">
        {(legendKinds ?? (Object.keys(KIND_COLORS) as SpanKind[])).map((kind) => (
          <div key={kind} className="flex items-center gap-1">
            <span className={cn('w-2 h-2 rounded-sm', KIND_COLORS[kind])} />
            <span className="text-[10px] text-neutral">{KIND_LABELS[kind]}</span>
          </div>
        ))}
      </div>

      {/* Spans */}
      <div className="max-h-[300px] overflow-y-auto">
        {tree.map(({ span, depth }) => {
          const startOffset = new Date(span.startTime).getTime() - traceStart;
          return (
            <SpanRow
              key={span.spanId}
              span={span}
              depth={depth}
              totalMs={trace.totalDurationMs}
              startOffset={startOffset}
              onSelect={setSelectedSpan}
              selected={selectedSpan?.spanId === span.spanId}
            />
          );
        })}
      </div>

      {/* Detail panel */}
      {selectedSpan && (
        <div className="border-t border-border p-3 bg-surface-panel">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-text-primary">{selectedSpan.name}</span>
            <button
              className="text-[10px] text-text-tertiary hover:text-text-secondary"
              onClick={() => setSelectedSpan(null)}
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
            <div className="text-neutral">Kind</div>
            <div className="text-text-primary font-medium">{KIND_LABELS[selectedSpan.kind]}</div>
            <div className="text-neutral">Duration</div>
            <div className="text-text-primary">{selectedSpan.durationMs}ms</div>
            <div className="text-neutral">Status</div>
            <div className={cn(
              'font-medium',
              selectedSpan.status === 'ok' && 'text-success-fg',
              selectedSpan.status === 'error' && 'text-danger-fg',
            )}>{selectedSpan.status}</div>
            <div className="text-neutral">Span ID</div>
            <div className="text-text-primary font-mono">{selectedSpan.spanId}</div>
          </div>
          {Object.keys(selectedSpan.attributes).length > 0 && (
            <div className="mt-2">
              <div className="text-[10px] text-text-tertiary uppercase mb-1">Attributes</div>
              <div className="text-[11px] font-mono text-text-secondary space-y-0.5">
                {Object.entries(selectedSpan.attributes).map(([k, v]) => (
                  <div key={k}><span className="text-text-tertiary">{k}:</span> {String(v)}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
