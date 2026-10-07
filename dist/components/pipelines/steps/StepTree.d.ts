import React, { type ReactNode } from 'react';
import type { NodeType, PipelineEdge, StepExecution } from '../../../types/pipeline';
export interface StepTreeProps {
    steps: Record<string, StepExecution>;
    nodeDataMap: Record<string, {
        type: NodeType;
        data: Record<string, unknown>;
    }>;
    edges?: PipelineEdge[];
    onRetryFromStep?: (stepId: string) => void;
    onResumeFromStep?: (stepId: string) => void;
    /** Forwarded to every step: click-through for the artifacts a step produced. */
    onArtifactClick?: (imageId: string) => void;
    /**
     * Extra content for a step, rendered in its row under the summary and
     * outside the disclosure — the thing that step PRODUCED (a deck, a meeting,
     * an agenda). Called for every step; return `null` for the ones with
     * nothing to show.
     *
     * Hosts were rendering those cards in a section above the tree, which put
     * the output of step 4 above step 1 and left the row that made it showing
     * only a duration.
     */
    renderStepDetail?: (step: StepExecution, stepId: string) => ReactNode;
}
export interface StepTreeNode {
    stepId: string;
    step: StepExecution;
    branch?: string;
    children: StepTreeNode[];
}
export declare function StepTree({ steps, nodeDataMap, edges, onRetryFromStep, onResumeFromStep, onArtifactClick, renderStepDetail }: StepTreeProps): React.JSX.Element;
//# sourceMappingURL=StepTree.d.ts.map