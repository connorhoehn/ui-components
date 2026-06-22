import { ImageVisionClassifyNodeData } from '../../../../types/pipeline';
export interface VisionClassifyConfigProps {
    data: ImageVisionClassifyNodeData;
    onChange: (patch: Partial<ImageVisionClassifyNodeData>) => void;
}
export default function VisionClassifyConfig({ data, onChange }: VisionClassifyConfigProps): import("react").JSX.Element;
//# sourceMappingURL=VisionClassifyConfig.d.ts.map