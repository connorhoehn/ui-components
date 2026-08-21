// frontend/src/components/pipelines/PipelineRunDiff.tsx
//
// Full pipeline run diff view — compare two runs of the same pipeline
// side-by-side. Shows: summary, step-by-step comparison, output diff per
// step, and context evolution diff.
//
// Route: /pipelines/:pipelineId/compare?a=runIdA&b=runIdB

import { useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router';

import { cn } from '../../lib/cn';
import { loadPipeline } from './persistence/pipelineStorage';
import { getRun } from './persistence/runHistory';
import { aggregateCost, formatUsd } from './cost/llmPricing';
import EmptyState from '../shared/EmptyState';
import Chip from '../shared/Chip';
import DiffMetadataHeader from './DiffMetadataHeader';
import DiffStepTable from './DiffStepTable';
import DiffOutputViewer, { computeJsonDiff } from './DiffOutputViewer';
import type {
  PipelineDefinition,
  PipelineRun,
} from '../../types/pipeline';

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
    <div
      className="overflow-hidden rounded-lg border border-border bg-surface"
      data-testid={testId}
    >
      <div
        className="flex cursor-pointer select-none items-center gap-2 border-b border-border bg-surface-inset px-4 py-3"
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
        <span className="text-xs text-text-tertiary">
          {open ? '▼' : '▶'}
        </span>
        <span className="text-[13px] font-bold text-text-primary">{title}</span>
        {badge && (
          <Chip tone="info" className="ml-auto">
            {badge}
          </Chip>
        )}
      </div>
      {open && <div className="p-4">{children}</div>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section 4: Context evolution diff
// ---------------------------------------------------------------------------

const DIFF_TYPE_CLASSES: Record<string, string> = {
  added:     'bg-success-bg text-success-fg',
  removed:   'bg-danger-bg text-danger-fg line-through',
  changed:   'bg-warning-bg text-warning-fg',
  unchanged: 'text-text-tertiary',
};

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
        <div className="p-4 text-center text-xs text-text-tertiary">
          Final contexts are identical.
        </div>
      ) : (
        <div className="flex flex-col gap-0.5">
          {diff.map((entry, i) => (
            <div
              key={`${entry.key}-${i}`}
              className={cn(
                'flex items-baseline gap-2 rounded-sm px-2 py-0.5 font-mono text-[11px]',
                DIFF_TYPE_CLASSES[entry.type],
              )}
            >
              <span className="min-w-[160px] shrink-0 font-semibold">
                {entry.type === 'added' && '+ '}
                {entry.type === 'removed' && '- '}
                {entry.type === 'changed' && '~ '}
                {entry.type === 'unchanged' && '  '}
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
              {entry.type === 'unchanged' && (
                <span className="opacity-50">{entry.valueA}</span>
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
      <div className="p-8">
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
      <div className="p-8" data-testid="diff-run-missing">
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

  const costA = runCostLabel(runA, modelMap);
  const costB = runCostLabel(runB, modelMap);

  return (
    <div
      className="mx-auto flex w-full max-w-[1400px] flex-col gap-5 p-6 text-text-primary"
      data-testid="pipeline-run-diff"
    >
      {/* Breadcrumb header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(`/pipelines/${pipelineId}/runs`)}
          className="cursor-pointer border-none bg-transparent p-0 text-[13px] text-primary"
        >
          &larr; {def.name}
        </button>
        <span className="text-text-tertiary">/</span>
        <span className="text-lg font-bold text-text-primary">
          Diff view
        </span>
        <span className="ml-auto font-mono text-[11px] text-text-tertiary">
          {runIdA.slice(0, 8)} vs {runIdB.slice(0, 8)}
        </span>
      </div>

      {/* Section 1: Summary */}
      <CollapsibleSection title="Summary" testId="diff-summary-section">
        <DiffMetadataHeader
          runA={runA}
          runB={runB}
          costA={costA}
          costB={costB}
        />
      </CollapsibleSection>

      {/* Section 2: Step-by-step comparison */}
      <CollapsibleSection
        title="Step-by-step comparison"
        badge={`${Object.keys(runA.steps).length + Object.keys(runB.steps).length > 0 ? 'steps' : '0 steps'}`}
        testId="diff-steps-section"
      >
        <DiffStepTable runA={runA} runB={runB} def={def} />
      </CollapsibleSection>

      {/* Section 3: Output diff */}
      <CollapsibleSection
        title="Output diff"
        defaultOpen={false}
        testId="diff-output-section"
      >
        <DiffOutputViewer runA={runA} runB={runB} def={def} />
      </CollapsibleSection>

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
