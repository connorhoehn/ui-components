import type { ImageFormatConvertNodeData } from '../../../../types/pipeline';
export interface FormatConvertConfigProps {
    data: ImageFormatConvertNodeData;
    onChange: (patch: Partial<ImageFormatConvertNodeData>) => void;
    /** Node being edited; derives real upstream image refs. */
    nodeId?: string;
}
export default function FormatConvertConfig({ data, onChange, nodeId, }: FormatConvertConfigProps): import("react").JSX.Element;
//# sourceMappingURL=FormatConvertConfig.d.ts.map