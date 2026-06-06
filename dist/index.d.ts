import { AnchorHTMLAttributes } from 'react';
import { Awareness } from 'y-protocols/awareness';
import { ButtonHTMLAttributes } from 'react';
import { CSSProperties } from 'react';
import { default as default_2 } from 'react';
import { ElementType } from 'react';
import { HTMLAttributes } from 'react';
import { JSX } from 'react/jsx-runtime';
import { JSX as JSX_2 } from 'react';
import { MouseEvent as MouseEvent_2 } from 'react';
import { MutableRefObject } from 'react';
import { Observable } from 'lib0/observable';
import { ReactNode } from 'react';
import { ReactPortal } from 'react';
import { Ref } from 'react';
import { RefObject } from 'react';
import { SVGProps } from 'react';
import { TdHTMLAttributes } from 'react';
import { ThHTMLAttributes } from 'react';
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

export declare type ActionType = 'update-document' | 'post-comment' | 'notify' | 'webhook' | 'mcp-tool' | 'sync-back';

declare interface ActiveSync {
    sourceId: string;
    sourceName: string;
    fileCount: number;
    filesFetched: number;
    itemsMapped: number;
    itemsMaterialized: number;
    startedAt: string;
}

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

export declare type ActivityKind = 'task' | 'pr' | 'decision' | 'comment' | 'status' | string;

export declare function ActivityPanel({ idToken, sendMessage, onMessage, connectionState }: ActivityPanelProps): JSX.Element;

declare interface ActivityPanelProps {
    idToken: string | null;
    sendMessage: (msg: Record<string, unknown>) => void;
    onMessage: OnMessageFn_11;
    connectionState: ConnectionState_4;
}

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

export declare interface AgentNodeData {
    type: 'agent';
    agentId: string;
    agentName?: string;
    protocol: AgentInvokeProtocol;
    inputTemplate: string;
    streaming: boolean;
    timeoutMs?: number;
    outputKey?: string;
    retryPolicy?: RetryPolicy;
}

export declare type AgentProtocol = 'a2a' | 'direct';

export declare type AgentStatus = 'healthy' | 'degraded' | 'offline' | 'deploying';

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

declare interface ApiHealthCheck {
    status: 'ok' | 'error' | string;
    latencyMs?: number;
    error?: string;
}

declare interface ApiHealthSnapshot {
    status: ApiHealthStatus;
    checks: Record<string, ApiHealthCheck>;
    /** Names of failing dependencies (status !== 'ok'). Empty when healthy or unknown. */
    failing: string[];
}

declare type ApiHealthStatus = 'ok' | 'degraded' | 'unknown';

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
export declare function AppShell({ sidebar, header, children, toastRegion, loading, apiDegraded, commandPalette, className, sidebarWidth, }: AppShellProps): JSX.Element;

export declare interface AppShellProps {
    /** Slot: full-height left sidebar (CollapsibleSidebar etc.) */
    sidebar?: ReactNode;
    /** Slot: fixed top header bar */
    header: ReactNode;
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
}

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
 * host (social-api today, distributed-core later) populates this from its
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

export declare function Avatar({ name, size, color, src, className, style, title, }: AvatarProps): JSX.Element;

export declare function AvatarGroup({ names, maxVisible, size, className, }: AvatarGroupProps): JSX.Element;

export declare interface AvatarGroupProps {
    names: string[];
    maxVisible?: number;
    size?: number;
    className?: string;
}

export declare interface AvatarProps {
    name: string;
    size?: number;
    /** Override the auto-computed color. */
    color?: string;
    /** Optional profile image URL. Falls back to initials if absent or load fails. */
    src?: string;
    className?: string;
    style?: CSSProperties;
    title?: string;
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

export declare function Banner({ variant, title, onDismiss, children, className, style, 'data-testid': testId, }: BannerProps): JSX.Element;

export declare interface BannerProps {
    variant?: BannerVariant;
    /** Bold prefix label shown before children. */
    title?: string;
    onDismiss?: () => void;
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}

export declare type BannerVariant = 'error' | 'warning' | 'info' | 'success';

export declare function BarChart({ data, height, xKey, yKey, color, yFormat, }: {
    data: Array<Record<string, unknown>>;
    height?: number;
    xKey: string;
    yKey: string;
    color?: string;
    yFormat?: (v: number) => string;
}): JSX_2.Element;

export declare const borderRadius: {
    readonly sm: string;
    readonly md: string;
    readonly lg: string;
    readonly xl: string;
    readonly full: string;
};

export declare interface BreadcrumbItem {
    label: string;
    href?: string;
    onClick?: (e: React.MouseEvent) => void;
}

export declare function Breadcrumbs({ items, separator, maxItems, className, 'data-testid': testId, }: BreadcrumbsProps): JSX.Element | null;

export declare interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    /** Custom separator rendered between items (default: "/") */
    separator?: ReactNode;
    /**
     * When set, truncate the middle of the list to fit this many visible items.
     * The first and last are always shown; middle items collapse to "…".
     */
    maxItems?: number;
    className?: string;
    'data-testid'?: string;
}

export declare function Button({ variant, size, disabled, fullWidth, children, type, className, ...rest }: ButtonProps): JSX.Element;

export declare interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    children: ReactNode;
}

export declare type ButtonSize = 'sm' | 'md' | 'lg';

export declare type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'danger-solid';

export declare function CallControls({ mode, isMuted, isCameraOn, isScreenSharing, onToggleMute, onToggleCamera, onToggleScreenShare, onUpgradeToVideo, onEndCall, onAddParticipant, availableParticipants, currentParticipantIds, className, }: CallControlsProps): JSX.Element;

export declare type CallControlsMode = 'audio' | 'video';

export declare interface CallControlsProps {
    mode: CallControlsMode;
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
    className?: string;
}

export declare function CallingStatusPill({ show, label }: CallingStatusPillProps): JSX.Element | null;

export declare interface CallingStatusPillProps {
    /** Show/hide gate — the parent decides ringing semantics. */
    show: boolean;
    /** Label for the callee(s). E.g. "Alice", "Alice & Bob", "3 people". */
    label: string;
}

export declare type CallMode = 'audio' | 'video';

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
export declare function CallStartedBanner({ callerName, callerAvatarUrl, context, mode, onJoin, onDismiss, autoExpireSec, className, style, }: CallStartedBannerProps): JSX.Element | null;

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
    className?: string;
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

export declare function CallWidget({ state, mode, participants, localParticipant, callerName, duration, isMuted, isCameraOn, isScreenSharing, onAnswer, onDecline, onEndCall, onToggleMute, onToggleCamera, onToggleScreenShare, onUpgradeToVideo, onAddParticipant, availableParticipants, onMinimize, layoutComponent, callStats, minimized, position, contained, draggable, className, style, dataAttrs, }: CallWidgetProps): JSX.Element | null;

