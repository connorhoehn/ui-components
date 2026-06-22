import { JoinNodeData } from '../../../../types/pipeline';
export interface JoinConfigProps {
    data: JoinNodeData;
    onChange: (patch: Partial<JoinNodeData>) => void;
}
export default function JoinConfig({ data, onChange }: JoinConfigProps): import("react").JSX.Element;
//# sourceMappingURL=JoinConfig.d.ts.map