import type { ActionNodeData } from '../../../../types/pipeline';
export interface ActionConfigProps {
    data: ActionNodeData;
    onChange: (patch: Partial<ActionNodeData>) => void;
}
export default function ActionConfig({ data, onChange }: ActionConfigProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ActionConfig.d.ts.map