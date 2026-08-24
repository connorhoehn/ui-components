import { useState, useRef, useCallback, useEffect } from 'react';
import type {
  AgUiEvent,
  AgUiMessage,
  AgUiToolCall,
  AgUiRole,
  JsonPatchOp,
} from '../../../types/agents';

export interface UseAgUiStreamOptions {
  url: string;
  threadId?: string;
  headers?: Record<string, string>;
  /** Extra fields merged into the POST body alongside `message` and `threadId`. */
  extraBody?: Record<string, unknown>;
  onEvent?: (event: AgUiEvent) => void;
}

export interface UseAgUiStreamReturn {
  messages: AgUiMessage[];
  streamingText: string;
  activeToolCalls: AgUiToolCall[];
  state: unknown;
  threadId: string | null;
  runId: string | null;
  isStreaming: boolean;
  error: string | null;
  sendMessage: (content: string, opts?: { extraBody?: Record<string, unknown> }) => void;
  cancelStream: () => void;
  reset: () => void;
  loadHistory: (threadId: string, messages: AgUiMessage[]) => void;
}

// ─── Minimal RFC 6902 JSON Patch applier ─────────────────────────────────────

function getAtPath(obj: unknown, parts: string[]): unknown {
  let cur: unknown = obj;
  for (const part of parts) {
    if (cur == null || typeof cur !== 'object') return undefined;
    cur = (cur as Record<string, unknown>)[part];
  }
  return cur;
}

function setAtPath(obj: unknown, parts: string[], value: unknown): unknown {
  if (parts.length === 0) return value;
  const root: Record<string, unknown> = Array.isArray(obj) ? [...(obj as unknown[])] as unknown as Record<string, unknown> : { ...(obj as Record<string, unknown>) };
  const key = parts[0];
  if (parts.length === 1) {
    root[key] = value;
  } else {
    root[key] = setAtPath((root as Record<string, unknown>)[key], parts.slice(1), value);
  }
  return root;
}

function removeAtPath(obj: unknown, parts: string[]): unknown {
  if (parts.length === 0) return undefined;
  const root: Record<string, unknown> = Array.isArray(obj) ? [...(obj as unknown[])] as unknown as Record<string, unknown> : { ...(obj as Record<string, unknown>) };
  if (parts.length === 1) {
    delete root[parts[0]];
  } else {
    root[parts[0]] = removeAtPath(root[parts[0]], parts.slice(1));
  }
  return root;
}

