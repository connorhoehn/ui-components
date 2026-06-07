import { render, screen, fireEvent } from '@testing-library/react';
import { ConversationHistory } from '../ConversationHistory';
import type { AgUiSession, AgUiMessage } from '../../../../types/agents';

let nextId = 0;
function m(role: AgUiMessage['role'], content: string): AgUiMessage {
  return { id: `msg-${++nextId}`, role, content, isStreaming: false, toolCalls: [] };
}

function s(threadId: string, messages: AgUiMessage[]): AgUiSession {
  return { threadId, runId: null, messages, state: null };
}

describe('ConversationHistory', () => {
  it('renders the empty state when no sessions are provided', () => {
    render(<ConversationHistory sessions={[]} emptyMessage="Nothing yet" />);
    expect(screen.getByText('Nothing yet')).toBeInTheDocument();
  });

  it('derives a title from the first user message', () => {
    render(
      <ConversationHistory
        sessions={[s('t1', [m('user', 'Help me write a query for sales data')])]}
      />,
    );
    expect(screen.getByText('Help me write a query for sales data')).toBeInTheDocument();
  });

  it("shows 'New conversation' when no user message is present", () => {
    render(
      <ConversationHistory
        sessions={[s('t1', [m('assistant', 'Hello, how can I help?')])]}
      />,
    );
    expect(screen.getByText('New conversation')).toBeInTheDocument();
  });

  it('shows the latest assistant message as a snippet', () => {
    render(
      <ConversationHistory
        sessions={[
          s('t1', [
            m('user', 'pick a number'),
            m('assistant', 'first reply'),
            m('user', 'again'),
            m('assistant', 'final reply'),
          ]),
        ]}
      />,
    );
    expect(screen.getByText('final reply')).toBeInTheDocument();
  });

  it('calls onResume with the clicked session', () => {
    const onResume = vi.fn();
    const session = s('t1', [m('user', 'first request')]);
    render(<ConversationHistory sessions={[session]} onResume={onResume} />);
    fireEvent.click(screen.getByText('first request'));
    expect(onResume).toHaveBeenCalledWith(session);
  });

  it('renders a delete button only when onDelete is provided', () => {
    const onDelete = vi.fn();
    const session = s('t1', [m('user', 'find docs')]);
    const { rerender } = render(
      <ConversationHistory sessions={[session]} onResume={() => {}} />,
    );
    expect(screen.queryByRole('button', { name: /^Delete conversation/ })).not.toBeInTheDocument();

    rerender(
      <ConversationHistory sessions={[session]} onResume={() => {}} onDelete={onDelete} />,
    );
    const deleteBtn = screen.getByRole('button', { name: /^Delete conversation/ });
    fireEvent.click(deleteBtn);
    expect(onDelete).toHaveBeenCalledWith(session);
  });

  it('truncates long titles past 80 chars', () => {
    const longPrompt = 'a'.repeat(120);
    render(<ConversationHistory sessions={[s('t1', [m('user', longPrompt)])]} />);
    const rendered = screen.getByText((content) => content.startsWith('aaa') && content.endsWith('…'));
    expect(rendered.textContent!.length).toBeLessThanOrEqual(80);
  });
});
