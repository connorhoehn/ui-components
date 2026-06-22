import { ImageUpscaleNodeData } from '../../../../types/pipeline';
export interface UpscaleConfigProps {
    data: ImageUpscaleNodeData;
    onChange: (patch: Partial<ImageUpscaleNodeData>) => void;
}
export default function UpscaleConfig({ data, onChange }: UpscaleConfigProps): import("react").JSX.Element;
//# sourceMappingURL=UpscaleConfig.d.ts.map