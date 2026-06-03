import { type NodeSummary } from './NodeGridTile';
export interface NodeGridProps {
    nodes: NodeSummary[];
    onSelect?: (id: string) => void;
    selectedId?: string;
}
declare function NodeGrid({ nodes, onSelect, selectedId }: NodeGridProps): import("react/jsx-runtime").JSX.Element;
export default NodeGrid;
//# sourceMappingURL=NodeGrid.d.ts.map