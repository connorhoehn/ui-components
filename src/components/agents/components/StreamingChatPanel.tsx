import { useState, useRef, useEffect } from 'react';
import { cn } from '../../../lib/cn';
import type { AgUiMessage, AgUiToolCall } from '../../../types/agents';
import { ToolCallRenderer } from './ToolCallRenderer';

interface StreamingChatPanelProps {
  messages: AgUiMessage[];
  isStreaming: boolean;
  currentToolCall: AgUiToolCall | null;
  error: string | null;
  onSend: (content: string) => void;
  onCancel?: () => void;
  placeholder?: string;
  className?: string;
}

function formatTime(iso: string): string {
  try {
    const d = new Date(iso);
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  } catch {
    return '';
  }
}

export function StreamingChatPanel({
  messages,
  isStreaming,
  currentToolCall,
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
  }, [messages, currentToolCall]);

  function handleSend() {
    const content = input.trim();
    if (!content || isStreaming) return;
    onSend(content);
    setInput('');
  }

  return (
    <div className={cn('flex flex-col border border-slate-200 rounded-lg bg-white overflow-hidden', className)}>
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px] max-h-[500px]">
        {messages.length === 0 && !isStreaming && (
          <div className="text-sm text-slate-400 text-center py-8">
            No messages yet. Send a prompt to invoke the agent.
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={cn('flex flex-col', msg.role === 'user' ? 'items-end' : 'items-start')}>
            <div
              className={cn(
                'max-w-[80%] rounded-lg px-3 py-2 text-sm',
                msg.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-800',
              )}
            >
              <div className="whitespace-pre-wrap">{msg.content}</div>
              {msg.isStreaming && (
                <span className="inline-block animate-pulse ml-0.5">▊</span>
              )}
            </div>

            {msg.toolCalls.length > 0 && (
              <div className="mt-1 max-w-[80%] space-y-1">
                {msg.toolCalls.map((tc) => (
                  <ToolCallRenderer key={tc.id} toolCall={tc} />
                ))}
              </div>
            )}

            <span className="text-[10px] text-slate-400 mt-0.5 px-1">
              {formatTime(msg.timestamp)}
            </span>
          </div>
        ))}

        {currentToolCall && (
          <div className="flex items-start">
            <ToolCallRenderer toolCall={currentToolCall} />
          </div>
        )}
      </div>

      {/* Error banner */}
      {error && (
        <div className="px-4 py-2 bg-red-50 border-t border-red-100 text-xs text-red-700">
          {error}
        </div>
      )}

      {/* Streaming indicator */}
      {isStreaming && !currentToolCall && (
        <div className="px-4 py-1 text-xs text-slate-400 border-t border-slate-100">
          <span className="animate-pulse">Agent is responding...</span>
        </div>
      )}

      {/* Input */}
      <div className="flex items-center gap-2 p-3 border-t border-slate-200">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={isStreaming}
          placeholder={isStreaming ? 'Waiting for response...' : placeholder}
          className={cn(
            'flex-1 text-sm px-3 py-2 border border-slate-200 rounded-md outline-none focus:border-blue-400 transition-colors',
            isStreaming && 'bg-slate-50 text-slate-400',
          )}
        />
        {isStreaming && onCancel ? (
          <button
            onClick={onCancel}
            className="text-sm px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Stop
          </button>
        ) : (
          <button
            onClick={handleSend}
            disabled={!input.trim() || isStreaming}
            className={cn(
              'text-sm px-3 py-2 rounded-md transition-colors',
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
