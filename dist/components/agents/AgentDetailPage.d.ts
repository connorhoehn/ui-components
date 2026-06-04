import type { TraceTimeline as TraceTimelineType } from '../../types/agents';
interface AgentDetailPageProps {
    agentId: string;
    trace?: TraceTimelineType;
    onBack?: () => void;
    className?: string;
}
export declare function AgentDetailPage({ agentId, trace, onBack, className }: AgentDetailPageProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=AgentDetailPage.d.ts.map