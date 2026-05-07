// frontend/src/components/pipelines/replay/ExecutionTimeline.tsx
//
// Execution timeline visualization for pipeline run replay (hub task #1004).
// Shows horizontal timeline with colored bars for each node's execution,
// positioned by start time and sized by duration.

import type { CSSProperties } from 'react';
import type { StepExecution, PipelineRun } from '../../../types/pipeline';
import { formatDuration } from '../utils/formatTime';

export interface ExecutionTimelineProps {
  run: PipelineRun;
  onNodeClick?: (nodeId: string) => void;
}

const timelineHeight = 120;
const nodeBarHeight = 20;
const nodeBarGap = 4;

const containerStyle: CSSProperties = {
  width: '100%',
  height: timelineHeight,
  background: '#ffffff',
  borderTop: '1px solid #e2e8f0',
  borderBottom: '1px solid #e2e8f0',
  position: 'relative',
  padding: '16px 24px',
  overflowX: 'auto',
  overflowY: 'hidden',
};

const timelineBarStyle: CSSProperties = {
  position: 'relative',
  height: nodeBarHeight * 4 + nodeBarGap * 3, // Support up to 4 parallel tracks
  background: '#f8fafc',
  borderRadius: 4,
  border: '1px solid #e2e8f0',
};

const nodeBarStyle = (
  status: string,
  leftPercent: number,
  widthPercent: number,
  track: number,
): CSSProperties => {
  const colors: Record<string, string> = {
    completed: '#16a34a',
    failed: '#dc2626',
    cancelled: '#64748b',
    skipped: '#94a3b8',
    running: '#2563eb',
  };

  return {
    position: 'absolute',
    left: `${leftPercent}%`,
    top: track * (nodeBarHeight + nodeBarGap),
    width: `${widthPercent}%`,
    height: nodeBarHeight,
    background: colors[status] || '#64748b',
    borderRadius: 3,
    cursor: 'pointer',
    transition: 'opacity 0.15s',
  };
};

const tooltipStyle: CSSProperties = {
  position: 'absolute',
  bottom: '100%',
  left: '50%',
  transform: 'translateX(-50%)',
  marginBottom: 8,
  padding: '6px 10px',
  background: '#0f172a',
  color: '#ffffff',
  fontSize: 11,
  borderRadius: 4,
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
  zIndex: 10,
  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
};

const labelStyle: CSSProperties = {
  fontSize: 11,
  color: '#64748b',
  marginBottom: 8,
};


function calculateRunBounds(run: PipelineRun): { minTime: number; maxTime: number } {
  const steps = Object.values(run.steps || {});
  if (steps.length === 0) {
    return { minTime: 0, maxTime: 1000 };
  }

  let minTime = Infinity;
  let maxTime = -Infinity;

  for (const step of steps) {
    if (step.startedAt) {
      const start = new Date(step.startedAt).getTime();
      minTime = Math.min(minTime, start);
    }
    if (step.completedAt) {
      const end = new Date(step.completedAt).getTime();
      maxTime = Math.max(maxTime, end);
    }
  }

  // Fallback if no valid timestamps
  if (!isFinite(minTime) || !isFinite(maxTime)) {
    return { minTime: 0, maxTime: 1000 };
  }

  return { minTime, maxTime };
}

function assignTracks(steps: Record<string, StepExecution>): Record<string, number> {
  // Simple track assignment: assign each node to the first available track
  // where it doesn't overlap with existing nodes on that track.
  const tracks: Array<Array<{ nodeId: string; start: number; end: number }>> = [];
  const assignment: Record<string, number> = {};

  const sorted = Object.entries(steps)
    .filter(([, step]) => step.startedAt)
    .sort((a, b) => {
      const aStart = new Date(a[1].startedAt!).getTime();
      const bStart = new Date(b[1].startedAt!).getTime();
      return aStart - bStart;
    });

  for (const [nodeId, step] of sorted) {
    const start = new Date(step.startedAt!).getTime();
    const end = step.completedAt ? new Date(step.completedAt).getTime() : start + 1000;

    let trackIndex = 0;
    let placed = false;

    // Try to place on existing track
    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i];
      const overlaps = track.some((item) => !(end <= item.start || start >= item.end));
      if (!overlaps) {
        track.push({ nodeId, start, end });
        assignment[nodeId] = i;
        placed = true;
        break;
      }
    }

    // Create new track if needed
    if (!placed) {
      trackIndex = tracks.length;
      tracks.push([{ nodeId, start, end }]);
      assignment[nodeId] = trackIndex;
    }
  }

  return assignment;
}

export default function ExecutionTimeline({ run, onNodeClick }: ExecutionTimelineProps) {
  if (!run.steps || Object.keys(run.steps).length === 0) {
    return (
      <div style={{ ...containerStyle, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: '#94a3b8', fontSize: 12 }}>No execution data available</span>
      </div>
    );
  }

  const { minTime, maxTime } = calculateRunBounds(run);
  const totalDuration = maxTime - minTime;
  const tracks = assignTracks(run.steps);

  return (
    <div style={containerStyle}>
      <div style={labelStyle}>
        Execution Timeline • Total Duration: {formatDuration(totalDuration)}
      </div>
      <div style={timelineBarStyle}>
        {Object.entries(run.steps).map(([nodeId, step]) => {
          if (!step.startedAt) return null;

          const start = new Date(step.startedAt).getTime();
          const end = step.completedAt ? new Date(step.completedAt).getTime() : start + (step.durationMs || 1000);
          const duration = end - start;

          const leftPercent = ((start - minTime) / totalDuration) * 100;
          const widthPercent = (duration / totalDuration) * 100;
          const track = tracks[nodeId] || 0;

          return (
            <div
              key={nodeId}
              style={nodeBarStyle(step.status, leftPercent, widthPercent, track)}
              onClick={() => onNodeClick?.(nodeId)}
              onMouseEnter={(e) => {
                const tooltip = e.currentTarget.querySelector('[data-tooltip]') as HTMLElement;
                if (tooltip) tooltip.style.display = 'block';
              }}
              onMouseLeave={(e) => {
                const tooltip = e.currentTarget.querySelector('[data-tooltip]') as HTMLElement;
                if (tooltip) tooltip.style.display = 'none';
              }}
            >
              <div data-tooltip style={{ ...tooltipStyle, display: 'none' }}>
                {nodeId} • {step.status} • {formatDuration(duration)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
