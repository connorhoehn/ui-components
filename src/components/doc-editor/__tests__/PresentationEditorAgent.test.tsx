// The editor's agent box (`onInstruct`): the chat composer under the stage,
// the scope it sends, the busy state, the summary line and the rail marks —
// and that without `onInstruct` nothing about the editor changes.

import { useState } from 'react';
import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { Editor } from '@tiptap/react';
import {
  PresentationEditor,
  type PresentationEditorProps,
  type PresentationInstructResult,
} from '../presentation/PresentationEditor';
import type { DeckSpec } from '../presentation/deckSpec';

afterEach(cleanup);

const SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="9"></svg>';

function baseSpec(): DeckSpec {
  return {
    title: 'Sprint review',
    theme: 'product',
    slides: [
      { id: 's1', layout: 'title', title: 'Sprint review', sources: [{ documentId: 'doc-1', title: 'Sprint notes' }] },
      { id: 's2', layout: 'bullets', title: 'Delivery', bullets: ['Shipped the gateway'], sources: [{ documentId: 'doc-1', title: 'Sprint notes' }] },
      { id: 's3', layout: 'bullets', title: 'Risks', bullets: ['Rollback'], sources: [{ documentId: 'doc-2', title: 'Metrics' }] },
    ],
  };
}

function Harness({ initial, ...rest }: Partial<PresentationEditorProps> & { initial?: DeckSpec }) {
  const [spec, setSpec] = useState<DeckSpec>(initial ?? baseSpec());
  return (
    <PresentationEditor
      spec={spec}
      onChange={setSpec}
      preview={{ slides: spec.slides.map((slide) => ({ id: slide.id, svg: SVG })) }}
      onRequestPreview={() => undefined}
      onSaveRevision={async () => undefined}
      revisions={[{ id: 'rev-1', label: 'v1' }]}
      activeRevisionId="rev-1"
      onSelectRevision={() => undefined}
      sources={[{ documentId: 'doc-1', title: 'Sprint notes' }, { documentId: 'doc-9', title: 'Retro transcript', kind: 'transcript' }]}
      {...rest}
    />
  );
}

/** The composer is lazy; wait for it, then type through tiptap's own editor. */
async function composerEditor(): Promise<Editor> {
  const composer = await screen.findByTestId('presentation-editor-agent-composer');
  const dom = await waitFor(() => {
    const node = composer.querySelector('.ProseMirror') as (HTMLElement & { editor?: Editor }) | null;
    if (!node?.editor) throw new Error('editor not mounted');
    return node;
  });
  return dom.editor!;
}

async function send(text: string) {
  const editor = await composerEditor();
  act(() => { editor.commands.setContent(`<p>${text}</p>`); });
  fireEvent.click(screen.getByTestId('presentation-editor-agent-composer-send'));
}

