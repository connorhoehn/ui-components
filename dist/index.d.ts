import { AnchorHTMLAttributes } from 'react';
import { Awareness } from 'y-protocols/awareness';
import { ButtonHTMLAttributes } from 'react';
import { Component } from 'react';
import { Context } from 'react';
import { CSSProperties } from 'react';
import { default as default_2 } from 'react';
import { ElementType } from 'react';
import { ErrorInfo } from 'react';
import { ForwardRefExoticComponent } from 'react';
import { HTMLAttributes } from 'react';
import { InputHTMLAttributes } from 'react';
import { JSX } from 'react';
import { JSXElementConstructor } from 'react';
import { MouseEvent as MouseEvent_2 } from 'react';
import { MouseEventHandler } from 'react';
import { MutableRefObject } from 'react';
import { Observable } from 'lib0/observable';
import { ReactElement } from 'react';
import { ReactNode } from 'react';
import { ReactPortal } from 'react';
import { Ref } from 'react';
import { RefAttributes } from 'react';
import { RefObject } from 'react';
import { SelectHTMLAttributes } from 'react';
import { SVGProps } from 'react';
import { TdHTMLAttributes } from 'react';
import { TextareaHTMLAttributes } from 'react';
import { ThHTMLAttributes } from 'react';
import { Viewport } from '@xyflow/react';
import { XmlFragment } from 'yjs';
import * as Y from 'yjs';

export declare interface A2AMessage {
    id: string;
    from: string;
    to: string;
    content: string;
    protocol: 'a2a';
    timestamp: string;
    metadata?: Record<string, unknown>;
}

export declare interface A2ASession {
    sessionId: string;
    participants: AgentDefinition[];
    messages: A2AMessage[];
    startedAt: string;
    status: 'active' | 'completed' | 'failed';
}

export declare function AccessNotice({ tone, title, body, action, className, 'data-testid': testId, }: AccessNoticeProps): JSX.Element;

export declare interface AccessNoticeAction {
    label: string;
    onClick?: () => void;
    /** Renders a real link instead of a button. */
    href?: string;
}

export declare interface AccessNoticeProps {
    tone?: AccessNoticeTone;
    title: string;
    body?: ReactNode;
    action?: AccessNoticeAction | null;
    className?: string;
    'data-testid'?: string;
}

export declare type AccessNoticeTone = 'warning' | 'info' | 'danger';

export declare interface ActionNodeData {
    type: 'action';
    actionType: ActionType;
    /** Shape varies per `actionType`; refined in Phase 2. */
    config: Record<string, unknown>;
    idempotent?: boolean;
    /**
     * Dedup scope when `idempotent: true`.
     * - `per-step` (default): fire at most once per step across all retries.
     * - `per-attempt`: fire once per attempt; retries get a fresh dedup window.
     */
    idempotencyMode?: 'per-attempt' | 'per-step';
    onError?: 'route-error' | 'fail-run';
    retryPolicy?: RetryPolicy;
}

export declare interface ActionRowItem {
    id: string;
    title: string;
    /** One line under the title. Truncates; absent, no second line. */
    description?: ReactNode;
    /** Right-aligned facts, already worded — "Layla Hassan · 5 points". */
    meta?: ReactNode;
    /** A link target. Without it the row is a button calling `onOpen`. */
    href?: string;
    disabled?: boolean;
    /** Tooltip on a disabled row: why it cannot be opened. */
    disabledReason?: string;
}

export declare function ActionRowList({ items, onOpen, footer, emptyLabel, 'aria-label': ariaLabel, className, 'data-testid': testId, }: ActionRowListProps): JSX.Element | null;

export declare interface ActionRowListProps {
    items: ActionRowItem[];
    /** A row was activated (click, Enter, Space). Also called for `href` rows. */
    onOpen?: (item: ActionRowItem) => void;
    /** Under the list — normally a link, "See all 11 work items →". */
    footer?: ReactNode;
    /** Shown instead of the rows when `items` is empty. Absent, nothing renders. */
    emptyLabel?: ReactNode;
    'aria-label'?: string;
    className?: string;
    'data-testid'?: string;
}

export declare type ActionType = 'update-document' | 'post-comment' | 'notify' | 'webhook' | 'mcp-tool' | 'sync-back';

export declare function ActiveCallBanner({ open, onJoin, onDismiss, lobbyLabel, elapsedMs, participants, participantCount, loading, }: ActiveCallBannerProps): JSX.Element | null;

/** Thin participant shape — same contract as ResumeCallParticipant:
 *  caller MUST pass safeDisplayName output, never a raw UUID. */
export declare interface ActiveCallBannerParticipant {
    userId: string;
    name: string;
    avatarUrl?: string;
}

export declare interface ActiveCallBannerProps {
    /** Visibility — when false nothing renders. */
    open: boolean;
    /** Join button → consumer starts its join flow (may be async; flip
     *  `loading` while pending). */
    onJoin: () => void | Promise<void>;
    /** Dismiss (X / "Not now") → consumer hides and typically remembers
     *  the dismissal for this callId so the banner doesn't re-appear. */
    onDismiss: () => void;
    /** Human-readable lobby label shown in the banner title. */
    lobbyLabel: string;
    /** Elapsed ms at mount — live display advances on a local 1s tick,
     *  so the parent never re-renders to move the clock. 0/absent hides
     *  the duration chip (status replies without startedAt). */
    elapsedMs?: number;
    /** Participants currently in the call. Names pre-resolved. */
    participants: ActiveCallBannerParticipant[];
    /** Overrides the "N in call" count when the caller knows a truer
     *  number than participants.length (e.g. server participantCount
     *  when some names couldn't be resolved). */
    participantCount?: number;
    /** True while the join attempt is in flight. */
    loading?: boolean;
}

export declare const activeNavItemClassName = "block px-[14px] py-2 border-l-[3px] border-primary bg-surface-hover text-text-primary no-underline cursor-pointer";

export declare const activeNavItemStyle: CSSProperties;

export declare function ActivePeopleGrid({ people, maxVisible, onSelectPerson, onShowAll, onSelectSharedWork, emptyLabel, className, 'data-testid': testId, }: ActivePeopleGridProps): JSX.Element;

export declare interface ActivePeopleGridProps {
    people: readonly ActivePerson[];
    /** Beyond this many, the rest collapse into a "+N" tile. Default 8. */
    maxVisible?: number;
    /** Clicking a tile — the host opens a chat with them. */
    onSelectPerson?: (userId: string) => void;
    /** Clicking the "+N" tile. Without it, the tile is inert text rather than a button. */
    onShowAll?: () => void;
    /** Opens this person's server-filtered shared work graph. */
    onSelectSharedWork?: (userId: string) => void;
    emptyLabel?: string;
    className?: string;
    'data-testid'?: string;
}

export declare interface ActivePerson {
    userId: string;
    displayName: string;
    avatarUrl?: string;
    /** What they are doing right now — "In a call", "Editing the roadmap". A tooltip, and a small glyph on the bubble. */
    activity?: string;
    /** In a live call right now: the bubble gets a ring and the tile a small live marker. */
    inCall?: boolean;
    status?: 'online' | 'busy' | 'away';
    /** Voluntary work sharing is independent from presence and call state. */
    workSharing?: {
        state: 'active' | 'historical';
        fresh: boolean;
    };
}

declare interface ActiveSync {
    sourceId: string;
    sourceName: string;
    fileCount: number;
    filesFetched: number;
    itemsMapped: number;
    itemsMaterialized: number;
    startedAt: string;
}

/**
 * The preset the work-activity canvas wears: grey lines on the near-white
 * surface the nodes already sit on, rippling slowly, never competing with them.
 * Exported so a host can match it on a surface of its own.
 *
 * `edgeFade` is low because this grid is the SURFACE of the section, not a
 * picture in it: it has to reach the sides of a panel that is usually much
 * wider than it is tall. What is left is a soft dimming toward the corners
 * (about a third of the way to white), enough that the box still has a
 * centre without the grid ending before the box does.
 */
export declare const ACTIVITY_RIPPLE_GRID: RippleGridBackgroundProps;

/**
 * The same grid for a DARK surface. `lightMode` paints an opaque white ground
 * — on a dark page that is a white box with a grid in it — so this variant
 * uses the additive branch instead: dim grey lines on a transparent ground,
 * and the surface underneath stays whatever the theme made it. Same cell
 * size, same ripple, same edge fade, so switching theme changes the ink and
 * nothing else.
 */
export declare const ACTIVITY_RIPPLE_GRID_DARK: RippleGridBackgroundProps;

declare interface ActivityEvent {
    id: string;
    eventType: string;
    detail: Record<string, unknown>;
    timestamp: string;
    userId?: string;
    displayName?: string;
    color?: string;
    source: 'local' | 'remote';
}

export declare function ActivityFeed({ items, visibleCount, rotateMs, staggerMs, kindColors, className, }: ActivityFeedProps): JSX.Element;

export declare interface ActivityFeedItem {
    id: string;
    /** Display name of the person who performed the action, e.g. "Alex Chen". */
    actor: string;
    /** Verb phrase, e.g. "completed". */
    action: string;
    /** Jira-style ticket ID badge, e.g. "K8S-182". */
    ticketId?: string;
    /** Short description/title of the work item. */
    subject: string;
    /** Human-readable relative timestamp, e.g. "2m ago". */
    timeLabel?: string;
    /** Controls the type-dot color. */
    kind?: ActivityKind;
}

export declare interface ActivityFeedProps {
    items: ActivityFeedItem[];
    /** Number of items visible at once (default: 3). */
    visibleCount?: number;
    /** Auto-rotation interval in ms (default: 4200). Set 0 to disable. */
    rotateMs?: number;
    /** Delay before the first rotation fires, for stagger between sibling feeds (ms). */
    staggerMs?: number;
    /** Override dot colors per kind. Merged over the built-in palette. */
    kindColors?: Record<string, string>;
    className?: string;
}

/** A lightning bolt: activity, "things are happening". */
export declare function ActivityIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare interface ActivityItem {
    eventType: string;
    timestamp: string;
    detail: Record<string, unknown>;
}

export declare type ActivityKind = 'task' | 'pr' | 'decision' | 'comment' | 'status' | string;

export declare function ActivityPanel({ idToken, sendMessage, onMessage, connectionState, baseUrl, fetchActivity, onError, }: ActivityPanelProps): JSX.Element;

export declare interface ActivityPanelProps {
    idToken: string | null;
    sendMessage: (msg: Record<string, unknown>) => void;
    onMessage: OnMessageFn_10;
    connectionState: ConnectionState_4;
    /**
     * Origin for `GET /api/activity`. Wins over the build-time
     * `VITE_SOCIAL_API_URL`, which a consumer cannot influence — see the note
     * on `getBaseUrl` above. Pass the same origin the host's other REST calls
     * use; `''` is a same-origin request.
     */
    baseUrl?: string;
    /**
     * Full replacement for the REST hydration, for a host that already owns an
     * authorized client (signed requests, a proxy, a mock in tests). Wins over
     * `baseUrl`. The live WebSocket half is untouched either way.
     */
    fetchActivity?: FetchActivityFn;
    /**
     * Called with the normalized `Error` whenever a hydrate (REST or
     * `fetchActivity`) fails — in addition to, not instead of, the panel's own
     * inline `ErrorState` and toast. A host with its own error-reporting
     * (Sentry, a status bar) hooks in here instead of re-deriving failure from
     * the panel's render output.
     */
    onError?: (err: Error) => void;
}

export declare interface ActivityResponse {
    items: ActivityItem[];
    nextKey: string | null;
}

/** Insert a fresh slide after `afterIndex` (-1 puts it first). */
export declare function addSlide(spec: DeckSpec, afterIndex: number, layout?: SlideLayout): DeckSpec;

export declare function AddToChatDialog({ open, conversationName, people, preselectedIds, busy, anchor, placement, onAdd, onClose, 'data-testid': testId, historyChoice, }: AddToChatDialogProps): JSX.Element;

export declare interface AddToChatDialogProps {
    open: boolean;
    /** "#design", "the chat with Carol" — the place they are being added to. */
    conversationName: string;
    /** Everyone who could be added — members already in are the host's to leave out. */
    people: readonly AddToChatPerson[];
    preselectedIds?: readonly string[];
    busy?: boolean;
    /** The control that opened it. The popover hangs off this; without it, it centres. */
    anchor?: RefObject<HTMLElement | null> | null;
    placement?: InlinePopoverPlacement;
    /** Resolves when the server has them; rejects with a reason to show. */
    onAdd: (userIds: string[], history: MembershipHistory) => Promise<void> | void;
    /**
     * Offer the Teams history choice. Off for a place whose policy decides
     * it — a room's members always get the room's past — and `onAdd` then
     * receives `{ mode: 'all' }`.
     */
    historyChoice?: boolean;
    onClose: () => void;
    'data-testid'?: string;
}

export declare interface AddToChatPerson {
    id: string;
    name: string;
    avatarUrl?: string;
    /** A second line — a title, an email, "already in 3 of your chats". */
    subtitle?: string;
}

export declare type AdjustLayer = {
    kind: 'brightness';
    value: number;
} | {
    kind: 'contrast';
    value: number;
} | {
    kind: 'saturation';
    value: number;
} | {
    kind: 'hue';
    degrees: number;
} | {
    kind: 'blur';
    radiusPx: number;
};

export declare function AdminDashboardPage({ stats, pools, onNavigate, loading }: AdminDashboardPageProps): JSX.Element;

export declare interface AdminDashboardPageProps {
    stats: {
        userPools: number;
        clients: number;
        totalUsers: number;
    };
    pools: Array<{
        poolId: string;
        poolName: string;
        createdAt: string;
    }>;
    onNavigate: (path: string) => void;
    loading?: boolean;
}

/**
 * The agent surfaces' sky: white through the two indigos `--color-primary`
 * wears at night. One constant, used by the lab shell, the compute pane and the
 * chat console, so a loop looks like itself wherever it is showing.
 */
export declare const AGENT_PARTICLE_COLORS: readonly ["#ffffff", "#c7d2fe", "#a5b4fc"];

/** The dot class for a step status — shared with RunSummaryPanel so the two timelines read the same. */
export declare const AGENT_RUN_STEP_DOT: Record<AgentRunStepStatus, string>;

/** Dot colour per status. `running` pulses unless the reader asked for less motion. */
export declare const AGENT_TASK_STATUS_DOT: Record<AgentTaskStatus, string>;

/** The words for each status, as the strip and the card print them. */
export declare const AGENT_TASK_STATUS_LABELS: Record<AgentTaskStatus, string>;

export declare interface AgentDefinition {
    id: string;
    name: string;
    status: AgentStatus;
    protocol: AgentProtocol;
    model: string;
    tools: string[];
    guardrails: string[];
    endpoint: string;
    description?: string;
    lastInvocation?: string;
    avgLatencyMs?: number;
    invocationsLast24h?: number;
}

export declare type AgentInvokeProtocol = 'a2a' | 'direct';

export declare interface AgentMetrics {
    agentId: string;
    invocationsTotal: number;
    invocationsLast24h: number;
    errorsLast24h: number;
    avgLatencyMs: number;
    p99LatencyMs: number;
    tokensInLast24h: number;
    tokensOutLast24h: number;
    guardrailBlocksLast24h: number;
    asOf: string;
}

/**
 * `agent` node config — agent-step contract v1.
 *
 * BREAKING CHANGE in 2.96.0. This interface previously described an
 * aspirational "invoke a registered Strands agent over A2A" node
 * (`agentId` / `protocol` / `inputTemplate` / `streaming`). That node was
 * never executable by any host: no config panel ever shipped for it, no
 * executor ever handled it, and `AgentNode` crashed on
 * `data.protocol.toUpperCase()` for any host that dropped one on a canvas.
 *
 * It is replaced by the real thing: a Claude agent loop (multi-turn, tool
 * use) run via `claude -p`, whose contract is shared with the backend
 * (platform-api) and the executor (distributed-core). If you need the old
 * A2A-invoke semantics back, they belong on a distinct node type — not on
 * this one.
 */
export declare interface AgentNodeData {
    type: 'agent';
    /** The task. Supports the same {{ context.x }} interpolation as `llm`. */
    prompt: string;
    systemPrompt?: string;
    /** Friendly alias ('sonnet' | 'opus' | 'haiku') or an explicit model id. */
    model?: string;
    /**
     * Tools the agent may use. DEFAULT-DENY: absent or empty means the agent
     * runs with NO tools and is equivalent to a plain `llm` step. Never widen
     * this implicitly — hosts must make the empty case visible to authors.
     */
    allowedTools?: string[];
    /** Hard ceiling on agent turns. Default 8. */
    maxTurns?: number;
    /** Wall-clock ceiling for the whole step. Default 120_000. */
    timeoutMs?: number;
    retryPolicy?: RetryPolicy;
}

export declare type AgentProtocol = 'a2a' | 'direct';

export declare function AgentRunCard({ runId, instruction, agentName, requestedBy, command, status, onOpenDocument, onOpenRun, result, onOpenResult, onDecide, suggestion: suggestionProp, onReview, documentTitle, defaultExpanded, className, 'data-testid': testId }: AgentRunCardProps): JSX.Element;

export declare interface AgentRunCardProps {
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
    /** Start expanded. The default is the two-line card; the details are a click away. */
    defaultExpanded?: boolean;
    className?: string;
    'data-testid'?: string;
}

export declare type AgentRunDecision = 'approve' | 'reject';

/**
 * What the expanded card shows. Populated by realtime-modules' run hook from
 * the run's steps and the edit it applied — keep the field names.
 */
export declare interface AgentRunDetails {
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

/**
 * One edit the agent made, in the document-ops vocabulary the pipeline emits
 * (`setTitle`, `appendBlock`, `replaceBlock`, …). The card turns each into a
 * sentence; an op it does not know is shown by name.
 */
export declare interface AgentRunOp {
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

export declare type AgentRunPhase = 'received' | 'running' | 'awaiting_approval' | 'completed' | 'rejected' | 'failed';

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
} | null;

/**
 * What a finished run produced, when it produced something a reader can open:
 * a side panel (a search graph, a trace), the document it edited, or a link.
 * Read from the message's metadata (`result`) when the run is posted done, or
 * from the live status while the card is watching it.
 */
export declare type AgentRunResult = {
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

/** Reads a run result out of untrusted metadata; null for anything malformed. */
export declare function agentRunResultFromMetadata(value: unknown): AgentRunResult | null;

/** Who accepted or rejected the suggestions, and when. Mirrors realtime-modules' `PipelineRunStatus.review`. */
export declare interface AgentRunReview {
    decision: AgentRunReviewDecision;
    /** The reviewer's id. */
    by: string;
    byName?: string;
    /** ISO timestamp. */
    at: string;
}

/** What a reviewer does with an edit that landed as suggestions. */
export declare type AgentRunReviewDecision = 'accept' | 'reject';

export declare interface AgentRunStatus {
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

export declare interface AgentRunStep {
    id: string;
    label: string;
    status: AgentRunStepStatus;
}

/** One step of the run, for the expanded timeline. Mirrors realtime-modules' step status vocabulary — keep the names. */
export declare type AgentRunStepStatus = 'pending' | 'running' | 'completed' | 'failed' | 'skipped' | 'awaiting';

/**
 * The suggestions a finished edit left in the document, waiting for a
 * reviewer. Mirrors realtime-modules' `PipelineRunStatus.suggestion` — keep
 * the field names.
 */
export declare interface AgentRunSuggestion {
    /** The suggestion key the changes were tagged with; the review resolves everything under it. */
    key: string;
    documentId?: string;
    /** How many changes were suggested. */
    applied: number;
}

/** "started 21:44 · 80s" — whichever halves the timestamps allow. */
export declare function agentRunTimings(details: Pick<AgentRunDetails, 'startedAt' | 'completedAt'> | undefined): string | null;

export declare type AgentStatus = 'healthy' | 'degraded' | 'offline' | 'deploying';

/** `step.output` shape for an `agent` node. */
export declare interface AgentStepOutput {
    /** Final assistant text. */
    text: string;
    turns: number;
    toolCalls: AgentToolCall[];
    model: string;
    tokensIn: number;
    tokensOut: number;
    stopReason: AgentStopReason;
    /** True when the step ran with no tools allowed (see `allowedTools`). */
    toolless: boolean;
}

export declare type AgentStopReason = 'complete' | 'max_turns' | 'timeout' | 'error' | 'cancelled';

export declare function AgentTaskCard({ title, status, statusLabel, description, phase, percent, startedLabel, actions, className, 'data-testid': testId, }: AgentTaskCardProps): JSX.Element;

export declare interface AgentTaskCardProps {
    /** "Build risk outlook slide". */
    title: string;
    status: AgentTaskStatus;
    /** Overrides the status pill's word ("Editing slide 4" stays in `phase`). */
    statusLabel?: string;
    /** The request, or what the agent is working from. */
    description?: ReactNode;
    /** What it is doing now — "Editing slide 4". */
    phase?: string;
    /** A REAL percentage, 0–100. Omit when the run reports none: no bar is drawn. */
    percent?: number;
    /** "Started 2m ago" — the host formats it, since it owns the clock. */
    startedLabel?: string;
    /** Buttons under the card body — Open run, Pause, Stop. */
    actions?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

/** Where an agent task is. Shared by `TaskStrip` and `AgentTaskCard`. */
export declare type AgentTaskStatus = 'queued' | 'running' | 'paused' | 'awaiting' | 'done' | 'failed' | 'stopped';

/** One tool invocation inside an agent loop, as persisted on the step output. */
export declare interface AgentToolCall {
    name: string;
    input?: unknown;
    output?: unknown;
    ok: boolean;
    /** ISO timestamp. */
    startedAt: string;
    /** ISO timestamp; absent while the call is still in flight. */
    endedAt?: string;
    /** Present when `ok === false`. */
    error?: string;
}

export declare interface AgUiActivityDeltaEvent extends AgUiEventBase {
    type: 'ACTIVITY_DELTA';
    messageId: string;
    activityType: string;
    patch: JsonPatchOp[];
}

export declare interface AgUiActivitySnapshotEvent extends AgUiEventBase {
    type: 'ACTIVITY_SNAPSHOT';
    messageId: string;
    activityType: string;
    content: unknown;
    replace?: boolean;
}

export declare interface AgUiCustomEvent extends AgUiEventBase {
    type: 'CUSTOM';
    name: string;
    value: unknown;
}

export declare type AgUiEvent = AgUiRunStartedEvent | AgUiRunFinishedEvent | AgUiRunErrorEvent | AgUiStepStartedEvent | AgUiStepFinishedEvent | AgUiTextMessageStartEvent | AgUiTextMessageContentEvent | AgUiTextMessageEndEvent | AgUiTextMessageChunkEvent | AgUiToolCallStartEvent | AgUiToolCallArgsEvent | AgUiToolCallEndEvent | AgUiToolCallResultEvent | AgUiToolCallChunkEvent | AgUiStateSnapshotEvent | AgUiStateDeltaEvent | AgUiMessagesSnapshotEvent | AgUiActivitySnapshotEvent | AgUiActivityDeltaEvent | AgUiReasoningStartEvent | AgUiReasoningMessageStartEvent | AgUiReasoningMessageContentEvent | AgUiReasoningMessageEndEvent | AgUiReasoningMessageChunkEvent | AgUiReasoningEndEvent | AgUiReasoningEncryptedValueEvent | AgUiRawEvent | AgUiCustomEvent | AgUiMetaEvent;

declare interface AgUiEventBase {
    timestamp?: number;
    rawEvent?: unknown;
}

export declare type AgUiEventType = AgUiEvent['type'];

export declare interface AgUiMessage {
    id: string;
    role: AgUiRole;
    content: string;
    isStreaming: boolean;
    toolCalls: AgUiToolCall[];
    reasoning?: string;
}

export declare interface AgUiMessagesSnapshotEvent extends AgUiEventBase {
    type: 'MESSAGES_SNAPSHOT';
    messages: unknown[];
}

export declare interface AgUiMetaEvent extends AgUiEventBase {
    type: 'META_EVENT';
    metaType: string;
    payload: unknown;
}

export declare type AgUiOutputEventType = 'TEXT_MESSAGE_CONTENT' | 'STATE_DELTA' | 'CUSTOM';

export declare interface AgUiOutputNodeData {
    type: 'ag-ui-output';
    sourceField: string;
    eventType: AgUiOutputEventType;
    terminal: boolean;
    customEventName?: string;
}

export declare interface AgUiRawEvent extends AgUiEventBase {
    type: 'RAW';
    event: unknown;
    source?: string;
}

export declare interface AgUiReasoningEncryptedValueEvent extends AgUiEventBase {
    type: 'REASONING_ENCRYPTED_VALUE';
    subtype: 'message' | 'tool-call';
    entityId: string;
    encryptedValue: string;
}

export declare interface AgUiReasoningEndEvent extends AgUiEventBase {
    type: 'REASONING_END';
    messageId: string;
}

export declare interface AgUiReasoningMessageChunkEvent extends AgUiEventBase {
    type: 'REASONING_MESSAGE_CHUNK';
    messageId: string;
    delta?: string;
}

export declare interface AgUiReasoningMessageContentEvent extends AgUiEventBase {
    type: 'REASONING_MESSAGE_CONTENT';
    messageId: string;
    delta: string;
}

export declare interface AgUiReasoningMessageEndEvent extends AgUiEventBase {
    type: 'REASONING_MESSAGE_END';
    messageId: string;
}

export declare interface AgUiReasoningMessageStartEvent extends AgUiEventBase {
    type: 'REASONING_MESSAGE_START';
    messageId: string;
    role: 'reasoning';
}

export declare interface AgUiReasoningStartEvent extends AgUiEventBase {
    type: 'REASONING_START';
    messageId: string;
}

export declare type AgUiRole = 'developer' | 'system' | 'assistant' | 'user' | 'tool';

export declare interface AgUiRunErrorEvent extends AgUiEventBase {
    type: 'RUN_ERROR';
    message: string;
    code?: string;
}

export declare interface AgUiRunFinishedEvent extends AgUiEventBase {
    type: 'RUN_FINISHED';
    outcome?: {
        type: 'success';
    } | {
        type: 'interrupt';
        interrupts: unknown[];
    };
    result?: unknown;
}

export declare interface AgUiRunStartedEvent extends AgUiEventBase {
    type: 'RUN_STARTED';
    threadId: string;
    runId: string;
    parentRunId?: string;
    input?: unknown;
}

export declare interface AgUiSession {
    threadId: string;
    runId: string | null;
    messages: AgUiMessage[];
    state: unknown;
}

export declare interface AgUiStateDeltaEvent extends AgUiEventBase {
    type: 'STATE_DELTA';
    delta: JsonPatchOp[];
}

export declare interface AgUiStateSnapshotEvent extends AgUiEventBase {
    type: 'STATE_SNAPSHOT';
    snapshot: unknown;
}

export declare interface AgUiStepFinishedEvent extends AgUiEventBase {
    type: 'STEP_FINISHED';
    stepName: string;
}

export declare interface AgUiStepStartedEvent extends AgUiEventBase {
    type: 'STEP_STARTED';
    stepName: string;
}

export declare interface AgUiTextMessageChunkEvent extends AgUiEventBase {
    type: 'TEXT_MESSAGE_CHUNK';
    messageId?: string;
    role?: AgUiRole;
    delta?: string;
}

export declare interface AgUiTextMessageContentEvent extends AgUiEventBase {
    type: 'TEXT_MESSAGE_CONTENT';
    messageId: string;
    delta: string;
}

export declare interface AgUiTextMessageEndEvent extends AgUiEventBase {
    type: 'TEXT_MESSAGE_END';
    messageId: string;
}

export declare interface AgUiTextMessageStartEvent extends AgUiEventBase {
    type: 'TEXT_MESSAGE_START';
    messageId: string;
    role: AgUiRole;
}

export declare interface AgUiToolCall {
    id: string;
    name: string;
    args: string;
    result?: unknown;
    status: 'streaming' | 'completed' | 'error';
    startedAt: number;
    endedAt?: number;
    parentMessageId?: string;
}

export declare interface AgUiToolCallArgsEvent extends AgUiEventBase {
    type: 'TOOL_CALL_ARGS';
    toolCallId: string;
    delta: string;
}

export declare interface AgUiToolCallChunkEvent extends AgUiEventBase {
    type: 'TOOL_CALL_CHUNK';
    toolCallId?: string;
    toolCallName?: string;
    parentMessageId?: string;
    delta?: string;
}

export declare interface AgUiToolCallEndEvent extends AgUiEventBase {
    type: 'TOOL_CALL_END';
    toolCallId: string;
}

export declare interface AgUiToolCallResultEvent extends AgUiEventBase {
    type: 'TOOL_CALL_RESULT';
    messageId: string;
    toolCallId: string;
    content: unknown;
    role?: string;
}

export declare interface AgUiToolCallStartEvent extends AgUiEventBase {
    type: 'TOOL_CALL_START';
    toolCallId: string;
    toolCallName: string;
    parentMessageId?: string;
}

export declare const ALL_CONVERSATION_FEATURES: readonly ConversationFeature[];

export declare type AnyCallWidgetMode = CallWidgetMode | LegacyCallWidgetMode;

declare interface ApiCallState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    execute: (...args: unknown[]) => Promise<void>;
    retry: () => Promise<void>;
    reset: () => void;
}

export declare function ApiDegradedBanner({ health }: ApiDegradedBannerProps): JSX.Element | null;

declare interface ApiDegradedBannerProps {
    health: ApiHealthSnapshot;
}

export declare interface ApiHealthCheck {
    /** 'degraded': the check passed but reports reduced service (the pod stays up). */
    status: 'ok' | 'error' | 'degraded' | string;
    latencyMs?: number;
    error?: string;
    /** The check's own words, when it gave a string (`details` on the wire). */
    detail?: string;
}

export declare interface ApiHealthSnapshot {
    status: ApiHealthStatus;
    checks: Record<string, ApiHealthCheck>;
    /** Names of failing dependencies (status !== 'ok'). Empty when healthy or unknown. */
    failing: string[];
}

export declare type ApiHealthStatus = 'ok' | 'degraded' | 'unknown';

/**
 * Wraps the layout body in the pipelines event-stream + runs providers so
 * the cross-pipeline approvals page and the document-trigger hook can
 * share a single runs store for the whole app. Events are sourced from the
 * gateway WS bridge — there is no other producer.
 */
export declare function AppLayout(props: AppLayoutProps): JSX.Element;

declare interface AppLayoutProps {
    currentChannel: string;
    onSwitchChannel: (channel: string) => void;
    onDisconnect: () => void;
    onReconnect: () => void;
    activeReactions: EphemeralReaction[];
    logEntries: LogEntry[];
    errors: GatewayError[];
    lastError: GatewayError | null;
    activityEvents: ActivityEvent[];
    activityPublish: (eventType: string, detail: Record<string, unknown>) => void;
    activityIsLive: boolean;
    /**
     * Whether the left sidebar starts expanded. Optional and **initial-only**
     * — the layout still owns the state afterwards, so the collapse/expand
     * controls keep working. Omit it and the sidebar starts open, which is the
     * historical behaviour.
     *
     * It exists because the 56px `CollapsedIconStrip` was previously reachable
     * only by clicking the sidebar's collapse control: a host cannot restore
     * the user's saved preference on mount, and a test has to click before it
     * can assert on the collapsed chrome.
     */
    defaultSidebarOpen?: boolean;
    /**
     * Full identity value. Wins over this library's `useIdentityContext()`,
     * so a host running its own identity provider never needs to mount this
     * library's `<IdentityProvider>` just for `AppLayout`. Defaults to the
     * context's value (or field-by-field fallbacks — `''`/`null`/a no-op
     * `onSignOut` — when no `<IdentityProvider>` is mounted and this prop is
     * also omitted) via the non-throwing `useOptionalIdentityContext`.
     */
    identity?: IdentityContextValue;
    /**
     * Presence-sourced users. Wins over this library's `usePresenceContext()`,
     * for the same reason as `identity` above. Defaults to the context's
     * `presenceUsers` (or `[]` when no `<PresenceProvider>` is mounted).
     */
    presenceUsers?: PresenceUser_2[];
}

export declare function ApplicationFormPage({ application, isEdit, pools, onSubmit, onCancel, error, }: ApplicationFormPageProps): JSX.Element;

export declare interface ApplicationFormPageProps {
    application?: {
        clientId?: string;
        clientName: string;
        poolId: string;
        redirectUris: string[];
        postLogoutRedirectUris?: string[];
        grantTypes: string[];
        responseTypes?: string[];
        scope?: string;
    };
    isEdit: boolean;
    pools: Array<{
        poolId: string;
        poolName: string;
    }>;
    onSubmit: (data: {
        clientName: string;
        poolId: string;
        redirectUris: string[];
        postLogoutRedirectUris: string[];
        grantTypes: string[];
        responseTypes: string[];
        scope: string;
    }) => Promise<void>;
    onCancel: () => void;
    error?: string | null;
}

export declare function ApplicationListPage({ applications, onCreateApp, onCreateAppWithPool, onEditApp, onDeleteApp, loading, }: ApplicationListPageProps): JSX.Element;

export declare interface ApplicationListPageProps {
    applications: Array<{
        clientId: string;
        clientName: string;
        poolId: string;
        poolName?: string;
        redirectUris: string[];
    }>;
    onCreateApp: () => void;
    onCreateAppWithPool: () => void;
    onEditApp: (clientId: string) => void;
    onDeleteApp: (clientId: string) => Promise<void>;
    loading?: boolean;
}

export declare function ApplicationPoolFormPage({ onSubmit, onCancel, error }: ApplicationPoolFormPageProps): JSX.Element;

export declare interface ApplicationPoolFormPageProps {
    onSubmit: (data: {
        clientName: string;
        poolName: string;
        redirectUris: string[];
        grantTypes?: string[];
    }) => Promise<void>;
    onCancel: () => void;
    error?: string | null;
}

/**
 * Apply a paused-context patch. Resolves the executor's `PatchResult` on a
 * 200. Throws `PatchValidationRejectedError` on a 422 (carrying the executor
 * rejection reason). Throws `PatchHttpError` on any other non-2xx.
 */
export declare function applyPatch(pipelineId: string, runId: string, stepId: string, patch: ContextPatch, appliedBy?: string): Promise<PatchResult>;

/** A string, or a getter for a host that resolves its base URL lazily. */
export declare type ApprovalApiBase = string | (() => string);

export declare type ApprovalDecision = typeof TERMINAL_DECISIONS[TerminalRendererStatus];

export declare interface ApprovalNodeData {
    type: 'approval';
    approvers: Approver[];
    /** n-of-m — how many approvals required to pass. */
    requiredCount: number;
    timeoutMs?: number;
    timeoutAction?: ApprovalTimeoutAction;
    /** Message shown to the approver. */
    message?: string;
}

export declare interface ApprovalRecord {
    userId: string;
    decision: 'approve' | 'reject';
    comment?: string;
    at: string;
}

export declare type ApprovalTimeoutAction = 'reject' | 'approve' | 'escalate';

export declare interface Approver {
    type: 'user' | 'role';
    value: string;
}

/**
 * AppShell wraps its children in a ToastProvider by default.
 * Pass `toastRegion={null}` to opt out (e.g. parent already has one).
 */
export declare function AppShell({ sidebar, header, subheader, children, toastRegion, loading, apiDegraded, commandPalette, className, sidebarWidth, headerHeight, subheaderHeight, subheaderInset, contentPadding, sidebarClassName, sidebarLabel, sidebarTestId, subheaderTestId, sidebarFullHeight, }: AppShellProps): JSX.Element;

export declare interface AppShellProps {
    /** Slot: full-height left sidebar (CollapsibleSidebar etc.) */
    sidebar?: ReactNode;
    /**
     * Slot: the header row's content. The shell draws the row itself — a
     * flex row of `headerHeight`, padded, bordered, sticky — so its height is
     * pinned rather than derived from the tallest control in it. Every offset
     * below (the sidebar's top, the body's minimum height) reads that one
     * number, so a taller control can never move the anchors.
     */
    header: ReactNode;
    /**
     * Slot: a second row of chrome under the header — a section band. Sticky
     * with the header, full window width, and the sidebar hangs beneath both.
     * Rendered only when present; its height counts only then.
     */
    subheader?: ReactNode;
    /** Page content */
    children: ReactNode;
    /** Slot: override default ToastProvider region (pass null to suppress) */
    toastRegion?: ReactNode | null;
    /** When truthy, renders a full-screen loading overlay */
    loading?: boolean | ReactNode;
    /** When truthy, renders an API-degraded banner below the header */
    apiDegraded?: ReactNode;
    /**
     * Slot: a global command palette (e.g. `<CommandPalette />`). Rendered
     * once at the shell level so any page can open it via `useCommandPalette`.
     * Wrap the AppShell in `<CommandPaletteProvider>` so the palette and the
     * pages inside share the same registry.
     */
    commandPalette?: ReactNode;
    className?: string;
    /** Width of the sidebar slot in px (default 260) */
    sidebarWidth?: number;
    /** The header row's height in px (default 53). Also published as `--app-shell-header-h`. */
    headerHeight?: number;
    /** The subheader row's height in px (default 36), counted only when `subheader` is present. */
    subheaderHeight?: number;
    /**
     * Left inset of the subheader's content in px, so its tabs can share a
     * left edge with the header's own nav rather than with whatever the
     * sidebar's width happens to be. Default: the header's padding.
     */
    subheaderInset?: number;
    /** Padding around the routed page. `none` for a full-bleed surface. Default `md`. */
    contentPadding?: 'none' | 'md';
    /** Classes for the sidebar column — its padding when open vs folded, say. */
    sidebarClassName?: string;
    /** Accessible name of the sidebar landmark. Default "App sidebar". */
    sidebarLabel?: string;
    sidebarTestId?: string;
    subheaderTestId?: string;
    /**
     * The sidebar runs the full window height and the header row starts beside
     * it (2.386.0) — the collapsed icon strip's layout, where the strip's first
     * button sits in the header row. Default false: the header spans the window
     * and the sidebar hangs below the chrome.
     */
    sidebarFullHeight?: boolean;
}

/** An arrow pointing right: "go on" — a link action, "Prepare run →". Since 2.385.0. */
export declare function ArrowRightIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** An arrow pointing up: "send" on a round prompt button. Since 2.390.0. */
export declare function ArrowUpIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function ArtifactTile({ name, type, url }: {
    name: string;
    type?: string;
    url?: string | null;
}): JSX.Element;

declare type AssertTrue<T extends true> = T;

/** An @ sign: mentions, "someone named you". */
export declare function AtIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function AttachmentBubble({ attachment, src, onOpen, className }: AttachmentBubbleProps): JSX.Element;

export declare interface AttachmentBubbleProps {
    attachment: ChatAttachment;
    /**
     * Resolved, directly-renderable source for an image (typically an object
     * URL produced by an authenticated fetch). Falls back to `attachment.preview`
     * so the recipient sees the placeholder rather than a broken image while
     * the full-size fetch is in flight.
     *
     * `undefined` means "not resolved yet"; **`null` means it will not resolve**
     * — the fetch failed, the row is gone, the viewer is not permitted. The two
     * cannot be collapsed: with only `undefined` to work with, a picture that
     * can never arrive says "Loading image…" for as long as the thread stays
     * open, which is a promise the component has no way to keep.
     */
    src?: string | null;
    /** Invoked when the viewer activates the attachment (open / download). */
    onOpen?: (attachment: ChatAttachment) => void;
    className?: string;
}

export declare function AttachToggle({ attached, onToggle, labels, size, tabIndex, className, 'aria-label': ariaLabel, 'data-testid': testId, }: AttachToggleProps): JSX.Element;

export declare interface AttachToggleProps {
    attached: boolean;
    onToggle: () => void;
    labels?: {
        add: string;
        added: string;
    };
    size?: 'sm' | 'md';
    /** Names the thing, e.g. "Add Release plan to the prompt". */
    'aria-label'?: string;
    /** -1 inside a roving list, where only the current row's controls are tab stops. */
    tabIndex?: number;
    className?: string;
    'data-testid'?: string;
}

export declare function AudioPlayer({ src, autoPlay, onFirstPlay, onEnded, durationHint, size, className, 'data-testid': testId }: AudioPlayerProps): JSX.Element;

export declare interface AudioPlayerProps {
    src: string;
    autoPlay?: boolean;
    /** Fires once, the first time playback starts — "mark as listened". */
    onFirstPlay?: () => void;
    onEnded?: () => void;
    /** Length to show before metadata arrives, in seconds. */
    durationHint?: number;
    /** `sm` fits a table row. */
    size?: 'sm' | 'md';
    className?: string;
    'data-testid'?: string;
}

export declare interface AudioRecorder {
    state: AudioRecorderState;
    /** Wall time recorded so far (live while recording, final once recorded). */
    elapsedMs: number;
    blob: Blob | null;
    /** Object URL for `blob`, for a preview player. Revoked on reset/unmount. */
    url: string | null;
    mimeType: string | null;
    error: string | null;
    start: () => Promise<void>;
    stop: () => void;
    reset: () => void;
}

export declare type AudioRecorderState = 'idle' | 'starting' | 'recording' | 'recorded' | 'error';

export declare interface AuditActor {
    type: 'admin' | 'user' | 'system';
    email?: string;
    userId?: string;
    reason?: string;
}

export declare interface AuditFilters {
    /** ISO 8601 lower bound on `timestamp`. */
    since?: string;
    /** ISO 8601 upper bound on `timestamp`. */
    until?: string;
    /** Action types to keep — comma-joined for the query string. */
    actions?: string[];
    /** Page size (1..1000). Server defaults to 100. */
    limit?: number;
    /** Opaque pagination token from a previous response. */
    cursor?: string;
}

export declare interface AuditPage {
    items: AuditRow[];
    nextCursor?: string;
}

export declare interface AuditPageProps {
    records: Array<{
        timestamp: number;
        actor: {
            id?: string;
            email?: string;
        } | string;
        entityType: string;
        entityId: string;
        operation: string;
    }>;
    onQuery: (params: {
        entityType?: string;
        entityId?: string;
        fromTime?: number;
        toTime?: number;
        limit?: number;
    }) => Promise<void>;
    onViewEntity: (entityType: string, entityId: string) => void;
    onReplay: (entityId: string, atTime: number) => Promise<Record<string, unknown> | null>;
    loading?: boolean;
    totalRecords?: number;
}

export declare interface AuditQueryParams {
    entityType?: string;
    entityId?: string;
    fromTime?: number;
    toTime?: number;
    limit?: number;
    cursor?: string;
}

export declare interface AuditRecord {
    timestamp: number;
    actor: AuditActor;
    entityType: string;
    entityId: string;
    operation: string;
    before?: Record<string, unknown>;
    after?: Record<string, unknown>;
}

/**
 * Mirrors `StoredAuditEvent` from social-api/src/pipeline/audit-repository.ts.
 * Re-declared here as a plain TS interface (per project conventions — no
 * runtime schema lib) so the frontend doesn't pull a backend module across
 * the Vite/TSX boundary.
 */
export declare interface AuditRow {
    auditId: string;
    timestamp: string;
    action: string;
    actorUserId: string;
    pipelineId: string;
    runId?: string;
    decision?: 'approved' | 'rejected' | 'cancelled' | 'failed' | 'completed' | 'success' | 'error';
    outcome?: 'success' | 'error' | 'rejected';
    details?: Record<string, unknown>;
    before?: Record<string, unknown>;
    after?: Record<string, unknown>;
    trace?: Record<string, unknown>;
    ttlEpoch?: number;
}

/**
 * Identity attached to every request handled by the pipeline router. The
 * host (platform-api today, distributed-core later) populates this from its
 * own auth middleware and injects a getter into the router factory; the
 * route handlers themselves never speak to Cognito / IAM / etc.
 *
 * `userId` is a stable opaque identifier — no assumption about format.
 * `scopes` is an optional capability list; routes that need fine-grained
 * authorization should check membership rather than guess from `userId`.
 */
export declare interface AuthContext {
    userId: string;
    scopes?: readonly string[];
}

export declare function AuthedAudio({ src, getAuthToken, onFirstPlay, eager, className, 'data-testid': testId }: AuthedAudioProps): JSX.Element;

export declare interface AuthedAudioProps {
    src: string;
    getAuthToken: () => string | null | Promise<string | null>;
    /** Fires once, when playback first starts — "mark as listened". */
    onFirstPlay?: () => void;
    /** Fetch immediately rather than on the Play click. */
    eager?: boolean;
    className?: string;
    'data-testid'?: string;
}

/**
 * Authoring bounding-box painted by the user in BBoxAuthoringCanvas.
 * These are forwarded to the vision call as a system-prompt hint.
 */
export declare interface AuthoringBBox {
    /** Stable client-side id (uuid). */
    id: string;
    /** Pixel x of the box origin (post-resize). */
    x: number;
    /** Pixel y of the box origin (post-resize). */
    y: number;
    width: number;
    height: number;
    /** Free-form label entered by the author. */
    label?: string;
}

declare interface AuthState {
    status: 'loading' | 'unauthenticated' | 'authenticated';
    idToken: string | null;
    email: string | null;
    error: string | null;
}

export declare function AutoplayGate({ chipLabel, chipClassName, wrapperClassName, onPlayStateChange, ...streamProps }: AutoplayGateProps): JSX.Element;

export declare interface AutoplayGateProps extends StreamVideoProps {
    /** Chip label. Default: "Tap to unmute". */
    chipLabel?: string;
    /** Override the chip's Tailwind classes. */
    chipClassName?: string;
    /** Wrapper class for the relatively-positioned container. */
    wrapperClassName?: string;
}

export declare function Avatar({ name, size, initials: initialsProp, color, src, icon, glyph, foreground, tone, autoContrast, className, style, title, showTitle, }: AvatarProps): JSX.Element;

export declare function AvatarGroup({ names, items, maxVisible, size, className, total, }: AvatarGroupProps): JSX.Element;

/** One person in an AvatarGroup, when a bare name isn't enough. */
export declare interface AvatarGroupItem {
    name: string;
    initials?: string;
    color?: string;
    src?: string;
}

export declare interface AvatarGroupProps {
    /** Convenience form — colors and initials are derived from the name. */
    names?: string[];
    /**
     * Richer form, for callers that already know each person's brand color,
     * canonical initials, or photo. Takes precedence over `names`. Without this,
     * callers with per-user colors had to hand-roll the whole stack.
     */
    items?: AvatarGroupItem[];
    maxVisible?: number;
    size?: number;
    className?: string;
    /**
     * Total people, when it exceeds what was passed in. Lets a caller render
     * "+3" without materialising three more entries.
     */
    total?: number;
}

export declare interface AvatarProps {
    name: string;
    size?: number;
    /**
     * Override the derived initials. Use when the caller already has canonical
     * initials (e.g. from a presence payload) and shouldn't re-derive them from
     * a display name — deriving would turn "AS" into "As".
     */
    initials?: string;
    /** Override the auto-computed color. */
    color?: string;
    /** Optional profile image URL. Falls back to initials if absent or load fails. */
    src?: string;
    /**
     * An arbitrary node in the circle instead of initials — an icon, usually.
     *
     * Exists because not every avatar-shaped thing is a person. A channel row
     * wants a `#` in the same coloured circle at the same size with the same
     * overlap rules, and without this the only way to get one was a hand-rolled
     * `<span className="rounded-full …">` beside a real `Avatar`, which is two
     * components to keep in step and one of them outside the design system.
     *
     * Wins over `src` only when there is no image to show; loses to a loaded
     * image, because a photo is more specific than a glyph.
     */
    icon?: ReactNode;
    /**
     * A single character or emoji in the circle — `#` for a channel, `🔒` for a
     * private one. The string form of `icon`, sized a little larger than initials
     * because one character at initials size reads as a speck.
     */
    glyph?: string;
    /**
     * Explicit text colour for the initials/glyph. Overrides everything else.
     *
     * The default is white, which is right for the saturated palette above and
     * wrong for a pale fill — a task row's assignee badge is dark indigo on a
     * light indigo tint, and white on that fails contrast, which is exactly why
     * such badges were being hand-rolled as bare `<span>`s beside real Avatars.
     */
    foreground?: string;
    /**
     * Paint the circle in a semantic tone's soft surface (`-bg` background,
     * `-fg` text) instead of a derived or caller-supplied colour. Wins over
     * `color` / `foreground` / `autoContrast`, because a tone already declares
     * both halves of the pair.
     */
    tone?: ToneOrAlias;
    /**
     * Pick the foreground from the resolved background's luminance rather than
     * always using white. Opt-in, not the default: flipping existing avatars to
     * dark text on the lighter half of the palette would change every presence
     * row in every consumer at once.
     */
    autoContrast?: boolean;
    className?: string;
    style?: CSSProperties;
    /**
     * Tooltip text. Defaults to `name`. Pass `null` (or `showTitle={false}`) to
     * render no `title` at all — a wrapping button or link with its own `title`
     * otherwise gets two tooltips fighting, and `title=""` is not the same thing
     * as no attribute.
     */
    title?: string | null;
    /** `false` suppresses the `title` attribute entirely. See `title`. */
    showTitle?: boolean;
}

declare interface AwarenessFields {
    userId: string;
    displayName: string;
    color: string;
    mode: string;
    currentSectionId: string | null;
    lastSeen: number;
    idle: boolean;
    /** Tiptap cursor display name (may differ from displayName in edge cases). */
    name?: string;
}

declare interface AwarenessUpdaters {
    updateSection: (sectionId: string | null) => void;
    updateMode: (mode: string) => void;
    updateIdle: (idle: boolean) => void;
    /** Merge Tiptap-specific cursor info (name, color) without clobbering other fields. */
    updateCursorInfo: (name: string, color: string) => void;
}

/** What a console surface paints behind itself. `none` keeps the ordinary surface. */
export declare type BackdropTone = 'auto' | 'night' | 'graphite' | 'none';

export declare function Badge({ variant, value, color, 'aria-label': ariaLabel, className, 'data-testid': testId, }: BadgeProps): JSX.Element;

export declare type BadgeColor = 'accent' | 'success' | 'danger' | 'muted';

export declare interface BadgeProps {
    variant: BadgeVariant;
    /** Required for variant="count". Ignored otherwise. */
    value?: number;
    color?: BadgeColor;
    /** Optional override label for screen readers. */
    'aria-label'?: string;
    className?: string;
    /** Optional testid. */
    'data-testid'?: string;
}

export declare type BadgeVariant = 'count' | 'dot' | 'pulse';

export declare function Banner({ variant, title, layout, icon, onDismiss, action, accent, meta, size, children, className, style, 'data-testid': testId, }: BannerProps): JSX.Element;

export declare interface BannerProps {
    variant?: BannerVariant;
    /** Bold prefix label shown before children. */
    title?: string;
    /**
     * How the title sits against the body.
     *
     * `inline` (default) is right across a page: a short title and a short
     * message read as one line. It is wrong in a narrow column — in a 280px
     * comment gutter the two children split the width and the body was left
     * with 68px, about six characters per line, wrapping into a ragged tower.
     * `stacked` puts the title above the body and gives each the full width.
     *
     * `callout` (since 2.389.0) is a full-width notice in a document body:
     * icon · title over body · trailing action, all vertically centred. The
     * surface is the tone's pale `--color-{tone}-callout` fill and
     * `-callout-border` (since 2.389.4; the soft `-bg` before), the title reads in
     * primary ink and the body in secondary ink so a paragraph of advice stays
     * legible — only the icon carries the tone colour.
     */
    layout?: 'inline' | 'stacked' | 'callout';
    /**
     * A leading glyph. `true` draws the tone's default (a warning triangle for
     * `warning`/`error`, an info circle for `info`, a check for `success`); a
     * node is drawn as given. Omitted (default) draws none — existing banners
     * are unchanged. Since 2.389.0.
     */
    icon?: ReactNode | true;
    onDismiss?: () => void;
    /**
     * A control that resolves what the banner is about — "Convert to page" on a
     * deprecation notice, "Retry" on a failure. Sits at the trailing edge,
     * before the dismiss button, and never shrinks under a long message.
     */
    action?: ReactNode;
    /**
     * `callout` only: a 3px solid tone bar down the left edge — the notice
     * reads as a pull-quote in a document body ("What needs attention").
     * Default `none`. Since 2.390.0.
     */
    accent?: 'none' | 'bar';
    /**
     * `callout` only: a third line under the body — facts about the thing the
     * notice is about ("Blocked · Eli Garcia · 2 points"), already worded and
     * toned by the host. Since 2.390.0.
     */
    meta?: ReactNode;
    /**
     * `callout` only: `md` (default) is the 14px title over a 13px body; `lg`
     * is a 17px title over a 15px body with roomier padding — a callout that is
     * a section's content, not a note beside it — and its `action` sits level
     * with the title rather than centred on the block. Since 2.390.0.
     */
    size?: 'md' | 'lg';
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}

export declare type BannerVariant = 'error' | 'warning' | 'info' | 'success';

export declare function BarChart({ data, height, xKey, yKey, color, yFormat, variant, showValues, }: {
    data: BarChartDatum[];
    /** Defaults to 180 for `'default'`, 80 for `'compact'`. */
    height?: number;
    xKey: string;
    yKey: string;
    /** Fallback fill for a bar with no per-row `tone` (compact) or the single
     *  series fill (default). Default: `var(--color-primary)`. */
    color?: string;
    yFormat?: (v: number) => string;
    /**
     * `'compact'` drops the grid, axes and legend and paints each bar from its
     * own `tone` (see `BarChartDatum`) — a metrics tile's small multi-category
     * bar (token in/out, run status counts), not a full chart card. Default:
     * unchanged — grid + axes + legend, single `color` fill.
     */
    variant?: 'default' | 'compact';
    /** `'compact'` only: print each bar's value above it (through `yFormat`
     *  when given). Default: off. */
    showValues?: boolean;
}): JSX.Element;

export declare interface BarChartDatum extends Record<string, unknown> {
    /**
     * `variant="compact"` only: paints this bar with the tone's solid fill
     * from the shared Tone scale (`../shared/tones`), overriding `color` for
     * this one bar. A row with no `tone` falls back to `color` / primary, same
     * as the default variant.
     */
    tone?: Tone;
}

export declare interface BBox {
    x: number;
    y: number;
    width: number;
    height: number;
}

/** A bell with a slash through it: "notify me quietly". */
export declare function BellMutedIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function BoardColumn({ label, count, children, emptyLabel, action, className, 'data-testid': testId, }: BoardColumnProps): JSX.Element;

export declare interface BoardColumnProps {
    /** The lane's name — "In progress", "Blocked". */
    label: ReactNode;
    /**
     * Count shown at the end of the header. Pass it explicitly rather than
     * counting children: a lane that paginates or virtualises still knows its
     * real total.
     */
    count?: number;
    /** Cards in the lane. When absent, `emptyLabel` is shown instead. */
    children?: ReactNode;
    /** Shown when the lane holds nothing. Default "Nothing here". */
    emptyLabel?: string;
    /** Right-aligned control in the header, e.g. a per-lane "add" button. */
    action?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

export declare function BooleanEditorRenderer(props: SectionRendererProps): JSX.Element;

export declare const booleanFieldType: FieldTypeDefinition;

export declare function BooleanReaderRenderer({ section, fragment }: SectionRendererProps): JSX.Element;

export declare const borderRadius: {
    readonly sm: string;
    readonly md: string;
    readonly lg: string;
    readonly xl: string;
    readonly full: string;
};

/** A trunk with a branch leaving it: a flow that splits — a pipeline, a branch. */
export declare function BranchIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare interface BreadcrumbItem {
    label: string;
    href?: string;
    onClick?: (e: React.MouseEvent) => void;
}

export declare type BreadcrumbOverflow = 'ellipsis' | 'menu';

export declare function Breadcrumbs({ items, separator, maxItems, overflow, minItems, lastIsCurrent, className, 'data-testid': testId, }: BreadcrumbsProps): JSX.Element | null;

export declare interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    /** Custom separator rendered between items (default: "/") */
    separator?: ReactNode;
    /**
     * When set, truncate the middle of the list to fit this many visible items.
     * The first and last are always shown; middle items collapse per `overflow`.
     */
    maxItems?: number;
    /**
     * How the collapsed middle behaves. `ellipsis` (default) is inert text;
     * `menu` opens the hidden crumbs as a list of real links.
     */
    overflow?: BreadcrumbOverflow;
    /**
     * Render nothing below this many crumbs. A two-level trail usually repeats
     * what the nav rail already highlights, so shells that show breadcrumbs on
     * every route can set `minItems={3}` and let shallow pages keep the row.
     */
    minItems?: number;
    /**
     * `true` (default): the last crumb is the page you are on — primary ink,
     * `aria-current="page"`, not a link. `false`: every crumb is a place to go,
     * for a PATH that ends at the folder a file lives in, not at the file.
     * Since 2.385.0.
     */
    lastIsCurrent?: boolean;
    className?: string;
    'data-testid'?: string;
}

/** Three dotted lines: "bulleted list". Since 2.386.5. */
export declare function BulletListIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function Button({ variant, size, tone, disabled, fullWidth, children, type, className, ref, ...rest }: ButtonProps): JSX.Element;

export declare interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    /**
     * The underlying `<button>`.
     *
     * Same shape and same reason as `StackProps.ref` (2.233.0): a plain prop, not
     * `forwardRef`, because React 19 — our only supported peer — passes `ref`
     * through as an ordinary prop.
     *
     * A menu trigger has to be re-focusable when its panel closes, and a consumer
     * with no way to hold that node keeps a raw `<button>` instead of using this
     * component. That is exactly what the aws-agentcore portal's masquerade menu
     * did.
     */
    ref?: Ref<HTMLButtonElement>;
    /**
     * `'success'` paints with the success tokens — a confirm/apply action next
     * to a `danger` one (`danger` already lives here as a variant, not a
     * `tone` value, for the same reason: `tone` is spoken for below).
     *
     * `'info'` paints solid with the info tokens — same shape as
     * `danger-solid`, not `success`'s soft/bordered fill — for a primary-ish
     * action that isn't the page's main call to action (e.g. a secondary
     * "Learn more" next to a solid `primary` "Continue").
     *
     * `'link'` drops the border, background and fixed padding entirely and
     * renders as inline text that underlines on hover, inheriting the
     * surrounding font size — for a Cancel/Change action sitting next to
     * prose or another control, not a boxed button.
     */
    variant?: ButtonVariant;
    size?: ButtonSize;
    /**
     * Colour family. `surface` (default) follows the host theme; `code` paints
     * in the permanently-dark terminal palette. Every bare `<button>` in a
     * terminal or log surface is there because this prop did not exist.
     *
     * Semantic colour (success/danger/…) is a `variant` value, not a `tone`
     * value — `tone` already names the surface-vs-code family axis, and
     * reusing it for semantics would make `tone="success"` and `tone="code"`
     * look like the same kind of choice when they answer different questions.
     */
    tone?: ButtonTone;
    fullWidth?: boolean;
    children: ReactNode;
}

export declare type ButtonSize = 'sm' | 'md' | 'lg';

/** @see SurfaceTone — which colour family the button paints in. */
export declare type ButtonTone = SurfaceTone;

export declare type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'danger-solid' | 'success' | 'info' | 'link';

/** Card width with the dock closed. */
export declare const CALL_CARD_WIDTH = "w-[380px]";

/**
 * dataTransfer key the widget stamps on a dock drag.
 *
 * A custom type rather than `text/plain` on purpose, in both directions: an
 * ordinary text drop target (a comment box, a rich-text editor) must not
 * mistake a dragged call for pasted text, and a dock slot must be able to
 * accept-or-reject during `dragover` — where the only thing a browser
 * exposes is `dataTransfer.types`, never the payload itself.
 */
export declare const CALL_DOCK_DRAG_TYPE = "application/x-call-dock";

/** The single height both columns take when the dock is open. */
export declare const CALL_DOCK_ROW_HEIGHT = "h-[480px]";

/** Video-column width with the dock open — it GROWS, it is not pinned. */
export declare const CALL_STAGE_DOCKED_WIDTH = "w-[480px]";

export declare function CallActivityCard({ callId, startedBy, participants, live, durationMs, audioOnly, recorded, notRecordedReason, lobbyName, onJoin, className, 'data-testid': testId, }: CallActivityCardProps): JSX.Element;

export declare interface CallActivityCardProps {
    callId: string;
    /** Who started it — a display name, never a raw userId. */
    startedBy?: string;
    /**
     * People in the call. While live these are the people to join; once ended
     * they are who was there.
     */
    participants?: readonly CallActivityParticipant[];
    /**
     * Whether the call is still going. This is the card's whole state machine:
     * live offers a way in, ended is a record.
     */
    live?: boolean;
    /** Wall-clock length in ms. Rendered only once the call has ended. */
    durationMs?: number;
    /**
     * True when the call had no camera, false when it had one — and UNDEFINED
     * when nobody knows.
     *
     * The third state is load-bearing. The invite frame does not carry this, so
     * a server-written record genuinely cannot tell, and defaulting to either
     * one puts a confident "Video call" on a call that may have been audio. An
     * unqualified "Call" is the true statement.
     */
    audioOnly?: boolean;
    /**
     * Whether the call was recorded — and UNDEFINED when the record does not
     * say, in which case the card says nothing about it. Only `false` produces
     * a note: a recording that exists announces itself in the thread as its own
     * card, so "Recorded" here would say it twice.
     */
    recorded?: boolean;
    /**
     * Why it was not recorded, as the platform-api decision code:
     * `room-setting-off`, `dm-not-opted-in:<userIds>`, … See
     * `describeNotRecorded` for the words each one becomes.
     */
    notRecordedReason?: string;
    /** The call's lobby (`room:design`, `dm:a:b`) — names the room in the note. */
    lobbyName?: string;
    /**
     * Joins the call. Ignored once `live` is false — a call that ended has
     * nothing to join, and the button would be a dead control. Omit it when the
     * viewer may not join, rather than rendering it disabled.
     */
    onJoin?: (callId: string) => void;
    className?: string;
    'data-testid'?: string;
}

export declare interface CallActivityParticipant {
    userId: string;
    displayName?: string;
    avatarUrl?: string;
}

export declare function CallControls({ mode, density, isMuted, isCameraOn, isScreenSharing, onToggleMute, onToggleCamera, onToggleScreenShare, onUpgradeToVideo, onEndCall, onAddParticipant, availableParticipants, currentParticipantIds, onOpenAddParticipant, extras, className, }: CallControlsProps): JSX.Element;

/**
 * How much of the control set the surface has room for.
 *
 *   'full'     every wired control sits in the row (default — unchanged).
 *   'compact'  only the controls needed to STAY in the call stay in the
 *              row (mute, camera, end) plus the caller's `extras`; the
 *              rest move into the "More" menu.
 *
 * A 320px widget docked beside a document was rendering the same nine-icon
 * row as a fullscreen stage, which is what made it read as "duplicated and
 * way off". Compact thins the row without REMOVING anything: a control the
 * caller wired but the user cannot reach is a regression, not a
 * simplification, so everything demoted is still one click away.
 */
export declare type CallControlsDensity = 'full' | 'compact';

export declare type CallControlsMode = 'audio' | 'video';

export declare interface CallControlsProps {
    mode: CallControlsMode;
    /** Row density. Defaults to 'full' — see {@link CallControlsDensity}. */
    density?: CallControlsDensity;
    isMuted?: boolean;
    isCameraOn?: boolean;
    isScreenSharing?: boolean;
    onToggleMute?: () => void;
    onToggleCamera?: () => void;
    onToggleScreenShare?: () => void;
    onUpgradeToVideo?: () => void;
    onEndCall?: () => void;
    /** When provided, shows the "add participant" button + picker popover. */
    onAddParticipant?: (participantId: string) => void;
    /**
     * People who can still be added. Participants already in the call
     * should be filtered out by the caller — or pass `currentParticipantIds`
     * and let CallControls dedupe.
     */
    availableParticipants?: CallStripParticipant[];
    /** Optional explicit set of ids already in the call to dedupe against. */
    currentParticipantIds?: ReadonlyArray<string>;
    /** Consumer-owned "add people" flow. When set, the add-participant
     *  button calls this instead of toggling the built-in inline picker —
     *  for hosts that already have their own invite surface (a modal over
     *  the presence roster, say) and just want the button in the row,
     *  looking like every other control. */
    onOpenAddParticipant?: () => void;
    /** Slot rendered IN the control row, between add-participant and the
     *  End button — camera effects, captions, raise-hand. Same contract
     *  as MediaControlsBar's `extras`: extra controls belong in the row,
     *  not floating in their own strip above it. */
    extras?: ReactNode;
    className?: string;
}

/** JSON written under {@link CALL_DOCK_DRAG_TYPE}. */
export declare interface CallDockDragPayload {
    /** The call being moved, when the host stamped `data-call-id` via `dataAttrs`. */
    callId?: string;
    /** Slot the widget is leaving, or null when it was floating free. */
    fromDockId: string | null;
}

/** A place in the page that can hold the call. */
export declare interface CallDockTarget {
    id: string;
    label: string;
}

export declare function CallingStatusPill({ show, label }: CallingStatusPillProps): JSX.Element | null;

export declare interface CallingStatusPillProps {
    /** Show/hide gate — the parent decides ringing semantics. */
    show: boolean;
    /** Label for the callee(s). E.g. "Alice", "Alice & Bob", "3 people". */
    label: string;
}

export declare function CallInterruptedNotice({ show, title, description, actions, className, 'data-testid': testId, }: CallInterruptedNoticeProps): JSX.Element | null;

export declare interface CallInterruptedNoticeProps {
    show: boolean;
    /** Names the moment in two or three words, e.g. "Call disconnected". */
    title: ReactNode;
    /** One line: what happened, and what the actions below will do about it. */
    description: ReactNode;
    /** The buttons. Rendered in a centred row under the description. */
    actions?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

export declare type CallMode = 'audio' | 'video';

export declare function CallNoticePill({ show, tone, message, actions, className, 'data-testid': testId }: CallNoticePillProps): JSX.Element | null;

export declare interface CallNoticePillProps {
    show: boolean;
    tone?: 'warning' | 'error' | 'info';
    /** The one sentence. */
    message: ReactNode;
    /** Small buttons, rendered inline after the message. */
    actions?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

export declare function CallParticipantStrip({ participants, localFallback, maxVisible, avatarSize, testId, className, style, }: CallParticipantStripProps): JSX.Element;

export declare interface CallParticipantStripProps {
    /** Participants in the call. */
    participants: CallStripParticipant[];
    /**
     * Optional fallback shown when `participants` is empty (e.g. the local
     * user before any remote joins). Rendered as a single Avatar tile.
     */
    localFallback?: CallStripParticipant;
    /** Max avatars to render inline before collapsing into a `+N` indicator. */
    maxVisible?: number;
    /** Avatar diameter in px. Defaults to 36. */
    avatarSize?: number;
    /** Stable data-testid (e2e hook). Defaults to `call-participant-strip`. */
    testId?: string;
    className?: string;
    style?: CSSProperties;
}

export declare function CallPresenceIndicator({ participants, count, onClick, label, maxVisible, }: CallPresenceIndicatorProps): JSX.Element | null;

export declare interface CallPresenceIndicatorProps {
    /** People currently on the call. Names must be pre-resolved. */
    participants: Array<{
        userId: string;
        name: string;
        avatarUrl?: string;
    }>;
    /** Overrides the rendered count when the caller knows a truer number
     *  than it has names for (e.g. the server's participantCount while
     *  some display names are still resolving). */
    count?: number;
    /** Click target — typically "open/expand the call". */
    onClick?: () => void;
    /** Live-region label prefix, e.g. the lobby name. */
    label?: string;
    maxVisible?: number;
}

export declare function callRefFromMetadata(metadata: Record<string, unknown> | undefined): {
    callId: string;
    live: boolean;
    durationMs?: number;
    audioOnly?: boolean;
    recorded?: boolean;
    notRecordedReason?: string;
    lobbyName?: string;
    participants: CallActivityParticipant[];
} | null;

export declare function CallSettingsDialog({ open, onClose, previewStream, initialTab, devicesContent, effectsContent, peopleContent, chatContent, showPreview, title, className, }: CallSettingsDialogProps): JSX.Element;

export declare interface CallSettingsDialogProps {
    open: boolean;
    /** Backdrop click, Escape and the ✕ button all fire this. */
    onClose: () => void;
    /** Live self-preview stream — rendered muted, mirrored, autoplaying.
     *  Pass null for the "Camera off" empty state. */
    previewStream: MediaStream | null;
    /** Tab shown each time the dialog opens. Ignored (falls back to the
     *  first available tab) when that tab's slot is missing. */
    initialTab?: CallSettingsTab;
    /** "Devices" tab body — e.g. a <DeviceSettingsPanel/> wired to the
     *  consumer's device preferences. Omit to hide the tab. */
    devicesContent?: ReactNode;
    /** "Effects" tab body — e.g. a <MediaEffectsTray/> wired to the
     *  consumer's effects engine. Omit to hide the tab. */
    effectsContent?: ReactNode;
    /** "People" tab body — e.g. an <InviteCandidateList/> wired to the
     *  consumer's roster + invite call. Omit to hide the tab. */
    peopleContent?: ReactNode;
    /** "Chat" tab body — e.g. a chat panel wired to the call's channel.
     *  Omit to hide the tab. */
    chatContent?: ReactNode;
    /**
     * Show the small live self-preview on the left. Default true.
     *
     * Pass false when the tab body brings its own (larger) preview — which
     * is exactly what <MediaEffectsPreviewPanel> does. Two self-views side
     * by side, one live and one draft, is the confusing arrangement the
     * preview-before-publish work exists to remove.
     */
    showPreview?: boolean;
    /** Dialog heading. Defaults to "Call settings". */
    title?: string;
    className?: string;
}

export declare type CallSettingsTab = 'devices' | 'effects' | 'people' | 'chat';

export declare function CallSidePanel({ tabs, activeTab, onTabChange, mode, open, onClose, title, children, widthClassName, className, 'data-testid': testId, }: CallSidePanelProps): JSX.Element | null;

export declare function callSidePanelBodyTestId(tab: CallSidePanelTab): string;

/** How the dock rendered itself for the host widget's display mode. */
export declare type CallSidePanelPlacement = 'docked' | 'overlay';

/**
 * Which placement the dock takes for a given widget display mode.
 *
 * 'mini' is the only mode that cannot afford a column: at 320px a docked
 * panel would leave the video ~0px wide, so the dock covers the stage
 * instead (Meet/Teams narrow-window behaviour).
 */
export declare function callSidePanelPlacement(mode: CallWidgetMode): CallSidePanelPlacement;

export declare interface CallSidePanelProps {
    /** Destinations available in the dock. Supplying this switches the
     *  component to the tabbed API; `open`/`title`/`children` are ignored. */
    tabs?: CallSidePanelTab[];
    /** The single open destination, or null when the dock is closed. */
    activeTab?: string | null;
    /** Fires with the next id, or null when the dock should close. */
    onTabChange?: (id: string | null) => void;
    /** Host widget's display mode — decides docked vs overlay placement.
     *  Defaults to 'window' (docked). */
    mode?: CallWidgetMode;
    /** @deprecated Use `tabs` + `activeTab`. Kept working as a one-tab dock. */
    open?: boolean;
    /** The header ✕ fires this. The consumer owns the open/closed state.
     *  In the tabbed API this fires alongside `onTabChange(null)`. */
    onClose?: () => void;
    /** @deprecated Use `tabs`. Header text, e.g. "Chat". */
    title?: string;
    /** @deprecated Use `tabs`. Panel body. */
    children?: ReactNode;
    /** Width utility for the docked column. Defaults to `w-80`. Ignored in
     *  'overlay' placement, which is always full-bleed. */
    widthClassName?: string;
    className?: string;
    'data-testid'?: string;
}

export declare interface CallSidePanelTab {
    /** Stable id. 'chat' | 'people' | 'captions' get canonical testids and
     *  default icons; any other id works and falls back to derived ones. */
    id: string;
    /** Header text and toggle-button accessible name, e.g. "Chat". */
    label: string;
    /** Panel body — rendered inside a `min-h-0 flex-1 overflow-y-auto` slot. */
    content: ReactNode;
    /** Toggle-button glyph. Defaults by id for the three well-known tabs. */
    icon?: ReactNode;
    /** Unread/attention count rendered as a badge on the toggle button. */
    badgeCount?: number;
    /** Disable just this destination (e.g. captions still warming up). */
    disabled?: boolean;
    /** Override the derived toggle-button testid. */
    toggleTestId?: string;
    /** Override the derived tab-body testid. */
    panelTestId?: string;
}

/**
 * Icon toggles for the dock's destinations. Rendered automatically by
 * <CallWidget> and <ExpandableCallWidget> into their control rows when
 * `sidePanelTabs` is supplied — a consumer never positions these by hand.
 * Exported for hosts that build their own control bar.
 */
export declare function CallSidePanelToggles({ tabs, activeTab, onTabChange, disabled, className, 'data-testid': testId, }: CallSidePanelTogglesProps): JSX.Element | null;

export declare interface CallSidePanelTogglesProps {
    tabs: CallSidePanelTab[];
    /** Currently open destination, or null/undefined when the dock is closed. */
    activeTab?: string | null;
    /** Fires with the next destination id, or null when the active button
     *  is clicked again (click-to-close, like Meet's chat button). */
    onTabChange?: (id: string | null) => void;
    disabled?: boolean;
    className?: string;
    'data-testid'?: string;
}

export declare function callSidePanelToggleTestId(tab: CallSidePanelTab): string;

/**
 * Slack-Huddles-style "someone started a hangout" banner. Lightweight,
 * inline (not modal), low-friction: click "Join" to enter the call,
 * click dismiss to ignore. No system-level ringing.
 *
 * Pure presentational — the consumer mounts it (typically near the top of
 * the app shell or inside a notifications stack) and wires `onJoin` /
 * `onDismiss` to actual behavior (joining the lobby, declining the invite).
 *
 * Auto-dismisses after `autoExpireSec` seconds (default 30) to avoid
 * stale-banner spam if the call is over by the time the recipient looks.
 */
export declare function CallStartedBanner({ callerName, callerAvatarUrl, context, mode, media, onJoin, onDismiss, autoExpireSec, className, style, }: CallStartedBannerProps): JSX.Element | null;

/** What the caller asked for. Not the same axis as `mode` (who is being
 *  addressed) — this is what answering will actually turn on. */
export declare type CallStartedBannerMedia = 'audio' | 'video';

export declare type CallStartedBannerMode = 'started' | 'calling';

export declare interface CallStartedBannerProps {
    /** Display name of the user who started / is making the call. */
    callerName: string;
    /** Optional avatar URL — falls back to an initial-circle. */
    callerAvatarUrl?: string;
    /** Optional channel / room context shown under the caller name
     * (e.g. "in #general", "in this document"). */
    context?: string;
    /**
     * Copy framing:
     *   - 'started' (default) — "Name started a call". Use for broadcast /
     *     ambient hangouts where multiple people might be invited.
     *   - 'calling'           — "Name is calling you". Use for direct 1:1
     *     calls where the recipient is specifically targeted.
     */
    mode?: CallStartedBannerMode;
    /**
     * What the caller invited you to. Renders as "Audio call" / "Video call"
     * on the banner's second line, so answering is an informed choice rather
     * than a surprise: a person who accepts an audio call should not find
     * their camera live. Omit when the invite carries no media intent — the
     * banner then says nothing about it rather than guessing.
     */
    media?: CallStartedBannerMedia;
    /** Click handler for the "Join" action. */
    onJoin?: () => void;
    /** Click handler for the dismiss / decline action. Banner self-hides
     * via the autoExpireSec timeout if not provided. */
    onDismiss?: () => void;
    /** Auto-expire after this many seconds. Set to 0 to disable. Default 30. */
    autoExpireSec?: number;
    /** Escape hatches. */
    className?: string;
    style?: CSSProperties;
}

declare type CallState = 'idle' | 'creating' | 'joining' | 'active' | 'error';

export declare function CallStatsOverlay({ stats, position, testId, className, style, }: CallStatsOverlayProps): JSX.Element | null;

export declare type CallStatsOverlayPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export declare interface CallStatsOverlayProps {
    /** When undefined or empty (no fields set), the overlay renders nothing. */
    stats?: CallStatsOverlayStats;
    /** Corner to dock the overlay against its positioned parent. */
    position?: CallStatsOverlayPosition;
    /** Stable data-testid (e2e hook). Defaults to `call-stats-overlay`. */
    testId?: string;
    /**
     * Extra positioning / sizing classes. Prefer this over `style` — it is
     * composed after the `position` classes through `cn()`, so a caller class
     * wins (e.g. `top-8` overriding `top-2`), and inline styles are banned in
     * demos and stories.
     */
    className?: string;
    /** @deprecated Use `className`. Kept so existing callers keep compiling. */
    style?: CSSProperties;
}

export declare interface CallStatsOverlayStats {
    networkQuality?: NetworkQuality;
    bitrateKbps?: number;
    latencyMs?: number;
    packetLossPct?: number;
}

export declare interface CallStripParticipant {
    id: string;
    displayName: string;
    avatarUrl?: string;
    isMuted?: boolean;
    isSpeaking?: boolean;
}

export declare function CallTileRow({ participants, localParticipant, activeSpeakerId, tileWidth, controls, title, onParticipantClick, variant, className, style, 'data-testid': testId, }: CallTileRowProps): JSX.Element;

export declare interface CallTileRowProps {
    participants: HangoutLayoutParticipant[];
    /** The viewer's own tile — drawn last, at the controls' side, where a mirror belongs. */
    localParticipant?: HangoutLayoutParticipant | null;
    activeSpeakerId?: string | null;
    /** Width of one tile; tiles keep 16:9. Default 144. */
    tileWidth?: number;
    /** The call's controls (mute, camera, leave, pop-out…), rendered at the row's end. */
    controls?: ReactNode;
    /** A short label at the row's start — the room, or who is on the call. */
    title?: ReactNode;
    onParticipantClick?: (id: string) => void;
    /**
     * `floating` (default): the tiles stand on their own over the page —
     * rounded, shadowed, no bar behind them — with the controls centred
     * beneath. A row of people over a diagram should look like people over a
     * diagram, not like a panel someone laid along the bottom edge. `bar`
     * keeps them in one dark strip with the controls at the end, for a dock
     * that is itself a panel.
     */
    variant?: 'floating' | 'bar';
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}

export declare function CallWidget({ state, mode, participants, localParticipant, callerName, duration, isMuted, isCameraOn, isScreenSharing, onAnswer, onDecline, onEndCall, onToggleMute, onToggleCamera, onToggleScreenShare, onUpgradeToVideo, onAddParticipant, availableParticipants, controlsExtras, onOpenAddParticipant, onMinimize, onExpand, layoutComponent, callStats, displayMode, minimized: minimizedProp, sidePanelTabs, activeSidePanelTab, onSidePanelTabChange, sidePanelWidthClassName, dockTargets, activeDockId, onDockTo, onDragStateChange, position, contained, draggable, className, style, dataAttrs, }: CallWidgetProps): JSX.Element | null;

/** Canonical display mode for any call surface. */
export declare type CallWidgetMode = 'mini' | 'window' | 'fullscreen';

export declare interface CallWidgetParticipant extends CallStripParticipant {
    videoStream?: MediaStream | null;
}

export declare interface CallWidgetProps {
    state: CallWidgetState;
    mode: CallMode;
    participants: CallWidgetParticipant[];
    localParticipant?: CallWidgetParticipant;
    callerName?: string;
    duration?: number;
    isMuted?: boolean;
    isCameraOn?: boolean;
    isScreenSharing?: boolean;
    onAnswer?: () => void;
    onDecline?: () => void;
    onEndCall?: () => void;
    onToggleMute?: () => void;
    onToggleCamera?: () => void;
    onToggleScreenShare?: () => void;
    onUpgradeToVideo?: () => void;
    onAddParticipant?: (participantId: string) => void;
    /** Slot rendered IN the control row (between add-participant and End)
     *  — the collapsed-widget counterpart to MediaControlsBar's `extras`.
     *  Lets a consumer add one action (effects, captions, settings)
     *  without forking the chrome, so the docked and expanded widgets can
     *  offer the SAME affordance in the same place. */
    controlsExtras?: ReactNode;
    /** Consumer-owned "add people" flow — see CallControls. Renders the
     *  add-participant button inline with the other controls (which is
     *  where it belongs visually) while the consumer owns the picker. */
    onOpenAddParticipant?: () => void;
    /** List of people available to add to the call */
    availableParticipants?: CallWidgetParticipant[];
    onMinimize?: () => void;
    onExpand?: () => void;
    /**
     * Canonical display mode for the widget chrome.
     *
     *   'mini'        collapsed pill (what `minimized` used to mean)
     *   'window'      the normal 320px widget
     *   'fullscreen'  same chrome as 'window'; <CallWidget> has no
     *                 viewport-filling stage of its own, so this renders
     *                 the full chrome and stamps `data-call-widget-mode`
     *                 for a host that supplies the stage.
     *
     * NOTE the prop is `displayMode`, not `mode`: `mode` on this component
     * has always meant the CALL mode ('audio' | 'video'), an orthogonal
     * axis, and renaming it would be the breaking change this API exists
     * to avoid. <ExpandableCallWidget> — which has no such collision —
     * spells the same vocabulary `defaultMode`/`setMode`.
     *
     * Wins over `minimized` when both are supplied (dev-only warn).
     */
    displayMode?: CallWidgetMode;
    /**
     * @deprecated Use `displayMode`. Maps as
     * `minimized === true → 'mini'`, `minimized === false → 'window'`.
     * Still fully supported; `displayMode` takes precedence if both are set.
     */
    minimized?: boolean;
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    /** When true, uses absolute positioning within a relative parent instead of fixed to viewport */
    contained?: boolean;
    draggable?: boolean;
    /**
     * Optional render slot that replaces the default video area (local fullscreen
     * + single remote PiP). When provided, the widget renders this node in the
     * video area while preserving its own header, controls, drag/minimize, and
     * call-state machine. Use for multi-person hangout layouts (pair with
     * `HangoutLayout` from the same module).
     *
     * Absent → the widget renders today's single-PiP layout (backwards compatible).
     */
    layoutComponent?: ReactNode;
    /**
     * Optional diagnostics stats. When provided (and at least one field is
     * set), CallWidget renders a `<CallStatsOverlay>` inside the video area.
     */
    callStats?: CallStatsOverlayStats;
    className?: string;
    style?: CSSProperties;
    /**
     * Destinations for the docked side panel (chat / people / captions).
     *
     * Supplying this gives the widget a side-panel REGION that is part of
     * the widget — not a detached floating window. The toggle buttons are
     * rendered automatically into the control row (ahead of
     * `controlsExtras`), and because the panel lives inside the widget's
     * own transformed root it travels with the widget when dragged.
     *
     * Per-mode behaviour:
     *   'window' / 'fullscreen'  the card WIDENS — the stage has no slack to
     *                            give up, so Meet's split becomes a grow
     *                            here: the stage column itself goes to
     *                            `CALL_STAGE_DOCKED_WIDTH` and the dock is
     *                            added beside it. Both columns take one
     *                            height (`CALL_DOCK_ROW_HEIGHT`), the stage
     *                            and the panel body absorbing the slack, so
     *                            the card has no dead bands in it.
     *   'mini'                   the collapsed pill has no video stage to
     *                            dock beside; the dock and its toggles are
     *                            not rendered. Expand to reach chat, which
     *                            is what Meet's PiP and Slack's huddle bar
     *                            both do.
     */
    sidePanelTabs?: CallSidePanelTab[];
    /** The single open destination, or null when the dock is closed. */
    activeSidePanelTab?: string | null;
    /** Fires with the next id, or null when the dock should close. */
    onSidePanelTabChange?: (id: string | null) => void;
    /** Width utility for the docked column. Defaults to `w-80`. */
    sidePanelWidthClassName?: string;
    /**
     * Places in the page the call can be moved INTO (see "Page docking"
     * above). Supplying a non-empty list turns on the dock affordances: a
     * drag grip in the header, and a "Move to…" menu beside the window
     * controls.
     *
     * Absent or empty → the widget is exactly the floating card it has
     * always been. Nothing about the free-drag changes.
     */
    dockTargets?: CallDockTarget[];
    /**
     * The slot currently holding the call, or null while it floats. When
     * set, the widget stops free-dragging: it is part of the page's layout
     * now, and an offset transform would shove it back out of the slot it
     * was just dropped into. Pop out to get the floating card back.
     */
    activeDockId?: string | null;
    /** Fires with the destination slot id, or null to pop back out. */
    onDockTo?: (id: string | null) => void;
    /**
     * Fires when a free-drag of the widget starts and ends. A page uses it to
     * show the places the call could land — a ghost of a dock along its bottom
     * edge — only while the reader is actually moving the call toward one.
     * The drop itself is the pointer-drag hit-test on `data-call-dock-target`;
     * this is only the cue.
     */
    onDragStateChange?: (dragging: boolean) => void;
    /** Arbitrary `data-*` attributes to spread onto the root element.
     *  Lets callers (e.g. HangoutOverlay) attach e2e-friendly testids and
     *  lobby/callId metadata without an extra wrapper div that would
     *  conflict with the widget's own `position: fixed` placement. */
    dataAttrs?: Record<string, string | number | undefined>;
}

export declare type CallWidgetState = 'idle' | 'ringing' | 'connecting' | 'active' | 'ended';

/** True when nothing blocks a save. Kept separate so the host can ask too. */
export declare function canSaveDeck(spec: DeckSpec): boolean;

/** Width of the folded rail. */
export declare const CANVAS_PANE_RAIL_PX = 36;

export declare interface CanvasPaneGeometry {
    placement: Exclude<CanvasPanePlacement, 'none' | 'collapsed'>;
    paneWidth: number;
    /** Canvas width left visible beside (column) or beside-and-under (overlay) the pane. */
    canvasWidth: number;
}

/** Pure: where the pane goes, and how wide, in a layout this wide. */
export declare function canvasPaneGeometry(width: number, options?: CanvasPaneGeometryOptions): CanvasPaneGeometry;

export declare interface CanvasPaneGeometryOptions {
    /** Narrowest the pane gets. Default 280. */
    paneMinPx?: number;
    /** Widest the pane gets. Default 380. */
    paneMaxPx?: number;
    /** The pane's share of the layout between those bounds. Default 0.3. */
    paneFraction?: number;
    /** The canvas keeps at least this beside a column pane; below it the pane overlays. Default 480. */
    canvasMinPx?: number;
}

export declare interface CanvasPaneInset {
    /** Pixels of the canvas's right edge that the pane lies over. */
    right: number;
}

export declare const CanvasPaneInsetContext: Context<CanvasPaneInset>;

export declare function CanvasPaneLayout({ children, pane, collapsed: collapsedProp, onCollapsedChange, expandKey, paneLabel, width: fixedWidth, className, 'data-testid': testId, ...geometryOptions }: CanvasPaneLayoutProps): JSX.Element;

export declare interface CanvasPaneLayoutProps extends CanvasPaneGeometryOptions {
    /** The canvas. It gets the remaining width and never less than zero. */
    children: ReactNode;
    /** The details pane, or null/undefined when nothing is open. It fills its box (`h-full w-full`) and draws its own left edge and background. */
    pane?: ReactNode | null;
    /** Controlled fold state. Omit to let the layout keep its own. */
    collapsed?: boolean;
    onCollapsedChange?: (collapsed: boolean) => void;
    /** When this changes (a different item opened), a folded pane unfolds. */
    expandKey?: unknown;
    /** What the pane holds, for the fold/unfold buttons: "Hide details" / "Show details". Default "details". */
    paneLabel?: string;
    /** Fixed width for tests/stories (jsdom never measures). */
    width?: number;
    className?: string;
    'data-testid'?: string;
}

export declare type CanvasPanePlacement = 'none' | 'column' | 'overlay' | 'collapsed';

declare type CanvasTool = 'brush' | 'pen' | 'eraser' | 'select';

export declare function CanvasZoomControls({ zoom, onZoomIn, onZoomOut, onFit, minZoom, maxZoom, className, 'aria-label': ariaLabel, 'data-testid': testId, }: CanvasZoomControlsProps): JSX.Element;

export declare interface CanvasZoomControlsProps {
    /** Current zoom, 1 = 100%. Omit to hide the readout. */
    zoom?: number;
    onZoomIn: () => void;
    onZoomOut: () => void;
    /** Fit the whole drawing. Omit to hide the button. */
    onFit?: () => void;
    /** Disable "zoom out" at or below this zoom. */
    minZoom?: number;
    /** Disable "zoom in" at or above this zoom. */
    maxZoom?: number;
    className?: string;
    'aria-label'?: string;
    'data-testid'?: string;
}

export declare function CapabilityDeniedFallback({ capabilityName, title, description, actionLabel, onAction, actions, icon, testId, }: CapabilityDeniedFallbackProps): JSX.Element;

export declare interface CapabilityDeniedFallbackProps {
    /**
     * Capability name as the user would recognize it (e.g. "Chat",
     * "Recording", "AI Assistant"). Used in the default title.
     */
    capabilityName?: string;
    /** Override the default title entirely. */
    title?: string;
    /** Body copy explaining why the feature is unavailable / how to enable it. */
    description?: ReactNode;
    /**
     * Optional CTA — typically a "Request access" or "Upgrade plan" link.
     * For multiple CTAs use `actions` instead.
     */
    actionLabel?: string;
    onAction?: () => void;
    /** Multi-action variant. Takes precedence over actionLabel/onAction. */
    actions?: EmptyStateAction[];
    /** Override the default lock icon. Pass `null` to remove the icon. */
    icon?: ReactNode | null;
    /** Test id (defaults to `capability-denied-fallback`). */
    testId?: string;
}

export declare interface CaptionLine {
    id: string;
    speakerId: string;
    speakerName?: string;
    text: string;
    /** ISO timestamp of caption emission. Seeds the linger timer for lines
     *  that never update again. */
    at: string;
    /** True if the caption is still being updated (interim) vs final.
     *  Omitted/false = final: final text always replaces the displayed text;
     *  interim text is subject to the stable-transcription shrink filter. */
    interim?: boolean;
}

/** CC / captions glyph — the live-captions affordance. */
export declare function CaptionsIcon({ size, ...rest }: IconProps): JSX.Element;

export declare function Card({ children, padding, className, ref, ...rest }: CardProps): JSX.Element;

export declare function CardHeader({ title, subtitle, meta, action, inset, className }: CardHeaderProps): default_2.JSX.Element;

export declare interface CardHeaderProps {
    title: string;
    /** Small text below the title. */
    subtitle?: string;
    /** Extra content rendered immediately to the right of the title (badges/chips). */
    meta?: default_2.ReactNode;
    /** Right-aligned action area (buttons, menus). */
    action?: default_2.ReactNode;
    /**
     * The header owns its own gutter and bottom rule. For a `Card padding="none"`
     * host — one with a full-bleed footer or edge-to-edge rows — where the card
     * is not padding the header for it; without this the title hangs on the
     * card's top-left edge.
     */
    inset?: boolean;
    className?: string;
}

export declare type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export declare interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    padding?: CardPadding;
    /**
     * The underlying `<div>`. A plain prop, not `forwardRef` — see the note on
     * `StackProps.ref`; React 19 passes `ref` through as an ordinary prop and
     * this card is not polymorphic, so the type is exact.
     */
    ref?: Ref<HTMLDivElement>;
}

export declare function CatalogGrid({ children, columns, dense, className, style, 'data-testid': testId, }: CatalogGridProps): JSX.Element;

export declare type CatalogGridColumns = 1 | 2 | 3 | 4 | 5;

export declare interface CatalogGridProps {
    /** Children — expected to be <ThumbnailCard> instances (any node accepted). */
    children: ReactNode;
    /** Target column count at >=640px. Default 3. Always collapses to 1 below. */
    columns?: CatalogGridColumns;
    /** Tighter gap (12px vs 20px). Default false. */
    dense?: boolean;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}

/** What the host reports back after trying to apply. */
export declare interface ChangeApplyOutcome {
    ok: boolean;
    /** Shown verbatim when `ok` is false. Say what happened, not "error". */
    message?: string;
    /** Set when the refusal was specifically a compare-and-set mismatch. */
    stale?: {
        expected: unknown;
        actual: unknown;
    };
}

/** Who is asking for the change. */
export declare interface ChangeAuthor {
    name: string;
    /**
     * `agent` renders the machine label. This is not decoration: an unreviewed
     * machine edit and a colleague's edit carry very different weight, and the
     * only thing separating them on screen is this.
     */
    kind?: 'human' | 'agent';
    avatarUrl?: string;
}

export declare function ChangeDiff({ pairs, beforeLabel, afterLabel, className, 'data-testid': testId, }: ChangeDiffProps): JSX.Element | null;

export declare interface ChangeDiffPair {
    before: string;
    after: string;
}

export declare interface ChangeDiffProps {
    pairs: readonly ChangeDiffPair[];
    /** Label for the current value. */
    beforeLabel?: string;
    /** Label for the value being proposed. */
    afterLabel?: string;
    className?: string;
    'data-testid'?: string;
}

export declare function ChangeLocation({ path, hint, rootLabel, className, 'data-testid': testId, }: ChangeLocationProps): JSX.Element;

export declare interface ChangeLocationProps {
    /**
     * Breadcrumb from the document root, outermost first —
     * e.g. `['Section 4', 'Payment terms']`. An empty array renders the
     * document-level case rather than an empty strip.
     */
    path: readonly string[];
    /** Position within the target, e.g. `paragraph 3`. Optional. */
    hint?: string | undefined;
    /** Shown when `path` is empty. */
    rootLabel?: string;
    className?: string;
    'data-testid'?: string;
}

export declare function ChangeReviewCard({ category, author, path, locationHint, pairs, beforeLabel, afterLabel, utterance, rationale, verdict, verdictStatus, verdictError, revision, status, draftError, badges, onAccept, onReject, onRereview, actions, className, 'data-testid': testId, }: ChangeReviewCardProps): JSX.Element;

export declare interface ChangeReviewCardProps {
    /**
     * What KIND of change this is, in the reviewer's words — "Title", "Payment
     * terms", "Body text". Rendered first and most prominent.
     */
    category: string;
    /**
     * Who made / is asking for the change.
     *
     * Optional, and its absence is RENDERED — as "Unattributed", not as a blank.
     * Plenty of real sources cannot name an editor (an S3 object has no author),
     * and the wrong fix is to fill the gap with the system that delivered the
     * change. "Contracts (Google Drive)" is a provenance, not a person; showing
     * it where a person belongs is what made the queue it replaces unreadable.
     */
    author?: ChangeAuthor;
    /** Breadcrumb to the change site. See `ChangeLocation`. */
    path?: readonly string[];
    /** Position within the target, e.g. `paragraph 3`. */
    locationHint?: string;
    /** The before/after pairs. One for a field, several for prose edits. */
    pairs: readonly ChangeDiffPair[];
    /** Label for the current value. Defaults to "Now". */
    beforeLabel?: string;
    /** Label for the proposed value. Defaults to "Proposed". */
    afterLabel?: string;
    /** Verbatim request that raised this, if there was one. Never paraphrase it. */
    utterance?: string;
    /** The author's one-line justification for the change itself. */
    rationale?: string;
    verdict?: ChangeReviewVerdict | undefined;
    verdictStatus?: ChangeReviewStatus | undefined;
    verdictError?: string | undefined;
    /**
     * The change's CURRENT revision. Pass it, or a verdict computed against an
     * older revision renders as though it still applies.
     */
    revision?: string | undefined;
    status?: ChangeReviewCardStatus;
    /** When set, rendered instead of the diff — the change could not be drafted. */
    draftError?: string;
    /** Extra chips for the header line (attachment state, confidence, …). */
    badges?: ReactNode;
    /**
     * Apply the change. MUST perform the mutation and report what happened —
     * returning `{ ok: true }` without changing the document is the exact bug
     * this component is shaped to prevent.
     */
    onAccept?: () => Promise<ChangeApplyOutcome> | ChangeApplyOutcome;
    onReject?: (reason: string) => void;
    /** Ask for a fresh review of the current revision. Offered on stale/failed. */
    onRereview?: () => void;
    /** Extra actions, rendered after the built-in ones. */
    actions?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

export declare type ChangeReviewCardStatus = 'pending' | 'applied' | 'rejected';

export declare function ChangeReviewList({ documentTitle, changeCount, documentMeta, headerActions, pageSize, emptyState, notices, footer, children, className, 'data-testid': testId, }: ChangeReviewListProps): JSX.Element;

export declare interface ChangeReviewListProps {
    /** The document being changed. This is the heading — not the queue's name. */
    documentTitle: string;
    /**
     * Total number of changes awaiting review. Defaults to the number of
     * children. Pass it explicitly when some children are not cards, or when the
     * host is paging server-side and the children are only part of the total.
     */
    changeCount?: number;
    /** Document type, owner, last-edited — whatever orients the reviewer. */
    documentMeta?: ReactNode;
    /** Rendered on the right of the heading, e.g. a Refresh button. */
    headerActions?: ReactNode;
    /** How many cards to show before the "show more" control. Default 3. */
    pageSize?: number;
    /** Rendered in place of the queue when there is nothing to review. */
    emptyState?: ReactNode;
    /** Banners — load errors, stale-data notices — above the queue. */
    notices?: ReactNode;
    /**
     * Rendered after the queue and OUTSIDE the `pageSize` window.
     *
     * Commit controls belong here, not in `children`: a "Apply to document"
     * button passed as a child is one of the paged items, so on a queue longer
     * than `pageSize` it disappears behind "show more" and the surface becomes
     * unsubmittable.
     */
    footer?: ReactNode;
    children?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

/**
 * How the review itself is going, independent of what it concluded.
 *
 * Separate from `ChangeReviewVerdict` because "we have not asked yet", "we are
 * asking" and "asking failed" are three different things to a reviewer, and
 * none of them is a verdict. Folding them into an optional verdict field would
 * make the absent case ambiguous.
 */
export declare type ChangeReviewStatus = 'idle' | 'pending' | 'failed';

export declare interface ChangeReviewVerdict {
    verdict: ChangeVerdict;
    /** One line, always shown beside the chip. */
    headline: string;
    /** Expandable detail. Absent when the model gave none — render nothing, not "no reasoning". */
    reasoning?: string;
    producedAt: string;
    /** The change revision this verdict was computed against. */
    forRevision: string;
}

/** An agent's judgement on a single proposed change. */
export declare type ChangeVerdict = 'pass' | 'concern' | 'fail';

export declare interface ChannelDocumentItem {
    documentId: string;
    title: string;
    /** Emoji or short glyph from the document's type. */
    icon?: string;
    /** Display name of whoever created it. */
    createdBy?: string;
    /** ISO-8601 of the last edit — what people scan this list by. */
    updatedAt?: string;
    /** People with the document open right now. */
    activeEditors?: number;
}

export declare function ChannelDocumentsPanel({ documents, onOpen, onCreate, onCreateWhiteboard, className, 'data-testid': testId, }: ChannelDocumentsPanelProps): JSX.Element;

export declare interface ChannelDocumentsPanelProps {
    documents: readonly ChannelDocumentItem[];
    onOpen?: (documentId: string) => void;
    /** Omit for a viewer who may not create documents here. */
    onCreate?: () => void;
    /**
     * Start a WHITEBOARD here, beside the document.
     *
     * The two are different authoring surfaces, not one with a setting: a
     * document is a page you write down, a whiteboard is an infinite canvas you
     * draw on with other people. The product had both and a conversation could
     * only ever start the first, so the canvas was unreachable from the place
     * people actually decide to sketch something.
     *
     * Omit for a viewer who may not create one.
     */
    onCreateWhiteboard?: () => void;
    className?: string;
    'data-testid'?: string;
}

export declare interface ChannelFileItem {
    /** The message the file arrived on — what the row jumps back to. */
    messageId: string;
    attachment: ChatAttachment;
    author: string;
    /** ISO-8601 of the message. */
    sentAt?: string;
}

export declare function ChannelFilesPanel({ files, thumbnailSrc, onJump, className, 'data-testid': testId, }: ChannelFilesPanelProps): JSX.Element;

export declare interface ChannelFilesPanelProps {
    files: readonly ChannelFileItem[];
    /**
     * Resolves a displayable image source. The download route is authenticated,
     * so `attachment.url` in an <img> would 401 — the integration layer hands
     * back a resolved object URL. Falling back to the inline preview keeps the
     * thumbnail honest while the real bytes are still being fetched.
     */
    thumbnailSrc?: (a: ChatAttachment) => string | null | undefined;
    onJump?: (messageId: string) => void;
    className?: string;
    'data-testid'?: string;
}

export declare function ChannelHeader({ name, onRename, memberCount, description, tabs, actions, avatarUrl, online, onMembersClick, size, as, className, 'data-testid': testId, }: ChannelHeaderProps): JSX.Element;

export declare interface ChannelHeaderProps {
    /** Display name of the channel or user */
    name: string;
    /**
     * Rename the conversation from its own title: double-click it and the
     * heading becomes an input in place. Enter commits, Escape abandons, and
     * blurring commits too — the same bargain every rename-in-place makes.
     *
     * IN PLACE rather than in a dialog. The thing being renamed is right there
     * and it is one field; a centred modal makes you look away from the title
     * to type its new value and then look back to see whether it took. Omit
     * for a viewer who may not rename this — the affordance should not exist
     * where the action would be refused.
     */
    onRename?: (next: string) => void;
    /** Number of members in the channel */
    memberCount?: number;
    /** Short description shown below the name */
    description?: string;
    /**
     * Views of this channel — files, documents, recordings, pinned. Rendered
     * inline beside the name; pass a <Tabs variant="underline" size="sm">.
     * The header owns no tab state: which one is active is the caller's.
     */
    tabs?: ReactNode;
    /** Right-aligned action area */
    actions?: ReactNode;
    /** Avatar URL; falls back to name initials */
    avatarUrl?: string;
    /** Show green online indicator */
    online?: boolean;
    /** Called when member-count area is clicked */
    onMembersClick?: () => void;
    /**
     * `sm` for a narrow column (a conversation beside a document): one row that
     * never wraps, a 28px avatar, the description dropped. The default `md` is
     * the full-width bar over a chat pane.
     */
    size?: 'md' | 'sm';
    /**
     * Element the bar renders as. Defaults to `'div'`. Pass `'header'` when a
     * host uses this as the page's own site header, so it lands as a `banner`
     * landmark instead of an anonymous `div`.
     */
    as?: 'div' | 'header';
    className?: string;
    'data-testid'?: string;
}

/**
 * One time you were named, in a CHANNEL. Named `ChannelMention…` because the
 * library already has a `MentionItem` for the other kind — being named in a
 * document comment — and those two are not interchangeable: one points at a
 * message in a conversation, the other at a comment on a section.
 */
export declare interface ChannelMentionItem {
    messageId: string;
    /** Channel the mention happened in — the id used to navigate. */
    channel: string;
    /** Human-readable channel name. Falls back to the id when absent. */
    channelLabel?: string;
    author: string;
    /** The message text, trimmed by the caller if it is long. */
    excerpt: string;
    /** ISO-8601. */
    at?: string;
    /** Unread mentions are the ones that still need you. */
    unread?: boolean;
}

export declare function ChannelMentionsPanel({ mentions, onJump, className, 'data-testid': testId, }: ChannelMentionsPanelProps): JSX.Element;

export declare interface ChannelMentionsPanelProps {
    mentions: readonly ChannelMentionItem[];
    /** Jump takes both, because a mention can be in a channel you are not in. */
    onJump?: (channel: string, messageId: string) => void;
    className?: string;
    'data-testid'?: string;
}

export declare type ChannelPrivacy = 'standard' | 'private';

export declare interface ChannelRecordingItem {
    recordingId: string;
    /** ISO-8601 of when the call started. */
    startedAt?: string;
    /** Length of the recorded media, in milliseconds. */
    durationMs?: number;
    /** Distinct PEOPLE on the call, not sessions — rejoins are not extra heads. */
    participantCount?: number;
    participants?: Array<{
        userId: string;
        displayName?: string;
    }>;
    thumbnailUrl?: string;
    /**
     * Whether the recording can actually be played. A row that opens a player
     * showing nothing is worse than a row that says the recording is still
     * being assembled.
     */
    playable?: boolean;
}

export declare function ChannelRecordingsPanel({ recordings, onOpen, className, 'data-testid': testId, }: ChannelRecordingsPanelProps): JSX.Element;

export declare interface ChannelRecordingsPanelProps {
    recordings: readonly ChannelRecordingItem[];
    onOpen?: (recordingId: string) => void;
    className?: string;
    'data-testid'?: string;
}

/** Bars on a baseline: measurements, "how much of this over time". */
export declare function ChartIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare interface ChatAttachment {
    /** Correlation id shared with the sender's in-flight transfer. */
    id: string;
    /** Original filename. User content — never used as a path, never trusted. */
    name: string;
    /** Byte length of the stored object. */
    size: number;
    /** Declared MIME type. Advisory: used to pick a layout, never to trust. */
    contentType: string;
    /**
     * Authenticated download URL. Because the download route requires a bearer
     * token, an `<img src>` pointed straight at this will 401 — a resolved
     * object URL should be handed in as `src` by the integration layer.
     */
    url: string;
    /** Intrinsic dimensions when known, so the row reserves space before load. */
    width?: number;
    height?: number;
    /**
     * Tiny inline data-URI placeholder captured by the sender before upload.
     * Lets a recipient see what the image IS while the bytes are still moving.
     */
    preview?: string;
}

export declare interface ChatBubble {
    id: string;
    author: string;
    avatarUrl?: string;
    color?: string;
    /** Plain text. The host strips markup; this component never renders HTML. */
    text: string;
    /** Where it came from — the room — for the small caption. */
    channelLabel?: string;
}

/** Chat bubble glyph — the in-call chat affordance. Pair with
 *  CircularIconToggle in a controls `extras` slot to open a chat side
 *  panel (CallSidePanel) or the settings dialog's Chat tab. */
export declare function ChatBubbleIcon({ size, ...rest }: IconProps): JSX.Element;

export declare function ChatBubbleStack({ bubbles, onOpen, onDismiss, dismissAfterMs, max, className, 'data-testid': testId, }: ChatBubbleStackProps): JSX.Element | null;

export declare interface ChatBubbleStackProps {
    bubbles: ChatBubble[];
    /** The reader clicked a bubble: open the conversation there. */
    onOpen: (id: string) => void;
    /** A bubble timed out or was dismissed. */
    onDismiss: (id: string) => void;
    /** How long a bubble stays. Default 8 s. */
    dismissAfterMs?: number;
    /** At most this many on screen; older ones go first. Default 3. */
    max?: number;
    className?: string;
    'data-testid'?: string;
}

export declare type ChatChannelKind = 'room' | 'dm';

/** Room or DM for a channel, from the host's word first and the gateway's prefix second. */
export declare function chatChannelKindOf(ctx: Pick<ChatCommandScopeContext, 'channel' | 'channelKind'>): ChatChannelKind;

/**
 * Wraps the message list + composer so the column as a whole changes state with
 * the mode. Layout is identical in both states — only colour and the backdrop
 * change — so nothing reflows across the transition.
 */
export declare function ChatColumnBackdrop({ mode, working, tone: toneProp, className, children, 'data-testid': testId, }: ChatColumnBackdropProps): JSX.Element;

export declare interface ChatColumnBackdropProps {
    /**
     * The composer's mode. `chat` is the ordinary light column; `agent` and
     * `terminal` are the console.
     */
    mode?: ComposerMode;
    /**
     * True while a loop is mid-turn. Denser, faster, and the cloud leans toward
     * the pointer — the same "this is working" signal the lab shell uses, said by
     * the whole column instead of one pane.
     */
    working?: boolean;
    /**
     * The sky. `auto` (default): graphite on a light theme, night on a dark one
     * (see `resolveBackdropTone`). The resolved tone is stamped on this element
     * as `data-backdrop-tone`, so a composer inside it inherits the SAME sky
     * instead of deciding again. `none` never darkens the column.
     */
    tone?: BackdropTone;
    className?: string;
    children?: ReactNode;
    'data-testid'?: string;
}

export declare interface ChatCommand extends ComposerCommand {
    /** What sending the command does. Errors propagate to the host, which toasts. */
    run: (ctx: ChatCommandContext) => Promise<ChatCommandOutcome>;
    /** When the command is offered. Default `'always'`. Out of scope, it is listed disabled with a hint that says why. */
    scope?: ChatCommandScope;
    /** Overrides the hint shown while the command is out of scope. */
    disabledHint?: string;
}

/** What a command sees when it runs, and what a scope sees when it decides. */
export declare interface ChatCommandContext {
    channel: string;
    /**
     * Room or direct message, when the host knows. Without it, the `room`/`dm`
     * scopes fall back to the gateway's `chat:dm:`/`chat:dmg:` prefixes.
     */
    channelKind?: ChatChannelKind;
    user: {
        id: string;
        displayName: string;
    };
    idToken: string | null;
    /** The whole draft as sent, trigger included. */
    text: string;
    /** The text after the trigger, trimmed — the instruction, the query. */
    argumentText: string;
    /** The row picked from the command's argument menu, when there was one. */
    argument?: ComposerArgumentItem;
    sidePanel: {
        current: ChatSidePanelRef | null;
        open: (panel: ChatSidePanelRef) => void;
        close: () => void;
    };
    toast?: (message: string, opts?: {
        type?: 'info' | 'success' | 'error';
    }) => void;
    navigate?: (path: string) => void;
}

export declare type ChatCommandOutcome = 
/**
* The command started a pipeline run. The host posts an `agent-run` message
* whose metadata is `{ kind: 'agent-run', command, instruction, runId,
* pipelineId, ...card }`, and the thread shows an AgentRunCard for it.
*
* `visibility: 'private'` asks the host NOT to post: the card is shown to
* the person who ran the command alone (ChatPanel's `localMessages`), and
* they decide whether it goes into the conversation once the run has
* produced something worth sharing. Default `'shared'`.
*/
    {
    kind: 'run';
    runId: string;
    pipelineId: string;
    card: Record<string, unknown>;
    echo?: string;
    visibility?: 'shared' | 'private';
}
/** The command opened something beside the conversation, immediately. */
| {
    kind: 'panel';
    panel: ChatSidePanelRef;
    echo?: string;
}
/** The command's whole result is a message in the thread. */
| {
    kind: 'message';
    text: string;
    metadata?: Record<string, unknown>;
}
/** The command did its work out of band (a toast, a navigation). */
| {
    kind: 'none';
};

export declare function ChatCommandProvider({ commands, children }: ChatCommandProviderProps): JSX.Element;

export declare interface ChatCommandProviderProps {
    /** This layer's commands. Merged over any provider above; overrides by trigger. */
    commands?: readonly ChatCommand[];
    children: ReactNode;
}

/** Everything `run` needs except the draft, which the runner parses. */
export declare type ChatCommandRunContext = Omit<ChatCommandContext, 'text' | 'argumentText'>;

export declare type ChatCommandScope = 'always' | 'document-open' | 'room' | 'dm' | ((ctx: ChatCommandScopeContext) => boolean);

/** The context a scope decides on: everything but the draft, which does not exist yet. */
export declare type ChatCommandScopeContext = Omit<ChatCommandContext, 'text' | 'argumentText' | 'argument'>;

/** Why a command is disabled right now, in the words the composer's bar shows. */
export declare function chatCommandScopeHint(command: Pick<ChatCommand, 'scope' | 'disabledHint' | 'hint'>): string;

/**
 * The composer's view of the registry: every command, in registry order,
 * with out-of-scope ones disabled and their hint replaced by the reason. The
 * composer never sees `run` or `scope`.
 */
export declare function chatCommandsToComposer(commands: readonly ChatCommand[], ctx: ChatCommandScopeContext): ComposerCommand[];

/**
 * Chat input with send button. Stateless — value/onChange controlled by parent.
 *
 * - Enter submits (Shift+Enter inserts newline in multiline mode).
 * - Submit disabled when `disabled` or value is empty/whitespace.
 */
export declare function ChatComposer({ value, onChange, onSubmit, disabled, multiline, placeholder, submitLabel, className, style, autoFocus, maxRows, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, submitAriaLabel, }: ChatComposerProps): JSX.Element;

export declare interface ChatComposerProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    disabled?: boolean;
    /** false: single-line input, true: textarea (default false) */
    multiline?: boolean;
    placeholder?: string;
    /** default '→' */
    submitLabel?: string | ReactNode;
    className?: string;
    style?: CSSProperties;
    autoFocus?: boolean;
    /** for multiline, max rows before scroll (default 4) */
    maxRows?: number;
    /**
     * Accessible name for the message field (default "Message").
     *
     * The field is rendered internally, so a host has no way to wrap it in its
     * own `<label>`; without this it had no accessible name at all and announced
     * as a bare "edit text". A `placeholder` is not a substitute — browsers only
     * fall back to it, and it is gone the moment the user types.
     */
    'aria-label'?: string;
    /** Id of an existing visible element naming the field; wins over `aria-label`. */
    'aria-labelledby'?: string;
    /**
     * Accessible name for the send button. Only applied when `submitLabel` has
     * no readable text of its own — the default `'→'` and any icon node. When
     * `submitLabel` IS words ("Send", "Post"), that visible text is the name and
     * this is ignored, so the spoken name can never contradict what is on screen.
     */
    submitAriaLabel?: string;
}

export declare function ChatDropZone({ children, onFiles, accept, maxSize, onError, disabled, label, className, }: ChatDropZoneProps): JSX.Element;

export declare interface ChatDropZoneProps {
    children: ReactNode;
    /** Receives the dropped files after validation. */
    onFiles: (files: File[]) => void;
    /** Comma-separated MIME patterns, e.g. "image/*,.pdf". Omit to accept all. */
    accept?: string;
    /** Per-file byte cap. Rejected files are reported via `onError`. */
    maxSize?: number;
    /** Called with a human-readable reason when a drop is rejected. */
    onError?: (message: string) => void;
    /** Suppresses the drop affordance entirely (e.g. while disconnected). */
    disabled?: boolean;
    /** Overlay copy. Defaults to a generic prompt. */
    label?: string;
    className?: string;
}

/** A speech bubble: a conversation, a comment. */
export declare function ChatIcon({ size, ...rest }: GlyphProps): JSX.Element;

/**
 * The loop, shrunk to one line for the composer's chip row.
 *
 * "Back to chat" must not feel like abandoning the run, so the run has to stay
 * visible and one click away once the column is a conversation again.
 */
export declare function ChatLabPill({ status, contextTokens, contextBudgetTokens, onOpen, className, 'data-testid': testId, }: ChatLabPillProps): JSX.Element;

export declare interface ChatLabPillProps {
    status: LabStatus;
    contextTokens: number;
    contextBudgetTokens: number;
    onOpen: () => void;
    className?: string;
    'data-testid'?: string;
}

export declare function ChatLabShell({ title, status, model, contextBudgetTokens, contextTokens, iterations, planSource, steps, events, onInstruct, onStop, onBackToChat, onOpenRun, onOpenGraph, shell, notice, headerAccessory, className, 'data-testid': testId, }: ChatLabShellProps): JSX.Element;

export declare interface ChatLabShellProps {
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
    className?: string;
    'data-testid'?: string;
}

export declare interface ChatMember {
    id: string;
    name: string;
    avatarUrl?: string;
    role: 'owner' | 'member';
    /** ISO. */
    addedAt?: string;
}

export declare interface ChatMessage {
    id?: string;
    clientId: string;
    /**
     * Authenticated sender, stamped server-side. Distinct from `clientId`,
     * which identifies a CONNECTION and changes on every reconnect — which is
     * why "is this mine" keys on this and never on clientId: otherwise your own
     * messages stop being yours partway up the thread.
     */
    userId?: string;
    content: string;
    timestamp: string;
    displayName?: string;
    avatarUrl?: string;
    /**
     * Files shared alongside (or instead of) the text.
     *
     * An attachment rides ON a message rather than being its own message kind
     * so that ordering is free: the file lands exactly where the sender put it
     * in the conversation, interleaved correctly with the text around it. A
     * separate "file event" stream would have to be merged back against the
     * message stream at render time, and the merge would be wrong at exactly
     * the moment it matters — when someone is typing while a file uploads.
     *
     * `content` may be empty when a message is nothing but attachments.
     */
    attachments?: ChatAttachment[];
    /**
     * Server-stamped facts about what this message IS, beyond its text.
     *
     * The thread renders some messages as objects rather than sentences — a
     * document that was created, a call that is happening — and this is where
     * the facts for those live: `{ kind: 'document', documentId, title }`,
     * `{ kind: 'call', callId, participants, endedAt }`. The sentence stays in
     * `content` for everywhere that renders plain text (notification previews,
     * the conversation list preview), so a host that does nothing with metadata
     * still shows something true.
     *
     * Deliberately open: the gateway adds event kinds without the library
     * needing a release, and `documentRefFromMetadata` / `callRefFromMetadata`
     * are the readers that turn this back into something typed.
     */
    metadata?: Record<string, unknown>;
    /** ISO: the author changed the text after sending. Rendered as "(edited)". */
    editedAt?: string;
    /** ISO: the author (or a moderator) removed it. The row keeps its place and says so. */
    deletedAt?: string;
}

export declare function ChatPanel({ messages, localMessages, onSend, disabled, onTyping, typingUsers, emptyState, composer, currentUserId, reactionsFor, onToggleReaction, onReply, onForwardMessage, onCopyLink, onTogglePin, onEditMessage, onDeleteMessage, pinnedMessageIds, onJumpToMessage, highlightedMessageId, threaded, alignOwnMessages, documentEditors, callParticipants, agentRunStatus, onOpenRun, onOpenResult, onDecideRun, onReviewRun, onJoinCall, onOpenRecording, onCopyRecordingLink, onShareRecording, onDownloadRecording, onOpenRecordingTranscript, onManageRecordingExpiry, recordingStatus, onOpenDocument, renderMessageReferences, tone, showHeader, fill, onLoadMore, hasMore, loadingMore, onSendFiles, transfers, currentActor, onCancelTransfer, attachmentSrc, onOpenAttachment, acceptFiles, maxFileSize, onFileError, readReceipts: readReceiptsProp, readReceiptsEnabled, unreadFrom, emojis, }: ChatPanelProps): JSX.Element;

export declare interface ChatPanelProps {
    messages: ChatMessage[];
    /**
     * Viewer-only messages, rendered in timeline order among `messages` (by
     * timestamp) with a note that nobody else sees them and their `actions` as
     * small buttons under the card. The host owns them: ChatPanel never sends,
     * stores or removes one.
     */
    localMessages?: LocalChatMessage[];
    onSend: (content: string) => void;
    /**
     * Replaces the built-in input row entirely.
     *
     * The default composer is a plain field, which is the right default: it costs
     * no rich-text dependency and suits a support widget or a log console. A host
     * that wants formatting, @mentions, `:` emoji and staged attachments passes
     * `RichChatComposer` here (from `ui-components/social/rich-composer`, which
     * carries the tiptap peers) rather than this panel growing a second mode.
     *
     * When set, `onSend`, `onSendFiles`, `emojis` and the other composer-shaped
     * props are NOT used for input — the slot owns sending. They still apply to
     * the message list.
     */
    composer?: ReactNode;
    /**
     * The viewer, so their own reactions can be marked and their own messages
     * can offer edit/delete. Without it reactions render but cannot be toggled
     * meaningfully — "did I react?" is unanswerable.
     *
     * Also the identity that decides which in-flight `transfers` are the
     * viewer's own (compared against `ChatTransfer.uploader`).
     */
    currentUserId?: string;
    /** Reactions on one message. Omit to render no reaction UI at all. */
    reactionsFor?: (messageId: string) => readonly {
        emoji: string;
        userId: string;
        displayName?: string;
    }[];
    /** Toggles the viewer's reaction. Presence of this enables the react controls. */
    onToggleReaction?: (messageId: string, emoji: string) => void;
    /** Starts a quote-reply. Presence of this enables the reply control. */
    onReply?: (message: ChatMessage) => void;
    /**
     * Send this message to ANOTHER conversation. Presence of this enables the
     * Forward control; absent, nothing renders and every existing caller is
     * untouched.
     *
     * ## What it is offered on, and why the gate is tighter than Reply's
     *
     * Reply is withheld from system NOTICES only (`metadata.system`) — replying
     * to "Bob started a call" quotes an event back at the room. Forward is
     * withheld from notices for the same reason AND from three more shapes,
     * because a forward is not a quote: it relocates the message, and a message
     * that only means something where it is does not survive the trip.
     *
     *   * A CARD — document, recording, call, agent run, membership — is a
     *     handle on something scoped to the conversation it was posted in. Its
     *     buttons resolve against services the destination may not reach: Open
     *     on a document nobody there can read, Join on a call that is not that
     *     room's, a runId whose panel lives in another channel's side pane. The
     *     card would render and then do nothing, which is worse than not
     *     offering it. Note this is WIDER than Reply's gate on purpose: a
     *     document card a PERSON posted through the share picker is a message
     *     they chose to send, so replying to it means what it normally means —
     *     but forwarding it still moves a link that may not open at the far end.
     *   * An ATTACHMENT rides a download URL scoped to the transfer in its
     *     origin channel. Re-posting the descriptor hands the destination a file
     *     row that 403s. Re-uploading the bytes into the new conversation is a
     *     different feature and is not this one.
     *   * A message with no words — attachments only, or deleted — has nothing
     *     to carry.
     *
     * So: own, other people's, plain text, still there. The handler receives the
     * message that was CLICKED, never the thread root — unlike `onReply`, which
     * folds a reply back onto its root, forwarding is about these exact words.
     *
     * ## What the host should post
     *
     * The library does not send anything; the host owns the destination and the
     * post. What it must not do is strip the attribution — see `ForwardedFrom`.
     *
     * ## Why the button comes with it
     *
     * The second argument is the Forward BUTTON that was pressed. Picking a
     * destination is a small act started from one message's hover bar, and a
     * picker that dims the page and lands in its centre puts the choice
     * nowhere near the words it is about. Only the panel knows which row's
     * button this was, so it hands it over and the host anchors to it.
     * Existing handlers that take the message alone keep working.
     */
    onForwardMessage?: (message: ChatMessage, trigger: HTMLElement) => void;
    /**
     * Put a link to this message on the clipboard.
     *
     * The HOST builds it, not the panel: a link needs a route, and the library
     * has no router and no idea what a conversation's URL looks like. Omit and
     * the control does not render — the same rule every other action here
     * follows, since a Copy link that copies nothing is worse than none.
     */
    onCopyLink?: (message: ChatMessage) => void;
    /** Pin/unpin. Absent means this viewer may not pin — the control is hidden. */
    onTogglePin?: (message: ChatMessage) => void;
    /**
     * Change the text of one of the viewer's own messages. Present, the hover
     * bar offers Edit on own, undeleted, plain messages (never on cards or
     * notices) and the bubble becomes an editor in place. Resolves once the
     * server has it — the edited message arrives through the live frame.
     */
    onEditMessage?: (message: ChatMessage, text: string) => Promise<void> | void;
    /** Remove one of the viewer's own messages, after a confirm. Same gate as `onEditMessage`. */
    onDeleteMessage?: (message: ChatMessage) => Promise<void> | void;
    /** Message ids currently pinned in this channel. */
    pinnedMessageIds?: ReadonlySet<string>;
    /**
     * Scrolls to a quoted original. Omit and quotes render as a record of what
     * was said rather than a control that goes nowhere — which is the honest
     * shape when the original is outside the loaded window.
     */
    onJumpToMessage?: (messageId: string) => void;
    /**
     * People currently editing a document, keyed by documentId. Feeds the
     * document cards in the thread, which is where the difference between "a
     * document exists" and "two people are in it right now" shows up.
     */
    documentEditors?: (documentId: string) => readonly DocumentActivityEditor[];
    /**
     * Who is in a call right now, keyed by callId. Overrides the participant
     * list frozen into the message metadata, which is only a snapshot of the
     * moment the event was written — people join a call after it starts, and a
     * card showing the founding members while three more are inside is why you
     * would not bother joining.
     */
    callParticipants?: (callId: string) => readonly CallActivityParticipant[];
    /**
     * Where a `/doc` command's pipeline run is, keyed by runId. The message
     * metadata only knows the run was started; the card shows it moving.
     */
    agentRunStatus?: (runId: string) => AgentRunStatus | undefined;
    /** Open the run in the pipeline UI from an agent-run card. */
    onOpenRun?: (runId: string) => void;
    /** Open what a finished agent run produced — a side panel, a document, a link. */
    onOpenResult?: (result: AgentRunResult) => void;
    /** Approve or reject a run whose card says it is waiting for approval. */
    onDecideRun?: (runId: string, decision: AgentRunDecision) => void;
    /** Accept or reject the suggestions a finished agent edit left in the document. */
    onReviewRun?: (runId: string, decision: AgentRunReviewDecision, suggestion: Pick<AgentRunSuggestion, 'key' | 'documentId'>) => void;
    /**
     * Joins a live call from the thread. Omit when the viewer cannot join —
     * the card then renders as a record rather than a dead button.
     */
    onJoinCall?: (callId: string) => void;
    /** Opens a recording posted in the thread. Omit and the card is a record, not a button. */
    onOpenRecording?: (recordingId: string) => void;
    /** Puts a link to the recording on the clipboard (the card's ⋯ menu). */
    onCopyRecordingLink?: (recordingId: string) => void;
    /** Mints a share link for the recording. */
    onShareRecording?: (recordingId: string) => void;
    onDownloadRecording?: (recordingId: string) => void;
    onOpenRecordingTranscript?: (recordingId: string) => void;
    /** "View or change" on a recording card's expiry line. */
    onManageRecordingExpiry?: (recordingId: string) => void;
    /**
     * The recording's LIVE state — stage, thumbnail, expiry — overlaid on what
     * the message stamped. Read from the recordings API by the host.
     */
    recordingStatus?: (recordingId: string) => RecordingCardStatus | undefined;
    /** Opens a document announced in the thread. */
    onOpenDocument?: (documentId: string) => void;
    /**
     * Viewer-scoped attachments whose safe rendering belongs to the host.
     * Called for each durable message inside its bubble. The raw metadata is
     * never interpreted by the library; a host can resolve opaque references
     * for the current reader and return unavailable placeholders after revoke.
     */
    renderMessageReferences?: (message: ChatMessage) => ReactNode;
    /**
     * The message a jump just landed on. Highlighted so arriving somewhere in
     * the middle of a transcript says WHICH message you were sent to — without
     * it a jump scrolls and leaves you to guess. The caller clears it; the
     * panel does not own a timer.
     */
    highlightedMessageId?: string | null;
    /**
     * Nest replies under the message they answer, Teams-style, instead of
     * letting every message be a peer in one flat river.
     *
     * OPT-IN, and default false on purpose. Threading is a CHANNEL shape: a
     * post with answers hanging off it. A DM, a support widget, a call-side
     * chat and a log console are all rivers, and grouping in those surfaces
     * would indent messages that nobody thinks of as replies. Every existing
     * caller keeps the flat render untouched.
     *
     * What it does when on: a message whose `metadata.replyTo.messageId` names
     * another message IN THE LOADED LIST renders beneath it, indented behind a
     * rail. One level only — a reply to a reply joins the same thread rather
     * than opening a second indent, which is the rule Teams settled on and the
     * reason its channels stay readable. A message with no replies renders
     * exactly as it does with this off.
     */
    threaded?: boolean;
    /**
     * Draw your own messages right-aligned in their own bubble. True by
     * default, which is what a two-person chat wants.
     *
     * A CHANNEL does not: Teams left-aligns every post in a channel, author and
     * avatar and all, and only a 1:1 chat puts yours on the right. With
     * threading on, the right-aligned treatment actively fights the thread —
     * the rail marking "these replies belong to that post" runs down the far
     * left while your reply sits at the far right, and the two stop looking
     * related at all.
     */
    alignOwnMessages?: boolean;
    disabled?: boolean;
    onTyping?: (isTyping: boolean) => void;
    typingUsers?: string[];
    /**
     * What stands where the thread will be while there is none: an intro
     * ("This is the start of your conversation with Carol"), not the bare
     * "No messages yet" line. Sits where the first message will land, so the
     * eye is already in the right place.
     */
    emptyState?: ReactNode;
    /** Surface the panel renders on. 'light' (default) keeps the theme
     *  tokens; 'dark' swaps to white/alpha classes for dark call chrome
     *  (e.g. inside a FloatingPanel next to the call widget) — without it
     *  the message text renders dark-on-dark and disappears. Mirrors
     *  InviteCandidateList's tone seam. */
    tone?: 'light' | 'dark';
    /** Render the panel's own "Chat (n)" heading.
     *
     *  Default: TRUE standalone — every consumer in this repo (the DMs
     *  page's <SocialPanel>, <PanelsView>, <WrappedChatPanel>, the hook
     *  demos) drops the panel into a plain container and relies on it to
     *  name itself. Default FALSE inside a panel dock, which already names
     *  the region with its tab bar — that is where "Chat" appeared twice,
     *  ~40px apart. Pass it explicitly to override either way. */
    showHeader?: boolean;
    /** Fill the parent's height — the message list becomes the flexible
     *  region and the composer sits on the bottom edge — instead of sizing
     *  to a 200px-tall list inside a bordered card.
     *
     *  Default: FALSE standalone (the card is what the DMs page and the
     *  demos expect), TRUE inside a dock, whose column has a definite
     *  height that the body must match or leave a dead band behind. */
    fill?: boolean;
    /** Called when the reader asks for older messages. When present (and
     *  `hasMore` is not false) a "Load earlier messages" button renders
     *  above the first message. The panel preserves the reader's scroll
     *  position across the prepend — growing the list must not yank the
     *  viewport, which is the same bug class as the auto-scroll below. */
    onLoadMore?: () => void;
    /** Whether older messages exist. Defaults to true when `onLoadMore` is
     *  given; pass false once the whole history is loaded to retire the button. */
    hasMore?: boolean;
    /** Show the load-more button in a pending state. */
    loadingMore?: boolean;
    /**
     * Who has read up to where in this channel. Cursors, not per-message records.
     *
     * One entry PER PERSON, not per message: `readAt` is how far that person has
     * read, so "has Carol seen message M" is `readAt >= M.timestamp` and nothing
     * finer is knowable. There is no per-message record on the server and there
     * is not going to be one, which is why this panel draws a single line under
     * your newest message rather than a tick beside every message — a tick per
     * message would be asserting a fact the data does not contain.
     *
     * The viewer's own cursor may be in here; it is filtered out. Reading your
     * own message is not a receipt.
     */
    readReceipts?: readonly {
        userId: string;
        displayName?: string;
        readAt: string;
    }[];
    /**
     * False when the server does not keep receipts here. Default true.
     *
     * The server keeps them only where the roster is small and nameable — a DM,
     * or a closed channel of at most twenty — and reports them off everywhere
     * else. That is a privacy decision, not a loading state, so `false` renders
     * NOTHING: no greyed hint, no "receipts are off in large channels" note. A
     * channel where receipts are off looks like a channel that never had them,
     * because an explanation is itself a signal that somebody's reading is being
     * tracked somewhere.
     */
    readReceiptsEnabled?: boolean;
    /**
     * ISO timestamp: the boundary between what this person had read and what
     * they had not.
     *
     * Draws ONE line across the transcript immediately above the first message
     * at or after it — the line Teams and Slack both draw, and the only thing
     * that answers "where does new begin" when you come back to a busy channel.
     * The floating "N new messages ↓" pill answers a different question ("is
     * there more, below the fold") and both stay.
     *
     * This is the viewer's OWN cursor — the same per-conversation value that
     * powers "Mark as unread" in the rail — and is unrelated to `readReceipts`,
     * which is where OTHER people have read to.
     *
     * The panel FREEZES it (see `unreadBoundaryRef` in the body). Hand it the
     * cursor as it stood when this conversation was opened and keep passing it,
     * or stop passing it once the server marks the channel read — either way
     * the line stays where it was put for as long as the panel is mounted.
     */
    unreadFrom?: string;
    /**
     * Receives files the user dropped on the thread, pasted into the composer,
     * or picked with the paperclip. When absent, every attachment affordance is
     * suppressed — a panel wired to a transport with no upload service must not
     * advertise one.
     */
    onSendFiles?: (files: File[]) => void;
    /**
     * Transfers currently in flight IN THIS CHANNEL — including other people's.
     *
     * This is the prop that makes the feature feel live rather than
     * transactional. Rendering only your own uploads here would leave every
     * other participant staring at an unchanged thread until a file appears
     * fully-formed out of nowhere.
     */
    transfers?: ChatTransfer[];
    /**
     * The viewer's DISPLAY NAME. Legacy fallback for "whose transfer is this",
     * used only when a transfer carries no `uploader` id. Prefer
     * `currentUserId`: a display name is not an identity, and deciding ownership
     * from it gave two participants named "Alex" a cancel button on each other's
     * uploads.
     */
    currentActor?: string;
    onCancelTransfer?: (transferId: string) => void;
    /**
     * Resolves an attachment to a directly-renderable image source. The download
     * route is bearer-authenticated, so an `<img src>` pointed at the raw URL
     * 401s; the integration layer fetches with credentials and hands back an
     * object URL. Attachments with no resolved src fall back to their inline
     * preview.
     */
    attachmentSrc?: (attachment: ChatAttachment) => string | null | undefined;
    /** Invoked when the viewer opens/downloads an attachment. */
    onOpenAttachment?: (attachment: ChatAttachment) => void;
    /** MIME/extension filter for drops and the picker. Defaults to everything. */
    acceptFiles?: string;
    /** Per-file byte cap enforced before the transfer starts. */
    maxFileSize?: number;
    /** Reports a rejected drop/paste so the host can surface it. */
    onFileError?: (message: string) => void;
    /**
     * Emoji offered by the composer picker. Defaults to the library's full
     * searchable set — deliberately NOT a short service-side catalog. A fixed
     * server-blessed list is right for reactions that get aggregated and
     * persisted; it is wrong for typing, where an emoji is just a character and
     * an unavailable one reads as a missing feature.
     */
    emojis?: readonly string[];
}

export declare function ChatRoom({ idToken, roomId, roomName, onMessage }: ChatRoomProps): JSX.Element;

declare interface ChatRoomProps {
    idToken: string | null;
    roomId: string;
    roomName: string;
    onMessage: OnMessageFn_8;
}

/**
 * Looks the panel's renderer up and shows it inside the frame. With no
 * renderer for the kind the frame still opens — with an empty state that names
 * the kind, so a missing registration is a visible bug, not a blank split.
 */
export declare function ChatSidePanel({ panel, onClose, onOpenFullPage, subtitle, actions, expanded, onToggleExpanded, className, 'data-testid': testId }: ChatSidePanelProps): JSX.Element;

export declare interface ChatSidePanelApi {
    close: () => void;
    /** Present when the host gave the panel a full-page destination. */
    openFullPage?: () => void;
    /** Replaces the frame's title once the body knows the real one (the live document title). */
    setTitle: (title: string | null) => void;
}

/**
 * The chrome around anything open beside a conversation: one header row with
 * the title on the left and the way out on the right, and a body that fills
 * the rest and scrolls on its own.
 */
export declare function ChatSidePanelFrame({ title, subtitle, onClose, onOpenFullPage, actions, expanded, onToggleExpanded, children, className, 'data-testid': testId, }: ChatSidePanelFrameProps): JSX.Element;

export declare interface ChatSidePanelFrameProps {
    title: string;
    /** A second clause under the title — "12 results", "Edited by Grace". */
    subtitle?: string;
    onClose: () => void;
    /** Offers navigation to the full-page destination. */
    onOpenFullPage?: () => void;
    /** Additional controls beside the panel title. */
    actions?: ReactNode;
    /** Whether this panel currently occupies the conversation area. */
    expanded?: boolean;
    /** When supplied, offers an expand/restore control beside the title. */
    onToggleExpanded?: () => void;
    children: ReactNode;
    className?: string;
    'data-testid'?: string;
}

/** Sentence-cases a kind for the header when the ref carries no title: `agent-trace` → `Agent trace`. */
export declare function chatSidePanelKindLabel(kind: string): string;

export declare interface ChatSidePanelProps {
    panel: ChatSidePanelRef;
    onClose: () => void;
    /** Where the panel goes full-page, when it can. Receives the ref so one handler serves every kind. */
    onOpenFullPage?: (panel: ChatSidePanelRef) => void;
    /**
     * A second clause under the title — WHERE this panel came from.
     *
     * A panel beside a conversation gets its context free: the thread is right
     * there. One that takes the whole pane does not, and a bare document title
     * over a full-width canvas reads as a separate place the app navigated to
     * rather than something open inside a channel. This is where the host says
     * which conversation it belongs to.
     */
    subtitle?: string;
    /** Additional controls beside the panel title. */
    actions?: ReactNode;
    /** Whether this panel currently occupies the conversation area. */
    expanded?: boolean;
    /** When supplied, offers an expand/restore control beside the title. */
    onToggleExpanded?: () => void;
    className?: string;
    'data-testid'?: string;
}

export declare function ChatSidePanelProvider({ renderers, children }: ChatSidePanelProviderProps): JSX.Element;

export declare interface ChatSidePanelProviderProps {
    /** This layer's renderers by kind. Merged over any provider above; overrides by kind. */
    renderers?: ChatSidePanelRenderers;
    children: ReactNode;
}

/**
 * Something open BESIDE the conversation — a document, a search-result graph,
 * a run's trace. `kind` selects a renderer (see ChatSidePanelRegistry); `id`
 * is what that renderer opens. The library reserves `kind: 'document'` for the
 * `?doc=` URL form; every other kind is the host's.
 */
export declare interface ChatSidePanelRef {
    kind: string;
    id: string;
    /** A first guess at the header; a renderer may replace it once it knows more. */
    title?: string;
    /** Extra state the renderer needs — a query, a tab. Round-trips through the URL. */
    params?: Record<string, string>;
}

export declare type ChatSidePanelRenderer = (panel: ChatSidePanelRef, api: ChatSidePanelApi) => ReactNode;

export declare type ChatSidePanelRenderers = Record<string, ChatSidePanelRenderer>;

export declare interface ChatTransfer {
    transferId: string;
    /**
     * Who is sending, for DISPLAY ONLY. A human-facing name is not an identity:
     * two people can be called "Alex", and one person can rename themselves
     * mid-transfer. Never decide ownership from this field — use `uploader`.
     */
    actor: string;
    /**
     * Authed user id of the sender — the reliable identity for "is this mine".
     * Mirrors realtime-modules' `ChannelTransfer.uploader`. Optional because
     * hosts on older transports may not carry it; when it is absent the panel
     * falls back to the display-name comparison, which is the pre-existing
     * (wrong, but no worse than before) behaviour.
     */
    uploader?: string;
    name: string;
    size: number;
    transferred: number;
    phase: TransferPhase;
    contentType?: string;
    preview?: string;
    error?: string;
}

export declare const Checkbox: ForwardRefExoticComponent<CheckboxProps & RefAttributes<HTMLInputElement>>;

/** Modifier keys held during the click that toggled a checkbox. */
declare interface CheckboxModifiers {
    shiftKey: boolean;
    metaKey: boolean;
    ctrlKey: boolean;
    altKey: boolean;
}

export declare interface CheckboxProps {
    id?: string;
    /** Form field name, for label association and form submission. */
    name?: string;
    checked: boolean;
    /**
     * The new checked state, and the modifier keys held while it changed.
     *
     * `shiftKey` is the reason for the second argument: "tick this one" and
     * "tick everything from the last one to this one" are the same control with
     * shift held, and a callback carrying only the boolean cannot express the
     * second. Callers with a shift-select list therefore hand-rolled a native
     * <input type="checkbox"> — which is how a pipelines table ended up styling
     * itself with `accent-[var(--color-accent-solid)]`, a token that does not
     * exist. Existing callers taking one parameter are unaffected.
     *
     * The modifiers come from the CLICK, not the change event: a change event
     * carries no modifier state at all. Keyboard activation (space) also emits a
     * click, so it arrives here with every modifier false, which is correct —
     * there is no shift-space range-select convention on a checkbox.
     */
    onChange: (checked: boolean, modifiers: CheckboxModifiers) => void;
    /**
     * Mixed state — "some but not all selected". Rendered natively (the dash),
     * exposed to AT via aria-checked="mixed". Clicking a mixed checkbox
     * reports `true`, matching the native select-all convention.
     */
    indeterminate?: boolean;
    disabled?: boolean;
    /** Accessible name. Required when no visible <label> wraps this. */
    'aria-label'?: string;
    /**
     * Id of the element naming this checkbox. Prefer this over `aria-label` when
     * a visible label exists but cannot wrap the control (e.g. a generated form
     * that renders the label above a row of widgets) — a hand-written
     * `aria-label` is a copy that drifts from the words on screen.
     */
    'aria-labelledby'?: string;
    /** Id(s) of the help / error text describing this checkbox. */
    'aria-describedby'?: string;
    /**
     * Click pass-through. Row-selection checkboxes live inside clickable
     * rows/cards and need `e.stopPropagation()` so ticking the box doesn't
     * also open the row.
     */
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
    /** Key pass-through, for shift-range selection handling. */
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    /**
     * Control shape. See `CheckboxShape`. Default `square`.
     *
     * With `round`, `className` lands on the wrapper (the thing with a size and
     * a position) rather than on the hidden input, since the input no longer has
     * any paint of its own — which is also how the control is resized, e.g.
     * `className="h-[22px] w-[22px]"`.
     */
    shape?: CheckboxShape;
    /**
     * Semantic tone for `shape="round"` — the ring's border and its checked
     * fill. Ignored by `shape="square"`, which is the browser's own
     * `accent-primary` box. Default `info`.
     */
    tone?: ToneOrAlias;
    className?: string;
    'data-testid'?: string;
}

/**
 * `square` is the native `accent-primary` box (default, unchanged). `round` is
 * the tone-coloured ring that fills solid and shows a tick when checked —
 * the "status toggle" shape a task list uses, where the colour carries the
 * state (amber pending, blue acknowledged, green done) and the control is
 * round so it reads as a status rather than a form field.
 *
 * This is still a real `<input type="checkbox">`: the native control is
 * transparent and stretched over the painted ring, so focus, space-to-toggle,
 * label association and form submission all behave exactly as they do for the
 * square shape. Hosts that hand-rolled this shape used a `<button>` and lost
 * every one of those.
 */
declare type CheckboxShape = 'square' | 'round';

/** A tick: "done", "added". Since 2.389.6. */
export declare function CheckIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function ChecklistEditorRenderer({ section, fragment, ydoc, provider, user, editable, onAddItem, onUpdateItem, onRemoveItem, onUpdateCursorInfo, extensions, editorComponent, }: SectionRendererProps): JSX.Element;

export declare const checklistFieldType: FieldTypeDefinition;

/** A ticked box: "checklist". Since 2.386.5. */
export declare function ChecklistIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare interface ChecklistItem {
    id: string;
    text: string;
    done: boolean;
    pending?: boolean;
}

export declare function ChecklistReaderRenderer({ section, fragment, ydoc, provider, onUpdateItem, onNavigateToEditor, extensions, editorComponent, }: SectionRendererProps): JSX.Element;

export declare function ChecklistSection({ title, items, onToggle, onAdd, onEdit, onRemove, onMove, readOnlyReason, emptyLabel, addPlaceholder, first, variant, className, 'data-testid': testId, }: ChecklistSectionProps): JSX.Element;

export declare interface ChecklistSectionProps {
    title?: string;
    items: ChecklistItem[];
    onToggle?: (id: string, done: boolean) => void;
    onAdd?: (text: string) => void;
    onEdit?: (id: string, text: string) => void;
    onRemove?: (id: string) => void;
    onMove?: (id: string, toIndex: number) => void;
    readOnlyReason?: string;
    emptyLabel?: string;
    addPlaceholder?: string;
    first?: boolean;
    /**
     * `heading` (default since 2.386.15): a 16px sentence-case heading, 14px
     * rows, no tally, and "Add a criterion" as a quiet control that opens the
     * field only when asked — a work item's Brief. `label`: the small uppercase
     * caption with the tally and an always-open add field, for a side panel.
     */
    variant?: 'label' | 'heading';
    className?: string;
    'data-testid'?: string;
}

/** A chevron. `dir` is where it points. */
export declare function ChevronIcon({ size, dir, ...rest }: GlyphProps & {
    dir?: 'up' | 'down' | 'left' | 'right';
}): JSX.Element;

export declare function Chip({ tone, palette, size, solid, translucent, mono, dot, uppercase, icon, children, title, className, style, 'data-testid': testId, 'aria-label': ariaLabel, href, external, onRemove, removeLabel, removeTestId, removeIcon, }: ChipProps): JSX.Element;

/**
 * `tone` was already spoken for by the semantic scale, so the surface-family
 * axis is `palette` here. Same idea as `TitledFrame`'s `tone`, different word
 * only because renaming the seven-year-old `tone` prop would break every one
 * of Chip's several hundred call sites.
 */
export declare type ChipPalette = SurfaceTone;

export declare interface ChipProps {
    tone?: ChipTone;
    /**
     * Colour family. `surface` (default) follows the host theme; `code` paints
     * in the permanently-dark terminal palette, for chips inside a log console,
     * debugger or terminal pane.
     */
    palette?: ChipPalette;
    size?: 'md' | 'sm' | 'xs';
    /** Solid fill (dark bg + white text) instead of soft tint. */
    solid?: boolean;
    /**
     * Translucent fill — the tone colour at 15% opacity behind text in that
     * same colour, rather than the soft variant's opaque `-bg` token. Matches
     * the pipeline debugger's status badges, which sit directly on
     * `code-bg`/other tinted chrome and don't want their own opaque card.
     * Takes precedence over `solid` if both are set.
     */
    translucent?: boolean;
    /** Monospace font — for count badges. */
    mono?: boolean;
    /** Indicator dot. 'static' = filled circle, 'pulse' = filled circle
     *  with an animated outer ping (matches Badge variant="pulse"). */
    dot?: 'static' | 'pulse';
    /** Uppercase the label with letter-spacing — the "REC" / "LIVE"
     *  pattern common to status pills. */
    uppercase?: boolean;
    /** Optional leading icon (SVG element). Sized by the chip's `size`. */
    icon?: ReactNode;
    children: ReactNode;
    title?: string;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
    'aria-label'?: string;
    /** When set, the chip renders as an `<a href>` instead of a `<span>`,
     *  carrying the same classes. `rel="noopener noreferrer"` is always
     *  applied — see `external` for `target="_blank"`. */
    href?: string;
    /** Only meaningful with `href`. Opens in a new tab (`target="_blank"`),
     *  matching `Link`'s `external` prop. */
    external?: boolean;
    /**
     * Renders a dismiss control inside the chip. A removable chip is a token in
     * a multi-select (approvers, tags, filters), and every host that needed one
     * hand-rolled the same borderless `<button>` — `Button`'s boxed variants
     * were too heavy for a 12px glyph in a pill and `IconButton`'s smallest size
     * is a 24px square. This uses `Button variant="link"`, which is exactly the
     * inline, unpadded, font-size-inheriting control that shape wants.
     */
    onRemove?: () => void;
    /**
     * Accessible name for the remove control. Defaults to `Remove`, which is
     * fine for a lone chip and useless in a row of eight — pass
     * `removeLabel={`Remove ${name}`}` whenever the chip is one of several.
     */
    removeLabel?: string;
    /** `data-testid` on the remove control. */
    removeTestId?: string;
    /** Glyph inside the remove control. Defaults to a multiplication sign. */
    removeIcon?: ReactNode;
}

/** @see Tone — the library-wide semantic tone scale. */
export declare type ChipTone = ToneOrAlias;

/** The list. Rows divide themselves; the list draws the outer rule. */
export declare function ChoiceList({ children, className, 'data-testid': testId }: ChoiceListProps): JSX.Element;

export declare interface ChoiceListProps {
    children: ReactNode;
    className?: string;
    'data-testid'?: string;
}

/** One target inside an open disclosure: indented under the row's glyph. */
export declare function ChoiceOption({ icon, label, onSelect, disabled, 'data-testid': testId }: ChoiceOptionProps): JSX.Element;

export declare interface ChoiceOptionProps {
    icon?: ReactNode;
    label: string;
    onSelect: () => void;
    disabled?: boolean;
    'data-testid'?: string;
}

export declare function ChoiceRow({ icon, title, description, onSelect, children, open: openProp, onOpenChange, disabled, disabledReason, busy, selected, 'data-testid': testId, }: ChoiceRowProps): JSX.Element;

export declare interface ChoiceRowProps {
    icon?: ReactNode;
    title: string;
    /** One line: what choosing this does. */
    description?: string;
    /** An action row: pressing it does the thing. */
    onSelect?: () => void;
    /**
     * A disclosure row: pressing it opens `children` beneath. Controlled when
     * `open` is given, otherwise the row keeps its own state.
     */
    children?: ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    disabled?: boolean;
    /** Why it is disabled, as the row's tooltip. */
    disabledReason?: string;
    /** The row is doing what it was asked; it reads as pressed and takes no more presses. */
    busy?: boolean;
    /**
     * One of several: the row is a radio (`role="radio"`, `aria-checked`) and a
     * selection mark leads it in place of the icon tile. Undefined for an action row.
     */
    selected?: boolean;
    'data-testid'?: string;
}

export declare function CircularIconToggle({ on, iconOn, iconOff, 'aria-label': ariaLabel, offTone, size, disabled, className, ...rest }: CircularIconToggleProps): JSX.Element;

export declare interface CircularIconToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    /** Whether the underlying feature (mic / cam / share) is currently on. */
    on: boolean;
    /** Icon rendered when `on === true`. */
    iconOn: ReactNode;
    /** Icon rendered when `on === false`. */
    iconOff: ReactNode;
    /** Required for screen readers — describes the toggle target
     *  ("Microphone", "Camera"). The component derives the on/off state
     *  via aria-pressed. */
    'aria-label': string;
    /** Tone when in the OFF state. Defaults to 'danger' (red soft) to
     *  match the Google Meet convention. */
    offTone?: CircularIconToggleTone;
    size?: CircularIconToggleSize;
}

export declare type CircularIconToggleSize = 'sm' | 'md' | 'lg';

export declare type CircularIconToggleTone = 'neutral' | 'danger';

/** An X: "close", "dismiss". */
export declare function CloseIcon({ size, ...rest }: GlyphProps): JSX.Element;

/**
 * `TONE_SOFT` in the code family. One background for all tones — the code
 * palette carries meaning in the foreground, the way syntax highlighting
 * does; tinted backgrounds behind text this dark read as noise.
 */
export declare const CODE_TONE_SOFT: Record<Tone, string>;

/**
 * `TONE_SOLID` in the code family. Text is `code-bg` rather than white:
 * these accents are pastels, and white on a pastel fails contrast.
 */
export declare const CODE_TONE_SOLID: Record<Tone, string>;

/** `TONE_SOLID_BG` in the code family — swatches, dots, legend keys. */
export declare const CODE_TONE_SOLID_BG: Record<Tone, string>;

/** `TONE_TEXT` in the code family — labels and icons on an untinted surface. */
export declare const CODE_TONE_TEXT: Record<Tone, string>;

export declare function CodeBlock({ code, language, theme, copyButton, showLineNumbers, className, style, 'data-testid': testId, ariaLabel, }: CodeBlockProps): JSX.Element;

export declare type CodeBlockLanguage = 'tsx' | 'ts' | 'jsx' | 'js' | 'json' | 'bash' | 'sh' | 'text';

export declare interface CodeBlockProps {
    code: string;
    language?: CodeBlockLanguage;
    theme?: CodeBlockTheme;
    copyButton?: boolean;
    showLineNumbers?: boolean;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
    ariaLabel?: string;
}

/**
 * `light` / `dark` follow the app theme (`dark` is the INVERSE surface, so it
 * flips to a light box in dark mode). `console` is the theme-invariant code
 * family (`--color-code-*`): use it for a block sitting inside a log console,
 * terminal or other permanently-dark panel, where an inverse box would read
 * as a light slab on the dark panel in dark mode.
 */
export declare type CodeBlockTheme = 'dark' | 'light' | 'console';

export declare function CodeEditor({ value, onChange, language: _language, // Phase 1: accepted but not applied yet
    placeholder, minLines, maxLines, readOnly, variables, 'aria-label': ariaLabel, }: CodeEditorProps): JSX.Element;

export declare interface CodeEditorProps {
    value: string;
    onChange: (next: string) => void;
    /** Hint for future syntax highlighting. Phase 1: purely cosmetic / no-op. */
    language?: 'jsonpath' | 'javascript' | 'template' | 'plain';
    placeholder?: string;
    /** Minimum visible lines. Default 4. */
    minLines?: number;
    /** Maximum visible lines before the editor starts scrolling. Default 20. */
    maxLines?: number;
    readOnly?: boolean;
    /** Available context variables — rendered as clickable insert pills. */
    variables?: string[];
    'aria-label'?: string;
}

/** Angle brackets around a slash: source, "the developer-facing thing". */
export declare function CodeIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function CodeInput({ length, onComplete, error, disabled, autoFocus, }: CodeInputProps): JSX.Element;

export declare interface CodeInputProps {
    length?: number;
    onComplete: (code: string) => void;
    error?: string | null;
    disabled?: boolean;
    autoFocus?: boolean;
}

/** Minimal provider shape needed by awareness. */
declare interface CollaborationProvider {
    awareness: Awareness;
}

export declare function CollapsedIconStrip({ connectionState, onExpand, onDocuments, onPipelines, onObservability, active, headerHeight, className, 'data-testid': testId, }: CollapsedIconStripProps): JSX.Element;

export declare interface CollapsedIconStripProps {
    connectionState: ConnectionState_3;
    /**
     * Opens the full sidebar. Omit when the surface has no expanded sidebar to
     * show: the strip keeps its header row but drops the expand button, so it
     * never offers a column that would open empty.
     */
    onExpand?: () => void;
    onDocuments?: () => void;
    onPipelines?: () => void;
    onObservability?: () => void;
    /** The section the window is in. */
    active?: CollapsedIconStripSection | null;
    /**
     * The app header's height, when the strip starts at the top of the window
     * beside it (AppShell `sidebarFullHeight`): the expand button is centred in
     * that row, and the sections start below it. Omit when the strip hangs
     * below the header.
     */
    headerHeight?: number;
    className?: string;
    'data-testid'?: string;
}

export declare type CollapsedIconStripSection = 'documents' | 'pipelines' | 'observability';

export declare function CollapsibleSection({ title, defaultOpen, badge, actions, children, className, storageKey, density, 'data-testid': testId, }: CollapsibleSectionProps): default_2.JSX.Element;

export declare interface CollapsibleSectionProps {
    /**
     * The header label. A node, not a string: real section headers pair a name
     * with something that qualifies it — an id slug, a status dot, a count —
     * and a `string` prop forces every such caller to either drop the qualifier
     * or hand-roll its own accordion, which is what this component exists to
     * stop. It is only ever rendered, never measured or compared.
     */
    title: default_2.ReactNode;
    defaultOpen?: boolean;
    /** Optional element rendered on the right side of the header (e.g. a count chip). */
    badge?: default_2.ReactNode;
    /**
     * Interactive controls for the header row — a Terminate button, a menu.
     * Rendered BESIDE the header button, never inside it: the header is a
     * `<button>`, and a button inside a button is invalid HTML that React
     * warns about on every render. `badge` stays for inert content.
     */
    actions?: default_2.ReactNode;
    children: default_2.ReactNode;
    className?: string;
    /** If provided, the open state is persisted to localStorage under this key. */
    storageKey?: string;
    /**
     * `'compact'` tightens the header's padding, drops it to `text-xs`, and
     * shrinks the chevron — for a section nested inside an already-dense
     * panel where the default's `text-sm` / `px-4 py-3` header reads
     * oversized next to its neighbours. Default: unchanged.
     */
    density?: 'default' | 'compact';
    /** Lands on the header button — the thing tests and contrast probes read. */
    'data-testid'?: string;
}

export declare function CollapsibleSidebar({ connectionState, onDisconnect, onReconnect, onCollapse, presenceUsers, currentClientId, currentChannel, activityEvents, userId, documents, onOpenDocument, pipelines, onOpenPipeline, onSeeAllPipelines, videoSlot, }: CollapsibleSidebarProps): JSX.Element;

declare interface CollapsibleSidebarProps {
    connectionState: ConnectionState_2;
    onDisconnect: () => void;
    onReconnect: () => void;
    onCollapse?: () => void;
    presenceUsers: PresenceUser_3[];
    currentClientId: string;
    currentChannel: string;
    activityEvents: ActivityEvent[];
    userId: string;
    documents: DocumentInfo[];
    onOpenDocument: (id: string) => void;
    pipelines?: PipelineSidebarEntry[];
    onOpenPipeline?: (id: string) => void;
    onSeeAllPipelines?: () => void;
    videoSlot?: React.ReactNode;
}

export declare const ColorInput: ForwardRefExoticComponent<ColorInputProps & RefAttributes<HTMLInputElement>>;

export declare interface ColorInputProps {
    /** Hex color value, e.g. "#3b82f6". */
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    /** Accessible name. Required when no visible <label> wraps this. */
    'aria-label'?: string;
    className?: string;
    'data-testid'?: string;
}

export declare const colors: {
    readonly primary: string;
    readonly primaryDark: string;
    readonly primaryLight: string;
    readonly danger: string;
    readonly dangerLight: string;
    readonly success: string;
    readonly successLight: string;
    readonly warning: string;
    readonly warningLight: string;
    readonly info: string;
    readonly infoLight: string;
    readonly textPrimary: string;
    readonly textSecondary: string;
    readonly textMuted: string;
    readonly textInverse: string;
    readonly border: string;
    readonly borderLight: string;
    readonly background: string;
    readonly surface: string;
    readonly surfaceRaised: string;
    readonly surfaceOverlay: string;
};

export declare function ColorSchemeProvider({ children }: {
    children: React.ReactNode;
}): JSX.Element;

export declare interface Column<T> {
    key: string;
    header: string;
    render?: (item: T) => React.ReactNode;
    sortable?: boolean;
    width?: string;
    align?: 'left' | 'right' | 'center';
}

export declare interface Command {
    id: string;
    label: string;
    group?: string;
    hint?: string;
    keywords?: string[];
    icon?: ReactNode;
    /** Display-only shortcut glyphs rendered right-aligned in the item. */
    shortcut?: string[];
    /**
     * Active global hotkey that invokes `run()` without opening the palette.
     * Format: `[mod+|cmd+|meta+|ctrl+|shift+|alt+]<key>`. `mod` resolves to
     * cmd on macOS and ctrl elsewhere. The key portion is matched against
     * `KeyboardEvent.key` lowercased — so `?`, `/`, `k`, `arrowdown` all
     * work; multi-key chords are not supported in v1.
     */
    hotkey?: string;
    /** Visibility predicate — when returns false, the command is filtered out. */
    when?: () => boolean;
    /** Action invoked when the item is selected. */
    run: () => void | Promise<void>;
}

export declare function CommandPalette({ placeholder, emptyState, className, }?: CommandPaletteProps): JSX.Element;

export declare interface CommandPaletteController {
    open: () => void;
    close: () => void;
    toggle: () => void;
    isOpen: boolean;
    query: string;
}

export declare function CommandPaletteHint({ className, label, size }?: CommandPaletteHintProps): JSX.Element;

export declare interface CommandPaletteHintProps {
    className?: string;
    /** The word after the shortcut. Default "Search". Since 2.385.0. */
    label?: string;
    /**
     * `sm` (default) is the quiet 24px chip; `md` is a 36px top-bar button that
     * sits level with the bar's other controls (the Documents redesign's
     * "⌘K Search"). Since 2.385.0.
     */
    size?: 'sm' | 'md';
}

export declare interface CommandPaletteProps {
    placeholder?: string;
    emptyState?: ReactNode;
    className?: string;
}

export declare function CommandPaletteProvider({ commands, getDynamicCommands, recentsKey, recentsLimit, children, }: CommandPaletteProviderProps): JSX.Element;

export declare interface CommandPaletteProviderProps {
    /**
     * Static command list. Optional: pure-registry consumers can pass
     * nothing and have pages contribute commands via `useRegisterCommand`.
     */
    commands?: Command[];
    /**
     * Synchronous derivation hook for query-dependent commands (URL paste,
     * UUID detection, etc.). Results are merged with the static `commands`
     * list before cmdk runs its own filter.
     */
    getDynamicCommands?: (query: string) => Command[];
    /**
     * Future hook — currently the keybinding is always cmd/ctrl + K. Accepted
     * for API forward-compat; ignored in v1.
     */
    toggleShortcut?: string[];
    /**
     * localStorage key for the most-recently-used command id list. Pass
     * `null` to disable persistence (useful for tests and SSR). Defaults
     * to `'cui:command-palette:recents'`.
     */
    recentsKey?: string | null;
    /** Maximum number of recent command ids to remember. Default: 5. */
    recentsLimit?: number;
    children: ReactNode;
}

/** A flat comment as stored in Y.js. */
export declare interface CommentData {
    id: string;
    text: string;
    userId: string;
    displayName: string;
    color: string;
    timestamp: string;
    parentCommentId: string | null;
    resolved?: boolean;
    resolvedBy?: string;
    resolvedAt?: string;
}

/**
 * A speech bubble with two lines of text: comments ON something — a thread
 * anchored to a page or a slide — as opposed to `ChatIcon`'s conversation.
 * The two sit side by side on the documents rail (the workbench's Comments
 * entry beside the Conversation panel), so they must not be the same glyph;
 * `QuoteIcon` was tried there and read as "55" at 14px. Since 2.384.2.
 */
export declare function CommentIcon({ size, ...rest }: GlyphProps): JSX.Element;

declare interface CommentItem {
    postId: string;
    commentId: string;
    authorId: string;
    content: string;
    parentCommentId?: string;
    createdAt: string;
    _fadeIn?: boolean;
}

export declare function CommentList({ title, comments, total, onViewAll, now, emptyLabel, max, first, variant, className, 'data-testid': testId, }: CommentListProps): JSX.Element;

export declare interface CommentListItem {
    id: string;
    author: {
        id: string;
        name: string;
        avatarUrl?: string;
    };
    role?: string | null;
    createdAt: string | number | Date;
    text: string;
}

export declare interface CommentListProps {
    title?: string;
    comments: CommentListItem[];
    /** Total in the full discussion, when larger than what is passed. */
    total?: number;
    onViewAll?: () => void;
    /** Clock for relative times (ms since epoch). Default Date.now(). */
    now?: number;
    emptyLabel?: string;
    /** Show at most this many comments. */
    max?: number;
    first?: boolean;
    /**
     * `heading` (default since 2.386.15): a 16px heading, 32px avatars, 14px
     * text, "View all" quiet until hover — a work item's Brief. `label`: the
     * small caption and 28px avatars, for a side panel.
     */
    variant?: 'label' | 'heading';
    className?: string;
    'data-testid'?: string;
}

/** A comment with nested replies, assembled client-side. */
export declare interface CommentThread extends CommentData {
    replies: CommentThread[];
}

/**
 * Inline comment thread for a single post.
 *
 * Safe to keep mounted across `postId` / `roomId` changes: the underlying
 * `useComments` clears the thread and cancels the in-flight request when
 * either id changes, so a caller does not need a `key` to avoid seeing the
 * previous post's comments.
 */
export declare function CommentThreadPanel({ idToken, roomId, postId, onMessage }: CommentThreadProps): JSX.Element;

declare interface CommentThreadProps {
    idToken: string | null;
    roomId: string | null;
    postId: string | null;
    onMessage: OnMessageFn;
}

/**
 * Compile + link, returning null on any failure. Shaders are detached and
 * deleted immediately after linking — the program holds what it needs.
 */
export declare function compileProgram(gl: WebGLContextLike, vertex: string, fragment: string): WebGLProgram | null;

export declare interface ComposerArgumentItem {
    /** Stable identity — this is what travels to the host, not the label. */
    id: string;
    label: string;
    /** Shown on the right of the row: where it lives, who owns it. */
    hint?: string;
    /** A glyph for the row, e.g. `📄`. */
    icon?: string;
}

export declare interface ComposerCommand {
    /** The leading token, e.g. `/doc`. Matched case-insensitively at the start of the draft. */
    trigger: string;
    /** What it does — "Edit the open document with Haiku". */
    label: string;
    /** A second clause: what it needs, or what will happen. */
    hint?: string;
    /** True when the command cannot run right now (no document open); the bar says why via `hint`. */
    disabled?: boolean;
    /** The long form, shown as a tooltip on the bar: what will happen, step by step. */
    description?: string;
    /**
     * A glyph before the trigger in the docked card's command chip
     * (`modeControl="menu"`) — a branch mark for `/workflow`. Since 2.385.0.
     */
    icon?: ReactNode;
    /** What the command acts on, offered as a second menu once the trigger is typed. */
    argument?: ComposerCommandArgument;
}

export declare interface ComposerCommandArgument {
    /** Shown in the status bar while the argument is empty — "type a document name". */
    placeholder?: string;
    /**
     * Resolves the argument menu from the text after the trigger. A promise is
     * supported (and debounced ~120ms) so a host can hit an index rather than
     * filter a preloaded array; the previous list stays up while a new one is
     * in flight.
     */
    search: (query: string) => ComposerArgumentItem[] | Promise<ComposerArgumentItem[]>;
    /**
     * What picking a row does. `'execute'` clears the draft and calls
     * `onCommand` — the pick WAS the message. `'insert'` (the default) writes the
     * label into the draft so the person can keep typing, and the pick travels
     * on send as `ComposedMessage.command.argument`.
     */
    onPick?: (item: ComposerArgumentItem) => 'execute' | 'insert';
}

/**
 * The text after a matched command's trigger and its one separator:
 * `/doc Roadmap` → `Roadmap`, `/doc` → ``. Leading whitespace beyond the
 * separator is kept, so callers replacing the argument know its exact extent.
 */
export declare function composerCommandArgumentText(draft: string, command: ComposerCommand): string;

/** What the composer is for, right now. */
declare type ComposerMode = 'chat' | 'agent' | 'terminal';

export declare interface ComposerReference {
    /** Stable across re-renders; what `onRemove` is called with. */
    id: string;
    /** Already composed by the host — "Sprint review · v2 · Slide 4". */
    label: string;
    /** The referenced thing's own glyph, when it has one. */
    icon?: string;
    /** Hover text; the label itself when absent. */
    title?: string;
    /**
     * Makes the chip a menu trigger — label + chevron — that opens these
     * choices ("This guide", "This guide + sources", "No context"). A chip with
     * a menu draws NO remove button even when `onRemove` is passed: choosing
     * "none" is one of the menu's items, not an ×. Since 2.389.0.
     */
    menu?: readonly DropdownMenuSection[];
    /** Accessible name of the menu trigger. Default: the label. Since 2.389.0. */
    menuLabel?: string;
    /**
     * The chip's leading mark when it has no `icon`. `icon` (default): the
     * document glyph. `dot`: a small brand-coloured dot — "● Observability
     * Platform", "● This work item": the draft is about a scope, not a file.
     * Ignored when `icon` is set. Since 2.390.0.
     */
    marker?: 'icon' | 'dot';
}

export declare function ComposerReferences({ references, onRemove, removeLabel, className, size, 'data-testid': testId, }: ComposerReferencesProps): JSX.Element | null;

export declare interface ComposerReferencesProps {
    references: readonly ComposerReference[];
    /** Omit to render the chips without a remove control. */
    onRemove?: (id: string) => void;
    /** Accessible name for a chip's remove button. */
    removeLabel?: (reference: ComposerReference) => string;
    className?: string;
    /** Chip type. `xs` (default) is the 11px chip of a chat composer; `sm` is the 12px chip of a docked editor card (2.377.0). */
    size?: 'xs' | 'sm' | 'md';
    'data-testid'?: string;
}

export declare interface ComposerSuggestion {
    id: string;
    /** Why this is being offered — shown above the title on the card. */
    reason: string;
    title: string;
    /** Fills the prompt field when chosen. */
    prompt: string;
    /** Fills the title field. Defaults to the suggestion's own title. */
    fillTitle?: string;
    label?: string;
    tone?: Tone;
    meta?: ReactNode;
    context?: string;
}

export declare interface ConditionNodeData {
    type: 'condition';
    /** JSONPath or boolean expression evaluated over context. */
    expression: string;
    /** UI label shown on the node. */
    label?: string;
}

/** "No prior runs" for n = 0, else "Low confidence · Based on 2 runs". */
export declare function confidenceNote(sampleSize: number): string;

/** Sample size → confidence: 0 none, 1–2 low, 3–5 medium, more than 5 high. */
export declare function confidenceOf(sampleSize: number): RunEstimateConfidenceLevel;

export declare function ConfirmDialog({ open, onConfirm, onCancel, title, body, confirmLabel, cancelLabel, confirmDisabled, tone, children, }: ConfirmDialogProps): JSX.Element;

export declare interface ConfirmDialogProps {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    title?: string;
    body?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    confirmDisabled?: boolean;
    /** Visual tone for the confirm button. Defaults to 'info' (primary blue). */
    tone?: 'destructive' | 'caution' | 'info';
    /** Preview slot — extra content rendered between body and footer. */
    children?: React.ReactNode;
}

export declare interface ConflictField {
    /** Field key (path within the typed document — e.g. "title", "body.text"). */
    field: string;
    /** Value as it currently exists in the source system. */
    sourceValue: unknown;
    /** Value as it currently exists in the platform CRDT. */
    platformValue: unknown;
    /** Optional auto-merge proposal (if the engine produced one). */
    mergedValue?: unknown;
    /**
     * Who made the source-side edit, when the connector can tell us.
     *
     * Additive and optional because most connectors CANNOT tell us: a Drive
     * revision carries an editor, an S3 object generally does not. Absent means
     * "unattributed", and the review UI says exactly that rather than crediting
     * the change to the source system — "Contracts (Google Drive)" is where the
     * change came from, not who made it, and showing a system where a person
     * belongs is what made this queue unreadable.
     */
    changedBy?: string;
    /**
     * Human-readable location of this field in the document, outermost first —
     * e.g. `['Payment terms']`. The `field` path above is a machine key; this is
     * where a reader would look on the page. Optional: connectors that only know
     * the field path omit it, and the UI falls back to showing the path.
     */
    path?: string[];
}

export declare interface ConflictResolution {
    /** Which side wins as a whole — used when fieldChoices is empty. */
    pick: ConflictSide;
    /**
     * Optional per-field override map. Keys are field paths matching
     * ConflictField.field; values are 'source' | 'platform' | 'merged' or a
     * literal value supplied by the operator.
     */
    fieldChoices?: Record<string, ConflictSide | {
        custom: unknown;
    }>;
    /** Operator note explaining the pick. */
    note?: string;
}

export declare type ConflictSide = 'source' | 'platform' | 'merged';

export declare function ConnectionPill({ state, tone, compact, withLabel, labels, action, className, 'data-testid': testId, }: ConnectionPillProps): JSX.Element;

export declare interface ConnectionPillProps {
    state: ConnectionState;
    /**
     * Colour family. `surface` (default) follows the host theme; `code` paints
     * in the permanently-dark terminal palette.
     *
     * A wrapper `className` cannot substitute: the label and dot colours come
     * from the per-state map below, on children the caller never sees.
     */
    tone?: ConnectionPillTone;
    /** Dot-only rendering — no label text. Default false. */
    compact?: boolean;
    /** Render the text label next to the dot. Default true. Set false for dot-only. */
    withLabel?: boolean;
    /** Override label text per state (e.g. localized strings). */
    labels?: Partial<Record<ConnectionState, string>>;
    /**
     * Optional action rendered inside the pill — "Reconnect" when the socket is
     * down, a host-defined control otherwise.
     *
     * A status pill is where people look when the connection misbehaves, so it
     * is also where they reach for the fix. Without this the recovery control
     * has to live somewhere else in the chrome, and in practice it ends up
     * nowhere: the host keeps threading an `onReconnect` down to a component
     * that no longer renders it.
     *
     * The host decides the label and whether there is an action at all, because
     * the sensible control is state-dependent and that policy belongs to the
     * product, not to the pill. Ignored when `compact` — a dot has no room for
     * a verb.
     */
    action?: {
        label: string;
        onClick: () => void;
        disabled?: boolean;
        'data-testid'?: string;
    };
    className?: string;
    'data-testid'?: string;
}

/** @see SurfaceTone — which colour family the pill paints in. */
export declare type ConnectionPillTone = SurfaceTone;

/** Connection lifecycle states */
export declare type ConnectionState = 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'disconnected';

declare type ConnectionState_2 = 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'disconnected';

declare type ConnectionState_3 = 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'disconnected';

declare type ConnectionState_4 = 'connected' | 'connecting' | 'disconnected';

/** @deprecated Use `ConnectionPill` from `/shared`. Alias retained for one minor. */
export declare function ConnectionStatus(props: ConnectionStatusProps): JSX.Element;

/** @deprecated Use `ConnectionPill` from `/shared`. Alias retained for one minor. */
declare type ConnectionStatusProps = Pick<ConnectionPillProps, 'state'>;

export declare function ConsentPage({ clientName, scopes, redirectUri, onAuthorize, onDeny, logoUrl, }: ConsentPageProps): JSX.Element;

export declare interface ConsentPageProps {
    clientName: string;
    scopes: string[];
    redirectUri?: string;
    onAuthorize: () => Promise<void>;
    onDeny: () => Promise<void>;
    logoUrl?: string;
}

export declare const ConsoleSurfaceContext: Context<ConsoleSurfaceState | null>;

/**
 * What an enclosing console surface (a `ChatColumnBackdrop` in Agent/Terminal)
 * is already painting. A composer inside one reads this and does NOT start a
 * second star field in the same region: it keeps its tint and border and lets
 * the column's field show through. `working` is the column's "a loop is
 * mid-turn" cue, so a composer can follow it without the host passing it twice.
 */
export declare interface ConsoleSurfaceState {
    /** True while the enclosing surface is painting its sky. */
    painting: boolean;
    /** True while the enclosing surface shows its working density. */
    working: boolean;
}

export declare function ConsultCard({ question, context, origin, askedAt, status, answer, answeredBy, onAnswer, answerPlaceholder, busy, footer, flush, className, 'data-testid': testId, }: ConsultCardProps): JSX.Element;

export declare interface ConsultCardProps {
    /** The agent's question. */
    question: string;
    /** What the agent was doing when it asked. */
    context?: string;
    /** Where it came from — repo, box, session. Rendered as quiet chips. */
    origin?: readonly string[];
    /** ISO timestamp or preformatted "asked 4m ago" string. */
    askedAt?: string;
    status: 'pending' | 'answered' | 'expired' | 'withdrawn';
    answer?: string;
    answeredBy?: string;
    /** Submit an answer. Only rendered while status is 'pending'. */
    onAnswer?: (answer: string) => void;
    answerPlaceholder?: string;
    busy?: boolean;
    /**
     * Extra footer content, e.g. a link to the session. Rendered in EVERY
     * state: beside the send button while answerable, on its own row when the
     * card is pending but has no `onAnswer` — the one state where this is the
     * card's only affordance, and the one state where it used to be dropped.
     */
    footer?: ReactNode;
    /**
     * Draw no frame of its own — no border, radius, padding or background — for
     * a card sitting inside a list group that already supplies them. The
     * pending signal stays on the "agent waiting" chip.
     */
    flush?: boolean;
    className?: string;
    'data-testid'?: string;
}

export declare function ContextColumn({ state, onStateChange, panels, activeId, onActivate, label, roomy, className, 'data-testid': testId, }: ContextColumnProps): JSX.Element | null;

/** One of a tabbed panel's parts, as the collapsed strip shows it. Since 2.384.1. */
export declare interface ContextColumnEntry {
    id: string;
    /** The strip icon's accessible name. */
    label: string;
    icon: ReactNode;
    /** Pending count for this entry alone — unresolved comments, a running task. */
    badge?: number;
}

export declare interface ContextColumnPanel {
    id: string;
    /** The tab's text and the strip icon's accessible name. */
    label: string;
    icon: ReactNode;
    /** Unread or pending count, shown on the tab and the strip icon. */
    badge?: number;
    /**
     * The panel's own parts, for the collapsed strip: one icon per entry in
     * place of the panel's icon. Pressing one opens the column to this panel
     * and reports the entry (`onActivate(panel.id, entry.id)`). The open tab
     * row is unchanged — the panel's content owns its own tabs. An EMPTY array
     * (2.386.0) puts nothing on the strip for this panel — its parts all live
     * elsewhere right now (a page's comments on its own tab) and the host opens
     * it another way; omit `entries` for the panel's one icon.
     */
    entries?: readonly ContextColumnEntry[];
    /** What the panel shows while it is the active one. */
    content: ReactNode;
}

export declare interface ContextColumnProps {
    state: ContextColumnState;
    onStateChange: (next: ContextColumnState) => void;
    /** In tab order. Empty renders nothing at all. */
    panels: ContextColumnPanel[];
    /** Which panel is showing. Unknown or absent falls back to the first. */
    activeId?: string | null;
    /** A tab or a strip icon was pressed; `entryId` when the icon was one of the panel's `entries`. */
    onActivate: (id: string, entryId?: string) => void;
    /** Accessible name of the column. Default "Side column". */
    label?: string;
    /**
     * Open at 384px instead of 320px on a 2xl viewport (≥1536px) — a pane with
     * rows of label + value (a run draft) that the Work mockup draws wider.
     * Narrower viewports keep 320px so the page beside it keeps its width.
     * Since 2.386.13.
     */
    roomy?: boolean;
    className?: string;
    'data-testid'?: string;
}

export declare type ContextColumnState = 'collapsed' | 'open' | 'wide';

export declare type ContextPatch = ContextPatchMerge | ContextPatchJsonPatch;

export declare interface ContextPatchJsonPatch {
    mode: 'jsonPatch';
    ops: Array<{
        op: 'add' | 'remove' | 'replace' | 'move' | 'copy' | 'test';
        path: string;
        value?: unknown;
        from?: string;
    }>;
}

export declare interface ContextPatchMerge {
    mode: 'merge';
    values: Record<string, unknown>;
}

/** The views a conversation can offer. `chat` is the transcript itself. */
export declare type ConversationFeature = 'chat' | 'files' | 'documents' | 'pins' | 'members' | 'mentions' | 'calls';

export declare interface ConversationItem {
    /** Chat channel id — handed back verbatim by `onSelect`. */
    channel: string;
    /**
     * What kind of conversation this is.
     *
     * The server already models all three as ONE thing — a room carries
     * `type: 'standalone' | 'group' | 'dm'` — so they belong in one list rather
     * than three panels with three "new" buttons. This only changes how the row
     * IDENTIFIES itself:
     *
     *   'dm'      → the peer's avatar and name
     *   'group'   → stacked avatars, all the names
     *   'channel' → a # and the channel's own name. A channel is not the sum of
     *               its members; #general does not want forty stacked avatars,
     *               and its identity survives everyone leaving.
     *
     * Defaults to peer-derived ('dm' or 'group' by peer count), so every existing
     * caller keeps the rows it already had.
     */
    kind?: 'dm' | 'group' | 'channel';
    /** Required for `kind: 'channel'` — the channel's name, without the '#'. */
    name?: string;
    /** 1 peer for a 1:1 conversation, N for groups. Empty for a channel. */
    peers: ConversationPeer[];
    lastMessagePreview?: string;
    /** ISO timestamp of the last message. Rendered as HH:MM. */
    lastMessageAt?: string;
    unreadCount?: number;
    /**
     * Somebody named YOU in this conversation.
     *
     * Separate from `unreadCount` because they answer different questions and
     * only one of them is urgent: unread is "there is traffic here", a mention
     * is "someone is waiting on you". Rolling them into one number is how a
     * mention gets lost inside a busy channel's 40 unread.
     */
    mentioned?: boolean;
    /**
     * A call is happening in this conversation RIGHT NOW.
     *
     * Its own signal, for the same reason `mentioned` is: unread says "there is
     * traffic here", a mention says "someone is waiting on you", and this says
     * "something is happening that you can still join". Only the last one
     * expires — a call you learn about afterwards is a fact, not an invitation.
     *
     * Until this existed a call was invisible from the list: the thread posted a
     * card when the call ENDED, so the only way to discover one in progress was
     * to already be looking at the conversation it was in. For a stream meant
     * for an audience that is the whole problem — nobody can watch what nobody
     * can find.
     */
    live?: boolean;
    /**
     * Kept at the top of the rail, above every other row and out of recency's
     * reach — the two or three conversations a person returns to all day.
     *
     * Pinned rows form ONE group regardless of kind: a pin says "I want this
     * where I can find it", and splitting the pins back into Channels and
     * Direct messages puts them back where they were.
     */
    pinned?: boolean;
    /**
     * A heading this person filed the row under — the Slack/Teams "custom
     * section". Absent or blank means the default grouping.
     *
     * Sections sit ABOVE Channels and Direct messages and below Pinned: someone
     * who has made a section has said, in the strongest terms the rail offers,
     * where they want this thread. A pin still outranks it — "keep this in
     * reach" is a stronger statement than "file this under Work", and a pinned
     * row pulled down into a section is a pin that stopped working.
     *
     * Filing is per person and per conversation, so two people in one channel
     * can file it differently and neither sees the other's arrangement.
     */
    section?: string | null;
    /**
     * Muted: traffic here is not worth interrupting for.
     *
     * The row still counts its unread — muting is not hiding — but the badge
     * loses its accent, so a glance down the rail separates "someone is talking"
     * from "someone wants me". A MENTION keeps its full-strength marker even
     * here, because being named is the one thing a mute is not meant to swallow.
     */
    muted?: boolean;
}

export declare function ConversationList({ items, grouped, sectionOrder, sectionActions, collapsedSections, onToggleSection, onStartCall, sortByRecency, maxVisible, activeChannel, onSelect, onNewChat, emptyLabel, onTogglePin, onToggleMute, onMarkUnread, onRename, canRename, onSetSection, tone, className, 'data-testid': testId, }: ConversationListProps): JSX.Element;

export declare interface ConversationListProps {
    items: ConversationItem[];
    /** Channel of the conversation currently open — its row highlights. */
    activeChannel?: string | null;
    onSelect: (channel: string) => void;
    /** Renders a "+ New chat" affordance above the rows when set. */
    onNewChat?: () => void;
    /** Empty-state text. Defaults to "No conversations yet". */
    emptyLabel?: string;
    /**
     * Split the list into Channels and Direct messages, the way Slack and Teams
     * do.
     *
     * A flat list mixing the two is scannable at four rows and not at forty: a
     * channel and a person are different kinds of destination, and the eye
     * looks for them in different places. Off by default so existing callers —
     * a compact sidebar, a call's people list — keep the single run they were
     * designed around.
     */
    grouped?: boolean;
    /**
     * Which group leads when `grouped`.
     *
     * `'channels-first'` (the default, and what every existing caller keeps) is
     * the Slack shape and is right when channels are things you deliberately
     * joined. `'dms-first'` is right on a surface whose subject is people: a DM
     * is addressed to you personally and a channel is not, and on a rail with
     * forty rooms in it that difference is the only thing keeping a new message
     * from a colleague above the fold.
     */
    sectionOrder?: 'channels-first' | 'dms-first';
    /**
     * Trailing buttons on a section's heading, keyed by the section's name —
     * 'Channels', 'Direct messages', 'Pinned'. A + on the Channels heading is
     * where people look for "make a new one"; a "new" button parked somewhere
     * else is a button nobody finds.
     */
    sectionActions?: Readonly<Record<string, readonly RailSectionAction[]>>;
    /**
     * Which sections are folded away, keyed by the section's name the way
     * `sectionActions` is — 'Pinned', 'Channels', 'Direct messages'.
     *
     * Controlled, and only live once `onToggleSection` is given: a collapsed
     * section with no handler is one nothing can reopen. The host owns the state
     * because this is a preference worth persisting — a rail that forgets which
     * sections you folded is one you refold every morning.
     *
     * Not to be confused with the "Show N more" cap (`maxVisible`), which is
     * this component's own state and a different idea: the cap trims a long
     * section down to its top rows, this hides the section outright. Neither
     * resets the other, so reopening a section brings back exactly the rows it
     * had.
     */
    collapsedSections?: Readonly<Record<string, boolean>>;
    /** Fires with the section's name and the state the host should switch to. */
    onToggleSection?: (label: string, next: boolean) => void;
    /**
     * Start a call in a conversation from the rail — the row's ⋯ gains "Call"
     * and "Video call". A conversation you can open is one you can call into,
     * and making people open it first to find the call button is a step for
     * nothing.
     */
    onStartCall?: (channel: string, kind: 'audio' | 'video') => void;
    /**
     * Sort rows most-recent-first within each group. Default TRUE.
     *
     * Off for a caller whose order already means something — a call's people
     * list is in join order, and re-sorting it by "last message" would shuffle
     * the participants of a live call every time somebody spoke.
     */
    sortByRecency?: boolean;
    /**
     * Show at most this many rows per group, with a "Show N more" row after
     * them that expands the group in place (and "Show less" to fold it back).
     *
     * A rail is a place to find the conversation you want, and past a handful
     * of rows the eye stops scanning and starts reading. With recency sorting
     * on, the cut keeps the most recent; the open conversation is always kept
     * visible so the highlight never sits inside the folded part. Unset shows
     * everything, which is what every existing caller gets.
     */
    maxVisible?: number;
    /**
     * Per-row actions, the way Teams and Slack hang them off a conversation:
     * a ⋯ button revealed on hover or focus, never a second permanent control
     * competing with the row itself. Each is optional and its menu row appears
     * only when the handler does — a rail that cannot mute should not offer to.
     *
     * `next` is the state being asked for, not the state now, so a host never
     * has to re-derive the flip.
     */
    onTogglePin?: (channel: string, next: boolean) => void;
    onToggleMute?: (channel: string, next: boolean) => void;
    /** Absent from a row that is already unread — there is nothing to mark. */
    onMarkUnread?: (channel: string) => void;
    /**
     * Rename this conversation — the Teams/Slack "Rename channel" row.
     *
     * Offered per row rather than per list because renaming is a permission:
     * the host knows which conversations this reader owns, and a row that
     * cannot be renamed should not say it can. Pass a handler only for rows
     * where it is allowed (see `canRename`).
     */
    onRename?: (channel: string) => void;
    /**
     * "Move to section…" — file this row under one of the person's own
     * headings. The host owns the picker; this only reports the intent.
     *
     * Offered on every row when given, unlike Rename: filing is the reader's
     * own arrangement of their own rail, so it needs no permission from anyone
     * and applies as well to a DM as to a channel.
     */
    onSetSection?: (channel: string) => void;
    /**
     * Which rows accept a rename. Defaults to "all of them" when `onRename` is
     * given. A DM has no name of its own — it is named by the people in it — so
     * a host will typically answer false for those.
     */
    canRename?: (item: ConversationItem) => boolean;
    tone?: 'light' | 'dark';
    className?: string;
    'data-testid'?: string;
}

export declare interface ConversationPeer {
    userId: string;
    displayName: string;
    avatarUrl?: string;
    color?: string;
    /** Presence: true → online dot, false → offline dot, undefined → no dot. */
    online?: boolean;
}

export declare function ConversationRail({ shelf, conversations, selected, onSelect, onNewChat, grouped, sectionOrder, sectionActions, collapsedSections, onToggleSection, onStartCall, maxVisible, emptyLabel, header, title, actions, beforeList, footer, onTogglePin, onToggleMute, onMarkUnread, onRename, canRename, onSetSection, collapsible, collapsed, onToggleCollapse, className, 'data-testid': testId, }: ConversationRailProps): JSX.Element;

export declare interface ConversationRailProps {
    /**
     * Persistent destinations — Mentions, Threads, Drafts. Empty renders
     * nothing at all rather than an empty strip.
     */
    shelf?: readonly ConversationShelfItem[];
    conversations: ConversationItem[];
    /** Null when nothing is open — a cold start, or a pane the rail does not model. */
    selected?: RailSelection | null;
    onSelect: (selection: RailSelection) => void;
    /** Renders the "+ New chat" row above the conversations when set. */
    onNewChat?: () => void;
    /**
     * Split conversations into Channels and Direct messages. On by default
     * here — unlike the bare list, which serves compact sidebars too. A rail is
     * the full-height case, where a forty-row flat mix stops being scannable.
     */
    grouped?: boolean;
    /**
     * Which group leads. Forwarded to ConversationList — `'dms-first'` on a
     * surface whose subject is people rather than rooms.
     */
    sectionOrder?: 'channels-first' | 'dms-first';
    /** Trailing buttons on each section heading, keyed by section name. Forwarded to the list. */
    sectionActions?: Readonly<Record<string, readonly RailSectionAction[]>>;
    /**
     * Which conversation sections are folded away, keyed by section name.
     * Forwarded to the list.
     *
     * Nothing to do with `collapsed` below: that shrinks the WHOLE rail to an
     * icon strip, this folds one section inside an otherwise normal rail.
     */
    collapsedSections?: Readonly<Record<string, boolean>>;
    /** Fires with the section's name and the state to switch to. Forwarded to the list. */
    onToggleSection?: (label: string, next: boolean) => void;
    /** "Call" / "Video call" in each row's ⋯ menu. Forwarded to the list. */
    onStartCall?: (channel: string, kind: 'audio' | 'video') => void;
    /** Forwarded to the list: rows per group before a "Show N more" row. */
    maxVisible?: number;
    emptyLabel?: string;
    /** Above the shelf: a workspace switcher, a search field, a title. */
    header?: ReactNode;
    title?: string;
    actions?: ReactNode;
    /** Below the list: a "you" row, a status control. */
    /**
     * Between the shelf and the conversation list — where a team → channel
     * tree goes, so it sits above the flat conversations rather than below
     * them.
     */
    beforeList?: ReactNode;
    footer?: ReactNode;
    /**
     * Per-row actions, forwarded to the list: the ⋯ menu on each conversation.
     * Each item appears only when its handler does.
     */
    onTogglePin?: (channel: string, next: boolean) => void;
    onToggleMute?: (channel: string, next: boolean) => void;
    onMarkUnread?: (channel: string) => void;
    /** "Rename" in each row's ⋯ menu. Forwarded to the list; see its prop docs. */
    onRename?: (channel: string) => void;
    /** Which rows accept a rename. Forwarded to the list. */
    canRename?: (item: ConversationItem) => boolean;
    /** "Move to section…" in each row's ⋯ menu. Forwarded to the list. */
    onSetSection?: (channel: string) => void;
    /**
     * Opts into the Teams/Slack "shrink to an icon strip" toggle. Off by
     * default, so every existing caller keeps its always-expanded rail with no
     * behaviour change.
     */
    collapsible?: boolean;
    /**
     * Whether the rail is currently the narrow icon strip. The rail does not
     * own this — the host decides, typically from a piece of state it
     * persists, and hears about a change through `onToggleCollapse`.
     */
    collapsed?: boolean;
    /** Fires with the state the host should switch to when the toggle is used. */
    onToggleCollapse?: (next: boolean) => void;
    className?: string;
    'data-testid'?: string;
}

export declare function ConversationShelf({ items, activeId, onSelect, compact, iconOnly, size, plain, className, 'data-testid': testId, }: ConversationShelfProps): JSX.Element | null;

export declare interface ConversationShelfItem {
    id: string;
    label: string;
    /**
     * A glyph component from `ui/Icons` (e.g. `<ActivityIcon />`), rendered in a
     * fixed-size box so every row's label starts at the same x. Avoid emoji —
     * they render as a fixed system glyph and do not take the theme's colour,
     * so an urgent shelf item and a quiet one end up looking the same.
     */
    icon?: ReactNode;
    /** Unread/waiting count. Zero renders no badge rather than a "0". */
    count?: number;
    /**
     * Draws the count in the alert colour. An @-mention is not the same kind of
     * pending as "there is traffic"; the rail should not make you open it to
     * find out which one this is.
     */
    urgent?: boolean;
}

export declare interface ConversationShelfProps {
    items: readonly ConversationShelfItem[];
    activeId?: string | null;
    onSelect: (id: string) => void;
    compact?: boolean;
    iconOnly?: boolean;
    /**
     * `sm` (default) is the 13px shelf. `md` (2.386.0) is the Documents
     * explorer's quick views: 15px labels and 18px icons on 36px rows, the
     * scale of the Folders tree under them.
     */
    size?: 'sm' | 'md';
    /**
     * Labels only — no icon slot. The selected row takes the folder tree's
     * selection (primary tint, primary left accent), so the views above a
     * `TreeView size="md"` and the tree read as one list. The All documents
     * mockup's All documents / Recent / Shared with me. Since 2.389.2.
     */
    plain?: boolean;
    className?: string;
    'data-testid'?: string;
}

/**
 * How a conversation LIST row stamps itself.
 *
 * A transcript row can show a bare `21:52` because a day separator sits above
 * it. An inbox row has no such context: the same `21:52` beside a channel
 * nobody has touched since Sunday reads as tonight, and — when the hour is
 * later than the current one — as the future. The stamp has to say which day
 * it means, in the width of a rail.
 *
 * So: the time for today, the word for yesterday, a short weekday inside the
 * week, and a numeric date beyond it. Same shape Teams and Slack use in their
 * rails, and the same six-day window as `dayLabel` — "Mon" a week and a day
 * ago is the wrong Monday. Pair it with `fullTimestampLabel` as the `title`
 * so the exact moment is one hover away.
 *
 * The activity feed stamps its rows the same way and for the same reason, so
 * this is the one copy of the rule rather than one per list.
 *
 * `now` is injectable for the same reason it is on `dayLabel`: the answer
 * changes at midnight and a test cannot wait for it.
 */
export declare function conversationStamp(isoString: string, now?: Date): string;

export declare function ConversationStart({ title, body, onStart, startLabel, startDescription, rooms, onAddToRoom, people, onShareWith, busy, receipt, searchAbove, 'data-testid': testId, }: ConversationStartProps): JSX.Element;

export declare interface ConversationStartDestination {
    /** The host's key for the destination — a channel, a user id. */
    id: string;
    /** What to call it: `#design`, `Hank Anderson`. */
    label: string;
    icon?: ReactNode;
}

export declare interface ConversationStartProps {
    /** Default "No conversation yet". */
    title?: string;
    /** Default names the three choices. */
    body?: string;
    /** Present, the first row: make a new conversation about this. */
    onStart?: () => void;
    /** Default "Start a conversation". */
    startLabel?: string;
    /** What starting makes. Default "A new room, named after this page". */
    startDescription?: string;
    /** Conversations that already exist. Empty: the row is disabled, not hidden — it still says the choice exists. */
    rooms?: readonly ConversationStartDestination[];
    onAddToRoom?: (id: string) => void;
    /** People it could be sent to. */
    people?: readonly ConversationStartDestination[];
    onShareWith?: (id: string) => void;
    /** Something is in flight — every row waits. */
    busy?: boolean;
    /** What the last attempt did, under the intro. */
    receipt?: ConversationStartReceipt | null;
    /** Lists longer than this get a search box. Default 6. */
    searchAbove?: number;
    'data-testid'?: string;
}

export declare interface ConversationStartReceipt {
    tone: 'success' | 'error';
    text: string;
    /** An optional way onward — "Open the chat" after sending to a person. */
    actionLabel?: string;
    onAction?: () => void;
}

export declare function ConversationSurface({ name, description, online, avatarUrl, features, children, canvas, members, memberCount, files, thumbnailSrc, documents, onOpenDocument, onRename, onCreateDocument, onCreateWhiteboard, pins, onUnpin, mentions, onOpenMention, recordings, onOpenRecording, onJumpToMessage, onStartCall, callModeFixed, onWatch, watchLabel, watchHint, watchViewerCount, callInProgress, headerActions, view: controlledView, onViewChange, className, 'data-testid': testId, }: ConversationSurfaceProps): JSX.Element;

export declare interface ConversationSurfaceProps {
    /** Channel name, or the people in a DM. */
    name: string;
    /** Sub-line under the name. */
    description?: string;
    online?: boolean;
    avatarUrl?: string;
    /**
     * Which views this deployment offers. Defaults to all of them.
     *
     * Hand in the INTERSECTION of what the product declares and what the server
     * provisions — a view whose backend is not wired renders an empty tab, which
     * reads as a broken feature rather than an absent one.
     */
    features?: readonly ConversationFeature[];
    /** The transcript and its composer. Owned by the caller. */
    children?: ReactNode;
    /**
     * Something live to look at while you talk — the call happening in this
     * conversation, a stream. Sits above the transcript on the Chat view and
     * scrolls with nothing; the transcript keeps its own scroll below.
     */
    canvas?: ReactNode;
    /**
     * The Members view: the host's `MembersPanel`, wired to its membership
     * API. Absent, the tab shows nothing — pass it whenever 'members' is on.
     */
    members?: ReactNode;
    /** The Members tab's badge. */
    memberCount?: number;
    files?: readonly ChannelFileItem[];
    /** Resolves a displayable image source; the download route is authenticated. */
    thumbnailSrc?: (a: ChatAttachment) => string | null | undefined;
    documents?: readonly ChannelDocumentItem[];
    onOpenDocument?: (documentId: string) => void;
    /**
     * Rename this conversation from its own title — double-click it and the
     * heading becomes a field. Forwarded to ChannelHeader; see its prop docs.
     * Omit for a viewer who may not.
     */
    onRename?: (next: string) => void;
    /** Omit for a viewer who may not create documents here. */
    onCreateDocument?: () => void;
    /**
     * Start a whiteboard instead of a document. Same permission, different
     * shape: a document opens beside the conversation, a whiteboard takes the
     * whole window — you are not typing in chat while drawing with somebody.
     * Omit to offer documents only.
     */
    onCreateWhiteboard?: () => void;
    pins?: readonly PinnedMessageItem[];
    onUnpin?: (messageId: string) => void;
    mentions?: readonly ChannelMentionItem[];
    onOpenMention?: (channel: string, messageId: string) => void;
    recordings?: readonly ChannelRecordingItem[];
    onOpenRecording?: (recordingId: string) => void;
    /** Scrolls the transcript to a message. Used by pins, files and mentions. */
    onJumpToMessage?: (messageId: string) => void;
    /**
     * Start (or join) a call with the people in this conversation. Omit and no
     * call controls render — which is how a chat-only deployment looks.
     */
    onStartCall?: (audioOnly: boolean) => void;
    /**
     * Watch instead of joining.
     *
     * A conversation that many more people watch than speak in — an all-hands,
     * a demo — should not make every viewer open a peer connection. Joining is
     * realtime and costs one connection per head; watching is near-realtime HLS
     * and a CDN carries it to any audience. Offering both is the difference
     * between a room that seats twelve and one that seats a thousand.
     *
     * Omit when the conversation cannot be watched, rather than rendering a
     * disabled control.
     */
    onWatch?: () => void;
    /**
     * What the watch control SAYS. Default "Watch".
     *
     * It used to say nothing: a bare 👁 whose entire explanation lived in a
     * `title`. A tooltip is not a label — it never appears on a touch device,
     * plenty of screen readers do not announce it, and an eye glyph is ambiguous
     * even to someone who does hover it ("preview"? "visibility"? "seen by"?).
     * The word is now on the button; this prop is for a product that calls it
     * something else — "Watch live", "Join as audience", "View the stream".
     */
    watchLabel?: string;
    /**
     * The longer version, for the tooltip and the accessible description: what
     * is on the other side of the control. Defaults to the joining-vs-watching
     * distinction, which is the thing a first-time viewer cannot guess.
     */
    watchHint?: string;
    /**
     * How many people are already watching, when that is KNOWN.
     *
     * `null`/omitted and `0` are different claims and this keeps them apart:
     * omitted renders no number (nobody measured), a numeric 0 renders "0"
     * (somebody counted and the answer was nobody). Never pass 0 to stand in
     * for "not measured" — upstream `getViewerCount` returns `null` for that,
     * and a channel that has never been measured must not claim an audience.
     */
    watchViewerCount?: number | null;
    /** Someone here is already on a call, so the controls say Join. */
    callInProgress?: boolean;
    /**
     * This conversation's call mode is not the clicker's to choose.
     *
     * A room decides whether it is an audio room or a video room, and entering
     * one does not get to redefine it — so the host ignores the `audioOnly`
     * argument entirely. Two buttons then do exactly the same thing, and the
     * one labelled "Audio call" starts a video call: a control that lies about
     * what it does. Set this and a single control renders instead.
     */
    callModeFixed?: boolean;
    /** Extra header controls, to the right of the call buttons. */
    headerActions?: ReactNode;
    /** Controlled view. Omit to let the surface keep its own. */
    view?: ConversationFeature;
    onViewChange?: (view: ConversationFeature) => void;
    className?: string;
    'data-testid'?: string;
}

/** Two stacked pages: "make a copy". Since 2.390.3. */
export declare function CopyIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** A static-draw Float32 array buffer, the only buffer shape these backdrops use. */
export declare function createArrayBuffer(gl: WebGLContextLike, data: Float32Array): WebGLBuffer | null;

export declare function CreateChannelDialog({ open, teamName, busy, anchor, placement, onCreate, onClose, 'data-testid': testId, }: CreateChannelDialogProps): JSX.Element;

export declare interface CreateChannelDialogInput {
    name: string;
    description?: string;
    privacy: ChannelPrivacy;
}

export declare interface CreateChannelDialogProps {
    open: boolean;
    teamName: string;
    busy?: boolean;
    /** The control that opened it. The popover hangs off this; without it, it centres. */
    anchor?: RefObject<HTMLElement | null> | null;
    placement?: InlinePopoverPlacement;
    /** Reject with a reason (e.g. a duplicate name) and it shows inline. */
    onCreate: (input: CreateChannelDialogInput) => Promise<void> | void;
    onClose: () => void;
    'data-testid'?: string;
}

export declare interface CreateClientInput {
    clientName: string;
    poolId: string;
    redirectUris: string[];
    postLogoutRedirectUris?: string[];
    grantTypes?: string[];
    responseTypes?: string[];
    scope?: string;
}

export declare interface CreateClientWithPoolInput {
    clientName: string;
    poolName: string;
    redirectUris: string[];
    grantTypes?: string[];
}

export declare interface CreateEmailTemplateInput {
    name: string;
    subject: string;
    htmlBody: string;
    textBody: string;
    variables?: string[];
}

/** One line for an embedder: `renderers={{ graph: createGraphPanelRenderer({ load }) }}`. */
export declare function createGraphPanelRenderer(options: CreateGraphPanelRendererOptions): ChatSidePanelRenderer;

export declare interface CreateGraphPanelRendererOptions {
    /** Fetches what the panel shows. Called once per panel (kind + id); a throw becomes the error state. */
    load: (panel: ChatSidePanelRef) => Promise<GraphPanelData>;
    onOpenPerson?: (id: string, ctx: {
        panel: ChatSidePanelRef;
        api: ChatSidePanelApi;
    }) => void;
    onMessagePerson?: (id: string, ctx: {
        panel: ChatSidePanelRef;
        api: ChatSidePanelApi;
    }) => void;
    /** Node picked in a raw nodes/edges graph. */
    onSelectNode?: (node: GraphNode, ctx: {
        panel: ChatSidePanelRef;
        api: ChatSidePanelApi;
    }) => void;
    /** Pixel height of the graph area. */
    graphHeight?: number;
    'data-testid'?: string;
}

export declare interface CreateGroupInput {
    groupName: string;
    description?: string;
    permissions?: string[];
}

export declare interface CreatePoolInput {
    poolName: string;
    customAttributes?: Record<string, string>;
    settings?: Partial<PoolSettings>;
}

/** One line for a host: `renderers={{ run: createRunPanelRenderer({ load, onOpenFull }) }}`. */
export declare function createRunPanelRenderer(options: CreateRunPanelRendererOptions): ChatSidePanelRenderer;

export declare interface CreateRunPanelRendererOptions {
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

export declare function CreateTeamDialog({ open, busy, anchor, placement, onCreate, onClose, 'data-testid': testId, }: CreateTeamDialogProps): JSX.Element;

export declare interface CreateTeamDialogInput {
    name: string;
    description?: string;
    visibility: TeamVisibility;
}

export declare interface CreateTeamDialogProps {
    open: boolean;
    busy?: boolean;
    /** The control that opened it. The popover hangs off this; without it, it centres. */
    anchor?: RefObject<HTMLElement | null> | null;
    placement?: InlinePopoverPlacement;
    /** Reject with a reason (e.g. a name already taken) and it shows inline. */
    onCreate: (input: CreateTeamDialogInput) => Promise<void> | void;
    onClose: () => void;
    'data-testid'?: string;
}

export declare interface CreateUserInput {
    email: string;
    password?: string;
    givenName?: string;
    familyName?: string;
    nickname?: string;
    customAttributes?: Record<string, unknown>;
}

/**
 * WebGL2, then WebGL1, then the prefixed spelling old Safari and some Android
 * webviews still answer to. Wrapped because a browser with WebGL disabled by
 * policy THROWS from `getContext` rather than returning null.
 */
export declare function createWebGLContext(canvas: HTMLCanvasElement, attributes?: WebGLContextAttributes): WebGLContextLike | null;

/**
 * Returns a `var(--ui-...)` reference for use in inline styles or CSS-in-JS.
 *
 * Usage:
 *   style={{ color: cssVar('textPrimary') }}
 *   // → "var(--ui-text-primary)"
 */
export declare function cssVar(token: keyof ThemeTokens): string;

declare type CursorMode = 'freeform' | 'table' | 'text' | 'canvas';

export declare const CUSTOM_FIELD_TYPE_STORAGE_KEY = "ws_field_types_v1";

export declare interface CustomFieldType {
    id: string;
    name: string;
    icon: string;
    description: string;
    /**
     * Primitive storage type — e.g. 'long_text_and_summary', 'list_text'.
     * Identifies the Drupal-style data storage class the user selected.
     * Optional for backward-compat with records persisted before this field was added.
     */
    primitiveType?: string;
    /**
     * Which built-in renderer to delegate to for display.
     * Derived from primitiveType at creation time.
     */
    baseType: string;
    /**
     * Per-view-mode visibility + renderer choice from step 2 of the wizard.
     * Optional for backward-compat with records persisted before it existed;
     * absent means "visible everywhere, base type's default renderer".
     */
    display?: Partial<Record<ViewMode, CustomFieldTypeDisplay>>;
    createdAt: string;
    updatedAt: string;
}

/**
 * Step 2 ("Display") of the Data Types wizard, for one view mode.
 *
 * ADDITIVE, optional. Before this existed, `FieldTypesPage.handleSave` sent
 * only `{name, icon, description, primitiveType, baseType}` — the Visible
 * checkboxes and the renderer pickers had nowhere to be written, so every
 * step-2 choice was discarded the moment the user pressed Save and reopening
 * the type for edit showed all three modes visible with the default renderer.
 */
export declare interface CustomFieldTypeDisplay {
    /** Does this field appear at all in this view mode? */
    visible: boolean;
    /** Chosen renderer key, e.g. `'rich-text:reader'`. Absent = the base type's first. */
    renderer?: string;
}

/** Dark theme preset — proper dark UI design, not simply inverted.
 *
 * MUST stay consistent with the `[data-theme="dark"]` token block in
 * src/styles.css (same source-of-truth direction as the light preset: the
 * CSS block mirrors this file). Primary was re-derived 2026-08 from the
 * brand indigo (#646cff lightened for dark surfaces) — it had drifted to a
 * plain blue (#60a5fa) from the pre-#646cff era. */
export declare const darkTheme: ThemeTokens;

export declare function DataTable<T>({ data: dataProp, columns: columnsProp, keyField, onRowClick, rowActions, searchable, searchPlaceholder, pageSize, emptyMessage, loading, loadingRows, frameless, striped, className, 'data-testid': testId, }: DataTableProps<T>): JSX.Element;

export declare interface DataTableColumn<T> {
    /** Stable id for the column. When `accessor` is omitted, used as the data key on T. */
    key: string;
    /** Header label. */
    header: ReactNode;
    /** Optional cell renderer. If absent, the value at `key` is rendered as a string. */
    render?: (row: T, rowIndex: number) => ReactNode;
    /**
     * Optional sort comparator. If absent but `sortable=true`, the default
     * comparator compares numbers/bigints/Dates/booleans by VALUE and everything
     * else by `String(...)`. (It used to stringify unconditionally, which sorted a
     * numeric column lexicographically — 1, 10, 100, 2, 9 — and a Date column by
     * weekday name.)
     */
    compare?: (a: T, b: T) => number;
    /** Optional filter accessor. If absent but `filterable=true`, filters by `String(row[key])`. */
    getFilterText?: (row: T) => string;
    sortable?: boolean;
    /** Include this column's text in the global search box. Default: true if a search box is shown. */
    filterable?: boolean;
    width?: string;
    align?: 'left' | 'right' | 'center';
    className?: string;
}

export declare interface DataTableProps<T> {
    data: T[];
    columns: DataTableColumn<T>[];
    /** Stable id for each row. Used as React key. */
    keyField: (row: T) => string;
    onRowClick?: (row: T) => void;
    /** Per-row trailing action cell (buttons, menu, etc.). */
    rowActions?: (row: T) => ReactNode;
    /** Show a global search input. Default: false. */
    searchable?: boolean;
    searchPlaceholder?: string;
    /** Page size. Pagination is shown when data.length > pageSize. */
    pageSize?: number;
    emptyMessage?: ReactNode;
    loading?: boolean;
    loadingRows?: number;
    /**
     * Drop the table's own border/rounding so a composite (e.g. a Card-framed
     * table like identity's EntityTable) can provide the frame instead.
     */
    frameless?: boolean;
    /**
     * Tint alternate rows so the eye can track one row across a wide table.
     *
     * `surface-inset` is the tint, at full strength — about 2% off `surface`,
     * which is a reading aid you feel rather than see. Half that (the first
     * attempt) measured ~1% and was simply invisible: a stripe nobody can
     * perceive is not a subtle stripe, it is a no-op with a prop attached.
     *
     * It stays lighter than `surface-panel`, the hover fill, so hover still
     * reads as the darker row — a stripe that fights the hover state is worse
     * than no stripe, because it makes the row under the pointer ambiguous.
     * Both are tokens, so the relationship holds in dark mode too.
     */
    striped?: boolean;
    className?: string;
    'data-testid'?: string;
}

export declare function DateEditorRenderer(props: SectionRendererProps): JSX.Element;

export declare const dateFieldType: FieldTypeDefinition;

export declare function DateReaderRenderer({ section, fragment }: SectionRendererProps): JSX.Element;

/** Local calendar day of an ISO timestamp, as `YYYY-MM-DD`. Empty when unparseable. */
export declare function dayKeyOf(isoString: string): string;

/**
 * How the boundary calls itself: `Today`, `Yesterday`, a weekday inside the
 * last week, and an explicit date beyond that.
 *
 * "Today"/"Yesterday" are the words people actually use, and a bare weekday is
 * unambiguous for six days and actively misleading on the seventh — "Monday"
 * a week and a day ago is the wrong Monday — so the window stops at six.
 *
 * `now` is injectable because the whole point of this function is that it
 * changes answer at midnight, which is not something a test can wait for.
 */
export declare function dayLabel(isoString: string, now?: Date): string;

/**
 * The line between one day of a transcript and the next.
 *
 * `role="separator"` rather than a heading: it divides the flow, it is not a
 * section title you would navigate to, and a transcript with forty headings in
 * it makes a screen reader's heading list useless. The accessible name carries
 * the FULL date even though the visible text says "Today" — see
 * `fullDateLabel`.
 *
 * The rule is horizontal and decorative, so it is drawn with borders on the
 * flex children rather than an <hr>: an <hr> is itself a separator, and two
 * nested separators is one announcement too many.
 */
export declare function DaySeparator({ timestamp, now, tone, className }: DaySeparatorProps): JSX.Element | null;

export declare interface DaySeparatorProps {
    /** ISO timestamp of the first message of the day this separator opens. */
    timestamp: string;
    /** Injectable clock, so "Today" is testable. */
    now?: Date;
    tone?: 'light' | 'dark';
    className?: string;
}

export declare function DecisionsEditorRenderer({ section, fragment, ydoc, provider, user, editable, onAddItem, onUpdateItem, onRemoveItem, onUpdateCursorInfo, extensions, editorComponent, }: SectionRendererProps): JSX.Element;

export declare const decisionsFieldType: FieldTypeDefinition;

export declare function DecisionsReaderRenderer({ section, onNavigateToEditor }: SectionRendererProps): JSX.Element;

export declare const DECK_THEMES: readonly DeckTheme[];

export declare interface DeckChart {
    kind: 'bar' | 'line';
    labels: string[];
    series: Array<{
        name: string;
        values: number[];
    }>;
}

/**
 * An image slide carries only its alt text. Nothing is fetched at render time,
 * so the slide is a framed caption until a real asset pipeline puts bytes
 * behind it.
 */
export declare interface DeckImage {
    alt: string;
}

export declare interface DeckQuote {
    text: string;
    by: string;
}

export declare interface DeckSlide {
    id: string;
    layout: SlideLayout;
    title: string;
    eyebrow?: string;
    bullets?: string[];
    columns?: [string[], string[]];
    chart?: DeckChart;
    quote?: DeckQuote;
    image?: DeckImage;
    notes?: string;
    sources: DeckSource[];
}

/** A citation: the document the claim came from, and (optionally) where in it. */
export declare interface DeckSource {
    documentId: string;
    anchor?: string;
    title: string;
}

export declare interface DeckSpec {
    title: string;
    subtitle?: string;
    theme?: DeckTheme;
    slides: DeckSlide[];
}

export declare type DeckTheme = 'product' | 'engineering' | 'plain';

export declare const DEFAULT_LINK_RELATIONS: LinkRelationOption[];

export declare const DEFAULT_PICKER_EMOJIS: readonly ["👍", "❤️", "🔥", "😂", "👏", "🎉", "😮", "💯", "😀", "😅", "😉", "😍", "😘", "🤣", "🥰", "😇", "🤔", "😎", "😢", "😡", "🤯", "😱", "🙃", "🤩", "🙏", "🤝", "👋", "👌", "✌️", "🤞", "🤘", "🫶", "✨", "⭐", "💫", "🌟", "⚡", "💥", "☀️", "🌈", "🚀", "🎯", "🏆", "💪", "🎊", "🎈", "🥳", "🎁", "☕", "🍕", "🍔", "🍩", "🍦", "🍓", "🍻", "🍷", "👀", "🤖", "👻", "😺", "🐶", "🦄", "🐝", "🌸"];

export declare const DEFAULT_PIPELINE_ICONS: string[];

export declare function DefaultRenderer({ section, fragment, ydoc, provider, user, editable, onAddItem, onUpdateItem, onRemoveItem, onUpdateCursorInfo, extensions, editorComponent, }: SectionRendererProps): JSX.Element;

declare type DeleteOutcome = {
    status: 'synced';
} | {
    status: 'offline';
    error: string;
} | {
    status: 'rejected';
    error: string;
};

/** One op as a sentence. Exported for the tests and for hosts that render a run outside the card. */
export declare function describeAgentRunOp(op: AgentRunOp): string;

/** The sentence the line shows; the fallback when the names are not on the wire. */
export declare function describeMembership(ref: MembershipRef, fallbackText?: string): string;

export declare function describeMembershipHistory(history: MembershipHistory | undefined): string;

/**
 * Names, not ids, and never more than two before it starts counting.
 *
 * Counts EVERY participant, including the ones it cannot name — they are
 * faces in the row beside this sentence, so leaving them out of the sentence
 * makes the two disagree about how many people were there.
 */
export declare function describeParticipants(participants: readonly CallActivityParticipant[], live: boolean): string;

/** "You and Ada", "Ada, Sam and 3 others" — the tooltip people expect. */
export declare function describeReactors(group: ReactionGroup): string;

/** "Mia Zhao and 2 others" — the sentence beside the avatar row. */
export declare function describeRecordingParticipants(participants: readonly RecordingParticipant[], total: number): string;

export declare function DetailHeader({ title, badge, description, meta, aside, asideWidth, as: Heading, className, 'data-testid': testId, }: DetailHeaderProps): JSX.Element;

export declare interface DetailHeaderProps {
    title: ReactNode;
    /** Sits inline after the title — a status chip, a badge, a count. */
    badge?: ReactNode;
    /** One line of prose. Capped at a readable measure, not the panel width. */
    description?: ReactNode;
    /** The metadata line. Pass a `<MetaLine>`; anything is accepted. */
    meta?: ReactNode;
    /** Right-hand region — progress bars, a gauge, a small action cluster. */
    aside?: ReactNode;
    /** Width of the aside in px. Default 260. */
    asideWidth?: number;
    /** Heading level, so a panel nested under a page h1 does not claim h1. */
    as?: 'h2' | 'h3';
    className?: string;
    'data-testid'?: string;
}

export declare function DetailSection({ title, hint, actions, first, variant, size, description, children, className, 'data-testid': testId, }: DetailSectionProps): JSX.Element;

export declare interface DetailSectionProps {
    title: string;
    /** Quiet qualifier beside the title — a count, a state, a caveat. */
    hint?: ReactNode;
    /** Right-aligned affordance for this section only. */
    actions?: ReactNode;
    /** Suppress the leading rule. Use on the first section of a surface. */
    first?: boolean;
    /**
     * `label` (default): a small uppercase caption under a hairline, for a
     * drawer or side panel. `heading` (since 2.386.15): a 16px sentence-case
     * heading with no rule, for a document-like body (a work item's Brief); its
     * `actions` stay quiet until the section is hovered or focused (always shown
     * where there is no hover).
     */
    variant?: 'label' | 'heading';
    /**
     * `heading` only. `md` (default) is the 16px heading. `lg` (since 2.390.0)
     * is a page's section heading — 19px semibold on a 28px row, sentence case
     * ("What needs attention", "Plan next", "Why this matters").
     */
    size?: 'md' | 'lg';
    /**
     * `heading` only: one line under the heading, before the content — what
     * the section is for ("Add enough detail for an engineer or agent to know
     * what success looks like."). Since 2.390.0.
     */
    description?: ReactNode;
    children: ReactNode;
    className?: string;
    'data-testid'?: string;
}

export declare interface DevicePreferences {
    microphoneId?: string;
    cameraId?: string;
    speakerId?: string;
}

export declare function DeviceSettingsPanel({ value, onChange, showCamera, children, 'data-testid': testId, }: DeviceSettingsPanelProps): JSX.Element;

export declare interface DeviceSettingsPanelProps {
    value: DevicePreferences;
    onChange: (next: DevicePreferences) => void;
    /** Hide the camera row for an audio-only call. */
    showCamera?: boolean;
    /** Extra rows the host wants under the pickers (a level meter, a note). */
    children?: ReactNode;
    'data-testid'?: string;
}

export declare interface DiagnosticsInfo {
    node: Record<string, unknown>;
    cluster: Record<string, unknown>;
    resources: Record<string, unknown>;
}

export declare function DiagnosticsPage({ diagnostics, rates, dlq, onRedrive, onPurge, onRefresh, loading, }: DiagnosticsPageProps): JSX.Element;

export declare interface DiagnosticsPageProps {
    diagnostics?: Record<string, unknown>;
    rates?: Record<string, unknown>;
    dlq?: Array<{
        id: string;
        payload: unknown;
        error: string;
        failedAt: string;
        retryCount: number;
    }>;
    onRedrive: (id: string) => Promise<void>;
    onPurge: (id: string) => Promise<void>;
    onRefresh: () => void;
    loading?: boolean;
}

export declare function DiagramEditorRenderer({ section, editable, onUpdateSection, }: SectionRendererProps): JSX.Element;

export declare const diagramFieldType: FieldTypeDefinition;

export declare function DiagramReaderRenderer({ section }: SectionRendererProps): JSX.Element;

export declare interface DiffAnnotation {
    /** Path as it appears in the diff (new side). */
    file: string;
    /** New-side line number. Omit for a file-level note. */
    line?: number;
    severity?: 'critical' | 'warning' | 'info';
    note: string;
    /** Who said it — a reviewer model, a person. */
    author?: string;
}

export declare interface DiffFile {
    path: string;
    oldPath: string | null;
    status: 'added' | 'deleted' | 'renamed' | 'modified';
    adds: number;
    dels: number;
    lines: DiffLine[];
    binary: boolean;
}

export declare interface DiffLine {
    kind: 'add' | 'del' | 'ctx' | 'hunk';
    text: string;
    oldNo: number | null;
    newNo: number | null;
}

export declare function DiffViewer({ diff, annotations, defaultCollapsed, maxLinesPerFile, truncatedNote, className, 'data-testid': testId, }: DiffViewerProps): JSX.Element;

export declare interface DiffViewerProps {
    /** Unified diff — real `git diff` output. */
    diff: string;
    annotations?: readonly DiffAnnotation[];
    /** Start with every file collapsed (big changes). Default false. */
    defaultCollapsed?: boolean;
    /** Hard cap on rendered lines per file, beyond which the file truncates. */
    maxLinesPerFile?: number;
    /** Note rendered when the caller knows the diff itself was truncated upstream. */
    truncatedNote?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

export declare function Disclosure({ summary, children, open, defaultOpen, onToggle, tone, density, variant, hint, size, className, summaryClassName, bodyClassName, 'data-testid': testId, }: DisclosureProps): JSX.Element;

export declare interface DisclosureProps {
    /** Always-visible trigger row. Any node — not just text. */
    summary: ReactNode;
    /** Shown when open. */
    children: ReactNode;
    /**
     * Controlled open state. Omit to let the component own it (see
     * `defaultOpen`); pass it and update it from `onToggle` to control it, the
     * same contract as a controlled `<input>`.
     */
    open?: boolean;
    /** Uncontrolled initial state. Default false. Ignored once `open` is passed. */
    defaultOpen?: boolean;
    /** Fires after every toggle, either direction, with the new open state. */
    onToggle?: (open: boolean) => void;
    /**
     * Semantic tint for the summary row (and its left rule) — an admonition
     * inside a longer document, a warning the reader can collapse once read.
     * Default: no tint, matches surrounding chrome.
     */
    tone?: ToneOrAlias;
    /**
     * `'compact'` tightens padding, drops to `text-xs`, and shrinks the
     * chevron — a disclosure nested inside an already-dense panel (a
     * debugger side rail, a node inspector) where the default's `text-sm` /
     * `px-3 py-2` reads oversized next to its neighbours. Default: unchanged.
     */
    density?: 'default' | 'compact';
    /**
     * `'plain'` drops the outer border and the summary row's background tint
     * (including `tone`'s) entirely — just the summary row and body, for a
     * borderless toggle inside a list where every row already has its own
     * separator and a bordered/tinted card would double up. Composable with
     * `density="compact"`. Default: unchanged (bordered card, tinted summary).
     */
    variant?: 'default' | 'plain';
    /**
     * Muted text after the summary, on the same row — what is inside, or why
     * it is closed ("SME or release manager required to dispatch"). Since 2.390.0.
     */
    hint?: ReactNode;
    /**
     * `md` (default): the summary at the body size. `lg` (since 2.390.0): the
     * summary is a section heading — 19px semibold with a 16px chevron — so a
     * collapsed section ("› Run setup") reads like its open neighbours.
     * Composable with `variant="plain"`; ignored with `density="compact"`.
     */
    size?: 'md' | 'lg';
    className?: string;
    summaryClassName?: string;
    bodyClassName?: string;
    'data-testid'?: string;
}

export declare function Divider({ label, spacing, className, 'data-testid': testId }: DividerProps): JSX.Element;

export declare interface DividerProps {
    /** Optional caption sitting on the rule. */
    label?: ReactNode;
    /** Vertical margin around the rule. Default `md`. */
    spacing?: DividerSpacing;
    className?: string;
    'data-testid'?: string;
}

export declare type DividerSpacing = 'none' | 'sm' | 'md' | 'lg';

export declare interface DLQEntry {
    messageId: string;
    eventType: string;
    eventPayload: unknown;
    lastError: string;
    failedAt: string;
    totalAttempts: number;
    errorKind: string | null;
}

export declare interface DlqEntry {
    id: string;
    payload: unknown;
    error: string;
    failedAt: string;
    retryCount: number;
}

declare interface DLQEntryRow {
    /** Envelope id — primary key for replay / purge. */
    id: string;
    /** Failed payload, T-untyped. The page renders a few well-known fields. */
    envelope: {
        id?: string;
        body?: unknown;
    };
    lastError: string;
    failedAtMs: number;
    totalAttempts: number;
}

export declare interface DLQListResponse {
    items: DLQEntry[];
    cursor?: string;
}

export declare interface DLQPurgeResponse {
    purged: string[];
    notFound: string[];
}

export declare interface DLQRedriveResponse {
    redriven: string[];
    notFound: string[];
}

export declare function DockedAside({ children, width, offsetTop, maxHeight, title, onClose, closeLabel, bodyPadding, className, 'data-testid': testId, }: DockedAsideProps): JSX.Element;

export declare interface DockedAsideProps {
    children: ReactNode;
    /** Width in px. Default 420. */
    width?: number;
    /** Start this many px below the row's top — level with the section it belongs to. */
    offsetTop?: number;
    /** Height cap. Default `calc(100vh - 180px)`: below the app chrome and the document header. */
    maxHeight?: string;
    /** With a title, the aside draws its own header row (and a close, when `onClose` is given). */
    title?: ReactNode;
    onClose?: () => void;
    closeLabel?: string;
    /** Padding around the body. Default `md`; `none` when the content brings its own. */
    bodyPadding?: 'none' | 'md';
    className?: string;
    'data-testid'?: string;
}

export declare interface DockedPanelContextValue {
    /** The dock's own header already names the region — bodies should not
     *  repeat it. */
    hasHeader: boolean;
    /** The dock gives its body a definite height; bodies should fill it and
     *  let their own scrollable region absorb the slack. */
    fillsHeight: boolean;
}

/** Wraps a dock's body slot. Docks render this; consumers rarely do. */
export declare function DockedPanelProvider({ hasHeader, fillsHeight, children, }: DockedPanelProviderProps): JSX.Element;

export declare interface DockedPanelProviderProps extends Partial<DockedPanelContextValue> {
    children: ReactNode;
}

export declare function DocsShell({ topNav, sidebar, rightRail, children, fullBleed, preContent, className, style, scrollResetKey, }: DocsShellProps): JSX.Element;

export declare interface DocsShellProps {
    /** Sticky top navigation. Typically <DocsTopNav>. */
    topNav: ReactNode;
    /** Left sidebar. Typically <DocsSidebar>. */
    sidebar: ReactNode;
    /**
     * Changing this scrolls the content pane back to the top — pass the current
     * pathname. <main> is the scroll container, not the window, so the browser's
     * scroll restoration does not apply.
     */
    scrollResetKey?: string;
    /** Optional right rail. Typically <TableOfContents>. */
    rightRail?: ReactNode;
    /** Main content. */
    children: ReactNode;
    /**
     * Full-bleed mode skips the centered content padding so a hosted
     * application demo (e.g. a chat panel filling the viewport) can
     * occupy the entire content rectangle.
     */
    fullBleed?: boolean;
    /** Pre-content slot (breadcrumbs, page header). Skipped when fullBleed. */
    preContent?: ReactNode;
    className?: string;
    style?: CSSProperties;
}

export declare function DocsSidebar({ sections, activeHref, defaultCollapsedSections, renderLink, className, style, 'aria-label': ariaLabel, }: DocsSidebarProps): JSX.Element;

export declare interface DocsSidebarGroup {
    id: string;
    label?: ReactNode;
    /** When set, the group label itself is rendered as a direct link instead of a section. */
    to?: string;
    items: DocsSidebarItem[];
}

export declare interface DocsSidebarItem {
    id: string;
    label: ReactNode;
    to: string;
    badge?: ReactNode;
}

export declare interface DocsSidebarProps {
    sections: DocsSidebarSection[];
    /** Current pathname — drives the active-item highlight. */
    activeHref?: string;
    /** Section ids that should start collapsed. */
    defaultCollapsedSections?: string[];
    /** Plug a routing library's Link. Defaults to <a href>. */
    renderLink?: LinkRenderer;
    className?: string;
    style?: CSSProperties;
    'aria-label'?: string;
}

export declare interface DocsSidebarSection {
    id: string;
    label: ReactNode;
    /** Used to detect "section active" highlighting in section header. */
    basePath?: string;
    groups: DocsSidebarGroup[];
}

export declare function DocsTopNav({ items, activeHref, brand, brandTo, search, showSearchPlaceholder, rightSlot, renderLink, className, style, }: DocsTopNavProps): JSX.Element;

export declare interface DocsTopNavProps {
    items: TopNavItem[];
    activeHref?: string;
    /** Brand/logo. A string renders as a bold title; ReactNode is rendered as-is. */
    brand?: ReactNode;
    /** Optional href for the brand to link to. Default "/". Pass null to render brand as a static span. */
    brandTo?: string | null;
    /**
     * Search affordance. Convention: a button that opens a CommandPalette.
     * Falls back to a styled "Search… ⌘K" placeholder when omitted but
     * `showSearchPlaceholder` is true.
     */
    search?: ReactNode;
    /** Renders a static "Search… ⌘K" pill when `search` is omitted. Default true. */
    showSearchPlaceholder?: boolean;
    /** Right-side slot for auxiliary links (GitHub, version, theme switcher). */
    rightSlot?: ReactNode;
    renderLink?: (item: TopNavItem, props: AnchorHTMLAttributes<HTMLAnchorElement>) => ReactNode;
    className?: string;
    style?: CSSProperties;
}

declare interface DocTypeProposalRow {
    proposalId: string;
    sourceId: string;
    signature: string;
    sampleIngestIds: string[];
    proposedName: string;
    proposedDescription: string;
    proposedFields: ProposedField[];
    reasoning: string;
    status: 'pending' | 'promoted' | 'rejected';
    createdAt: string;
}

export declare const DOCUMENT_TYPE_ICONS: string[];

export declare function DocumentActivityCard({ documentId, title, icon, createdBy, editors, onOpen, className, 'data-testid': testId, }: DocumentActivityCardProps): JSX.Element;

export declare interface DocumentActivityCardProps {
    documentId: string;
    title: string;
    /** Emoji or short glyph from the document's type. */
    icon?: string;
    /** Who created it — a display name, never a raw userId. */
    createdBy?: string;
    /** People in the document right now. Empty means nobody. */
    editors?: readonly DocumentActivityEditor[];
    /**
     * Opens the document. Omit and the card is a record rather than a dead
     * button — a document the viewer cannot reach should not offer a way in.
     */
    onOpen?: (documentId: string) => void;
    className?: string;
    'data-testid'?: string;
}

export declare interface DocumentActivityEditor {
    userId: string;
    displayName?: string;
    avatarUrl?: string;
}

/** A page with a spark in its corner: "make something new from this". Since 2.390.3. */
export declare function DocumentAddIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** "just now", "15m ago", "2h ago", "Yesterday", "3d ago", "Sep 12". */
export declare function documentAgeLabel(value: string | number | Date | null | undefined, now?: number): string | null;

export declare function DocumentChip({ documentId, label, icon, onOpen, className, 'data-testid': testId }: DocumentChipProps): JSX.Element;

export declare interface DocumentChipProps {
    documentId: string;
    label: string;
    /** The document's own icon, when the reference carried one. */
    icon?: string;
    /** Open the document — beside the chat, or wherever the host puts documents. */
    onOpen?: (documentId: string) => void;
    className?: string;
    'data-testid'?: string;
}

export declare interface DocumentData {
    meta: DocumentMeta;
    sections: Section[];
}

/** A page with a folded corner: a document, a file. */
export declare function DocumentIcon({ size, ...rest }: GlyphProps): JSX.Element;

declare interface DocumentInfo {
    id: string;
    title: string;
    type: string;
    status: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    icon: string;
    description?: string;
    activeCallSessionId?: string;
}

export declare interface DocumentMeta {
    id: string;
    title: string;
    sourceType: 'transcript' | 'meeting' | 'notes' | 'custom';
    sourceId: string;
    createdBy: string;
    createdByName?: string;
    createdAt: string;
    aiModel: string;
    status: 'draft' | 'review' | 'final';
    documentType?: string;
    updatedAt?: string;
    activeCallSessionId?: string;
}

declare interface DocumentPresenceUser {
    userId: string;
    displayName: string;
    color: string;
    mode?: string;
    idle?: boolean;
}

/**
 * A document referenced by a message, whichever way it got there.
 *
 * Two features put a document into a conversation and each invented its own
 * metadata: the gateway announces a document CREATED in the channel as
 * `{ kind: 'document', documentId }`, and Share-to-room posts
 * `{ share: { kind: 'document', id, url } }`. They are the same fact —
 * "there is a document in this thread" — so they get the same card. Reading
 * both here rather than teaching each producer the other's shape keeps the
 * older wire format working unchanged.
 *
 * Returns null for anything that is not a document reference, including a
 * reference that names no document: a card with no target is an Open button
 * to nowhere.
 */
export declare function documentRefFromMetadata(metadata: Record<string, unknown> | undefined): {
    documentId: string;
    title: string;
    icon?: string;
    createdBy?: string;
} | null;

/**
 * The documents a message REFERS to — the composer's `#Roadmap` chips, carried
 * as `metadata.documents: [{ id, label }]`. Distinct from documentRefFromMetadata,
 * which is a document ARRIVING in the thread: a reference sits under the words,
 * an arrival replaces them. Malformed entries are dropped, duplicates collapse.
 */
export declare function documentRefsFromMetadata(metadata: Record<string, unknown> | undefined): Array<{
    id: string;
    label: string;
    icon?: string;
}>;

export declare interface DocumentResultItem {
    id: string;
    title: string;
    /** One line: the document's opening sentence or description. */
    summary?: string | null;
    kind: FileKind;
    /** The folder's name; absent = no folder line segment. */
    folder?: string | null;
    updatedAt?: string | number | Date | null;
    /** In the working set (the toggle reads "Added"). */
    attached?: boolean;
}

export declare function DocumentResultList({ items, currentId, onCurrentChange, onOpen, onToggleAttach, draggable, onDragStartItem, rowMenu, emptyState, now, toggleLabels, 'aria-label': ariaLabel, className, 'data-testid': testId, }: DocumentResultListProps): JSX.Element;

export declare interface DocumentResultListProps {
    items: readonly DocumentResultItem[];
    currentId?: string | null;
    /** Keyboard focus moved to a row. */
    onCurrentChange?: (id: string) => void;
    onOpen: (item: DocumentResultItem) => void;
    /** Omit to draw no toggle. */
    onToggleAttach?: (item: DocumentResultItem) => void;
    /** Default true. */
    draggable?: boolean;
    /** Extra drag data (called after the prompt-context payload is written). */
    onDragStartItem?: (item: DocumentResultItem, dataTransfer: DataTransfer) => void;
    /** The row's ⋯ menu; null or empty = no menu. */
    rowMenu?: (item: DocumentResultItem) => DropdownMenuSection[] | null;
    emptyState?: ReactNode;
    /** For the age labels; default Date.now(). */
    now?: number;
    toggleLabels?: {
        add: string;
        added: string;
    };
    'aria-label'?: string;
    className?: string;
    'data-testid'?: string;
}

declare interface DocumentType_2 {
    id: string;
    name: string;
    description: string;
    icon: string;
    fields: DocumentTypeField[];
    /** Phase 51 / hub#66 — multi-page layout. Optional; absent = single-page (legacy). */
    pages?: DocumentTypePage[];
    /** Phase 51 / hub#66 — page-level configuration. Only meaningful when pages.length > 1. */
    pageConfig?: DocumentTypePageConfig;
    /**
     * Remote-first (2026-08): the server row this type is stored under.
     * Stamped on every server hydration and successful create. Its ABSENCE is
     * what marks a type as genuinely local (pre-remote-era or created offline)
     * and therefore eligible for the one-time upload migration — without it, a
     * cache entry of a server-DELETED type is indistinguishable from a local
     * type and gets resurrected onto the server forever.
     */
    serverTypeId?: string;
    createdAt: string;
    updatedAt: string;
}
export { DocumentType_2 as DocumentType }

export declare interface DocumentTypeField {
    id: string;
    name: string;
    sectionType: string;
    required: boolean;
    defaultCollapsed: boolean;
    placeholder: string;
    hiddenInModes: ViewMode[];
    rendererOverrides: Partial<Record<ViewMode, string>>;
}

export declare interface DocumentTypePage {
    id: string;
    title?: string;
    sectionIds: string[];
}

export declare interface DocumentTypePageConfig {
    showTableOfContents: boolean;
}

export declare function DotMeter({ label, value, segments, showPercent, note, warnAbove, tone, className, 'data-testid': testId, }: DotMeterProps): JSX.Element;

export declare interface DotMeterProps {
    /** Row label, e.g. `current` / `weekly`. Omit for a bare meter. */
    label?: string;
    /** 0–1. Values outside the range are clamped rather than overflowing. */
    value: number;
    /** Number of dots. Ten is the default because it reads as a percentage. */
    segments?: number;
    /** Show the value as a percentage after the dots. Default true. */
    showPercent?: boolean;
    /**
     * Trailing note, conventionally the reset time (`⟳ Sun 10:00pm`). This is
     * the field that makes a quota meter actionable — "89% used" is alarming
     * until you know it resets in nine minutes.
     */
    note?: string;
    /**
     * Fraction above which the meter reads as spent. Default 0.85. Below it the
     * meter is neutral: a half-used budget is not a warning.
     */
    warnAbove?: number;
    tone?: DotMeterTone;
    className?: string;
    'data-testid'?: string;
}

export declare type DotMeterTone = 'code' | 'surface';

/** An arrow into a tray: "download". Since 2.390.3. */
export declare function DownloadIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function Drawer({ open, onClose, title, subtitle, width, children, footer, docked, actions, className, bodyClassName, 'aria-label': ariaLabel, 'data-testid': testId, closeLabel, modal, trapFocus, backdrop, }: DrawerProps): default_2.JSX.Element | null;

export declare interface DrawerProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    subtitle?: string;
    /**
     * Panel width in pixels. Defaults to 460 floating; docked it defaults to
     * filling its parent, because the column a docked panel sits in is normally
     * already sized by the layout.
     */
    width?: number;
    children: default_2.ReactNode;
    footer?: default_2.ReactNode;
    /**
     * Render inline in the layout instead of as an overlay: no portal, no
     * backdrop, no focus trap, no Escape handler. `open={false}` still renders
     * nothing, so the same flag drives both forms.
     *
     * A docked panel is not a dialog — it does not take focus and does not trap
     * it — so it is a `<complementary>` region rather than `role="dialog"`,
     * named by its title (or `aria-label`) the same way.
     */
    docked?: boolean;
    /**
     * Controls beside the close button in the header — a filter toggle, an
     * "open in full page" link. Rendered in both forms.
     */
    actions?: default_2.ReactNode;
    /** Classes on the panel element itself. */
    className?: string;
    /** Classes on the scrolling body. Overrides its default padding via tw-merge. */
    bodyClassName?: string;
    /**
     * Accessible name for the dialog when there is no visible `title` to point
     * at. When `title` IS set the heading labels the dialog via
     * `aria-labelledby` and this prop is unnecessary.
     */
    'aria-label'?: string;
    'data-testid'?: string;
    /**
     * Accessible name for the built-in close button. Defaults to `"Close"`.
     * Set this when a host's own tests (or design system) key on a specific
     * label — e.g. `aria-label="Close panel"` — instead of forking the whole
     * component the way a local `Panel.tsx` had to.
     */
    closeLabel?: string;
    /**
     * Dialog semantics for the floating form: `role="dialog"`, `aria-modal`,
     * and Escape closes it (when this is the top overlay layer). `false`
     * drops all three — the panel renders `role="complementary"`, the same
     * non-modal role a docked Drawer uses, and Escape no longer closes it.
     * Ignored when `docked` (already non-modal). Default `true`.
     */
    modal?: boolean;
    /**
     * Tab-trap the panel and move focus into it on open, restoring it on
     * close. `false` leaves focus wherever the host's own handling put it —
     * for a floating panel driven by direct DOM dispatch rather than real
     * keyboard navigation. Ignored when `docked` (never traps). Default
     * `true`.
     */
    trapFocus?: boolean;
    /**
     * Render the dimmed backdrop behind the floating panel, and close on a
     * click through it. `false` renders the panel with nothing behind it —
     * what a local `Panel.tsx` did before Drawer replaced it — and, because
     * there is then no backdrop that should be catching clicks, makes the
     * full-viewport wrapper `pointer-events-none` so the page behind the panel
     * stays usable. Ignored when `docked` (never has one). Default `true`.
     */
    backdrop?: boolean;
}

/**
 * How many of `count` particles to draw on a `width`×`height` CSS-px surface
 * at `density` per 10,000 px². Exported for the tests.
 */
export declare function drawnParticles(count: number, density: number | undefined, width: number, height: number): number;

export declare function DropdownMenu({ trigger, triggerLabel, triggerTitle, triggerClassName, triggerVariant, triggerTabIndex, triggerTestId, align, sections, className, 'data-testid': testId, }: DropdownMenuProps): JSX.Element;

export declare interface DropdownMenuItem {
    /** Visible item label. */
    label: string;
    /** Optional leading icon / glyph. */
    icon?: ReactNode;
    /** Highlight this item as the currently-active selection. */
    active?: boolean;
    /** Style this item as destructive. */
    danger?: boolean;
    /** Fires on click / Enter; the menu closes afterwards. Not needed on a row with a `submenu`. */
    onSelect?: () => void;
    /** Right-aligned hint after the label — a shortcut (`⌘P`), a count. */
    trailing?: ReactNode;
    /** A second, quieter line under the label. */
    description?: string;
    /** A setting that is on: a check leads the row (menuitemcheckbox). */
    checked?: boolean;
    /**
     * A flyout of further choices, opened from this row — "Share to ›",
     * "Download as ›". Opens on hover, click or ArrowRight; the row itself
     * runs no `onSelect`.
     */
    submenu?: DropdownMenuSection[];
    /**
     * Shown but not actionable: greyed, `aria-disabled`, and a click does
     * nothing (the menu stays open). Since 2.390.3.
     */
    disabled?: boolean;
    /** Why it is disabled — the row's hover tooltip and its accessible description. Since 2.390.3. */
    disabledReason?: string;
    /** A hook for the spec that addresses this row. Without one the row is reachable by its label. */
    'data-testid'?: string;
}

export declare interface DropdownMenuProps {
    /** Content of the built-in trigger button (icon, glyph, text…). */
    trigger: ReactNode;
    /** Accessible label for the trigger button. Default 'Open menu'. */
    triggerLabel?: string;
    /** Optional title attribute (hover tooltip) for the trigger button. */
    triggerTitle?: string;
    /** Optional className for the trigger button. */
    triggerClassName?: string;
    /**
     * The trigger's look. `default` is the small bordered menu button;
     * `primary` is a 36px brand button ("New ▾"), `secondary` a 36px bordered
     * one, `link` bare secondary text ("Relevance ▾"). Since 2.389.6.
     */
    triggerVariant?: 'default' | 'primary' | 'secondary' | 'link';
    /**
     * Tab order of the trigger. Default undefined (a normal tab stop).
     *
     * `-1` is for a menu that lives inside a ROVING-FOCUS list — one trigger per
     * row, forty rows: leaving them all tabbable puts forty stops back in front
     * of everything after the list, which is the cost the roving cursor exists
     * to avoid. The host makes only the cursor row's trigger tabbable.
     */
    triggerTabIndex?: number;
    /** Test hook for the trigger itself; `data-testid` addresses the panel. */
    triggerTestId?: string;
    /**
     * Panel alignment relative to the trigger. 'start' (default) anchors the
     * panel's left edge to the trigger's left edge; 'end' anchors the panel's
     * RIGHT edge to the trigger's right edge.
     */
    align?: 'start' | 'end';
    sections: DropdownMenuSection[];
    /** Optional className for the dropdown panel. */
    className?: string;
    /** Optional testid for the panel. Default 'dropdown-menu'. */
    'data-testid'?: string;
}

export declare interface DropdownMenuSection {
    /** Optional uppercase section heading. */
    label?: string;
    items: DropdownMenuItem[];
    /**
     * The group scrolls in place (`uic-menu-group-scroll`) so the sections
     * after it stay put. For a generated list — one row per room — that would
     * otherwise push the fixed actions below the fold.
     */
    scroll?: boolean;
    /**
     * A quiet line under the group's rows — what the group does as a whole
     * ("Creates a new document."). Since 2.390.3.
     */
    caption?: string;
    'data-testid'?: string;
}

/**
 * Copy a slide, sources included.
 *
 * The citations come along deliberately: a duplicate is nearly always the same
 * claim said differently, and a copy that arrived uncited would be a copy that
 * cannot be saved.
 */
export declare function duplicateSlide(spec: DeckSpec, id: string): DeckSpec;

/** A pencil: "change this". */
export declare function EditIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare interface EmailTemplate {
    templateId: string;
    name: string;
    subject: string;
    htmlBody: string;
    textBody: string;
    variables: string[];
}

export declare function EmailTemplateFormPage({ template, isEdit, onSubmit, onCancel, error, }: EmailTemplateFormPageProps): JSX.Element;

export declare interface EmailTemplateFormPageProps {
    template?: {
        templateId?: string;
        name: string;
        subject: string;
        htmlBody: string;
        textBody: string;
        variables: string[];
    };
    isEdit: boolean;
    onSubmit: (data: {
        name: string;
        subject: string;
        htmlBody: string;
        textBody: string;
        variables: string[];
    }) => Promise<void>;
    onCancel: () => void;
    error?: string | null;
}

export declare function EmailTemplateListPage({ templates, onCreateTemplate, onEditTemplate, onDeleteTemplate, onTestSend, loading, }: EmailTemplateListPageProps): JSX.Element;

export declare interface EmailTemplateListPageProps {
    templates: Array<{
        templateId: string;
        name: string;
        subject: string;
    }>;
    onCreateTemplate: () => void;
    onEditTemplate: (templateId: string) => void;
    onDeleteTemplate: (templateId: string) => Promise<void>;
    onTestSend: (templateId: string, email: string) => Promise<void>;
    loading?: boolean;
}

export declare function EmbeddedCallPanel({ title, subtitle, durationSeconds, live, recording, onPopOut, popOutLabel, children, controls, aside, stage, className, 'data-testid': testId, }: EmbeddedCallPanelProps): JSX.Element;

export declare interface EmbeddedCallPanelProps {
    /** What this call is — a room name, "Alice & Bob", a channel. */
    title: ReactNode;
    /** "3 in call", "Live" — the second thing worth knowing. */
    subtitle?: ReactNode;
    durationSeconds?: number;
    /** Shows the live dot. Default true — an embedded call that is not live is not shown. */
    live?: boolean;
    /**
     * Whether this call records. `armed` = it will (a room with recording on, a
     * DM both people opted into) but nothing is written yet; `active` = writing
     * now. Omitted or neither → no chip, which is the "not recorded" statement.
     */
    recording?: RecordingChipState;
    /** Take the call back out into its floating window. Omitted → no button. */
    onPopOut?: () => void;
    popOutLabel?: string;
    /** The tile area: HangoutLayout / CallParticipantStrip / a stream player. Fills a 16:9 stage. */
    children: ReactNode;
    /** MediaControlsBar or equivalent, rendered under the stage. */
    controls?: ReactNode;
    /**
     * A side panel beside the stage — the call's Chat / People / Devices.
     * Omitted renders nothing (today's output, byte-for-byte). Typically
     * <CallSidePanel> from ./CallSidePanel, fed the same `sidePanelTabs` /
     * `activeSidePanelTab` the floating widget uses, so the docked shape
     * reaches the same destinations instead of forcing a pop-out.
     */
    aside?: ReactNode;
    /** Stage aspect. `video` keeps 16:9; `audio` is a short strip for an audio-only call. */
    stage?: 'video' | 'audio';
    className?: string;
    'data-testid'?: string;
}

export declare const EMOJI_SHORTCODES: readonly EmojiShortcode[];

export declare interface EmojiShortcode {
    /** The code typed between colons, without them. */
    code: string;
    emoji: string;
    /** Extra search terms, so `:party:` finds 🎉 even though its code is `tada`. */
    keywords?: readonly string[];
}

export declare function EmptyState({ icon, title, body, description, actionLabel, onAction, action, actions, testId, actionTestId, tone, className, size, density, align, actionsDirection, details, }: EmptyStateProps): JSX.Element;

export declare interface EmptyStateAction {
    /** Visible label on the action button or link. */
    label: string;
    /** Click handler — required when `href` is not set. */
    onClick?: () => void;
    /** External / internal link — required when `onClick` is not set. */
    href?: string;
    /**
     * Visual variant.
     * `primary`   — solid indigo, used for the first/most important step
     * `secondary` — outlined, used for additional steps
     * `link`      — primary-coloured text, no box ("Show everyone →"). Since 2.390.0.
     * Defaults to `primary` for the first action, `secondary` for the rest.
     */
    variant?: 'primary' | 'secondary' | 'link';
    /**
     * When true (and `href` is set), opens in a new tab with
     * `target=_blank rel=noopener noreferrer` and an sr-only
     * "(opens in new tab)" hint.
     */
    external?: boolean;
    /**
     * Optional copy-to-clipboard CLI snippet rendered in a monospaced
     * `<pre>` underneath the action button.
     */
    code?: string;
}

/**
 * `default` is the centred block (both sizes). `compact` is a single quiet
 * line: no minimum height, no centring, no glyph pedestal — the "No items."
 * that belongs INSIDE a section that already has a heading, where a block
 * placeholder would push the rest of the card down the page.
 *
 * It is a separate axis from `size` on purpose: `size="sm"` is still a block
 * (glyph over title over description), just a smaller one, and that is what
 * kept sending callers back to a hand-written `<div className="italic
 * text-text-tertiary">`. `compact` wins on layout when both are set.
 */
export declare type EmptyStateDensity = 'default' | 'compact';

/**
 * A "how this works" block under the main message, past a rule — a heading,
 * a few lines of explanation, and one quiet action ("Refresh this view").
 * Since 2.390.0.
 */
export declare interface EmptyStateDetails {
    title: string;
    body?: ReactNode;
    action?: EmptyStateAction;
}

export declare interface EmptyStateProps {
    icon?: ReactNode;
    title: string;
    /** Plain-text body (preferred when no markup is needed). */
    body?: string;
    /** Alias for `body` — accepts any ReactNode for richer copy. */
    description?: ReactNode;
    actionLabel?: string;
    onAction?: () => void;
    /** Custom action node (overrides actionLabel/onAction when present). */
    action?: ReactNode;
    /**
     * Multi-action "what to do next" list. When provided, takes precedence
     * over `action` / `actionLabel`+`onAction`. Each entry renders a
     * button or link, with an optional copyable code snippet underneath.
     */
    actions?: EmptyStateAction[];
    /**
     * Optional testid for the container (defaults to "empty-state").
     * Callers with existing tests targeting a specific id can pass it here.
     */
    testId?: string;
    /**
     * Optional testid for the action button (defaults to "empty-state-action").
     */
    actionTestId?: string;
    /**
     * Colour family. `surface` (default) follows the host theme; `code` paints
     * in the permanently-dark terminal palette.
     */
    tone?: EmptyStateTone;
    /**
     * Class for the container. Until now EmptyState took no class at all, so a
     * caller could not even change its padding — which is why every dark or
     * cramped surface hand-rolled its own placeholder instead. For a region too
     * small for the 220px block, reach for `InlinePlaceholder`.
     */
    className?: string;
    /** Block scale. Default `md`. See `EmptyStateSize`. */
    size?: EmptyStateSize;
    /** Layout density. Default `default`. See `EmptyStateDensity`. */
    density?: EmptyStateDensity;
    /**
     * `center` (default): the centred block. `start`: left-aligned, with no
     * minimum height and no centring — an empty state that is the top of a
     * page or a rail ("No initiatives are linked to you yet." under the page
     * title, "Nothing linked yet" at the top of a list column). Since 2.390.0.
     *
     * `size="lg"` (since 2.390.0) is the page-body message at a heading's
     * scale: a 24px bold title over a 16px description.
     */
    align?: 'center' | 'start';
    /**
     * How `actions` lay out. `column` (default): stacked, full width.
     * `row`: side by side at their own width ("Browse all initiatives"
     * beside "Check profile"). Since 2.390.0.
     */
    actionsDirection?: 'column' | 'row';
    /** A "how this works" block under a rule. See `EmptyStateDetails`. Since 2.390.0. */
    details?: EmptyStateDetails | null;
}

/**
 * `md` is the page-body block (220px minimum, 52px glyph). `sm` is for a
 * lane or list group that is one of several on the page: no minimum height,
 * a 28px glyph and a 14px title, so three empty lanes fit above the fold.
 */
export declare type EmptyStateSize = 'md' | 'sm' | 'lg';

/** @see SurfaceTone — which colour family the empty state paints in. */
export declare type EmptyStateTone = SurfaceTone;

export declare function EntityCell({ label, id, href, mono, className, labelClassName, }: EntityCellProps): JSX.Element;

export declare interface EntityCellProps {
    label: string;
    /** Secondary monospace subline (e.g. ID or slug). */
    id?: string;
    /** Makes the label a link. */
    href?: string;
    /** Extra monospace styling on the ID subline (already monospace by default; this is reserved for callers needing emphasis). */
    mono?: boolean;
    className?: string;
    labelClassName?: string;
}

export declare function EntityTable<T extends Record<string, unknown>>({ columns, data, keyField, onRowClick, actions, emptyMessage, emptyIcon, loading, }: EntityTableProps<T>): JSX.Element;

export declare interface EntityTableProps<T> {
    columns: Column<T>[];
    data: T[];
    keyField: string;
    onRowClick?: (item: T) => void;
    actions?: (item: T) => React.ReactNode;
    emptyMessage?: string;
    emptyIcon?: string;
    loading?: boolean;
}

declare interface EphemeralReaction {
    id: string;
    emoji: string;
    x: number;
    y: number;
    timestamp: string;
}

export declare class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps);
    static getDerivedStateFromError(error: Error): ErrorBoundaryState;
    componentDidCatch(error: Error, info: ErrorInfo): void;
    handleRetry: () => void;
    render(): string | number | bigint | boolean | JSX.Element | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined;
}

declare interface ErrorBoundaryProps {
    /** Identifier for which boundary caught the error (logged to console). */
    name: string;
    children: ReactNode;
}

declare interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

export declare type ErrorCategory = 'NetworkError' | 'TimeoutError' | 'ValidationError' | 'LLMError' | 'RegistryConflict'
/** A step looked at the request and said no (constraint not met, forbidden, revision conflict, invalid request): terminal, never retried. */
| 'Refused'
/** The model could not sign in (missing or expired credentials): terminal until an operator refreshes them. */
| 'ModelAuth' | 'UnknownError';

export declare function ErrorPage({ title, message, error, onRetry, onBack, }: ErrorPageProps): JSX.Element;

export declare interface ErrorPageProps {
    title?: string;
    message: string;
    error?: string;
    onRetry?: () => void;
    onBack?: () => void;
}

/** Whether the platform would retry this failure on its own; a `Refused` run is `terminal`. */
export declare type ErrorRetryability = 'retryable' | 'terminal' | 'unknown';

export declare function ErrorState({ icon, title, body, description, actionLabel, onAction, action, testId, actionTestId, }: ErrorStateProps): JSX.Element;

export declare interface ErrorStateProps {
    /** Override the default ⚠️ glyph. Pass a string emoji or a ReactNode. */
    icon?: ReactNode;
    title: string;
    /** Plain-text body (preferred when no markup is needed). */
    body?: string;
    /** Alias for `body` — accepts any ReactNode for richer copy (stack traces, links). */
    description?: ReactNode;
    actionLabel?: string;
    onAction?: () => void;
    /** Custom action node (overrides actionLabel/onAction when present). */
    action?: ReactNode;
    testId?: string;
    actionTestId?: string;
}

export declare function EstimateRow({ label, estimate, className, 'data-testid': testId }: EstimateRowProps): JSX.Element;

export declare interface EstimateRowProps {
    label: string;
    estimate: RunEstimate;
    className?: string;
    'data-testid'?: string;
}

export declare interface EventGlyph {
    icon: string;
    color: string;
    severity: 'info' | 'success' | 'warning' | 'error' | 'neutral';
}

export declare const eventGlyphs: Record<string, EventGlyph>;

export declare function EventRow({ timestamp, type, summary, severity, onClick, selected }: EventRowProps): JSX.Element;

export declare interface EventRowProps {
    timestamp: string;
    type: string;
    summary: string;
    severity?: 'info' | 'warning' | 'error' | 'success';
    onClick?: () => void;
    selected?: boolean;
}

/** Caps an excerpt on a word boundary so a quote never dominates its reply. */
export declare function excerpt(text: string, limit?: number): string;

export declare function ExpandableCallWidget({ title, subtitle, durationSeconds, children, controls, defaultMode: defaultModeProp, inline, onModeChange, persistKey, apiRef, defaultCorner, expandable, sidePanelTabs, activeSidePanelTab, onSidePanelTabChange, zIndex, className, 'data-testid': rootTestId, }: ExpandableCallWidgetProps): JSX.Element;

export declare interface ExpandableCallWidgetHandle {
    /** Always canonical — 'window', never 'docked'. */
    mode: CallWidgetMode;
    /** Accepts either dialect; normalizes to canonical. */
    setMode: (m: AnyCallWidgetMode) => void;
}

export declare interface ExpandableCallWidgetProps {
    /** Header label (left side of chrome). */
    title?: ReactNode;
    /** Optional status line shown under the title (e.g. "0:36 • 3 in call"). */
    subtitle?: ReactNode;
    /** Elapsed call time in seconds. When set, a monospace timer
     *  (data-testid="call-timer") renders after the subtitle — the same
     *  affordance CallWidget's collapsed chrome exposes, so e2e journeys
     *  can read the duration in either mode. */
    durationSeconds?: number;
    /** Body — typically `<HangoutLayout fillParent participants={…}/>`. */
    children: ReactNode;
    /** Optional controls strip rendered below the body. Stays inside the
     *  widget chrome in mini mode (compact); spans full width in window
     *  and fullscreen modes. */
    controls?: ReactNode;
    /** Initial mode. Persisted modes override this once `persistKey` is
     *  set and storage has a prior value. Default: 'mini'.
     *
     *  The pre-2.106 spelling `'docked'` is accepted and normalized to
     *  `'window'`.
     *  @see CallWidgetMode */
    defaultMode?: PersistedWidgetMode | 'docked';
    /**
     * The widget is living INSIDE a container — a document's gutter, a panel —
     * rather than floating over the page.
     *
     * Every mode below is `position: fixed` with a pixel width, which is right
     * for a window and wrong for a slot: re-parented into a 280px column the
     * widget kept its fixed positioning and its own width, so it floated over
     * the page it was supposedly docked into and was clipped by the column it
     * overflowed. Inline drops the positioning and fills the container, and the
     * host owns the geometry.
     */
    inline?: boolean;
    /** Fires after every settled mode change (programmatic or via UI).
     *  Emits the CANONICAL vocabulary — 'window' where builds before
     *  2.106 emitted 'docked'. */
    onModeChange?: (mode: CallWidgetMode) => void;
    /** localStorage key for `{mode,x,y,width,height}`. Omit to opt out
     *  (state lives only in memory). */
    persistKey?: string;
    /** Imperative handle — `apiRef.current.setMode('fullscreen')`. */
    apiRef?: Ref<ExpandableCallWidgetHandle>;
    /** Initial corner-snap for mini mode (only used if no persisted
     *  position exists). Default 'bottom-right'. */
    defaultCorner?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    /** Hide the expand affordances (useful for read-only viewers). */
    expandable?: boolean;
    /**
     * Destinations for the docked side panel (chat / people / captions).
     *
     * The panel is part of the widget, not a sibling floating window: it
     * renders inside the same positioned root, so it moves, resizes and
     * closes with the call. Its toggle buttons are appended to the controls
     * strip automatically — the host positions nothing.
     *
     * Per-mode behaviour (see ./CallSidePanel for the full rationale):
     *   'window' / 'fullscreen'  SPLIT — the stage keeps `flex-1` and the
     *                            dock takes a right-edge column (w-80, or
     *                            w-96 in fullscreen). This is the Google
     *                            Meet / Zoom / Teams layout.
     *   'mini'                   OVERLAY — a full-bleed sheet on top of the
     *                            320px stage. Splitting a mini widget would
     *                            leave the video ~0px wide; Meet and Teams
     *                            both switch to a covering sheet at this
     *                            size instead.
     */
    sidePanelTabs?: CallSidePanelTab[];
    /** The single open destination, or null when the dock is closed. */
    activeSidePanelTab?: string | null;
    /** Fires with the next id, or null when the dock should close. */
    onSidePanelTabChange?: (id: string | null) => void;
    /** z-index for the floating modes. Default 9999. */
    zIndex?: number;
    /** Class on the root. */
    className?: string;
    /** Root testid. Defaults to 'expandable-call-widget' so tests (and the
     *  demo harness) can scope to THIS widget — `data-call-widget-mode` is
     *  also stamped by <CallWidget>, so it is not a unique handle. */
    'data-testid'?: string;
}

export declare function ExpertCard({ name, title, subtitle, imageUrl, matchedSkills, otherSkills, contexts, evidence, evidenceLabel, onAsk, askLabel, footerExtra, onOpen, className, 'data-testid': testId, }: ExpertCardProps): JSX.Element;

export declare interface ExpertCardProps {
    name: string;
    title?: string;
    /** Second context line, e.g. department or team. */
    subtitle?: string;
    imageUrl?: string;
    /** Skills that matched the query, strongest first. */
    matchedSkills: readonly ExpertSkillMatch[];
    /** The person's other skills, shown quieter. Keep short; the card truncates. */
    otherSkills?: readonly string[];
    /** Where this person spends their time — initiative/project names. */
    contexts?: readonly string[];
    /** The work the match was derived from. */
    evidence?: readonly ExpertEvidenceItem[];
    /** Heading over the evidence list. */
    evidenceLabel?: string;
    /** Primary action. Omit to render a card with no footer. */
    onAsk?: () => void;
    askLabel?: string;
    /** Secondary slot beside the action, e.g. a link into an org graph. */
    footerExtra?: ReactNode;
    /** Click anywhere that isn't a control — e.g. open a profile. */
    onOpen?: () => void;
    className?: string;
    'data-testid'?: string;
}

export declare interface ExpertEvidenceItem {
    id: string;
    /** e.g. a document title, an ADR, a postmortem. */
    title: string;
    /** Where it came from — "adr", "slack", "postmortem". Shown as a quiet tag. */
    source?: string;
    href?: string;
}

export declare interface ExpertSkillMatch {
    name: string;
    /**
     * 0..1 evidence strength for THIS skill on THIS person, when the domain
     * has one (e.g. a person→skill edge weight). Renders as chip emphasis,
     * never as a printed number — a number invites ranking people, which is
     * exactly the reading this card exists to avoid.
     */
    strength?: number;
}

export declare function ExplorerLayout({ rail, children, aside, railWidth, header, paneHeader, paneFooter, railCount, railCountStyle, railBack, railHeading, railCollapsed, onToggleRail, railLabel, railTitle, railActions, railHeader, railFooter, panePadding, asidePlacement, className, 'data-testid': testId, }: ExplorerLayoutProps): JSX.Element;

export declare interface ExplorerLayoutProps {
    /** Left rail — flush to the pane's left edge, its own border, scrolls independently. */
    rail: ReactNode;
    /** The main pane. */
    children: ReactNode;
    /** Optional right-hand context bar. Stacks below the pane under `2xl`, sits beside it at `2xl` and up. */
    aside?: ReactNode;
    /**
     * Rail width. `md` is the 300px agentcore measured against; `sm` is 240px for
     * a shallower tree; `lg` is 368px for a two-line work list with its toolbar
     * (the Documents Work column, measured against the redesign's 370px).
     */
    railWidth?: 'sm' | 'md' | 'ml' | 'lg';
    /**
     * A band ABOVE all three columns — a scope header (breadcrumb, title, stats,
     * tabs) that names what the rail, the pane and the aside are all looking at.
     * It does not scroll; the columns below it keep their independent scrolling.
     * Since 2.385.0.
     */
    header?: ReactNode;
    /**
     * A band over the PANE only — a crumb trail with the scope's controls
     * ("Build › Distillation › Knowledge" · All repositories · Open Library).
     * Unlike `header` it spans neither the rail (so the rail's own title keeps
     * the top-left corner) nor the aside (so the aside's top row — a
     * `ContextColumn`'s tabs — keeps the top of its own column). It does not
     * scroll; the pane below it does. No border of its own: it reads as the top
     * of the pane. Since 2.389.0; spans only the pane since 2.389.4 (it spanned
     * pane + aside, and `ScopeHeader variant="crumbs"` controls, which hang
     * into the record head below the band, landed on the aside's top row).
     */
    paneHeader?: ReactNode;
    /**
     * A band UNDER the pane only — a docked composer that must stay put while
     * the pane scrolls. It does not scroll; the pane above it does. It spans
     * the pane's column, never the rail or the aside (the same rule as
     * `paneHeader`), and has no border of its own. Since 2.390.0.
     */
    paneFooter?: ReactNode;
    /** A count beside `railTitle` ("Work 11"). Since 2.385.0. */
    railCount?: number;
    /** How `railCount` reads — see `WorkspaceRail.countStyle`. Default `chip`. Since 2.390.0. */
    railCountStyle?: 'chip' | 'plain';
    /**
     * A back link over the rail's title — "‹ Initiatives" above "Work 11". See
     * `WorkspaceRail.back`. Since 2.390.0.
     */
    railBack?: WorkspaceRailBack | null;
    /** The rail's heading style — see `WorkspaceRail.heading`. Default `compact`. Since 2.385.0. */
    railHeading?: 'compact' | 'prominent' | 'label';
    /**
     * The rail folded to a strip with one control that brings it back. For a
     * surface that wants the width — a diagram, a wide table — the list of
     * documents is worth giving up for a while. Controlled: the host owns the
     * state (and typically remembers it).
     */
    railCollapsed?: boolean;
    /** Present, the rail gets a fold control and the strip an unfold control. */
    onToggleRail?: () => void;
    /** What the rail holds, for the controls' accessible names. Default "the list". */
    railLabel?: string;
    /**
     * The rail's name, in its header row — the same row the fold control sits
     * in, so the rail is titled the way a `ContextColumn` on the other side is
     * (its tabs live in the same h-9 row). Without it the row holds only the
     * fold control, which reads as a stray button over the first section.
     */
    railTitle?: string;
    /**
     * Controls that belong to the rail as a whole — "new item", a filter —
     * placed in the header row between the title and the fold control. The
     * rail's own actions are not page chrome; putting them in a band above the
     * frame left them at the window's inset while the rail sat flush below.
     */
    railActions?: ReactNode;
    railHeader?: ReactNode;
    railFooter?: ReactNode;
    /**
     * `stack` (default): the aside stacks below the pane under `2xl` and sits
     * beside it from `2xl`. `beside`: always beside, at every width — for a pane
     * whose bottom row must be the window's (an editor with a pinned composer);
     * the host keeps the aside narrow (a `ContextColumn` strip) when space is
     * short. Since 2.365.0.
     */
    asidePlacement?: 'stack' | 'beside';
    /** Padding inside the main pane. `none` when the pane hosts its own full-bleed surface (an editor). */
    panePadding?: 'none' | 'md';
    className?: string;
    'data-testid'?: string;
}

/**
 * An arrow leaving to the upper right, with no box: "opens somewhere else" —
 * the ↗ after "Repository" on an outlined link button. `PopOutIcon` is the
 * boxed variant ("open in its own view"). Since 2.390.0.
 */
export declare function ExternalLinkIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** An eye: watching, "N people are seeing this". */
export declare function EyeIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** `EyeIcon` with a slash through it: hidden — not visible to others. */
export declare function EyeOffIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function FeedRow({ leading, title, timestamp, timestampIso, timestampTitle, meta, metaTone, actions, onJump, jumpLabel, unread, className, 'data-testid': testId, ...rest }: FeedRowProps): JSX.Element;

export declare interface FeedRowProps extends Omit<HTMLAttributes<HTMLLIElement>, 'title' | 'children'> {
    /**
     * Left-hand visual: a thumbnail, an avatar, a glyph, a status disc. Rendered
     * OUTSIDE the jump so anything it announces survives — see above. Give it an
     * accessible name if it carries meaning, and `aria-hidden` if it does not.
     */
    leading: ReactNode;
    /**
     * Line one. `string`, not `ReactNode`, on purpose: it is also the line's
     * `title` attribute, and a caller who could pass markup could pass a second
     * line. Truncates.
     */
    title: string;
    /**
     * Right-aligned on the title line — already formatted, and short. A feed
     * column is read by shape ("14:03", "Yesterday", "Tue"), so a phrase like
     * "3 days ago" costs the reader arithmetic and cannot be scanned.
     *
     * Callers used to stuff this into `meta`, where it sat third in a run of
     * middle-dots and was the first thing to be truncated away.
     */
    timestamp?: string;
    /** ISO-8601 behind the stamp. Its presence is what makes the stamp a `<time>`. */
    timestampIso?: string;
    /** Hover text for the stamp — the full instant the abbreviation stands for. */
    timestampTitle?: string;
    /**
     * Line two: who, and where. Required, because a row whose second line is
     * sometimes absent is a list of two different heights. Truncates.
     */
    meta: string;
    /**
     * Colours line two when it carries a state rather than context — `danger`
     * for a run's error text, which read as ordinary grey metadata beside
     * "Hank Anderson · 180 KB". Omit for the quiet default.
     */
    metaTone?: Tone;
    /** Trailing controls — unpin, download, Approve/Reject. Never the jump: the row is the jump. */
    actions?: ReactNode;
    onJump?: () => void;
    /**
     * The jump's accessible name. It replaces the row's text for a screen
     * reader, so say where it goes: "Go to the pinned message from Hank".
     */
    jumpLabel?: string;
    /** Draws a dot over `leading` and reflects `data-unread` for selection. */
    unread?: boolean;
    /** Also spelled onto the jump as `<testid>-jump`, so it can be clicked by name. */
    'data-testid'?: string;
}

/** Hydration seam — see `ActivityPanelProps.fetchActivity`. */
export declare type FetchActivityFn = (args: {
    idToken: string | null;
    limit: number;
}) => Promise<ActivityResponse>;

declare interface FieldTypeDefinition {
    /** Unique key — matches SectionType for built-ins; UUID for user-defined types */
    type: string;
    label: string;
    icon: string;
    description: string;
    /** Available renderer keys per view mode, e.g. { editor: ['tasks:editor'] } */
    rendererKeys: Partial<Record<ViewMode, string[]>>;
    /** Human-readable label for each renderer key */
    rendererLabels: Record<string, string>;
    /**
     * When set, renderer resolution uses this type's renderers instead of `type`.
     * User-defined field types set this to the built-in type they wrap.
     */
    rendererType?: string;
}

/** What each kind is called, for a caller building a "Page · Sprint planning" line. */
export declare const FILE_KIND_LABELS: Record<FileKind, string>;

export declare const FileInput: ForwardRefExoticComponent<FileInputProps & RefAttributes<HTMLInputElement>>;

export declare interface FileInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'value' | 'defaultValue'> {
    /**
     * Called with the picked files. Always an array (never a FileList), and never
     * called with the raw event — the input resets itself immediately afterwards,
     * so an event held past this callback would already be stale.
     */
    onFiles: (files: File[]) => void;
    'data-testid'?: string;
}

export declare type FileKind = 'page' | 'presentation' | 'recording' | 'transcript' | 'diagram' | 'folder' | 'agent' | 'experiment' | 'call' | 'conversation' | 'media' | 'workflow';

export declare function FileKindMark({ kind, size, variant, label, className, 'data-testid': testId }: FileKindMarkProps): JSX.Element;

export declare interface FileKindMarkProps {
    kind: FileKind;
    /** `sm` 18px (tree rows), `md` 22px (default), `lg` 28px, `xl` 32px, `2xl` 40px (an editor head, beside the title and its save line). */
    size?: FileKindMarkSize;
    /** Accessible name. Omit when the file's name is already beside the mark. */
    label?: string;
    /**
     * `tinted` (default) is the glyph in a coloured box, one colour per kind.
     * `plain` is the glyph alone, secondary ink, same box size — for a list row
     * whose title is the thing to read.
     * `glyph` (2.386.0) is the file-tree mark: no box, a glyph that fills it
     * (18px at `sm`), neutral ink for pages and folders, and the two kinds a
     * reader scans for drawn in colour — a deck as a three-colour bar chart, a
     * diagram as two linked nodes in the brand colour. A selected tree row
     * turns the neutral ink to its own text colour (`currentColor`).
     */
    variant?: FileKindMarkVariant;
    className?: string;
    'data-testid'?: string;
}

export declare type FileKindMarkSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/** `outline` (since 2.386.5): the glyph alone, in the kind's colour, no box fill — an editor's title mark. */
export declare type FileKindMarkVariant = 'tinted' | 'plain' | 'glyph' | 'outline' | 'app';

export declare function FilePickerButton({ onFiles, accept, multiple, variant, icon, disabled, children, className, 'aria-label': ariaLabel, 'data-testid': testId, }: FilePickerButtonProps): JSX.Element;

export declare interface FilePickerButtonProps {
    onFiles: (files: File[]) => void;
    /** The input's `accept`, e.g. ".md,.txt". */
    accept?: string;
    multiple?: boolean;
    /** `secondary` is a 36px bordered button, `primary` the brand one. */
    variant?: 'secondary' | 'primary';
    icon?: ReactNode;
    disabled?: boolean;
    children: ReactNode;
    className?: string;
    'aria-label'?: string;
    'data-testid'?: string;
}

export declare function FileUploadDrop({ accept, maxSize, multiple, onFiles, onError, disabled, label, className, 'data-testid': testId, inputTestId, inputProps, }: FileUploadDropProps): JSX.Element;

export declare interface FileUploadDropProps {
    /** Comma-separated MIME types or extensions, e.g. "image/*,.pdf" */
    accept?: string;
    /** Max individual file size in bytes */
    maxSize?: number;
    multiple?: boolean;
    onFiles: (files: File[]) => void;
    onError?: (message: string) => void;
    disabled?: boolean;
    /** Custom drop-zone label */
    label?: string;
    className?: string;
    'data-testid'?: string;
    /**
     * `data-testid` on the hidden `<input type="file">`.
     *
     * The zone's own testid lands on the wrapper, and the input is
     * `aria-hidden` with `tabIndex={-1}`, so a test had no way to reach the
     * element it must fire a `change` at — there is no cross-browser way to
     * drive a real file picker. That is a real adoption blocker, not a
     * nicety: a host whose spec selects the input by testid could not move
     * off its hand-rolled drop zone at all.
     */
    inputTestId?: string;
    /**
     * Extra attributes for the hidden input — `name`, `capture`, `form`, a
     * `webkitdirectory`. `type`, `accept`, `multiple`, `disabled`, `ref` and
     * `onChange` are owned here and cannot be overridden: they are the
     * component's contract, not decoration.
     */
    inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'accept' | 'multiple' | 'disabled' | 'onChange' | 'ref' | 'className'>;
}

export declare function FileUploadEditorRenderer({ section, editable, onUpdateSection, }: SectionRendererProps): JSX.Element;

export declare const fileUploadFieldType: FieldTypeDefinition;

export declare function FileUploadReaderRenderer({ section }: SectionRendererProps): JSX.Element;

/**
 * Height the region should take: everything from its own top edge down to
 * the bottom of the window, minus `bottomGap`, never below `minHeight`.
 * Exported for testing — the arithmetic is the whole component.
 */
export declare function fillHeight(offsetTop: number, viewportHeight: number, bottomGap: number, minHeight: number): number;

export declare function FilterChip({ active, onClick, color, dot, size, children, className, disabled, 'data-testid': dataTestId, }: FilterChipProps): JSX.Element;

export declare interface FilterChipProps {
    active: boolean;
    onClick: () => void;
    /** Dot color (for colored department/status dots); also tints the active state. */
    color?: string;
    /** Show a colored dot before the label. */
    dot?: boolean;
    /**
     * `md` is the comfortable default for a filter bar people actually click.
     * `sm`/`xs` are for chips packed into a dense row or a table cell — at xs a
     * filter reads as a caption rather than a control.
     */
    size?: 'md' | 'sm' | 'xs';
    children: ReactNode;
    className?: string;
    disabled?: boolean;
    /** Forwarded to the underlying <button> for test selectors. */
    'data-testid'?: string;
}

/** A funnel: "filter this list". Since 2.385.0. */
export declare function FilterIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function FilterPopover({ children, label, activeCount, onClear, clearLabel, open: controlledOpen, onOpenChange, placement, size, trigger, panelLabel, className, panelClassName, icon, 'data-testid': testId, }: FilterPopoverProps): JSX.Element;

export declare interface FilterPopoverProps {
    /** The filter controls. */
    children: ReactNode;
    /** Button text. Default "Filter". */
    label?: string;
    /** How many filters are narrowing the list; `> 0` shows the badge. */
    activeCount?: number;
    /** Renders a "Clear filters" row at the foot of the panel. */
    onClear?: () => void;
    /** Default "Clear filters". */
    clearLabel?: string;
    /** Controlled open state. */
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    /**
     * Which edge of the button the panel hangs from. The panel is
     * collision-aware — a `bottom-*` placement flips above the button on its
     * own when there is no room below — so the `top-*` values (kept for
     * callers written against the in-place panel) resolve to their `bottom-*`
     * counterpart and let the flip decide.
     */
    placement?: InlineMenuPlacement;
    size?: ButtonSize;
    /**
     * `icon`: a square button holding only the funnel (the label becomes its
     * accessible name); an active filter shows as a small primary dot on its
     * corner, the count in the accessible name. Default `label`.
     */
    trigger?: 'label' | 'icon';
    /** Accessible name of the panel. Default "Filters". */
    panelLabel?: string;
    className?: string;
    panelClassName?: string;
    /** Replaces the funnel glyph (e.g. `SlidersIcon`). Since 2.389.6. */
    icon?: ReactNode;
    'data-testid'?: string;
}

export declare const FLOATING_PANEL_ANCHORS: readonly FloatingPanelAnchor[];

/** A small card pinned to a corner of the viewport — a table of contents, a mini-map. */
export declare function FloatingCard({ children, corner, width, maxHeight, className, 'data-testid': testId, }: FloatingCardProps): JSX.Element;

export declare interface FloatingCardProps {
    children: ReactNode;
    /** Which corner of the viewport it sits in. Default bottom-right. */
    corner?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    /** Width in px. Default 160. */
    width?: number;
    /** Height cap in px; the card scrolls past it. Default 280. */
    maxHeight?: number;
    className?: string;
    'data-testid'?: string;
}

export declare function FloatingPanel({ open, onClose, title, children, defaultPosition, persistKey, snapEnabled, snapThreshold, snapAnchors, onSnap, baseZIndex, widthClassName, heightClassName, tone, zIndexClassName, className, 'data-testid': testId, }: FloatingPanelProps): ReactPortal | null;

/** Named viewport docking positions a panel can snap to. */
export declare type FloatingPanelAnchor = 'top-left' | 'top-right' | 'left-center' | 'right-center' | 'bottom-left' | 'bottom-right';

export declare interface FloatingPanelProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    /** Viewport-relative initial anchor when no persisted position exists.
     *  Accepts any of the six named anchors or an explicit point. */
    defaultPosition?: FloatingPanelAnchor | {
        x: number;
        y: number;
    };
    /** localStorage key persisting the resolved anchor + offset across
     *  sessions. */
    persistKey?: string;
    /** Snap to a nearby anchor on drag release. Default true. */
    snapEnabled?: boolean;
    /** Proximity (px) at which an anchor arms. Default 24. */
    snapThreshold?: number;
    /** Restrict which anchors participate. Default: all six. */
    snapAnchors?: readonly FloatingPanelAnchor[];
    /** Fires when a drag settles into an anchor. */
    onSnap?: (anchor: FloatingPanelAnchor) => void;
    /** Floor for the shared focus-to-front z-order. Default 9999 — matches
     *  `zIndexClassName`. Pass alongside a custom `zIndexClassName` so a
     *  raise doesn't jump the panel out of its intended layer. */
    baseZIndex?: number;
    widthClassName?: string;
    heightClassName?: string;
    tone?: 'light' | 'dark';
    zIndexClassName?: string;
    className?: string;
    'data-testid'?: string;
}

/**
 * A folder: "file this under something of your own".
 *
 * The tab is drawn short and offset left so it reads as a folder rather than
 * as a rectangle with a bite out of it at 14px, which is the size the
 * conversation row menu uses it at.
 */
export declare function FolderIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function FollowBanner({ name, onStop, autoStopOnInteract, className, 'data-testid': testId, }: FollowBannerProps): JSX.Element | null;

export declare interface FollowBannerProps {
    /** Who is being followed. Null renders nothing. */
    name: string | null;
    onStop: () => void;
    /**
     * End follow on the viewer's own mousedown / keydown / wheel. Default on;
     * turn off only where the host routes those interactions itself.
     */
    autoStopOnInteract?: boolean;
    className?: string;
    'data-testid'?: string;
}

/**
 * A strip of clickable follow-up suggestion chips, with optional refresh button.
 */
export declare function FollowUpChips({ suggestions, onSelect, onRefresh, label, className, }: FollowUpChipsProps): JSX.Element;

export declare interface FollowUpChipsProps {
    suggestions: string[];
    onSelect: (suggestion: string) => void;
    /** if provided, shows a ↻ refresh button */
    onRefresh?: () => void;
    /** optional label before chips, e.g. "Follow up:" */
    label?: string;
    className?: string;
}

export declare const fontSize: {
    readonly xs: string;
    readonly sm: string;
    readonly md: string;
    readonly lg: string;
    readonly xl: string;
};

export declare function forceFail(pipelineId: string, runId: string): Promise<ForceFailResponse>;

export declare interface ForceFailResponse {
    runId: string;
    status: string;
    hint: string;
    at: string;
}

export declare interface ForkNodeData {
    type: 'fork';
    /** Number of parallel output branches (2..8). */
    branchCount: number;
    branchLabels?: string[];
}

export declare function formatAudioTime(seconds: number): string;

export declare function formatBytes(bytes: number): string;

/** "12m 4s" — the shape a transcript wants, not "00:12:04". */
export declare function formatCallDuration(ms: number): string;

/** Formats an ISO timestamp string to HH:MM local time. */
export declare function formatChatTime(isoString: string): string;

export declare function formatCompactAge(value: string | number | Date | null | undefined, now?: number): string | undefined;

/** "12:04" / "1:02:11" — a duration people read, not a millisecond count. */
export declare function formatDuration(ms?: number): string;

/**
 * The display text for an estimate. Ranges read "$0.03 – $0.30" or
 * "1 – 6 min"; equal ends collapse to one value. A range whose numbers are
 * not finite or are negative is not an estimate — it reads "Unavailable"
 * rather than printing NaN.
 */
export declare function formatEstimate(estimate: RunEstimate): string;

/** "9h ago", "just now", "Sep 3" — `formatCompactAge` read as a sentence. */
export declare function formatSourceAge(value: string | number | Date | null | undefined, now?: number): string | undefined;

/** "$1.46", "<$0.01", "$1,204". Exported for tests and hosts that echo it. */
export declare function formatSpend(usd: number): string;

/** `84.2k`, `1.3M` — a token count is scale, not an exact figure. */
export declare function formatTokens(tokens: number): string;

/** Formats a list of typing user names. Trims to a max of 2 explicit names + "+N others". */
export declare function formatTypingBanner(names: string[]): string;

/**
 * Labeled wrapper around an input control. Wires `<label htmlFor>` →
 * `<input id>`, plus `aria-describedby` for hints/errors and `aria-invalid`
 * for the error state. Use the render-prop API so we don't have to wrap
 * every kind of input the library ships.
 */
export declare function FormField({ label, hint, error, required, layout, children, className, labelClassName, style, hintTestId, 'data-testid': testId, }: FormFieldProps): JSX.Element;

export declare type FormFieldLayout = 'stacked' | 'inline';

export declare interface FormFieldProps {
    label: string;
    /**
     * Helper text shown under the control. A plain string still works; also
     * accepts a `ReactNode` for a hint that needs a link or inline emphasis
     * (e.g. "See the docs" as an actual `<a>`) rather than plain text.
     */
    hint?: ReactNode;
    /** Error message; when present, replaces the hint and adds a danger border. */
    error?: string;
    /**
     * `data-testid` on the hint/error element. Omit to leave it untestable by
     * id, same as before this prop existed.
     */
    hintTestId?: string;
    /** Renders an asterisk after the label. Does NOT enforce validation. */
    required?: boolean;
    layout?: FormFieldLayout;
    /**
     * Pass-through render. The function receives an `id` and the wiring
     * (`aria-describedby` / `aria-invalid`) you should spread onto the input
     * so the label associates correctly:
     *
     *   <FormField label="Name">
     *     {(p) => <input {...p} value={...} onChange={...} />}
     *   </FormField>
     *
     * For controls that take an explicit `id` prop (Switch's `aria-labelledby`),
     * `wiring.labelId` exposes the label's id.
     */
    children: (wiring: {
        id: string;
        labelId: string;
        'aria-describedby'?: string;
        'aria-invalid'?: boolean;
        'aria-required'?: boolean;
    }) => ReactNode;
    className?: string;
    /**
     * Overrides the label's typography. Exists so surfaces with their own label
     * look — the uppercase filter-bar captions on the identity admin pages, for
     * instance — can adopt this component for its `htmlFor` / `aria-describedby`
     * wiring instead of hand-rolling a detached `<label>` that names nothing.
     * Merged over the defaults, so error colouring still applies unless you
     * override it.
     */
    labelClassName?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}

export declare function FormRow({ children, stackBelow, gap, className, 'data-testid': testId, }: FormRowProps): JSX.Element;

export declare interface FormRowProps {
    /** The fields. Usually `<FormField>`s; anything is accepted. */
    children: ReactNode;
    /**
     * Below this width the row stacks. `sm` (default, 640px) suits a modal;
     * `md` (768px) suits a full-width form where three fields share the row.
     */
    stackBelow?: 'sm' | 'md';
    /** Gap between fields. Default 12px, matching Stack's `md`. */
    gap?: 'sm' | 'md' | 'lg';
    className?: string;
    'data-testid'?: string;
}

/** The exact first line of a forwarded message's body. See above. */
export declare function forwardAttributionLine(from: ForwardedFrom): string;

/**
 * Where a forwarded message came from, carried in `metadata.forwardedFrom`.
 *
 * ## Why this is not `replyTo`
 *
 * `replyTo` already carries `{ messageId, author, text, timestamp }` and the
 * panel already renders it as a quote, so riding it was the obvious move and
 * it is wrong in three ways, each of which shows up in the product:
 *
 *   * `replyTo` MEANS "this answers that". `groupThreads` reads it and nests
 *     the message under its target whenever that target is in the loaded
 *     window — so forwarding a message back into the channel it came from
 *     would file the forward as a reply to the original, indented under it.
 *   * The quote block offers a jump to `messageId`. A forwarded message's
 *     original is in a DIFFERENT conversation, so the jump is guaranteed to
 *     find nothing — a control that goes nowhere, which the `onJumpToMessage`
 *     note above exists to avoid.
 *   * A reply quotes an excerpt and adds new words beneath it. A forward has
 *     no new words: the original text IS the body. Storing the same sentence
 *     in both `content` and `replyTo.text` gives two copies that disagree the
 *     moment anything edits one.
 *
 * ## No `text` field, on purpose
 *
 * The forwarded words live in the message's own `content`, once. This carries
 * only the facts a plain string cannot: which conversation, which person, and
 * when they said it.
 *
 * ## What a client that has never heard of this field shows
 *
 * The attribution is ALSO written into `content` by the host that posts the
 * forward ("Forwarded from #design — Hank Anderson:" above the words). That
 * is what makes an old client — or a notification preview, or the
 * conversation-list preview, none of which read metadata — show a forward
 * that still says whose words these are. Strip the attribution into metadata
 * alone and a forward degrades into an unattributed quote, which is the exact
 * thing forwarding exists to prevent. This field is therefore an ENRICHMENT
 * of the text, never a replacement for it, and the panel renders it as a
 * marker rather than by restating the sentence the body already carries.
 */
export declare interface ForwardedFrom {
    /** The original's server id. Not linkable from here — see above — but it is
     *  what lets a host dedupe, audit, or one day offer "open the original". */
    messageId: string;
    /** The channel key the original was said in. Plumbing; prefer the label. */
    channel: string;
    /** How that conversation calls itself — "design", "Carol Nguyen". */
    channelLabel?: string;
    /** The ORIGINAL author's display name, never the forwarder's. */
    author: string;
    /** The original author's stable user id, so an avatar or hovercard resolves. */
    authorUserId?: string;
    /** ISO: when the original was said, not when it was forwarded. */
    timestamp?: string;
}

/** Reads `metadata.forwardedFrom`, tolerating anything that is not the shape. */
export declare function forwardedFromMetadata(metadata: Record<string, unknown> | undefined): ForwardedFrom | null;

/** A hooked arrow: forwarded — this came from somewhere else. */
export declare function ForwardIcon({ size, ...rest }: GlyphProps): JSX.Element;

/**
 * "Forwarded from #design — Hank Anderson", from the metadata.
 *
 * The visible half of the marker, and — with a colon on the end, see
 * `forwardAttributionLine` — a byte-for-byte reproduction of the line a host
 * writes into the forwarded message's `content`. Exported so a host composes
 * its bodies with THIS function instead of its own copy of the sentence: the
 * two agreeing is what lets the panel recognise its own prefix, and a host
 * that rewords its copy silently loses the de-duplication below.
 */
export declare function forwardOriginLabel(from: ForwardedFrom): string;

/**
 * The unabbreviated date, for the separator's accessible name and for the
 * `title` on a row's HH:MM.
 *
 * "Today" is a fine thing to READ and a poor thing to be told by a screen
 * reader hours later in a saved transcript, so the announced name always
 * carries the real date as well.
 */
export declare function fullDateLabel(isoString: string): string;

/** Full local date AND time — the `title` of a row's truncated HH:MM. */
export declare function fullTimestampLabel(isoString: string): string;

/** Runtime configuration read from env vars */
export declare interface GatewayConfig {
    wsUrl: string;
    cognitoToken: string;
    defaultChannel: string;
}

/** Error received from the gateway (matches server error-codes.js format) */
export declare interface GatewayError {
    /** Standardized error code (e.g. AUTH_TOKEN_EXPIRED, AUTHZ_CHANNEL_DENIED) */
    code: string;
    /** Human-readable description for display */
    message: string;
    timestamp: string;
}

/** A raw message received over the WebSocket */
export declare interface GatewayMessage {
    type: string;
    action?: string;
    channel?: string;
    error?: GatewayError;
    [key: string]: unknown;
}

declare interface GatewayMessage_2 {
    type: string;
    channel?: string;
    payload?: unknown;
    [key: string]: unknown;
}

declare class GatewayProvider extends Observable<string> {
    readonly doc: Y.Doc;
    readonly channel: string;
    readonly awareness: Awareness;
    private readonly _sendMessage;
    private _synced;
    private _destroyed;
    private _awarenessTimer;
    private readonly _updateHandler;
    constructor(doc: Y.Doc, channel: string, sendMessage: SendMessage);
    /** Whether we have received at least one snapshot from the server. */
    get synced(): boolean;
    /**
     * Apply a remote Y.js document update received from the gateway.
     * Uses `this` as origin so the update handler above skips re-sending it.
     */
    applyRemoteUpdate(b64: string): void;
    /**
     * Apply the initial document snapshot from the server.
     * Functionally identical to applyRemoteUpdate but marks the provider as synced.
     */
    applySnapshot(b64: string): void;
    /**
     * Apply a remote awareness update received from the gateway.
     */
    applyAwarenessUpdate(b64: string): void;
    /**
     * Tell peers this client is gone — synchronously, on the current tick.
     *
     * The awareness sender is debounced by 50ms, which is fatal at teardown:
     * `Awareness.destroy()` clears the local state, our update handler schedules
     * the removal broadcast 50ms in the future, and by then `useYjsDoc` has
     * already sent `unsubscribe` for this channel (a gateway routes crdt
     * messages by subscription, so it drops the late one). On a page unload the
     * timer never runs at all. Either way the departing client lingers in every
     * other participant's avatar list until awareness times it out — or forever,
     * if no other awareness traffic arrives to prompt a re-render.
     */
    private _broadcastDeparture;
    destroy(): void;
}

export declare function GenerativeImagePreview({ status, src, alt, startedAt, className, }: GenerativeImagePreviewProps): JSX.Element;

export declare interface GenerativeImagePreviewProps {
    status: GenerativeImagePreviewStatus;
    /** Produced-image URL; rendered when status is 'done'. */
    src?: string;
    alt?: string;
    /** Epoch ms when synthesis started — enables the elapsed-time chip. */
    startedAt?: number;
    /** Caller controls size (width/height/aspect), like ImageThumbnail. */
    className?: string;
}

export declare type GenerativeImagePreviewStatus = 'synthesizing' | 'done';

export declare type GeometricOp = GeometricOpRotate | GeometricOpFlip | GeometricOpFlop;

export declare type GeometricOpFlip = {
    op: 'flip';
};

export declare type GeometricOpFlop = {
    op: 'flop';
};

export declare type GeometricOpRotate = {
    op: 'rotate';
    degrees: number;
    background?: string;
    trimAfter?: boolean;
};

/** The origin requests currently resolve to — see the resolution order above. */
export declare function getApiBaseUrl(): string;

export declare function getApprovalApiBase(): string;

/** @deprecated Alias for `getApiBaseUrl` — see `setDocumentTypeApiBaseUrl`. */
export declare const getDocumentTypeApiBaseUrl: typeof getApiBaseUrl;

/**
 * Maps an event type prefix to a category for filter UIs.
 * Used by ExecutionLog + Observability EventsPage to group filters.
 */
export declare function getEventCategory(type: string): 'lifecycle' | 'step' | 'llm' | 'approval' | 'activity' | 'social' | 'other';

/**
 * Look up a glyph for an event type, falling back to a neutral bullet.
 */
export declare function getEventGlyph(type: string): EventGlyph;

export declare function getFieldType(type: string): FieldTypeDefinition | undefined;

export declare function getFieldTypes(): FieldTypeDefinition[];

/**
 * Returns a fresh page-config (with safe defaults) when the stored
 * config is undefined. Used by the wizard so toggles always have a
 * value to bind to.
 */
export declare function getPageConfig(type: DocumentType_2): DocumentTypePageConfig;

/**
 * Migration helper. Returns the type's `pages` if present, otherwise
 * derives a single page that wraps every field. Pure function — does
 * NOT mutate the input. Existing code paths that don't know about
 * pages can keep reading `fields`; the wizard reads via this helper.
 */
export declare function getPagesView(type: DocumentType_2): DocumentTypePage[];

/**
 * Fetch a single pipeline run by runId from the dedicated v2 endpoint.
 * The v2 handler does live-then-stored fallback so historical runs (no
 * longer in the runtime's in-memory state) resolve correctly.
 *
 * **Resolves `null` for a genuine 404 only. Rejects for everything else** —
 * transport failure, 5xx, 401, malformed JSON. It used to spell both the
 * same way, so an unreachable API was indistinguishable from a run that had
 * really been garbage-collected: `PipelineRunReplayPage` told the user
 * "Run not available — it may have been trimmed from history." with no
 * retry, and `PendingApprovalsPage` claimed the upstream steps "haven't
 * produced reviewable output yet" while the approver decided blind.
 * Same class as `listPipelineRuns` above (fixed in v2.92.0).
 *
 * Wire shape comes from `PipelineRunDetailResponse` in
 * ../types/pipeline-contracts.ts — kept in lockstep with
 * platform-api/src/pipeline/http/contracts.ts.
 */
export declare function getPipelineRun(pipelineId: string, runId: string): Promise<PipelineRun | null>;

/**
 * @deprecated The (sectionType × viewMode) renderer registry only serves the
 * legacy SECTIONED document editor (`SectionBlock`), which is deprecated
 * (2026-09-22). Pages render document-type fields as `macro:field` blocks in
 * `CanvasDocumentView`. The field-type registry above is NOT deprecated —
 * document types and their page field macros still use it.
 */
export declare function getRenderer(sectionType: string | null | undefined, viewMode: ViewMode): SectionRenderer | null;

/**
 * Per-run audit timeline. Returns a single page; callers paginate with
 * `nextCursor`. The backend route returns `{ items: [], nextCursor }`
 * with rows newest-first.
 */
export declare function getRunAuditLog(pipelineId: string, runId: string, filters?: AuditFilters): Promise<AuditPage>;

export declare interface GlyphProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
    /** Rendered size in px. Default 16 — sized for an `IconButton size="sm"`. */
    size?: number;
}

export declare function GoLiveButton({ live, starting, onGoLive, onEndBroadcast, viewerCount, streamReady, connection, channelName, error, endHint, label, disabled, className, 'data-testid': testId, }: GoLiveButtonProps): JSX.Element;

export declare interface GoLiveButtonProps {
    /**
     * Actually broadcasting — media flowing, not "a session exists". The
     * control stops being an action and becomes a status: a second "Go live"
     * over a live broadcast is an offer to start something already running.
     *
     * Hosts must NOT pass a merely-open session here. A call that is still
     * negotiating belongs in `starting`, and one that failed belongs in
     * `error` — both used to arrive as `live`, which is how a broadcast that
     * never came up reported itself as on air.
     */
    live?: boolean;
    /** Between the click and the broadcast actually being up. */
    starting?: boolean;
    /**
     * Start the broadcast AND announce it to the channel. See the header — the
     * announcement is the half that makes it a broadcast rather than a call.
     */
    onGoLive?: () => void;
    /**
     * Ends it, when the host has a handler that really does. Omit it and the
     * live state carries `endHint` instead — a label that says where the stop
     * control is beats a button that is wired to nothing.
     */
    onEndBroadcast?: () => void;
    /**
     * Watchers, when known. Same contract as StreamStage: `null`/omitted is
     * "nobody measured", a numeric 0 is a measured empty house. A broadcaster
     * is the one person for whom the honest 0 is worth the discouragement — it
     * is the difference between "nobody came" and "the counter is broken".
     */
    viewerCount?: number | null;
    /**
     * Is anything actually reaching an audience? See the header. `undefined`
     * means nobody checked; `false` is the state where the call is up and the
     * stream is not, which this control must never render as "You are live".
     */
    streamReady?: boolean;
    /**
     * The broadcaster's OWN connection, while live.
     *
     * `streamReady` answers "did this broadcast ever reach anybody" and it
     * latches: hosts derive it from a session record that stops being re-asked
     * once it is true. So it catches a broadcast that never came up and is
     * silent about one that stops halfway — which is the failure the person
     * presenting is least able to notice on their own, because their own
     * preview keeps playing from their own camera.
     *
     * Observed: a broadcaster whose network dropped mid-broadcast was shown
     * "You are live · 1 watching" for the full 30s the drop lasted, while the
     * audience was already being told the stream had stopped responding.
     *
     *   'online'   — nothing is wrong, or nobody is watching the connection.
     *   'unstable' — the transport is retrying. Media may not be going out.
     *   'offline'  — the transport is down. Nothing is going out.
     *
     * Anything but `online` retires the confident pill. The claim "you are
     * live" is a claim about OTHER PEOPLE, and it must not outlive the
     * connection that would carry it to them.
     */
    connection?: 'online' | 'unstable' | 'offline';
    /**
     * Who gets told, named — e.g. `#design`. The social consequence of the
     * press is the half people underestimate, and "the channel" is vaguer than
     * the product can afford to be about a message it is going to post.
     */
    channelName?: string;
    /**
     * Why the last attempt did not work, in words the person can act on. Shown
     * as a live-region alert beside the resting button, because a failure that
     * only reverts the button reads as "the click did nothing".
     */
    error?: string | null;
    /** Where the stop control is, when this component does not own one. */
    endHint?: string;
    /** Replaces the resting wording, e.g. "Broadcast this room". */
    label?: string;
    disabled?: boolean;
    /** On the wrapper — the control now has a hint line under it. */
    className?: string;
    'data-testid'?: string;
}

/**
 * The node the radial layout puts in the middle: the one whose `group` is
 * `'center'`, else the node with the strictly highest weight, else none.
 * "Strictly" matters: a graph with no weights has no centre rather than an
 * arbitrary one.
 */
export declare function graphCenterNode(nodes: GraphNode[]): GraphNode | null;

export declare interface GraphEdge {
    from: string;
    to: string;
    label?: string;
    /** Scales the stroke width. */
    weight?: number;
}

/** The token classes for a group, by its legend position. Exported so PeopleGraph's list can match the graph. */
export declare function graphGroupPalette(group: string | undefined, groups: string[]): {
    fill: string;
    bg: string;
};

/** Groups in first-appearance order, the centre bucket excluded; undefined groups collapse to ''. */
export declare function graphGroups(nodes: GraphNode[]): string[];

/** Star colours for the graphite sky: zinc greys, so no blue cast sits on a white page. */
export declare const GRAPHITE_PARTICLE_COLORS: readonly ["#f4f4f5", "#d4d4d8", "#a1a1aa"];

export declare type GraphLayout = 'radial' | 'grid' | 'force';

export declare interface GraphLayoutSize {
    width: number;
    height: number;
    /** Space kept clear of the edges so a node's circle and label fit. */
    padding?: number;
}

export declare interface GraphNode {
    id: string;
    label: string;
    /** Shown on hover (`<title>`) and, for the centre node, under the label. */
    sublabel?: string;
    /**
     * Colour / legend bucket. `'center'` is special: the radial layout puts that
     * node in the middle and the legend leaves it out.
     */
    group?: string;
    /** Relative importance; scales the node radius and picks the radial centre when no node is `'center'`. */
    weight?: number;
    avatarUrl?: string;
    /** Overrides the group colour with any CSS colour. */
    color?: string;
}

export declare function GraphPanelBody({ panel, api, options }: GraphPanelBodyProps): ReactNode;

declare interface GraphPanelBodyProps {
    panel: ChatSidePanelRef;
    api: ChatSidePanelApi;
    options: CreateGraphPanelRendererOptions;
}

export declare type GraphPanelData = GraphPanelNodesData | GraphPanelPeopleData;

export declare interface GraphPanelNodesData {
    title?: string;
    nodes: GraphNode[];
    edges: GraphEdge[];
    layout?: GraphLayout;
}

export declare interface GraphPanelPeopleData {
    title?: string;
    people: GraphPerson[];
    query?: string;
}

export declare interface GraphPerson {
    id: string;
    name: string;
    title?: string;
    avatarUrl?: string;
    tags?: string[];
    /** Relevance to the query; scales the node. */
    score?: number;
}

export declare interface GraphPoint {
    x: number;
    y: number;
}

export declare type GraphPositions = Map<string, GraphPoint>;

export declare interface GraphQueryNodeData {
    type: 'graph-query';
    graphId: string;
    query: string;
    parameters?: Record<string, string>;
    outputKey?: string;
    timeoutMs?: number;
    retryPolicy?: RetryPolicy;
}

export declare function gridCols(count: number): number;

/** Six dots in two columns: a drag handle — "pick this up and move it". Since 2.385.0. */
export declare function GripIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function GroupedList({ groups, rows, onOpenRow, rowMenu, rowMenuLabel, openGroups, onToggleGroup, storageKey, currentId, hideEmptyGroups, onReorder, canReorder, reorderLabel, size, groupHeading, currentStyle, groupCountStyle, className, 'data-testid': testId, }: GroupedListProps): JSX.Element;

export declare interface GroupedListGroup {
    id: string;
    title: string;
    /** Shown as a count chip after the title. Omit for no chip. */
    count?: number;
    /** Leading mark after the caret — normally a `FileKindMark kind="folder"`. */
    icon?: ReactNode;
    /** Open on first render. Default `true`. Ignored when `openGroups` is controlled. */
    defaultOpen?: boolean;
    /** What an open group with no rows says. Default "Nothing here". */
    emptyLabel?: string;
}

export declare interface GroupedListProps {
    groups: GroupedListGroup[];
    rows: GroupedListRow[];
    /** A row was activated — click, Enter or Space on its primary button. */
    onOpenRow?: (row: GroupedListRow) => void;
    /**
     * The row's ⋯ menu. Return `null` or an empty array for a row without one.
     * Opens from the ⋯ button, a right-click, or Shift+F10 / the context-menu
     * key on the focused row.
     */
    rowMenu?: (row: GroupedListRow) => DropdownMenuSection[] | null | undefined;
    /** Accessible name of a row's menu button. Default `Actions for <title>`. */
    rowMenuLabel?: (row: GroupedListRow) => string;
    /** Controlled open groups. With this, `defaultOpen` and `storageKey` are ignored. */
    openGroups?: string[];
    /** Fires on every caret click / ArrowLeft / ArrowRight toggle, controlled or not. */
    onToggleGroup?: (groupId: string, open: boolean) => void;
    /** Persist collapsed group ids under this `localStorage` key. */
    storageKey?: string;
    /** Marks a row `current` by id — an alternative to setting it on the row. */
    currentId?: string | null;
    /** Hide a group whose row list is empty instead of showing its empty label. Default `false`. */
    hideEmptyGroups?: boolean;
    /**
     * Turns on reorder: a drag handle per row plus Alt+arrow keys. `index` is the
     * row's final position within `toGroupId`. The host applies the move.
     */
    onReorder?: (rowId: string, toGroupId: string, index: number) => void;
    /** Which rows can move. Default: every row that is not `disabled`. */
    canReorder?: (row: GroupedListRow) => boolean;
    /** Accessible name of a row's drag handle. Default `Reorder <title>`. */
    reorderLabel?: (row: GroupedListRow) => string;
    /**
     * `sm` (default): 14px titles, 12px meta, a tinted current row. `md` — the
     * Work column: 15px group headers and titles, 13px meta, taller rows, a
     * current row that is a rounded tint with a 3px primary bar on its left
     * edge, and a larger drag handle that is always visible.
     */
    size?: 'sm' | 'md';
    /**
     * How a group header reads. `title` (default): a sentence-case heading
     * (14px, 15px at `md`) with its count in a neutral chip. `label`: a section
     * label — 11px uppercase semibold, letter-spaced, secondary ink — with the
     * count as plain muted text after it ("RECENTLY UPDATED 4"), for a list
     * whose groups are time bands rather than named things. Since 2.389.0.
     */
    groupHeading?: 'title' | 'label';
    /**
     * How the current row is marked. `tint` (default): a pale primary fill (at
     * `md`, also the 3px bar). `bar`: the fill plus a 2px inset primary bar on
     * the left edge at `sm` too. Since 2.389.0.
     */
    currentStyle?: 'tint' | 'bar';
    /**
     * How a `title` group header's count reads. `chip` (default): a neutral
     * count chip. `plain`: muted text after the title — "In progress 9". (A
     * `label` heading's count is always plain.) Since 2.390.0.
     */
    groupCountStyle?: 'chip' | 'plain';
    className?: string;
    'data-testid'?: string;
}

export declare interface GroupedListRow {
    id: string;
    groupId: string;
    /** Leading kind mark — normally a `FileKindMark`. */
    icon?: ReactNode;
    title: string;
    /** Beside the title on the first line — normally a `StatusPill`. */
    pill?: ReactNode;
    /** The second line at rest. */
    subline?: ReactNode;
    /** The second line while hovered, focused or `current`. Falls back to `subline`. */
    hoverSubline?: ReactNode;
    /** Trailing content that is always visible — a "View run" link. */
    trailing?: ReactNode;
    /** Trailing content revealed on hover / focus / `current` — an "Open" button. */
    hoverActions?: ReactNode;
    /** The row the reader is "at": last opened, just created. Tinted; wears its hover line. */
    current?: boolean;
    /** Muted and inert; the menu still opens so a reader can see why. */
    disabled?: boolean;
    /** Optional accessible name override — default is the title. */
    ariaLabel?: string;
    /**
     * A control in the caret column — normally a `Checkbox`. Rendered OUTSIDE the
     * row's button, so pressing it never opens the row.
     */
    leading?: ReactNode;
    /**
     * A second line inside the row's button, above `subline` — avatar, points,
     * owner. Non-interactive by contract (it is inside a button).
     */
    meta?: ReactNode;
}

export declare function GroupFormPage({ group, isEdit, members, availableUsers, onSubmit, onAddMember, onRemoveMember, onCancel, error, }: GroupFormPageProps): JSX.Element;

export declare interface GroupFormPageProps {
    group?: {
        groupId?: string;
        groupName: string;
        description?: string;
        permissions: string[];
    };
    isEdit: boolean;
    poolId: string;
    members?: Array<{
        userId: string;
        email: string;
    }>;
    availableUsers?: Array<{
        userId: string;
        email: string;
    }>;
    onSubmit: (data: {
        groupName: string;
        description: string;
        permissions: string[];
    }) => Promise<void>;
    onAddMember?: (userId: string) => Promise<void>;
    onRemoveMember?: (userId: string) => Promise<void>;
    onCancel: () => void;
    error?: string | null;
}

declare interface GroupItem {
    groupId: string;
    name: string;
    description?: string;
    visibility: 'public' | 'private';
    ownerId: string;
    createdAt: string;
}

export declare function GroupListPage({ groups, poolName, onCreateGroup, onEditGroup, onDeleteGroup, loading, }: GroupListPageProps): JSX.Element;

export declare interface GroupListPageProps {
    groups: Array<{
        groupId: string;
        groupName: string;
        description?: string;
        permissions: string[];
    }>;
    poolId: string;
    poolName: string;
    onCreateGroup: () => void;
    onEditGroup: (groupId: string) => void;
    onDeleteGroup: (groupId: string) => Promise<void>;
    loading?: boolean;
}

export declare function GroupPanel({ idToken, rooms, createGroupRoom, onRoomSelect, roomsLoading, compact }: GroupPanelProps): JSX.Element;

declare interface GroupPanelProps {
    idToken: string | null;
    rooms: RoomItem[];
    createGroupRoom: (groupId: string, name: string) => Promise<void>;
    onRoomSelect?: (room: RoomItem) => void;
    roomsLoading: boolean;
    compact?: boolean;
}

/** Groups by emoji, preserving first-seen order so chips do not reshuffle. */
export declare function groupReactions(reactions: readonly MessageReaction[], currentUserId: string): ReactionGroup[];

/**
 * The safety gate, hoisted out of the component so it can be asserted on
 * directly. Every selection handler in this panel is wrapped in it.
 *
 * Outside a preview session the wrapped callback is a no-op — a click
 * cannot reach the controller, and therefore cannot reach peers. The
 * `disabled` attribute on the chips is the SECOND layer, not this one;
 * disabling is a rendering detail a refactor can drop, whereas this
 * refuses to run.
 */
export declare function guardedSelection<A extends unknown[]>(previewActive: boolean, fn: (...args: A) => void): (...args: A) => void;

export declare type GuardrailAction = 'block' | 'mask' | 'warn';

export declare interface GuardrailNodeData {
    type: 'guardrail';
    guardrailId: string;
    guardrailVersion?: string;
    inputField: string;
    action: GuardrailAction;
    label?: string;
}

export declare function HangoutGrid({ participants, localParticipant, activeSpeakerId, onParticipantClick, fillParent, pipWidth, className, style, }: HangoutGridProps): JSX.Element;

export declare interface HangoutGridProps {
    /** Remote participants. Caller should NOT include the local user here. */
    participants: HangoutLayoutParticipant[];
    /** The local user. Placed in-grid at N≥2, as PiP at N=1, solo at N=0,
     *  or omitted entirely if null/undefined. */
    localParticipant?: HangoutLayoutParticipant | null;
    /** Active speaker id — drives the green-border highlight (no reflow). */
    activeSpeakerId?: string | null;
    /** Click handler per tile (e.g. pin / promote to spotlight). */
    onParticipantClick?: (id: string) => void;
    /** Fill parent dimensions instead of letting tiles drive height via
     *  aspect-video. Used in docked + fullscreen widget modes where the
     *  outer container owns dimensions. */
    fillParent?: boolean;
    /** Local-PiP width (px) — defaults to 96 (small widget). Larger sizes
     *  for docked (128) and fullscreen (192). */
    pipWidth?: number;
    className?: string;
    style?: CSSProperties;
}

export declare function HangoutLayout({ participants, localParticipant, mode, activeSpeakerId, speakerHysteresisMs, spotlightContent, spotlightContentLabel, onParticipantClick, fillParent, pipWidth, filmstripTileWidth, className, style, }: HangoutLayoutProps): JSX.Element;

export declare interface HangoutLayoutParticipant {
    id: string;
    displayName: string;
    avatarUrl?: string;
    isMuted?: boolean;
    isLocal?: boolean;
    /** Pre-rendered video element — typically `<video ref={…} autoPlay playsInline />`. */
    videoElement?: ReactNode;
    /** Pre-rendered screen-share video element. When ANY participant supplies
     *  this, `<HangoutLayout>` auto-flips to spotlight mode and
     *  `<HangoutSpotlight>` promotes this element into the main slot (the
     *  sharer's camera tile stays visible in the filmstrip). An explicit
     *  `spotlightContent` prop on `<HangoutLayout>` still wins. */
    screenElement?: ReactNode;
}

export declare interface HangoutLayoutProps {
    /** Remote participants (callers should NOT include the local user here). */
    participants: HangoutLayoutParticipant[];
    /** The local user. Rendered as a tile in the grid at N≥3 (per Meet/Teams
     * convention) or as a small PiP overlay at N≤2. Pass null/undefined to
     * suppress entirely. */
    localParticipant?: HangoutLayoutParticipant | null;
    /** 'auto' = grid view; 'spotlight' = main slot + filmstrip. Spotlight is
     * forced on whenever `spotlightContent` is non-null regardless of mode. */
    mode?: HangoutMode;
    /** Active speaker id — drives the spotlight slot (in spotlight mode) and
     * the green-border highlight (in any mode). Hysteresis is applied
     * internally (default 750ms) so brief speech bursts don't flicker the
     * main slot. */
    activeSpeakerId?: string | null;
    /** Override the hysteresis window (ms) before the spotlight slot swaps.
     * 0 disables hysteresis (immediate swap). Default 750. */
    speakerHysteresisMs?: number;
    /** Content for the spotlight main slot — typically a `<video>` for a
     * shared screen, or a `<ParticipantTile>` clone. When provided, the
     * layout switches to spotlight regardless of `mode`. */
    spotlightContent?: ReactNode;
    /** Attribution label for `spotlightContent` — see HangoutSpotlight. */
    spotlightContentLabel?: string;
    /** Click handler per tile (e.g. pin / promote to spotlight). */
    onParticipantClick?: (id: string) => void;
    /** Fill parent dimensions — propagates down through grid/spotlight/tile
     *  so the layout adapts to docked/fullscreen containers instead of
     *  enforcing aspect-video against an unsized parent. */
    fillParent?: boolean;
    /** Local-PiP width (grid mode) — defaults to 96 for mini, override for
     *  larger widget modes. */
    pipWidth?: number;
    /** Filmstrip tile width (spotlight mode) — defaults to 128 for mini. */
    filmstripTileWidth?: number;
    className?: string;
    style?: CSSProperties;
}

export declare type HangoutMode = 'auto' | 'spotlight';

export declare type HangoutPhase = 'idle' | 'joining' | 'joined' | 'reconnecting' | 'ended' | 'failed';

/** MediaIcons carries no gear, and this shell is the only caller that wants one. */
export declare function HangoutPreJoinShell({ channelName, eyebrow, localIdentity, previewStream, permission, permissionMessage, audioEnabled, videoEnabled, onToggleAudio, onToggleVideo, onRetryPermission, participants, readyState, readyLoading, effectsSlot, devicesSlot, devicesOpen, onToggleDevices, secondaryActions, onJoin, onCancel, joinLabel, joinDisabled, subtitleOverride, className, 'data-testid': testId, }: HangoutPreJoinShellProps): JSX.Element;

export declare interface HangoutPreJoinShellProps {
    /** Channel display name — the title of the one heading block. */
    channelName: string;
    /** Small uppercase line above the title — "Before you go live". */
    eyebrow?: string;
    /** When set, the camera-off preview renders a Meet/Teams-style identity
     *  tile (avatar + display name) instead of the bare "Camera off" text.
     *  Backward-compatible — omitted = legacy text fallback, so existing
     *  consumers that don't pass identity are unaffected. */
    localIdentity?: PreJoinLocalIdentity;
    /** Live MediaStream for the camera preview. Null when not yet acquired
     *  or when permission is anything but 'granted'. */
    previewStream: MediaStream | null;
    permission: PreJoinPermission;
    /** Browser-supplied error message (e.g. "NotAllowedError"). Surfaced
     *  in the permission fallback card when present. */
    permissionMessage?: string | null;
    audioEnabled: boolean;
    videoEnabled: boolean;
    onToggleAudio: () => void;
    onToggleVideo: () => void;
    /** Optional retry hook surfaced on the permission-fallback card. */
    onRetryPermission?: () => void;
    participants?: PreJoinRosterEntry[];
    readyState?: PreJoinReadyState;
    /** When true, render a small spinner above the roster instead of the
     *  participant list — for the "/ready not yet fetched" phase. */
    readyLoading?: boolean;
    /** Rendered under the camera stage, above the Join controls. Intended
     *  for <MediaEffectsTray> so users can pick filters / background / face
     *  FX before joining. Omitted = rendering is unchanged. */
    effectsSlot?: ReactNode;
    /** Contents of the Device settings panel — typically a
     *  <DeviceSettingsPanel>. Given = the stage bar gets a gear. The shell
     *  never enumerates devices itself; it only opens and closes the panel. */
    devicesSlot?: ReactNode;
    /** Controlled device panel. Uncontrolled (own state, closed) when omitted. */
    devicesOpen?: boolean;
    onToggleDevices?: (next: boolean) => void;
    /** A row under the primary button — Teams' "Other join options". */
    secondaryActions?: ReactNode;
    /** Called when the user clicks Join. Carries the pre-flight intent so
     *  the consumer can spawn the publisher in the desired mute state. */
    onJoin: (intent: {
        audio: boolean;
        video: boolean;
    }) => void;
    onCancel: () => void;
    /** Override the Join button label. Default: "Join now" (or "Allow
     *  camera to join" when permission != 'granted'). */
    joinLabel?: string;
    /** Force-disable the Join button even when permission is granted. */
    joinDisabled?: boolean;
    /** Replace the auto-computed "N people are in this call" subtitle. */
    subtitleOverride?: string;
    className?: string;
    'data-testid'?: string;
}

export declare function HangoutRoomHeader({ channelName, subtitle, recording, elapsedLabel, phase, actions, className, 'data-testid': testId, }: HangoutRoomHeaderProps): JSX.Element;

export declare interface HangoutRoomHeaderProps {
    channelName: string;
    subtitle?: ReactNode;
    recording?: HangoutRoomHeaderRecording;
    elapsedLabel?: string;
    phase?: HangoutPhase;
    actions?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

/** Same two states as RecordingChip; kept as a named alias for existing consumers. */
export declare type HangoutRoomHeaderRecording = RecordingChipState;

export declare function HangoutSpotlight({ participants, localParticipant, spotlightContent, spotlightContentLabel, activeSpeakerId, speakerHysteresisMs, onParticipantClick, fillParent, filmstripTileWidth, className, style, }: HangoutSpotlightProps): JSX.Element;

export declare interface HangoutSpotlightProps {
    /** Remote participants. Caller should NOT include the local user here. */
    participants: HangoutLayoutParticipant[];
    /** The local user — always renders in the filmstrip in spotlight mode. */
    localParticipant?: HangoutLayoutParticipant | null;
    /** Content for the main slot — typically a screen-share `<video>`. When
     *  provided, takes priority over the active-speaker tile. */
    spotlightContent?: ReactNode;
    /** Attribution label for `spotlightContent` — WHO is sharing. Without
     *  it the spotlight falls back to the active speaker's name, which is
     *  wrong whenever the person talking isn't the person sharing (F5). */
    spotlightContentLabel?: string;
    /** Active speaker id — drives spotlight slot via stabilized hysteresis. */
    activeSpeakerId?: string | null;
    /**
     * Hysteresis window (ms) before the spotlight slot swaps to a new
     * `activeSpeakerId`. Default 750.
     *
     * In a real call you WANT the delay — it stops the spotlight flickering on
     * coughs, laughs, and one-word interjections.
     *
     * Pass `0` when you need the rendered output to match the props you just
     * handed in, with no timers involved:
     *  - **Tests** — otherwise a change to `activeSpeakerId` needs fake timers
     *    plus an `act()`-wrapped `advanceTimersByTime` before any assertion.
     *  - **Storybook / demos** — changing the `activeSpeakerId` control would
     *    otherwise appear to do nothing for three quarters of a second, and a
     *    visual-regression snapshot could catch either state.
     */
    speakerHysteresisMs?: number;
    /** Click handler per filmstrip tile. */
    onParticipantClick?: (id: string) => void;
    /** Fill parent dimensions instead of letting the spotlight slot drive
     *  height via aspect-video. Used in docked + fullscreen widget modes. */
    fillParent?: boolean;
    /** Filmstrip tile width (px). Default 128 (Tailwind w-32). Larger for
     *  docked/fullscreen so small thumbs don't dominate a wide canvas. */
    filmstripTileWidth?: number;
    className?: string;
    style?: CSSProperties;
}

/** A marker tip over a stroke: "highlight". Since 2.386.5. */
export declare function HighlighterIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare const HISTORY_DAYS_DEFAULT = 7;

export declare const HISTORY_DAYS_MAX = 3650;

export declare const HISTORY_DAYS_MIN = 1;

/** A clock: history, "when". */
export declare function HistoryIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare interface HlsFailure {
    kind: HlsFailureKind;
    /** HTTP status behind it, when there was one. */
    status: number | null;
    /**
     * The developer's account — hls.js's type/details, the missing-peer hint.
     * For a console, a `data-` attribute or a bug report. NEVER for a viewer;
     * that is what `error` is, and the two are deliberately different strings.
     */
    detail: string;
    /**
     * Whether attaching the same URL again could plausibly succeed. False for a
     * browser that cannot play HLS — a "Try again" there is a button that can
     * never work, which is worse than no button.
     */
    retryable: boolean;
}

/**
 * What KIND of thing went wrong, in terms a viewer's sentence can be built
 * from. hls.js's own vocabulary (`networkError`, `manifestLoadError`) is a
 * developer's, and it was reaching the screen: a room whose broadcast was not
 * producing rendered "HLS error: networkError" over the video — jargon, and
 * wrong, because the network was fine and there was simply nothing to play.
 *
 * The distinction that matters is the one the SERVER already makes and the
 * player was throwing away: a 503 saying "no active producers" is not a
 * network failure and not a bug, it is an empty channel.
 */
export declare type HlsFailureKind = 
/** The server answered, and its answer was that nothing is being broadcast. */
'no-broadcast'
/** The playlist could not be fetched at all — DNS, offline, CORS, timeout. */
| 'network'
/** The server answered, and its answer was that IT is broken. */
| 'server'
/** Bytes arrived and could not be decoded. */
| 'media'
/** This browser cannot play the stream at all. Retrying can never help. */
| 'unsupported' | 'other';

/** The viewer's sentence for a failure. Exported so a host can re-word it. */
export declare function hlsFailureText(failure: HlsFailure | null | undefined): string | null;

/**
 * What the player is actually doing. Distinct states because they call for
 * different words on screen and, more importantly, because "buffering",
 * "stalled" and "over" were previously indistinguishable to a viewer — all
 * three were a still frame under a LIVE badge.
 */
export declare type HlsPhase = 
/** No source attached. */
'idle'
/** Source attached, no frame produced yet. */
| 'connecting'
/** Frames are advancing. */
| 'playing'
/** Was playing, briefly out of data. Normal at a live edge. */
| 'buffering'
/** Out of data long enough that something is wrong. */
| 'stalled'
/** Unplayable. `error` carries the wording. */
| 'error';

export declare function IconButton({ 'aria-label': ariaLabel, icon, children, disabled, variant, tone, size, className, ...rest }: IconButtonProps): JSX.Element;

export declare interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    'aria-label': string;
    icon?: ReactNode;
    children?: ReactNode;
    variant?: IconButtonVariant;
    /**
     * Colour family. `surface` (default) follows the host theme; `code` paints
     * in the permanently-dark terminal palette — the close/split/kill controls
     * that live in terminal pane chrome.
     */
    tone?: IconButtonTone;
    size?: 'sm' | 'md' | 'lg';
}

/** @see SurfaceTone — which colour family the button paints in. */
export declare type IconButtonTone = SurfaceTone;

/** `outline` (since 2.386.5): a bordered square on the surface — an editor head's (i) and ⋯. */
export declare type IconButtonVariant = 'ghost' | 'primary' | 'danger' | 'outline';

export declare function IconPicker({ value, onChange, curated, }: IconPickerProps): JSX.Element;

export declare interface IconPickerProps {
    value: string;
    onChange: (emoji: string) => void;
    curated?: string[];
}

export declare interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
    size?: number;
}

export declare const IDENTITY_BASE_URL: string;

export declare function IdentityAdminLayout({ children, activePath, adminEmail, onNavigate, onLogout, defaultSidebarOpen, }: IdentityAdminLayoutProps): JSX.Element;

export declare interface IdentityAdminLayoutProps {
    children: React.ReactNode;
    activePath?: string;
    adminEmail?: string;
    onNavigate: (path: string) => void;
    onLogout?: () => void;
    /**
     * Whether the sidebar starts open. Optional and **initial-only** — the
     * layout still owns the state afterwards, so the header toggle keeps
     * working. Omit it and the sidebar starts open, which is the historical
     * behaviour.
     *
     * It exists because the collapsed rail was previously reachable only by
     * clicking the toggle: a host cannot restore the user's saved preference
     * on mount, a story cannot show the collapsed chrome, and a test has to
     * click before it can assert on it.
     */
    defaultSidebarOpen?: boolean;
}

export declare function identityApiFetch<T>(path: string, idToken: string | null, options?: RequestInit): Promise<T>;

export declare function IdentityAuditPage({ records, onQuery, onViewEntity, onReplay, loading, totalRecords, }: AuditPageProps): JSX.Element;

export declare interface IdentityClient {
    clientId: string;
    clientName: string;
    clientSecret?: string;
    poolId: string;
    poolName?: string;
    redirectUris: string[];
    postLogoutRedirectUris?: string[];
    grantTypes: string[];
    responseTypes?: string[];
    scope?: string;
}

export declare interface IdentityContextValue {
    userId: string;
    displayName: string;
    userEmail: string | null;
    idToken: string | null;
    onSignOut: () => void;
}

export declare function IdentityFormField({ label, name, type, value, onChange, error, required, placeholder, options, helpText, disabled, }: IdentityFormFieldProps): JSX.Element;

export declare interface IdentityFormFieldProps {
    label: string;
    name: string;
    type?: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'number';
    value: string | boolean | number;
    onChange: (value: string | boolean | number) => void;
    error?: string;
    required?: boolean;
    placeholder?: string;
    options?: Array<{
        value: string;
        label: string;
    }>;
    helpText?: string;
    disabled?: boolean;
}

export declare interface IdentityGroup {
    groupId: string;
    poolId: string;
    groupName: string;
    description?: string;
    permissions: string[];
    members?: string[];
}

export declare interface IdentityPool {
    poolId: string;
    poolName: string;
    clientId: string;
    customAttributes: Record<string, string>;
    settings: PoolSettings;
    createdAt: string;
}

export declare function IdentityProvider({ value, children, }: {
    value: IdentityContextValue;
    children: ReactNode;
}): JSX.Element;

export declare interface IdentityUser {
    userId: string;
    poolId: string;
    email: string;
    givenName?: string;
    familyName?: string;
    nickname?: string;
    picture?: string;
    website?: string;
    status: 'CONFIRMED' | 'UNCONFIRMED' | 'FORCE_CHANGE_PASSWORD' | 'ARCHIVED' | 'COMPROMISED' | 'UNKNOWN';
    emailVerified?: boolean;
    mfaEnabled: boolean;
    groups: string[];
    customAttributes: Record<string, unknown>;
    createdAt: string;
    updatedAt?: string;
}

export declare interface ImageAdjustBwNodeData {
    type: 'image:adjust-bw';
    sourceImagePath?: string;
    algorithm?: 'luminosity' | 'average' | 'desaturate';
    contrast?: number;
}

export declare interface ImageAdjustLayerNodeData {
    type: 'image:adjust-layer';
    sourceImagePath?: string;
    layers: AdjustLayer[];
    /**
     * Optional manual override for the live-preview source. When set, this
     * pinned imageId wins over the auto-wired upstream-run image resolved by
     * `useLatestStepForNode`. Cleared via the caption "x" affordance.
     */
    previewSourceImageId?: string;
}

export declare interface ImageCropNodeData {
    type: 'image:crop';
    sourceImagePath?: string;
    bboxPath?: string;
    bbox?: BBox;
    materialize?: boolean;
}

export declare interface ImageDimensionsNodeData {
    type: 'image:dimensions';
    sourceImagePath?: string;
    /**
     * Longest-edge target used to derive generation dimensions. The handler
     * reads the source image's natural size and emits width/height/aspectRatio
     * plus genWidth/genHeight scaled to fit within `maxEdge`. Default: 1024.
     */
    maxEdge?: number;
}

export declare interface ImageEditPromptNodeData {
    type: 'image:edit-prompt';
    sourceImagePath?: string;
    maskImagePath?: string;
    prompt: string;
    model?: string;
}

export declare type ImageFormat = 'jpeg' | 'png' | 'webp' | 'avif';

export declare interface ImageFormatConvertNodeData {
    type: 'image:format-convert';
    sourceImagePath?: string;
    format: ImageFormat;
    quality?: number;
    lossless?: boolean;
    stripMetadata?: boolean;
}

export declare interface ImageGenerateNodeData {
    type: 'image:generate';
    prompt: string;
    model?: string;
    width?: number;
    height?: number;
    seed?: number;
    numImages?: number;
}

/** A framed picture with a sun and a hill: "image". Since 2.386.5. */
export declare function ImageIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function ImageLightbox({ images, openIndex, onClose, onNavigate }: ImageLightboxProps): ReactPortal | null;

export declare interface ImageLightboxImage {
    src: string;
    alt?: string;
    caption?: string;
}

export declare interface ImageLightboxProps {
    images: ImageLightboxImage[];
    /** Index of the open image, or null when the lightbox is closed. */
    openIndex: number | null;
    onClose: () => void;
    /**
     * Controlled navigation callback. When provided, prev/next/arrow-keys
     * call this and the parent is expected to update `openIndex`. When
     * omitted, the lightbox navigates with internal fallback state.
     */
    onNavigate?: (index: number) => void;
}

export declare interface ImageResizeNodeData {
    type: 'image:resize';
    sourceImagePath?: string;
    width?: number;
    height?: number;
    fit?: ResizeFit;
    withoutEnlargement?: boolean;
    background?: string;
}

export declare interface ImageSaveNodeData {
    type: 'image:save';
    /** JSONPath to the source imageId in context. */
    sourceImagePath?: string;
    /**
     * Output filename template. Supports `{{scatter.item.label}}`,
     * `{{scatter.index}}`, and `{{scatter.parentImageId}}` substitutions.
     * Default: 'crop-{{scatter.index}}.png'.
     */
    filenameTemplate?: string;
}

export declare interface ImageSharpenNodeData {
    type: 'image:sharpen';
    sourceImagePath?: string;
    sigma?: number;
    m1?: number;
    m2?: number;
}

export declare interface ImageSourceNodeData {
    type: 'image-source';
    /** imageId to inject into the pipeline context. */
    imageId?: string;
    /** Key under which the imageId is written to context. Default: 'imageRef'. */
    outputKey?: string;
}

export declare function ImageThumbnail({ src, alt, size, aspectRatio, rounded, fallback, loading, className, 'data-testid': testId, }: ImageThumbnailProps): JSX.Element;

export declare type ImageThumbnailAspect = 'square' | 'video' | 'auto';

export declare interface ImageThumbnailProps {
    src: string;
    alt: string;
    size?: ImageThumbnailSize;
    aspectRatio?: ImageThumbnailAspect;
    rounded?: boolean;
    /** Rendered when the image fails to load. Defaults to a broken-image icon. */
    fallback?: ReactNode;
    loading?: 'lazy' | 'eager';
    className?: string;
    'data-testid'?: string;
}

export declare type ImageThumbnailSize = 'sm' | 'md' | 'lg';

export declare interface ImageTransformNodeData {
    type: 'image:transform';
    sourceImagePath?: string;
    operations: GeometricOp[];
}

export declare interface ImageUpscaleNodeData {
    type: 'image:upscale';
    sourceImagePath?: string;
    /** Optional prompt forwarded to the self-hosted x4 upscaler. */
    prompt?: string;
    /** Longest-edge cap applied before super-resolution. Default: 1024. */
    maxEdge?: number;
}

export declare interface ImageVariationNodeData {
    type: 'image:variation';
    sourceImagePath?: string;
    numVariations?: number;
    similarity?: number;
    model?: string;
}

export declare interface ImageVisionAnalyzeNodeData {
    type: 'image:vision-analyze';
    model?: string;
    systemPrompt?: string;
    userPrompt: string;
    imageRefPath: string;
    outputSchema?: Record<string, unknown>;
    maxOutputTokens?: number;
    /**
     * Optional seed regions painted by the user in the BBoxAuthoringCanvas.
     * Rendered when outputSchema matches the 'detection-regions' preset.
     * Forwarded to platform-api's vision handler as focus hints.
     */
    seedRegions?: AuthoringBBox[];
}

export declare interface ImageVisionClassifyNodeData {
    type: 'image:vision-classify';
    model?: string;
    imageRefPath: string;
    labels: string[];
    systemPrompt?: string;
    maxOutputTokens?: number;
}

export declare interface ImageVisionDescribeNodeData {
    type: 'image:vision-describe';
    model?: string;
    imageRefPath: string;
    userPrompt: string;
    systemPrompt?: string;
    maxOutputTokens?: number;
}

export declare interface ImageVisionExtractTextNodeData {
    type: 'image:vision-extract-text';
    model?: string;
    imageRefPath: string;
    systemPrompt?: string;
    maxOutputTokens?: number;
}

export declare interface ImageVisionTagNodeData {
    type: 'image:vision-tag';
    model?: string;
    imageRefPath: string;
    candidateTags?: string[];
    maxTags?: number;
    systemPrompt?: string;
    maxOutputTokens?: number;
}

export declare interface ImageWatermarkNodeData {
    type: 'image:watermark';
    sourceImagePath?: string;
    overlayImageId: string;
    gravity?: WatermarkGravity;
    opacity?: number;
    offsetX?: number;
    offsetY?: number;
}

/**
 * className-based equivalents of `baseStyle` (the item's default look, passed
 * as `renderNavItem`'s third argument) and `activeNavItemStyle` above — for a
 * router integration that wants `NavLink`'s `className={({ isActive }) => ...}`
 * form instead of its `style={({ isActive }) => ...}` form, so hooking up
 * real active-link routing needs no inline `style` prop at all:
 *
 * ```tsx
 * renderNavItem={(item, children) => (
 *   <NavLink
 *     to={item.path}
 *     className={({ isActive }) =>
 *       isActive ? activeNavItemClassName : inactiveNavItemClassName
 *     }
 *   >
 *     {children}
 *   </NavLink>
 * )}
 * ```
 */
export declare const inactiveNavItemClassName = "block px-[14px] py-2 border-l-[3px] border-transparent text-text-secondary no-underline cursor-pointer";

export declare function InboxSection({ title, count, countTone, hint, action, empty, footer, headingLevel, children, className, 'data-testid': testId, }: InboxSectionProps): JSX.Element;

export declare interface InboxSectionEmpty {
    /** A small glyph above the title. An emoji string is fine. */
    icon?: ReactNode;
    /** One line: "No decisions waiting". */
    title: string;
    /** The hint under it: what would appear here, and when. */
    body?: string;
    /** Lands on the empty-state container. Default `<section testid>-empty`. */
    testId?: string;
}

export declare interface InboxSectionProps {
    title: string;
    /** How many rows the lane holds. Drawn in the header beside the title. */
    count: number;
    /** Tone of the count chip. `warning` for a lane whose rows block something. */
    countTone?: ChipTone;
    /** Quiet qualifier after the count — "newest blockage first". */
    hint?: ReactNode;
    /** Right-aligned control in the header. */
    action?: ReactNode;
    /** What the lane says instead of rows when `count` is 0. */
    empty?: InboxSectionEmpty;
    /** A note under the rows — a horizon, a caveat. Not drawn when empty. */
    footer?: ReactNode;
    /** Heading level of the title. Default `2`: one lane, one landmark heading. */
    headingLevel?: 2 | 3;
    /** The rows, as `InboxSectionRow`s. */
    children?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

/** One row of an `InboxSection`. The group draws the frame and the rule. */
export declare function InboxSectionRow({ children, className, ...rest }: InboxSectionRowProps): JSX.Element;

export declare interface InboxSectionRowProps extends HTMLAttributes<HTMLLIElement> {
    children: ReactNode;
    'data-testid'?: string;
}

/** A circled "i": "more about this" — an estimate's confidence, a footnote. Since 2.385.0. */
export declare function InfoIcon({ size, ...rest }: GlyphProps): JSX.Element;

declare interface IngestAuditEntry {
    auditId: string;
    createdAt: string;
    actor: string;
    eventType: IngestAuditEventType;
    targetType: 'source' | 'item' | 'document';
    targetId: string;
    summary: string;
    detail: Record<string, unknown>;
}

declare type IngestAuditEventType = 'mapping.decided' | 'source.created' | 'source.updated' | 'source.paused' | 'source.resumed' | 'writeback.attempted' | 'writeback.failed';

declare interface IngestAuditFilters {
    since?: string;
    until?: string;
    actor?: string;
    eventType?: IngestAuditEventType;
    targetId?: string;
    limit?: number;
}

export declare interface IngestItem {
    itemId: string;
    sourceId: string;
    sourcePath: string;
    status: IngestItemStatus;
    documentTypeId: string | null;
    documentId: string | null;
    pipelineRunId: string | null;
    mappingMethod: IngestMappingMethod | null;
    /** Confidence in the mapping decision (0..1). Null when no mapping attempted. */
    mappingConfidence?: number | null;
    /** Retry attempts so far. Optional — backend may omit. */
    attempts?: number;
    error: string | null;
    createdAt: string;
    updatedAt: string;
}

export declare type IngestItemStatus = 'queued' | 'mapping' | 'materializing' | 'triggering' | 'done' | 'failed';

export declare type IngestMappingMethod = 'rule' | 'llm-match' | 'llm-generate';

declare interface IngestProgressEvent {
    type: string;
    timestamp: string;
    [key: string]: unknown;
}

export declare interface IngestSource {
    sourceId: string;
    name: string;
    type: IngestSourceType;
    config: Record<string, unknown>;
    syncSchedule: string | null;
    mappingRules: MappingRule[];
    defaultPipelineId: string | null;
    /**
     * Per-DocType pipeline override. Keys are `targetTypeId` (the DocType id
     * a mapping rule resolved to); values are pipeline ids that should run
     * instead of `defaultPipelineId` for items of that type. Absent / empty
     * map ⇒ use defaultPipelineId for everything. AGENTIC_ETL_VISION §C.
     */
    pipelineByDocType?: Record<string, string>;
    status: IngestSourceStatus;
    lastSyncAt: string | null;
    lastSyncStats: SyncStats | null;
    createdAt: string;
    updatedAt: string;
}

export declare type IngestSourceStatus = 'active' | 'paused' | 'error';

export declare type IngestSourceType = 'local' | 's3' | 'google-drive' | 'webhook';

/**
 * Returns a CSS string for injecting into a <style> tag or :root selector.
 *
 * Example output:
 *   :root {
 *     --ui-primary: #3b82f6;
 *     --ui-primary-dark: #1d4ed8;
 *     ...
 *   }
 */
export declare function injectThemeVars(tokens: ThemeTokens): string;

/**
 * Horizontal flex row with a scale gap. Wraps by default — an un-wrapping row
 * of chips is how a toolbar overflows its container on a narrow window, and
 * every consumer that hand-rolled this wrote `flexWrap: 'wrap'` anyway.
 */
export declare function Inline({ children, gap, align, justify, wrap, as: As, className, ref, ...rest }: StackProps): JSX.Element;

export declare function InlineAlert({ tone, palette, children, onDismiss, className, 'data-testid': testId, }: InlineAlertProps): default_2.JSX.Element;

/**
 * `tone` already names the severity here, so the surface-family axis is
 * `palette` — same split as Chip. See `SurfaceTone` in tones.ts.
 */
export declare type InlineAlertPalette = SurfaceTone;

export declare interface InlineAlertProps {
    tone: InlineAlertTone;
    /**
     * Colour family. `surface` (default) follows the host theme; `code` paints
     * in the permanently-dark terminal palette, for alerts inside a log console
     * or debugger panel.
     */
    palette?: InlineAlertPalette;
    children: default_2.ReactNode;
    onDismiss?: () => void;
    className?: string;
    /** Test hook, forwarded to the alert element itself — same as Chip. An
     *  alert is the thing a test most wants to assert on, and without this
     *  the caller had to wrap it in a div and assert on the wrapper. */
    'data-testid'?: string;
}

export declare type InlineAlertTone = 'error' | 'success' | 'info' | 'warning';

export declare function InlineEditableText({ value, onCommit, label, placeholder, maxLength, required, disabled, size, tone, fitContent, className, 'data-testid': testId, }: InlineEditableTextProps): JSX.Element;

export declare interface InlineEditableTextProps {
    value: string;
    /** Called once per edit, with the committed value (trimmed). */
    onCommit: (value: string) => void;
    /** Accessible name, used as the edit button's and the input's label. */
    label: string;
    /** Shown in place of an empty value, and in the empty input. */
    placeholder?: string;
    maxLength?: number;
    /** An empty value is refused (the old one comes back). Default false. */
    required?: boolean;
    disabled?: boolean;
    size?: InputSize;
    /** `'title'` reads as a heading; `'muted'` as secondary text. */
    tone?: 'title' | 'muted';
    /**
     * While editing, size the input to its value (`field-sizing: content`)
     * instead of the Input's full width, so whatever sits after it on the row
     * — a status pill — stays beside the words rather than being pushed to the
     * row's end. The display state already sizes to its text.
     */
    fitContent?: boolean;
    className?: string;
    'data-testid'?: string;
}

export declare function InlineMenu({ open, onClose, placement, trigger, role, className, 'data-testid': testId, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, children, }: InlineMenuProps): JSX.Element | null;

export declare type InlineMenuPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

export declare interface InlineMenuProps {
    /** Whether the panel is currently open. Controlled by the caller. */
    open: boolean;
    /** Fires when the panel should dismiss (outside click / Esc). */
    onClose: () => void;
    /**
     * Placement relative to the nearest `position: relative` ancestor —
     * normally a wrapper around the trigger this panel is anchored to.
     * Defaults to 'bottom-start'.
     */
    placement?: InlineMenuPlacement;
    /**
     * Ref to the trigger element, so a pointerdown on it doesn't count as an
     * "outside" click. Optional — omit it if the caller handles its own
     * open/close toggling some other way.
     */
    trigger?: RefObject<HTMLElement | null>;
    /**
     * ARIA role for the panel. Default `'group'` — a plain labelled
     * container, appropriate when the panel isn't a focus-trapping dialog
     * (this component doesn't trap focus) and may or may not hold menu items.
     * Pass `'menu'` when every child is a `menuitem`.
     */
    role?: string;
    /** Optional className for the panel. */
    className?: string;
    /** Optional testid for the panel. Default 'inline-menu'. */
    'data-testid'?: string;
    /** Accessible name for the panel. */
    'aria-label'?: string;
    /** Id of an element inside the panel that names it. */
    'aria-labelledby'?: string;
    children: ReactNode;
}

export declare function InlineMessageEditor({ initialText, onSave, onCancel, 'data-testid': testId }: InlineMessageEditorProps): JSX.Element;

export declare interface InlineMessageEditorProps {
    initialText: string;
    /** Resolves once the server has the new text; rejects with a reason to show. */
    onSave: (text: string) => Promise<void> | void;
    onCancel: () => void;
    'data-testid'?: string;
}

export declare function InlinePanel({ children, variant, className, 'data-testid': testId, ref, }: InlinePanelProps): JSX.Element;

export declare interface InlinePanelProps {
    children: ReactNode;
    /** Chrome colour — same meaning as `Panel`'s `variant`. Default 'light'. */
    variant?: 'light' | 'dark';
    className?: string;
    'data-testid'?: string;
    /**
     * The underlying `<div>`. A plain prop, not `forwardRef` — see the note on
     * `StackProps.ref` (and `Card`'s, `Button`'s): React 19, our only
     * supported peer, passes `ref` through as an ordinary prop. A host that
     * needs to measure or scroll this panel (a resize observer, "scroll to
     * bottom" on a sidebar chat pane) had no way to reach the node without it.
     */
    ref?: Ref<HTMLDivElement>;
}

/**
 * Inline pipeline definition shipped on a trigger request. Optional: when
 * absent, the server resolves the definition from its persistent store.
 *
 * Carrying the full definition is keyed by `id`; everything else is
 * adapter-/version-specific and stays opaque from the contracts layer.
 */
export declare interface InlinePipelineDefinition {
    id: string;
    [key: string]: unknown;
}

export declare function InlinePlaceholder({ children, action, size, align, tone, className, 'data-testid': testId, }: InlinePlaceholderProps): JSX.Element;

export declare interface InlinePlaceholderProps {
    /** The message. One short line — "nothing here", "no runs yet". */
    children: ReactNode;
    /**
     * Optional control beside the message, e.g. a `<Button size="sm">` that
     * creates the missing thing. Sits after the text, not below it.
     */
    action?: ReactNode;
    /**
     * `xs` (default) is the list/rail scale; `sm` is for a pane-sized region
     * where the line is the only thing on screen.
     */
    size?: 'xs' | 'sm';
    /**
     * `start` (default) reads as a list row, which is what a rail section or a
     * filtered result list wants. `center` is for a region the placeholder owns
     * outright — an empty pane.
     */
    align?: 'start' | 'center';
    tone?: InlinePlaceholderTone;
    className?: string;
    'data-testid'?: string;
}

/** @see SurfaceTone — which colour family the placeholder paints in. */
export declare type InlinePlaceholderTone = SurfaceTone;

export declare function InlinePopover({ trigger, open, onClose, placement, offset, className, zIndex, 'data-testid': testId, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, children, }: InlinePopoverProps): ReactPortal | null;

export declare type InlinePopoverPlacement = 'bottom-start' | 'bottom-end' | 'right';

export declare interface InlinePopoverProps {
    /** Ref to the anchor element (the visible trigger). */
    trigger: RefObject<HTMLElement | null>;
    /** Whether the popover is currently open. Controlled by the caller. */
    open: boolean;
    /** Fires when the popover should dismiss (outside click / Esc / tab-out). */
    onClose: () => void;
    /** Placement relative to the trigger. Defaults to 'bottom-start'. */
    placement?: InlinePopoverPlacement;
    /** Pixel gap between trigger and panel. Default 6. */
    offset?: number;
    /** Optional className for the panel. */
    className?: string;
    /** Optional z-index (default 9500 — under modals at 10000). */
    zIndex?: number;
    /** Optional testid for the panel. Default 'inline-popover'. */
    'data-testid'?: string;
    /**
     * Accessible name for the `role="dialog"` panel. A dialog with no name
     * announces as a bare "dialog", so callers that don't render their own
     * labelled surface inside should pass one.
     */
    'aria-label'?: string;
    /** Id of an element inside the panel that names it. */
    'aria-labelledby'?: string;
    children: ReactNode;
}

export declare const Input: ForwardRefExoticComponent<InputProps & RefAttributes<HTMLInputElement>>;

export declare interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'prefix'> {
    type?: InputType;
    size?: InputSize;
    /** Node rendered inside the left edge of the input (icon, currency symbol, etc.) */
    prefix?: ReactNode;
    /** Node rendered inside the right edge of the input (unit, clear button, etc.) */
    suffix?: ReactNode;
    /** When true, applies a danger-colored border. */
    invalid?: boolean;
    /** When true, renders the input value in a monospace font (e.g. JSONPath, code). */
    mono?: boolean;
    'data-testid'?: string;
}

export declare type InputSize = 'sm' | 'md';

export declare type InputType = 'text' | 'number' | 'url' | 'password' | 'email' | 'search' | 'date' | 'datetime-local' | 'time';

declare const INTENSITY_SCALE: {
    readonly low: 0.35;
    readonly medium: 1;
    readonly high: 1.75;
};

/** A person who can be invited. Thin on purpose so callers can map a
 *  presence roster straight in without dragging in PresenceUser. */
export declare interface InviteCandidate {
    userId: string;
    /** Pre-resolved display name — callers MUST pass a human name, never
     *  a raw id/UUID (mirrors ResumeCallParticipant's contract). */
    name: string;
    avatarUrl?: string;
    /** True when this person is already on the call. Rendered as a
     *  non-selectable "In call" row so the list still reads as the full
     *  roster rather than mysteriously omitting people. */
    alreadyInCall?: boolean;
    /** True when they have been rung but have not answered yet. */
    pending?: boolean;
    /** Non-selectable for a reason that is NOT "already on this call" —
     *  e.g. an offline person a ring would never reach. Renders the same
     *  dimmed, non-clickable row without claiming "In call". Pair it with
     *  `statusLabel` so the row says WHY. */
    disabled?: boolean;
    /** Free-text right-hand annotation, e.g. "On a call" / "Offline".
     *  Purely informational — it does NOT affect selectability, so a
     *  caller can mark someone busy while still allowing a knock/join.
     *  `alreadyInCall` and `pending` keep their own fixed labels and win
     *  over this one. */
    statusLabel?: string;
    /** Presence: true → online dot, false → offline dot, undefined → no
     *  dot. Also drives which section a row lands in under `grouped`. */
    online?: boolean;
    /** Shown on offline rows when present, e.g. "Last seen 2h ago".
     *  Pre-formatted by the caller — this component never touches
     *  Date.now(). */
    lastSeenLabel?: string;
    /** Avatar brand color override (falls back to the name hash). */
    color?: string;
}

export declare function InviteCandidateList({ candidates, onInvite, loading, resetKey, children, tone, searchable, grouped, selectMode, onPick, confirmLabel, confirmLoadingLabel, confirmCountLabel, className, 'data-testid': testId, }: InviteCandidateListProps): JSX.Element;

/** The two extracted blocks handed to the `children` render prop. */
export declare interface InviteCandidateListParts {
    /** Empty states + the selectable candidate rows. */
    list: ReactNode;
    /** The "Invite N people" confirm button (testid `invite-to-call-confirm`).
     *  null when `selectMode='single'` — there is nothing to confirm. */
    confirm: ReactNode;
}

export declare interface InviteCandidateListProps {
    /** Everyone invitable, including people already on the call (they
     *  render disabled). */
    candidates: InviteCandidate[];
    /** Confirm handler — receives every selected userId. May be async;
     *  the caller flips `loading` while the invites are in flight. */
    onInvite: (userIds: string[]) => void | Promise<void>;
    loading?: boolean;
    /** Selection clears whenever this value changes — dialogs pass their
     *  `open` flag so a previous invite's choices never leak into the
     *  next one. */
    resetKey?: unknown;
    /** Custom layout: receives the list and confirm blocks and places
     *  them (InviteToCallDialog puts the confirm in its modal footer).
     *  Omit for the default stacked layout. */
    children?: (parts: InviteCandidateListParts) => ReactNode;
    /** Surface the list renders on. 'light' (default) uses the theme
     *  tokens the invite modal always used; 'dark' swaps to white/alpha
     *  classes for dark call chrome (CallSettingsDialog's People tab) —
     *  without it the names render dark-on-dark and disappear. */
    tone?: 'light' | 'dark';
    /** Renders a filter input (testid `people-search`) that narrows the
     *  rows by name or userId, case-insensitive. */
    searchable?: boolean;
    /** Renders "Online" then "Offline" section headers. Rows with
     *  `online: true` land under Online; everything else (including rows
     *  without presence data) lands under Offline. Offline rows show
     *  `lastSeenLabel` when present and are STILL selectable. */
    grouped?: boolean;
    /** 'multi' (default) keeps the checkbox + confirm flow. 'single'
     *  drops checkboxes and confirm — clicking a row fires `onPick`
     *  immediately. */
    selectMode?: 'multi' | 'single';
    /** Row click handler for `selectMode='single'`. */
    onPick?: (userId: string) => void;
    /** Verb on the confirm button. Defaults to "Invite" (so every existing
     *  host keeps "Invite 2 people"); a call picker passes "Call". The
     *  zero-selection state renders the bare verb. */
    confirmLabel?: string;
    /** Text while `loading`. Defaults to "Inviting…". */
    confirmLoadingLabel?: string;
    /**
     * The counted form of the confirm label, when `<verb> N people` is not
     * English for this verb.
     *
     * The default reads "Invite 2 people" and "Call 2 people", which is why it
     * was written that way — but it also produced "Start chat 2 people" the
     * moment a host used a verb that wants a preposition. The grammar belongs
     * to the caller's verb, and the caller is the only one that knows it.
     */
    confirmCountLabel?: (count: number) => string;
    /** Applied to the default stacked layout's root only. */
    className?: string;
    'data-testid'?: string;
}

export declare function InviteToCallDialog({ open, onClose, onInvite, candidates, lobbyLabel, loading, shareLink, }: InviteToCallDialogProps): JSX.Element;

export declare interface InviteToCallDialogProps {
    open: boolean;
    onClose: () => void;
    /** Confirm handler — receives every selected userId. May be async;
     *  the caller flips `loading` while the invites are in flight. */
    onInvite: (userIds: string[]) => void | Promise<void>;
    /** Everyone invitable, including people already on the call (they
     *  render disabled). */
    candidates: InviteCandidate[];
    /** Human label for the call being invited to, shown in the subtitle. */
    lobbyLabel?: string;
    loading?: boolean;
    /** Optional join URL. Rooms are link-shareable, so the picker is the
     *  natural home for that link — it is the one place the user goes
     *  when they want more people here. Previously this lived in a
     *  full-bleed overlay across the call tiles, which covered the video
     *  and read as a rendering bug. */
    shareLink?: string;
}

/** True when `command` is offered in `ctx`. */
export declare function isChatCommandInScope(command: Pick<ChatCommand, 'scope'>, ctx: ChatCommandScopeContext): boolean;

export declare function isImageAttachment(a: {
    contentType?: string;
}): boolean;

/**
 * `null`/`undefined` mean nobody measured; a numeric 0 means somebody did and
 * the answer was nobody. Negative is nonsense from a broken source, and is
 * treated as unmeasured rather than shown.
 */
export declare function isKnownViewerCount(count: number | null | undefined): count is number;

/**
 * Does a separator belong BETWEEN these two messages?
 *
 * `previous` is undefined for the first message in the list, which does get a
 * separator: the top of a transcript is a day boundary too, and without one
 * the oldest visible block is the only one on screen whose date is unstated.
 *
 * An unparseable timestamp never opens a new day. A malformed row is a data
 * problem; inventing a date heading for it would turn it into a reading
 * problem for every message under it.
 */
export declare function isNewDay(current: string, previous?: string): boolean;

export declare function isPeopleGraphData(data: GraphPanelData): data is GraphPanelPeopleData;

/** True while a drag carries a prompt-context payload (types are readable during dragover; data is not). */
export declare function isPromptContextDrag(dataTransfer: DataTransfer | null | undefined): boolean;

/** A run that is still moving — the panel keeps re-reading it. */
export declare function isRunPanelLive(status: RunPanelStatus): boolean;

export declare function isValidCustomFieldType(x: unknown): x is CustomFieldType;

export declare type JoinMergeStrategy = 'deep-merge' | 'array-collect' | 'last-writer-wins';

export declare type JoinMode = 'all' | 'any' | 'n_of_m';

export declare interface JoinNodeData {
    type: 'join';
    mode: JoinMode;
    /** Required when `mode === 'n_of_m'`. */
    n?: number;
    mergeStrategy: JoinMergeStrategy;
}

export declare interface JsonPatchOp {
    op: string;
    path: string;
    value?: unknown;
    from?: string;
}

export declare const JsonPathInput: ForwardRefExoticComponent<JsonPathInputProps & RefAttributes<HTMLInputElement>>;

export declare interface JsonPathInputProps {
    value: string;
    onChange: (value: string) => void;
    samples?: JsonPathSample[];
    placeholder?: string;
    invalid?: boolean;
    errorMessage?: string;
    disabled?: boolean;
    size?: 'sm' | 'md';
    /**
     * When true, validate that value starts with '$.' on blur and surface the
     * error via the errorMessage slot (caller receives the validated value
     * unchanged — validation is display-only here).
     */
    enforcePrefix?: boolean;
    'data-testid'?: string;
}

export declare interface JsonPathSample {
    /** Short display label, e.g. '$.trigger.imageRef' */
    label: string;
    /** The value to paste into the input when clicked */
    value: string;
}

declare interface KeyboardShortcut {
    /** Key to match (case-insensitive, e.g., 's', 'Enter', 'Escape') */
    key: string;
    /** Require Cmd/Ctrl modifier */
    meta?: boolean;
    /** Require Shift modifier */
    shift?: boolean;
    /** Require Alt/Option modifier */
    alt?: boolean;
    /** Callback to invoke when shortcut matches */
    handler: (e: KeyboardEvent) => void;
    /** Prevent default browser action (default: true) */
    preventDefault?: boolean;
}

export declare function KeyValue({ items, layout, labelWidth, divided, className, 'aria-label': ariaLabel, 'data-testid': testId, }: KeyValueProps): JSX.Element | null;

export declare interface KeyValueItem {
    label: string;
    value: ReactNode;
    /** Monospace value — ids, shas, model ids. */
    mono?: boolean;
    /**
     * Native tooltip on the value — the full text of a value the layout
     * truncates (a long id, a path).
     */
    title?: string;
    /**
     * The value in tertiary ink — a fact that is really an absence ("Not
     * defined yet", "No links added"). Since 2.390.0.
     */
    muted?: boolean;
    /**
     * A control at the row's end, after the value — "Draft with agent", "Add a
     * note". Row layout only. Since 2.390.0.
     */
    action?: ReactNode;
}

export declare type KeyValueLayout = 'stack' | 'row' | 'grid';

export declare interface KeyValueProps {
    items: KeyValueItem[];
    /**
     * `row` (default): label in a fixed column left of the value.
     * `stack`: label above value, one fact per line.
     * `grid`: stacked pairs in two columns.
     */
    layout?: KeyValueLayout;
    /** Row layout only: the label column's Tailwind width class. Default `w-28`. */
    labelWidth?: string;
    /**
     * Row layout only: each fact on its own ruled row (a rule above the first
     * and under every row), at 15px, with any `action` right-aligned — a small
     * checklist table ("Complete the brief"). Default `false`. Since 2.390.0.
     */
    divided?: boolean;
    className?: string;
    'aria-label'?: string;
    'data-testid'?: string;
}

export declare interface KnowledgeBaseNodeData {
    type: 'knowledge-base';
    knowledgeBaseId: string;
    queryTemplate: string;
    topK: number;
    scoreThreshold?: number;
    outputKey?: string;
    retryPolicy?: RetryPolicy;
}

export declare function KPIGrid({ children, columns, mdColumns, dense, className, style, 'data-testid': testId, }: KPIGridProps): JSX.Element;

export declare type KPIGridColumns = 1 | 2 | 3 | 4;

export declare interface KPIGridProps {
    /** Children — expected to be <StatCard> instances. */
    children: ReactNode;
    /** Number of columns at >=640px. Default 4. Always collapses to 1 below. */
    columns?: KPIGridColumns;
    /**
     * Column count for the 768–1023px (`md`) band. Undefined (the default)
     * emits no `md:` class, so `columns` applies starting at the `sm`
     * breakpoint (640px) exactly as it always has.
     *
     * Setting this steps the grid up in three stages instead: 1 column below
     * `sm`, `mdColumns` starting at `md` (768px), then `columns` starting at
     * `lg` (1024px) — no `sm:` class is emitted in this mode, since `sm` and
     * `md` would otherwise both apply at 768px+ and Tailwind's declaration
     * order (not specificity) makes the later one, `md`, win regardless of
     * which is visually "bigger". Set `mdColumns` lower than `columns` for a
     * grid that lives inside a nested rail (a laptop-width `md` view there is
     * far narrower than a full-width page at the same viewport size) so tiles
     * stay readable instead of cramming `columns` of them into the rail's
     * actual width.
     */
    mdColumns?: KPIGridColumns;
    /** Tighter gap (8px vs 16px). Default false. */
    dense?: boolean;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}

export declare interface LabEvent {
    id: string;
    at: string;
    kind: 'command' | 'text' | 'tool' | 'result' | 'error' | 'status' | 'iteration';
    text: string;
    /** Long form — a tool's arguments and output. Collapsed behind a disclosure. */
    detail?: string;
    /** True when the runtime that produced this frame was a mock. Always shown. */
    mock?: boolean;
}

/** Where a loop is. Mirrors the run status platform-api reports. */
export declare type LabStatus = 'planning' | 'starting' | 'running' | 'waiting' | 'done' | 'failed' | 'stopped' | 'budget';

export declare interface LabStep {
    id: string;
    title: string;
    kind: string;
    status: 'pending' | 'running' | 'done' | 'failed' | 'skipped';
    iterations?: number;
    contextTokens?: number;
}

/** Alias kept for diagrams better described as a stack of horizontal layers. */
export declare const LayerStack: typeof StackDiagram;

export declare function layoutGraph(nodes: GraphNode[], edges: GraphEdge[], layout: GraphLayout, size: GraphLayoutSize): GraphPositions;

/** Node positions for a layout. Exported for tests and hosts that draw their own minimap. */
export declare function layoutTypedNodes(nodes: TypedCanvasNode[], edges: Pick<TypedCanvasEdge, 'from' | 'to'>[], options?: {
    layout?: 'ltr' | 'manual';
    nodeWidth?: number;
    nodeHeight?: number;
    columnGap?: number;
    rowGap?: number;
}): Map<string, {
    x: number;
    y: number;
}>;

/**
 * @deprecated Pre-2.106 spelling. 'docked' is now 'window'; everything
 * that accepts a mode still takes this union, but emits {@link CallWidgetMode}.
 */
export declare type LegacyCallWidgetMode = 'mini' | 'docked' | 'fullscreen';

/** Default light theme — derived from the original hardcoded tokens. */
export declare const lightTheme: ThemeTokens;

export declare interface LimitEffortsOptions {
    /**
     * How many efforts may be drawn. Defaults to
     * `WORK_ACTIVITY_DEFAULT_MAX_EFFORTS` (2). `WORK_ACTIVITY_ALL_EFFORTS` (0),
     * a negative number, or a non-finite one means no cap at all.
     */
    max?: number;
    /**
     * An effort that must survive the cap whatever its age — the one the current
     * focus or selection is inside. Hiding the work someone is looking at is the
     * one thing a display filter must never do, so this effort takes the place of
     * the oldest effort that would otherwise have been shown.
     */
    keepEffortId?: string | null;
    /**
     * Keep the newest effort that holds something the person MADE (a document —
     * a deck, a page) in view even when newer run-only efforts outnumber the cap.
     * A deck saved a minute ago sat behind two probe runs and was a click away
     * rather than drawn (realtime-examples NFR #221 follow-up). Default true;
     * the selection's `keepEffortId` still wins over it.
     */
    keepLatestMade?: boolean;
}

/**
 * The newest `max` efforts, in the order the host gave them — except that,
 * unless `keepLatestMade` is false, the newest effort holding a document takes
 * the last place when none of the newest does.
 *
 * Recency is the latest `updatedAt`/`startedAt` across an effort's own nodes,
 * which is the same "newest work first" rule the panel footer already claims;
 * hosts that already sort newest-first therefore get exactly their own first N.
 * The RESULT keeps source order rather than recency order, because the canvas
 * treats effort order as stable — a heartbeat must not make two lanes swap
 * places.
 */
export declare function limitWorkEfforts(efforts: readonly WorkActivityEffort[], nodes: readonly WorkGraphNodeData[], options?: LimitEffortsOptions): WorkActivityEffort[];

export declare function LineChart({ series, height, yFormat, xFormat, }: {
    series: LineSeries[];
    height?: number;
    yFormat?: (v: number) => string;
    xFormat?: (v: number | string) => string;
}): JSX.Element;

export declare interface LineSeries {
    label: string;
    data: Array<{
        x: number | string;
        y: number;
    }>;
    color?: string;
}

export declare function Link({ href, children, external, unstyled, target, rel, className, ...rest }: LinkProps): JSX.Element;

export declare interface LinkableDocument {
    id: string;
    title: string;
    kind?: FileKind;
}

export declare function LinkBlockEditorRenderer({ section, editable, onUpdateSection, }: SectionRendererProps): JSX.Element;

export declare const linkBlockFieldType: FieldTypeDefinition;

export declare function LinkBlockReaderRenderer({ section }: SectionRendererProps): JSX.Element;

export declare function LinkDialog({ open, initialText, initialHref, onSubmit, onRemove, onClose, 'data-testid': testId, }: LinkDialogProps): JSX.Element;

export declare interface LinkDialogProps {
    open: boolean;
    /** Selected text at the time the dialog opened; prefills the label. */
    initialText?: string;
    /** Existing href when editing a link rather than creating one. */
    initialHref?: string;
    onSubmit: (value: LinkDialogValue) => void;
    onRemove?: () => void;
    onClose: () => void;
    'data-testid'?: string;
}

export declare interface LinkDialogValue {
    href: string;
    /** The visible text. Empty means "keep whatever is selected". */
    text: string;
}

export declare interface LinkedItem {
    id: string;
    title: string;
    kind?: FileKind;
    /** e.g. 'Depends on' | 'Decided by'. */
    relation?: string;
    status?: {
        label: string;
        tone: StatusPillTone;
    } | null;
    onOpen?: () => void;
    href?: string;
    onRemove?: () => void;
}

export declare function LinkedItemsSection({ title, items, onSearchDocuments, onAdd, relations, emptyLabel, first, variant, className, 'data-testid': testId, }: LinkedItemsSectionProps): JSX.Element;

export declare interface LinkedItemsSectionProps {
    title?: string;
    items: LinkedItem[];
    onSearchDocuments?: (q: string) => Promise<LinkableDocument[]> | LinkableDocument[];
    onAdd?: (doc: LinkableDocument, relation: string) => void;
    relations?: LinkRelationOption[];
    emptyLabel?: string;
    first?: boolean;
    /**
     * `heading` (default since 2.386.15): a 16px heading, 14px rows, the status
     * as a soft tag, the relation read out (and on hover) rather than printed,
     * and "Add link" quiet until the section is hovered — a work item's Brief.
     * `label`: the small caption, printed relation and dotted pill.
     */
    variant?: 'label' | 'heading';
    className?: string;
    'data-testid'?: string;
}

/** Two chain links: a hyperlink — "point this at a URL", or "copy the URL". */
export declare function LinkIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
    /** Required — a link with nowhere to go is a button. */
    href: string;
    children: ReactNode;
    /**
     * Open in a new tab. Sets `target="_blank"` and forces safe `rel`.
     * Prefer this over passing `target` yourself.
     */
    external?: boolean;
    /**
     * Drop the default `text-primary … hover:underline` styling, for a link that
     * wraps something already styled (a card, an avatar, a whole row).
     */
    unstyled?: boolean;
}

export declare interface LinkRelationOption {
    value: string;
    label: string;
}

declare type LinkRenderer = (item: {
    to: string;
    id: string;
}, props: AnchorHTMLAttributes<HTMLAnchorElement>) => ReactNode;

/**
 * Fetch DLQ entries with optional filters.
 */
export declare function listDLQEntries(options?: {
    limit?: number;
    cursor?: string;
    errorKind?: string;
    sinceMs?: number;
}): Promise<DLQListResponse>;

/** Three dots and three lines: a bulleted list. Since 2.386.0. */
export declare function ListIcon({ size, ...rest }: GlyphProps): JSX.Element;

/**
 * Fetch pipeline run history from the backend API.
 *
 * **Rejects** when the endpoint is unavailable or answers non-2xx. It used to
 * swallow the failure and resolve `{ runs: [] }`, which is indistinguishable
 * from "this pipeline has never run": `PipelineRunsPanel` rendered
 * "No runs yet. Trigger this pipeline to see history here." with its error
 * banner unreachable, and `PipelineRunsContext`'s localStorage fallback —
 * written in its `.catch` — could never run because nothing ever rejected.
 * Every caller already has a `catch`/`.catch` that does the right thing.
 */
export declare function listPipelineRuns(pipelineId: string, options?: {
    limit?: number;
    cursor?: string;
}): Promise<ListRunsResponse>;

/**
 * @deprecated The (sectionType × viewMode) renderer registry only serves the
 * legacy SECTIONED document editor (`SectionBlock`), which is deprecated
 * (2026-09-22). Pages render document-type fields as `macro:field` blocks in
 * `CanvasDocumentView`. The field-type registry above is NOT deprecated —
 * document types and their page field macros still use it.
 */
/** Returns all registered (sectionType, viewMode) pairs — useful for debug / config UIs. */
export declare function listRegisteredRenderers(): Array<{
    sectionType: string;
    viewMode: string;
    component: SectionRenderer;
}>;

export declare interface ListRunsResponse {
    runs: PipelineRun[];
    nextCursor?: string;
}

/** Nested lines: "list style" / multilevel list. Since 2.386.5. */
export declare function ListStyleIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function LiveRegion({ message, politeness, atomic, throttleMs, role, 'data-testid': testId, }: LiveRegionProps): JSX.Element;

export declare type LiveRegionPoliteness = 'polite' | 'assertive' | 'off';

export declare interface LiveRegionProps {
    /**
     * What to announce. Announced whenever the string changes; set it to `''`
     * to say nothing (an empty region is never spoken).
     */
    message: string;
    /** @default 'polite' */
    politeness?: LiveRegionPoliteness;
    /**
     * Announce the whole message rather than only the changed part.
     * @default true — a partial diff of a status line is rarely intelligible.
     */
    atomic?: boolean;
    /**
     * Minimum gap between announcements, in ms. Messages arriving inside the
     * window are coalesced and the latest one is announced when it closes.
     * `0` disables throttling.
     * @default 0
     */
    throttleMs?: number;
    /**
     * Landmark role. `status` (polite) and `alert` (assertive) carry their own
     * implicit live semantics and are what most callers want; `log` suits an
     * append-only feed. `none` renders the bare `aria-live` container — pick it
     * when the page already has a `status`/`alert` element and a second one
     * would make `getByRole` ambiguous.
     * @default 'status'
     */
    role?: 'status' | 'alert' | 'log' | 'none';
    'data-testid'?: string;
}

export declare interface LLMNodeData {
    type: 'llm';
    provider: LLMProvider;
    /** Model identifier, e.g. 'claude-sonnet-4-6'. */
    model: string;
    systemPrompt: string;
    /** Supports `{{context.foo}}` substitution. */
    userPromptTemplate: string;
    temperature?: number;
    maxTokens?: number;
    streaming: boolean;
    retryPolicy?: RetryPolicy;
}

export declare type LLMProvider = 'anthropic' | 'bedrock' | 'claude-code';

export declare function LoadingState({ label, description, spinnerSize, spinnerColor, testId, }: LoadingStateProps): JSX.Element;

export declare interface LoadingStateProps {
    /** Primary label. Defaults to "Loading…". */
    label?: string;
    /** Optional secondary copy below the label. */
    description?: ReactNode;
    spinnerSize?: SpinnerSize;
    spinnerColor?: string;
    testId?: string;
}

/**
 * A message that exists only in THIS viewer's thread — never sent, never
 * stored, gone on reload. The shape a `visibility: 'private'` command outcome
 * takes while its owner decides whether to post it: the card shows the run
 * moving (its `metadata` goes through the same `agent-run` reader as a real
 * message, so `agentRunStatus`, Open and Approve all work), a subdued note
 * says nobody else can see it, and `actions` are what the owner can do about
 * that — post it, dismiss it.
 */
export declare interface LocalChatMessage {
    id: string;
    /** ISO. Decides where in the thread the message sits. */
    timestamp: string;
    displayName: string;
    content: string;
    metadata: Record<string, unknown>;
    actions?: Array<{
        id: string;
        label: string;
        onSelect: () => void;
        primary?: boolean;
    }>;
    /** Replaces the default "Only you can see this". */
    note?: string;
}

/** A padlock: "private", "restricted to specific people". */
export declare function LockIcon({ size, ...rest }: GlyphProps): JSX.Element;

declare interface LogEntry {
    id: string;
    direction: 'sent' | 'received';
    message: GatewayMessage | Record<string, unknown>;
    timestamp: string;
}

export declare function LoginPage({ uid, interactionUrl, clientName, logoUrl, error, onLogin, onRegister, onForgotPassword, registrationEnabled, forgotPasswordEnabled, defaultTab, }: LoginPageProps): JSX.Element;

export declare interface LoginPageProps {
    uid: string;
    interactionUrl: string;
    clientName?: string;
    logoUrl?: string;
    error?: string | null;
    onLogin: (email: string, password: string) => Promise<void>;
    onRegister: (data: {
        email: string;
        password: string;
        givenName?: string;
        familyName?: string;
        enableMfa?: boolean;
    }) => Promise<void>;
    onForgotPassword: (email: string) => Promise<void>;
    registrationEnabled?: boolean;
    forgotPasswordEnabled?: boolean;
    /**
     * Tab the page opens on. Optional and **initial-only** — the page still
     * owns the tab afterwards, so the tab bar keeps working unchanged. Omit it
     * and the page opens on `'signin'`, which is the historical behaviour.
     *
     * It exists because the register and forgot-password forms were previously
     * reachable only by clicking their tab: an OIDC host cannot honour a
     * `?screen_hint=signup` deep link, a story cannot show either form, and a
     * test has to click a tab before it can assert on the form behind it.
     *
     * A tab that the corresponding `*Enabled` flag has switched off is ignored
     * and `'signin'` is used instead, so this prop can never render a form the
     * host has disabled.
     */
    defaultTab?: LoginTab;
}

/** The three authentication forms the page can show. */
declare type LoginTab = 'signin' | 'register' | 'forgot';

export declare type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export declare interface LogLine {
    id: string;
    /** Pre-formatted timestamp string (e.g. "10:48:21.024"). Optional. */
    timestamp?: string;
    /** Severity. Drives glyph + color. */
    level?: LogLevel;
    /** Optional source/component prefix (e.g. "auth-svc", "pipeline-7"). */
    source?: string;
    /** The log message body. */
    message: ReactNode;
}

export declare function LogoutPage({ onConfirm, onCancel, clientName }: LogoutPageProps): JSX.Element;

export declare interface LogoutPageProps {
    onConfirm: () => void;
    onCancel?: () => void;
    clientName?: string;
}

export declare function LogStream({ lines, follow, showTimestamp, showLevel, showSource, title, headerSlot, emptyMessage, maxHeight, tone, onClear, className, style, 'data-testid': testId, }: LogStreamProps): JSX.Element;

export declare interface LogStreamProps {
    lines: LogLine[];
    /** When true, autoscroll to the latest line as new lines arrive. Default true. */
    follow?: boolean;
    /** When true, render the small timestamp column. Default true. */
    showTimestamp?: boolean;
    /** When true, render the level glyph. Default true. */
    showLevel?: boolean;
    /** When true, render the source prefix column. Default true. */
    showSource?: boolean;
    /** Header title. Default: "Log stream". Set to null to hide the header. */
    title?: string | null;
    /** Optional right-side meta slot in the header (overrides default line count). */
    headerSlot?: ReactNode;
    /** Empty-state message when lines is empty. */
    emptyMessage?: ReactNode;
    /** Optional max-height for the scroll region. */
    maxHeight?: string;
    /**
     * Colour family for the scroll region. `'code'` (default) is today's
     * permanently-dark console — `--color-surface-subtle` with a `#0b1020`
     * fallback for hosts that don't define it, `--color-text-primary` with a
     * `#e5e7eb` fallback for the text. `'surface'` follows the host theme
     * instead (`bg-surface-inset text-text-primary`), for a log panel embedded
     * in an otherwise light-themed page rather than a terminal pane.
     * `'transparent'` keeps the light-on-dark text but paints no background at
     * all, for a log sitting over a surface that owns its own — the working-state
     * backdrop in `RisingParticles`, whose star field an opaque scroll region
     * would hide completely.
     */
    tone?: 'code' | 'surface' | 'transparent';
    /** When provided, renders a "Clear" button in the header. */
    onClear?: () => void;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}

export declare function makeEmptyField(sectionType: string): DocumentTypeField;

/** A blank slide of a layout, with the sub-object that layout needs. */
export declare function makeSlide(id: string, layout?: SlideLayout): DeckSlide;

export declare interface MappingRule {
    /** Glob or regex pattern matching source file paths. */
    pattern: string;
    /** Document type to assign when pattern matches. */
    documentTypeId: string;
    /** Optional pipeline to trigger on ingest. Overrides source-level default. */
    pipelineId?: string;
    /** Priority when multiple rules match — higher wins. */
    priority: number;
}

export declare function mapStatusToDecision(status: string): ApprovalDecision | null;

export declare function MarkdownView({ markdown, scale, className, 'data-testid': testId }: MarkdownViewProps): JSX.Element;

export declare interface MarkdownViewProps {
    markdown: string;
    /**
     * Type scale (since 2.388.0). `md` (default) is the long-standing rendering:
     * 14px body, h1 20px. `sm` steps headings down to 17/15/14/13px over a 13px
     * body, for prose inside a card (an assistant answer) whose `#` must not
     * compete with the page title. `lg` is a document read on its own page:
     * 15px body, h1 24px, h2 20px.
     */
    scale?: MarkdownViewScale;
    className?: string;
    'data-testid'?: string;
}

export declare type MarkdownViewScale = 'sm' | 'md' | 'lg';

export declare function MasterDetail<T>({ items, keyOf, selectedKey, onSelect, renderRow, renderCompactRow, renderDetail, railTitle, railWidth, compactWidth, storageKey, emptyDetail, className, 'data-testid': testId, }: MasterDetailProps<T>): JSX.Element;

export declare interface MasterDetailProps<T> {
    items: T[];
    keyOf: (item: T) => string;
    selectedKey: string | null;
    onSelect: (key: string) => void;
    /** Expanded rail row. */
    renderRow: (item: T, index: number, selected: boolean) => ReactNode;
    /** Compact (72px) rail row. Falls back to an index badge when omitted. */
    renderCompactRow?: (item: T, index: number, selected: boolean) => ReactNode;
    renderDetail: (item: T, index: number) => ReactNode;
    railTitle?: ReactNode;
    /** Expanded rail width in px. Default 340. */
    railWidth?: number;
    /** Compact rail width in px. Default 72. */
    compactWidth?: number;
    /** Persists compact/expanded mode under this localStorage key. */
    storageKey?: string;
    /** Rendered in the detail pane when nothing resolves from `selectedKey`. */
    emptyDetail?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

/** The command a draft is addressing, or null. `/doc`, `/doc …`, never `/document`. */
export declare function matchComposerCommand(draft: string, commands: readonly ComposerCommand[] | undefined): ComposerCommand | null;

export declare function matchHotkey(e: KeyboardEvent, spec: string): boolean;

/**
 * The tag that explains why this person is here: the first tag the query
 * mentions (or that mentions the query), else the person's first tag.
 */
export declare function matchingTag(person: GraphPerson, query: string | undefined): string | undefined;

export declare const MAX_DECK_SLIDES = 40;

export declare interface McpToolNodeData {
    type: 'mcp-tool';
    gatewayUrl: string;
    toolName: string;
    inputTemplate: string;
    outputKey?: string;
    timeoutMs?: number;
    retryPolicy?: RetryPolicy;
}

export declare function MediaControlsBar({ audioOn, videoOn, screenSharing, onToggleAudio, onToggleVideo, onToggleScreenShare, onLeave, audioDisabled, videoDisabled, screenShareDisabled, extras, leaveLabel, size, className, 'data-testid': testId, }: MediaControlsBarProps): JSX.Element;

export declare interface MediaControlsBarProps {
    audioOn: boolean;
    videoOn: boolean;
    screenSharing?: boolean;
    onToggleAudio: () => void;
    onToggleVideo: () => void;
    /** When omitted, the screen-share toggle is not rendered. */
    onToggleScreenShare?: () => void;
    /** Required — leaves the call. Per the locked contract, leave lives here. */
    onLeave: () => void;
    audioDisabled?: boolean;
    videoDisabled?: boolean;
    screenShareDisabled?: boolean;
    /** Slot rendered between the screen-share toggle and the Leave button.
     *  Use for raise-hand, captions, chat-open, settings, etc. */
    extras?: ReactNode;
    /** Override the Leave button's accessible label. Default: "Leave call". */
    leaveLabel?: string;
    /** Size of each control. Defaults to 'md'. */
    size?: CircularIconToggleSize;
    className?: string;
    'data-testid'?: string;
}

export declare interface MediaDeviceOption {
    deviceId: string;
    label: string;
    kind: MediaDeviceKind;
}

declare interface MediaDevices_2 {
    microphones: MediaDeviceOption[];
    cameras: MediaDeviceOption[];
    speakers: MediaDeviceOption[];
    /** True until the first enumeration has answered. */
    loading: boolean;
    /** False where `enumerateDevices` does not exist (insecure context, SSR). */
    supported: boolean;
    /** False where the browser cannot route audio to a chosen output. */
    canSelectSpeaker: boolean;
    /** True when at least one device came back without a label — permission not yet granted. */
    labelsHidden: boolean;
    refresh: () => Promise<void>;
}
export { MediaDevices_2 as MediaDevices }

export declare interface MediaEffectsBackgroundOption {
    id: string;
    label: string;
    /** Thumbnail + replacement image URL, rendered as the chip's preview. */
    url: string;
}

export declare interface MediaEffectsFilterOption {
    id: string;
    label: string;
}

export declare function MediaEffectsPreviewPanel({ previewActive, previewStream, isDirty, onApply, onCancel, filters, activeFilterId, onSelectFilter, backgrounds, backgroundMode, activeBackgroundUrl, onSelectBackground, faceSprites, activeFaceSpriteId, onSelectFaceSprite, disabled, title, applyLabel, className, 'data-testid': testId, }: MediaEffectsPreviewPanelProps): JSX.Element;

export declare interface MediaEffectsPreviewPanelProps extends Pick<MediaEffectsTrayProps, 'filters' | 'activeFilterId' | 'onSelectFilter' | 'backgrounds' | 'backgroundMode' | 'activeBackgroundUrl' | 'onSelectBackground' | 'faceSprites' | 'activeFaceSpriteId' | 'onSelectFaceSprite'> {
    /**
     * True while a preview session is open — i.e. the controller has a
     * non-null `draft` and its setters write that draft instead of the
     * live pipeline. When false the panel renders read-only and NO
     * selection callback fires, so nothing can reach peers.
     */
    previewActive: boolean;
    /**
     * The draft self-view (built from the controller's `previewTrack`).
     * Never published. Pass null for the camera-off / warming-up state.
     */
    previewStream: MediaStream | null;
    /** Draft differs from live. Gates Apply. */
    isDirty: boolean;
    /** Commit the draft — the only thing that changes what peers see. */
    onApply: () => void;
    /** Discard the draft and dismiss. Live stays untouched. */
    onCancel: () => void;
    /** Extra dimming on top of `previewActive`, e.g. while the engine warms. */
    disabled?: boolean;
    /** Panel heading. Defaults to "Video effects" (Teams' wording). */
    title?: string;
    /** Label for the commit button. Defaults to "Apply". */
    applyLabel?: string;
    className?: string;
    'data-testid'?: string;
}

export declare function MediaEffectsTray({ filters, activeFilterId, onSelectFilter, backgrounds, backgroundMode, activeBackgroundUrl, onSelectBackground, faceSprites, activeFaceSpriteId, onSelectFaceSprite, disabled, compact, className, 'data-testid': testId, }: MediaEffectsTrayProps): JSX.Element;

export declare interface MediaEffectsTrayProps {
    filters: MediaEffectsFilterOption[];
    /** 'none' = no filter active. */
    activeFilterId: string;
    onSelectFilter: (id: string) => void;
    backgrounds: MediaEffectsBackgroundOption[];
    backgroundMode: 'none' | 'blur' | 'image';
    /** Only meaningful when backgroundMode === 'image'. */
    activeBackgroundUrl: string | null;
    /** ('none', null) | ('blur', null) | ('image', url) */
    onSelectBackground: (mode: 'none' | 'blur' | 'image', url: string | null) => void;
    faceSprites: MediaEffectsFilterOption[];
    /** null = no sprite active. */
    activeFaceSpriteId: string | null;
    onSelectFaceSprite: (id: string | null) => void;
    /** Dims every chip and blocks clicks — e.g. while the engine loads. */
    disabled?: boolean;
    /** Compact = tighter paddings for popover placement. */
    compact?: boolean;
    className?: string;
    'data-testid'?: string;
}

declare interface MemberItem {
    groupId: string;
    userId: string;
    role: 'owner' | 'admin' | 'member';
    joinedAt: string;
    displayName?: string;
    status?: string;
}

export declare interface MembershipHistory {
    mode: MembershipHistoryMode;
    days?: number;
}

export declare type MembershipHistoryMode = 'none' | 'days' | 'all';

export declare function MembershipNotice({ membership, fallbackText, timestamp, className, 'data-testid': testId, }: MembershipNoticeProps): JSX.Element;

export declare interface MembershipNoticeProps {
    membership: MembershipRef;
    /** The message text — what the line says when the names are missing. */
    fallbackText?: string;
    timestamp?: string;
    className?: string;
    'data-testid'?: string;
}

export declare interface MembershipRef {
    event: 'added' | 'removed';
    actorId: string;
    actorName?: string;
    userIds: string[];
    names?: string[];
    history?: MembershipHistory;
}

/**
 * A membership event: `metadata.kind === 'membership'`. Rendered as a system
 * line — "Eve added Carol · history from the last 7 days" — not a bubble.
 */
export declare function membershipRefFromMetadata(metadata: Record<string, unknown> | undefined): MembershipRef | null;

export declare function MembersPanel({ members, open, canManage, currentUserId, onAdd, onRemove, className, 'data-testid': testId, }: MembersPanelProps): JSX.Element;

export declare interface MembersPanelProps {
    members: readonly ChatMember[];
    /** True when the channel gates nobody — everyone in the org can read it. */
    open?: boolean;
    /** The viewer may add and remove (an owner). */
    canManage?: boolean;
    currentUserId?: string;
    /**
     * "Add people". Receives the button that was pressed, so the host can open
     * an anchored form beside it rather than a centred modal.
     */
    onAdd?: (trigger?: HTMLElement) => void;
    onRemove?: (userId: string) => void;
    className?: string;
    'data-testid'?: string;
}

export declare type MemoryMode = 'read' | 'write';

export declare interface MemoryNodeData {
    type: 'memory';
    mode: MemoryMode;
    scope: MemoryScope;
    namespace: string;
    keyExpression: string;
    valueField?: string;
    outputKey?: string;
}

export declare type MemoryScope = 'session' | 'long-term';

declare interface MentionItem {
    kind: 'mention';
    sectionId: string;
    sectionTitle: string;
    commentId: string;
    authorName: string;
    authorColor: string;
    commentText: string;
    timestamp: string;
}

declare interface MentionUser {
    userId: string;
    displayName: string;
    color: string;
    online: boolean;
    mode?: string;
    type: 'user' | 'group';
    memberCount?: number;
}

/** Three stacked bars: "open the menu", or "unfold the rail this collapsed into". */
export declare function MenuIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** Later commands win by trigger (case-insensitive); the first occurrence keeps its position. */
export declare function mergeChatCommands(...layers: ReadonlyArray<readonly ChatCommand[] | undefined>): ChatCommand[];

export declare function MessageActionBar({ quickReactions, onReact, onOpenReactionPicker, onReply, onForward, onTogglePin, pinned, onCopyLink, onEdit, onDelete, className, 'data-testid': testId, }: MessageActionBarProps): JSX.Element | null;

export declare interface MessageActionBarProps {
    /** Emoji offered inline. Keep it short; the picker covers the rest. */
    quickReactions?: readonly string[];
    onReact?: (emoji: string) => void;
    /**
     * Opens the full emoji picker, at the button that asked for it. Omit to show
     * only the quick row.
     */
    onOpenReactionPicker?: (trigger: HTMLElement) => void;
    onReply?: () => void;
    /**
     * Send this message to ANOTHER conversation.
     *
     * Sits next to Reply because the two are the same gesture pointed different
     * ways — reply keeps the message where it is, forward moves a copy
     * somewhere else — and putting it after Pin would bury it among the
     * channel-admin controls, which is not what it is.
     *
     * Absent means this message cannot be forwarded, and nothing renders. That
     * is a real state rather than a permission: a card or a system notice is
     * not a thing you can relocate (see ChatPanel's `onForwardMessage`), so a
     * disabled Forward would be a promise the product will not keep — the same
     * rule `onTogglePin` follows above.
     *
     * Hands back the BUTTON that was pressed, so the destination picker can
     * open against it instead of in the middle of a dimmed page. Same hand-back
     * `RailSectionHeader` does for the rail's + buttons, and the reason is the
     * same: only the bar knows which of the transcript's many Forward buttons
     * this click came from, and the host that owns the picker cannot ask.
     */
    onForward?: (trigger: HTMLElement) => void;
    /** Pin/unpin. Absent means this viewer may not pin here — the control is
     *  then not rendered at all, rather than rendered disabled: a greyed pin is
     *  a promise the product will not keep. */
    onTogglePin?: () => void;
    pinned?: boolean;
    onCopyLink?: () => void;
    /** Own-message actions. Absent for other people's messages. */
    onEdit?: () => void;
    onDelete?: () => void;
    className?: string;
    'data-testid'?: string;
}

export declare function MessageBody({ html, text, className, 'data-testid': testId }: MessageBodyProps): JSX.Element;

export declare interface MessageBodyProps {
    /** Rich body from the composer. When absent, `text` is rendered plainly. */
    html?: string;
    /** Plain-text fallback — also what a client that cannot render HTML shows. */
    text: string;
    className?: string;
    'data-testid'?: string;
}

/**
 * A chat message bubble for user/assistant messages.
 *
 * Stateless — accepts content + tool calls as props. Renders a role label,
 * an optional tool-call strip, and the message body (markdown for assistants
 * when `renderMarkdown` is supplied, plain `whitespace-pre-wrap` otherwise).
 */
export declare function MessageBubble({ role, content, toolCalls, streaming, agentName, userName, renderMarkdown, className, }: MessageBubbleProps): JSX.Element;

export declare interface MessageBubbleProps {
    role: 'user' | 'assistant';
    content: string;
    toolCalls?: ToolCallItem[];
    /** shows ThinkingDots when content is empty */
    streaming?: boolean;
    /** label shown for assistant (default 'Assistant') */
    agentName?: string;
    /** label shown for user (default 'You') */
    userName?: string;
    /** inject markdown renderer */
    renderMarkdown?: (content: string) => ReactNode;
    className?: string;
}

export declare function MessageGroup({ author, avatarUrl, mine, messages, className, }: MessageGroupProps): JSX.Element | null;

export declare interface MessageGroupItem {
    /** Stable React key for the row. */
    id: string;
    content: ReactNode;
    /** ISO timestamp string; rendered as local HH:MM. */
    timestamp: string;
    /** Optional per-row footer (e.g. a `<ReactionsBar>` specific to this message). */
    footer?: ReactNode;
}

export declare interface MessageGroupProps {
    /** Display name shown on the first row of the group. */
    author: string;
    /** Avatar image URL for the group header. Falls back to initials. */
    avatarUrl?: string;
    /** Mark all rows as the current viewer's own — passed through to each MessageRow. */
    mine?: boolean;
    /** Messages in this group, in chronological order. */
    messages: MessageGroupItem[];
    className?: string;
}

export declare interface MessageReaction {
    emoji: string;
    /** Who reacted. Drives the count, the "you" state, and the tooltip. */
    userId: string;
    displayName?: string;
}

export declare function MessageRow({ author, content, timestamp, avatarUrl, hideAvatar, hideAuthor, mine, footer, tone, editedAt, contentLayout, className, }: MessageRowProps): JSX.Element;

export declare interface MessageRowProps {
    /** Display name shown next to the message; required even for anonymous rows (use a fallback). */
    author: string;
    /** Message body. Plain text or pre-rendered ReactNode for rich content. */
    content: ReactNode;
    /** ISO timestamp string; rendered as local HH:MM. */
    timestamp: string;
    /** Optional avatar image URL. Falls back to initials derived from `author`. */
    avatarUrl?: string;
    /** Hide the avatar slot (e.g. middle of a MessageGroup). Defaults to false. */
    hideAvatar?: boolean;
    /** Hide the author label (e.g. middle of a MessageGroup). Defaults to false. */
    hideAuthor?: boolean;
    /**
     * This row is the viewer's own message.
     *
     * Mirrors what Teams and iMessage do, and for the same reason: in a busy
     * thread the question "which of these did I write" is answered constantly
     * and answering it by reading names is work. The row flips to the other
     * side and takes a tinted bubble, so the shape of the conversation is
     * legible before any of it is read.
     *
     * The avatar goes with it — a own-side bubble with a left-hand avatar reads
     * as somebody else's message that has drifted right.
     */
    mine?: boolean;
    /**
     * Slot rendered below the content (e.g. a `<ReactionsBar>` for this message).
     * Indented under the content so it lines up under text, not under the avatar.
     */
    footer?: ReactNode;
    /** Surface the row renders on. 'light' (default) keeps the theme tokens;
     *  'dark' swaps to white/alpha classes for dark call chrome — without it
     *  the message text renders dark-on-dark and disappears. Mirrors
     *  InviteCandidateList's tone seam. */
    tone?: 'light' | 'dark';
    /** ISO: when the text was last changed. Renders "(edited)" after the time. */
    editedAt?: string;
    /**
     * How the content span is laid out. Defaults to `'inline'` — the
     * shrink-to-fit tinted bubble (`max-w-[85%]`, padded, right-aligned text)
     * this component has always used, sized for plain chat text.
     *
     * `'block'` is for a card body (an `AgentRunCard`, a document/deck
     * preview, an attachment) instead of text. Those cards size themselves to
     * their CONTAINER (`AgentRunCard` uses a `@container` query, so its
     * intrinsic inline size is 0) — inside the `'inline'` bubble, which has no
     * width of its own beyond its shrink-to-fit content, that container
     * collapses to a few px and the card's contents wrap letter-by-letter in
     * a sliver on the right. `'block'` renders the span as a full-width block
     * up to a cap (`w-full max-w-[36rem]`) with no tint/padding, so the card
     * gets real horizontal room to size against — still right-aligned via the
     * column's `items-end`, not via `text-align`.
     *
     * Only changes anything on a `mine` row — a non-`mine` row never had the
     * shrink-to-fit bubble to begin with, so this prop is a no-op there
     * regardless of its value.
     */
    contentLayout?: 'inline' | 'block';
    className?: string;
}

export declare function MetaLine({ items, separator, size, tone, className, 'data-testid': testId, }: MetaLineProps): JSX.Element | null;

export declare interface MetaLineProps {
    /** The pieces, in order. Falsy entries are dropped with their separator. */
    items: ReactNode[];
    /** Separator woven between surviving items. Default `·`. */
    separator?: ReactNode;
    /** `xs` (11px, the default) is the card/list scale; `sm` (12px) is body meta. */
    size?: MetaLineSize;
    tone?: MetaLineTone;
    className?: string;
    'data-testid'?: string;
}

export declare type MetaLineSize = 'xs' | 'sm';

export declare type MetaLineTone = 'tertiary' | 'secondary';

export declare function MfaDashboardPage({ devices, userEmail, mfaEnabled, onAddDevice, onRenameDevice, onRemoveDevice, loading, }: MfaDashboardPageProps): JSX.Element;

export declare interface MfaDashboardPageProps {
    devices: MfaDevice_2[];
    userEmail?: string;
    mfaEnabled: boolean;
    onAddDevice: () => void;
    onRenameDevice: (deviceId: string, newName: string) => Promise<void>;
    onRemoveDevice: (deviceId: string) => Promise<void>;
    loading?: boolean;
}

export declare interface MfaDevice {
    deviceId: string;
    deviceName: string;
    deviceType: string;
    isVerified: boolean;
    createdAt: string;
    lastUsed?: string;
}

declare interface MfaDevice_2 {
    deviceId: string;
    deviceName: string;
    deviceType: string;
    isVerified: boolean;
    createdAt: string;
    lastUsed?: string;
}

export declare function MfaManagementPage({ metrics, users, pools, onRefresh, loading, }: MfaManagementPageProps): JSX.Element;

export declare interface MfaManagementPageProps {
    metrics?: {
        totalUsers: number;
        mfaEnabled: number;
        mfaDisabled: number;
        adoptionRate: number;
    };
    users?: Array<{
        userId: string;
        email: string;
        mfaEnabled: boolean;
        deviceCount: number;
        /**
         * Pool the user belongs to. Optional and additive.
         *
         * The "Filter by pool" control is only rendered when at least one row
         * carries this, because without it the page has no way to tell which pool
         * a row belongs to — which is exactly why the control used to be inert.
         */
        poolId?: string;
    }>;
    pools?: Array<{
        poolId: string;
        poolName: string;
        userCount: number;
    }>;
    onRefresh: () => void;
    loading?: boolean;
}

export declare interface MfaMetrics {
    totalUsers: number;
    mfaEnabled: number;
    mfaDisabled: number;
    adoptionRate: number;
}

export declare function MfaSetupPage({ onSetup, onVerify, onComplete, userEmail, initialStep, initialSetupResult, initialDeviceName, }: MfaSetupPageProps): JSX.Element;

export declare interface MfaSetupPageProps {
    onSetup: (deviceName: string) => Promise<MfaSetupResult_2>;
    onVerify: (deviceId: string, code: string) => Promise<{
        success: boolean;
        backupCodes?: string[];
    }>;
    onComplete: () => void;
    userEmail?: string;
    /**
     * Step the wizard opens on. Optional and **initial-only** — the page keeps
     * owning the step afterwards, so Back/Continue still work exactly as they
     * do without the prop. Omit it and the wizard opens on `'name'`, which is
     * the historical behaviour.
     *
     * It exists because every step past the first was previously reachable
     * only by clicking through the one before it: a host cannot deep-link a
     * user back into a half-finished enrolment (`/mfa/setup?step=scan` after a
     * reload), a story cannot show the scan or backup screens, and a test has
     * to drive the whole flow to assert on the last one.
     *
     * `'scan'` renders the QR code, so it needs `initialSetupResult` as well;
     * without it the wizard falls back to `'name'` rather than rendering an
     * empty card.
     */
    initialStep?: MfaSetupStep;
    /**
     * Seeds the enrolment payload that `onSetup` would normally have returned,
     * so `initialStep` can open on a step that needs it — `'scan'` (QR code +
     * secret) and `'backup'` (the backup-code grid). Initial-only: a later
     * real `onSetup` call replaces it.
     *
     * Use it when the host already holds the payload (resuming an enrolment
     * after a reload) or when a story/test wants a specific step rendered
     * directly instead of clicking to it.
     */
    initialSetupResult?: MfaSetupResult_2;
    /**
     * Seeds the device-name field, so a wizard opened at a later
     * `initialStep` still shows the name the user typed on step 1 (it appears
     * as the QR caption). Initial-only — the field stays editable.
     */
    initialDeviceName?: string;
}

export declare interface MfaSetupResult {
    deviceId: string;
    qrCode: string;
    secret: string;
    backupCodes: string[];
}

/** The enrolment payload the identity server returns from `onSetup`. */
declare interface MfaSetupResult_2 {
    deviceId: string;
    qrCode: string;
    secret: string;
    backupCodes: string[];
}

/** The four wizard steps, in the order the user walks them. */
declare type MfaSetupStep = 'name' | 'scan' | 'verify' | 'backup';

/** Which challenge the page presents: authenticator code or backup code. */
declare type MfaVerifyMode = 'totp' | 'backup';

export declare function MfaVerifyPage({ onVerify, onVerifyBackup, error, defaultMode, }: MfaVerifyPageProps): JSX.Element;

export declare interface MfaVerifyPageProps {
    onVerify: (code: string) => Promise<void>;
    onVerifyBackup: (code: string) => Promise<void>;
    error?: string | null;
    /**
     * Challenge the page opens on. Optional and **initial-only** — the page
     * still owns the mode afterwards, so the two "use … instead" links keep
     * flipping it. Omit it and the page opens on `'totp'`, which is the
     * historical behaviour.
     *
     * It exists because the backup-code form was previously reachable only by
     * clicking "Use a backup code instead": a host that already knows the user
     * has lost their authenticator cannot land them on the right challenge, a
     * story cannot show that form, and a test has to click before asserting.
     */
    defaultMode?: MfaVerifyMode;
}

export declare function MicIcon({ size, ...rest }: IconProps): JSX.Element;

export declare function MicOffIcon({ size, ...rest }: IconProps): JSX.Element;

export declare function Modal({ open, onClose, title, ariaLabel, maxWidth, children, footer, backdropTestId, backdropStyle, cardStyle, cardClassName, zIndex, rawChildren, }: ModalProps): ReactPortal | null;

export declare interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    /**
     * Accessible name for the dialog when it renders its own heading (or none
     * at all) instead of using `title`. Without one of the two, screen readers
     * announce a bare "dialog" with no indication of what opened.
     */
    ariaLabel?: string;
    maxWidth?: number;
    children: React.ReactNode;
    footer?: React.ReactNode;
    /**
     * Optional overrides for the backdrop testid (defaults to "modal-backdrop").
     * Callers that need a specific testid on the backdrop — e.g. existing tests
     * that assert `getByTestId('delete-modal')` and click it to trigger
     * backdrop-close — can pass it through here.
     */
    backdropTestId?: string;
    /**
     * Optional override for the backdrop background. Defaults to the standard
     * rgba(0,0,0,0.45) overlay used across the app.
     */
    backdropStyle?: React.CSSProperties;
    /**
     * Optional override for the inner card container style. Spread over the
     * default 12px-radius, 28px/24px-padded, shadowed white card.
     */
    cardStyle?: React.CSSProperties;
    /**
     * Tailwind classes merged onto the card AFTER the defaults (cn/tw-merge,
     * so e.g. `bg-surface-inverse p-0` beats the default `bg-surface px-6 py-7`).
     * Lets dark-chrome dialogs (CallSettingsDialog) restyle the card without
     * reaching for inline styles.
     */
    cardClassName?: string;
    /**
     * Optional z-index for the backdrop. Defaults to 10000.
     */
    zIndex?: number;
    /**
     * When true, render children directly inside the card without the default
     * text-sm text-text-secondary wrapper div. Useful for modals that manage
     * their own full-layout and need the card to be a flex container.
     */
    rawChildren?: boolean;
}

/**
 * Map the legacy `minimized` boolean onto the canonical vocabulary.
 *
 *   minimized === true   → 'mini'
 *   minimized === false  → 'window'
 *
 * There is no legacy boolean for 'fullscreen' — <CallWidget> never had
 * one, which is exactly why the new prop exists.
 */
export declare function modeFromMinimized(minimized: boolean): CallWidgetMode;

/** One selectable model. `value` is what gets written to the node's data. */
declare interface ModelOption {
    value: string;
    label?: string;
}

/**
 * "Model unavailable — <reason>" when the API's `model` health check says the
 * model cannot be reached (platform-api's shared probe + circuit breaker),
 * else null. For a composer or run pane that would otherwise quietly get an
 * offline draft or wait out a timeout.
 */
export declare function modelUnavailableMessage(health: ApiHealthSnapshot): string | null;

/** A crescent: the dark theme — "switch to (or currently in) dark mode". */
export declare function MoonIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function MoreContextDisclosure({ items, label, defaultOpen, open, onToggle, children, className, 'data-testid': testId, }: MoreContextDisclosureProps): JSX.Element;

export declare interface MoreContextDisclosureProps {
    items: readonly MoreContextItem[];
    /** Summary text. Default "More context". */
    label?: string;
    defaultOpen?: boolean;
    open?: boolean;
    onToggle?: (open: boolean) => void;
    /** Extra content under the rows. */
    children?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

export declare interface MoreContextItem {
    id: string;
    label: string;
    icon?: ReactNode;
    /** Shown after the label — "Sources · 2". */
    count?: number;
    onSelect?: () => void;
}

export declare function MoreHorizontalIcon({ size, ...rest }: IconProps): JSX.Element;

/** Three dots in a row: "more". Since 2.386.5. */
export declare function MoreIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** Move the slide at `from` so it lands at `to`. Out-of-range moves are no-ops. */
export declare function moveSlide(spec: DeckSpec, from: number, to: number): DeckSpec;

export declare function MuteWhileTalkingToast({ show, label, }: MuteWhileTalkingToastProps): JSX.Element | null;

export declare interface MuteWhileTalkingToastProps {
    show: boolean;
    /** Optional label override. */
    label?: string;
}

declare type MyItem = MentionItem | TaskAssignment;

export declare function nameToColor(name: string): string;

export declare function nameToInitials(name: string): string;

export declare function NavRail({ title, items, activeHref, match, titleAction, header, footer, width, storageKey, renderLink, tone, size, 'aria-label': ariaLabel, className, 'data-testid': testId, }: NavRailProps): JSX.Element;

export declare interface NavRailItem {
    /** Target path. Also the React key unless `id` is given. */
    to?: string;
    /** Renders as a button instead of a link. For in-page verbs (Halt, Reset). */
    onClick?: () => void;
    /** Required when an item has neither `to` nor a unique label. */
    id?: string;
    label: ReactNode;
    /** Small right-aligned count — queue depth, unread, failures. */
    badge?: ReactNode;
    /** One dim line under the label. Say what the page is FOR, not what it is. */
    hint?: string;
    /** Leading glyph. */
    icon?: ReactNode;
    /** Section heading. Items sharing a group render under one collapsible head. */
    group?: string;
    disabled?: boolean;
}

/** How `activeHref` is matched against an item's `to`. */
export declare type NavRailMatch = 'exact' | 'prefix';

export declare interface NavRailProps {
    /** Rail heading. Omit for a rail that needs no name (a single leaf list). */
    title?: ReactNode;
    items: NavRailItem[];
    /** Current path. An item lights when it matches per `match`. */
    activeHref?: string;
    /**
     * `prefix` (default) keeps a rail lit while you are anywhere beneath it —
     * what an outer rail wants. `exact` is for the innermost rail, where two
     * items share a prefix and both would otherwise light.
     */
    match?: NavRailMatch;
    /** Element beside the title — a help "?" or a count. */
    titleAction?: ReactNode;
    /** Content above the items — a [+ New] button, a filter. */
    header?: ReactNode;
    /** Content pinned below the items — a status line, a collapse toggle. */
    footer?: ReactNode;
    /**
     * Discrete widths, not a pixel number: a `style={{ width }}` here is an
     * inline style on every rail in the app, and three sizes have covered every
     * rail we have shipped. Use `className` for the genuine exception.
     */
    width?: 'narrow' | 'default' | 'wide';
    /**
     * Persist per-group collapsed state under this key. Omit and groups still
     * collapse — they just forget on reload. Rails at different depths MUST use
     * different keys or they share collapse state.
     */
    storageKey?: string;
    /** Render links with a router's Link/NavLink. Defaults to a plain `<a>`. */
    renderLink?: (item: NavRailItem, props: AnchorHTMLAttributes<HTMLAnchorElement>) => ReactNode;
    tone?: NavRailTone;
    /**
     * `sm` (default) is the 13px rail. `md` is the Documents surface's
     * Workspace rail (the All documents mockup): 15px labels on 36px rows, a
     * heading row with no rule under it, and a hairline between groups.
     * Since 2.389.2.
     */
    size?: 'sm' | 'md';
    /** Names the nav landmark. Falls back to the title, then 'Navigation'. */
    'aria-label'?: string;
    className?: string;
    'data-testid'?: string;
}

/** One level of the stack. `id` keys the rail and seeds its storage key. */
export declare interface NavRailSpec extends Omit<NavRailProps, 'storageKey'> {
    id: string;
}

export declare function NavRailStack({ rails, activeHref, renderLink, tone, storageKey, children, className, 'data-testid': testId, }: NavRailStackProps): JSX.Element;

export declare interface NavRailStackProps {
    /**
     * Outermost rail first. An empty array renders content full-bleed, which is
     * the right answer for a leaf page that wants the width back — a rail with
     * nothing in it is a dead 200px column, not a smaller rail.
     */
    rails: NavRailSpec[];
    /** Applied to every rail that does not set its own. */
    activeHref?: string;
    /** Applied to every rail that does not set its own. */
    renderLink?: NavRailProps['renderLink'];
    /** Applied to every rail that does not set its own. */
    tone?: NavRailTone;
    /** Prefix for each rail's group-collapse persistence, suffixed by rail id. */
    storageKey?: string;
    /** The content region beside the rails. Usually a `WorkArea` or an Outlet. */
    children?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

/** @see SurfaceTone — which colour family the rail paints in. */
export declare type NavRailTone = SurfaceTone;

/** Sub-section navigation: link-based underline tab strip (no state — consumer routes via activeHref). */
export declare function NavTabs({ items, activeHref, renderLink, className, style, 'aria-label': ariaLabel, variant, }: NavTabsProps): JSX.Element;

export declare interface NavTabsProps {
    items: TopNavItem[];
    activeHref?: string;
    renderLink?: (item: TopNavItem, props: AnchorHTMLAttributes<HTMLAnchorElement>) => ReactNode;
    className?: string;
    style?: CSSProperties;
    'aria-label'?: string;
    /** See NavTabsVariant. `pill` also drops the strip's bottom border, since
     *  there is no underline left for it to complete. */
    variant?: NavTabsVariant;
}

/**
 * How the active item is marked.
 *
 * The two variants are a HIERARCHY, not two interchangeable looks. Apps stack
 * them: a primary row in the header (`pill`) and a section row under it
 * (`underline`). Which one you pick says which row the reader is meant to read
 * first.
 *
 * `pill` is the PRIMARY form, for a nav sitting in a bar rather than on a
 * strip. Active is a filled tint (`--color-primary-bg` / `--color-primary-fg`)
 * plus semibold — a block of brand colour roughly 90x36, which is what makes
 * it the loudest thing in the row. It also carries no bottom border: a header
 * owns its own rule, lower down, so an underline indicator there hangs in
 * mid-air (measured at 12px above the header rule, attached to nothing), which
 * is exactly what "the nav is not aligned" looks like.
 *
 * `underline` is the SECONDARY form: a 2px rule under the active item, sitting
 * ON the strip's own bottom border. Indicator and rule are one continuous
 * line — the `-mb-px` below is what overlaps them — so it is only correct
 * where that border exists. Against a filled pill it reads as a hairline:
 * same brand colour, ~1/18th of the area.
 */
export declare type NavTabsVariant = 'underline' | 'pill';

export declare type NetworkQuality = 'good' | 'medium' | 'poor' | 'dead';

export declare function NetworkQualityBadge({ quality, className, style }: NetworkQualityBadgeProps): JSX.Element;

export declare interface NetworkQualityBadgeProps {
    quality: NetworkQuality;
    /**
     * Positioning / spacing classes from the caller. Prefer this over `style`:
     * the badge is normally docked into a corner of the video stage, and with
     * no className seam callers had to reach for an inline style (banned in
     * demos and stories). Composed through `cn()`, so a caller class wins.
     */
    className?: string;
    /** @deprecated Use `className`. Kept so existing callers keep compiling. */
    style?: CSSProperties;
}

export declare function NewChatDialog({ open, candidates, anchor, placement, busy, error, onStart, onClose, 'data-testid': testId, }: NewChatDialogProps): JSX.Element | null;

export declare interface NewChatDialogProps {
    open: boolean;
    /** Everyone who can be messaged. Already-selectable; presence drives grouping. */
    candidates: InviteCandidate[];
    /** The control that opened it. Without one the shell centres — the fallback, not the intent. */
    anchor?: RefObject<HTMLElement | null> | null;
    placement?: InlinePopoverPlacement;
    busy?: boolean;
    /** A refusal from the server, shown in place without moving the footer. */
    error?: string | null;
    onStart: (userIds: string[]) => void | Promise<void>;
    onClose: () => void;
    'data-testid'?: string;
}

export declare function NewConversationPanel({ people, onStartDm, onCreateChannel, onCancel, peopleError, busy, className, 'data-testid': testId, }: NewConversationPanelProps): JSX.Element;

export declare interface NewConversationPanelProps {
    people: readonly NewConversationPerson[];
    /** Start (or open) a direct conversation with this person. */
    onStartDm: (userId: string) => void | Promise<void>;
    /** Create a channel with this name. Omit to disable channel creation. */
    onCreateChannel?: (name: string) => void | Promise<void>;
    onCancel?: () => void;
    /**
     * Set when the directory fetch FAILED. An empty list and a failed fetch look
     * identical on screen otherwise, and "no one to talk to" is a much stronger
     * claim than "we could not ask".
     */
    peopleError?: string | null;
    busy?: boolean;
    className?: string;
    'data-testid'?: string;
}

export declare interface NewConversationPerson {
    userId: string;
    displayName: string;
    avatarUrl?: string;
    color?: string;
    /** Secondary line — role, team, or handle. */
    hint?: string;
}

/**
 * The next revision's label, given the ones that exist.
 *
 * Reads the numbers off `v<n>` labels rather than counting rows, because a
 * revision list can be paged or filtered and "Save as v3" over four revisions
 * is a promise the server would have to break.
 */
export declare function nextRevisionLabel(revisions: readonly {
    label: string;
}[]): string;

/**
 * A slide id that is unique within the deck and passes `SLIDE_ID_PATTERN`.
 *
 * Counts up from the deck's size rather than hashing or using a UUID: the ids
 * end up in preview handles a person reads in a URL, and `s7` is a better
 * thing to read than a 36-character guid.
 */
export declare function nextSlideId(spec: DeckSpec, prefix?: string): string;

/** "You don't have access to <resource> — ask <owner> to share it." */
export declare function noAccessMessage(resource: string, ownerName?: string | null): string;

export declare function NoAccessState({ resource, ownerName, actionLabel, onAction, size, className, testId }: NoAccessStateProps): JSX.Element;

export declare interface NoAccessStateProps {
    /** What they tried to open, as a noun phrase: "this presentation". */
    resource: string;
    /** Who can share it. Omitted → "its owner". */
    ownerName?: string | null;
    /** Optional way back ("Back to documents"). */
    actionLabel?: string;
    onAction?: () => void;
    size?: EmptyStateSize;
    className?: string;
    testId?: string;
}

/** The logical drawing width; the SVG scales it to whatever width it is given. */
export declare const NODE_GRAPH_VIEW_WIDTH = 480;

export declare function NodeCard({ icon, label, subtitle, status, statusLabel, body, selected, accentClass, className, onClick, }: NodeCardProps): JSX.Element;

export declare interface NodeCardProps {
    /** Emoji or short string icon for the node type. */
    icon: string;
    label: string;
    subtitle?: string;
    /** Maps to StatusPill state — drives the pill and border accent. */
    status?: StatusPillState;
    /** Status label shown in the pill. Defaults to a capitalized form of status. */
    statusLabel?: string;
    /** Body content slot (preview text, stats, etc.). */
    body?: ReactNode;
    /** Whether the card appears selected (elevated shadow). */
    selected?: boolean;
    /** Accent color for the left border strip (Tailwind bg-* class). */
    accentClass?: string;
    className?: string;
    onClick?: () => void;
}

export declare type NodeData = TriggerNodeData | LLMNodeData | TransformNodeData | ConditionNodeData | ActionNodeData | ForkNodeData | JoinNodeData | ApprovalNodeData | AgentNodeData | GuardrailNodeData | McpToolNodeData | KnowledgeBaseNodeData | GraphQueryNodeData | MemoryNodeData | PolicyNodeData | AgUiOutputNodeData | ImageSourceNodeData | ImageSaveNodeData | ScatterNodeData | ImageResizeNodeData | ImageTransformNodeData | ImageFormatConvertNodeData | ImageSharpenNodeData | ImageWatermarkNodeData | ImageCropNodeData | ImageAdjustBwNodeData | ImageAdjustLayerNodeData | ImageDimensionsNodeData | ImageUpscaleNodeData | ImageVisionAnalyzeNodeData | ImageVisionClassifyNodeData | ImageVisionDescribeNodeData | ImageVisionTagNodeData | ImageVisionExtractTextNodeData | ImageGenerateNodeData | ImageVariationNodeData | ImageEditPromptNodeData;

export declare function NodeGraph({ nodes, edges, layout, selectedId, onSelect, height, className, 'data-testid': testId, }: NodeGraphProps): JSX.Element;

export declare interface NodeGraphProps {
    nodes: GraphNode[];
    edges: GraphEdge[];
    layout?: GraphLayout;
    selectedId?: string | null;
    onSelect?: (node: GraphNode) => void;
    /** Pixel height of the drawing; the width follows the container. */
    height?: number;
    className?: string;
    'data-testid'?: string;
}

export declare type NodeType = 'trigger' | 'llm' | 'transform' | 'condition' | 'action' | 'fork' | 'join' | 'approval' | 'agent' | 'mcp-tool' | 'knowledge-base' | 'graph-query' | 'memory' | 'guardrail' | 'policy' | 'ag-ui-output' | 'image-source' | 'image:save' | 'scatter' | 'image:resize' | 'image:transform' | 'image:format-convert' | 'image:sharpen' | 'image:watermark' | 'image:crop' | 'image:adjust-bw' | 'image:adjust-layer' | 'image:dimensions' | 'image:upscale' | 'image:vision-analyze' | 'image:vision-classify' | 'image:vision-describe' | 'image:vision-tag' | 'image:vision-extract-text' | 'image:generate' | 'image:variation' | 'image:edit-prompt';

/** Per-node-type overrides for config-field wording. */
declare interface NodeVocabulary {
    /** Field key -> visible label. */
    labels?: Record<string, string>;
    /** Field key -> help text shown under the control. */
    help?: Record<string, string>;
    /** Field key -> input placeholder. */
    placeholders?: Record<string, string>;
}

/** Collapses either /health shape into the v1 one; `null` when it is neither. */
export declare function normalizeApiHealth(body: unknown): {
    status: 'ok' | 'degraded';
    checks: Record<string, ApiHealthCheck>;
} | null;

/**
 * Accepts what people actually paste.
 *
 * `example.com` is a URL to everyone except a URL parser, so a bare host gets
 * https://. Anything with a scheme is left alone — including mailto: and
 * relative paths, which a naive prefix would corrupt.
 */
export declare function normalizeHref(raw: string): string;

export declare function NotificationCenter({ items, onItemClick, onMarkAllRead, onClearAll, className, 'data-testid': testId, }: NotificationCenterProps): JSX.Element;

export declare interface NotificationCenterProps {
    items: NotificationItem[];
    onItemClick?: (item: NotificationItem) => void;
    onMarkAllRead?: () => void;
    onClearAll?: () => void;
    className?: string;
    'data-testid'?: string;
}

export declare interface NotificationItem {
    id: string;
    title: string;
    body?: string;
    timestamp?: string | number;
    read?: boolean;
    /** Optional icon / emoji / ReactNode prefix */
    icon?: string;
    /** Optional grouping / category label */
    category?: string;
}

export declare function NumberEditorRenderer(props: SectionRendererProps): JSX.Element;

/** Three numbered lines: "numbered list". Since 2.386.5. */
export declare function NumberedListIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare const numberFieldType: FieldTypeDefinition;

export declare const NumberInput: ForwardRefExoticComponent<NumberInputProps & RefAttributes<HTMLInputElement>>;

export declare interface NumberInputProps {
    /**
     * `undefined` renders an empty field, for a genuinely optional numeric
     * setting. Distinguishing "unset" from 0 matters: 0 is a real value for a
     * seed, a threshold or an offset.
     */
    value: number | undefined;
    onChange: (value: number) => void;
    /**
     * Called when the field is emptied. Supplying it is what makes the field
     * clearable — without it, deleting the text leaves the previous value in
     * place, because a half-typed "-" or "" cannot be parsed to a number.
     *
     * Kept separate from `onChange` so widening that callback's parameter to
     * `number | undefined` doesn't break every existing caller.
     */
    onClear?: () => void;
    min?: number;
    max?: number;
    step?: number;
    /** Rendered as a right-edge suffix: 'px' | '°' | '%' | … */
    unit?: string;
    placeholder?: string;
    invalid?: boolean;
    disabled?: boolean;
    size?: 'sm' | 'md';
    /**
     * Id of the rendered `<input>`, so an external `<label htmlFor>` can point
     * at it. Without this the prop was silently dropped and the label named
     * nothing.
     */
    id?: string;
    /** Form field name, for label association and form submission. */
    name?: string;
    /** Accessible name. Required when no visible `<label>` is wired up. */
    'aria-label'?: string;
    /** Id of the element that labels this control. */
    'aria-labelledby'?: string;
    /** Id(s) of hint / error text describing this control. */
    'aria-describedby'?: string;
    'aria-invalid'?: boolean;
    'aria-required'?: boolean;
    required?: boolean;
    'data-testid'?: string;
}

export declare function NumberReaderRenderer({ section, fragment }: SectionRendererProps): JSX.Element;

/** A page of revisions is not the whole history: how many more exist, and how to ask for them. */
declare interface OlderRevisions {
    /** Revisions older than the oldest one in hand. */
    count: number;
    /** The next page is on its way. */
    loading?: boolean;
    /** Ask the host for the next older page. */
    onLoad: () => void;
}

declare type OnMessageFn = (handler: (msg: GatewayMessage) => void) => () => void;

declare type OnMessageFn_10 = (handler: (msg: GatewayMessage_2) => void) => () => void;

declare type OnMessageFn_2 = (handler: (msg: GatewayMessage) => void) => () => void;

declare type OnMessageFn_3 = (handler: (msg: GatewayMessage) => void) => () => void;

declare type OnMessageFn_4 = (handler: (msg: GatewayMessage) => void) => () => void;

declare type OnMessageFn_5 = (handler: (msg: GatewayMessage) => void) => () => void;

declare type OnMessageFn_6 = (handler: (msg: GatewayMessage) => void) => () => void;

declare type OnMessageFn_7 = (handler: (msg: GatewayMessage) => void) => () => void;

declare type OnMessageFn_8 = (handler: (msg: GatewayMessage) => void) => () => void;

declare type OnMessageFn_9 = (handler: (msg: GatewayMessage) => void) => () => void;

export declare function OutcomeSection({ title, value, onChange, placeholder, readOnlyReason, pending, first, variant, size, className, 'data-testid': testId, }: OutcomeSectionProps): JSX.Element;

export declare interface OutcomeSectionProps {
    title?: string;
    value: string | null;
    onChange?: (v: string) => void;
    placeholder?: string;
    readOnlyReason?: string;
    pending?: boolean;
    /** Suppress DetailSection's leading rule. */
    first?: boolean;
    /**
     * `heading` (default since 2.386.15): a 16px sentence-case heading, 14px
     * body, affordances quiet until hover — a work item's Brief. `label`: the
     * small uppercase caption under a hairline, for a side panel.
     */
    variant?: 'label' | 'heading';
    /**
     * `heading` only: `lg` (since 2.390.0) is `DetailSection size="lg"` — a
     * 19px heading ("Why this matters") over a 15px body.
     */
    size?: 'md' | 'lg';
    className?: string;
    'data-testid'?: string;
}

export declare function PageHeader({ title, description, actions, back, badge, size, className, }: PageHeaderProps): default_2.JSX.Element;

export declare interface PageHeaderBack {
    label: string;
    to: string;
    onClick?: (e: default_2.MouseEvent<HTMLAnchorElement>) => void;
}

export declare interface PageHeaderProps {
    title: string;
    description?: string;
    /** Right-aligned action area (buttons, menus). */
    actions?: default_2.ReactNode;
    /** Optional back link rendered above the title. */
    back?: PageHeaderBack;
    /** Badge or status pill rendered to the right of the title. */
    badge?: default_2.ReactNode;
    /**
     * Title size. `md` (default) is the 20px heading every page has had;
     * `lg` is a 28px directory title — a page that IS the list, not a page
     * about one thing.
     */
    size?: 'md' | 'lg';
    className?: string;
}

export declare function PageSection({ title, description, actions, children, className, }: PageSectionProps): JSX.Element;

export declare interface PageSectionProps {
    title: string;
    description?: string;
    actions?: ReactNode;
    children: ReactNode;
    className?: string;
}

/** A paperclip: a file came along with this. */
export declare function PaperclipIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** The command a sent draft addresses and its argument, or null when the draft is plain text. */
export declare function parseChatCommand<C extends ComposerCommand = ChatCommand>(text: string, commands: readonly C[] | undefined): {
    command: C;
    argumentText: string;
} | null;

/** The two halves of a run panel id, split at the first `:`; null when either half is missing. */
export declare function parseRunPanelId(id: string): {
    pipelineId: string;
    runId: string;
} | null;

/** Parse unified git diff output. Exported for tests and for hosts that need
 *  the file list without rendering. */
export declare function parseUnifiedDiff(diff: string): DiffFile[];

export declare interface Participant {
    clientId: string;
    userId: string;
    displayName: string;
    color: string;
    mode: 'editor' | 'reviewer' | 'reader';
    currentSectionId: string | null;
    lastSeen?: number;
    idle?: boolean;
}

/**
 * Single-participant tile used in `VideoGrid` and `HangoutLayout`. Pure
 * presentational — no media wiring, no signaling — caller owns the `<video>`
 * element via `videoElement` and the speaking/mute booleans.
 *
 * The speaking border is intentionally just a border (no reflow): per industry
 * convention (Meet/Teams/Zoom), reflowing tiles on speaker change is jarring;
 * a green border is the agreed-on cue.
 */
export declare function ParticipantTile({ id, displayName, avatarUrl, isSpeaking, isMuted, isLocal, isSpotlight, videoElement, onClick, fillParent, className, style, }: ParticipantTileProps): JSX.Element;

export declare interface ParticipantTileProps {
    /** Unique identifier for keying / pin actions. */
    id: string;
    /** Name shown in the bottom badge. */
    displayName: string;
    /** Optional avatar URL — used as fallback when no videoElement is provided. */
    avatarUrl?: string;
    /** Whether to render with a speaking-indicator green border + corner dot. */
    isSpeaking?: boolean;
    /** Whether to overlay a muted-mic glyph in the badge. */
    isMuted?: boolean;
    /** Whether this tile represents the local user — replaces the displayName label with "You". */
    isLocal?: boolean;
    /** When true, applies the "main / spotlight" emphasis style (larger border, taller aspect). */
    isSpotlight?: boolean;
    /** A pre-rendered media element (a `<video>` typically) — the consumer manages srcObject. */
    videoElement?: ReactNode;
    /** Click handler — used by HangoutLayout for pin / spotlight selection. */
    onClick?: () => void;
    /** When true, the tile fills its parent (`w-full h-full`) instead of
     *  enforcing its own `aspect-video`. Used by ExpandableCallWidget's
     *  docked + fullscreen modes where the parent owns dimensions. */
    fillParent?: boolean;
    /** Escape hatches. */
    className?: string;
    style?: CSSProperties;
}

/**
 * Renders `children` over a drifting point cloud while `active`.
 *
 * The canvas is `pointer-events: none` and sits behind the children in an
 * isolated stacking context; nothing above it moves, resizes or changes
 * hit-testing when the state flips.
 */
export declare function ParticlesBackground({ active, particleCount, particleSpread, speed, particleColors, moveParticlesOnHover, particleHoverFactor, alphaParticles, particleBaseSize, sizeRandomness, cameraDistance, disableRotation, pixelRatio, seed, fallbackIntensity, tone, density, className, children, 'data-testid': testId, }: ParticlesBackgroundProps): JSX.Element;

export declare interface ParticlesBackgroundProps {
    /**
     * True while the thing behind this surface is working. False renders
     * `children` on the normal surface with no backdrop at all — a 250ms
     * crossfade, no layout change, so a surface that starts working and one that
     * stops are the same box.
     */
    active?: boolean;
    particleCount?: number;
    particleSpread?: number;
    speed?: number;
    particleColors?: readonly string[];
    moveParticlesOnHover?: boolean;
    particleHoverFactor?: number;
    /** Soft-edged points with gradient alpha instead of hard discs. */
    alphaParticles?: boolean;
    particleBaseSize?: number;
    sizeRandomness?: number;
    cameraDistance?: number;
    disableRotation?: boolean;
    pixelRatio?: number;
    /** Seed for the CSS fallback's star field, so a fallback pane keeps its own sky. */
    seed?: number;
    fallbackIntensity?: RisingParticlesIntensity;
    /**
     * The sky behind the field. `night` (default) is the navy-to-black ground it
     * always had; `graphite` is a neutral dark grey with the field drawn at lower
     * contrast, for a console surface sitting on a LIGHT page. Resolve `auto`
     * with `useResolvedBackdropTone` before passing it here.
     */
    tone?: 'night' | 'graphite';
    /**
     * Upper bound on how many particles are DRAWN, per 10,000 CSS px² of the
     * surface. Unset draws all of `particleCount` (the old behaviour). The cloud
     * is uploaded once and its order is random, so drawing a prefix is a uniform
     * thinning that costs nothing to change — a surface that grows or shrinks
     * never rebuilds its GL context, and a small one never pays for a big sky.
     */
    density?: number;
    className?: string;
    children?: ReactNode;
    'data-testid'?: string;
}

export declare interface PasswordPolicy {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSymbols: boolean;
}

/**
 * hub#2226 — single entry in `StepExecution.patches`. Mirrors the
 * distributed-core `PatchEntry` shape but stays decoupled from the
 * type pin (consumers care about `patchId`, `appliedAt`, `revertedAt`,
 * `unvalidated`; `beforeContext`/`patch` are optional bookkeeping the
 * frontend doesn't need today).
 */
export declare interface PatchEntry {
    patchId: string;
    appliedAt: string;
    appliedBy?: string;
    /** Mirror of `ContextPatch['mode']`. */
    mode?: 'merge' | 'jsonPatch';
    /** Set on a successful revert. */
    revertedAt?: string;
    /** True when no validator was registered for the paused step's node type. */
    unvalidated?: boolean;
}

/**
 * Thrown for non-2xx/422 transport errors (404, 409, 500, 503, ...).
 * `status` is the HTTP status; `body` is the parsed JSON body when present.
 */
export declare class PatchHttpError extends Error {
    readonly status: number;
    readonly body?: unknown;
    constructor(status: number, message: string, body?: unknown);
}

export declare interface PatchResult {
    patchId: string;
    before: Record<string, unknown>;
    after: Record<string, unknown>;
    validation: {
        ok: true;
    } | {
        ok: false;
        reason: string;
    };
}

/**
 * Thrown when the executor's `ContextValidator` rejected a paused-context
 * patch. The patch was NOT applied; the UI should keep the dirty buffer
 * intact and show `reason` to the user.
 */
export declare class PatchValidationRejectedError extends Error {
    readonly reason: string;
    readonly result?: PatchResult;
    constructor(reason: string, result?: PatchResult);
}

export declare function PauseIcon({ size, ...rest }: IconProps): JSX.Element;

export declare const PEOPLE_GRAPH_QUERY_NODE_ID = "__query__";

export declare function PeopleGraph({ people, query, onOpenPerson, onMessagePerson, graphHeight, className, 'data-testid': testId, }: PeopleGraphProps): JSX.Element;

export declare interface PeopleGraphProps {
    people: GraphPerson[];
    /** What the people were found for; becomes the centre node. */
    query?: string;
    onOpenPerson?: (id: string) => void;
    onMessagePerson?: (id: string) => void;
    /** Pixel height of the graph area. */
    graphHeight?: number;
    className?: string;
    'data-testid'?: string;
}

/** Two people: "shared with me", a group. Since 2.385.0. */
export declare function PeopleIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** The nodes and edges PeopleGraph draws; exported so a host can test or reuse the mapping. */
export declare function peopleToGraph(people: GraphPerson[], query: string | undefined): {
    nodes: GraphNode[];
    edges: GraphEdge[];
};

export declare function PermissionDeniedCard({ kind, state, message, onRetry, retryLabel, icon, className, 'data-testid': testId, }: PermissionDeniedCardProps): JSX.Element;

export declare interface PermissionDeniedCardProps {
    /** Which underlying capability was denied. Drives the default copy + icon. */
    kind: PermissionKind;
    state: PermissionState_2;
    /** Optional verbatim error message (browser-specific text). When omitted
     *  the card renders default copy keyed on `state`. */
    message?: string | null;
    /** Optional retry action. Hidden when omitted. */
    onRetry?: () => void;
    /** Optional override label for the retry button (default: "Try again"). */
    retryLabel?: string;
    /** Optional override icon (replaces the default per-kind glyph). */
    icon?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

export declare type PermissionKind = 'camera' | 'microphone' | 'screen';

declare type PermissionState_2 = 'denied' | 'blocked' | 'no-device' | 'unavailable';
export { PermissionState_2 as PermissionState }

/**
 * Modes that survive a reload. Canonical vocabulary ('window', not the
 * pre-2.106 'docked') — see ./callWidgetMode. The value written to
 * localStorage keeps the LEGACY spelling so a rollback to an older build
 * still reads back the window state it wrote; the translation happens at
 * the storage boundary only.
 */
export declare type PersistedWidgetMode = 'mini' | 'window';

export declare interface PersistedWidgetState {
    mode: PersistedWidgetMode;
    x: number;
    y: number;
    width: number;
    height: number;
}

export declare interface PersonCardData {
    userId?: string;
    displayName: string;
    /** Job title / role, e.g. "Staff Engineer". */
    title?: string;
    email?: string;
    /** Team or department. */
    department?: string;
    /** Local time where they are, already formatted, e.g. "3:42 PM". */
    localTime?: string;
    avatarUrl?: string;
    color?: string;
    /** true → online, false → offline, undefined → unknown (no dot). */
    online?: boolean;
    /** Free-text status, e.g. "In a meeting". */
    statusText?: string;
}

export declare function PersonHoverCard({ person, children, actions, details, interactiveChild, openDelay, closeDelay, className, 'data-testid': testId, }: PersonHoverCardProps): JSX.Element;

export declare interface PersonHoverCardProps {
    person: PersonCardData;
    /** The inline element that opens the card — usually the person's name. */
    children: ReactNode;
    /** Actions rendered at the foot of the card (Message, Call, …). */
    actions?: ReactNode;
    /**
     * Extra content between the identity block and the actions — skills,
     * a score, recent work. Domain-shaped detail the card itself should not
     * try to model, since every product means something different by it.
     */
    details?: ReactNode;
    /**
     * Set when `children` is ITSELF interactive — a link or a button.
     *
     * The trigger is normally a `role="button"` span so the card is reachable
     * without a pointer. But wrapping a link in that produces a link inside a
     * button: two nested activation targets with different destinations, which
     * assistive tech announces as one confused control and which swallows the
     * link's own Enter behaviour. With this set the wrapper keeps only the
     * pointer handlers and lets the child own focus and activation — hover
     * still opens the card, and focusing the link still opens it, because
     * React's onFocus is focusin and bubbles from the child.
     */
    interactiveChild?: boolean;
    /** ms before hover opens the card. */
    openDelay?: number;
    /** ms before leaving closes it. Must outlast the trigger→panel pointer trip. */
    closeDelay?: number;
    className?: string;
    'data-testid'?: string;
}

/** One head and shoulders: "a person" (a subject mask, one member). Since 2.390.0. */
export declare function PersonIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** A handset: start a voice call. */
export declare function PhoneIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function PhoneOffIcon({ size, ...rest }: IconProps): JSX.Element;

export declare function PickerDialog({ open, title, body, options, confirmLabel, onPick, onCancel, searchPlaceholder, emptyText, loading, initialId, 'data-testid': testId, }: PickerDialogProps): JSX.Element;

export declare interface PickerDialogOption {
    id: string;
    label: string;
    /** A quieter second line. */
    description?: string;
    icon?: ReactNode;
    /** Indent level — a folder's depth in its tree. Default 0. */
    depth?: number;
    /** Shown, not choosable ("the folder it is already in"). */
    disabled?: boolean;
    /** Said beside a disabled row. */
    disabledReason?: string;
}

export declare interface PickerDialogProps {
    open: boolean;
    title: string;
    /** A sentence under the title. */
    body?: string;
    options: readonly PickerDialogOption[];
    /** The confirm button's words ("Move", "Run", "Create"). Default 'Choose'. */
    confirmLabel?: string;
    onPick: (id: string) => void;
    onCancel: () => void;
    /** Search placeholder; the box is shown when there are more than 6 options. */
    searchPlaceholder?: string;
    /** Said when there is nothing to choose (or nothing matches). */
    emptyText?: string;
    /** Said while the options are loading. */
    loading?: boolean;
    /** Preselected row. */
    initialId?: string;
    'data-testid'?: string;
}

/** The first container this browser can record, or `undefined` for its default. */
export declare function pickRecordingMimeType(preferred?: string): string | undefined;

/** A pushpin: "keep this at the top". */
export declare function PinIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare interface PinnedMessageItem {
    messageId: string;
    /** Who wrote the message. */
    author: string;
    /** Short excerpt of it — the panel never re-reads the transcript. */
    preview: string;
    /** ISO-8601: when it was PINNED. The byline's business, not the stamp's. */
    pinnedAt?: string;
    /**
     * ISO-8601: when the message was SENT.
     *
     * What the stamp shows, because a pinned entry is a handle on a message and
     * the reader's next move is to find it in the transcript — where it is
     * stamped with this. Showing the pin time instead made one message read as
     * two different messages depending on which panel you were in.
     *
     * Optional: pins written before the store denormalised it have none, and
     * those fall back to `pinnedAt` rather than losing their stamp.
     */
    sentAt?: string;
    /** Display name of whoever pinned it. */
    pinnedBy?: string;
}

export declare function PinnedMessagesPanel({ pins, onJump, onUnpin, className, 'data-testid': testId, }: PinnedMessagesPanelProps): JSX.Element;

export declare interface PinnedMessagesPanelProps {
    pins: readonly PinnedMessageItem[];
    onJump?: (messageId: string) => void;
    /** Omit to render a read-only panel — e.g. for someone who may not unpin. */
    onUnpin?: (messageId: string) => void;
    className?: string;
    'data-testid'?: string;
}

/**
 * A column that scrolls with the page until the page scrolls past it, then
 * stays put — a video panel beside the text. The host decides WHEN (it
 * watches the scroll); this owns HOW, so the fixed geometry is not a page's
 * inline style.
 */
export declare function PinnedSlot({ width, pinned, top, left, slotId, spacerRef, children, 'data-testid': testId }: PinnedSlotProps): JSX.Element;

export declare interface PinnedSlotProps {
    /** The slot's width, reserved in the flow whether or not it is pinned. */
    width: number;
    /** Pinned: the inner slot leaves the flow and sits fixed at `top`/`left`; the spacer keeps the width. */
    pinned: boolean;
    top?: number;
    left?: number;
    /** The inner slot's id — for content that portals itself in. */
    slotId?: string;
    /** The spacer, so a host can measure where the slot sits in the flow. */
    spacerRef?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    'data-testid'?: string;
}

export declare function PiPButton({ getVideoElement, className, title, }: PiPButtonProps): JSX.Element;

export declare interface PiPButtonProps {
    /** Callback to obtain the `<video>` element to enter PiP with. */
    getVideoElement: () => HTMLVideoElement | null;
    className?: string;
    title?: string;
}

export declare interface PipelineApprovalResolveRequest {
    stepId: string;
    decision: 'approve' | 'reject';
    /** Optional free-form note recorded alongside the decision. */
    comment?: string;
}

/** 204 No Content on success. No structured response body. */
export declare type PipelineApprovalResolveResponse = void;

export declare interface PipelineCancelRequest {
    /** Optional reason recorded in the audit log. */
    reason?: string;
}

/** 204 No Content on success. */
export declare type PipelineCancelResponse = void;

export declare interface PipelineDefinition {
    id: string;
    name: string;
    description?: string;
    /** Free-form labels for filtering / grouping in the list view. Stored normalized (lowercase, trimmed). */
    tags?: string[];
    icon?: string;
    /** Bumped on each save. */
    version: number;
    status: PipelineStatus;
    /** Snapshot of `version` at last publish; runs trigger on this version. */
    publishedVersion?: number;
    /**
     * Deep clone of the definition as it existed at the last `publishPipeline`
     * call (minus this field, to avoid recursion). Enables the VersionDiffModal
     * to show real per-node/edge differences between the current draft and the
     * last-published state. Populated by `publishPipeline`.
     */
    publishedSnapshot?: Omit<PipelineDefinition, 'publishedSnapshot'>;
    /** Cached for fast lookup by trigger dispatch. */
    triggerBinding?: TriggerBinding;
    nodes: PipelineNode[];
    edges: PipelineEdge[];
    createdAt: string;
    updatedAt: string;
    createdBy: string;
}

declare interface PipelineDefSummary {
    id: string;
    name: string;
    status?: string;
    icon?: string;
}

export declare interface PipelineEdge {
    id: string;
    source: string;
    /** 'out', 'true'/'false', 'branch-N', 'approved'/'rejected', 'error'. */
    sourceHandle: string;
    target: string;
    /** 'in' or 'in-N' for Join. */
    targetHandle: string;
}

export declare interface PipelineEditorServices {
    /**
     * Resolve an imageId to a browser-loadable URL. Used by every node body
     * that renders `<img src=...>` for a produced image (crop, adjust, save,
     * generate, etc.). The host is responsible for any auth wrangling — the
     * URL must work with a bare `<img>` tag (cookie session, signed URL,
     * permissive route, etc.).
     */
    getImageUrl(imageId: string): string;
    /**
     * Optional upload helper used by image-source / image picker primitives.
     * Hosts that mount an upload UI implement this against their backend.
     * Nodes that just render produced images do NOT need this method.
     */
    uploadImage?(input: File | {
        url: string;
    }): Promise<PipelineUploadedImage>;
    /**
     * Node types this host's executor can actually run.
     *
     * The palette ships more node types than any given backend implements — a
     * survey against platform-api found 11 of 37 with no discoverable handler
     * (agent, approval, policy, guardrail, graph-query, ag-ui-output, mcp-tool,
     * knowledge-base, and the control-flow trio). An author could drag one on,
     * wire it up, and get a pipeline that silently never runs that step.
     *
     * The library deliberately does NOT hardcode this: which types execute is a
     * property of the HOST's deployment, not of the component library, and
     * baking in a guess would go stale the moment a handler ships. Declare the
     * set here and the palette marks everything else as preview.
     *
     * Omit it entirely and nothing is marked — the pre-2.44 behaviour, for hosts
     * that haven't wired this up yet.
     */
    executableNodeTypes?: readonly string[];
    /**
     * Host-supplied vocabulary for node config fields, keyed by node type.
     *
     * The library ships VENDOR-NEUTRAL copy: a retrieval node asks for a
     * "Knowledge base ID", a graph node asks for a "Graph ID" and a "Graph
     * query". It deliberately does not say "Bedrock" or "Neptune" or
     * "openCypher", for the same reason it does not hardcode
     * `executableNodeTypes`: which backend stands behind a node type is a
     * property of the HOST's deployment, not of the component library. Baking a
     * vendor's name into a shared primitive makes the library wrong for every
     * host that uses a different one, and it cannot be corrected without a
     * breaking change to a frozen surface.
     *
     * A host that IS running a specific backend supplies its own words here and
     * gets the vendor-accurate UI it wants:
     *
     * ```ts
     * nodeVocabulary: {
     *   'knowledge-base': {
     *     labels: { knowledgeBaseId: 'Bedrock KB ID' },
     *     help: { knowledgeBaseId: 'The Bedrock Knowledge Base to retrieve from.' },
     *     placeholders: { knowledgeBaseId: 'kb-3f9c1a2b' },
     *   },
     *   'graph-query': { labels: { query: 'openCypher query' } },
     * }
     * ```
     *
     * Omit it and every field keeps its neutral wording.
     */
    nodeVocabulary?: Record<string, NodeVocabulary>;
    /**
     * Host-supplied model choices, keyed by model GROUP.
     *
     * The library ships a small default list per group so the editor is usable
     * out of the box, but a hardcoded list is wrong the moment a host runs a
     * different backend — or the same backend a version later. Which models a
     * deployment can actually call is a property of the HOST, exactly like
     * `executableNodeTypes` and `nodeVocabulary`.
     *
     * Group names the library asks for:
     *   - `image:generate`  — image generation models
     *   - `llm:<provider>`  — chat models for an LLM node's selected provider,
     *                         e.g. `llm:anthropic`, `llm:bedrock`
     *
     * Supplying a group REPLACES the default list for it; groups you omit keep
     * their defaults, so a host can override one without restating the rest.
     */
    modelOptions?: Record<string, readonly ModelOption[]>;
    /**
     * Whether this deployment has an inbound webhook relay that actually starts
     * runs — and where its public origin is.
     *
     * ADDITIVE and **defaults to disabled**, which is the honest default: the
     * library ships the trigger UI, not the relay. The `/hooks/pipeline/:path`
     * route on the reference backend logs the delivery and answers 202; the
     * bridge that would forward it onto the pipeline event source is not wired,
     * so `useWebhookTriggers` is a dormant subscriber and a correctly-signed
     * POST runs nothing. The editor nonetheless rendered an invokable-looking
     * URL, a Copy button, and a reveal/copy pair for the signing secret —
     * everything an integrator needs to build against an endpoint that is
     * silently inert, and to blame their own HMAC when nothing happens.
     *
     * Declare `{ enabled: true }` once your host forwards those deliveries; the
     * panel then offers the URL and secret as before. Until then it says the
     * endpoint is not active and withholds the copy affordances.
     */
    webhookRelay?: WebhookRelayStatus;
}

export declare function PipelineEditorServicesProvider({ services, children, }: {
    services: PipelineEditorServices;
    children: ReactNode;
}): JSX.Element;

/** Structured error body returned on bridge / framework failures. */
export declare interface PipelineErrorBody {
    error: string;
    /** Logical action attempted ("trigger", "cancel", "resolveApproval", ...). */
    action: string;
}

/** Pipeline event frame received via WebSocket (type === 'pipeline:event') */
export declare interface PipelineEventFrame extends GatewayMessage {
    type: 'pipeline:event';
    eventType: PipelineWireEventType;
    payload: unknown;
    seq?: number;
    sourceNodeId?: string;
    emittedAt?: number;
    channel?: string;
}

export declare type PipelineEventMap = {
    'pipeline.run.started': {
        runId: string;
        pipelineId: string;
        triggeredBy: PipelineRunTrigger;
        at: string;
    };
    'pipeline.run.completed': {
        runId: string;
        durationMs: number;
        at: string;
    };
    'pipeline.run.failed': {
        runId: string;
        error: PipelineRunError;
        at: string;
    };
    'pipeline.run.cancelled': {
        runId: string;
        at: string;
    };
    'pipeline.run.orphaned': {
        runId: string;
        previousOwner: string;
        at: string;
    };
    'pipeline.run.reassigned': {
        runId: string;
        from: string;
        to: string;
        at: string;
    };
    'pipeline.step.started': {
        runId: string;
        stepId: string;
        nodeType: NodeType;
        at: string;
    };
    'pipeline.step.completed': {
        runId: string;
        stepId: string;
        durationMs: number;
        output?: unknown;
        at: string;
    };
    'pipeline.step.failed': {
        runId: string;
        stepId: string;
        error: string;
        at: string;
    };
    'pipeline.step.skipped': {
        runId: string;
        stepId: string;
        reason: string;
        at: string;
    };
    'pipeline.step.cancelled': {
        runId: string;
        stepId: string;
        at: string;
    };
    'pipeline.step.breakpoint': {
        runId: string;
        stepId: string;
        at: string;
    };
    /** Patch was applied AND validated by a registered ContextValidator. */
    'pipeline.step.context.patched': {
        runId: string;
        stepId: string;
        patchId: string;
        /** Mirror of `ContextPatch['mode']`. */
        mode: 'merge' | 'jsonPatch';
        at: string;
    };
    /** Patch was applied but no validator was registered for this step's node type. */
    'pipeline.step.context.patched-unvalidated': {
        runId: string;
        stepId: string;
        patchId: string;
        mode: 'merge' | 'jsonPatch';
        at: string;
    };
    /** A previously-applied patch was reverted while still paused at the same step. */
    'pipeline.step.context.patch-reverted': {
        runId: string;
        stepId: string;
        patchId: string;
        at: string;
    };
    'pipeline.llm.prompt': {
        runId: string;
        stepId: string;
        model: string;
        prompt: string;
        at: string;
    };
    'pipeline.llm.stream.opened': {
        runId: string;
        stepId: string;
        model: string;
        openedAt: string;
    };
    'pipeline.llm.token': {
        runId: string;
        stepId: string;
        token: string;
        at: string;
    };
    'pipeline.llm.response': {
        runId: string;
        stepId: string;
        response: string;
        tokensIn: number;
        tokensOut: number;
        at: string;
    };
    'pipeline.approval.requested': {
        runId: string;
        stepId: string;
        approvers: ApprovalNodeData['approvers'];
        at: string;
    };
    'pipeline.approval.recorded': {
        runId: string;
        stepId: string;
        userId: string;
        decision: 'approve' | 'reject';
        at: string;
    };
    'pipeline.run.paused': {
        runId: string;
        atStepIds: string[];
        at: string;
    };
    'pipeline.run.resumed': {
        runId: string;
        at: string;
    };
    /**
     * hub#2223: emitted by the executor when a previously-failed run is
     * restarted from `fromNodeId` via `PipelineModule.resumeFromStep`. The
     * canonical wire name is `pipeline:run:resumed-from-step` (DC source);
     * after the gateway's `:` → `.` mapping that becomes
     * `pipeline.run.resumed-from-step`. The legacy alias
     * `pipeline.run.resumeFromStep` (camelCase) was a placeholder for the
     * pre-producer Phase 5 stub and has no producer; the past-tense kebab
     * form is the one consumers should key on.
     */
    'pipeline.run.resumed-from-step': {
        runId: string;
        fromNodeId: string;
        /** The stepId that originally failed and triggered this resumption, if known. */
        originalFailedStepId?: string;
        at: string;
    };
    /**
     * Canonical colon-form request event emitted by the gateway's local fallback
     * when no PipelineModule is wired. Wire name: `pipeline:run:resumeFromStep`.
     * The past-tense `pipeline.run.resumed-from-step` (DC-sourced) is the
     * producer-backed form; this key covers the gateway-local stub path.
     */
    'pipeline:run:resumeFromStep': {
        runId: string;
        fromNodeId: string;
        at: string;
    };
    'pipeline.run.retry': {
        newRunId: string;
        previousRunId: string;
        at: string;
    };
    'pipeline.webhook.triggered': {
        webhookPath: string;
        body: unknown;
        headers: Record<string, string>;
        at: string;
    };
    'pipeline.join.waiting': {
        runId: string;
        stepId: string;
        received: number;
        required: number;
        at: string;
    };
    'pipeline.join.fired': {
        runId: string;
        stepId: string;
        inputs: string[];
        at: string;
    };
};

export declare interface PipelineNode {
    id: string;
    type: NodeType;
    position: {
        x: number;
        y: number;
    };
    /** Discriminated union keyed on `data.type`. */
    data: NodeData;
}

export declare interface PipelinePendingApproval {
    runId: string;
    pipelineId: string;
    stepId: string;
    approvers: readonly PipelinePendingApprover[];
    /** Display message authored on the approval node. */
    message?: string;
    /** ISO 8601 of the first request. */
    requestedAt: string;
    /** Number of approvals required to advance the step. Default 1. */
    requiredCount?: number;
    /** Approvals already recorded against the step. */
    recordedCount?: number;
}

export declare interface PipelinePendingApprovalsResponse {
    approvals: readonly PipelinePendingApproval[];
}

export declare interface PipelinePendingApprover {
    type: 'role' | 'user';
    value: string;
}

export declare interface PipelineRun {
    id: string;
    pipelineId: string;
    pipelineVersion: number;
    status: RunStatus;
    triggeredBy: PipelineRunTrigger;
    /** Distributed-core ResourceRouter owner. */
    ownerNodeId: string;
    startedAt: string;
    completedAt?: string;
    durationMs?: number;
    /** Active frontier — can be > 1 with Fork. */
    currentStepIds: string[];
    steps: Record<string, StepExecution>;
    /** Accumulated as the run progresses. */
    context: Record<string, unknown>;
    error?: PipelineRunError;
    /** Per-model token usage accumulated during the run. */
    tokenUsage?: Record<string, TokenUsageByModel>;
    /** Estimated total cost in USD for this run. */
    estimatedCostUsd?: number;
    /** ISO timestamp set by StuckRunDetector when the run hasn't emitted events past the threshold. */
    stuckAt?: string;
    /**
     * hub#2223: monotonic count of `resumeFromStep` invocations against this
     * run. Defaults to undefined / 0 on a fresh run; the executor increments
     * it each time the run is restarted from a specific step. Surfaces in the
     * run-detail page so operators can see at a glance that a run was replayed.
     */
    replayAttempts?: number;
    /**
     * hub#2223: history of resume-from-step invocations on this run. Populated
     * by the `pipeline:run:resumed-from-step` event handler in
     * PipelineRunsContext so the run-detail banner can render an at-a-glance
     * timeline of replays.
     */
    resumeHistory?: ResumeFromStepEntry[];
}

/**
 * Full run snapshot. Same shape as `PipelineRunSummary` today; kept as a
 * distinct alias because the detail endpoint may grow fields that aren't
 * meaningful in list responses (full step input/output, attempt history,
 * audit trail) without churning the list shape.
 */
export declare type PipelineRunDetailResponse = PipelineRunSummary;

export declare interface PipelineRunError {
    nodeId: string;
    message: string;
    stack?: string;
    errorCategory?: ErrorCategory;
    retryability?: ErrorRetryability;
}

export declare interface PipelineRunsListQuery {
    /** Page size, clamped server-side to [1, 100]. */
    limit?: number;
    /** Opaque cursor returned by a prior page. */
    cursor?: string;
}

export declare interface PipelineRunsListResponse {
    runs: readonly PipelineRunSummary[];
    /** Present when more pages exist; pass to the next call as `cursor`. */
    nextCursor?: string;
}

export declare interface PipelineRunSummary {
    runId: string;
    pipelineId: string;
    /**
     * Canonical run status — the same vocabulary as `RunStatus` in
     * `./pipeline.ts`, which every comparison site in this library already
     * uses.
     *
     * This used to read `'running' | 'succeeded' | 'failed' | 'canceled' |
     * 'interrupted'`, a second dialect that no component ever compared
     * against. The runs list endpoint really did serve `succeeded` while the
     * detail endpoint served `completed` for the same run, and because
     * `src/api/pipelineRuns.ts` casts the wire shape straight to `PipelineRun`
     * without translating status, that alias reached the UI — where the status
     * filter (`components/pipelines/runsUtils.ts`) silently dropped it and the
     * stats page never counted it. Backend now serves canonical spellings from
     * both endpoints.
     *
     * `interrupted` is a platform-api-only lifecycle state (orphan scan /
     * force-fail outcome) that is not part of `RunStatus`, so it stays spelled
     * out here.
     *
     * `stuck` IS part of `RunStatus` (distributed-core's StuckRunDetector emits
     * `pipeline:run:stuck` for a run that has gone quiet); it must appear here
     * too or `WireCarriesEveryRunStatus` in `pipeline.ts` fails to compile.
     */
    status: 'pending' | 'running' | 'awaiting_approval' | 'paused_at_breakpoint' | 'completed' | 'rejected' | 'failed' | 'cancelled' | 'stuck' | 'interrupted';
    startedAt: string;
    completedAt?: string;
    triggeredBy: {
        userId?: string;
        triggerType: string;
        payload?: Record<string, unknown>;
    };
    triggerType?: string;
    /** Per-step state map. Keyed by node ID; shape evolves with the framework. */
    steps?: Record<string, unknown>;
    /** Structured terminal-error envelope. Absent on non-failed runs. */
    error?: {
        nodeId: string;
        message: string;
        errorCategory?: string;
        retryability?: string;
        [key: string]: unknown;
    };
}

export declare interface PipelineRunTrigger {
    userId?: string;
    triggerType: string;
    payload: Record<string, unknown>;
}

declare interface PipelineSidebarEntry {
    id: string;
    name: string;
    status: 'draft' | 'published' | 'archived';
    updatedAt: string;
    icon?: string;
}

export declare type PipelineStatus = 'draft' | 'published' | 'archived';

export declare interface PipelineTriggerRequest {
    /** Optional inline definition. When absent, server reads from store. */
    definition?: InlinePipelineDefinition;
    /** Free-form key/value passed to the trigger node's evaluation context. */
    triggerPayload?: Record<string, unknown>;
    /** Node IDs at which the run should pause for step-by-step debugging. */
    breakpoints?: readonly string[];
}

export declare interface PipelineTriggerResponse {
    runId: string;
    pipelineId: string;
    triggeredBy: {
        userId: string;
        triggerType: string;
    };
    /** ISO 8601 timestamp the server stamped the trigger acknowledgement. */
    at: string;
}

export declare interface PipelineUploadedImage {
    imageId: string;
    width: number;
    height: number;
    mimeType: string;
    sizeBytes: number;
}

/**
 * Wire envelope that wraps every PipelineEventMap event as it crosses the
 * network boundary (mock adapter in Phase 1, WebSocket in Phase 4+). Carries
 * ordering metadata that lets the frontend dedupe replayed events after a
 * ResourceRouter-orphaned run is resumed on a new owner.
 */
export declare interface PipelineWireEvent<K extends keyof PipelineEventMap = keyof PipelineEventMap> {
    eventType: K;
    payload: PipelineEventMap[K];
    /** Monotonic per-run sequence — starts at 0, increments on each emit. Stable across replays. */
    seq: number;
    /** Node id that emitted the event. For observability + debugging. */
    sourceNodeId: string;
    /** Wall-clock emission time (ms). Re-stamped on replay — NEVER use for dedupe. */
    emittedAt: number;
}

/**
 * Wire-form event type carried on the gateway's `pipeline:event` frame.
 *
 * Most events use the same name on the wire as in `PipelineEventMap` (the
 * gateway bridge canonicalises distributed-core's colon-form `:` to dot-form
 * `.` to align with the in-app map keys). Known divergences:
 *
 *  - `pipeline.run.resume-from-step` (wire, kebab) ↔
 *    `pipeline:run:resumeFromStep` (in-app, colon-form)
 *
 * The kebab form is the canonical wire name from DC post-deprecation-window
 * (hub#2209). `WebSocketEventAdapter` normalises it before dispatch, so
 * subscribers key on `PipelineEventMap`. The type below admits both shapes so
 * that frame decoders don't fail typecheck on receipt of the kebab form.
 */
export declare type PipelineWireEventType = keyof PipelineEventMap | 'pipeline.run.resume-from-step';

export declare function PlaybackReactionsLayer({ reactions, currentTimeMs, className, }: PlaybackReactionsLayerProps): JSX.Element;

export declare interface PlaybackReactionsLayerProps {
    reactions: TimedReaction[];
    /** Current playhead position in ms (player timeupdate). */
    currentTimeMs: number;
    className?: string;
}

/** A play button in a ring: "run". Since 2.390.3. */
export declare function PlayCircleIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare type PlayerPhase = 'idle' | 'connecting' | 'buffering' | 'playing' | 'error';

export declare function PlayIcon({ size, ...rest }: IconProps): JSX.Element;

/** A plus in a ring: "add this". Since 2.389.6. */
export declare function PlusCircleIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** A plus: "make a new one". */
export declare function PlusIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare interface PolicyNodeData {
    type: 'policy';
    policyStoreId: string;
    principal: string;
    action: string;
    resource: string;
    contextEntities?: string;
    label?: string;
}

export declare function PoolFormPage({ pool, isEdit, onSubmit, onCancel, error }: PoolFormPageProps): JSX.Element;

export declare interface PoolFormPageProps {
    pool?: {
        poolId?: string;
        poolName: string;
        customAttributes: Record<string, string>;
        settings: PoolSettings;
    };
    isEdit: boolean;
    onSubmit: (data: {
        poolName: string;
        customAttributes: Record<string, string>;
        settings: PoolSettings;
    }) => Promise<void>;
    onCancel: () => void;
    error?: string | null;
}

export declare function PoolListPage({ pools, onCreatePool, onEditPool, onDeletePool, onViewPool, loading, }: PoolListPageProps): JSX.Element;

export declare interface PoolListPageProps {
    pools: Array<{
        poolId: string;
        poolName: string;
        clientId: string;
        createdAt: string;
    }>;
    onCreatePool: () => void;
    onEditPool: (poolId: string) => void;
    onDeletePool: (poolId: string) => Promise<void>;
    onViewPool: (poolId: string) => void;
    loading?: boolean;
}

export declare function PoolScopedLayout({ children, poolId, poolName, activeSection, onNavigate, onBack, }: PoolScopedLayoutProps): JSX.Element;

export declare interface PoolScopedLayoutProps {
    children: React.ReactNode;
    poolId: string;
    poolName: string;
    activeSection?: 'users' | 'groups' | 'mfa';
    onNavigate: (path: string) => void;
    onBack: () => void;
}

export declare interface PoolSettings {
    passwordPolicy?: PasswordPolicy;
    mfaConfiguration: 'OFF' | 'OPTIONAL' | 'REQUIRED';
    accountRecovery?: {
        email: boolean;
        sms: boolean;
    };
}

export declare interface PoolStats {
    userCount: number;
    poolId: string;
    poolName: string;
}

/** A box with an arrow leaving its corner: "open this in its own view". */
export declare function PopOutIcon({ size, ...rest }: GlyphProps): JSX.Element;

/**
 * The attribute a pinned surface — a composer dock at the foot of an editor —
 * puts on itself so popovers never cover it. A popover anchored ABOVE such a
 * surface treats its top edge as the bottom of the screen: it flips up, or
 * slides up, rather than opening over it. A popover opened from INSIDE it
 * (its own menus) is unaffected.
 */
export declare const POPOVER_KEEPOUT_ATTR = "data-uic-keepout";

/** A field in a PopoverForm: a small label over its control, tightly. */
export declare function PopoverField({ label, hint, children, 'data-testid': testId, }: {
    label: string;
    hint?: string;
    children: ReactNode;
    'data-testid'?: string;
}): JSX.Element;

/** The lowest y a popover anchored at `anchor` may reach: the viewport, or a keep-out surface below the anchor. */
export declare function popoverFloor(anchor: DOMRect | null, viewportHeight: number, doc?: Document): number;

export declare function PopoverForm({ open, anchor, placement, title, subtitle, icon, submitLabel, submitSlot, submitTestId, submitDisabled, busy, error, onSubmit, onClose, width, children, 'data-testid': testId, }: PopoverFormProps): JSX.Element | null;

export declare interface PopoverFormProps {
    open: boolean;
    /** What it opens beside. Without one it centres, which is the fallback, not the intent. */
    anchor?: RefObject<HTMLElement | null> | null;
    placement?: InlinePopoverPlacement;
    /** A word or two. "Create a channel", not "Create a new channel in this team". */
    title: string;
    /** The context line under it — the team a channel is going into, say. */
    subtitle?: string;
    /** A small mark to the left of the title: a team avatar, a glyph. */
    icon?: ReactNode;
    /** Ignored when `submitSlot` is given. */
    submitLabel?: string;
    /**
     * A confirm control to render INSTEAD of the shell's own submit button.
     *
     * For the forms whose body already owns the decision — a people picker knows
     * how many are selected and says so ("Start chat with 2"), and the shell has
     * no way to learn that without the caller lifting the selection out of the
     * component that manages it. Cancel and the chrome stay; only the confirm is
     * the caller's. `submitLabel` is ignored when this is given.
     *
     * `false` means there is NO confirm to render: a destination picker's rows
     * are themselves the commit, and a footer button beside them would be a
     * second way to do the thing that has no state to act on. The footer keeps
     * Cancel, which is the way out a popover still owes anyone who opened it by
     * accident.
     */
    submitSlot?: ReactNode | false;
    /** Overrides the submit button's testid, for hosts whose suites name it. */
    submitTestId?: string;
    submitDisabled?: boolean;
    busy?: boolean;
    /** The server's refusal, shown in place. The footer does not move when it appears. */
    error?: string | null;
    onSubmit: () => void;
    onClose: () => void;
    /** How wide the panel sits. 'md' (320px) by default — a name fits, a paragraph does not. */
    width?: PopoverFormWidth;
    children: ReactNode;
    'data-testid'?: string;
}

export declare type PopoverFormWidth = 'sm' | 'md' | 'lg';

export declare function postApproval(args: PostApprovalArgs): Promise<{
    ok: boolean;
    error?: string;
}>;

export declare interface PostApprovalArgs {
    sectionId: string;
    decision: ApprovalDecision;
    reviewerName?: string;
    comment?: string;
    /** Override for tests; production reads from window.location. */
    documentId?: string | null;
    /** Optional bearer token. Dev (SKIP_AUTH=true) accepts unauthenticated. */
    idToken?: string | null;
    /** Per-call override of the API base; falls back to `getApprovalApiBase()`. */
    baseUrl?: string;
}

export declare function PostFeed({ idToken, roomId, onMessage }: PostFeedProps): JSX.Element;

declare interface PostFeedProps {
    idToken: string | null;
    /**
     * Room whose posts are shown. Changing this resets the feed: the previous
     * room's posts and paging cursor are dropped and its in-flight request is
     * ignored, so a caller does NOT need `key={roomId}` to avoid a wrong-room
     * render. (It used to: the slower of two overlapping requests won, so
     * switching rooms could repaint the new room with the old room's posts.)
     */
    roomId: string | null;
    onMessage: OnMessageFn_9;
}

declare interface PostItem {
    roomId: string;
    postId: string;
    authorId: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    _fadeIn?: boolean;
}

declare interface PreJoinLocalIdentity {
    /** Display name shown on the avatar tile when the camera is off. */
    displayName: string;
    /** Optional avatar image URL. Falls back to initials if absent. */
    avatarSrc?: string;
}

export declare type PreJoinPermission = 'pending' | 'granted' | 'denied' | 'blocked' | 'no-device' | 'unavailable';

export declare type PreJoinReadyState = 'empty' | 'pending' | 'ready';

export declare interface PreJoinRosterEntry {
    participantId: string;
    /** True when this participant's transport is DTLS-connected and they're
     *  consumable. False = they're publishing but still mid-handshake. */
    ready: boolean;
    /** Optional display name override. Falls back to participantId.slice(0, 8). */
    displayName?: string;
    /** Optional kinds list (e.g. ['audio', 'video']). Currently informational. */
    kinds?: string[];
}

export declare function PresenceAvatars({ users, maxVisible, size, onMoreClick, onUserClick, onFollowUser, followingUserId, className, }: PresenceAvatarsProps): JSX.Element;

export declare interface PresenceAvatarsProps {
    users: PresenceAvatarUser[];
    /** Maximum avatars to render before "+N" chip (default 5) */
    maxVisible?: number;
    /** Avatar diameter in px (default 28) */
    size?: number;
    /** Called when the "+N" overflow chip is clicked */
    onMoreClick?: () => void;
    /** Called with the user's `id` when an avatar is clicked. When set,
     *  each avatar becomes a `<button>` for keyboard + screen-reader
     *  accessibility; when omitted, items render as `<div>` (back-compat
     *  with consumers that just want a static row). */
    onUserClick?: (id: string) => void;
    /**
     * Enables follow mode: each avatar grows a hover/focus card (name, detail,
     * location) with a Follow action. Click stays `onUserClick` — jump once —
     * and follow is the card's explicit verb, because a bubble that follows on
     * bare click turns every glance into a mode change.
     *
     * The card replaces the native `title` tooltip when set; two tooltips
     * fighting over one hover is worse than either.
     */
    onFollowUser?: (id: string) => void;
    /** The user currently being followed, so their card offers Stop instead. */
    followingUserId?: string | null;
    className?: string;
}

export declare interface PresenceAvatarUser {
    /** Unique identifier for the user. Passed back to `onUserClick`. */
    id: string;
    name: string;
    /** Optional avatar image URL. Wins over `color` when present. */
    avatarUrl?: string;
    /** Online flag. Drives the status dot when `idle` is not set:
     *  `undefined`/`true` → green; `false` → gray. */
    online?: boolean;
    /** Override the auto-computed avatar background. Useful when the
     *  user identity needs to match a CRDT cursor color elsewhere. */
    color?: string;
    /** Present but away. Dims the avatar (alpha-blends `color` when
     *  provided, otherwise drops opacity) and flips the status dot to
     *  amber. Wins over `online` for the dot color. */
    idle?: boolean;
    /** Optional editing mode — renders a small mode badge on the
     *  upper-right of the avatar (pencil / check / eye). */
    mode?: PresenceMode;
    /** One status line for the hover card — "editing", "away · 3m". Free text
     *  because the library does not know the host's vocabulary. */
    detail?: string;
    /** Where in the surface the user is — a section title, a pane name.
     *  Rendered under the detail line on the hover card. */
    location?: string;
}

export declare interface PresenceContextValue {
    presenceUsers: PresenceUser_2[];
    currentClientId: string | null;
    setTyping: (isTyping: boolean) => void;
}

export declare function PresenceDot({ state, ariaLabel, label, pulse, size, className, style, title, 'data-testid': testId, }: PresenceDotProps): JSX.Element;

export declare interface PresenceDotProps {
    state: PresenceState;
    /** Override the auto-computed accessible label. */
    ariaLabel?: string;
    /** Visible text label after the dot. */
    label?: ReactNode;
    /** Pulse animation. Defaults to true when state === 'online'. */
    pulse?: boolean;
    size?: StatusDotSize;
    className?: string;
    style?: CSSProperties;
    title?: string;
    'data-testid'?: string;
}

export declare type PresenceMode = 'editor' | 'reviewer' | 'reader';

export declare function PresencePanel({ users, currentClientId }: PresencePanelProps): JSX.Element;

declare interface PresencePanelProps {
    users: PresenceUser_2[];
    currentClientId: string | null;
}

export declare function PresenceProvider({ value, children, }: {
    value: PresenceContextValue;
    children: ReactNode;
}): JSX.Element;

export declare type PresenceState = 'online' | 'away' | 'busy' | 'offline' | 'unknown';

/**
 * @deprecated Renamed to `PresenceAvatarUser` (the barrel-exported name for
 * the `PresenceAvatars` user shape). Import `PresenceAvatarUser` instead;
 * this back-compat alias will be removed in the next major.
 */
export declare type PresenceUser = PresenceAvatarUser;

declare interface PresenceUser_2 {
    clientId: string;
    status: string;
    metadata: Record<string, unknown>;
}

declare interface PresenceUser_3 {
    clientId: string;
    metadata: Record<string, unknown>;
}

export declare function PresentationEditor({ spec, onChange, preview, onRequestPreview, onSaveRevision, revisions, activeRevisionId, onSelectRevision, olderRevisions, sources, onSearchSources, onDownload, onOpenPresentationView, readOnly, onInstruct, instructHints, onUndoInstruct, generatingSlideIds, slideViewers, selectSlideRequest, footer, renderFrame, onSelectedSlideChange, className, 'data-testid': testId, }: PresentationEditorProps): JSX.Element;

/** The parts `renderFrame` receives. */
declare interface PresentationEditorFrame {
    /** `SlidesToolbar` — New slide, Layout, Insert, Theme, Undo/Redo, Present. */
    toolbar: ReactNode;
    /** Revision tabs, Save as vN (gated on citations), Download .pptx. */
    actions: ReactNode;
    /** Deck title line, warnings, filmstrip, 16:9 stage, speaker notes, sources. */
    surface: ReactNode;
    /** The host's `footer`, or the built-in agent box in a dock, or null. */
    footer: ReactNode;
}

export declare interface PresentationEditorProps {
    /** Controlled. The host owns the spec; this component never holds a copy. */
    spec: DeckSpec;
    onChange: (spec: DeckSpec) => void;
    preview: PresentationPreview;
    /** Called whenever the spec changes. DEBOUNCE THIS — it is a render per call. */
    onRequestPreview: (spec: DeckSpec) => void;
    /** Resolves when the revision exists; rejects with the message to show. */
    onSaveRevision: (spec: DeckSpec) => Promise<unknown>;
    revisions: readonly PresentationEditorRevision[];
    activeRevisionId: string;
    onSelectRevision: (revisionId: string) => void;
    /** The host holds a page of a long history: the picker ends with "Older versions (N)…". */
    olderRevisions?: OlderRevisions;
    /** The deck's own inputs, offered in the source picker before anything is typed. */
    sources: readonly PresentationSourceOption[];
    /** The Documents explorer's search, so a citation names a real document. */
    onSearchSources?: (query: string) => PresentationSourceOption[] | Promise<PresentationSourceOption[]>;
    /** The `.pptx`, through the host's authorized route. No handler, no button. */
    onDownload?: () => void;
    /**
     * Opens the same deck in the read-only presentation surface — the toolbar's
     * Present. Called with the slide on the stage so the view can start there.
     */
    onOpenPresentationView?: (at?: {
        slideId: string;
        slideIndex: number;
    }) => void;
    readOnly?: boolean;
    /**
     * Turns on the agent box under the stage (see the file header). Resolve with
     * the agent's one-line summary once the host has applied the edit through
     * `onChange`; reject with the message to show when it could not.
     */
    onInstruct?: (instruction: string, ctx: PresentationInstructContext) => Promise<PresentationInstructResult | void>;
    /** One-tap instructions shown as chips beside the scope toggle. */
    instructHints?: readonly string[];
    /**
     * Puts an Undo button on the agent's summary line. The host owns the
     * snapshot; pass this only while it holds one.
     */
    onUndoInstruct?: () => void;
    /**
     * Slides the agent is working on right now — `useDeckReviseStatus(documentId)
     * .generatingSlideIds`. Their thumbnails and the stage say `Generating…`; an
     * id not in the deck is a slide being created and shows as a placeholder at
     * the end of the filmstrip.
     */
    generatingSlideIds?: readonly string[];
    /**
     * Slide id → the other people whose selected slide it is (the host's live
     * presence). Shown as small avatars on the filmstrip thumbnails. Since 2.371.0.
     */
    slideViewers?: Readonly<Record<string, readonly PresenceAvatarUser[]>>;
    /**
     * Put this slide on the stage — jump to or follow someone. Acted on when
     * `key` changes (so jumping to the same slide twice works); an id not in the
     * deck is ignored. Since 2.371.0.
     */
    selectSlideRequest?: {
        slideId: string;
        key: string | number;
    } | null;
    /**
     * The foot of the editor — the host's composer dock, normally a
     * `FloatingComposerDock`. It is pinned as the editor column's last row
     * (normal flow, `ComposerDockPlacementContext` = `pinned`) while only the
     * content above it scrolls. Replaces the built-in
     * agent box (`onInstruct`) when given. A function receives the slide on the
     * stage and a way to mark the slides an edit changed.
     */
    footer?: ReactNode | ((ctx: PresentationFooterContext) => ReactNode);
    /**
     * Hand the editor's parts to a frame — normally `EditorShell` — instead of
     * stacking them: `toolbar` for its toolbar row, `actions` (revisions, Save,
     * Download) for its head, `surface` as its child, `footer` for its floating
     * dock slot. Without `footer`, the built-in agent box arrives in `footer`
     * already wrapped in a `FloatingComposerDock`.
     */
    renderFrame?: (frame: PresentationEditorFrame) => ReactNode;
    /** The slide on the stage changed (selection, delete, an agent edit landing). */
    onSelectedSlideChange?: (slideId: string, index: number) => void;
    className?: string;
    'data-testid'?: string;
}

export declare interface PresentationEditorRevision {
    id: string;
    /** `v3`, as the generator labelled it. */
    label: string;
    /** Already formatted by the host — this component does no clock maths. */
    createdAt?: string;
}

/** What a `footer` render function is told. */
declare interface PresentationFooterContext {
    /** The slide on the stage — one of the spec's. Undefined while a generated slide is on the stage. */
    selectedSlide: DeckSlide | undefined;
    /** The generated slide on the stage (the Sources slide), when that is what is selected. Since 2.384.1. */
    selectedGeneratedSlide?: PresentationGeneratedSlide;
    /** 0-based, over the whole deck: the spec's slides, then the generated ones. */
    selectedIndex: number;
    /** The whole deck — the spec's slides plus the generated ones — the number every other surface shows. */
    slideCount: number;
    selectSlide: (slideId: string) => void;
    /** Marks slides "Edited by agent" in the filmstrip until the next call. */
    markChanged: (slideIds: string[]) => void;
}

/** A `generated` preview slide, resolved: the renderer's title and image, in deck order after the spec's slides. */
declare interface PresentationGeneratedSlide {
    id: string;
    title: string;
    svg?: string;
}

export declare interface PresentationInstructContext {
    /** Present when `scope` is 'slide': the slide on the stage. */
    slideId?: string;
    scope: PresentationInstructScope;
}

/** What the host's agent says it did. */
export declare interface PresentationInstructResult {
    /** One line, shown under the composer. */
    summary: string;
    /** Slides the edit touched; the rail marks them until the next instruction. */
    changedSlideIds?: string[];
}

export declare type PresentationInstructScope = 'slide' | 'deck';

/**
 * What the host knows about the preview right now.
 *
 * Three states rather than an optional object: "not rendered yet" and "the
 * render failed" are different things to say, and collapsing them produces a
 * stage that looks the same whether the server is slow or broken.
 */
export declare type PresentationPreview = {
    slides: readonly PresentationPreviewSlide[];
} | 'loading' | {
    error: string;
};

/** One rendered slide image, as `POST /api/deck/preview` returns it. */
export declare interface PresentationPreviewSlide {
    id: string;
    /** SVG source, rendered by the same layout engine that writes the .pptx. */
    svg: string;
    /** The slide's title as the renderer named it. Used for a `generated` slide, which has no spec entry. */
    title?: string;
    /**
     * A slide the renderer APPENDS to the deck — the Sources slide it builds
     * from every citation — rather than one the spec holds. Since 2.384.1 it is
     * a real slide of the deck: it is in the filmstrip (locked, numbered after
     * the deck's own), on the stage, in the pager's count and in Present, and it
     * is what the revision's `slideCount` and the `.pptx` already contained. The
     * editor cannot change it: it changes as the slides' citations do.
     */
    generated?: boolean;
}

/** One row the host's Documents search can return. */
export declare interface PresentationSourceOption {
    documentId: string;
    title: string;
    /** How the host would open it — a document page, or a recording transcript. */
    kind?: 'document' | 'transcript';
}

/** A printer: "print". Since 2.390.3. */
export declare function PrinterIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** What each outcome marker says to a screen reader (and a host's legend). */
export declare const PROCEDURE_STEP_STATUS_LABELS: Record<ProcedureStepStatus, string>;

export declare interface ProcedureStep {
    id: string;
    title: ReactNode;
    /** Longer instruction under the title. */
    body?: ReactNode;
    /** The latest outcome for this step. Absent: no run has reached a verdict — the number is shown. */
    status?: ProcedureStepStatus;
    /** A quiet line under the step — "Not reached in this run.", the failure reason. */
    note?: ReactNode;
}

export declare function ProcedureSteps({ steps, numbered, size, onSelectStep, emptyLabel, className, 'aria-label': ariaLabel, 'data-testid': testId, }: ProcedureStepsProps): JSX.Element;

export declare interface ProcedureStepsProps {
    steps: ProcedureStep[];
    /** Show step numbers. Default `true`. */
    numbered?: boolean;
    /** `sm` 13px text, 20px markers (an inspector); `md` (default) 14px, 24px markers (a record body). */
    size?: 'sm' | 'md';
    onSelectStep?: (id: string) => void;
    /** Shown when `steps` is empty. Default "No steps recorded". */
    emptyLabel?: string;
    className?: string;
    'aria-label'?: string;
    'data-testid'?: string;
}

export declare type ProcedureStepStatus = 'done' | 'failed' | 'pending' | 'skipped';

declare interface ProfileItem {
    userId: string;
    displayName: string;
    bio?: string;
    avatarUrl?: string;
    visibility: 'public' | 'private';
    createdAt: string;
    updatedAt: string;
}

export declare interface ProfileSummary {
    userId: string;
    displayName: string;
    email?: string;
    avatarUrl?: string;
}

export declare function ProgressBar({ value, max, color, size, completeTone, label, valueLabel, showRatio, labelClassName, className, style, 'data-testid': testId, 'aria-label': ariaLabel, }: ProgressBarProps): JSX.Element;

export declare interface ProgressBarProps {
    value: number;
    /** Maximum value. Defaults to 100. */
    max?: number;
    /** Fill color. Defaults to var(--color-primary). */
    color?: string;
    size?: ProgressBarSize;
    /**
     * Tone the fill (and the value readout) switches to once the bar is full.
     *
     * A completion bar that turns green at 100% is a different signal from one
     * that just reaches the right-hand edge, and reproducing it meant computing
     * the colour outside and passing `color`, then hand-writing a second
     * coloured `<span>` for the percentage — which is how the checklist reader
     * ended up with its own label row instead of using this one. Default
     * undefined: the bar keeps `color` at every value.
     */
    completeTone?: ToneOrAlias;
    label?: ReactNode;
    /**
     * Right-hand readout, replacing the computed ratio/percentage. Use it for a
     * caption the arithmetic here can't produce (a remaining count, an ETA).
     */
    valueLabel?: ReactNode;
    /** When true (default), shows "{value}/{max}". Otherwise shows percentage. */
    showRatio?: boolean;
    /** Extra classes on the label row, for a caller matching a nearby caption size. */
    labelClassName?: string;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
    'aria-label'?: string;
}

export declare type ProgressBarSize = 'sm' | 'md';

export declare function ProjectCard({ name, id, status, statusColors, contributorNames, contributorCount, activityItems, presenceDotColor, activityLabel, cardIndex, onClick, className, style, minHeight, }: ProjectCardProps): JSX.Element;

export declare interface ProjectCardProps {
    /** Primary display name. */
    name: string;
    /** Optional monospace slug shown below the name (e.g. "proj-k8s"). */
    id?: string;
    /**
     * Status key used for accent color. Built-in keys: active, in_progress,
     * completed, archived, planning, paused. Supply `statusColors` to extend.
     */
    status?: string;
    /** Override or extend the built-in status → color map. */
    statusColors?: Record<string, StatusColors>;
    /** Names used for AvatarGroup in the footer. */
    contributorNames?: string[];
    /** Total contributor count — used to compute the "+N more" overflow label. */
    contributorCount?: number;
    /** Activity ticker items. */
    activityItems?: ActivityFeedItem[];
    /**
     * Color of the presence dot in the footer (e.g. 'var(--color-success)' for green).
     * Default: 'var(--color-border-field)' (grey = unknown).
     */
    presenceDotColor?: string;
    /** Human-readable "last active" label shown next to the presence dot. */
    activityLabel?: string;
    /** Index used to stagger the activity rotation offset. */
    cardIndex?: number;
    /** Click handler. */
    onClick?: () => void;
    className?: string;
    style?: CSSProperties;
    /** Minimum card height (default: 190). */
    minHeight?: number;
}

/** The drag payload a result row sets and the composer accepts: a JSON array of `PromptContextItem`. */
export declare const PROMPT_CONTEXT_DRAG_TYPE = "application/x-uic-prompt-context";

/** The most documents one prompt carries (the deck pipeline reads at most 6; room for a picker to show "full"). */
export declare const PROMPT_CONTEXT_LIMIT = 10;

export declare interface PromptContext {
    items: readonly PromptContextItem[];
    /** False when the set is full (the item is refused). An item already present only has its title refreshed. */
    add: (item: PromptContextItem) => boolean;
    remove: (id: string) => void;
    has: (id: string) => boolean;
    /** Add when absent, remove when present. Returns whether it is now present. */
    toggle: (item: PromptContextItem) => boolean;
    clear: () => void;
}

export declare interface PromptContextItem {
    id: string;
    title: string;
    /** 'page' | 'presentation' | 'diagram' | … — drives the chip's glyph. */
    kind?: string;
}

export declare function PromptContextPicker({ search, scope, label, placeholder, debounceMs, 'data-testid': testId, }: PromptContextPickerProps): JSX.Element;

export declare interface PromptContextPickerProps {
    /** The host's document search. An empty query may return recent documents. */
    search: (query: string) => Promise<readonly PromptContextItem[]> | readonly PromptContextItem[];
    /** The prompt-context scope (default 'documents'). */
    scope?: string;
    /** Accessible name of the "+" button. */
    label?: string;
    placeholder?: string;
    /** Milliseconds between the last keystroke and the search. */
    debounceMs?: number;
    'data-testid'?: string;
}

/** The store's operations without React — for a drop handler or a test. */
export declare function promptContextStore(scope?: string): Omit<PromptContext, 'items'> & {
    get: () => readonly PromptContextItem[];
};

declare interface ProposedField {
    name: string;
    sectionType: string;
    required: boolean;
}

export declare function Prose({ children, size, tone, className, 'data-testid': testId, }: ProseProps): JSX.Element;

export declare interface ProseProps {
    children: ReactNode;
    /**
     * `'sm'` for a dense side panel (a docs tab, inline help next to a form);
     * `'md'` for a standalone reading surface. Default `'md'`.
     */
    size?: ProseSize;
    /**
     * Tints headings and links with a semantic tone instead of the neutral
     * text tokens — a "what's new" callout, a deprecation notice. Body text
     * stays `text-text-primary` either way. Default: untinted (headings
     * `text-text-primary`, links `text-primary`).
     */
    tone?: ToneOrAlias;
    className?: string;
    'data-testid'?: string;
}

export declare type ProseSize = 'sm' | 'md';

declare interface PublicProfile {
    userId: string;
    displayName: string;
    avatarUrl?: string;
    visibility: 'public' | 'private';
}

/**
 * Purge (permanently delete) one or more DLQ entries.
 */
export declare function purgeDLQEntries(ids: string[], options?: {
    preview?: boolean;
}): Promise<DLQPurgeResponse>;

/** A jigsaw piece: something that plugs in — a capability, an optional part. */
export declare function PuzzleIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function QrCodeDisplay({ value, size, label }: QrCodeDisplayProps): JSX.Element;

export declare interface QrCodeDisplayProps {
    value: string;
    size?: number;
    label?: string;
}

export declare interface QuickPrompt {
    label: string;
    hint?: string;
}

/**
 * Empty-state grid of prompt suggestion cards. Each card is a button calling
 * `onSelect(label)`.
 */
export declare function QuickPromptGrid({ prompts, onSelect, columns, title, className, }: QuickPromptGridProps): JSX.Element;

export declare interface QuickPromptGridProps {
    prompts: QuickPrompt[];
    onSelect: (label: string) => void;
    /** default auto-fit (responsive 220px min column width) */
    columns?: number;
    /** optional heading above, e.g. "Try asking:" */
    title?: string;
    className?: string;
}

export declare function QuoteBlock({ quote, onJump, onDismiss, className, 'data-testid': testId, }: QuoteBlockProps): JSX.Element;

export declare interface QuoteBlockProps {
    quote: QuotedMessage;
    /** Jumps to the original. Omit when the original is unreachable (deleted,
     *  or outside a window this client cannot load) — the quote then reads as
     *  what it is, a record of something said, rather than a dead control. */
    onJump?: (messageId: string) => void;
    /** Removes the quote — only meaningful in the composer. */
    onDismiss?: () => void;
    className?: string;
    'data-testid'?: string;
}

export declare interface QuotedMessage {
    messageId: string;
    author: string;
    /** ISO timestamp of the quoted message. */
    timestamp?: string;
    /** Plain text of the original. Trimmed for display; the full text is not needed. */
    text: string;
}

/** A pair of quotation marks: a quoted passage — a blockquote. */
export declare function QuoteIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function RadioGroup<T extends string = string>({ name, value, onChange, options, disabled, orientation, 'data-testid': testId, }: RadioGroupProps<T>): JSX.Element;

export declare interface RadioGroupProps<T extends string = string> {
    /** Used as the HTML radio group name and as a stable ID base for labels. */
    name: string;
    value: T;
    onChange: (value: T) => void;
    options: RadioOption<T>[];
    disabled?: boolean;
    /** @default 'vertical' */
    orientation?: 'vertical' | 'horizontal';
    'data-testid'?: string;
}

export declare interface RadioOption<T extends string = string> {
    value: T;
    label: string;
    /** Short caption rendered below the label in muted text. */
    description?: string;
}

export declare function RailLayout({ children, rail, railWidth, className, 'data-testid': testId }: RailLayoutProps): JSX.Element;

export declare interface RailLayoutProps {
    /** The main column. */
    children: ReactNode;
    /** The context rail. Compose with <RailSection>. */
    rail: ReactNode;
    /** Rail width at lg+. Default 'md' (300px). */
    railWidth?: 'sm' | 'md' | 'lg';
    className?: string;
    'data-testid'?: string;
}

/** One titled block in the rail. Sections divide themselves. */
export declare function RailSection({ title, children, className }: RailSectionProps): JSX.Element;

export declare interface RailSectionAction {
    /** The accessible name and the tooltip — "Create a channel", not "+". */
    label: string;
    /** Defaults to a plus. */
    icon?: ReactNode;
    /** Receives the button itself, so an anchored popover can point at it. */
    onClick: (trigger: HTMLElement) => void;
    'data-testid'?: string;
}

export declare function RailSectionHeader({ label, actions, presentational, collapsed, onToggleCollapse, controls, toggleId, collapsedCount, count, dark, className, 'data-testid': testId, }: RailSectionHeaderProps): JSX.Element;

export declare interface RailSectionHeaderProps {
    label: string;
    /** Right-aligned, in order. Usually one +. */
    actions?: readonly RailSectionAction[];
    /**
     * The heading names the list that follows, and that list already carries
     * the same name — announcing both is the label twice. Sections whose list
     * is NOT separately named should pass false.
     *
     * Ignored once the header is a disclosure: the label is then the control's
     * own name, and a control that is `aria-hidden` cannot be reached or
     * announced at all. See `toggleId` for how the name stays said once.
     */
    presentational?: boolean;
    /**
     * Given together with `onToggleCollapse`, the whole label becomes the
     * disclosure control — a target the width of the heading, the way Teams and
     * Slack fold their rail sections, rather than a 12px chevron people miss.
     *
     * Controlled on purpose. Collapsing a section is a preference, not a
     * transient: the host owns the state so it can persist it and have the rail
     * come back the way it was left.
     */
    collapsed?: boolean;
    /** Fires with the state the host should switch to. */
    onToggleCollapse?: (next: boolean) => void;
    /** Id of the region this header folds away, for `aria-controls`. */
    controls?: string;
    /**
     * Put on the disclosure button itself, so the region it controls can point
     * an `aria-labelledby` back at it instead of repeating the same word in its
     * own `aria-label`. That is what keeps the name said once now that
     * `presentational` can no longer hide the heading.
     */
    toggleId?: string;
    /**
     * Unread hiding under a collapsed section — rendered only while collapsed.
     *
     * Collapsing is only safe to reach for if the rail still tells you when
     * something arrived in what you folded away; without it, hiding a section is
     * the same as muting it by accident.
     */
    collapsedCount?: number;
    /**
     * How many things the section holds — "GUIDES & FINDINGS  11". A small
     * rounded bordered pill (the sub-nav's count shape, since 2.389.4; a soft
     * neutral chip before) at the right end of the heading, before any actions, shown whenever
     * a number is given (0 included) and whatever the collapsed state. Unlike
     * `collapsedCount` it is a size, not an alert. Since 2.389.0.
     */
    count?: number;
    /** Light-on-dark, for a rail sitting on call chrome. */
    dark?: boolean;
    className?: string;
    'data-testid'?: string;
}

export declare interface RailSectionProps {
    title: string;
    children: ReactNode;
    className?: string;
}

/**
 * What the rail currently points at. One value, because one pane.
 */
export declare type RailSelection = {
    kind: 'shelf';
    id: string;
} | {
    kind: 'conversation';
    channel: string;
};

/** Two native keyboard-operable handles on one track, with stable tab order. */
export declare function RangeSlider({ value, min, max, step, minDistance, labels, formatValue, onChange, className }: RangeSliderProps): JSX.Element;

export declare interface RangeSliderProps {
    value: readonly [number, number];
    min: number;
    max: number;
    step?: number;
    minDistance?: number;
    labels: readonly [string, string];
    formatValue?: (value: number) => string;
    onChange: (value: [number, number]) => void;
    className?: string;
}

/** Longest-path rank from the roots; cycles fall back to column 0. Exported for tests. */
export declare function rankTypedNodes(nodes: Pick<TypedCanvasNode, 'id' | 'rank'>[], edges: Pick<TypedCanvasEdge, 'from' | 'to'>[]): Map<string, number>;

export declare interface RateInfo {
    [key: string]: unknown;
}

export declare const rawBorderRadius: {
    readonly sm: 4;
    readonly md: 6;
    readonly lg: 8;
    readonly xl: 12;
    readonly full: 9999;
};

export declare const rawColors: {
    readonly primary: "#3b82f6";
    readonly primaryDark: "#1d4ed8";
    readonly primaryLight: "#93c5fd";
    readonly danger: "#dc2626";
    readonly dangerLight: "#fca5a5";
    readonly success: "#10b981";
    readonly successLight: "#6ee7b7";
    readonly warning: "#f59e0b";
    readonly warningLight: "#fcd34d";
    readonly info: "#0ea5e9";
    readonly infoLight: "#7dd3fc";
    readonly textPrimary: "#1e293b";
    readonly textSecondary: "#64748b";
    readonly textMuted: "#94a3b8";
    readonly textInverse: "#ffffff";
    readonly border: "#e2e8f0";
    readonly borderLight: "#f1f5f9";
    readonly background: "#f8fafc";
    readonly surface: "#ffffff";
    readonly surfaceRaised: "#ffffff";
    readonly surfaceOverlay: "rgba(15, 23, 42, 0.5)";
};

export declare const rawFontSize: {
    readonly xs: 11;
    readonly sm: 13;
    readonly md: 14;
    readonly lg: 16;
    readonly xl: 22;
};

export declare const rawSpacing: {
    readonly xs: 4;
    readonly sm: 8;
    readonly md: 16;
    readonly lg: 24;
    readonly xl: 32;
};

export declare const rawTokens: {
    readonly colors: {
        readonly primary: "#3b82f6";
        readonly primaryDark: "#1d4ed8";
        readonly primaryLight: "#93c5fd";
        readonly danger: "#dc2626";
        readonly dangerLight: "#fca5a5";
        readonly success: "#10b981";
        readonly successLight: "#6ee7b7";
        readonly warning: "#f59e0b";
        readonly warningLight: "#fcd34d";
        readonly info: "#0ea5e9";
        readonly infoLight: "#7dd3fc";
        readonly textPrimary: "#1e293b";
        readonly textSecondary: "#64748b";
        readonly textMuted: "#94a3b8";
        readonly textInverse: "#ffffff";
        readonly border: "#e2e8f0";
        readonly borderLight: "#f1f5f9";
        readonly background: "#f8fafc";
        readonly surface: "#ffffff";
        readonly surfaceRaised: "#ffffff";
        readonly surfaceOverlay: "rgba(15, 23, 42, 0.5)";
    };
    readonly spacing: {
        readonly xs: 4;
        readonly sm: 8;
        readonly md: 16;
        readonly lg: 24;
        readonly xl: 32;
    };
    readonly fontSize: {
        readonly xs: 11;
        readonly sm: 13;
        readonly md: 14;
        readonly lg: 16;
        readonly xl: 22;
    };
    readonly borderRadius: {
        readonly sm: 4;
        readonly md: 6;
        readonly lg: 8;
        readonly xl: 12;
        readonly full: 9999;
    };
};

export declare interface Reaction {
    id: string;
    emoji: string;
    userId?: string;
    displayName?: string;
}

export declare function ReactionChips({ reactions, currentUserId, onToggle, className, 'data-testid': testId, }: ReactionChipsProps): JSX.Element | null;

export declare interface ReactionChipsProps {
    reactions: readonly MessageReaction[];
    /** The viewer, so their own reactions can be marked and toggled. */
    currentUserId: string;
    onToggle: (emoji: string) => void;
    className?: string;
    'data-testid'?: string;
}

/** Testid-safe name for a reaction emoji: 'heart', 'thumbs-up', … for the
 *  default set, hyphen-joined hex codepoints for anything else. Exported so
 *  consumers can build `reaction-option-${reactionEmojiName(e)}` selectors. */
export declare function reactionEmojiName(emoji: string): string;

export declare interface ReactionGroup {
    emoji: string;
    count: number;
    mine: boolean;
    names: string[];
}

export declare function ReactionOverlay({ reactions, className, style }: ReactionOverlayProps): JSX.Element;

export declare interface ReactionOverlayProps {
    reactions: Reaction[];
    /**
     * Positioning / sizing classes from the caller. Prefer this over `style`:
     * the overlay is `absolute inset-0` by default, and callers wanting to
     * scope it to a sub-region had no seam but an inline style (banned in
     * demos and stories). Composed through `cn()`, so a caller class wins.
     */
    className?: string;
    /** @deprecated Use `className`. Kept so existing callers keep compiling. */
    style?: CSSProperties;
}

export declare function ReactionPicker({ onReact, emojis, className, style }: ReactionPickerProps): JSX.Element;

/**
 * Icon trigger + popover pairing of ReactionPicker, sized to sit in a call
 * control row next to CallControls' 36px round buttons.
 *
 * The popover is positioned `absolute` against the wrapper — NEVER
 * `position: fixed` — because CallWidget applies a CSS transform to its
 * root, which makes transformed ancestors the containing block for fixed
 * children. Absolute-in-relative keeps the popover anchored to the button
 * in both the docked and expanded layouts.
 */
export declare function ReactionPickerButton({ onReact, emojis, closeOnReact, align, disabled, className, }: ReactionPickerButtonProps): JSX.Element;

export declare interface ReactionPickerButtonProps {
    onReact: (emoji: string) => void;
    emojis?: string[];
    /** Close the popover after an emoji is picked. Default true. */
    closeOnReact?: boolean;
    /** Horizontal anchoring of the popover relative to the trigger. Default
     *  'center'. Use 'right' when the button sits near the widget's right
     *  edge (docked CallWidget) so the row doesn't overflow the clip rect. */
    align?: 'center' | 'left' | 'right';
    /** Dims the trigger and blocks opening — e.g. while the send path
     *  is unavailable. */
    disabled?: boolean;
    className?: string;
}

export declare function ReactionPickerPopover({ open, onSelect, onClose, triggerRef, emojis, showSearch, className, style, }: ReactionPickerPopoverProps): JSX.Element | null;

export declare interface ReactionPickerPopoverProps {
    /** Controls visibility. */
    open: boolean;
    /** Fires with the chosen emoji. */
    onSelect: (emoji: string) => void;
    /** Fires when the popover should close (Escape, click outside, select). */
    onClose: () => void;
    /**
     * Trigger element to anchor against. When provided, the popover positions
     * itself above the trigger; otherwise it falls back to absolute centering
     * at top:auto/left:0 (useful inside a relatively-positioned container).
     */
    triggerRef?: RefObject<HTMLElement | null>;
    /** Override the emoji list. Defaults to 64. */
    emojis?: readonly string[];
    /** Render a search input above the grid. Defaults to true. */
    showSearch?: boolean;
    className?: string;
    style?: CSSProperties;
}

export declare interface ReactionPickerProps {
    onReact: (emoji: string) => void;
    emojis?: string[];
    /**
     * Positioning / spacing classes from the caller. Prefer this over `style`:
     * the picker is usually floated over a call stage, which previously
     * required an inline style (banned in demos and stories). Composed
     * through `cn()`, so a caller class wins.
     */
    className?: string;
    /** @deprecated Use `className`. Kept so existing callers keep compiling. */
    style?: CSSProperties;
}

export declare function ReactionsBar({ reactions, onReact, disabled, pickerEmojis, addTriggerLabel, hideAddTrigger, className, }: ReactionsBarProps): JSX.Element;

export declare interface ReactionsBarProps {
    reactions: ReactionSummary[];
    /**
     * Called when the viewer clicks a chip (toggle) OR picks an emoji from
     * the popover. The consumer decides whether this is an add or a remove
     * based on the `mine` flag of the matching chip.
     */
    onReact: (emoji: string) => void;
    /**
     * Disables both the chips and the add-reaction trigger (e.g. when the
     * connection is not 'connected'). Defaults to false.
     */
    disabled?: boolean;
    /**
     * Override the popover emoji set. Defaults to the 64-emoji 8x8 grid.
     */
    pickerEmojis?: readonly string[];
    /** Override the add-reaction trigger label. Defaults to a "+" plus emoji. */
    addTriggerLabel?: ReactNode;
    /** Hide the add-reaction trigger entirely (read-only mode). */
    hideAddTrigger?: boolean;
    className?: string;
}

export declare interface ReactionSummary {
    emoji: string;
    count: number;
    /** True if the local viewer is one of the reactors. */
    mine?: boolean;
}

/**
 * The text colour that reads on `background`, or `null` when the background
 * can't be parsed. The 0.6 cut is where white-on-fill stops clearing 4.5:1
 * for the palette's own colours; above it, dark text wins.
 */
export declare function readableAvatarForeground(background: string): string | null;

export declare function readDocumentIdFromUrl(): string | null;

/** The items a drop carried, cleaned; [] for any other drop. */
export declare function readPromptContextDrag(dataTransfer: DataTransfer | null | undefined): PromptContextItem[];

export declare function ReconnectingBanner({ show, label }: ReconnectingBannerProps): JSX.Element | null;

export declare interface ReconnectingBannerProps {
    show: boolean;
    /** Optional label override. Default: "Reconnecting…". */
    label?: string;
}

export declare const RECORDING_CHIP_TITLES: {
    readonly active: "Recording — saved to /recordings when the call ends";
    readonly armed: "Recording armed — will start once the call is under way";
};

export declare function RecordingActivityCard({ recordingId, title, recordedBy, participants, participantCount, startedAt, durationMs, thumbnailUrl, stage, transcriptReady, summaryReady, expiresAt, pinned, onOpen, onCopyLink, onShare, onTogglePin, onDownload, onOpenTranscript, onManageExpiry, onParticipantClick, className, 'data-testid': testId, }: RecordingActivityCardProps): JSX.Element;

export declare interface RecordingActivityCardProps {
    recordingId: string;
    /** "Recording" unless the host names it — "Design review", say. */
    title?: string;
    /** Who the recording is by — the person who started the call. */
    recordedBy?: string;
    /** Who was in the call. Real people: names and avatars, not counts. */
    participants?: readonly RecordingParticipant[];
    /** When the list is a sample: the true headcount. */
    participantCount?: number;
    /** ISO. When it was recorded. */
    startedAt?: string;
    durationMs?: number;
    /** The recording's own thumbnail. Absent, the participants stand in as tiles. */
    thumbnailUrl?: string;
    stage?: RecordingStage;
    transcriptReady?: boolean;
    summaryReady?: boolean;
    /** ISO. The "Set to expire" line. */
    expiresAt?: string;
    /** Pinned in the conversation. */
    pinned?: boolean;
    /** Opens the recording (its page or player). Absent, the card is a record, not a button. */
    onOpen?: (recordingId: string) => void;
    onCopyLink?: (recordingId: string) => void;
    /** Mints a share link (who it works for is the host's business). */
    onShare?: (recordingId: string) => void;
    onTogglePin?: (recordingId: string) => void;
    onDownload?: (recordingId: string) => void;
    onOpenTranscript?: (recordingId: string) => void;
    /** "View or change" on the expiry line. */
    onManageExpiry?: (recordingId: string) => void;
    onParticipantClick?: (participantId: string) => void;
    className?: string;
    'data-testid'?: string;
}

/**
 * What a recording card knows. The chat message stamps what was true when
 * it was posted (`recordingRefFromMetadata`); the host's `recordingStatus`
 * overlays what is true now — the stage, the thumbnail once composed, the
 * expiry — the way `agentRunStatus` does for run cards.
 */
export declare interface RecordingCardStatus {
    stage?: RecordingStage;
    title?: string;
    recordedBy?: string;
    startedAt?: string;
    durationMs?: number;
    thumbnailUrl?: string;
    participants?: readonly RecordingParticipant[];
    participantCount?: number;
    transcriptReady?: boolean;
    summaryReady?: boolean;
    expiresAt?: string;
}

export declare function RecordingChip({ armed, active, titles, className, 'data-testid': testId, }: RecordingChipProps): JSX.Element | null;

export declare interface RecordingChipProps extends RecordingChipState {
    /** Overrides the default hover copy for each state. */
    titles?: Partial<Record<'armed' | 'active', string>>;
    className?: string;
    'data-testid'?: string;
}

export declare interface RecordingChipState {
    /** Recording is on for this call — it will record, or is recording. */
    armed: boolean;
    /** Bytes are being written right now. Implies armed. */
    active: boolean;
}

export declare type RecordingExpiryChoice = '30d' | '90d' | '365d' | 'never' | 'custom';

export declare function RecordingExpiryDialog({ open, expiresAt, onSave, onClose, title, 'data-testid': testId, }: RecordingExpiryDialogProps): JSX.Element;

export declare interface RecordingExpiryDialogProps {
    open: boolean;
    /** ISO, or null when the recording does not expire. */
    expiresAt: string | null | undefined;
    /** Resolves when the server has the new value; rejects with a reason to show. */
    onSave: (expiresAt: string | null) => Promise<void> | void;
    onClose: () => void;
    title?: string;
    'data-testid'?: string;
}

export declare function RecordingList({ recordings, selectedId, onSelect, loading, emptyState, renderActions, className, }: RecordingListProps): JSX.Element;

export declare interface RecordingListItem {
    id: string;
    startIso: string;
    endIso: string;
    durationSec: number;
    participantCount?: number;
    thumbnailUrl?: string;
    /** Optional human label — e.g. "Hank & Alice" or "Global hangout". */
    label?: string;
    /** Defaults to 'ready'. Forwarded to RecordingRow. */
    status?: RecordingStatus;
}

export declare interface RecordingListProps {
    recordings: RecordingListItem[];
    selectedId?: string;
    onSelect: (id: string) => void;
    loading?: boolean;
    emptyState?: ReactNode;
    /** Render a per-row actions slot (e.g. download/share buttons). */
    renderActions?: (item: RecordingListItem) => ReactNode;
    className?: string;
}

export declare interface RecordingParticipant {
    id: string;
    name: string;
    avatarUrl?: string;
    color?: string;
}

export declare function RecordingPlayer({ playlistUrl, poster, autoPlay, muted, onLoadedMetadata, onTimeUpdate, onError, hideDownload, className, }: RecordingPlayerProps): JSX.Element;

export declare interface RecordingPlayerProps {
    playlistUrl: string | null;
    poster?: string;
    autoPlay?: boolean;
    muted?: boolean;
    onLoadedMetadata?: (durationSec: number) => void;
    onTimeUpdate?: (currentTime: number, duration: number) => void;
    onError?: (err: Error) => void;
    /** Hide the download button (private channels). Default false. */
    hideDownload?: boolean;
    className?: string;
}

/**
 * A recording card: `metadata.kind === 'recording'` with the recording's id.
 * Posted by the recording pipeline the moment the recording is saved.
 */
export declare function recordingRefFromMetadata(metadata: Record<string, unknown> | undefined): (RecordingCardStatus & {
    recordingId: string;
    callId?: string;
    stage: RecordingStage;
}) | null;

export declare function RecordingRow({ id, startIso, durationSec, participantCount, thumbnailUrl, label, status, selected, onClick, actions, className, }: RecordingRowProps): JSX.Element;

export declare interface RecordingRowProps {
    id: string;
    startIso: string;
    endIso?: string;
    durationSec: number;
    participantCount?: number;
    thumbnailUrl?: string;
    /** Optional human label — e.g. "Hank & Alice" or "Global hangout". */
    label?: string;
    /** Defaults to 'ready'. 'processing' shows a spinner badge; 'failed' shows an error badge. */
    status?: RecordingStatus;
    selected?: boolean;
    onClick?: (id: string) => void;
    /** Slot rendered in the row footer (e.g. a download or share button). */
    actions?: ReactNode;
    className?: string;
}

/** Where the recording is on its way to being watchable. */
/** `gone`: the recording no longer exists — expired or removed — so the card is the record of a thing that was. */
export declare type RecordingStage = 'saving' | 'transcribing' | 'summarizing' | 'ready' | 'failed' | 'gone';

export declare type RecordingStatus = 'ready' | 'processing' | 'failed';

/** A curved arrow forward: "redo". Since 2.386.5. */
export declare function RedoIcon({ size, ...rest }: GlyphProps): JSX.Element;

/**
 * Redrive one or more DLQ entries (re-publish them to the event bus).
 */
export declare function redriveDLQEntries(ids: string[], options?: {
    resetAttempts?: boolean;
    preview?: boolean;
}): Promise<DLQRedriveResponse>;

export declare function registerFieldType(def: FieldTypeDefinition): void;

/**
 * @deprecated The (sectionType × viewMode) renderer registry only serves the
 * legacy SECTIONED document editor (`SectionBlock`), which is deprecated
 * (2026-09-22). Pages render document-type fields as `macro:field` blocks in
 * `CanvasDocumentView`. The field-type registry above is NOT deprecated —
 * document types and their page field macros still use it.
 */
export declare function registerRenderer(sectionType: string, viewMode: ViewMode | '*', component: SectionRenderer): void;

declare interface RemoteCursor {
    clientId: string;
    position: Record<string, unknown>;
    metadata: Record<string, unknown>;
}

export declare function RemoteTileSlot({ stream, displayName, cameraOn, avatarSize, }: RemoteTileSlotProps): JSX.Element;

export declare interface RemoteTileSlotProps {
    stream: MediaStream | undefined;
    displayName: string;
    /** Camera enabled by sender. False → show avatar even if a stream exists. */
    cameraOn: boolean;
    /** Avatar size when fallback renders. Default 96. */
    avatarSize?: number;
}

/** Drop a slide. The last slide cannot be removed — a deck of none is not a deck. */
export declare function removeSlide(spec: DeckSpec, id: string): DeckSpec;

/** Two arrows chasing each other: something that runs again — a loop, a re-run. */
export declare function RepeatIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** Replace one slide by id. Returns the same spec object when nothing matched. */
export declare function replaceSlide(spec: DeckSpec, slide: DeckSlide): DeckSpec;

/** A hooked arrow pointing back: reply. ForwardIcon's mirror, because the two
 *  are the same gesture pointed different ways. */
export declare function ReplyIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** Tests: forget every scope's in-memory copy (storage is left alone). */
export declare function resetPromptContextStores(): void;

export declare type ResizeFit = 'cover' | 'contain' | 'fill' | 'inside' | 'outside';

/** Top-left corner a panel of `width`×`height` occupies at `anchor`. */
export declare function resolveAnchorPosition(anchor: FloatingPanelAnchor, width: number, height: number): {
    x: number;
    y: number;
};

/**
 * Resolve `tone` for a surface mounted at `el`. Pure apart from the DOM read and
 * the media query, so it is the thing the tests pin.
 */
export declare function resolveBackdropTone(tone: BackdropTone, el: Element | null, prefersDark?: boolean): ResolvedBackdropTone;

/** A tone after `auto` has been decided. */
export declare type ResolvedBackdropTone = Exclude<BackdropTone, 'auto'>;

/** What a choice means as an instant: end of that day in local time. */
export declare function resolveExpiryChoice(choice: RecordingExpiryChoice, customDate: string, now?: number): string | null | undefined;

export declare interface ResolveVerdictInput {
    verdict?: ChangeReviewVerdict | undefined;
    status?: ChangeReviewStatus | undefined;
    /**
     * The revision of the change as it stands NOW. When this and the verdict's
     * `forRevision` disagree, the verdict describes a change that no longer
     * exists in that form.
     */
    revision?: string | undefined;
}

/**
 * Decide which of the five states to paint.
 *
 * The staleness rule is the reason this function exists. A cached "Pass"
 * computed against an earlier draft of a change is not a weaker Pass — it is a
 * statement about a different change, and showing it as a live Pass is how a
 * reviewer approves something no agent ever looked at. So the comparison is
 * exact-match on `forRevision`, and any disagreement demotes to `stale`.
 *
 * `pending` outranks `stale`: if a fresh review is already in flight, "checking
 * this now" is more useful than "the old answer is out of date", and the
 * pending state does not show the old verdict's colour either way.
 *
 * A missing `revision` means the host cannot tell us what the change's current
 * revision is. We do NOT silently treat that as fresh — but we also cannot call
 * it stale without evidence, so it renders `ready`. Hosts that care about
 * staleness must pass `revision`; that is documented on every consumer prop.
 */
export declare function resolveVerdictState({ verdict, status, revision, }: ResolveVerdictInput): VerdictState;

export declare function ResumeCallDialog({ open, onClose, onReconnect, callerName, lobbyName, elapsedMs, participants, loading, }: ResumeCallDialogProps): JSX.Element;

export declare interface ResumeCallDialogProps {
    /** Visibility — when false the modal is unmounted entirely. */
    open: boolean;
    /** Backdrop click / Esc / Dismiss button → caller decides whether to
     *  hide (typically yes) and whether to remember the dismissal. */
    onClose: () => void;
    /** Reconnect button. May be async; the dialog spins while pending
     *  IF `loading` is also true (the caller controls that state). */
    onReconnect: () => void | Promise<void>;
    /** Display name of the user who originally started the call. Pass
     *  safeDisplayName output — must never be a raw UUID. */
    callerName: string;
    /** Human-readable lobby name shown in the dialog subtitle. */
    lobbyName: string;
    /** Elapsed ms at MOUNT time. The dialog re-derives the displayed
     *  duration from a per-second tick so the parent never has to re-
     *  render to advance the clock. Pass `Date.now() - call.startedAtMs`
     *  (or just `call.durationMs` from the API). */
    elapsedMs: number;
    /** Other participants currently in the call (excludes self). When
     *  empty the dialog still renders — the prompt becomes
     *  "you were in a call" with no chip row — but the parent should
     *  generally not show the dialog with zero participants (see
     *  useActiveCallResume's filter). */
    participants: ResumeCallParticipant[];
    /** True while a reconnect attempt is in flight. Disables the buttons
     *  and replaces the Reconnect label with "Reconnecting…". */
    loading?: boolean;
}

/** Resume-dialog participant shape. Independent of any hangout-internal
 *  type so callers can pass thin {id,name} objects without dragging in
 *  PresenceUser / SfuParticipant. */
export declare interface ResumeCallParticipant {
    /** Stable identifier — used as React key + safeDisplayName fallback. */
    userId: string;
    /** Pre-resolved display name. Caller MUST pass safeDisplayName output
     *  so a raw UUID never reaches the dialog. */
    name: string;
    /** Optional avatar URL — Avatar falls back to initials when absent. */
    avatarUrl?: string;
}

export declare function resumeFromStep(pipelineId: string, runId: string, fromNodeId: string, options?: ResumeFromStepOptions): Promise<ResumeFromStepResponse>;

/** A single resume-from-step entry on a PipelineRun (hub#2223). */
export declare interface ResumeFromStepEntry {
    fromNodeId: string;
    /** The step that originally failed when this resumption was triggered, if known. */
    originalFailedStepId?: string;
    at: string;
}

export declare interface ResumeFromStepOptions {
    /** When true, allow resuming a `succeeded`/`done` run for diagnostic re-execution. */
    allowCompleted?: boolean;
    /** Optional list of node ids to break on during the resumed dispatch loop. */
    breakpoints?: string[];
}

export declare interface ResumeFromStepResponse {
    runId: string;
    fromNodeId: string;
    /** The stepId that originally failed, when surfaceable. */
    originalFailedStepId?: string;
    /** Monotonic count of `resumeFromStep` invocations on this run. */
    replayAttempts: number;
    at: string;
}

export declare function retryFromNode(pipelineId: string, runId: string, nodeId: string, inputs?: Record<string, unknown>, snapshotInput?: boolean): Promise<RetryFromNodeResponse>;

export declare interface RetryFromNodeResponse {
    newRunId: string;
    originalRunId: string;
    pipelineId: string;
    retryFromNodeId: string;
    skippedNodes: string[];
    at: string;
}

export declare interface RetryPolicy {
    maxAttempts: number;
    backoffMs: number;
    backoffMultiplier: number;
}

/**
 * Revert a previously-applied paused-context patch. Throws `PatchHttpError`
 * for non-204 (typically 409 once the run has resumed past the breakpoint).
 */
export declare function revertPatch(pipelineId: string, runId: string, stepId: string, patchId: string): Promise<void>;

export declare const REVIEW_KIND_LABELS: Record<string, string>;

export declare const REVIEW_KIND_TONES: Record<string, ToneOrAlias>;

export declare type ReviewAuthorKind = 'agent' | 'human';

export declare interface ReviewPostData {
    id: string;
    authorKind: ReviewAuthorKind;
    authorName: string;
    /** Post kind slug — e.g. 'problem' | 'question' | 'decision'. */
    kind: string;
    body: string;
    /** For 'question' posts: true once answered. An unresolved question is the
     *  thread's live HITL gate and renders highlighted with a composer. */
    resolved?: boolean;
    /** What the author produced — a browser screenshot, diagram, document. */
    artifact?: {
        name: string;
        type?: string;
        url?: string | null;
    } | null;
    /** Preformatted timestamp, e.g. "4d ago". */
    timeLabel?: string;
}

export declare function ReviewThread({ posts, onAnswer, answerBusy, answerPlaceholder, answerLabel, kindLabels, kindTones, emptyLabel, className, 'data-testid': testId, }: ReviewThreadProps): JSX.Element;

export declare interface ReviewThreadProps {
    posts: ReviewPostData[];
    /** Answer an open question. Omit to render read-only (terminal threads). */
    onAnswer?: (postId: string, body: string) => void;
    answerBusy?: boolean;
    answerPlaceholder?: string;
    /** The submit label — say what answering does, e.g. "Answer & continue". */
    answerLabel?: string;
    /** Merge/override the built-in kind vocabulary. */
    kindLabels?: Record<string, string>;
    kindTones?: Record<string, ToneOrAlias>;
    /** Shown when the thread has no posts yet. */
    emptyLabel?: string;
    className?: string;
    'data-testid'?: string;
}

export declare function RichTextEditorRenderer({ section, fragment, ydoc, provider, user, editable, onUpdateCursorInfo, extensions, editorComponent, }: SectionRendererProps): JSX.Element;

export declare const richTextFieldType: FieldTypeDefinition;

export declare function RichTextReaderRenderer({ section, fragment, ydoc, provider, onNavigateToEditor, extensions, editorComponent, }: SectionRendererProps): JSX.Element;

export declare function RippleGridBackground({ active, enableRainbow, gridColor, rippleIntensity, gridSize, gridThickness, fadeDistance, vignetteStrength, glowIntensity, opacity, edgeFade, gridRotation, mouseInteraction, mouseInteractionRadius, lightMode, pixelRatio, className, 'data-testid': testId, }: RippleGridBackgroundProps): JSX.Element;

export declare interface RippleGridBackgroundProps {
    /** False parks the loop on a static frame without tearing the context down. */
    active?: boolean;
    enableRainbow?: boolean;
    gridColor?: string;
    rippleIntensity?: number;
    gridSize?: number;
    gridThickness?: number;
    fadeDistance?: number;
    vignetteStrength?: number;
    glowIntensity?: number;
    opacity?: number;
    /**
     * How much of the edge fade (`fadeDistance` + `vignetteStrength`) to apply,
     * 0..1. At 1 (default, ReactBits' look) the grid fades to nothing at the
     * section's corners; at 0 it is drawn edge to edge at full strength. The
     * fade is measured against the SECTION — its corners are always where it
     * ends — so a wide or tall box gets the same soft edge as a square one
     * rather than an oval in the middle.
     */
    edgeFade?: number;
    /** Degrees. */
    gridRotation?: number;
    mouseInteraction?: boolean;
    mouseInteractionRadius?: number;
    /** Grid lines in `gridColor` on a light ground, rather than glowing on dark. */
    lightMode?: boolean;
    pixelRatio?: number;
    className?: string;
    'data-testid'?: string;
}

/**
 * Renders `children` over a rising star field while `active`, and over nothing
 * at all when not.
 *
 * The backdrop is `pointer-events: none` and sits BEHIND the children in an
 * isolated stacking context, so nothing above it changes position, size or
 * hit-testing when the state flips — a working surface and an idle one have
 * identical layout, which is what makes the transition a crossfade rather than
 * a reflow.
 */
export declare function RisingParticles({ active, intensity, seed, className, children, 'data-testid': testId, }: RisingParticlesProps): JSX.Element;

export declare type RisingParticlesIntensity = keyof typeof INTENSITY_SCALE;

export declare interface RisingParticlesProps {
    /** True while the thing behind this surface is working. */
    active: boolean;
    /**
     * How dense the sky is. `low` for a small pane where a full field reads as
     * noise; `high` for a surface that IS the working state.
     */
    intensity?: RisingParticlesIntensity;
    /**
     * The sky. The same seed is always the same sky, so a pane keeps its own
     * stars across re-renders and two panes side by side do not look cloned.
     */
    seed?: number;
    className?: string;
    children?: ReactNode;
    'data-testid'?: string;
}

export declare interface RoomItem {
    roomId: string;
    /** `room:<slug>` — a room's chat channel is its call lobby. */
    channelId: string;
    /** As sent by the API; `channelId` is derived from it when absent. */
    slug?: string;
    name: string;
    type: 'standalone' | 'group' | 'dm';
    ownerId: string;
    groupId?: string;
    dmPeerUserId?: string;
    createdAt: string;
}

export declare function RoomList({ idToken, rooms, createRoom, createDM, loading, error, onRetry, onRoomSelect, activeRoomId, compact }: RoomListProps): JSX.Element;

declare interface RoomListProps {
    idToken: string | null;
    rooms: RoomItem[];
    createRoom: (name: string) => Promise<void>;
    createDM: (peerId: string) => Promise<void>;
    loading: boolean;
    /** Inline-render an error + retry control instead of the empty state when set. */
    error?: string | null;
    onRetry?: () => void;
    onRoomSelect: (room: RoomItem) => void;
    activeRoomId?: string | null;
    compact?: boolean;
}

export declare interface RoomMemberItem {
    roomId: string;
    userId: string;
    displayName?: string;
    joinedAt: string;
}

export declare type RoomsOnMessageFn = (handler: (msg: GatewayMessage) => void) => () => void;

export declare function RosterPanel({ participants, activeSpeakerId, onParticipantClick, count, title, footer, tone, className, }: RosterPanelProps): JSX.Element;

export declare interface RosterPanelProps {
    participants: RosterParticipant[];
    activeSpeakerId?: string | null;
    /** Click handler per row — e.g. promote to spotlight. */
    onParticipantClick?: (id: string) => void;
    /** Total-participants count shown in header. Defaults to participants.length. */
    count?: number;
    /** Optional header — e.g. "In this call". Default "Participants". */
    title?: string;
    /** Optional footer — e.g. an "+ Add" button. */
    footer?: ReactNode;
    /** 'dark' renders on black call chrome (the shipped token palette is
     *  light-only, so the default is a white slab inside the dark call
     *  widget — 2026-08-25 audit P0-3). */
    tone?: 'light' | 'dark';
    className?: string;
}

export declare interface RosterParticipant {
    id: string;
    displayName: string;
    avatarUrl?: string;
    isMuted?: boolean;
    isLocal?: boolean;
    isScreenSharing?: boolean;
    handRaised?: boolean;
}

export declare function RovingToolbar({ label, children, orientation, className, 'data-testid': testId, }: RovingToolbarProps): default_2.JSX.Element;

export declare interface RovingToolbarProps {
    /** Accessible name — a toolbar without one is an unlabelled group. */
    label: string;
    children: ReactNode;
    /** Arrow keys that move. Vertical leaves Left/Right alone, and vice versa. */
    orientation?: 'horizontal' | 'vertical';
    className?: string;
    'data-testid'?: string;
}

/**
 * Header state labels. PLAN §1.6 names the draft states; the mockup's
 * "Not started" is not used because it is ambiguous between "no draft yet"
 * and "saved but not dispatched" — those are `no-draft` and `saved` here.
 */
export declare const RUN_DRAFT_STATUS_LABELS: Record<RunDraftStatus, string>;

export declare type RunDraftBudget = RunDraftTokenBudget | RunDraftUsdBudget;

export declare function RunDraftPanel({ status, collapsed: collapsedProp, defaultCollapsed, onCollapsedChange, target, sources, sourcesLabel, fields, cost, duration, confidence, budget, advanced, advancedLabel, access, onSave, saveDisabledReason, saving, onDispatch, dispatchDisabledReason, error, live, footnote, className, 'data-testid': testId, }: RunDraftPanelProps): JSX.Element;

export declare interface RunDraftPanelProps {
    status: RunDraftStatus;
    /** Controlled collapse. Omit to let the panel own it. */
    collapsed?: boolean;
    defaultCollapsed?: boolean;
    onCollapsedChange?: (collapsed: boolean) => void;
    /** The chosen workflow. `null` shows "No workflow chosen"; `undefined` shows nothing. */
    target?: RunDraftTarget | null;
    /** The documents the run will read. Empty, `null` or omitted → no section. Stays visible when `live` is shown. */
    sources?: readonly RunDraftSourceItem[] | null;
    /** Header for the sources list; default "Sources". */
    sourcesLabel?: string;
    fields?: RunDraftSelectField[];
    cost?: RunEstimate;
    duration?: RunEstimate;
    confidence?: RunEstimateConfidence | null;
    budget?: RunDraftBudget | null;
    advanced?: ReactNode;
    advancedLabel?: string;
    access?: AccessNoticeProps | null;
    onSave?: () => void;
    saveDisabledReason?: string;
    saving?: boolean;
    onDispatch?: () => void;
    dispatchDisabledReason?: string;
    /** Shown verbatim, e.g. the dispatch route's 403 message. */
    error?: string | null;
    /** After dispatch: the live run (an `AgentTaskCard`). Replaces the form body. */
    live?: ReactNode;
    /** Defaults to "Nothing runs until you authorize it."; pass `null` to hide. */
    footnote?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

export declare interface RunDraftSelectField {
    id: string;
    label: string;
    value: string;
    options: SelectOption[];
    onChange: (value: string) => void;
    /** Disables the select and says why (e.g. "This pipeline sets its own model"). */
    disabledReason?: string;
    placeholder?: string;
}

/** A document the run will read, shown as a chip under the target. */
export declare interface RunDraftSourceItem {
    id: string;
    /** What the viewer may see: the document title, or the host's "Restricted item" for one they cannot read. */
    title: string;
    /** A file-kind mark (e.g. <FileKindMark kind="page" size="sm" />); omit for a restricted item. */
    mark?: ReactNode;
    /** The viewer cannot read it: neutral styling, no link, no mark. */
    restricted?: boolean;
    /** Opens the source; absent (or restricted) → not interactive. */
    onOpen?: () => void;
}

export declare type RunDraftStatus = 'no-draft' | 'unsaved' | 'saved' | 'dispatching' | 'running' | 'completed' | 'failed' | 'stopped';

export declare interface RunDraftTarget {
    mark?: ReactNode;
    title: string;
    subtitle?: string;
}

export declare interface RunDraftTokenBudget {
    /** Omitted or `'tokens'`: a token budget. */
    unit?: 'tokens';
    /** The enforced token budget; `null` = none set. */
    tokens: number | null;
    onChange: (tokens: number | null) => void;
    /** Price used for the derived "≈ $x" line. Omit or `null` when unknown — the line is then not shown. */
    usdPerMillionTokens?: number | null;
    /** Names the price basis: "Haiku" → "at Haiku prices". */
    priceLabel?: string;
    disabledReason?: string;
}

/** A dollar cap the host enforces (e.g. "don't start the run if it is forecast over $x"). */
export declare interface RunDraftUsdBudget {
    unit: 'usd';
    /** The cap in dollars; `null` = none set. */
    usd: number | null;
    onChange: (usd: number | null) => void;
    /** What the cap does, in the host's words — "Not started if forecast above this". */
    hint?: string;
    disabledReason?: string;
}

export declare type RunEstimate = {
    kind: 'range';
    low: number;
    high: number;
    unit: RunEstimateUnit;
} | {
    kind: 'none';
    reason: string;
} | {
    kind: 'loading';
};

export declare interface RunEstimateConfidence {
    /** How many completed runs the estimate is based on. */
    sampleSize: number;
    /**
     * Where the range came from. `runs` (default) — measured history, so zero
     * runs means no estimate and the range is replaced by "No prior runs".
     * `prior` — a stated bracket the host stands behind without history (a
     * per-tier prior); the range is shown and marked low confidence.
     */
    basis?: 'runs' | 'prior';
}

export declare type RunEstimateConfidenceLevel = 'none' | 'low' | 'medium' | 'high';

export declare type RunEstimateUnit = 'usd' | 'ms';

export declare function RunPanelBody({ panel, api, options }: RunPanelBodyProps): ReactNode;

declare interface RunPanelBodyProps {
    panel: ChatSidePanelRef;
    api: ChatSidePanelApi;
    options: CreateRunPanelRendererOptions;
}

/** What the condensed panel shows. The host builds it from the run snapshot and the pipeline definition. */
export declare interface RunPanelData {
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

/** `<pipelineId>:<runId>` — the panel id for a run. */
export declare function runPanelId(pipelineId: string, runId: string): string;

/** The run's status, in the card's phase vocabulary (mirrors realtime-modules' `PipelineRunPhase`). */
export declare type RunPanelStatus = AgentRunPhase;

/**
 * The status vocabulary every UI comparison site keys off. Canonical — it
 * matches distributed-core's `RunStatus` and the backend's shared
 * `PipelineRunStatus`.
 *
 * Remaining gap: `interrupted` (platform-api's orphan scan / force-fail
 * outcome) is still not modelled here. It is spelled out on the wire union in
 * `pipeline-contracts.ts` instead, because it is a platform-api lifecycle
 * state the executor kernel never produces.
 */
export declare type RunStatus = 'pending' | 'running' | 'awaiting_approval' | 'paused_at_breakpoint' | 'completed'
/**
* Terminal: an approval gate on the run was rejected. Distinct from
* `completed` on purpose — a rejected run used to be listed as a success,
* which made approve and reject look identical in the Runs list.
*/
| 'rejected' | 'failed' | 'cancelled'
/**
* NOT terminal: the run is still open, it has just stopped reporting
* progress. `StuckRunDetector` in distributed-core watches every run in
* `running` / `awaiting_approval` and, after `intervalMs × stuckMultiplier`
* (30 s by default) with no `pipeline:step:heartbeat` and no
* `pipeline:llm:token`, publishes `pipeline:run:stuck` carrying the last
* heartbeat time (`StuckRunDetector.ts`, `scan()`). The kernel does not stop
* the run — it keeps executing and may still finish by itself — so this
* means "nobody has heard from this run", not "this run has ended".
* `PipelineRun.stuckAt` carries the timestamp.
*
* Terminal-ness matters here: the `completed` / `failed` / `cancelled` that
* eventually arrives has to be allowed to overwrite it, and a late heartbeat
* may simply resume progress. An operator who decides it will never recover
* uses force-fail, which moves the run to the platform-api-only
* `interrupted` state.
*
* NOTE for future editors: no straight quotes inside this comment. The
* `unionMembers` reader in `scripts/check-types-sync.mjs` scrapes quoted
* literals off the raw union text without stripping comments, so a quoted
* word here is read as a bogus `RunStatus` member. Backticks only.
*/
| 'stuck';

/** The condensed run, given its data. `createRunPanelRenderer` wraps it with loading, error and refresh. */
export declare function RunSummaryPanel({ data, onOpenFull, onOpenChat, onOpenDocument, onOpenResult, className, 'data-testid': testId }: RunSummaryPanelProps): JSX.Element;

export declare interface RunSummaryPanelProps {
    data: RunPanelData;
    onOpenFull: () => void;
    /** Offered only when the run knows its conversation. */
    onOpenChat?: () => void;
    onOpenDocument?: (documentId: string) => void;
    onOpenResult?: (result: AgentRunResult) => void;
    className?: string;
    'data-testid'?: string;
}

declare type SaveOutcome = {
    status: 'synced';
    type: DocumentType_2;
}
/** Server unreachable / 5xx — saved to the local cache, NOT on the server. */
| {
    status: 'offline';
    type: DocumentType_2;
    error: string;
}
/** Server rejected the payload (4xx) — NOTHING was saved. */
| {
    status: 'rejected';
    error: string;
};

export declare interface ScatterNodeData {
    type: 'scatter';
    /**
     * JSONPath into pipeline context that resolves to an array. Each element
     * becomes one scatter arm. E.g. `$.steps.visionAnalyze.output.regions`.
     */
    itemsPath: string;
    /**
     * Key written to each per-arm context (default: 'item'). Downstream nodes
     * read `$.scatter.<itemAlias>` to get the per-arm payload.
     */
    itemAlias?: string;
    /**
     * Maximum number of arms executing concurrently (default: 4). Guards
     * against saturating Anthropic rate limits or the Sharp thread pool.
     */
    maxConcurrency?: number;
}

export declare function ScopeHeader(props: ScopeHeaderProps): JSX.Element;

export declare interface ScopeHeaderPeopleGroup {
    /** "Owner". Rendered small and uppercase before the avatars. */
    label: string;
    people: PresenceAvatarUser[];
}

export declare interface ScopeHeaderProgress {
    done: number;
    total: number;
    /** The noun after the numbers. Default "points". */
    unit?: string;
    /** The verb. Default "delivered". */
    verb?: string;
}

export declare interface ScopeHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
    /**
     * The scope's name, drawn as the h1. Required in practice for the default
     * variant; optional (and not drawn) for `variant="crumbs"` since 2.389.0.
     */
    title?: string;
    /**
     * `default`: the full band — crumbs, an h1 title with status and stats, the
     * right-hand group, tabs.
     *
     * `crumbs` (since 2.389.0): a crumb line ONLY, for the top of a pane whose
     * record draws its own headline (an `EditorShell titleSize="lg"` below it,
     * in `ExplorerLayout.paneHeader`). Crumbs on the left; `controls`, `link`
     * and `menu` on the right, hung a little below the crumb line so they sit
     * between the crumb and the headline that follows. No h1 — title, status,
     * stats, people and tabs are not drawn.
     *
     * The controls overhang the band by 10px (since 2.389.4; 14px before), so
     * the band must sit over a pane whose own head starts with at least that
     * much top padding (an `EditorShell` header has 12px). `ExplorerLayout.paneHeader` spans only the pane since 2.389.4, so
     * the hang can never reach the aside.
     */
    variant?: 'default' | 'crumbs';
    /** The scope's own status — "In progress". */
    status?: {
        label: string;
        tone?: StatusPillTone;
    } | null;
    /** "18 / 52 points delivered". Not drawn when `total` is not above zero. */
    progress?: ScopeHeaderProgress | null;
    /** "$1.46 spent". Not drawn when absent or not a finite number. */
    spentUsd?: number | null;
    /** Further stats, already worded by the host. Falsy entries are skipped. */
    stats?: Array<ReactNode | null | undefined | false>;
    /** Labelled avatar groups — `[{ label: 'Owner', people }]`. Empty groups are dropped. */
    people?: ScopeHeaderPeopleGroup[];
    /** One link after the people ("the repository"). */
    link?: {
        label: string;
        href: string;
        icon?: ReactNode;
    } | null;
    /**
     * Since 2.388.0: controls the host owns (a repository selector), drawn in
     * the right-hand group just before the link.
     */
    controls?: ReactNode;
    /** The ⋯ menu. Omitted or empty — no button. */
    menu?: DropdownMenuSection[] | null;
    menuLabel?: string;
    tabs?: ScopeHeaderTab[];
    activeTab?: string;
    onTabChange?: (id: string) => void;
    /**
     * The h1's size. `md` (default) is the 22px band title; `lg` is the 28px
     * bold page title of a header that IS the page's heading (the Initiatives
     * overview). Since 2.390.0.
     */
    titleSize?: 'md' | 'lg';
    /**
     * A sentence under the title row — the scope's summary ("Collect
     * telemetry, reduce alert noise, and control retention costs."). Absent,
     * nothing is drawn. Since 2.390.0.
     */
    description?: ReactNode;
    /**
     * How `people` reads. `avatars` (default): labelled avatar groups in the
     * right-hand group. `names`: one line under the description, names then
     * the label — "Nora DaSilva · Owner   Layla Hassan, Eli Garcia · SMEs".
     * Since 2.390.0.
     */
    peopleStyle?: 'avatars' | 'names';
    /**
     * How `link` reads. `inline` (default): a primary text link with a leading
     * glyph, ruled off from the people. `button`: an outlined button — label
     * then ↗ (`ExternalLinkIcon`, or `link.icon`) — "Repository ↗". Since 2.390.0.
     */
    linkStyle?: 'inline' | 'button';
    /**
     * Where the stats line goes. `inline` (default): beside the title.
     * `below`: its own line under the title row, at 15px — the condensed
     * header over a work item ("18 / 52 points delivered · $1.73 spent").
     * Since 2.390.0.
     */
    statsPlacement?: 'inline' | 'below';
    className?: string;
    'data-testid'?: string;
}

export declare interface ScopeHeaderTab {
    id: string;
    label: string;
    /** Shown muted after the label. Absent or `undefined` shows none; `0` shows "0". */
    count?: number;
    disabled?: boolean;
    /** Since 2.388.0: a small dot after the label (and count). Absent or `false`-y draws none. */
    dot?: ScopeHeaderTabDot;
}

/**
 * A tab's attention dot. `true` is the brand dot ("something new"); a tone
 * says what kind of attention — "Activity •" when a tier is behind.
 */
export declare type ScopeHeaderTabDot = 'warning' | 'danger' | 'info' | true;

/**
 * Horizontal progress-bar gauge for 0..1 scores. Used by the judge
 * composites for per-criterion + overall scores, but generic enough to be
 * reused elsewhere (rate-limit budget, processing progress, etc.).
 *
 * a11y: rendered with `role="meter"`, `aria-valuenow / -valuemin / -valuemax`.
 */
export declare function ScoreBarGauge({ value, threshold, tone, size, showLabel, formatLabel, ariaLabel, className, }: ScoreBarGaugeProps): JSX.Element;

export declare interface ScoreBarGaugeProps {
    /** 0..1 value. Out-of-range inputs are clamped, NaN renders an empty gauge. */
    value: number;
    /** Threshold at which the gauge flips from "below threshold" tone to "above". 0..1, default 0.5. */
    threshold?: number;
    /** Override tone selection; otherwise derived from `value` vs `threshold`. */
    tone?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
    /** Default 'md'. */
    size?: 'sm' | 'md' | 'lg';
    /** Render the percentage label inline (right-aligned). Default true. */
    showLabel?: boolean;
    /** Custom label formatter — receives the clamped 0..1 value. Default: percent. */
    formatLabel?: (value: number) => string;
    /**
     * aria-label override. When omitted, the component synthesizes a label
     * from value + threshold + pass state.
     */
    ariaLabel?: string;
    className?: string;
}

export declare function ScreenShareIcon({ size, ...rest }: IconProps): JSX.Element;

export declare function ScreenShareOffIcon({ size, ...rest }: IconProps): JSX.Element;

/**
 * Cross-run audit search. At least one of `actor` / `pipelineId` is required;
 * the backend returns 400 otherwise.
 */
export declare function searchAudit(filters: SearchAuditFilters): Promise<AuditPage>;

export declare interface SearchAuditFilters extends AuditFilters {
    /** Either `actor` or `pipelineId` is required. */
    actor?: string;
    /** Either `actor` or `pipelineId` is required. */
    pipelineId?: string;
}

/**
 * Ranks shortcodes for a query.
 *
 * Prefix matches on the CODE come first: someone typing `:fi` means `fire`,
 * not `crossed_fingers` — a plain substring search buries the obvious answer
 * under coincidental matches, which is the difference between autocomplete
 * that feels instant and autocomplete you have to read.
 */
export declare function searchEmoji(query: string, list?: readonly EmojiShortcode[], limit?: number): EmojiShortcode[];

/**
 * A magnifier: "search", or "nothing matched what you typed".
 *
 * The same geometry `SearchInput` draws inline in its own gutter, lifted out
 * because the empty state that follows a fruitless search needs the mark too
 * and had been reaching for the 🔍 emoji — which ignores `currentColor` and so
 * stayed bright on muted chrome. Two copies of one circle-and-tail is a
 * drift the type system cannot see, so the field should adopt this next time
 * that file is opened.
 */
export declare function SearchIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function SearchInput({ value, onChange, placeholder, onClear, tone, className, inputClassName, size, onKeyDown, style, autoFocus, 'aria-label': ariaLabel, 'data-testid': testId, }: SearchInputProps): default_2.JSX.Element;

export declare interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    /** Called after the value is cleared via the clear button. */
    onClear?: () => void;
    /**
     * Colour family. `surface` (default) follows the host theme; `code` paints
     * in the permanently-dark terminal palette.
     *
     * This prop exists because `className` lands on the WRAPPER — the input is
     * a child, so no caller-supplied class could ever reach the field itself,
     * and a SearchInput dropped into a dark panel stayed a white box.
     */
    tone?: SearchInputTone;
    /** Class for the wrapper. Sizing and positioning; not the field's colours. */
    className?: string;
    /**
     * `sm` (default) is the 13px field. `md` (2.386.3) is the Documents
     * explorer's: a 36px field, 15px text and an 18px glass. `lg` (2.389.6) is
     * a page's primary search: a 44px field, 16px text, a 20px glass and a
     * larger clear ×.
     */
    size?: 'sm' | 'md' | 'lg';
    /** Keys on the field — e.g. ArrowDown into a result list. Since 2.389.6. */
    onKeyDown?: (event: default_2.KeyboardEvent<HTMLInputElement>) => void;
    /** Class for the `<input>` itself — the one `className` cannot reach. */
    inputClassName?: string;
    style?: default_2.CSSProperties;
    autoFocus?: boolean;
    'aria-label'?: string;
    /**
     * Addresses the `<input>` itself, not the wrapper.
     *
     * Without it a caller who needs to drive this field from a test had no way
     * to name it: `className` lands on the wrapper, and the accessible name is
     * the placeholder, which changes whenever the copy does. The app's document
     * list ended up wrapping SearchInput in a bare div purely to hang a testid
     * on it — a hand-rolled element around a library component, which is the
     * shape this library exists to remove.
     */
    'data-testid'?: string;
}

/** @see SurfaceTone — which colour family the field paints in. */
export declare type SearchInputTone = SurfaceTone;

export declare interface Section {
    id: string;
    type: 'summary' | 'tasks' | 'decisions' | 'notes' | 'custom';
    title: string;
    collapsed: boolean;
    items: TaskItem[];
    sectionType?: string;
    metadata?: Record<string, unknown>;
    placeholder?: string;
}

export declare type SectionEditorComponent = React.ComponentType<SectionEditorProps>;

/**
 * The contract a renderer needs from a collaborative rich-text editor — the
 * subset of `TiptapEditorProps` that the section renderers actually pass.
 *
 * It exists so `editorComponent` below can be typed without dragging in the
 * whole of the library's own editor. The library's `TiptapEditor` satisfies
 * it, and so does the editor a host already ships (realtime-modules'
 * `adapters/tiptap` export, for one).
 */
export declare interface SectionEditorProps {
    fragment: XmlFragment;
    ydoc: Y.Doc;
    provider: CollaborationProvider | null;
    user: {
        name: string;
        color: string;
    };
    editable?: boolean;
    placeholder?: string;
    sectionId?: string;
    onUpdateCursorInfo?: (name: string, color: string) => void;
    /** Extra Tiptap extensions appended to the editor's built-in set. */
    extensions?: readonly unknown[];
}

export declare function SectionLabel({ children, as: As, case: textCase, className, 'data-testid': testId, }: SectionLabelProps): JSX.Element;

/**
 * `upper` — the 10px bold uppercase panel caption (default, unchanged).
 * `sentence` — a 12px medium sentence-case caption at normal tracking, sized
 * and weighted to match `FormField`'s own label so it sits level with the
 * other labels in a config form.
 */
declare type SectionLabelCase = 'upper' | 'sentence';

export declare interface SectionLabelProps {
    children: ReactNode;
    /** Letter case and weight. See `SectionLabelCase`. Default `upper`. */
    case?: SectionLabelCase;
    /**
     * The element to render. Defaults to `span` so it can sit inline beside a
     * count or a chip; pass `"div"` when the caption owns its own line.
     */
    as?: ElementType;
    className?: string;
    'data-testid'?: string;
}

export declare type SectionRenderer = React.ComponentType<SectionRendererProps>;

export declare interface SectionRendererProps {
    section: Section;
    viewMode: ViewMode;
    editable: boolean;
    fragment?: XmlFragment | null;
    ydoc?: Y.Doc | null;
    provider?: CollaborationProvider | null;
    user?: {
        name: string;
        color: string;
    };
    onUpdateSection?: (patch: Partial<Section>) => void;
    onAddItem?: (item: Omit<TaskItem, 'id'>) => void;
    onUpdateItem?: (itemId: string, patch: Partial<TaskItem>) => void;
    onRemoveItem?: (itemId: string) => void;
    participants?: Participant[];
    onUpdateCursorInfo?: (name: string, color: string) => void;
    comments?: CommentThread[];
    commentCount?: number;
    onOpenComments?: (sectionId: string) => void;
    onNavigateToEditor?: (sectionId: string) => void;
    /**
     * Extra Tiptap extensions for the rich-text editor this section mounts.
     *
     * Suggestion/track-changes mode is the reason this exists: the host builds a
     * per-section extension array (`suggestions.extensionsFor(section.id)`) and
     * the renderer is the only thing between that array and the editor. Without
     * a passthrough a host had no way to reach the editor at all, which is one
     * of the two reasons a consumer had to fork this directory.
     *
     * Read only when the editor is CONSTRUCTED (extensions are schema-affecting),
     * so pass a stable array — a fresh literal every render rebuilds the editor
     * on every keystroke.
     */
    extensions?: readonly unknown[];
    /**
     * The rich-text editor component to mount, instead of the library's own.
     *
     * Hosts that already ship a Tiptap build (realtime-modules'
     * `adapters/tiptap`) must not get a SECOND one: two `@tiptap/*` instances in
     * one page means two ProseMirror schemas and two undo stacks, and the
     * versions drift independently. Injecting the host's editor removes that
     * whole class of drift rather than chasing it one config key at a time.
     *
     * Defaults to the library's `TiptapEditor` when omitted, so nothing that
     * renders today changes.
     */
    editorComponent?: SectionEditorComponent;
}

/** Per-section review status (DocuSign-style acknowledgement). */
export declare interface SectionReview {
    userId: string;
    displayName: string;
    status: 'reviewed' | 'approved' | 'changes_requested';
    timestamp: string;
    comment?: string;
}

/** Specialized section renderer type — extends beyond the base `type` for richer UIs. */
export declare type SectionType = 'tasks' | 'rich-text' | 'decisions' | 'timeline' | 'checklist' | 'rating' | 'voting';

export declare function SegmentedControl({ options, value, onChange, size, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, disabled, fullWidth, className, 'data-testid': testId, }: SegmentedControlProps): JSX.Element;

export declare interface SegmentedControlProps {
    options: SegmentOption[];
    value: string;
    onChange: (value: string) => void;
    size?: 'sm' | 'md';
    /**
     * What the whole group is FOR.
     *
     * `role="group"` with no name announces as a bare "group", so a reader
     * arriving at Editing / Suggesting / Viewing is told three unrelated toggle
     * buttons rather than one setting with three values. Optional because every
     * existing caller sits under a heading that already says it; new callers on
     * a bare toolbar should pass it.
     */
    'aria-label'?: string;
    /**
     * The element that already says what the group is for — a `FormField`'s
     * label, typically, via the `labelId` it hands its render prop. Prefer this
     * over `aria-label` inside a form: it keeps ONE copy of the wording, so the
     * visible label and the announced one cannot drift apart. Same wiring
     * `Switch` takes.
     */
    'aria-labelledby'?: string;
    /** Every segment disabled — used while a form that owns it is saving. */
    disabled?: boolean;
    /** Stretch the group and share its width equally between the segments. */
    fullWidth?: boolean;
    className?: string;
    'data-testid'?: string;
}

export declare interface SegmentOption {
    label: string;
    value: string;
    icon?: ReactNode;
}

export declare const Select: ForwardRefExoticComponent<SelectProps & RefAttributes<HTMLSelectElement>>;

export declare function SelectableCard({ children, selected, onSelect, padding, disabled, className, ...rest }: SelectableCardProps): JSX.Element;

export declare type SelectableCardPadding = 'sm' | 'md' | 'lg';

export declare interface SelectableCardProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onSelect' | 'children' | 'type'> {
    children?: ReactNode;
    /** Draws the selected chrome and sets `aria-pressed`. */
    selected?: boolean;
    /** Fired on click. Named `onSelect` so callers read as pickers, not buttons. */
    onSelect?: () => void;
    /** Default `sm` (12px) — these sit in dense grids, unlike Card's 24px `md`. */
    padding?: SelectableCardPadding;
}

export declare interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export declare interface SelectOptionGroup {
    label: string;
    options: SelectOption[];
}

export declare interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    options: SelectOption[];
    /** Optional labelled option groups, rendered after the flat `options`. */
    groups?: SelectOptionGroup[];
    /** Shown as a disabled placeholder option when no value is selected. */
    placeholder?: string;
    size?: SelectSize;
    /** Shape. See `SelectVariant`. Default `default`. */
    variant?: SelectVariant;
    /**
     * Semantic tone for `variant="pill"` — the capsule paints in that tone's
     * soft surface (`-bg` / `-fg` / `-border`). Ignored by `variant="default"`,
     * whose chrome is the neutral field border. Default `neutral`.
     */
    tone?: ToneOrAlias;
    /** When true, applies a danger-colored border. */
    invalid?: boolean;
    /**
     * Classes for the `variant="pill"` wrapper `<span>` (the positioning context
     * for the chevron). `className` still lands on the `<select>` itself, so a
     * caller can restyle the capsule without losing the layout hook.
     */
    wrapperClassName?: string;
    'data-testid'?: string;
}

export declare type SelectSize = 'sm' | 'md';

/**
 * `default` is the boxed field. `pill` is the compact, tone-coloured capsule
 * that status and priority pickers want — a chip you can change.
 *
 * It exists because that shape kept getting hand-rolled: a task row's
 * priority/status pickers are visually chips, and the only way to get one was
 * a bare `<select>` with `appearance-none rounded-full` plus a background-image
 * data-URI arrow and a hand-written `border-*-border bg-*-bg text-*-fg` triple
 * per state. Native `<select>` semantics (keyboard, mobile pickers, form
 * submission) are worth keeping, so this is the real element restyled, not a
 * button-and-menu impostor.
 */
/**
 * `ghost` (2.385.0) is the value side of a label/value row — no box, the
 * value right-aligned with the native chevron after it, a hover tint to say it
 * can be changed ("Model   Haiku ▾" in a run panel).
 */
declare type SelectVariant = 'default' | 'pill' | 'ghost';

/** A paper plane: "send" — the light prompt box's Send ("✈ Send"). Since 2.390.0. */
export declare function SendIcon({ size, ...rest }: GlyphProps): JSX.Element;

declare type SendMessage = (msg: Record<string, unknown>) => void;

/** Server welcome message (type === 'session') */
export declare interface SessionMessage extends GatewayMessage {
    type: 'session';
    clientId: string;
    sessionToken: string;
    restored: boolean;
}

/**
 * Point every request that uses this resolver at `url`. Call once during
 * app start-up, before the first request. Pass `null` to fall back to the
 * runtime-env / build-time-env chain again (also how a test suite resets
 * it).
 */
export declare function setApiBaseUrl(url: string | null): void;

/**
 * Point the approvals sync at a host's own API. Pass `null` to fall back to
 * the environment. Call once at startup, before any decision is finalized.
 */
export declare function setApprovalApiBase(base: ApprovalApiBase | null): void;

/**
 * @deprecated Alias for `setApiBaseUrl`, kept for existing callers. The
 * document-type adapter was the first surface to get an override setter
 * (2.352.0); every other surface reading `VITE_SOCIAL_API_URL` shares the
 * same resolver as of 2.357.0, so the name no longer implies anything
 * document-type-specific. New code should call `setApiBaseUrl`.
 */
export declare const setDocumentTypeApiBaseUrl: typeof setApiBaseUrl;

export declare function SettingsLayout({ title, subtitle, sections, activeSectionId, onSectionChange, dirty, saveLabel, cancelLabel, onSave, onCancel, saving, saveBarSlot, railWidth, className, style, 'data-testid': testId, }: SettingsLayoutProps): JSX.Element;

export declare interface SettingsLayoutProps {
    /** Page title shown above the rail. */
    title: ReactNode;
    /** Optional secondary line under the title. */
    subtitle?: ReactNode;
    /** Section list. The first section is selected by default. */
    sections: SettingsSection[];
    /** Currently active section id (controlled). When omitted, uncontrolled. */
    activeSectionId?: string;
    /** Notified when the user picks a section. */
    onSectionChange?: (id: string) => void;
    /**
     * When true (or non-null), shows the sticky save bar.
     * The bar exposes Save + Cancel buttons.
     */
    dirty?: boolean;
    /** Save button label. Default "Save changes". */
    saveLabel?: ReactNode;
    /** Cancel button label. Default "Cancel". */
    cancelLabel?: ReactNode;
    /** Save click handler. */
    onSave?: () => void;
    /** Cancel click handler. */
    onCancel?: () => void;
    /** When true, the save button shows a saving state. */
    saving?: boolean;
    /** Optional extra content for the save bar (e.g. dirty-field count). */
    saveBarSlot?: ReactNode;
    /** Width of the rail in px. Default 220. */
    railWidth?: number;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}

export declare interface SettingsSection {
    id: string;
    /** Sidebar label. */
    label: ReactNode;
    /** Optional small description shown under the label in the rail. */
    description?: ReactNode;
    /** Optional icon glyph rendered next to the label. */
    icon?: ReactNode;
    /** Section content. */
    content: ReactNode;
}

export declare function SetupGuidePage({ status, onNavigate }: SetupGuidePageProps): JSX.Element;

export declare interface SetupGuidePageProps {
    status: {
        hasUserPools: boolean;
        poolCount: number;
        hasClients: boolean;
        clientCount: number;
        hasAdminUser: boolean;
        totalUsers: number;
        adminEmails: string[];
        smtpConfigured: boolean;
        smtpHost?: string;
        issuer: string;
        issuerConfigured: boolean;
        wellKnownUrl?: string;
        firstPoolId?: string;
        firstClientId?: string;
    };
    onNavigate: (path: string) => void;
}

export declare interface SetupStatus {
    hasUserPools: boolean;
    poolCount: number;
    hasClients: boolean;
    clientCount: number;
    hasAdminUser: boolean;
    totalUsers: number;
    adminEmails: string[];
    firstPoolId?: string;
    smtpConfigured: boolean;
    smtpHost?: string;
    smtpPort?: string;
    smtpFrom?: string;
    issuer: string;
    externalIssuer?: string;
    issuerIsCustom: boolean;
    issuerConfigured: boolean;
    wellKnownUrl?: string;
    firstClientId?: string;
}

export declare const shadows: {
    /** Subtle shadow for cards, panels */
    readonly sm: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)";
    /** Medium shadow for dropdowns, popovers */
    readonly md: "0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)";
    /** Strong shadow for modals, dialogs */
    readonly lg: "0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)";
    /** Extra strong shadow for elevated modals */
    readonly xl: "0 20px 25px rgba(0,0,0,0.15), 0 10px 10px rgba(0,0,0,0.04)";
};

/** A tray with an arrow out of it: "share", "post this somewhere". */
export declare function ShareIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function ShortcutsHelp({ open, onClose, sections }: ShortcutsHelpProps): JSX.Element;

export declare interface ShortcutsHelpProps {
    open: boolean;
    onClose: () => void;
    /**
     * The bindings to document. Defaults to this library's own rows.
     *
     * It has to be a prop because the built-in list is a list of THIS
     * library's shortcuts, and a host's keys are not those keys. A consumer
     * whose bindings differed had no way to say so, so it kept a whole second
     * copy of this overlay rather than tell its users the wrong thing about
     * their own keyboard — which is the worse of the two failures, and the
     * reason the default is left exactly as it was.
     */
    sections?: ShortcutsHelpSection[];
}

/** One row: a key combination and what it does. */
export declare interface ShortcutsHelpRow {
    /**
     * The combination. A string is rendered as a single key cap exactly as
     * written (`'⌘/Ctrl + S'`); an array renders one cap per element
     * (`['⌘', 'S']`), which is what a host that stores its bindings
     * structurally already has in hand.
     */
    keys: string | string[];
    /** What the shortcut does. `label` is an accepted alias. */
    action?: string;
    /** Alias for `action`. */
    label?: string;
    /** Documented but not wired: rendered dimmed, struck through, tagged. */
    planned?: boolean;
}

export declare interface ShortcutsHelpSection {
    title: string;
    /** The rows. `shortcuts` is an accepted alias. */
    rows?: ShortcutsHelpRow[];
    /** Alias for `rows`. */
    shortcuts?: ShortcutsHelpRow[];
}

export declare function SidebarRow({ icon, label, trailing, active, onClick, onContextMenu, href, kebab, disabled, 'aria-label': ariaLabel, className, 'data-testid': testId, dataAttrs, }: SidebarRowProps): JSX.Element;

export declare interface SidebarRowProps {
    /** Leading icon. */
    icon?: ReactNode;
    /** Primary label (string or ReactNode). */
    label: ReactNode;
    /** Right-side slot for badges, avatar stacks, etc. */
    trailing?: ReactNode;
    /** Highlighted state. */
    active?: boolean;
    onClick?: () => void;
    onContextMenu?: (e: MouseEvent_2<HTMLElement>) => void;
    /** When set, the row renders as an <a href>. Click handling still fires. */
    href?: string;
    /** Optional kebab-menu trigger node (typically an IconButton). */
    kebab?: ReactNode;
    /** Disabled state — non-interactive, muted styling. */
    disabled?: boolean;
    /** Accessibility label override (when `label` isn't a string). */
    'aria-label'?: string;
    className?: string;
    'data-testid'?: string;
    /** Arbitrary `data-*` attributes spread onto the root element.
     *  Used by e2e tooling to expose row-level metadata (e.g.
     *  `data-room-slug`) without bespoke wrapper divs that interfere
     *  with the row layout. */
    dataAttrs?: Record<string, string | number | undefined>;
}

export declare function SidebarSection({ title, actions, collapsible, defaultCollapsed, storageKey, children, className, 'data-testid': testId, }: SidebarSectionProps): JSX.Element;

export declare interface SidebarSectionProps {
    /** Visible section label. Used to derive the localStorage key. */
    title: string;
    /** Right-aligned slot in the header (e.g. an IconButton). */
    actions?: ReactNode;
    /** When true (default), header click toggles collapse. */
    collapsible?: boolean;
    /** Initial collapsed state. Defaults to false (open). */
    defaultCollapsed?: boolean;
    /** Optional explicit localStorage key. Defaults to `sidebar-section:${title}`. */
    storageKey?: string;
    /** Section body. */
    children?: ReactNode;
    /** Extra classes for the outer wrapper. */
    className?: string;
    /** Test id (defaults to "sidebar-section"). */
    'data-testid'?: string;
}

/** Reads the panel a query string names, `doc` first; null when it names none. */
export declare function sidePanelFromSearch(search: string | URLSearchParams | undefined): ChatSidePanelRef | null;

/**
 * Writes `panel` into `search` (an existing query string, or nothing) and
 * returns the new params. `null` closes: it removes `doc`, `panel` and every
 * `panel.*` entry.
 */
export declare function sidePanelToSearch(panel: ChatSidePanelRef | null, search?: string | URLSearchParams): URLSearchParams;

export declare interface SignoffEntry {
    name: string;
    /** e.g. 'owner', 'sme', 'org-leader' — shown as the chip's title. */
    role?: string;
    decision: 'approve' | 'reject';
    timeLabel?: string;
}

export declare function SignoffPanel({ signoffs, required, actions, emptyHint, className, 'data-testid': testId, }: SignoffPanelProps): JSX.Element;

export declare interface SignoffPanelProps {
    signoffs: SignoffEntry[];
    /** Approvals needed to ratify. Default 2. */
    required?: number;
    /** Approve/Reject buttons etc. — render only for viewers who may act. */
    actions?: ReactNode;
    emptyHint?: string;
    className?: string;
    'data-testid'?: string;
}

export declare function SkeletonCard({ width, height, rounded }: SkeletonCardProps): JSX.Element;

export declare interface SkeletonCardProps {
    width?: number | string;
    height?: number | string;
    /**
     * Corner shape. 'full' makes a circle/pill — the avatar-placeholder case
     * that used to force pages to hand-roll their own skeleton rect.
     * @default 'lg'
     */
    rounded?: 'md' | 'lg' | 'full';
}

export declare function SkipLink({ targetId, children, className, onSkip, }: SkipLinkProps): JSX.Element;

export declare interface SkipLinkProps {
    /**
     * `id` of the element to jump to. That element needs `tabIndex={-1}` for
     * the jump to move focus (not just the viewport) in every browser.
     * @default 'main-content'
     */
    targetId?: string;
    children?: ReactNode;
    className?: string;
    /** Called after the jump — use it to focus the target explicitly. */
    onSkip?: () => void;
}

/** What each layout is FOR, in the words a person picking one needs. */
export declare const SLIDE_LAYOUT_LABELS: Record<SlideLayout, string>;

export declare const SLIDE_LAYOUTS: readonly SlideLayout[];

export declare type SlideLayout = 'title' | 'section' | 'bullets' | 'two-column' | 'chart' | 'quote' | 'image';

export declare const Slider: ForwardRefExoticComponent<SliderProps & RefAttributes<HTMLInputElement>>;

export declare interface SliderProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    /** Accessible name. Required when no visible label is wired up. */
    'aria-label'?: string;
    /**
     * Show the current value beside the track. Pass a formatter to control how
     * it reads (units, decimal places); `true` uses the raw number.
     * @default true
     */
    readout?: boolean | ((value: number) => string);
    disabled?: boolean;
    className?: string;
    'data-testid'?: string;
}

/** Two sliders: "refine these results". Since 2.389.6. */
export declare function SlidersIcon({ size, ...rest }: GlyphProps): JSX.Element;

declare interface SloPoint {
    at: string;
    value: number | null;
}

declare type SloWindow = '15m' | '1h' | '6h' | '24h';

/** A smiling face: pick an emoji. The button, not the emoji — a reaction a
 *  person actually left stays the character they chose. */
export declare function SmileyIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** Plain-object snapshot of a section for diffing (no Y.js references). */
declare interface SnapshotSection {
    id: string;
    type: string;
    title: string;
    /** Plain text extracted from the section's rich-text content. */
    textContent: string;
    items: Array<{
        id: string;
        text: string;
        status: string;
        assignee: string;
        priority: string;
    }>;
}

export declare function SocialPanel({ idToken, onMessage }: {
    idToken: string | null;
    onMessage: OnMessageFn_6;
}): JSX.Element;

export declare function SocialTabContent({ userId, displayName, idToken, rooms, createRoom, createDM, createGroupRoom, roomsLoading, roomsError, onRoomsRetry, handleRoomSelect, activeRoomId, onMessage, }: SocialTabContentProps): JSX.Element;

declare interface SocialTabContentProps {
    userId: string;
    displayName: string;
    userEmail: string;
    connectionState: string;
    idToken: string | null;
    rooms: RoomItem[];
    createRoom: (name: string) => Promise<void>;
    createDM: (targetUserId: string) => Promise<void>;
    createGroupRoom: (groupId: string, name: string) => Promise<void>;
    roomsLoading: boolean;
    roomsError?: string | null;
    onRoomsRetry?: () => void;
    handleRoomSelect: (room: RoomItem) => void;
    activeRoomId: string | null;
    activityEvents: ActivityEvent[];
    onMessage: OnMessageFn_7;
}

export declare function SourceCard({ id, title, kind, timestamp, excerpt, onOpen, href, current, meta, layout, now, className, 'data-testid': testId, }: SourceCardProps): JSX.Element;

export declare interface SourceCardProps {
    id: string;
    title: string;
    /** The mark's kind. Default `page`. */
    kind?: FileKind;
    /** When the source was written. ISO string, epoch ms or Date. */
    timestamp?: string | number | Date | null;
    /** A line or two of what the source says. Clamped to two lines. */
    excerpt?: ReactNode;
    onOpen?: (id: string) => void;
    href?: string;
    /** This is the source being viewed. */
    current?: boolean;
    /**
     * A quiet line under the title that REPLACES the age — "Source pattern ·
     * auth-service". Since 2.389.0.
     */
    meta?: string;
    /**
     * `card` (default): the mark, a title that is the control, the age, the
     * excerpt. `row` (since 2.389.0): a "based on" row — the WHOLE row is one
     * control (a button with `onOpen`, a link with `href`), the mark in a 32px
     * bordered tile, a 13px medium title, a 12px tertiary meta line, and a
     * trailing chevron. No excerpt. The accessible name is the title.
     */
    layout?: 'card' | 'row';
    /** Clock for the age (tests, server-rendered snapshots). Default `Date.now()`. */
    now?: number;
    className?: string;
    'data-testid'?: string;
}

export declare function SourceList({ items, emptyLabel, onOpen, now, layout, className, 'aria-label': ariaLabel, 'data-testid': testId, }: SourceListProps): JSX.Element;

export declare type SourceListItem = Omit<SourceCardProps, 'now' | 'className' | 'data-testid' | 'layout'>;

export declare interface SourceListProps {
    items: SourceListItem[];
    /** Shown when `items` is empty. Default "No sources recorded". */
    emptyLabel?: string;
    /** Applied to every card that has no handler of its own. */
    onOpen?: (id: string) => void;
    now?: number;
    /** Forwarded to every card — `row` for a "Based on" list. Since 2.389.0. */
    layout?: 'card' | 'row';
    className?: string;
    'aria-label'?: string;
    'data-testid'?: string;
}

declare interface SourceSloMetrics {
    sourceId: string;
    window: string;
    bucketSizeMs: number;
    latencyP95: SloPoint[];
    errorRate: SloPoint[];
    queueDepth: SloPoint[];
}

export declare const spacing: {
    readonly xs: string;
    readonly sm: string;
    readonly md: string;
    readonly lg: string;
    readonly xl: string;
};

export declare type SpanKind = 'agent' | 'tool' | 'llm' | 'retrieval' | 'guardrail' | 'internal';

export declare type SpanStatus = 'ok' | 'error' | 'unset';

/** A four-point sparkle with a small companion: the agent. Since 2.386.0. */
export declare function SparkleIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** Sparkles / magic-wand glyph — the media-effects affordance. Pair with
 *  CircularIconToggle in MediaControlsBar's `extras` slot to open a
 *  MediaEffectsTray. */
export declare function SparklesIcon({ size, ...rest }: IconProps): JSX.Element;

export declare function Sparkline({ data, width, height, color, baseline, }: SparklineProps): JSX.Element;

export declare interface SparklineProps {
    data: number[];
    width?: number;
    height?: number;
    color?: string;
    /**
     * Where the bottom of the plot sits.
     *
     * - `'min'` (default) — the smallest sample is pinned to the bottom edge, so
     *   the line always fills the box. Best for shape-of-the-change questions
     *   ("is it wobbling?") where the absolute level doesn't matter.
     * - `'zero'` — the bottom edge is 0 (or the series minimum, if any sample is
     *   negative). Small variation around a large value then reads as the nearly
     *   flat line it actually is. Use this for rates, counts and anything else
     *   where magnitude carries meaning, otherwise [100, 101, 102] draws the same
     *   dramatic climb as [0, 50, 100].
     * - a number — pin the bottom edge to that value explicitly.
     */
    baseline?: 'min' | 'zero' | number;
}

export declare function Spinner({ size, color, className, style, decorative, 'aria-label': ariaLabel, 'data-testid': testId, }: SpinnerProps): JSX.Element;

export declare interface SpinnerProps {
    size?: SpinnerSize;
    /** Arc color. Defaults to var(--color-primary). */
    color?: string;
    className?: string;
    style?: CSSProperties;
    /**
     * Purely visual — no role, no label, hidden from assistive technology.
     * Set this whenever the spinner sits inside a container that already
     * announces the wait (LoadingState does), otherwise the two live regions
     * nest and the reader says "Loading" twice.
     */
    decorative?: boolean;
    'aria-label'?: string;
    'data-testid'?: string;
}

export declare type SpinnerSize = 'sm' | 'md' | 'lg';

export declare function SplitPane({ primary, secondary, defaultRatio, ratio: controlled, onRatioChange, minPrimaryPx, minSecondaryPx, dividerLabel, className, 'data-testid': testId, }: SplitPaneProps): JSX.Element;

export declare interface SplitPaneProps {
    primary: ReactNode;
    /** The second pane. `null` renders only the primary, no divider. */
    secondary: ReactNode | null;
    /** Primary pane width as a fraction of the whole, 0–1. Default 0.55. */
    defaultRatio?: number;
    /** Controlled ratio; when given, `onRatioChange` must move it. */
    ratio?: number;
    onRatioChange?: (ratio: number) => void;
    /** Smallest each pane may get, in px. Defaults 280 / 360. */
    minPrimaryPx?: number;
    minSecondaryPx?: number;
    /** Names the divider for assistive tech, e.g. "Resize conversation and document". */
    dividerLabel?: string;
    className?: string;
    'data-testid'?: string;
}

/** Vertical flex column with a scale gap. */
export declare function Stack({ children, gap, align, justify, wrap, as: As, className, ref, ...rest }: StackProps): JSX.Element;

export declare type StackAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch';

export declare function StackDiagram({ layers, orientation, connector, className, style, 'data-testid': testId, }: StackDiagramProps): JSX.Element;

export declare type StackDiagramConnector = 'arrow' | 'line' | 'none';

export declare type StackDiagramOrientation = 'vertical' | 'horizontal';

export declare interface StackDiagramProps {
    layers: StackLayerSpec[];
    /** Vertical stacks top-to-bottom (default); horizontal flows left-to-right. */
    orientation?: StackDiagramOrientation;
    /** Connector glyph between layers. Default 'arrow'. */
    connector?: StackDiagramConnector;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}

export declare function StackedAreaChart({ series, height, }: {
    series: LineSeries[];
    height?: number;
}): JSX.Element;

/** Spacing scale. Matches Tailwind's 4px base: xs=6, sm=8, md=12, lg=16, xl=24. */
export declare type StackGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export declare type StackJustify = 'start' | 'center' | 'end' | 'between';

export declare interface StackLayerSpec {
    id: string;
    label: ReactNode;
    description?: ReactNode;
    icon?: ReactNode;
    /** Color tone (matches <Chip> tones). Default 'neutral'. */
    tone?: ChipTone;
    /** Optional right-aligned meta slot (badge, version chip). */
    meta?: ReactNode;
}

export declare interface StackProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
    children?: ReactNode;
    /** Space between children. Default `md` (12px). */
    gap?: StackGap;
    /** Cross-axis alignment (`align-items`). */
    align?: StackAlign;
    /** Main-axis distribution (`justify-content`). */
    justify?: StackJustify;
    /** Allow children to wrap onto more lines. Default false for Stack, true for Inline. */
    wrap?: boolean;
    /** Render as something other than a `<div>` — `ul`, `section`, `label`, … */
    as?: ElementType;
    /**
     * The underlying DOM node.
     *
     * A plain prop rather than `forwardRef` deliberately. The forms primitives in
     * this library use `forwardRef` because they wrap one fixed element, but
     * these two are polymorphic: `forwardRef<T, P>` fixes the instance type at
     * the call site and would either pin every `Stack` to `HTMLDivElement` — a
     * lie the moment you pass `as="ul"` — or force consumers to cast. React 19
     * (our only supported peer, `^19.0.0`) passes `ref` through as an ordinary
     * prop, so the polymorphic typing survives.
     *
     * Typed as `HTMLElement` for the same reason. A consumer holding a
     * `useRef<HTMLDivElement>(null)` still assigns cleanly, and one that passed
     * `as="ul"` is not told it has a div.
     *
     * Anything that follows its own output needs this: reading and setting
     * `scrollTop` on a log tail, measuring a row, focusing a region. Without it a
     * consumer cannot use a layout primitive at all there and hand-rolls a
     * nine-line `forwardRef` wrapper around a bare `<div>` — which is exactly
     * what the aws-agentcore portal did in `components/ScrollRegion.tsx`.
     */
    ref?: Ref<HTMLElement>;
}

/**
 * Whether the LIVE badge may be lit.
 *
 * The badge is the caller's claim ANDed with what the player managed to do —
 * on the HLS path a caller typically knows only that it composed a playlist
 * URL, which is string concatenation, not a broadcast. `buffering` counts: a
 * momentary rebuffer at the live edge is still live. `stalled` does NOT: a
 * frame that has not moved in eight seconds is a picture of the past, and
 * calling it live is the most confident lie this component can tell.
 *
 * `idle` counts because the caller's claim is all anyone has yet and nothing
 * contradicts it; once the grace period turns that into `not-started`, the
 * badge goes out.
 */
export declare function stagePhaseIsLive(phase: StreamStagePhase): boolean;

/**
 * Whether the stage is showing a picture the viewer can trust as CURRENT.
 * Everything else — connecting, buffering, stalled, error, empty — wants some
 * words over it rather than a bare frame.
 */
export declare function stagePhaseIsShowingLiveMedia(phase: StreamStagePhase): boolean;

export declare function StatCard({ label, value, accent, danger, hint, title, delta, sparklineData, to, as: As, onClick, mono, className, style, 'data-testid': testId, }: StatCardProps): JSX.Element;

export declare interface StatCardDelta {
    /** Magnitude of the change. Rendered with a sign derived from `direction`. */
    value: number;
    /** Trend direction. Drives the arrow glyph (▲/▼) and default sign. */
    direction: 'up' | 'down';
    /**
     * Color tone for the delta line. Defaults:
     *   - up   → positive (success/green)
     *   - down → negative (danger/red)
     *
     * Pass explicitly to override — e.g. on a "Failed events" KPI, a
     * downward trend is actually positive, so `tone: 'positive'`.
     */
    tone?: 'positive' | 'negative' | 'neutral';
    /**
     * Suffix appended to the numeric value. Default `'%'`. Pass `''` for raw
     * counts (e.g. `+12` errors), or `' ms'` etc. for units.
     */
    suffix?: string;
    /** Optional aria-label override for the delta line. */
    'aria-label'?: string;
}

export declare interface StatCardProps {
    label: ReactNode;
    value: ReactNode;
    accent?: boolean;
    danger?: boolean;
    hint?: ReactNode;
    /**
     * Native tooltip on the whole card — for provenance a reader only needs on
     * demand ("unknown, not zero" behind a $0.00).
     *
     * `hint` is the visible slot and stays the default; this is for text that
     * would crowd the tile. Deliberately the native `title` rather than a new
     * Tooltip component: several shared components already use `title` this way,
     * and one hover mechanism that works everywhere beats two that disagree.
     *
     * It exists because ProjectDetailPage needed exactly this and had to smuggle a
     * bare `<span title>` inside the `label` ReactNode — which put the tooltip on
     * the caption rather than the card, so it only appeared over four words of
     * uppercase text.
     */
    title?: string;
    /**
     * Trend delta rendered below the value (▲ +12% / ▼ -4%, colored by tone).
     * Pass `null` or omit to hide.
     */
    delta?: StatCardDelta | null;
    /**
     * Inline sparkline drawn to the right of the value. Pass the raw number
     * series — the card sizes it at 80×20 by default. Omit to hide.
     */
    sparklineData?: number[];
    /** Destination URL / path. When provided the card renders as a link. */
    to?: string;
    /**
     * Override the link element. Defaults to a plain `<a>` (passes `href`).
     * Pass your router's Link component to get client-side navigation — the `to`
     * prop is forwarded directly so it matches React Router's `<Link to>` API.
     *
     * @example
     * import { Link } from 'react-router';
     * <StatCard to="/admin/capabilities" as={Link} label="…" value={0} />
     */
    as?: ElementType<any>;
    /** Click handler — renders a <button> wrapper if no `to` is given. */
    onClick?: () => void;
    mono?: boolean;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}

export declare function StatsCard({ metrics, className, style }: StatsCardProps): JSX.Element;

export declare interface StatsCardProps {
    metrics: StreamMetrics | null;
    /**
     * Sizing / positioning classes from the caller. Prefer this over `style`:
     * the card has no intrinsic width, so every consumer was wrapping it in a
     * `<div>` purely to size it — inline styles are banned in demos and
     * stories. Applied to BOTH the empty and populated states, and composed
     * through `cn()` so a caller class wins.
     */
    className?: string;
    /** @deprecated Use `className`. Kept so existing callers keep compiling. */
    style?: CSSProperties;
}

export declare function StatStrip({ items, frameless, connectors, variant, className, 'aria-label': ariaLabel, 'data-testid': testId, }: StatStripProps): JSX.Element;

/** A labelled arrow between two clusters — "Compact", "Publish". */
export declare interface StatStripConnector {
    label: string;
    /** Tints the arrow and its label. Default: tertiary ink. */
    tone?: Tone;
}

export declare interface StatStripItem {
    label: string;
    value: ReactNode;
    hint?: ReactNode;
    tone?: 'default' | 'accent' | 'danger';
    /** A line under the value — "● 50m behind". Since 2.388.0. */
    status?: StatStripStatus | null;
    /** Native tooltip on the cluster (the full hint, provenance). Since 2.388.0. */
    title?: string;
    onSelect?: () => void;
    href?: string;
    /**
     * A thin bar under the cluster — "18 / 52 points delivered" with its fill.
     * Drawn only when `max` is above zero and `value` is finite (nothing is
     * drawn for "we do not know"). Since 2.390.0.
     */
    progress?: {
        value: number;
        max: number;
    } | null;
}

export declare interface StatStripProps {
    items: StatStripItem[];
    /**
     * Drop the strip's own border, rounding and fill so a host frame can
     * provide them — the same escape hatch DataTable has.
     *
     * The strip is a card by default, which is right when it sits on the page.
     * Inside another Card it reads as a card in a card: two nested rounded
     * boxes a few pixels apart, which is visual noise standing in for a
     * hierarchy that isn't there. The dividers between clusters stay, since
     * those separate the numbers from each other, not the strip from the page.
     */
    frameless?: boolean;
    /**
     * Since 2.388.0: `connectors[i]` is drawn between `items[i]` and
     * `items[i + 1]` as a labelled arrow, replacing the divider there. A strip
     * with connectors reads left to right as a flow. Extra entries are ignored;
     * a missing one leaves a plain gap.
     */
    connectors?: StatStripConnector[];
    /**
     * `default`: the label over a 17px value (a KPI card, compressed).
     * `inline` (since 2.390.0): the value then its label on ONE line, sentence
     * case — "**18** / 52 points delivered · **2** agents running · **$1.73**
     * spent of $95 allocated" — with dividers between clusters, no card, and a
     * rule under the strip. The label is the words after the number, so write
     * it as the rest of the sentence.
     */
    variant?: 'default' | 'inline';
    className?: string;
    'aria-label'?: string;
    'data-testid'?: string;
}

/** A cluster's health line: a tone dot and a short worded state. */
export declare interface StatStripStatus {
    label: string;
    /** Default `neutral` (secondary ink). */
    tone?: Tone;
}

export declare function StatusBadge({ status, variant }: StatusBadgeProps): JSX.Element;

export declare interface StatusBadgeProps {
    status: string;
    variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
}

export declare interface StatusColors {
    bg: string;
    border: string;
    text: string;
    accent: string;
}

export declare function StatusDot({ color, pulse, size, label, className, style, title, 'data-testid': testId, 'aria-label': ariaLabel, }: StatusDotProps): JSX.Element;

export declare interface StatusDotProps {
    /** Dot color. Defaults to var(--color-text-tertiary). */
    color?: string;
    pulse?: boolean;
    size?: StatusDotSize;
    label?: ReactNode;
    className?: string;
    style?: CSSProperties;
    title?: string;
    'data-testid'?: string;
    'aria-label'?: string;
}

export declare type StatusDotSize = 'xs' | 'sm' | 'md';

export declare function StatusPill({ state: stateProp, tone, label, icon, meta, size, variant, className, 'data-testid': testId, }: StatusPillProps): JSX.Element;

export declare interface StatusPillProps {
    /** The pill's tone. Either `state` or `tone`; `tone` wins when both are given. */
    state?: StatusPillTone;
    /**
     * The same thing as `state`, under the name the catalog helpers use —
     * `statusPillFor(summary)` returns `{ tone, label, meta }`, and
     * `<StatusPill variant="text" {...statusPillFor(summary)} />` just works.
     */
    tone?: StatusPillTone;
    label: string;
    /** Optional icon placed to the left of the label. */
    icon?: ReactNode;
    /**
     * A quieter clause after the label — "29m ago", "3 of 5". Rendered as
     * "· <meta>" in the tertiary ink and normal weight; the label keeps the
     * colour and the weight.
     */
    meta?: string;
    size?: StatusPillSize;
    variant?: StatusPillVariant;
    className?: string;
    'data-testid'?: string;
}

export declare type StatusPillSize = 'sm' | 'md';

export declare type StatusPillState = 'success' | 'error' | 'warning' | 'info' | 'neutral' | 'pending';

/**
 * What `state` accepts: a `StatusPillState`, or `danger` — the same tokens as
 * `error`, in the library's tone spelling (success / warning / danger /
 * neutral). Kept out of `StatusPillState` so a `Record<StatusPillState, …>`
 * elsewhere does not have to grow a duplicate key.
 */
export declare type StatusPillTone = StatusPillState | 'danger';

/**
 * `pill` (default) is the bordered, tinted chip. `text` is dot + coloured label, no box.
 * `tag` (since 2.386.5) is a soft rounded-rectangle label with no dot and no
 * border — a document's "Draft" beside its title. `label` (since 2.386.15) is
 * the tag's soft rectangle WITH the dot — a scope's "● In progress".
 */
export declare type StatusPillVariant = 'pill' | 'text' | 'tag' | 'label';

export declare function StatusStrip({ phase, bitrateBps, viewerCount, duration, className, style }: StatusStripProps): JSX.Element;

export declare interface StatusStripProps {
    phase: PlayerPhase | 'live' | 'reconnecting';
    bitrateBps?: number;
    viewerCount?: number;
    duration?: number;
    /**
     * Sizing / positioning classes from the caller. Prefer this over `style`:
     * overlaying the strip on a player or widening it previously needed a
     * wrapper `<div>`, because inline styles are banned in demos and stories.
     * Composed through `cn()`, so a caller class wins.
     */
    className?: string;
    /** @deprecated Use `className`. Kept so existing callers keep compiling. */
    style?: CSSProperties;
}

/**
 * One execution attempt of a step. Hub task #1280.
 *
 * `StepExecution` retains its top-level `status`/`error`/`output`/timing fields
 * — they always reflect the LATEST attempt, so existing single-attempt readers
 * are unaffected. `attempts[]` carries the full history for retry-aware UI
 * (history view, compare-attempts diff). See ADR-DURABLE-PIPELINE-EXECUTION.
 */
export declare interface StepAttempt {
    attemptNumber: number;
    startedAt: string;
    completedAt?: string;
    durationMs?: number;
    input?: unknown;
    output?: unknown;
    error?: string;
    errorCategory?: ErrorCategory;
    /** Backoff delay applied before the next attempt; only set on retryable failures. */
    retryAfterMs?: number;
    /** `${runId}:${nodeId}:${attemptNumber}` (per-attempt) or `${runId}:${nodeId}` (per-step idempotent). */
    idempotencyKey: string;
}

export declare interface StepExecution {
    nodeId: string;
    status: StepStatus;
    startedAt?: string;
    completedAt?: string;
    durationMs?: number;
    input?: unknown;
    output?: unknown;
    error?: string;
    /** Full per-attempt history. Absent on rows persisted before hub#1280. */
    attempts?: StepAttempt[];
    llm?: {
        prompt: string;
        response: string;
        tokensIn: number;
        tokensOut: number;
        /** True between `pipeline.llm.stream.opened` and the first token; cleared when tokensOut > 0. */
        streamOpened?: boolean;
        /** Wall-clock ms from stream open to first token (DC v0.3.7+). */
        firstTokenLatencyMs?: number;
    };
    agentLive?: {
        toolCalls: AgentToolCall[];
    };
    /**
     * Image previews produced by steps that emit `pipeline:step:image:produced`
     * events (e.g. CropNode, SaveNode). Each entry carries an imageId that
     * resolves through the host's `getImageUrl` service.
     */
    images?: Array<{
        imageId: string;
        width: number;
        height: number;
        mimeType: string;
        bbox?: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
    }>;
    approvals?: ApprovalRecord[];
    /**
     * Vision-specific streaming data — populated as `image:vision-analyze`
     * events arrive (pipeline:step:vision:*). `analyzed` flips to true once
     * the model has finished outputting tokens.
     */
    vision?: {
        response: string;
        tokensIn?: number;
        tokensOut?: number;
        tokensSeen: number;
        /**
         * True once `pipeline:image:vision:analyzed` lands.
         *
         * OPTIONAL, deliberately. This was `analyzed: boolean` — required — which
         * described the end state rather than the stream: a reducer folding
         * `pipeline:image:vision:*` events has a `vision` slot from the first
         * token delta, long before it knows whether the step finished. Demanding
         * the field meant a host with a truthful, incrementally-built run store
         * could not hand its steps to these components at all. Every read here is
         * already a truthiness check, so absent and false behave alike.
         */
        analyzed?: boolean;
        failure?: {
            reason: string;
            error: string;
        };
        imageId?: string;
        costUsd?: number;
        /** Model that produced the analysis, when the host records it. */
        visionModel?: string;
        /** Whether the step requested structured extraction against a schema. */
        hasSchema?: boolean;
        /** Final VisionResult payload (caption + extracted JSON + cost/usage). */
        result?: unknown;
    };
    /**
     * hub#2226: edit-and-continue patch history applied while the run was
     * paused at this step's breakpoint. Append-only at apply time;
     * `revertedAt` is set when a patch is undone via `revertContextPatch`.
     * Empty/undefined for steps that were never paused-and-patched.
     */
    patches?: PatchEntry[];
}

export declare type StepStatus = 'pending' | 'running' | 'completed' | 'failed' | 'skipped' | 'cancelled' | 'awaiting';

export declare function StreamAudioOnly({ name, avatarUrl, level, active, muted, hint, className, 'data-testid': testId, }: StreamAudioOnlyProps): JSX.Element;

export declare interface StreamAudioOnlyProps {
    /** Who is talking. Renders an avatar and a name when known. */
    name?: string;
    /** Profile image for the speaker; falls back to initials. */
    avatarUrl?: string;
    /**
     * Measured loudness, 0..1, or null when it cannot be measured. Null is not
     * silence — see the file header.
     */
    level?: number | null;
    /** Whether audio is actually reaching the viewer (playing AND not muted). */
    active?: boolean;
    /** Muted gets its own wording: the fix is one click away and worth naming. */
    muted?: boolean;
    /** Replaces the default explanation line. */
    hint?: string;
    className?: string;
    'data-testid'?: string;
}

export declare interface StreamChatMessage {
    id: string;
    /** Who sent it. */
    displayName: string;
    /** The message body. */
    content: string;
    /** ISO timestamp, rendered as HH:MM. */
    timestamp?: string;
}

export declare function StreamChatTicker({ messages, visibleCount, rotateMs, window: windowSize, className, 'data-testid': testId, }: StreamChatTickerProps): JSX.Element | null;

export declare interface StreamChatTickerProps {
    messages: readonly StreamChatMessage[];
    /** How many messages are on screen at once. */
    visibleCount?: number;
    /** Rotation interval in ms. 0 disables rotation and pins the newest. */
    rotateMs?: number;
    /**
     * How many recent messages the ticker may cycle through.
     *
     * Without a cap, a long call's history keeps growing and the rotation takes
     * minutes to come back around to anything current — a "live" ticker showing
     * a message from twenty minutes ago is worse than showing none.
     */
    window?: number;
    className?: string;
    'data-testid'?: string;
}

/**
 * Companion utility: returns true when the stream has at least one
 * paintable video track (live + enabled + not muted). Pair with
 * useTrackStateBump in the same component so the boolean re-derives on
 * every track transition.
 */
export declare function streamHasUsableVideo(stream: MediaStream | undefined | null): boolean;

/**
 * A stream with audio and no usable picture.
 *
 * NOT the same as a stream with nothing in it: a MediaStream with no tracks at
 * all is a failure, and putting a friendly "Audio only" card over it would be
 * the same category of lie as the black rectangle it replaced. Exported
 * because a host that already knows its publisher's shape can pass `audioOnly`
 * directly instead of re-deriving this.
 */
export declare function streamIsAudioOnly(stream: MediaStream | null | undefined): boolean;

export declare interface StreamMetrics {
    bitrateBps: number;
    fps: number;
    resolution: {
        width: number;
        height: number;
    };
    packetsLost: number;
    jitter?: number;
}

export declare function StreamStage({ stream, playlistUrl, onPlaybackError, onRetry, title, viewerCount, live, audioOnly: audioOnlyProp, speakerName, speakerAvatarUrl, notStartedLabel, endedLabel, stallAfterMs, chatMessages, chatVisibleCount, chatRotateMs, muted: mutedInitial, allowFullscreen, showLatency, controls, placeholder, className, 'data-testid': testId, }: StreamStageProps): JSX.Element;

export declare type StreamStagePhase = 
/** No source yet, still inside the grace period. A normal pre-broadcast state. */
'idle'
/** No source, and long enough that promising one would be a lie. */
| 'not-started'
/** Had a source; it went away. The opposite message from `not-started`. */
| 'ended'
/** Source attached, no frame yet. */
| 'connecting'
/** Frames advancing. */
| 'playing'
/** Briefly out of data. Still live. */
| 'buffering'
/** Out of data long enough that the picture is a lie about the present. */
| 'stalled'
/** Unplayable. */
| 'error';

export declare function streamStagePhase({ hasStream, hasPlaylist, hadSource, graceExpired, streamHasTracks, hls, }: StreamStagePhaseInput): StreamStagePhase;

export declare interface StreamStagePhaseInput {
    hasStream: boolean;
    /**
     * Whether that MediaStream actually carries anything. `null` means the
     * caller could not tell (a stand-in object, a stream without `getTracks`).
     *
     * WHEP hands over a stream BEFORE its tracks arrive — `addtrack` fires
     * later — so an empty one is a subscription still being set up, or one that
     * never will be. Either way it is not a picture, and calling it `playing`
     * puts a LIVE badge over a black rectangle: the realtime spelling of the
     * same lie the HLS path had.
     */
    streamHasTracks?: boolean | null;
    hasPlaylist: boolean;
    /** Whether this mount has EVER held a source. Distinguishes ended from not-started. */
    hadSource: boolean;
    /** Whether the stage has waited longer than it is willing to promise. */
    graceExpired: boolean;
    /**
     * What the HLS player reports. `phase` is preferred; `error`/`loading` are
     * the fallback so a caller (or a test double) that only has the old two-flag
     * shape still resolves to the same answer.
     */
    hls?: {
        phase?: HlsPhase;
        error?: string | null;
        loading?: boolean;
    };
}

export declare interface StreamStageProps {
    /**
     * The live stream, realtime transport. Null renders the placeholder — a
     * stage with no stream is the normal state before a broadcast starts, not
     * an error.
     */
    stream?: MediaStream | null;
    /**
     * The live stream, near-realtime transport: an HLS playlist URL, typically
     * from `useLVSLiveHls`. Used when `stream` is absent.
     */
    playlistUrl?: string | null;
    /** Surfaced when HLS cannot play — an unsupported browser, a dead playlist. */
    onPlaybackError?: (err: Error) => void;
    /**
     * Called by the "Try again" control, in addition to the stage's own retry.
     * Use it when recovery needs something the stage cannot do — re-issuing a
     * signed playlist URL, re-subscribing over WHEP.
     *
     * It is also the ONLY thing that can offer a way back from `ended`: there is
     * no playlist left to re-attach there, so the stage's own retry could not
     * succeed and no button is drawn without this.
     */
    onRetry?: () => void;
    /** Replaces the default wording once a stream has failed to start. */
    notStartedLabel?: string;
    /**
     * Shown when a stream that WAS playing goes away — the broadcaster hung up.
     *
     * A distinct state from "not started". Both render an empty stage, but the
     * placeholder tells the audience to keep waiting, which is the wrong thing
     * to say about something that is over.
     */
    endedLabel?: ReactNode;
    /** How long to wait before saying so. Default 10s. */
    stallAfterMs?: number;
    /** Name of the stream or call, shown top-left. */
    title?: string;
    /**
     * Watchers, when the number is KNOWN. Pass `null` (or omit) when it is not.
     *
     * `null`/omitted and `0` are DIFFERENT claims and this component keeps them
     * apart: null renders no badge at all ("nobody has told us"), and a numeric
     * 0 renders "0 watching" ("somebody counted, and the answer was nobody").
     *
     * They were collapsed once — 0 was suppressed as if it were unknown — and
     * that is the wrong way round for this codebase specifically. Viewer count
     * here was STRUCTURALLY zero for a long time (the tracker had no callers at
     * all, so every channel reported an empty house), and a visible "0 watching"
     * is the only thing that distinguishes a working counter from a missing
     * one. Suppressing the zero hides exactly the failure worth catching.
     *
     * So a caller must never turn "not told" into 0 to satisfy the type. Omit
     * the prop instead — see WrappedStreamStage, which spreads it conditionally.
     */
    viewerCount?: number | null;
    /**
     * The caller's claim that this should be live. It is ANDed with what the
     * player actually managed to do, so on the HLS path a claim alone will not
     * light the badge — a composed playlist URL is not a broadcast.
     */
    live?: boolean;
    /**
     * Force the audio-only presentation on or off. Omitted, the stage works it
     * out: no usable video track on the realtime path, `videoWidth === 0` on
     * the HLS path.
     */
    audioOnly?: boolean;
    /** Who is broadcasting. Gives an audio-only stream a face and a name. */
    speakerName?: string;
    speakerAvatarUrl?: string;
    /**
     * Chat to rotate over the video. Empty or omitted renders no ticker at all,
     * so a silent stream is not carrying an empty chat frame.
     */
    chatMessages?: readonly StreamChatMessage[];
    /** Forwarded to the ticker. */
    chatVisibleCount?: number;
    chatRotateMs?: number;
    /**
     * Whether the stream starts muted. Default true, and effectively mandatory:
     * browsers refuse to autoplay audible media, so an unmuted stage would not
     * start at all. The viewer can unmute from the stage itself.
     */
    muted?: boolean;
    /** Offer a fullscreen control. Default true; hidden where the API is absent. */
    allowFullscreen?: boolean;
    /**
     * Show how far behind the live edge HLS playback is. Default true. HLS runs
     * seconds behind by construction, and a viewer who does not know that reads
     * the delay as a frozen stream.
     */
    showLatency?: boolean;
    /** Controls rendered bottom-right, e.g. leave / mute / fullscreen. */
    controls?: ReactNode;
    /** Shown centred when there is no stream. */
    placeholder?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

export declare function StreamVideo({ stream, muted, videoRef, className, onPlayStateChange, }: StreamVideoProps): JSX.Element;

export declare type StreamVideoPlayState = 'playing' | 'paused-by-autoplay' | 'ended';

export declare interface StreamVideoProps {
    stream: MediaStream;
    muted?: boolean;
    /** Optional external ref. Lets callers reach the underlying <video>
     *  for OS-level Picture-in-Picture. */
    videoRef?: MutableRefObject<HTMLVideoElement | null>;
    /** Tailwind class overrides. Defaults to `h-full w-full object-cover`. */
    className?: string;
    /** Notifies on playback state transitions. Fires `paused-by-autoplay`
     *  when the browser rejects autoplay with `NotAllowedError`. */
    onPlayStateChange?: (state: StreamVideoPlayState) => void;
}

export declare interface SubNavItem {
    /** Path relative to the section root, e.g. "summary" or "crawl". For action
     *  items (onClick set), this is just used as a React key — provide something
     *  unique like "halt" or "manual". */
    path: string;
    label: string;
    /** Optional small badge (e.g. live count) shown right-aligned. */
    count?: number | string;
    /** Optional dim subtitle below the label. */
    hint?: string;
    /** Optional group heading. When set on any item, the layout renders
     *  collapsible sections by group. Items without a group go into an
     *  un-headered first section. */
    group?: string;
    /** If set, the item renders as a button that calls onClick instead of a
     *  link that navigates. Use for in-page actions like Halt or toggle. */
    onClick?: () => void;
    /** Optional left-side accent color (action items often want danger/warning). */
    accent?: 'default' | 'danger' | 'warning' | 'success';
    /** If any item in a group specifies groupScrollAfter, cap the visible
     *  height at that many items and make the rest scrollable. */
    groupScrollAfter?: number;
}

export declare function SubNavLayout({ title, items, titleAction, railHeader, railWidth, storageKey, secondaryTitle, secondaryItems, secondaryStorageKey, secondaryRailWidth, renderNavItem, railLabel, contentAs, contentLabel, children, }: SubNavLayoutProps): JSX.Element;

export declare interface SubNavLayoutProps {
    /** Section title shown at top of the rail. */
    title: string;
    items: SubNavItem[];
    /** Optional element rendered next to the title (e.g. a help "?" button). */
    titleAction?: ReactNode;
    /** Optional content rendered above the nav items (e.g. a [+ New] button). */
    railHeader?: ReactNode;
    /** Override the default rail width. */
    railWidth?: number;
    /** Storage key prefix for collapsed-section persistence (default 'subnav'). */
    storageKey?: string;
    /** Secondary rail — rendered between the primary rail and main content.
     *  Keeps section-specific items separate from the top-level nav. */
    secondaryTitle?: string;
    secondaryItems?: SubNavItem[];
    secondaryStorageKey?: string;
    secondaryRailWidth?: number;
    /**
     * Custom renderer for navigation link items (items without an onClick).
     * Receives the item, its pre-built body content (label + hint + count), and
     * the base inactive CSSProperties to apply to the link element.
     *
     * Use this to integrate with your router's NavLink (e.g. React Router v7):
     * ```tsx
     * renderNavItem={(item, children, baseStyle) => (
     *   <NavLink
     *     to={item.path}
     *     style={({ isActive }) =>
     *       isActive
     *         ? { ...baseStyle, borderLeft: '3px solid var(--color-primary)', background: 'var(--color-surface-hover)', color: 'var(--color-text-primary)' }
     *         : baseStyle
     *     }
     *   >
     *     {children}
     *   </NavLink>
     * )}
     * ```
     *
     * If not provided, a plain `<a href={item.path}>` is rendered with no
     * active-state detection.
     *
     * `activeNavItemClassName`/`inactiveNavItemClassName` (exported alongside
     * `activeNavItemStyle` below) are the className-based equivalent, for a
     * `NavLink` `className={({isActive}) => ...}` integration that wants no
     * inline `style` prop at all.
     */
    renderNavItem?: (item: SubNavItem, children: ReactNode, baseStyle: CSSProperties) => ReactNode;
    /**
     * `aria-label` for the primary rail's `<nav>`. Undefined (the default)
     * renders today's markup with no label — set it when a page carries more
     * than one nav landmark and a screen reader needs to tell them apart.
     */
    railLabel?: string;
    /**
     * Element for the content pane. Defaults to `'main'` — today's markup.
     * A page that already sits inside its shell's own `<main id="main-content">`
     * should pass `'section'` (with `contentLabel` set, so the region still has
     * a name) to avoid a second `<main>` landmark.
     */
    contentAs?: 'main' | 'section' | 'div';
    /** `aria-label` for the content pane. Only meaningful (and recommended)
     *  when `contentAs` is `'section'`, so the named region reads as one. */
    contentLabel?: string;
    /**
     * The main content area. When used with React Router, omit this and pass an
     * `<Outlet />` as children, or leave empty if the router renders children
     * directly. Defaults to rendering children.
     */
    children?: ReactNode;
}

export declare function SuggestionCard({ reason, title, label, tone, meta, context, onSelect, actionLabel, disabled, className, 'data-testid': testId, }: SuggestionCardProps): JSX.Element;

export declare interface SuggestionCardProps {
    /** Why this is being suggested. Shown above the title — see the note above. */
    reason: string;
    /** The thing itself. */
    title: string;
    /**
     * Short category shown as a pill beside the reason, e.g. "blocked".
     * Omit where every suggestion on screen is the same kind.
     */
    label?: string;
    /** Tone for the label pill. Defaults to neutral. */
    tone?: Tone;
    /** What acting costs — estimates, owner, target. Kept to one line. */
    meta?: ReactNode;
    /** Where it points, e.g. an initiative. Rendered as a quiet trailing note. */
    context?: string;
    /** Primary action. The whole card is the hit target. */
    onSelect: () => void;
    /** Verb for the action, shown on hover/focus. Default "Use this". */
    actionLabel?: string;
    disabled?: boolean;
    className?: string;
    'data-testid'?: string;
}

export declare function SummaryPanel({ status, markdown, renderMarkdown, title, errorMessage, errorDetail, pendingMessage, idleState, className, }: SummaryPanelProps): JSX.Element;

export declare interface SummaryPanelProps {
    status: TranscriptStatus;
    /** The raw markdown returned by GET /api/recordings/:id/summary. */
    markdown?: string | null;
    /** Caller-provided renderer. If omitted, the markdown is rendered as
     *  a <pre>-wrapped code block — readable but not pretty. */
    renderMarkdown?: (md: string) => ReactNode;
    /** Optional title above the panel. Defaults to "Summary". */
    title?: string;
    /** Written for a person — see TranscriptPanel.errorMessage. */
    errorMessage?: string;
    /** The raw internal text behind it, shown behind a disclosure. */
    errorDetail?: string | null;
    pendingMessage?: string;
    idleState?: ReactNode;
    className?: string;
}

/** A sun: the light theme — "switch to (or currently in) light mode". */
export declare function SunIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** Which colour family a primitive paints in. See the block comment above. */
export declare type SurfaceTone = 'surface' | 'code';

/**
 * Accessible on/off toggle. Renders as a `role="switch"` button so screen
 * readers announce the state. Use inside `FormField` for a labeled row, or
 * pass `aria-label` directly for inline use.
 */
export declare function Switch({ checked, onChange, disabled, size, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, className, style, 'data-testid': testId, }: SwitchProps): JSX.Element;

export declare interface SwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    size?: SwitchSize;
    /** Accessible label — required for screen readers when no visible label is wired. */
    'aria-label'?: string;
    /** When using <FormField label="..."><Switch ...></FormField>, set this to the label's id. */
    'aria-labelledby'?: string;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}

export declare type SwitchSize = 'sm' | 'md';

export declare interface SyncConflict {
    conflictId: string;
    sourceId: string;
    documentId: string;
    /**
     * The document's human name.
     *
     * Additive and optional. The review surface leads with the DOCUMENT, and
     * until now the only document identity in this payload was `documentId` — so
     * the page could not name the thing it was asking the operator to change.
     * Absent falls back to `documentId`.
     */
    documentTitle?: string;
    documentTypeId: string | null;
    /** Stable identity in the source system (e.g. Drive file id). */
    sourceRef: string;
    /** Free-form short summary, e.g. "title and body changed remotely". */
    summary: string;
    fields: ConflictField[];
    status: SyncConflictStatus;
    /** Last edit time from the platform side. */
    platformUpdatedAt: string;
    /** Last edit time from the source side. */
    sourceUpdatedAt: string;
    detectedAt: string;
    resolvedAt?: string | null;
}

export declare type SyncConflictStatus = 'pending' | 'resolved' | 'discarded';

export declare interface SyncStats {
    /** Total files the adapter saw on the source. */
    filesFound: number;
    /** Newly-ingested files (not seen before). */
    filesNew: number;
    /** Existing files whose hash changed since last sync. */
    filesUpdated: number;
    /** Files skipped (already-seen + unchanged). */
    filesSkipped: number;
    /** Errors during this sync (per-file failures). */
    errors: number;
    /** Sync duration in ms. */
    durationMs: number;
}

/** Short alias — `<T>` reads better inline in dense JSX than `<Text>`. */
export declare const T: typeof Text_2;

export declare interface TabItem {
    id: string;
    label: ReactNode;
    icon?: ReactNode;
    badge?: ReactNode;
    disabled?: boolean;
    /** data-testid rendered on this tab's trigger button. Overrides Tabs' `getItemTestId` for this item. */
    testId?: string;
}

export declare function Table({ children, className, ...rest }: TableProps): JSX.Element;

export declare function TableBody({ children, className, ...rest }: TableBodyProps): JSX.Element;

export declare interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
    children: ReactNode;
}

export declare function TableHead({ children, className, ...rest }: TableHeadProps): JSX.Element;

export declare interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {
    children: ReactNode;
}

export declare interface TableProps extends HTMLAttributes<HTMLTableElement> {
    children: ReactNode;
}

export declare function TableRow({ children, clickable, className, ...rest }: TableRowProps): JSX.Element;

export declare interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
    children: ReactNode;
    clickable?: boolean;
}

export declare function TableTd({ children, className, ...rest }: TableTdProps): JSX.Element;

export declare interface TableTdProps extends TdHTMLAttributes<HTMLTableCellElement> {
    children?: ReactNode;
}

export declare function TableTh({ children, sortable, sortDirection, className, ...rest }: TableThProps): JSX.Element;

export declare interface TableThProps extends ThHTMLAttributes<HTMLTableCellElement> {
    children?: ReactNode;
    sortable?: boolean;
    sortDirection?: 'asc' | 'desc' | null;
}

export declare function TabPanel({ id, when, idPrefix, className, style, children }: TabPanelProps): JSX.Element | null;

export declare interface TabPanelProps {
    /** The tab id this panel is associated with. */
    id: string;
    /** Currently-active tab id. Panel renders only when these match. */
    when: string;
    /** Must match the Tabs `idPrefix` for accessibility wiring. Auto-generated tabs without an idPrefix should pass it through. */
    idPrefix?: string;
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
}

export declare function Tabs({ items, value, onValueChange, variant, size, badgeStyle, className, style, 'aria-label': ariaLabel, idPrefix: idPrefixProp, getItemTestId, stretch, itemClassName, 'data-testid': testId, }: TabsProps): JSX.Element;

export declare interface TabsProps {
    items: TabItem[];
    value: string;
    onValueChange: (id: string) => void;
    variant?: TabsVariant;
    size?: 'sm' | 'md';
    /**
     * `chip` (default): a count sits in a small grey pill. `plain`: muted
     * numerals after the label, no box — "Decisions  2".
     */
    badgeStyle?: 'chip' | 'plain';
    className?: string;
    style?: CSSProperties;
    'aria-label'?: string;
    /** Shared id used to wire <TabPanel> regions to their <tab> triggers. Auto-generated if omitted. */
    idPrefix?: string;
    /** Derives a data-testid per item when the item itself has no `testId`. */
    getItemTestId?: (item: TabItem) => string;
    /**
     * Every tab grows to fill equal width of the tablist (`flex-1`) instead of
     * sizing to its own label — a tab bar that spans a fixed-width container
     * (a modal header, a narrow side panel) where uneven tab widths leave a
     * ragged edge. Default: unchanged, each tab sized to its content.
     */
    stretch?: boolean;
    /** Extra classes merged onto every tab trigger `<button>`. */
    itemClassName?: string;
    /**
     * `data-testid` on the tablist container. The per-item hook (`getItemTestId`,
     * 2.350.0) covered the triggers but left the bar itself unaddressable, so a
     * spec that scopes its queries to the tab bar — or just asserts the bar
     * exists before any tab does — still had to hand-roll the whole `role=
     * "tablist"` element to hang one attribute on it.
     */
    'data-testid'?: string;
}

export declare type TabsVariant = 'underline' | 'pill' | 'segmented';

export declare function TagEditor({ 'aria-label': ariaLabel, value, onChange, placeholder, suggestions, lowercase, }: TagEditorProps): JSX.Element;

export declare interface TagEditorProps {
    /** Accessible name for the draft-tag box; defaults to the placeholder text. */
    'aria-label'?: string;
    value: string[];
    onChange: (tags: string[]) => void;
    placeholder?: string;
    suggestions?: string[];
    /**
     * Lowercase tags before insertion. Defaults to true to preserve historical
     * behavior. Set false when you need case-sensitive identifiers (e.g. Cedar
     * action names like `ViewSalary`).
     */
    lowercase?: boolean;
}

declare interface TaskAssignment {
    kind: 'task';
    sectionId: string;
    sectionTitle: string;
    itemId: string;
    taskText: string;
    status: string;
    priority: string;
}

export declare function TaskComposer({ title, description, titlePlaceholder, promptPlaceholder, suggestions, suggestionsTitle, suggestionsLoading, suggestionsEmpty, onSubmit, onChooseSuggestion, submitLabel, hint, busy, className, 'data-testid': testId, }: TaskComposerProps): JSX.Element;

export declare interface TaskComposerProps {
    /** Section heading, e.g. "Queue a job". */
    title: string;
    /** One line under the heading saying what happens on submit. */
    description?: string;
    titlePlaceholder?: string;
    promptPlaceholder?: string;
    /** Offered above the fields. Empty or omitted renders no strip at all. */
    suggestions?: readonly ComposerSuggestion[];
    /** Heading for the strip. */
    suggestionsTitle?: string;
    /** Shown in place of the strip while suggestions are still being fetched. */
    suggestionsLoading?: boolean;
    /**
     * Shown when there are no suggestions AND loading is done. Omit to render
     * nothing — an empty state for an optional nicety is itself noise.
     */
    suggestionsEmpty?: ReactNode;
    onSubmit: (task: {
        title: string;
        prompt: string;
        suggestionId?: string;
    }) => void;
    /** Fires when a suggestion is chosen, before the fields are filled. */
    onChooseSuggestion?: (suggestion: ComposerSuggestion) => void;
    submitLabel?: string;
    /** Quiet note beside the submit button, e.g. where it will run. */
    hint?: ReactNode;
    busy?: boolean;
    className?: string;
    'data-testid'?: string;
}

export declare interface TaskItem {
    id: string;
    text: string;
    status: 'pending' | 'acked' | 'done' | 'rejected';
    assignee: string;
    ackedBy: string;
    ackedAt: string;
    priority: 'low' | 'medium' | 'high';
    notes: string;
    dueDate?: string;
    category?: string;
}

/** A percentage the strip is willing to print: finite, clamped, rounded. */
export declare function taskPercent(percent: number | undefined): number | null;

export declare function TasksEditorRenderer({ section, editable, onAddItem, onUpdateItem, onRemoveItem, }: SectionRendererProps): JSX.Element;

export declare const tasksFieldType: FieldTypeDefinition;

export declare function TasksReaderRenderer({ section, onUpdateItem, onNavigateToEditor }: SectionRendererProps): JSX.Element;

export declare function TaskStrip({ label, status, phase, percent, icon, onPause, onResume, onStop, onOpen, onDismiss, className, 'data-testid': testId, }: TaskStripProps): JSX.Element;

export declare interface TaskStripProps {
    /** What the task is — "Creating release-readiness deck". */
    label: string;
    status: AgentTaskStatus;
    /** What it is doing now — "Editing slide 4". Replaces the status word when given. */
    phase?: string;
    /**
     * A REAL completion percentage from the run, 0–100. Omit when the source
     * does not report one; the strip then shows no bar rather than a guess.
     */
    percent?: number;
    /** Leading glyph. Defaults to a status dot. */
    icon?: ReactNode;
    onPause?: () => void;
    onResume?: () => void;
    onStop?: () => void;
    /** "Open run" — jump to the run's full view. */
    onOpen?: () => void;
    /** Hide the strip. The task keeps running. */
    onDismiss?: () => void;
    className?: string;
    'data-testid'?: string;
}

export declare interface TeamChannelItem {
    channel: string;
    name: string;
    unreadCount?: number;
    mentioned?: boolean;
    muted?: boolean;
    private?: boolean;
    live?: boolean;
    /** Pinned WITHIN its team — see `onTogglePinChannel` on the tree props. */
    pinned?: boolean;
}

export declare function TeamChannelTree({ teams, activeChannel, onSelectChannel, onToggleTeam, onCreateChannel, onManageTeam, onLeaveTeam, onTogglePinTeam, onTogglePinChannel, onCreateTeam, heading, filter, collapsed, onToggleCollapse, className, 'data-testid': testId, }: TeamChannelTreeProps): JSX.Element;

export declare interface TeamChannelTreeProps {
    teams: readonly TeamTreeItem[];
    activeChannel?: string | null;
    onSelectChannel: (channel: string) => void;
    /** Controls expansion when given; the tree keeps its own state when absent. */
    onToggleTeam?: (teamId: string, expanded: boolean) => void;
    /**
     * The + on a team row. Receives the button itself so the host can hang the
     * create form off it — beside the team it is creating in, not centred over
     * the whole app.
     */
    onCreateChannel?: (teamId: string, trigger: HTMLElement) => void;
    /** "Manage team" in the team's ⋯ menu. */
    onManageTeam?: (teamId: string) => void;
    /** "Leave team" in the team's ⋯ menu. */
    onLeaveTeam?: (teamId: string) => void;
    /**
     * "Pin" / "Unpin" in the team's ⋯ menu — same language as `ConversationList`'s
     * `onTogglePin`. Pinned teams sort before unpinned ones (stable within each
     * group; see the sort below).
     */
    onTogglePinTeam?: (teamId: string, next: boolean) => void;
    /**
     * Pin / unpin one channel inside its team. Unlike a team's ⋯ menu, a channel
     * row has no menu today, so this is offered as a single hover-revealed
     * button rather than opening a `DropdownMenu` for one action — see the
     * render below for why. A pinned channel sorts before its unpinned siblings
     * but stays inside its team: the tree is a hierarchy, and lifting a channel
     * out into a flat "Pinned" group would be a second structure fighting the
     * first. A flat, cross-team Pinned group (if the host wants one) is the
     * host's business, built from this same `pinned` field.
     */
    onTogglePinChannel?: (channel: string, next: boolean) => void;
    /** The + on the "Teams" heading. Receives the button, for the same reason. */
    onCreateTeam?: (trigger: HTMLElement) => void;
    /** Hides the "Teams" heading for a host that draws its own. */
    heading?: string | false;
    /**
     * The rail's "Find a chat" text, so a channel inside a team can be found by
     * typing its name.
     *
     * The rail filtered its FLAT rows and left the tree alone, so a channel that
     * lived in a team was unreachable by search — typing "standups" returned
     * nothing while #Standups sat one fold away. Teams and Slack both find
     * channels this way and it is how people expect to reach one they are not
     * already looking at.
     *
     * While filtering, a matching team is shown OPEN regardless of how it was
     * left — and without disturbing that: the reader's own expansion is
     * untouched underneath and returns intact when the box is cleared. A team
     * whose NAME matches keeps all its channels (you asked for the team); any
     * other shows only the channels that match.
     */
    filter?: string;
    /**
     * Folds the whole tree away behind its heading, the way the rail's other
     * sections fold. Controlled together with `onToggleCollapse` — the host owns
     * it so it can persist it, and the heading is inert without the handler.
     *
     * Distinct from a team's own expansion (`expanded` / `onToggleTeam`): that
     * opens one team's channels, this hides the Teams section outright, and
     * reopening it leaves every team exactly as expanded as it was.
     */
    collapsed?: boolean;
    /** Fires with the state the host should switch to. */
    onToggleCollapse?: (next: boolean) => void;
    className?: string;
    'data-testid'?: string;
}

export declare interface TeamTreeItem {
    teamId: string;
    name: string;
    avatarUrl?: string;
    channels: readonly TeamChannelItem[];
    expanded?: boolean;
    /** Pinned among the other teams — see `onTogglePinTeam` on the tree props. */
    pinned?: boolean;
}

export declare type TeamVisibility = 'org' | 'private';

export declare function TechnicalDetails({ text, label, hideLabel, defaultOpen, className, testId, }: TechnicalDetailsProps): JSX.Element | null;

export declare interface TechnicalDetailsProps {
    /** The raw text. Rendered verbatim. Nothing renders when empty. */
    text?: string | null;
    /** Trigger copy, collapsed state. Default "Show technical details". */
    label?: string;
    /** Trigger copy, expanded state. Default "Hide technical details". */
    hideLabel?: string;
    /** Start expanded. Default false — the point is that it stays out of the way. */
    defaultOpen?: boolean;
    className?: string;
    testId?: string;
}

/** A page with a dashed block: "a template". Since 2.390.3. */
export declare function TemplateIcon({ size, ...rest }: GlyphProps): JSX.Element;

declare const TERMINAL_DECISIONS: {
    readonly acked: "approved";
    readonly done: "approved";
    readonly rejected: "rejected";
};

/** Alias kept for clarity in contexts where "terminal log" reads better. */
export declare const TerminalLog: typeof LogStream;

export declare type TerminalRendererStatus = keyof typeof TERMINAL_DECISIONS;

declare function Text_2({ as, className, title, children, wrap, ...rest }: TextProps): JSX.Element;
export { Text_2 as Text }

export declare const Textarea: ForwardRefExoticComponent<TextareaProps & RefAttributes<HTMLTextAreaElement>>;

export declare interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'rows'> {
    /** Fixed row count. Mutually exclusive with autoResize. */
    rows?: number;
    /** Minimum visible rows (used with autoResize). Default: 2. */
    minRows?: number;
    /** Maximum rows before the box scrolls (used with autoResize). */
    maxRows?: number;
    /** Grow to fit content automatically. Default: false. */
    autoResize?: boolean;
    /** When true, applies a danger-colored border. */
    invalid?: boolean;
    'data-testid'?: string;
}

export declare function TextEditorRenderer(props: SectionRendererProps): JSX.Element;

export declare const textFieldType: FieldTypeDefinition;

export declare interface TextProps {
    /** Element to render as. Default `'span'`. */
    as?: 'span' | 'div' | 'p' | 'li';
    className?: string;
    title?: string;
    /** Forwarded to `Inline`'s own `wrap` (`flex-wrap` vs not). Default
     *  `false` — a single line of text, matching a plain inline element. */
    wrap?: boolean;
    role?: string;
    'aria-label'?: string;
    'aria-hidden'?: boolean | 'true' | 'false';
    onClick?: MouseEventHandler<HTMLElement>;
    'data-testid'?: string;
    id?: string;
    children?: ReactNode;
}

export declare function TextReaderRenderer({ section, fragment }: SectionRendererProps): JSX.Element;

declare interface TextSelectionData {
    start: number;
    end: number;
    text: string;
}

declare type Theme = 'light' | 'dark';

/**
 * ThemeTokens key -> the `@theme` custom property in src/styles.css that
 * Tailwind utilities actually compile against.
 *
 * Why this exists: ThemeProvider only ever wrote `--ui-*`, and no utility class
 * reads those, so `<ThemeProvider theme={{ primary: 'red' }}>` changed nothing
 * visible. Writing these names too is what makes the provider real. Keys with
 * no semantic counterpart (textInverse, surfaceOverlay, borderLight, …) stay
 * `--ui-*`-only and are intentionally absent.
 */
export declare const THEME_TOKEN_ALIASES: Partial<Record<keyof ThemeTokens, string>>;

declare interface ThemeContextValue {
    theme: Theme;
    toggleTheme: () => void;
}

/**
 * Injects the theme as CSS custom properties on the document root.
 *
 * Writes BOTH namespaces:
 *   - `--ui-*`   for every ThemeTokens key (kept for `cssVar()` callers)
 *   - `--color-*` / `--radius-*` for keys with a real token counterpart, which
 *     is what Tailwind utilities compile against
 *
 * The second half is what makes this component do anything. Until v2.40.2 it
 * wrote only `--ui-*`, which no utility class reads, so
 * `<ThemeProvider theme={{ primary: 'red' }}>` was silently inert.
 *
 * Mounting with no overrides is a no-op: the light preset mirrors the @theme
 * defaults in src/styles.css.
 *
 * `preset="dark"` is PARTIAL — it re-tones text/surface/border and the semantic
 * colours, but the token set has no dark-specific palette, so surfaces that use
 * literal utilities won't follow. Treat it as a starting point.
 */
export declare function ThemeProvider({ children, preset, theme, tones }: ThemeProviderProps): JSX.Element;

export declare interface ThemeProviderProps {
    children?: ReactNode;
    /** Base preset to use. Defaults to 'light'. */
    preset?: 'light' | 'dark';
    /** Partial overrides merged on top of the preset. */
    theme?: Partial<ThemeTokens>;
    /**
     * Rebrand tones from the semantic scale — the recommended path, because it
     * maps 1:1 onto what every tinted surface in the library reads:
     *
     *   <ThemeProvider tones={{ accent: { base: '#0d9488', bg: '#f0fdfa' } }}>
     *
     * Equivalent to overriding `--color-accent` / `--color-accent-bg` in CSS.
     */
    tones?: Record<string, ToneOverride>;
}

/**
 * Returns all ThemeTokens as a Record mapping CSS variable names to their values.
 */
export declare function themeToCssVars(tokens: ThemeTokens): Record<string, string>;

/** The full set of design tokens exposed as CSS custom properties. */
export declare interface ThemeTokens {
    primary: string;
    primaryDark: string;
    primaryLight: string;
    danger: string;
    dangerLight: string;
    success: string;
    successLight: string;
    warning: string;
    warningLight: string;
    info: string;
    infoLight: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    textInverse: string;
    background: string;
    surface: string;
    surfaceRaised: string;
    surfaceOverlay: string;
    border: string;
    borderLight: string;
    spaceXs: string;
    spaceSm: string;
    spaceMd: string;
    spaceLg: string;
    spaceXl: string;
    fontXs: string;
    fontSm: string;
    fontMd: string;
    fontLg: string;
    fontXl: string;
    radiusSm: string;
    radiusMd: string;
    radiusLg: string;
    radiusXl: string;
    radiusFull: string;
    shadowSm: string;
    shadowMd: string;
    shadowLg: string;
    shadowXl: string;
}

/**
 * A collapsible `<details>` block for showing chain-of-thought reasoning.
 *
 * Pair with a parser that strips `<thinking>...</thinking>` from the assistant
 * message and feeds the extracted text into `content`.
 */
export declare function ThinkingBlock({ content, streaming, defaultOpen, className, }: ThinkingBlockProps): JSX.Element;

export declare interface ThinkingBlockProps {
    /** the thinking/reasoning text */
    content: string;
    /** if true, show "Thinking…" and ThinkingDots when content empty */
    streaming?: boolean;
    /** default false (collapsed) */
    defaultOpen?: boolean;
    className?: string;
}

/**
 * Three dots breathing in sequence — "still going".
 *
 * The dots take `currentColor`, so the caller sets them with a text colour the
 * way every other glyph in this library works. There is no `color` prop: it
 * existed, took an arbitrary CSS string, and could only ever be applied as an
 * inline style — which is banned here, and which nothing was using.
 *
 * The keyframes live in `styles.css` with the rest of them. They were an inline
 * `<style>` injected by the component, so every indicator on screen put another
 * copy of the same rule in the DOM, and the CSS text turned up inside the
 * element's own `textContent` — which is how this was found: a typing indicator
 * read as "@keyframes thinkDot { … } Bob Martinez is typing…".
 */
export declare function ThinkingDots({ size, className }: ThinkingDotsProps): JSX.Element;

export declare interface ThinkingDotsProps {
    /** sm: 4px dots, md: 6px dots (default md). */
    size?: 'sm' | 'md';
    className?: string;
}

export declare function ThumbnailCard({ title, description, category, categoryTone, thumbnail, icon, thumbnailHeight, href, onClick, badge, meta, className, style, 'data-testid': testId, }: ThumbnailCardProps): JSX.Element;

export declare interface ThumbnailCardProps {
    /** Card title (required). */
    title: ReactNode;
    /** Short description. */
    description?: ReactNode;
    /** Optional category label. Shows as a Chip in the content area. */
    category?: ReactNode;
    /** Tone for the category chip. Default 'neutral'. */
    categoryTone?: ChipTone;
    /**
     * Optional thumbnail image URL. When omitted, an icon/emoji placeholder is
     * rendered against a tonal gradient background.
     */
    thumbnail?: string;
    /** Fallback glyph rendered when no thumbnail is provided. */
    icon?: ReactNode;
    /** Pixel height of the thumbnail strip. Default 160. */
    thumbnailHeight?: number;
    /** When provided, renders as an <a> wrapping the card. */
    href?: string;
    /** Optional click handler (renders as a button if no href). */
    onClick?: () => void;
    /** When provided, renders a small badge in the top-right of the thumbnail. */
    badge?: ReactNode;
    /** Optional render function for a custom right-side meta in the content. */
    meta?: ReactNode;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}

export declare interface TimedReaction {
    id: string;
    emoji: string;
    /** Milliseconds from the start of the recording. */
    offsetMs: number;
    displayName?: string;
}

export declare function TitledFrame({ title, titleAction, titleText, active, tone, children, onActivate, className, bodyClassName, style, 'data-testid': testId, }: TitledFrameProps): JSX.Element;

export declare interface TitledFrameProps {
    /** Text sitting in the top border. Keep it short — it is a label, not a line. */
    title: ReactNode;
    /** Right-aligned content in the top border, e.g. a close control. It never
     *  shrinks: when the border is too short for both, the title truncates. */
    titleAction?: ReactNode;
    /** Plain text of the title, shown as its tooltip — the title truncates, so
     *  a long one is otherwise unreadable. Defaults to `title` when that is a
     *  string. */
    titleText?: string;
    /** Draw the focused border. In a pane grid, exactly one should be true. */
    active?: boolean;
    /**
     * Terminal chrome (`code`, the default) or the app's own surface tokens.
     * `code` is the right choice whenever the frame contains a terminal — a
     * pane that themes with the page but holds a fixed-palette PTY reads as
     * two different applications.
     */
    tone?: TitledFrameTone;
    children: ReactNode;
    /** Fires on mousedown anywhere in the frame — how a pane claims focus. */
    onActivate?: () => void;
    className?: string;
    /** Class for the content region, e.g. padding or `overflow-auto`. */
    bodyClassName?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}

export declare type TitledFrameTone = 'code' | 'surface';

export declare function Toast({ id, message, type, exiting, actionLabel, onAction, onDismiss }: ToastProps): JSX.Element;

export declare interface ToastContextValue {
    toast: (message: string, opts?: ToastOptions) => void;
}

export declare interface ToastOptions {
    type?: ToastType;
    durationMs?: number;
    actionLabel?: string;
    onAction?: () => void;
}

export declare interface ToastProps {
    id: string;
    message: string;
    type: ToastType;
    /** Exit state drives fade-out animation before removal from the DOM. */
    exiting?: boolean;
    actionLabel?: string;
    onAction?: () => void;
    onDismiss: (id: string) => void;
}

export declare function ToastProvider({ children }: {
    children: ReactNode;
}): JSX.Element;

export declare type ToastType = 'info' | 'success' | 'warning' | 'error';

/** Normalize either dialect to the canonical vocabulary. */
export declare function toCanonicalMode(mode: AnyCallWidgetMode): CallWidgetMode;

/** Channel names are lowercase and hyphenated, like every chat product's. */
export declare function toChannelName(raw: string): string;

/**
 * Convert a camelCase token key to a CSS variable name with --ui- prefix.
 *
 * Examples:
 *   'primary'      → '--ui-primary'
 *   'primaryDark'  → '--ui-primary-dark'
 *   'textPrimary'  → '--ui-text-primary'
 *   'spaceXs'      → '--ui-space-xs'
 */
export declare function tokenToCssVarName(token: keyof ThemeTokens): string;

export declare interface TokenUsageByModel {
    tokensIn: number;
    tokensOut: number;
}

/** Canonical → the pre-2.106 spelling, for back-compat surfaces. */
export declare function toLegacyMode(mode: CallWidgetMode): LegacyCallWidgetMode;

export declare type Tone = (typeof TONES)[number];

/** Soft background only. */
export declare const TONE_BG: Record<Tone, string>;

/** Border for a soft surface. */
export declare const TONE_BORDER: Record<Tone, string>;

/** Soft tinted surface: background + readable foreground. */
export declare const TONE_SOFT: Record<Tone, string>;

/** Solid fill with inverse text. */
export declare const TONE_SOLID: Record<Tone, string>;

/** Solid swatch only — indicator dots, bars, legend keys. */
export declare const TONE_SOLID_BG: Record<Tone, string>;

/** Foreground only — labels, icons on an untinted surface. */
export declare const TONE_TEXT: Record<Tone, string>;

/**
 * Custom-property name for one role of one tone, e.g.
 * `toneCssVarName('success', 'bg')` -> `--color-success-bg`.
 */
export declare function toneCssVarName(tone: string, role: ToneRole): string;

/** Normalise a caller-supplied tone (folds the deprecated 'purple'). */
export declare function toneKey(tone: ToneOrAlias): Tone;

/** Tone plus the historical alias kept for source compatibility. */
export declare type ToneOrAlias = Tone | 'purple';

/** Overrides for one tone in the semantic scale. Omitted roles keep their default. */
export declare interface ToneOverride {
    /** Solid fill / icon / indicator dot. */
    base?: string;
    /** Soft tinted background. */
    bg?: string;
    /** Readable text on the soft background. */
    fg?: string;
    /** Border for the soft surface. */
    border?: string;
}

/** The four roles every tone in the scale carries. */
export declare type ToneRole = 'base' | 'bg' | 'fg' | 'border';

export declare const TONES: readonly ["neutral", "success", "warning", "danger", "info", "caution", "accent"];

/**
 * The raw CSS variable for a tone's solid swatch, for the rare caller that
 * needs a colour value rather than a class (canvas/SVG fills, chart series).
 * Prefer the class maps above wherever a class will do.
 */
export declare function toneVar(tone: ToneOrAlias): string;

export declare function Toolbar({ children, end, tone, size, sticky, bordered, wrap, className, 'aria-label': ariaLabel, 'data-testid': testId, }: ToolbarProps): JSX.Element;

export declare function ToolbarGroup({ children, divided, tone, className, 'aria-label': ariaLabel, }: ToolbarGroupProps): JSX.Element;

export declare interface ToolbarGroupProps {
    children: ReactNode;
    /**
     * Draw a divider before the group. Cheaper than asking every caller to
     * interleave `<ToolbarSeparator>` by hand, and it cannot end up orphaned at
     * the start of a row when the group before it renders conditionally.
     */
    divided?: boolean;
    tone?: ToolbarTone;
    className?: string;
    /** Names the group for screen readers, e.g. "Zoom". */
    'aria-label'?: string;
}

/** Muted, non-interactive text in the row — "12 selected", "us-east-1". */
export declare function ToolbarLabel({ children, tone, className }: ToolbarLabelProps): JSX.Element;

export declare interface ToolbarLabelProps {
    children: ReactNode;
    tone?: ToolbarTone;
    className?: string;
}

export declare interface ToolbarProps {
    /** Start-aligned content. Wrap related controls in `<ToolbarGroup>`. */
    children?: ReactNode;
    /** Right-aligned content — the low-frequency verbs (refresh, overflow ⋯). */
    end?: ReactNode;
    tone?: ToolbarTone;
    /** `sm` (default) is the shell scale; `md` is for a toolbar that owns a pane. */
    size?: 'sm' | 'md';
    /**
     * Stick to the top of the scroll container. Off by default: a toolbar
     * inside `WorkArea` is already outside the scrolling region, and stacking
     * two sticky layers is how you get a row that hovers over its own header.
     */
    sticky?: boolean;
    /** Bottom hairline separating the row from content. Default true. */
    bordered?: boolean;
    /**
     * Let the row wrap onto a second line instead of scrolling horizontally.
     *
     * The default single row is right for a handful of verbs — run, stop,
     * refresh — where an overflowing control is rare and reachable. It is wrong
     * for a FILTER bar: six controls plus a view switch do not fit a narrow
     * pane, and `overflow-x-auto` then hides real filters behind a scrollbar
     * nobody looks for, which reads as "this toolbar has no status filter"
     * rather than "scroll right". A wrapping row shows every control it holds.
     */
    wrap?: boolean;
    className?: string;
    /**
     * Names the toolbar for screen readers. Default 'Toolbar' — override it
     * whenever a page shows more than one ("Canvas actions", "Run filters").
     */
    'aria-label'?: string;
    'data-testid'?: string;
}

export declare function ToolbarSeparator({ tone, className }: ToolbarSeparatorProps): JSX.Element;

export declare interface ToolbarSeparatorProps {
    tone?: ToolbarTone;
    className?: string;
}

/** @see SurfaceTone — which colour family the toolbar paints in. */
export declare type ToolbarTone = SurfaceTone;

export declare interface ToolCall {
    id: string;
    name: string;
    done: boolean;
    args?: string;
}

export declare interface ToolCallItem {
    id: string;
    name: string;
    done: boolean;
    args?: string;
}

/**
 * A single pill rendering one tool call's name + done/pending state.
 */
export declare function ToolCallPill({ name, done, title, className }: ToolCallPillProps): JSX.Element;

export declare interface ToolCallPillProps {
    name: string;
    done: boolean;
    /**
     * Tooltip text, rendered as the pill's `title` attribute — a place for the
     * raw tool id when `name` is a friendlier display label ("searched
     * knowledge base" vs. the tool's actual name) and the two need to differ.
     * Undefined (the default) renders no `title`, same as today.
     */
    title?: string;
    className?: string;
}

/**
 * A compact strip of tool call pills.
 */
export declare function ToolCallStrip({ toolCalls, className }: ToolCallStripProps): JSX.Element;

export declare interface ToolCallStripProps {
    toolCalls: ToolCall[];
    className?: string;
}

export declare function Tooltip({ content, children, placement, openDelay, closeDelay, disabled, className, 'data-testid': testId, }: TooltipProps): JSX.Element;

export declare type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export declare interface TooltipProps {
    content: ReactNode;
    children: ReactElement;
    placement?: TooltipPlacement;
    /** ms before hover opens the tooltip. Default 350. */
    openDelay?: number;
    /** ms before leaving closes it. Default 100. */
    closeDelay?: number;
    disabled?: boolean;
    className?: string;
    'data-testid'?: string;
}

export declare function TopNav({ items, activeHref, brand, rightSlot, renderLink, maxVisible, className, style, 'aria-label': ariaLabel, }: TopNavProps): JSX.Element;

export declare interface TopNavItem {
    label: ReactNode;
    to: string;
    icon?: ReactNode;
    badge?: ReactNode;
    disabled?: boolean;
}

export declare interface TopNavProps {
    items: TopNavItem[];
    /** Active href — typically the current pathname. An item is active when activeHref === item.to OR activeHref.startsWith(item.to + '/'). */
    activeHref?: string;
    /** Brand/logo slot rendered at the left. */
    brand?: ReactNode;
    /** Optional right-aligned slot (search, user menu, profile, etc.). */
    rightSlot?: ReactNode;
    /** Render function for link elements. Defaults to <a>. Use this to plug in react-router <Link>, next/link, etc. */
    renderLink?: (item: TopNavItem, props: AnchorHTMLAttributes<HTMLAnchorElement>) => ReactNode;
    /** Maximum number of items to render inline before collapsing the rest into a "More" menu. Default: render all. */
    maxVisible?: number;
    className?: string;
    style?: CSSProperties;
    'aria-label'?: string;
}

/** Items → `GroupedListRow`s: leading checkbox or signal dot, and the meta line. Exported for tests. */
export declare function toWorkListRows(items: WorkListItem[], { onToggleDone, testId, metaStyle, pointsLabel, signalDisplay }?: ToWorkListRowsOptions): GroupedListRow[];

export declare interface ToWorkListRowsOptions {
    onToggleDone?: (item: WorkListItem, done: boolean) => void;
    testId?: string;
    /** Since 2.390.0. See `WorkListViewProps.metaStyle`. */
    metaStyle?: WorkListMetaStyle;
    /** Since 2.390.0. See `WorkListViewProps.pointsLabel`. */
    pointsLabel?: 'pts' | 'points';
    /** Since 2.390.0. See `WorkListViewProps.signalDisplay`. */
    signalDisplay?: 'dot' | 'meta';
}

export declare interface TraceSpan {
    traceId: string;
    spanId: string;
    parentSpanId?: string;
    name: string;
    kind: SpanKind;
    startTime: string;
    endTime: string;
    durationMs: number;
    status: SpanStatus;
    attributes: Record<string, string | number | boolean>;
}

export declare interface TraceTimeline {
    traceId: string;
    rootSpanId: string;
    spans: TraceSpan[];
    totalDurationMs: number;
    agentId: string;
    startedAt: string;
}

/** A microphone on a stand: turn what is being said into text. Distinct from
 *  video/MediaIcons' MicIcon, which is a call's mute CONTROL. */
export declare function TranscribeIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function TranscriptOverlay({ lines, maxLines, fadeAfterMs, now: nowProp, className, }: TranscriptOverlayProps): JSX.Element | null;

export declare interface TranscriptOverlayProps {
    lines: CaptionLine[];
    /** How many recent lines to show simultaneously. Default 4. */
    maxLines?: number;
    /**
     * Fade window ms: opacity ramps from 1 toward the 0.35 floor over this
     * span of no-update time. Default = REMOVE_AFTER_MS (3000), so a quiet
     * line fades all the way out and is then removed.
     */
    fadeAfterMs?: number;
    /**
     * "Now" in ms since epoch, used as the reference point for each line's
     * since-last-update opacity. Defaults to `Date.now()` — exposed for
     * deterministic tests and stories. When provided, the internal live-fade
     * interval is disabled, so the render is a pure function of props (plus
     * the per-line displayed-text memory).
     *
     * Without it, any fixture built from fixed ISO timestamps is arbitrarily
     * old by the time it renders, so every line has aged past the 3s linger
     * window and nothing renders at all. Pass the same epoch the fixture
     * timestamps were written against and the ramp is reproducible.
     */
    now?: number;
    className?: string;
}

export declare function TranscriptPanel({ status, segments, currentTimeMs, onSeek, title, errorMessage, errorDetail, pendingMessage, idleState, className, }: TranscriptPanelProps): JSX.Element;

export declare interface TranscriptPanelProps {
    status: TranscriptStatus;
    segments?: TranscriptSegment[];
    /** Current playback position in milliseconds; used to highlight the
     *  active segment. Pass null/undefined to disable highlighting. */
    currentTimeMs?: number | null;
    /** When provided, clicking a segment seeks the player to that time. */
    onSeek?: (timeMs: number) => void;
    /** Optional title above the panel. Defaults to "Transcript". */
    title?: string;
    /** Surface the failure message when status === 'failed'. Write it for a
     *  person: this panel is on a page end users open, so queue names and
     *  transport-library prefixes belong in `errorDetail`, not here. */
    errorMessage?: string;
    /** The raw internal text behind `errorMessage`, revealed behind a
     *  "Show technical details" disclosure. Omit when there is nothing more
     *  to show than the message itself. */
    errorDetail?: string | null;
    /** When status is processing/pending, surface what phase. */
    pendingMessage?: string;
    /** Render-prop slot for the empty/idle state. */
    idleState?: ReactNode;
    className?: string;
}

export declare interface TranscriptSegment {
    startMs: number;
    endMs: number;
    /**
     * Diarization id. OPTIONAL, because a transcript produced without
     * diarization has no speakers to identify — and a required-in-the-type,
     * absent-in-the-payload field is how this panel threw
     * `Cannot read properties of undefined (reading 'length')` out of its
     * colour hash and took the whole recordings page down with it.
     */
    speakerId?: string;
    /** Display name for the speaker. Optional for the same reason. */
    speakerLabel?: string;
    text: string;
    avgLogprob?: number;
    noSpeechProb?: number;
}

export declare type TranscriptStatus = 'idle' | 'pending' | 'processing' | 'ready' | 'failed';

export declare function TransferBubble({ transfer, mine, onCancel, className }: TransferBubbleProps): JSX.Element;

export declare interface TransferBubbleProps {
    transfer: ChatTransfer;
    /**
     * True when the viewer is the sender. Only the sender gets a cancel
     * affordance — a recipient cancelling someone else's upload is not a
     * feature, and offering the button implies a permission that does not exist.
     */
    mine?: boolean;
    onCancel?: (transferId: string) => void;
    className?: string;
}

export declare type TransferPhase = 'started' | 'transferring' | 'verifying' | 'complete' | 'failed' | 'cancelled';

export declare interface TransformNodeData {
    type: 'transform';
    transformType: TransformType;
    expression: string;
    /** Where in context to write the result; defaults to merging into root. */
    outputKey?: string;
    /** Marks this node as an intentional terminal/sink — silences DEAD_END lint. */
    terminal?: boolean;
    retryPolicy?: RetryPolicy;
}

export declare type TransformType = 'jsonpath' | 'template' | 'javascript';

/** A bin: "remove this". */
export declare function TrashIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare type TreeDropPosition = 'before' | 'after' | 'into';

export declare interface TreeNode {
    id: string;
    title: string;
    parentId: string | null;
    isDir?: boolean;
    badge?: ReactNode;
    meta?: string;
    /**
     * Like `meta`, but hidden until the row is hovered or has focus — a
     * version ("v4"), a size. Still in the accessible name, so a screen-reader
     * user hears it without hovering.
     */
    hoverMeta?: string;
    /** Leading glyph after the caret slot — normally a `FileKindMark`. */
    icon?: ReactNode;
    disabled?: boolean;
    /**
     * What is happening to this row right now, for a move the host has sent and
     * not yet heard back about. `pending` draws the row translucent and inert
     * (`aria-busy`); `moved` flashes it as landed. The host clears both — the
     * tree has no idea when a server answered.
     */
    status?: 'pending' | 'moved';
}

export declare function TreeView({ nodes, selectedId, onSelect, defaultExpanded, expanded: controlledExpanded, onToggle, onReorder, canDragNode, canDropNode, renderTrailing, rowMenu, rowMenuLabel, size, className, 'data-testid': testId, }: TreeViewProps): JSX.Element | null;

export declare interface TreeViewProps {
    nodes: TreeNode[];
    selectedId: string | null;
    onSelect: (id: string) => void;
    /** Node ids expanded on first render. Ancestors of `selectedId` auto-expand. */
    defaultExpanded?: string[];
    /**
     * Controlled expansion. When given, the tree renders exactly these ids open
     * and reports every caret click and ArrowLeft/ArrowRight through `onToggle`
     * instead of keeping its own set — for a host that persists expansion or
     * drives it from a URL. Ancestors of `selectedId` are still auto-opened,
     * reported through `onToggle` as well.
     */
    expanded?: string[];
    onToggle?: (id: string, expanded: boolean) => void;
    /** Enables HTML5 drag-and-drop reorder/reparent when provided. */
    onReorder?: (id: string, targetParentId: string | null, position: number) => void;
    /** Host policy for synthetic rows or source-owned roots that cannot move. */
    canDragNode?: (node: TreeNode) => boolean;
    /** Host policy for valid parent/sibling destinations; false removes the drop affordance. */
    canDropNode?: (dragged: TreeNode, target: TreeNode, position: TreeDropPosition) => boolean;
    /** Trailing slot per row — count chip, badge, menu button. */
    renderTrailing?: (node: TreeNode) => ReactNode;
    /**
     * The row's ⋯ menu — Version, Rename, Move, View details. Return `null` or
     * an empty array for a row that has none. Opens from the ⋯ button, a
     * right-click, or Shift+F10 / the context-menu key on the focused row.
     */
    rowMenu?: (node: TreeNode) => DropdownMenuSection[] | null | undefined;
    /** Accessible name of each row's menu button. Default `Actions for <title>`. */
    rowMenuLabel?: (node: TreeNode) => string;
    /**
     * Row scale. `sm` (default) is the 14px / 14px-indent rail. `md` (2.386.0)
     * is the Folders explorer's: 15px titles on 32px rows, an 18px indent step,
     * a selected row in the brand tint with brand ink (its icon follows through
     * `currentColor`), and the ⋯ laid OVER the row's meta on hover instead of
     * holding an empty 24px slot that pushed every time off the right edge.
     */
    size?: TreeViewSize;
    className?: string;
    'data-testid'?: string;
}

export declare type TreeViewSize = 'sm' | 'md';

/**
 * Generic 0..N-point sparkline. Pure SVG, no canvas / chart library.
 * Used by the judge trend chart, but generic enough to be reused
 * elsewhere (request-rate strips, latency mini-charts, etc.).
 *
 * a11y: rendered with `role="img"` + aria-label. The actual SVG is
 * marked `aria-hidden` because polylines aren't screen-reader-meaningful.
 */
export declare function TrendSparkline({ points, yMin, yMax, width, height, stroke, strokeWidth, showLastPoint, showFill, ariaLabel, className, }: TrendSparklineProps): JSX.Element;

export declare interface TrendSparklineProps {
    /** Y-values, oldest → newest. Empty array renders an empty placeholder. */
    points: number[];
    /** Optional fixed Y-axis bounds. Defaults to data extent + 5% padding. */
    yMin?: number;
    yMax?: number;
    /** Pixel width / height for the SVG viewbox. Default 120x32. */
    width?: number;
    height?: number;
    /** Stroke color — default uses CSS var so tone can be tinted by parent. */
    stroke?: string;
    /** Stroke width in viewbox units. Default 1.5. */
    strokeWidth?: number;
    /** Render the last-point dot. Default true. */
    showLastPoint?: boolean;
    /** Render a fill under the line. Default true. */
    showFill?: boolean;
    /**
     * aria-label override. When omitted, the component synthesizes a label
     * from point count + first/last values.
     */
    ariaLabel?: string;
    className?: string;
}

export declare interface TriggerBinding {
    event: TriggerType;
    documentTypeId?: string;
    schedule?: string;
    webhookPath?: string;
    /**
     * 32-byte hex secret used to verify HMAC-SHA256 signatures on incoming
     * webhook payloads. Generated server-side by social-api the first time a
     * webhook trigger binding is saved (see
     * `social-api/src/routes/pipelineDefinitions.ts`). The frontend never
     * mints this — it only displays it so the user can copy it into the
     * external webhook source's "secret" field. Absent → the route falls
     * back to Phase-1 unsigned-OK behavior.
     */
    webhookSecret?: string;
}

export declare interface TriggerNodeData {
    type: 'trigger';
    triggerType: TriggerType;
    /** Required for `document.*` triggers. */
    documentTypeId?: string;
    /** Cron expression; required when `triggerType === 'schedule'`. */
    schedule?: string;
    /** Required when `triggerType === 'webhook'`. */
    webhookPath?: string;
}

export declare type TriggerType = 'manual' | 'document.finalize' | 'document.comment' | 'document.submit' | 'schedule' | 'webhook';

/**
 * What the server could not fit in this message, if anything.
 *
 * Chat metadata has a size budget, and attachments share it with the rich
 * body, the mentions and the reply. Past the cap the server sheds the largest
 * keys and stamps `_truncated` / `_droppedKeys` on what survives.
 *
 * Rendering it is the whole point. Before this, an oversized send looked
 * IDENTICAL to a successful one — the text appeared, the three files the
 * sender had just watched upload were simply not there, and no part of the
 * product ever said so. A message that lost something has to admit it, or the
 * transcript is quietly lying about what was said.
 */
export declare function truncationFromMetadata(metadata: Record<string, unknown> | undefined): {
    droppedKeys: string[];
    labels: string[];
} | null;

export declare interface TypedCanvasEdge {
    id: string;
    from: string;
    to: string;
    /** Short word over the line — "Compact", "Publish". */
    label?: string;
    /** A quiet line under it — "13 notes → 4 patterns · 3h ago". */
    detail?: ReactNode;
    /** Line colour. Default: the brand colour. */
    tone?: Tone;
    /** A dot rides the line. Only for work CONFIRMED running; never under reduced motion. */
    animated?: boolean;
    marker?: TypedCanvasEdgeMarker | null;
}

/** A job marker on an edge — a dot on the line the reader can select. */
export declare interface TypedCanvasEdgeMarker {
    /** Accessible name — "Compaction L0 → L1, running". */
    label: string;
    tone?: Tone;
}

export declare interface TypedCanvasNode<K extends string = string, D = unknown> {
    id: string;
    /** What the node is — `tier`, `library`, `note`, `cluster`… The host's `renderNode` switches on it. */
    kind: K;
    data: D;
    /** Column in the `ltr` layout. Absent: derived from the edges (longest path from a root). */
    rank?: number;
    /** Explicit position. Required-ish for `manual`; in `ltr` it overrides the computed spot. */
    x?: number;
    y?: number;
    /** Accessible name, and the list view's text when there is no `renderListItem`. Default: `id`. */
    label?: string;
}

declare interface TypedDocument {
    documentId: string;
    typeId: string;
    values: Record<string, TypedDocumentValue>;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}

declare type TypedDocumentValue = string | string[] | number | number[] | boolean;

export declare function TypedNodeCanvas<N extends TypedCanvasNode = TypedCanvasNode>({ nodes, edges, renderNode, layout, onSelectNode, onSelectEdge, selectedId, listFallback, renderListItem, nodeWidth, nodeHeight, columnGap, rowGap, controls, caption, minZoom, maxZoom, onViewportChange, emptyLabel, className, 'aria-label': ariaLabel, 'data-testid': testId, }: TypedNodeCanvasProps<N>): JSX.Element;

export declare interface TypedNodeCanvasProps<N extends TypedCanvasNode = TypedCanvasNode> {
    nodes: N[];
    edges: TypedCanvasEdge[];
    renderNode: (node: N, state: {
        selected: boolean;
    }) => ReactNode;
    /** `ltr` (default): rank columns left to right. `manual`: every node at its own `x`/`y`. */
    layout?: 'ltr' | 'manual';
    onSelectNode?: (id: string) => void;
    /** Called from an edge's marker or its line. */
    onSelectEdge?: (id: string) => void;
    /** The selected node OR edge id. */
    selectedId?: string | null;
    /** Draw the list equivalent instead of the canvas. */
    listFallback?: boolean;
    /** The list view's row body. Default: the node's `label` and `kind`. */
    renderListItem?: (node: N) => ReactNode;
    /** Layout box for a node, px. Defaults 224 × 168. */
    nodeWidth?: number;
    nodeHeight?: number;
    /** Space between rank columns, px. Default 144 (room for an edge label). */
    columnGap?: number;
    /** Space between nodes in one column, px. Default 32. */
    rowGap?: number;
    /** Draw `CanvasZoomControls` in the bottom-left corner. Default `true`. */
    controls?: boolean;
    /** A quiet line in the bottom band beside the controls — the legend in words. */
    caption?: ReactNode;
    minZoom?: number;
    maxZoom?: number;
    onViewportChange?: (viewport: Viewport) => void;
    /** Shown when `nodes` is empty. */
    emptyLabel?: string;
    className?: string;
    'aria-label'?: string;
    'data-testid'?: string;
}

/** Where the currently rendered list came from. */
declare type TypesSource = 'loading' | 'remote' | 'cache';

export declare function TypingIndicator({ names, compact, size, className, 'data-testid': testId, }: TypingIndicatorProps): JSX.Element | null;

export declare interface TypingIndicatorProps {
    /**
     * Names currently typing. Empty array → renders nothing (component returns null
     * so callers don't have to wrap it in a conditional).
     */
    names: string[];
    /** Render only the animated dots, with no banner text. Default: false. */
    compact?: boolean;
    /** Dot size (passes through to ThinkingDots). Default 'sm'. */
    size?: 'sm' | 'md';
    className?: string;
    'data-testid'?: string;
}

/**
 * Slides that cite nothing, in deck order.
 *
 * The editor's only hard validation. Empty array means the spec can be saved;
 * anything else is the list the warning names and the reason Save is off.
 */
export declare function uncitedSlideIds(spec: DeckSpec): string[];

/** A curved arrow back: "undo". Since 2.386.5. */
export declare function UndoIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare interface UpdateClientInput {
    clientName?: string;
    redirectUris?: string[];
    postLogoutRedirectUris?: string[];
    grantTypes?: string[];
    responseTypes?: string[];
    scope?: string;
}

export declare interface UpdateEmailTemplateInput {
    name?: string;
    subject?: string;
    htmlBody?: string;
    textBody?: string;
    variables?: string[];
}

export declare interface UpdateGroupInput {
    groupName?: string;
    description?: string;
    permissions?: string[];
}

export declare interface UpdatePoolInput {
    poolName?: string;
    customAttributes?: Record<string, string>;
    settings?: Partial<PoolSettings>;
}

export declare interface UpdateUserInput {
    email?: string;
    givenName?: string;
    familyName?: string;
    nickname?: string;
    picture?: string;
    website?: string;
    customAttributes?: Record<string, unknown>;
}

/** A tray with an arrow leaving it: "upload". Since 2.389.6. */
export declare function UploadIcon({ size, ...rest }: GlyphProps): JSX.Element;

declare interface UrlFilterState<T extends Record<string, string | undefined>> {
    filters: T;
    setFilter: <K extends keyof T>(key: K, value: T[K]) => void;
    clearFilters: () => void;
}

export declare function useActivityBus(options: UseActivityBusOptions): UseActivityBusReturn;

declare interface UseActivityBusOptions {
    sendMessage: (msg: Record<string, unknown>) => void;
    onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
    connectionState: ConnectionState;
    userId: string;
    displayName: string;
    color?: string;
    maxItems?: number;
}

declare interface UseActivityBusReturn {
    events: ActivityEvent[];
    publish: (eventType: string, detail: Record<string, unknown>) => void;
    isLive: boolean;
}

/**
 * Wrap an async function with loading/error/retry state.
 * Useful for API calls in components that need to show loading spinners,
 * error messages, and retry buttons.
 *
 * @param fn Async function to wrap
 * @returns { data, loading, error, execute, retry, reset }
     *
     * @example
     * const { data, loading, error, execute, retry } = useApiCall(
     *   async (pipelineId: string) => {
     *     const res = await fetch(`/api/pipelines/${pipelineId}`);
     *     return res.json();
     *   }
     * );
     *
     * useEffect(() => { execute(pipelineId); }, [pipelineId]);
     */
 export declare function useApiCall<T>(fn: (...args: unknown[]) => Promise<T>): ApiCallState<T>;

 /**
  * Polls /health every `pollMs`. The first sample lands as soon as the network
  * round-trip completes; the hook starts in `unknown` so callers don't flash
  * "degraded" before the first response.
  *
  * Accepts the interval as a bare number (the pre-2.359.0 signature) or an
  * options object.
  */
 export declare function useApiHealth(options?: number | UseApiHealthOptions): ApiHealthSnapshot;

 export declare interface UseApiHealthOptions {
     /** Poll interval. Default 30 s. */
     pollMs?: number;
     /** Origin whose `/health` is polled. Wins over `getApiBaseUrl()`. */
     baseUrl?: string;
 }

 export declare function useAudioLevel(stream: MediaStream | null | undefined): number | null;

 export declare function useAudioRecorder({ getStream, maxMs, mimeType, audioBitsPerSecond }: UseAudioRecorderOptions): AudioRecorder;

 export declare interface UseAudioRecorderOptions {
     /** How to get a microphone — the host owns device preferences and constraints. */
     getStream: () => Promise<MediaStream>;
     /** Recording stops itself here. */
     maxMs?: number;
     /** Preferred container; falls back through what the browser can encode. */
     mimeType?: string;
     audioBitsPerSecond?: number;
 }

 export declare function useAuth(): UseAuthReturn;

 declare interface UseAuthReturn extends AuthState {
     signIn: (email: string, password: string) => Promise<void>;
     signUp: (email: string, password: string) => Promise<void>;
     signOut: () => void;
 }

 export declare function useAwareness(provider: GatewayProvider | null, opts: UseAwarenessOptions): UseAwarenessReturn;

 declare interface UseAwarenessOptions {
     userId: string;
     displayName: string;
     color: string;
     mode: ViewMode;
 }

 declare interface UseAwarenessReturn {
     awareness: AwarenessUpdaters;
     participants: Participant[];
 }

 export declare function useAwarenessState(provider: GatewayProvider | null, initial: Omit<AwarenessFields, 'lastSeen' | 'idle'>): AwarenessUpdaters;

 export declare function useCallWidgetPersistence({ persistKey, defaults, debounceMs, }: UseCallWidgetPersistenceOptions): {
     state: PersistedWidgetState;
     setState: (next: Partial<PersistedWidgetState>) => void;
 };

 export declare interface UseCallWidgetPersistenceOptions {
     /** localStorage key. When undefined, the hook is a no-op (state lives
      *  only in memory) — useful for tests and for ephemeral consumers. */
     persistKey: string | undefined;
     /** Defaults written if no key exists yet (or storage is empty). */
     defaults: PersistedWidgetState;
     /** Debounce window for writes. Default 200ms. */
     debounceMs?: number;
 }

 /** The part of this canvas a surrounding pane covers; zero outside a CanvasPaneLayout. */
 export declare function useCanvasPaneInset(): CanvasPaneInset;

 export declare function useChat(options: UseChatOptions): UseChatReturn;

 /** Every command in scope of the nearest provider; `[]` outside one. */
 export declare function useChatCommands(): ChatCommand[];

 declare interface UseChatOptions {
     sendMessage: (msg: Record<string, unknown>) => void;
     onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
     currentChannel: string;
     connectionState: ConnectionState;
     displayName: string;
 }

 declare interface UseChatReturn {
     messages: ChatMessage[];
     send: (content: string) => void;
 }

 /** The renderer for `kind`, or null when nothing above registered one. */
 export declare function useChatSidePanelRenderer(kind: string): ChatSidePanelRenderer | null;

 /** Every renderer visible here, by kind; `{}` outside a provider. */
 export declare function useChatSidePanelRenderers(): ChatSidePanelRenderers;

 /**
  * Invoke `onClickOutside` when a mousedown occurs outside the ref element.
  * Useful for closing popovers, dropdowns, and modals on outside click.
  *
  * @param ref React ref to the element that should not trigger the callback.
  *   Accepts a nullable ref — under React 19's types `useRef<HTMLDivElement>(null)`
  *   yields `RefObject<HTMLDivElement | null>`, so the previous non-null
  *   `RefObject<T>` signature rejected every ref a component can actually
  *   create (including this hook's own example below). Widening is
  *   source-compatible for existing callers.
  * @param onClickOutside Callback invoked on outside click
  * @param enabled Enable/disable the listener (default: true)
  *
  * @example
  * const menuRef = useRef<HTMLDivElement>(null);
  * useClickOutside(menuRef, () => setMenuOpen(false), menuOpen);
  */
 export declare function useClickOutside<T extends HTMLElement>(ref: RefObject<T | null>, onClickOutside: () => void, enabled?: boolean): void;

 export declare function useCollaborativeDoc(options: UseCollaborativeDocOptions): UseCollaborativeDocReturn;

 declare interface UseCollaborativeDocOptions {
     documentId: string;
     mode: ViewMode;
     ws: UseWebSocketReturn;
     userId: string;
     displayName: string;
     color: string;
     onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
 }

 declare interface UseCollaborativeDocReturn {
     meta: DocumentMeta | null;
     sections: Section[];
     synced: boolean;
     updateMeta: (partial: Partial<DocumentMeta>) => void;
     addSection: (section: Section) => void;
     updateSection: (sectionId: string, partial: Partial<Section>) => void;
     removeSection: (sectionId: string) => void;
     addItem: (sectionId: string, item: TaskItem) => void;
     updateItem: (sectionId: string, itemId: string, partial: Partial<TaskItem>) => void;
     ackItem: (sectionId: string, itemId: string, userId: string) => void;
     rejectItem: (sectionId: string, itemId: string, userId: string) => void;
     removeItem: (sectionId: string, itemId: string) => void;
     getSectionFragment: (sectionId: string) => Y.XmlFragment | null;
     ydoc: Y.Doc | null;
     provider: GatewayProvider | null;
     /**
      * @deprecated NOT IMPLEMENTED. Calling this logs a warning and does
      * nothing — it does not load anything into the document. It is retained
      * only because it is part of this hook's published return shape; removing
      * it is a breaking change. Do not call it expecting an effect.
      */
     loadFromMarkdown: (markdown: string) => void;
     exportJSON: () => DocumentData | null;
     participants: Participant[];
     comments: Record<string, CommentThread[]>;
     addComment: (sectionId: string, opts: {
         text: string;
         userId: string;
         displayName: string;
         color: string;
         parentCommentId?: string | null;
     }) => void;
     resolveThread: (sectionId: string, commentId: string, resolverDisplayName: string) => void;
     unresolveThread: (sectionId: string, commentId: string) => void;
     sectionReviews: Record<string, SectionReview[]>;
     reviewSection: (sectionId: string, status: SectionReview['status'], comment?: string) => void;
     awareness: AwarenessUpdaters;
 }

 export declare function useColorScheme(): ThemeContextValue;

 export declare function useCommandPalette(): CommandPaletteController;

 export declare function useComments({ idToken, roomId, postId, onMessage }: UseCommentsOptions): UseCommentsReturn;

 declare interface UseCommentsOptions {
     idToken: string | null;
     roomId: string | null;
     postId: string | null;
     onMessage: OnMessageFn_2;
 }

 declare interface UseCommentsReturn {
     comments: CommentItem[];
     createComment: (content: string, parentCommentId?: string) => Promise<void>;
     deleteComment: (commentId: string) => Promise<void>;
     /** True only while the thread itself is being fetched. */
     loading: boolean;
     /**
      * True while `createComment` is posting. Separate from `loading` because
      * `CommentThread` swaps the whole list out for "Loading comments…" when
      * `loading` is true — so sharing one flag made every existing comment
      * disappear for the duration of posting a reply.
      */
     submitting: boolean;
     error: string | null;
 }

 export declare function useCRDT(options: UseCRDTOptions): UseCRDTReturn;

 declare interface UseCRDTOptions {
     sendMessage: (msg: Record<string, unknown>) => void;
     onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
     currentChannel: string;
     connectionState: ConnectionState;
 }

 declare interface UseCRDTReturn {
     content: string;
     applyLocalEdit: (newText: string) => void;
     hasConflict: boolean;
     dismissConflict: () => void;
 }

 export declare function useCursors(options: UseCursorsOptions): UseCursorsReturn;

 declare interface UseCursorsOptions {
     sendMessage: (msg: Record<string, unknown>) => void;
     onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
     currentChannel: string;
     connectionState: ConnectionState;
     clientId: string | null;
     displayName: string;
 }

 declare interface UseCursorsReturn {
     cursors: Map<string, RemoteCursor>;
     localCursor: RemoteCursor | null;
     activeMode: CursorMode;
     sendFreeformUpdate: (x: number, y: number) => void;
     sendTableUpdate: (row: number, col: number) => void;
     sendTextUpdate: (position: number, selectionData: TextSelectionData | null, hasSelection: boolean) => void;
     sendCanvasUpdate: (x: number, y: number, tool: CanvasTool, color: string, size: number) => void;
     switchMode: (mode: CursorMode) => void;
 }

 export declare function useCustomFieldTypes(): UseCustomFieldTypesReturn;

 declare interface UseCustomFieldTypesReturn {
     types: CustomFieldType[];
     createType: (draft: Omit<CustomFieldType, 'id' | 'createdAt' | 'updatedAt'>) => CustomFieldType;
     updateType: (id: string, patch: Partial<Omit<CustomFieldType, 'id' | 'createdAt'>>) => void;
     deleteType: (id: string) => void;
 }

 /**
  * Read the surrounding dock, if any. `null` means "standalone" — the body
  * owns its own header and sizing.
  */
 export declare function useDockedPanel(): DockedPanelContextValue | null;

 export declare function useDocTypeProposals(): UseDocTypeProposalsResult;

 declare interface UseDocTypeProposalsResult {
     proposals: DocTypeProposalRow[];
     loading: boolean;
     error: string | null;
     refresh: () => Promise<void>;
     promote: (proposalId: string) => Promise<void>;
     reject: (proposalId: string) => Promise<void>;
 }

 export declare function useDocumentComments(options: UseDocumentCommentsOptions): UseDocumentCommentsReturn;

 declare interface UseDocumentCommentsOptions {
     documentId: string;
     idToken: string | null;
     sendMessage: (msg: Record<string, unknown>) => void;
     onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
     connectionState: string;
 }

 declare interface UseDocumentCommentsReturn {
     comments: Record<string, CommentThread[]>;
     addComment: (sectionId: string, text: string, parentCommentId?: string | null) => Promise<void>;
     resolveThread: (sectionId: string, commentId: string) => Promise<void>;
     unresolveThread: (sectionId: string, commentId: string) => Promise<void>;
     loading: boolean;
 }

 export declare function useDocumentExport(ydoc: Y.Doc | null): UseDocumentExportReturn;

 declare interface UseDocumentExportReturn {
     exportJSON: () => DocumentData | null;
 }

 export declare function useDocumentItems(options: UseDocumentItemsOptions): UseDocumentItemsReturn;

 declare interface UseDocumentItemsOptions {
     documentId: string;
     /** Section IDs to load items for. Items are fetched per-section. */
     sectionIds: string[];
     idToken: string | null;
     sendMessage: (msg: Record<string, unknown>) => void;
     onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
     connectionState: string;
 }

 declare interface UseDocumentItemsReturn {
     items: Record<string, TaskItem[]>;
     addItem: (sectionId: string, item: Partial<TaskItem>) => Promise<void>;
     updateItem: (sectionId: string, itemId: string, updates: Partial<TaskItem>) => Promise<void>;
     removeItem: (sectionId: string, itemId: string) => Promise<void>;
     ackItem: (sectionId: string, itemId: string) => Promise<void>;
     loading: boolean;
     /**
      * Per-section load failures, keyed by sectionId. A section present here
      * failed to load — which is NOT the same as having no items, and the two
      * used to be indistinguishable (see the catch in the load effect).
      * Sections that loaded fine are absent from this map.
      */
     itemErrors: Record<string, string>;
 }

 export declare function useDocumentMetadata(ydoc: Y.Doc | null): UseDocumentMetadataReturn;

 declare interface UseDocumentMetadataReturn {
     meta: DocumentMeta | null;
     updateMeta: (partial: Partial<DocumentMeta>) => void;
 }

 export declare function useDocumentReviews(options: UseDocumentReviewsOptions): UseDocumentReviewsReturn;

 declare interface UseDocumentReviewsOptions {
     documentId: string;
     idToken: string | null;
     sendMessage: (msg: Record<string, unknown>) => void;
     onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
     connectionState: string;
 }

 declare interface UseDocumentReviewsReturn {
     sectionReviews: Record<string, SectionReview[]>;
     reviewSection: (sectionId: string, status: string, comment?: string) => Promise<void>;
     loading: boolean;
 }

 export declare function useDocuments(options: UseDocumentsOptions): UseDocumentsReturn;

 declare interface UseDocumentsOptions {
     sendMessage: (msg: Record<string, unknown>) => void;
     onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
     connectionState: ConnectionState;
 }

 declare interface UseDocumentsReturn {
     documents: DocumentInfo[];
     presence: Record<string, DocumentPresenceUser[]>;
     loading: boolean;
     createDocument: (meta: {
         title: string;
         type: string;
         description?: string;
     }) => void;
     deleteDocument: (documentId: string) => void;
     updateDocumentMeta: (documentId: string, meta: Partial<DocumentInfo>) => void;
     refreshDocuments: () => void;
     refreshPresence: () => void;
 }

 export declare function useDocumentTypes(options?: UseDocumentTypesOptions): UseDocumentTypesReturn;

 declare interface UseDocumentTypesOptions {
     /** Cognito ID token. Attached to every server call when present. */
     idToken?: string | null;
     /**
      * Origin for `/api/document-types`. Applied through
      * `setDocumentTypeApiBaseUrl`, and it has to be given here (or set at boot)
      * because the build-time `VITE_*` names this module falls back to are baked
      * into the LIBRARY's bundle and are always empty for a consumer.
      */
     baseUrl?: string;
 }

 declare interface UseDocumentTypesReturn {
     types: DocumentType_2[];
     /** True while the initial server fetch (or a refresh) is in flight. */
     loading: boolean;
     /** 'remote' = list reflects the server; 'cache' = offline fallback. */
     source: TypesSource;
     /** Last fetch error (when source === 'cache'), else null. */
     error: string | null;
     /** Re-fetch from the server. */
     refresh: () => Promise<void>;
     createType: (data: Omit<DocumentType_2, 'id' | 'createdAt' | 'updatedAt'>) => Promise<SaveOutcome>;
     updateType: (id: string, patch: Partial<Omit<DocumentType_2, 'id' | 'createdAt'>>) => Promise<SaveOutcome>;
     deleteType: (id: string) => Promise<DeleteOutcome>;
     getType: (id: string) => DocumentType_2 | undefined;
 }

 /** The nearest enclosing console surface, or `null` outside one. */
 export declare function useEnclosingConsoleSurface(): ConsoleSurfaceState | null;

 export declare function useEventCallback<A extends any[], R>(fn: ((...args: A) => R) | undefined): (...args: A) => R | undefined;

 export declare function useFriends({ idToken }: UseFriendsOptions): UseFriendsReturn;

 declare interface UseFriendsOptions {
     idToken: string | null;
 }

 declare interface UseFriendsReturn {
     followers: PublicProfile[];
     following: PublicProfile[];
     friends: PublicProfile[];
     follow: (userId: string) => Promise<void>;
     unfollow: (userId: string) => Promise<void>;
     loading: boolean;
     error: string | null;
     /**
      * Failure of the three list loads specifically. Kept separate from `error`,
      * which is whatever the last follow/unfollow reported.
      *
      * A caller cannot use `error` to decide between "you follow nobody" and "we
      * never managed to read your graph": a refused *follow* also sets `error`,
      * so keying an error state off it made a rejected button click claim the
      * whole graph had failed to load. Only `loadError` means the lists below are
      * empty because we do not know, not because they are empty.
      */
     loadError: string | null;
 }

 export declare function useGroups({ idToken }: UseGroupsOptions): UseGroupsReturn;

 declare interface UseGroupsOptions {
     idToken: string | null;
 }

 declare interface UseGroupsReturn {
     groups: GroupItem[];
     /**
      * Re-run `GET /api/groups`. Called once on mount (and on every `idToken`
      * change); exposed so a failed load can be retried without a remount.
      */
     refresh: () => Promise<void>;
     /**
      * `false` until the first `GET /api/groups` has settled. Distinguishes
      * "the server says you have no groups" from "we have not asked yet" —
      * without it an empty `groups` array renders the same "No groups yet"
      * empty state in both cases.
      */
     loaded: boolean;
     /**
      * Failure of the list load specifically. Kept separate from `error`, which
      * is whatever the last create/join/invite/… attempt reported: a refused
      * invite must not blank out a list that loaded perfectly well.
      */
     loadError: string | null;
     createGroup: (name: string, description?: string, visibility?: 'public' | 'private') => Promise<void>;
     deleteGroup: (groupId: string) => Promise<void>;
     joinGroup: (groupId: string) => Promise<void>;
     leaveGroup: (groupId: string) => Promise<void>;
     inviteUser: (groupId: string, userId: string) => Promise<void>;
     acceptInvite: (groupId: string, accept: boolean) => Promise<void>;
     loadMembers: (groupId: string) => Promise<void>;
     members: MemberItem[];
     loading: boolean;
     error: string | null;
 }

 export declare function useHlsSource(videoRef: RefObject<HTMLVideoElement | null>, playlistUrl: string | null | undefined, opts?: UseHlsSourceOptions): UseHlsSourceState;

 export declare interface UseHlsSourceOptions {
     /**
      * Tune for a live edge rather than a recording.
      *
      * A live viewer wants to be near the broadcast, and a large back buffer on a
      * stream someone leaves open for an hour is memory spent on video nobody
      * will scrub back to. VOD wants the opposite — keep what was downloaded so
      * seeking backwards is instant.
      */
     live?: boolean;
     /**
      * How long playback may fail to advance before it is called STALLED rather
      * than buffering. Short enough that a viewer is not lied to for long, long
      * enough that an ordinary rebuffer at the live edge is not an alarm.
      */
     stalledAfterMs?: number;
     onError?: (err: Error) => void;
 }

 export declare interface UseHlsSourceState {
     /**
      * What to SHOW a viewer when playback failed, or null. Plain language, no
      * hls.js vocabulary, no status codes — see `failure.detail` for those.
      */
     error: string | null;
     /** The same failure, classified, for logging and for deciding on a retry. */
     failure: HlsFailure | null;
     /** True between attach and first data. Equivalent to `phase === 'connecting'`. */
     loading: boolean;
     /** The whole truth; prefer this over the two booleans above. */
     phase: HlsPhase;
     /**
      * Whether the media has audio but no picture. `null` until the element has
      * metadata — "not known yet" is not "there is video", and rendering an
      * audio-only card over a video stream is its own lie.
      */
     audioOnly: boolean | null;
     /**
      * Seconds behind the live edge, or null when it cannot be measured. HLS runs
      * seconds behind by construction; a viewer who is not told that concludes
      * the stream is frozen.
      */
     latencySec: number | null;
     /** Seek to the live edge. No-op when there is no source. */
     seekToLive: () => void;
     /** Tear the source down and attach it again from scratch. */
     retry: () => void;
 }

 export declare function useIdentityAdmin(): UseIdentityAdminReturn;

 declare interface UseIdentityAdminReturn {
     authenticated: boolean;
     loading: boolean;
     error: string | null;
     login: (email: string, password: string) => Promise<void>;
     logout: () => Promise<void>;
     checkSession: () => Promise<void>;
 }

 export declare function useIdentityAudit(): UseIdentityAuditReturn;

 declare interface UseIdentityAuditReturn {
     records: AuditRecord[];
     loading: boolean;
     error: string | null;
     query: (params: AuditQueryParams) => Promise<void>;
     getEntityHistory: (entityType: string, entityId: string) => Promise<AuditRecord[]>;
     getStateAtTime: (entityId: string, timestamp: number) => Promise<Record<string, unknown> | null>;
 }

 export declare function useIdentityClients(): UseIdentityClientsReturn;

 declare interface UseIdentityClientsReturn {
     clients: IdentityClient[];
     loading: boolean;
     error: string | null;
     createClient: (input: CreateClientInput) => Promise<IdentityClient | null>;
     updateClient: (clientId: string, input: UpdateClientInput) => Promise<IdentityClient | null>;
     deleteClient: (clientId: string) => Promise<void>;
     createWithPool: (input: CreateClientWithPoolInput) => Promise<IdentityClient | null>;
     refresh: () => Promise<void>;
 }

 export declare function useIdentityContext(): IdentityContextValue;

 export declare function useIdentityDiagnostics(): UseIdentityDiagnosticsReturn;

 declare interface UseIdentityDiagnosticsReturn {
     diagnostics: DiagnosticsInfo | null;
     rates: RateInfo | null;
     dlq: DlqEntry[];
     loading: boolean;
     error: string | null;
     redriveDlq: (id: string) => Promise<void>;
     purgeDlq: (id: string) => Promise<void>;
     refresh: () => Promise<void>;
 }

 export declare function useIdentityEmailTemplates(): UseIdentityEmailTemplatesReturn;

 declare interface UseIdentityEmailTemplatesReturn {
     templates: EmailTemplate[];
     loading: boolean;
     error: string | null;
     createTemplate: (input: CreateEmailTemplateInput) => Promise<EmailTemplate | null>;
     updateTemplate: (templateId: string, input: UpdateEmailTemplateInput) => Promise<EmailTemplate | null>;
     deleteTemplate: (templateId: string) => Promise<void>;
     testSend: (templateId: string, recipientEmail: string) => Promise<void>;
     refresh: () => Promise<void>;
 }

 export declare function useIdentityGroups(poolId: string | null): UseIdentityGroupsReturn;

 declare interface UseIdentityGroupsReturn {
     groups: IdentityGroup[];
     loading: boolean;
     error: string | null;
     createGroup: (input: CreateGroupInput) => Promise<IdentityGroup | null>;
     updateGroup: (groupId: string, input: UpdateGroupInput) => Promise<IdentityGroup | null>;
     deleteGroup: (groupId: string) => Promise<void>;
     addMember: (groupId: string, userId: string) => Promise<void>;
     removeMember: (groupId: string, userId: string) => Promise<void>;
     refresh: () => Promise<void>;
 }

 export declare function useIdentityMfa(): UseIdentityMfaReturn;

 export declare function useIdentityMfaAdmin(): UseIdentityMfaAdminReturn;

 declare interface UseIdentityMfaAdminReturn {
     metrics: MfaMetrics | null;
     users: IdentityUser[];
     pools: IdentityPool[];
     loading: boolean;
     error: string | null;
     refresh: () => Promise<void>;
 }

 declare interface UseIdentityMfaReturn {
     devices: MfaDevice[];
     loading: boolean;
     error: string | null;
     setupDevice: (poolId: string, userId: string, deviceName: string) => Promise<MfaSetupResult | null>;
     verifySetup: (poolId: string, userId: string, deviceId: string, code: string) => Promise<boolean>;
     renameDevice: (poolId: string, userId: string, deviceId: string, newName: string) => Promise<void>;
     removeDevice: (poolId: string, userId: string, deviceId: string) => Promise<void>;
     refresh: (poolId: string, userId: string) => Promise<void>;
 }

 export declare function useIdentityPools(): UseIdentityPoolsReturn;

 declare interface UseIdentityPoolsReturn {
     pools: IdentityPool[];
     loading: boolean;
     error: string | null;
     createPool: (input: CreatePoolInput) => Promise<IdentityPool | null>;
     updatePool: (poolId: string, input: UpdatePoolInput) => Promise<IdentityPool | null>;
     deletePool: (poolId: string) => Promise<void>;
     getStats: () => Promise<PoolStats[]>;
     refresh: () => Promise<void>;
 }

 export declare function useIdentityResource<T>(initialData: T, opts: UseIdentityResourceOptions): UseIdentityResourceReturn<T>;

 declare interface UseIdentityResourceOptions {
     url: string | null;
     fetchOnMount?: boolean;
 }

 declare interface UseIdentityResourceReturn<T> {
     data: T;
     loading: boolean;
     error: string | null;
     setData: React.Dispatch<React.SetStateAction<T>>;
     refresh: () => Promise<void>;
     mutate: <R>(url: string, options?: RequestInit) => Promise<R | null>;
 }

 export declare function useIdentitySetupStatus(): UseIdentitySetupStatusReturn;

 declare interface UseIdentitySetupStatusReturn {
     status: SetupStatus | null;
     loading: boolean;
     error: string | null;
     refresh: () => Promise<void>;
 }

 export declare function useIdentityUsers(poolId: string | null): UseIdentityUsersReturn;

 declare interface UseIdentityUsersReturn {
     users: IdentityUser[];
     loading: boolean;
     error: string | null;
     createUser: (input: CreateUserInput) => Promise<IdentityUser | null>;
     updateUser: (userId: string, input: UpdateUserInput) => Promise<IdentityUser | null>;
     deleteUser: (userId: string) => Promise<void>;
     refresh: () => Promise<void>;
 }

 export declare function useIdleDetector(options?: UseIdleDetectorOptions): UseIdleDetectorReturn;

 declare interface UseIdleDetectorOptions {
     /** Idle timeout in milliseconds (default: 120000 = 2 minutes). */
     timeoutMs?: number;
 }

 declare interface UseIdleDetectorReturn {
     isIdle: boolean;
 }

 /**
  * Returns the host-provided `getImageUrl(imageId): string` callback.
  * Throws when called outside a provider — catches the "I forgot to mount
  * the services provider" misuse at first render rather than first
  * thumbnail.
  */
 export declare function useImageUrl(): (imageId: string) => string;

 export declare function useIngestAudit(filters?: IngestAuditFilters): UseIngestAuditResult;

 declare interface UseIngestAuditResult {
     entries: IngestAuditEntry[];
     loading: boolean;
     error: string | null;
     refresh: () => Promise<void>;
 }

 export declare function useIngestDLQ(): UseIngestDLQResult;

 declare interface UseIngestDLQResult {
     entries: DLQEntryRow[];
     loading: boolean;
     error: string | null;
     refresh: () => Promise<void>;
     replay: (id: string) => Promise<void>;
     drop: (id: string) => Promise<void>;
 }

 export declare function useIngestItems(options?: UseIngestItemsOptions): UseIngestItemsReturn;

 declare interface UseIngestItemsOptions {
     sourceId?: string | null;
     status?: IngestItemStatus | null;
     /** Wins over this library's `useIdentityContext().idToken`. */
     idToken?: string | null;
     /** Wins over the build-time `VITE_SOCIAL_API_URL` / module `setApiBaseUrl`. */
     baseUrl?: string;
 }

 declare interface UseIngestItemsReturn {
     items: IngestItem[];
     loading: boolean;
     /** Why the LIST fetch failed. Never set by retry/skip — see `actionError`. */
     error: string | null;
     refresh: () => Promise<void>;
     retryItem: (itemId: string) => Promise<boolean>;
     skipItem: (itemId: string) => Promise<boolean>;
     /**
      * Why the last `retryItem`/`skipItem` failed, or `null`. Additive
      * (v2.95.0).
      *
      * These used to write into `error`, the same state the list loader owns.
      * A failed Skip therefore made `IngestItemsPage` hide the entire,
      * correctly-loaded table behind a banner reading "Failed to load ingest
      * items." — a statement that was simply false — whose Retry button
      * re-fetched the list rather than re-trying the skip. The next refresh
      * cleared `error`, everything reappeared, and the operator concluded the
      * skip had worked. It had not.
      */
     actionError: string | null;
     /** Dismiss `actionError`. Additive (v2.95.0). */
     clearActionError: () => void;
 }

 export declare function useIngestProgress(): UseIngestProgressResult;

 declare interface UseIngestProgressResult {
     events: IngestProgressEvent[];
     activeSyncs: Map<string, ActiveSync>;
     clearEvents: () => void;
 }

 export declare function useIngestSources(options?: UseIngestSourcesOptions): UseIngestSourcesReturn;

 declare interface UseIngestSourcesOptions {
     /** Wins over this library's `useIdentityContext().idToken`. */
     idToken?: string | null;
     /** Wins over the build-time `VITE_SOCIAL_API_URL` / module `setApiBaseUrl`. */
     baseUrl?: string;
 }

 declare interface UseIngestSourcesReturn {
     sources: IngestSource[];
     loading: boolean;
     /** Why the LIST fetch failed. Never set by the mutations — see `actionError`. */
     error: string | null;
     refresh: () => Promise<void>;
     createSource: (data: Omit<IngestSource, 'sourceId' | 'createdAt' | 'updatedAt' | 'lastSyncAt' | 'lastSyncStats'>) => Promise<IngestSource | null>;
     deleteSource: (sourceId: string) => Promise<boolean>;
     triggerSync: (sourceId: string) => Promise<boolean>;
     /**
      * Why the last create/delete/sync failed, or `null`. Additive (v2.95.0).
      *
      * These used to write into `error`, which `SourcesPage` renders as the
      * hard-coded "Failed to load sources." — blaming the wrong operation — and
      * which `refresh()` clears unconditionally. A failed "Sync now" was
      * therefore erased before it could be rendered at all: the spinner stopped
      * and nothing else happened, exactly like a successful trigger, and the
      * operator walked away believing a sync was running.
      */
     actionError: string | null;
     /** Dismiss `actionError`. Additive (v2.95.0). */
     clearActionError: () => void;
 }

 /**
  * Register keyboard shortcuts with automatic cleanup.
  * Shortcuts are skipped when typing in input/textarea/contentEditable elements.
  *
  * @example
  * useKeyboardShortcuts([
  *   { key: 's', meta: true, handler: save },
  *   { key: 'Enter', meta: true, handler: run },
  *   { key: 'Escape', handler: clearSelection, preventDefault: false },
  * ]);
  */
 export declare function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]): void;

 export declare function useLikes({ idToken, roomId, postId, commentId, onMessage }: UseLikesOptions): UseLikesReturn;

 declare interface UseLikesOptions {
     idToken: string | null;
     roomId: string | null;
     postId: string | null;
     commentId?: string | null;
     onMessage: OnMessageFn_3;
 }

 declare interface UseLikesReturn {
     isLiked: boolean;
     likeCount: number;
     whoLiked: PublicProfile[];
     toggle: () => Promise<void>;
     reactWithEmoji: (emoji: string) => Promise<void>;
     loading: boolean;
     error: string | null;
 }

 export declare function useMappingReviewQueue(options?: UseMappingReviewQueueOptions): UseMappingReviewQueueResult;

 declare interface UseMappingReviewQueueOptions {
     /** Wins over this library's `useIdentityContext().idToken`. */
     idToken?: string | null;
     /** Wins over the build-time `VITE_SOCIAL_API_URL` / module `setApiBaseUrl`. */
     baseUrl?: string;
 }

 declare interface UseMappingReviewQueueResult {
     items: IngestItem[];
     threshold: number;
     loading: boolean;
     error: string | null;
     refresh: () => Promise<void>;
     remap: (itemId: string, typeId: string) => Promise<void>;
     skip: (itemId: string) => Promise<void>;
 }

 export declare function useMediaDevices(): MediaDevices_2;

 /**
  * Aggregate mention-able users from awareness (online) + user directory (offline) + groups.
  * Online users appear first, then offline users, then groups.
  */
 export declare function useMentionUsers(participants: Participant[]): MentionUser[];

 export declare function useMuteWhileTalking({ localStream, isMuted, threshold, triggerMs, cooldownMs, }: UseMuteWhileTalkingOptions): boolean;

 declare interface UseMuteWhileTalkingOptions {
     localStream: MediaStream | null;
     isMuted: boolean;
     /** dB threshold for "talking". Default -45 — well above ambient. */
     threshold?: number;
     /** Sustained talking duration (ms) before the toast fires. Default 1500. */
     triggerMs?: number;
     /** Cool-down between toast fires (ms). Default 6000. */
     cooldownMs?: number;
 }

 export declare function useMyMentionsAndTasks({ sections, comments, displayName, userId, }: UseMyMentionsAndTasksArgs): MyItem[];

 declare interface UseMyMentionsAndTasksArgs {
     sections: Section[];
     comments: Record<string, CommentThread[]>;
     displayName: string;
     userId: string;
 }

 /**
  * Non-throwing variant: returns `null` when there is no `<IdentityProvider>`
  * above.
  *
  * `useIdentityContext` is the right hook for a component that genuinely
  * cannot work unsigned-in. It is the wrong hook for a component that would
  * merely *like* a token — calling it there turns an optional enhancement
  * into a hard mount-time dependency on the provider. `ObservabilityProvider`
  * is exactly that case: it wants a bearer token when one exists, and must
  * still render (against fixture data) in a backendless demo with no identity
  * in the tree.
  */
 export declare function useOptionalIdentityContext(): IdentityContextValue | null;

 /**
  * Non-throwing variant: returns `null` when there is no `<PresenceProvider>`
  * above.
  *
  * `usePresenceContext` is the right hook for a component that genuinely
  * cannot work without presence. It is the wrong hook for a component that
  * would merely *like* presence data when a host doesn't mount this
  * library's provider — calling it there turns an optional enhancement into
  * a hard mount-time dependency. `UserPicker` is exactly that case: it wants
  * live presence when this library's provider is in the tree, and must still
  * work (via its `presenceUsers` prop) for a host running its own presence
  * provider instead.
  */
 export declare function useOptionalPresenceContext(): PresenceContextValue | null;

 export declare function usePipelineDefs(options?: UsePipelineDefsOptions): UsePipelineDefsReturn;

 declare interface UsePipelineDefsOptions {
     /** Wins over this library's `useIdentityContext().idToken`. */
     idToken?: string | null;
     /** Wins over the build-time `VITE_SOCIAL_API_URL` / module `setApiBaseUrl`. */
     baseUrl?: string;
 }

 declare interface UsePipelineDefsReturn {
     pipelines: PipelineDefSummary[];
     loading: boolean;
     error: string | null;
     refresh: () => Promise<void>;
 }

 export declare function usePipelineEditorServices(): PipelineEditorServices;

 export declare function usePosts({ idToken, roomId, onMessage }: UsePostsOptions): UsePostsReturn;

 declare interface UsePostsOptions {
     idToken: string | null;
     roomId: string | null;
     onMessage: OnMessageFn_4;
 }

 declare interface UsePostsReturn {
     posts: PostItem[];
     createPost: (content: string) => Promise<void>;
     editPost: (postId: string, content: string) => Promise<void>;
     deletePost: (postId: string) => Promise<void>;
     getUserPosts: (userId: string) => Promise<PostItem[]>;
     /** True during the initial fetch and `loadMore`. NOT set by mutations. */
     loading: boolean;
     /**
      * True while `createPost` / `editPost` / `deletePost` is in flight.
      *
      * Kept separate from `loading` on purpose — a mutation must not drop the
      * feed back into its "Loading…" skeleton. But the flag was computed into an
      * unread `_mutating` and never returned, so the composer's only busy signal
      * was `loading`, which goes false once the first page resolves and never
      * moves again. The submit button stayed enabled and labelled "Post" for the
      * whole request, and a second click created the post twice.
      */
     mutating: boolean;
     error: string | null;
     /**
      * Failure of the feed LOAD specifically (initial fetch + `loadMore`). Kept
      * separate from `error`, which is also set by `createPost`/`editPost`/
      * `deletePost`.
      *
      * Callers use it to tell "this room has no posts" from "we never managed to
      * read this room". Keying that off `error` made a rejected *send* in an
      * empty room replace the "No posts yet" empty state with "Couldn't load
      * posts" — blaming the read for a write that failed, next to a composer that
      * was already reporting the real reason.
      */
     loadError: string | null;
     hasMore: boolean;
     loadMore: () => Promise<void>;
 }

 export declare function usePrefersReducedMotion(): boolean;

 export declare function usePresence(options: UsePresenceOptions): UsePresenceReturn;

 export declare function usePresenceContext(): PresenceContextValue;

 declare interface UsePresenceOptions {
     sendMessage: (msg: Record<string, unknown>) => void;
     onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
     currentChannel: string;
     connectionState: ConnectionState;
     displayName: string;
 }

 declare interface UsePresenceReturn {
     users: PresenceUser_2[];
     setTyping: (isTyping: boolean) => void;
 }

 export declare function usePromptContext(scope?: string): PromptContext;

 export declare function UserChip({ name, label, avatarSize, avatarColor, presence, onClick, className, style, title, labelClassName, 'data-testid': testId, }: UserChipProps): JSX.Element;

 export declare interface UserChipProps {
     name: string;
     /** Optional display label (e.g. "@alice"); defaults to `name`. */
     label?: string;
     /** Avatar pixel size. Defaults to 20. */
     avatarSize?: number;
     /** Override the avatar background color. */
     avatarColor?: string;
     /** Show a presence indicator after the name. */
     presence?: PresenceState;
     /** Make the whole chip clickable. */
     onClick?: (e: MouseEvent_2<HTMLElement>) => void;
     className?: string;
     style?: CSSProperties;
     title?: string;
     /**
      * Classes on the name label alone — a host collapses the chip to its
      * avatar in a narrow column with `labelClassName="hidden @2xl:inline"`,
      * and the `title` (the name) still tells you who it is.
      */
     labelClassName?: string;
     'data-testid'?: string;
 }

 export declare function useReactions(options: UseReactionsOptions): UseReactionsReturn;

 declare interface UseReactionsOptions {
     sendMessage: (msg: Record<string, unknown>) => void;
     onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
     currentChannel: string;
     connectionState: ConnectionState;
 }

 declare interface UseReactionsReturn {
     activeReactions: EphemeralReaction[];
     react: (emoji: string) => void;
 }

 /**
  * Adds `commands` to the nearest provider while the caller is mounted. Pass a
  * stable array (module-level or memoised): a new array each render is a
  * re-registration each render.
  */
 export declare function useRegisterChatCommands(commands: readonly ChatCommand[] | undefined): void;

 /**
  * Register a command into the active CommandPaletteProvider for the lifetime
  * of the calling component. Registers on mount, unregisters on unmount.
  *
  * Re-registers whenever the `command` reference changes — wrap in `useMemo`
  * (or define the command outside the component) to avoid churn.
  */
 export declare function useRegisterCommand(command: Command): void;

 /**
  * `resolveBackdropTone`, kept current. Re-resolves when any `data-theme` /
  * `data-backdrop-tone` in the document changes and when the OS scheme flips.
  * Listens only while `enabled` — an idle composer (Chat mode) subscribes to
  * nothing, and resolves synchronously before paint when it lights up.
  */
 export declare function useResolvedBackdropTone(ref: RefObject<Element | null>, tone: BackdropTone, enabled?: boolean): ResolvedBackdropTone;

 export declare function UserFormPage({ user, isEdit, customAttributeDefinitions, onSubmit, onCancel, error, }: UserFormPageProps): JSX.Element;

 export declare interface UserFormPageProps {
     user?: {
         userId?: string;
         email: string;
         givenName?: string;
         familyName?: string;
         nickname?: string;
         picture?: string;
         website?: string;
         customAttributes?: Record<string, unknown>;
     };
     isEdit: boolean;
     poolId: string;
     customAttributeDefinitions?: Record<string, string>;
     onSubmit: (data: {
         email: string;
         givenName?: string;
         familyName?: string;
         nickname?: string;
         picture?: string;
         website?: string;
         customAttributes?: Record<string, unknown>;
     }) => Promise<void>;
     onCancel: () => void;
     error?: string | null;
 }

 export declare function UserListPage({ users, poolName, onCreateUser, onEditUser, onDeleteUser, loading, }: UserListPageProps): JSX.Element;

 export declare interface UserListPageProps {
     users: Array<{
         userId: string;
         email: string;
         givenName?: string;
         familyName?: string;
         status: string;
         createdAt: string;
     }>;
     poolId: string;
     poolName: string;
     onCreateUser: () => void;
     onEditUser: (userId: string) => void;
     onDeleteUser: (userId: string) => Promise<void>;
     loading?: boolean;
 }

 export declare function UserMenu({ user, items, className, 'data-testid': testId }: UserMenuProps): JSX.Element;

 export declare interface UserMenuItem {
     label: string;
     icon?: ReactNode;
     onClick: () => void;
     /** Render a divider above this item */
     separator?: boolean;
     /** Style this item as destructive */
     danger?: boolean;
 }

 export declare interface UserMenuProps {
     user: UserMenuUser;
     items: UserMenuItem[];
     className?: string;
     'data-testid'?: string;
 }

 export declare interface UserMenuUser {
     name: string;
     email: string;
     avatarUrl?: string;
 }

 export declare function useRooms({ idToken, onMessage, baseUrl: baseUrlOption }: UseRoomsOptions): UseRoomsReturn;

 export declare interface UseRoomsOptions {
     idToken: string | null;
     onMessage: RoomsOnMessageFn;
     /** Origin for `/api/rooms…`. Wins over `getApiBaseUrl()` (2.359.0). */
     baseUrl?: string;
 }

 export declare interface UseRoomsReturn {
     rooms: RoomItem[];
     activeRoom: RoomItem | null;
     setActiveRoom: (room: RoomItem | null) => void;
     /**
      * Resolve with the room, so a caller can act on it — adopt it, post into it —
      * without re-reading the list. Reject when unconfigured or refused (2.359.0;
      * they resolved `void` and silently did nothing without a token before).
      */
     createRoom: (name: string) => Promise<RoomItem>;
     createDM: (peerId: string) => Promise<RoomItem>;
     createGroupRoom: (groupId: string, name: string) => Promise<RoomItem>;
     joinRoom: (roomId: string) => Promise<void>;
     leaveRoom: (roomId: string) => Promise<void>;
     loadMembers: (roomId: string) => Promise<void>;
     members: RoomMemberItem[];
     loading: boolean;
     error: string | null;
     /**
      * Failure of the `GET /api/rooms` hydrate specifically. Kept separate from
      * `error`, which is also set by create/join/leave/loadMembers.
      *
      * `RoomList` renders "Couldn't load rooms" + Retry whenever the `error` prop
      * it is given is set and the list is empty — so wiring `error` straight
      * through made a refused *createRoom* by a user with no rooms yet blame the
      * read: the panel claimed the room list had failed to load and offered to
      * re-fetch it, while the create form beside it showed the real reason.
      * Pass this to `RoomList`'s `error` prop; use `error` for mutation feedback.
      */
     loadError: string | null;
     /** Retry the GET /api/rooms hydrate after a fetch failure. */
     retry: () => void;
 }

 /**
  * The behaviour on its own, for an element that already exists.
  *
  * `DocumentToolbar` is the case this is for: it had `role="toolbar"` and its
  * own classes, density attribute and layout long before it had the keyboard
  * contract — it was PROMISING the pattern to screen readers (22 tab stops,
  * arrow keys inert) rather than implementing it. Spreading this onto that div
  * adds the behaviour without a wrapper element and without teaching the
  * component about someone else's class names.
  *
  * Returns `ref`, `onKeyDown` and `onFocus` to spread. You still supply
  * `role="toolbar"` and a name.
  */
 export declare function useRovingToolbar({ orientation }?: {
     orientation?: 'horizontal' | 'vertical';
 }): {
     ref: default_2.RefObject<HTMLDivElement | null>;
     'aria-orientation': "horizontal" | "vertical";
     onFocus: (event: default_2.FocusEvent) => void;
     onKeyDown: (event: default_2.KeyboardEvent) => void;
 };

 export declare function UserPicker({ value, onChange, placeholder, maxSelect, presenceUsers: presenceUsersProp, idToken: idTokenProp, searchUsers, baseUrl, }: UserPickerProps): JSX.Element;

 export declare interface UserPickerProps {
     value: string[];
     onChange: (userIds: string[]) => void;
     placeholder?: string;
     maxSelect?: number;
     /**
      * Presence-sourced candidates. Wins over this library's
      * `usePresenceContext()`, so a host running its own presence provider can
      * hand its list in directly instead of mounting this library's
      * `<PresenceProvider>` just for `UserPicker`. Defaults to the context's
      * `presenceUsers` (or `[]` when no provider is mounted).
      */
     presenceUsers?: PresenceUser_2[];
     /**
      * Bearer token for the default `GET /api/profiles` search request. Wins
      * over `useIdentityContext().idToken`. Pass `null` explicitly to disable
      * the default search request while still showing presence candidates.
      * Ignored when `searchUsers` is given. Defaults to the context's `idToken`
      * (or `null` when no provider is mounted).
      */
     idToken?: string | null;
     /**
      * Full replacement for the default profile-search request, for a host that
      * already owns an authorized client (signed requests, a proxy, a mock in
      * tests) or whose search endpoint isn't `GET {baseUrl}/api/profiles?q=`.
      * Wins over `baseUrl` and does not require `idToken`. Called (debounced
      * 250ms) with the trimmed query and an `AbortSignal` tied to the request's
      * lifetime — abort on unmount/requery the way the default `fetch` does.
      */
     searchUsers?: (query: string, signal: AbortSignal) => Promise<ProfileSummary[]>;
     /**
      * Origin for the default `GET /api/profiles` request. Wins over the
      * build-time `VITE_SOCIAL_API_URL`, which is baked into THIS library's own
      * build and cannot be influenced by a consumer's `.env` — see the note on
      * `VITE_SOCIAL_API_URL` above. Ignored when `searchUsers` is given.
      */
     baseUrl?: string;
 }

 /** Add-a-person. Lives here rather than inside CallControls' private
  *  icon map so the docked and expanded call chromes can both render the
  *  same "add people" affordance. */
 export declare function UserPlusIcon({ size, ...rest }: IconProps): JSX.Element;

 /** Roster glyph (two people, no "+") — the People destination in the
  *  call side-panel dock. Distinct from UserPlusIcon, which means "invite
  *  someone new" rather than "show who is here". */
 export declare function UsersIcon({ size, ...rest }: IconProps): JSX.Element;

 /**
  * Runs the command a sent draft names. Resolves `null` when the draft is plain
  * text (send it as a message); throws when the command is out of scope or its
  * `run` rejects — the host toasts and keeps the draft.
  */
 export declare function useRunChatCommand(): (text: string, ctx: ChatCommandRunContext) => Promise<ChatCommandOutcome | null>;

 export declare function useSectionList(ydoc: Y.Doc | null): UseSectionListReturn;

 declare interface UseSectionListReturn {
     sections: Section[];
     comments: Record<string, CommentThread[]>;
     addSection: (section: Section) => void;
     updateSection: (sectionId: string, partial: Partial<Section>) => void;
     removeSection: (sectionId: string) => void;
     addItem: (sectionId: string, item: TaskItem) => void;
     updateItem: (sectionId: string, itemId: string, partial: Partial<TaskItem>) => void;
     removeItem: (sectionId: string, itemId: string) => void;
     ackItem: (sectionId: string, itemId: string, userId: string) => void;
     rejectItem: (sectionId: string, itemId: string, userId: string) => void;
     getSectionFragment: (sectionId: string) => Y.XmlFragment | null;
     addComment: (sectionId: string, opts: {
         text: string;
         userId: string;
         displayName: string;
         color: string;
         parentCommentId?: string | null;
     }) => void;
     resolveThread: (sectionId: string, commentId: string, resolverDisplayName: string) => void;
     unresolveThread: (sectionId: string, commentId: string) => void;
 }

 export declare function useSocialProfile({ idToken }: UseSocialProfileOptions): UseSocialProfileReturn;

 declare interface UseSocialProfileOptions {
     idToken: string | null;
 }

 declare interface UseSocialProfileReturn {
     profile: ProfileItem | null;
     loading: boolean;
     error: string | null;
     updateProfile: (updates: Partial<ProfileItem>) => Promise<void>;
     viewProfile: (userId: string) => Promise<ProfileItem | null>;
 }

 export declare function useSourceSloMetrics(sourceId: string | undefined, window?: SloWindow, options?: UseSourceSloMetricsOptions): UseSourceSloMetricsResult;

 declare interface UseSourceSloMetricsOptions {
     /** Wins over this library's `useIdentityContext().idToken`. */
     idToken?: string | null;
     /** Wins over the build-time `VITE_SOCIAL_API_URL` / module `setApiBaseUrl`. */
     baseUrl?: string;
 }

 declare interface UseSourceSloMetricsResult {
     metrics: SourceSloMetrics | null;
     loading: boolean;
     error: string | null;
     refresh: () => Promise<void>;
 }

 /**
  * Debounce activeSpeakerId so the spotlight slot only swaps after the new
  * speaker has been talking for at least `hysteresisMs`. Without this,
  * every cough, laugh, or short interjection causes flicker.
  *
  * `hysteresisMs <= 0` bypasses the timer entirely and commits the new id on
  * the next effect flush — the escape hatch tests and stories use so the
  * rendered output tracks the props synchronously.
  */
 export declare function useStableActiveSpeaker(activeSpeakerId: string | null | undefined, hysteresisMs: number): string | null;

 export declare function useSyncConflicts(): UseSyncConflictsReturn;

 declare interface UseSyncConflictsReturn {
     conflicts: SyncConflict[];
     loading: boolean;
     /** Why the LIST fetch failed. Never set by resolve/discard — see `actionError`. */
     error: string | null;
     /** True when the data came from the local mock fallback. */
     usingMock: boolean;
     refresh: () => Promise<void>;
     resolveConflict: (id: string, resolution: ConflictResolution) => Promise<boolean>;
     discardConflict: (id: string) => Promise<boolean>;
     /**
      * Why the last `resolveConflict` / `discardConflict` failed, or `null`.
      * Additive.
      *
      * These used to write into `error`, which `ConflictsPage` renders as
      * "Failed to load conflicts: …". A rejected Resolve therefore reported a
      * load failure for a queue that had loaded perfectly and was still on
      * screen, while the conflict itself stayed pending — and the next poll
      * cleared `error`, so the operator was left believing the resolve landed.
      */
     actionError: string | null;
     /** Dismiss `actionError`. Additive. */
     clearActionError: () => void;
 }

 /**
  * Returns the current resolved theme tokens from the nearest ThemeProvider.
  * Falls back to the default light theme if no provider is present.
  */
 export declare function useTheme(): ThemeTokens;

 /**
  * Returns the current resolved theme tokens from the nearest ThemeProvider.
  * Falls back to the light theme if no provider is present.
  */
 export declare function useThemeContext(): ThemeTokens;

 export declare function useToast(): ToastContextValue;

 /**
  * Non-throwing variant, for components that WANT to toast but must still
  * mount where no provider exists — a widget reused inside a panel or
  * rendered bare in a component test. Callers use `toast?.(…)`; the
  * notification is simply skipped rather than crashing the subtree.
  */
 export declare function useToastOptional(): ToastContextValue | null;

 export declare function useTrackStateBump(stream: MediaStream | undefined | null, participantLabel: string): number;

 export declare function useTypedDocuments({ idToken, typeId, baseUrl }: UseTypedDocumentsOptions): UseTypedDocumentsReturn;

 declare interface UseTypedDocumentsOptions {
     idToken: string | null;
     typeId: string | null;
     /**
      * Origin for `/api/typed-documents`. Wins over the build-time
      * `VITE_SOCIAL_API_URL` below — which is inlined into the LIBRARY's bundle,
      * not the consumer's, so it is always `''` downstream and every request
      * went same-origin to a path that is not there.
      */
     baseUrl?: string;
 }

 declare interface UseTypedDocumentsReturn {
     documents: TypedDocument[];
     loading: boolean;
     error: string | null;
     createDocument: (values: Record<string, TypedDocumentValue>) => Promise<TypedDocument>;
     refresh: () => void;
 }

 /**
  * Sync filter state with URL search params for shareable filter links.
  * Each filter key maps to a query param; undefined values are omitted.
  *
  * @param defaults Default filter values (used when param is missing)
  * @returns { filters, setFilter, clearFilters }
      *
      * @example
      * const { filters, setFilter } = useUrlFilterState({
      *   status: 'all',
      *   search: undefined,
      * });
      *
      * // URL: /pipelines?status=running&search=test
      * // filters = { status: 'running', search: 'test' }
      */
  export declare function useUrlFilterState<T extends Record<string, string | undefined>>(defaults: T): UrlFilterState<T>;

  export declare function useVersionHistory(options: UseVersionHistoryOptions): UseVersionHistoryReturn;

  declare interface UseVersionHistoryOptions {
      channel: string;
      sendMessage: (msg: Record<string, unknown>) => void;
      onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
  }

  declare interface UseVersionHistoryReturn {
      versions: VersionEntry[];
      loading: boolean;
      fetchVersions: () => void;
      previewVersion: (timestamp: number) => void;
      restoreVersion: (timestamp: number) => void;
      previewDoc: Y.Doc | null;
      previewTimestamp: number | null;
      clearPreview: () => void;
      /** Save a named version snapshot. */
      saveVersion: (name: string) => void;
      /** Extract sections as plain JSON from a Y.Doc (live or preview). */
      extractSections: (doc: Y.Doc) => SnapshotSection[];
      /** Compare sections: load preview for a given timestamp, returns sections via callback. */
      compareSections: SnapshotSection[] | null;
      compareTimestamp: number | null;
      compareVersion: (timestamp: number) => void;
      clearCompare: () => void;
  }

  export declare function useVideoCall(options: UseVideoCallOptions): UseVideoCallReturn;

  declare interface UseVideoCallOptions {
      documentId: string;
      idToken: string | null;
      /** Current document meta (from Y.js). */
      meta: DocumentMeta | null;
      /** Update document meta (writes to Y.js). */
      updateMeta: (partial: Partial<DocumentMeta>) => void;
      /** Send WebSocket message to gateway (for document list metadata sync). */
      sendMessage: (msg: Record<string, unknown>) => void;
      /** Display name for participant tracking. */
      displayName?: string;
  }

  declare interface UseVideoCallReturn {
      callState: CallState;
      sessionId: string | null;
      stageToken: string | null;
      participantId: string | null;
      userId: string | null;
      error: string | null;
      /** Whether another user started a call (detected via Y.js meta). */
      hasActiveCall: boolean;
      /** Start a new call (creates session + joins). */
      startCall: () => Promise<void>;
      /** Join an existing call by sessionId. */
      joinCall: (sessionId: string) => Promise<void>;
      /** End/leave the call. */
      endCall: () => Promise<void>;
  }

  export declare function useVideoSessions(documentId: string, idToken: string | null): {
      sessions: VideoSession[];
      loading: boolean;
      fetchSessions: () => Promise<void>;
  };

  export declare function useWebGLCanvas<S>(options: UseWebGLCanvasOptions<S>): WebGLCanvas;

  export declare interface UseWebGLCanvasOptions<S> {
      /** False parks the loop without tearing the context down. Default true. */
      active?: boolean;
      /** Overrides `devicePixelRatio`. Capped at 2 either way — past it the fill cost buys nothing. */
      pixelRatio?: number;
      attributes?: WebGLContextAttributes;
      /**
       * A value the caller changes when the PARKED frame would look different — a
       * cheap signature of whatever props feed the uniforms. While the loop is
       * running this is ignored (the next tick repaints anyway); while it is parked
       * (inactive, off-screen, or reduced motion) a change repaints exactly one
       * frame. Without it a reduced-motion surface would ignore its own props after
       * the first paint.
       */
      version?: string | number;
      /** Build buffers, programs, uniform locations. Returning null means "cannot run" → fallback. */
      setup: (gl: WebGLContextLike) => S | null;
      draw: (state: S, frame: WebGLFrame) => void;
      dispose?: (state: S, gl: WebGLContextLike) => void;
  }

  export declare function useWebSocket(options: UseWebSocketOptions): UseWebSocketReturn;

  export declare function useWebSocketContext(): WebSocketContextValue;

  declare interface UseWebSocketOptions {
      config: GatewayConfig;
      onMessage?: (msg: GatewayMessage) => void;
  }

  declare interface UseWebSocketReturn {
      connectionState: ConnectionState;
      lastError: GatewayError | null;
      sessionToken: string | null;
      clientId: string | null;
      currentChannel: string;
      switchChannel: (channel: string) => void;
      sendMessage: (msg: Record<string, unknown>) => void;
      disconnect: () => void;
      reconnect: () => void;
  }

  export declare function useYjsDoc(options: UseYjsDocOptions): UseYjsDocReturn;

  declare interface UseYjsDocOptions {
      documentId: string;
      ws: UseWebSocketReturn;
      onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
      /**
       * Optional callback fired when the server replaces the document
       * (e.g. via version restore) and we rebuild the Y.Doc + provider.
       * Consumers (observers in sibling hooks) can use it to re-attach.
       */
      onDocReplaced?: (ydoc: Y.Doc, provider: GatewayProvider) => void;
  }

  declare interface UseYjsDocReturn {
      ydoc: Y.Doc | null;
      provider: GatewayProvider | null;
      synced: boolean;
      /**
       * Bumped every time the underlying Y.Doc / provider is recreated
       * (initial mount counts as 0). Sibling hooks can depend on this
       * to re-run their observer setup.
       */
      docVersion: number;
  }

  export declare type ValidationCode = 'NO_TRIGGER' | 'MULTIPLE_TRIGGERS' | 'CYCLE_DETECTED' | 'INVALID_HANDLE' | 'MISSING_CONFIG' | 'APPROVAL_NO_APPROVERS' | 'JOIN_INSUFFICIENT_INPUTS' | 'ORPHAN_NODE' | 'DEAD_END' | 'UNUSED_FORK_BRANCH' | 'UNUSED_CONDITION_BRANCH' | 'NO_ERROR_HANDLER' | 'LLM_NO_MAX_TOKENS' | 'UNGUARDED_APPROVAL_TIMEOUT' | 'LARGE_FORK' | 'DEEP_CHAIN' | 'DUPLICATE_NODE_NAME' | 'LOW_TEMPERATURE_NON_DETERMINISTIC_PROMPT' | 'NO_PUBLISHED_VERSION_BUT_TRIGGER_SCHEDULED' | 'UNREACHABLE_AFTER_CONDITION_FALSE' | 'FORK_WITHOUT_MATCHING_JOIN';

  export declare interface ValidationIssue {
      code: ValidationCode;
      message: string;
      severity: 'error' | 'warning';
      nodeId?: string;
      edgeId?: string;
      /** For config errors — which field on the node is at fault. */
      field?: string;
  }

  export declare interface ValidationResult {
      errors: ValidationIssue[];
      warnings: ValidationIssue[];
      /** `errors.length === 0`. */
      isValid: boolean;
      /** `errors.length === 0` — blocks publish (and therefore run), not save. */
      canPublish: boolean;
  }

  /**
   * Glyph per verdict, as a second non-colour channel.
   *
   * Check / bang / cross are distinguishable in monochrome and at small sizes,
   * which is the whole point: the accessibility requirement is not "add an icon",
   * it is "a reader who sees no colour still gets the verdict".
   */
  export declare const VERDICT_GLYPH: Record<ChangeVerdict, string>;

  /** Human label per verdict. Always rendered — the chip must never be colour-only. */
  export declare const VERDICT_LABEL: Record<ChangeVerdict, string>;

  /** Tone per verdict, resolved through the library-wide semantic scale. */
  export declare const VERDICT_TONE: {
      readonly pass: "success";
      readonly concern: "caution";
      readonly fail: "danger";
  };

  export declare function VerdictChip({ verdict, status, error, revision, defaultExpanded, className, 'data-testid': testId, }: VerdictChipProps): JSX.Element;

  export declare interface VerdictChipProps {
      verdict?: ChangeReviewVerdict | undefined;
      /** How the review itself is going. Defaults to `idle`. */
      status?: ChangeReviewStatus | undefined;
      /** Why the review failed. Shown verbatim when `status` is `failed`. */
      error?: string | undefined;
      /**
       * The change's CURRENT revision. Pass it, or staleness cannot be detected
       * and an out-of-date verdict will render as if it still applies.
       */
      revision?: string | undefined;
      /** Start with the reasoning open. Default false — see the note above. */
      defaultExpanded?: boolean;
      className?: string;
      'data-testid'?: string;
  }

  /**
   * What the UI actually renders. Derived — never passed in directly, so a host
   * cannot claim `ready` for a verdict that is out of date.
   */
  export declare type VerdictState = 'absent' | 'pending' | 'failed' | 'stale' | 'ready';

  declare interface VersionEntry {
      timestamp: number;
      age: number;
      name?: string;
      author?: string;
      type?: 'manual' | 'auto' | 'pre-restore';
  }

  /** A camera body: start a video call. Distinct from video/MediaIcons' VideoIcon, which is a call CONTROL. */
  export declare function VideoCallIcon({ size, ...rest }: GlyphProps): JSX.Element;

  /**
   * Static N-way grid: 1 / 2×2 / 3×3 / 4×4 column count based on participant
   * count. Tiles do NOT reflow on speaker change — speaking is indicated via
   * border highlight on the tile only (see ParticipantTile). For an
   * active-speaker-aware spotlight layout, use `HangoutLayout` instead.
   */
  export declare function VideoGrid({ participants, className, style }: VideoGridProps): JSX.Element;

  export declare interface VideoGridProps {
      participants: VideoParticipant[];
      /**
       * Sizing / spacing classes from the caller. Prefer this over `style`:
       * callers only ever needed `style` to constrain the grid's width, which
       * forced a wrapper `<div>` on every consumer (inline styles are banned in
       * demos and stories). Composed through `cn()`, so a caller class wins.
       */
      className?: string;
      /** @deprecated Use `className`. Kept so existing callers keep compiling. */
      style?: CSSProperties;
  }

  export declare function VideoIcon({ size, ...rest }: IconProps): JSX.Element;

  export declare function VideoOffIcon({ size, ...rest }: IconProps): JSX.Element;

  export declare interface VideoParticipant {
      id: string;
      displayName: string;
      avatarUrl?: string;
      isSpeaking?: boolean;
      isMuted?: boolean;
      isLocal?: boolean;
      videoElement?: ReactNode;
  }

  export declare function VideoPlayer({ src, stream, autoPlay, muted, loop, controls, poster, phase: controlledPhase, className, style, onPhaseChange, onTimeUpdate, }: VideoPlayerProps): JSX.Element;

  export declare function VideoPlayerModal({ onClose, sources, title, subtitle, autoPlay, muted, hideDownload, header, footer, className, }: VideoPlayerModalProps): JSX.Element;

  export declare interface VideoPlayerModalProps {
      /** Required — backdrop click + Escape both fire this. */
      onClose: () => void;
      /** One or more media URLs. The first plays first; multiple ⇒ segment switcher. */
      sources: VideoPlayerSource[];
      /** Optional small title shown in the modal header (e.g. channel name). */
      title?: string;
      /** Optional subtitle shown under the title (e.g. start time + duration). */
      subtitle?: string;
      /** Auto-play the first source on mount. Default true. */
      autoPlay?: boolean;
      /** Start muted (useful when autoPlay is on — many browsers require it). Default false. */
      muted?: boolean;
      /** Hide the per-source Download link in the footer. Default false. */
      hideDownload?: boolean;
      /** Render extra content in the header (right side, before the close button). */
      header?: ReactNode;
      /** Render extra content in the footer (right side). */
      footer?: ReactNode;
      className?: string;
  }

  export declare interface VideoPlayerProps {
      src?: string;
      /**
       * MediaStream source for WebRTC playback (WHEP, RTCPeerConnection.ontrack,
       * getUserMedia, etc.). When set, attached to the underlying <video>'s
       * `srcObject`. Takes precedence over `src` if both are supplied. Pass
       * `null` to clear.
       */
      stream?: MediaStream | null;
      autoPlay?: boolean;
      muted?: boolean;
      loop?: boolean;
      controls?: boolean;
      poster?: string;
      phase?: PlayerPhase;
      className?: string;
      style?: CSSProperties;
      onPhaseChange?: (phase: PlayerPhase) => void;
      onTimeUpdate?: (currentTime: number, duration: number) => void;
  }

  export declare interface VideoPlayerSource {
      /** Direct media URL (mp4 / webm / etc) served with Range support. */
      url: string;
      /** Optional human label for the segment switcher (e.g. "Segment 1"). */
      label?: string;
      /** Optional size in bytes — shown next to the label when present. */
      sizeBytes?: number;
  }

  declare interface VideoSession {
      documentId: string;
      sessionId: string;
      vnlSessionId: string;
      status: 'active' | 'ended';
      startedAt: string;
      endedAt?: string;
      startedBy: string;
      participants: VideoSessionParticipant[];
      transcriptStatus?: 'pending' | 'processing' | 'available' | 'failed';
      transcript?: string;
      aiSummary?: string;
  }

  declare interface VideoSessionParticipant {
      userId: string;
      displayName: string;
      joinedAt: string;
  }

  export declare function ViewerCount({ count, className, style, 'data-testid': testId, }: ViewerCountProps): JSX.Element | null;

  export declare interface ViewerCountProps {
      /**
       * Watchers, when the number is KNOWN. Pass `null` (or omit) when it is not —
       * the badge then renders nothing rather than claiming an audience of zero.
       */
      count?: number | null;
      /**
       * Positioning / spacing classes from the caller. Prefer this over `style`:
       * callers overlaying the badge on a player had no className seam, so they
       * were forced into an inline style.
       */
      className?: string;
      /** @deprecated Use `className`. Kept so existing callers keep compiling. */
      style?: CSSProperties;
      'data-testid'?: string;
  }

  export declare type ViewMode = 'editor' | 'ack' | 'reader';

  export declare function ViewportFillRegion({ bottomGap, minHeight, className, children, 'data-testid': testId, }: ViewportFillRegionProps): JSX.Element;

  export declare interface ViewportFillRegionProps {
      /** Space to leave between the region's bottom edge and the window bottom. */
      bottomGap?: number;
      /** Floor for the computed height, so the region never collapses. */
      minHeight?: number;
      className?: string;
      children: React.ReactNode;
      'data-testid'?: string;
  }

  /**
   * The canonical visually-hidden clip. Not `display: none` and not
   * `visibility: hidden` — both remove the node from the accessibility tree.
   */
  export declare const VISUALLY_HIDDEN_STYLE: CSSProperties;

  /**
   * Renders `children` for screen readers only.
   *
   *   <VisuallyHidden>Sorted ascending</VisuallyHidden>
   */
  export declare function VisuallyHidden({ as: Tag, children, className, id, 'data-testid': testId, }: VisuallyHiddenProps): JSX.Element;

  export declare interface VisuallyHiddenProps {
      /** Element to render. Defaults to `span`; use `div` inside block content. */
      as?: ElementType;
      children: ReactNode;
      className?: string;
      id?: string;
      'data-testid'?: string;
  }

  export declare function VoicemailRecorder({ open, onClose, recipientName, getStream, onSend, maxSeconds, 'data-testid': testId }: VoicemailRecorderProps): JSX.Element;

  export declare interface VoicemailRecorderProps {
      open: boolean;
      onClose: () => void;
      /** Who the message is for — the title. */
      recipientName: string;
      /** Microphone access, with whatever device preference the host applies. */
      getStream: () => Promise<MediaStream>;
      /** Deliver the message. Reject to keep the dialog open with the error shown. */
      onSend: (blob: Blob, durationMs: number, mimeType: string) => Promise<void>;
      maxSeconds?: number;
      'data-testid'?: string;
  }

  /** A triangle with an exclamation mark: "warning", "check this first". Since 2.389.0. */
  export declare function WarningIcon({ size, ...rest }: GlyphProps): JSX.Element;

  export declare type WatermarkGravity = 'northwest' | 'north' | 'northeast' | 'west' | 'center' | 'east' | 'southwest' | 'south' | 'southeast';

  export declare interface WebGLCanvas {
      /** Put this on the element whose measured box drives the drawing buffer. */
      hostRef: RefObject<HTMLDivElement | null>;
      canvasRef: RefObject<HTMLCanvasElement | null>;
      status: WebGLCanvasStatus;
      reducedMotion: boolean;
      /** Repaint one frame while the loop is parked — for a prop change under reduced motion. */
      redraw: () => void;
  }

  export declare type WebGLCanvasStatus = 'pending' | 'ready' | 'unsupported';

  export declare type WebGLContextLike = WebGLRenderingContext | WebGL2RenderingContext;

  /** What `draw` is handed. Sizes are DRAWING-BUFFER pixels, times are milliseconds. */
  export declare interface WebGLFrame {
      gl: WebGLContextLike;
      width: number;
      height: number;
      /** Milliseconds of RUNNING time. Frozen at 0 under reduced motion. */
      time: number;
      /** Milliseconds since the previous frame, clamped. 0 on a static frame. */
      delta: number;
      /** Frame counter, from 0. */
      frame: number;
  }

  /** Host declaration of inbound webhook delivery. See `webhookRelay`. */
  declare interface WebhookRelayStatus {
      /** True ONLY when a delivery to the webhook path actually triggers a run. */
      enabled: boolean;
      /**
       * Public origin the webhook URL is built from, e.g. `https://api.example.com`.
       * Falls back to `VITE_SOCIAL_API_URL`, then to the local dev port.
       */
      publicUrlBase?: string;
  }

  export declare interface WebSocketContextValue {
      connectionState: ConnectionState;
      sendMessage: (msg: Record<string, unknown>) => void;
      onMessage: OnMessageFn_5;
      ws: UseWebSocketReturn;
      clientId: string | null;
      sessionToken: string | null;
  }

  export declare function WebSocketProvider({ value, children, }: {
      value: WebSocketContextValue;
      children: ReactNode;
  }): JSX.Element;

  /**
   * A board with a shape and a connector on it: a whiteboard.
   *
   * Deliberately not the document glyph with something added. A whiteboard is a
   * different authoring surface, not a document variant — the two sit next to
   * each other in the conversation's Documents tab and have to be told apart at
   * a glance.
   */
  export declare function WhiteboardIcon({ size, ...rest }: GlyphProps): JSX.Element;

  export declare type WireCarriesEveryRunStatus = AssertTrue<[
  RunStatus
  ] extends [PipelineRunSummary['status']] ? true : false>;

  /**
   * Move a slide's layout, keeping everything the new layout can still use.
   *
   * Content is NOT discarded on a layout change: a bullets slide turned into a
   * chart keeps its bullets, so turning it back does not lose the words. The
   * generator ignores the fields a layout does not read, and the alternative —
   * deleting them — makes the layout picker a destructive control people learn
   * to avoid.
   */
  export declare function withLayoutDefaults(slide: DeckSlide, layout: SlideLayout): DeckSlide;

  /**
   * Say the origin ONCE.
   *
   * The attribution is deliberately written into `content` (see `ForwardedFrom`)
   * so a client with no idea what `forwardedFrom` means still shows whose words
   * these are. A client that DOES understand it then had the same sentence
   * twice — once in the marker, once as the body's first line.
   *
   * The contract is one sentence: **the marker names the origin exactly when
   * the RENDERED body does not.** So the question is asked of whatever is
   * actually going to be shown — the plain text, or the rich body when there is
   * one — and never of the mere existence of `metadata.html`. An earlier version
   * declined on any rich body, which was wrong in the case rich bodies actually
   * occur: a forward carries no html until somebody EDITS it, and the edit path
   * sends html to match the new text, so the one message shape that could have
   * used this never got it.
   *
   * Three ways it declines, all landing on the same safe result — body untouched,
   * marker back to a bare "Forwarded" badge:
   *
   *   * NOT OURS. Somebody can type "Forwarded from the old thread — Bob:"
   *     themselves, and a forwarded body can begin with anything. The test is
   *     equality against the string generated from THIS message's metadata, not
   *     a pattern that matches the shape of one.
   *   * NOTHING LEFT. A pathological origin (a room and a name that together
   *     exceed the wire's message cap) makes the attribution the entire body.
   *     Stripping it would render an empty bubble, so it stays.
   *   * NOT A CLEAN LINE. The rich body spells the attribution across several
   *     elements, or runs it into the words without a break. See
   *     `htmlWithoutLeadingLine`.
   *
   * Both halves are returned because the caller renders `html` OVER `body` and
   * has to hand `MessageBody` a consistent pair — stripping one and not the
   * other is how the sentence comes back on the next edit.
   */
  export declare function withoutForwardAttribution(content: string, from: ForwardedFrom | null, html?: string): {
      body: string;
      html?: string;
      stripped: boolean;
  };

  export declare function Wizard({ steps, activeKey, onStep, onFinish, finishLabel, className, 'data-testid': testId, }: WizardProps): JSX.Element;

  export declare interface WizardProps {
      steps: WizardStep[];
      activeKey: string;
      onStep: (key: string) => void;
      onFinish?: () => void;
      finishLabel?: string;
      className?: string;
      'data-testid'?: string;
  }

  export declare interface WizardStep {
      key: string;
      label: string;
      content: ReactNode;
      /** Default true. false disables Next/Finish while this step is active. */
      canAdvance?: boolean;
  }

  /**
   * The "no cap" value for `maxEfforts` — draw every effort, however small that
   * makes them.
   *
   * ZERO is the sentinel, and it is the ONLY one: `undefined` means "the caller
   * did not choose", which takes the default of two, and a non-finite value
   * (`Infinity`) is accepted as a synonym for this because it means the same
   * thing and a host computing a cap arithmetically can land on it honestly.
   * "Show none of the work" is not a state this component has, so zero was free.
   */
  export declare const WORK_ACTIVITY_ALL_EFFORTS = 0;

  /**
   * How many parallel efforts the activity canvas draws at once by default.
   *
   * Two, because the canvas fits everything it is given into one pane: a real
   * nine-effort day fits at roughly 0.12 zoom, which is a map of the work rather
   * than something anyone can read. Two lanes stay legible, and the rest are one
   * menu choice away.
   */
  export declare const WORK_ACTIVITY_DEFAULT_MAX_EFFORTS = 2;

  /**
   * Asking a transcript a question. The graph renders the exchange and nothing
   * else: the host owns the model call, the grounding and the refusal.
   */
  export declare interface WorkActivityAsk {
      enabled: boolean;
      placeholder?: string;
      /** Rendered when `enabled` is false. Never invent an answer in its place. */
      unavailableLabel?: string;
      /** Host-owned. Resolve with a grounded answer or reject to show the error. */
      onAsk: (question: string) => Promise<WorkActivityAskAnswer> | WorkActivityAskAnswer;
  }

  export declare interface WorkActivityAskAnswer {
      text: string;
      citations?: WorkActivityAskCitation[];
      /** Provenance footnote. Say where the answer came from; never imply more. */
      note?: string;
  }

  export declare interface WorkActivityAskCitation {
      id: string;
      label: string;
      selection?: Exclude<WorkGraphSelection, null>;
  }

  /** The one-line state a detail pane opens with. Host-authored, viewer-safe. */
  export declare interface WorkActivityBanner {
      tone: WorkActivityBannerTone;
      title: string;
      description?: string;
  }

  export declare type WorkActivityBannerTone = 'info' | 'success' | 'error';

  /**
   * What the activity canvas paints UNDER the graph.
   *
   * `ripple-grid` is the default and the intended look: a pale grey lattice on
   * the near-white surface, rippling slowly outward from the centre and bending
   * toward the pointer. It REPLACES React Flow's dot background rather than
   * layering over it — two grids at once is noise, and the dots were only ever
   * standing in for a surface texture.
   *
   * `plain` is the escape hatch: no canvas, no WebGL context, React Flow's own
   * dots. For a host embedding several graphs on one page, or a test that would
   * rather not stub a GL context.
   */
  export declare type WorkActivityCanvasBackground = 'ripple-grid' | 'plain';

  /** Source-backed membership, already filtered for this viewer by the host. */
  export declare interface WorkActivityEffort {
      id: string;
      title: string;
      /** A second clause under the frame title — "v3 generating · v2 available". */
      subtitle?: string;
      nodeIds: string[];
      edgeIds: string[];
      /** Older context that may be folded. Never a count of inaccessible sources. */
      contextNodeIds?: string[];
  }

  export declare interface WorkActivityEvent {
      id: string;
      kind: WorkActivityKind;
      /** ISO time, epoch ms, or Date. */
      at: string | number | Date;
      /** "Status changed from Open to In progress". Already worded by the host. */
      text: string;
      /** Who did it; absent for machine events. */
      actor?: string | null;
      /** A short trailing fact — "$0.18", "failed", "PR #42". */
      detail?: ReactNode;
      /** Opens the thing the event is about (a run, a PR). */
      onOpen?: () => void;
      href?: string;
      openLabel?: string;
  }

  /**
   * The one header row an activity panel gets: who and what on the left, the
   * three ways out on the right. Hosts that already sit inside
   * `ChatSidePanelFrame` get the same chrome from the frame and should not
   * render this as well — it exists so a host outside that frame (a standalone
   * route, a popped-out window) has no hand-rolled markup to write.
   *
   * A host that can show a second body — the person's Computer Lab beside their
   * activity graph — wires `onViewChange` and gets a segmented switch on its own
   * row beneath the title, with a quiet clause saying what the body holds. The
   * row is a SECOND row rather than another control in the title row because it
   * chooses what the panel is, while everything on the title row chooses where
   * the panel is; mixing the two put a body switch next to the close button.
   * Without `onViewChange` nothing about this header changes.
   */
  export declare function WorkActivityHeader({ title, subtitle, expanded, onExpand, onPopOut, onClose, actions, view, onViewChange, viewNote, effortCount, maxEfforts, onMaxEffortsChange, className, 'data-testid': testId, }: WorkActivityHeaderProps): JSX.Element;

  export declare interface WorkActivityHeaderProps {
      title: string;
      /** A second clause under the title — "Working now · Sharing with you". */
      subtitle?: string;
      /** Whether the panel currently occupies the conversation area. */
      expanded?: boolean;
      onExpand?: () => void;
      onPopOut?: () => void;
      onClose?: () => void;
      /** Extra controls between the title and the close button. */
      actions?: ReactNode;
      /**
       * Which body the panel is showing: the activity graph, or the person's
       * Computer Lab. The switch itself only appears when `onViewChange` is wired
       * — a host with one body renders exactly the header it rendered before.
       */
      view?: WorkActivityPanelView;
      onViewChange?: (view: WorkActivityPanelView) => void;
      /**
       * The quiet clause beside the switch — "Shared work · newest first",
       * "2 working · 4 dispatched from this chat". Host-authored, because only the
       * host knows what the body it is about to render actually contains.
       */
      viewNote?: ReactNode;
      /**
       * Total parallel efforts the panel has, INCLUDING the ones the cap is
       * hiding. It is the denominator of "Show 2 of 9 activities", so it must be
       * the real count or the sentence lies about what is being withheld.
       */
      effortCount?: number;
      /**
       * How many of them the canvas is drawing. `WORK_ACTIVITY_ALL_EFFORTS` (0),
       * or any value at or above `effortCount`, reads as "All N activities".
       */
      maxEfforts?: number;
      /**
       * The opt-in for the "Show N activities" control, exactly as `onViewChange`
       * is the opt-in for the body switch: without it the header renders no such
       * control, because a picker nothing listens to is a lie. Fires with the
       * chosen number, or `WORK_ACTIVITY_ALL_EFFORTS` (0) for "All".
       */
      onMaxEffortsChange?: (maxEfforts: number) => void;
      className?: string;
      'data-testid'?: string;
  }

  export declare type WorkActivityKind = 'status' | 'run' | 'estimate' | 'comment' | 'system';

  export declare function WorkActivityList({ title, events, now, emptyLabel, loading, error, first, className, 'data-testid': testId, }: WorkActivityListProps): JSX.Element;

  export declare interface WorkActivityListProps {
      title?: string;
      events: WorkActivityEvent[];
      /** Clock for relative times (ms since epoch). Default Date.now(). */
      now?: number;
      emptyLabel?: string;
      loading?: boolean;
      /** Shown instead of the list when the history could not be read. */
      error?: string | null;
      first?: boolean;
      className?: string;
      'data-testid'?: string;
  }

  export declare interface WorkActivityNodeDetail {
      emphasis?: 'earlier' | 'input' | 'current';
      /** Fresh process evidence, independent from presence and lifecycle. */
      fresh?: boolean;
      tools?: string[];
      attentionLabel?: string;
      feedbackCount?: number;
      /**
       * Secondary lines under the node title — "Planning sync · 08:30–09:00",
       * "2 speakers · 1 action item". Host-authored and already viewer-safe; when
       * omitted the card falls back to the node's own status wording.
       */
      lines?: string[];
      /** Short state word beside the first secondary line — "Ready", "Tests running". */
      badge?: string;
      /**
       * Why a `waiting` run is waiting — realtime-modules `detail.pause` passed
       * through. The card says "Needs approval" / "Paused at write" instead of a
       * bare "Waiting" (see `workPauseLabel`); ignored unless the node is waiting.
       */
      pause?: WorkActivityPause;
      /** A short verbatim quotation from the source, already viewer-authorized. */
      excerpt?: string;
      /** Who was there. Shown as an avatar row; the host resolves the images. */
      participants?: Array<{
          id: string;
          label: string;
          avatarUrl?: string;
      }>;
      /** Trailing line: what this is on the left, its sharing clause on the right. */
      footer?: {
          label: string;
          note?: string;
      };
      /** Detail-pane subtitle — "Meeting transcript · Shared with you". */
      subtitle?: string;
      /** The state line every detail pane opens with. */
      banner?: WorkActivityBanner;
      sections?: WorkActivityPaneSections;
      /** Transcript rows and the host-owned Ask exchange. */
      transcript?: {
          segments: WorkActivityTranscriptSegment[];
          ask?: WorkActivityAsk;
      };
      /**
       * A closing caveat — what this pane does NOT show, and why. Use it to be
       * honest about a capability the viewer does not hold.
       */
      note?: string;
      /** Buttons under the body — "Inspect available v2", "Inspect run". */
      actions?: WorkActivityPaneAction[];
      /**
       * The compute session this node IS — an agent loop in a cloud box.
       *
       * Present, the pane's body becomes the session: gauges, live tail, shell and
       * plan, in place of the per-kind bodies above. The chrome, the banner and the
       * "Reference in chat" footer are unchanged, and every other field on this
       * detail still renders around it, so a run node that also has sources keeps
       * them.
       */
      compute?: WorkComputeDetail;
      artifact?: {
          revisions: WorkArtifactRevision[];
          pending?: {
              id: string;
              label: string;
              status: 'generating' | 'failed';
              message?: string;
          };
          /** Opens the revision (optionally at one page) at full size. Host-owned. */
          onOpenPreview?: (revisionId: string, anchorId?: string) => void;
      };
  }

  /** The held-back group's state. The host owns the paged fetch. */
  export declare interface WorkActivityOmitted {
      /** How many nodes the snapshot held back. */
      count: number;
      expanded: boolean;
      /** Paged in so far, newest first. */
      items: WorkGraphNodeData[];
      loading?: boolean;
      error?: string;
      /** Another page exists. */
      hasMore: boolean;
      /** The size of one page, for the "Load N more" label. Defaults to 25. */
      pageSize?: number;
      onExpand: () => void;
      onCollapse: () => void;
      onLoadMore: () => void;
  }

  export declare interface WorkActivityPaneAction {
      id: string;
      label: string;
      /** Selecting this action moves the graph selection; the host owns navigation. */
      selection?: Exclude<WorkGraphSelection, null>;
      onSelect?: () => void;
  }

  /** The two bodies an activity panel can hold. */
  export declare type WorkActivityPanelView = 'activity' | 'lab';

  export declare interface WorkActivityPaneSections {
      /**
       * What the run was given — "Planning sync transcript", "Release plan · rev 6".
       * Pass references rather than bare strings when two inputs can share a label:
       * the id is what keeps them apart, and what lets the row open its source.
       */
      inputs?: Array<string | WorkActivityReference>;
      /** Tools the run is authorized to use in this attempt. */
      tools?: string[];
      sources?: WorkActivityReference[];
      workItem?: WorkActivityReference;
      /** A prose paragraph under the banner. */
      description?: string;
  }

  /** Why a waiting run waits: an approval gate, or a breakpoint on `step`. */
  export declare interface WorkActivityPause {
      reason: 'awaiting_approval' | 'paused_at_breakpoint';
      /** The step's display label ("write"), when the source named one. */
      step?: string;
  }

  export declare interface WorkActivityPresentation {
      efforts: WorkActivityEffort[];
      details?: Record<string, WorkActivityNodeDetail>;
      /** Only fresh, running operations in a live query; never inferred from a neighbor. */
      activeEdgeIds: string[];
      /** Operations whose latest attempt failed. Drawn in the danger tone with a label. */
      failedEdgeIds?: string[];
      /** Pill wording per canonical edge id — "generating", "failed". Overrides `label`. */
      edgeLabels?: Record<string, string>;
      /** Canonical edges retain identity even when their visual input arrow reverses. */
      reversedEdgeIds?: string[];
      mode: 'split' | 'full';
      window: WorkActivityWindow;
      bounds: {
          start: number;
          end: number;
      };
      /** v1 latest-state data must be described as recent work, not historical replay. */
      temporalMode: 'recent' | 'as-of';
      events?: Array<{
          at: number;
          count: number;
      }>;
      /**
       * The wall clock, in UTC epoch milliseconds. The ruler stops here rather
       * than at the day's end, so "Now" lands where now actually is. Omit and the
       * strip follows the live window, or the browser clock when it is not.
       */
      now?: number;
      view: WorkActivityView;
      /**
       * Where the selected node's detail pane goes.
       * `column` (the default) makes it a sibling column of the canvas — the host's
       * fourth pane, laid out by this component so the activity header spans both.
       * `overlay` lays it over the canvas, which is right only when the pane is too
       * narrow to split. `auto` picks between them from the measured width.
       * `none` renders no pane here: the host places `WorkNodePane` in its own grid.
       */
      detailsPlacement?: 'auto' | 'column' | 'overlay' | 'none';
      /** Panel title. When supplied the renderer draws its own header row. */
      title?: string;
      /** A second clause under the title — "Working now · Sharing with you". */
      subtitle?: string;
      /** Whether the panel currently occupies the conversation area. */
      expanded?: boolean;
      /** Offers the expand/restore control. The host owns the layout change. */
      onExpand?: () => void;
      /** Offers the pop-out control. The host owns the standalone route. */
      onPopOut?: () => void;
      /** Offers the close control. The host owns dismissal. */
      onClose?: () => void;
      /**
       * "← Earlier work". The host shifts the window earlier; without it the
       * renderer steps the current window back by its own duration.
       */
      onEarlier?: () => void;
      /**
       * Work the snapshot held back under its node cap (realtime-examples NFR
       * #221). Drawn as a collapsed "N more earlier" group on the canvas; the host
       * pages the items in when the viewer expands it.
       */
      omitted?: WorkActivityOmitted;
      onWindowChange: (window: WorkActivityWindow) => void;
      onViewChange: (view: WorkActivityView) => void;
      onFeedback?: (selection: Exclude<WorkGraphSelection, null>) => void;
  }

  /** A row that points at another authorized item — a source, a work item. */
  export declare interface WorkActivityReference {
      id: string;
      title: string;
      meta?: string;
      /** Canonical target. Omitted when the viewer may see the row but not open it. */
      selection?: Exclude<WorkGraphSelection, null>;
  }

  export declare interface WorkActivityTranscriptSegment {
      id: string;
      /** Already formatted in the host's timezone — the pane does no clock maths. */
      at: string;
      speaker: string;
      text: string;
      anchorId?: string;
  }

  export declare interface WorkActivityView {
      focusedEffortId: string | null;
      expandedSourceEfforts: string[];
      overviewViewport?: WorkGraphViewport;
      canvasInitialized?: boolean;
  }

  export declare interface WorkActivityWindow {
      start: number;
      end: number;
      following: boolean;
  }

  export declare function WorkArea({ breadcrumbs, toolbar, children, status, padded, tone, className, bodyClassName, 'data-testid': testId, }: WorkAreaProps): JSX.Element;

  export declare interface WorkAreaProps {
      /** The trail row. Usually a `<Breadcrumbs>`; renders nothing when omitted. */
      breadcrumbs?: ReactNode;
      /** The action row. Usually a `<Toolbar>`. Sits below the trail. */
      toolbar?: ReactNode;
      /** Scrolling page content. */
      children: ReactNode;
      /** Pinned bottom row — counts, freshness, a connection pill. */
      status?: ReactNode;
      /** Comfortable padding around `children`. Off for canvases and nested rails. */
      padded?: boolean;
      tone?: WorkAreaTone;
      className?: string;
      /** Applied to the scrolling body, not the column. */
      bodyClassName?: string;
      'data-testid'?: string;
  }

  /** @see SurfaceTone — which colour family the work area paints in. */
  export declare type WorkAreaTone = SurfaceTone;

  /**
   * The artifact body of a detail pane: which revisions exist, what the selected
   * one looks like, and which pages it has. A pending attempt is never a
   * revision — it cannot be selected, opened or referenced.
   */
  export declare function WorkArtifactInspector({ node, artifact, selection, onSelectionChange, onOpen, onReference, quiet }: {
      node: WorkGraphNodeData;
      artifact: NonNullable<WorkActivityNodeDetail['artifact']>;
      selection: Extract<WorkGraphSelection, {
          kind: 'node';
      }>;
      onSelectionChange: (selection: WorkGraphSelection) => void;
      onOpen?: (selection: Exclude<WorkGraphSelection, null>) => void;
      onReference?: (selection: Exclude<WorkGraphSelection, null>) => void;
      /** Suppress the pending-attempt line when the pane's banner already says it. */
      quiet?: boolean;
  }): JSX.Element;

  export declare interface WorkArtifactRevision {
      id: string;
      label: string;
      createdAt: string;
      /** The host resolves protected preview content; the graph does not fetch URLs. */
      preview?: ReactNode;
      anchorId?: string;
      anchorLabel?: string;
      /** Navigable pages of this revision. Omit when the artifact has no pages. */
      slides?: WorkArtifactSlide[];
  }

  export declare interface WorkArtifactSlide {
      id: string;
      /** 1-based position the host prints as "Slide 4 of 12". */
      index: number;
      title: string;
      /** The host resolves protected preview content; the graph does not fetch URLs. */
      preview?: ReactNode;
  }

  export declare function Workbench({ title, subtitle, kind, onClose, task, taskLabel, tabs, activeTab, defaultTab, onTabChange, moreContext, footer, label, className, 'data-testid': testId, }: WorkbenchProps): JSX.Element;

  export declare interface WorkbenchProps {
      /** The selected file or slide — "Sprint review". */
      title: ReactNode;
      /** A second line — "Presentation · Slide 4 of 5". */
      subtitle?: ReactNode;
      /** Draws a `FileKindMark` before the title. */
      kind?: FileKind;
      /** Renders a close button. Omit for a workbench that cannot be closed. */
      onClose?: () => void;
      /** The current agent task — normally an `AgentTaskCard`. Omit when there is none. */
      task?: ReactNode;
      /** Heading over `task`. Default "Current task". */
      taskLabel?: string;
      tabs: readonly WorkbenchTab[];
      /** Controlled active tab. */
      activeTab?: string;
      /** Uncontrolled initial tab. Defaults to the first. */
      defaultTab?: string;
      onTabChange?: (id: string) => void;
      /** Below the active panel — normally a `MoreContextDisclosure`. */
      moreContext?: ReactNode;
      /** Pinned to the bottom — "Open run", "More". */
      footer?: ReactNode;
      /** Accessible name of the column. Default "Workbench". */
      label?: string;
      className?: string;
      'data-testid'?: string;
  }

  export declare interface WorkbenchTab {
      id: string;
      label: string;
      /** A count on the tab — open comments. Zero or absent shows none. */
      count?: number;
      content: ReactNode;
  }

  /** A file the session produced, already authorized for this viewer. */
  export declare interface WorkComputeArtifact {
      id: string;
      name: string;
      sizeBytes?: number;
      /** Already formatted by the host — the pane does no clock maths. */
      updatedAt?: string;
      /** Host-owned download through its own authorized route. */
      onDownload?: () => void;
  }

  /**
   * The compute session behind a work-graph node — an agent loop in a cloud box.
   *
   * Every field is host-resolved from `GET /api/agent-loops/:runId`. Nothing here
   * is fetched, polled or inferred by the pane: it renders the gauges, the tail
   * and the plan it is given, and says so honestly when a field is absent.
   */
  export declare interface WorkComputeDetail {
      /** The box's operator-facing name — `auth-migration-3`. */
      label: string;
      runtime: 'agentcore-microvm' | 'local';
      /** The initiative this box is charged to. Shown in the breadcrumb. */
      project?: string;
      status: WorkComputeStatus;
      owner: {
          id: string;
          name: string;
          avatarUrl?: string;
      };
      /** True when the viewer is not the owner — "Shared with you" vs "Yours". */
      shared: boolean;
      task: {
          title: string;
          description?: string;
          /** Already formatted in the host's timezone — "09:15". */
          startedAt?: string;
          elapsedMs?: number;
          /** What the work runs as — `devbox:task`. */
          environment: string;
      };
      metrics: {
          model: string;
          costUsd?: number;
          contextTokens: number;
          contextBudgetTokens?: number;
      };
      /** The last few tail lines, for the pre-shell digest. */
      terminalPreview: {
          lines: WorkComputeTerminalLine[];
          running: boolean;
      };
      /** The plan, as the planner produced it. */
      progress: WorkComputeStep[];
      artifacts: WorkComputeArtifact[];
      workItem?: {
          key: string;
          status: string;
          title: string;
          tags: string[];
          onOpen?: () => void;
      };
      events: WorkComputeEvent[];
      /**
       * The box behind the loop. Present = a Shell tab exists. `shellUrl` is minted
       * on demand by the host, so its absence is a button, not an error.
       */
      shell?: {
          sessionId: string;
          shellUrl?: string;
      };
      /** Milliseconds until the reaper stops this box, when the host knows. */
      stopsInMs?: number;
      /** Denominator for the expiry meter. Defaults to the compute surface's hour. */
      idleWindowMs?: number;
      /** Honest state — "Mock runtime", "Planner unavailable · single step". */
      notice?: string;
      /** Primary action. Mints the shell URL; the pane switches to the Shell tab. */
      onOpenShell?: () => void;
      /** Pops the live tail out of the pane. */
      onOpenInNew?: () => void;
      /** Hands the whole session to the Computer Lab surface. */
      onOpenLab?: () => void;
      /** Rows of the `…` overflow menu beside the primary action. */
      moreActions?: WorkActivityPaneAction[];
  }

  /** One frame off the session tail. Twin of `LabEvent`. */
  export declare interface WorkComputeEvent {
      id: string;
      at: string;
      kind: 'command' | 'text' | 'tool' | 'result' | 'error' | 'status' | 'iteration';
      text: string;
      /** Long form — a tool's arguments and output. Collapsed behind a disclosure. */
      detail?: string;
      /** True when the runtime that produced this frame was a mock. Always shown. */
      mock?: boolean;
  }

  export declare function WorkComputePane({ compute, banner, className, 'data-testid': testId, }: WorkComputePaneProps): JSX.Element;

  export declare interface WorkComputePaneProps {
      compute: WorkComputeDetail;
      /**
       * The banner the host authored, if any. Absent, the pane derives the session
       * card from the compute data — the state line every detail pane opens with,
       * said in the words this kind of node has.
       */
      banner?: WorkActivityBanner;
      className?: string;
      'data-testid'?: string;
  }

  /**
   * Where a compute session is.
   *
   * Deliberately a structural TWIN of `LabStatus` in `social/ChatLabShell`
   * rather than an import of it: the same host value must satisfy both, but the
   * graph entry taking a type dependency on the chat entry would drag the chat
   * module graph into `dist/graph.d.ts` for a union of eight strings. Identical
   * unions are mutually assignable, so a host passes one value to both with no
   * cast; keep the two lists in step.
   */
  export declare type WorkComputeStatus = 'planning' | 'starting' | 'running' | 'waiting' | 'done' | 'failed' | 'stopped' | 'budget';

  /** One planned step of the loop. Twin of `LabStep`, plus a duration. */
  export declare interface WorkComputeStep {
      id: string;
      title: string;
      kind: string;
      status: 'pending' | 'running' | 'done' | 'failed' | 'skipped';
      iterations?: number;
      contextTokens?: number;
      /** Wall clock this step has taken, or took. Rendered as "2m 14s". */
      elapsedMs?: number;
  }

  /**
   * One line of the terminal digest.
   *
   * The glyph is a KIND, not a character, so the pane owns the alphabet: a host
   * that sent `▶` directly would be drawing the terminal rather than describing
   * what is in it, and could not be restyled.
   */
  export declare interface WorkComputeTerminalLine {
      glyph: 'prompt' | 'step' | 'done' | 'pending' | 'text';
      text: string;
  }

  /**
   * Presentation-only selectable edge. All labels and disclosure decisions must
   * already be viewer-safe when they reach this component.
   */
  export declare function WorkEdge({ edge, selected, reducedMotion, fromLabel, toLabel, onSelect, }: WorkEdgeProps): JSX.Element;

  export declare interface WorkEdgeProps {
      edge: WorkGraphEdgeData;
      selected?: boolean;
      reducedMotion?: boolean;
      fromLabel: string;
      toLabel: string;
      onSelect?: (id: string) => void;
  }

  export declare function WorkEntityList({ nodes, edges, selection, onSelectionChange, heading, groups, footer, statusLabelOf }: WorkEntityListProps): JSX.Element;

  /** One activity's items in the accessible list, in the canvas's order. */
  export declare interface WorkEntityListGroup {
      id: string;
      title: string;
      subtitle?: string;
      nodeIds: string[];
  }

  export declare interface WorkEntityListProps extends WorkInspectorProps {
      heading?: ReactNode;
      /**
       * When given, the list shows only these groups' items, under their titles,
       * in this order — the activities the canvas is showing. Omitted: every node.
       */
      groups?: WorkEntityListGroup[];
      /** Rendered under the items, e.g. "Show all N activities". */
      footer?: ReactNode;
      /**
       * A status word for a node in place of its raw status — "Paused at write"
       * for a waiting run (NFR #126, `workPauseLabel`). Undefined keeps the status.
       */
      statusLabelOf?: (node: WorkGraphNodeData) => string | undefined;
  }

  export declare interface WorkflowStep {
      step: number;
      label: string;
      done: boolean;
      active: boolean;
  }

  export declare function WorkflowStepper({ steps, size, className, 'data-testid': testId }: WorkflowStepperProps): JSX.Element;

  export declare interface WorkflowStepperProps {
      steps: WorkflowStep[];
      size?: 'sm' | 'md';
      className?: string;
      'data-testid'?: string;
  }

  export declare function WorkGraph(props: WorkGraphProps): JSX.Element;

  export declare type WorkGraphCapability = 'message' | 'view-document' | 'edit-document' | 'join-conversation' | 'join-meeting' | 'observe-terminal' | 'control-terminal' | 'view-transcript' | 'view-run' | 'dispatch-run';

  /** Frozen import names for the component implementation wave. */
  export declare type WorkGraphComponentName = 'WorkGraph' | 'WorkNode' | 'WorkEdge' | 'WorkStatus' | 'WorkInspector' | 'WorkEntityList' | 'WorkSharingControls' | 'WorkReferenceCard';

  export declare type WorkGraphDisclosure = 'existence' | 'summary' | 'details';

  export declare interface WorkGraphEdgeData {
      id: string;
      fromId: string;
      toId: string;
      relation: WorkGraphRelation;
      label?: string;
      status: WorkGraphStatus;
      disclosure: WorkGraphDisclosure;
      startedAt?: string;
      updatedAt: string;
      endedAt?: string;
      capabilities: WorkGraphCapability[];
  }

  export declare interface WorkGraphNodeData {
      id: string;
      kind: WorkGraphNodeKind;
      title: string;
      description?: string;
      status: WorkGraphStatus;
      disclosure: WorkGraphDisclosure;
      startedAt?: string;
      updatedAt: string;
      endedAt?: string;
      capabilities: WorkGraphCapability[];
      avatarUrl?: string;
      locked?: boolean;
  }

  /** Presentation-only work graph contracts. Hosts pass viewer-sanitized data. */
  export declare type WorkGraphNodeKind = 'project' | 'terminal' | 'agent' | 'run' | 'document' | 'change' | 'conversation' | 'meeting' | 'transcript' | 'task';

  export declare interface WorkGraphProps {
      nodes: WorkGraphNodeData[];
      edges: WorkGraphEdgeData[];
      selection: WorkGraphSelection;
      viewport: WorkGraphViewport;
      /** Calendar day shown by the host, in YYYY-MM-DD form. */
      day?: string;
      /** IANA timezone used to place activity within that day. */
      timezone?: string;
      sources?: WorkGraphSourceState[];
      state?: 'loading' | 'ready' | 'empty' | 'partial' | 'error';
      errorMessage?: string;
      className?: string;
      /** Authorized effort/revision presentation. Omit for the existing v1 view. */
      activity?: WorkActivityPresentation;
      /** Activity-canvas backdrop. Defaults to `'ripple-grid'`. */
      background?: WorkActivityCanvasBackground;
      /**
       * How many activity graphs the canvas may draw at once. Defaults to
       * `WORK_ACTIVITY_DEFAULT_MAX_EFFORTS` (2); `WORK_ACTIVITY_ALL_EFFORTS` (0) or
       * a non-finite value means no cap. The newest efforts win, the effort holding
       * the current selection is never dropped, and the ones that are dropped are
       * still counted in the header and footer.
       */
      maxEfforts?: number;
      /**
       * Makes the cap the host's to own. Without it the panel keeps the value in
       * its own state and `maxEfforts` is only the starting point, so a host gets
       * the control working by passing nothing at all.
       */
      onMaxEffortsChange?: (maxEfforts: number) => void;
      onSelectionChange: (selection: WorkGraphSelection) => void;
      onViewportChange: (viewport: WorkGraphViewport) => void;
      onRetry?: () => void;
      onOpen?: (selection: Exclude<WorkGraphSelection, null>) => void;
      onReference?: (selection: Exclude<WorkGraphSelection, null>) => void;
      onRequestCollaboration?: (selection: Exclude<WorkGraphSelection, null>, capability: WorkGraphCapability) => void;
  }

  export declare type WorkGraphRelation = 'works-on' | 'runs-in' | 'operates-on' | 'produced' | 'edited' | 'attended' | 'discussed' | 'derived-from';

  export declare type WorkGraphSelection = {
      kind: 'node';
      id: string;
      revisionId?: string;
      anchorId?: string;
  } | {
      kind: 'edge';
      id: string;
  } | null;

  export declare interface WorkGraphSourceState {
      source: 'cloud-compute' | 'local-compute' | 'document' | 'pipeline' | 'conversation' | 'meeting';
      health: 'available' | 'delayed' | 'disconnected' | 'authorization-unavailable';
      checkedAt: string;
      message?: string;
  }

  export declare type WorkGraphStatus = 'idle' | 'running' | 'waiting' | 'completed' | 'error' | 'stopped' | 'stale';

  export declare interface WorkGraphViewport {
      x: number;
      y: number;
      zoom: number;
  }

  export declare function WorkInspector({ nodes, edges, selection, onSelectionChange, onOpen, onReference, onRequestCollaboration }: WorkInspectorProps): JSX.Element;

  export declare interface WorkInspectorProps {
      nodes: WorkGraphNodeData[];
      edges: WorkGraphEdgeData[];
      selection: WorkGraphSelection;
      onSelectionChange: (selection: WorkGraphSelection) => void;
      onOpen?: (selection: Exclude<WorkGraphSelection, null>) => void;
      onReference?: (selection: Exclude<WorkGraphSelection, null>) => void;
      onRequestCollaboration?: (selection: Exclude<WorkGraphSelection, null>, capability: WorkGraphCapability) => void;
  }

  export declare function WorkItemMetaBar({ status, points, owner, priority, appearance, flags, layout, priorityStyle, className, 'data-testid': testId, }: WorkItemMetaBarProps): JSX.Element | null;

  export declare interface WorkItemMetaBarProps {
      status?: {
          value: string | null;
          options: WorkMetaOption[];
          onChange?: (v: string) => void;
          readOnlyReason?: string;
          pending?: boolean;
      };
      points?: {
          value: number | null;
          onChange?: (v: number | null) => void;
          readOnlyReason?: string;
          pending?: boolean;
          max?: number;
      };
      owner?: {
          value: WorkPerson | null;
          onSearchPeople?: (q: string) => Promise<WorkPerson[]> | WorkPerson[];
          onChange?: (p: WorkPerson | null) => void;
          readOnlyReason?: string;
          pending?: boolean;
      };
      priority?: {
          value: string | null;
          options: WorkMetaOption[];
          onChange?: (v: string) => void;
          readOnlyReason?: string;
          pending?: boolean;
      };
      /**
       * `inline` (default): borderless fields at 13px with a rule between each.
       * `boxed` (since 2.386.15): the Work mockup's row — status and priority are
       * 36px bordered select boxes ("● Open ⌄", "Priority: High ⌄"), points and
       * owner plain 14–15px text with one rule between them.
       */
      appearance?: 'inline' | 'boxed';
      /**
       * Toned facts drawn as tags right after the status — `{ label: 'Blocked',
       * tone: 'danger' }`. Read-only; the host decides what they mean. Empty or
       * absent draws none. Since 2.390.0.
       */
      flags?: WorkMetaFlag[];
      /**
       * `default`: the fields in their usual order (status, points, owner,
       * priority). `divided` (since 2.390.0): the read-first row under a work
       * item's large title — status · flags · owner · points · priority, a rule
       * between each, at 15px ("● Open | Blocked | (EG) Eli Garcia | 2 points |
       * High priority"). Ignored when `appearance="boxed"`.
       */
      layout?: 'default' | 'divided';
      /**
       * `label` (default): "Priority:" then the value. `tag` (since 2.390.0): one
       * toned tag that says it all — "High priority". An editable priority keeps
       * its select, without the "Priority:" word.
       */
      priorityStyle?: 'label' | 'tag';
      'data-testid'?: string;
      className?: string;
  }

  export declare interface WorkListChip {
      label: string;
      tone?: ChipTone;
  }

  /**
   * One filter dimension ("Kind", "Owner", "Status"), drawn as a labelled row of
   * toggle chips in the filter panel. `selected` empty = no narrowing on this
   * facet. The host does the filtering; this only draws and reports.
   */
  export declare interface WorkListFilterFacet {
      id: string;
      label: string;
      options: Array<{
          value: string;
          label: string;
          count?: number;
      }>;
      selected: readonly string[];
      onChange: (selected: string[]) => void;
  }

  /** The filter panel body for `facets`. Exported for hosts that compose their own toolbar. */
  export declare function WorkListFilters({ facets, 'data-testid': testId }: {
      facets: WorkListFilterFacet[];
      'data-testid'?: string;
  }): JSX.Element;

  export declare interface WorkListGroup {
      id: string;
      title: string;
      /** What this group says when open and empty. Default "Nothing here". */
      emptyLabel?: string;
      defaultOpen?: boolean;
  }

  export declare interface WorkListItem {
      id: string;
      groupId: string;
      title: string;
      done?: boolean;
      /** A done toggle is in flight: the checkbox is disabled and busy. */
      donePending?: boolean;
      /** Story points. `null` / absent → no points part. */
      points?: number | null;
      /** `null` / absent → "Unassigned". */
      owner?: WorkListPerson | null;
      /** Type chips, e.g. `{ label: 'Bug', tone: 'danger' }`. */
      chips?: WorkListChip[];
      signal?: WorkListSignal | null;
      disabled?: boolean;
      /**
       * The item's kind as a word — "Bug", "Story". With `metaStyle="text"` it
       * leads the meta line ("Bug · Eli Garcia · 2 points") instead of a chip.
       * Since 2.390.0.
       */
      kindLabel?: string;
      /**
       * A toned tag at the row's end — "Blocked" (danger). Always visible; not
       * inside the row's button. Since 2.390.0.
       */
      tag?: WorkListChip | null;
  }

  /** How a work row's second line reads. See `WorkListViewProps.metaStyle`. */
  export declare type WorkListMetaStyle = 'default' | 'text';

  export declare interface WorkListPerson {
      id: string;
      name: string;
      avatarUrl?: string;
  }

  /**
   * Replaces the checkbox with a dot, and adds its label to the meta line:
   * `running` a filled primary dot ("Agent running"), `review` a hollow ring
   * ("Awaiting review"), `blocked` a danger dot. With `onClick` the dot is a
   * button (e.g. open the live run).
   */
  export declare interface WorkListSignal {
      state: 'running' | 'review' | 'blocked';
      label: string;
      onClick?: () => void;
  }

  /** Search on its own row; sort and the filter button on the next. */
  export declare function WorkListToolbar({ query, onQueryChange, searchPlaceholder, sort, sortOptions, onSortChange, sortLabel, filters: filtersProp, filterFacets, activeFilterCount: activeFilterCountProp, onClearFilters, toolbarLayout, sortStyle, className, 'data-testid': testId, }: WorkListToolbarProps): JSX.Element;

  export declare interface WorkListToolbarProps {
      query: string;
      onQueryChange: (query: string) => void;
      /** Default "Search work…". */
      searchPlaceholder?: string;
      sort?: string;
      sortOptions?: SelectOption[];
      onSortChange?: (value: string) => void;
      /** Accessible name of the sort select. Default "Sort work". */
      sortLabel?: string;
      /** Filter controls; omit for no filter button. */
      filters?: ReactNode;
      /**
       * Filter facets, drawn by `WorkListFilters` in the panel (and counted for
       * the button's dot) when `filters` is not given.
       */
      filterFacets?: WorkListFilterFacet[];
      /** Default: the number of facets with a selection, else 0. */
      activeFilterCount?: number;
      onClearFilters?: () => void;
      /**
       * `stacked` (default): search on its own row, sort and the filter button
       * on the next. `inline`: search and the filter button share the first
       * row; sort sits alone below. Since 2.390.0.
       */
      toolbarLayout?: 'stacked' | 'inline';
      /**
       * `select` (default): a full-width select. `menu`: a quiet text menu —
       * the current option's label and a chevron ("By priority ⌄"). Since 2.390.0.
       */
      sortStyle?: 'select' | 'menu';
      className?: string;
      'data-testid'?: string;
  }

  export declare function WorkListView({ title, count, onCreate, createLabel, onCollapse, collapseLabel, chrome, query, onQueryChange, searchPlaceholder, sort, sortOptions, onSortChange, sortLabel, filters, filterFacets, activeFilterCount: activeFilterCountProp, onClearFilters, groups, items, currentId, onOpenItem, onToggleDone, onReorder, loading, error, onRetry, emptyLabel, storageKey, toolbarLayout, sortStyle, metaStyle, pointsLabel, signalDisplay, currentStyle, groupCountStyle, className, 'data-testid': testId, }: WorkListViewProps): JSX.Element;

  export declare interface WorkListViewProps extends Omit<WorkListToolbarProps, 'className' | 'data-testid'> {
      /** Default "Work". */
      title?: string;
      /** The header count. Defaults to `items.length`. */
      count?: number;
      /** Shows a + button in the title row. */
      onCreate?: () => void;
      /** Default "New work item". */
      createLabel?: string;
      /** Shows a ‹ button in the title row. */
      onCollapse?: () => void;
      /** Default "Collapse work list". */
      collapseLabel?: string;
      /** `embedded` omits the title row (the host shows it in a rail header). Default `full`. */
      chrome?: 'full' | 'embedded';
      groups: WorkListGroup[];
      items: WorkListItem[];
      currentId?: string | null;
      onOpenItem?: (item: WorkListItem) => void;
      /** Omit for read-only rows (no checkbox). */
      onToggleDone?: (item: WorkListItem, done: boolean) => void;
      /** `index` is the item's final position within `toGroupId`. Omit for no reorder. */
      onReorder?: (itemId: string, toGroupId: string, index: number) => void;
      loading?: boolean;
      error?: string | null;
      onRetry?: () => void;
      /** No items at all. Default "No work yet". */
      emptyLabel?: string;
      /** Persists collapsed groups (GroupedList `storageKey`). */
      storageKey?: string;
      /**
       * `default`: owner avatar, type chips, then "signal · 5 pts · Owner".
       * `text` (since 2.390.0): one line of words, no avatar and no chips —
       * "Bug · Eli Garcia · 2 points" (`kindLabel`, owner, points).
       */
      metaStyle?: WorkListMetaStyle;
      /** The points unit: `pts` (default, "5 pts") or `points` ("5 points", "1 point"). Since 2.390.0. */
      pointsLabel?: 'pts' | 'points';
      /**
       * Where a `signal` shows. `dot` (default): a leading dot that replaces the
       * checkbox, and its label in the meta line. `meta`: the label in the meta
       * line only — no dot, so the row keeps its checkbox (or nothing). Since 2.390.0.
       */
      signalDisplay?: 'dot' | 'meta';
      /** Passed to `GroupedList.currentStyle`. Since 2.390.0. */
      currentStyle?: 'tint' | 'bar';
      /** Passed to `GroupedList.groupCountStyle`. Since 2.390.0. */
      groupCountStyle?: 'chip' | 'plain';
      className?: string;
      'data-testid'?: string;
  }

  /** A read-only toned tag on the meta row — "Blocked", in mono like the item key. Since 2.390.0. */
  export declare interface WorkMetaFlag {
      label: string;
      tone?: ChipTone;
  }

  export declare interface WorkMetaOption {
      value: string;
      label: string;
      tone?: ChipTone;
  }

  export declare function WorkNode({ node, selected, sharingFresh, onSelect, onOpen }: WorkNodeProps): JSX.Element;

  /**
   * The detail pane for one selected node: chrome, a state banner, whichever
   * bodies the host supplied data for, and one way to carry the thing back into
   * the conversation. Composition rather than a kind switch — a node that has an
   * artifact AND sources gets both, and a node the viewer may only see the
   * existence of gets chrome and an honest empty body.
   */
  export declare function WorkNodePane({ node, detail, selection, onSelectionChange, onClose, onOpen, onReference, live, headerAccessory, className, 'data-testid': testId, }: WorkNodePaneProps): JSX.Element;

  export declare interface WorkNodePaneProps {
      node: WorkGraphNodeData;
      detail?: WorkActivityNodeDetail;
      selection: Extract<WorkGraphSelection, {
          kind: 'node';
      }>;
      onSelectionChange: (selection: WorkGraphSelection) => void;
      onClose: () => void;
      onOpen?: (selection: Exclude<WorkGraphSelection, null>) => void;
      onReference?: (selection: Exclude<WorkGraphSelection, null>) => void;
      /**
       * The canvas's own liveness (`activity.window.following`). With it, a
       * running node whose source lease has lapsed says "updates delayed" here
       * exactly as its card does — the card's accessible name said it while the
       * pane, the place that is supposed to say MORE, said only "Running".
       */
      live?: boolean;
      /**
       * Beside the close button in the pane's header — who else has this node
       * open (`<PresenceAvatars>`), for instance. Never shrinks the title away:
       * the title truncates first.
       */
      headerAccessory?: ReactNode;
      className?: string;
      'data-testid'?: string;
  }

  export declare interface WorkNodeProps {
      node: WorkGraphNodeData;
      selected?: boolean;
      /** Sharing heartbeat freshness; independent from the node's work status. */
      sharingFresh?: boolean;
      onSelect?: (id: string) => void;
      onOpen?: (id: string) => void;
  }

  /**
   * The work a capped snapshot held back (realtime-examples NFR #221): collapsed
   * it is one card, "N more earlier"; expanded it lists what the host has paged
   * in so far, newest first, with a control for the next page. The host owns the
   * fetch — this renders the count, the items and the paging state it is given.
   */
  export declare function WorkOmittedGroup({ omitted, timezone, className }: WorkOmittedGroupProps): JSX.Element;

  export declare interface WorkOmittedGroupProps {
      omitted: WorkActivityOmitted;
      /** The graph's timezone, for the item times. */
      timezone?: string;
      className?: string;
  }

  /** The state line a detail pane opens with. One dot, one claim, one qualifier. */
  export declare function WorkPaneBanner({ banner }: {
      banner: WorkActivityBanner;
  }): JSX.Element;

  /**
   * The words for WHY a run is waiting — the same vocabulary the run cards use
   * (`AgentRunCard` / `RunSummaryPanel`: "Needs approval"; the editor's
   * breakpoint overlay: "Paused at <step>"). Undefined unless the status is
   * `waiting` and a reason was given, so a caller can fall back to "Waiting".
   */
  export declare function workPauseLabel(status: WorkGraphStatus, pause?: WorkActivityPause): string | undefined;

  /** A person as the meta bar and its picker see one. */
  export declare interface WorkPerson {
      id: string;
      name: string;
      avatarUrl?: string;
  }

  export declare function WorkReferenceCard({ target, state, node, edge, unavailableLabel, onSelect, onOpen }: WorkReferenceCardProps): JSX.Element;

  export declare interface WorkReferenceCardProps {
      target: WorkGraphSelection;
      state: 'loading' | 'available' | 'unavailable';
      node?: WorkGraphNodeData;
      edge?: WorkGraphEdgeData;
      unavailableLabel?: string;
      onSelect?: (selection: Exclude<WorkGraphSelection, null>) => void;
      onOpen?: (selection: Exclude<WorkGraphSelection, null>) => void;
  }

  export declare function WorkSearchPicker<T>({ trigger, open, onClose, label, placeholder, search, itemKey, renderItem, onPick, header, footer, 'data-testid': testId, }: WorkSearchPickerProps<T>): JSX.Element;

  export declare interface WorkSearchPickerProps<T> {
      trigger: RefObject<HTMLElement | null>;
      open: boolean;
      onClose: () => void;
      /** Accessible name for the dialog and the search box. */
      label: string;
      placeholder?: string;
      /** Called on open (with '') and on every query change. */
      search?: (q: string) => Promise<T[]> | T[];
      itemKey: (item: T) => string;
      renderItem: (item: T) => ReactNode;
      onPick: (item: T) => void;
      /** Above the search box (e.g. a relation select). */
      header?: ReactNode;
      /** Below the results (e.g. "Unassign"). */
      footer?: ReactNode;
      'data-testid'?: string;
  }

  export declare type WorkSharingAudience = {
      kind: 'people';
      personIds: string[];
  } | {
      kind: 'conversation';
      conversationIds: string[];
  } | {
      kind: 'organization';
  };

  export declare function WorkSharingControls({ state, value, availableNodes, availableEdges, saving, error, conflict, onChange, onStart, onPause, onResume, onStop, }: WorkSharingControlsProps): JSX.Element;

  export declare interface WorkSharingControlsProps {
      state: 'off' | 'active' | 'paused' | 'stopped' | 'expired';
      value: WorkSharingFormValue;
      availableNodes: WorkGraphNodeData[];
      availableEdges: WorkGraphEdgeData[];
      saving?: boolean;
      error?: string;
      conflict?: boolean;
      onChange: (value: WorkSharingFormValue) => void;
      onStart: () => void;
      onPause: () => void;
      onResume: () => void;
      onStop: () => void;
  }

  export declare interface WorkSharingFormValue {
      audience: WorkSharingAudience;
      selectedNodeIds: string[];
      selectedEdgeIds: string[];
      disclosure: WorkGraphDisclosure;
      expiresAt: string;
      history?: {
          dayFrom: string;
          dayThrough: string;
          expiresAt: string;
      };
  }

  /** Shared document/chat rail: fixed header and footer, one scrollable body. */
  export declare function WorkspaceRail({ title, label, actions, header, footer, children, width, count, heading, countStyle, back, collapsed, collapsedContent, onToggle, toggleLabel, toggleTestId, className, 'data-testid': testId, }: WorkspaceRailProps): JSX.Element;

  export declare interface WorkspaceRailBack {
      label: string;
      href?: string;
      onClick?: () => void;
  }

  export declare interface WorkspaceRailProps {
      title?: string;
      label?: string;
      actions?: ReactNode;
      header?: ReactNode;
      footer?: ReactNode;
      children: ReactNode;
      /** `sm` 240px, `md` 300px, `lg` 368px (a two-line work list with a toolbar). */
      /** sm 240, md 300, ml 320 (the Folders explorer, 2.386.0), lg 368. */
      width?: 'sm' | 'md' | 'ml' | 'lg';
      /**
       * A count beside the title ("Work 11"). Omit for none; zero shows "0" —
       * an empty list is a fact, not a missing number.
       */
      count?: number;
      /**
       * `compact` (default) is the 36px, 12px-title strip a tree rail wears;
       * `prominent` is the column heading a work list wears — an 18px title and
       * count on a 56px row, no rule under it. `label` is the same 56px row with
       * the title as a 15px uppercase label — "DOCUMENTS 137", the All documents
       * mockup (since 2.389.2).
       */
      heading?: 'compact' | 'prominent' | 'label';
      /**
       * How `count` reads. `chip` (default): a neutral count chip. `plain`: muted
       * text after the title — "Initiatives 11". Since 2.390.0.
       */
      countStyle?: 'chip' | 'plain';
      /**
       * A back link on its own row ABOVE the title — "‹ Initiatives" over "Work
       * 11", when the rail has drilled into one thing. `href` renders a link,
       * otherwise a button calling `onClick`. Since 2.390.0.
       */
      back?: WorkspaceRailBack | null;
      collapsed?: boolean;
      collapsedContent?: ReactNode;
      onToggle?: () => void;
      toggleLabel?: string;
      toggleTestId?: string;
      className?: string;
      'data-testid'?: string;
  }

  /**
   * Compact, text-labelled status indicator for work graph nodes and edges.
   *
   * The animated marker is deliberately restricted to fresh, currently
   * running work. The status word and glyph remain present so state is never
   * conveyed by colour or motion alone.
   */
  export declare function WorkStatus({ status, sharingFresh, label, className, }: WorkStatusProps): JSX.Element;

  export declare interface WorkStatusProps {
      status: WorkGraphStatus;
      sharingFresh?: boolean;
      label?: string;
      className?: string;
  }

  /** Transcript rows and the host-owned Ask exchange. Never invents an answer. */
  export declare function WorkTranscriptPanel({ transcript, onSelect }: {
      transcript: NonNullable<WorkActivityNodeDetail['transcript']>;
      onSelect?: (selection: Exclude<WorkGraphSelection, null>) => void;
  }): JSX.Element;

  /** Sets a drag's payload: the prompt-context MIME (JSON) plus the titles as plain text. */
  export declare function writePromptContextDrag(dataTransfer: DataTransfer, items: readonly PromptContextItem[]): void;

  export declare const zIndex: {
      /** Sticky headers, fixed toolbars */
      readonly sticky: 20;
      /** Dropdowns, popovers, tooltips */
      readonly dropdown: 50;
      /** Modals, dialogs, overlays */
      readonly modal: 100;
      /** Toast notifications (above modals) */
      readonly toast: 200;
  };

  export { }


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        diagramMacro: {
            /**
             * Inserts a diagram block at the selection, minting an id unless one
             * is supplied.
             */
            insertDiagram: (id?: string) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        canvasLineSpacing: {
            /**
             * Space the paragraphs in the selection.
             *
             * `'1'` UNSETS rather than storing `1`, so a paragraph returned to single
             * spacing carries no inline style at all and follows the paper — the same
             * rule the font picker's "Default" and the alignment's unset follow, and
             * the reason an untouched document stays untouched.
             */
            setLineSpacing: (spacing: LineSpacing) => ReturnType;
            /** Return the paragraphs in the selection to the paper's own leading. */
            unsetLineSpacing: () => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        canvasListStyle: {
            /**
             * Make the caret's block a list of the style's kind (if it is not one
             * already) and set its marker.
             */
            setListStyle: (style: ListStyle) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        actionItemsMacro: {
            /** Inserts an action-items block at the selection. */
            insertActionItems: (texts?: readonly string[]) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        decisionMacro: {
            /** Inserts a decision record at the selection. */
            insertDecision: (draft: DecisionDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        linksMacro: {
            /** Inserts a links block at the selection. */
            insertLinks: (rows?: readonly {
                label?: string;
                url?: string;
            }[]) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        hitlMacro: {
            /** Inserts an agent -> human callout at the selection. */
            insertHitl: (draft: HitlDraft) => ReturnType;
            /**
             * Records an answer that was given SOMEWHERE ELSE — the mirror row,
             * answered from an inbox by somebody who never opened this page.
             *
             * The same one-range edit answering in the page makes, addressed by
             * the callout's `id` instead of by a node view. Returns false when
             * no callout carries that id, when the body is not one
             * `answerHitlEdit` will write to, and — deliberately — when the
             * body ALREADY carries an answer: see `HITL_CONVERGENCE`.
             */
            answerHitl: (params: {
                id: string;
                answer: string;
                answeredBy?: string;
                answeredAt?: string;
            }) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        fieldMacro: {
            /** Inserts a typed field at the selection. */
            insertField: (draft: FieldDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        attachmentMacro: {
            /** Inserts a file card at the selection. Requires `name` and `url`. */
            insertAttachment: (draft: AttachmentDraft) => ReturnType;
        };
    }
}
