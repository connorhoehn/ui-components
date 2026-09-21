import { createRef, useState } from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RichChatComposer, type RichChatComposerHandle, type RichChatDraft } from '../RichChatComposer';

// Per-message privacy: an additive, controlled `privacy` prop plus
// `onPrivacyChange`. The composer holds no privacy state of its own — see
// `docs/chat-draft-continuity.md` — so every assertion here is either about
// what renders from the CURRENT prop, or about what the composer hands back
// (`onPrivacyChange`, `ComposedMessage.privacy`, `RichChatDraft.privacy`).

afterEach(cleanup);

describe('RichChatComposer with no `onPrivacyChange` (the default)', () => {
  it('renders no toggle and no hint', () => {
    render(<RichChatComposer onSend={vi.fn()} allowAttachments data-testid="composer" />);
    expect(screen.queryByTestId('composer-privacy-toggle')).toBeNull();
    expect(screen.queryByTestId('composer-privacy-hint')).toBeNull();
  });

  it('still stamps `visible` onto the sent message', () => {
    const onSend = vi.fn();
    const ref = createRef<RichChatComposerHandle>();
    render(<RichChatComposer ref={ref} onSend={onSend} data-testid="composer" />);
    act(() => ref.current!.insertText('hello'));
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(onSend).toHaveBeenCalledWith(expect.objectContaining({ privacy: 'visible' }));
  });

  // The exact-equality half of the no-op guarantee: a host that persists
  // drafts and never touches `onPrivacyChange` must get back the identical
  // shape it always did — no stray `privacy: undefined` key.
  it('never adds a `privacy` key to the published draft', () => {
    const onDraftChange = vi.fn();
    const ref = createRef<RichChatComposerHandle>();
    render(<RichChatComposer ref={ref} onSend={vi.fn()} onDraftChange={onDraftChange} draft={{ html: '', files: [] }} data-testid="composer" />);
    act(() => ref.current!.insertText('hi'));
    expect(onDraftChange).toHaveBeenCalled();
    const [next] = onDraftChange.mock.calls.at(-1)!;
    expect(next).toEqual({ html: '<p>hi</p>', files: [] });
    expect(next).not.toHaveProperty('privacy');
  });
});

describe('RichChatComposer privacy toggle', () => {
  it('draws an eye/eye-off icon button next to Attach files, named and pressed from `privacyLabels`', () => {
    const { rerender } = render(
      <RichChatComposer onSend={vi.fn()} allowAttachments privacy="visible" onPrivacyChange={vi.fn()} data-testid="composer" />,
    );
    const toggle = screen.getByTestId('composer-privacy-toggle');
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
    expect(toggle).toHaveAttribute('title', 'Visible to everyone');
    expect(toggle).toHaveAttribute('aria-label', 'Visible to everyone');
    expect(toggle.querySelector('svg')).not.toBeNull();
    expect(screen.queryByTestId('composer-privacy-hint')).toBeNull();

    rerender(
      <RichChatComposer onSend={vi.fn()} allowAttachments privacy="hidden" onPrivacyChange={vi.fn()} data-testid="composer" />,
    );
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
    expect(toggle).toHaveAttribute('title', 'Only you');
    expect(screen.getByTestId('composer-privacy-hint')).toHaveTextContent('Only you can see this');
  });

  it('accepts custom `privacyLabels`', () => {
    render(
      <RichChatComposer
        onSend={vi.fn()}
        privacy="hidden"
        onPrivacyChange={vi.fn()}
        privacyLabels={{ visible: 'Everyone', hidden: 'Just me' }}
        data-testid="composer"
      />,
    );
    expect(screen.getByTestId('composer-privacy-toggle')).toHaveAttribute('title', 'Just me');
  });

  it('calls `onPrivacyChange` with the OTHER state; the composer does not flip on its own', () => {
    const onPrivacyChange = vi.fn();
    render(<RichChatComposer onSend={vi.fn()} privacy="visible" onPrivacyChange={onPrivacyChange} data-testid="composer" />);
    const toggle = screen.getByTestId('composer-privacy-toggle');
    fireEvent.mouseDown(toggle);
    expect(onPrivacyChange).toHaveBeenCalledWith('hidden');
    // Nothing in the DOM changed — the prop is still `visible` because this
    // test never fed the callback's answer back in, exactly as an
    // uncontrolled press would look from a host that ignored it.
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
  });

  // Every other formatting control in this toolbar only handles `mousedown`
  // (clicking would blur the editor first), which made it deaf to the
  // keyboard: Enter/Space fire a `click` with no preceding `mousedown` at
  // all. `toolbarButton` now also handles `onClick`, guarded by `detail` so a
  // real pointer click — mousedown then its own click, `detail: 1` — is not
  // run twice. Both directions are asserted here, on the new control.
  it('toggles on a keyboard-synthesised click (detail: 0)', () => {
    const onPrivacyChange = vi.fn();
    render(<RichChatComposer onSend={vi.fn()} privacy="visible" onPrivacyChange={onPrivacyChange} data-testid="composer" />);
    fireEvent.click(screen.getByTestId('composer-privacy-toggle'), { detail: 0 });
    expect(onPrivacyChange).toHaveBeenCalledWith('hidden');
  });

  it('does not double-fire on a real mouse click', () => {
    const onPrivacyChange = vi.fn();
    render(<RichChatComposer onSend={vi.fn()} privacy="visible" onPrivacyChange={onPrivacyChange} data-testid="composer" />);
    const toggle = screen.getByTestId('composer-privacy-toggle');
    fireEvent.mouseDown(toggle);
    fireEvent.click(toggle, { detail: 1 });
    expect(onPrivacyChange).toHaveBeenCalledTimes(1);
  });

  it('keeps one tab stop and does not remount the control when its label changes with state', () => {
    // The label ("Visible to everyone" / "Only you") is also this button's
    // React key inside `toolbarButton`'s array-less call site, EXCEPT this
    // one passes a stable `data-testid`-derived key instead — otherwise a
    // changing key would unmount/remount the button on every toggle and drop
    // a keyboard user's focus out of the toolbar. Asserted by identity.
    const onPrivacyChange = vi.fn();
    const { rerender } = render(
      <RichChatComposer onSend={vi.fn()} privacy="visible" onPrivacyChange={onPrivacyChange} data-testid="composer" />,
    );
    const before = screen.getByTestId('composer-privacy-toggle');
    rerender(<RichChatComposer onSend={vi.fn()} privacy="hidden" onPrivacyChange={onPrivacyChange} data-testid="composer" />);
    expect(screen.getByTestId('composer-privacy-toggle')).toBe(before);
  });
});

