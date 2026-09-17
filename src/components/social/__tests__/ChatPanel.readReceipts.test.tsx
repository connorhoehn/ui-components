import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ChatPanel } from '../ChatPanel';
import type { ChatMessage } from '../../../hooks/useChat';

afterEach(cleanup);

// A receipt is a CURSOR per person per channel, not a row per message: an
// entry says how far somebody has read, so "did Carol see this message" is
// `readAt >= message.timestamp` and nothing finer exists. These tests pin the
// two things that fall out of that — one line under the viewer's newest
// message rather than a marker on every message, and a count that means what
// it says.

const VIEWER = 'bob';

function msg(id: string, extra: Partial<ChatMessage> = {}): ChatMessage {
  return {
    id,
    clientId: `client-${id}`,
    userId: 'carol',
    displayName: 'Carol',
    content: `message ${id}`,
    timestamp: `2026-09-16T09:${id.replace(/\D/g, '').padStart(2, '0')}:00.000Z`,
    ...extra,
  } as ChatMessage;
}

/** One of the viewer's own messages. */
function mine(id: string, extra: Partial<ChatMessage> = {}): ChatMessage {
  return msg(id, { userId: VIEWER, displayName: 'Bob', ...extra });
}

function line(): HTMLElement | null {
  return screen.queryByTestId('chat-read-receipts');
}

/** The words actually painted, without the visually-hidden reader names. */
function copy(): string {
  return screen.getByTestId('chat-read-receipts-label').textContent ?? '';
}

