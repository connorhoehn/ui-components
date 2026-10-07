import { type ReactNode } from 'react';
import type { ChatSidePanelRef } from './chatCommands';
import type { ChatSidePanelApi, ChatSidePanelRenderer } from './ChatSidePanelRegistry';
import { type AgentRunOp, type AgentRunPhase, type AgentRunResult, type AgentRunStep } from './AgentRunCard';
/** The run's status, in the card's phase vocabulary (mirrors realtime-modules' `PipelineRunPhase`). */
export type RunPanelStatus = AgentRunPhase;
/** What the condensed panel shows. The host builds it from the run snapshot and the pipeline definition. */
export interface RunPanelData {
    pipelineId: string;
    runId: string;
    /** "Call transcription", not `call-transcription`. Falls back to the id. */
    pipelineName?: string;
    /** The chat command that started the run — `/doc`, `/summarize`. */
    command?: string;
    /** What the person asked for, in their words. */
    instruction?: string;
    status: RunPanelStatus;
    /** ISO timestamps. */
    startedAt?: string;
    completedAt?: string;
    /** Why it failed, when it did. */
    error?: string;
    steps: AgentRunStep[];
    /** What the run changed, in the document-ops vocabulary. */
    ops?: AgentRunOp[];
    /** The document the run worked on, when it worked on one. */
    document?: {
        id: string;
        title?: string;
        snippet?: string;
    };
    /** What a finished run produced, when it is something a reader can open. */
    result?: AgentRunResult;
    /** The conversation the run's card was posted in, when known. */
    channel?: string;
    /** The card's message id in that conversation, when known. */
    messageId?: string;
}
export interface CreateRunPanelRendererOptions {
    /** Fetches the run. Called on open, and again every `refreshMs` while the run is not terminal; a throw on open becomes the error state. */
    load: (panel: ChatSidePanelRef) => Promise<RunPanelData>;
    /** The footer's primary action: the full run page. */
    onOpenFull: (panel: ChatSidePanelRef, data: RunPanelData) => void;
    /** The footer's secondary action, offered when the run knows its conversation. */
    onOpenChat?: (panel: ChatSidePanelRef, data: RunPanelData) => void;
    /** "Open beside the chat" on the document row. */
    onOpenDocument?: (documentId: string) => void;
    /** Open the finished run's result — a panel, a document, a link. */
    onOpenResult?: (result: AgentRunResult) => void;
    /** Re-load interval while the run is running / awaiting. Default 2000; `0` disables. */
    refreshMs?: number;
    'data-testid'?: string;
}
/** `<pipelineId>:<runId>` — the panel id for a run. */
export declare function runPanelId(pipelineId: string, runId: string): string;
/** The two halves of a run panel id, split at the first `:`; null when either half is missing. */
export declare function parseRunPanelId(id: string): {
    pipelineId: string;
    runId: string;
} | null;
/** A run that is still moving — the panel keeps re-reading it. */
export declare function isRunPanelLive(status: RunPanelStatus): boolean;
export interface RunSummaryPanelProps {
    data: RunPanelData;
    onOpenFull: () => void;
    /** Offered only when the run knows its conversation. */
    onOpenChat?: () => void;
    onOpenDocument?: (documentId: string) => void;
    onOpenResult?: (result: AgentRunResult) => void;
    className?: string;
    'data-testid'?: string;
}
/** The condensed run, given its data. `createRunPanelRenderer` wraps it with loading, error and refresh. */
export declare function RunSummaryPanel({ data, onOpenFull, onOpenChat, onOpenDocument, onOpenResult, className, 'data-testid': testId }: RunSummaryPanelProps): import("react").JSX.Element;
interface RunPanelBodyProps {
    panel: ChatSidePanelRef;
    api: ChatSidePanelApi;
    options: CreateRunPanelRendererOptions;
}
export declare function RunPanelBody({ panel, api, options }: RunPanelBodyProps): ReactNode;
/** One line for a host: `renderers={{ run: createRunPanelRenderer({ load, onOpenFull }) }}`. */
export declare function createRunPanelRenderer(options: CreateRunPanelRendererOptions): ChatSidePanelRenderer;
export default RunSummaryPanel;
//# sourceMappingURL=RunSummaryPanel.d.ts.map