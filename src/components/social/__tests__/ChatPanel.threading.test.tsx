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
  // Scoped to real rows. It no longer HAS to be — a quote carries
  // `data-quoted-message-id` now, so it cannot answer to a row's selector —
  // but asking for the rows is what this function means.
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
    // The pin glyph and "Pinned" share one line (preflight makes an svg a block).
    expect(rowOf('m3').querySelector('[data-testid="pinned-marker"]')!.className).toContain('flex');
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

  it('gives a post with no replies no foot Reply — the hover bar already has one', () => {
    // It used to carry one, revealed on hover. So did the action bar, revealed
    // by the same gesture: hovering an ordinary message offered Reply twice,
    // once as an arrow in the toolbar and once as a word underneath. The
    // toolbar's is the one that generalises — every message has it, threaded
    // or not — so the duplicate goes.
    render(<ChatPanel threaded messages={[root]} onSend={vi.fn()} onReply={vi.fn()} />);
    expect(screen.queryByTestId('chat-thread-reply')).toBeNull();
    // The one that remains is reachable, and reports the same target.
    expect(screen.getByTestId('message-actions-reply')).toBeInTheDocument();
  });

  it('still answers the root from the hover bar', () => {
    const onReply = vi.fn();
    render(<ChatPanel threaded messages={[root]} onSend={vi.fn()} onReply={onReply} />);
    fireEvent.click(screen.getByTestId('message-actions-reply'));
    expect(onReply.mock.calls[0][0].id).toBe('m1');
  });

  it('leaves the Reply permanent once a post has answers', () => {
    render(<ChatPanel threaded messages={[root, reply]} onSend={vi.fn()} onReply={vi.fn()} />);
    // Here it labels a structure the reader can already see — the rail of
    // replies — rather than advertising one that might exist.
    const foot = screen.getByTestId('chat-thread-reply');
    expect(foot.className).not.toContain('opacity-0');
    expect(foot.className).not.toContain('group-hover/post');
  });

  it('puts the Reply control at the foot of the thread, under the last reply', () => {
    render(<ChatPanel threaded messages={[root, reply]} onSend={vi.fn()} onReply={vi.fn()} />);

    const thread = screen.getByTestId('chat-thread');
    const foot = screen.getByTestId('chat-thread-reply');
    // Inside the thread, but not inside the replies rail — it is the end of
    // the thread, not one more reply.
    expect(thread.contains(foot)).toBe(true);
    expect(screen.getByTestId('chat-thread-replies').contains(foot)).toBe(false);
    // …and it really is last in document order, after the reply row.
    expect(
      rowOf('m3').compareDocumentPosition(foot) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('keeps the Reply control below the "N more replies" control', () => {
    const replies = ['r1', 'r2', 'r3', 'r4', 'r5'].map((id, i) =>
      msg(id, `reply ${i + 1}`, {
        timestamp: `2026-09-16T10:0${i}:00.000Z`,
        replyTo: { messageId: 'm1', author: 'Carol', text: 'Are we shipping Friday?' },
      }),
    );
    render(<ChatPanel threaded messages={[root, ...replies]} onSend={vi.fn()} onReply={vi.fn()} />);

    const toggle = screen.getByTestId('chat-thread-toggle');
    const foot = screen.getByTestId('chat-thread-reply');
    expect(
      toggle.compareDocumentPosition(foot) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('reports the ROOT from the foot control, never the last reply', () => {
    const onReply = vi.fn();
    const second = msg('m4', 'And the migration?', {
      displayName: 'Dan',
      userId: 'dan',
      replyTo: { messageId: 'm3', author: 'Eve', text: 'Yes, pending the audit' },
    });
    render(
      <ChatPanel threaded messages={[root, reply, second]} onSend={vi.fn()} onReply={onReply} />,
    );

    fireEvent.click(screen.getByTestId('chat-thread-reply'));
    expect(onReply).toHaveBeenCalledTimes(1);
    // m4 is the newest row in the thread; the control still hands back m1, so
    // the host stamps a replyTo that keeps the next answer in THIS thread.
    expect(onReply.mock.calls[0][0].id).toBe('m1');
  });

  it('adds nothing when threading is off', () => {
    render(<ChatPanel messages={[root, other, reply]} onSend={vi.fn()} onReply={vi.fn()} />);
    expect(screen.queryByTestId('chat-thread-reply')).toBeNull();
    expect(screen.queryByTestId('chat-thread')).toBeNull();
    // The hover ↩ is untouched — that path is what existing callers rely on.
    expect(rowOf('m1').querySelector('[aria-label="Reply"]')).toBeTruthy();
  });

  it('adds nothing when the host passes no onReply', () => {
    render(<ChatPanel threaded messages={[root, other, reply]} onSend={vi.fn()} />);
    expect(screen.queryByTestId('chat-thread-reply')).toBeNull();
    // A root with no replies stays the bare row rather than growing empty
    // thread chrome.
    expect(screen.getAllByTestId('chat-thread')).toHaveLength(1);
    expect(screen.getByTestId('chat-thread').getAttribute('data-thread-root')).toBe('m1');
  });

  it('draws the foot control for dark chrome', () => {
    render(
      <ChatPanel threaded tone="dark" messages={[root, reply]} onSend={vi.fn()} onReply={vi.fn()} />,
    );
    const foot = screen.getByTestId('chat-thread-reply');
    // The text-text-* tokens are tuned for the light surface and go muddy over
    // call chrome, so the dark tone carries its own ramp.
    expect(foot.className).toContain('text-white/50');
    expect(foot.className).not.toContain('text-text-tertiary');
  });

  it('threads on the dark tone too', () => {
    render(<ChatPanel threaded tone="dark" messages={[root, reply]} onSend={vi.fn()} />);
    const rail = screen.getByTestId('chat-thread-replies');
    // A token rail would be invisible on dark chrome.
    expect(rail.className).toContain('border-white/20');
    expect(rail.className).not.toContain('border-border');
  });
});

describe('ChatPanel author runs', () => {
  /** Minutes past 09:00 on the fixed test morning, as an ISO string. */
  function at(minutes: number): string {
    return new Date(Date.UTC(2026, 8, 16, 9, minutes, 0)).toISOString();
  }

  /** Did this row render as a bare continuation of the one above it? */
  function isBare(id: string): boolean {
    const row = rowOf(id);
    const bare =
      !row.querySelector('[data-testid="message-row-author"]') &&
      !row.querySelector('[data-testid="message-row-time"]');
    // The attribute and the rendering must agree — one is the panel's decision
    // and the other is what MessageRow did with it.
    expect(row.getAttribute('data-continues')).toBe(bare ? 'true' : null);
    return bare;
  }

  function run(...overrides: Array<Partial<ChatMessage> & { id: string; at: number }>) {
    return overrides.map((o) => {
      const { id, at: minutes, ...rest } = o;
      return msg(id, `line ${id}`, { timestamp: at(minutes), ...rest });
    });
  }

  it('collapses consecutive messages from one person into a single headed block', () => {
    render(
      <ChatPanel
        messages={run({ id: 'a1', at: 0 }, { id: 'a2', at: 1 }, { id: 'a3', at: 2 })}
        onSend={vi.fn()}
      />,
    );
    // The first row states who and when; the other two are bare lines.
    expect(isBare('a1')).toBe(false);
    expect(isBare('a2')).toBe(true);
    expect(isBare('a3')).toBe(true);
    expect(screen.getAllByTestId('message-row-author')).toHaveLength(1);
    // The text is all still there — this collapses the chrome, not the
    // conversation.
    expect(screen.getByText('line a3')).toBeInTheDocument();
  });

  it('keeps the full timestamp reachable on a continued row', () => {
    render(<ChatPanel messages={run({ id: 'a1', at: 0 }, { id: 'a2', at: 1 })} onSend={vi.fn()} />);
    // The meta line is gone, so the native tooltip is where the time went.
    const title = rowOf('a2').getAttribute('title');
    expect(title).toBeTruthy();
    expect(title).toContain('2026');
    // …and the headed row does not carry one, because it says the time out loud.
    expect(rowOf('a1').getAttribute('title')).toBeNull();
  });

  it('breaks the run when the author changes', () => {
    render(
      <ChatPanel
        messages={run(
          { id: 'a1', at: 0 },
          { id: 'b1', at: 1, userId: 'dan', displayName: 'Dan' },
          { id: 'a2', at: 2 },
        )}
        onSend={vi.fn()}
      />,
    );
    expect(isBare('b1')).toBe(false);
    // Carol again, but no longer continuing anything — Dan spoke in between.
    expect(isBare('a2')).toBe(false);
  });

  it('matches on the authenticated user id, not the per-connection clientId', () => {
    const first = msg('a1', 'one', { timestamp: at(0), clientId: 'socket-1' });
    // Same person, reconnected: a new clientId, the same userId. A run keyed on
    // clientId would split here for a reason nothing on screen explains.
    const second = msg('a2', 'two', { timestamp: at(1), clientId: 'socket-2' });
    render(<ChatPanel messages={[first, second]} onSend={vi.fn()} />);
    expect(isBare('a2')).toBe(true);
  });

  it('breaks the run on a gap longer than the window', () => {
    render(
      <ChatPanel
        messages={run({ id: 'a1', at: 0 }, { id: 'a2', at: 4 }, { id: 'a3', at: 15 })}
        onSend={vi.fn()}
      />,
    );
    // Four minutes is inside the five-minute window; eleven is not.
    expect(isBare('a2')).toBe(true);
    expect(isBare('a3')).toBe(false);
  });

  it('breaks the run across an activity notice', () => {
    const notice = msg('n1', 'Carol started a call', {
      timestamp: at(1),
      metadata: { system: true },
    });
    render(
      <ChatPanel messages={[...run({ id: 'a1', at: 0 }), notice, ...run({ id: 'a2', at: 2 })]} onSend={vi.fn()} />,
    );
    // A record is not somebody's sentence, so it neither continues nor is
    // continued: the message after it states its author again.
    expect(isBare('n1')).toBe(false);
    expect(isBare('a2')).toBe(false);
  });

  it('breaks the run across a card', () => {
    const card = msg('d1', 'Carol shared Q3 Plan', {
      timestamp: at(1),
      metadata: { kind: 'document', documentId: 'doc-1', title: 'Q3 Plan' },
    });
    render(
      <ChatPanel messages={[...run({ id: 'a1', at: 0 }), card, ...run({ id: 'a2', at: 2 })]} onSend={vi.fn()} />,
    );
    expect(isBare('a2')).toBe(false);
  });

  it('breaks the run across a deleted row', () => {
    const gone = msg('x1', 'oops', { timestamp: at(1), metadata: { deleted: true } });
    render(
      <ChatPanel messages={[...run({ id: 'a1', at: 0 }), gone, ...run({ id: 'a2', at: 2 })]} onSend={vi.fn()} />,
    );
    expect(isBare('x1')).toBe(false);
    expect(isBare('a2')).toBe(false);
  });

  it('breaks the run at a day divider even inside the time window', () => {
    // Built in LOCAL time so the boundary is a real midnight wherever this
    // runs; the same two instants are the same day in some zones and not in
    // others, and the divider is what this asserts on.
    const before = new Date(2026, 8, 16, 23, 58, 0).toISOString();
    const after = new Date(2026, 8, 17, 0, 1, 0).toISOString();
    render(
      <ChatPanel
        messages={[msg('a1', 'last night', { timestamp: before }), msg('a2', 'this morning', { timestamp: after })]}
        onSend={vi.fn()}
      />,
    );
    // Three minutes apart, so the clock alone would have collapsed them.
    expect(screen.getAllByTestId('chat-day-separator')).toHaveLength(2);
    expect(isBare('a2')).toBe(false);
  });

  it('keeps an edited row headed so its "(edited)" marker survives', () => {
    const edited = msg('a2', 'fixed that', { timestamp: at(1), editedAt: at(2) });
    render(<ChatPanel messages={[...run({ id: 'a1', at: 0 }), edited]} onSend={vi.fn()} />);
    expect(isBare('a2')).toBe(false);
    expect(screen.getByTestId('message-row-edited')).toBeInTheDocument();
  });

  it('never lets a thread root be continued by its first reply', () => {
    const rootPost = msg('t1', 'Are we shipping Friday?', { timestamp: at(0) });
    // Same author, one minute later — the only thing stopping a collapse here
    // is the rule that a reply answers the root rather than continuing it.
    const firstReply = msg('t2', 'bumping this', {
      timestamp: at(1),
      replyTo: { messageId: 't1', author: 'Carol', text: 'Are we shipping Friday?' },
    });
    const secondReply = msg('t3', 'still bumping', {
      timestamp: at(2),
      replyTo: { messageId: 't1', author: 'Carol', text: 'Are we shipping Friday?' },
    });
    render(<ChatPanel threaded messages={[rootPost, firstReply, secondReply]} onSend={vi.fn()} />);

    expect(isBare('t2')).toBe(false);
    // …but one reply does continue the reply above it.
    expect(isBare('t3')).toBe(true);
  });

  it('does not collapse a root across a thread drawn above it', () => {
    const rootPost = msg('t1', 'Are we shipping Friday?', { timestamp: at(0) });
    const answer = msg('t2', 'Yes', {
      timestamp: at(1),
      displayName: 'Eve',
      userId: 'eve',
      replyTo: { messageId: 't1', author: 'Carol', text: 'Are we shipping Friday?' },
    });
    const nextPost = msg('t3', 'Also, standup moved', { timestamp: at(2) });
    render(<ChatPanel threaded messages={[rootPost, answer, nextPost]} onSend={vi.fn()} />);
    // Carol both times and one minute apart, but Eve's reply rail is drawn in
    // the gap — a bare line under it would read as part of that thread.
    expect(isBare('t3')).toBe(false);
  });

  it('keeps the hover bar, reactions and edit/delete working on a continued row', async () => {
    const onToggleReaction = vi.fn();
    const onEditMessage = vi.fn().mockResolvedValue(undefined);
    const onDeleteMessage = vi.fn();
    const mine = [
      msg('a1', 'one', { timestamp: at(0), userId: 'eve', displayName: 'Eve' }),
      msg('a2', 'two', { timestamp: at(1), userId: 'eve', displayName: 'Eve' }),
    ];
    render(
      <ChatPanel
        messages={mine}
        currentUserId="eve"
        onSend={vi.fn()}
        reactionsFor={() => [{ emoji: '👍', userId: 'dan', displayName: 'Dan' }]}
        onToggleReaction={onToggleReaction}
        onEditMessage={onEditMessage}
        onDeleteMessage={onDeleteMessage}
      />,
    );

    const row = rowOf('a2');
    expect(isBare('a2')).toBe(true);
    // Still the viewer's own message: the bubble and the side it sits on are
    // unaffected by dropping the author label.
    expect(row.querySelector('[data-testid="message-row"]')?.getAttribute('data-mine')).toBe('true');
    expect(row.querySelector('[data-testid="reaction-chips"]')).toBeTruthy();

    fireEvent.click(row.querySelector('[data-testid^="message-actions-react-"]')!);
    expect(onToggleReaction).toHaveBeenCalledWith('a2', '👍');

    fireEvent.click(row.querySelector('[aria-label="Edit message"]')!);
    const input = screen.getByTestId('message-editor-input') as HTMLTextAreaElement;
    fireEvent.change(input, { target: { value: 'two, corrected' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    await waitFor(() => expect(onEditMessage).toHaveBeenCalled());
    expect(onEditMessage.mock.calls[0][0].id).toBe('a2');

    fireEvent.click(rowOf('a2').querySelector('[aria-label="Delete message"]')!);
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(onDeleteMessage.mock.calls[0][0].id).toBe('a2');
  });
});

describe('ChatPanel post rhythm', () => {
  function at(minutes: number): string {
    return new Date(Date.UTC(2026, 8, 16, 9, minutes, 0)).toISOString();
  }

  /** Three posts by one person, a minute apart — the case that read as noise. */
  const posts = [
    msg('p1', 'Are we shipping Friday?', { timestamp: at(0) }),
    msg('p2', 'Also, standup moved to 10', { timestamp: at(1) }),
    msg('p3', 'And the audit doc is up', { timestamp: at(2) }),
  ];

  function heads(): number {
    return screen.getAllByTestId('message-row-author').length;
  }

  it('keeps consecutive posts separate, each with its own head', () => {
    render(<ChatPanel threaded messages={posts} onSend={vi.fn()} onReply={vi.fn()} />);
    // A post is a thread starter, so three posts stay three posts — no run
    // collapsing here however close together they were sent.
    expect(heads()).toBe(3);
    // And no standing "Reply" under any of them: unanswered posts are answered
    // from the hover bar, which every message has.
    expect(screen.queryByTestId('chat-thread-reply')).toBeNull();
    for (const id of ['p1', 'p2', 'p3']) {
      expect(rowOf(id).getAttribute('data-continues')).toBeNull();
      expect(rowOf(id).querySelector('[data-testid="message-row-time"]')).toBeTruthy();
    }
  });

  it('separates each post from the one above it, but not the first', () => {
    render(<ChatPanel threaded messages={posts} onSend={vi.fn()} onReply={vi.fn()} />);
    // Two gaps between three posts. Nothing above the first — a rule across
    // the top of the transcript separates the channel from nothing.
    const rules = screen.getAllByTestId('chat-post-boundary');
    expect(rules).toHaveLength(2);
    expect(
      rules[0].compareDocumentPosition(rowOf('p1')) & Node.DOCUMENT_POSITION_PRECEDING,
    ).toBeTruthy();
    // Decorative: it divides the flow and says nothing a row does not already
    // say, so it stays out of the accessibility tree.
    expect(rules[0].getAttribute('aria-hidden')).toBe('true');
  });

  it('puts the reply control inside its own post, above the next boundary', () => {
    // Needs a thread that HAS replies, since that is the only shape carrying a
    // foot Reply now — and it is exactly where the placement matters, because
    // the control has to read as the end of its thread rather than as a stray
    // button in the gap before the next post.
    const answer = msg('a1', 'Friday works', {
      timestamp: at(1),
      displayName: 'Eve',
      userId: 'eve',
      replyTo: { messageId: 'p1', author: 'Carol', text: 'Are we shipping Friday?' },
    });
    render(<ChatPanel threaded messages={[posts[0], answer, posts[1]]} onSend={vi.fn()} onReply={vi.fn()} />);
    const replies = screen.getAllByTestId('chat-thread-reply');
    const rules = screen.getAllByTestId('chat-post-boundary');
    // The first post's Reply comes before the rule that opens the second post,
    // so it closes its own block rather than floating in the gap.
    expect(
      replies[0].compareDocumentPosition(rules[0]) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('separates a post that has no replies just like one that does', () => {
    const answered = msg('p0', 'Yes', {
      timestamp: at(1),
      displayName: 'Eve',
      userId: 'eve',
      replyTo: { messageId: 'p1', author: 'Carol', text: 'Are we shipping Friday?' },
    });
    render(
      <ChatPanel threaded messages={[posts[0], answered, posts[1]]} onSend={vi.fn()} onReply={vi.fn()} />,
    );
    // A post nobody answered is not a lesser kind of thing.
    expect(screen.getAllByTestId('chat-post-boundary')).toHaveLength(1);
  });

  it('separates posts even when the host passes no reply handler', () => {
    render(<ChatPanel threaded messages={posts} onSend={vi.fn()} />);
    expect(screen.queryByTestId('chat-thread-reply')).toBeNull();
    expect(screen.getAllByTestId('chat-post-boundary')).toHaveLength(2);
  });

  it('lets the day divider be the boundary where one falls', () => {
    const nextDay = msg('p9', 'morning', {
      timestamp: new Date(Date.UTC(2026, 8, 18, 9, 0, 0)).toISOString(),
    });
    render(<ChatPanel threaded messages={[posts[0], nextDay]} onSend={vi.fn()} onReply={vi.fn()} />);
    // Two days, two day separators, and no post rule stacked three pixels
    // under either of them.
    expect(screen.getAllByTestId('chat-day-separator')).toHaveLength(2);
    expect(screen.queryByTestId('chat-post-boundary')).toBeNull();
  });

  it('still groups replies inside a thread', () => {
    const answers = ['r1', 'r2'].map((id, i) =>
      msg(id, `answer ${i + 1}`, {
        timestamp: at(i + 1),
        displayName: 'Eve',
        userId: 'eve',
        replyTo: { messageId: 'p1', author: 'Carol', text: 'Are we shipping Friday?' },
      }),
    );
    render(<ChatPanel threaded messages={[posts[0], ...answers]} onSend={vi.fn()} onReply={vi.fn()} />);
    // Inside one post the replies are a conversation, so a run of them from
    // one person still collapses.
    expect(rowOf('r1').getAttribute('data-continues')).toBeNull();
    expect(rowOf('r2').getAttribute('data-continues')).toBe('true');
    // The separation is a between-posts rhythm; it never lands inside a thread.
    expect(screen.getByTestId('chat-thread-replies').querySelectorAll('[data-testid="chat-post-boundary"]')).toHaveLength(0);
  });

  it('leaves a non-threaded list exactly as tight as it was', () => {
    render(<ChatPanel messages={posts} onSend={vi.fn()} onReply={vi.fn()} />);
    // A DM is a conversation, not a list of posts: no separation, and the run
    // still collapses to one head.
    expect(screen.queryByTestId('chat-post-boundary')).toBeNull();
    expect(heads()).toBe(1);
    expect(rowOf('p3').getAttribute('data-continues')).toBe('true');
  });
});

describe('ChatPanel own-message alignment', () => {
  it('right-aligns your own message by default, the way a two-person chat wants', () => {
    render(<ChatPanel messages={[msg('m1', 'mine', { userId: 'eve' })]} onSend={vi.fn()} currentUserId="eve" />);
    const row = screen.getByText('mine').closest('[data-mine]');
    expect(row?.getAttribute('data-mine')).toBe('true');
  });

  it('leaves it in line when the host says not to align it — a channel post is a post', () => {
    render(
      <ChatPanel
        messages={[msg('m1', 'mine', { userId: 'eve' })]}
        onSend={vi.fn()}
        currentUserId="eve"
        alignOwnMessages={false}
      />,
    );
    const row = screen.getByText('mine').closest('[data-mine]');
    expect(row?.getAttribute('data-mine')).toBe('false');
  });

  it('still lets you edit and delete it — alignment is not ownership', () => {
    const onEditMessage = vi.fn();
    render(
      <ChatPanel
        messages={[msg('m1', 'mine', { userId: 'eve' })]}
        onSend={vi.fn()}
        currentUserId="eve"
        alignOwnMessages={false}
        onEditMessage={onEditMessage}
      />,
    );
    expect(screen.getByLabelText('Edit message')).toBeTruthy();
  });
});
