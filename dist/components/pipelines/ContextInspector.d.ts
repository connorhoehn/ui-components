import type { PipelineRun } from '../../types/pipeline';
export interface ContextInspectorProps {
    /** The run to inspect (from PipelineRunsContext). */
    run: PipelineRun | null;
    /** Currently selected step — controls which snapshot is shown. */
    activeStepId: string | null;
    /** Callback when the user clicks a step in the step list. */
    onStepSelect?: (stepId: string) => void;
    /**
     * hub#2226: when true AND the run is paused at `activeStepId`, the
     * inspector shows an "Edit" toggle on the input-context tab and exposes
     * the dirty edit buffer + per-row affordances. The Apply combo button
     * lives in the parent toolbar, but the inspector publishes its dirty
     * buffer + reset hook here so the toolbar can hand it to
     * `applyContextPatch`.
     */
    editable?: boolean;
    /**
     * hub#2226: notified whenever the user mutates the edit buffer for the
     * paused step. The parent uses this to enable the Apply combo button and
     * to read the buffer when the user clicks Apply.
     */
    onEditBufferChange?: (stepId: string, 
    /** When `null`, the buffer was reset (Apply succeeded or user toggled off edit). */
    buffer: Record<string, unknown> | null) => void;
    /**
     * hub#2226: imperative ref consumers can call to drop the in-memory edit
     * buffer (e.g. after a successful Apply or after the run resumed past
     * pausedAtNodeId). Called by the parent via the `onEditBufferChange(_, null)`
     * round-trip is also acceptable, but a direct reset is simpler from the
     * toolbar callback.
     */
    resetEditBufferKey?: number;
}
export default function ContextInspector({ run, activeStepId, onStepSelect, editable, onEditBufferChange, resetEditBufferKey, }: ContextInspectorProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ContextInspector.d.ts.map