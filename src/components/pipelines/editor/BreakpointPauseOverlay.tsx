// src/components/pipelines/editor/BreakpointPauseOverlay.tsx
//
// Overlay displayed when execution hits a debug breakpoint. Shows the paused
// step name, action buttons (Apply & Continue, Continue, Step Over, Resume All),
// a ContextInspector for editing paused context, and a patch history side panel.

import { cn } from '../../../lib/cn';
import { usePipelineRuns } from '../context/PipelineRunsContext';
import ContextInspector from '../ContextInspector';
import { lookupStepName } from './useEditorRunLifecycle';
import type { PipelineDefinition } from '../../../types/pipeline';

export interface BreakpointPauseOverlayProps {
  definition: PipelineDefinition;
  pausedBreakpoint: { runId: string; stepId: string };
  applyingPatch: boolean;
  revertingPatchId: string | null;
  dirtyPatch: Record<string, unknown> | null;
  dirtyPatchStepId: string | null;
  resetEditBufferKey: number;
  onContinue: () => void;
  onStepOver: () => void;
  onResumeAll: () => void;
  onApplyAndContinue: () => void;
  onRevertPatch: (patchId: string) => void;
  onEditBufferChange: (stepId: string, buffer: Record<string, unknown> | null) => void;
}

export default function BreakpointPauseOverlay({
  definition,
  pausedBreakpoint,
  applyingPatch,
  revertingPatchId,
  dirtyPatch,
  dirtyPatchStepId,
  resetEditBufferKey,
  onContinue,
  onStepOver,
  onResumeAll,
  onApplyAndContinue,
  onRevertPatch,
  onEditBufferChange,
}: BreakpointPauseOverlayProps) {
  const runs = usePipelineRuns();
  const pausedRun = runs.runs[pausedBreakpoint.runId] ?? null;
  const pausedStep = pausedRun?.steps?.[pausedBreakpoint.stepId];
  const stepPatches = pausedStep?.patches ?? [];
  const canApplyAndContinue =
    !!dirtyPatch &&
    dirtyPatchStepId === pausedBreakpoint.stepId &&
    Object.keys(dirtyPatch).length > 0;
  const revertAllowed = pausedRun?.status === 'paused_at_breakpoint';

  return (
    <div
      data-testid="breakpoint-pause-overlay"
      className={cn(
        'absolute top-14 left-1/2 -translate-x-1/2 z-30',
        'bg-surface border-2 border-warning rounded-lg',
        'px-4 py-3 shadow-[0_8px_24px_rgba(217,119,6,0.2)]',
        'flex flex-col gap-3 font-inherit',
        'w-[min(900px,92vw)] max-h-[calc(100vh-120px)]',
      )}
    >
      {/* Toolbar row */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-[13px] font-semibold text-warning-fg">
          Paused at: {lookupStepName(definition, pausedBreakpoint.stepId)}
        </span>
        {canApplyAndContinue && (
          <button
            type="button"
            onClick={onApplyAndContinue}
            disabled={applyingPatch}
            data-testid="breakpoint-apply-continue-btn"
            className={cn(
              'px-3 py-1 text-xs font-semibold bg-success-bg text-text-primary',
              'border-none rounded cursor-pointer font-inherit',
              applyingPatch && 'cursor-wait opacity-70',
            )}
          >
            {applyingPatch ? 'Applying…' : 'Apply & Continue'}
          </button>
        )}
        <button
          type="button"
          onClick={onContinue}
          disabled={applyingPatch}
          className={cn(
            'px-3 py-1 text-xs font-semibold bg-warning text-white',
            'border-none rounded font-inherit',
            applyingPatch ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
          )}
          data-testid="breakpoint-continue-btn"
        >
          Continue
        </button>
        <button
          type="button"
          onClick={onStepOver}
          disabled={applyingPatch}
          className={cn(
            'px-3 py-1 text-xs font-semibold bg-transparent text-warning-fg',
            'border border-warning rounded font-inherit',
            applyingPatch ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
          )}
          data-testid="breakpoint-step-over-btn"
        >
          Step Over
        </button>
        <button
          type="button"
          onClick={onResumeAll}
          disabled={applyingPatch}
          className={cn(
            'px-3 py-1 text-xs font-semibold bg-transparent text-warning-fg',
            'border border-warning rounded font-inherit',
            applyingPatch ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
          )}
          data-testid="breakpoint-resume-all-btn"
        >
          Resume All
        </button>
      </div>

      {/* Body: ContextInspector (editable) + Patch history side panel */}
      <div
        className="grid [grid-template-columns:minmax(0,1fr)_240px] gap-3 min-h-[280px] max-h-[calc(100vh-220px)]"
      >
        <div className="border border-border rounded-md bg-surface-inset overflow-hidden min-h-0">
          {pausedRun ? (
            <ContextInspector
              run={pausedRun}
              activeStepId={pausedBreakpoint.stepId}
              editable
              onEditBufferChange={onEditBufferChange}
              resetEditBufferKey={resetEditBufferKey}
            />
          ) : (
            <div className="p-3 text-xs text-text-tertiary">
              Loading run…
            </div>
          )}
        </div>

        {/* Patch history side panel */}
        <div
          data-testid="breakpoint-patch-history"
          className="border border-border rounded-md bg-surface-inset p-2.5 overflow-auto min-h-0"
        >
          <div className="text-[10px] font-bold text-text-primary tracking-wide uppercase mb-2">
            Patch history ({stepPatches.length})
          </div>
          {stepPatches.length === 0 ? (
            <div
              className="text-[11px] text-text-tertiary italic"
              data-testid="breakpoint-patch-history-empty"
            >
              No patches applied yet.
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {stepPatches.map((p) => {
                const reverted = !!p.revertedAt;
                return (
                  <div
                    key={p.patchId}
                    data-testid={`breakpoint-patch-row-${p.patchId}`}
                    className={cn(
                      'border border-border rounded p-1.5',
                      reverted ? 'bg-gray-500/10 opacity-60' : 'bg-[#11111b]',
                    )}
                  >
                    <div className="flex items-center gap-1 text-[10px] text-[#cdd6f4] mb-0.5">
                      <span className="font-mono">
                        {p.patchId.slice(0, 8)}
                      </span>
                      {p.unvalidated && (
                        <span
                          data-testid={`breakpoint-patch-unvalidated-${p.patchId}`}
                          title="No validator was registered for this step's node type"
                          className="px-1 text-[9px] font-bold bg-caution-bg/15 text-caution-fg rounded-sm"
                        >
                          ⚠ Unvalidated
                        </span>
                      )}
                      {reverted && (
                        <span className="px-1 text-[9px] font-bold bg-gray-500/20 text-text-tertiary rounded-sm">
                          Reverted
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-[#9399b2]">
                      {p.appliedAt}
                      {p.appliedBy && (
                        <>
                          {' · '}
                          <span className="text-[#cdd6f4]">{p.appliedBy}</span>
                        </>
                      )}
                    </div>
                    {!reverted && (
                      <button
                        type="button"
                        data-testid={`breakpoint-patch-revert-${p.patchId}`}
                        onClick={() => onRevertPatch(p.patchId)}
                        disabled={!revertAllowed || revertingPatchId === p.patchId}
                        title={
                          revertAllowed
                            ? 'Revert this patch'
                            : 'Run has progressed past this breakpoint — revert no longer allowed'
                        }
                        className={cn(
                          'mt-1 px-2 py-0.5 text-[10px] font-semibold bg-transparent rounded-sm font-inherit',
                          revertAllowed
                            ? 'text-danger-fg border border-danger cursor-pointer'
                            : 'text-gray-700 border border-gray-700 cursor-not-allowed',
                          revertingPatchId === p.patchId && 'cursor-not-allowed',
                        )}
                      >
                        {revertingPatchId === p.patchId ? 'Reverting…' : 'Revert'}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