export declare type CallWidgetMode = PersistedWidgetMode | 'fullscreen';

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
    /** List of people available to add to the call */
    availableParticipants?: CallWidgetParticipant[];
    onMinimize?: () => void;
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
    /** Arbitrary `data-*` attributes to spread onto the root element.
     *  Lets callers (e.g. HangoutOverlay) attach e2e-friendly testids and
     *  lobby/callId metadata without an extra wrapper div that would
     *  conflict with the widget's own `position: fixed` placement. */
    dataAttrs?: Record<string, string | number | undefined>;
}

export declare type CallWidgetState = 'idle' | 'ringing' | 'connecting' | 'active' | 'ended';

declare type CanvasTool = 'brush' | 'pen' | 'eraser' | 'select';

export declare interface CaptionLine {
    id: string;
    speakerId: string;
    speakerName?: string;
    text: string;
    /** ISO timestamp of caption emission. Used for fade-out + ordering. */
    at: string;
    /** True if the caption is still being updated (interim) vs final. */
    interim?: boolean;
}

export declare function Card({ children, padding, className, ...rest }: CardProps): JSX.Element;

export declare function CardHeader({ title, subtitle, meta, action, className }: CardHeaderProps): JSX.Element;

export declare interface CardHeaderProps {
    title: string;
    /** Small text below the title. */
    subtitle?: string;
    /** Extra content rendered immediately to the right of the title (badges/chips). */
    meta?: default_2.ReactNode;
    /** Right-aligned action area (buttons, menus). */
    action?: default_2.ReactNode;
    className?: string;
}

export declare type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export declare interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    padding?: CardPadding;
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

export declare function ChannelHeader({ name, memberCount, description, actions, avatarUrl, online, onMembersClick, className, }: ChannelHeaderProps): JSX.Element;

export declare interface ChannelHeaderProps {
    /** Display name of the channel or user */
    name: string;
    /** Number of members in the channel */
    memberCount?: number;
    /** Short description shown below the name */
    description?: string;
    /** Right-aligned action area */
    actions?: ReactNode;
    /** Avatar URL; falls back to name initials */
    avatarUrl?: string;
    /** Show green online indicator */
    online?: boolean;
    /** Called when member-count area is clicked */
    onMembersClick?: () => void;
    className?: string;
}

/**
 * Chat input with send button. Stateless — value/onChange controlled by parent.
 *
 * - Enter submits (Shift+Enter inserts newline in multiline mode).
 * - Submit disabled when `disabled` or value is empty/whitespace.
 */
export declare function ChatComposer({ value, onChange, onSubmit, disabled, multiline, placeholder, submitLabel, className, style, autoFocus, maxRows, }: ChatComposerProps): JSX.Element;

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
}

declare interface ChatMessage {
    id?: string;
    clientId: string;
    content: string;
    timestamp: string;
    displayName?: string;
    avatarUrl?: string;
}

export declare function ChatPanel({ messages, onSend, disabled, onTyping, typingUsers }: ChatPanelProps): JSX.Element;

declare interface ChatPanelProps {
    messages: ChatMessage[];
    onSend: (content: string) => void;
    disabled?: boolean;
    onTyping?: (isTyping: boolean) => void;
    typingUsers?: string[];
}

export declare function ChatRoom({ idToken, roomId, roomName, onMessage }: ChatRoomProps): JSX.Element;

declare interface ChatRoomProps {
    idToken: string | null;
    roomId: string;
    roomName: string;
    onMessage: OnMessageFn_9;
}

export declare function Chip({ tone, size, solid, mono, dot, uppercase, icon, children, title, className, style, 'data-testid': testId, 'aria-label': ariaLabel, }: ChipProps): JSX.Element;

export declare interface ChipProps {
    tone?: ChipTone;
    size?: 'sm' | 'xs';
    /** Solid fill (dark bg + white text) instead of soft tint. */
    solid?: boolean;
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
}

export declare type ChipTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'caution' | 'purple';

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

export declare type CodeBlockTheme = 'dark' | 'light';

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

export declare function CollapsedIconStrip({ connectionState, onExpand, onDocuments, onPipelines, onObservability, }: CollapsedIconStripProps): JSX.Element;

declare interface CollapsedIconStripProps {
    connectionState: ConnectionState_3;
    onExpand: () => void;
    onDocuments: () => void;
    onPipelines: () => void;
    onObservability: () => void;
}

export declare function CollapsibleSection({ title, defaultOpen, badge, children, className, storageKey, }: CollapsibleSectionProps): JSX.Element;

export declare interface CollapsibleSectionProps {
    title: string;
    defaultOpen?: boolean;
    /** Optional element rendered on the right side of the header (e.g. a count chip). */
    badge?: default_2.ReactNode;
    children: default_2.ReactNode;
    className?: string;
    /** If provided, the open state is persisted to localStorage under this key. */
    storageKey?: string;
}

export declare function CollapsibleSidebar({ connectionState, onDisconnect, onReconnect, onCollapse, presenceUsers, currentClientId, currentChannel, activityEvents, userId, documents, onOpenDocument, pipelines, onOpenPipeline, onSeeAllPipelines, videoSlot, }: CollapsibleSidebarProps): JSX.Element;

