import { createRef, useState } from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RichChatComposer, type RichChatComposerHandle, type RichChatDraft } from '../RichChatComposer';

afterEach(cleanup);
const file = new File(['slides'], 'review.pptx', { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' });
function deferred() { let resolve!: (accepted?: boolean) => void; let reject!: (error: Error) => void; const promise = new Promise<boolean | void>((yes, no) => { resolve = yes; reject = no; }); return { promise, resolve, reject }; }

function host(initial: RichChatDraft | undefined, onSend = vi.fn<() => void | boolean | Promise<void | boolean>>()) {
  const editor = createRef<RichChatComposerHandle>();
  let saved = initial;
  function Host() {
    const [draft, setDraft] = useState(initial);
    const [generation, setGeneration] = useState(0);
    return <>
      <button onClick={() => setGeneration((n) => n + 1)}>Remount</button>
      <RichChatComposer key={generation} ref={editor} draft={draft} onDraftChange={(next, previous) => setDraft((current) => {
        if (current !== previous) return current;
        saved = next; return next;
      })} onSend={onSend} allowAttachments onSearchPeople={() => []} onSearchDocuments={() => []} data-testid="composer" />
    </>;
  }
  render(<Host />);
  return { editor, saved: () => saved, onSend };
}

describe('RichChatComposer conversation drafts and send acceptance', () => {
  it('round-trips rich text, mention/document atoms, picked commands and File objects', () => {
    const draft: RichChatDraft = { html: '<p><strong>Review</strong> <span data-type="mention" data-id="ada" data-label="Ada"></span> <span data-type="docref" data-id="deck" data-label="Slides"></span></p>', files: [file] };
    const state = host(draft);
    act(() => state.editor.current!.editor!.commands.insertContent('<em>please</em>'));
    const before = state.editor.current!.editor!.getJSON();
    fireEvent.click(screen.getByText('Remount'));
    expect(state.editor.current!.editor!.getJSON()).toEqual(before);
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(state.onSend).toHaveBeenCalledWith(expect.objectContaining({ files: [file], mentions: [{ id: 'ada', label: 'Ada' }], documents: [{ id: 'deck', label: 'Slides' }] }));
    expect(state.saved()).toMatchObject({ html: '', files: [] });
  });

  it('retains the whole draft on rejection and prevents duplicate pending sends', async () => {
    const pending = deferred();
    const onSend = vi.fn(() => pending.promise);
    const state = host({ html: '<p>Review this</p>', files: [file] }, onSend);
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(screen.getByRole('button', { name: 'Send' })).toBeDisabled();
    expect(screen.getByTestId('composer-input')).toHaveAttribute('contenteditable', 'false');
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(onSend).toHaveBeenCalledTimes(1);
    await act(async () => pending.reject(new Error('Upload failed')));
    expect(screen.getByRole('alert')).toHaveTextContent('Your draft and attachments are saved');
    expect(state.saved()).toMatchObject({ html: '<p>Review this</p>', files: [file] });
    expect(screen.getByRole('button', { name: 'Send' })).toBeEnabled();
  });

  it('clears an unchanged draft after its original composer unmounts', async () => {
    const pending = deferred();
    const state = host({ html: '<p>Sending</p>', files: [file] }, vi.fn(() => pending.promise));
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    fireEvent.click(screen.getByText('Remount'));
    await act(async () => pending.resolve());
    expect(state.saved()).toEqual({ html: '', files: [] });
    expect(state.editor.current!.editor!.isEmpty).toBe(true);
    expect(screen.queryByText('review.pptx')).not.toBeInTheDocument();
  });

  it('does not clear a newer draft when an older composer finishes sending', async () => {
    const pending = deferred();
    const state = host({ html: '<p>Sending</p>', files: [file] }, vi.fn(() => pending.promise));
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    fireEvent.click(screen.getByText('Remount'));
    act(() => state.editor.current!.editor!.commands.setContent('<p>New thought</p>'));
    await act(async () => pending.resolve());
    expect(state.saved()?.html).toBe('<p>New thought</p>');
    expect(state.editor.current!.editor!.getText()).toBe('New thought');
  });

  it('retains a declined send and clears a files-only accepted send', () => {
    const onSend = vi.fn<() => boolean>().mockReturnValueOnce(false).mockReturnValueOnce(true);
    const state = host({ html: '', files: [file] }, onSend);
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(state.saved()?.files).toEqual([file]);
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(state.saved()).toEqual({ html: '', files: [] });
  });
});
