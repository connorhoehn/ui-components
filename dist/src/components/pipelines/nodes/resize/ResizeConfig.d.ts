import type { ImageResizeNodeData } from '../../../../types/pipeline';
export interface ResizeConfigProps {
    data: ImageResizeNodeData;
    onChange: (patch: Partial<ImageResizeNodeData>) => void;
    /** Node being edited; derives real upstream image refs. */
    nodeId?: string;
}
export default function ResizeConfig({ data, onChange, nodeId }: ResizeConfigProps): import("react").JSX.Element;
//# sourceMappingURL=ResizeConfig.d.ts.map