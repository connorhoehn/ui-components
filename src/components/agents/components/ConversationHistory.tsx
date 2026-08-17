import { cn } from '../../../lib/cn';
import type { AgUiSession, AgUiMessage } from '../../../types/agents';

export interface ConversationHistoryProps {
  sessions: AgUiSession[];
  /** Active thread (highlighted). */
  activeThreadId?: string | null;
  onResume?: (session: AgUiSession) => void;
  onDelete?: (session: AgUiSession) => void;
  emptyMessage?: string;
  className?: string;
}

function deriveTitle(messages: AgUiMessage[]): string {
  const firstUser = messages.find((m) => m.role === 'user' && m.content.trim().length > 0);
  if (firstUser) {
    const text = firstUser.content.trim().replace(/\s+/g, ' ');
    return text.length > 80 ? `${text.slice(0, 77)}…` : text;
  }
  return 'New conversation';
}

function deriveSnippet(messages: AgUiMessage[]): string | null {
  const lastAssistant = [...messages].reverse().find(
    (m) => m.role === 'assistant' && m.content.trim().length > 0,
  );
  if (!lastAssistant) return null;
  const text = lastAssistant.content.trim().replace(/\s+/g, ' ');
  return text.length > 120 ? `${text.slice(0, 117)}…` : text;
}

export function ConversationHistory({
  sessions,
  activeThreadId = null,
  onResume,
  onDelete,
  emptyMessage = 'No prior conversations.',
  className,
}: ConversationHistoryProps) {
  if (sessions.length === 0) {
    return (
      <div
        className={cn(
          'rounded-md border border-dashed border-border-emphasis bg-surface-panel px-4 py-6 text-center text-sm text-neutral',
          className,
        )}
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <ul className={cn('flex flex-col gap-1', className)} aria-label="Prior conversations">
      {sessions.map((session) => {
        const isActive = activeThreadId === session.threadId;
        const title = deriveTitle(session.messages);
        const snippet = deriveSnippet(session.messages);
        return (
          <li
            key={session.threadId}
            className={cn(
              'group flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors',
              isActive
                ? 'border-info bg-info-bg/60'
                : 'border-border bg-white hover:border-border-emphasis hover:bg-surface-panel',
            )}
          >
            <button
              type="button"
              onClick={onResume ? () => onResume(session) : undefined}
              disabled={!onResume}
              className="flex min-w-0 flex-1 flex-col items-start gap-0.5 text-left disabled:cursor-default"
            >
              <span className="w-full truncate font-medium text-text-primary">{title}</span>
              {snippet && (
                <span className="w-full truncate text-xs text-neutral">{snippet}</span>
              )}
              <span className="text-[10px] uppercase tracking-wide text-text-tertiary">
                {session.messages.length} msg{session.messages.length === 1 ? '' : 's'}
              </span>
            </button>
            {onDelete && (
              <button
                type="button"
                onClick={() => onDelete(session)}
                aria-label={`Delete conversation ${title}`}
                className="shrink-0 rounded-md px-2 py-1 text-xs text-neutral opacity-0 hover:bg-surface-hover hover:text-danger-fg focus:opacity-100 group-hover:opacity-100"
              >
                Delete
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
