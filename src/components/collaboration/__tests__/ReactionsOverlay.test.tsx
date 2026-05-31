import { render, screen } from '@testing-library/react';
import { ReactionsOverlay } from '../ReactionsOverlay';
import type { EphemeralReaction } from '../../../hooks/useReactions';

function mk(over: Partial<EphemeralReaction> & Pick<EphemeralReaction, 'id' | 'emoji'>): EphemeralReaction {
  return {
    id: over.id,
    emoji: over.emoji,
    x: over.x ?? 50,
    y: over.y ?? 50,
    timestamp: over.timestamp ?? new Date(0).toISOString(),
  };
}

describe('ReactionsOverlay', () => {
  it('renders no children when reactions is empty', () => {
    const { container } = render(<ReactionsOverlay reactions={[]} />);
    expect(container.firstChild).not.toBeNull();
    expect((container.firstChild as HTMLElement).children.length).toBe(0);
  });

  it('renders one span per reaction with its emoji', () => {
    render(
      <ReactionsOverlay
        reactions={[
          mk({ id: 'a', emoji: '❤️' }),
          mk({ id: 'b', emoji: '🎉' }),
          mk({ id: 'c', emoji: '🚀' }),
        ]}
      />,
    );
    expect(screen.getByText('❤️')).toBeInTheDocument();
    expect(screen.getByText('🎉')).toBeInTheDocument();
    expect(screen.getByText('🚀')).toBeInTheDocument();
  });

  it('applies the per-emoji animation class for known emojis', () => {
    render(<ReactionsOverlay reactions={[mk({ id: 'a', emoji: '❤️' })]} />);
    const span = screen.getByText('❤️');
    expect(span.className).toMatch(/reaction-heart/);
  });

  it('falls back to reaction-fade-up for unknown emojis', () => {
    render(<ReactionsOverlay reactions={[mk({ id: 'a', emoji: '🦄' })]} />);
    const span = screen.getByText('🦄');
    expect(span.className).toMatch(/reaction-fade-up/);
  });

  it('positions each reaction with the supplied percentage coords', () => {
    render(<ReactionsOverlay reactions={[mk({ id: 'a', emoji: '🔥', x: 25, y: 75 })]} />);
    const span = screen.getByText('🔥');
    expect(span.style.left).toBe('25%');
    expect(span.style.top).toBe('75%');
  });
});
