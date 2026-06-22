import { ImageEditPromptNodeData } from '../../../../types/pipeline';
export interface EditPromptConfigProps {
    data: ImageEditPromptNodeData;
    onChange: (patch: Partial<ImageEditPromptNodeData>) => void;
}
export default function EditPromptConfig({ data, onChange }: EditPromptConfigProps): import("react").JSX.Element;
//# sourceMappingURL=EditPromptConfig.d.ts.map