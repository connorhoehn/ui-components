// Escape releases an empty prompt (2.515.4): with nothing typed and no menu
// open, Escape blurs the editor so the idle rule (`collapseWhenIdle`) folds
// the composer. Words in the prompt, an open menu (its typed trigger), an IME
// composition or an event already handled keep the caret. The key is never
// prevented, so an enclosing dialog still sees it.
import { createRef } from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import { RichChatComposer, type RichChatComposerHandle } from '../RichChatComposer';

afterEach(cleanup);

beforeAll(() => {
  const rects = () => ({ length: 0, item: () => null, [Symbol.iterator]: [][Symbol.iterator] }) as unknown as DOMRectList;
  const rect = () => ({ x: 0, y: 0, top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0, toJSON: () => ({}) }) as DOMRect;
  for (const proto of [Range.prototype, Element.prototype]) {
    if (!proto.getClientRects) Object.assign(proto, { getClientRects: rects });
    if (!proto.getBoundingClientRect) Object.assign(proto, { getBoundingClientRect: rect });
  }
});

const base = {
  onSend: () => {},
  'data-testid': 'composer',
  layout: 'wide',
  density: 'compact',
  mode: 'agent',
  onModeChange: () => {},
  modeControl: 'menu',
  toolbar: 'editor',
  collapseWhenIdle: true,
} as const;

const input = () => document.querySelector('[data-testid=composer] .ProseMirror') as HTMLElement;
const engage = async () => { await act(async () => { input().focus(); fireEvent.focusIn(input()); }); };
/** Escape on the editor; returns whether anything prevented it. */
const escape = async (init: KeyboardEventInit = {}) => {
  const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true, ...init });
  await act(async () => { input().dispatchEvent(event); await new Promise((r) => setTimeout(r, 0)); });
  return event.defaultPrevented;
};

describe('Escape in the prompt (2.515.4)', () => {
  it('an empty prompt: Escape releases the caret, is not prevented, and the idle row folds', async () => {
    render(<RichChatComposer {...base} />);
    const root = screen.getByTestId('composer');
    expect(root).toHaveAttribute('data-composer-fold', 'idle');
    await engage();
    expect(root).toHaveAttribute('data-collapsed', 'false');
    expect(root).not.toHaveAttribute('data-composer-fold');
    expect(await escape()).toBe(false);
    expect(document.activeElement).not.toBe(input());
    expect(root).toHaveAttribute('data-collapsed', 'true');
    expect(root).toHaveAttribute('data-composer-fold', 'idle');
  });

  it('words in the prompt: Escape keeps the caret and the card', async () => {
    const ref = createRef<RichChatComposerHandle>();
    render(<RichChatComposer {...base} ref={ref} />);
    await engage();
    act(() => { ref.current!.editor!.chain().focus('end').insertContent('half a thought').run(); });
    await escape();
    expect(document.activeElement).toBe(input());
    expect(screen.getByTestId('composer')).toHaveAttribute('data-collapsed', 'false');
  });

  it('an open command menu: Escape closes the menu and keeps the caret', async () => {
    const ref = createRef<RichChatComposerHandle>();
    render(<RichChatComposer {...base} ref={ref} commands={[{ trigger: '/deck', label: 'Deck' }]} />);
    await engage();
    act(() => { ref.current!.editor!.chain().focus('end').insertContent('/').run(); });
    expect(await escape()).toBe(true);
    expect(document.activeElement).toBe(input());
  });

  it('an IME composition or an Escape already handled: the caret stays', async () => {
    render(<RichChatComposer {...base} />);
    await engage();
    await escape({ isComposing: true });
    expect(document.activeElement).toBe(input());
    const handled = (event: KeyboardEvent) => { if (event.key === 'Escape') event.preventDefault(); };
    document.addEventListener('keydown', handled, true);
    try {
      await escape();
      expect(document.activeElement).toBe(input());
    } finally {
      document.removeEventListener('keydown', handled, true);
    }
  });

  it('without collapseWhenIdle: an empty prompt still releases the caret, and no fold marker is drawn', async () => {
    render(<RichChatComposer {...base} collapseWhenIdle={false} />);
    await engage();
    await escape();
    expect(document.activeElement).not.toBe(input());
    expect(screen.getByTestId('composer')).not.toHaveAttribute('data-composer-fold');
  });
});