declare interface CollapsibleSidebarProps {
    connectionState: ConnectionState_2;
    onDisconnect: () => void;
    onReconnect: () => void;
    onCollapse?: () => void;
    presenceUsers: PresenceUser_2[];
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

export declare function CommandPaletteHint({ className }?: CommandPaletteHintProps): JSX.Element;

export declare interface CommandPaletteHintProps {
    className?: string;
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

declare interface CommentItem {
    postId: string;
    commentId: string;
    authorId: string;
    content: string;
    parentCommentId?: string;
    createdAt: string;
    _fadeIn?: boolean;
}

/** A comment with nested replies, assembled client-side. */
export declare interface CommentThread extends CommentData {
    replies: CommentThread[];
}

export declare function CommentThreadPanel({ idToken, roomId, postId, onMessage }: CommentThreadProps): JSX.Element;

declare interface CommentThreadProps {
    idToken: string | null;
    roomId: string | null;
    postId: string | null;
    onMessage: OnMessageFn;
}

export declare interface ConditionNodeData {
    type: 'condition';
    /** JSONPath or boolean expression evaluated over context. */
    expression: string;
    /** UI label shown on the node. */
    label?: string;
}

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

export declare function ConnectionPill({ state, compact, withLabel, labels, className, 'data-testid': testId, }: ConnectionPillProps): JSX.Element;

export declare interface ConnectionPillProps {
    state: ConnectionState;
    /** Dot-only rendering — no label text. Default false. */
    compact?: boolean;
    /** Render the text label next to the dot. Default true. Set false for dot-only. */
    withLabel?: boolean;
    /** Override label text per state (e.g. localized strings). */
    labels?: Partial<Record<ConnectionState, string>>;
    className?: string;
    'data-testid'?: string;
}

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

export declare interface CreateUserInput {
    email: string;
    password?: string;
    givenName?: string;
    familyName?: string;
    nickname?: string;
    customAttributes?: Record<string, unknown>;
}

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
    createdAt: string;
    updatedAt: string;
}

/** Dark theme preset — proper dark UI design, not simply inverted. */
export declare const darkTheme: ThemeTokens;

export declare function DataTable<T>({ data, columns, keyField, onRowClick, rowActions, searchable, searchPlaceholder, pageSize, emptyMessage, loading, loadingRows, className, 'data-testid': testId, }: DataTableProps<T>): JSX.Element;

export declare interface DataTableColumn<T> {
    /** Stable id for the column. When `accessor` is omitted, used as the data key on T. */
    key: string;
    /** Header label. */
    header: ReactNode;
    /** Optional cell renderer. If absent, the value at `key` is rendered as a string. */
    render?: (row: T, rowIndex: number) => ReactNode;
    /** Optional sort comparator. If absent but `sortable=true`, sorts by `String(row[key])`. */
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
    className?: string;
    'data-testid'?: string;
}

export declare const DEFAULT_PICKER_EMOJIS: readonly ["👍", "❤️", "🔥", "😂", "👏", "🎉", "😮", "💯", "😀", "😅", "😉", "😍", "😘", "🤣", "🥰", "😇", "🤔", "😎", "😢", "😡", "🤯", "😱", "🙃", "🤩", "🙏", "🤝", "👋", "👌", "✌️", "🤞", "🤘", "🫶", "✨", "⭐", "💫", "🌟", "⚡", "💥", "☀️", "🌈", "🚀", "🎯", "🏆", "💪", "🎊", "🎈", "🥳", "🎁", "☕", "🍕", "🍔", "🍩", "🍦", "🍓", "🍻", "🍷", "👀", "🤖", "👻", "😺", "🐶", "🦄", "🐝", "🌸"];

export declare const DEFAULT_PIPELINE_ICONS: string[];

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

export declare function DocsShell({ topNav, sidebar, rightRail, children, fullBleed, preContent, className, style, }: DocsShellProps): JSX.Element;

export declare interface DocsShellProps {
    /** Sticky top navigation. Typically <DocsTopNav>. */
    topNav: ReactNode;
    /** Left sidebar. Typically <DocsSidebar>. */
    sidebar: ReactNode;
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

export declare interface DocumentData {
    meta: DocumentMeta;
    sections: Section[];
}

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

export declare function Drawer({ open, onClose, title, subtitle, width, children, footer, 'data-testid': testId, }: DrawerProps): default_2.ReactPortal | null;

export declare interface DrawerProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    subtitle?: string;
    /** Panel width in pixels. Defaults to 460. */
    width?: number;
    children: default_2.ReactNode;
    footer?: default_2.ReactNode;
    'data-testid'?: string;
}

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

export declare function EmptyState({ icon, title, body, description, actionLabel, onAction, action, testId, actionTestId, }: EmptyStateProps): JSX.Element;

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
     * Optional testid for the container (defaults to "empty-state").
     * Callers with existing tests targeting a specific id can pass it here.
     */
    testId?: string;
    /**
     * Optional testid for the action button (defaults to "empty-state-action").
     */
    actionTestId?: string;
}

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

export declare type ErrorCategory = 'NetworkError' | 'TimeoutError' | 'ValidationError' | 'LLMError' | 'RegistryConflict' | 'UnknownError';

export declare function ErrorPage({ title, message, error, onRetry, onBack, }: ErrorPageProps): JSX.Element;

export declare interface ErrorPageProps {
    title?: string;
    message: string;
    error?: string;
    onRetry?: () => void;
    onBack?: () => void;
}

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

export declare interface EventGlyph {
    icon: string;
    color: string;
    severity: 'info' | 'success' | 'warning' | 'error' | 'neutral';
}

export declare const eventGlyphs: Record<string, EventGlyph>;

export declare interface EventRowProps {
    timestamp: string;
    type: string;
    summary: string;
    severity?: 'info' | 'warning' | 'error' | 'success';
    onClick?: () => void;
    selected?: boolean;
}

export declare function ExpandableCallWidget({ title, subtitle, children, controls, defaultMode, onModeChange, persistKey, apiRef, defaultCorner, expandable, zIndex, className, }: ExpandableCallWidgetProps): JSX.Element;

export declare interface ExpandableCallWidgetHandle {
    mode: CallWidgetMode;
    setMode: (m: CallWidgetMode) => void;
}

export declare interface ExpandableCallWidgetProps {
    /** Header label (left side of chrome). */
    title?: ReactNode;
    /** Optional status line shown under the title (e.g. "0:36 • 3 in call"). */
    subtitle?: ReactNode;
    /** Body — typically `<HangoutLayout fillParent participants={…}/>`. */
    children: ReactNode;
    /** Optional controls strip rendered below the body. Stays inside the
     *  widget chrome in mini mode (compact); spans full width in docked
     *  and fullscreen modes. */
    controls?: ReactNode;
    /** Initial mode. Persisted modes override this once `persistKey` is
     *  set and storage has a prior value. Default: 'mini'. */
    defaultMode?: PersistedWidgetMode;
    /** Fires after every settled mode change (programmatic or via UI). */
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
    /** z-index for the floating modes. Default 9999. */
    zIndex?: number;
    /** Class on the root. */
    className?: string;
}

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

export declare function FileUploadDrop({ accept, maxSize, multiple, onFiles, onError, disabled, label, className, 'data-testid': testId, }: FileUploadDropProps): JSX.Element;

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
}

export declare function FilterChip({ active, onClick, color, dot, size, children, className, disabled, }: FilterChipProps): JSX.Element;

