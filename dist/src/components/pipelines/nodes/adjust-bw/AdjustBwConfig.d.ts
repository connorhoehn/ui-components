import type { ImageAdjustBwNodeData } from '../../../../types/pipeline';
export interface AdjustBwConfigProps {
    data: ImageAdjustBwNodeData;
    onChange: (patch: Partial<ImageAdjustBwNodeData>) => void;
    /** Node being edited; derives real upstream image refs. */
    nodeId?: string;
}
export default function AdjustBwConfig({ data, onChange, nodeId }: AdjustBwConfigProps): import("react").JSX.Element;
//# sourceMappingURL=AdjustBwConfig.d.ts.map