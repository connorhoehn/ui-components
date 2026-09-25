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

describe('MessageRow — tone', () => {
  const baseProps = {
    author: 'Alice',
    content: 'Hello world',
    timestamp: '2026-05-30T15:30:00Z',
  };

  it('tone="dark" renders content/author/time with white/alpha classes', () => {
    render(<MessageRow {...baseProps} tone="dark" />);
    expect(screen.getByTestId('message-row-content').className).toContain('text-white/90');
    expect(screen.getByTestId('message-row-author').className).toContain('text-white/70');
    expect(screen.getByTestId('message-row-time').className).toContain('text-white/40');
  });

  it('default (light) keeps the theme-token classes', () => {
    render(<MessageRow {...baseProps} />);
    expect(screen.getByTestId('message-row-content').className).toContain('text-text-primary');
    expect(screen.getByTestId('message-row-author').className).toContain('text-text-secondary');
    expect(screen.getByTestId('message-row-time').className).toContain('text-text-tertiary');
  });

  describe('contentLayout', () => {
    // A stand-in for a card body that sizes itself to its CONTAINER rather
    // than its content — same shape as AgentRunCard's `@container` query.
    // In jsdom there is no layout engine to measure against, so what's
    // asserted is the class that gives the card room, not a pixel width.
    function CardStub() {
      return <div data-testid="card-stub" style={{ containerType: 'inline-size' }}>card</div>;
    }

    it('a plain-text own message keeps the shrink-to-fit bubble classes (default "inline")', () => {
      render(<MessageRow {...baseProps} mine />);
      const content = screen.getByTestId('message-row-content');
      expect(content.className).toContain('max-w-[85%]');
      expect(content.className).toContain('rounded-lg');
      expect(content.className).toContain('bg-primary-bg');
      expect(content.className).not.toContain('w-full');
    });

    it('an own message with a card body (contentLayout="block") measures the card at its max width', () => {
      render(
        <MessageRow
          {...baseProps}
          mine
          contentLayout="block"
          content={<CardStub />}
        />,
      );
      const content = screen.getByTestId('message-row-content');
      // Full-width-up-to-a-cap, not the shrink-to-fit bubble: the card gets
      // real horizontal room instead of the 0px a @container query resolves
      // an unconstrained shrink-to-fit ancestor to.
      expect(content.className).toContain('w-full');
      expect(content.className).toContain('max-w-[30rem]');
      expect(content.className).not.toContain('max-w-[85%]');
      expect(content.className).not.toContain('bg-primary-bg');
      expect(content.className).not.toContain('rounded-lg');
      expect(screen.getByTestId('card-stub')).toBeInTheDocument();
    });

    it('contentLayout="block" on a non-mine row takes the same cap, at the left edge and with no bubble', () => {
      // A card on someone else's row used to stretch the whole column of a
      // full-page chat — a document card 1100px wide reads as a banner. The
      // cap is the message width; a narrow pane never reaches it.
      render(<MessageRow {...baseProps} contentLayout="block" content={<CardStub />} />);
      const content = screen.getByTestId('message-row-content');
      expect(content.className).toContain('w-full');
      expect(content.className).toContain('max-w-[30rem]');
      expect(content.className).not.toContain('max-w-[85%]');
      expect(content.className).not.toContain('bg-primary-bg');
    });
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
