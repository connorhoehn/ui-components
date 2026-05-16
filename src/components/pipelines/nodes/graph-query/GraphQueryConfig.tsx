import type { GraphQueryNodeData } from '../../../../types/pipeline';

export interface GraphQueryConfigProps {
  data: GraphQueryNodeData;
  onChange: (patch: Partial<GraphQueryNodeData>) => void;
}

export default function GraphQueryConfig({ data }: GraphQueryConfigProps) {
  return (
    <div className="p-3 text-[13px] text-[#64748b]">
      Configuration for <strong>{data.type}</strong> node.
    </div>
  );
}
