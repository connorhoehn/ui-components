import { ImageAdjustLayerNodeData } from '../../../../types/pipeline';
export interface AdjustLayerConfigProps {
    data: ImageAdjustLayerNodeData;
    onChange: (patch: Partial<ImageAdjustLayerNodeData>) => void;
}
/**
 * Outer config component. Reads selectedNodeId from the editor context so
 * AdjustLayerConfigInner can call the upstream-image hook.
 */
export default function AdjustLayerConfig(props: AdjustLayerConfigProps): import("react").JSX.Element;
//# sourceMappingURL=AdjustLayerConfig.d.ts.map