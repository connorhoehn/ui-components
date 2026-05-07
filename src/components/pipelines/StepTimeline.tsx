// frontend/src/components/pipelines/StepTimeline.tsx
//
// Step Execution Timeline — a visual waterfall/Gantt chart showing per-step
// duration and LLM first-token latency. Renders as CSS flexbox-based horizontal
// bars without any heavy charting library.
//
// Props:
//   - run: PipelineRun — the completed (or in-progress) run snapshot
//   - nodeTypes: map of nodeId -> NodeType (from pipeline definition)
//   - onStepHover: optional callback for canvas node highlighting

import { useMemo, useState } from 'react';
import type { NodeType, PipelineRun, StepExecution } from '../../types/pipeline';
import { cn } from '../../lib/cn';
import Chip from '../shared/Chip';
import { formatDuration } from './utils/formatTime';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface StepTimelineProps {
  run: PipelineRun;
  /** Map of nodeId -> NodeType from the pipeline definition. */
  nodeTypes?: Record<string, NodeType>;
  /** Called when user hovers a step bar — parent can highlight the canvas node. */
  onStepHover?: (stepId: string | null) => void;
  /** Called when user clicks a step bar — can drive context inspector selection. */
  onStepClick?: (stepId: string) => void;
}

// ---------------------------------------------------------------------------
// Color mapping: node type -> bar color
// ---------------------------------------------------------------------------

const NODE_TYPE_COLORS: Record<NodeType, string> = {
  trigger:   '#6b7280',
  llm:       '#2563eb',
  transform: '#16a34a',
  condition: '#ca8a04',
  action:    '#7c3aed',
  fork:      '#6b7280',
  join:      '#6b7280',
  approval:  '#ea580c',
};

const NODE_TYPE_COLORS_LIGHT: Record<NodeType, string> = {
  trigger:   '#d1d5db',
  llm:       '#93c5fd',
  transform: '#86efac',
  condition: '#fde047',
  action:    '#c4b5fd',
  fork:      '#d1d5db',
  join:      '#d1d5db',
  approval:  '#fdba74',
};

// ---------------------------------------------------------------------------
// Parsed step data
// ---------------------------------------------------------------------------

