import type { GuardrailNodeData } from '../../../../types/pipeline';

export interface GuardrailConfigProps {
  data: GuardrailNodeData;
  onChange: (patch: Partial<GuardrailNodeData>) => void;
}

export default function GuardrailConfig({ data }: GuardrailConfigProps) {
  return (
    <div style={{ padding: 12, fontSize: 13, color: '#64748b' }}>
      Configuration for <strong>{data.type}</strong> node.
    </div>
  );
}
