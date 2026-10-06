import type { NodeSummary } from './components/NodeGridTile';
export interface NodesPageProps {
    /**
     * Node summaries to render. When omitted, falls back to the Phase-1
     * fixture-derived set so the demo route is never blank.
     */
    nodes?: NodeSummary[];
    /** Host-wired per-node chaos: add latency. Section hidden when absent. */
    onAddLatency?: (nodeId: string) => void;
    /** Host-wired per-node chaos: kill. Section hidden when absent. */
    onKillNode?: (nodeId: string) => void;
    /** Host-wired resource transfer. Section hidden when absent. */
    onTransferResource?: (nodeId: string) => void;
}
declare function NodesPage({ nodes: nodesProp, onAddLatency, onKillNode, onTransferResource, }: NodesPageProps): import("react").JSX.Element;
export default NodesPage;
//# sourceMappingURL=NodesPage.d.ts.map