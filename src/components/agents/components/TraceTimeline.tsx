import { useState } from 'react';
import { cn } from '../../../lib/cn';
import type { TraceTimeline as TraceTimelineType, TraceSpan, SpanKind } from '../../../types/agents';

interface TraceTimelineProps {
  trace: TraceTimelineType;
  className?: string;
}

const KIND_COLORS: Record<SpanKind, string> = {
  agent: 'bg-blue-500',
  tool: 'bg-purple-500',
  llm: 'bg-amber-500',
  retrieval: 'bg-emerald-500',
  guardrail: 'bg-red-400',
  internal: 'bg-slate-400',
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
    <div
      className={cn(
        'flex items-center h-7 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-100',
        selected && 'bg-blue-50',
      )}
      onClick={() => onSelect(span)}
    >
      <div className="w-[200px] shrink-0 flex items-center gap-1 px-2 overflow-hidden">
        <span style={{ marginLeft: depth * 12 }} className="shrink-0" />
        <span className={cn('w-2 h-2 rounded-sm shrink-0', KIND_COLORS[span.kind])} />
        <span className="text-[11px] text-slate-700 truncate">{span.name}</span>
      </div>
      <div className="flex-1 relative h-full flex items-center">
        <div
          className={cn('absolute h-4 rounded-sm opacity-80', KIND_COLORS[span.kind])}
          style={{ left: `${leftPct}%`, width: `${widthPct}%`, minWidth: 2 }}
        />
        <span
          className="absolute text-[10px] text-slate-500"
          style={{ left: `${leftPct + widthPct + 0.5}%` }}
        >
          {span.durationMs}ms
        </span>
      </div>
    </div>
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

export function TraceTimeline({ trace, className }: TraceTimelineProps) {
  const [selectedSpan, setSelectedSpan] = useState<TraceSpan | null>(null);
  const tree = buildTree(trace.spans, trace.rootSpanId);
  const traceStart = new Date(trace.startedAt).getTime();

  return (
    <div className={cn('border border-slate-200 rounded-lg overflow-hidden bg-white', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-700">Trace</span>
          <span className="text-[10px] font-mono text-slate-400">{trace.traceId}</span>
        </div>
        <span className="text-xs text-slate-500">{trace.totalDurationMs}ms total</span>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 px-3 py-1.5 border-b border-slate-100">
        {(Object.keys(KIND_COLORS) as SpanKind[]).map((kind) => (
          <div key={kind} className="flex items-center gap-1">
            <span className={cn('w-2 h-2 rounded-sm', KIND_COLORS[kind])} />
            <span className="text-[10px] text-slate-500">{KIND_LABELS[kind]}</span>
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
        <div className="border-t border-slate-200 p-3 bg-slate-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-700">{selectedSpan.name}</span>
            <button
              className="text-[10px] text-slate-400 hover:text-slate-600"
              onClick={() => setSelectedSpan(null)}
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
            <div className="text-slate-500">Kind</div>
            <div className="text-slate-700 font-medium">{KIND_LABELS[selectedSpan.kind]}</div>
            <div className="text-slate-500">Duration</div>
            <div className="text-slate-700">{selectedSpan.durationMs}ms</div>
            <div className="text-slate-500">Status</div>
            <div className={cn(
              'font-medium',
              selectedSpan.status === 'ok' && 'text-emerald-600',
              selectedSpan.status === 'error' && 'text-red-600',
            )}>{selectedSpan.status}</div>
            <div className="text-slate-500">Span ID</div>
            <div className="text-slate-700 font-mono">{selectedSpan.spanId}</div>
          </div>
          {Object.keys(selectedSpan.attributes).length > 0 && (
            <div className="mt-2">
              <div className="text-[10px] text-slate-400 uppercase mb-1">Attributes</div>
              <div className="text-[11px] font-mono text-slate-600 space-y-0.5">
                {Object.entries(selectedSpan.attributes).map(([k, v]) => (
                  <div key={k}><span className="text-slate-400">{k}:</span> {String(v)}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
