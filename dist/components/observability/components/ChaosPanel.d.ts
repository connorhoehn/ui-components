export interface ChaosPanelNode {
    id: string;
    label?: string;
}
export interface ChaosPanelProps {
    onInjectLatency?: (ms: number) => void;
    onInjectPartition?: (nodeIds: string[]) => void;
    onDropMessages?: (percent: number) => void;
    onKillAll?: () => void;
    onReset?: () => void;
    availableNodes?: ChaosPanelNode[];
}
declare function ChaosPanel(props: ChaosPanelProps): import("react/jsx-runtime").JSX.Element;
export default ChaosPanel;
//# sourceMappingURL=ChaosPanel.d.ts.map