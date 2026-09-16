import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ChatPanel } from '../ChatPanel';
import type { ChatMessage } from '../../../hooks/useChat';

afterEach(cleanup);

function msg(
  id: string,
  content: string,
  extra: Partial<ChatMessage> & { replyTo?: { messageId: string; author: string; text: string } } = {},
): ChatMessage {
  const { replyTo, ...rest } = extra;
  return {
    id,
    clientId: `client-${id}`,
    userId: rest.userId ?? 'carol',
    displayName: rest.displayName ?? 'Carol',
    content,
    // Sequential so the day-divider logic sees one day and the ordering
    // assertions read as a real morning of traffic.
    timestamp: rest.timestamp ?? `2026-09-16T09:${id.replace(/\D/g, '').padStart(2, '0')}:00.000Z`,
    ...(replyTo ? { metadata: { ...(rest.metadata ?? {}), replyTo } } : {}),
    ...rest,
  } as ChatMessage;
}

/** The message ids in the order they appear in the DOM. */
function renderedOrder(): string[] {
  // Scoped to real rows: a QuoteBlock carries a `data-message-id` of its own
  // (the message it quotes), and counting those would report the thread order
  // wrong.
  return [...document.querySelectorAll('[data-testid="chat-message"]')].map(
    (el) => el.getAttribute('data-message-id') ?? '',
  );
}

function rowOf(id: string): HTMLElement {
  const el = document.querySelector(`[data-testid="chat-message"][data-message-id="${id}"]`);
  if (!el) throw new Error(`no row ${id}`);
  return el as HTMLElement;
}

const root = msg('m1', 'Are we shipping Friday?');
const other = msg('m2', 'Unrelated: coffee machine is broken', { displayName: 'Dan', userId: 'dan' });
const reply = msg('m3', 'Yes, pending the audit', {
  displayName: 'Eve',
  userId: 'eve',
  replyTo: { messageId: 'm1', author: 'Carol', text: 'Are we shipping Friday?' },
});

