import type { ImageWatermarkNodeData } from '../../../../types/pipeline';
export interface WatermarkConfigProps {
    data: ImageWatermarkNodeData;
    onChange: (patch: Partial<ImageWatermarkNodeData>) => void;
}
export default function WatermarkConfig({ data, onChange }: WatermarkConfigProps): import("react").JSX.Element;
//# sourceMappingURL=WatermarkConfig.d.ts.map