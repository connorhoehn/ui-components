import type { KnowledgeBaseNodeData } from '../../../../types/pipeline';

export interface KnowledgeBaseConfigProps {
  data: KnowledgeBaseNodeData;
  onChange: (patch: Partial<KnowledgeBaseNodeData>) => void;
}

export default function KnowledgeBaseConfig({ data }: KnowledgeBaseConfigProps) {
  return (
    <div className="p-3 text-[13px] text-[#64748b]">
      Configuration for <strong>{data.type}</strong> node.
    </div>
  );
}
