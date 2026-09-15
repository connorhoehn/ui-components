// ConversationStart — what a document (or any subject) offers when it has no
// conversation yet.
//
// The alternative was a paragraph: "a page picks up a conversation from the
// room it is opened in — join a room and its chat appears here". True, and
// useless: the reader is looking at the page NOW, and the paragraph sent them
// away to make a room somewhere else. There are three things a person actually
// wants to do at this point, and each is a control here:
//
//   * start a conversation about this thing — a new room, named after it;
//   * add it to a conversation that already exists — a room the team is in;
//   * send it to someone — it lands in that person's chat.
//
// The host decides what each does (which rooms, which people, what "start"
// creates). This only lays them out, in that order, and says what will happen.

import type { ReactNode } from 'react';
import EmptyState from '../shared/EmptyState';
import Banner from '../shared/Banner';
import { Button } from '../ui/Button';
import { DropdownMenu } from '../shared/DropdownMenu';
import { Inline, Stack } from '../ui/Stack';

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
  /** Present, the primary control: make a new conversation about this. */
  onStart?: () => void;
  /** Default "Start a conversation". */
  startLabel?: string;
  /** Conversations that already exist. Empty: the control is disabled, not hidden — it still says the choice exists. */
  rooms?: readonly ConversationStartDestination[];
  onAddToRoom?: (id: string) => void;
  /** People it could be sent to. */
  people?: readonly ConversationStartDestination[];
  onShareWith?: (id: string) => void;
  /** Something is in flight — every control waits. */
  busy?: boolean;
  /** What the last attempt did, above the controls. */
  receipt?: ConversationStartReceipt | null;
  'data-testid'?: string;
}

function ChatGlyph() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-text-tertiary">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M8 9h8M8 13h5" />
    </svg>
  );
}

const TRIGGER =
  'h-8 rounded-md border border-border bg-surface px-3 text-[13px] font-medium text-text-primary hover:bg-surface-hover';

export function ConversationStart({
  title = 'No conversation yet',
  body = 'Start one about this page, add the page to a room your team is in, or send it to someone. Whatever you choose shows up here.',
  onStart,
  startLabel = 'Start a conversation',
  rooms = [],
  onAddToRoom,
  people = [],
  onShareWith,
  busy = false,
  receipt = null,
  'data-testid': testId = 'conversation-start',
}: ConversationStartProps) {
  const roomsMenu = rooms.length > 0 && onAddToRoom && !busy;
  const peopleMenu = people.length > 0 && onShareWith && !busy;
  return (
    <Stack gap="sm" className="min-h-0 flex-1 justify-center p-4" data-testid={testId}>
      {receipt && (
        <Banner variant={receipt.tone} layout="stacked" data-testid={`${testId}-receipt`}>
          {receipt.text}
          {receipt.actionLabel && receipt.onAction && (
            <Button variant="ghost" size="sm" className="ml-2" onClick={receipt.onAction} data-testid={`${testId}-receipt-action`}>
              {receipt.actionLabel}
            </Button>
          )}
        </Banner>
      )}
      <EmptyState
        icon={<ChatGlyph />}
        title={title}
        body={body}
        size="sm"
        testId={`${testId}-empty`}
        action={
          <Inline gap="sm" justify="center">
            {onStart && (
              <Button variant="primary" size="sm" onClick={onStart} disabled={busy} data-testid={`${testId}-start`}>
                {startLabel}
              </Button>
            )}
            {roomsMenu ? (
              <DropdownMenu
                trigger={<span>Add to a room</span>}
                triggerLabel="Add to a room"
                triggerClassName={TRIGGER}
                sections={[{ label: 'Rooms', items: rooms.map((r) => ({ label: r.label, icon: r.icon, onSelect: () => onAddToRoom(r.id) })) }]}
                data-testid={`${testId}-rooms`}
              />
            ) : (
              <Button variant="secondary" size="sm" disabled title={rooms.length === 0 ? 'No rooms yet' : undefined} data-testid={`${testId}-rooms-disabled`}>
                Add to a room
              </Button>
            )}
            {peopleMenu ? (
              <DropdownMenu
                trigger={<span>Send to someone</span>}
                triggerLabel="Send to someone"
                triggerClassName={TRIGGER}
                sections={[{ label: 'People', items: people.map((p) => ({ label: p.label, icon: p.icon, onSelect: () => onShareWith(p.id) })) }]}
                data-testid={`${testId}-people`}
              />
            ) : (
              <Button variant="secondary" size="sm" disabled title={people.length === 0 ? 'Nobody to send to yet' : undefined} data-testid={`${testId}-people-disabled`}>
                Send to someone
              </Button>
            )}
          </Inline>
        }
      />
    </Stack>
  );
}

export default ConversationStart;
