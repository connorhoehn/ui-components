import { render, screen } from '@testing-library/react';
import { ChatPanel } from '../ChatPanel';
import { QuoteBlock } from '../QuoteBlock';

// A quote is a REFERENCE to a message, not that message. The distinction is
// invisible until something selects on it — and every jump in the app selects
// on `data-message-id`, so a quote spelled the same way silently competes with
// the row it points at.

describe('QuoteBlock — a quote does not claim the id of what it quotes', () => {
  const quote = { messageId: 'm-1', author: 'Carol Johnson', text: 'the original words' };

  it('carries the quoted id under its own attribute', () => {
    render(<QuoteBlock quote={quote} data-testid="q" />);
    const el = screen.getByTestId('q');
    expect(el).toHaveAttribute('data-quoted-message-id', 'm-1');
    expect(el).not.toHaveAttribute('data-message-id');
  });

  it('leaves a row the only thing a jump selector can find', () => {
    // The shape that used to break: the target has scrolled out of the loaded
    // window, so the only `[data-message-id="m-1"]` in the document was the
    // quote of it — and the jump landed on the reply instead of the original.
    render(
      <ChatPanel
        messages={[
          { id: 'm-1', clientId: 'c-carol', userId: 'u-carol', displayName: 'Carol Johnson', content: 'the original words', timestamp: '2026-09-16T10:00:00Z' },
          {
            id: 'm-2', clientId: 'c-eve', userId: 'u-eve', displayName: 'Eve Thompson', content: 'answering that',
            timestamp: '2026-09-16T10:01:00Z',
            metadata: { replyTo: quote },
          },
        ]}
        onSend={vi.fn()}
        onJumpToMessage={vi.fn()}
      />,
    );
    const matches = [...document.querySelectorAll('[data-message-id="m-1"]')];
    expect(matches).toHaveLength(1);
    expect(matches[0]).toHaveAttribute('data-testid', 'chat-message');
  });
});
