import type { ImageCropNodeData } from '../../../../types/pipeline';
export interface CropConfigProps {
    data: ImageCropNodeData;
    onChange: (patch: Partial<ImageCropNodeData>) => void;
}
export default function CropConfig(props: CropConfigProps): import("react").JSX.Element;
//# sourceMappingURL=CropConfig.d.ts.map