import type { MemoryNodeData } from '../../../../types/pipeline';
export interface MemoryConfigProps {
    data: MemoryNodeData;
    onChange: (patch: Partial<MemoryNodeData>) => void;
    /** Node being edited; drives the real upstream-context pills. */
    nodeId?: string;
}
export default function MemoryConfig({ data, onChange, nodeId }: MemoryConfigProps): import("react").JSX.Element;
//# sourceMappingURL=MemoryConfig.d.ts.map