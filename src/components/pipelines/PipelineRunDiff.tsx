// frontend/src/components/pipelines/PipelineRunDiff.tsx
//
// Full pipeline run diff view — compare two runs of the same pipeline
// side-by-side. Shows: summary, step-by-step comparison, output diff per
// step, and context evolution diff.
//
// Route: /pipelines/:pipelineId/compare?a=runIdA&b=runIdB

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router';

import { loadPipeline } from './persistence/pipelineStorage';
import { getRun } from './persistence/runHistory';
import { aggregateCost, formatUsd } from './cost/llmPricing';
import EmptyState from '../shared/EmptyState';
import { colors, chipStyle } from '../../constants/styles';
import type {
  PipelineDefinition,
  PipelineRun,
  RunStatus,
  StepExecution,
} from '../../types/pipeline';
import { formatDate, formatDuration } from './utils/formatTime';

// ---------------------------------------------------------------------------
// Props (for embedding) and route entry point
// ---------------------------------------------------------------------------

export interface PipelineRunDiffProps {
  pipelineId: string;
  runIdA: string;
  runIdB: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDelta(ms: number): string {
  if (ms === 0) return '0ms';
  const sign = ms > 0 ? '+' : '-';
  return `${sign}${formatDuration(Math.abs(ms))}`;
}

function runStatusVariant(s: RunStatus):
  | 'success' | 'danger' | 'neutral' | 'info' | 'warning' {
  switch (s) {
    case 'completed':         return 'success';
    case 'failed':            return 'danger';
    case 'cancelled':         return 'neutral';
    case 'awaiting_approval': return 'warning';
    case 'running':           return 'info';
    case 'pending':           return 'neutral';
    default:                  return 'neutral';
  }
}

function stepStatusVariant(s: string):
  | 'success' | 'danger' | 'neutral' | 'info' | 'warning' {
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

function modelByNodeIdMap(def: PipelineDefinition | null): Map<string, string> {
  const map = new Map<string, string>();
  if (!def) return map;
  for (const node of def.nodes) {
    if (node.data.type === 'llm') map.set(node.id, node.data.model);
  }
  return map;
}

function runCostLabel(
  run: PipelineRun,
  modelMap: Map<string, string>,
): string {
  const steps = Object.values(run.steps)
    .filter((s) => !!s.llm)
    .map((s) => ({
      model: modelMap.get(s.nodeId),
      tokensIn: s.llm?.tokensIn ?? 0,
      tokensOut: s.llm?.tokensOut ?? 0,
    }));
  return formatUsd(aggregateCost(steps).total);
}

// ---------------------------------------------------------------------------
// Simple JSON diff utilities
// ---------------------------------------------------------------------------

interface JsonDiffEntry {
  key: string;
  type: 'added' | 'removed' | 'changed' | 'unchanged';
  valueA?: string;
  valueB?: string;
}

/**
 * Flatten a JSON value to dot-notation key-value pairs. Handles nested objects
 * and arrays (arrays become key.0, key.1, etc). Depth is capped at 6 levels
 * to avoid runaway recursion on circular-ish structures.
 */
function flattenJson(
  obj: unknown,
  prefix = '',
  depth = 0,
): Map<string, string> {
  const result = new Map<string, string>();
  if (depth > 6 || obj == null) {
    result.set(prefix || '(root)', String(obj));
    return result;
  }

  if (typeof obj !== 'object') {
    result.set(prefix || '(root)', JSON.stringify(obj));
    return result;
  }

  if (Array.isArray(obj)) {
    if (obj.length === 0) {
      result.set(prefix || '(root)', '[]');
    } else {
      for (let i = 0; i < obj.length; i++) {
        const childPrefix = prefix ? `${prefix}.${i}` : String(i);
        for (const [k, v] of flattenJson(obj[i], childPrefix, depth + 1)) {
          result.set(k, v);
        }
      }
    }
    return result;
  }

  const entries = Object.entries(obj as Record<string, unknown>);
  if (entries.length === 0) {
    result.set(prefix || '(root)', '{}');
  } else {
    for (const [key, val] of entries) {
      const childPrefix = prefix ? `${prefix}.${key}` : key;
      for (const [k, v] of flattenJson(val, childPrefix, depth + 1)) {
        result.set(k, v);
      }
    }
  }
  return result;
}

function computeJsonDiff(a: unknown, b: unknown): JsonDiffEntry[] {
  const flatA = flattenJson(a);
  const flatB = flattenJson(b);
  const allKeys = new Set([...flatA.keys(), ...flatB.keys()]);
  const entries: JsonDiffEntry[] = [];

  for (const key of allKeys) {
    const valA = flatA.get(key);
    const valB = flatB.get(key);
    if (valA === undefined) {
      entries.push({ key, type: 'added', valueB: valB });
    } else if (valB === undefined) {
      entries.push({ key, type: 'removed', valueA: valA });
    } else if (valA !== valB) {
      entries.push({ key, type: 'changed', valueA: valA, valueB: valB });
    } else {
      entries.push({ key, type: 'unchanged', valueA: valA, valueB: valB });
    }
  }

  // Sort: changed/added/removed first, then unchanged
  const typeOrder: Record<JsonDiffEntry['type'], number> = {
    changed: 0,
    added: 1,
    removed: 2,
    unchanged: 3,
  };
  entries.sort((a, b) => {
    const o = typeOrder[a.type] - typeOrder[b.type];
    if (o !== 0) return o;
    return a.key.localeCompare(b.key);
  });

  return entries;
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const pageStyle: CSSProperties = {
  padding: 24,
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  fontFamily: 'inherit',
  color: colors.textPrimary,
  maxWidth: 1400,
  margin: '0 auto',
  width: '100%',
};

const sectionStyle: CSSProperties = {
  border: `1px solid ${colors.border}`,
  borderRadius: 8,
  overflow: 'hidden',
  background: colors.surface,
};

const sectionHeaderStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '12px 16px',
  background: colors.surfaceInset,
  borderBottom: `1px solid ${colors.border}`,
  cursor: 'pointer',
  userSelect: 'none',
};

const sectionTitleStyle: CSSProperties = {
  fontSize: 13,
  fontWeight: 700,
  color: colors.textPrimary,
};

const summaryColsStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 12,
};

const summaryCardStyle: CSSProperties = {
  background: colors.surface,
  border: `1px solid ${colors.border}`,
  borderRadius: 8,
  padding: 14,
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  fontSize: 12,
};

const labelStyle: CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  color: colors.textTertiary,
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
};

