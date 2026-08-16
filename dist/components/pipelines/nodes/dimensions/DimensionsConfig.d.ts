import type { ImageDimensionsNodeData } from '../../../../types/pipeline';
export interface DimensionsConfigProps {
    data: ImageDimensionsNodeData;
    onChange: (patch: Partial<ImageDimensionsNodeData>) => void;
}
export default function DimensionsConfig({ data, onChange }: DimensionsConfigProps): import("react").JSX.Element;
//# sourceMappingURL=DimensionsConfig.d.ts.map