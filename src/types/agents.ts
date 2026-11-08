// src/types/agents.ts
//
// Type definitions for the Agents domain module — covers agent registry,
// AG-UI streaming protocol, OTEL traces, and A2A session management.
//
// ============================================================================
// AG-UI v0.1.x STABLE CONTRACT — FROZEN 2026-06-06
// ============================================================================
// The AG-UI event taxonomy below (AgUiEvent, AgUiEventType, AgUiMessage,
// AgUiToolCall, AgUiSession, AgUiRole) is the canonical v0.1.x surface
// (spec: https://docs.ag-ui.com/concepts/events). It is considered STABLE.
//
// Consumers (websocket-gateway and others) depend on these shapes. Any
// breaking change (renaming a discriminant, removing a field, narrowing a
// union) requires:
//   1. A major version bump on @connorhoehn/ui-components
//   2. A create_handoff to each consumer agent that imports from /agents
//   3. A blocker raised for operator review BEFORE the breaking commit
//
// Additive changes (new optional fields, new event variants in the union)
// are allowed at minor versions and do not require consumer handoffs.
// ============================================================================

// ---------------------------------------------------------------------------
// Agent Registry
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// AG-UI Protocol — canonical v0.1.x event taxonomy
// Spec: https://docs.ag-ui.com/concepts/events
// ---------------------------------------------------------------------------

export type AgUiRole = 'developer' | 'system' | 'assistant' | 'user' | 'tool';

// All events share these optional base fields.
interface AgUiEventBase {
  timestamp?: number;
  rawEvent?: unknown;
}

// ─── Lifecycle ───────────────────────────────────────────────────────────────

export interface AgUiRunStartedEvent extends AgUiEventBase {
  type: 'RUN_STARTED';
  threadId: string;
  runId: string;
  parentRunId?: string;
  input?: unknown;
}
export interface AgUiRunFinishedEvent extends AgUiEventBase {
  type: 'RUN_FINISHED';
  outcome?: { type: 'success' } | { type: 'interrupt'; interrupts: unknown[] };
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

// ─── Text Messages ───────────────────────────────────────────────────────────

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

// ─── Tool Calls ──────────────────────────────────────────────────────────────

export interface AgUiToolCallStartEvent extends AgUiEventBase {
  type: 'TOOL_CALL_START';
  toolCallId: string;
  toolCallName: string;        // canonical field name (not `toolName`)
  parentMessageId?: string;
}
export interface AgUiToolCallArgsEvent extends AgUiEventBase {
  type: 'TOOL_CALL_ARGS';
  toolCallId: string;
  delta: string;               // canonical field name (not `args`)
}
export interface AgUiToolCallEndEvent extends AgUiEventBase {
  type: 'TOOL_CALL_END';
  toolCallId: string;
  // No `result` here — result arrives as a separate TOOL_CALL_RESULT event.
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

// ─── State Management ────────────────────────────────────────────────────────

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
  delta: JsonPatchOp[];        // RFC 6902 JSON Patch
}
export interface AgUiMessagesSnapshotEvent extends AgUiEventBase {
  type: 'MESSAGES_SNAPSHOT';
  messages: unknown[];         // bulk-replace messages
}

// ─── Activity ────────────────────────────────────────────────────────────────

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

// ─── Reasoning (chain-of-thought) ────────────────────────────────────────────

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

// ─── Special ─────────────────────────────────────────────────────────────────

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

// ─── Draft ───────────────────────────────────────────────────────────────────

export interface AgUiMetaEvent extends AgUiEventBase {
  type: 'META_EVENT';
  metaType: string;
  payload: unknown;
}

// ─── Discriminated union ──────────────────────────────────────────────────────

export type AgUiEvent =
  | AgUiRunStartedEvent
  | AgUiRunFinishedEvent
  | AgUiRunErrorEvent
  | AgUiStepStartedEvent
  | AgUiStepFinishedEvent
  | AgUiTextMessageStartEvent
  | AgUiTextMessageContentEvent
  | AgUiTextMessageEndEvent
  | AgUiTextMessageChunkEvent
  | AgUiToolCallStartEvent
  | AgUiToolCallArgsEvent
  | AgUiToolCallEndEvent
  | AgUiToolCallResultEvent
  | AgUiToolCallChunkEvent
  | AgUiStateSnapshotEvent
  | AgUiStateDeltaEvent
  | AgUiMessagesSnapshotEvent
  | AgUiActivitySnapshotEvent
  | AgUiActivityDeltaEvent
  | AgUiReasoningStartEvent
  | AgUiReasoningMessageStartEvent
  | AgUiReasoningMessageContentEvent
  | AgUiReasoningMessageEndEvent
  | AgUiReasoningMessageChunkEvent
  | AgUiReasoningEndEvent
  | AgUiReasoningEncryptedValueEvent
  | AgUiRawEvent
  | AgUiCustomEvent
  | AgUiMetaEvent;

export type AgUiEventType = AgUiEvent['type'];

// ─── Application-level AG-UI state shapes ────────────────────────────────────

export interface AgUiToolCall {
  id: string;            // = toolCallId from TOOL_CALL_START
  name: string;          // = toolCallName from TOOL_CALL_START
  args: string;          // accumulated from TOOL_CALL_ARGS deltas
  result?: unknown;      // set when TOOL_CALL_RESULT arrives
  status: 'streaming' | 'completed' | 'error';
  startedAt: number;     // Date.now() at TOOL_CALL_START
  endedAt?: number;      // Date.now() at TOOL_CALL_END
  parentMessageId?: string;
}

export interface AgUiMessage {
  id: string;
  role: AgUiRole;
  content: string;
  isStreaming: boolean;
  toolCalls: AgUiToolCall[];
  reasoning?: string;    // accumulated from REASONING_MESSAGE_CONTENT
}

export interface AgUiSession {
  threadId: string;
  runId: string | null;
  messages: AgUiMessage[];
  state: unknown;        // driven by STATE_SNAPSHOT / STATE_DELTA
}

// ---------------------------------------------------------------------------
// OpenTelemetry Traces
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// A2A Protocol
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Agent Metrics
// ---------------------------------------------------------------------------

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
