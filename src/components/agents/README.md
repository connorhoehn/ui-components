# Agents — `@connorhoehnslalom/ui-components/agents`

The agents module provides components, hooks, and types for building AG-UI v0.1.x-compatible agent UIs. It handles streaming responses from Amazon Bedrock AgentCore runtimes (or any AG-UI-compliant backend) and renders them in React: streaming text, chain-of-thought reasoning blocks, tool calls, and session state via JSON Patch. Event types follow the open AG-UI protocol; see the full spec at https://docs.ag-ui.com/concepts/events.

---

## Quick start

```tsx
import {
  AgentsProvider,
  StreamingChatPanel,
  useAgUiStream,
} from '@connorhoehnslalom/ui-components/agents';

function Chat() {
  const { messages, isStreaming, streamingText, activeToolCalls, error, sendMessage, cancelStream } =
    useAgUiStream({ url: '/api/agents/orgiq-supervisor/invoke' });

  return (
    <AgentsProvider>
      <StreamingChatPanel
        messages={messages}
        isStreaming={isStreaming}
        streamingText={streamingText}
        activeToolCalls={activeToolCalls}
        error={error}
        onSend={sendMessage}
        onCancel={cancelStream}
      />
    </AgentsProvider>
  );
}
```

The hook connects via `POST` with `Accept: text/event-stream` and streams SSE-encoded AG-UI events. All state accumulation, JSON Patch application, and tool-call lifecycle tracking happen inside `useAgUiStream`.

---

## Exports

### Pages

| Export | Description |
|--------|-------------|
| `AgentsDashboardPage` | Grid of registered agents with live status badges |
| `AgentDetailPage` | Single-agent view: trace timeline, guardrails, memory, policy decisions |
| `AgentFlowPage` | A2A connection canvas rendered with `@xyflow/react` |
| `AgentInvokePage` | Full-featured chat page wiring together `useAgUiStream` + `StreamingChatPanel` |

### Components

| Export | Description |
|--------|-------------|
| `AgentsLayout` | Shell layout (sidebar + main area) for agent pages |
| `StreamingChatPanel` | Full chat UI: message list, streaming text, tool calls, reasoning, input bar |
| `ToolCallRenderer` | Collapsible tool-call pill showing args, result, and duration |
| `AgUiReasoningBlock` | Collapsible chain-of-thought block with token count chip |
| `AgentCard` | Status card for a single `AgentDefinition` |
| `AgentFlowCanvas` | `@xyflow/react` canvas for A2A agent topology |
| `TraceTimeline` | OTEL-style span waterfall for a single invocation |
| `GuardrailBadge` | Inline badge showing guardrail name and verdict |
| `PolicyDecisionLog` | Scrollable log of Cedar policy decisions |
| `MemoryInspector` | Key-value list of `MemoryEntry` items from AgentCore Memory |

### Hooks

| Export | Description |
|--------|-------------|
| `useAgUiStream` | Core hook — POST + SSE stream consumer, full AG-UI event dispatch |
| `useAgentRegistry` | Polls/subscribes to agent registry; returns `AgentDefinition[]` |
| `useAgentMetrics` | Returns `AgentMetrics` (latency, invocation counts) for an agent |
| `useA2ASession` | Manages an A2A multi-agent session object |

### Context

| Export | Description |
|--------|-------------|
| `AgentsProvider` | React context provider for agent list, fixtures, and shared config |
| `useAgentsContext` | Consumer hook — returns `{ agents, ... }` from `AgentsProvider` |

### Types

```ts
// Agent registry
AgentDefinition, AgentStatus, AgentProtocol

// AG-UI protocol
AgUiEvent, AgUiEventType, AgUiMessage, AgUiSession, AgUiToolCall, AgUiRole

// Traces
TraceSpan, TraceTimeline, SpanKind, SpanStatus

// A2A
A2AMessage, A2ASession

// Metrics
AgentMetrics
```

---

## Component prop shapes

### `StreamingChatPanel`

```ts
interface StreamingChatPanelProps {
  messages: AgUiMessage[];        // Completed + in-progress messages from the hook
  isStreaming: boolean;           // True while a run is active
  streamingText?: string;         // Partial text accumulator for the current assistant turn
  activeToolCalls?: AgUiToolCall[]; // Tool calls still in-flight (status: 'streaming')
  error: string | null;           // Non-null when the stream errored
  onSend: (content: string) => void;  // Called when the user submits input
  onCancel?: () => void;          // Called when the user clicks Stop; triggers AbortController
  placeholder?: string;           // Input placeholder (default: 'Send a message to the agent...')
  className?: string;             // Extra class for the outer wrapper
}
```

