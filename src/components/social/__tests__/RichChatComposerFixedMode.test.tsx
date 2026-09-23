// `fixedMode` pins the composer to one mode without the switch, and the
// composer survives being lazy-loaded behind a Suspense boundary (the
// presentation editor's agent box loads it that way).

import { Suspense, lazy } from 'react';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { Editor } from '@tiptap/react';
import { RichChatComposer, type ComposedMessage, type RichChatComposerHandle } from '../RichChatComposer';

afterEach(cleanup);

describe('fixedMode', () => {
  it('wears the agent surface with no mode switch and sends the text as typed', () => {
    const onSend = vi.fn();
    let handle: RichChatComposerHandle | null = null;
    render(<RichChatComposer ref={(h) => { handle = h; }} fixedMode="agent" onSend={onSend} data-testid="composer" />);
    expect(screen.getByTestId('composer')).toHaveAttribute('data-mode', 'agent');
    expect(screen.queryByTestId('composer-modes')).toBeNull();
    expect(screen.queryByTestId('composer-hints')).toBeNull();
    act(() => { handle?.editor?.commands.setContent('<p>shorten the title</p>'); });
    fireEvent.click(screen.getByTestId('composer-send'));
    const message = onSend.mock.calls[0]![0] as ComposedMessage;
    // No `/agent` prefix: that is for the chat's command router.
    expect(message.text).toBe('shorten the title');
    expect(message.mode).toBe('agent');
  });
});

describe('lazy-loaded behind Suspense', () => {
  it('mounts a live editor instead of reading a destroyed one', async () => {
    const Lazy = lazy(() => import('../RichChatComposer'));
    render(<Suspense fallback={<p>loading</p>}><Lazy onSend={vi.fn()} data-testid="lazy" /></Suspense>);
    const composer = await screen.findByTestId('lazy');
    await waitFor(() => {
      const node = composer.querySelector('.ProseMirror') as (HTMLElement & { editor?: Editor }) | null;
      expect(node?.editor?.isDestroyed).toBe(false);
    });
  });
});