interface ParsedStep {
  stepId: string;
  nodeType: NodeType;
  startMs: number;
  endMs: number;
  durationMs: number;
  firstTokenLatencyMs?: number;
  tokensOut?: number;
  tokensIn?: number;
  status: string;
  attemptCount: number;
  failedAttempts: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function parseTs(iso: string | undefined, fallback: number): number {
  if (!iso) return fallback;
  const t = Date.parse(iso);
  return Number.isFinite(t) ? t : fallback;
}

function inferNodeType(step: StepExecution): NodeType {
  if (step.llm) return 'llm';
  if (step.approvals && step.approvals.length > 0) return 'approval';
  return 'action';
}


function nodeTypeLabel(t: NodeType): string {
  return t.charAt(0).toUpperCase() + t.slice(1);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function StepTimeline({
  run,
  nodeTypes,
  onStepHover,
  onStepClick,
}: StepTimelineProps) {
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);

  const { steps, totalDurationMs, runStartMs } = useMemo(() => {
    const runStart = parseTs(run.startedAt, Date.now());
    const entries = Object.values(run.steps);
    if (entries.length === 0) {
      return { steps: [] as ParsedStep[], totalDurationMs: 0, runStartMs: runStart };
    }

    const parsed: ParsedStep[] = [];
    let maxEnd = runStart;

    for (const step of entries) {
      const startMs = parseTs(step.startedAt, runStart);
      const endMs = step.completedAt
        ? parseTs(step.completedAt, startMs)
        : step.durationMs
          ? startMs + step.durationMs
          : startMs + 100;
      const durationMs = Math.max(0, endMs - startMs);

      const resolvedNodeType = nodeTypes?.[step.nodeId] ?? inferNodeType(step);

      const attempts = step.attempts ?? [];
      const failedAttempts = attempts.filter((a) => a.error != null).length;

      parsed.push({
        stepId: step.nodeId,
        nodeType: resolvedNodeType,
        startMs,
        endMs,
        durationMs,
        firstTokenLatencyMs: step.llm?.firstTokenLatencyMs,
        tokensOut: step.llm?.tokensOut,
        tokensIn: step.llm?.tokensIn,
        status: step.status,
        attemptCount: Math.max(1, attempts.length),
        failedAttempts,
      });

      if (endMs > maxEnd) maxEnd = endMs;
    }

    parsed.sort((a, b) => a.startMs - b.startMs);

    const total = Math.max(1, maxEnd - runStart);
    return { steps: parsed, totalDurationMs: total, runStartMs: runStart };
  }, [run, nodeTypes]);

  if (steps.length === 0) {
    return (
      <div className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-xs font-[inherit] text-center text-text-tertiary">
        No step execution data available
      </div>
    );
  }

  return (
    <div className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-xs font-[inherit]" data-testid="step-timeline">
      {/* Header */}
      <div className="flex items-center justify-between mb-2.5">
        <span className="font-semibold text-text-primary text-xs">
          Step Execution Timeline
        </span>
        <span className="text-text-tertiary text-[11px]">
          Total: {formatDuration(totalDurationMs)}
        </span>
      </div>

      {/* Time axis labels */}
      <div className="flex items-center gap-2 mb-1.5">
        <div className="w-[100px] shrink-0" />
        <div className="flex-1 flex justify-between text-[10px] text-text-tertiary font-mono">
          <span>0ms</span>
          <span>{formatDuration(totalDurationMs / 4)}</span>
          <span>{formatDuration(totalDurationMs / 2)}</span>
          <span>{formatDuration((totalDurationMs * 3) / 4)}</span>
          <span>{formatDuration(totalDurationMs)}</span>
        </div>
      </div>

      {/* Step rows */}
      {steps.map((step) => {
        const offsetPct = ((step.startMs - runStartMs) / totalDurationMs) * 100;
        const widthPct = Math.max(0.5, (step.durationMs / totalDurationMs) * 100);
        const barColor = NODE_TYPE_COLORS[step.nodeType];
        const lightColor = NODE_TYPE_COLORS_LIGHT[step.nodeType];
        const isHovered = hoveredStep === step.stepId;

        let waitWidthPct = 0;
        if (step.nodeType === 'llm' && step.firstTokenLatencyMs && step.durationMs > 0) {
          waitWidthPct = Math.min(
            100,
            (step.firstTokenLatencyMs / step.durationMs) * 100,
          );
        }

        return (
          <div
            key={step.stepId}
            className={cn('flex items-center gap-2 mb-1 relative', onStepClick && 'cursor-pointer')}
            onMouseEnter={() => {
              setHoveredStep(step.stepId);
              onStepHover?.(step.stepId);
            }}
            onMouseLeave={() => {
              setHoveredStep(null);
              onStepHover?.(null);
            }}
            onClick={() => onStepClick?.(step.stepId)}
          >
            {/* Step label */}
            <div className="w-[100px] shrink-0 overflow-hidden text-ellipsis whitespace-nowrap text-[11px] text-text-secondary font-mono" title={step.stepId}>
              {step.stepId}
              {step.attemptCount > 1 && (
                <Chip
                  data-testid={`step-retry-badge-${step.stepId}`}
                  tone="caution"
                  solid
                  mono
                  size="xs"
                  style={{ marginLeft: 4, padding: '0 4px', fontSize: 9 }}
                  title={`${step.attemptCount} attempts (${step.failedAttempts} failed before success)`}
                >
                  ×{step.attemptCount}
                </Chip>
              )}
            </div>

            {/* Bar area */}
            <div className="flex-1 h-5 relative bg-[#fafbfc] rounded-[3px] overflow-hidden">
              {/* Main execution bar */}
              <div
                style={{
                  position: 'absolute',
                  left: `${offsetPct}%`,
                  top: 2,
                  bottom: 2,
                  width: `${widthPct}%`,
                  borderRadius: 3,
                  background: barColor,
                  opacity: isHovered ? 1 : 0.85,
                  transition: 'opacity 0.1s',
                  display: 'flex',
                  overflow: 'hidden',
                }}
              >
                {/* LLM first-token wait sub-section */}
                {waitWidthPct > 0 && (
                  <div
                    style={{
                      width: `${waitWidthPct}%`,
                      height: '100%',
                      background: lightColor,
                      borderRadius: '3px 0 0 3px',
                      opacity: 0.7,
                    }}
                    title={`First token wait: ${formatDuration(step.firstTokenLatencyMs!)}`}
                  />
                )}
              </div>

              {/* Tooltip on hover */}
              {isHovered && (
                <div
                  className="absolute bottom-full -translate-x-1/2 mb-1.5 px-2.5 py-1.5 bg-[#0f172a] text-white text-[11px] rounded whitespace-nowrap pointer-events-none z-20 shadow-[0_2px_8px_rgba(0,0,0,0.18)] leading-relaxed"
                  style={{ left: `${offsetPct + widthPct / 2}%` }}
                >
                  <div className="font-semibold">{step.stepId}</div>
                  <div>Type: {nodeTypeLabel(step.nodeType)}</div>
                  <div>Duration: {formatDuration(step.durationMs)}</div>
                  <div>Status: {step.status}</div>
                  {step.attemptCount > 1 && (
                    <div>
                      Attempts: {step.attemptCount}
                      {step.failedAttempts > 0 && ` (${step.failedAttempts} failed before success)`}
                    </div>
                  )}
                  {step.firstTokenLatencyMs != null && (
                    <div>First token: {formatDuration(step.firstTokenLatencyMs)}</div>
                  )}
                  {step.tokensIn != null && step.tokensIn > 0 && (
                    <div>Tokens in: {step.tokensIn}</div>
                  )}
                  {step.tokensOut != null && step.tokensOut > 0 && (
                    <div>Tokens out: {step.tokensOut}</div>
                  )}
                </div>
              )}
            </div>

            {/* Duration label */}
            <span className="w-[52px] shrink-0 text-right text-[10px] font-mono text-text-tertiary">
              {formatDuration(step.durationMs)}
            </span>
          </div>
        );
      })}

      {/* Legend */}
      <div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-2.5 pt-2 border-t border-border">
        {(
          ['trigger', 'llm', 'transform', 'condition', 'action', 'approval'] as NodeType[]
        ).map((t) => (
          <div key={t} className="flex items-center gap-1">
            <div
              className="w-2.5 h-2.5 rounded-sm"
              style={{ background: NODE_TYPE_COLORS[t] }}
            />
            <span className="text-[10px] text-text-secondary">
              {nodeTypeLabel(t)}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-1">
          <div
            className="w-2.5 h-2.5 rounded-sm"
            style={{
              background: NODE_TYPE_COLORS_LIGHT.llm,
              border: `1px solid ${NODE_TYPE_COLORS.llm}`,
            }}
          />
          <span className="text-[10px] text-text-secondary">
            First-token wait
          </span>
        </div>
      </div>
    </div>
  );
}
