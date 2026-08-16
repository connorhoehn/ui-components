import type { ImageVariationNodeData } from '../../../../types/pipeline';
export interface VariationConfigProps {
    data: ImageVariationNodeData;
    onChange: (patch: Partial<ImageVariationNodeData>) => void;
}
export default function VariationConfig({ data, onChange }: VariationConfigProps): import("react").JSX.Element;
//# sourceMappingURL=VariationConfig.d.ts.map