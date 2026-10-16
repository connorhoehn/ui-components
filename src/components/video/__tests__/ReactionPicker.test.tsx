import { render, screen, fireEvent } from '@testing-library/react';
import {
  ReactionOverlay,
  ReactionPicker,
  ReactionPickerButton,
  reactionEmojiName,
} from '../ReactionOverlay';

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

  it('gives every default emoji a stable reaction-option-<name> testid', () => {
    render(<ReactionPicker onReact={() => {}} />);
    for (const name of ['thumbs-up', 'heart', 'fire', 'laugh', 'clap', 'party', 'wow', 'hundred']) {
      expect(screen.getByTestId(`reaction-option-${name}`)).toBeInTheDocument();
    }
  });

  it('falls back to codepoint names for non-default emojis', () => {
    render(<ReactionPicker onReact={() => {}} emojis={['🚀']} />);
    expect(reactionEmojiName('🚀')).toBe('1f680');
    expect(screen.getByTestId('reaction-option-1f680')).toBeInTheDocument();
  });
});

describe('ReactionPickerButton', () => {
  it('opens the picker from the trigger, reacts, and closes on pick', () => {
    const onReact = vi.fn();
    render(<ReactionPickerButton onReact={onReact} />);

    expect(screen.queryByTestId('reaction-picker')).not.toBeInTheDocument();

    const trigger = screen.getByTestId('reaction-picker-open');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByTestId('reaction-picker')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('reaction-option-heart'));
    expect(onReact).toHaveBeenCalledWith('❤️');
    // closeOnReact defaults to true.
    expect(screen.queryByTestId('reaction-picker')).not.toBeInTheDocument();
  });

  it('keeps the popover open when closeOnReact is false', () => {
    render(<ReactionPickerButton onReact={() => {}} closeOnReact={false} />);
    fireEvent.click(screen.getByTestId('reaction-picker-open'));
    fireEvent.click(screen.getByTestId('reaction-option-fire'));
    expect(screen.getByTestId('reaction-picker')).toBeInTheDocument();
  });

  it('never uses position:fixed — the popover must survive CallWidget\'s transformed root', () => {
    render(<ReactionPickerButton onReact={() => {}} />);
    fireEvent.click(screen.getByTestId('reaction-picker-open'));
    const picker = screen.getByTestId('reaction-picker');
    expect(picker.className).toContain('absolute');
    expect(picker.className).not.toContain('fixed');
  });

  it('does not open while disabled', () => {
    render(<ReactionPickerButton onReact={() => {}} disabled />);
    fireEvent.click(screen.getByTestId('reaction-picker-open'));
    expect(screen.queryByTestId('reaction-picker')).not.toBeInTheDocument();
  });
});

describe('ReactionOverlay testids', () => {
  it('exposes reaction-overlay on the root and reaction-float per floater', () => {
    const { rerender } = render(<ReactionOverlay reactions={[]} />);
    expect(screen.getByTestId('reaction-overlay')).toBeInTheDocument();
    expect(screen.queryAllByTestId('reaction-float')).toHaveLength(0);

    rerender(<ReactionOverlay reactions={[{ id: 'r1', emoji: '🎉' }]} />);
    expect(screen.getAllByTestId('reaction-float')).toHaveLength(1);
    expect(screen.getByTestId('reaction-float')).toHaveTextContent('🎉');
  });
});

describe('ReactionPicker tone (2.465.0)', () => {
  it('defaults to the dark chrome pill; surface drops its own fill for a light panel', () => {
    const { rerender } = render(<ReactionPicker onReact={() => {}} />);
    const chrome = screen.getByTestId('reaction-picker');
    expect(chrome).toHaveAttribute('data-tone', 'chrome');
    expect(chrome.className).toContain('bg-call-chrome/90');
    rerender(<ReactionPicker onReact={() => {}} tone="surface" />);
    const surface = screen.getByTestId('reaction-picker');
    expect(surface).toHaveAttribute('data-tone', 'surface');
    expect(surface.className).not.toContain('bg-call-chrome');
    expect(screen.getByRole('button', { name: 'React with party' }).className).toContain('hover:bg-surface-hover');
  });
});

