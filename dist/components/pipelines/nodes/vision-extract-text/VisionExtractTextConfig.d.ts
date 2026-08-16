import type { ImageVisionExtractTextNodeData } from '../../../../types/pipeline';
export interface VisionExtractTextConfigProps {
    data: ImageVisionExtractTextNodeData;
    onChange: (patch: Partial<ImageVisionExtractTextNodeData>) => void;
}
export default function VisionExtractTextConfig({ data, onChange }: VisionExtractTextConfigProps): import("react").JSX.Element;
//# sourceMappingURL=VisionExtractTextConfig.d.ts.map