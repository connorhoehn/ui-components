interface NodeContextMenuState {
    nodeId: string;
    x: number;
    y: number;
}
export interface CanvasContextMenuProps {
    nodeMenu: NodeContextMenuState;
    breakpoints?: Set<string>;
    showBreakpointOption: boolean;
    onFilterLog: () => void;
    onCopyNodeId: () => void;
    onDuplicate: () => void;
    onToggleBreakpoint: () => void;
    onDismiss: () => void;
}
export default function CanvasContextMenu({ nodeMenu, breakpoints, showBreakpointOption, onFilterLog, onCopyNodeId, onDuplicate, onToggleBreakpoint, onDismiss, }: CanvasContextMenuProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=CanvasContextMenu.d.ts.map