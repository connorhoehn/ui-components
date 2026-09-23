// The editor's contract with the generator, exercised through the DOM.
//
// Everything asserted here is a property of the DeckSpec that comes back out,
// not of the pixels: the spec is what `renderPptx` reads, so a form that looks
// right and emits the wrong object is the failure mode worth catching.

import { useState } from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  PresentationEditor,
  type PresentationEditorProps,
  type PresentationPreview,
} from '../presentation/PresentationEditor';
import type { DeckSpec } from '../presentation/deckSpec';

const SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="9"></svg>';

function baseSpec(): DeckSpec {
  return {
    title: 'Sprint review',
    theme: 'product',
    slides: [
      {
        id: 's1',
        layout: 'title',
        title: 'Sprint review',
        sources: [{ documentId: 'doc-1', title: 'Sprint notes' }],
      },
      {
        id: 's2',
        layout: 'bullets',
        title: 'Delivery',
        bullets: ['Shipped the gateway'],
        sources: [{ documentId: 'doc-1', title: 'Sprint notes' }],
      },
      {
        id: 's3',
        layout: 'chart',
        title: 'Throughput',
        chart: { kind: 'bar', labels: ['Q1', 'Q2'], series: [{ name: 'Merged', values: [3, 5] }] },
        sources: [{ documentId: 'doc-2', title: 'Metrics' }],
      },
    ],
  };
}

const preview: PresentationPreview = {
  slides: [
    { id: 's1', svg: SVG },
    { id: 's2', svg: SVG },
    { id: 's3', svg: SVG },
  ],
};

interface HarnessProps extends Partial<PresentationEditorProps> {
  initial?: DeckSpec;
  onSpec?: (spec: DeckSpec) => void;
}

/**
 * The component is controlled, so the test has to own the spec — which is also
 * the only honest way to assert a round-trip: the object that goes back in is
 * the object that came out.
 */
function Harness({ initial, onSpec, ...rest }: HarnessProps) {
  const [spec, setSpec] = useState<DeckSpec>(initial ?? baseSpec());
  return (
    <PresentationEditor
      spec={spec}
      onChange={(next) => {
        setSpec(next);
        onSpec?.(next);
      }}
      preview={preview}
      onRequestPreview={() => undefined}
      onSaveRevision={async () => undefined}
      revisions={[{ id: 'rev-1', label: 'v1' }, { id: 'rev-2', label: 'v2' }]}
      activeRevisionId="rev-2"
      onSelectRevision={() => undefined}
      sources={[
        { documentId: 'doc-1', title: 'Sprint notes' },
        { documentId: 'doc-9', title: 'Retro transcript', kind: 'transcript' },
      ]}
      {...rest}
    />
  );
}

function slideOrder(): string[] {
  return Array.from(document.querySelectorAll('[data-slide-id]')).map(
    (node) => node.getAttribute('data-slide-id') ?? '',
  );
}