export declare interface FilterChipProps {
    active: boolean;
    onClick: () => void;
    /** Dot color (for colored department/status dots); also tints the active state. */
    color?: string;
    /** Show a colored dot before the label. */
    dot?: boolean;
    size?: 'sm' | 'xs';
    children: ReactNode;
    className?: string;
    disabled?: boolean;
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

/** Formats an ISO timestamp string to HH:MM local time. */
export declare function formatChatTime(isoString: string): string;

/** Formats a list of typing user names. Trims to a max of 2 explicit names + "+N others". */
export declare function formatTypingBanner(names: string[]): string;

/**
 * Labeled wrapper around an input control. Wires `<label htmlFor>` →
 * `<input id>`, plus `aria-describedby` for hints/errors and `aria-invalid`
 * for the error state. Use the render-prop API so we don't have to wrap
 * every kind of input the library ships.
 */
export declare function FormField({ label, hint, error, required, layout, children, className, style, 'data-testid': testId, }: FormFieldProps): JSX.Element;

export declare type FormFieldLayout = 'stacked' | 'inline';

export declare interface FormFieldProps {
    label: string;
    /** Helper text shown under the control. */
    hint?: string;
    /** Error message; when present, replaces the hint and adds a danger border. */
    error?: string;
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
    }) => ReactNode;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}

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
    destroy(): void;
}

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
 * longer in the runtime's in-memory state) resolve correctly. Returns
 * null on 404 or transport failure.
 *
 * Wire shape comes from `PipelineRunDetailResponse` in
 * frontend/src/types/pipeline-contracts.ts — kept in lockstep with
 * social-api/src/pipeline/http/contracts.ts.
 */
export declare function getPipelineRun(pipelineId: string, runId: string): Promise<PipelineRun | null>;

export declare function getRenderer(sectionType: string | null | undefined, viewMode: ViewMode): SectionRenderer | null;

/**
 * Per-run audit timeline. Returns a single page; callers paginate with
 * `nextCursor`. The backend route returns `{ items: [], nextCursor }`
 * with rows newest-first.
 */
export declare function getRunAuditLog(pipelineId: string, runId: string, filters?: AuditFilters): Promise<AuditPage>;

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

export declare function HangoutLayout({ participants, localParticipant, mode, activeSpeakerId, speakerHysteresisMs, spotlightContent, onParticipantClick, fillParent, pipWidth, filmstripTileWidth, className, style, }: HangoutLayoutProps): JSX.Element;

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

export declare function HangoutPreJoinShell({ channelName, previewStream, permission, permissionMessage, audioEnabled, videoEnabled, onToggleAudio, onToggleVideo, onRetryPermission, participants, readyState, readyLoading, onJoin, onCancel, joinLabel, joinDisabled, subtitleOverride, className, 'data-testid': testId, }: HangoutPreJoinShellProps): JSX.Element;

export declare interface HangoutPreJoinShellProps {
    /** Channel display name surfaced at the top of the shell. */
    channelName: string;
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
    /** Show a custom subtitle in the right-rail. Overrides the auto-
     *  computed "N people are in this call" copy. */
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

export declare interface HangoutRoomHeaderRecording {
    /** Whether recording is armed for this room. When false, no pill is rendered. */
    armed: boolean;
    /** Whether the recording is actively writing (someone is publishing). */
    active: boolean;
}

export declare function HangoutSpotlight({ participants, localParticipant, spotlightContent, activeSpeakerId, speakerHysteresisMs, onParticipantClick, fillParent, filmstripTileWidth, className, style, }: HangoutSpotlightProps): JSX.Element;

export declare interface HangoutSpotlightProps {
    /** Remote participants. Caller should NOT include the local user here. */
    participants: HangoutLayoutParticipant[];
    /** The local user — always renders in the filmstrip in spotlight mode. */
    localParticipant?: HangoutLayoutParticipant | null;
    /** Content for the main slot — typically a screen-share `<video>`. When
     *  provided, takes priority over the active-speaker tile. */
    spotlightContent?: ReactNode;
    /** Active speaker id — drives spotlight slot via stabilized hysteresis. */
    activeSpeakerId?: string | null;
    /** Hysteresis window (ms) before the spotlight slot swaps. 0 = immediate. */
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

export declare function IconButton({ 'aria-label': ariaLabel, icon, children, disabled, variant, size, className, ...rest }: IconButtonProps): JSX.Element;

export declare interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    'aria-label': string;
    icon?: ReactNode;
    children?: ReactNode;
    variant?: 'ghost' | 'primary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
}

export declare interface IconPickerProps {
    value: string;
    onChange: (emoji: string) => void;
    curated?: string[];
}

export declare interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
    size?: number;
}

export declare const IDENTITY_BASE_URL: string;

export declare function IdentityAdminLayout({ children, activePath, adminEmail, onNavigate, onLogout, }: IdentityAdminLayoutProps): JSX.Element;

export declare interface IdentityAdminLayoutProps {
    children: React.ReactNode;
    activePath?: string;
    adminEmail?: string;
    onNavigate: (path: string) => void;
    onLogout?: () => void;
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

export declare function InlineAlert({ tone, children, onDismiss, className }: InlineAlertProps): JSX.Element;

export declare interface InlineAlertProps {
    tone: InlineAlertTone;
    children: default_2.ReactNode;
    onDismiss?: () => void;
    className?: string;
}

export declare type InlineAlertTone = 'error' | 'success' | 'info' | 'warning';

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

export declare function InlinePopover({ trigger, open, onClose, placement, offset, className, zIndex, 'data-testid': testId, children, }: InlinePopoverProps): ReactPortal | null;

export declare type InlinePopoverPlacement = 'bottom-start' | 'right';

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
    children: ReactNode;
}

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

export declare interface KnowledgeBaseNodeData {
    type: 'knowledge-base';
    knowledgeBaseId: string;
    queryTemplate: string;
    topK: number;
    scoreThreshold?: number;
    outputKey?: string;
    retryPolicy?: RetryPolicy;
}

export declare function KPIGrid({ children, columns, dense, className, style, 'data-testid': testId, }: KPIGridProps): JSX.Element;

export declare type KPIGridColumns = 1 | 2 | 3 | 4;

export declare interface KPIGridProps {
    /** Children — expected to be <StatCard> instances. */
    children: ReactNode;
    /** Number of columns at >=640px. Default 4. Always collapses to 1 below. */
    columns?: KPIGridColumns;
    /** Tighter gap (8px vs 16px). Default false. */
    dense?: boolean;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}

/** Alias kept for diagrams better described as a stack of horizontal layers. */
export declare const LayerStack: typeof StackDiagram;

/** Default light theme — derived from the original hardcoded tokens. */
export declare const lightTheme: ThemeTokens;

export declare function LineChart({ series, height, yFormat, xFormat, }: {
    series: LineSeries[];
    height?: number;
    yFormat?: (v: number) => string;
    xFormat?: (v: number | string) => string;
}): JSX_2.Element;

export declare interface LineSeries {
    label: string;
    data: Array<{
        x: number | string;
        y: number;
    }>;
    color?: string;
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

/**
 * Fetch pipeline run history from the backend API.
 * Falls back gracefully when the endpoint is unavailable.
 */
export declare function listPipelineRuns(pipelineId: string, options?: {
    limit?: number;
    cursor?: string;
}): Promise<ListRunsResponse>;

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

declare interface LogEntry {
    id: string;
    direction: 'sent' | 'received';
    message: GatewayMessage | Record<string, unknown>;
    timestamp: string;
}

export declare function LoginPage({ uid, interactionUrl, clientName, logoUrl, error, onLogin, onRegister, onForgotPassword, registrationEnabled, forgotPasswordEnabled, }: LoginPageProps): JSX.Element;

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
}

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

