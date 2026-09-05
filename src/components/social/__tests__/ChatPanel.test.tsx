import { render, screen, fireEvent, act } from '@testing-library/react';
import { ChatPanel } from '../ChatPanel';
import type { ChatMessage } from '../../../hooks/useChat';

function msg(overrides: Partial<ChatMessage> & { clientId: string; content: string }): ChatMessage {
  return {
    clientId: overrides.clientId,
    content: overrides.content,
    timestamp: overrides.timestamp ?? '2026-01-01T12:34:00.000Z',
    displayName: overrides.displayName,
    avatarUrl: overrides.avatarUrl,
  };
}

describe('ChatPanel', () => {
  it('shows the message count in the header', () => {
    render(<ChatPanel messages={[msg({ clientId: 'a', content: 'hi' })]} onSend={vi.fn()} />);
    expect(screen.getByText('Chat (1)')).toBeInTheDocument();
  });

  it('showHeader={false} drops the heading but keeps the panel', () => {
    render(<ChatPanel showHeader={false} messages={[msg({ clientId: 'a', content: 'hi' })]} onSend={vi.fn()} />);
    expect(screen.queryByText('Chat (1)')).toBeNull();
    expect(screen.getByText('hi')).toBeInTheDocument();
  });

  it('fill swaps the 200px-capped list for a flexible one inside a full-height column', () => {
    const { rerender } = render(<ChatPanel messages={[]} onSend={vi.fn()} />);
    expect(screen.getByTestId('chat-panel-messages').className).toContain('max-h-[200px]');
    expect(screen.getByTestId('chat-panel').className).toContain('mt-4');

    rerender(<ChatPanel fill messages={[]} onSend={vi.fn()} />);
    expect(screen.getByTestId('chat-panel-messages').className).toContain('flex-1');
    expect(screen.getByTestId('chat-panel-messages').className).not.toContain('max-h-[200px]');
    const root = screen.getByTestId('chat-panel');
    expect(root.className).toContain('h-full');
    // No card of its own, and no top margin to stack under a dock header.
    expect(root.className).not.toContain('mt-4');
    expect(root.className).not.toContain('border');
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

  it('renders an avatar with initials for each message', () => {
    render(
      <ChatPanel
        messages={[msg({ clientId: 'a', content: 'hi', displayName: 'Alice Smith' })]}
        onSend={vi.fn()}
      />
    );
    // Avatar derives "AS" from "Alice Smith"
    expect(screen.getByTitle('Alice Smith')).toBeInTheDocument();
    expect(screen.getByText('AS')).toBeInTheDocument();
  });

  it('renders an avatar image when avatarUrl is provided', () => {
    render(
      <ChatPanel
        messages={[
          msg({
            clientId: 'a',
            content: 'hi',
            displayName: 'Alice',
            avatarUrl: 'https://example.com/alice.png',
          }),
        ]}
        onSend={vi.fn()}
      />
    );
    const img = screen.getByAltText('Alice') as HTMLImageElement;
    expect(img.tagName).toBe('IMG');
    expect(img.src).toBe('https://example.com/alice.png');
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

  it('renders the Send action as the shared Button primitive (primary variant)', () => {
    render(<ChatPanel messages={[]} onSend={vi.fn()} />);
    const button = screen.getByRole('button', { name: 'Send' });
    expect(button.className).toContain('bg-primary');
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

// tone="dark" — the call-chrome variant. The regression this locks in:
// message text rendered with light-theme tokens on a dark surface was
// invisible (operator screenshot, 2026-08-25).
describe('ChatPanel — dark tone', () => {
  it('renders message content, author, and time with readable white/alpha classes', () => {
    render(
      <ChatPanel
        tone="dark"
        messages={[msg({ clientId: 'a', content: 'hello there', displayName: 'Alice' })]}
        onSend={vi.fn()}
      />,
    );
    expect(screen.getByTestId('message-row-content').className).toContain('text-white/90');
    expect(screen.getByTestId('message-row-author').className).toContain('text-white/70');
    expect(screen.getByTestId('message-row-time').className).toContain('text-white/40');
  });

  it('light tone (default) keeps the theme-token classes', () => {
    render(
      <ChatPanel
        messages={[msg({ clientId: 'a', content: 'hello there', displayName: 'Alice' })]}
        onSend={vi.fn()}
      />,
    );
    expect(screen.getByTestId('message-row-content').className).toContain('text-text-primary');
    expect(screen.getByTestId('message-row-content').className).not.toContain('text-white/90');
  });

  it('empty state is tone-aware', () => {
    render(<ChatPanel tone="dark" messages={[]} onSend={vi.fn()} />);
    expect(screen.getByText('No messages yet').className).toContain('text-white/40');
  });

  it('typing banner is tone-aware', () => {
    render(<ChatPanel tone="dark" messages={[]} onSend={vi.fn()} typingUsers={['Alice']} />);
    expect(screen.getByText('Alice is typing...').className).toContain('text-white/50');
  });

  it('styles the input for dark chrome and keeps the Send Button primitive', () => {
    render(<ChatPanel tone="dark" messages={[]} onSend={vi.fn()} />);
    const input = screen.getByPlaceholderText('Type a message...');
    expect(input.className).toContain('bg-white/10');
    expect(input.className).toContain('placeholder:text-white/35');
    expect(screen.getByRole('button', { name: 'Send' }).className).toContain('bg-primary');
  });

  it('keeps the exact submit semantics — Enter sends and clears', () => {
    const onSend = vi.fn();
    render(<ChatPanel tone="dark" messages={[]} onSend={onSend} />);
    const input = screen.getByPlaceholderText('Type a message...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'dark send' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSend).toHaveBeenCalledWith('dark send');
    expect(input.value).toBe('');
  });
});

// The composer slot: a host with the rich-text stack swaps in its own input.
// ChatPanel's plain field stays the default so a support widget or log console
// pays no rich-text cost.
describe('ChatPanel — composer slot', () => {
  it('renders the host composer in place of the built-in input row', () => {
    render(
      <ChatPanel
        messages={[]}
        onSend={vi.fn()}
        composer={<button>my composer</button>}
      />,
    );

    expect(screen.getByTestId('chat-panel-composer-slot')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'my composer' })).toBeInTheDocument();
    // The built-in field is GONE, not hidden behind it — two message inputs in
    // one panel is two places to type and one of them does nothing.
    expect(screen.queryByPlaceholderText(/type a message/i)).toBeNull();
  });

  it('keeps its own input when no slot is given', () => {
    render(<ChatPanel messages={[]} onSend={vi.fn()} />);
    expect(screen.queryByTestId('chat-panel-composer-slot')).toBeNull();
  });
});
