import { render, screen, fireEvent } from '@testing-library/react';
import { ReactionPicker } from '../ReactionOverlay';

const DEFAULT_EMOJIS = ['👍', '❤️', '🔥', '😂', '👏', '🎉', '😮', '💯'];

describe('ReactionPicker', () => {
  it('renders the default 8-emoji set', () => {
    render(<ReactionPicker onReact={() => {}} />);
    for (const emoji of DEFAULT_EMOJIS) {
      expect(screen.getByText(emoji)).toBeInTheDocument();
    }
    expect(screen.getAllByRole('button')).toHaveLength(8);
  });

  it('renders a caller-supplied emoji set', () => {
    render(<ReactionPicker onReact={() => {}} emojis={['🙂', '🚀']} />);
    expect(screen.getAllByRole('button')).toHaveLength(2);
    expect(screen.getByText('🙂')).toBeInTheDocument();
    expect(screen.getByText('🚀')).toBeInTheDocument();
  });

  it('calls onReact with the clicked emoji', () => {
    const onReact = vi.fn();
    render(<ReactionPicker onReact={onReact} emojis={['🙂', '🚀']} />);
    fireEvent.click(screen.getByText('🚀'));
    expect(onReact).toHaveBeenCalledWith('🚀');
  });

  it('renders nothing inside the picker when given an empty emoji array', () => {
    render(<ReactionPicker onReact={() => {}} emojis={[]} />);
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });
});
