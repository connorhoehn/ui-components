// The line across the transcript that says where you left off.
//
// The panel already had a floating "N new messages ↓" pill, which answers "is
// there more below the fold". It never answered "where does new BEGIN" — the
// question you actually have when you come back to a channel that moved forty
// messages while you were out. These cover where the line lands, and the
// property that makes it worth having: it does not move while you read.

import { render, screen } from '@testing-library/react';
import { ChatPanel } from '../ChatPanel';
import type { ChatMessage } from '../../../hooks/useChat';

const msg = (over: Partial<ChatMessage> & { id: string; timestamp: string }): ChatMessage => ({
  clientId: 'c-carol',
  content: `content of ${over.id}`,
  displayName: 'Carol Johnson',
  ...over,
});

// One local day, so no day heading lands between any two of these and the
// unread line is the only divider under test. Minutes apart, so they are also
// inside `RUN_WINDOW_MS` and form one run.
const at = (hh: number, mm: number) => new Date(2026, 8, 7, hh, mm).toISOString();

/**
 * The transcript as a reader sees it, top to bottom: message ids with the
 * word NEW where the divider falls.
 *
 * Asserting on ORDER rather than on presence is the point — "a divider
 * rendered" is true for a divider in the wrong place, and the wrong place is
 * the only interesting bug this feature has.
 */
function transcript(container: HTMLElement): string[] {
  const rows = container.querySelectorAll(
    '[data-testid="chat-message"],[data-testid="chat-unread-separator"]',
  );
  return Array.from(rows).map((el) =>
    el.getAttribute('data-testid') === 'chat-unread-separator'
      ? 'NEW'
      : el.getAttribute('data-message-id') ?? '?',
  );
}

const three = [
  msg({ id: 'm1', timestamp: at(9, 0) }),
  msg({ id: 'm2', timestamp: at(9, 1) }),
  msg({ id: 'm3', timestamp: at(9, 2) }),
];

describe('ChatPanel unread boundary — where the line lands', () => {
  it('draws it immediately above the first message at or after the boundary', () => {
    const { container } = render(
      <ChatPanel messages={three} onSend={() => {}} unreadFrom={at(9, 1)} />,
    );
    // Above m2, not above m1 and not above m3.
    expect(transcript(container)).toEqual(['m1', 'NEW', 'm2', 'm3']);
  });

  it('lands above the first message NEWER than a boundary that falls between two', () => {
    const { container } = render(
      // 09:01:30 — after m2, before m3. Nothing is stamped exactly here, so
      // "at or after" has to walk forward to m3 rather than give up.
      <ChatPanel
        messages={three}
        onSend={() => {}}
        unreadFrom={new Date(2026, 8, 7, 9, 1, 30).toISOString()}
      />,
    );
    expect(transcript(container)).toEqual(['m1', 'm2', 'NEW', 'm3']);
  });

  it('renders nothing at all without the prop', () => {
    render(<ChatPanel messages={three} onSend={() => {}} />);
    expect(screen.queryByTestId('chat-unread-separator')).toBeNull();
  });

  it('renders nothing when the boundary is older than every message', () => {
    // Everything is unread, so the line would sit on top of the transcript
    // announcing "all of this is new" to a screen where nothing else is.
    const { container } = render(
      <ChatPanel messages={three} onSend={() => {}} unreadFrom={at(8, 0)} />,
    );
    expect(transcript(container)).toEqual(['m1', 'm2', 'm3']);
  });

  it('renders nothing when the boundary is newer than every message', () => {
    // No unread row to sit above — an empty divider at the foot of the thread.
    const { container } = render(
      <ChatPanel messages={three} onSend={() => {}} unreadFrom={at(23, 0)} />,
    );
    expect(transcript(container)).toEqual(['m1', 'm2', 'm3']);
  });

  it('renders nothing on an empty thread', () => {
    render(<ChatPanel messages={[]} onSend={() => {}} unreadFrom={at(9, 1)} />);
    expect(screen.queryByTestId('chat-unread-separator')).toBeNull();
  });

  it('renders nothing for an unparseable boundary', () => {
    const { container } = render(
      <ChatPanel messages={three} onSend={() => {}} unreadFrom="not-a-timestamp" />,
    );
    expect(transcript(container)).toEqual(['m1', 'm2', 'm3']);
  });

  it('draws exactly one line, however long the unread tail is', () => {
    render(<ChatPanel messages={three} onSend={() => {}} unreadFrom={at(9, 1)} />);
    expect(screen.getAllByTestId('chat-unread-separator')).toHaveLength(1);
  });
});

