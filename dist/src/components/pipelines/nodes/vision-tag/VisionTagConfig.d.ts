import type { ImageVisionTagNodeData } from '../../../../types/pipeline';
import { type ModelOption } from '../../services/PipelineEditorServicesContext';
export interface VisionTagConfigProps {
    data: ImageVisionTagNodeData;
    onChange: (patch: Partial<ImageVisionTagNodeData>) => void;
    /** Node being edited; enables real upstream image refs. */
    nodeId?: string;
}
/** Default vision models; replaceable via `modelOptions['image:vision']`. */
export declare const DEFAULT_VISION_MODELS: readonly ModelOption[];
export default function VisionTagConfig({ data, onChange, nodeId }: VisionTagConfigProps): import("react").JSX.Element;
//# sourceMappingURL=VisionTagConfig.d.ts.map