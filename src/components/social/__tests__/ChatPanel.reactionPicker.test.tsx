import { render, screen, fireEvent } from '@testing-library/react';
import { ChatPanel } from '../ChatPanel';

// MessageActionBar has always had a "More reactions" control and ChatPanel
// never wired it, so no host could reach it: three quick reactions were the
// entire vocabulary a reader had. Teams lets you answer with any emoji.

const msg = {
  id: 'm1', clientId: 'c1', userId: 'u-carol', displayName: 'Carol Johnson',
  content: 'shipping tonight', timestamp: '2026-09-17T09:00:00.000Z',
};

describe('ChatPanel — reacting with something other than the quick three', () => {
  it('opens the picker from the message and toggles the emoji that was chosen', () => {
    const onToggleReaction = vi.fn();
    render(<ChatPanel messages={[msg]} onSend={vi.fn()} onToggleReaction={onToggleReaction} />);
    fireEvent.click(screen.getByTestId('message-actions-more-reactions'));
    // Whatever the grid offers, the first cell is a real choice.
    const first = screen.getAllByTestId('reaction-picker-item')[0];
    const chosen = first.textContent ?? '';
    fireEvent.click(first);
    expect(onToggleReaction).toHaveBeenCalledWith('m1', chosen);
  });

  it('closes after a choice, so the grid does not sit over the next message', () => {
    render(<ChatPanel messages={[msg]} onSend={vi.fn()} onToggleReaction={vi.fn()} />);
    fireEvent.click(screen.getByTestId('message-actions-more-reactions'));
    fireEvent.click(screen.getAllByTestId('reaction-picker-item')[0]);
    expect(screen.queryByTestId('reaction-picker-popover')).toBeNull();
  });

  it('offers no picker at all when the host cannot record a reaction', () => {
    // Without `onToggleReaction` the control would be a button that does
    // nothing — the same rule the quick row already follows.
    render(<ChatPanel messages={[msg]} onSend={vi.fn()} />);
    expect(screen.queryByTestId('message-actions-more-reactions')).toBeNull();
  });
});
