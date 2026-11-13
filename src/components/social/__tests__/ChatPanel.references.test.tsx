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

describe('ChatPanel host system lines and bodies', () => {
  const note: ChatMessage = { ...message, id: 'm-note', metadata: { kind: 'assistant-notice' } };

  it('renderSystemMessage replaces the whole row, with no author or bubble', () => {
    render(
      <ChatPanel
        messages={[note, { ...message, id: 'm-plain' }]}
        onSend={() => {}}
        renderSystemMessage={(m) => (m.id === 'm-note' ? <span>Nova joined</span> : null)}
      />,
    );
    const line = screen.getByTestId('chat-system-line');
    expect(line).toHaveTextContent('Nova joined');
    expect(line).toHaveAttribute('role', 'status');
    expect(screen.getAllByTestId('chat-message')).toHaveLength(1);
    expect(screen.queryByText('Look at this work.', { selector: '[data-message-id="m-note"] *' })).toBeNull();
  });

  it('renderMessageBody stands in for the text and null keeps it', () => {
    render(
      <ChatPanel
        messages={[note, { ...message, id: 'm-plain' }]}
        onSend={() => {}}
        renderMessageBody={(m) => (m.id === 'm-note' ? <div data-testid="card">card</div> : null)}
      />,
    );
    const rows = screen.getAllByTestId('chat-message');
    expect(rows).toHaveLength(2);
    expect(rows[0]).toContainElement(screen.getByTestId('card'));
    expect(rows[0]).not.toHaveTextContent('Look at this work.');
    expect(rows[1]).toHaveTextContent('Look at this work.');
  });

  it('is unchanged when neither prop is given', () => {
    render(<ChatPanel messages={[note]} onSend={() => {}} />);
    expect(screen.queryByTestId('chat-system-line')).toBeNull();
    expect(screen.getByTestId('chat-message')).toHaveTextContent('Look at this work.');
  });
});
