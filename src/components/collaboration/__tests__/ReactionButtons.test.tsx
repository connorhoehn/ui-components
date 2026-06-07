import { render, screen, fireEvent } from '@testing-library/react';
import { ReactionButtons } from '../ReactionButtons';

const EXPECTED_EMOJIS = ['❤️', '😂', '👍', '👎', '😮', '😢', '😡', '🎉', '🔥', '⚡', '💯', '🚀'];

describe('ReactionButtons', () => {
  it('renders all 12 emoji buttons', () => {
    render(<ReactionButtons onReact={() => {}} />);
    for (const emoji of EXPECTED_EMOJIS) {
      expect(screen.getByRole('button', { name: emoji })).toBeInTheDocument();
    }
  });

  it('invokes onReact with the clicked emoji', () => {
    const onReact = vi.fn();
    render(<ReactionButtons onReact={onReact} />);
    fireEvent.click(screen.getByRole('button', { name: '🎉' }));
    expect(onReact).toHaveBeenCalledTimes(1);
    expect(onReact).toHaveBeenCalledWith('🎉');
  });

  it('fires onReact independently for each emoji button', () => {
    const onReact = vi.fn();
    render(<ReactionButtons onReact={onReact} />);
    fireEvent.click(screen.getByRole('button', { name: '❤️' }));
    fireEvent.click(screen.getByRole('button', { name: '🔥' }));
    fireEvent.click(screen.getByRole('button', { name: '🚀' }));
    expect(onReact.mock.calls.map((c) => c[0])).toEqual(['❤️', '🔥', '🚀']);
  });

  it('disables every button and suppresses onReact when disabled=true', () => {
    const onReact = vi.fn();
    render(<ReactionButtons onReact={onReact} disabled />);
    for (const emoji of EXPECTED_EMOJIS) {
      const btn = screen.getByRole('button', { name: emoji });
      expect(btn).toBeDisabled();
      expect(btn.className).toMatch(/opacity-40/);
      expect(btn.className).toMatch(/cursor-not-allowed/);
      fireEvent.click(btn);
    }
    expect(onReact).not.toHaveBeenCalled();
  });

  it('enables every button when disabled is omitted (defaults to false)', () => {
    render(<ReactionButtons onReact={() => {}} />);
    for (const emoji of EXPECTED_EMOJIS) {
      const btn = screen.getByRole('button', { name: emoji });
      expect(btn).not.toBeDisabled();
      expect(btn.className).toMatch(/cursor-pointer/);
      expect(btn.className).toMatch(/opacity-100/);
    }
  });

  it('enables every button when disabled is explicitly false', () => {
    render(<ReactionButtons onReact={() => {}} disabled={false} />);
    for (const emoji of EXPECTED_EMOJIS) {
      const btn = screen.getByRole('button', { name: emoji });
      expect(btn).not.toBeDisabled();
    }
  });
});
