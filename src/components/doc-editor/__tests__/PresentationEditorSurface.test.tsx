// The presentation editor's surface (2.363.0): filmstrip, 16:9 stage,
// speaker notes, slides toolbar, `generatingSlideIds`, `footer` and
// `renderFrame`. Assertions are on the spec the editor hands back, the same
// as the round-trip tests, plus the states a person can see.

import { useState } from 'react';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  PresentationEditor,
  type PresentationEditorFrame,
  type PresentationEditorProps,
  type PresentationPreview,
} from '../presentation/PresentationEditor';
import { Filmstrip } from '../presentation/Filmstrip';
import { SlideStage } from '../presentation/SlideStage';
import { SpeakerNotes } from '../presentation/SpeakerNotes';
import type { DeckSpec } from '../presentation/deckSpec';
import { MAX_NOTES_CHARS } from '../presentation/deckSpec';

const SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="9"></svg>';

function baseSpec(): DeckSpec {
  return {
    title: 'Sprint review',
    theme: 'product',
    slides: [
      { id: 's1', layout: 'title', title: 'Sprint review', sources: [{ documentId: 'doc-1', title: 'Notes' }] },
      { id: 's2', layout: 'bullets', title: 'Delivery', bullets: ['Shipped'], notes: 'Say thanks', sources: [{ documentId: 'doc-1', title: 'Notes' }] },
      {
        id: 's3',
        layout: 'chart',
        title: 'Throughput',
        chart: { kind: 'bar', labels: ['Q1'], series: [{ name: 'Merged', values: [3] }] },
        sources: [{ documentId: 'doc-2', title: 'Metrics' }],
      },
    ],
  };
}

const preview: PresentationPreview = { slides: [{ id: 's1', svg: SVG }, { id: 's2', svg: SVG }, { id: 's3', svg: SVG }] };

interface HarnessProps extends Partial<PresentationEditorProps> {
  onSpec?: (spec: DeckSpec) => void;
  initial?: DeckSpec;
}

function Harness({ onSpec, initial, ...rest }: HarnessProps) {
  const [spec, setSpec] = useState<DeckSpec>(initial ?? baseSpec());
  return (
    <>
    {/* A spec from outside the editor — a revision switch, the agent. */}
    <button type="button" data-testid="replace-spec" onClick={() => setSpec(baseSpec())}>replace</button>
    <PresentationEditor
      spec={spec}
      onChange={(next) => { setSpec(next); onSpec?.(next); }}
      preview={preview}
      onRequestPreview={() => undefined}
      onSaveRevision={async () => undefined}
      revisions={[{ id: 'rev-1', label: 'v1' }]}
      activeRevisionId="rev-1"
      onSelectRevision={() => undefined}
      sources={[]}
      {...rest}
    />
    </>
  );
}

const last = (fn: ReturnType<typeof vi.fn>): DeckSpec => fn.mock.calls.at(-1)![0];

