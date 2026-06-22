import { ActionNodeData } from '../../../../types/pipeline';
export interface ActionConfigProps {
    data: ActionNodeData;
    onChange: (patch: Partial<ActionNodeData>) => void;
}
export default function ActionConfig({ data, onChange }: ActionConfigProps): import("react").JSX.Element;
//# sourceMappingURL=ActionConfig.d.ts.map