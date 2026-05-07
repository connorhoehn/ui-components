// frontend/src/components/pipelines/DiffStepTable.tsx
//
// Side-by-side step comparison table showing step A vs step B with status,
// duration, output diffs. Extracted from PipelineRunDiff.tsx.

import { useMemo } from 'react';

import { cn } from '../../lib/cn';
import Chip from '../shared/Chip';
import type { ChipTone } from '../shared/Chip';
import type {
  PipelineDefinition,
  PipelineRun,
  StepExecution,
} from '../../types/pipeline';
import { formatDuration } from './utils/formatTime';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDelta(ms: number): string {
  if (ms === 0) return '0ms';
  const sign = ms > 0 ? '+' : '-';
  return `${sign}${formatDuration(Math.abs(ms))}`;
}

function stepStatusVariant(s: string): ChipTone {
  switch (s) {
    case 'completed': return 'success';
    case 'failed':    return 'danger';
    case 'cancelled': return 'neutral';
    case 'skipped':   return 'neutral';
    case 'running':   return 'info';
    case 'awaiting':  return 'warning';
    default:          return 'neutral';
  }
}

function lookupNodeName(
  def: PipelineDefinition | null,
  nodeId: string,
): string {
  if (!def) return nodeId;
  const node = def.nodes.find((n) => n.id === nodeId);
  if (!node) return nodeId;
  if (node.data.type === 'condition' && (node.data as { label?: string }).label) {
    return (node.data as { label: string }).label;
  }
  return node.type.charAt(0).toUpperCase() + node.type.slice(1);
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface StepCompareRow {
  nodeId: string;
  name: string;
  a: StepExecution | undefined;
  b: StepExecution | undefined;
  durationDelta: number | undefined;
  statusDiffers: boolean;
  onlyInA: boolean;
  onlyInB: boolean;
  tokenDelta: number | undefined;
}

// ---------------------------------------------------------------------------
// Row builder
// ---------------------------------------------------------------------------

function buildStepRows(
  runA: PipelineRun,
  runB: PipelineRun,
  def: PipelineDefinition | null,
): StepCompareRow[] {
  const seen = new Set<string>();
  const ordered: string[] = [];

  if (def) {
    for (const n of def.nodes) {
      if (runA.steps[n.id] || runB.steps[n.id]) {
        ordered.push(n.id);
        seen.add(n.id);
      }
    }
  }
  for (const id of [...Object.keys(runA.steps), ...Object.keys(runB.steps)]) {
    if (!seen.has(id)) {
      ordered.push(id);
      seen.add(id);
    }
  }

  return ordered.map((nodeId) => {
    const a = runA.steps[nodeId];
    const b = runB.steps[nodeId];
    const aDur = a?.durationMs;
    const bDur = b?.durationMs;
    const durationDelta = aDur != null && bDur != null ? bDur - aDur : undefined;
    const statusDiffers = !!a && !!b && a.status !== b.status;
    const onlyInA = !!a && !b;
    const onlyInB = !a && !!b;

    const aTokens = a?.llm ? a.llm.tokensIn + a.llm.tokensOut : undefined;
    const bTokens = b?.llm ? b.llm.tokensIn + b.llm.tokensOut : undefined;
    const tokenDelta = aTokens != null && bTokens != null ? bTokens - aTokens : undefined;

    return {
      nodeId,
      name: lookupNodeName(def, nodeId),
      a, b,
      durationDelta,
      statusDiffers,
      onlyInA,
      onlyInB,
      tokenDelta,
    };
  });
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface DiffStepTableProps {
  runA: PipelineRun;
  runB: PipelineRun;
  def: PipelineDefinition | null;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function DiffStepTable({ runA, runB, def }: DiffStepTableProps) {
  const rows = useMemo(() => buildStepRows(runA, runB, def), [runA, runB, def]);

  return (
    <table className="w-full border-collapse text-[13px]">
      <thead>
        <tr>
          <th className="border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
            Step
          </th>
          <th className="border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
            Run A
          </th>
          <th className="border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
            Run B
          </th>
          <th className="border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
            Delta
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr
            key={row.nodeId}
            className={cn(
              row.onlyInA || row.onlyInB
                ? 'bg-[#fefce8]'
                : row.statusDiffers
                  ? 'bg-[#fef2f2]'
                  : undefined,
            )}
            data-testid={`diff-step-row-${row.nodeId}`}
          >
            <td className="border-b border-border px-3 py-2.5 align-top text-xs text-text-primary">
              <div className="font-semibold">{row.name}</div>
              <div className="font-mono text-[10px] text-text-tertiary">
                {row.nodeId}
              </div>
              {row.onlyInA && <Chip tone="warning" size="xs">only in A</Chip>}
              {row.onlyInB && <Chip tone="warning" size="xs">only in B</Chip>}
            </td>
            <td className="border-b border-border px-3 py-2.5 align-top text-xs text-text-primary">
              {row.a ? (
                <div className="flex flex-col gap-0.5">
                  <Chip tone={stepStatusVariant(row.a.status)}>
                    {row.a.status}
                  </Chip>
                  <span className="font-mono text-[11px] text-text-secondary">
                    {formatDuration(row.a.durationMs)}
                  </span>
                  {row.a.llm && (
                    <span className="text-[10px] text-text-tertiary">
                      {row.a.llm.tokensIn} in / {row.a.llm.tokensOut} out
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-text-tertiary">(not run)</span>
              )}
            </td>
            <td className="border-b border-border px-3 py-2.5 align-top text-xs text-text-primary">
              {row.b ? (
                <div className="flex flex-col gap-0.5">
                  <Chip tone={stepStatusVariant(row.b.status)}>
                    {row.b.status}
                  </Chip>
                  <span className="font-mono text-[11px] text-text-secondary">
                    {formatDuration(row.b.durationMs)}
                  </span>
                  {row.b.llm && (
                    <span className="text-[10px] text-text-tertiary">
                      {row.b.llm.tokensIn} in / {row.b.llm.tokensOut} out
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-text-tertiary">(not run)</span>
              )}
            </td>
            <td className="border-b border-border px-3 py-2.5 align-top font-mono text-xs text-text-primary">
              {row.statusDiffers && (
                <div className="text-[11px] font-semibold text-[#dc2626]">
                  status differs
                </div>
              )}
              {row.durationDelta != null && (
                <div
                  className={cn(
                    'text-xs',
                    row.durationDelta === 0
                      ? 'text-text-tertiary'
                      : row.durationDelta < 0
                        ? 'text-[#16a34a]'
                        : 'text-[#dc2626]',
                  )}
                >
                  {formatDelta(row.durationDelta)}
                </div>
              )}
              {row.tokenDelta != null && row.tokenDelta !== 0 && (
                <div
                  className={cn(
                    'mt-0.5 text-[10px]',
                    row.tokenDelta < 0 ? 'text-[#16a34a]' : 'text-[#dc2626]',
                  )}
                >
                  {row.tokenDelta > 0 ? '+' : ''}{row.tokenDelta} tok
                </div>
              )}
              {row.durationDelta == null && !row.statusDiffers && (
                <span className="text-text-tertiary">--</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