function parsePath(path: string): string[] {
  if (!path || path === '/') return [];
  return path.replace(/^\//, '').split('/').map((p) => p.replace(/~1/g, '/').replace(/~0/g, '~'));
}

function applyPatch(doc: unknown, ops: JsonPatchOp[]): unknown {
  let cur = doc;
  for (const op of ops) {
    try {
      const parts = parsePath(op.path);
      switch (op.op) {
        case 'add':
        case 'replace':
          cur = setAtPath(cur, parts, op.value);
          break;
        case 'remove':
          cur = removeAtPath(cur, parts);
          break;
        case 'copy': {
          const fromParts = parsePath(op.from ?? '');
          cur = setAtPath(cur, parts, getAtPath(cur, fromParts));
          break;
        }
        case 'move': {
          const fromParts = parsePath(op.from ?? '');
          const val = getAtPath(cur, fromParts);
          cur = removeAtPath(cur, fromParts);
          cur = setAtPath(cur, parts, val);
          break;
        }
        case 'test': {
          // RFC 6902 test: throw if value doesn't match — we just warn
          const actual = getAtPath(cur, parts);
          if (JSON.stringify(actual) !== JSON.stringify(op.value)) {
            console.warn('[useAgUiStream] JSON Patch test op failed at', op.path);
          }
          break;
        }
        default:
          console.warn('[useAgUiStream] Unsupported JSON Patch op:', op.op);
      }
    } catch (e) {
      console.warn('[useAgUiStream] JSON Patch op error:', op, e);
    }
  }
  return cur;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

function createMessageId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function useAgUiStream({
  url,
  threadId: initialThreadId,
  headers,
  extraBody: hookExtraBody,
  onEvent,
}: UseAgUiStreamOptions): UseAgUiStreamReturn {
  const [messages, setMessages] = useState<AgUiMessage[]>([]);
  const [streamingText, setStreamingText] = useState('');
  const [activeToolCalls, setActiveToolCalls] = useState<AgUiToolCall[]>([]);
  const [state, setState] = useState<unknown>(undefined);
  const [threadId, setThreadId] = useState<string | null>(initialThreadId ?? null);
  const [runId, setRunId] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const currentMessageIdRef = useRef<string | null>(null);
  // Ref mirrors for accumulation inside async loop (avoids stale closure reads)
  const accumulatorRef = useRef<string>('');
  const toolCallsRef = useRef<AgUiToolCall[]>([]);

  // Update the current streaming message in the messages array
  const updateCurrentMessage = useCallback(
    (updater: (msg: AgUiMessage) => AgUiMessage) => {
      setMessages((prev) => {
        const idx = prev.findIndex((m) => m.id === currentMessageIdRef.current);
        if (idx === -1) return prev;
        const updated = [...prev];
        updated[idx] = updater(updated[idx]);
        return updated;
      });
    },
    [],
  );

  // Find a tool call by ID across both active list and per-message toolCalls
  const mutateTool = useCallback(
    (toolCallId: string, updater: (tc: AgUiToolCall) => AgUiToolCall) => {
      toolCallsRef.current = toolCallsRef.current.map((tc) =>
        tc.id === toolCallId ? updater(tc) : tc,
      );
      setActiveToolCalls((prev) =>
        prev.map((tc) => (tc.id === toolCallId ? updater(tc) : tc)),
      );
      setMessages((prev) =>
        prev.map((msg) => ({
          ...msg,
          toolCalls: msg.toolCalls.map((tc) =>
            tc.id === toolCallId ? updater(tc) : tc,
          ),
        })),
      );
    },
    [],
  );

  const processEvent = useCallback(
    (event: AgUiEvent) => {
      // Always forward first, then mutate state
      onEvent?.(event);

      switch (event.type) {
        // ─── Lifecycle ───────────────────────────────────────────────────────
        case 'RUN_STARTED': {
          setThreadId(event.threadId);
          setRunId(event.runId);
          break;
        }
        case 'RUN_FINISHED': {
          setIsStreaming(false);
          if (currentMessageIdRef.current) {
            updateCurrentMessage((msg) => ({ ...msg, isStreaming: false }));
            currentMessageIdRef.current = null;
          }
          setStreamingText('');
          break;
        }
        case 'RUN_ERROR': {
          setError(event.message);
          setIsStreaming(false);
          if (currentMessageIdRef.current) {
            updateCurrentMessage((msg) => ({ ...msg, isStreaming: false }));
            currentMessageIdRef.current = null;
          }
          setStreamingText('');
          break;
        }
        case 'STEP_STARTED':
        case 'STEP_FINISHED': {
          // No built-in UI state change; onEvent already fired above.
          break;
        }

        // ─── Text Messages ───────────────────────────────────────────────────
        case 'TEXT_MESSAGE_START': {
          const msgId = event.messageId ?? createMessageId();
          currentMessageIdRef.current = msgId;
          accumulatorRef.current = '';
          toolCallsRef.current = [];
          const role = event.role as AgUiRole;
          setMessages((prev) => [
            ...prev,
            { id: msgId, role, content: '', isStreaming: true, toolCalls: [] },
          ]);
          break;
        }
        case 'TEXT_MESSAGE_CONTENT': {
          accumulatorRef.current += event.delta;
          const snapshot = accumulatorRef.current;
          setStreamingText(snapshot);
          updateCurrentMessage((msg) => ({ ...msg, content: snapshot }));
          break;
        }
        case 'TEXT_MESSAGE_END': {
          updateCurrentMessage((msg) => ({ ...msg, isStreaming: false }));
          setStreamingText('');
          currentMessageIdRef.current = null;
          break;
        }
        case 'TEXT_MESSAGE_CHUNK': {
          // Compact form: start if new messageId, accumulate delta, end implied
          const chunkId = event.messageId ?? currentMessageIdRef.current ?? createMessageId();
          if (currentMessageIdRef.current !== chunkId) {
            currentMessageIdRef.current = chunkId;
            accumulatorRef.current = '';
            toolCallsRef.current = [];
            const role = (event.role ?? 'assistant') as AgUiRole;
            setMessages((prev) => [
              ...prev,
              { id: chunkId, role, content: '', isStreaming: true, toolCalls: [] },
            ]);
          }
          if (event.delta) {
            accumulatorRef.current += event.delta;
            const snapshot = accumulatorRef.current;
            setStreamingText(snapshot);
            updateCurrentMessage((msg) => ({ ...msg, content: snapshot }));
          }
          break;
        }

        // ─── Tool Calls ──────────────────────────────────────────────────────
        case 'TOOL_CALL_START': {
          const tc: AgUiToolCall = {
            id: event.toolCallId,
            name: event.toolCallName,
            args: '',
            status: 'streaming',
            startedAt: Date.now(),
            parentMessageId: event.parentMessageId,
          };
          toolCallsRef.current = [...toolCallsRef.current, tc];
          setActiveToolCalls((prev) => [...prev, tc]);
          // Attach to current message
          if (currentMessageIdRef.current) {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === currentMessageIdRef.current
                  ? { ...msg, toolCalls: [...msg.toolCalls, tc] }
                  : msg,
              ),
            );
          }
          break;
        }
        case 'TOOL_CALL_ARGS': {
          mutateTool(event.toolCallId, (tc) => ({
            ...tc,
            args: tc.args + event.delta,
          }));
          break;
        }
        case 'TOOL_CALL_END': {
          mutateTool(event.toolCallId, (tc) => ({
            ...tc,
            status: 'completed',
            endedAt: Date.now(),
          }));
          setActiveToolCalls((prev) => prev.filter((tc) => tc.id !== event.toolCallId));
          break;
        }
        case 'TOOL_CALL_RESULT': {
          mutateTool(event.toolCallId, (tc) => ({ ...tc, result: event.content }));
          break;
        }
        case 'TOOL_CALL_CHUNK': {
          // Compact form: presence of toolCallId + toolCallName implies start; delta implies args
          const chunkTcId = event.toolCallId;
          if (!chunkTcId) break;
          const existing = toolCallsRef.current.find((tc) => tc.id === chunkTcId);
          if (!existing && event.toolCallName) {
            const tc: AgUiToolCall = {
              id: chunkTcId,
              name: event.toolCallName,
              args: event.delta ?? '',
              status: 'streaming',
              startedAt: Date.now(),
              parentMessageId: event.parentMessageId,
            };
            toolCallsRef.current = [...toolCallsRef.current, tc];
            setActiveToolCalls((prev) => [...prev, tc]);
            if (currentMessageIdRef.current) {
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === currentMessageIdRef.current
                    ? { ...msg, toolCalls: [...msg.toolCalls, tc] }
                    : msg,
                ),
              );
            }
          } else if (existing && event.delta) {
            mutateTool(chunkTcId, (tc) => ({ ...tc, args: tc.args + (event.delta ?? '') }));
          }
          break;
        }

        // ─── State Management ────────────────────────────────────────────────
        case 'STATE_SNAPSHOT': {
          setState(event.snapshot);
          break;
        }
        case 'STATE_DELTA': {
          setState((prev: unknown) => applyPatch(prev, event.delta));
          break;
        }
        case 'MESSAGES_SNAPSHOT': {
          // Best-effort coercion — trust that the server sends AgUiMessage-shaped objects
          setMessages(event.messages as AgUiMessage[]);
          break;
        }

        // ─── Activity ────────────────────────────────────────────────────────
        case 'ACTIVITY_SNAPSHOT':
        case 'ACTIVITY_DELTA': {
          // No built-in state; onEvent already fired.
          break;
        }

        // ─── Reasoning ───────────────────────────────────────────────────────
        case 'REASONING_MESSAGE_START': {
          updateCurrentMessage((msg) => ({ ...msg, reasoning: '' }));
          break;
        }
        case 'REASONING_MESSAGE_CONTENT': {
          updateCurrentMessage((msg) => ({
            ...msg,
            reasoning: (msg.reasoning ?? '') + event.delta,
          }));
          break;
        }
        case 'REASONING_MESSAGE_END': {
          // Content already accumulated; no-op.
          break;
        }
        case 'REASONING_START':
        case 'REASONING_END':
        case 'REASONING_MESSAGE_CHUNK':
        case 'REASONING_ENCRYPTED_VALUE': {
          // Forward via onEvent; no built-in state mutation.
          break;
        }

        // ─── Special / Draft ─────────────────────────────────────────────────
        case 'RAW':
        case 'CUSTOM':
        case 'META_EVENT': {
          // Forward via onEvent; no built-in state mutation.
          break;
        }

        default: {
          // Exhaustiveness guard — if TypeScript ever allows this branch, we
          // have an unhandled event type.
          const _exhaustive: never = event;
          console.warn('[useAgUiStream] Unhandled event type:', (_exhaustive as AgUiEvent).type);
        }
      }
    },
    [onEvent, updateCurrentMessage, mutateTool],
  );

  const parseSSE = useCallback((chunk: string): AgUiEvent[] => {
    const events: AgUiEvent[] = [];
    const lines = chunk.split('\n');
    let data = '';

    for (const line of lines) {
      // Skip empty lines and SSE comment lines
      if (line === '' || line.startsWith(':')) {
        if (line === '' && data) {
          try {
            events.push(JSON.parse(data) as AgUiEvent);
          } catch {
            // skip malformed events
          }
          data = '';
        }
        continue;
      }
      if (line.startsWith('data: ')) {
        data += line.slice(6);
      }
    }
    return events;
  }, []);

  const cancelStream = useCallback(() => {
    abortRef.current?.abort();
    setIsStreaming(false);
    setStreamingText('');
    if (currentMessageIdRef.current) {
      updateCurrentMessage((msg) => ({ ...msg, isStreaming: false }));
      currentMessageIdRef.current = null;
    }
    setActiveToolCalls([]);
  }, [updateCurrentMessage]);

  const sendMessage = useCallback(
    async (content: string, opts?: { extraBody?: Record<string, unknown> }) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setError(null);
      setIsStreaming(true);

      const userMsg: AgUiMessage = {
        id: createMessageId(),
        role: 'user',
        content,
        isStreaming: false,
        toolCalls: [],
      };
      setMessages((prev) => [...prev, userMsg]);

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'text/event-stream',
            ...headers,
          },
          body: JSON.stringify({
            message: content,
            threadId: threadId ?? undefined,
            ...hookExtraBody,
            ...opts?.extraBody,
          }),
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error('No response body');

        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          const lastBoundary = buffer.lastIndexOf('\n\n');
          if (lastBoundary !== -1) {
            const complete = buffer.slice(0, lastBoundary + 2);
            buffer = buffer.slice(lastBoundary + 2);
            for (const event of parseSSE(complete)) {
              processEvent(event);
            }
          }
        }

        // Flush any remaining data in the buffer
        if (buffer.trim()) {
          for (const event of parseSSE(buffer + '\n\n')) {
            processEvent(event);
          }
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Stream failed');
        setIsStreaming(false);
        setStreamingText('');
      }
    },
    [url, threadId, headers, hookExtraBody, parseSSE, processEvent],
  );

  const loadHistory = useCallback(
    (tid: string, historyMessages: AgUiMessage[]) => {
      cancelStream();
      setThreadId(tid);
      setRunId(null);
      setMessages(historyMessages);
      setStreamingText('');
      setActiveToolCalls([]);
      setError(null);
      accumulatorRef.current = '';
      toolCallsRef.current = [];
      currentMessageIdRef.current = null;
    },
    [cancelStream],
  );

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setIsStreaming(false);
    setStreamingText('');
    setActiveToolCalls([]);
    setState(undefined);
    setThreadId(null);
    setRunId(null);
    setError(null);
    accumulatorRef.current = '';
    toolCallsRef.current = [];
    currentMessageIdRef.current = null;
  }, []);

  // Unmount: abort any in-flight SSE stream.
  //
  // Every other cancel path here is user-driven (cancelStream, reset, or the
  // next sendMessage). Without this, unmounting mid-stream — navigating away
  // from an agent page while a response streams — leaves the read loop running
  // against a live connection for the life of the page, pushing setState into
  // a dead component on every event.
  useEffect(() => () => abortRef.current?.abort(), []);

  return {
    messages,
    streamingText,
    activeToolCalls,
    state,
    threadId,
    runId,
    isStreaming,
    error,
    sendMessage,
    cancelStream,
    reset,
    loadHistory,
  };
}
