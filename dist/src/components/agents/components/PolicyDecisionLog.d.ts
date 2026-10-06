export interface PolicyDecision {
    id: string;
    action: string;
    resource: string;
    principal: string;
    decision: 'allow' | 'deny';
    policyId: string;
    timestamp: string;
    reason?: string;
}
interface PolicyDecisionLogProps {
    decisions: PolicyDecision[];
    className?: string;
    maxItems?: number;
}
export declare function PolicyDecisionLog({ decisions, className, maxItems }: PolicyDecisionLogProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=PolicyDecisionLog.d.ts.map