import { render, screen, fireEvent } from '@testing-library/react';
import { ReactionsBar } from '../ReactionsBar';

describe('ReactionsBar', () => {
  it('renders one chip per unique reaction with emoji + count', () => {
    render(
      <ReactionsBar
        reactions={[
          { emoji: '👍', count: 3 },
          { emoji: '❤️', count: 1 },
        ]}
        onReact={() => {}}
      />,
    );
    const chips = screen.getAllByTestId('reaction-chip');
    expect(chips).toHaveLength(2);
    expect(chips[0]).toHaveAttribute('data-emoji', '👍');
    expect(chips[0]).toHaveTextContent('3');
    expect(chips[1]).toHaveAttribute('data-emoji', '❤️');
    expect(chips[1]).toHaveTextContent('1');
  });

  it('marks the viewer\'s chips with aria-pressed=true and data-mine=true', () => {
    render(
      <ReactionsBar
        reactions={[
          { emoji: '👍', count: 3, mine: true },
          { emoji: '❤️', count: 1 },
        ]}
        onReact={() => {}}
      />,
    );
    const chips = screen.getAllByTestId('reaction-chip');
    expect(chips[0]).toHaveAttribute('aria-pressed', 'true');
    expect(chips[0]).toHaveAttribute('data-mine', 'true');
    expect(chips[1]).toHaveAttribute('aria-pressed', 'false');
    expect(chips[1]).toHaveAttribute('data-mine', 'false');
  });

  it('clicking a chip calls onReact with that emoji', () => {
    const onReact = vi.fn();
    render(
      <ReactionsBar
        reactions={[{ emoji: '🔥', count: 2 }]}
        onReact={onReact}
      />,
    );
    fireEvent.click(screen.getByTestId('reaction-chip'));
    expect(onReact).toHaveBeenCalledWith('🔥');
  });

  it('collapses duplicate emojis and sums their counts; mine is OR-merged', () => {
    render(
      <ReactionsBar
        reactions={[
          { emoji: '👍', count: 2 },
          { emoji: '👍', count: 1, mine: true },
          { emoji: '❤️', count: 1 },
        ]}
        onReact={() => {}}
      />,
    );
    const chips = screen.getAllByTestId('reaction-chip');
    expect(chips).toHaveLength(2);
    expect(chips[0]).toHaveAttribute('data-emoji', '👍');
    expect(chips[0]).toHaveTextContent('3');
    expect(chips[0]).toHaveAttribute('data-mine', 'true');
  });

  it('renders an add-reaction trigger by default; hidden when hideAddTrigger is true', () => {
    const { rerender } = render(<ReactionsBar reactions={[]} onReact={() => {}} />);
    expect(screen.getByTestId('reactions-bar-add')).toBeInTheDocument();
    rerender(<ReactionsBar reactions={[]} onReact={() => {}} hideAddTrigger />);
    expect(screen.queryByTestId('reactions-bar-add')).not.toBeInTheDocument();
  });

  it('clicking the add trigger opens the picker popover; aria-expanded reflects state', () => {
    render(<ReactionsBar reactions={[]} onReact={() => {}} />);
    const trigger = screen.getByTestId('reactions-bar-add');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByTestId('reaction-picker-popover')).not.toBeInTheDocument();
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByTestId('reaction-picker-popover')).toBeInTheDocument();
  });

  it('selecting an emoji from the picker fires onReact and closes the popover', () => {
    const onReact = vi.fn();
    render(<ReactionsBar reactions={[]} onReact={onReact} pickerEmojis={['🙂', '🚀']} />);
    fireEvent.click(screen.getByTestId('reactions-bar-add'));
    const items = screen.getAllByTestId('reaction-picker-item');
    expect(items).toHaveLength(2);
    fireEvent.click(items[0]!);
    expect(onReact).toHaveBeenCalledWith('🙂');
    expect(screen.queryByTestId('reaction-picker-popover')).not.toBeInTheDocument();
  });

  it('chips and trigger are disabled when disabled prop is true', () => {
    const onReact = vi.fn();
    render(
      <ReactionsBar
        reactions={[{ emoji: '👍', count: 1 }]}
        onReact={onReact}
        disabled
      />,
    );
    const chip = screen.getByTestId('reaction-chip');
    const trigger = screen.getByTestId('reactions-bar-add');
    expect(chip).toBeDisabled();
    expect(trigger).toBeDisabled();
    fireEvent.click(chip);
    expect(onReact).not.toHaveBeenCalled();
  });
});
