// Hosts pass a fresh `commands` array on every render. The effect that
// re-derives the active command must follow the commands' content, not the
// array, or fast typing ends in "Maximum update depth exceeded".
import { useState } from 'react';
import { act, cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { RichChatComposer, type RichChatDraft } from '../RichChatComposer';
import type { ComposerCommand } from '../composerCommands';

const matchCalls = vi.hoisted(() => ({ n: 0 }));
vi.mock('../composerCommands', async (orig) => {
  const actual = await orig<typeof import('../composerCommands')>();
  return { ...actual, matchComposerCommand: (...a: Parameters<typeof actual.matchComposerCommand>) => { matchCalls.n += 1; return actual.matchComposerCommand(...a); } };
});

afterEach(cleanup);

// jsdom has no layout; ProseMirror asks for boxes when it scrolls to the caret.
beforeAll(() => {
  const zero = () => ({ x: 0, y: 0, top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0, toJSON: () => ({}) }) as DOMRect;
  Range.prototype.getClientRects ??= () => [] as unknown as DOMRectList;
  Range.prototype.getBoundingClientRect ??= zero;
  Element.prototype.getClientRects ??= () => [] as unknown as DOMRectList;
  document.elementFromPoint ??= () => null;
});

describe('commands given as a fresh array each render', () => {
  it('typing 60 characters fast does not loop, and renders once per draft change', async () => {
    const errors: unknown[][] = [];
    const spy = vi.spyOn(console, 'error').mockImplementation((...a) => { errors.push(a); });
    let hostRenders = 0;
    let draftChanges = 0;
    function Host() {
      const [draft, setDraft] = useState<RichChatDraft | undefined>(undefined);
      hostRenders += 1;
      const commands: ComposerCommand[] = [{ trigger: '/doc', label: 'Edit the document' }];
      return (
        <RichChatComposer
          data-testid="composer"
          onSend={() => {}}
          commands={commands}
          draft={draft}
          onDraftChange={(next) => { draftChanges += 1; setDraft(next); }}
        />
      );
    }
    render(<Host />);
    const user = userEvent.setup({ delay: null });
    const input = await screen.findByRole('textbox');
    act(() => { input.focus(); });
    await user.keyboard('x'.repeat(60));
    const loop = errors.find((a) => String(a[0]).includes('Maximum update depth'));
    spy.mockRestore();
    expect(loop).toBeUndefined();
    expect(errors).toEqual([]);
    expect(draftChanges).toBeGreaterThan(0);
    // One host render per draft change (plus mount and the editor's own settle),
    // never one per effect run.
    expect(hostRenders).toBeLessThanOrEqual(draftChanges + 4);
  });

  it('re-derives the active command once per content change, not per render', async () => {
    const props = { 'data-testid': 'composer', onSend: () => {}, onDraftChange: () => {} } as const;
    const { rerender } = render(<RichChatComposer {...props} commands={[{ trigger: '/doc', label: 'Edit' }]} />);
    await screen.findByRole('textbox');
    const settled = matchCalls.n;
    for (let i = 0; i < 5; i += 1) {
      rerender(<RichChatComposer {...props} commands={[{ trigger: '/doc', label: 'Edit' }]} />);
    }
    expect(matchCalls.n).toBe(settled);
    rerender(<RichChatComposer {...props} commands={[{ trigger: '/doc', label: 'Edit the open document' }]} />);
    expect(matchCalls.n).toBe(settled + 1);
    rerender(<RichChatComposer {...props} commands={[{ trigger: '/doc', label: 'Edit the open document' }]} />);
    expect(matchCalls.n).toBe(settled + 1);
  });
});