describe('Filmstrip', () => {
  it('shows numbered 16:9 thumbnails from the rendered SVGs and selects on click', () => {
    render(<Harness />);
    const strip = screen.getByTestId('presentation-editor-slide-strip');
    expect(within(strip).getAllByRole('button', { name: /^Slide \d:/ })).toHaveLength(3);
    const thumb = screen.getByTestId('presentation-editor-slide-select-s2');
    expect(thumb.className).toMatch(/aspect-\[16\/9\]/);
    expect(screen.getByTestId('presentation-editor-slide-thumb-s2')).toHaveAttribute('src', expect.stringMatching(/^data:image\/svg\+xml/));

    fireEvent.click(thumb);
    expect(thumb).toHaveAttribute('aria-current', 'true');
    expect(screen.getByTestId('presentation-editor-position')).toHaveTextContent('Slide 2 of 3');
  });

  it('moves the selection with ↑/↓ and the slide with Alt+↑/↓', () => {
    const onSpec = vi.fn();
    render(<Harness onSpec={onSpec} />);
    const first = screen.getByTestId('presentation-editor-slide-select-s1');
    first.focus();
    fireEvent.keyDown(first, { key: 'ArrowDown' });
    expect(screen.getByTestId('presentation-editor-slide-select-s2')).toHaveAttribute('aria-current', 'true');
    expect(document.activeElement).toBe(screen.getByTestId('presentation-editor-slide-select-s2'));

    fireEvent.keyDown(screen.getByTestId('presentation-editor-slide-select-s2'), { key: 'ArrowDown', altKey: true });
    expect(last(onSpec).slides.map((slide) => slide.id)).toEqual(['s1', 's3', 's2']);
  });

  it('marks a generating slide busy, and shows an unknown id as a placeholder at the end', () => {
    render(<Harness generatingSlideIds={['s2', 'new-1']} />);
    const row = screen.getByTestId('presentation-editor-slide-row-s2');
    expect(row).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByTestId('presentation-editor-slide-generating-s2')).toHaveTextContent('Generating…');
    expect(screen.getByTestId('presentation-editor-slide-placeholder-new-1')).toHaveAttribute('aria-busy', 'true');
    expect(screen.queryByTestId('presentation-editor-slide-row-s1')).not.toHaveAttribute('aria-busy');

    fireEvent.click(screen.getByTestId('presentation-editor-slide-select-s2'));
    expect(screen.getByTestId('presentation-editor-stage')).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByTestId('presentation-editor-stage-generating')).toHaveTextContent('Generating…');
  });

  it('marks who is on which slide with small avatars, named for screen readers', () => {
    render(<Harness slideViewers={{ s2: [{ id: 'dev-frank', name: 'Frank Davis' }], s3: [] }} />);
    const marker = screen.getByTestId('presentation-editor-slide-viewers-s2');
    expect(marker).toHaveAttribute('aria-label', 'Frank Davis is on this slide');
    expect(screen.queryByTestId('presentation-editor-slide-viewers-s3')).toBeNull();
    expect(screen.queryByTestId('presentation-editor-slide-viewers-s1')).toBeNull();
  });

  it('puts a requested slide on the stage once per key (jump / follow)', () => {
    const { rerender } = render(<Harness selectSlideRequest={{ slideId: 's3', key: 1 }} />);
    expect(screen.getByTestId('presentation-editor-slide-select-s3')).toHaveAttribute('aria-current', 'true');
    fireEvent.click(screen.getByTestId('presentation-editor-slide-select-s1'));
    rerender(<Harness selectSlideRequest={{ slideId: 's3', key: 1 }} />);
    expect(screen.getByTestId('presentation-editor-slide-select-s1')).toHaveAttribute('aria-current', 'true');
    rerender(<Harness selectSlideRequest={{ slideId: 's3', key: 2 }} />);
    expect(screen.getByTestId('presentation-editor-slide-select-s3')).toHaveAttribute('aria-current', 'true');
    rerender(<Harness selectSlideRequest={{ slideId: 'gone', key: 3 }} />);
    expect(screen.getByTestId('presentation-editor-slide-select-s3')).toHaveAttribute('aria-current', 'true');
  });

  it('adds from the dashed card at the end', () => {
    const onAdd = vi.fn();
    render(
      <Filmstrip
        items={baseSpec().slides.map((slide) => ({ slide, uncited: false }))}
        selectedId="s1"
        onSelect={() => undefined}
        onMove={() => undefined}
        onDuplicate={() => undefined}
        onDelete={() => undefined}
        onAdd={onAdd}
      />,
    );
    fireEvent.click(screen.getByTestId('filmstrip-add'));
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  it('keeps the uncited marker on the thumbnail', () => {
    const spec = baseSpec();
    spec.slides[1] = { ...spec.slides[1]!, sources: [] };
    render(<Harness initial={spec} />);
    expect(screen.getByTestId('presentation-editor-slide-uncited-s2')).toHaveTextContent('No source');
    expect(screen.getByTestId('presentation-editor-save')).toBeDisabled();
  });
});

describe('SlideStage', () => {
  it('is a 16:9 frame', () => {
    render(<SlideStage label="Slide 1"><span>slide</span></SlideStage>);
    const frame = screen.getByRole('figure', { name: 'Slide 1' });
    expect(frame).toHaveAttribute('data-aspect', '16/9');
    expect(frame.className).toMatch(/aspect-\[16\/9\]/);
    expect(frame).not.toHaveAttribute('aria-busy');
  });
});

