import type { ConditionNodeData } from '../../../../types/pipeline';
export interface ConditionConfigProps {
    data: ConditionNodeData;
    onChange: (patch: Partial<ConditionNodeData>) => void;
}
export default function ConditionConfig({ data, onChange }: ConditionConfigProps): import("react").JSX.Element;
//# sourceMappingURL=ConditionConfig.d.ts.map