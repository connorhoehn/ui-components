// A call notice is a RECORD, not somebody's words.
//
// Replying to one quotes "Call started" back at the channel, which says
// nothing. Pinning one pins an event that already has its own place in the
// transcript and its own live/ended states. Offering an action with no meaning
// is how a thread fills up with pins nobody chose.

import { render, screen } from '@testing-library/react';
import { ChatPanel } from '../ChatPanel';
import type { ChatMessage } from '../ChatPanel';

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

const callNotice = msg({
  id: 'call-1',
  content: 'Call started',
  metadata: { kind: 'call', callId: 'c-1', live: false, participants: [] },
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

describe('interactions on a call notice', () => {
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

  // Scoped to calls on purpose. A shared document is a message somebody chose
  // to send, so replying to it and pinning it mean what they normally mean.
  it('does not suppress anything on a shared document', () => {
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
