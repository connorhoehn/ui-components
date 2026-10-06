import type { ImageTransformNodeData } from '../../../../types/pipeline';
export interface TransformGeoConfigProps {
    data: ImageTransformNodeData;
    onChange: (patch: Partial<ImageTransformNodeData>) => void;
    /** Node being edited; derives real upstream image refs. */
    nodeId?: string;
}
export default function TransformGeoConfig({ data, onChange, nodeId, }: TransformGeoConfigProps): import("react").JSX.Element;
//# sourceMappingURL=TransformGeoConfig.d.ts.map