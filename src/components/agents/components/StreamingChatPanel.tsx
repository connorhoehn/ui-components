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
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 min-h-[300px] max-h-[500px]" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {messages.length === 0 && !isStreaming && (
          <div className="text-sm text-slate-400 text-center" style={{ marginTop: 60 }}>
            Messages will appear here as you interact with the agent...
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} style={{ display: 'flex', gap: 10 }}>
            {/* Avatar */}
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: msg.role === 'user' ? '#6366f1' : '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: 11,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {msg.role === 'user' ? 'U' : 'AI'}
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontWeight: 600, fontSize: 13, color: '#1a1a2e' }}>
                  {msg.role === 'user' ? 'You' : 'Agent'}
                </span>
                <span style={{ fontSize: 11, color: '#94a3b8' }}>
                  {formatTime(msg.timestamp)}
                </span>
              </div>
              <div
                style={{
                  marginTop: 4,
                  padding: '8px 12px',
                  background: msg.role === 'user' ? '#eef2ff' : '#f1f5f9',
                  borderRadius: msg.role === 'user' ? '12px 4px 12px 12px' : '4px 12px 12px 12px',
                  fontSize: 14,
                  color: '#334155',
                  lineHeight: 1.5,
                  boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {msg.content}
                {msg.isStreaming && (
                  <span className="inline-block animate-pulse ml-0.5 text-blue-500">▊</span>
                )}
              </div>

              {/* Tool calls */}
              {msg.toolCalls.length > 0 && (
                <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {msg.toolCalls.map((tc) => (
                    <ToolCallRenderer key={tc.id} toolCall={tc} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Active tool call */}
        {currentToolCall && (
          <div style={{ display: 'flex', gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: 11,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              AI
            </div>
            <div style={{ flex: 1 }}>
              <ToolCallRenderer toolCall={currentToolCall} />
            </div>
          </div>
        )}

        {/* Typing indicator */}
        {isStreaming && !currentToolCall && messages.length > 0 && !messages[messages.length - 1]?.isStreaming && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }}>
            <div
              style={{
                display: 'flex',
                gap: 3,
                padding: '6px 12px',
                background: '#f1f5f9',
                borderRadius: 12,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span style={{ fontSize: 12, color: '#64748b' }}>Agent is thinking...</span>
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
