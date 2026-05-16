import { useState, useRef, useEffect } from 'react';
import { cn } from '../../../lib/cn';
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

const AI_AVATAR = 'w-8 h-8 rounded-full bg-[#10b981] flex items-center justify-center text-white text-[11px] font-bold shrink-0';

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
    <div className={cn('flex flex-col border border-slate-200 rounded-lg bg-white overflow-hidden', className)}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
        <span className="font-semibold text-sm text-slate-800">Agent Chat</span>
        {isStreaming && (
          <span className="flex items-center gap-1.5 text-xs text-blue-600">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Streaming
          </span>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 min-h-[300px] max-h-[500px] flex flex-col gap-4">
        {messages.length === 0 && !isStreaming && (
          <div className="text-sm text-slate-400 text-center mt-[60px]">
            Messages will appear here as you interact with the agent...
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className="flex gap-2.5">
            {/* Avatar */}
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0',
                msg.role === 'user' ? 'bg-[#6366f1]' : 'bg-[#10b981]',
              )}
            >
              {msg.role === 'user' ? 'U' : 'AI'}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-[13px] text-[#1a1a2e]">
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
                  'mt-1 py-2 px-3 text-[14px] text-[#334155] leading-[1.5] shadow-[0_1px_2px_rgba(0,0,0,0.04)] whitespace-pre-wrap break-words',
                  msg.role === 'user'
                    ? 'bg-[#eef2ff] rounded-[12px_4px_12px_12px]'
                    : 'bg-[#f1f5f9] rounded-[4px_12px_12px_12px]',
                )}
              >
                {msg.content}
                {msg.isStreaming && (
                  <span className="inline-block animate-pulse ml-0.5 text-blue-500">▊</span>
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

        {/* Active tool calls */}
        {activeToolCalls.length > 0 && (
          <div className="flex gap-2.5">
            <div className={AI_AVATAR}>AI</div>
            <div className="flex-1 flex flex-col gap-1">
              {activeToolCalls.map((tc) => (
                <ToolCallRenderer key={tc.id} toolCall={tc} />
              ))}
            </div>
          </div>
        )}

        {/* Live streaming text (in-progress assistant turn, not yet in messages) */}
        {streamingText && !messages.some((m) => m.isStreaming) && (
          <div className="flex gap-2.5">
            <div className={AI_AVATAR}>AI</div>
            <div className="flex-1 mt-1 py-2 px-3 bg-[#f1f5f9] rounded-[4px_12px_12px_12px] text-[14px] text-[#334155] leading-[1.5] whitespace-pre-wrap break-words">
              {streamingText}
              <span className="inline-block animate-pulse ml-0.5 text-blue-500">▊</span>
            </div>
          </div>
        )}

        {/* Typing indicator */}
        {isStreaming && activeToolCalls.length === 0 && !streamingText && messages.length > 0 && !messages[messages.length - 1]?.isStreaming && (
          <div className="flex items-center gap-2 py-1">
            <div className="flex gap-[3px] py-1.5 px-3 bg-[#f1f5f9] rounded-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:300ms]" />
            </div>
            <span className="text-[12px] text-[#64748b]">Agent is thinking...</span>
          </div>
        )}
      </div>

      {/* Error banner */}
      {error && (
        <div className="px-4 py-2 bg-red-50 border-t border-red-100 text-xs text-red-700">
          {error}
        </div>
      )}

      {/* Input */}
      <div className="flex items-center gap-2 p-3 border-t border-slate-200 bg-slate-50/50">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={isStreaming}
          placeholder={isStreaming ? 'Waiting for response...' : placeholder}
          className={cn(
            'flex-1 text-sm px-3 py-2.5 border border-slate-200 rounded-lg outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all bg-white',
            isStreaming && 'bg-slate-50 text-slate-400',
          )}
        />
        {isStreaming && onCancel ? (
          <button
            onClick={onCancel}
            className="text-sm px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
          >
            Stop
          </button>
        ) : (
          <button
            onClick={handleSend}
            disabled={!input.trim() || isStreaming}
            className={cn(
              'text-sm px-4 py-2.5 rounded-lg transition-colors font-medium',
              !input.trim() || isStreaming
                ? 'bg-slate-100 text-slate-400 cursor-default'
                : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer',
            )}
          >
            Send
          </button>
        )}
      </div>
    </div>
  );
}
