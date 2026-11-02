import { openMessageActions } from '../../../components/social/__tests__/chatTestActions';
// src/integrations/realtime-modules/__tests__/WrappedChatPanelWiring.test.tsx
//
// The second half of the drift problem.
//
// `adapters.ts` decides which fields of a MESSAGE reach the panel; this
// component decides which PROPS do. Both drop things the same way — silently,
// with the component still rendering — and this half is the one the app's
// tests cannot see at all, because the app passes these props itself and never
// goes through this file.
//
// Each test below names a prop the app hand-wires and this component either
// could not supply or supplied from the wrong side of the hook.

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { WrappedChatPanel } from '../WrappedChatPanel';
import type {
  RMUseChatReturn,
  RMChatMessage,
  RMUsePresenceReturn,
  RMUseReactionsReturn,
  RMReaction,
  RMPresenceEntry,
} from '../types';

const TS = '2026-09-06T10:00:00.000Z';

function makeChat(
  messages: RMChatMessage[] = [],
  overrides: Partial<RMUseChatReturn> = {},
): RMUseChatReturn {
  return { messages, sendMessage: vi.fn(), loadHistory: vi.fn(), ...overrides };
}

function makeMsg(id: string, text = 'hello'): RMChatMessage {
  return { id, clientId: 'conn-a', channel: 'room-1', message: text, timestamp: TS };
}

