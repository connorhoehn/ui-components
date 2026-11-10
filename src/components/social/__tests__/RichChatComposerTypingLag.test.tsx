// A controlled host that lags behind the composer must never cost a keystroke.
//
// The bug (fixed in 2.519.0): the draft-sync effect treated any `draft` prop
// that differed from the composer's latest published draft as an external
// change and called `setContent` with it. On a loaded machine a render can
// commit between two keystrokes while the host still holds an OLDER draft —
// one the composer itself emitted a keystroke ago (or the host's initial
// draft, re-delivered with a fresh inline `onDraftChange`). Applying it
// reverted the editor and dropped the newest character, which showed up as
// missing spaces at ordinary typing speed.
//
// The host here defers every `onDraftChange` into a queue it applies later,
// which is exactly the controlled-parent lag, made deterministic.

import { createRef, useState } from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RichChatComposer, type RichChatComposerHandle, type RichChatDraft } from '../RichChatComposer';

afterEach(cleanup);

function laggingHost(options: { initial?: RichChatDraft; copy?: boolean; onSend?: () => void | boolean } = {}) {
  const handle = createRef<RichChatComposerHandle>();
  const queue: RichChatDraft[] = [];
  let setDraft!: (d: RichChatDraft | undefined) => void;
  let bump!: () => void;
  let current: RichChatDraft | undefined = options.initial;
  function Host() {
    const [draft, set] = useState<RichChatDraft | undefined>(options.initial);
    const [, setTick] = useState(0);
    setDraft = set;
    bump = () => setTick((n) => n + 1);
    current = draft;
    return (
      <RichChatComposer
        ref={handle}
        draft={draft}
        // A new function every render, like most hosts write it.
        onDraftChange={(next) => { queue.push(options.copy ? { ...next } : next); }}
        onSend={options.onSend ?? vi.fn()}
        data-testid="composer"
      />
    );
  }
  render(<Host />);
  const editor = () => handle.current!.editor!;
  return {
    editor,
    // `commands.focus()` defers to a frame in jsdom; focus the view itself.
    focus: () => act(() => { (editor().view.dom as HTMLElement).focus(); }),
    draft: () => current,
    type: (text: string) => act(() => { editor().commands.insertContent(text); }),
    /** The parent re-renders for its own reasons, still holding a stale draft. */
    rerender: () => act(() => bump()),
    /** The parent catches up by exactly one queued draft. */
    applyOne: () => act(() => { const next = queue.shift(); if (next) setDraft(next); }),
    applyAll: () => act(() => { while (queue.length) setDraft(queue.shift()); }),
    /** A genuine external change: a restore, a programmatic prefill. */
    set: (d: RichChatDraft | undefined) => act(() => setDraft(d)),
    queue,
  };
}

describe('RichChatComposer — a lagging controlled host never reverts typing', () => {
  it('type "a", stale parent render, type " b" before the parent catches up: the editor holds "a b"', () => {
    const h = laggingHost();
    h.focus();
    h.type('a');
    // A render commits while the host still holds the stale (empty) draft.
    h.rerender();
    expect(h.editor().getText()).toBe('a');
    h.type(' b');
    // The host now applies the draft the composer emitted a keystroke ago.
    h.applyOne();
    expect(h.editor().getText()).toBe('a b');
    h.rerender();
    expect(h.editor().getText()).toBe('a b');
    h.applyAll();
    expect(h.editor().getText()).toBe('a b');
    expect(h.draft()?.html).toBe('<p>a b</p>');
  });

  it('a host that COPIES each draft into a new object: a stale copy is not applied while the editor has focus', () => {
    const h = laggingHost({ copy: true });
    h.focus();
    h.type('a');
    h.type(' ');
    h.type('b');
    h.applyOne();
    expect(h.editor().getText()).toBe('a b');
    h.applyOne();
    expect(h.editor().getText()).toBe('a b');
    h.applyAll();
    expect(h.editor().getText()).toBe('a b');
  });

  it('a stale draft arriving in order after many keystrokes never reverts', () => {
    const h = laggingHost();
    h.focus();
    const sentence = 'the quick brown fox jumps';
    for (const ch of sentence) {
      h.type(ch);
      // Every other key the parent catches up by one — always behind.
      if (h.queue.length > 1) h.applyOne();
      h.rerender();
    }
    expect(h.editor().getText()).toBe(sentence);
    h.applyAll();
    expect(h.editor().getText()).toBe(sentence);
  });

  it('an external restore of a different draft still applies (focused or not)', () => {
    const h = laggingHost();
    h.type('half written');
    h.applyAll();
    h.set({ html: '<p>Restored conversation draft</p>', files: [] });
    expect(h.editor().getText()).toBe('Restored conversation draft');
    h.focus();
    h.set({ html: '<p>Another restore</p>', files: [] });
    expect(h.editor().getText()).toBe('Another restore');
  });

  it('a draft this composer emitted earlier is applied again when the host goes BACK to it (an unkeyed conversation switch)', () => {
    const h = laggingHost();
    h.type('conversation B');
    h.applyAll();
    const b = h.draft()!;
    h.set({ html: '<p>conversation A</p>', files: [] });
    h.type(' more');
    h.applyAll();
    expect(h.editor().getText()).toBe('conversation A more');
    h.set(b);
    expect(h.editor().getText()).toBe('conversation B');
  });

  it('a programmatic prefill applies while the editor has focus', () => {
    const h = laggingHost();
    h.focus();
    h.set({ html: '<p>Prefilled by the host</p>', files: [] });
    expect(h.editor().getText()).toBe('Prefilled by the host');
  });

  it('a clear after send applies, and typing afterwards is not reverted by the lagging pre-send drafts', () => {
    const onSend = vi.fn();
    const h = laggingHost({ onSend });
    h.focus();
    h.type('hello');
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(onSend).toHaveBeenCalledTimes(1);
    expect(h.editor().getText()).toBe('');
    h.type('n');
    // The host now delivers "hello", then the clear, then "n".
    h.applyOne();
    expect(h.editor().getText()).toBe('n');
    h.applyAll();
    expect(h.editor().getText()).toBe('n');
  });

  it('a host-driven clear applies', () => {
    const h = laggingHost();
    h.focus();
    h.type('drop me');
    h.applyAll();
    h.set({ html: '', files: [] });
    expect(h.editor().getText()).toBe('');
  });
});
