import { render, screen } from '@testing-library/react';
import { MessageRow, formatChatTime } from '../MessageRow';

describe('MessageRow', () => {
  const baseProps = {
    author: 'Alice',
    content: 'Hello world',
    timestamp: '2026-05-30T15:30:00Z',
  };

  it('renders avatar (by initial), author, content, and time', () => {
    render(<MessageRow {...baseProps} />);
    expect(screen.getByTestId('message-row')).toBeInTheDocument();
    expect(screen.getByTestId('message-row-author')).toHaveTextContent('Alice');
    expect(screen.getByTestId('message-row-content')).toHaveTextContent('Hello world');
    expect(screen.getByTestId('message-row-time').textContent).toMatch(/^\d{2}:\d{2}$/);
  });

  it('hides the avatar when hideAvatar=true (slot is still rendered as a spacer)', () => {
    const { container } = render(<MessageRow {...baseProps} hideAvatar />);
    // The Avatar component is gone — no img, no initial-rendering span.
    // The spacer div is still there to keep alignment.
    const avatarSlot = container.querySelector('[data-testid="message-row"] > div:first-child');
    expect(avatarSlot).toBeInTheDocument();
    expect(avatarSlot?.children.length).toBe(0);
  });

  it('hides the author label when hideAuthor=true', () => {
    render(<MessageRow {...baseProps} hideAuthor />);
    expect(screen.queryByTestId('message-row-author')).not.toBeInTheDocument();
    expect(screen.getByTestId('message-row-content')).toBeInTheDocument();
  });

  it('reflects the mine prop on the data-mine attribute', () => {
    const { rerender } = render(<MessageRow {...baseProps} />);
    expect(screen.getByTestId('message-row')).toHaveAttribute('data-mine', 'false');
    rerender(<MessageRow {...baseProps} mine />);
    expect(screen.getByTestId('message-row')).toHaveAttribute('data-mine', 'true');
  });

  it('renders a footer slot below the content when provided', () => {
    render(
      <MessageRow
        {...baseProps}
        footer={<div data-testid="custom-footer">reactions</div>}
      />,
    );
    expect(screen.getByTestId('message-row-footer')).toBeInTheDocument();
    expect(screen.getByTestId('custom-footer')).toBeInTheDocument();
  });

  it('accepts ReactNode content (e.g. inline mention chips)', () => {
    render(
      <MessageRow
        {...baseProps}
        content={
          <>
            hi <strong data-testid="mention">@bob</strong>
          </>
        }
      />,
    );
    expect(screen.getByTestId('mention')).toBeInTheDocument();
    expect(screen.getByTestId('message-row-content')).toHaveTextContent('hi @bob');
  });

  it('omits the time element entirely when timestamp is invalid', () => {
    render(<MessageRow {...baseProps} timestamp="not-a-date" />);
    expect(screen.queryByTestId('message-row-time')).not.toBeInTheDocument();
  });
});

describe('formatChatTime', () => {
  it('returns HH:MM for a valid ISO string', () => {
    expect(formatChatTime('2026-05-30T05:09:00Z')).toMatch(/^\d{2}:\d{2}$/);
  });

  it('returns empty string for an invalid input', () => {
    expect(formatChatTime('not-a-date')).toBe('');
  });

  it('returns empty string for empty input', () => {
    expect(formatChatTime('')).toBe('');
  });
});
