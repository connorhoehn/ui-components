// A "/" draft written from inside a React lifecycle (a host prefilling
// "/unblock …" from an effect or a menu pick) opened the command menu with
// ReactRenderer's synchronous flushSync, and React logged "flushSync was
// called from inside a lifecycle method" (walk, 10 November). The menu now
// mounts a microtask later (2.517.0): no error, and the menu still opens.
import { useLayoutEffect, useRef, useState } from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { RichChatComposer, type RichChatComposerHandle } from '../RichChatComposer';
import type { ComposerCommand } from '../composerCommands';

afterEach(cleanup);

beforeAll(() => {
  const rects = () => ({ length: 0, item: () => null, [Symbol.iterator]: [][Symbol.iterator] }) as unknown as DOMRectList;
  const rect = () => ({ x: 0, y: 0, top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0, toJSON: () => ({}) }) as DOMRect;
  for (const proto of [Range.prototype, Element.prototype]) {
    if (!proto.getClientRects) Object.assign(proto, { getClientRects: rects });
    if (!proto.getBoundingClientRect) Object.assign(proto, { getBoundingClientRect: rect });
  }
});

const unblock: ComposerCommand = { trigger: '/unblock', label: 'Unblock this item' };

// The pick sets state; the draft is written in the layout effect that follows.
function Prefilled() {
  const ref = useRef<RichChatComposerHandle>(null);
  const [picked, setPicked] = useState(false);
  useLayoutEffect(() => {
    if (picked) ref.current?.insertText('/unb');
  }, [picked]);
  return (
    <>
      <button type="button" onClick={() => setPicked(true)}>Unblock this item</button>
      <RichChatComposer ref={ref} onSend={() => {}} commands={[unblock]} data-testid="composer" />
    </>
  );
}

describe('a command menu opened from a React lifecycle', () => {
  it('opens without a flushSync error', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<Prefilled />);
    fireEvent.click(screen.getByRole('button', { name: 'Unblock this item' }));
    await act(async () => { await Promise.resolve(); await new Promise((r) => setTimeout(r, 0)); });
    const flush = error.mock.calls.filter((c) => String(c[0]).includes('flushSync'));
    error.mockRestore();
    expect(flush).toEqual([]);
    expect(await screen.findByTestId('command-suggestions')).toHaveTextContent('/unblock');
  });
});
