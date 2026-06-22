import { ImageGenerateNodeData } from '../../../../types/pipeline';
export interface GenerateConfigProps {
    data: ImageGenerateNodeData;
    onChange: (patch: Partial<ImageGenerateNodeData>) => void;
}
export default function GenerateConfig({ data, onChange }: GenerateConfigProps): import("react").JSX.Element;
//# sourceMappingURL=GenerateConfig.d.ts.map