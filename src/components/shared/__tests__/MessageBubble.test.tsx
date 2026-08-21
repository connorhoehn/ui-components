import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MessageBubble } from '../MessageBubble';

describe('MessageBubble', () => {
  it('labels user messages "You" and assistant messages "Assistant" by default', () => {
    const { rerender } = render(<MessageBubble role="user" content="hi" />);
    expect(screen.getByText('You')).toBeInTheDocument();
    rerender(<MessageBubble role="assistant" content="hello" />);
    expect(screen.getByText('Assistant')).toBeInTheDocument();
  });

  it('honors custom names', () => {
    render(<MessageBubble role="assistant" content="x" agentName="Research Bot" />);
    expect(screen.getByText('Research Bot')).toBeInTheDocument();
  });

  it('uses the injected markdown renderer for assistant content', () => {
    render(
      <MessageBubble
        role="assistant"
        content="**bold**"
        renderMarkdown={(c) => <em data-testid="md">{c}</em>}
      />,
    );
    expect(screen.getByTestId('md')).toHaveTextContent('**bold**');
  });

  it('renders a tool-call strip when toolCalls are present', () => {
    render(
      <MessageBubble
        role="assistant"
        content="done"
        toolCalls={[{ id: '1', name: 'search', done: true }]}
      />,
    );
    expect(screen.getByText(/search/)).toBeInTheDocument();
  });

  it('shows thinking dots for an empty streaming assistant message', () => {
    const { container } = render(<MessageBubble role="assistant" content="" streaming />);
    expect(container.querySelectorAll('span > span').length).toBeGreaterThanOrEqual(3);
  });
});
