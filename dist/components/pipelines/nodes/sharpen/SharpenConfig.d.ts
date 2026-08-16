import type { ImageSharpenNodeData } from '../../../../types/pipeline';
export interface SharpenConfigProps {
    data: ImageSharpenNodeData;
    onChange: (patch: Partial<ImageSharpenNodeData>) => void;
}
export default function SharpenConfig({ data, onChange }: SharpenConfigProps): import("react").JSX.Element;
//# sourceMappingURL=SharpenConfig.d.ts.map