describe('SpeakerNotes', () => {
  it('edits the selected slide’s notes field', () => {
    const onSpec = vi.fn();
    render(<Harness onSpec={onSpec} />);
    fireEvent.click(screen.getByTestId('presentation-editor-slide-select-s2'));
    const notes = screen.getByTestId('presentation-editor-slide-notes');
    expect(notes).toHaveValue('Say thanks');
    fireEvent.change(notes, { target: { value: 'Pause for questions' } });
    expect(last(onSpec).slides[1]!.notes).toBe('Pause for questions');
    fireEvent.change(notes, { target: { value: '' } });
    expect(last(onSpec).slides[1]!.notes).toBeUndefined();
  });

  it('caps at the generator’s limit and counts', () => {
    const onChange = vi.fn();
    render(<SpeakerNotes value={'x'.repeat(10)} onChange={onChange} />);
    expect(screen.getByTestId('speaker-notes')).toHaveAttribute('maxLength', String(MAX_NOTES_CHARS));
    expect(screen.getByTestId('speaker-notes-count')).toHaveTextContent(`10 / ${MAX_NOTES_CHARS}`);
    fireEvent.change(screen.getByTestId('speaker-notes'), { target: { value: 'y'.repeat(MAX_NOTES_CHARS + 5) } });
    expect(onChange.mock.calls.at(-1)![0]).toHaveLength(MAX_NOTES_CHARS);
  });
});

describe('SlidesToolbar in the editor', () => {
  it('inserts a slide of the chosen layout after the current one', () => {
    const onSpec = vi.fn();
    render(<Harness onSpec={onSpec} />);
    fireEvent.click(screen.getByTestId('presentation-editor-toolbar-insert'));
    fireEvent.click(screen.getByTestId('presentation-editor-toolbar-insert-quote'));
    const spec = last(onSpec);
    expect(spec.slides).toHaveLength(4);
    expect(spec.slides[1]!.layout).toBe('quote');
    expect(spec.slides[1]!.quote).toEqual({ text: '', by: '' });
  });

  it('sets the theme, and the chart type only on a chart slide', () => {
    const onSpec = vi.fn();
    render(<Harness onSpec={onSpec} />);
    fireEvent.click(screen.getByTestId('presentation-editor-toolbar-theme'));
    fireEvent.click(screen.getByTestId('presentation-editor-toolbar-theme-engineering'));
    expect(last(onSpec).theme).toBe('engineering');

    expect(screen.queryByTestId('presentation-editor-toolbar-chart-kind')).toBeNull();
    fireEvent.click(screen.getByTestId('presentation-editor-slide-select-s3'));
    fireEvent.click(within(screen.getByTestId('presentation-editor-toolbar-chart-kind')).getByText('Line'));
    expect(last(onSpec).slides[2]!.chart!.kind).toBe('line');
  });

  it('offers no inline formatting, and says why', () => {
    render(<Harness />);
    const bar = screen.getByRole('toolbar', { name: 'Slide tools' });
    expect(within(bar).queryByRole('button', { name: /bold|italic/i })).toBeNull();
    expect(screen.getByTestId('presentation-editor-toolbar-style-note')).toHaveTextContent('Text style comes from the theme');
  });

  it('undoes and redoes its own edits, and drops the history when the spec is replaced from outside', () => {
    const onSpec = vi.fn();
    render(<Harness onSpec={onSpec} />);
    const undo = screen.getByTestId('presentation-editor-toolbar-undo');
    expect(undo).toBeDisabled();

    fireEvent.click(screen.getByTestId('presentation-editor-toolbar-new-slide'));
    expect(last(onSpec).slides).toHaveLength(4);
    fireEvent.click(undo);
    expect(last(onSpec).slides).toHaveLength(3);
    fireEvent.click(screen.getByTestId('presentation-editor-toolbar-redo'));
    expect(last(onSpec).slides).toHaveLength(4);

    expect(undo).not.toBeDisabled();
    // Not ours: a new spec object from the host.
    fireEvent.click(screen.getByTestId('replace-spec'));
    expect(screen.getByTestId('presentation-editor-toolbar-undo')).toBeDisabled();
    expect(screen.getByTestId('presentation-editor-toolbar-redo')).toBeDisabled();
  });

  it('Present opens the view at the slide on the stage', () => {
    const onOpen = vi.fn();
    render(<Harness onOpenPresentationView={onOpen} />);
    fireEvent.click(screen.getByTestId('presentation-editor-slide-select-s3'));
    fireEvent.click(screen.getByTestId('presentation-editor-toolbar-present'));
    expect(onOpen).toHaveBeenCalledWith({ slideId: 's3', slideIndex: 3 });
  });
});

