// A call notice is a RECORD, not somebody's words.
//
// Replying to one quotes "Call started" back at the channel, which says
// nothing. Pinning one pins an event that already has its own place in the
// transcript and its own live/ended states. Offering an action with no meaning
// is how a thread fills up with pins nobody chose.

import { render, screen } from '@testing-library/react';
import { ChatPanel } from '../ChatPanel';
// ChatMessage lives on the hook, not the panel — the panel consumes it.
import type { ChatMessage } from '../../../hooks/useChat';

const NOOP = () => {};

function msg(overrides: Partial<ChatMessage> = {}): ChatMessage {
  return {
    id: 'm1',
    content: 'hello',
    displayName: 'Bob Martinez',
    timestamp: new Date('2026-09-07T12:00:00Z').toISOString(),
    ...overrides,
  } as ChatMessage;
}

// What the gateway's `postSystemMessage` actually emits: the card `kind`
// PLUS `system: true`.
const callNotice = msg({
  id: 'call-1',
  content: 'Bob Martinez started a call',
  metadata: { system: true, kind: 'call', callId: 'c-1', live: false, participants: [] },
});

// The other thing `postSystemMessage` emits. Renders as the SAME document card
// a person's share does, which is why the card kind cannot be the test.
const documentNotice = msg({
  id: 'doc-notice-1',
  content: 'Bob Martinez created Q3 plan',
  metadata: { system: true, kind: 'document', documentId: 'd-1', title: 'Q3 plan' },
});

const plain = msg({ id: 'plain-1', content: 'a normal message' });

function renderWith(messages: ChatMessage[]) {
  return render(
    <ChatPanel
      messages={messages}
      onSend={NOOP}
      onReply={NOOP}
      onTogglePin={NOOP}
      onToggleReaction={NOOP}
      currentUserId="u-someone-else"
    />,
  );
}

describe('interactions on a system notice', () => {
  it('offers neither reply nor pin', () => {
    renderWith([callNotice]);
    expect(screen.queryByTestId('message-actions-reply')).toBeNull();
    expect(screen.queryByTestId('message-actions-pin')).toBeNull();
  });

  // Reactions stay: reacting to "the call started" reads as a response to the
  // EVENT, which is exactly what it is.
  it('still offers a reaction', () => {
    renderWith([callNotice]);
    // The bar renders one button per quick reaction, keyed `react-<emoji>`.
    expect(screen.getByTestId('message-actions')).toBeInTheDocument();
    expect(
      screen.getByTestId('message-actions').querySelectorAll('[data-testid^="message-actions-react-"]').length,
    ).toBeGreaterThan(0);
  });

  it('leaves an ordinary message fully interactive', () => {
    renderWith([plain]);
    expect(screen.getByTestId('message-actions-reply')).toBeInTheDocument();
    expect(screen.getByTestId('message-actions-pin')).toBeInTheDocument();
  });

  // The auto-posted "X created a document" notice is a notice, even though it
  // renders as the same card a person's share does.
  it('suppresses reply and pin on a document NOTICE too', () => {
    renderWith([documentNotice]);
    expect(screen.queryByTestId('message-actions-reply')).toBeNull();
    expect(screen.queryByTestId('message-actions-pin')).toBeNull();
  });

  // …and the other route to that same card is a message somebody chose to
  // send, so it keeps everything. Gating on the card KIND would have silenced
  // this one too.
  it('does not suppress anything on a document a person shared', () => {
    renderWith([
      msg({
        id: 'doc-1',
        content: '📄 Q3 plan',
        metadata: { share: { kind: 'document', id: 'd-1', title: 'Q3 plan' } },
      }),
    ]);
    expect(screen.getByTestId('message-actions-reply')).toBeInTheDocument();
    expect(screen.getByTestId('message-actions-pin')).toBeInTheDocument();
  });
});
