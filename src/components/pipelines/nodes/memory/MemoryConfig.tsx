import type { MemoryNodeData } from '../../../../types/pipeline';

export interface MemoryConfigProps {
  data: MemoryNodeData;
  onChange: (patch: Partial<MemoryNodeData>) => void;
}

export default function MemoryConfig({ data }: MemoryConfigProps) {
  return (
    <div className="p-3 text-[13px] text-[#64748b]">
      Configuration for <strong>{data.type}</strong> node.
    </div>
  );
}
