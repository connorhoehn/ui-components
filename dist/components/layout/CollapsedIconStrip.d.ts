type ConnectionState = 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'disconnected';
export interface CollapsedIconStripProps {
    connectionState: ConnectionState;
    onExpand: () => void;
    onDocuments: () => void;
    onPipelines: () => void;
    onObservability: () => void;
}
export declare function CollapsedIconStrip({ connectionState, onExpand, onDocuments, onPipelines, onObservability, }: CollapsedIconStripProps): import("react").JSX.Element;
export default CollapsedIconStrip;
//# sourceMappingURL=CollapsedIconStrip.d.ts.map