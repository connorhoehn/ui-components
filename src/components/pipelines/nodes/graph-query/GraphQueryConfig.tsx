import type { GraphQueryNodeData } from '../../../../types/pipeline';

export interface GraphQueryConfigProps {
  data: GraphQueryNodeData;
  onChange: (patch: Partial<GraphQueryNodeData>) => void;
}

export default function GraphQueryConfig({ data }: GraphQueryConfigProps) {
  return (
    <div style={{ padding: 12, fontSize: 13, color: '#64748b' }}>
      Configuration for <strong>{data.type}</strong> node.
    </div>
  );
}
