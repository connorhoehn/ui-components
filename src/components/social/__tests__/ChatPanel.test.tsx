import { render, screen, fireEvent, act } from '@testing-library/react';
import { ChatPanel } from '../ChatPanel';
import type { ChatMessage } from '../../../hooks/useChat';

function msg(overrides: Partial<ChatMessage> & { clientId: string; content: string }): ChatMessage {
  return {
    clientId: overrides.clientId,
    content: overrides.content,
    timestamp: overrides.timestamp ?? '2026-01-01T12:34:00.000Z',
    displayName: overrides.displayName,
  };
}

describe('ChatPanel', () => {
  it('shows the message count in the header', () => {
    render(<ChatPanel messages={[msg({ clientId: 'a', content: 'hi' })]} onSend={vi.fn()} />);
    expect(screen.getByText('Chat (1)')).toBeInTheDocument();
  });

  it('renders empty-state copy when there are no messages', () => {
    render(<ChatPanel messages={[]} onSend={vi.fn()} />);
    expect(screen.getByText('No messages yet')).toBeInTheDocument();
  });

  it('renders displayName as author when provided', () => {
    render(
      <ChatPanel
        messages={[msg({ clientId: 'client-xyz', content: 'hello', displayName: 'Alice' })]}
        onSend={vi.fn()}
      />
    );
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('falls back to the first 8 chars of clientId when displayName is missing', () => {
    render(
      <ChatPanel
        messages={[msg({ clientId: 'abcdefghijklmnop', content: 'hey' })]}
        onSend={vi.fn()}
      />
    );
    expect(screen.getByText('abcdefgh')).toBeInTheDocument();
  });

  it('disables the Send button when the input is empty', () => {
    render(<ChatPanel messages={[]} onSend={vi.fn()} />);
    const button = screen.getByRole('button', { name: 'Send' });
    expect(button).toBeDisabled();
  });

  it('disables both the input and Send button when disabled=true', () => {
    render(<ChatPanel messages={[]} onSend={vi.fn()} disabled />);
    expect(screen.getByPlaceholderText('Not connected')).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Send' })).toBeDisabled();
  });

  it('calls onSend with the trimmed content and clears the input', () => {
    const onSend = vi.fn();
    render(<ChatPanel messages={[]} onSend={onSend} />);
    const input = screen.getByPlaceholderText('Type a message...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '  hello world  ' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(onSend).toHaveBeenCalledWith('hello world');
    expect(input.value).toBe('');
  });

  it('sends on Enter key when input is non-empty', () => {
    const onSend = vi.fn();
    render(<ChatPanel messages={[]} onSend={onSend} />);
    const input = screen.getByPlaceholderText('Type a message...');
    fireEvent.change(input, { target: { value: 'enter-send' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSend).toHaveBeenCalledWith('enter-send');
  });

  it('does not call onSend on whitespace-only input', () => {
    const onSend = vi.fn();
    render(<ChatPanel messages={[]} onSend={onSend} />);
    const input = screen.getByPlaceholderText('Type a message...');
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSend).not.toHaveBeenCalled();
  });

  it('formats the typing banner for a single user', () => {
    render(<ChatPanel messages={[]} onSend={vi.fn()} typingUsers={['Alice']} />);
    expect(screen.getByText('Alice is typing...')).toBeInTheDocument();
  });

  it('formats the typing banner for two users', () => {
    render(<ChatPanel messages={[]} onSend={vi.fn()} typingUsers={['Alice', 'Bob']} />);
    expect(screen.getByText('Alice and Bob are typing...')).toBeInTheDocument();
  });

  it('formats the typing banner for three or more users', () => {
    render(
      <ChatPanel
        messages={[]}
        onSend={vi.fn()}
        typingUsers={['Alice', 'Bob', 'Carol', 'Dave']}
      />
    );
    expect(screen.getByText('Alice, Bob and 2 others are typing...')).toBeInTheDocument();
  });

  it('uses singular "other" when exactly three users are typing', () => {
    render(
      <ChatPanel messages={[]} onSend={vi.fn()} typingUsers={['Alice', 'Bob', 'Carol']} />
    );
    expect(screen.getByText('Alice, Bob and 1 other are typing...')).toBeInTheDocument();
  });

  it('does not render the typing banner when no users are typing', () => {
    render(<ChatPanel messages={[]} onSend={vi.fn()} />);
    expect(screen.queryByText(/typing\.\.\./)).not.toBeInTheDocument();
  });

  it('fires onTyping(true) on keydown and onTyping(false) on send', () => {
    vi.useFakeTimers();
    try {
      const onTyping = vi.fn();
      const onSend = vi.fn();
      render(<ChatPanel messages={[]} onSend={onSend} onTyping={onTyping} />);
      const input = screen.getByPlaceholderText('Type a message...');
      fireEvent.change(input, { target: { value: 'x' } });
      fireEvent.keyDown(input, { key: 'a' });
      expect(onTyping).toHaveBeenCalledWith(true);

      onTyping.mockClear();
      fireEvent.change(input, { target: { value: 'hi' } });
      fireEvent.click(screen.getByRole('button', { name: 'Send' }));
      expect(onTyping).toHaveBeenCalledWith(false);
    } finally {
      vi.useRealTimers();
    }
  });

  it('fires onTyping(false) after the 2s idle timer elapses', () => {
    vi.useFakeTimers();
    try {
      const onTyping = vi.fn();
      render(<ChatPanel messages={[]} onSend={vi.fn()} onTyping={onTyping} />);
      const input = screen.getByPlaceholderText('Type a message...');
      fireEvent.change(input, { target: { value: 'x' } });
      fireEvent.keyDown(input, { key: 'a' });
      onTyping.mockClear();
      act(() => {
        vi.advanceTimersByTime(2000);
      });
      expect(onTyping).toHaveBeenCalledWith(false);
    } finally {
      vi.useRealTimers();
    }
  });
});
