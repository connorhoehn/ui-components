export type AgentStatus = 'healthy' | 'degraded' | 'offline' | 'deploying';
export type AgentProtocol = 'a2a' | 'direct';
export interface AgentDefinition {
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
export type AgUiRole = 'developer' | 'system' | 'assistant' | 'user' | 'tool';
interface AgUiEventBase {
    timestamp?: number;
    rawEvent?: unknown;
}
export interface AgUiRunStartedEvent extends AgUiEventBase {
    type: 'RUN_STARTED';
    threadId: string;
    runId: string;
    parentRunId?: string;
    input?: unknown;
}
export interface AgUiRunFinishedEvent extends AgUiEventBase {
    type: 'RUN_FINISHED';
    outcome?: {
        type: 'success';
    } | {
        type: 'interrupt';
        interrupts: unknown[];
    };
    result?: unknown;
}
export interface AgUiRunErrorEvent extends AgUiEventBase {
    type: 'RUN_ERROR';
    message: string;
    code?: string;
}
export interface AgUiStepStartedEvent extends AgUiEventBase {
    type: 'STEP_STARTED';
    stepName: string;
}
export interface AgUiStepFinishedEvent extends AgUiEventBase {
    type: 'STEP_FINISHED';
    stepName: string;
}
export interface AgUiTextMessageStartEvent extends AgUiEventBase {
    type: 'TEXT_MESSAGE_START';
    messageId: string;
    role: AgUiRole;
}
export interface AgUiTextMessageContentEvent extends AgUiEventBase {
    type: 'TEXT_MESSAGE_CONTENT';
    messageId: string;
    delta: string;
}
export interface AgUiTextMessageEndEvent extends AgUiEventBase {
    type: 'TEXT_MESSAGE_END';
    messageId: string;
}
export interface AgUiTextMessageChunkEvent extends AgUiEventBase {
    type: 'TEXT_MESSAGE_CHUNK';
    messageId?: string;
    role?: AgUiRole;
    delta?: string;
}
export interface AgUiToolCallStartEvent extends AgUiEventBase {
    type: 'TOOL_CALL_START';
    toolCallId: string;
    toolCallName: string;
    parentMessageId?: string;
}
export interface AgUiToolCallArgsEvent extends AgUiEventBase {
    type: 'TOOL_CALL_ARGS';
    toolCallId: string;
    delta: string;
}
export interface AgUiToolCallEndEvent extends AgUiEventBase {
    type: 'TOOL_CALL_END';
    toolCallId: string;
}
export interface AgUiToolCallResultEvent extends AgUiEventBase {
    type: 'TOOL_CALL_RESULT';
    messageId: string;
    toolCallId: string;
    content: unknown;
    role?: string;
}
export interface AgUiToolCallChunkEvent extends AgUiEventBase {
    type: 'TOOL_CALL_CHUNK';
    toolCallId?: string;
    toolCallName?: string;
    parentMessageId?: string;
    delta?: string;
}
export interface JsonPatchOp {
    op: string;
    path: string;
    value?: unknown;
    from?: string;
}
export interface AgUiStateSnapshotEvent extends AgUiEventBase {
    type: 'STATE_SNAPSHOT';
    snapshot: unknown;
}
export interface AgUiStateDeltaEvent extends AgUiEventBase {
    type: 'STATE_DELTA';
    delta: JsonPatchOp[];
}
export interface AgUiMessagesSnapshotEvent extends AgUiEventBase {
    type: 'MESSAGES_SNAPSHOT';
    messages: unknown[];
}
export interface AgUiActivitySnapshotEvent extends AgUiEventBase {
    type: 'ACTIVITY_SNAPSHOT';
    messageId: string;
    activityType: string;
    content: unknown;
    replace?: boolean;
}
export interface AgUiActivityDeltaEvent extends AgUiEventBase {
    type: 'ACTIVITY_DELTA';
    messageId: string;
    activityType: string;
    patch: JsonPatchOp[];
}
export interface AgUiReasoningStartEvent extends AgUiEventBase {
    type: 'REASONING_START';
    messageId: string;
}
export interface AgUiReasoningMessageStartEvent extends AgUiEventBase {
    type: 'REASONING_MESSAGE_START';
    messageId: string;
    role: 'reasoning';
}
export interface AgUiReasoningMessageContentEvent extends AgUiEventBase {
    type: 'REASONING_MESSAGE_CONTENT';
    messageId: string;
    delta: string;
}
export interface AgUiReasoningMessageEndEvent extends AgUiEventBase {
    type: 'REASONING_MESSAGE_END';
    messageId: string;
}
export interface AgUiReasoningMessageChunkEvent extends AgUiEventBase {
    type: 'REASONING_MESSAGE_CHUNK';
    messageId: string;
    delta?: string;
}
export interface AgUiReasoningEndEvent extends AgUiEventBase {
    type: 'REASONING_END';
    messageId: string;
}
export interface AgUiReasoningEncryptedValueEvent extends AgUiEventBase {
    type: 'REASONING_ENCRYPTED_VALUE';
    subtype: 'message' | 'tool-call';
    entityId: string;
    encryptedValue: string;
}
export interface AgUiRawEvent extends AgUiEventBase {
    type: 'RAW';
    event: unknown;
    source?: string;
}
export interface AgUiCustomEvent extends AgUiEventBase {
    type: 'CUSTOM';
    name: string;
    value: unknown;
}
export interface AgUiMetaEvent extends AgUiEventBase {
    type: 'META_EVENT';
    metaType: string;
    payload: unknown;
}
export type AgUiEvent = AgUiRunStartedEvent | AgUiRunFinishedEvent | AgUiRunErrorEvent | AgUiStepStartedEvent | AgUiStepFinishedEvent | AgUiTextMessageStartEvent | AgUiTextMessageContentEvent | AgUiTextMessageEndEvent | AgUiTextMessageChunkEvent | AgUiToolCallStartEvent | AgUiToolCallArgsEvent | AgUiToolCallEndEvent | AgUiToolCallResultEvent | AgUiToolCallChunkEvent | AgUiStateSnapshotEvent | AgUiStateDeltaEvent | AgUiMessagesSnapshotEvent | AgUiActivitySnapshotEvent | AgUiActivityDeltaEvent | AgUiReasoningStartEvent | AgUiReasoningMessageStartEvent | AgUiReasoningMessageContentEvent | AgUiReasoningMessageEndEvent | AgUiReasoningMessageChunkEvent | AgUiReasoningEndEvent | AgUiReasoningEncryptedValueEvent | AgUiRawEvent | AgUiCustomEvent | AgUiMetaEvent;
export type AgUiEventType = AgUiEvent['type'];
export interface AgUiToolCall {
    id: string;
    name: string;
    args: string;
    result?: unknown;
    status: 'streaming' | 'completed' | 'error';
    startedAt: number;
    endedAt?: number;
    parentMessageId?: string;
}
export interface AgUiMessage {
    id: string;
    role: AgUiRole;
    content: string;
    isStreaming: boolean;
    toolCalls: AgUiToolCall[];
    reasoning?: string;
}
export interface AgUiSession {
    threadId: string;
    runId: string | null;
    messages: AgUiMessage[];
    state: unknown;
}
export type SpanStatus = 'ok' | 'error' | 'unset';
export type SpanKind = 'agent' | 'tool' | 'llm' | 'retrieval' | 'guardrail' | 'internal';
export interface TraceSpan {
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
export interface TraceTimeline {
    traceId: string;
    rootSpanId: string;
    spans: TraceSpan[];
    totalDurationMs: number;
    agentId: string;
    startedAt: string;
}
export interface A2AMessage {
    id: string;
    from: string;
    to: string;
    content: string;
    protocol: 'a2a';
    timestamp: string;
    metadata?: Record<string, unknown>;
}
export interface A2ASession {
    sessionId: string;
    participants: AgentDefinition[];
    messages: A2AMessage[];
    startedAt: string;
    status: 'active' | 'completed' | 'failed';
}
export interface AgentMetrics {
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
export {};
//# sourceMappingURL=agents.d.ts.map