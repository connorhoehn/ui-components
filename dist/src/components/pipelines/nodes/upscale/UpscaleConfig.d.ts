import type { ImageUpscaleNodeData } from '../../../../types/pipeline';
export interface UpscaleConfigProps {
    data: ImageUpscaleNodeData;
    onChange: (patch: Partial<ImageUpscaleNodeData>) => void;
    /** Node being edited; derives real upstream image refs. */
    nodeId?: string;
}
export default function UpscaleConfig({ data, onChange, nodeId }: UpscaleConfigProps): import("react").JSX.Element;
//# sourceMappingURL=UpscaleConfig.d.ts.map