import type { PolicyNodeData } from '../../../../types/pipeline';

export interface PolicyConfigProps {
  data: PolicyNodeData;
  onChange: (patch: Partial<PolicyNodeData>) => void;
}

export default function PolicyConfig({ data }: PolicyConfigProps) {
  return (
    <div className="p-3 text-[13px] text-[#64748b]">
      Configuration for <strong>{data.type}</strong> node.
    </div>
  );
}
