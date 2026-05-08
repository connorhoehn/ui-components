import type { AgUiOutputNodeData } from '../../../../types/pipeline';

export interface AgUiOutputConfigProps {
  data: AgUiOutputNodeData;
  onChange: (patch: Partial<AgUiOutputNodeData>) => void;
}

export default function AgUiOutputConfig({ data }: AgUiOutputConfigProps) {
  return (
    <div style={{ padding: 12, fontSize: 13, color: '#64748b' }}>
      Configuration for <strong>{data.type}</strong> node.
    </div>
  );
}
