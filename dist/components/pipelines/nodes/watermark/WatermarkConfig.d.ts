import type { ImageWatermarkNodeData } from '../../../../types/pipeline';
export interface WatermarkConfigProps {
    data: ImageWatermarkNodeData;
    onChange: (patch: Partial<ImageWatermarkNodeData>) => void;
    /** Node being edited; derives real upstream image refs. */
    nodeId?: string;
}
export default function WatermarkConfig({ data, onChange, nodeId }: WatermarkConfigProps): import("react").JSX.Element;
//# sourceMappingURL=WatermarkConfig.d.ts.map