describe('footer and renderFrame', () => {
  it('pins the agent box at the foot of the editor: last child, outside the scrolling region', async () => {
    render(<Harness onInstruct={vi.fn(async () => ({ summary: 'ok' }))} />);
    const root = screen.getByTestId('presentation-editor');
    const dock = screen.getByTestId('presentation-editor-dock');
    const scroller = screen.getByTestId('presentation-editor-scroller');
    expect(root.lastElementChild).toBe(dock);
    expect(scroller.contains(dock)).toBe(false);
    // Scope toggle and the composer are inside the dock; sources and notes scroll above it.
    expect(await within(dock).findByTestId('presentation-editor-agent-scope')).toBeInTheDocument();
    expect(within(scroller).getByTestId('presentation-editor-slide-sources')).toBeInTheDocument();
    expect(within(scroller).getByTestId('presentation-editor-slide-notes')).toBeInTheDocument();
    expect(dock).toHaveAttribute('data-placement', 'pinned');
  });

  it('a host footer replaces the built-in agent box and is told the selected slide', () => {
    const footer = vi.fn(({ selectedSlide }: { selectedSlide?: { id: string } }) => (
      <div data-testid="host-footer">{selectedSlide?.id}</div>
    ));
    render(<Harness onInstruct={vi.fn(async () => ({ summary: 'ok' }))} footer={footer} />);
    expect(screen.getByTestId('host-footer')).toHaveTextContent('s1');
    expect(screen.queryByTestId('presentation-editor-agent')).toBeNull();
    fireEvent.click(screen.getByTestId('presentation-editor-slide-select-s2'));
    expect(screen.getByTestId('host-footer')).toHaveTextContent('s2');
  });

  it('hands toolbar, actions, surface and footer to the frame', async () => {
    let frame: PresentationEditorFrame | null = null;
    render(
      <Harness
        onInstruct={vi.fn(async () => ({ summary: 'ok' }))}
        renderFrame={(parts) => {
          frame = parts;
          return (
            <div>
              <div data-testid="frame-toolbar">{parts.toolbar}</div>
              <div data-testid="frame-actions">{parts.actions}</div>
              <div data-testid="frame-surface">{parts.surface}</div>
              <div data-testid="frame-footer">{parts.footer}</div>
            </div>
          );
        }}
      />,
    );
    expect(frame).not.toBeNull();
    expect(within(screen.getByTestId('frame-toolbar')).getByTestId('presentation-editor-toolbar-new-slide')).toBeInTheDocument();
    expect(within(screen.getByTestId('frame-actions')).getByTestId('presentation-editor-save')).toHaveTextContent('Save as v2');
    expect(within(screen.getByTestId('frame-surface')).getByTestId('presentation-editor-stage')).toBeInTheDocument();
    // The built-in agent box, docked.
    expect(within(screen.getByTestId('frame-footer')).getByTestId('presentation-editor-dock')).toBeInTheDocument();
    expect(within(screen.getByTestId('frame-surface')).queryByTestId('presentation-editor-dock')).toBeNull();
    await act(async () => undefined);
  });

  it('framed: the slide nav rides the deck line, and the stage is fitted to the column (a size container)', () => {
    render(<Harness renderFrame={(parts) => <div data-testid="frame-surface">{parts.surface}</div>} />);
    const deckLine = screen.getByTestId('presentation-editor-deck-line');
    expect(within(deckLine).getByTestId('presentation-editor-slide-nav')).toBeInTheDocument();
    expect(within(deckLine).getByTestId('presentation-editor-position')).toHaveTextContent('Slide 1 of 3');
    expect(screen.getByTestId('presentation-editor-main').className).toContain('md:[container-type:size]');
    expect(screen.getByTestId('presentation-editor-stage-frame').className).toContain('100cqh');
  });

  it('unframed: the slide nav stays under the stage', () => {
    render(<Harness />);
    expect(within(screen.getByTestId('presentation-editor-main')).getByTestId('presentation-editor-slide-nav')).toBeInTheDocument();
  });
});

describe('revision controls', () => {
  it('up to five revisions are segmented tabs; more are one picker, newest first', () => {
    const onSelectRevision = vi.fn();
    const revisions = Array.from({ length: 8 }, (_, i) => ({ id: `rev-${i + 1}`, label: `v${i + 1}` }));
    render(<Harness revisions={revisions} activeRevisionId="rev-8" onSelectRevision={onSelectRevision} />);
    const select = screen.getByTestId('presentation-editor-revision-select') as HTMLSelectElement;
    expect(select.value).toBe('rev-8');
    expect(select.options[0]!.textContent).toBe('v8 · latest');
    fireEvent.change(select, { target: { value: 'rev-3' } });
    expect(onSelectRevision).toHaveBeenCalledWith('rev-3');
  });

  it('five or fewer stay tabs', () => {
    render(<Harness />);
    expect(screen.queryByTestId('presentation-editor-revision-select')).toBeNull();
  });
});
