import React, { type ReactNode } from 'react';
import type { StepExecution } from '../../../types/pipeline';
export interface StepThreadProps {
    stepId: string;
    step: StepExecution;
    index: number;
    nodeType: string;
    nodeConfig?: Record<string, unknown>;
    onRetryFromStep?: (stepId: string) => void;
    onResumeFromStep?: (stepId: string) => void;
    /**
     * Called when the operator clicks a produced artifact. Hosts that own an
     * artifact route (a lineage graph, an asset page) wire this to navigate
     * there. Without it the thumbnail is still a link — it opens the resolved
     * artifact URL in a new tab — because a produced artifact you cannot open
     * is just a picture of your data.
     */
    onArtifactClick?: (imageId: string) => void;
    /**
     * Extra content for this step, rendered in the row directly under its
     * summary — and outside the disclosure, so it is visible without expanding.
     *
     * For the thing a step PRODUCED: a deck, a meeting, an agenda. Hosts were
     * rendering those in a separate section above the tree, which put the
     * output of step 4 above step 1 and left the row that made it showing only
     * a duration. Returning `null` renders nothing, so a host can supply a
     * card for the one step that has one.
     */
    renderStepDetail?: (step: StepExecution, stepId: string) => ReactNode;
}
export declare function StepThread({ stepId, step, index, nodeType, nodeConfig, onRetryFromStep, onResumeFromStep, onArtifactClick, renderStepDetail }: StepThreadProps): React.JSX.Element;
//# sourceMappingURL=StepThread.d.ts.map