import type { AgentNodeData } from '../../../../types/pipeline';

export interface AgentConfigProps {
  data: AgentNodeData;
  onChange: (patch: Partial<AgentNodeData>) => void;
}

export default function AgentConfig({ data }: AgentConfigProps) {
  return (
    <div style={{ padding: 12, fontSize: 13, color: '#64748b' }}>
      Configuration for <strong>{data.type}</strong> node.
    </div>
  );
}
