// src/components/pipelines/context-inspector/ContextStepList.tsx
//
// Left sidebar list showing pipeline steps with navigation. Highlights the
// active step and indicates which steps added new context keys.

import { cn } from '../../../lib/cn';
import type { StepContextSnapshot } from './useContextSnapshots';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface ContextStepListProps {
  snapshots: StepContextSnapshot[];
  activeStepId: string | null;
  /** The snapshot that is currently displayed (fallback when activeStepId is null). */
  fallbackActiveStepId?: string;
  onStepSelect?: (stepId: string) => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ContextStepList({
  snapshots,
  activeStepId,
  fallbackActiveStepId,
  onStepSelect,
}: ContextStepListProps) {
  const resolvedActiveId = activeStepId ?? fallbackActiveStepId;

  return (
    <div className="w-[140px] shrink-0 border-r border-border overflow-y-auto">
      {snapshots.map((snapshot, idx) => {
        const active = snapshot.stepId === resolvedActiveId;
        return (
          <div
            key={snapshot.stepId || idx}
            className={cn(
              'px-2.5 py-1.5 text-[11px] font-mono cursor-pointer border-b border-border overflow-hidden text-ellipsis whitespace-nowrap',
              active
                ? 'text-text-primary bg-surface-inset font-semibold'
                : 'text-text-tertiary font-normal',
            )}
            onClick={() => onStepSelect?.(snapshot.stepId)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onStepSelect?.(snapshot.stepId);
            }}
            title={snapshot.stepId}
          >
            {snapshot.newKeys.length > 0 && (
              <span className="text-code-green mr-1 text-[9px]">+</span>
            )}
            <span className="text-[10px] text-code-comment mr-1">{idx + 1}.</span>
            {snapshot.stepId ? snapshot.stepId.slice(0, 8) : `step-${idx + 1}`}
          </div>
        );
      })}
    </div>
  );
}
