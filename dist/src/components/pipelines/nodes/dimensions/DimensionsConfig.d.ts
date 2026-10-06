import type { ImageDimensionsNodeData } from '../../../../types/pipeline';
export interface DimensionsConfigProps {
    data: ImageDimensionsNodeData;
    onChange: (patch: Partial<ImageDimensionsNodeData>) => void;
    /** Node being edited; derives real upstream image refs. */
    nodeId?: string;
}
export default function DimensionsConfig({ data, onChange, nodeId }: DimensionsConfigProps): import("react").JSX.Element;
//# sourceMappingURL=DimensionsConfig.d.ts.map