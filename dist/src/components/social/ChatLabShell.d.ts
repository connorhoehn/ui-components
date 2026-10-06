import { type ReactNode } from 'react';
import { formatTokens } from '../compute/hooks/useComputeProjects';
export { formatTokens };
/** Where a loop is. Mirrors the run status platform-api reports. */
export type LabStatus = 'planning' | 'starting' | 'running' | 'waiting' | 'done' | 'failed' | 'stopped' | 'budget';
export interface LabStep {
    id: string;
    title: string;
    kind: string;
    status: 'pending' | 'running' | 'done' | 'failed' | 'skipped';
    iterations?: number;
    contextTokens?: number;
}
export interface LabEvent {
    id: string;
    at: string;
    kind: 'command' | 'text' | 'tool' | 'result' | 'error' | 'status' | 'iteration';
    text: string;
    /** Long form — a tool's arguments and output. Collapsed behind a disclosure. */
    detail?: string;
    /** True when the runtime that produced this frame was a mock. Always shown. */
    mock?: boolean;
}
export interface ChatLabShellProps {
    /** The instruction the loop was started with, already truncated by the host. */
    title: string;
    status: LabStatus;
    model: string;
    contextBudgetTokens: number;
    contextTokens: number;
    iterations: number;
    /** `'fallback'` means the planner did not answer and this is one step. Surfaced. */
    planSource?: 'planner' | 'fallback';
    steps: LabStep[];
    events: LabEvent[];
    /** The `›` prompt. Disabled while the loop is mid-turn — there is nothing to interrupt. */
    onInstruct?: (text: string) => void | Promise<void>;
    onStop?: () => void;
    onBackToChat: () => void;
    onOpenRun?: () => void;
    onOpenGraph?: () => void;
    /**
     * The box behind the loop. Present = a Terminal tab exists. `shellUrl` is
     * minted on demand by the host, so its absence is a button, not an error.
     */
    shell?: {
        sessionId: string;
        shellUrl?: string;
        onRequestShell?: () => void;
    };
    /** Honest state, e.g. "Planner unavailable · single step" or "Mock runtime". */
    notice?: string;
    /**
     * Drawn in the title bar before the actions — who else is watching this
     * loop (a `PresenceAvatars` / viewers stack), a share control. The host
     * supplies it so presence stays the host's subscription.
     */
    headerAccessory?: ReactNode;
    /**
     * Where the shell is drawn. `'column'` (the default) is the whole chat
     * column: one dense status row and a horizontal step rail. `'pane'` is a
     * 400–560px side pane beside a conversation that stays on screen: the
     * status line takes two rows (where it is and what it is on; what it has
     * spent and how many turns), the step rail wraps instead of scrolling
     * sideways, and `onBackToChat` reads **Close** — nothing was taken from the
     * chat, so there is nothing to go "back" to.
     */
    variant?: ChatLabShellVariant;
    className?: string;
    'data-testid'?: string;
}
export type ChatLabShellVariant = 'column' | 'pane';
export declare function ChatLabShell({ title, status, model, contextBudgetTokens, contextTokens, iterations, planSource, steps, events, onInstruct, onStop, onBackToChat, onOpenRun, onOpenGraph, shell, notice, headerAccessory, variant, className, 'data-testid': testId, }: ChatLabShellProps): import("react").JSX.Element;
export interface ChatLabPillProps {
    status: LabStatus;
    contextTokens: number;
    contextBudgetTokens: number;
    onOpen: () => void;
    className?: string;
    'data-testid'?: string;
}
/**
 * The loop, shrunk to one line for the composer's chip row.
 *
 * "Back to chat" must not feel like abandoning the run, so the run has to stay
 * visible and one click away once the column is a conversation again.
 */
export declare function ChatLabPill({ status, contextTokens, contextBudgetTokens, onOpen, className, 'data-testid': testId, }: ChatLabPillProps): import("react").JSX.Element;
export default ChatLabShell;
//# sourceMappingURL=ChatLabShell.d.ts.map