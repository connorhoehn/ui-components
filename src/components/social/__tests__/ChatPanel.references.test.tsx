import { render, screen } from '@testing-library/react';
import type { ChatMessage } from '../../../hooks/useChat';
import { ChatPanel } from '../ChatPanel';

const message: ChatMessage = {
  id: 'm-reference',
  clientId: 'c-alice',
  userId: 'alice',
  displayName: 'Alice',
  content: 'Look at this work.',
  timestamp: '2026-09-19T12:00:00.000Z',
  metadata: { workReferences: [{ opaque: true }] },
};

describe('ChatPanel viewer-scoped message references', () => {
  it('renders the host resolution inside the durable message bubble', () => {
    render(
      <ChatPanel
        messages={[message]}
        onSend={() => {}}
        renderMessageReferences={(candidate) => (
          <div data-testid="resolved-reference">resolved for {candidate.id}</div>
        )}
      />,
    );

    expect(screen.getByTestId('resolved-reference')).toHaveTextContent('resolved for m-reference');
    expect(screen.getByTestId('resolved-reference').closest('[data-message-id]')).toHaveAttribute('data-message-id', 'm-reference');
  });

  it('does not render references for a deleted message', () => {
    render(
      <ChatPanel
        messages={[{ ...message, deletedAt: '2026-09-19T12:01:00.000Z' }]}
        onSend={() => {}}
        renderMessageReferences={() => <div data-testid="resolved-reference" />}
      />,
    );

    expect(screen.queryByTestId('resolved-reference')).not.toBeInTheDocument();
  });
});
