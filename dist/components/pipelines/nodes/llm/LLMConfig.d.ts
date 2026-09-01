import type { LLMNodeData, LLMProvider } from '../../../../types/pipeline';
export interface LLMConfigProps {
    data: LLMNodeData;
    onChange: (patch: Partial<LLMNodeData>) => void;
    /**
     * Node being edited. Supplied by ConfigPanel; when present the variable pills
     * and the resolved-prompt preview come from the node's real upstream graph
     * instead of a hardcoded sample.
     */
    nodeId?: string;
}
export declare const DEFAULT_MODELS_BY_PROVIDER: Record<LLMProvider, string[]>;
export default function LLMConfig({ data, onChange, nodeId }: LLMConfigProps): import("react").JSX.Element;
//# sourceMappingURL=LLMConfig.d.ts.map