import { useState, useRef, useCallback } from 'react';
import type { AgUiEvent, AgUiMessage, AgUiToolCall } from '../../../types/agents';

interface UseAgUiStreamOptions {
  url: string;
  threadId?: string;
  headers?: Record<string, string>;
  onEvent?: (event: AgUiEvent) => void;
}

interface UseAgUiStreamReturn {
  messages: AgUiMessage[];
  isStreaming: boolean;
  currentToolCall: AgUiToolCall | null;
  runId: string | null;
  error: string | null;
  sendMessage: (content: string) => void;
  cancelStream: () => void;
  reset: () => void;
}

function createMessageId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function useAgUiStream({
  url,
  threadId,
  headers,
  onEvent,
}: UseAgUiStreamOptions): UseAgUiStreamReturn {
  const [messages, setMessages] = useState<AgUiMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentToolCall, setCurrentToolCall] = useState<AgUiToolCall | null>(null);
  const [runId, setRunId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const accumulatorRef = useRef<string>('');
  const toolCallsRef = useRef<AgUiToolCall[]>([]);
  const currentMessageIdRef = useRef<string | null>(null);

  const updateCurrentMessage = useCallback((content: string, streaming: boolean) => {
    setMessages((prev) => {
      const idx = prev.findIndex((m) => m.id === currentMessageIdRef.current);
      if (idx === -1) return prev;
      const updated = [...prev];
      updated[idx] = { ...updated[idx], content, toolCalls: [...toolCallsRef.current], isStreaming: streaming };
      return updated;
    });
  }, []);

  const processEvent = useCallback(
    (event: AgUiEvent) => {
      onEvent?.(event);

      switch (event.type) {
        case 'RUN_STARTED': {
          setRunId(event.runId ?? null);
          break;
        }

        case 'TEXT_MESSAGE_START': {
          const msgId = event.messageId ?? createMessageId();
          currentMessageIdRef.current = msgId;
          accumulatorRef.current = '';
          toolCallsRef.current = [];
          setMessages((prev) => [
            ...prev,
            {
              id: msgId,
              role: 'assistant',
              content: '',
              toolCalls: [],
              timestamp: event.timestamp,
              isStreaming: true,
            },
          ]);
          break;
        }

        case 'TEXT_MESSAGE_CONTENT': {
          if (event.delta) {
            accumulatorRef.current += event.delta;
            updateCurrentMessage(accumulatorRef.current, true);
          }
          break;
        }

        case 'TEXT_MESSAGE_END': {
          updateCurrentMessage(accumulatorRef.current, false);
          currentMessageIdRef.current = null;
          break;
        }

        case 'TOOL_CALL_START': {
          const tc: AgUiToolCall = {
            id: event.toolCallId ?? `tc-${Date.now()}`,
            name: event.toolName ?? 'unknown',
            args: '',
            startedAt: event.timestamp,
            status: 'running',
          };
          toolCallsRef.current = [...toolCallsRef.current, tc];
          setCurrentToolCall(tc);
          break;
        }

        case 'TOOL_CALL_ARGS': {
          if (event.args) {
            const tcs = toolCallsRef.current;
            const last = tcs[tcs.length - 1];
            if (last) {
              const updated = { ...last, args: last.args + event.args };
              toolCallsRef.current = [...tcs.slice(0, -1), updated];
              setCurrentToolCall(updated);
            }
          }
          break;
        }

        case 'TOOL_CALL_END': {
          const tcs = toolCallsRef.current;
          const last = tcs[tcs.length - 1];
          if (last) {
            const updated = {
              ...last,
              result: event.result,
              endedAt: event.timestamp,
              status: 'completed' as const,
            };
            toolCallsRef.current = [...tcs.slice(0, -1), updated];
            setCurrentToolCall(null);
            updateCurrentMessage(accumulatorRef.current, true);
          }
          break;
        }

        case 'RUN_ERROR': {
          setError(event.error ?? 'Unknown streaming error');
          setIsStreaming(false);
          if (currentMessageIdRef.current) {
            updateCurrentMessage(accumulatorRef.current, false);
          }
          break;
        }

        case 'RUN_FINISHED': {
          setIsStreaming(false);
          if (currentMessageIdRef.current) {
            updateCurrentMessage(accumulatorRef.current, false);
          }
          break;
        }
      }
    },
    [onEvent, updateCurrentMessage],
  );

  const parseSSE = useCallback(
    (chunk: string): AgUiEvent[] => {
      const events: AgUiEvent[] = [];
      const lines = chunk.split('\n');
      let data = '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          data += line.slice(6);
        } else if (line === '' && data) {
          try {
            events.push(JSON.parse(data) as AgUiEvent);
          } catch {
            // skip malformed events
          }
          data = '';
        }
      }
      return events;
    },
    [],
  );

  const sendMessage = useCallback(
    async (content: string) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setError(null);
      setIsStreaming(true);

      const userMsg: AgUiMessage = {
        id: createMessageId(),
        role: 'user',
        content,
        toolCalls: [],
        timestamp: new Date().toISOString(),
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
            threadId,
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

          const lastNewline = buffer.lastIndexOf('\n\n');
          if (lastNewline !== -1) {
            const complete = buffer.slice(0, lastNewline + 2);
            buffer = buffer.slice(lastNewline + 2);
            const events = parseSSE(complete);
            for (const event of events) {
              processEvent(event);
            }
          }
        }

        if (buffer.trim()) {
          const events = parseSSE(buffer + '\n\n');
          for (const event of events) {
            processEvent(event);
          }
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Stream failed');
        setIsStreaming(false);
      }
    },
    [url, threadId, headers, parseSSE, processEvent],
  );

  const cancelStream = useCallback(() => {
    abortRef.current?.abort();
    setIsStreaming(false);
    if (currentMessageIdRef.current) {
      updateCurrentMessage(accumulatorRef.current, false);
    }
  }, [updateCurrentMessage]);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setIsStreaming(false);
    setCurrentToolCall(null);
    setRunId(null);
    setError(null);
    accumulatorRef.current = '';
    toolCallsRef.current = [];
    currentMessageIdRef.current = null;
  }, []);

  return {
    messages,
    isStreaming,
    currentToolCall,
    runId,
    error,
    sendMessage,
    cancelStream,
    reset,
  };
}
