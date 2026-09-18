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

  it('drops the secondary marks first', () => {
    render(<RichChatComposer onSend={vi.fn()} allowEmoji allowAttachments />);
    emit!(300);
    expect(has('Strikethrough')).toBe(false);
    expect(has('Code')).toBe(false);
    // Bold, italic and link are what people actually reach for.
    expect(has('Bold')).toBe(true);
    expect(has('Italic')).toBe(true);
    expect(has('Add link')).toBe(true);
  });

  it('drops the list controls next, when even that is not enough', () => {
    render(<RichChatComposer onSend={vi.fn()} allowEmoji allowAttachments />);
    emit!(200);
    expect(has('Bulleted list')).toBe(false);
    expect(has('Numbered list')).toBe(false);
    expect(has('Quote')).toBe(false);
    expect(has('Bold')).toBe(true);
  });

  it('never drops attaching or emoji — those are content, not formatting', () => {
    render(<RichChatComposer onSend={vi.fn()} allowEmoji allowAttachments />);
    emit!(180);
    expect(has('Emoji')).toBe(true);
    expect(has('Attach files')).toBe(true);
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