export declare function LogStream({ lines, follow, showTimestamp, showLevel, showSource, title, headerSlot, emptyMessage, maxHeight, onClear, className, style, 'data-testid': testId, }: LogStreamProps): JSX.Element;

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
    /** When provided, renders a "Clear" button in the header. */
    onClear?: () => void;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}

export declare function makeEmptyField(sectionType: string): DocumentTypeField;

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

export declare function matchHotkey(e: KeyboardEvent, spec: string): boolean;

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

declare interface MemberItem {
    groupId: string;
    userId: string;
    role: 'owner' | 'admin' | 'member';
    joinedAt: string;
    displayName?: string;
    status?: string;
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

export declare function MessageRow({ author, content, timestamp, avatarUrl, hideAvatar, hideAuthor, mine, footer, className, }: MessageRowProps): JSX.Element;

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
    /** Mark this row as the current viewer's own message — exposed on data attr for styling hooks. */
    mine?: boolean;
    /**
     * Slot rendered below the content (e.g. a `<ReactionsBar>` for this message).
     * Indented under the content so it lines up under text, not under the avatar.
     */
    footer?: ReactNode;
    className?: string;
}

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

export declare function MfaSetupPage({ onSetup, onVerify, onComplete, userEmail, }: MfaSetupPageProps): JSX.Element;

export declare interface MfaSetupPageProps {
    onSetup: (deviceName: string) => Promise<{
        deviceId: string;
        qrCode: string;
        secret: string;
        backupCodes: string[];
    }>;
    onVerify: (deviceId: string, code: string) => Promise<{
        success: boolean;
        backupCodes?: string[];
    }>;
    onComplete: () => void;
    userEmail?: string;
}

export declare interface MfaSetupResult {
    deviceId: string;
    qrCode: string;
    secret: string;
    backupCodes: string[];
}

export declare function MfaVerifyPage({ onVerify, onVerifyBackup, error, }: MfaVerifyPageProps): JSX.Element;

export declare interface MfaVerifyPageProps {
    onVerify: (code: string) => Promise<void>;
    onVerifyBackup: (code: string) => Promise<void>;
    error?: string | null;
}

export declare function MicIcon({ size, ...rest }: IconProps): JSX.Element;

export declare function MicOffIcon({ size, ...rest }: IconProps): JSX.Element;

export declare function Modal({ open, onClose, title, maxWidth, children, footer, backdropTestId, backdropStyle, cardStyle, zIndex, rawChildren, }: ModalProps): ReactPortal | null;

export declare interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
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

export declare function MoreHorizontalIcon({ size, ...rest }: IconProps): JSX.Element;

export declare function MuteWhileTalkingToast({ show, label, }: MuteWhileTalkingToastProps): JSX.Element | null;

export declare interface MuteWhileTalkingToastProps {
    show: boolean;
    /** Optional label override. */
    label?: string;
}

declare type MyItem = MentionItem | TaskAssignment;

export declare function nameToColor(name: string): string;

export declare function nameToInitials(name: string): string;

/** Sub-section navigation: link-based underline tab strip (no state — consumer routes via activeHref). */
export declare function NavTabs({ items, activeHref, renderLink, className, style, 'aria-label': ariaLabel, }: NavTabsProps): JSX.Element;

export declare interface NavTabsProps {
    items: TopNavItem[];
    activeHref?: string;
    renderLink?: (item: TopNavItem, props: AnchorHTMLAttributes<HTMLAnchorElement>) => ReactNode;
    className?: string;
    style?: CSSProperties;
    'aria-label'?: string;
}

export declare type NetworkQuality = 'good' | 'medium' | 'poor' | 'dead';

export declare function NetworkQualityBadge({ quality, style }: NetworkQualityBadgeProps): JSX.Element;

export declare interface NetworkQualityBadgeProps {
    quality: NetworkQuality;
    style?: CSSProperties;
}

export declare type NodeData = TriggerNodeData | LLMNodeData | TransformNodeData | ConditionNodeData | ActionNodeData | ForkNodeData | JoinNodeData | ApprovalNodeData | AgentNodeData | GuardrailNodeData | McpToolNodeData | KnowledgeBaseNodeData | GraphQueryNodeData | MemoryNodeData | PolicyNodeData | AgUiOutputNodeData;

export declare type NodeType = 'trigger' | 'llm' | 'transform' | 'condition' | 'action' | 'fork' | 'join' | 'approval' | 'agent' | 'mcp-tool' | 'knowledge-base' | 'graph-query' | 'memory' | 'guardrail' | 'policy' | 'ag-ui-output';

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

declare type OnMessageFn = (handler: (msg: GatewayMessage) => void) => () => void;

declare type OnMessageFn_10 = (handler: (msg: GatewayMessage) => void) => () => void;

declare type OnMessageFn_11 = (handler: (msg: GatewayMessage_2) => void) => () => void;

declare type OnMessageFn_2 = (handler: (msg: GatewayMessage) => void) => () => void;

declare type OnMessageFn_3 = (handler: (msg: GatewayMessage) => void) => () => void;

declare type OnMessageFn_4 = (handler: (msg: GatewayMessage) => void) => () => void;

declare type OnMessageFn_5 = (handler: (msg: GatewayMessage) => void) => () => void;

declare type OnMessageFn_6 = (handler: (msg: GatewayMessage) => void) => () => void;

declare type OnMessageFn_7 = (handler: (msg: GatewayMessage) => void) => () => void;

declare type OnMessageFn_8 = (handler: (msg: GatewayMessage) => void) => () => void;

declare type OnMessageFn_9 = (handler: (msg: GatewayMessage) => void) => () => void;

export declare function PageHeader({ title, description, actions, back, badge, className, }: PageHeaderProps): JSX.Element;

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

export declare type PersistedWidgetMode = 'mini' | 'docked';

export declare interface PersistedWidgetState {
    mode: PersistedWidgetMode;
    x: number;
    y: number;
    width: number;
    height: number;
}

export declare function PhoneOffIcon({ size, ...rest }: IconProps): JSX.Element;

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
    status: 'running' | 'succeeded' | 'failed' | 'canceled' | 'interrupted';
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

export declare type PlayerPhase = 'idle' | 'connecting' | 'buffering' | 'playing' | 'error';

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

export declare function PostFeed({ idToken, roomId, onMessage }: PostFeedProps): JSX.Element;

