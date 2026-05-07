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
import type { CSSProperties } from 'react';
import type { NodeType, PipelineRun, StepExecution } from '../../types/pipeline';
import { colors } from '../../constants/styles';
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
  trigger:   '#6b7280', // gray
  llm:       '#2563eb', // blue
  transform: '#16a34a', // green
  condition: '#ca8a04', // yellow
  action:    '#7c3aed', // purple
  fork:      '#6b7280', // gray (structural)
  join:      '#6b7280', // gray (structural)
  approval:  '#ea580c', // orange
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
  /** For LLM nodes: ms from step start to first token. */
  firstTokenLatencyMs?: number;
  /** For LLM nodes: total tokens produced. */
  tokensOut?: number;
  tokensIn?: number;
  status: string;
  /** Hub#1287: total attempts (1 if no retries; >1 once retry executor lands). */
  attemptCount: number;
  /** Hub#1287: count of attempts that ended in error (== attemptCount-1 for runs that ultimately succeeded). */
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
// Styles
// ---------------------------------------------------------------------------

const containerStyle: CSSProperties = {
  width: '100%',
  background: colors.surface,
  border: `1px solid ${colors.border}`,
  borderRadius: 8,
  padding: '12px 16px',
  fontSize: 12,
  fontFamily: 'inherit',
};

const headerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 10,
};

const rowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  marginBottom: 4,
  position: 'relative',
};

const labelColStyle: CSSProperties = {
  width: 100,
  flexShrink: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontSize: 11,
  color: colors.textSecondary,
  fontFamily: 'monospace',
};

const barContainerStyle: CSSProperties = {
  flex: 1,
  height: 20,
  position: 'relative',
  background: colors.surfaceInset,
  borderRadius: 3,
  overflow: 'hidden',
};

const tooltipStyle: CSSProperties = {
  position: 'absolute',
  bottom: '100%',
  left: '50%',
  transform: 'translateX(-50%)',
  marginBottom: 6,
  padding: '6px 10px',
  background: '#0f172a',
  color: '#ffffff',
  fontSize: 11,
  borderRadius: 4,
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
  zIndex: 20,
  boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
  lineHeight: 1.5,
};

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
          : startMs + 100; // minimal fallback for in-progress
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

    // Sort by start time so the waterfall reads top-to-bottom chronologically.
    parsed.sort((a, b) => a.startMs - b.startMs);

    const total = Math.max(1, maxEnd - runStart);
    return { steps: parsed, totalDurationMs: total, runStartMs: runStart };
  }, [run, nodeTypes]);

  if (steps.length === 0) {
    return (
      <div style={{ ...containerStyle, textAlign: 'center', color: colors.textTertiary }}>
        No step execution data available
      </div>
    );
  }

  return (
    <div style={containerStyle} data-testid="step-timeline">
      {/* Header */}
      <div style={headerStyle}>
        <span style={{ fontWeight: 600, color: colors.textPrimary, fontSize: 12 }}>
          Step Execution Timeline
        </span>
        <span style={{ color: colors.textTertiary, fontSize: 11 }}>
          Total: {formatDuration(totalDurationMs)}
        </span>
      </div>

      {/* Time axis labels */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <div style={{ width: 100, flexShrink: 0 }} />
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 10,
            color: colors.textTertiary,
            fontFamily: 'monospace',
          }}
        >
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

        // For LLM steps with first-token latency, compute the wait portion
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
            style={{ ...rowStyle, cursor: onStepClick ? 'pointer' : undefined }}
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
            <div style={labelColStyle} title={step.stepId}>
              {step.stepId}
              {/* Hub#1287: retry badge — only renders for steps with >1 attempt. */}
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
            <div style={barContainerStyle}>
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
                {/* LLM first-token wait sub-section (lighter shade) */}
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
                  style={{
                    ...tooltipStyle,
                    left: `${offsetPct + widthPct / 2}%`,
                  }}
                >
                  <div style={{ fontWeight: 600 }}>{step.stepId}</div>
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
            <span
              style={{
                width: 52,
                flexShrink: 0,
                textAlign: 'right',
                fontSize: 10,
                fontFamily: 'monospace',
                color: colors.textTertiary,
              }}
            >
              {formatDuration(step.durationMs)}
            </span>
          </div>
        );
      })}

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px 12px',
          marginTop: 10,
          paddingTop: 8,
          borderTop: `1px solid ${colors.border}`,
        }}
      >
        {(
          ['trigger', 'llm', 'transform', 'condition', 'action', 'approval'] as NodeType[]
        ).map((t) => (
          <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                background: NODE_TYPE_COLORS[t],
              }}
            />
            <span style={{ fontSize: 10, color: colors.textSecondary }}>
              {nodeTypeLabel(t)}
            </span>
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              background: NODE_TYPE_COLORS_LIGHT.llm,
              border: `1px solid ${NODE_TYPE_COLORS.llm}`,
            }}
          />
          <span style={{ fontSize: 10, color: colors.textSecondary }}>
            First-token wait
          </span>
        </div>
      </div>
    </div>
  );
}
