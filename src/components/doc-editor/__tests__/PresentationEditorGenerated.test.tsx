// The Sources slide is a real slide of the deck (2.384.1).
//
// The renderer appends it after the spec's slides; the revision's
// `slideCount`, the `.pptx` and the reader all count it. Before 2.384.1 the
// editor did not — "Slide 1 of 3" beside a Details panel saying "4 slides" —
// so these tests hold the editor to the same number as everything else: the
// generated slide is in the filmstrip (locked), on the stage, in the pager,
// in ←/→, in Present's index and in the footer's `slideCount`.
import { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  PresentationEditor,
  type PresentationEditorProps,
  type PresentationFooterContext,
  type PresentationPreview,
} from '../presentation/PresentationEditor';
import type { DeckSpec } from '../presentation/deckSpec';

const SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="9"></svg>';

function spec(): DeckSpec {
  return {
    title: 'Release plan',
    theme: 'product',
    slides: [
      { id: 's1', layout: 'title', title: 'Release plan', sources: [{ documentId: 'doc-1', title: 'Release plan' }] },
      { id: 's2', layout: 'bullets', title: 'Scope', bullets: ['Gateway'], sources: [{ documentId: 'doc-1', title: 'Release plan' }] },
      { id: 's3', layout: 'bullets', title: 'Rollback', bullets: ['Revert'], sources: [{ documentId: 'doc-1', title: 'Release plan' }] },
    ],
  };
}

/** What `POST /api/deck/preview` answers: the spec's slides, then the Sources slide. */
const withSources: PresentationPreview = {
  slides: [
    { id: 's1', svg: SVG },
    { id: 's2', svg: SVG },
    { id: 's3', svg: SVG },
    { id: 'sources', title: 'Sources', svg: SVG, generated: true },
  ],
};

function Harness({ initial, preview = withSources, ...rest }: Partial<PresentationEditorProps> & { initial?: DeckSpec }) {
  const [value, setValue] = useState<DeckSpec>(initial ?? spec());
  return (
    <PresentationEditor
      spec={value}
      onChange={setValue}
      preview={preview}
      onRequestPreview={() => undefined}
      onSaveRevision={async () => undefined}
      revisions={[{ id: 'rev-1', label: 'v1' }]}
      activeRevisionId="rev-1"
      sources={[{ documentId: 'doc-1', title: 'Release plan' }]}
      {...rest}
    />
  );
}

describe('PresentationEditor — the generated Sources slide is a slide of the deck', () => {
  it('counts it in the pager, shows it locked at the end of the filmstrip, and puts it on the stage when selected', () => {
    const onSelected = vi.fn();
    render(<Harness onSelectedSlideChange={onSelected} />);

    expect(screen.getByTestId('presentation-editor-position').textContent).toBe('Slide 1 of 4');
    const row = screen.getByTestId('presentation-editor-slide-row-sources');
    expect(row.getAttribute('data-generated')).toBe('true');
    expect(screen.getByTestId('presentation-editor-slide-generated-sources').textContent).toContain('Generated');
    // Locked: no ⋯ menu, no drag handle, but it is numbered on from the deck's own.
    expect(screen.queryByTestId('presentation-editor-slide-menu-sources')).toBeNull();
    expect(row.textContent).toContain('4');
    expect(screen.getByRole('button', { name: 'Slide 4: Sources (generated, not editable)' })).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('presentation-editor-slide-select-sources'));
    expect(screen.getByTestId('presentation-editor-position').textContent).toBe('Slide 4 of 4');
    expect(screen.getByTestId('presentation-editor-stage-image').getAttribute('alt')).toBe('Sources');
    expect(screen.getByTestId('presentation-editor-generated-note').textContent).toContain('built from the slides');
    // Nothing to edit: no title field, no notes, no form for it.
    expect(screen.queryByTestId('presentation-editor-slide-title')).toBeNull();
    expect(screen.queryByTestId('presentation-editor-slide-notes')).toBeNull();
    expect(screen.getByRole('button', { name: 'Next slide' })).toBeDisabled();
    expect(onSelected).toHaveBeenLastCalledWith('sources', 3);
  });

  it('←/→ walk onto it and back, and Present opens at its number', () => {
    const onOpen = vi.fn();
    render(<Harness onOpenPresentationView={onOpen} />);
    fireEvent.click(screen.getByTestId('presentation-editor-slide-select-s3'));
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByTestId('presentation-editor-position').textContent).toBe('Slide 4 of 4');
    fireEvent.click(screen.getByTestId('presentation-editor-toolbar-present'));
    expect(onOpen).toHaveBeenCalledWith({ slideId: 'sources', slideIndex: 4 });
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(screen.getByTestId('presentation-editor-position').textContent).toBe('Slide 3 of 4');
  });

  it('tells the footer the whole deck and which generated slide is on the stage', () => {
    const seen: PresentationFooterContext[] = [];
    render(<Harness footer={(ctx) => { seen.push(ctx); return <div data-testid="footer">{ctx.slideCount}</div>; }} />);
    expect(screen.getByTestId('footer').textContent).toBe('4');
    expect(seen.at(-1)!.selectedSlide?.id).toBe('s1');
    expect(seen.at(-1)!.selectedGeneratedSlide).toBeUndefined();
    fireEvent.click(screen.getByTestId('presentation-editor-slide-select-sources'));
    expect(seen.at(-1)!.selectedSlide).toBeUndefined();
    expect(seen.at(-1)!.selectedGeneratedSlide).toEqual({ id: 'sources', title: 'Sources', svg: SVG });
    expect(seen.at(-1)!.selectedIndex).toBe(3);
  });

  it('a new slide asked for while the generated one is on the stage goes after the last of the deck\'s own', () => {
    render(<Harness />);
    fireEvent.click(screen.getByTestId('presentation-editor-slide-select-sources'));
    fireEvent.click(screen.getByTestId('presentation-editor-slide-add'));
    const order = Array.from(document.querySelectorAll('[data-slide-id]')).map((node) => node.getAttribute('data-slide-id'));
    expect(order).toHaveLength(5);
    expect(order[3]).not.toBe('sources');
    expect(order[4]).toBe('sources');
    expect(screen.getByTestId('presentation-editor-position').textContent).toBe('Slide 4 of 5');
  });

  it('a stale render of a slide that is not in the deck is not a locked thumb — only what the host marked generated', () => {
    const stale: PresentationPreview = {
      slides: [
        { id: 's1', svg: SVG },
        { id: 'deleted', svg: SVG },
        { id: 'sources', title: 'Sources', svg: SVG, generated: true },
      ],
    };
    render(<Harness preview={stale} />);
    expect(screen.queryByTestId('presentation-editor-slide-row-deleted')).toBeNull();
    expect(screen.getByTestId('presentation-editor-position').textContent).toBe('Slide 1 of 4');
  });

  it('the reading surface counts it too', () => {
    render(<Harness readOnly />);
    expect(screen.getByTestId('presentation-editor-readonly').getAttribute('aria-label')).toContain('slide 1 of 4');
  });

  it('without a generated slide nothing changes', () => {
    render(<Harness preview={{ slides: [{ id: 's1', svg: SVG }, { id: 's2', svg: SVG }, { id: 's3', svg: SVG }] }} />);
    expect(screen.getByTestId('presentation-editor-position').textContent).toBe('Slide 1 of 3');
    expect(screen.queryByTestId('presentation-editor-slide-generated-list')).toBeNull();
  });
});
