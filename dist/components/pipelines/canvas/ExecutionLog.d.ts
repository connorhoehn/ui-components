export interface ExecutionLogProps {
    /**
     * When set, the log only shows events whose payload references this node
     * (via `payload.stepId` or `payload.nodeId`). The chip above the rows
     * surfaces the current filter with a x to clear.
     */
    filterByNodeId?: string | null;
    /** Called when the user clears the node filter from the chip. */
    onClearFilter?: () => void;
    /**
     * Optional human label for the filter chip. When omitted we fall back to
     * the raw nodeId.
     */
    filterNodeLabel?: string | null;
}
export default function ExecutionLog({ filterByNodeId, onClearFilter, filterNodeLabel, }?: ExecutionLogProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ExecutionLog.d.ts.map