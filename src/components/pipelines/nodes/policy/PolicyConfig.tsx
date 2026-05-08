import type { PolicyNodeData } from '../../../../types/pipeline';

export interface PolicyConfigProps {
  data: PolicyNodeData;
  onChange: (patch: Partial<PolicyNodeData>) => void;
}

export default function PolicyConfig({ data }: PolicyConfigProps) {
  return (
    <div style={{ padding: 12, fontSize: 13, color: '#64748b' }}>
      Configuration for <strong>{data.type}</strong> node.
    </div>
  );
}
