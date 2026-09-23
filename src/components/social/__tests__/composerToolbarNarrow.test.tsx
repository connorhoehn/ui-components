// The composer's toolbar in a narrow column.
//
// THE BUG: the row is `flex` with the format group on the left and Send
// pushed right by `ml-auto`. The group had no `min-w-0`, so its automatic
// minimum size — the width of eleven buttons — stopped it from shrinking, and
// the overflow had to go somewhere. Measured in the browser at a 339px
// composer: Send rendered at x 741–791 while the composer ended at 727. The
// primary action of the chat was sitting 65px outside its own border, on top
// of the document in the pane beside it.
//
// The fix sheds the least-load-bearing controls instead of overflowing.
// Clipping was not an option for Send, and a scroll container was not an
// option for the group — the emoji popover opens from inside it and would be
// clipped by the scroll container's own overflow.
import { render, screen, cleanup, act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { RichChatComposer } from '../RichChatComposer';

// jsdom has no layout and no ResizeObserver. This one reports whatever width
// the test asked for, to the observer the composer registers.
let emit: ((width: number) => void) | null = null;
class FakeResizeObserver {
  constructor(private cb: (entries: Array<{ contentRect: { width: number } }>) => void) {
    emit = (width: number) => act(() => { this.cb([{ contentRect: { width } }]); });
  }
  observe() {}
  disconnect() { emit = null; }
}

beforeEach(() => {
  vi.stubGlobal('ResizeObserver', FakeResizeObserver);
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  emit = null;
});

const has = (label: string) => screen.queryByLabelText(label) !== null;

describe('what the toolbar keeps when the column is narrow', () => {
  it('shows everything where there is no layout to measure', () => {
    // A zero width means "no layout" — a detached subtree, a display:none
    // ancestor, or a test environment with no layout engine — not "very
    // narrow". Reading it as narrow would empty the toolbar wherever it is
    // measured before it is shown.
    render(<RichChatComposer onSend={vi.fn()} allowEmoji allowAttachments />);
    expect(has('Strikethrough')).toBe(true);
    expect(has('Quote')).toBe(true);
    emit!(0);
    expect(has('Quote')).toBe(true);
  });

  it('keeps the full set in a roomy composer', () => {
    render(<RichChatComposer onSend={vi.fn()} allowEmoji allowAttachments />);
    emit!(600);
    for (const label of ['Bold', 'Italic', 'Strikethrough', 'Code', 'Add link', 'Bulleted list', 'Numbered list', 'Quote', 'Emoji', 'Attach files']) {
      expect(has(label)).toBe(true);
    }
  });

  it('folds the secondary marks and lists into the overflow menu at medium width', () => {
    render(<RichChatComposer onSend={vi.fn()} allowEmoji allowAttachments data-testid="composer" />);
    emit!(450);
    for (const label of ['Strikethrough', 'Code', 'Bulleted list', 'Numbered list', 'Quote']) expect(has(label)).toBe(false);
    for (const label of ['Bold', 'Italic', 'Add link', 'Emoji', 'Attach files']) expect(has(label)).toBe(true);
    expect(screen.getByTestId('composer-format-more')).toBeInTheDocument();
  });

  it('hides the toolbar behind a toggle when narrow, and brings all of it back on demand', () => {
    render(<RichChatComposer onSend={vi.fn()} allowEmoji allowAttachments data-testid="composer" />);
    emit!(300);
    expect(has('Bold')).toBe(false);
    expect(has('Emoji')).toBe(false);
    const toggle = screen.getByTestId('composer-format-toggle');
    act(() => { toggle.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true })); });
    // Emoji and attaching are content, not formatting — once the toolbar is
    // open they are always in it, never folded into the overflow menu.
    for (const label of ['Bold', 'Italic', 'Add link', 'Emoji', 'Attach files']) expect(has(label)).toBe(true);
    expect(screen.getByTestId('composer-format-more')).toBeInTheDocument();
  });

  it('never drops Send, at any width', () => {
    // The whole point. Send is the primary action; a narrow column may cost
    // you the quote button, never the ability to post the message.
    render(<RichChatComposer onSend={vi.fn()} allowEmoji allowAttachments data-testid="composer" />);
    emit!(120);
    expect(screen.getByTestId('composer-send')).toBeInTheDocument();
  });

  it('brings the controls back when the column widens again', () => {
    render(<RichChatComposer onSend={vi.fn()} allowEmoji allowAttachments />);
    emit!(200);
    expect(has('Quote')).toBe(false);
    emit!(600);
    expect(has('Quote')).toBe(true);
  });
});
