import { createRef } from 'react';
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { EmojiSuggestions, type EmojiSuggestionsHandle } from '../EmojiSuggestions';

// The menu owns the keyboard while open. An unhandled Enter falls through to
// the composer and sends a message containing ":fir".

afterEach(cleanup);

const ITEMS = [
  { code: 'fire', emoji: '🔥' },
  { code: 'first_place', emoji: '🥇' },
];

function setup(items = ITEMS) {
  const command = vi.fn();
  const ref = createRef<EmojiSuggestionsHandle>();
  render(<EmojiSuggestions ref={ref} items={items} command={command} />);
  const key = (k: string) => {
    let handled = false;
    act(() => {
      handled = ref.current!.onKeyDown({ event: new KeyboardEvent('keydown', { key: k }) });
    });
    return handled;
  };
  return { command, key };
}

describe('EmojiSuggestions', () => {
  it('inserts the highlighted emoji on Enter and claims the key', () => {
    const { command, key } = setup();
    expect(key('Enter')).toBe(true);
    expect(command).toHaveBeenCalledWith({ emoji: '🔥' });
  });

  it('moves with the arrow keys', () => {
    const { command, key } = setup();
    key('ArrowDown');
    key('Enter');
    expect(command).toHaveBeenCalledWith({ emoji: '🥇' });
  });

  it('shows the shortcode beside the glyph, so the code is learnable', () => {
    setup();
    expect(screen.getByText(':fire:')).toBeInTheDocument();
  });

  it('leaves ordinary typing to the editor', () => {
    const { key } = setup();
    expect(key('x')).toBe(false);
  });

  it('renders nothing when nothing matches', () => {
    const { container } = render(<EmojiSuggestions items={[]} command={vi.fn()} />);
    expect(container.firstChild).toBeNull();
  });

  it('selects on mousedown, before focus can leave the editor', () => {
    const command = vi.fn();
    render(<EmojiSuggestions items={ITEMS} command={command} />);
    fireEvent.mouseDown(screen.getAllByTestId('emoji-option')[1]);
    expect(command).toHaveBeenCalledWith({ emoji: '🥇' });
  });
});
