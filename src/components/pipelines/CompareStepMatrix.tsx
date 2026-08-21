// frontend/src/components/pipelines/CompareStepMatrix.tsx
//
// Matrix/grid that compares steps between two runs in PipelineRunComparePage.
// Shows a table with per-step status, duration, token usage, LLM response diff.
// Extracted from PipelineRunComparePage.tsx.

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

function formatDelta(ms?: number): string {
  if (ms == null) return '—';
  const sign = ms > 0 ? '+' : ms < 0 ? '' : '';
  return `${sign}${formatDuration(Math.abs(ms))}`.replace(/^(\+|-)?/, ms === 0 ? '' : (ms > 0 ? '+' : '-'));
}

function statusVariant(s: StepExecution['status']): ChipTone {
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
  if (node.data.type === 'condition' && node.data.label) return node.data.label;
  return node.type.charAt(0).toUpperCase() + node.type.slice(1);
}

function isConditionNode(def: PipelineDefinition | null, nodeId: string): boolean {
  if (!def) return false;
  const node = def.nodes.find((n) => n.id === nodeId);
  return !!node && node.data.type === 'condition';
}

function conditionBranch(step: StepExecution | undefined): string | undefined {
  if (!step) return undefined;
  const out = step.output as { result?: unknown } | undefined;
  if (out && typeof out === 'object' && 'result' in out) {
    return out.result ? 'true' : 'false';
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// Word-level diff (LCS over whitespace-split tokens)
// ---------------------------------------------------------------------------

type DiffPart = { type: 'eq' | 'add' | 'del'; text: string };

export function wordDiff(a: string, b: string): DiffPart[] {
  const tokenize = (s: string): string[] => s.split(/(\s+)/).filter((t) => t.length > 0);
  const A = tokenize(a);
  const B = tokenize(b);

  const m = A.length;
  const n = B.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (A[i] === B[j]) dp[i][j] = dp[i + 1][j + 1] + 1;
      else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const parts: DiffPart[] = [];
  const push = (type: DiffPart['type'], text: string) => {
    const last = parts[parts.length - 1];
    if (last && last.type === type) last.text += text;
    else parts.push({ type, text });
  };
  let i = 0;
  let j = 0;
  while (i < m && j < n) {
    if (A[i] === B[j]) {
      push('eq', A[i]);
      i++; j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      push('del', A[i]);
      i++;
    } else {
      push('add', B[j]);
      j++;
    }
  }
  while (i < m) { push('del', A[i++]); }
  while (j < n) { push('add', B[j++]); }
  return parts;
}

// ---------------------------------------------------------------------------
// Row types
// ---------------------------------------------------------------------------

interface CompareRow {
  nodeId: string;
  name: string;
  a: StepExecution | undefined;
  b: StepExecution | undefined;
  durationDelta: number | undefined;
  statusDiffers: boolean;
  durationLarge: boolean;
  branchDiffers: boolean;
  isLlm: boolean;
  isCondition: boolean;
  branchA?: string;
  branchB?: string;
}

// ---------------------------------------------------------------------------
// Row builder
// ---------------------------------------------------------------------------

function buildRows(
  runA: PipelineRun,
  runB: PipelineRun,
  def: PipelineDefinition | null,
): CompareRow[] {
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

  return ordered.map<CompareRow>((nodeId) => {
    const a = runA.steps[nodeId];
    const b = runB.steps[nodeId];
    const aDur = a?.durationMs;
    const bDur = b?.durationMs;
    const durationDelta = aDur != null && bDur != null ? bDur - aDur : undefined;
    const statusDiffers = !!a && !!b && a.status !== b.status;

    let durationLarge = false;
    if (aDur != null && bDur != null && aDur > 0) {
      const ratio = Math.abs(bDur - aDur) / aDur;
      durationLarge = ratio > 0.5;
    }

    const isCond = isConditionNode(def, nodeId);
    const branchA = isCond ? conditionBranch(a) : undefined;
    const branchB = isCond ? conditionBranch(b) : undefined;
    const branchDiffers = isCond
      && branchA !== undefined
      && branchB !== undefined
      && branchA !== branchB;

    return {
      nodeId,
      name: lookupNodeName(def, nodeId),
      a, b,
      durationDelta,
      statusDiffers,
      durationLarge,
      branchDiffers,
      isLlm: !!(a?.llm || b?.llm),
      isCondition: isCond,
      branchA, branchB,
    };
  });
}

// ---------------------------------------------------------------------------
// Highlight helper
// ---------------------------------------------------------------------------

function rowHighlightClass(row: CompareRow): string | undefined {
  if (row.statusDiffers) return 'bg-danger-bg';
  if (row.branchDiffers) return 'bg-info-bg';
  if (row.durationLarge) return 'bg-warning-bg';
  return undefined;
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface CompareStepMatrixProps {
  runA: PipelineRun;
  runB: PipelineRun;
  def: PipelineDefinition | null;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StepCell({
  step,
  branch,
  isCondition,
}: {
  step: StepExecution | undefined;
  branch: string | undefined;
  isCondition: boolean;
}) {
  if (!step) {
    return <span className="text-text-tertiary">(not run)</span>;
  }
  const variant = statusVariant(step.status);
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center gap-1.5">
        <Chip tone={variant}>{step.status}</Chip>
        <span className="font-mono text-text-secondary">
          {formatDuration(step.durationMs)}
        </span>
        {isCondition && branch ? (
          <span className="font-mono text-[11px] text-text-tertiary">
            ({branch === 'true' ? 'T' : 'F'})
          </span>
        ) : null}
      </div>
      {step.llm ? (
        <div className="font-mono text-[11px] text-text-tertiary">
          {step.llm.tokensIn}&rarr;{step.llm.tokensOut}tok
        </div>
      ) : null}
      {step.error ? (
        <div className="text-[11px] text-danger-fg" title={step.error}>
          {step.error.length > 60 ? `${step.error.slice(0, 60)}…` : step.error}
        </div>
      ) : null}
    </div>
  );
}

function LlmDiff({ a, b }: { a: string; b: string }) {
  const parts = useMemo(() => wordDiff(a, b), [a, b]);

  return (
    <div
      className="whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset p-2.5 font-mono text-xs leading-relaxed"
      data-testid="llm-word-diff"
    >
      {parts.map((p, i) => {
        if (p.type === 'eq') return <span key={i}>{p.text}</span>;
        if (p.type === 'add') {
          return (
            <span key={i} data-diff="add" className="bg-success-bg text-success-fg">
              {p.text}
            </span>
          );
        }
        return (
          <span key={i} data-diff="del" className="bg-danger-bg text-danger-fg line-through">
            {p.text}
          </span>
        );
      })}
    </div>
  );
}

function CompareTableRow({ row }: { row: CompareRow }) {
  const aLlm = row.a?.llm;
  const bLlm = row.b?.llm;
  const tokenDelta =
    aLlm && bLlm ? (bLlm.tokensIn + bLlm.tokensOut) - (aLlm.tokensIn + aLlm.tokensOut) : undefined;

  const highlightCls = rowHighlightClass(row);

  return (
    <>
      <tr data-testid={`run-compare-row-${row.nodeId}`} className={highlightCls}>
        <td className={cn('border-b border-border px-3 py-2.5 align-top text-xs text-text-primary', highlightCls)}>
          <div className="font-semibold text-text-primary">{row.name}</div>
          <div className="font-mono text-[11px] text-text-tertiary">
            {row.nodeId}
          </div>
        </td>
        <td className={cn('border-b border-border px-3 py-2.5 align-top text-xs text-text-primary', highlightCls)}>
          <StepCell step={row.a} branch={row.branchA} isCondition={row.isCondition} />
        </td>
        <td className={cn('border-b border-border px-3 py-2.5 align-top text-xs text-text-primary', highlightCls)}>
          <StepCell step={row.b} branch={row.branchB} isCondition={row.isCondition} />
        </td>
        <td
          className={cn('border-b border-border px-3 py-2.5 align-top font-mono text-xs text-text-primary', highlightCls)}
          data-testid={`run-compare-delta-${row.nodeId}`}
        >
          {row.branchDiffers ? (
            <span className="font-semibold text-info-fg">different branch!</span>
          ) : row.statusDiffers ? (
            <span className="font-semibold text-danger-fg">status differs</span>
          ) : row.durationDelta != null ? (
            <span className={row.durationLarge ? 'text-warning-fg' : 'text-text-secondary'}>
              {formatDelta(row.durationDelta)}
            </span>
          ) : (
            <span className="text-text-tertiary">&mdash;</span>
          )}
          {tokenDelta != null && tokenDelta !== 0 ? (
            <div className="mt-0.5 text-[11px] text-text-tertiary">
              {tokenDelta > 0 ? '+' : ''}
              {tokenDelta}tok
            </div>
          ) : null}
        </td>
      </tr>

      {row.isLlm && (aLlm || bLlm) ? (
        <tr>
          <td className="border-b border-border p-0" colSpan={4}>
            <details className="bg-surface-inset px-3.5 py-2.5">
              <summary
                className="cursor-pointer text-xs font-semibold text-text-secondary"
                data-testid={`run-compare-llm-toggle-${row.nodeId}`}
              >
                LLM response diff
              </summary>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
                    Run A
                  </div>
                  <pre
                    data-testid={`run-compare-llm-a-${row.nodeId}`}
                    className="m-0 whitespace-pre-wrap break-words rounded-md border border-border bg-surface p-2.5 text-xs"
                  >
                    {aLlm?.response ?? '(no response)'}
                  </pre>
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
                    Run B
                  </div>
                  <pre
                    data-testid={`run-compare-llm-b-${row.nodeId}`}
                    className="m-0 whitespace-pre-wrap break-words rounded-md border border-border bg-surface p-2.5 text-xs"
                  >
                    {bLlm?.response ?? '(no response)'}
                  </pre>
                </div>
              </div>
              <div className="mt-2.5">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
                  Word-level diff
                </div>
                <div className="mt-1.5">
                  <LlmDiff
                    a={aLlm?.response ?? ''}
                    b={bLlm?.response ?? ''}
                  />
                </div>
              </div>
            </details>
          </td>
        </tr>
      ) : null}
    </>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function CompareStepMatrix({ runA, runB, def }: CompareStepMatrixProps) {
  const rows = useMemo(() => buildRows(runA, runB, def), [runA, runB, def]);

  return (
    <table
      className="w-full overflow-hidden rounded-lg border border-border bg-surface text-[13px]"
      data-testid="run-compare-table"
    >
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
            &Delta;
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <CompareTableRow key={row.nodeId} row={row} />
        ))}
      </tbody>
    </table>
  );
}