const tableStyle: CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: 13,
};

const thStyle: CSSProperties = {
  padding: '8px 12px',
  fontSize: 11,
  fontWeight: 600,
  color: colors.textSecondary,
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  borderBottom: `1px solid ${colors.border}`,
  textAlign: 'left',
  background: colors.surfaceInset,
};

const tdStyle: CSSProperties = {
  padding: '10px 12px',
  fontSize: 12,
  color: colors.textPrimary,
  borderBottom: `1px solid ${colors.border}`,
  verticalAlign: 'top',
};

const diffEntryStyle = (type: JsonDiffEntry['type']): CSSProperties => {
  const base: CSSProperties = {
    padding: '3px 8px',
    fontSize: 11,
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    borderRadius: 3,
    display: 'flex',
    gap: 8,
    alignItems: 'baseline',
  };
  switch (type) {
    case 'added':
      return { ...base, background: '#f0fdf4', color: '#166534' };
    case 'removed':
      return { ...base, background: '#fef2f2', color: '#991b1b', textDecoration: 'line-through' };
    case 'changed':
      return { ...base, background: '#fffbeb', color: '#92400e' };
    default:
      return { ...base, color: colors.textTertiary };
  }
};

// ---------------------------------------------------------------------------
// Collapsible Section
// ---------------------------------------------------------------------------

