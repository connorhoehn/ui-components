interface AgentFlowPageProps {
    edges?: {
        from: string;
        to: string;
    }[];
    onAgentClick?: (agentId: string) => void;
    className?: string;
}
export declare function AgentFlowPage({ edges, onAgentClick, className }: AgentFlowPageProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=AgentFlowPage.d.ts.map