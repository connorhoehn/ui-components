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

describe('ChatPanel assistant voice', () => {
  const at = (minute: number) => `2026-09-19T12:0${minute}:00.000Z`;
  const nova = (id: string, minute: number, metadata: Record<string, unknown> = {}): ChatMessage => ({
    id, clientId: 'server:assistant', userId: 'agent:nova', displayName: 'Nova', content: `Nova says ${id}.`, timestamp: at(minute), metadata,
  });
  const isNova = (m: ChatMessage) => m.userId === 'agent:nova';

  it('marks an assistant row: its mark in the avatar slot, the accent author ink and the tinted text surface', () => {
    render(<ChatPanel messages={[nova('m-reply', 0), { ...message, id: 'm-person', timestamp: at(1) }]} onSend={() => {}} isAssistantMessage={isNova} />);
    const [reply, person] = screen.getAllByTestId('chat-message');
    expect(reply).toHaveAttribute('data-voice', 'assistant');
    expect(reply.querySelector('[data-testid="assistant-mark"]')).not.toBeNull();
    expect(reply.querySelector('[data-testid="message-row-author"]')).toHaveTextContent('Nova');
    expect(reply.querySelector('[data-testid="message-row-author"]')?.className).toContain('text-accent-fg');
    expect(reply.querySelector('[data-testid="message-row-content"]')?.className).toContain('bg-accent-callout');
    expect(person).not.toHaveAttribute('data-voice');
    expect(person.querySelector('[data-testid="assistant-mark"]')).toBeNull();
    expect(person.querySelector('[data-testid="message-row-content"]')?.className).not.toContain('bg-accent-callout');
  });

  it('a host system line for the assistant sits at the start under its mark in a tinted pill; a person-less line stays centred', () => {
    render(
      <ChatPanel
        messages={[nova('m-paused', 0, { kind: 'notice' }), { ...message, id: 'm-joined', timestamp: at(1), metadata: { kind: 'notice' } }]}
        onSend={() => {}}
        isAssistantMessage={isNova}
        renderSystemMessage={(m) => (m.metadata?.kind === 'notice' ? <span>{m.content}</span> : null)}
      />,
    );
    const [assistantLine, plainLine] = screen.getAllByTestId('chat-system-line');
    expect(assistantLine).toHaveAttribute('data-voice', 'assistant');
    expect(assistantLine.className).not.toContain('justify-center');
    expect(assistantLine.querySelector('[data-testid="assistant-mark"]')).not.toBeNull();
    expect(assistantLine.querySelector('[data-testid="chat-assistant-notice"]')).toHaveTextContent('Nova says m-paused.');
    expect(plainLine).not.toHaveAttribute('data-voice');
    expect(plainLine.className).toContain('justify-center');
    expect(plainLine.querySelector('[data-testid="assistant-mark"]')).toBeNull();
  });

  it('a message under a host system line states its author again, even inside the same run', () => {
    render(
      <ChatPanel
        messages={[nova('m-notice', 0, { kind: 'notice' }), nova('m-reply', 1), nova('m-reply-2', 2)]}
        onSend={() => {}}
        isAssistantMessage={isNova}
        renderSystemMessage={(m) => (m.metadata?.kind === 'notice' ? <span>{m.content}</span> : null)}
      />,
    );
    const [first, second] = screen.getAllByTestId('chat-message');
    expect(first).not.toHaveAttribute('data-continues');
    expect(first.querySelector('[data-testid="message-row-author"]')).toHaveTextContent('Nova');
    // Two replies in a row still collapse into one run, and the second keeps the tinted surface.
    expect(second).toHaveAttribute('data-continues', 'true');
    expect(second.querySelector('[data-testid="message-row-content"]')?.className).toContain('bg-accent-callout');
  });

  it('a host body on an assistant row is drawn as given, without a bubble around it, and a custom mark replaces the default', () => {
    render(
      <ChatPanel
        messages={[nova('m-card', 0)]}
        onSend={() => {}}
        isAssistantMessage={isNova}
        assistantMark={<span data-testid="custom-mark" />}
        renderMessageBody={() => <div data-testid="card">card</div>}
      />,
    );
    const row = screen.getByTestId('chat-message');
    expect(row).toContainElement(screen.getByTestId('custom-mark'));
    expect(row.querySelector('[data-testid="assistant-mark"]')).toBeNull();
    expect(row.querySelector('[data-testid="message-row-content"]')?.className).not.toContain('bg-accent-callout');
  });

  it('is unchanged without isAssistantMessage', () => {
    render(<ChatPanel messages={[nova('m-reply', 0)]} onSend={() => {}} />);
    const row = screen.getByTestId('chat-message');
    expect(row).not.toHaveAttribute('data-voice');
    expect(row.querySelector('[data-testid="assistant-mark"]')).toBeNull();
  });
});