declare interface PostFeedProps {
    idToken: string | null;
    roomId: string | null;
    onMessage: OnMessageFn_10;
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

export declare function PresenceAvatars({ users, maxVisible, size, onMoreClick, className, }: PresenceAvatarsProps): JSX.Element;

export declare interface PresenceAvatarsProps {
    users: PresenceAvatarUser[];
    /** Maximum avatars to render before "+N" chip (default 5) */
    maxVisible?: number;
    /** Avatar diameter in px (default 28) */
    size?: number;
    /** Called when the "+N" overflow chip is clicked */
    onMoreClick?: () => void;
    className?: string;
}

export declare interface PresenceAvatarUser {
    /** Unique identifier for the user */
    id: string;
    name: string;
    /** Optional avatar image URL */
    avatarUrl?: string;
    online?: boolean;
}

export declare interface PresenceContextValue {
    presenceUsers: PresenceUser[];
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

export declare function PresencePanel({ users, currentClientId }: PresencePanelProps): JSX.Element;

declare interface PresencePanelProps {
    users: PresenceUser[];
    currentClientId: string | null;
}

export declare function PresenceProvider({ value, children, }: {
    value: PresenceContextValue;
    children: ReactNode;
}): JSX.Element;

export declare type PresenceState = 'online' | 'away' | 'busy' | 'offline' | 'unknown';

declare interface PresenceUser {
    clientId: string;
    status: string;
    metadata: Record<string, unknown>;
}

declare interface PresenceUser_2 {
    clientId: string;
    metadata: Record<string, unknown>;
}

declare interface ProfileItem {
    userId: string;
    displayName: string;
    bio?: string;
    avatarUrl?: string;
    visibility: 'public' | 'private';
    createdAt: string;
    updatedAt: string;
}

export declare function ProgressBar({ value, max, color, size, label, showRatio, className, style, 'data-testid': testId, 'aria-label': ariaLabel, }: ProgressBarProps): JSX.Element;

export declare interface ProgressBarProps {
    value: number;
    /** Maximum value. Defaults to 100. */
    max?: number;
    /** Fill color. Defaults to var(--color-primary). */
    color?: string;
    size?: ProgressBarSize;
    label?: ReactNode;
    /** When true (default), shows "{value}/{max}". Otherwise shows percentage. */
    showRatio?: boolean;
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
     * Color of the presence dot in the footer (e.g. '#22c55e' for green).
     * Default: '#d1d5db' (grey = unknown).
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

declare interface ProposedField {
    name: string;
    sectionType: string;
    required: boolean;
}

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

export declare function ReactionOverlay({ reactions, style }: ReactionOverlayProps): JSX.Element;

export declare interface ReactionOverlayProps {
    reactions: Reaction[];
    style?: CSSProperties;
}

export declare function ReactionPicker({ onReact, emojis, style }: ReactionPickerProps): JSX.Element;

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

export declare function ReconnectingBanner({ show, label }: ReconnectingBannerProps): JSX.Element | null;

export declare interface ReconnectingBannerProps {
    show: boolean;
    /** Optional label override. Default: "Reconnecting…". */
    label?: string;
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

export declare type RecordingStatus = 'ready' | 'processing' | 'failed';

/**
 * Redrive one or more DLQ entries (re-publish them to the event bus).
 */
export declare function redriveDLQEntries(ids: string[], options?: {
    resetAttempts?: boolean;
    preview?: boolean;
}): Promise<DLQRedriveResponse>;

export declare function registerFieldType(def: FieldTypeDefinition): void;

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

declare interface RoomItem {
    roomId: string;
    channelId: string;
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

declare interface RoomMemberItem {
    roomId: string;
    userId: string;
    displayName?: string;
    joinedAt: string;
}

export declare function RosterPanel({ participants, activeSpeakerId, onParticipantClick, count, title, footer, className, }: RosterPanelProps): JSX.Element;

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

export declare type RunStatus = 'pending' | 'running' | 'awaiting_approval' | 'paused_at_breakpoint' | 'completed' | 'failed' | 'cancelled';

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

export declare function SearchInput({ value, onChange, placeholder, onClear, className, style, autoFocus, 'aria-label': ariaLabel, }: SearchInputProps): JSX.Element;

export declare interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    /** Called after the value is cleared via the clear button. */
    onClear?: () => void;
    className?: string;
    style?: default_2.CSSProperties;
    autoFocus?: boolean;
    'aria-label'?: string;
}

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

declare type SectionRenderer = React.ComponentType<SectionRendererProps>;

declare interface SectionRendererProps {
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

export declare function SegmentedControl({ options, value, onChange, size, className, }: SegmentedControlProps): JSX.Element;

export declare interface SegmentedControlProps {
    options: SegmentOption[];
    value: string;
    onChange: (value: string) => void;
    size?: 'sm' | 'md';
    className?: string;
}

export declare interface SegmentOption {
    label: string;
    value: string;
    icon?: ReactNode;
}

declare type SendMessage = (msg: Record<string, unknown>) => void;

/** Server welcome message (type === 'session') */
export declare interface SessionMessage extends GatewayMessage {
    type: 'session';
    clientId: string;
    sessionToken: string;
    restored: boolean;
}

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

export declare interface ShortcutsHelpProps {
    open: boolean;
    onClose: () => void;
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

export declare function SkeletonCard({ width, height }: SkeletonCardProps): JSX.Element;

export declare interface SkeletonCardProps {
    width?: number | string;
    height?: number | string;
}

declare interface SloPoint {
    at: string;
    value: number | null;
}

declare type SloWindow = '15m' | '1h' | '6h' | '24h';

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
    onMessage: OnMessageFn_7;
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
    onMessage: OnMessageFn_8;
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

export declare function Sparkline({ data, width, height, color }: SparklineProps): JSX.Element;

export declare interface SparklineProps {
    data: number[];
    width?: number;
    height?: number;
    color?: string;
}

export declare function Spinner({ size, color, className, style, 'aria-label': ariaLabel, 'data-testid': testId, }: SpinnerProps): JSX.Element;

export declare interface SpinnerProps {
    size?: SpinnerSize;
    /** Arc color. Defaults to var(--color-primary). */
    color?: string;
    className?: string;
    style?: CSSProperties;
    'aria-label'?: string;
    'data-testid'?: string;
}

export declare type SpinnerSize = 'sm' | 'md' | 'lg';

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
}): JSX_2.Element;

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

export declare function StatCard({ label, value, accent, danger, hint, delta, sparklineData, to, as: As, onClick, mono, className, style, 'data-testid': testId, }: StatCardProps): JSX.Element;

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

export declare function StatsCard({ metrics, style }: StatsCardProps): JSX.Element;

export declare interface StatsCardProps {
    metrics: StreamMetrics | null;
    style?: CSSProperties;
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

export declare function StatusStrip({ phase, bitrateBps, viewerCount, duration, style }: StatusStripProps): JSX.Element;

export declare interface StatusStripProps {
    phase: PlayerPhase | 'live' | 'reconnecting';
    bitrateBps?: number;
    viewerCount?: number;
    duration?: number;
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
    approvals?: ApprovalRecord[];
    /**
     * hub#2226: edit-and-continue patch history applied while the run was
     * paused at this step's breakpoint. Append-only at apply time;
     * `revertedAt` is set when a patch is undone via `revertContextPatch`.
     * Empty/undefined for steps that were never paused-and-patched.
     */
    patches?: PatchEntry[];
}

export declare type StepStatus = 'pending' | 'running' | 'completed' | 'failed' | 'skipped' | 'cancelled' | 'awaiting';

/**
 * Companion utility: returns true when the stream has at least one
 * paintable video track (live + enabled + not muted). Pair with
 * useTrackStateBump in the same component so the boolean re-derives on
 * every track transition.
 */
export declare function streamHasUsableVideo(stream: MediaStream | undefined | null): boolean;

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

export declare function SubNavLayout({ title, items, titleAction, railHeader, railWidth, storageKey, secondaryTitle, secondaryItems, secondaryStorageKey, secondaryRailWidth, renderNavItem, children, }: SubNavLayoutProps): JSX.Element;

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
     */
    renderNavItem?: (item: SubNavItem, children: ReactNode, baseStyle: CSSProperties) => ReactNode;
    /**
     * The main content area. When used with React Router, omit this and pass an
     * `<Outlet />` as children, or leave empty if the router renders children
     * directly. Defaults to rendering children.
     */
    children?: ReactNode;
}

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

declare type SyncOp = 'create' | 'update' | 'delete';

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

declare interface SyncStatus {
    /** Operation that triggered the most recent sync. */
    op: SyncOp;
    /** Whether the server round-trip succeeded. */
    ok: boolean;
    /** Increases on every recorded sync so UI keys can react. */
    key: number;
    /** Optional error message for failed syncs. */
    error?: string;
}

export declare interface TabItem {
    id: string;
    label: ReactNode;
    icon?: ReactNode;
    badge?: ReactNode;
    disabled?: boolean;
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

export declare function Tabs({ items, value, onValueChange, variant, size, className, style, 'aria-label': ariaLabel, idPrefix: idPrefixProp, }: TabsProps): JSX.Element;

export declare interface TabsProps {
    items: TabItem[];
    value: string;
    onValueChange: (id: string) => void;
    variant?: TabsVariant;
    size?: 'sm' | 'md';
    className?: string;
    style?: CSSProperties;
    'aria-label'?: string;
    /** Shared id used to wire <TabPanel> regions to their <tab> triggers. Auto-generated if omitted. */
    idPrefix?: string;
}

export declare type TabsVariant = 'underline' | 'pill' | 'segmented';

export declare function TagEditor({ value, onChange, placeholder, suggestions, lowercase, }: TagEditorProps): JSX.Element;

export declare interface TagEditorProps {
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

/** Alias kept for clarity in contexts where "terminal log" reads better. */
export declare const TerminalLog: typeof LogStream;

declare interface TextSelectionData {
    start: number;
    end: number;
    text: string;
}

declare type Theme = 'light' | 'dark';

declare interface ThemeContextValue {
    theme: Theme;
    toggleTheme: () => void;
}

/**
 * Provides a resolved theme via React context and injects CSS custom properties
 * on the document root so that `var(--ui-*)` references work globally.
 *
 * Works without wrapping — once mounted, any component using `cssVar()` in
 * inline styles will pick up the values. Wrapping in ThemeProvider enables
 * programmatic access via `useTheme()` and scoped overrides.
 */
export declare function ThemeProvider({ children, preset, theme }: ThemeProviderProps): JSX.Element;

export declare interface ThemeProviderProps {
    children?: ReactNode;
    /** Base preset to use. Defaults to 'light'. */
    preset?: 'light' | 'dark';
    /** Partial overrides merged on top of the preset. */
    theme?: Partial<ThemeTokens>;
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
 * Animated 3-dot typing/thinking indicator.
 *
 * Uses inline `<style>` for keyframes to avoid global CSS dependency.
 */
export declare function ThinkingDots({ size, color, className }: ThinkingDotsProps): JSX.Element;

export declare interface ThinkingDotsProps {
    /** sm: 4px dots, md: 6px dots (default md) */
    size?: 'sm' | 'md';
    /** dot color, default var(--color-text-tertiary) */
    color?: string;
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
export declare function ToolCallPill({ name, done, className }: ToolCallPillProps): JSX.Element;

export declare interface ToolCallPillProps {
    name: string;
    done: boolean;
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

export declare function TranscriptOverlay({ lines, maxLines, fadeAfterMs, className, }: TranscriptOverlayProps): JSX.Element | null;

export declare interface TranscriptOverlayProps {
    lines: CaptionLine[];
    /** How many recent lines to show simultaneously. Default 3. */
    maxLines?: number;
    /** Fade-out duration ms. Default 8000. */
    fadeAfterMs?: number;
    className?: string;
}

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

declare interface TypedDocument {
    documentId: string;
    typeId: string;
    values: Record<string, TypedDocumentValue>;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}

declare type TypedDocumentValue = string | string[] | number | number[] | boolean;

export declare function TypingIndicator({ names, compact, color, size, className, 'data-testid': testId, }: TypingIndicatorProps): JSX.Element | null;

export declare interface TypingIndicatorProps {
    /**
     * Names currently typing. Empty array → renders nothing (component returns null
     * so callers don't have to wrap it in a conditional).
     */
    names: string[];
    /** Render only the animated dots, with no banner text. Default: false. */
    compact?: boolean;
    /** Dot color override (passes through to ThinkingDots). */
    color?: string;
    /** Dot size (passes through to ThinkingDots). Default 'sm'. */
    size?: 'sm' | 'md';
    className?: string;
    'data-testid'?: string;
}

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
  */
 export declare function useApiHealth(pollMs?: number): ApiHealthSnapshot;

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

