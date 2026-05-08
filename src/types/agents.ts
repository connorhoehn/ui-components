// src/types/agents.ts
//
// Type definitions for the Agents domain module — covers agent registry,
// AG-UI streaming protocol, OTEL traces, and A2A session management.

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
// AG-UI Protocol (16 event types, SSE transport via POST)
// ---------------------------------------------------------------------------

export type AgUiEventType =
  | 'RUN_STARTED'
  | 'RUN_FINISHED'
  | 'RUN_ERROR'
  | 'TEXT_MESSAGE_START'
  | 'TEXT_MESSAGE_CONTENT'
  | 'TEXT_MESSAGE_END'
  | 'TOOL_CALL_START'
  | 'TOOL_CALL_ARGS'
  | 'TOOL_CALL_END'
  | 'STATE_SNAPSHOT'
  | 'STATE_DELTA'
  | 'MESSAGES_SNAPSHOT'
  | 'RAW'
  | 'CUSTOM'
  | 'STEP_STARTED'
  | 'STEP_FINISHED';

export interface AgUiEvent {
  type: AgUiEventType;
  timestamp: string;
  runId?: string;
  messageId?: string;
  delta?: string;
  toolCallId?: string;
  toolName?: string;
  args?: string;
  result?: string;
  state?: Record<string, unknown>;
  error?: string;
  custom?: Record<string, unknown>;
}

export interface AgUiToolCall {
  id: string;
  name: string;
  args: string;
  result?: string;
  startedAt: string;
  endedAt?: string;
  status: 'running' | 'completed' | 'failed';
}

export interface AgUiMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  toolCalls: AgUiToolCall[];
  timestamp: string;
  isStreaming?: boolean;
}

export interface AgUiSession {
  threadId: string;
  sessionId: string;
  agentId: string;
  messages: AgUiMessage[];
  isStreaming: boolean;
  runId?: string;
  state?: Record<string, unknown>;
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
