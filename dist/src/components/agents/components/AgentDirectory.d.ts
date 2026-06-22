import { AgentDefinition, AgentStatus, AgentMetrics } from '../../../types/agents';
export interface AgentDirectoryProps {
    agents: AgentDefinition[];
    metricsById?: Record<string, AgentMetrics>;
    /** Status values shown in the filter chip row. Defaults to all four. */
    filters?: AgentStatus[];
    /** Selected agent id (controlled). */
    selectedId?: string | null;
    onSelect?: (agent: AgentDefinition) => void;
    /** Override the empty-state copy. */
    emptyMessage?: string;
    className?: string;
}
export declare function AgentDirectory({ agents, metricsById, filters, selectedId, onSelect, emptyMessage, className, }: AgentDirectoryProps): import("react").JSX.Element;
//# sourceMappingURL=AgentDirectory.d.ts.map