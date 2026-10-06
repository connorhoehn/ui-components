import React from 'react';
export interface ExecutorLogProps {
    pipelineId: string;
    runId: string;
    /**
     * Called when an operator clicks a `pipeline.step.*` row. Receives the
     * stepId pulled from the audit row's `details.stepId` / `trace.stepId`.
     * Optional — when omitted the rows are still expandable but the click
     * is a no-op.
     */
    onStepClick?: (stepId: string) => void;
}
export default function ExecutorLog({ pipelineId, runId, onStepClick, }: ExecutorLogProps): React.JSX.Element;
//# sourceMappingURL=ExecutorLog.d.ts.map