describe('ComposedMessage.privacy', () => {
  it('reports the current `privacy` prop on send', () => {
    const onSend = vi.fn();
    const ref = createRef<RichChatComposerHandle>();
    render(<RichChatComposer ref={ref} onSend={onSend} privacy="hidden" onPrivacyChange={vi.fn()} data-testid="composer" />);
    act(() => ref.current!.insertText('secret'));
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(onSend).toHaveBeenCalledWith(expect.objectContaining({ privacy: 'hidden' }));
  });
});

describe('RichChatDraft.privacy round trip', () => {
  // A host that adopts the toggle stores ONE draft object per conversation
  // (html, files, command, and now privacy) and separately holds `privacy`
  // itself as controlled state — the composer never reads `draft.privacy`
  // back onto itself, so this harness plays the host's half: feed the
  // callback's answer back in as `privacy`, and read `draft.privacy` after a
  // conversation switch the way a real host would.
  function host(initialDraft: RichChatDraft | undefined, initialPrivacy: 'visible' | 'hidden') {
    const ref = createRef<RichChatComposerHandle>();
    let savedDraft = initialDraft;
    let savedPrivacy = initialPrivacy;
    function Host() {
      const [draft, setDraft] = useState(initialDraft);
      const [privacy, setPrivacy] = useState(initialPrivacy);
      const [generation, setGeneration] = useState(0);
      return (
        <>
          <button onClick={() => setGeneration((n) => n + 1)}>Switch conversation</button>
          <RichChatComposer
            key={generation}
            ref={ref}
            draft={draft}
            privacy={privacy}
            onPrivacyChange={(next) => {
              savedPrivacy = next;
              setPrivacy(next);
            }}
            onDraftChange={(next, previous) =>
              setDraft((current) => {
                if (current !== previous) return current;
                savedDraft = next;
                return next;
              })
            }
            onSend={vi.fn()}
            data-testid="composer"
          />
        </>
      );
    }
    render(<Host />);
    return { ref, savedDraft: () => savedDraft, savedPrivacy: () => savedPrivacy };
  }

  it('lands the pressed state on the draft without any typing', () => {
    const state = host({ html: '', files: [] }, 'visible');
    fireEvent.mouseDown(screen.getByTestId('composer-privacy-toggle'));
    expect(state.savedPrivacy()).toBe('hidden');
    expect(state.savedDraft()).toMatchObject({ privacy: 'hidden' });
  });

  it('restores the hidden state after a conversation switch that hands the persisted draft and privacy back in', () => {
    const state = host({ html: '', files: [] }, 'visible');
    fireEvent.mouseDown(screen.getByTestId('composer-privacy-toggle'));
    expect(state.savedDraft()?.privacy).toBe('hidden');

    fireEvent.click(screen.getByText('Switch conversation'));
    expect(screen.getByTestId('composer-privacy-toggle')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('composer-privacy-hint')).toHaveTextContent('Only you can see this');
  });
});
