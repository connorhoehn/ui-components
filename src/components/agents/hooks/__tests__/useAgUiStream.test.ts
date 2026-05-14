import { renderHook, act, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useAgUiStream } from '../useAgUiStream';
import type { AgUiMessage } from '../../../../types/agents';

// ─── Stream helpers ───────────────────────────────────────────────────────────

/**
 * Creates a manually-controlled SSE stream and wires up globalThis.fetch.
 *
 * Returns `{ mockFn, send, close }`.
 *
 *   - `send(event)` wraps a single SSE enqueue in `act()` so that React
 *     flushes state between individual events.  This is the key technique:
 *     if all events land in the same synchronous turn, the hook's
 *     `updateCurrentMessage` functional updater reads `currentMessageIdRef`
 *     lazily — after React batches the updates — and finds the ref already
 *     cleared by `TEXT_MESSAGE_END`, causing silent no-ops.  Separating
 *     each event into its own `act()` call avoids this.
 *
 *   - Call `close()` after the last event to signal end-of-stream.
 *
 * Typical usage:
 *
 *   const { mockFn, send, close } = buildMockStream();
 *   const { result } = renderHook(() => useAgUiStream(HOOK_DEFAULTS));
 *   act(() => { result.current.sendMessage('hi'); });
 *   await send({ type: 'RUN_STARTED', ... });
 *   await send({ type: 'TEXT_MESSAGE_START', ... });
 *   ...
 *   await close();
 *   await waitFor(() => expect(result.current.isStreaming).toBe(false));
 */
function buildMockStream(): {
  mockFn: ReturnType<typeof vi.fn>;
  send: (event: Record<string, unknown>) => Promise<void>;
  close: () => Promise<void>;
} {
  const encoder = new TextEncoder();
  let ctrl!: ReadableStreamDefaultController<Uint8Array>;
  const stream = new ReadableStream<Uint8Array>({
    start(c) {
      ctrl = c;
    },
  });

  const mockFn = vi.fn().mockResolvedValue(
    new Response(stream, {
      status: 200,
      headers: { 'Content-Type': 'text/event-stream' },
    }),
  );
  globalThis.fetch = mockFn as unknown as typeof fetch;

  const send = (event: Record<string, unknown>): Promise<void> =>
    act(async () => {
      ctrl.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
    });

  const close = (): Promise<void> =>
    act(async () => {
      ctrl.close();
    });

  return { mockFn, send, close };
}

// ─── Fixtures ────────────────────────────────────────────────────────────────

const TEST_URL = 'http://localhost:8080/stream';
const HOOK_DEFAULTS = { url: TEST_URL };