### `ToolCallRenderer`

```ts
interface ToolCallRendererProps {
  toolCall: AgUiToolCall;   // Single tool call object from messages[n].toolCalls or activeToolCalls
  className?: string;       // Extra class for the pill wrapper
}
```

`AgUiToolCall` fields rendered:

| Field | Shown as |
|-------|----------|
| `name` | Pill label |
| `status` | Icon: `⏳` streaming · `✓` completed · `✗` error |
| `args` | Collapsed JSON (pretty-printed on expand) |
| `result` | Collapsed result value (pretty-printed on expand) |
| `startedAt` / `endedAt` | Duration in ms (visible when both are present) |

### `AgUiReasoningBlock`

```ts
interface AgUiReasoningBlockProps {
  reasoning: string;        // Full reasoning text accumulated from REASONING_MESSAGE_CONTENT events
  isStreaming?: boolean;    // Drives label: 'Thinking…' vs 'Reasoning' (default false)
  defaultOpen?: boolean;    // Whether the block starts expanded (default false)
  className?: string;       // Extra class for the outer wrapper
}
```

The component renders nothing when `reasoning` is empty or whitespace. The token count chip shows an approximate word count.

---

## Customization & extension

### Pass `extraBody` for custom request fields

Some backends accept extra fields in the POST body alongside `message` and `threadId`. Use `extraBody` at hook construction time (applied to every request) or per-send:

```tsx
// Applied to every send
const stream = useAgUiStream({
  url: '/api/agents/orgiq-supervisor/invoke',
  extraBody: { agentId: 'orgiq-supervisor', sessionContext: { userId: 'u-123' } },
});

// Or override per-send (merged on top of hook-level extraBody)
stream.sendMessage('Who knows auth best?', {
  extraBody: { bypassCache: true },
});
```

This is also the standard pattern for CUSTOM-event extensions: add a discriminated field to `extraBody` and emit `{ type: 'CUSTOM', ... }` events from the server; consume them via `onEvent`.

### Tap the raw event stream with `onEvent`

`onEvent` receives every `AgUiEvent` before state is applied, making it suitable for analytics, logging, or driving side-effects:

```tsx
const stream = useAgUiStream({
  url: '/api/agents/orgiq-supervisor/invoke',
  onEvent: (event) => {
    analytics.track('agui_event', { type: event.type });
    if (event.type === 'RUN_STARTED') {
      setRunId(event.runId);
    }
    if (event.type === 'CUSTOM') {
      handleCustomEvent(event);
    }
  },
});
```

### Resume an existing thread with `loadHistory`

When a user returns to a session whose messages live in a server-side store, call `loadHistory` to seed the chat panel without re-streaming:

```tsx
const { loadHistory, sendMessage } = useAgUiStream({
  url: '/api/agents/orgiq-supervisor/invoke',
});

useEffect(() => {
  if (savedSession) {
    // Restores threadId so subsequent sends continue the same thread
    loadHistory(savedSession.threadId, savedSession.messages);
  }
}, [savedSession]);
```

---

## `STATE_DELTA` — JSON Patch (RFC 6902)

Agents may emit `STATE_SNAPSHOT` once to establish the initial state object, then stream incremental `STATE_DELTA` events containing RFC 6902 JSON Patch operations. The hook applies the ops automatically and exposes the result as `state`:

```tsx
const { state } = useAgUiStream({ url: '...' });
// state is whatever shape your agent defines — cast as needed
const typedState = state as MyAgentState | undefined;
```

Supported ops: `add`, `replace`, `remove`, `move`, `copy`, `test`. Failed `test` ops emit a console warning but do not throw.

---

## REASONING — chain-of-thought is first-class

When an agent emits `REASONING_MESSAGE_START` / `REASONING_MESSAGE_CONTENT` / `REASONING_MESSAGE_END`, the hook accumulates the deltas into `message.reasoning` on the corresponding assistant message. `StreamingChatPanel` renders it automatically via `AgUiReasoningBlock` (collapsed by default).

To render reasoning in a custom UI:

```tsx
{messages.map((msg) => (
  <div key={msg.id}>
    {msg.role === 'assistant' && msg.reasoning && (
      <AgUiReasoningBlock
        reasoning={msg.reasoning}
        isStreaming={msg.isStreaming && isStreaming}
        defaultOpen={false}
      />
    )}
    <p>{msg.content}</p>
  </div>
))}
```

