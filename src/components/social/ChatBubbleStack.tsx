// ui-components/src/components/social/ChatBubbleStack.tsx
//
// New messages, as bubbles in the corner — for a surface where the
// conversation is closed but still yours.
//
// A reader on a document with the room's chat folded away should not need
// the panel open to know someone spoke. Each new message from someone else
// surfaces here, bottom-right, briefly: who, and what they said; a click
// opens the conversation. It is not a toast (a toast is the app telling you
// something happened) and not the panel (which is the conversation itself);
// it is the glance in between, the way a phone shows a message on the lock
// screen.

import { useEffect } from 'react';
import { cn } from '../../lib/cn';
import { Avatar } from '../shared/Avatar';

export interface ChatBubble {
  id: string;
  author: string;
  avatarUrl?: string;
  color?: string;
  /** Plain text. The host strips markup; this component never renders HTML. */
  text: string;
  /** Where it came from — the room — for the small caption. */
  channelLabel?: string;
}

export interface ChatBubbleStackProps {
  bubbles: ChatBubble[];
  /** The reader clicked a bubble: open the conversation there. */
  onOpen: (id: string) => void;
  /** A bubble timed out or was dismissed. */
  onDismiss: (id: string) => void;
  /** How long a bubble stays. Default 8 s. */
  dismissAfterMs?: number;
  /** At most this many on screen; older ones go first. Default 3. */
  max?: number;
  className?: string;
  'data-testid'?: string;
}

function Bubble({ bubble, onOpen, onDismiss, dismissAfterMs }: { bubble: ChatBubble; onOpen: () => void; onDismiss: () => void; dismissAfterMs: number }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, dismissAfterMs);
    return () => clearTimeout(t);
    // The timer belongs to the bubble, not to the handler's identity.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bubble.id, dismissAfterMs]);
  return (
    <div
      role="status"
      className="pointer-events-auto flex w-80 max-w-[calc(100vw-2rem)] items-start gap-2.5 rounded-xl border border-border bg-surface p-3 shadow-lg"
      data-testid="chat-bubble"
      data-bubble-id={bubble.id}
    >
      <button
        type="button"
        className="flex min-w-0 flex-1 items-start gap-2.5 border-none bg-transparent p-0 text-left cursor-pointer"
        onClick={onOpen}
        aria-label={`Open the conversation: ${bubble.author} said ${bubble.text}`}
      >
        <Avatar name={bubble.author} size={28} {...(bubble.avatarUrl ? { src: bubble.avatarUrl } : {})} {...(bubble.color ? { color: bubble.color } : {})} />
        <span className="min-w-0 flex-1">
          <span className="flex items-baseline gap-1.5">
            <span className="truncate text-[12px] font-semibold text-text-primary">{bubble.author}</span>
            {bubble.channelLabel && <span className="truncate text-[11px] text-text-tertiary">{bubble.channelLabel}</span>}
          </span>
          <span className="line-clamp-3 text-[13px] leading-snug text-text-primary">{bubble.text}</span>
        </span>
      </button>
      <button
        type="button"
        className="shrink-0 border-none bg-transparent p-0.5 text-text-tertiary hover:text-text-primary cursor-pointer"
        aria-label="Dismiss"
        onClick={onDismiss}
        data-testid="chat-bubble-dismiss"
      >
        ✕
      </button>
    </div>
  );
}

export function ChatBubbleStack({
  bubbles,
  onOpen,
  onDismiss,
  dismissAfterMs = 8000,
  max = 3,
  className,
  'data-testid': testId = 'chat-bubble-stack',
}: ChatBubbleStackProps) {
  const shown = bubbles.slice(-max);
  if (shown.length === 0) return null;
  return (
    <div
      className={cn('pointer-events-none fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-2', className)}
      data-testid={testId}
      aria-live="polite"
    >
      {shown.map((b) => (
        <Bubble key={b.id} bubble={b} dismissAfterMs={dismissAfterMs} onOpen={() => onOpen(b.id)} onDismiss={() => onDismiss(b.id)} />
      ))}
    </div>
  );
}

export default ChatBubbleStack;
