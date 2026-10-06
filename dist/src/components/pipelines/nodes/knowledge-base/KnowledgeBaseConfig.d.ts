import type { KnowledgeBaseNodeData } from '../../../../types/pipeline';
export interface KnowledgeBaseConfigProps {
    data: KnowledgeBaseNodeData;
    onChange: (patch: Partial<KnowledgeBaseNodeData>) => void;
    /** Node being edited; drives the real upstream-context pills. */
    nodeId?: string;
}
export default function KnowledgeBaseConfig({ data, onChange, nodeId, }: KnowledgeBaseConfigProps): import("react").JSX.Element;
//# sourceMappingURL=KnowledgeBaseConfig.d.ts.map