import type { ImageGenerateNodeData } from '../../../../types/pipeline';
import { type ModelOption } from '../../services/PipelineEditorServicesContext';
export interface GenerateConfigProps {
    data: ImageGenerateNodeData;
    onChange: (patch: Partial<ImageGenerateNodeData>) => void;
}
/**
 * Shipped so the editor is usable with no host wiring. A host that runs a
 * different image backend replaces this via `modelOptions['image:generate']`.
 */
export declare const DEFAULT_GENERATE_MODELS: readonly ModelOption[];
export default function GenerateConfig({ data, onChange }: GenerateConfigProps): import("react").JSX.Element;
//# sourceMappingURL=GenerateConfig.d.ts.map