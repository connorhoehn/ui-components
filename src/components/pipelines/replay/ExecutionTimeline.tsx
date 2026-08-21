// frontend/src/components/pipelines/replay/ExecutionTimeline.tsx
//
// Execution timeline visualization for pipeline run replay (hub task #1004).
// Shows horizontal timeline with colored bars for each node's execution,
// positioned by start time and sized by duration.

import type { StepExecution, PipelineRun } from '../../../types/pipeline';
import { formatDuration } from '../utils/formatTime';

export interface ExecutionTimelineProps {
  run: PipelineRun;
  onNodeClick?: (nodeId: string) => void;
}

const nodeBarHeight = 20;
const nodeBarGap = 4;

/** Runtime color lookup for node status (dynamic values, kept as inline style). */
const statusColors: Record<string, string> = {
  completed: 'var(--color-state-completed)',
  failed: 'var(--color-state-failed)',
  cancelled: 'var(--color-neutral)',
  skipped: 'var(--color-text-tertiary)',
  running: 'var(--color-state-running)',
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
      <div className="w-full h-[120px] bg-white border-t border-b border-border relative px-6 py-4 overflow-x-auto overflow-y-hidden flex items-center justify-center">
        <span className="text-text-tertiary text-xs">No execution data available</span>
      </div>
    );
  }

  const { minTime, maxTime } = calculateRunBounds(run);
  const totalDuration = maxTime - minTime;
  const tracks = assignTracks(run.steps);

  return (
    <div className="w-full h-[120px] bg-white border-t border-b border-border relative px-6 py-4 overflow-x-auto overflow-y-hidden">
      <div className="text-[11px] text-neutral mb-2">
        Execution Timeline &bull; Total Duration: {formatDuration(totalDuration)}
      </div>
      <div
        className="relative bg-surface-panel rounded-sm border border-border"
        style={{ height: nodeBarHeight * 4 + nodeBarGap * 3 }}
      >
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
              className="absolute rounded-[3px] cursor-pointer transition-opacity duration-150"
              style={{
                left: `${leftPercent}%`,
                top: track * (nodeBarHeight + nodeBarGap),
                width: `${widthPercent}%`,
                height: nodeBarHeight,
                background: statusColors[step.status] || 'var(--color-neutral)',
              }}
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
              <div
                data-tooltip
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-surface-inverse text-white text-[11px] rounded-sm whitespace-nowrap pointer-events-none z-10 shadow-md hidden"
              >
                {nodeId} &bull; {step.status} &bull; {formatDuration(duration)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
