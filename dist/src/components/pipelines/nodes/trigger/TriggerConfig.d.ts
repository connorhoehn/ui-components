import type { TriggerNodeData } from '../../../../types/pipeline';
export interface TriggerConfigProps {
    data: TriggerNodeData;
    onChange: (patch: Partial<TriggerNodeData>) => void;
}
export default function TriggerConfig({ data, onChange }: TriggerConfigProps): import("react").JSX.Element;
//# sourceMappingURL=TriggerConfig.d.ts.map