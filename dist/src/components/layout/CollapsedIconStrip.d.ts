type ConnectionState = 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'disconnected';
export type CollapsedIconStripSection = 'documents' | 'pipelines' | 'observability';
export interface CollapsedIconStripProps {
    connectionState: ConnectionState;
    /**
     * Opens the full sidebar. Omit when the surface has no expanded sidebar to
     * show: the strip keeps its header row but drops the expand button, so it
     * never offers a column that would open empty.
     */
    onExpand?: () => void;
    onDocuments?: () => void;
    onPipelines?: () => void;
    onObservability?: () => void;
    /** The section the window is in. */
    active?: CollapsedIconStripSection | null;
    /**
     * The app header's height, when the strip starts at the top of the window
     * beside it (AppShell `sidebarFullHeight`): the expand button is centred in
     * that row, and the sections start below it. Omit when the strip hangs
     * below the header.
     */
    headerHeight?: number;
    className?: string;
    'data-testid'?: string;
}
export declare function CollapsedIconStrip({ connectionState, onExpand, onDocuments, onPipelines, onObservability, active, headerHeight, className, 'data-testid': testId, }: CollapsedIconStripProps): import("react").JSX.Element;
export default CollapsedIconStrip;
//# sourceMappingURL=CollapsedIconStrip.d.ts.map