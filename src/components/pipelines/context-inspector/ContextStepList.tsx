// src/components/pipelines/context-inspector/ContextStepList.tsx
//
// Left sidebar list showing pipeline steps with navigation. Highlights the
// active step and indicates which steps added new context keys.

import { cn } from '../../../lib/cn';
import { onActivationKey } from '../../../lib/activationKey';
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
              'px-2.5 py-1.5 text-[11px] font-mono border-b border-border overflow-hidden text-ellipsis whitespace-nowrap',
              // `onStepSelect` is optional; without it the row selects
              // nothing, so it must not take a tab stop or claim to be a
              // button. The list is still readable as a step index.
              onStepSelect && 'cursor-pointer',
              active
                ? 'text-text-primary bg-surface-inset font-semibold'
                : 'text-text-tertiary font-normal',
            )}
            onClick={onStepSelect ? () => onStepSelect(snapshot.stepId) : undefined}
            role={onStepSelect ? 'button' : undefined}
            tabIndex={onStepSelect ? 0 : undefined}
            // Space must preventDefault or it also scrolls the step list.
            onKeyDown={
              onStepSelect
                ? onActivationKey(() => onStepSelect(snapshot.stepId))
                : undefined
            }
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