 export declare function useChat(options: UseChatOptions): UseChatReturn;

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

 /**
  * Invoke `onClickOutside` when a mousedown occurs outside the ref element.
  * Useful for closing popovers, dropdowns, and modals on outside click.
  *
  * @param ref React ref to the element that should not trigger the callback
  * @param onClickOutside Callback invoked on outside click
  * @param enabled Enable/disable the listener (default: true)
  *
  * @example
  * const menuRef = useRef<HTMLDivElement>(null);
  * useClickOutside(menuRef, () => setMenuOpen(false), menuOpen);
  */
 export declare function useClickOutside<T extends HTMLElement>(ref: RefObject<T>, onClickOutside: () => void, enabled?: boolean): void;

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
     loading: boolean;
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
     /** Cognito ID token. When present, saves dual-write to the server. */
     idToken?: string | null;
 }

 declare interface UseDocumentTypesReturn {
     types: DocumentType_2[];
     createType: (data: Omit<DocumentType_2, 'id' | 'createdAt' | 'updatedAt'>) => DocumentType_2;
     updateType: (id: string, patch: Partial<Omit<DocumentType_2, 'id' | 'createdAt'>>) => void;
     deleteType: (id: string) => void;
     getType: (id: string) => DocumentType_2 | undefined;
     /** Most recent server-sync outcome. null until the first sync attempt. */
     lastSync: SyncStatus | null;
 }

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
 }

