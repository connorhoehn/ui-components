import type { ImageVisionAnalyzeNodeData } from '../../../../types/pipeline';
import { type ModelOption } from '../../services/PipelineEditorServicesContext';
export interface VisionConfigProps {
    data: ImageVisionAnalyzeNodeData;
    onChange: (patch: Partial<ImageVisionAnalyzeNodeData>) => void;
    /** Node being edited; enables real upstream-context pills. */
    nodeId?: string;
}
/** Replaceable via `modelOptions['image:vision-analyze']`. */
export declare const DEFAULT_ANALYZE_MODELS: readonly ModelOption[];
export default function VisionConfig({ data, onChange, nodeId }: VisionConfigProps): import("react").JSX.Element;
//# sourceMappingURL=VisionConfig.d.ts.map