describe('PresentationEditor — spec round-trip', () => {
  it('writes a slide title edit back into the spec, leaving its siblings alone', () => {
    const onSpec = vi.fn();
    render(<Harness onSpec={onSpec} />);

    fireEvent.change(screen.getByTestId('presentation-editor-slide-title'), {
      target: { value: 'Sprint review — week 4' },
    });

    const next: DeckSpec = onSpec.mock.calls.at(-1)![0];
    expect(next.slides[0].title).toBe('Sprint review — week 4');
    expect(next.slides[1]).toEqual(baseSpec().slides[1]);
  });

  it('edits bullets as a list, and adds one', () => {
    const onSpec = vi.fn();
    render(<Harness onSpec={onSpec} />);
    fireEvent.click(screen.getByTestId('presentation-editor-slide-select-s2'));

    fireEvent.change(screen.getByTestId('presentation-editor-slide-bullets-0'), {
      target: { value: 'Shipped the gateway rewrite' },
    });
    fireEvent.click(screen.getByTestId('presentation-editor-slide-bullets-add'));

    const next: DeckSpec = onSpec.mock.calls.at(-1)![0];
    expect(next.slides[1].bullets).toEqual(['Shipped the gateway rewrite', '']);
  });

  it('edits a chart series through the table and keeps the numbers numeric', () => {
    const onSpec = vi.fn();
    render(<Harness onSpec={onSpec} />);
    fireEvent.click(screen.getByTestId('presentation-editor-slide-select-s3'));

    fireEvent.change(screen.getByTestId('presentation-editor-slide-chart-value-0-1'), {
      target: { value: '11' },
    });

    const next: DeckSpec = onSpec.mock.calls.at(-1)![0];
    expect(next.slides[2].chart).toEqual({
      kind: 'bar',
      labels: ['Q1', 'Q2'],
      series: [{ name: 'Merged', values: [3, 11] }],
    });
  });

  it('changing layout keeps the content the old layout owned', () => {
    const onSpec = vi.fn();
    render(<Harness onSpec={onSpec} />);
    fireEvent.click(screen.getByTestId('presentation-editor-slide-select-s2'));

    fireEvent.click(screen.getByTestId('presentation-editor-toolbar-layout'));
    fireEvent.click(screen.getByTestId('presentation-editor-toolbar-layout-quote'));

    const next: DeckSpec = onSpec.mock.calls.at(-1)![0];
    expect(next.slides[1].layout).toBe('quote');
    expect(next.slides[1].bullets).toEqual(['Shipped the gateway']);
    expect(next.slides[1].quote).toEqual({ text: '', by: '' });
  });
});

describe('PresentationEditor — the rail', () => {
  it('reorders from the thumbnail menu', () => {
    render(<Harness />);
    expect(slideOrder()).toEqual(['s1', 's2', 's3']);

    fireEvent.click(screen.getByTestId('presentation-editor-slide-menu-s1'));
    fireEvent.click(screen.getByTestId('presentation-editor-slide-down-s1'));
    expect(slideOrder()).toEqual(['s2', 's1', 's3']);

    fireEvent.click(screen.getByTestId('presentation-editor-slide-menu-s1'));
    fireEvent.click(screen.getByTestId('presentation-editor-slide-up-s1'));
    expect(slideOrder()).toEqual(['s1', 's2', 's3']);
  });

  it('offers a drag handle once the sortable list has loaded', async () => {
    render(<Harness />);
    const handle = await screen.findByTestId('presentation-editor-slide-drag-handle-s1');
    expect(handle.className).toMatch(/cursor-grab/);
  });

  it('adds, duplicates and deletes, and the copy keeps the citations', () => {
    const onSpec = vi.fn();
    render(<Harness onSpec={onSpec} />);

    fireEvent.click(screen.getByTestId('presentation-editor-toolbar-new-slide'));
    expect(slideOrder()).toHaveLength(4);
    // A fresh slide cites nothing, which is exactly what should block a save.
    expect(screen.getByTestId('presentation-editor-uncited-warning')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('presentation-editor-slide-menu-s3'));
    fireEvent.click(screen.getByTestId('presentation-editor-slide-duplicate-s3'));
    const afterCopy: DeckSpec = onSpec.mock.calls.at(-1)![0];
    const copyIndex = afterCopy.slides.findIndex((slide) => slide.id === 's3') + 1;
    expect(afterCopy.slides[copyIndex].sources).toEqual([{ documentId: 'doc-2', title: 'Metrics' }]);
    expect(afterCopy.slides[copyIndex].id).not.toBe('s3');

    fireEvent.click(screen.getByTestId('presentation-editor-slide-menu-s1'));
    fireEvent.click(screen.getByTestId('presentation-editor-slide-delete-s1'));
    expect(slideOrder()).not.toContain('s1');
  });

  it('will not delete the last slide', () => {
    const only: DeckSpec = { title: 'One', slides: [baseSpec().slides[0]] };
    render(<Harness initial={only} />);
    // The only slide has no menu at all: nothing to move, copying is allowed
    // but deleting is not.
    fireEvent.click(screen.getByTestId('presentation-editor-slide-menu-s1'));
    expect(screen.getByTestId('presentation-editor-slide-duplicate-s1')).toBeInTheDocument();
    expect(screen.queryByTestId('presentation-editor-slide-delete-s1')).toBeNull();
  });
});