 export declare function useGroups({ idToken }: UseGroupsOptions): UseGroupsReturn;

 declare interface UseGroupsOptions {
     idToken: string | null;
 }

 declare interface UseGroupsReturn {
     groups: GroupItem[];
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
 }

 declare interface UseIngestItemsReturn {
     items: IngestItem[];
     loading: boolean;
     error: string | null;
     refresh: () => Promise<void>;
     retryItem: (itemId: string) => Promise<boolean>;
     skipItem: (itemId: string) => Promise<boolean>;
 }

 export declare function useIngestProgress(): UseIngestProgressResult;

 declare interface UseIngestProgressResult {
     events: IngestProgressEvent[];
     activeSyncs: Map<string, ActiveSync>;
     clearEvents: () => void;
 }

 export declare function useIngestSources(): UseIngestSourcesReturn;

 declare interface UseIngestSourcesReturn {
     sources: IngestSource[];
     loading: boolean;
     error: string | null;
     refresh: () => Promise<void>;
     createSource: (data: Omit<IngestSource, 'sourceId' | 'createdAt' | 'updatedAt' | 'lastSyncAt' | 'lastSyncStats'>) => Promise<IngestSource | null>;
     deleteSource: (sourceId: string) => Promise<boolean>;
     triggerSync: (sourceId: string) => Promise<boolean>;
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

 export declare function useMappingReviewQueue(): UseMappingReviewQueueResult;

 declare interface UseMappingReviewQueueResult {
     items: IngestItem[];
     threshold: number;
     loading: boolean;
     error: string | null;
     refresh: () => Promise<void>;
     remap: (itemId: string, typeId: string) => Promise<void>;
     skip: (itemId: string) => Promise<void>;
 }

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

 export declare function usePipelineDefs(): UsePipelineDefsReturn;

 declare interface UsePipelineDefsReturn {
     pipelines: PipelineDefSummary[];
     loading: boolean;
     error: string | null;
     refresh: () => Promise<void>;
 }

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
     loading: boolean;
     error: string | null;
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
     users: PresenceUser[];
     setTyping: (isTyping: boolean) => void;
 }

 export declare function UserChip({ name, label, avatarSize, avatarColor, presence, onClick, className, style, title, 'data-testid': testId, }: UserChipProps): JSX.Element;

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
  * Register a command into the active CommandPaletteProvider for the lifetime
  * of the calling component. Registers on mount, unregisters on unmount.
  *
  * Re-registers whenever the `command` reference changes — wrap in `useMemo`
  * (or define the command outside the component) to avoid churn.
  */
 export declare function useRegisterCommand(command: Command): void;

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

 export declare function useRooms({ idToken, onMessage }: UseRoomsOptions): UseRoomsReturn;

 declare interface UseRoomsOptions {
     idToken: string | null;
     onMessage: OnMessageFn_5;
 }

 declare interface UseRoomsReturn {
     rooms: RoomItem[];
     activeRoom: RoomItem | null;
     setActiveRoom: (room: RoomItem | null) => void;
     createRoom: (name: string) => Promise<void>;
     createDM: (peerId: string) => Promise<void>;
     createGroupRoom: (groupId: string, name: string) => Promise<void>;
     joinRoom: (roomId: string) => Promise<void>;
     leaveRoom: (roomId: string) => Promise<void>;
     loadMembers: (roomId: string) => Promise<void>;
     members: RoomMemberItem[];
     loading: boolean;
     error: string | null;
     /** Retry the GET /api/rooms hydrate after a fetch failure. */
     retry: () => void;
 }

 export declare interface UserPickerProps {
     value: string[];
     onChange: (userIds: string[]) => void;
     placeholder?: string;
     maxSelect?: number;
 }

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

 export declare function useSourceSloMetrics(sourceId: string | undefined, window?: SloWindow): UseSourceSloMetricsResult;

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
  */
 export declare function useStableActiveSpeaker(activeSpeakerId: string | null | undefined, hysteresisMs: number): string | null;

 export declare function useSyncConflicts(): UseSyncConflictsReturn;

 declare interface UseSyncConflictsReturn {
     conflicts: SyncConflict[];
     loading: boolean;
     error: string | null;
     /** True when the data came from the local mock fallback. */
     usingMock: boolean;
     refresh: () => Promise<void>;
     resolveConflict: (id: string, resolution: ConflictResolution) => Promise<boolean>;
     discardConflict: (id: string) => Promise<boolean>;
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

 export declare function useTrackStateBump(stream: MediaStream | undefined | null, participantLabel: string): number;

 export declare function useTypedDocuments({ idToken, typeId }: UseTypedDocumentsOptions): UseTypedDocumentsReturn;

 declare interface UseTypedDocumentsOptions {
     idToken: string | null;
     typeId: string | null;
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

  declare interface VersionEntry {
      timestamp: number;
      age: number;
      name?: string;
      author?: string;
      type?: 'manual' | 'auto' | 'pre-restore';
  }

  /**
   * Static N-way grid: 1 / 2×2 / 3×3 / 4×4 column count based on participant
   * count. Tiles do NOT reflow on speaker change — speaking is indicated via
   * border highlight on the tile only (see ParticipantTile). For an
   * active-speaker-aware spotlight layout, use `HangoutLayout` instead.
   */
  export declare function VideoGrid({ participants, style }: VideoGridProps): JSX.Element;

  export declare interface VideoGridProps {
      participants: VideoParticipant[];
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

  export declare function ViewerCount({ count, style }: ViewerCountProps): JSX.Element;

  export declare interface ViewerCountProps {
      count: number;
      style?: CSSProperties;
  }

  export declare type ViewMode = 'editor' | 'ack' | 'reader';

  export declare interface WebSocketContextValue {
      connectionState: ConnectionState;
      sendMessage: (msg: Record<string, unknown>) => void;
      onMessage: OnMessageFn_6;
      ws: UseWebSocketReturn;
      clientId: string | null;
      sessionToken: string | null;
  }

  export declare function WebSocketProvider({ value, children, }: {
      value: WebSocketContextValue;
      children: ReactNode;
  }): JSX.Element;

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
