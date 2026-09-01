import type { NodeType } from '../../../types/pipeline';
export interface ConfigPanelProps {
    /**
     * React Flow's current selected node IDs. If omitted or of length <= 1 the
     * panel falls back to `selectedNodeId` from the editor context.
     */
    selectedIds?: string[];
}
/**
 * Node types with no settings UI. Exported so a palette or canvas can say so up
 * front rather than letting the author find out after placing the node.
 */
export declare const NODE_TYPES_WITHOUT_CONFIG: readonly NodeType[];
export default function ConfigPanel({ selectedIds }: ConfigPanelProps): import("react").JSX.Element;
//# sourceMappingURL=ConfigPanel.d.ts.map