describe('ChatPanel unread boundary — it does not move while you read', () => {
  it('stays put as new messages arrive', () => {
    const { container, rerender } = render(
      <ChatPanel messages={three} onSend={() => {}} unreadFrom={at(9, 1)} />,
    );
    expect(transcript(container)).toEqual(['m1', 'NEW', 'm2', 'm3']);

    rerender(
      <ChatPanel
        messages={[...three, msg({ id: 'm4', timestamp: at(9, 5) })]}
        onSend={() => {}}
        unreadFrom={at(9, 1)}
      />,
    );
    // Still above m2. The new message joins the unread tail; it does not
    // redraw the boundary under the reader.
    expect(transcript(container)).toEqual(['m1', 'NEW', 'm2', 'm3', 'm4']);
  });

  it('ignores the host advancing the cursor as the channel is marked read', () => {
    const { container, rerender } = render(
      <ChatPanel messages={three} onSend={() => {}} unreadFrom={at(9, 1)} />,
    );
    // This is what every host does a second or two after the panel opens.
    rerender(<ChatPanel messages={three} onSend={() => {}} unreadFrom={at(9, 2)} />);
    expect(transcript(container)).toEqual(['m1', 'NEW', 'm2', 'm3']);
  });

  it('does not vanish when the host stops passing a cursor at all', () => {
    const { container, rerender } = render(
      <ChatPanel messages={three} onSend={() => {}} unreadFrom={at(9, 1)} />,
    );
    rerender(<ChatPanel messages={three} onSend={() => {}} />);
    expect(transcript(container)).toEqual(['m1', 'NEW', 'm2', 'm3']);
  });

  it('adopts a cursor that moves BACKWARDS — that is "Mark as unread"', () => {
    const { container, rerender } = render(
      <ChatPanel messages={three} onSend={() => {}} unreadFrom={at(9, 2)} />,
    );
    expect(transcript(container)).toEqual(['m1', 'm2', 'NEW', 'm3']);
    rerender(<ChatPanel messages={three} onSend={() => {}} unreadFrom={at(9, 1)} />);
    // Marking as unread has no other purpose than to put the line somewhere
    // new, so this one direction is honoured.
    expect(transcript(container)).toEqual(['m1', 'NEW', 'm2', 'm3']);
  });

  it('takes the first DEFINED cursor, not the first render', () => {
    // A host that resolves the read cursor a tick after the messages still
    // gets its line.
    const { container, rerender } = render(<ChatPanel messages={three} onSend={() => {}} />);
    expect(transcript(container)).toEqual(['m1', 'm2', 'm3']);
    rerender(<ChatPanel messages={three} onSend={() => {}} unreadFrom={at(9, 1)} />);
    expect(transcript(container)).toEqual(['m1', 'NEW', 'm2', 'm3']);
  });

  it('follows its own message when older history is prepended', () => {
    const { container, rerender } = render(
      <ChatPanel messages={three} onSend={() => {}} unreadFrom={at(9, 1)} />,
    );
    rerender(
      <ChatPanel
        messages={[msg({ id: 'm0', timestamp: at(8, 30) }), ...three]}
        onSend={() => {}}
        unreadFrom={at(9, 1)}
      />,
    );
    // The row it points at moved down by one, and so did the line. What is
    // held still is the MESSAGE, not the index.
    expect(transcript(container)).toEqual(['m0', 'm1', 'NEW', 'm2', 'm3']);
  });
});

