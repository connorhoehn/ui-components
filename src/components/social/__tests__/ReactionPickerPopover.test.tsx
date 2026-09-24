import { render, screen, fireEvent } from '@testing-library/react';
import { ReactionPickerPopover, DEFAULT_PICKER_EMOJIS } from '../ReactionPickerPopover';

describe('ReactionPickerPopover', () => {
  it('renders nothing when closed', () => {
    render(
      <ReactionPickerPopover open={false} onSelect={() => {}} onClose={() => {}} />,
    );
    expect(screen.queryByTestId('reaction-picker-popover')).not.toBeInTheDocument();
  });

  it('does not take the focus when it mounts closed', () => {
    const other = document.createElement('button');
    document.body.appendChild(other);
    other.focus();
    const trigger = { current: document.createElement('button') };
    document.body.appendChild(trigger.current);
    render(<ReactionPickerPopover open={false} triggerRef={trigger} onSelect={() => {}} onClose={() => {}} />);
    expect(document.activeElement).toBe(other);
    other.remove();
    trigger.current.remove();
  });

  it('renders the default 64-emoji grid when open', () => {
    render(
      <ReactionPickerPopover open onSelect={() => {}} onClose={() => {}} />,
    );
    const items = screen.getAllByTestId('reaction-picker-item');
    expect(items).toHaveLength(DEFAULT_PICKER_EMOJIS.length);
    expect(items[0]).toHaveAttribute('data-emoji', DEFAULT_PICKER_EMOJIS[0]!);
  });

  it('renders a custom emoji set when emojis is provided', () => {
    render(
      <ReactionPickerPopover
        open
        emojis={['🙂', '🚀', '✨']}
        onSelect={() => {}}
        onClose={() => {}}
      />,
    );
    const items = screen.getAllByTestId('reaction-picker-item');
    expect(items).toHaveLength(3);
  });

  it('clicking an item fires onSelect then onClose', () => {
    const onSelect = vi.fn();
    const onClose = vi.fn();
    render(
      <ReactionPickerPopover
        open
        emojis={['🙂', '🚀']}
        onSelect={onSelect}
        onClose={onClose}
      />,
    );
    fireEvent.click(screen.getAllByTestId('reaction-picker-item')[1]!);
    expect(onSelect).toHaveBeenCalledWith('🚀');
    expect(onClose).toHaveBeenCalled();
  });

  it('Escape key triggers onClose', () => {
    const onClose = vi.fn();
    render(
      <ReactionPickerPopover open onSelect={() => {}} onClose={onClose} />,
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('click outside the popover triggers onClose', () => {
    const onClose = vi.fn();
    const { container } = render(
      <div>
        <div data-testid="outside" />
        <ReactionPickerPopover open onSelect={() => {}} onClose={onClose} />
      </div>,
    );
    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(onClose).toHaveBeenCalledTimes(1);
    // sanity: container exists
    expect(container).toBeTruthy();
  });

  it('click inside the popover does NOT trigger onClose', () => {
    const onClose = vi.fn();
    render(
      <ReactionPickerPopover open emojis={['🙂']} onSelect={() => {}} onClose={onClose} />,
    );
    const popover = screen.getByTestId('reaction-picker-popover');
    fireEvent.mouseDown(popover);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('hides the search input when showSearch=false', () => {
    const { rerender } = render(
      <ReactionPickerPopover open onSelect={() => {}} onClose={() => {}} />,
    );
    expect(screen.getByPlaceholderText('Search reactions…')).toBeInTheDocument();
    rerender(
      <ReactionPickerPopover open showSearch={false} onSelect={() => {}} onClose={() => {}} />,
    );
    expect(screen.queryByPlaceholderText('Search reactions…')).not.toBeInTheDocument();
  });
});
