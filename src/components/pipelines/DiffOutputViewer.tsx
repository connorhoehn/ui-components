// frontend/src/components/pipelines/DiffOutputViewer.tsx
//
// JSON diff viewer for comparing step outputs between two pipeline runs.
// Shows added/removed/changed entries with color-coded highlighting.
// Extracted from PipelineRunDiff.tsx.

import { useMemo, useState } from 'react';

import { cn } from '../../lib/cn';
import Chip from '../shared/Chip';
import type { PipelineDefinition, PipelineRun } from '../../types/pipeline';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

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
// JSON diff utilities
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

export function computeJsonDiff(a: unknown, b: unknown): JsonDiffEntry[] {
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
// Diff entry row styling
// ---------------------------------------------------------------------------

const DIFF_TYPE_CLASSES: Record<JsonDiffEntry['type'], string> = {
  added:     'bg-success-bg text-success-fg',
  removed:   'bg-danger-bg text-danger-fg line-through',
  changed:   'bg-warning-bg text-warning-fg',
  unchanged: 'text-text-tertiary',
};

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface DiffOutputViewerProps {
  runA: PipelineRun;
  runB: PipelineRun;
  def: PipelineDefinition | null;
}

// ---------------------------------------------------------------------------
// Single step output diff
// ---------------------------------------------------------------------------

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
      <div className="rounded-md bg-surface-inset px-3 py-2">
        <span className="text-xs font-semibold">{name}</span>
        <span className="ml-2 text-[11px] text-text-tertiary">
          (no differences)
        </span>
      </div>
    );
  }

  return (
    <div
      className="overflow-hidden rounded-md border border-border"
      data-testid={`diff-output-${nodeId}`}
    >
      <button
        type="button"
        aria-expanded={expanded}
        className="flex w-full cursor-pointer items-center gap-2 border-none bg-surface-inset px-3 py-2 text-left font-[inherit]"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="text-[11px] text-text-tertiary">
          {expanded ? '▼' : '▶'}
        </span>
        <span className="text-xs font-semibold">{name}</span>
        <span className="font-mono text-[10px] text-text-tertiary">
          {nodeId}
        </span>
        <Chip tone="warning" size="xs" className="ml-auto">
          {changedCount} difference{changedCount === 1 ? '' : 's'}
        </Chip>
      </button>
      {expanded && (
        <div className="flex flex-col gap-0.5 px-3 py-2">
          {diff
            .filter((e) => e.type !== 'unchanged')
            .map((entry, i) => (
              <div
                key={`${entry.key}-${i}`}
                className={cn(
                  'flex items-baseline gap-2 rounded-sm px-2 py-0.5 font-mono text-[11px]',
                  DIFF_TYPE_CLASSES[entry.type],
                )}
              >
                <span className="min-w-[120px] shrink-0 font-semibold">
                  {entry.type === 'added' && '+ '}
                  {entry.type === 'removed' && '- '}
                  {entry.type === 'changed' && '~ '}
                  {entry.key}
                </span>
                {entry.type === 'changed' && (
                  <span>
                    <span className="line-through opacity-70">
                      {entry.valueA}
                    </span>
                    {' -> '}
                    <span className="font-semibold">{entry.valueB}</span>
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
// Main component
// ---------------------------------------------------------------------------

export default function DiffOutputViewer({ runA, runB, def }: DiffOutputViewerProps) {
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
      <div className="p-4 text-center text-xs text-text-tertiary">
        No step outputs to compare.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
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
  );
}
