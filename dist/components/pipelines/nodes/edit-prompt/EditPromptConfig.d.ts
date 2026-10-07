import type { ImageEditPromptNodeData } from '../../../../types/pipeline';
export interface EditPromptConfigProps {
    data: ImageEditPromptNodeData;
    onChange: (patch: Partial<ImageEditPromptNodeData>) => void;
    /** Node being edited; derives real upstream image refs. */
    nodeId?: string;
}
export default function EditPromptConfig({ data, onChange, nodeId }: EditPromptConfigProps): import("react").JSX.Element;
//# sourceMappingURL=EditPromptConfig.d.ts.map