describe('ChatPanel read receipts', () => {
  it('renders nothing at all when no receipts are supplied', () => {
    render(
      <ChatPanel messages={[mine('m1'), msg('m2')]} onSend={vi.fn()} currentUserId={VIEWER} />,
    );
    expect(line()).toBeNull();
  });

  // Nobody has read it yet, and the line still says something true: the
  // message left. NEVER "Seen by 0" — a count of nobody turns every unanswered
  // message into a small notice about being ignored, which is why this said
  // nothing at all before. "Sent" is a fact about delivery rather than about
  // being ignored, and it is the half of the pair that answers "did that
  // send?", which is the question a sender has in exactly this window.
  it('says the message was sent when no cursor has reached it yet', () => {
    render(
      <ChatPanel
        messages={[mine('m1')]}
        onSend={vi.fn()}
        currentUserId={VIEWER}
        readReceipts={[]}
      />,
    );
    expect(copy()).toBe('Sent');
    expect(copy()).not.toContain('0');
  });

  // The distinction the whole thing rests on: a host that wires receipts
  // passes an array, empty until a cursor moves. A host that has never heard
  // of them passes nothing and gets nothing — the in-call chat supplies a
  // `currentUserId` and no receipts, and must not grow a status line it never
  // asked for.
  it('stays silent for a host that does not wire receipts at all', () => {
    render(<ChatPanel messages={[mine('m1')]} onSend={vi.fn()} currentUserId={VIEWER} />);
    expect(line()).toBeNull();
  });

  // One other person in the conversation, so the number carries no
  // information — there is only one person it could be.
  it('says "Seen", not "Seen by 1", in a two-person conversation', () => {
    render(
      <ChatPanel
        messages={[msg('m1'), mine('m2')]}
        onSend={vi.fn()}
        currentUserId={VIEWER}
        readReceipts={[{ userId: 'carol', displayName: 'Carol', readAt: '2026-09-16T09:03:00.000Z' }]}
      />,
    );
    expect(line()).not.toBeNull();
    expect(copy()).toBe('Seen');
    // The name still reaches a screen reader, which is where "Seen by Carol"
    // belongs — it is redundant on screen in a conversation with one other
    // person in it.
    expect(line()!.textContent).toContain('Seen by Carol');
  });

  it('counts the readers once there is more than one, and never the viewer', () => {
    render(
      <ChatPanel
        messages={[mine('m1'), msg('m2'), msg('m3', { userId: 'dave', displayName: 'Dave' })]}
        onSend={vi.fn()}
        currentUserId={VIEWER}
        readReceipts={[
          { userId: 'carol', displayName: 'Carol', readAt: '2026-09-16T09:05:00.000Z' },
          { userId: 'dave', displayName: 'Dave', readAt: '2026-09-16T09:05:00.000Z' },
          { userId: 'erin', displayName: 'Erin', readAt: '2026-09-16T09:05:00.000Z' },
          // The viewer's own cursor. Reading your own message is not a receipt,
          // and counting it would report four.
          { userId: VIEWER, displayName: 'Bob', readAt: '2026-09-16T09:05:00.000Z' },
        ]}
      />,
    );
    expect(copy()).toBe('Seen by 3');
  });

  // The names are what the avatars stand for, and a group of images says
  // nothing to a screen reader — so they are spelled out on the line.
  it('makes the readers reachable by name', () => {
    render(
      <ChatPanel
        messages={[mine('m1'), msg('m2'), msg('m3', { userId: 'dave', displayName: 'Dave' })]}
        onSend={vi.fn()}
        currentUserId={VIEWER}
        readReceipts={[
          { userId: 'carol', displayName: 'Carol', readAt: '2026-09-16T09:05:00.000Z' },
          { userId: 'dave', displayName: 'Dave', readAt: '2026-09-16T09:05:00.000Z' },
        ]}
      />,
    );
    expect(line()).toHaveAttribute('title', 'Carol, Dave');
    expect(line()!.textContent).toContain('Carol, Dave');
  });

  // The cursor stopped before this message was sent, so this person has NOT
  // seen it — that is the whole of what a cursor can tell us. The line falls
  // back to "Sent" rather than crediting them with a read they have not made.
  it('ignores a reader whose cursor is older than the message', () => {
    render(
      <ChatPanel
        messages={[msg('m1'), mine('m9', { timestamp: '2026-09-16T09:09:00.000Z' })]}
        onSend={vi.fn()}
        currentUserId={VIEWER}
        readReceipts={[
          { userId: 'carol', displayName: 'Carol', readAt: '2026-09-16T09:02:00.000Z' },
        ]}
      />,
    );
    expect(copy()).toBe('Sent');
    expect(line()!.textContent).not.toContain('Carol');
  });

  it('counts only the readers who are actually past the message', () => {
    render(
      <ChatPanel
        messages={[
          msg('m1'),
          msg('m2', { userId: 'dave', displayName: 'Dave' }),
          msg('m3', { userId: 'erin', displayName: 'Erin' }),
          mine('m9', { timestamp: '2026-09-16T09:09:00.000Z' }),
        ]}
        onSend={vi.fn()}
        currentUserId={VIEWER}
        readReceipts={[
          { userId: 'carol', displayName: 'Carol', readAt: '2026-09-16T09:10:00.000Z' },
          { userId: 'dave', displayName: 'Dave', readAt: '2026-09-16T09:11:00.000Z' },
          // Still back at this morning's traffic.
          { userId: 'erin', displayName: 'Erin', readAt: '2026-09-16T09:04:00.000Z' },
        ]}
      />,
    );
    expect(copy()).toBe('Seen by 2');
  });

  // A group where one person has read is genuinely "Seen by 1": the number is
  // news there, because the others have not.
  it('keeps the number in a group even at one reader', () => {
    render(
      <ChatPanel
        messages={[
          msg('m1'),
          msg('m2', { userId: 'dave', displayName: 'Dave' }),
          mine('m3'),
        ]}
        onSend={vi.fn()}
        currentUserId={VIEWER}
        readReceipts={[
          { userId: 'carol', displayName: 'Carol', readAt: '2026-09-16T09:05:00.000Z' },
        ]}
      />,
    );
    expect(copy()).toBe('Seen by 1');
  });

  // Off is a privacy decision the server made, not a loading state. A greyed
  // hint or an explanation is itself a signal that reading is tracked
  // somewhere; a channel with receipts off looks like one that never had them.
  it('renders nothing when the server does not keep receipts here', () => {
    render(
      <ChatPanel
        messages={[msg('m1'), mine('m2')]}
        onSend={vi.fn()}
        currentUserId={VIEWER}
        readReceiptsEnabled={false}
        readReceipts={[
          { userId: 'carol', displayName: 'Carol', readAt: '2026-09-16T09:05:00.000Z' },
        ]}
      />,
    );
    expect(line()).toBeNull();
  });

  // One line under the newest thing you said, not a marker beside forty
  // messages repeating a single fact.
  it('attaches to the viewer last message and to no earlier one', () => {
    render(
      <ChatPanel
        messages={[mine('m1'), msg('m2'), mine('m3')]}
        onSend={vi.fn()}
        currentUserId={VIEWER}
        readReceipts={[
          { userId: 'carol', displayName: 'Carol', readAt: '2026-09-16T09:05:00.000Z' },
        ]}
      />,
    );
    const all = screen.getAllByTestId('chat-read-receipts');
    expect(all).toHaveLength(1);
    expect(all[0].previousElementSibling).toHaveAttribute('data-message-id', 'm3');
  });

  it('never attaches to somebody else message', () => {
    render(
      <ChatPanel
        messages={[mine('m1'), msg('m2')]}
        onSend={vi.fn()}
        currentUserId={VIEWER}
        readReceipts={[
          { userId: 'carol', displayName: 'Carol', readAt: '2026-09-16T09:05:00.000Z' },
        ]}
      />,
    );
    expect(line()!.previousElementSibling).toHaveAttribute('data-message-id', 'm1');
  });

  // Without a viewer id "which of these are mine" is unanswerable, and a
  // receipt under a message that might not be yours is worse than none.
  it('renders nothing when there is no viewer', () => {
    render(
      <ChatPanel
        messages={[mine('m1')]}
        onSend={vi.fn()}
        readReceipts={[
          { userId: 'carol', displayName: 'Carol', readAt: '2026-09-16T09:05:00.000Z' },
        ]}
      />,
    );
    expect(line()).toBeNull();
  });

  // Threading puts a thread at its ROOT's position, so the viewer's newest
  // message can render inside a rail partway up the pane. The line follows the
  // message, not the layout.
  it('follows the newest own message into its thread', () => {
    const root = msg('m1');
    const reply = mine('m4', {
      timestamp: '2026-09-16T09:04:00.000Z',
      metadata: { replyTo: { messageId: 'm1', author: 'Carol', text: 'message m1' } },
    });
    const later = msg('m5', {
      userId: 'dave',
      displayName: 'Dave',
      timestamp: '2026-09-16T09:05:00.000Z',
    });
    render(
      <ChatPanel
        messages={[root, reply, later]}
        onSend={vi.fn()}
        threaded
        alignOwnMessages={false}
        currentUserId={VIEWER}
        readReceipts={[
          { userId: 'carol', displayName: 'Carol', readAt: '2026-09-16T09:06:00.000Z' },
        ]}
      />,
    );
    const all = screen.getAllByTestId('chat-read-receipts');
    expect(all).toHaveLength(1);
    expect(all[0].previousElementSibling).toHaveAttribute('data-message-id', 'm4');
    // Inside the thread's rail, where the reply itself sits.
    expect(all[0].closest('[data-testid="chat-thread-replies"]')).not.toBeNull();
  });
});
