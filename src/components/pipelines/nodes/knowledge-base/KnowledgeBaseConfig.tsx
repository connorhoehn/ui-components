import type { KnowledgeBaseNodeData } from '../../../../types/pipeline';

export interface KnowledgeBaseConfigProps {
  data: KnowledgeBaseNodeData;
  onChange: (patch: Partial<KnowledgeBaseNodeData>) => void;
}

export default function KnowledgeBaseConfig({ data }: KnowledgeBaseConfigProps) {
  return (
    <div style={{ padding: 12, fontSize: 13, color: '#64748b' }}>
      Configuration for <strong>{data.type}</strong> node.
    </div>
  );
}
