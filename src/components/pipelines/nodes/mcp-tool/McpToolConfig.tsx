import type { McpToolNodeData } from '../../../../types/pipeline';

export interface McpToolConfigProps {
  data: McpToolNodeData;
  onChange: (patch: Partial<McpToolNodeData>) => void;
}

export default function McpToolConfig({ data }: McpToolConfigProps) {
  return (
    <div className="p-3 text-[13px] text-[#64748b]">
      Configuration for <strong>{data.type}</strong> node.
    </div>
  );
}
