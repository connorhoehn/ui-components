import type { AgUiOutputNodeData } from '../../../../types/pipeline';

export interface AgUiOutputConfigProps {
  data: AgUiOutputNodeData;
  onChange: (patch: Partial<AgUiOutputNodeData>) => void;
}

export default function AgUiOutputConfig({ data }: AgUiOutputConfigProps) {
  return (
    <div className="p-3 text-[13px] text-[#64748b]">
      Configuration for <strong>{data.type}</strong> node.
    </div>
  );
}
