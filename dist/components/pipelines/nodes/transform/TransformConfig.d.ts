import type { TransformNodeData } from '../../../../types/pipeline';
export interface TransformConfigProps {
    data: TransformNodeData;
    onChange: (patch: Partial<TransformNodeData>) => void;
}
export default function TransformConfig({ data, onChange }: TransformConfigProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TransformConfig.d.ts.map