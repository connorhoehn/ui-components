import { ImageVisionTagNodeData } from '../../../../types/pipeline';
export interface VisionTagConfigProps {
    data: ImageVisionTagNodeData;
    onChange: (patch: Partial<ImageVisionTagNodeData>) => void;
}
export default function VisionTagConfig({ data, onChange }: VisionTagConfigProps): import("react").JSX.Element;
//# sourceMappingURL=VisionTagConfig.d.ts.map