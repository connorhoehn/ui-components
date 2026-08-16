import type { ImageTransformNodeData } from '../../../../types/pipeline';
export interface TransformGeoConfigProps {
    data: ImageTransformNodeData;
    onChange: (patch: Partial<ImageTransformNodeData>) => void;
}
export default function TransformGeoConfig({ data, onChange }: TransformGeoConfigProps): import("react").JSX.Element;
//# sourceMappingURL=TransformGeoConfig.d.ts.map