import type { McpToolNodeData } from '../../../../types/pipeline';

export interface McpToolConfigProps {
  data: McpToolNodeData;
  onChange: (patch: Partial<McpToolNodeData>) => void;
}

export default function McpToolConfig({ data }: McpToolConfigProps) {
  return (
    <div style={{ padding: 12, fontSize: 13, color: '#64748b' }}>
      Configuration for <strong>{data.type}</strong> node.
    </div>
  );
}