describe('ChatPanel unread boundary — it does not disturb the rows', () => {
  it('breaks a message run the way a day divider does', () => {
    const { container, rerender } = render(<ChatPanel messages={three} onSend={() => {}} />);
    const continues = () =>
      Array.from(container.querySelectorAll('[data-testid="chat-message"]')).map((el) =>
        el.getAttribute('data-continues'),
      );
    // One run of three: m2 and m3 are bare lines under m1's head.
    expect(continues()).toEqual([null, 'true', 'true']);

    rerender(<ChatPanel messages={three} onSend={() => {}} unreadFrom={at(9, 2)} />);
    // m3 sits under the line, so it states who it is from again — a bare line
    // directly below a divider reads as belonging to the divider, and this is
    // the one row the reader is being sent to.
    expect(continues()).toEqual([null, 'true', null]);
    expect(transcript(container)).toEqual(['m1', 'm2', 'NEW', 'm3']);
  });

  it('leaves the day headings alone', () => {
    const { container } = render(
      <ChatPanel
        messages={[
          msg({ id: 'a', timestamp: new Date(2026, 8, 6, 20, 0).toISOString() }),
          msg({ id: 'b', timestamp: new Date(2026, 8, 7, 9, 0).toISOString() }),
        ]}
        onSend={() => {}}
        unreadFrom={new Date(2026, 8, 7, 9, 0).toISOString()}
      />,
    );
    // Both dividers, both once: the date opens the block, the unread line then
    // marks the first message inside it the reader has not seen.
    expect(container.querySelectorAll('[data-testid="chat-day-separator"]')).toHaveLength(2);
    expect(screen.getAllByTestId('chat-unread-separator')).toHaveLength(1);
  });

  it('leaves the "N new messages" pill to its own job', () => {
    // The two answer different questions and neither replaces the other; the
    // pill is driven by scroll position, which jsdom never leaves the top of.
    render(<ChatPanel messages={three} onSend={() => {}} unreadFrom={at(9, 1)} />);
    expect(screen.getByTestId('chat-unread-separator')).toBeTruthy();
  });
});

describe('ChatPanel unread boundary — threaded and dark', () => {
  const threadedMessages = [
    msg({ id: 'root-1', timestamp: at(9, 0) }),
    msg({
      id: 'reply-1',
      timestamp: at(9, 1),
      displayName: 'Dev Hoehn',
      metadata: { replyTo: { messageId: 'root-1' } },
    }),
    msg({ id: 'root-2', timestamp: at(9, 2) }),
  ];

  it('draws the line between two posts in threaded mode', () => {
    const { container } = render(
      <ChatPanel messages={threadedMessages} onSend={() => {}} threaded unreadFrom={at(9, 2)} />,
    );
    // The reply renders inside root-1's rail, so the reader sees the line
    // between the two POSTS — which is where the river's order puts it.
    expect(transcript(container)).toEqual(['root-1', 'reply-1', 'NEW', 'root-2']);
  });

  it('anchors on posts, never inside a thread rail', () => {
    // The boundary falls on the REPLY, which renders inside root-1's rail.
    // Roots are the only anchors — the river's order is root order — so the
    // line goes above the first unseen POST instead of being drawn against a
    // position the river does not have. The same compromise the day headings
    // already make, for the same reason.
    const { container } = render(
      <ChatPanel messages={threadedMessages} onSend={() => {}} threaded unreadFrom={at(9, 1)} />,
    );
    expect(transcript(container)).toEqual(['root-1', 'reply-1', 'NEW', 'root-2']);
    const rail = container.querySelector('[data-testid="chat-thread-replies"]');
    expect(rail?.querySelector('[data-testid="chat-unread-separator"]')).toBeFalsy();
  });

  it('is a named separator rather than an alert', () => {
    render(<ChatPanel messages={three} onSend={() => {}} unreadFrom={at(9, 1)} />);
    const line = screen.getByTestId('chat-unread-separator');
    // A landmark a reader can arrive at...
    expect(line).toHaveAttribute('role', 'separator');
    expect(line).toHaveAttribute('aria-label', 'New messages');
    // ...and never something that speaks on its own. The list around it is
    // `role="log" aria-live="off"`; a live boundary would interrupt whatever
    // was being read to announce a line that has not moved.
    expect(line.getAttribute('aria-live')).toBeNull();
    expect(line.getAttribute('role')).not.toBe('alert');
    expect(line.getAttribute('role')).not.toBe('status');
  });

  it('renders on dark call chrome without the light-surface text tokens', () => {
    render(<ChatPanel messages={three} onSend={() => {}} tone="dark" unreadFrom={at(9, 1)} />);
    const line = screen.getByTestId('chat-unread-separator');
    // `text-text-*` and `--color-primary` are both tuned for a light page and
    // go muddy to invisible over chrome that never lightened with them.
    expect(line.innerHTML).not.toMatch(/text-text-/);
    expect(line.innerHTML).toMatch(/text-white/);
  });
});
