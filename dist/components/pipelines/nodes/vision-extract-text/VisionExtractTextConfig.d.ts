import type { ImageVisionExtractTextNodeData } from '../../../../types/pipeline';
import { type ModelOption } from '../../services/PipelineEditorServicesContext';
export interface VisionExtractTextConfigProps {
    data: ImageVisionExtractTextNodeData;
    onChange: (patch: Partial<ImageVisionExtractTextNodeData>) => void;
    /** Node being edited; enables real upstream image refs. */
    nodeId?: string;
}
/**
 * OCR reverses the usual default: the more capable model goes first, because
 * accuracy matters more than latency when transcribing a document.
 * Replaceable via `modelOptions['image:vision-ocr']`.
 */
export declare const DEFAULT_OCR_MODELS: readonly ModelOption[];
export default function VisionExtractTextConfig({ data, onChange, nodeId, }: VisionExtractTextConfigProps): import("react").JSX.Element;
//# sourceMappingURL=VisionExtractTextConfig.d.ts.map