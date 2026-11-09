import { createRef } from 'react';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { RichChatComposer, type RichChatComposerHandle } from '../RichChatComposer';

// A host (or ContextComposer's fold/deck) schedules `focus()` for the next
// frame; the page can navigate away first. The handle then holds a destroyed
// editor, whose `commands` getter throws. Focus and insertText must be no-ops.

afterEach(cleanup);

describe('RichChatComposer handle after the composer unmounts', () => {
  it('focus and insertText on a destroyed editor do nothing instead of throwing', async () => {
    const ref = createRef<RichChatComposerHandle>();
    const { unmount } = render(<RichChatComposer ref={ref} onSend={() => {}} data-testid="composer" />);
    await waitFor(() => expect(screen.getByTestId('composer-input')).toBeTruthy());
    await waitFor(() => expect(ref.current?.editor).toBeTruthy());
    const handle = ref.current!;
    const editor = handle.editor!;
    unmount();
    await waitFor(() => expect(editor.isDestroyed).toBe(true));
    expect(() => handle.focus()).not.toThrow();
    expect(() => handle.insertText('late')).not.toThrow();
  });
});
