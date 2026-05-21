import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { ThinkingDots } from './ThinkingDots';
import { ToolCallStrip } from './ToolCallStrip';

export interface ToolCallItem {
  id: string;
  name: string;
  done: boolean;
  args?: string;
}

export interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  toolCalls?: ToolCallItem[];
  /** shows ThinkingDots when content is empty */
  streaming?: boolean;
  /** label shown for assistant (default 'Assistant') */
  agentName?: string;
  /** label shown for user (default 'You') */
  userName?: string;
  /** inject markdown renderer */
  renderMarkdown?: (content: string) => ReactNode;
  className?: string;
}

/**
 * A chat message bubble for user/assistant messages.
 *
 * Stateless — accepts content + tool calls as props. Renders a role label,
 * an optional tool-call strip, and the message body (markdown for assistants
 * when `renderMarkdown` is supplied, plain `whitespace-pre-wrap` otherwise).
 */
export function MessageBubble({
  role,
  content,
  toolCalls,
  streaming = false,
  agentName,
  userName,
  renderMarkdown,
  className,
}: MessageBubbleProps) {
  const label = role === 'user' ? userName || 'You' : agentName || 'Assistant';

  return (
    <div className={cn('flex flex-col gap-1.5 py-3', className)}>
      <div className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">
        {label}
      </div>

      {toolCalls && toolCalls.length > 0 && <ToolCallStrip toolCalls={toolCalls} />}

      {role === 'user' ? (
        <div className="text-sm text-[var(--color-text-primary)] whitespace-pre-wrap">
          {content}
        </div>
      ) : (
        <div className="text-sm text-[var(--color-text-primary)] prose-sm max-w-none">
          {content ? (
            renderMarkdown ? (
              renderMarkdown(content)
            ) : (
              <span className="whitespace-pre-wrap">{content}</span>
            )
          ) : streaming ? (
            <ThinkingDots />
          ) : null}
        </div>
      )}
    </div>
  );
}
