// Two things a transcript owes its reader that this panel did not do:
// say which day a message is from, and say out loud that one arrived.

import { render, screen } from '@testing-library/react';
import { ChatPanel, announcementFor } from '../ChatPanel';
import type { ChatMessage } from '../../../hooks/useChat';

const msg = (over: Partial<ChatMessage> & { timestamp: string }): ChatMessage => ({
  id: over.id ?? `m-${over.timestamp}`,
  clientId: 'c-1',
  content: 'hello',
  displayName: 'Carol Johnson',
  ...over,
});

// Local components, so the day boundary means the same thing everywhere.
const at = (y: number, m: number, d: number, hh: number, mm = 0) =>
  new Date(y, m - 1, d, hh, mm).toISOString();

describe('ChatPanel day separators', () => {
  // The labels are relative to now, so pin now. Without this the suite's
  // meaning drifts with the calendar — it passed on the day it was written
  // and would have read "Sunday" a week later.
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 8, 7, 10, 0)); // Mon 7 Sep 2026, local
  });
  afterEach(() => vi.useRealTimers());

  it('marks the change of day between two messages that both print HH:MM', () => {
    render(
      <ChatPanel
        messages={[
          msg({ timestamp: at(2026, 9, 6, 8, 35), content: 'first' }),
          msg({ timestamp: at(2026, 9, 6, 20, 10), content: 'same day' }),
          msg({ timestamp: at(2026, 9, 7, 3, 30), content: 'next day' }),
        ]}
        onSend={() => {}}
      />,
    );
    const seps = screen.getAllByTestId('chat-day-separator');
    // One for the top of the transcript, one for the new day. NOT one
    // between the two messages twelve hours apart inside one day.
    expect(seps).toHaveLength(2);
    expect(seps.map((s) => s.getAttribute('data-day-label'))).toEqual(['Yesterday', 'Today']);
  });

  it('gives the separator a role and the FULL date as its name', () => {
    render(<ChatPanel messages={[msg({ timestamp: at(2026, 3, 14, 9, 0) })]} onSend={() => {}} />);
    const sep = screen.getByTestId('chat-day-separator');
    expect(sep).toHaveAttribute('role', 'separator');
    // "Today" is fine to read and useless to hear in a saved transcript.
    expect(sep.getAttribute('aria-label')).toMatch(/2026/);
  });

  it('renders no separator at all for an empty thread', () => {
    render(<ChatPanel messages={[]} onSend={() => {}} />);
    expect(screen.queryByTestId('chat-day-separator')).toBeNull();
  });
});

describe('ChatPanel message list semantics', () => {
  it('is a named, focusable region rather than an anonymous scrolling div', () => {
    render(<ChatPanel messages={[msg({ timestamp: at(2026, 9, 8, 9, 0) })]} onSend={() => {}} />);
    const list = screen.getByTestId('chat-panel-messages');
    expect(list).toHaveAttribute('role', 'log');
    expect(list).toHaveAttribute('aria-label', 'Message history');
    // Without this the transcript was not among the page's tab stops at all —
    // no way to scroll back through it without a pointer.
    expect(list).toHaveAttribute('tabindex', '0');
    // Explicitly off: role=log is implicitly polite, and a `Load earlier
    // messages` prepend would otherwise read out fifty rows of backlog.
    expect(list).toHaveAttribute('aria-live', 'off');
  });
});

describe('ChatPanel new-message announcement', () => {
  const listen = () => screen.getByTestId('chat-panel-announcer');

  it('says nothing for the history a thread opens with', () => {
    render(
      <ChatPanel
        messages={[msg({ timestamp: at(2026, 9, 8, 9, 0), content: 'old' })]}
        onSend={() => {}}
      />,
    );
    expect(listen().textContent).toBe('');
  });

  it('announces a message that ARRIVES, with the sender and the opening words', () => {
    const first = [msg({ id: 'm1', timestamp: at(2026, 9, 8, 9, 0), content: 'old' })];
    const { rerender } = render(<ChatPanel messages={first} onSend={() => {}} />);
    rerender(
      <ChatPanel
        messages={[...first, msg({ id: 'm2', timestamp: at(2026, 9, 8, 9, 1), content: 'are you free?' })]}
        onSend={() => {}}
      />,
    );
    expect(listen().textContent).toContain('Carol Johnson: are you free?');
    expect(listen()).toHaveAttribute('aria-live', 'polite');
  });

  it('does not announce your OWN send back at you', () => {
    const first = [msg({ id: 'm1', timestamp: at(2026, 9, 8, 9, 0) })];
    const { rerender } = render(
      <ChatPanel messages={first} currentUserId="u-me" onSend={() => {}} />,
    );
    rerender(
      <ChatPanel
        messages={[...first, msg({ id: 'm2', timestamp: at(2026, 9, 8, 9, 1), userId: 'u-me', content: 'mine' })]}
        currentUserId="u-me"
        onSend={() => {}}
      />,
    );
    expect(listen().textContent).toBe('');
  });

  it('stays silent when older messages are PREPENDED by Load earlier', () => {
    const tail = [msg({ id: 'm9', timestamp: at(2026, 9, 8, 9, 9), content: 'newest' })];
    const { rerender } = render(<ChatPanel messages={tail} onSend={() => {}} />);
    rerender(
      <ChatPanel
        messages={[msg({ id: 'm1', timestamp: at(2026, 9, 7, 9, 0), content: 'ancient' }), ...tail]}
        onSend={() => {}}
      />,
    );
    expect(listen().textContent).toBe('');
  });
});

describe('announcementFor', () => {
  it('truncates rather than reading a wall of text over the user', () => {
    const out = announcementFor('Carol', 'x'.repeat(400));
    expect(out.length).toBeLessThan(140);
    expect(out.endsWith('…')).toBe(true);
  });

  it('says something useful for a message that is only attachments', () => {
    expect(announcementFor('Carol', '   ')).toBe('Carol sent a message');
  });
});
