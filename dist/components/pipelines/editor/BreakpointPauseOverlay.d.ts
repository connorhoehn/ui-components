import type { PipelineDefinition } from '../../../types/pipeline';
export interface BreakpointPauseOverlayProps {
    definition: PipelineDefinition;
    pausedBreakpoint: {
        runId: string;
        stepId: string;
    };
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
export default function BreakpointPauseOverlay({ definition, pausedBreakpoint, applyingPatch, revertingPatchId, dirtyPatch, dirtyPatchStepId, resetEditBufferKey, onContinue, onStepOver, onResumeAll, onApplyAndContinue, onRevertPatch, onEditBufferChange, }: BreakpointPauseOverlayProps): import("react").JSX.Element;
//# sourceMappingURL=BreakpointPauseOverlay.d.ts.map