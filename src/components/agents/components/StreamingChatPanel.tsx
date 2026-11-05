import { useState, useRef, useEffect, useMemo } from 'react';
import { cn } from '../../../lib/cn';
import { Input } from '../../forms/Input';
import type { AgUiMessage, AgUiToolCall } from '../../../types/agents';
import { ToolCallRenderer } from './ToolCallRenderer';
import { AgUiReasoningBlock } from './AgUiReasoningBlock';

interface StreamingChatPanelProps {
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

const AI_AVATAR = 'w-8 h-8 rounded-full bg-success flex items-center justify-center text-white text-[11px] font-bold shrink-0';

export function StreamingChatPanel({
  messages,
  isStreaming,
  streamingText = '',
  activeToolCalls = [],
  error,
  onSend,
  onCancel,
  placeholder = 'Send a message to the agent...',
  className,
}: StreamingChatPanelProps) {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // `useAgUiStream` puts a tool call in BOTH `activeToolCalls` and the open
  // message's `toolCalls` — TOOL_CALL_START pushes to each — and only removes
  // it from the active list on TOOL_CALL_END. Rendering both lists verbatim
  // therefore drew the same running call twice, once under the assistant
  // bubble and once in the standalone block below it. The orphan block is
  // still needed for calls that start before any TEXT_MESSAGE_START, so it
  // renders only the calls no message has claimed.
  const attachedToolCallIds = useMemo(
    () => new Set(messages.flatMap((m) => m.toolCalls.map((tc) => tc.id))),
    [messages],
  );
  const orphanToolCalls = useMemo(
    () => activeToolCalls.filter((tc) => !attachedToolCallIds.has(tc.id)),
    [activeToolCalls, attachedToolCallIds],
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, activeToolCalls, streamingText]);

  function handleSend() {
    const content = input.trim();
    if (!content || isStreaming) return;
    onSend(content);
    setInput('');
  }

  return (
    <div className={cn('flex flex-col border border-border rounded-lg bg-surface overflow-hidden', className)}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <span className="font-semibold text-sm text-text-primary">Agent Chat</span>
        {isStreaming && (
          <span className="flex items-center gap-1.5 text-xs text-info-fg">
            <span className="w-1.5 h-1.5 rounded-full bg-info animate-pulse" />
            Streaming
          </span>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 min-h-[300px] max-h-[500px] flex flex-col gap-4">
        {messages.length === 0 && !isStreaming && (
          <div className="text-sm text-text-tertiary text-center mt-[60px]">
            Messages will appear here as you interact with the agent...
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className="flex gap-2.5">
            {/* Avatar */}
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0',
                msg.role === 'user' ? 'bg-primary' : 'bg-success',
              )}
            >
              {msg.role === 'user' ? 'U' : 'AI'}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-[13px] text-text-primary">
                  {msg.role === 'user' ? 'You' : 'Agent'}
                </span>
              </div>
              {msg.role === 'assistant' && msg.reasoning && (
                <AgUiReasoningBlock
                  reasoning={msg.reasoning}
                  isStreaming={msg.isStreaming && isStreaming}
                  defaultOpen={false}
                />
              )}
              <div
                className={cn(
                  'mt-1 py-2 px-3 text-[14px] text-text-primary leading-[1.5] shadow-[0_1px_2px_rgba(0,0,0,0.04)] whitespace-pre-wrap break-words',
                  msg.role === 'user'
                    ? 'bg-primary-bg rounded-[12px_4px_12px_12px]'
                    : 'bg-surface-hover rounded-[4px_12px_12px_12px]',
                )}
              >
                {msg.content}
                {msg.isStreaming && (
                  <span className="inline-block animate-pulse ml-0.5 text-info-fg">▊</span>
                )}
              </div>

              {/* Tool calls */}
              {msg.toolCalls.length > 0 && (
                <div className="mt-1.5 flex flex-col gap-1">
                  {msg.toolCalls.map((tc) => (
                    <ToolCallRenderer key={tc.id} toolCall={tc} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Active tool calls not already shown under a message */}
        {orphanToolCalls.length > 0 && (
          <div className="flex gap-2.5">
            <div className={AI_AVATAR}>AI</div>
            <div className="flex-1 flex flex-col gap-1">
              {orphanToolCalls.map((tc) => (
                <ToolCallRenderer key={tc.id} toolCall={tc} />
              ))}
            </div>
          </div>
        )}

        {/* Live streaming text (in-progress assistant turn, not yet in messages) */}
        {streamingText && !messages.some((m) => m.isStreaming) && (
          <div className="flex gap-2.5">
            <div className={AI_AVATAR}>AI</div>
            <div className="flex-1 mt-1 py-2 px-3 bg-surface-hover rounded-[4px_12px_12px_12px] text-[14px] text-text-primary leading-[1.5] whitespace-pre-wrap break-words">
              {streamingText}
              <span className="inline-block animate-pulse ml-0.5 text-info-fg">▊</span>
            </div>
          </div>
        )}

        {/* Typing indicator */}
        {isStreaming && activeToolCalls.length === 0 && !streamingText && messages.length > 0 && !messages[messages.length - 1]?.isStreaming && (
          <div className="flex items-center gap-2 py-1">
            <div className="flex gap-[3px] py-1.5 px-3 bg-surface-hover rounded-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-surface-emphasis animate-bounce [animation-delay:0ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-surface-emphasis animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-surface-emphasis animate-bounce [animation-delay:300ms]" />
            </div>
            <span className="text-[12px] text-neutral">Agent is thinking...</span>
          </div>
        )}
      </div>

      {/* Error banner */}
      {error && (
        // The user is sitting waiting for a streamed reply; when the stream
        // fails this banner is the only thing that changes, and without
        // role="alert" a screen-reader user just hears nothing forever.
        <div role="alert" className="px-4 py-2 bg-danger-bg border-t border-danger-border text-xs text-danger-fg">
          {error}
        </div>
      )}

      {/* Input */}
      <div className="flex items-center gap-2 p-3 border-t border-border bg-surface-panel/50">
        {/* Named only by a placeholder, which is swapped to "Waiting for
            response..." while streaming — so the field's accessible name
            changed under the user, and vanished entirely once they typed. */}
        <Input
          aria-label="Message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={isStreaming}
          placeholder={isStreaming ? 'Waiting for response...' : placeholder}
          className={cn(
            'flex-1 rounded-lg',
            isStreaming && 'bg-surface-panel text-text-tertiary',
          )}
        />
        {isStreaming && onCancel ? (
          <button
            data-ui-part=""
            onClick={onCancel}
            className="text-sm px-4 py-2.5 bg-danger text-white rounded-lg hover:bg-danger transition-colors font-medium"
          >
            Stop
          </button>
        ) : (
          <button
            data-ui-part=""
            onClick={handleSend}
            disabled={!input.trim() || isStreaming}
            className={cn(
              'text-sm px-4 py-2.5 rounded-lg transition-colors font-medium',
              !input.trim() || isStreaming
                ? 'bg-surface-hover text-text-tertiary cursor-default'
                : 'bg-info text-white hover:bg-info cursor-pointer',
            )}
          >
            Send
          </button>
        )}
      </div>
    </div>
  );
}
