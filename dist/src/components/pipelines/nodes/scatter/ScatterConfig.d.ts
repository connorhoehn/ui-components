import { ScatterNodeData } from '../../../../types/pipeline';
export interface ScatterConfigProps {
    data: ScatterNodeData;
    onChange: (patch: Partial<ScatterNodeData>) => void;
}
export default function ScatterConfig({ data, onChange }: ScatterConfigProps): import("react").JSX.Element;
//# sourceMappingURL=ScatterConfig.d.ts.map