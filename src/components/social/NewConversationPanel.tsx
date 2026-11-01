// NewConversationPanel — one way to start a conversation.
//
// ## What this replaces
//
// Two stacked forms: a "Room name / Create" box and a separate "friends"
// dropdown with "Open DM". Both were always visible, both were half-disabled
// most of the time ("No mutual friends yet" above a dead button), and the user
// had to know in advance which KIND of thing they wanted before they could type
// anything. That is backwards — you know who or what you want to talk to; the
// kind is a consequence.
//
// So: one field. Type a name and you get people. Type something that matches
// nobody and you can make a channel of it. This is how Slack's ⌘K and Teams'
// new-chat box work, and it collapses two half-broken forms into one that is
// useful from the first keystroke.
//
// ## Why creating a channel is the LAST row, not a mode
//
// Offering "create channel" as a peer of the search results — rather than a
// separate button or tab — means the common case (talk to a person who already
// exists) is never a click away behind a mode switch, and the rare case is
// still one keystroke from reachable. It also disappears when the query is
// empty, because "create a channel called nothing" is not an offer.

import { useMemo, useRef, useState } from 'react';
import { cn } from '../../lib/cn';
import { Input } from '../forms/Input';
import { Avatar } from '../shared/Avatar';

export interface NewConversationPerson {
  userId: string;
  displayName: string;
  avatarUrl?: string;
  color?: string;
  /** Secondary line — role, team, or handle. */
  hint?: string;
}

export interface NewConversationPanelProps {
  people: readonly NewConversationPerson[];
  /** Start (or open) a direct conversation with this person. */
  onStartDm: (userId: string) => void | Promise<void>;
  /** Create a channel with this name. Omit to disable channel creation. */
  onCreateChannel?: (name: string) => void | Promise<void>;
  onCancel?: () => void;
  /**
   * Set when the directory fetch FAILED. An empty list and a failed fetch look
   * identical on screen otherwise, and "no one to talk to" is a much stronger
   * claim than "we could not ask".
   */
  peopleError?: string | null;
  busy?: boolean;
  className?: string;
  'data-testid'?: string;
}

/** Channel names are lowercase and hyphenated, like every chat product's. */
export function toChannelName(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64);
}

export function NewConversationPanel({
  people,
  onStartDm,
  onCreateChannel,
  onCancel,
  peopleError = null,
  busy = false,
  className,
  'data-testid': testId = 'new-conversation',
}: NewConversationPanelProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return people;
    return people.filter((p) => p.displayName.toLowerCase().includes(q));
  }, [people, query]);

  const channelName = toChannelName(query);
  // Offered only when it is a real alternative: there is something to name, and
  // channel creation is wired.
  const canCreateChannel = !!onCreateChannel && channelName.length > 0;

  return (
    <div
      data-testid={testId}
      className={cn('flex flex-col gap-1 rounded-lg border border-border bg-surface p-2', className)}
    >
      <div className="flex items-center gap-1.5">
        <Input
          ref={inputRef}
          size="sm"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') onCancel?.();
            if (e.key === 'Enter') {
              // Enter takes the obvious thing: the only matching person, or
              // failing that the channel you have just named.
              if (matches.length === 1) void onStartDm(matches[0].userId);
              else if (matches.length === 0 && canCreateChannel) void onCreateChannel?.(channelName);
            }
          }}
          placeholder="Search people, or name a new channel"
          aria-label="Search people, or name a new channel"
          data-testid={`${testId}-query`}
          disabled={busy}
          className="min-w-0 flex-1"
        />
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            data-testid={`${testId}-cancel`}
            className="rounded px-2 py-1 text-xs text-text-secondary hover:bg-surface-hover"
          >
            Cancel
          </button>
        )}
      </div>

      {peopleError ? (
        <p role="alert" data-testid={`${testId}-error`} className="m-0 px-1 py-1.5 text-xs text-danger-fg">
          Couldn&rsquo;t load people. {peopleError}
        </p>
      ) : (
        <ul className="m-0 flex max-h-64 list-none flex-col gap-0.5 overflow-y-auto p-0">
          {matches.map((p) => (
            <li key={p.userId}>
              <button
                type="button"
                onClick={() => void onStartDm(p.userId)}
                disabled={busy}
                data-testid={`${testId}-person`}
                className="flex w-full items-center gap-2 rounded px-1.5 py-1.5 text-left hover:bg-surface-hover"
              >
                <Avatar name={p.displayName} src={p.avatarUrl} color={p.color} size={26} />
                <span className="flex min-w-0 flex-col">
                  <span className="truncate text-sm text-text-primary">{p.displayName}</span>
                  {p.hint && <span className="truncate text-xs text-text-tertiary">{p.hint}</span>}
                </span>
              </button>
            </li>
          ))}

          {matches.length === 0 && !canCreateChannel && (
            <li className="px-1.5 py-2 text-xs text-text-secondary" data-testid={`${testId}-empty`}>
              {query.trim() ? 'Nobody by that name.' : 'Nobody to talk to yet.'}
            </li>
          )}

          {canCreateChannel && (
            <li>
              <button
                type="button"
                onClick={() => void onCreateChannel?.(channelName)}
                disabled={busy}
                data-testid={`${testId}-create-channel`}
                className="flex w-full items-center gap-2 rounded px-1.5 py-1.5 text-left hover:bg-surface-hover"
              >
                <span
                  aria-hidden
                  className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-lg bg-surface-inset text-sm text-text-secondary"
                >
                  #
                </span>
                <span className="min-w-0 truncate text-sm text-text-primary">
                  Create channel <span className="font-semibold">#{channelName}</span>
                </span>
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

export default NewConversationPanel;
