import { ImageSourceNodeData } from '../../../../types/pipeline';
export interface ImageSourceConfigProps {
    data: ImageSourceNodeData;
    onChange: (patch: Partial<ImageSourceNodeData>) => void;
}
export default function ImageSourceConfig({ data, onChange }: ImageSourceConfigProps): import("react").JSX.Element;
//# sourceMappingURL=ImageSourceConfig.d.ts.map