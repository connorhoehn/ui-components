import type { ImageResizeNodeData } from '../../../../types/pipeline';
export interface ResizeConfigProps {
    data: ImageResizeNodeData;
    onChange: (patch: Partial<ImageResizeNodeData>) => void;
}
export default function ResizeConfig({ data, onChange }: ResizeConfigProps): import("react").JSX.Element;
//# sourceMappingURL=ResizeConfig.d.ts.map