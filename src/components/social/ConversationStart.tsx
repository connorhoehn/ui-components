// ConversationStart — what a document (or any subject) offers when it has no
// conversation yet.
//
// The alternative was a paragraph: "a page picks up a conversation from the
// room it is opened in — join a room and its chat appears here". True, and
// useless: the reader is looking at the page NOW, and the paragraph sent them
// away to make a room somewhere else. There are three things a person actually
// wants to do at this point, and each is a row here:
//
//   * start a conversation about this thing — a new room, named after it;
//   * add it to a conversation that already exists — a room the team is in;
//   * send it to someone — it lands in that person's chat.
//
// Built for a narrow column: the intro is pinned to the top rather than
// floated in the middle of the void, the receipt sits in flow under it, and
// the rooms and people open IN PLACE under their row (a `ChoiceList`), with a
// search once the list is long enough to need one.
//
// The host decides what each does (which rooms, which people, what "start"
// creates). This only lays them out, in that order, and says what will happen.

import { useMemo, useState, type ReactNode } from 'react';
import Banner from '../shared/Banner';
import { Button } from '../ui/Button';
import { Avatar } from '../shared/Avatar';
import SearchInput from '../shared/SearchInput';
import InlinePlaceholder from '../shared/InlinePlaceholder';
import { ChoiceList, ChoiceOption, ChoiceRow } from '../shared/ChoiceList';
import { Stack } from '../ui/Stack';

export interface ConversationStartDestination {
  /** The host's key for the destination — a channel, a user id. */
  id: string;
  /** What to call it: `#design`, `Hank Anderson`. */
  label: string;
  icon?: ReactNode;
}

export interface ConversationStartReceipt {
  tone: 'success' | 'error';
  text: string;
  /** An optional way onward — "Open the chat" after sending to a person. */
  actionLabel?: string;
  onAction?: () => void;
}

export interface ConversationStartProps {
  /** Default "No conversation yet". */
  title?: string;
  /** Default names the three choices. */
  body?: string;
  /** Present, the first row: make a new conversation about this. */
  onStart?: () => void;
  /** Default "Start a conversation". */
  startLabel?: string;
  /** What starting makes. Default "A new room, named after this page". */
  startDescription?: string;
  /** Conversations that already exist. Empty: the row is disabled, not hidden — it still says the choice exists. */
  rooms?: readonly ConversationStartDestination[];
  onAddToRoom?: (id: string) => void;
  /** People it could be sent to. */
  people?: readonly ConversationStartDestination[];
  onShareWith?: (id: string) => void;
  /** Something is in flight — every row waits. */
  busy?: boolean;
  /** What the last attempt did, under the intro. */
  receipt?: ConversationStartReceipt | null;
  /** Lists longer than this get a search box. Default 6. */
  searchAbove?: number;
  'data-testid'?: string;
}

function Glyph({ d }: { d: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}
const NEW = 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2zM12 8v6M9 11h6';
const ROOM = 'M4 4h16v12H8l-4 4zM9 9h6M9 12h4';
const SEND = 'M22 2 11 13M22 2l-7 20-4-9-9-4z';

/** The targets under an open row, with a search once there are enough to lose one in. */
function Targets({
  items,
  onPick,
  disabled,
  searchAbove,
  kind,
  testId,
}: {
  items: readonly ConversationStartDestination[];
  onPick: (id: string) => void;
  disabled: boolean;
  searchAbove: number;
  kind: 'room' | 'person';
  testId: string;
}) {
  const [query, setQuery] = useState('');
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((i) => i.label.toLowerCase().includes(q)) : items;
  }, [items, query]);
  return (
    <Stack gap="none">
      {items.length > searchAbove && (
        <div className="px-4 pb-1 pt-2">
          <SearchInput value={query} onChange={setQuery} placeholder={kind === 'room' ? 'Find a room' : 'Find a person'} data-testid={`${testId}-search`} />
        </div>
      )}
      {shown.length === 0 ? (
        <InlinePlaceholder data-testid={`${testId}-none`}>Nothing matches “{query.trim()}”.</InlinePlaceholder>
      ) : (
        shown.map((i) => (
          <ChoiceOption
            key={i.id}
            label={i.label}
            icon={i.icon ?? (kind === 'person' ? <Avatar name={i.label} size={20} /> : undefined)}
            onSelect={() => onPick(i.id)}
            disabled={disabled}
            data-testid={`${testId}-option`}
          />
        ))
      )}
    </Stack>
  );
}

export function ConversationStart({
  title = 'No conversation yet',
  body = 'Whichever you choose, the conversation shows up here.',
  onStart,
  startLabel = 'Start a conversation',
  startDescription = 'A new room, named after this page',
  rooms = [],
  onAddToRoom,
  people = [],
  onShareWith,
  busy = false,
  receipt = null,
  searchAbove = 6,
  'data-testid': testId = 'conversation-start',
}: ConversationStartProps) {
  return (
    <Stack gap="none" className="min-h-0 flex-1 overflow-y-auto" data-testid={testId}>
      <div className="px-4 pb-3 pt-4">
        <div className="text-[13px] font-semibold text-text-primary">{title}</div>
        <p className="m-0 mt-0.5 text-[12px] leading-snug text-text-secondary">{body}</p>
      </div>
      {receipt && (
        <div className="px-4 pb-3">
          <Banner variant={receipt.tone} layout="stacked" data-testid={`${testId}-receipt`}>
            <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>{receipt.text}</span>
              {receipt.actionLabel && receipt.onAction && (
                <Button variant="ghost" size="sm" onClick={receipt.onAction} data-testid={`${testId}-receipt-action`}>
                  {receipt.actionLabel}
                </Button>
              )}
            </span>
          </Banner>
        </div>
      )}
      <ChoiceList data-testid={`${testId}-choices`}>
        {onStart && (
          <ChoiceRow
            icon={<Glyph d={NEW} />}
            title={startLabel}
            description={startDescription}
            onSelect={onStart}
            busy={busy}
            data-testid={`${testId}-start`}
          />
        )}
        {onAddToRoom && (
          <ChoiceRow
            icon={<Glyph d={ROOM} />}
            title="Add to a room"
            description={rooms.length === 0 ? 'No rooms yet' : `${rooms.length} room${rooms.length === 1 ? '' : 's'} your team is in`}
            disabled={rooms.length === 0}
            disabledReason="There are no rooms to add it to yet"
            busy={busy}
            data-testid={`${testId}-rooms`}
          >
            <Targets items={rooms} onPick={onAddToRoom} disabled={busy} searchAbove={searchAbove} kind="room" testId={`${testId}-rooms`} />
          </ChoiceRow>
        )}
        {onShareWith && (
          <ChoiceRow
            icon={<Glyph d={SEND} />}
            title="Send to someone"
            description={people.length === 0 ? 'Nobody to send to yet' : 'It lands in their chat'}
            disabled={people.length === 0}
            disabledReason="There is nobody to send it to yet"
            busy={busy}
            data-testid={`${testId}-people`}
          >
            <Targets items={people} onPick={onShareWith} disabled={busy} searchAbove={searchAbove} kind="person" testId={`${testId}-people`} />
          </ChoiceRow>
        )}
      </ChoiceList>
    </Stack>
  );
}

export default ConversationStart;