describe('PresentationEditor with onInstruct', () => {
  it('renders the chat composer in agent mode under the stage, with the slide placeholder', async () => {
    render(<Harness onInstruct={vi.fn(async () => ({ summary: 'ok' }))} />);
    const composer = await screen.findByTestId('presentation-editor-agent-composer');
    expect(composer).toHaveAttribute('data-mode', 'agent');
    // No Chat | Agent | Terminal switch — this composer only talks to the deck.
    expect(screen.queryByTestId('presentation-editor-agent-composer-modes')).toBeNull();
    await waitFor(() => expect(composer.innerHTML).toContain('Tell the agent what to change on this slide'));
    expect(screen.getByTestId('presentation-editor-agent-scope')).toBeInTheDocument();
  });

  it('sends the selected slide with scope "slide", and no slide with "deck"', async () => {
    const onInstruct = vi.fn(async (): Promise<PresentationInstructResult> => ({ summary: 'Shortened the title.', changedSlideIds: ['s1'] }));
    render(<Harness onInstruct={onInstruct} />);
    fireEvent.click(screen.getByTestId('presentation-editor-slide-select-s2'));
    await send('make the title shorter');
    await waitFor(() => expect(onInstruct).toHaveBeenCalledTimes(1));
    expect(onInstruct).toHaveBeenCalledWith('make the title shorter', { slideId: 's2', scope: 'slide' });

    await waitFor(() => expect(screen.getByTestId('presentation-editor-agent-summary')).toBeInTheDocument());
    fireEvent.click(screen.getByTestId('presentation-editor-agent-scope-deck'));
    await send('tighten every slide');
    await waitFor(() => expect(onInstruct).toHaveBeenCalledTimes(2));
    expect(onInstruct).toHaveBeenLastCalledWith('tighten every slide', { scope: 'deck' });
  });

  it('is busy while the agent works: send off, a running line, then the summary and rail marks', async () => {
    let finish: (value: PresentationInstructResult) => void = () => undefined;
    const onInstruct = vi.fn(() => new Promise<PresentationInstructResult>((resolve) => { finish = resolve; }));
    render(<Harness onInstruct={onInstruct} />);
    await send('add a bullet about release risks');

    const processes = await screen.findByTestId('presentation-editor-agent-composer-processes');
    expect(processes).toHaveTextContent('Agent is editing slide 1');
    expect(screen.getByTestId('presentation-editor-agent-composer-send')).toBeDisabled();

    await act(async () => { finish({ summary: 'Added a release-risk bullet.', changedSlideIds: ['s1', 's3'] }); });
    await waitFor(() => expect(screen.queryByTestId('presentation-editor-agent-composer-processes')).toBeNull());
    const summary = screen.getByTestId('presentation-editor-agent-summary');
    expect(summary).toHaveTextContent('Added a release-risk bullet.');
    expect(summary).toHaveTextContent('2 slides marked in the filmstrip');
    expect(screen.getByTestId('presentation-editor-slide-changed-s1')).toHaveTextContent('Edited by agent');
    expect(screen.getByTestId('presentation-editor-slide-changed-s3')).toBeInTheDocument();
    expect(screen.queryByTestId('presentation-editor-slide-changed-s2')).toBeNull();
  });

  it('shows the host error and keeps the draft when the instruction fails', async () => {
    const onInstruct = vi.fn(async () => { throw new Error('The agent could not answer, so nothing was changed.'); });
    render(<Harness onInstruct={onInstruct} />);
    await send('do something');
    expect(await screen.findByTestId('presentation-editor-agent-error')).toHaveTextContent('nothing was changed');
    expect((await composerEditor()).getText()).toBe('do something');
  });

  it('offers Undo on the summary only when the host holds a snapshot', async () => {
    const onUndo = vi.fn();
    render(<Harness onInstruct={vi.fn(async () => ({ summary: 'Done it.', changedSlideIds: ['s1'] }))} onUndoInstruct={onUndo} />);
    await send('x');
    fireEvent.click(await screen.findByTestId('presentation-editor-agent-undo'));
    expect(onUndo).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId('presentation-editor-agent-summary')).toBeNull();
    expect(screen.queryByTestId('presentation-editor-slide-changed-s1')).toBeNull();
  });

  it('sends a suggestion chip as the instruction', async () => {
    const onInstruct = vi.fn(async () => ({ summary: 'ok' }));
    render(<Harness onInstruct={onInstruct} instructHints={['Shorten the title']} />);
    const chips = await screen.findByTestId('presentation-editor-agent-suggestions');
    fireEvent.click(within(chips).getByText('Shorten the title'));
    await waitFor(() => expect(onInstruct).toHaveBeenCalledWith('Shorten the title', { slideId: 's1', scope: 'slide' }));
  });

  it('folds the slide form into a collapsed "Edit slide details" disclosure, keeping sources out of it', async () => {
    render(<Harness onInstruct={vi.fn(async () => ({ summary: 'ok' }))} />);
    const details = screen.getByTestId('presentation-editor-details');
    expect(details.tagName).toBe('DETAILS');
    expect(details).not.toHaveAttribute('open');
    expect(details).toHaveTextContent('Edit slide details');
    // The citations are outside the fold: a compact row with a small Add control.
    const sourcesRow = screen.getByTestId('presentation-editor-slide-sources');
    expect(details.contains(sourcesRow)).toBe(false);
    expect(within(sourcesRow).getByText('Sprint notes')).toBeInTheDocument();
    expect(screen.queryByTestId('presentation-editor-slide-source-search')).toBeNull();
    fireEvent.click(screen.getByTestId('presentation-editor-slide-add-source'));
    expect(screen.getByTestId('presentation-editor-slide-source-search')).toBeInTheDocument();

    fireEvent.click(within(details).getByText('Edit slide details'));
    expect(details).toHaveAttribute('open');
    expect(within(details).getByTestId('presentation-editor-slide-title')).toHaveValue('Sprint review');
  });

  it('adds a citation from the compact row', async () => {
    render(<Harness onInstruct={vi.fn(async () => ({ summary: 'ok' }))} />);
    fireEvent.click(screen.getByTestId('presentation-editor-slide-add-source'));
    fireEvent.click(await screen.findByTestId('presentation-editor-slide-source-option-doc-9'));
    expect(within(screen.getByTestId('presentation-editor-slide-sources')).getByText('Retro transcript')).toBeInTheDocument();
  });

  it('puts the deck title and subtitle on one line, the title editable in place; theme is in the toolbar', () => {
    render(<Harness onInstruct={vi.fn(async () => ({ summary: 'ok' }))} />);
    const line = screen.getByTestId('presentation-editor-deck-line');
    expect(within(line).queryByRole('textbox')).toBeNull();
    fireEvent.click(within(line).getByTestId('presentation-editor-deck-title'));
    const input = within(line).getByTestId('presentation-editor-deck-title-input');
    fireEvent.change(input, { target: { value: 'Q3 review' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(within(line).getByTestId('presentation-editor-deck-title')).toHaveTextContent('Q3 review');
    expect(screen.getByTestId('presentation-editor-toolbar-theme')).toHaveTextContent('Product');
  });
});

describe('PresentationEditor without onInstruct (back-compat)', () => {
  it('renders the classic form: no composer, no disclosure, the labelled deck fields', () => {
    render(<Harness />);
    expect(screen.queryByTestId('presentation-editor-agent')).toBeNull();
    expect(screen.queryByTestId('presentation-editor-details')).toBeNull();
    expect(screen.queryByTestId('presentation-editor-deck-line')).toBeNull();
    expect(screen.getByTestId('presentation-editor-deck-title')).toHaveValue('Sprint review');
    expect(screen.getByTestId('presentation-editor-slide-form')).toBeInTheDocument();
    expect(screen.getByTestId('presentation-editor-slide-source-search')).toBeInTheDocument();
  });
});