function CollapsibleSection({
  title,
  defaultOpen = true,
  badge,
  children,
  testId,
}: {
  title: string;
  defaultOpen?: boolean;
  badge?: string;
  children: React.ReactNode;
  testId?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div style={sectionStyle} data-testid={testId}>
      <div
        style={sectionHeaderStyle}
        onClick={() => setOpen(!open)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen(!open);
          }
        }}
        aria-expanded={open}
      >
        <span style={{ fontSize: 12, color: colors.textTertiary }}>
          {open ? '▼' : '▶'}
        </span>
        <span style={sectionTitleStyle}>{title}</span>
        {badge && (
          <span style={{ ...chipStyle('info'), marginLeft: 'auto' }}>
            {badge}
          </span>
        )}
      </div>
      {open && <div style={{ padding: 16 }}>{children}</div>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section 1: Summary comparison
// ---------------------------------------------------------------------------

function SummarySection({
  runA,
  runB,
  def,
  modelMap,
}: {
  runA: PipelineRun;
  runB: PipelineRun;
  def: PipelineDefinition | null;
  modelMap: Map<string, string>;
}) {
  const durationA = runA.durationMs ?? 0;
  const durationB = runB.durationMs ?? 0;
  const delta = durationB - durationA;
  const costA = runCostLabel(runA, modelMap);
  const costB = runCostLabel(runB, modelMap);

  return (
    <CollapsibleSection title="Summary" testId="diff-summary-section">
      <div style={summaryColsStyle}>
        <div style={summaryCardStyle} data-testid="diff-run-a-summary">
          <span style={labelStyle}>Run A</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: 'monospace', fontSize: 12, color: colors.textTertiary }}>
              {runA.id.slice(0, 8)}
            </span>
            <span style={chipStyle(runStatusVariant(runA.status))}>
              {runA.status}
            </span>
          </div>
          <div style={{ fontSize: 12, color: colors.textSecondary }}>
            {formatDate(runA.startedAt)}
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: 12 }}>
            {formatDuration(runA.durationMs)} | {costA}
          </div>
          <div style={{ fontSize: 11, color: colors.textTertiary }}>
            Trigger: {runA.triggeredBy.userId ?? runA.triggeredBy.triggerType}
          </div>
        </div>

        <div style={summaryCardStyle} data-testid="diff-run-b-summary">
          <span style={labelStyle}>Run B</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: 'monospace', fontSize: 12, color: colors.textTertiary }}>
              {runB.id.slice(0, 8)}
            </span>
            <span style={chipStyle(runStatusVariant(runB.status))}>
              {runB.status}
            </span>
          </div>
          <div style={{ fontSize: 12, color: colors.textSecondary }}>
            {formatDate(runB.startedAt)}
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: 12 }}>
            {formatDuration(runB.durationMs)} | {costB}
          </div>
          <div style={{ fontSize: 11, color: colors.textTertiary }}>
            Trigger: {runB.triggeredBy.userId ?? runB.triggeredBy.triggerType}
          </div>
        </div>
      </div>

      {/* Duration delta strip */}
      <div
        style={{
          marginTop: 12,
          padding: '10px 14px',
          background: colors.surfaceInset,
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
        data-testid="diff-duration-delta"
      >
        <span style={labelStyle}>Duration delta</span>
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: 14,
            fontWeight: 700,
            color: delta === 0
              ? colors.textSecondary
              : delta < 0
                ? '#16a34a'
                : '#dc2626',
          }}
        >
          {formatDelta(delta)}
        </span>
        <span style={{ fontSize: 11, color: colors.textTertiary }}>
          ({delta < 0 ? 'faster' : delta > 0 ? 'slower' : 'same'} in Run B)
        </span>
      </div>
    </CollapsibleSection>
  );
}

// ---------------------------------------------------------------------------
// Section 2: Step-by-step comparison
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

