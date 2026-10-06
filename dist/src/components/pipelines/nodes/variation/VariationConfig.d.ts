import type { ImageVariationNodeData } from '../../../../types/pipeline';
import { type ModelOption } from '../../services/PipelineEditorServicesContext';
export interface VariationConfigProps {
    data: ImageVariationNodeData;
    onChange: (patch: Partial<ImageVariationNodeData>) => void;
    /** Node being edited; derives real upstream image refs. */
    nodeId?: string;
}
/** Replaceable via `modelOptions['image:edit']`. */
export declare const DEFAULT_IMAGE_EDIT_MODELS: readonly ModelOption[];
export default function VariationConfig({ data, onChange, nodeId }: VariationConfigProps): import("react").JSX.Element;
//# sourceMappingURL=VariationConfig.d.ts.map