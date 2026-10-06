import { type ReactNode } from 'react';
import type { NodeCategory } from './categories';
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
    /**
     * The node's type, so the card can mark itself when the host's executor has
     * no handler for it. Optional: without it the card simply isn't marked.
     */
    nodeType?: string;
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
    /**
     * Node-category visual channel (NODE-VISUALS-AUDIT §3.1). When provided,
     * renders a 3px category-colored left accent bar plus a shaped/tinted
     * 20px icon chip in the header. Orthogonal to `state`, which keeps sole
     * ownership of the card border + background. When omitted, rendering is
     * byte-for-byte identical to the pre-category BaseNode.
     */
    category?: NodeCategory;
    children?: ReactNode;
}
export default function BaseNode(props: BaseNodeProps): import("react").JSX.Element;
//# sourceMappingURL=BaseNode.d.ts.map