import type { MemoryNodeData } from '../../../../types/pipeline';

export interface MemoryConfigProps {
  data: MemoryNodeData;
  onChange: (patch: Partial<MemoryNodeData>) => void;
}

export default function MemoryConfig({ data }: MemoryConfigProps) {
  return (
    <div style={{ padding: 12, fontSize: 13, color: '#64748b' }}>
      Configuration for <strong>{data.type}</strong> node.
    </div>
  );
}
