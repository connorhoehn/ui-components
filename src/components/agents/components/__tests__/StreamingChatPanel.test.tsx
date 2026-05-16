import { render, screen, fireEvent } from '@testing-library/react';
import { StreamingChatPanel } from '../StreamingChatPanel';
import type { AgUiMessage } from '../../../../types/agents';

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const BASE_PROPS = {
  messages: [] as AgUiMessage[],
  isStreaming: false,
  error: null,
  onSend: vi.fn(),
};

function makeMsg(overrides: Partial<AgUiMessage> = {}): AgUiMessage {
  return {
    id: 'm1',
    role: 'assistant',
    content: 'Hello',
    isStreaming: false,
    toolCalls: [],
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('StreamingChatPanel', () => {
  beforeEach(() => {
    BASE_PROPS.onSend.mockClear();
  });

  it('renders the "Agent Chat" heading', () => {
    render(<StreamingChatPanel {...BASE_PROPS} />);
    expect(screen.getByText('Agent Chat')).toBeInTheDocument();
  });

  it('shows Streaming badge when isStreaming=true', () => {
    render(<StreamingChatPanel {...BASE_PROPS} isStreaming={true} />);
    expect(screen.getByText('Streaming')).toBeInTheDocument();
  });

  it('hides Streaming badge when isStreaming=false', () => {
    render(<StreamingChatPanel {...BASE_PROPS} isStreaming={false} />);
    expect(screen.queryByText('Streaming')).not.toBeInTheDocument();
  });

  it('renders user and assistant messages', () => {
    const messages: AgUiMessage[] = [
      makeMsg({ id: 'u1', role: 'user', content: 'Hi there' }),
      makeMsg({ id: 'a1', role: 'assistant', content: 'Hey!' }),
    ];
    render(<StreamingChatPanel {...BASE_PROPS} messages={messages} />);
    expect(screen.getByText('Hi there')).toBeInTheDocument();
    expect(screen.getByText('Hey!')).toBeInTheDocument();
  });

  it('calls onSend with trimmed text when Send is clicked', () => {
    render(<StreamingChatPanel {...BASE_PROPS} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '  hello world  ' } });
    fireEvent.click(screen.getByText('Send'));
    expect(BASE_PROPS.onSend).toHaveBeenCalledWith('hello world');
  });

  it('clears the input after send', () => {
    render(<StreamingChatPanel {...BASE_PROPS} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'hello' } });
    fireEvent.click(screen.getByText('Send'));
    expect(input).toHaveValue('');
  });

  it('fires onSend when Enter is pressed', () => {
    render(<StreamingChatPanel {...BASE_PROPS} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'enter message' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(BASE_PROPS.onSend).toHaveBeenCalledWith('enter message');
  });

  it('does not call onSend when input is empty', () => {
    render(<StreamingChatPanel {...BASE_PROPS} />);
    fireEvent.click(screen.getByText('Send'));
    expect(BASE_PROPS.onSend).not.toHaveBeenCalled();
  });

  it('shows Stop button during streaming and calls onCancel', () => {
    const onCancel = vi.fn();
    render(<StreamingChatPanel {...BASE_PROPS} isStreaming={true} onCancel={onCancel} />);
    const stop = screen.getByText('Stop');
    fireEvent.click(stop);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('hides Send button and shows Stop when streaming', () => {
    render(<StreamingChatPanel {...BASE_PROPS} isStreaming={true} onCancel={vi.fn()} />);
    expect(screen.queryByText('Send')).not.toBeInTheDocument();
    expect(screen.getByText('Stop')).toBeInTheDocument();
  });

  it('displays the error banner when error is set', () => {
    render(<StreamingChatPanel {...BASE_PROPS} error="Something went wrong" />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('hides the error banner when error is null', () => {
    render(<StreamingChatPanel {...BASE_PROPS} error={null} />);
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });

  it('renders streamingText when provided and no streaming message', () => {
    render(
      <StreamingChatPanel
        {...BASE_PROPS}
        isStreaming={true}
        streamingText="partial reply..."
      />,
    );
    expect(screen.getByText('partial reply...')).toBeInTheDocument();
  });

  it('renders reasoning block on assistant messages that have reasoning', () => {
    const messages: AgUiMessage[] = [
      makeMsg({ id: 'a1', role: 'assistant', content: 'Answer', reasoning: 'deep thought' }),
    ];
    render(<StreamingChatPanel {...BASE_PROPS} messages={messages} />);
    expect(screen.getByText('Reasoning')).toBeInTheDocument();
  });

  it('uses custom placeholder when not streaming', () => {
    render(<StreamingChatPanel {...BASE_PROPS} placeholder="Ask the agent..." />);
    expect(screen.getByPlaceholderText('Ask the agent...')).toBeInTheDocument();
  });

  it('disables input while streaming', () => {
    render(<StreamingChatPanel {...BASE_PROPS} isStreaming={true} />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('renders tool call name attached to a message', () => {
    const messages: AgUiMessage[] = [
      makeMsg({
        id: 'a1',
        role: 'assistant',
        content: 'Let me search',
        toolCalls: [
          { id: 'tc1', name: 'search_kb', args: '{}', status: 'completed', startedAt: 0 },
        ],
      }),
    ];
    render(<StreamingChatPanel {...BASE_PROPS} messages={messages} />);
    expect(screen.getByText('search_kb')).toBeInTheDocument();
  });
});
