import { type ReactNode } from 'react';
export type NodeExecutionState = 'idle' | 'pending' | 'running' | 'awaiting' | 'completed' | 'failed' | 'skipped';
export interface BaseNodeProps {
    icon: string;
    subtitle?: string;
    state: NodeExecutionState;
    body?: ReactNode;
    footer?: ReactNode;
    selected?: boolean;
    /**
     * When provided AND `state === 'failed'`, renders a small "⟳ Retry from
     * here" pill inline below the header. The click handler is invoked with
     * propagation stopped so the canvas doesn't also receive a node-select.
     * Per PIPELINES_PLAN.md §18.4.4 / §17.6.
     */
    onRetry?: () => void;
    /** Show a red breakpoint dot in the top-left corner of the card. */
    hasBreakpoint?: boolean;
    /** Highlight the card with an orange border/glow (run is paused here). */
    pausedAtBreakpoint?: boolean;
    /**
     * Optional override for the accessible name. When omitted we synthesize one
     * from `subtitle` + `state`. Callers (per node-type) can pass a richer
     * string (e.g. "LLM node, Claude Opus 4, system prompt: …") for screen
     * reader users.
     */
    ariaLabel?: string;
    children?: ReactNode;
}
export default function BaseNode(props: BaseNodeProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=BaseNode.d.ts.map