it('renders host-resolved references from the adapted message and replaces them after an update', () => {
  const first = { ...makeMsg('ref-1'), metadata: { pageReference: { kind: 'work-item', id: 'work-1' } } };
  const renderer = vi.fn((message) => <button>{message.metadata?.pageReference?.id === 'work-1' ? 'Open work one' : 'Page unavailable'}</button>);
  const { rerender } = render(<WrappedChatPanel chat={makeChat([first])} renderMessageReferences={renderer} />);
  expect(screen.getByRole('button', { name: 'Open work one' })).toBeInTheDocument();
  expect(renderer).toHaveBeenCalledWith(expect.objectContaining({ id: 'ref-1', metadata: first.metadata }));
  rerender(<WrappedChatPanel chat={makeChat([{ ...first, metadata: { pageReference: { kind: 'work-item', id: 'missing' } } }])}
    renderMessageReferences={renderer} />);
  expect(screen.queryByRole('button', { name: 'Open work one' })).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Page unavailable' })).toBeInTheDocument();
  rerender(<WrappedChatPanel chat={makeChat([{ ...first, metadata: { ...first.metadata, deleted: true } }])} renderMessageReferences={renderer} />);
  expect(screen.queryByRole('button', { name: 'Open work one' })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Page unavailable' })).not.toBeInTheDocument();
});

// ChatPanel broadcasts typing from keyDown, not from the value change.
function type(text: string) {
  const input = screen.getByPlaceholderText(/message/i);
  fireEvent.change(input, { target: { value: text } });
  fireEvent.keyDown(input, { key: text.slice(-1) || 'a' });
  return input;
}

// ---------------------------------------------------------------------------
// Outbound identity
// ---------------------------------------------------------------------------

describe('outgoing messages carry the sender', () => {
  // The gateway does not invent a display name, and the sender is the one
  // person who cannot see the result: their own row is the only place the
  // panel does not need one. Everyone else got an unnamed, faceless message.
  it('stamps displayName and avatarUrl onto the send', () => {
    const chat = makeChat();
    render(
      <WrappedChatPanel chat={chat} displayName="Alice" avatarUrl="a.png" />,
    );
    fireEvent.keyDown(type('hi'), { key: 'Enter' });
    expect(chat.sendMessage).toHaveBeenCalledWith('hi', {
      displayName: 'Alice',
      avatarUrl: 'a.png',
    });
  });

  it('merges host-supplied metadata (a reply quote, a client tag)', () => {
    const chat = makeChat();
    render(
      <WrappedChatPanel
        chat={chat}
        displayName="Alice"
        sendMetadata={{ replyTo: { messageId: 'm0', author: 'Bob', text: 'q' } }}
      />,
    );
    fireEvent.keyDown(type('hi'), { key: 'Enter' });
    expect(chat.sendMessage).toHaveBeenCalledWith('hi', {
      replyTo: { messageId: 'm0', author: 'Bob', text: 'q' },
      displayName: 'Alice',
    });
  });

  it('sends bare text when the host supplied no identity', () => {
    const chat = makeChat();
    render(<WrappedChatPanel chat={chat} />);
    fireEvent.keyDown(type('hi'), { key: 'Enter' });
    expect(chat.sendMessage).toHaveBeenCalledWith('hi');
  });
});

// ---------------------------------------------------------------------------
// Typing — read AND write
// ---------------------------------------------------------------------------

function presenceWith(entries: Partial<RMPresenceEntry>[]): RMUsePresenceReturn {
  return {
    roster: entries.map((e) => ({
      clientId: 'conn-x',
      status: 'online' as const,
      metadata: {},
      channels: [],
      nodeId: 'n1',
      timestamp: TS,
      lastSeen: TS,
      lastHeartbeat: 0,
      ...e,
    })),
    setStatus: vi.fn(),
    updateMetadata: vi.fn(),
  };
}

describe('typing is symmetric', () => {
  // Reading the roster's isTyping while never writing your own is what makes a
  // typing indicator look broken to exactly one person in the conversation.
  it('publishes the viewer’s typing state onto presence', () => {
    const presence = presenceWith([]);
    render(<WrappedChatPanel chat={makeChat()} presence={presence} />);
    type('h');
    expect(presence.updateMetadata).toHaveBeenCalledWith({ isTyping: true });
  });

  it('can be turned off for a surface that should not publish', () => {
    const presence = presenceWith([]);
    render(
      <WrappedChatPanel chat={makeChat()} presence={presence} publishTyping={false} />,
    );
    type('h');
    expect(presence.updateMetadata).not.toHaveBeenCalled();
  });

  it('still shows other people typing', () => {
    const presence = presenceWith([
      { clientId: 'conn-b', metadata: { isTyping: true, displayName: 'Bob' } },
    ]);
    render(<WrappedChatPanel chat={makeChat()} presence={presence} />);
    expect(screen.getByText(/Bob is typing/)).toBeInTheDocument();
  });

  // Your own name in the banner reads as a bug — and it only appears once the
  // component starts publishing your typing state, which it now does.
  it('never puts the viewer in their own typing banner', () => {
    const presence = presenceWith([
      { clientId: 'conn-a', metadata: { isTyping: true, displayName: 'Alice', userId: 'user-alice' } },
      { clientId: 'conn-b', metadata: { isTyping: true, displayName: 'Bob', userId: 'user-bob' } },
    ]);
    render(
      <WrappedChatPanel chat={makeChat()} presence={presence} currentUserId="user-alice" />,
    );
    expect(screen.getByText(/Bob is typing/)).toBeInTheDocument();
    expect(screen.queryByText(/Alice/)).not.toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Reactions
// ---------------------------------------------------------------------------

function reaction(over: Partial<RMReaction> = {}): RMReaction {
  return {
    id: 'rxn-1',
    clientId: 'conn-a',
    channel: 'room-1',
    emoji: '🔥',
    effect: '',
    position: null,
    metadata: {},
    timestamp: TS,
    targetId: 'm1',
    userId: 'user-bob',
    displayName: 'Bob',
    ...over,
  };
}

describe('reaction chips', () => {
  const hook = (over: Partial<RMUseReactionsReturn> = {}): RMUseReactionsReturn => ({
    reactions: [reaction()],
    react: vi.fn(),
    unreact: vi.fn(),
    toggle: vi.fn(),
    ...over,
  });

  it('renders the reactions already on a message', () => {
    render(
      <WrappedChatPanel
        chat={makeChat([makeMsg('m1')])}
        reactions={hook()}
        currentUserId="user-alice"
      />,
    );
    expect(screen.getByText('🔥')).toBeInTheDocument();
  });

  it('toggles through the hook, naming the viewer so the chip knows which way to go', () => {
    const reactions = hook();
    render(
      <WrappedChatPanel
        chat={makeChat([makeMsg('m1')])}
        reactions={reactions}
        currentUserId="user-alice"
      />,
    );
    fireEvent.click(screen.getByText('🔥'));
    expect(reactions.toggle).toHaveBeenCalledWith('🔥', {
      targetId: 'm1',
      userId: 'user-alice',
    });
  });

  // An older realtime-modules has react/unreact and no toggle. Falling back
  // beats rendering a control that throws.
  it('falls back to react/unreact when the hook has no toggle', () => {
    const reactions = hook({ toggle: undefined, reactions: [reaction({ userId: 'user-alice' })] });
    render(
      <WrappedChatPanel
        chat={makeChat([makeMsg('m1')])}
        reactions={reactions}
        currentUserId="user-alice"
      />,
    );
    fireEvent.click(screen.getByText('🔥'));
    expect(reactions.unreact).toHaveBeenCalledWith('🔥', { targetId: 'm1' });
  });

  it('offers no reaction UI at all when no hook is supplied', () => {
    render(<WrappedChatPanel chat={makeChat([makeMsg('m1')])} currentUserId="user-alice" />);
    expect(screen.queryByText('🔥')).not.toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Pins
// ---------------------------------------------------------------------------

describe('pins', () => {
  it('pins an unpinned message through the hook', () => {
    const pins = { pinnedIds: new Set<string>(), pin: vi.fn(async () => {}), unpin: vi.fn(async () => {}) };
    const msg: RMChatMessage = {
      ...makeMsg('m1', 'pin me'),
      metadata: { displayName: 'Bob' },
    };
    render(<WrappedChatPanel chat={makeChat([msg])} pins={pins} currentUserId="u1" />);
    openMessageActions(document.querySelector('[data-message-id="m1"]')!);
    fireEvent.click(screen.getByTitle(/pin/i));
    expect(pins.pin).toHaveBeenCalledWith({
      messageId: 'm1',
      text: 'pin me',
      author: 'Bob',
    });
  });

  it('unpins one that is already pinned', () => {
    const pins = {
      pinnedIds: new Set(['m1']),
      pin: vi.fn(async () => {}),
      unpin: vi.fn(async () => {}),
    };
    render(<WrappedChatPanel chat={makeChat([makeMsg('m1')])} pins={pins} currentUserId="u1" />);
    openMessageActions(document.querySelector('[data-message-id="m1"]')!);
    fireEvent.click(screen.getByTitle(/pin/i));
    expect(pins.unpin).toHaveBeenCalledWith('m1');
  });

  // A call chat is a scratchpad for the call, not channel state — absent is
  // the right shape there, and it must stay absent rather than half-working.
  it('shows no pin control when no pins hook is supplied', () => {
    render(<WrappedChatPanel chat={makeChat([makeMsg('m1')])} currentUserId="u1" />);
    expect(screen.queryByTitle(/pin/i)).not.toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// History
// ---------------------------------------------------------------------------

describe('load earlier messages', () => {
  // `loadHistory` replaces the window rather than prepending a page, so paging
  // means asking for a bigger window each time.
  it('asks the hook for a bigger window on each press', () => {
    const chat = makeChat(Array.from({ length: 20 }, (_, i) => makeMsg(`m${i}`)));
    render(
      <WrappedChatPanel chat={chat} loadMoreHistory joinHistoryLimit={20} historyPageSize={50} />,
    );
    fireEvent.click(screen.getByText(/load earlier/i));
    expect(chat.loadHistory).toHaveBeenCalledWith(70);
  });

  it('retires the button once a short window comes back', () => {
    const chat = makeChat([makeMsg('m1')]);
    render(<WrappedChatPanel chat={chat} loadMoreHistory joinHistoryLimit={20} />);
    expect(screen.queryByText(/load earlier/i)).not.toBeInTheDocument();
  });

  it('offers nothing by default — a gateway with no history store has nothing to page', () => {
    const chat = makeChat(Array.from({ length: 20 }, (_, i) => makeMsg(`m${i}`)));
    render(<WrappedChatPanel chat={chat} />);
    expect(screen.queryByText(/load earlier/i)).not.toBeInTheDocument();
  });

  it('lets the host take the paging over', () => {
    const onLoadMore = vi.fn();
    const chat = makeChat([makeMsg('m1')]);
    render(<WrappedChatPanel chat={chat} onLoadMore={onLoadMore} hasMore />);
    fireEvent.click(screen.getByText(/load earlier/i));
    expect(onLoadMore).toHaveBeenCalled();
    expect(chat.loadHistory).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// Host-owned surfaces
// ---------------------------------------------------------------------------

describe('host-owned props reach the panel', () => {
  it('forwards the reply control', () => {
    const onReply = vi.fn();
    render(
      <WrappedChatPanel chat={makeChat([makeMsg('m1')])} onReply={onReply} currentUserId="u1" />,
    );
    openMessageActions(document.querySelector('[data-message-id="m1"]')!);
    fireEvent.click(screen.getByTitle(/reply/i));
    expect(onReply).toHaveBeenCalledWith(expect.objectContaining({ id: 'm1' }));
  });

  it('forwards a replacement composer', () => {
    render(
      <WrappedChatPanel
        chat={makeChat()}
        composer={<div data-testid="rich-composer">rich</div>}
      />,
    );
    expect(screen.getByTestId('rich-composer')).toBeInTheDocument();
  });

  it('forwards showHeader so the host can name the region itself', () => {
    const { rerender } = render(<WrappedChatPanel chat={makeChat()} />);
    expect(screen.getByText(/^Chat/)).toBeInTheDocument();
    rerender(<WrappedChatPanel chat={makeChat()} showHeader={false} />);
    expect(screen.queryByText(/^Chat/)).not.toBeInTheDocument();
  });
});
