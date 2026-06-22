import { ImageSaveNodeData } from '../../../../types/pipeline';
export interface SaveConfigProps {
    data: ImageSaveNodeData;
    onChange: (patch: Partial<ImageSaveNodeData>) => void;
}
export default function SaveConfig({ data, onChange }: SaveConfigProps): import("react").JSX.Element;
//# sourceMappingURL=SaveConfig.d.ts.map