describe('ChatPanel threading', () => {
  it('leaves the flat river alone when threaded is off', () => {
    render(<ChatPanel messages={[root, other, reply]} onSend={vi.fn()} />);
    // Same order as given, no thread chrome, and the reply keeps the quote of
    // its parent — which is the whole of what "reply" meant before threading.
    expect(renderedOrder()).toEqual(['m1', 'm2', 'm3']);
    expect(screen.queryByTestId('chat-thread')).toBeNull();
    expect(screen.getByTestId('quote-block')).toBeInTheDocument();
  });

  it('nests a reply under the message it answers', () => {
    render(<ChatPanel threaded messages={[root, other, reply]} onSend={vi.fn()} />);
    // The reply left the bottom of the river and sits under its root, ahead of
    // the unrelated message that was sent between them.
    expect(renderedOrder()).toEqual(['m1', 'm3', 'm2']);
    const thread = screen.getByTestId('chat-thread');
    expect(thread.getAttribute('data-thread-root')).toBe('m1');
    expect(screen.getByTestId('chat-thread-replies').contains(rowOf('m3'))).toBe(true);
    expect(screen.getByTestId('chat-thread-replies').contains(rowOf('m1'))).toBe(false);
  });

  it('folds a reply-to-a-reply into the same thread rather than a second indent', () => {
    const grandchild = msg('m4', 'What is left on the audit?', {
      displayName: 'Dan',
      userId: 'dan',
      replyTo: { messageId: 'm3', author: 'Eve', text: 'Yes, pending the audit' },
    });
    render(<ChatPanel threaded messages={[root, reply, grandchild]} onSend={vi.fn()} />);

    expect(screen.getAllByTestId('chat-thread')).toHaveLength(1);
    const replies = screen.getByTestId('chat-thread-replies');
    // Both live in the SAME replies container — one level, as in Teams.
    expect(replies.contains(rowOf('m3'))).toBe(true);
    expect(replies.contains(rowOf('m4'))).toBe(true);
    expect(replies.querySelectorAll('[data-testid="chat-thread-replies"]')).toHaveLength(0);
  });

  it('suppresses the quote of the root inside a thread but keeps a quote of a sibling', () => {
    const grandchild = msg('m4', 'What is left on the audit?', {
      displayName: 'Dan',
      userId: 'dan',
      replyTo: { messageId: 'm3', author: 'Eve', text: 'Yes, pending the audit' },
    });
    render(<ChatPanel threaded messages={[root, reply, grandchild]} onSend={vi.fn()} />);
    // m3 quotes the root, which is the row directly above it — dropped.
    expect(rowOf('m3').querySelector('[data-testid="quote-block"]')).toBeNull();
    // m4 quotes a sibling reply, the only thing that says which answer it
    // answers — kept.
    expect(rowOf('m4').querySelector('[data-testid="quote-block"]')).toBeTruthy();
  });

  it('keeps a reply whose parent is outside the loaded window as its own root', () => {
    const orphan = msg('m9', 'Agreed', {
      replyTo: { messageId: 'gone', author: 'Someone', text: 'scrolled away' },
    });
    render(<ChatPanel threaded messages={[root, orphan]} onSend={vi.fn()} />);
    expect(screen.queryByTestId('chat-thread')).toBeNull();
    expect(renderedOrder()).toEqual(['m1', 'm9']);
    // Its quote is the only remaining trace of what it answered.
    expect(rowOf('m9').querySelector('[data-testid="quote-block"]')).toBeTruthy();
  });

  it('reports the ROOT to onReply when the reply control on a child is used', () => {
    const onReply = vi.fn();
    render(<ChatPanel threaded messages={[root, reply]} onSend={vi.fn()} onReply={onReply} />);

    fireEvent.click(rowOf('m3').querySelector('[aria-label="Reply"]')!);
    expect(onReply).toHaveBeenCalledTimes(1);
    expect(onReply.mock.calls[0][0].id).toBe('m1');

    // And the root still reports itself.
    fireEvent.click(rowOf('m1').querySelector('[aria-label="Reply"]')!);
    expect(onReply.mock.calls[1][0].id).toBe('m1');
  });

  it('does not drag a thread to the live edge when a new reply arrives', () => {
    const { rerender } = render(
      <ChatPanel threaded messages={[root, other]} onSend={vi.fn()} />,
    );
    expect(renderedOrder()).toEqual(['m1', 'm2']);

    const late = msg('m8', 'Friday still works', {
      timestamp: '2026-09-16T17:00:00.000Z',
      replyTo: { messageId: 'm1', author: 'Carol', text: 'Are we shipping Friday?' },
    });
    rerender(<ChatPanel threaded messages={[root, other, late]} onSend={vi.fn()} />);

    // The thread stayed where its ROOT is. An answer to this morning's
    // question belongs under that question, not at the bottom stripped of it.
    expect(renderedOrder()).toEqual(['m1', 'm8', 'm2']);
  });

  it('collapses a long thread and expands it on demand', () => {
    const replies = ['r1', 'r2', 'r3', 'r4', 'r5'].map((id, i) =>
      msg(id, `reply ${i + 1}`, {
        displayName: i % 2 ? 'Dan' : 'Eve',
        userId: i % 2 ? 'dan' : 'eve',
        timestamp: `2026-09-16T10:0${i}:00.000Z`,
        replyTo: { messageId: 'm1', author: 'Carol', text: 'Are we shipping Friday?' },
      }),
    );
    render(<ChatPanel threaded messages={[root, ...replies]} onSend={vi.fn()} />);

    // Two visible, three behind the control.
    expect(renderedOrder()).toEqual(['m1', 'r1', 'r2']);
    const toggle = screen.getByTestId('chat-thread-toggle');
    expect(toggle.textContent).toContain('3 more replies');
    expect(toggle.getAttribute('aria-expanded')).toBe('false');

    fireEvent.click(toggle);
    expect(renderedOrder()).toEqual(['m1', 'r1', 'r2', 'r3', 'r4', 'r5']);
    expect(screen.getByTestId('chat-thread-toggle').textContent).toContain('Show fewer replies');
    expect(screen.getByTestId('chat-thread-toggle').getAttribute('aria-expanded')).toBe('true');

    fireEvent.click(screen.getByTestId('chat-thread-toggle'));
    expect(renderedOrder()).toEqual(['m1', 'r1', 'r2']);
  });

  it('leaves a thread at or under the threshold whole', () => {
    const replies = ['r1', 'r2', 'r3'].map((id, i) =>
      msg(id, `reply ${i + 1}`, {
        timestamp: `2026-09-16T10:0${i}:00.000Z`,
        replyTo: { messageId: 'm1', author: 'Carol', text: 'Are we shipping Friday?' },
      }),
    );
    render(<ChatPanel threaded messages={[root, ...replies]} onSend={vi.fn()} />);
    expect(screen.queryByTestId('chat-thread-toggle')).toBeNull();
    expect(renderedOrder()).toEqual(['m1', 'r1', 'r2', 'r3']);
  });

  it('collapse state is per thread', () => {
    const long = (rootId: string, prefix: string) => {
      const head = msg(rootId, `head ${rootId}`);
      const kids = [1, 2, 3, 4].map((n) =>
        msg(`${prefix}${n}`, `k${n}`, {
          timestamp: `2026-09-16T11:0${n}:00.000Z`,
          replyTo: { messageId: rootId, author: 'Carol', text: 'head' },
        }),
      );
      return [head, ...kids];
    };
    render(<ChatPanel threaded messages={[...long('m1', 'a'), ...long('m2', 'b')]} onSend={vi.fn()} />);

    const toggles = screen.getAllByTestId('chat-thread-toggle');
    expect(toggles).toHaveLength(2);
    fireEvent.click(toggles[0]);
    // The first opened; the second is untouched.
    expect(renderedOrder()).toEqual(['m1', 'a1', 'a2', 'a3', 'a4', 'm2', 'b1', 'b2']);
  });

  it('keeps reactions, edit and delete working on a nested reply', async () => {
    const onToggleReaction = vi.fn();
    const onEditMessage = vi.fn().mockResolvedValue(undefined);
    const onDeleteMessage = vi.fn();
    const ownReply = msg('m3', 'Yes, pending the audit', {
      userId: 'eve',
      displayName: 'Eve',
      replyTo: { messageId: 'm1', author: 'Carol', text: 'Are we shipping Friday?' },
    });
    render(
      <ChatPanel
        threaded
        messages={[root, ownReply]}
        currentUserId="eve"
        onSend={vi.fn()}
        reactionsFor={() => [{ emoji: '👍', userId: 'dan', displayName: 'Dan' }]}
        onToggleReaction={onToggleReaction}
        onEditMessage={onEditMessage}
        onDeleteMessage={onDeleteMessage}
      />,
    );

    const row = rowOf('m3');
    // Own message, so it takes the right-aligned "mine" treatment inside the
    // thread too.
    expect(row.querySelector('[data-testid="message-row"]')?.getAttribute('data-mine')).toBe('true');

    // By testid rather than by the emoji label: the first quick reaction is 👍.
    fireEvent.click(row.querySelector('[data-testid^="message-actions-react-"]')!);
    expect(onToggleReaction).toHaveBeenCalledWith('m3', '👍');
    // The chips for the nested message render with it, not with its root.
    expect(row.querySelector('[data-testid="reaction-chips"]')).toBeTruthy();

    fireEvent.click(row.querySelector('[aria-label="Edit message"]')!);
    const input = screen.getByTestId('message-editor-input') as HTMLTextAreaElement;
    fireEvent.change(input, { target: { value: 'Yes — audit signed off' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    await waitFor(() => expect(onEditMessage).toHaveBeenCalled());
    expect(onEditMessage.mock.calls[0][0].id).toBe('m3');
    expect(onEditMessage.mock.calls[0][1]).toBe('Yes — audit signed off');

    fireEvent.click(rowOf('m3').querySelector('[aria-label="Delete message"]')!);
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(onDeleteMessage).toHaveBeenCalledTimes(1);
    expect(onDeleteMessage.mock.calls[0][0].id).toBe('m3');
  });

  it('keeps pinning reachable on a nested reply', () => {
    const onTogglePin = vi.fn();
    render(
      <ChatPanel
        threaded
        messages={[root, reply]}
        onSend={vi.fn()}
        onTogglePin={onTogglePin}
        pinnedMessageIds={new Set(['m3'])}
      />,
    );
    expect(rowOf('m3').querySelector('[data-testid="pinned-marker"]')).toBeTruthy();
    fireEvent.click(rowOf('m3').querySelector('[aria-label="Unpin"]')!);
    expect(onTogglePin.mock.calls[0][0].id).toBe('m3');
  });

  it('puts an optimistic local reply in its thread, not at the bottom', () => {
    render(
      <ChatPanel
        threaded
        messages={[root, other]}
        localMessages={[
          {
            id: 'local-1',
            timestamp: '2026-09-16T18:00:00.000Z',
            displayName: 'Eve',
            content: 'sending…',
            metadata: { replyTo: { messageId: 'm1', author: 'Carol', text: 'Are we shipping Friday?' } },
          },
        ]}
        onSend={vi.fn()}
      />,
    );
    const replies = screen.getByTestId('chat-thread-replies');
    expect(replies.querySelector('[data-local-message-id="local-1"]')).toBeTruthy();
    expect(renderedOrder()).toEqual(['m1', 'm2']);
  });

  it('opens each day once, off the roots, and never inside a thread', () => {
    const tuesday = msg('m5', 'next morning', { timestamp: '2026-09-17T09:00:00.000Z' });
    const lateReply = msg('m6', 'still Friday', {
      timestamp: '2026-09-17T10:00:00.000Z',
      replyTo: { messageId: 'm1', author: 'Carol', text: 'Are we shipping Friday?' },
    });
    render(<ChatPanel threaded messages={[root, lateReply, tuesday]} onSend={vi.fn()} />);
    // Two roots on two days, so two headings — the reply sitting on the later
    // day does not add a third inside the thread it belongs to.
    expect(screen.getAllByTestId('chat-day-separator')).toHaveLength(2);
    expect(screen.getByTestId('chat-thread-replies').querySelectorAll('[data-testid="chat-day-separator"]')).toHaveLength(0);
  });

  it('threads on the dark tone too', () => {
    render(<ChatPanel threaded tone="dark" messages={[root, reply]} onSend={vi.fn()} />);
    const rail = screen.getByTestId('chat-thread-replies');
    // A token rail would be invisible on dark chrome.
    expect(rail.className).toContain('border-white/20');
    expect(rail.className).not.toContain('border-border');
  });
});