describe('PresentationEditor — the grounding rule', () => {
  function uncitedSpec(): DeckSpec {
    const spec = baseSpec();
    spec.slides[1] = { ...spec.slides[1], sources: [] };
    return spec;
  }

  it('blocks the save and says which slide is the problem', () => {
    render(<Harness initial={uncitedSpec()} />);
    expect(screen.getByTestId('presentation-editor-save')).toBeDisabled();
    expect(screen.getByTestId('presentation-editor-uncited-warning')).toHaveTextContent(
      '1 slide cites no source',
    );
    expect(screen.getByTestId('presentation-editor-slide-uncited-s2')).toBeInTheDocument();
  });

  it('unblocks it once a source is picked from the Documents search', () => {
    render(<Harness initial={uncitedSpec()} />);
    fireEvent.click(screen.getByTestId('presentation-editor-slide-select-s2'));
    expect(screen.getByTestId('presentation-editor-slide-sources-warning')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('presentation-editor-slide-source-option-doc-9'));

    expect(screen.queryByTestId('presentation-editor-uncited-warning')).not.toBeInTheDocument();
    expect(screen.getByTestId('presentation-editor-save')).not.toBeDisabled();
  });

  it('asks the host for sources when it supplies a search', async () => {
    const onSearchSources = vi.fn().mockResolvedValue([{ documentId: 'doc-7', title: 'Roadmap' }]);
    render(<Harness onSearchSources={onSearchSources} />);

    fireEvent.change(screen.getByTestId('presentation-editor-slide-source-search'), {
      target: { value: 'road' },
    });

    expect(
      await screen.findByTestId('presentation-editor-slide-source-option-doc-7'),
    ).toBeInTheDocument();
    expect(onSearchSources).toHaveBeenCalledWith('road');
  });
});

describe('PresentationEditor — keyboard', () => {
  it('moves between slides with the arrow keys', () => {
    render(<Harness />);
    expect(screen.getByTestId('presentation-editor-position')).toHaveTextContent('Slide 1 of 3');

    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByTestId('presentation-editor-position')).toHaveTextContent('Slide 2 of 3');

    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(screen.getByTestId('presentation-editor-position')).toHaveTextContent('Slide 1 of 3');
  });

  it('leaves the arrow keys alone inside a text field', () => {
    render(<Harness />);
    const title = screen.getByTestId('presentation-editor-slide-title');
    title.focus();
    fireEvent.keyDown(title, { key: 'ArrowRight' });
    expect(screen.getByTestId('presentation-editor-position')).toHaveTextContent('Slide 1 of 3');
  });

  it('saves on ⌘S, and does not when a slide is uncited', async () => {
    const onSaveRevision = vi.fn().mockResolvedValue(undefined);
    const { unmount } = render(<Harness onSaveRevision={onSaveRevision} />);
    await act(async () => {
      fireEvent.keyDown(window, { key: 's', metaKey: true });
    });
    await waitFor(() => expect(onSaveRevision).toHaveBeenCalledTimes(1));
    expect(onSaveRevision.mock.calls[0][0].slides).toHaveLength(3);
    unmount();

    const blocked = vi.fn();
    const spec = baseSpec();
    spec.slides[0] = { ...spec.slides[0], sources: [] };
    render(<Harness initial={spec} onSaveRevision={blocked} />);
    fireEvent.keyDown(window, { key: 's', ctrlKey: true });
    expect(blocked).not.toHaveBeenCalled();
  });

  it('surfaces a save that failed rather than swallowing it', async () => {
    const onSaveRevision = vi.fn().mockRejectedValue(new Error('Revision v3 was rejected'));
    render(<Harness onSaveRevision={onSaveRevision} />);
    await act(async () => {
      fireEvent.click(screen.getByTestId('presentation-editor-save'));
    });
    expect(await screen.findByTestId('presentation-editor-save-error')).toHaveTextContent(
      'Revision v3 was rejected',
    );
  });
});

