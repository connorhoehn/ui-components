import type { ImageSharpenNodeData } from '../../../../types/pipeline';
export interface SharpenConfigProps {
    data: ImageSharpenNodeData;
    onChange: (patch: Partial<ImageSharpenNodeData>) => void;
    /** Node being edited; derives real upstream image refs. */
    nodeId?: string;
}
export default function SharpenConfig({ data, onChange, nodeId }: SharpenConfigProps): import("react").JSX.Element;
//# sourceMappingURL=SharpenConfig.d.ts.map