function StepComparisonSection({
  runA,
  runB,
  def,
}: {
  runA: PipelineRun;
  runB: PipelineRun;
  def: PipelineDefinition | null;
}) {
  const rows = useMemo(() => buildStepRows(runA, runB, def), [runA, runB, def]);

  return (
    <CollapsibleSection
      title="Step-by-step comparison"
      badge={`${rows.length} step${rows.length === 1 ? '' : 's'}`}
      testId="diff-steps-section"
    >
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Step</th>
            <th style={thStyle}>Run A</th>
            <th style={thStyle}>Run B</th>
            <th style={thStyle}>Delta</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            let rowBg: string | undefined;
            if (row.onlyInA || row.onlyInB) rowBg = '#fefce8';
            else if (row.statusDiffers) rowBg = '#fef2f2';

            return (
              <tr
                key={row.nodeId}
                style={{ background: rowBg }}
                data-testid={`diff-step-row-${row.nodeId}`}
              >
                <td style={tdStyle}>
                  <div style={{ fontWeight: 600 }}>{row.name}</div>
                  <div style={{ fontFamily: 'monospace', fontSize: 10, color: colors.textTertiary }}>
                    {row.nodeId}
                  </div>
                  {row.onlyInA && (
                    <span style={{ ...chipStyle('warning'), fontSize: 10 }}>only in A</span>
                  )}
                  {row.onlyInB && (
                    <span style={{ ...chipStyle('warning'), fontSize: 10 }}>only in B</span>
                  )}
                </td>
                <td style={tdStyle}>
                  {row.a ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <span style={chipStyle(stepStatusVariant(row.a.status))}>
                        {row.a.status}
                      </span>
                      <span style={{ fontFamily: 'monospace', fontSize: 11, color: colors.textSecondary }}>
                        {formatDuration(row.a.durationMs)}
                      </span>
                      {row.a.llm && (
                        <span style={{ fontSize: 10, color: colors.textTertiary }}>
                          {row.a.llm.tokensIn} in / {row.a.llm.tokensOut} out
                        </span>
                      )}
                    </div>
                  ) : (
                    <span style={{ color: colors.textTertiary }}>(not run)</span>
                  )}
                </td>
                <td style={tdStyle}>
                  {row.b ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <span style={chipStyle(stepStatusVariant(row.b.status))}>
                        {row.b.status}
                      </span>
                      <span style={{ fontFamily: 'monospace', fontSize: 11, color: colors.textSecondary }}>
                        {formatDuration(row.b.durationMs)}
                      </span>
                      {row.b.llm && (
                        <span style={{ fontSize: 10, color: colors.textTertiary }}>
                          {row.b.llm.tokensIn} in / {row.b.llm.tokensOut} out
                        </span>
                      )}
                    </div>
                  ) : (
                    <span style={{ color: colors.textTertiary }}>(not run)</span>
                  )}
                </td>
                <td style={{ ...tdStyle, fontFamily: 'monospace' }}>
                  {row.statusDiffers && (
                    <div style={{ color: '#dc2626', fontWeight: 600, fontSize: 11 }}>
                      status differs
                    </div>
                  )}
                  {row.durationDelta != null && (
                    <div
                      style={{
                        color: row.durationDelta === 0
                          ? colors.textTertiary
                          : row.durationDelta < 0
                            ? '#16a34a'
                            : '#dc2626',
                        fontSize: 12,
                      }}
                    >
                      {formatDelta(row.durationDelta)}
                    </div>
                  )}
                  {row.tokenDelta != null && row.tokenDelta !== 0 && (
                    <div
                      style={{
                        fontSize: 10,
                        color: row.tokenDelta < 0 ? '#16a34a' : '#dc2626',
                        marginTop: 2,
                      }}
                    >
                      {row.tokenDelta > 0 ? '+' : ''}{row.tokenDelta} tok
                    </div>
                  )}
                  {row.durationDelta == null && !row.statusDiffers && (
                    <span style={{ color: colors.textTertiary }}>--</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </CollapsibleSection>
  );
}

// ---------------------------------------------------------------------------
// Section 3: Output diff per step
// ---------------------------------------------------------------------------

function OutputDiffSection({
  runA,
  runB,
  def,
}: {
  runA: PipelineRun;
  runB: PipelineRun;
  def: PipelineDefinition | null;
}) {
  // Only show steps that have output in at least one run
  const stepsWithOutput = useMemo(() => {
    const seen = new Set<string>();
    const ordered: string[] = [];
    if (def) {
      for (const n of def.nodes) {
        const aHas = runA.steps[n.id]?.output != null;
        const bHas = runB.steps[n.id]?.output != null;
        if (aHas || bHas) {
          ordered.push(n.id);
          seen.add(n.id);
        }
      }
    }
    for (const id of [...Object.keys(runA.steps), ...Object.keys(runB.steps)]) {
      if (seen.has(id)) continue;
      const aHas = runA.steps[id]?.output != null;
      const bHas = runB.steps[id]?.output != null;
      if (aHas || bHas) {
        ordered.push(id);
        seen.add(id);
      }
    }
    return ordered;
  }, [runA, runB, def]);

  if (stepsWithOutput.length === 0) {
    return (
      <CollapsibleSection title="Output diff" defaultOpen={false} testId="diff-output-section">
        <div style={{ color: colors.textTertiary, fontSize: 12, textAlign: 'center', padding: 16 }}>
          No step outputs to compare.
        </div>
      </CollapsibleSection>
    );
  }

  return (
    <CollapsibleSection
      title="Output diff"
      defaultOpen={false}
      badge={`${stepsWithOutput.length} step${stepsWithOutput.length === 1 ? '' : 's'}`}
      testId="diff-output-section"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {stepsWithOutput.map((nodeId) => (
          <StepOutputDiff
            key={nodeId}
            nodeId={nodeId}
            name={lookupNodeName(def, nodeId)}
            outputA={runA.steps[nodeId]?.output}
            outputB={runB.steps[nodeId]?.output}
          />
        ))}
      </div>
    </CollapsibleSection>
  );
}

function StepOutputDiff({
  nodeId,
  name,
  outputA,
  outputB,
}: {
  nodeId: string;
  name: string;
  outputA: unknown;
  outputB: unknown;
}) {
  const [expanded, setExpanded] = useState(false);
  const diff = useMemo(() => computeJsonDiff(outputA, outputB), [outputA, outputB]);
  const changedCount = diff.filter((e) => e.type !== 'unchanged').length;

  if (changedCount === 0) {
    return (
      <div style={{ padding: '8px 12px', background: colors.surfaceInset, borderRadius: 6 }}>
        <span style={{ fontWeight: 600, fontSize: 12 }}>{name}</span>
        <span style={{ fontSize: 11, color: colors.textTertiary, marginLeft: 8 }}>
          (no differences)
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        border: `1px solid ${colors.border}`,
        borderRadius: 6,
        overflow: 'hidden',
      }}
      data-testid={`diff-output-${nodeId}`}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 12px',
          background: colors.surfaceInset,
          cursor: 'pointer',
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <span style={{ fontSize: 11, color: colors.textTertiary }}>
          {expanded ? '▼' : '▶'}
        </span>
        <span style={{ fontWeight: 600, fontSize: 12 }}>{name}</span>
        <span style={{ fontFamily: 'monospace', fontSize: 10, color: colors.textTertiary }}>
          {nodeId}
        </span>
        <span style={{ ...chipStyle('warning'), marginLeft: 'auto', fontSize: 10 }}>
          {changedCount} difference{changedCount === 1 ? '' : 's'}
        </span>
      </div>
      {expanded && (
        <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 3 }}>
          {diff
            .filter((e) => e.type !== 'unchanged')
            .map((entry, i) => (
              <div key={`${entry.key}-${i}`} style={diffEntryStyle(entry.type)}>
                <span style={{ fontWeight: 600, minWidth: 120, flexShrink: 0 }}>
                  {entry.type === 'added' && '+ '}
                  {entry.type === 'removed' && '- '}
                  {entry.type === 'changed' && '~ '}
                  {entry.key}
                </span>
                {entry.type === 'changed' && (
                  <span>
                    <span style={{ textDecoration: 'line-through', opacity: 0.7 }}>
                      {entry.valueA}
                    </span>
                    {' -> '}
                    <span style={{ fontWeight: 600 }}>{entry.valueB}</span>
                  </span>
                )}
                {entry.type === 'added' && <span>{entry.valueB}</span>}
                {entry.type === 'removed' && <span>{entry.valueA}</span>}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section 4: Context evolution diff
// ---------------------------------------------------------------------------

function ContextDiffSection({
  runA,
  runB,
}: {
  runA: PipelineRun;
  runB: PipelineRun;
}) {
  const diff = useMemo(
    () => computeJsonDiff(runA.context, runB.context),
    [runA.context, runB.context],
  );
  const changedCount = diff.filter((e) => e.type !== 'unchanged').length;

  return (
    <CollapsibleSection
      title="Context evolution diff"
      defaultOpen={false}
      badge={changedCount > 0 ? `${changedCount} difference${changedCount === 1 ? '' : 's'}` : undefined}
      testId="diff-context-section"
    >
      {changedCount === 0 ? (
        <div style={{ color: colors.textTertiary, fontSize: 12, textAlign: 'center', padding: 16 }}>
          Final contexts are identical.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {diff.map((entry, i) => (
            <div key={`${entry.key}-${i}`} style={diffEntryStyle(entry.type)}>
              <span style={{ fontWeight: 600, minWidth: 160, flexShrink: 0 }}>
                {entry.type === 'added' && '+ '}
                {entry.type === 'removed' && '- '}
                {entry.type === 'changed' && '~ '}
                {entry.type === 'unchanged' && '  '}
                {entry.key}
              </span>
              {entry.type === 'changed' && (
                <span>
                  <span style={{ textDecoration: 'line-through', opacity: 0.7 }}>
                    {entry.valueA}
                  </span>
                  {' -> '}
                  <span style={{ fontWeight: 600 }}>{entry.valueB}</span>
                </span>
              )}
              {entry.type === 'added' && <span>{entry.valueB}</span>}
              {entry.type === 'removed' && <span>{entry.valueA}</span>}
              {entry.type === 'unchanged' && (
                <span style={{ opacity: 0.5 }}>{entry.valueA}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </CollapsibleSection>
  );
}

// ---------------------------------------------------------------------------
// Main component (embeddable via props)
// ---------------------------------------------------------------------------

function PipelineRunDiffContent({ pipelineId, runIdA, runIdB }: PipelineRunDiffProps) {
  const navigate = useNavigate();

  const def = useMemo(
    () => loadPipeline(pipelineId),
    [pipelineId],
  );
  const runA = useMemo(
    () => getRun(pipelineId, runIdA),
    [pipelineId, runIdA],
  );
  const runB = useMemo(
    () => getRun(pipelineId, runIdB),
    [pipelineId, runIdB],
  );
  const modelMap = useMemo(() => modelByNodeIdMap(def), [def]);

  if (!def) {
    return (
      <div style={{ padding: 32 }}>
        <EmptyState
          icon="🔍"
          title="Pipeline not found"
          body="It may have been deleted. Go back to the pipelines list."
          actionLabel="Back to pipelines"
          onAction={() => navigate('/pipelines')}
        />
      </div>
    );
  }

  if (!runA || !runB) {
    return (
      <div style={{ padding: 32 }} data-testid="diff-run-missing">
        <EmptyState
          icon="🔍"
          title="Run not found"
          body="One or both runs are unavailable -- they may have been trimmed from history."
          actionLabel="Back to runs"
          onAction={() => navigate(`/pipelines/${pipelineId}/runs`)}
        />
      </div>
    );
  }

  return (
    <div style={pageStyle} data-testid="pipeline-run-diff">
      {/* Breadcrumb header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          type="button"
          onClick={() => navigate(`/pipelines/${pipelineId}/runs`)}
          style={{
            background: 'none',
            border: 'none',
            color: colors.primary,
            cursor: 'pointer',
            fontSize: 13,
            padding: 0,
          }}
        >
          &larr; {def.name}
        </button>
        <span style={{ color: colors.textTertiary }}>/</span>
        <span style={{ fontSize: 18, fontWeight: 700, color: colors.textPrimary }}>
          Diff view
        </span>
        <span style={{ fontSize: 11, color: colors.textTertiary, fontFamily: 'monospace', marginLeft: 'auto' }}>
          {runIdA.slice(0, 8)} vs {runIdB.slice(0, 8)}
        </span>
      </div>

      {/* Section 1: Summary */}
      <SummarySection runA={runA} runB={runB} def={def} modelMap={modelMap} />

      {/* Section 2: Step-by-step comparison */}
      <StepComparisonSection runA={runA} runB={runB} def={def} />

      {/* Section 3: Output diff */}
      <OutputDiffSection runA={runA} runB={runB} def={def} />

      {/* Section 4: Context evolution diff */}
      <ContextDiffSection runA={runA} runB={runB} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Route page — reads pipelineId from URL params, runIds from query params
// ---------------------------------------------------------------------------

export default function PipelineRunDiffPage() {
  const { pipelineId } = useParams<{ pipelineId: string }>();
  const [searchParams] = useSearchParams();

  const runIdA = searchParams.get('a');
  const runIdB = searchParams.get('b');

  if (!pipelineId || !runIdA || !runIdB) {
    return <Navigate to="/pipelines" replace />;
  }

  return <PipelineRunDiffContent pipelineId={pipelineId} runIdA={runIdA} runIdB={runIdB} />;
}
