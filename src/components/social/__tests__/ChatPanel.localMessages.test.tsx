/**
 * Viewer-only messages in the thread.
 *
 * A `visibility: 'private'` command outcome lands here: a card only its owner
 * sees, in timeline order among the sent messages, with a note saying so and
 * the owner's actions under it. The panel renders and orders; the host owns
 * the list (posting, dismissing) — so the tests check what is shown and that
 * the buttons call back, never that anything disappears.
 */
import { render, screen, fireEvent, within } from '@testing-library/react';
import { ChatPanel, type LocalChatMessage } from '../ChatPanel';
import type { ChatMessage } from '../../../hooks/useChat';

function msg(id: string, content: string, timestamp: string): ChatMessage {
  return { id, clientId: 'c-' + id, content, timestamp, displayName: 'Bob' };
}

function local(overrides: Partial<LocalChatMessage> = {}): LocalChatMessage {
  return {
    id: 'l-1',
    timestamp: '2026-01-01T12:00:30.000Z',
    displayName: 'Ada',
    content: '/summarize',
    metadata: { kind: 'agent-run', command: '/summarize', instruction: 'Summarise this conversation', runId: 'r-1', pipelineId: 'summarize', documentId: 'd-1', agentName: 'Haiku' },
    ...overrides,
  };
}

describe('ChatPanel localMessages', () => {
  it('renders the local card through the agent-run path with the default note', () => {
    const agentRunStatus = vi.fn(() => undefined);
    const onOpenRun = vi.fn();
    render(<ChatPanel messages={[]} onSend={vi.fn()} localMessages={[local()]} agentRunStatus={agentRunStatus} onOpenRun={onOpenRun} />);
    const row = screen.getByTestId('chat-local-message');
    expect(row.getAttribute('data-local-message-id')).toBe('l-1');
    expect(within(row).getByTestId('agent-run-card')).toBeInTheDocument();
    expect(within(row).getByText('Only you can see this')).toBeInTheDocument();
    // Status is looked up by the run the metadata names, the same as a sent card.
    expect(agentRunStatus).toHaveBeenCalledWith('r-1');
    // Nothing is a sent message: the empty-state copy is gone, and no chat-message row exists.
    expect(screen.queryByText('No messages yet')).toBeNull();
    expect(screen.queryAllByTestId('chat-message')).toHaveLength(0);
  });

  it('shows a custom note and plain text when the metadata is not a run', () => {
    render(<ChatPanel messages={[]} onSend={vi.fn()} localMessages={[local({ metadata: {}, content: 'a draft nobody sent', note: 'Draft — post it when ready' })]} />);
    expect(screen.getByText('a draft nobody sent')).toBeInTheDocument();
    expect(screen.getByText('Draft — post it when ready')).toBeInTheDocument();
    expect(screen.queryByTestId('agent-run-card')).toBeNull();
  });

  it('sits in timeline order among sent messages by timestamp', () => {
    const messages = [
      msg('m1', 'first', '2026-01-01T12:00:00.000Z'),
      msg('m2', 'third', '2026-01-01T12:01:00.000Z'),
    ];
    render(<ChatPanel messages={messages} onSend={vi.fn()} localMessages={[local({ timestamp: '2026-01-01T12:00:30.000Z' })]} />);
    const rows = screen.getAllByTestId(/^chat-(local-)?message$/);
    expect(rows.map((r) => r.getAttribute('data-message-id') ?? r.getAttribute('data-local-message-id'))).toEqual(['m1', 'l-1', 'm2']);
  });

  it('lands at the live edge when it is the newest, and first when it is the oldest', () => {
    const messages = [msg('m1', 'first', '2026-01-01T12:00:00.000Z')];
    const { rerender } = render(<ChatPanel messages={messages} onSend={vi.fn()} localMessages={[local({ timestamp: '2026-01-01T12:05:00.000Z' })]} />);
    let rows = screen.getAllByTestId(/^chat-(local-)?message$/);
    expect(rows.map((r) => r.getAttribute('data-message-id') ?? r.getAttribute('data-local-message-id'))).toEqual(['m1', 'l-1']);

    rerender(<ChatPanel messages={messages} onSend={vi.fn()} localMessages={[local({ timestamp: '2026-01-01T11:00:00.000Z' })]} />);
    rows = screen.getAllByTestId(/^chat-(local-)?message$/);
    expect(rows.map((r) => r.getAttribute('data-message-id') ?? r.getAttribute('data-local-message-id'))).toEqual(['l-1', 'm1']);
  });

  it('renders the actions as buttons and calls back on click', () => {
    const post = vi.fn();
    const dismiss = vi.fn();
    render(
      <ChatPanel
        messages={[]}
        onSend={vi.fn()}
        localMessages={[local({ actions: [
          { id: 'post', label: 'Post to conversation', onSelect: post, primary: true },
          { id: 'dismiss', label: 'Dismiss', onSelect: dismiss },
        ] })]}
      />,
    );
    const actions = screen.getByTestId('chat-local-message-actions');
    fireEvent.click(within(actions).getByRole('button', { name: 'Post to conversation' }));
    expect(post).toHaveBeenCalledTimes(1);
    expect(dismiss).not.toHaveBeenCalled();
    fireEvent.click(within(actions).getByRole('button', { name: 'Dismiss' }));
    expect(dismiss).toHaveBeenCalledTimes(1);
  });

  it('renders no action row when there are no actions', () => {
    render(<ChatPanel messages={[]} onSend={vi.fn()} localMessages={[local()]} />);
    expect(screen.queryByTestId('chat-local-message-actions')).toBeNull();
  });
});
