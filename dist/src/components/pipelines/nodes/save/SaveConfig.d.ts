import type { ImageSaveNodeData } from '../../../../types/pipeline';
export interface SaveConfigProps {
    data: ImageSaveNodeData;
    onChange: (patch: Partial<ImageSaveNodeData>) => void;
    /** Node being edited; derives real upstream image refs. */
    nodeId?: string;
}
export default function SaveConfig({ data, onChange, nodeId }: SaveConfigProps): import("react").JSX.Element;
//# sourceMappingURL=SaveConfig.d.ts.map