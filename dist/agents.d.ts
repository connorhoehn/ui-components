import { JSX } from 'react';
import { ReactNode } from 'react';

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

export declare function AgentCard({ agent, metrics, selected, onClick }: AgentCardProps): JSX.Element;

declare interface AgentCardProps {
    agent: AgentDefinition;
    metrics?: AgentMetrics;
    selected?: boolean;
    onClick?: () => void;
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

export declare function AgentDetailPage({ agentId, trace, onBack, className }: AgentDetailPageProps): JSX.Element;

declare interface AgentDetailPageProps {
    agentId: string;
    trace?: TraceTimelineType;
    onBack?: () => void;
    className?: string;
}

export declare function AgentDirectory({ agents, metricsById, filters, selectedId, onSelect, emptyMessage, className, }: AgentDirectoryProps): JSX.Element;

export declare interface AgentDirectoryProps {
    agents: AgentDefinition[];
    metricsById?: Record<string, AgentMetrics>;
    /** Status values shown in the filter chip row. Defaults to all four. */
    filters?: AgentStatus[];
    /** Selected agent id (controlled). */
    selectedId?: string | null;
    onSelect?: (agent: AgentDefinition) => void;
    /** Override the empty-state copy. */
    emptyMessage?: string;
    className?: string;
}

export declare function AgentFlowCanvas({ agents, edges: edgeDefs, onAgentClick, className, }: AgentFlowCanvasProps): JSX.Element;

declare interface AgentFlowCanvasProps {
    agents: AgentDefinition[];
    edges?: {
        from: string;
        to: string;
    }[];
    onAgentClick?: (agentId: string) => void;
    className?: string;
}

export declare function AgentFlowPage({ edges, onAgentClick, className }: AgentFlowPageProps): JSX.Element;

declare interface AgentFlowPageProps {
    edges?: {
        from: string;
        to: string;
    }[];
    onAgentClick?: (agentId: string) => void;
    className?: string;
}

export declare function AgentInvokePage({ defaultAgentId, baseUrl, className }: AgentInvokePageProps): JSX.Element;

declare interface AgentInvokePageProps {
    defaultAgentId?: string;
    baseUrl?: string;
    className?: string;
}

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
 * Where `metrics` came from — same discriminator `useAgentRegistry` exposes
 * as `AgentRegistrySource`.
 *
 * This hook seeds state with `fixtureMetrics` and keeps them when no
 * `baseUrl` is configured or when the first fetch fails. Without this tag
 * `AgentsDashboardPage` renders "Invocations (24h): 22,290" and an average
 * latency in the same type as it would for a live registry — an operator
 * looking at a dashboard whose backend is down cannot tell the difference
 * between a healthy fleet and invented numbers.
 */
export declare type AgentMetricsSource = 'fixture' | 'remote';

export declare type AgentProtocol = 'a2a' | 'direct';

/**
 * Where `agents` came from. Mirrors the `source` discriminator that
 * `usePipelineMetrics` already exposes in `/observability`.
 *
 * This hook seeds state with `fixtureAgents` and keeps them when no
 * `baseUrl` is configured or when a fetch fails — so without this tag a
 * consumer cannot tell a real, healthy registry from synthetic sample data.
 * A failed fetch previously surfaced `error` while still rendering
 * plausible-looking fake agents.
 */
export declare type AgentRegistrySource = 'fixture' | 'remote';

declare interface AgentsContextValue {
    agents: AgentDefinition[];
    metrics: AgentMetrics[];
    sessions: AgUiSession[];
    a2aSessions: A2ASession[];
    selectedAgentId: string | null;
    selectAgent: (id: string | null) => void;
    refreshAgents: () => void;
    getAgent: (id: string) => AgentDefinition | undefined;
    getMetrics: (agentId: string) => AgentMetrics | undefined;
    /** Provenance of `agents`. `'fixture'` means synthetic sample data. */
    agentsSource: AgentsSource;
    /** Provenance of `metrics`. `'fixture'` means synthetic sample data. */
    metricsSource: AgentsSource;
    /** True while a `baseUrl` fetch is in flight. */
    isLoading: boolean;
    /** Last fetch failure. Non-null with a `'fixture'` source means the live data is unavailable. */
    error: string | null;
}

export declare function AgentsDashboardPage({ onAgentClick, className }: AgentsDashboardPageProps): JSX.Element;

declare interface AgentsDashboardPageProps {
    onAgentClick?: (agentId: string) => void;
    className?: string;
}

export declare function AgentsLayout({ children, agents, metrics, baseUrl }: AgentsLayoutProps): JSX.Element;

declare interface AgentsLayoutProps {
    children: ReactNode;
    agents?: AgentDefinition[];
    metrics?: AgentMetrics[];
    baseUrl?: string;
}

export declare function AgentsProvider({ children, agents: initialAgents, metrics: initialMetrics, baseUrl, }: AgentsProviderProps): JSX.Element;

declare interface AgentsProviderProps {
    children: ReactNode;
    agents?: AgentDefinition[];
    metrics?: AgentMetrics[];
    /**
     * Base URL of the agent registry. When set, the provider fetches
     * `GET {baseUrl}/agents` and `GET {baseUrl}/agents/metrics` on mount —
     * matching the endpoints `useAgentRegistry` / `useAgentMetrics` already
     * call — and flips the matching `*Source` to `'remote'`.
     *
     * Ignored for whichever of `agents` / `metrics` was passed as a prop:
     * an explicit host-supplied array always wins over a fetch.
     */
    baseUrl?: string;
}

/**
 * Where the provider's `agents` / `metrics` actually came from.
 *
 * Same discriminator `useAgentRegistry` exposes as `AgentRegistrySource` and
 * `useAgentMetrics` as `AgentMetricsSource`, with one extra member those hooks
 * don't need: the provider also accepts `agents` / `metrics` PROPS, which are
 * real host data and must not be labelled `'fixture'`.
 *
 * - `'provided'` — the host passed the array in as a prop.
 * - `'remote'`   — fetched from `baseUrl`.
 * - `'fixture'`  — synthetic sample data from `agentsFixture`. Shown when no
 *                  `baseUrl` is configured, before the first fetch settles,
 *                  and when a fetch fails. **Surface this in the UI.** Before
 *                  v2.90 the provider accepted `baseUrl` and discarded it, so
 *                  `AgentsDashboardPage` rendered invented invocation counts
 *                  and health badges that were indistinguishable from a live
 *                  fleet.
 */
export declare type AgentsSource = 'fixture' | 'remote' | 'provided';

export declare type AgentStatus = 'healthy' | 'degraded' | 'offline' | 'deploying';

declare interface AgUiActivityDeltaEvent extends AgUiEventBase {
    type: 'ACTIVITY_DELTA';
    messageId: string;
    activityType: string;
    patch: JsonPatchOp[];
}

declare interface AgUiActivitySnapshotEvent extends AgUiEventBase {
    type: 'ACTIVITY_SNAPSHOT';
    messageId: string;
    activityType: string;
    content: unknown;
    replace?: boolean;
}

declare interface AgUiCustomEvent extends AgUiEventBase {
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

declare interface AgUiMessagesSnapshotEvent extends AgUiEventBase {
    type: 'MESSAGES_SNAPSHOT';
    messages: unknown[];
}

declare interface AgUiMetaEvent extends AgUiEventBase {
    type: 'META_EVENT';
    metaType: string;
    payload: unknown;
}

declare interface AgUiRawEvent extends AgUiEventBase {
    type: 'RAW';
    event: unknown;
    source?: string;
}

export declare function AgUiReasoningBlock({ reasoning, isStreaming, defaultOpen, className, }: AgUiReasoningBlockProps): JSX.Element | null;

export declare interface AgUiReasoningBlockProps {
    /** Reasoning text accumulated from REASONING_MESSAGE_CONTENT events. */
    reasoning: string;
    /** Whether the parent message is still streaming. Drives the "thinking..." vs "Reasoning" label. */
    isStreaming?: boolean;
    /** Default open state. Defaults to false (collapsed). */
    defaultOpen?: boolean;
    /** Optional className for outer wrapper. */
    className?: string;
}

declare interface AgUiReasoningEncryptedValueEvent extends AgUiEventBase {
    type: 'REASONING_ENCRYPTED_VALUE';
    subtype: 'message' | 'tool-call';
    entityId: string;
    encryptedValue: string;
}

declare interface AgUiReasoningEndEvent extends AgUiEventBase {
    type: 'REASONING_END';
    messageId: string;
}

declare interface AgUiReasoningMessageChunkEvent extends AgUiEventBase {
    type: 'REASONING_MESSAGE_CHUNK';
    messageId: string;
    delta?: string;
}

declare interface AgUiReasoningMessageContentEvent extends AgUiEventBase {
    type: 'REASONING_MESSAGE_CONTENT';
    messageId: string;
    delta: string;
}

declare interface AgUiReasoningMessageEndEvent extends AgUiEventBase {
    type: 'REASONING_MESSAGE_END';
    messageId: string;
}

declare interface AgUiReasoningMessageStartEvent extends AgUiEventBase {
    type: 'REASONING_MESSAGE_START';
    messageId: string;
    role: 'reasoning';
}

declare interface AgUiReasoningStartEvent extends AgUiEventBase {
    type: 'REASONING_START';
    messageId: string;
}

declare type AgUiRole = 'developer' | 'system' | 'assistant' | 'user' | 'tool';

declare interface AgUiRunErrorEvent extends AgUiEventBase {
    type: 'RUN_ERROR';
    message: string;
    code?: string;
}

declare interface AgUiRunFinishedEvent extends AgUiEventBase {
    type: 'RUN_FINISHED';
    outcome?: {
        type: 'success';
    } | {
        type: 'interrupt';
        interrupts: unknown[];
    };
    result?: unknown;
}

declare interface AgUiRunStartedEvent extends AgUiEventBase {
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

declare interface AgUiStateDeltaEvent extends AgUiEventBase {
    type: 'STATE_DELTA';
    delta: JsonPatchOp[];
}

declare interface AgUiStateSnapshotEvent extends AgUiEventBase {
    type: 'STATE_SNAPSHOT';
    snapshot: unknown;
}

declare interface AgUiStepFinishedEvent extends AgUiEventBase {
    type: 'STEP_FINISHED';
    stepName: string;
}

declare interface AgUiStepStartedEvent extends AgUiEventBase {
    type: 'STEP_STARTED';
    stepName: string;
}

declare interface AgUiTextMessageChunkEvent extends AgUiEventBase {
    type: 'TEXT_MESSAGE_CHUNK';
    messageId?: string;
    role?: AgUiRole;
    delta?: string;
}

declare interface AgUiTextMessageContentEvent extends AgUiEventBase {
    type: 'TEXT_MESSAGE_CONTENT';
    messageId: string;
    delta: string;
}

declare interface AgUiTextMessageEndEvent extends AgUiEventBase {
    type: 'TEXT_MESSAGE_END';
    messageId: string;
}

declare interface AgUiTextMessageStartEvent extends AgUiEventBase {
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

declare interface AgUiToolCallArgsEvent extends AgUiEventBase {
    type: 'TOOL_CALL_ARGS';
    toolCallId: string;
    delta: string;
}

declare interface AgUiToolCallChunkEvent extends AgUiEventBase {
    type: 'TOOL_CALL_CHUNK';
    toolCallId?: string;
    toolCallName?: string;
    parentMessageId?: string;
    delta?: string;
}

declare interface AgUiToolCallEndEvent extends AgUiEventBase {
    type: 'TOOL_CALL_END';
    toolCallId: string;
}

declare interface AgUiToolCallResultEvent extends AgUiEventBase {
    type: 'TOOL_CALL_RESULT';
    messageId: string;
    toolCallId: string;
    content: unknown;
    role?: string;
}

declare interface AgUiToolCallStartEvent extends AgUiEventBase {
    type: 'TOOL_CALL_START';
    toolCallId: string;
    toolCallName: string;
    parentMessageId?: string;
}

export declare function ConversationHistory({ sessions, activeThreadId, onResume, onDelete, emptyMessage, className, }: ConversationHistoryProps): JSX.Element;

export declare interface ConversationHistoryProps {
    sessions: AgUiSession[];
    /** Active thread (highlighted). */
    activeThreadId?: string | null;
    onResume?: (session: AgUiSession) => void;
    onDelete?: (session: AgUiSession) => void;
    emptyMessage?: string;
    className?: string;
}

export declare const fixtureAgents: AgentDefinition[];

export declare const fixtureMetrics: AgentMetrics[];

export declare const fixtureTrace: TraceTimelineType;

export declare function GuardrailBadge({ guardrails, className, compact }: GuardrailBadgeProps): JSX.Element;

declare interface GuardrailBadgeProps {
    guardrails: string[];
    className?: string;
    compact?: boolean;
}

declare interface JsonPatchOp {
    op: string;
    path: string;
    value?: unknown;
    from?: string;
}

export declare interface MemoryEntry {
    id: string;
    scope: 'session' | 'long-term';
    namespace?: string;
    key: string;
    value: string;
    createdAt: string;
    updatedAt?: string;
    ttl?: number;
}

export declare function MemoryInspector({ entries, className, onDelete }: MemoryInspectorProps): JSX.Element;

declare interface MemoryInspectorProps {
    entries: MemoryEntry[];
    className?: string;
    onDelete?: (id: string) => void;
}

export declare interface PolicyDecision {
    id: string;
    action: string;
    resource: string;
    principal: string;
    decision: 'allow' | 'deny';
    policyId: string;
    timestamp: string;
    reason?: string;
}

export declare function PolicyDecisionLog({ decisions, className, maxItems }: PolicyDecisionLogProps): JSX.Element;

declare interface PolicyDecisionLogProps {
    decisions: PolicyDecision[];
    className?: string;
    maxItems?: number;
}

export declare type SpanKind = 'agent' | 'tool' | 'llm' | 'retrieval' | 'guardrail' | 'internal';

export declare type SpanStatus = 'ok' | 'error' | 'unset';

export declare function StreamingChatPanel({ messages, isStreaming, streamingText, activeToolCalls, error, onSend, onCancel, placeholder, className, }: StreamingChatPanelProps): JSX.Element;

declare interface StreamingChatPanelProps {
    messages: AgUiMessage[];
    isStreaming: boolean;
    streamingText?: string;
    activeToolCalls?: AgUiToolCall[];
    error: string | null;
    onSend: (content: string) => void;
    onCancel?: () => void;
    placeholder?: string;
    className?: string;
}

export declare function ToolCallRenderer({ toolCall, className }: ToolCallRendererProps): JSX.Element;

declare interface ToolCallRendererProps {
    toolCall: AgUiToolCall;
    className?: string;
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

export declare function TraceTimeline({ trace, className, title, legendKinds }: TraceTimelineProps): JSX.Element;

export declare interface TraceTimelineProps {
    trace: TraceTimelineType;
    className?: string;
    /**
     * Header label. Defaults to 'Trace'.
     *
     * Exists because this component is no longer only a generic OTEL viewer:
     * a caller rendering one specific thing (an agent step's tool calls, say)
     * should be able to name it, rather than leaving a bare 'Trace' above a
     * waterfall the reader has to work out for themselves.
     */
    title?: string;
    /**
     * Span kinds to show in the legend. Defaults to all six.
     *
     * A caller whose traces can only ever contain two kinds should not
     * advertise six colored swatches — four of which can never appear —
     * because a legend entry with no possible referent reads as missing data.
     */
    legendKinds?: SpanKind[];
}

export declare interface TraceTimelineType {
    traceId: string;
    rootSpanId: string;
    spans: TraceSpan[];
    totalDurationMs: number;
    agentId: string;
    startedAt: string;
}

export declare function useA2ASession({ baseUrl: _baseUrl, participants: initialParticipants, }?: UseA2ASessionOptions): UseA2ASessionReturn;

declare interface UseA2ASessionOptions {
    baseUrl?: string;
    participants?: AgentDefinition[];
}

declare interface UseA2ASessionReturn {
    session: A2ASession | null;
    messages: A2AMessage[];
    isActive: boolean;
    startSession: (participants: AgentDefinition[]) => void;
    sendMessage: (from: string, to: string, content: string) => void;
    endSession: () => void;
}

export declare function useAgentMetrics({ baseUrl, agentId, pollIntervalMs, enabled, }?: UseAgentMetricsOptions): UseAgentMetricsReturn;

declare interface UseAgentMetricsOptions {
    baseUrl?: string;
    agentId?: string;
    pollIntervalMs?: number;
    enabled?: boolean;
}

declare interface UseAgentMetricsReturn {
    metrics: AgentMetrics[];
    /** `'fixture'` means `metrics` is synthetic sample data — surface that in the UI. */
    source: AgentMetricsSource;
    isLoading: boolean;
    error: string | null;
    refresh: () => void;
    getMetricsForAgent: (id: string) => AgentMetrics | undefined;
    totalInvocations24h: number;
    totalErrors24h: number;
    avgLatencyMs: number;
}

export declare function useAgentRegistry({ baseUrl, pollIntervalMs, enabled, }?: UseAgentRegistryOptions): UseAgentRegistryReturn;

declare interface UseAgentRegistryOptions {
    baseUrl?: string;
    pollIntervalMs?: number;
    enabled?: boolean;
}

declare interface UseAgentRegistryReturn {
    agents: AgentDefinition[];
    /** `'fixture'` means `agents` is synthetic sample data — surface that in the UI. */
    source: AgentRegistrySource;
    isLoading: boolean;
    error: string | null;
    refresh: () => void;
    getAgent: (id: string) => AgentDefinition | undefined;
    healthyCount: number;
    degradedCount: number;
    offlineCount: number;
}

export declare function useAgentsContext(): AgentsContextValue;

export declare function useAgUiStream({ url, threadId: initialThreadId, headers, extraBody: hookExtraBody, onEvent, }: UseAgUiStreamOptions): UseAgUiStreamReturn;

declare interface UseAgUiStreamOptions {
    url: string;
    threadId?: string;
    headers?: Record<string, string>;
    /** Extra fields merged into the POST body alongside `message` and `threadId`. */
    extraBody?: Record<string, unknown>;
    onEvent?: (event: AgUiEvent) => void;
}

declare interface UseAgUiStreamReturn {
    messages: AgUiMessage[];
    streamingText: string;
    activeToolCalls: AgUiToolCall[];
    state: unknown;
    threadId: string | null;
    runId: string | null;
    isStreaming: boolean;
    error: string | null;
    sendMessage: (content: string, opts?: {
        extraBody?: Record<string, unknown>;
    }) => void;
    cancelStream: () => void;
    reset: () => void;
    loadHistory: (threadId: string, messages: AgUiMessage[]) => void;
}

export { }


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
        actionItemsMacro: {
            /** Inserts an action-items block at the selection. */
            insertActionItems: (texts?: readonly string[]) => ReturnType;
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
        decisionMacro: {
            /** Inserts a decision record at the selection. */
            insertDecision: (draft: DecisionDraft) => ReturnType;
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
