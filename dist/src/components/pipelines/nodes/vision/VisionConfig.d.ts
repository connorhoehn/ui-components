import { ImageVisionAnalyzeNodeData } from '../../../../types/pipeline';
export interface VisionConfigProps {
    data: ImageVisionAnalyzeNodeData;
    onChange: (patch: Partial<ImageVisionAnalyzeNodeData>) => void;
}
export default function VisionConfig({ data, onChange }: VisionConfigProps): import("react").JSX.Element;
//# sourceMappingURL=VisionConfig.d.ts.map