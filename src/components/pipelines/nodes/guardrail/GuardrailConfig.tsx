import type { GuardrailNodeData } from '../../../../types/pipeline';

export interface GuardrailConfigProps {
  data: GuardrailNodeData;
  onChange: (patch: Partial<GuardrailNodeData>) => void;
}

export default function GuardrailConfig({ data }: GuardrailConfigProps) {
  return (
    <div className="p-3 text-[13px] text-[#64748b]">
      Configuration for <strong>{data.type}</strong> node.
    </div>
  );
}