`reasoning` is set only on messages that received at least one `REASONING_MESSAGE_CONTENT` delta. Messages without reasoning do not have the field set (it remains `undefined`).

---

## Event reference — v0.1.x stable contract

All events are JSON objects with a `type` discriminant (and optional base fields `timestamp?: number`, `rawEvent?: unknown`). The tables below list every field for each stable event type. **Bold** fields are required.

### Lifecycle

| Event | Required fields | Optional fields | Notes |
|-------|-----------------|-----------------|-------|
| `RUN_STARTED` | **`threadId`**, **`runId`** | `parentRunId`, `input` | Seed `threadId` into subsequent `sendMessage` calls for thread continuity |
| `RUN_FINISHED` | — | `outcome`, `result` | Hook sets `isStreaming: false`; in-progress message is closed |
| `RUN_ERROR` | **`message`** | `code` | Hook stores `message` in `error` state and clears `isStreaming` |
| `STEP_STARTED` | **`stepName`** | — | Forwarded via `onEvent`; no built-in state change |
| `STEP_FINISHED` | **`stepName`** | — | Forwarded via `onEvent`; no built-in state change |

### Text messages — verbose form

Three events make up a complete assistant turn:

| Event | Required fields | Optional fields | Notes |
|-------|-----------------|-----------------|-------|
| `TEXT_MESSAGE_START` | **`messageId`**, **`role`** | — | Creates a new `AgUiMessage` with `isStreaming: true` |
| `TEXT_MESSAGE_CONTENT` | **`messageId`**, **`delta`** | — | Appends `delta` to `message.content` and `streamingText` |
| `TEXT_MESSAGE_END` | **`messageId`** | — | Marks message `isStreaming: false`; clears `streamingText` |

### Text messages — compact form

| Event | Required fields | Optional fields | Notes |
|-------|-----------------|-----------------|-------|
| `TEXT_MESSAGE_CHUNK` | — | `messageId`, `role`, `delta` | Lazy-creates a message on first chunk for a `messageId`; accumulates `delta` |

### Tool calls

> **Critical field names** — these differ from common alternatives in agent runtimes:
>
> - Use `toolCallName` (not `toolName`) on `TOOL_CALL_START`
> - Use `delta` (not `args`) on `TOOL_CALL_ARGS`
> - `TOOL_CALL_RESULT` is a **separate** event after `TOOL_CALL_END`, not inlined on `TOOL_CALL_END`

| Event | Required fields | Optional fields | Notes |
|-------|-----------------|-----------------|-------|
| `TOOL_CALL_START` | **`toolCallId`**, **`toolCallName`** | `parentMessageId` | Creates `AgUiToolCall` with `status: 'streaming'`; attaches to current message |
| `TOOL_CALL_ARGS` | **`toolCallId`**, **`delta`** | — | Appends `delta` to `toolCall.args` |
| `TOOL_CALL_END` | **`toolCallId`** | — | Sets `status: 'completed'`; moves from `activeToolCalls` to message |
| `TOOL_CALL_RESULT` | **`messageId`**, **`toolCallId`**, **`content`** | `role` | Sets `toolCall.result`; arrives after `TOOL_CALL_END` |
| `TOOL_CALL_CHUNK` | — | `toolCallId`, `toolCallName`, `parentMessageId`, `delta` | Compact form; lazy-creates tool call on first chunk |

### State management

| Event | Required fields | Optional fields | Notes |
|-------|-----------------|-----------------|-------|
| `STATE_SNAPSHOT` | **`snapshot`** | — | Replaces entire `state` value |
| `STATE_DELTA` | **`delta`** (`JsonPatchOp[]`) | — | Applies RFC 6902 ops (`add`, `replace`, `remove`, `move`, `copy`, `test`); failed `test` warns |
| `MESSAGES_SNAPSHOT` | **`messages`** | — | Bulk-replaces the entire `messages` array |

### Activity

| Event | Required fields | Optional fields | Notes |
|-------|-----------------|-----------------|-------|
| `ACTIVITY_SNAPSHOT` | **`messageId`**, **`activityType`**, **`content`** | `replace` | Forwarded via `onEvent`; no built-in state mutation |
| `ACTIVITY_DELTA` | **`messageId`**, **`activityType`**, **`patch`** | — | Forwarded via `onEvent`; no built-in state mutation |

