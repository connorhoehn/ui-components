import type { GraphQueryNodeData } from '../../../../types/pipeline';
export interface GraphQueryConfigProps {
    data: GraphQueryNodeData;
    onChange: (patch: Partial<GraphQueryNodeData>) => void;
    /** Node being edited; drives the real upstream-context pills. */
    nodeId?: string;
}
export default function GraphQueryConfig({ data, onChange, nodeId, }: GraphQueryConfigProps): import("react").JSX.Element;
//# sourceMappingURL=GraphQueryConfig.d.ts.map