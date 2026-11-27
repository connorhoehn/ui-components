// PresentationEditor's in-place present mode (2.548.0): no dialog, the
// editor's regions give way to DeckPresentMode, the host hears
// onFocusModeChange(true) then (false), and the behaviours the portal's
// dialog pinned still hold (starts at the selected slide, waits for a fresh
// render, keeps unsaved edits, returns selection to the slide showing).

import { useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { PresentationEditor, type PresentationEditorProps, type PresentationPreview } from '../presentation/PresentationEditor';
import { DeckPresentMode } from '../presentation/DeckPresentMode';
import type { DeckSpec } from '../presentation/deckSpec';

afterEach(cleanup);

const SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="9"></svg>';
const sources = [{ documentId: 'doc-1', title: 'Notes' }];
const spec: DeckSpec = {
  title: 'Sprint review',
  slides: [
    { id: 's1', layout: 'title', title: 'Sprint review', sources },
    { id: 's2', layout: 'bullets', title: 'Delivery', bullets: ['Shipped'], notes: 'Say thanks', sources },
    { id: 's3', layout: 'bullets', title: 'Next', bullets: ['Plan'], sources },
  ],
};
const rendered: PresentationPreview = { slides: [{ id: 's1', svg: SVG }, { id: 's2', svg: SVG }, { id: 's3', svg: SVG }] };

interface HarnessProps extends Partial<PresentationEditorProps> {
  onSpec?: (spec: DeckSpec) => void;
}

function Harness({ onSpec, ...rest }: HarnessProps) {
  const [current, setCurrent] = useState(spec);
  return (
    <PresentationEditor
      spec={current}
      onChange={(next) => { setCurrent(next); onSpec?.(next); }}
      preview={rendered}
      onRequestPreview={() => undefined}
      onSaveRevision={async () => undefined}
      revisions={[{ id: 'r1', label: 'v1' }]}
      activeRevisionId="r1"
      onSelectRevision={() => undefined}
      sources={[]}
      {...rest}
    />
  );
}

const noDialog = () => {
  expect(screen.queryByRole('dialog')).toBeNull();
  expect(document.querySelector('[aria-modal]')).toBeNull();
};

describe('PresentationEditor — present in place', () => {
  it('replaces the editor regions, starts at the selected slide, pages by keys and exits on Escape', () => {
    const calls: boolean[] = [];
    render(<Harness onFocusModeChange={(on) => calls.push(on)} showNotes />);
    fireEvent.click(screen.getByTestId('presentation-editor-slide-select-s2'));
    expect(calls).toEqual([]);
    fireEvent.click(screen.getByTestId('presentation-editor-toolbar-present'));
    noDialog();
    expect(calls).toEqual([true]);
    // The editor's toolbar, filmstrip and stage are gone; the view has focus.
    expect(screen.queryByTestId('presentation-editor-toolbar-present')).toBeNull();
    expect(screen.queryByTestId('presentation-editor-body')).toBeNull();
    const view = screen.getByTestId('presentation-editor-present');
    expect(screen.getByTestId('presentation-editor')).toContainElement(view);
    expect(view).toHaveFocus();
    expect(screen.getByTestId('presentation-editor-present-position')).toHaveTextContent('Slide 2 of 3');
    expect(within(screen.getByTestId('presentation-editor-present-notes')).getByText('Say thanks')).toBeInTheDocument();
    // The editor's own window shortcuts are off while presenting.
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByTestId('presentation-editor-present-position')).toHaveTextContent('Slide 2 of 3');
    fireEvent.keyDown(view, { key: 'ArrowRight' });
    expect(screen.getByTestId('presentation-editor-present-position')).toHaveTextContent('Slide 3 of 3');
    expect(screen.getByText('No speaker notes on this slide.')).toBeInTheDocument();
    fireEvent.keyDown(view, { key: 'ArrowRight' });
    expect(screen.getByTestId('presentation-editor-present-position')).toHaveTextContent('Slide 3 of 3');
    fireEvent.keyDown(view, { key: 'Escape' });
    expect(calls).toEqual([true, false]);
    // Back on the slide that was showing, focus on Present.
    expect(screen.getByTestId('presentation-editor-position')).toHaveTextContent('Slide 3 of 3');
    expect(screen.getByTestId('presentation-editor-toolbar-present')).toHaveFocus();
  });

  it('Exit and Previous/Next buttons work; notes stay hidden without showNotes', () => {
    render(<Harness />);
    fireEvent.click(screen.getByTestId('presentation-editor-toolbar-present'));
    expect(screen.queryByTestId('presentation-editor-present-notes')).toBeNull();
    expect(screen.getByRole('button', { name: 'Previous slide' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Next slide' }));
    expect(screen.getByTestId('presentation-editor-present-position')).toHaveTextContent('Slide 2 of 3');
    fireEvent.click(screen.getByRole('button', { name: 'Exit presentation' }));
    expect(screen.queryByTestId('presentation-editor-present')).toBeNull();
    expect(screen.getByTestId('presentation-editor-position')).toHaveTextContent('Slide 2 of 3');
  });

  it('keeps unsaved edits: presenting neither changes nor saves the spec', () => {
    const onSpec = vi.fn();
    const onSave = vi.fn(async () => undefined);
    render(<Harness onSpec={onSpec} onSaveRevision={onSave} />);
    fireEvent.change(screen.getByTestId('presentation-editor-deck-title'), { target: { value: 'Unsaved title' } });
    expect(onSpec).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByTestId('presentation-editor-toolbar-present'));
    expect(screen.getByTestId('presentation-editor-present-title')).toHaveTextContent('Unsaved title');
    fireEvent.keyDown(screen.getByTestId('presentation-editor-present'), { key: 'ArrowRight' });
    fireEvent.keyDown(screen.getByTestId('presentation-editor-present'), { key: 'Escape' });
    expect(onSpec).toHaveBeenCalledTimes(1);
    expect(onSave).not.toHaveBeenCalled();
    expect(screen.getByTestId('presentation-editor-deck-title')).toHaveValue('Unsaved title');
    expect(screen.getByTestId('presentation-editor-toolbar-undo')).not.toBeDisabled();
  });

  it('waits for a render of the current spec before showing a slide', () => {
    const { rerender } = render(<Harness previewCurrent={false} />);
    fireEvent.click(screen.getByTestId('presentation-editor-toolbar-present'));
    expect(screen.getByTestId('presentation-editor-present-loading')).toBeInTheDocument();
    expect(screen.queryByTestId('presentation-editor-present-stage')).toBeNull();
    rerender(<Harness preview="loading" />);
    expect(screen.getByTestId('presentation-editor-present-loading')).toBeInTheDocument();
    rerender(<Harness />);
    expect(screen.getByTestId('presentation-editor-present-stage').querySelector('img')).not.toBeNull();
    rerender(<Harness preview={{ error: 'Render failed' }} />);
    expect(screen.getByTestId('presentation-editor-present-error')).toHaveTextContent('Render failed');
  });

  it('inside renderFrame, the frame gets only the presentation (no toolbar, actions or footer)', () => {
    const frames: Array<{ toolbar: boolean; actions: boolean; footer: boolean }> = [];
    render(
      <Harness
        footer={<div data-testid="host-footer" />}
        renderFrame={({ toolbar, actions, surface, footer }) => {
          frames.push({ toolbar: !!toolbar, actions: !!actions, footer: !!footer });
          return <div>{toolbar}{actions}{surface}{footer}</div>;
        }}
      />,
    );
    expect(frames.at(-1)).toEqual({ toolbar: true, actions: true, footer: true });
    fireEvent.click(screen.getByTestId('presentation-editor-toolbar-present'));
    expect(frames.at(-1)).toEqual({ toolbar: false, actions: false, footer: false });
    noDialog();
    fireEvent.click(screen.getByRole('button', { name: 'Exit presentation' }));
    expect(screen.getByTestId('host-footer')).toBeInTheDocument();
  });

  it('a host that passes onOpenPresentationView keeps its own view; focus mode is not used', () => {
    const onOpen = vi.fn();
    const onFocusModeChange = vi.fn();
    render(<Harness onOpenPresentationView={onOpen} onFocusModeChange={onFocusModeChange} />);
    fireEvent.click(screen.getByTestId('presentation-editor-toolbar-present'));
    expect(onOpen).toHaveBeenCalledWith({ slideId: 's1', slideIndex: 1 });
    expect(screen.queryByTestId('presentation-editor-present')).toBeNull();
    expect(onFocusModeChange).not.toHaveBeenCalled();
  });

  it('unmounting while presenting reports the end of focus mode', () => {
    const calls: boolean[] = [];
    const { unmount } = render(<Harness onFocusModeChange={(on) => calls.push(on)} />);
    fireEvent.click(screen.getByTestId('presentation-editor-toolbar-present'));
    unmount();
    expect(calls).toEqual([true, false]);
  });
});

describe('DeckPresentMode — static markup', () => {
  it('renders the slide, counter, Exit and notes with no dialog or modal attributes', () => {
    const html = renderToStaticMarkup(
      <DeckPresentMode
        title="Deck"
        slides={[{ id: 'a', title: 'A', svg: SVG, notes: 'Hello' }, { id: 'b', title: 'B', svg: SVG }]}
        slideIndex={0}
        onSlideChange={() => {}}
        onExit={() => {}}
        showNotes
      />,
    );
    expect(html).not.toMatch(/role="dialog"|aria-modal/);
    expect(html).toContain('Slide 1 of 2');
    expect(html).toContain('Exit presentation');
    expect(html).toContain('Speaker notes');
    // Fills its box and fits the 16:9 slide to the column's height.
    expect(html).toMatch(/class="[^"]*\bh-full\b[^"]*"/);
    expect(html).toContain('max-w-[calc(100cqh*16/9)]');
    expect(html).toContain('lg:flex-row');
  });

  it('renders the editor with no dialog in its editing state', () => {
    const html = renderToStaticMarkup(<Harness layoutPreviews={{}} />);
    expect(html).not.toMatch(/role="dialog"|aria-modal/);
  });
});