### Reasoning (chain-of-thought)

| Event | Required fields | Optional fields | Notes |
|-------|-----------------|-----------------|-------|
| `REASONING_MESSAGE_START` | **`messageId`**, **`role`** (`"reasoning"`) | — | Initialises `message.reasoning = ''` on the current message |
| `REASONING_MESSAGE_CONTENT` | **`messageId`**, **`delta`** | — | Appends `delta` to `message.reasoning` |
| `REASONING_MESSAGE_END` | **`messageId`** | — | No-op; content already accumulated |
| `REASONING_MESSAGE_CHUNK` | **`messageId`** | `delta` | Compact form |
| `REASONING_START` / `REASONING_END` | **`messageId`** | — | Forwarded via `onEvent` only |
| `REASONING_ENCRYPTED_VALUE` | **`subtype`**, **`entityId`**, **`encryptedValue`** | — | Forwarded via `onEvent` only |

### Extension events

| Event | Required fields | Optional fields | Notes |
|-------|-----------------|-----------------|-------|
| `CUSTOM` | **`name`**, **`value`** | — | Application-defined; consume via `onEvent` |
| `RAW` | **`event`** | `source` | Wraps a raw vendor event; consume via `onEvent` |
| `META_EVENT` | **`metaType`**, **`payload`** | — | Draft; consume via `onEvent` |

---

## `useAgUiStream` return shape

```ts
interface UseAgUiStreamReturn {
  messages: AgUiMessage[];          // All messages (user + assistant); includes toolCalls and reasoning
  streamingText: string;            // Current assistant turn accumulator; cleared on TEXT_MESSAGE_END
  activeToolCalls: AgUiToolCall[];  // Tool calls still in flight (status: 'streaming')
  state: unknown;                   // Driven by STATE_SNAPSHOT / STATE_DELTA
  threadId: string | null;          // Set from RUN_STARTED; sent with every subsequent POST
  runId: string | null;             // Set from RUN_STARTED
  isStreaming: boolean;             // True between sendMessage and RUN_FINISHED/RUN_ERROR
  error: string | null;             // Set from RUN_ERROR.message or HTTP/network errors
  sendMessage(content, opts?): void; // Aborts any in-flight stream before starting a new one
  cancelStream(): void;             // AbortController.abort() — preserves partial message content
  reset(): void;                    // Clears all state (messages, threadId, error, state)
  loadHistory(threadId, messages): void; // Seed past messages without a network request
}
```

---

## Event reference (summary table)

| Category | Event types |
|----------|-------------|
| Lifecycle | `RUN_STARTED`, `RUN_FINISHED`, `RUN_ERROR`, `STEP_STARTED`, `STEP_FINISHED` |
| Text streaming | `TEXT_MESSAGE_START`, `TEXT_MESSAGE_CONTENT`, `TEXT_MESSAGE_END`, `TEXT_MESSAGE_CHUNK` |
| Tool calls | `TOOL_CALL_START`, `TOOL_CALL_ARGS`, `TOOL_CALL_END`, `TOOL_CALL_RESULT`, `TOOL_CALL_CHUNK` |
| State | `STATE_SNAPSHOT`, `STATE_DELTA`, `MESSAGES_SNAPSHOT` |
| Activity | `ACTIVITY_SNAPSHOT`, `ACTIVITY_DELTA` |
| Reasoning | `REASONING_MESSAGE_START`, `REASONING_MESSAGE_CONTENT`, `REASONING_MESSAGE_END`, `REASONING_MESSAGE_CHUNK`, `REASONING_START`, `REASONING_END`, `REASONING_ENCRYPTED_VALUE` |
| Extensions | `RAW`, `CUSTOM`, `META_EVENT` |

Full spec: https://docs.ag-ui.com/concepts/events

---

## Notes

- **No SSR support.** `useAgUiStream` uses `fetch` + `ReadableStream` which are browser-only APIs. Wrap in a client-only boundary if you use a framework with SSR.
- **Transport.** AG-UI uses `POST` for SSE (not `GET EventSource`). The frontend sends JSON and reads the response as a stream; standard `EventSource` cannot be used here.
- **Abort.** `cancelStream()` calls `AbortController.abort()` on the in-flight fetch. The current message is marked `isStreaming: false` and partial content is preserved.
- **Thread continuity.** The `threadId` from `RUN_STARTED` is remembered and sent with every subsequent `sendMessage` call so the agent backend can reconstruct context.
