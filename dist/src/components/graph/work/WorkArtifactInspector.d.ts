import type { WorkActivityNodeDetail, WorkGraphNodeData, WorkGraphSelection } from './types';
/** Which revision and page the selection names, falling back to the newest. */
export declare function resolveArtifactSelection(artifact: NonNullable<WorkActivityNodeDetail['artifact']>, selection: Extract<WorkGraphSelection, {
    kind: 'node';
}>): {
    revision: import("./types").WorkArtifactRevision | undefined;
    slides: import("./types").WorkArtifactSlide[];
    slide: import("./types").WorkArtifactSlide;
};
/**
 * The artifact body of a detail pane: which revisions exist, what the selected
 * one looks like, and which pages it has. A pending attempt is never a
 * revision — it cannot be selected, opened or referenced.
 */
export declare function WorkArtifactInspector({ node, artifact, selection, onSelectionChange, onOpen, onReference, quiet }: {
    node: WorkGraphNodeData;
    artifact: NonNullable<WorkActivityNodeDetail['artifact']>;
    selection: Extract<WorkGraphSelection, {
        kind: 'node';
    }>;
    onSelectionChange: (selection: WorkGraphSelection) => void;
    onOpen?: (selection: Exclude<WorkGraphSelection, null>) => void;
    onReference?: (selection: Exclude<WorkGraphSelection, null>) => void;
    /** Suppress the pending-attempt line when the pane's banner already says it. */
    quiet?: boolean;
}): import("react").JSX.Element;
//# sourceMappingURL=WorkArtifactInspector.d.ts.map