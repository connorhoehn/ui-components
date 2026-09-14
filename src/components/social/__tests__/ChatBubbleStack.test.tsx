import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ChatBubbleStack } from '../ChatBubbleStack';

const b = (id: string, text: string) => ({ id, author: 'Ada', text, channelLabel: '#design' });

describe('ChatBubbleStack', () => {
  it('shows the newest few, who said what, and opens the conversation on click', () => {
    const onOpen = vi.fn(); const onDismiss = vi.fn();
    render(<ChatBubbleStack bubbles={[b('1', 'one'), b('2', 'two'), b('3', 'three'), b('4', 'four')]} max={3} onOpen={onOpen} onDismiss={onDismiss} />);
    const shown = screen.getAllByTestId('chat-bubble');
    expect(shown.map((e) => e.getAttribute('data-bubble-id'))).toEqual(['2', '3', '4']);
    expect(screen.getByText('four')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Ada said four/ }));
    expect(onOpen).toHaveBeenCalledWith('4');
  });

  it('dismisses on the ✕ and on its own after the timeout', () => {
    vi.useFakeTimers();
    const onDismiss = vi.fn();
    render(<ChatBubbleStack bubbles={[b('1', 'one')]} dismissAfterMs={5000} onOpen={vi.fn()} onDismiss={onDismiss} />);
    act(() => { vi.advanceTimersByTime(5001); });
    expect(onDismiss).toHaveBeenCalledWith('1');
    vi.useRealTimers();
    fireEvent.click(screen.getByTestId('chat-bubble-dismiss'));
    expect(onDismiss).toHaveBeenCalledTimes(2);
  });

  it('renders nothing with no bubbles', () => {
    const { container } = render(<ChatBubbleStack bubbles={[]} onOpen={vi.fn()} onDismiss={vi.fn()} />);
    expect(container.firstChild).toBeNull();
  });
});
