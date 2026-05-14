/**
 * eventSimulator.ts
 *
 * Produces a mock `fetch` function that, when called, returns a
 * ReadableStream of AG-UI SSE events — no backend required.
 *
 * Usage:
 *   const originalFetch = window.fetch;
 *   window.fetch = mockFetchAgUiStream();
 *   // ...later...
 *   window.fetch = originalFetch;
 */

type AgUiEventLike = Record<string, unknown> & { type: string };

function sseFrame(event: AgUiEventLike): Uint8Array {
  return new TextEncoder().encode(`data: ${JSON.stringify(event)}\n\n`);
}

/** Delay for `ms` milliseconds using setTimeout inside a ReadableStream. */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function buildScriptedEvents(): AgUiEventLike[] {
  const threadId = `demo-thread-${Date.now()}`;
  const runId = `demo-run-${Date.now()}`;
  const msgId = `msg-${Date.now()}`;
  const toolCallId = `tc-${Date.now()}`;

  return [
    // ── Lifecycle ──────────────────────────────────────────────────────
    { type: 'RUN_STARTED', threadId, runId },

    // ── Reasoning ─────────────────────────────────────────────────────
    { type: 'REASONING_MESSAGE_START', messageId: msgId },
    { type: 'REASONING_MESSAGE_CONTENT', messageId: msgId, delta: 'Let me check ' },
    { type: 'REASONING_MESSAGE_CONTENT', messageId: msgId, delta: 'the knowledge base ' },
    { type: 'REASONING_MESSAGE_CONTENT', messageId: msgId, delta: 'for relevant context...' },
    { type: 'REASONING_MESSAGE_END', messageId: msgId },

    // ── Text message start ─────────────────────────────────────────────
    { type: 'TEXT_MESSAGE_START', messageId: msgId, role: 'assistant' },

    // ── Tool call ──────────────────────────────────────────────────────
    {
      type: 'TOOL_CALL_START',
      toolCallId,
      toolCallName: 'query_knowledge_base',
      parentMessageId: msgId,
    },
    {
      type: 'TOOL_CALL_ARGS',
      toolCallId,
      delta: '{"query":"AG-UI protocol"}',
    },
    { type: 'TOOL_CALL_END', toolCallId },
    {
      type: 'TOOL_CALL_RESULT',
      toolCallId,
      content: JSON.stringify({ hits: 3, sources: ['docs/ag-ui.md', 'README.md', 'spec/events.md'] }),
    },

    // ── Streamed text reply ────────────────────────────────────────────
    { type: 'TEXT_MESSAGE_CONTENT', messageId: msgId, delta: 'Based on the knowledge base, ' },
    { type: 'TEXT_MESSAGE_CONTENT', messageId: msgId, delta: '**AG-UI** is an open protocol ' },
    { type: 'TEXT_MESSAGE_CONTENT', messageId: msgId, delta: 'for streaming agent outputs ' },
    { type: 'TEXT_MESSAGE_CONTENT', messageId: msgId, delta: 'to front-end UIs.\n\n' },
    {
      type: 'TEXT_MESSAGE_CONTENT',
      messageId: msgId,
      delta: 'It defines 30+ event types including lifecycle, text streaming, tool calls, state deltas, and reasoning blocks.',
    },

    // ── End & cleanup ─────────────────────────────────────────────────
    { type: 'TEXT_MESSAGE_END', messageId: msgId },
    { type: 'RUN_FINISHED' },
  ];
}

/**
 * Returns a fetch stub that ignores the real network and instead
 * pumps a scripted sequence of AG-UI SSE frames through a ReadableStream.
 *
 * Gap between each emitted frame defaults to 120 ms so streaming is visible.
 */
export function mockFetchAgUiStream(gapMs = 120): typeof fetch {
  return (_input: RequestInfo | URL, _init?: RequestInit): Promise<Response> => {
    const events = buildScriptedEvents();

    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        for (const event of events) {
          await delay(gapMs);
          controller.enqueue(sseFrame(event));
        }
        controller.close();
      },
    });

    const response = new Response(stream, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
      },
    });

    return Promise.resolve(response);
  };
}
