// Zero-delay typing into a controlled ContextComposer in Agent mode.
//
// The bug (fixed in 2.407.39): every keystroke's sync commit ran
// RichChatComposer's draft-sync effect for the host's ECHO of the draft the
// composer had just published, and that effect re-set four pieces of state
// the editor's `onUpdate` had already set. Those setStates land at Default
// priority from inside a sync commit's passive effects, which React 19 counts
// as a nested update — and while keys keep arriving before the Default render
// runs (a heavy page, synthetic typing at delay 0) the count never resets:
// "Maximum update depth exceeded" after ~50 keys. The pin types 60 keys as
// discrete events with only microtasks between them, which throws without
// the fix.
//
// The browser reproduction is tests/storybook/composer-fast-typing.spec.ts.

import { useState } from 'react';
import { act, cleanup, render } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { ContextComposer } from '../ContextComposer';
import type { ComposerMode, RichChatComposerHandle, RichChatDraft } from '../RichChatComposer';

afterEach(cleanup);

beforeAll(() => {
  const rects = () => ({ length: 0, item: () => null, [Symbol.iterator]: [][Symbol.iterator] }) as unknown as DOMRectList;
  const rect = () => ({ x: 0, y: 0, top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0, toJSON: () => ({}) }) as DOMRect;
  for (const proto of [Range.prototype, Element.prototype]) {
    if (!proto.getClientRects) Object.assign(proto, { getClientRects: rects });
    if (!proto.getBoundingClientRect) Object.assign(proto, { getBoundingClientRect: rect });
  }
});

const DOC = { kind: 'document', id: 'doc-1', title: 'Roadmap' } as const;
const TEXT = 'Tighten the rollout plan; cite the ADR!!';

function setup() {
  let handle: RichChatComposerHandle | null = null;
  let hostDraft: RichChatDraft | undefined;
  let setHostDraft!: (d: RichChatDraft) => void;
  function Host() {
    const [draft, setDraft] = useState<RichChatDraft | undefined>(undefined);
    const [mode, setMode] = useState<ComposerMode>('agent');
    hostDraft = draft;
    setHostDraft = setDraft;
    return (
      <ContextComposer
        context={DOC}
        mode={mode}
        onModeChange={setMode}
        draft={draft}
        onDraftChange={setDraft}
        onSend={vi.fn(() => true)}
        composerTestId="composer"
        composerRef={(h) => { handle = h; }}
      />
    );
  }
  render(<Host />);
  return { editor: () => handle!.editor!, draft: () => hostDraft, setDraft: (d: RichChatDraft) => act(() => setHostDraft(d)) };
}

describe('ContextComposer — fast typing in Agent mode (controlled draft)', () => {
  it('60 keys with no macrotask in between: no update-depth error, the draft is the typed text', async () => {
    const s = setup();
    expect(document.querySelector('[data-testid="composer"]')).toHaveAttribute('data-mode', 'agent');
    const input = document.querySelector('[data-testid="composer"] .ProseMirror') as HTMLElement;
    // A key the way a browser delivers one: a discrete event (React gives its
    // updates the sync lane and flushes them in a microtask), then the next
    // key before any macrotask — so a Default-priority render the previous
    // key scheduled has not run yet. That is Playwright's `type()` at delay 0
    // on a page heavy enough that its commits outlast the gap between keys.
    const type = (ch: string) => { input.addEventListener('keydown', () => s.editor().commands.insertContent(ch), { once: true }); input.dispatchEvent(new KeyboardEvent('keydown', { key: ch, bubbles: true })); };
    const errors: unknown[] = [];
    const onError = (e: ErrorEvent) => { errors.push(e.error ?? e.message); e.preventDefault(); };
    window.addEventListener('error', onError);
    const logged = vi.spyOn(console, 'error').mockImplementation((...args) => { errors.push(args.join(' ')); });
    const prev = (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT;
    (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = false;
    const keys = (TEXT + ' ' + TEXT).slice(0, 60);
    try {
      for (const ch of keys) {
        try { type(ch); } catch (err) { errors.push(err); }
        for (let i = 0; i < 5; i++) await Promise.resolve();
      }
    } finally {
      (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = prev;
      window.removeEventListener('error', onError);
      logged.mockRestore();
    }
    await act(async () => { await new Promise((r) => setTimeout(r, 0)); });
    expect(errors.map(String).filter((e) => /Maximum update depth/.test(e))).toEqual([]);
    expect(s.editor().getText()).toBe(keys);
    expect(s.draft()?.html).toBe(`<p>${keys}</p>`);
  });

  it('a host-set draft is applied; one that is already the editor text keeps the caret', () => {
    const s = setup();
    expect(document.querySelector('[data-testid="composer"]')).toHaveAttribute('data-mode', 'agent');
    s.setDraft({ html: '<p>Restored draft</p>', files: [] });
    expect(s.editor().getText()).toBe('Restored draft');
    act(() => { s.editor().commands.setTextSelection(3); });
    // A host that copies the draft into a new object with the same text.
    s.setDraft({ html: '<p>Restored draft</p>', files: [] });
    expect(s.editor().getText()).toBe('Restored draft');
    expect(s.editor().state.selection.from).toBe(3);
    act(() => { s.editor().commands.insertContent('!'); });
    expect(s.draft()?.html).toBe('<p>Re!stored draft</p>');
  });
});