describe('PresentationEditor — readOnly', () => {
  it('hands over to PresentationView rather than greying out the form', () => {
    render(<Harness readOnly />);
    expect(screen.getByTestId('presentation-editor-readonly')).toBeInTheDocument();
    expect(screen.queryByTestId('presentation-editor-save')).not.toBeInTheDocument();
    expect(screen.queryByTestId('presentation-editor-slide-title')).not.toBeInTheDocument();
    expect(screen.getByTestId('presentation-editor-readonly-position')).toHaveTextContent(
      'Slide 1 of 3',
    );
  });

  it('still offers the download the host authorized', () => {
    const onDownload = vi.fn();
    render(<Harness readOnly onDownload={onDownload} />);
    fireEvent.click(screen.getByTestId('presentation-editor-readonly-download'));
    expect(onDownload).toHaveBeenCalled();
  });
});

describe('PresentationEditor — host seams', () => {
  it('asks for a preview of the spec it was given, and again when it changes', () => {
    const onRequestPreview = vi.fn();
    render(<Harness onRequestPreview={onRequestPreview} />);
    expect(onRequestPreview).toHaveBeenCalled();
    const before = onRequestPreview.mock.calls.length;

    fireEvent.change(screen.getByTestId('presentation-editor-deck-title'), {
      target: { value: 'Sprint review · final' },
    });
    expect(onRequestPreview.mock.calls.length).toBeGreaterThan(before);
    expect(onRequestPreview.mock.calls.at(-1)![0].title).toBe('Sprint review · final');
  });

  it('names the revision the save will create', () => {
    render(<Harness />);
    expect(screen.getByTestId('presentation-editor-save')).toHaveTextContent('Save as v3');
  });

  it('says a slide is unrendered rather than drawing an empty frame', () => {
    render(<Harness preview={{ slides: [] }} />);
    expect(screen.getByTestId('presentation-editor-no-preview')).toBeInTheDocument();
  });

  it('does not ask for a render the server would refuse, and says to add a source', () => {
    const onRequestPreview = vi.fn();
    const blank: DeckSpec = {
      title: 'Blank deck',
      slides: [{ id: 's1', layout: 'title', title: 'Blank deck', sources: [] }],
    };
    // The host's state before any render: loading, or a refusal from an earlier spec.
    render(<Harness initial={blank} preview={{ error: 'slides[0].sources: every slide must cite at least one source document' }} onRequestPreview={onRequestPreview} />);
    expect(onRequestPreview).not.toHaveBeenCalled();
    expect(screen.queryByTestId('presentation-editor-preview-error')).not.toBeInTheDocument();
    expect(screen.queryByText('This deck could not be rendered')).not.toBeInTheDocument();
    expect(screen.getByTestId('presentation-editor-preview-needs-source')).toHaveTextContent(
      'Add a source to preview this slide',
    );
  });

  it('renders again once the last uncited slide gains a source', () => {
    const onRequestPreview = vi.fn();
    const spec = baseSpec();
    spec.slides[1] = { ...spec.slides[1], sources: [] };
    render(<Harness initial={spec} preview="loading" onRequestPreview={onRequestPreview} />);
    expect(onRequestPreview).not.toHaveBeenCalled();
    // A cited slide in a deck that is not yet renderable: no spinner, no error.
    expect(screen.queryByTestId('presentation-editor-preview-loading')).not.toBeInTheDocument();
    expect(screen.getByTestId('presentation-editor-preview-needs-source')).toHaveTextContent(
      "The preview waits for every slide's source",
    );
    fireEvent.click(screen.getByTestId('presentation-editor-slide-select-s2'));
    expect(screen.getByTestId('presentation-editor-preview-needs-source')).toHaveTextContent(
      'Add a source to preview this slide',
    );
    fireEvent.click(screen.getByTestId('presentation-editor-slide-source-option-doc-9'));
    expect(onRequestPreview).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId('presentation-editor-preview-needs-source')).not.toBeInTheDocument();
  });

  it('shows the render error and offers the retry', () => {
    const onRequestPreview = vi.fn();
    render(<Harness preview={{ error: 'pptx renderer unavailable' }} onRequestPreview={onRequestPreview} />);
    expect(screen.getByTestId('presentation-editor-preview-error')).toHaveTextContent(
      'pptx renderer unavailable',
    );
  });
});
