import type { LabStatus, LabStep } from './ChatLabShell';
import type { ChatSidePanelRef } from './chatCommands';
export type AgentRunPhase = 'received' | 'running' | 'awaiting_approval' | 'completed' | 'rejected' | 'failed';
export type AgentRunDecision = 'approve' | 'reject';
/** What a reviewer does with an edit that landed as suggestions. */
export type AgentRunReviewDecision = 'accept' | 'reject';
/**
 * The suggestions a finished edit left in the document, waiting for a
 * reviewer. Mirrors realtime-modules' `PipelineRunStatus.suggestion` — keep
 * the field names.
 */
export interface AgentRunSuggestion {
    /** The suggestion key the changes were tagged with; the review resolves everything under it. */
    key: string;
    documentId?: string;
    /** How many changes were suggested. */
    applied: number;
}
/** Who accepted or rejected the suggestions, and when. Mirrors realtime-modules' `PipelineRunStatus.review`. */
export interface AgentRunReview {
    decision: AgentRunReviewDecision;
    /** The reviewer's id. */
    by: string;
    byName?: string;
    /** ISO timestamp. */
    at: string;
}
/**
 * What a finished run produced, when it produced something a reader can open:
 * a side panel (a search graph, a trace), the document it edited, or a link.
 * Read from the message's metadata (`result`) when the run is posted done, or
 * from the live status while the card is watching it.
 */
export type AgentRunResult = {
    kind: 'panel';
    panel: ChatSidePanelRef;
} | {
    kind: 'document';
    documentId: string;
} | {
    kind: 'link';
    href: string;
    label?: string;
};
/** One step of the run, for the expanded timeline. Mirrors realtime-modules' step status vocabulary — keep the names. */
export type AgentRunStepStatus = 'pending' | 'running' | 'completed' | 'failed' | 'skipped' | 'awaiting';
export interface AgentRunStep {
    id: string;
    label: string;
    status: AgentRunStepStatus;
}
/**
 * One edit the agent made, in the document-ops vocabulary the pipeline emits
 * (`setTitle`, `appendBlock`, `replaceBlock`, …). The card turns each into a
 * sentence; an op it does not know is shown by name.
 */
export interface AgentRunOp {
    op: string;
    /** The new title, the block's text, the macro's name, the type's name, or a skip's reason — whichever the op carries. */
    text?: string;
    /** The block the op acted on, zero-based. */
    index?: number;
    /** The block an `appendBlock`/`insertBlock` added — 'paragraph' | 'heading' | 'horizontalRule'. */
    kind?: string;
    /** A heading's level (1–6). */
    level?: number;
}
/**
 * What the expanded card shows. Populated by realtime-modules' run hook from
 * the run's steps and the edit it applied — keep the field names.
 */
export interface AgentRunDetails {
    steps?: AgentRunStep[];
    ops?: AgentRunOp[];
    document?: {
        id: string;
        title?: string;
        snippet?: string;
    };
    /** ISO timestamps. */
    startedAt?: string;
    completedAt?: string;
    error?: string;
}
export interface AgentRunStatus {
    phase: AgentRunPhase;
    /** The outcome to open, once `phase === 'completed'`. */
    result?: AgentRunResult;
    /**
     * Set when the run completed but changed nothing — the model declined the
     * instruction. The badge reads "No change" and `detail` carries the reason,
     * so a declined run and a landed edit stop looking identical.
     */
    noop?: boolean;
    /** Everything the expanded card shows: steps, ops, the document, timings. */
    details?: AgentRunDetails;
    /** The step in flight, when known — "Reading the document", "Planning the edit", "Retrying — attempt 2". */
    stepLabel?: string;
    /** A sentence about the outcome — "Renamed to …", the failure, why approval is needed. */
    detail?: string;
    /** The approval step a decision goes to, while `phase === 'awaiting_approval'`. */
    approvalStepId?: string;
    /** Set when a completed edit landed as suggestions rather than changes; the card offers Accept / Reject until `review` is set. */
    suggestion?: AgentRunSuggestion;
    /** Set once someone accepted or rejected the suggestions. */
    review?: AgentRunReview;
}
/** Where an agent LOOP is — the lab's own eight words. */
export type AgentRunLoopPhase = LabStatus;
/**
 * An agent loop, live, for its card in the transcript.
 *
 * A loop (`/agent …`) is not a pipeline edit that is received, processed and
 * done in seconds: it plans for half a minute, then works through steps for
 * minutes, spending a context budget. The card says that in the thread so
 * nothing has to take the conversation's place to show it — the phase, the
 * clock while it is planning, the step it is on, what it has spent, and a way
 * into the lab.
 */
