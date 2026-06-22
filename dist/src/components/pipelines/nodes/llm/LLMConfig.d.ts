import { LLMNodeData } from '../../../../types/pipeline';
export interface LLMConfigProps {
    data: LLMNodeData;
    onChange: (patch: Partial<LLMNodeData>) => void;
}
export default function LLMConfig({ data, onChange }: LLMConfigProps): import("react").JSX.Element;
//# sourceMappingURL=LLMConfig.d.ts.map