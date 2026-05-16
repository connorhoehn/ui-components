import type { AgentNodeData } from '../../../../types/pipeline';

export interface AgentConfigProps {
  data: AgentNodeData;
  onChange: (patch: Partial<AgentNodeData>) => void;
}

export default function AgentConfig({ data }: AgentConfigProps) {
  return (
    <div className="p-3 text-[13px] text-[#64748b]">
      Configuration for <strong>{data.type}</strong> node.
    </div>
  );
}