export interface AgentRunLoop {
    phase: AgentRunLoopPhase;
    /** When the run started (ISO). With it, the card's clock ticks on its own while the loop is busy. */
    startedAt?: string;
    /** How long it has run, as last reported. Used when `startedAt` is absent. */
    elapsedMs?: number;
    /** The plan, with the running step marked. Empty while planning. */
    steps?: readonly LabStep[];
    contextTokens?: number;
    contextBudgetTokens?: number;
    /** One sentence about how it ended — the failure, the summary. Replaces the phase's own words once it has ended. */
    outcome?: string;
}
export interface AgentRunCardProps {
    runId: string;
    instruction: string;
    /** The agent carrying it out, e.g. "Haiku". */
    agentName: string;
    requestedBy?: string;
    /** The command this run is — `/doc`, `recording`, `transcribe`. Shown in mono before the instruction. */
    command?: string;
    status?: AgentRunStatus;
    /** Open the document the edit went into. */
    onOpenDocument?: () => void;
    /** Open the run in the pipeline UI. */
    onOpenRun?: (runId: string) => void;
    /** The result carried in the message's metadata; `status.result` wins when both are set. */
    result?: AgentRunResult;
    /** Open the finished run's result — a panel beside the chat, the document, a link. The action renders only when this is given. */
    onOpenResult?: (result: AgentRunResult) => void;
    /** Approve or reject a run that is waiting; the buttons render only when this is given. */
    onDecide?: (runId: string, decision: AgentRunDecision) => void;
    /** The suggestions carried in the message's metadata; `status.suggestion` wins when both are set. */
    suggestion?: Pick<AgentRunSuggestion, 'key' | 'documentId'>;
    /** Accept or reject a finished edit that landed as suggestions; the buttons render only when this is given. */
    onReview?: (runId: string, decision: AgentRunReviewDecision, suggestion: Pick<AgentRunSuggestion, 'key' | 'documentId'>) => void;
    /** The document's title as the message carried it; the expanded document row falls back to it when the live details have none. */
    documentTitle?: string;
    /**
     * Start the run again after it failed. A "Retry" button renders on the
     * status row of a failed card only when this is given — the host knows
     * whether the run can be retried (a refused run cannot) and from where.
     */
    onRetry?: (runId: string) => void;
    /** Start expanded. The default is the two-line card; the details are a click away. */
    defaultExpanded?: boolean;
    /**
     * The run is an agent loop, and this is where it is. Given, the card shows
     * the loop's phase, clock, steps and budget in place of the pipeline's three
     * beats. The pipeline props above keep working for every other run.
     */
    loop?: AgentRunLoop;
    /** Open the loop's lab beside the chat. An "Open lab" action renders only when this is given. */
    onOpenLab?: (runId: string) => void;
    className?: string;
    'data-testid'?: string;
}
/** `0:42`, `12:05` — a clock, not a duration sentence: it is read while it moves. */
export declare function formatLoopClock(ms: number): string;
/** The loop's status sentence: "Planning…", "Running step 2 of 4 — Build the deck", the outcome. */
export declare function describeAgentLoop(loop: AgentRunLoop): string;
/**
 * A failed run's message, as a person reads it. The pipeline's own error is
 * written for the run log — "the chat service did not answer the join for
 * chat:dm:a:b (timeout after 4000ms)" — and the card used to print it as-is
 * on the status row. This turns the technical shapes the platform produces
 * into one plain sentence that says what did not happen and what to do, and
 * keeps the original text as `technical` for the details disclosure. A
 * message that matches nothing is already a sentence (the pipeline wrote it
 * for people, e.g. "The agent is busy…") and passes through unchanged, with
 * no technical line.
 */
export declare function describeAgentRunFailure(raw: string | undefined, command?: string): {
    summary: string;
    technical?: string;
};
/** One op as a sentence. Exported for the tests and for hosts that render a run outside the card. */
export declare function describeAgentRunOp(op: AgentRunOp): string;
/** "started 21:44 · 80s" — whichever halves the timestamps allow. */
export declare function agentRunTimings(details: Pick<AgentRunDetails, 'startedAt' | 'completedAt'> | undefined): string | null;
/** The dot class for a step status — shared with RunSummaryPanel so the two timelines read the same. */
export declare const AGENT_RUN_STEP_DOT: Record<AgentRunStepStatus, string>;
export declare function AgentRunCard({ runId, instruction, agentName, requestedBy, command, status, onOpenDocument, onOpenRun, result, onOpenResult, onDecide, suggestion: suggestionProp, onReview, onRetry, documentTitle, defaultExpanded, loop, onOpenLab, className, 'data-testid': testId }: AgentRunCardProps): import("react").JSX.Element;
/** Reads a `/doc` command message's metadata; null for anything else. */
export declare function agentRunRefFromMetadata(metadata: Record<string, unknown> | undefined): {
    runId: string;
    documentId: string;
    documentTitle?: string;
    instruction: string;
    agentName: string;
    pipelineId?: string;
    command: string;
    result?: AgentRunResult;
    suggestionKey?: string;
    lab?: true;
} | null;
/** Reads a run result out of untrusted metadata; null for anything malformed. */
export declare function agentRunResultFromMetadata(value: unknown): AgentRunResult | null;
export default AgentRunCard;
//# sourceMappingURL=AgentRunCard.d.ts.map