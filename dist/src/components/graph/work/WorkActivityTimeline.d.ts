import type { WorkGraphEdgeData, WorkGraphNodeData, WorkGraphSelection } from './types';
interface Props {
    day: string;
    timezone: string;
    nodes: WorkGraphNodeData[];
    edges: WorkGraphEdgeData[];
    selection: WorkGraphSelection;
    onSelectionChange: (selection: WorkGraphSelection) => void;
}
/** Activity derived solely from the viewer-visible graph supplied by the host. */
export declare function WorkActivityTimeline({ day, timezone, nodes, edges, selection, onSelectionChange }: Props): import("react").JSX.Element;
export {};
//# sourceMappingURL=WorkActivityTimeline.d.ts.map