const RUN_STARTED = { type: 'RUN_STARTED', threadId: 't-1', runId: 'r-1' };
const RUN_FINISHED = { type: 'RUN_FINISHED' };

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('useAgUiStream', () => {
  let originalFetch: typeof fetch;

  beforeEach(() => {
    originalFetch = globalThis.fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  // ── Run lifecycle ───────────────────────────────────────────────────────────

  describe('Run lifecycle', () => {
    it('captures threadId and runId from RUN_STARTED', async () => {
      const { send, close } = buildMockStream();
      const { result } = renderHook(() => useAgUiStream(HOOK_DEFAULTS));

      act(() => { result.current.sendMessage('hi'); });

      await send(RUN_STARTED);
      await send(RUN_FINISHED);
      await close();

      await waitFor(() => expect(result.current.isStreaming).toBe(false));

      expect(result.current.threadId).toBe('t-1');
      expect(result.current.runId).toBe('r-1');
    });

    it('clears isStreaming on RUN_FINISHED', async () => {
      const { send, close } = buildMockStream();
      const { result } = renderHook(() => useAgUiStream(HOOK_DEFAULTS));

      act(() => { result.current.sendMessage('hi'); });

      await send(RUN_STARTED);
      await send(RUN_FINISHED);
      await close();

      await waitFor(() => expect(result.current.isStreaming).toBe(false));
    });

    it('captures error on RUN_ERROR', async () => {
      const { send, close } = buildMockStream();
      const { result } = renderHook(() => useAgUiStream(HOOK_DEFAULTS));

      act(() => { result.current.sendMessage('hi'); });

      await send(RUN_STARTED);
      await send({ type: 'RUN_ERROR', message: 'oops' });
      await close();

      await waitFor(() => expect(result.current.error).toBe('oops'));
      expect(result.current.isStreaming).toBe(false);
    });
  });

  // ── Text messages ───────────────────────────────────────────────────────────

  describe('Text messages', () => {
    it('streams text into a single assistant message', async () => {
      const { send, close } = buildMockStream();
      const { result } = renderHook(() => useAgUiStream(HOOK_DEFAULTS));

      act(() => { result.current.sendMessage('hi'); });

      await send(RUN_STARTED);
      await send({ type: 'TEXT_MESSAGE_START', messageId: 'm1', role: 'assistant' });
      await send({ type: 'TEXT_MESSAGE_CONTENT', messageId: 'm1', delta: 'Hello ' });
      await send({ type: 'TEXT_MESSAGE_CONTENT', messageId: 'm1', delta: 'world' });
      await send({ type: 'TEXT_MESSAGE_END', messageId: 'm1' });
      await send(RUN_FINISHED);
      await close();

      await waitFor(() => expect(result.current.isStreaming).toBe(false));

      // messages[0] is the user message, messages[1] is the assistant reply
      expect(result.current.messages).toHaveLength(2);
      expect(result.current.messages[1].content).toBe('Hello world');
      expect(result.current.streamingText).toBe('');
    });

    it('exposes streamingText separately during stream', async () => {
      const { send, close } = buildMockStream();
      const { result } = renderHook(() => useAgUiStream(HOOK_DEFAULTS));

      act(() => { result.current.sendMessage('hi'); });

      await send(RUN_STARTED);
      await send({ type: 'TEXT_MESSAGE_START', messageId: 'm1', role: 'assistant' });
      await send({ type: 'TEXT_MESSAGE_CONTENT', messageId: 'm1', delta: 'Hello' });

      // streamingText should be non-empty before END
      await waitFor(() => expect(result.current.streamingText).toBe('Hello'));

      await send({ type: 'TEXT_MESSAGE_END', messageId: 'm1' });
      await send(RUN_FINISHED);
      await close();

      await waitFor(() => expect(result.current.streamingText).toBe(''));
      expect(result.current.isStreaming).toBe(false);
    });
  });

  // ── Tool calls ──────────────────────────────────────────────────────────────

  describe('Tool calls', () => {
    it('captures toolCallName from TOOL_CALL_START (NOT toolName)', async () => {
      const { send, close } = buildMockStream();
      const { result } = renderHook(() => useAgUiStream(HOOK_DEFAULTS));

      act(() => { result.current.sendMessage('hi'); });

      await send(RUN_STARTED);
      await send({ type: 'TEXT_MESSAGE_START', messageId: 'm1', role: 'assistant' });
      await send({ type: 'TOOL_CALL_START', toolCallId: 'tc1', toolCallName: 'search_kb' });
      await send({ type: 'TOOL_CALL_END', toolCallId: 'tc1' });
      await send({ type: 'TEXT_MESSAGE_END', messageId: 'm1' });
      await send(RUN_FINISHED);
      await close();

      await waitFor(() => expect(result.current.isStreaming).toBe(false));

      const toolCall = result.current.messages[1]?.toolCalls[0];
      expect(toolCall?.name).toBe('search_kb');
    });

    it('accumulates args from TOOL_CALL_ARGS deltas (NOT args field)', async () => {
      const { send, close } = buildMockStream();
      const { result } = renderHook(() => useAgUiStream(HOOK_DEFAULTS));

      act(() => { result.current.sendMessage('hi'); });

      await send(RUN_STARTED);
      await send({ type: 'TEXT_MESSAGE_START', messageId: 'm1', role: 'assistant' });
      await send({ type: 'TOOL_CALL_START', toolCallId: 'tc1', toolCallName: 'search_kb' });
      await send({ type: 'TOOL_CALL_ARGS', toolCallId: 'tc1', delta: '{"q":' });
      await send({ type: 'TOOL_CALL_ARGS', toolCallId: 'tc1', delta: '"hi"}' });
      await send({ type: 'TOOL_CALL_END', toolCallId: 'tc1' });
      await send({ type: 'TEXT_MESSAGE_END', messageId: 'm1' });
      await send(RUN_FINISHED);
      await close();

      await waitFor(() => expect(result.current.isStreaming).toBe(false));

      const toolCall = result.current.messages[1]?.toolCalls[0];
      expect(toolCall?.args).toBe('{"q":"hi"}');
    });

    it('marks tool call completed on TOOL_CALL_END (no result yet)', async () => {
      const { send, close } = buildMockStream();
      const { result } = renderHook(() => useAgUiStream(HOOK_DEFAULTS));

      act(() => { result.current.sendMessage('hi'); });

      await send(RUN_STARTED);
      await send({ type: 'TEXT_MESSAGE_START', messageId: 'm1', role: 'assistant' });
      await send({ type: 'TOOL_CALL_START', toolCallId: 'tc1', toolCallName: 'search_kb' });
      await send({ type: 'TOOL_CALL_END', toolCallId: 'tc1' });
      await send({ type: 'TEXT_MESSAGE_END', messageId: 'm1' });
      await send(RUN_FINISHED);
      await close();

      await waitFor(() => expect(result.current.isStreaming).toBe(false));

      expect(result.current.activeToolCalls).toHaveLength(0);
      const toolCall = result.current.messages[1]?.toolCalls[0];
      expect(toolCall?.status).toBe('completed');
      expect(toolCall?.result).toBeUndefined();
    });

    it('populates result from TOOL_CALL_RESULT', async () => {
      const { send, close } = buildMockStream();
      const { result } = renderHook(() => useAgUiStream(HOOK_DEFAULTS));

      act(() => { result.current.sendMessage('hi'); });

      await send(RUN_STARTED);
      await send({ type: 'TEXT_MESSAGE_START', messageId: 'm1', role: 'assistant' });
      await send({ type: 'TOOL_CALL_START', toolCallId: 'tc1', toolCallName: 'search_kb' });
      await send({ type: 'TOOL_CALL_END', toolCallId: 'tc1' });
      await send({ type: 'TOOL_CALL_RESULT', messageId: 'm1', toolCallId: 'tc1', content: { hits: 3 } });
      await send({ type: 'TEXT_MESSAGE_END', messageId: 'm1' });
      await send(RUN_FINISHED);
      await close();

      await waitFor(() => expect(result.current.isStreaming).toBe(false));

      const toolCall = result.current.messages[1]?.toolCalls[0];
      expect(toolCall?.result).toEqual({ hits: 3 });
    });
  });

  // ── MESSAGES_SNAPSHOT ───────────────────────────────────────────────────────

  describe('MESSAGES_SNAPSHOT', () => {
    it('replaces messages on MESSAGES_SNAPSHOT', async () => {
      const snapshotMessages = [
        { id: 'a', role: 'user', content: 'A', isStreaming: false, toolCalls: [] },
        { id: 'b', role: 'assistant', content: 'B', isStreaming: false, toolCalls: [] },
        { id: 'c', role: 'user', content: 'C', isStreaming: false, toolCalls: [] },
      ];

      const { send, close } = buildMockStream();
      const { result } = renderHook(() => useAgUiStream(HOOK_DEFAULTS));

      act(() => { result.current.sendMessage('hi'); });

      await send(RUN_STARTED);
      await send({ type: 'TEXT_MESSAGE_START', messageId: 'm1', role: 'assistant' });
      await send({ type: 'TEXT_MESSAGE_CONTENT', messageId: 'm1', delta: 'Hello' });
      await send({ type: 'TEXT_MESSAGE_END', messageId: 'm1' });
      await send({ type: 'MESSAGES_SNAPSHOT', messages: snapshotMessages });
      await send(RUN_FINISHED);
      await close();

      await waitFor(() => expect(result.current.isStreaming).toBe(false));

      expect(result.current.messages).toHaveLength(3);
      expect(result.current.messages[0].id).toBe('a');
      expect(result.current.messages[2].id).toBe('c');
    });
  });

  // ── STATE_SNAPSHOT / STATE_DELTA ─────────────────────────────────────────────

  describe('STATE_SNAPSHOT / STATE_DELTA (JSON Patch)', () => {
    it('replaces state on STATE_SNAPSHOT', async () => {
      const { send, close } = buildMockStream();
      const { result } = renderHook(() => useAgUiStream(HOOK_DEFAULTS));

      act(() => { result.current.sendMessage('hi'); });

      await send(RUN_STARTED);
      await send({ type: 'STATE_SNAPSHOT', snapshot: { foo: 1 } });
      await send(RUN_FINISHED);
      await close();

      await waitFor(() => expect(result.current.isStreaming).toBe(false));

      expect(result.current.state).toEqual({ foo: 1 });
    });

    it('applies add/replace/remove ops from STATE_DELTA', async () => {
      const { send, close } = buildMockStream();
      const { result } = renderHook(() => useAgUiStream(HOOK_DEFAULTS));

      act(() => { result.current.sendMessage('hi'); });

      await send(RUN_STARTED);
      await send({ type: 'STATE_SNAPSHOT', snapshot: { a: 1, b: 2 } });
      await send({
        type: 'STATE_DELTA',
        delta: [
          { op: 'add', path: '/c', value: 3 },
          { op: 'replace', path: '/a', value: 10 },
          { op: 'remove', path: '/b' },
        ],
      });
      await send(RUN_FINISHED);
      await close();

      await waitFor(() => expect(result.current.isStreaming).toBe(false));

      expect(result.current.state).toEqual({ a: 10, c: 3 });
    });
  });

  // ── Reasoning ───────────────────────────────────────────────────────────────

  describe('Reasoning', () => {
    it('accumulates reasoning content into message.reasoning', async () => {
      const { send, close } = buildMockStream();
      const { result } = renderHook(() => useAgUiStream(HOOK_DEFAULTS));

      act(() => { result.current.sendMessage('hi'); });

      await send(RUN_STARTED);
      await send({ type: 'TEXT_MESSAGE_START', messageId: 'm1', role: 'assistant' });
      await send({ type: 'REASONING_MESSAGE_START', messageId: 'm1', role: 'reasoning' });
      await send({ type: 'REASONING_MESSAGE_CONTENT', messageId: 'm1', delta: 'Think ' });
      await send({ type: 'REASONING_MESSAGE_CONTENT', messageId: 'm1', delta: 'carefully' });
      await send({ type: 'REASONING_MESSAGE_END', messageId: 'm1' });
      await send({ type: 'TEXT_MESSAGE_END', messageId: 'm1' });
      await send(RUN_FINISHED);
      await close();

      await waitFor(() => expect(result.current.isStreaming).toBe(false));

      const assistantMsg = result.current.messages[1];
      expect(assistantMsg?.reasoning).toBe('Think carefully');
    });
  });

  // ── onEvent ─────────────────────────────────────────────────────────────────

  describe('onEvent', () => {
    it('fires onEvent for every event', async () => {
      const events = [
        RUN_STARTED,
        { type: 'TEXT_MESSAGE_START', messageId: 'm1', role: 'assistant' },
        { type: 'TEXT_MESSAGE_CONTENT', messageId: 'm1', delta: 'Hi' },
        { type: 'TEXT_MESSAGE_END', messageId: 'm1' },
        RUN_FINISHED,
      ];

      const { send, close } = buildMockStream();
      const onEvent = vi.fn();
      const { result } = renderHook(() => useAgUiStream({ ...HOOK_DEFAULTS, onEvent }));

      act(() => { result.current.sendMessage('hi'); });

      for (const ev of events) {
        await send(ev);
      }
      await close();

      await waitFor(() => expect(result.current.isStreaming).toBe(false));

      expect(onEvent).toHaveBeenCalledTimes(events.length);
      const receivedTypes = onEvent.mock.calls.map((c) => c[0].type);
      expect(receivedTypes).toEqual(events.map((e) => e.type));
    });
  });

  // ── extraBody ────────────────────────────────────────────────────────────────

  describe('extraBody', () => {
    it('merges hook-level extraBody into POST body', async () => {
      const { mockFn, send, close } = buildMockStream();

      const { result } = renderHook(() =>
        useAgUiStream({ ...HOOK_DEFAULTS, extraBody: { tenant: 'orgiq' } }),
      );

      act(() => { result.current.sendMessage('hi'); });

      await send(RUN_STARTED);
      await send(RUN_FINISHED);
      await close();

      await waitFor(() => expect(result.current.isStreaming).toBe(false));

      const lastCall = mockFn.mock.calls[0];
      const body = JSON.parse(lastCall[1].body as string);
      expect(body.tenant).toBe('orgiq');
      expect(body.message).toBe('hi');
    });

    it('per-call extraBody overrides hook-level', async () => {
      const { mockFn, send, close } = buildMockStream();

      const { result } = renderHook(() =>
        useAgUiStream({ ...HOOK_DEFAULTS, extraBody: { tenant: 'orgiq' } }),
      );

      act(() => { result.current.sendMessage('hi', { extraBody: { tenant: 'newsroom' } }); });

      await send(RUN_STARTED);
      await send(RUN_FINISHED);
      await close();

      await waitFor(() => expect(result.current.isStreaming).toBe(false));

      const lastCall = mockFn.mock.calls[0];
      const body = JSON.parse(lastCall[1].body as string);
      expect(body.tenant).toBe('newsroom');
    });
  });

  // ── cancelStream ─────────────────────────────────────────────────────────────

  describe('cancelStream', () => {
    it('aborts an in-flight stream and clears isStreaming', async () => {
      // Build a stream that never closes on its own
      let ctrl!: ReadableStreamDefaultController<Uint8Array>;
      const stream = new ReadableStream<Uint8Array>({ start(c) { ctrl = c; } });

      const mockFetch = vi.fn().mockResolvedValue(
        new Response(stream, {
          status: 200,
          headers: { 'Content-Type': 'text/event-stream' },
        }),
      );
      globalThis.fetch = mockFetch as unknown as typeof fetch;

      const { result } = renderHook(() => useAgUiStream(HOOK_DEFAULTS));

      act(() => {
        result.current.sendMessage('hi');
      });

      // Wait for isStreaming to go true
      await waitFor(() => expect(result.current.isStreaming).toBe(true));

      // Now cancel
      act(() => {
        result.current.cancelStream();
      });

      await waitFor(() => expect(result.current.isStreaming).toBe(false));

      // Verify the AbortSignal passed to fetch was aborted
      const callSignal: AbortSignal = mockFetch.mock.calls[0][1].signal;
      expect(callSignal.aborted).toBe(true);

      // Clean up — prevent jsdom from logging an unclosed-stream warning
      try { ctrl.close(); } catch { /* already errored */ }
    });
  });

  // ── loadHistory ──────────────────────────────────────────────────────────────

  describe('loadHistory', () => {
    it('seeds messages and threadId without making a request', async () => {
      const mockFetch = vi.fn();
      globalThis.fetch = mockFetch as unknown as typeof fetch;

      const historyMessages: AgUiMessage[] = [
        { id: 'h1', role: 'user', content: 'Hello', isStreaming: false, toolCalls: [] },
        { id: 'h2', role: 'assistant', content: 'World', isStreaming: false, toolCalls: [] },
      ];

      const { result } = renderHook(() => useAgUiStream(HOOK_DEFAULTS));

      act(() => {
        result.current.loadHistory('t-5', historyMessages);
      });

      await waitFor(() => expect(result.current.messages).toHaveLength(2));

      expect(result.current.threadId).toBe('t-5');
      expect(result.current.messages[0].id).toBe('h1');
      expect(result.current.messages[1].id).toBe('h2');
      expect(mockFetch).not.toHaveBeenCalled();
    });
  });
});
