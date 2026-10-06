import type { ForkNodeData } from '../../../../types/pipeline';
export interface ForkConfigProps {
    data: ForkNodeData;
    onChange: (patch: Partial<ForkNodeData>) => void;
}
export default function ForkConfig({ data, onChange }: ForkConfigProps): import("react").JSX.Element;
//# sourceMappingURL=ForkConfig.d.ts.map