import { createRef } from 'react';
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MentionSuggestions, type MentionSuggestionsHandle } from '../MentionSuggestions';

// The @ menu owns the keyboard while it is open. Every assertion here is about
// that ownership: an unhandled key falls through to the composer, which sends
// the message — mid-selection, with a half-typed "@no" in it.

afterEach(cleanup);

const ITEMS = [
  { id: 'u1', label: 'Nora DaSilva' },
  { id: 'u2', label: 'Noah Kim' },
  { id: 'u3', label: 'Nadia Rossi' },
];

function setup(items = ITEMS) {
  const command = vi.fn();
  const ref = createRef<MentionSuggestionsHandle>();
  render(<MentionSuggestions ref={ref} items={items} command={command} />);
  // act(): moving the highlight is a state update, and the next keypress reads
  // it through a handle rebuilt on the following render. Without a flush in
  // between, Enter commits whoever was highlighted BEFORE the arrow key.
  const key = (k: string) => {
    let handled = false;
    act(() => {
      handled = ref.current!.onKeyDown({ event: new KeyboardEvent('keydown', { key: k }) });
    });
    return handled;
  };
  return { command, key };
}

describe('MentionSuggestions', () => {
  it('commits the highlighted person on Enter, and reports the key as handled', () => {
    const { command, key } = setup();
    expect(key('Enter')).toBe(true);
    expect(command).toHaveBeenCalledWith({ id: 'u1', label: 'Nora DaSilva' });
  });

  it('moves the highlight with the arrow keys', () => {
    const { command, key } = setup();
    key('ArrowDown');
    key('Enter');
    expect(command).toHaveBeenCalledWith({ id: 'u2', label: 'Noah Kim' });
  });

  it('wraps around rather than sticking at the ends', () => {
    const { command, key } = setup();
    key('ArrowUp');
    key('Enter');
    expect(command).toHaveBeenCalledWith({ id: 'u3', label: 'Nadia Rossi' });
  });

  it('commits on Tab too', () => {
    const { command, key } = setup();
    expect(key('Tab')).toBe(true);
    expect(command).toHaveBeenCalled();
  });

  // Anything else must fall through, or typing inside the menu is impossible.
  it('leaves ordinary typing to the editor', () => {
    const { key } = setup();
    expect(key('a')).toBe(false);
  });

  it('renders nothing when the query matches nobody', () => {
    const { container } = render(<MentionSuggestions items={[]} command={vi.fn()} />);
    expect(container.firstChild).toBeNull();
  });

  // click fires after blur, and the blur destroys the range the mention would
  // replace — so selection has to happen on mousedown.
  it('selects on mousedown, before focus can leave the editor', () => {
    const command = vi.fn();
    render(<MentionSuggestions items={ITEMS} command={command} />);
    fireEvent.mouseDown(screen.getAllByTestId('mention-option')[1]);
    expect(command).toHaveBeenCalledWith({ id: 'u2', label: 'Noah Kim' });
  });
});
