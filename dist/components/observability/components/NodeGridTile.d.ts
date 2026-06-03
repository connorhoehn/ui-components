export interface NodeSummary {
    id: string;
    status: 'healthy' | 'degraded' | 'dead' | 'idle';
    region?: string;
    role?: string;
    cpu: number;
    memoryMb: number;
    connections: number;
    activeRuns: number;
    cpuHistory: number[];
}
export interface NodeGridTileProps {
    node: NodeSummary;
    selected?: boolean;
    onClick?: () => void;
    onKill?: () => void;
}
declare function NodeGridTile({ node, selected, onClick, onKill }: NodeGridTileProps): import("react/jsx-runtime").JSX.Element;
export default NodeGridTile;
//# sourceMappingURL=NodeGridTile.d.ts.map