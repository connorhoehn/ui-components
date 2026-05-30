import { render, screen } from '@testing-library/react';
import { TypingIndicator, formatTypingBanner } from '../TypingIndicator';

describe('formatTypingBanner', () => {
  it('returns empty string for zero names', () => {
    expect(formatTypingBanner([])).toBe('');
  });
  it('formats one name as singular', () => {
    expect(formatTypingBanner(['Alice'])).toBe('Alice is typing…');
  });
  it('formats two names with "and"', () => {
    expect(formatTypingBanner(['Alice', 'Bob'])).toBe('Alice and Bob are typing…');
  });
  it('formats 3 names with one other', () => {
    expect(formatTypingBanner(['Alice', 'Bob', 'Charlie'])).toBe(
      'Alice, Bob and 1 other are typing…',
    );
  });
  it('pluralizes "others" for 4+ names', () => {
    expect(formatTypingBanner(['Alice', 'Bob', 'C', 'D', 'E'])).toBe(
      'Alice, Bob and 3 others are typing…',
    );
  });
});

describe('TypingIndicator', () => {
  it('renders nothing when names is empty', () => {
    const { container } = render(<TypingIndicator names={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders banner + dots when names are provided', () => {
    render(<TypingIndicator names={['Alice']} />);
    expect(screen.getByText('Alice is typing…')).toBeInTheDocument();
    expect(screen.getByTestId('typing-indicator')).toHaveAttribute('role', 'status');
  });

  it('omits banner text in compact mode', () => {
    render(<TypingIndicator names={['Alice']} compact />);
    expect(screen.queryByText('Alice is typing…')).not.toBeInTheDocument();
    expect(screen.getByTestId('typing-indicator')).toBeInTheDocument();
  });

  it('honors a custom testid', () => {
    render(<TypingIndicator names={['Alice']} data-testid="chat-typing" />);
    expect(screen.getByTestId('chat-typing')).toBeInTheDocument();
  });
});
