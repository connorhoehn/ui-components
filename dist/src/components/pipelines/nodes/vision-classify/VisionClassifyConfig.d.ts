import type { ImageVisionClassifyNodeData } from '../../../../types/pipeline';
export interface VisionClassifyConfigProps {
    data: ImageVisionClassifyNodeData;
    onChange: (patch: Partial<ImageVisionClassifyNodeData>) => void;
    /** Node being edited; enables real upstream image refs. */
    nodeId?: string;
}
export default function VisionClassifyConfig({ data, onChange, nodeId, }: VisionClassifyConfigProps): import("react").JSX.Element;
//# sourceMappingURL=VisionClassifyConfig.d.ts.map