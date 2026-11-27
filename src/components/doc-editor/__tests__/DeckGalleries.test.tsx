// LayoutGallery, TemplateGallery, the toolbar's host themes, and the editor's
// "All layouts…" gallery (2.547.0; in place of the stage since 2.548.0).

import { useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LayoutGallery } from '../presentation/LayoutGallery';
import { TemplateGallery, type DeckTemplate } from '../presentation/TemplateGallery';
import { SlidesToolbar } from '../presentation/SlidesToolbar';
import { PresentationEditor } from '../presentation/PresentationEditor';
import { SLIDE_LAYOUTS, type DeckSpec } from '../presentation/deckSpec';

const SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 9"><rect width="16" height="9"/><script>alert(1)</script></svg>';

describe('LayoutGallery', () => {
  it('offers every layout as a pressable tile with its name and use, and calls onSelect', () => {
    const onSelect = vi.fn();
    render(<LayoutGallery onSelect={onSelect} selected="chart" previews={{ table: SVG }} />);
    const list = screen.getByRole('list', { name: 'Slide layouts' });
    const tiles = within(list).getAllByRole('button');
    expect(tiles).toHaveLength(SLIDE_LAYOUTS.length);
    const timeline = screen.getByRole('button', { name: /Timeline.*dated steps/ });
    fireEvent.click(timeline);
    expect(onSelect).toHaveBeenCalledWith('timeline');
    expect(screen.getByTestId('layout-gallery-chart')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('layout-gallery-timeline')).toHaveAttribute('aria-pressed', 'false');
  });

  it('shows a supplied preview as an inert data: image and a schematic otherwise, never markup', () => {
    const { container } = render(<LayoutGallery onSelect={() => {}} previews={{ table: SVG }} />);
    const table = screen.getByTestId('layout-gallery-table');
    const img = table.querySelector('img')!;
    expect(img.getAttribute('src')).toMatch(/^data:image\/svg\+xml;charset=utf-8,/);
    expect(container.querySelector('script')).toBeNull();
    expect(container.querySelector('svg rect')).toBeNull();
    expect(screen.getByTestId('layout-gallery-agenda').querySelector('[data-layout-schematic="agenda"]')).not.toBeNull();
  });

  it('limits the offer to `layouts`', () => {
    render(<LayoutGallery onSelect={() => {}} layouts={['key-figures', 'closing']} />);
    expect(screen.getAllByRole('button').map((b) => b.dataset.layout)).toEqual(['key-figures', 'closing']);
  });

  it('static render: one column, two from 28rem and three from 42rem of its own width', () => {
    const html = renderToStaticMarkup(<LayoutGallery onSelect={() => {}} />);
    expect(html).toContain('@container');
    expect(html).toContain('grid-cols-1 gap-3 p-0 @md:grid-cols-2 @2xl:grid-cols-3');
    expect(html).not.toContain('style=');
  });
});

const templates: DeckTemplate[] = [
  { id: 'qbr', title: 'Quarterly review', description: 'Numbers, wins and asks for leadership.', slideCount: 9, audience: 'Leadership', previews: [SVG, SVG, SVG, SVG, SVG] },
  { id: 'kickoff', title: 'Project kickoff', description: 'Goals, plan and team.', slideCount: 1, previews: [] },
];

describe('TemplateGallery', () => {
  it('shows each template with its first slide large, up to three small, title, description and count', () => {
    const onSelect = vi.fn();
    render(<TemplateGallery templates={templates} onSelect={onSelect} selectedId="qbr" />);
    const qbr = screen.getByTestId('template-gallery-qbr');
    expect(qbr.querySelectorAll('img')).toHaveLength(4);
    expect(within(screen.getByTestId('template-gallery-qbr-strip')).getAllByRole('presentation', { hidden: true }).length).toBeLessThanOrEqual(3);
    expect(screen.getByTestId('template-gallery-qbr-facts')).toHaveTextContent('9 slides · Leadership');
    expect(screen.getByTestId('template-gallery-kickoff-facts')).toHaveTextContent('1 slide');
    expect(screen.queryByTestId('template-gallery-kickoff-strip')).toBeNull();
    expect(qbr).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(screen.getByRole('button', { name: /Project kickoff/ }));
    expect(onSelect).toHaveBeenCalledWith('kickoff');
  });

  it('has a loading and an empty state', () => {
    const { rerender } = render(<TemplateGallery templates={[]} onSelect={() => {}} loading />);
    expect(screen.getByTestId('template-gallery')).toHaveAttribute('aria-busy', 'true');
    expect(screen.getAllByTestId('template-gallery-placeholder')).toHaveLength(4);
    rerender(<TemplateGallery templates={[]} onSelect={() => {}} emptyDescription="Save a deck as a template." />);
    expect(screen.getByTestId('template-gallery-empty')).toHaveTextContent('No templates yet');
  });

  it('static render: 1 → 2 → 3 → 4 columns by its own width, no inline styles on the tiles', () => {
    const html = renderToStaticMarkup(<TemplateGallery templates={templates} onSelect={() => {}} />);
    expect(html).toContain('grid-cols-1 gap-4 p-0 @md:grid-cols-2 @2xl:grid-cols-3 @5xl:grid-cols-4');
    expect(html).toContain('min-w-0');
    expect(html).not.toContain('style=');
  });
});

describe('SlidesToolbar — host themes', () => {
  const base = { onAddSlide: () => {}, onLayoutChange: () => {}, size: 'wide' as const };

  it('lists host themes after the built-ins, shows a { ref } theme selected, and writes { ref } on choice', () => {
    const onThemeChange = vi.fn();
    const onThemeRefChange = vi.fn();
    render(
      <SlidesToolbar
        {...base}
        theme={{ ref: 'acme' }}
        themes={[{ id: 'acme', name: 'Acme brand' }, { id: 'night', name: 'Night' }]}
        onThemeChange={onThemeChange}
        onThemeRefChange={onThemeRefChange}
      />,
    );
    expect(screen.getByTestId('slides-toolbar-theme')).toHaveTextContent('Acme brand');
    fireEvent.click(screen.getByTestId('slides-toolbar-theme'));
    expect(screen.getByTestId('slides-toolbar-theme-ref-acme')).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByTestId('slides-toolbar-theme-product')).toHaveAttribute('aria-checked', 'false');
    fireEvent.click(screen.getByTestId('slides-toolbar-theme-ref-night'));
    expect(onThemeRefChange).toHaveBeenCalledWith({ ref: 'night' });
    expect(onThemeChange).not.toHaveBeenCalled();
  });

  it('with no host themes behaves as before', () => {
    render(<SlidesToolbar {...base} theme="plain" onThemeChange={() => {}} />);
    fireEvent.click(screen.getByTestId('slides-toolbar-theme'));
    expect(screen.queryByTestId(/slides-toolbar-theme-ref-/)).toBeNull();
    expect(screen.getByTestId('slides-toolbar-theme-plain')).toHaveAttribute('aria-checked', 'true');
  });

  it('lists the new layouts in the layout menu with plain names', () => {
    render(<SlidesToolbar {...base} theme="plain" onThemeChange={() => {}} slide={{ id: 's1', layout: 'bullets', title: 'x', sources: [] }} />);
    fireEvent.click(screen.getByTestId('slides-toolbar-layout'));
    expect(screen.getByTestId('slides-toolbar-layout-key-figures')).toHaveTextContent('Key figures');
    expect(screen.getByTestId('slides-toolbar-layout-closing')).toHaveTextContent('Closing');
  });
});

describe('PresentationEditor — All layouts… and host themes', () => {
  const sources = [{ documentId: 'd', title: 'Doc' }];
  function Host({ initial, onSave }: { initial: DeckSpec; onSave?: (spec: DeckSpec) => void }) {
    const [spec, setSpec] = useState(initial);
    return (
      <PresentationEditor
        spec={spec}
        onChange={setSpec}
        preview={{ slides: [] }}
        onRequestPreview={() => {}}
        onSaveRevision={async (next) => { onSave?.(next); }}
        revisions={[{ id: 'r1', label: 'v1' }] as never}
        activeRevisionId="r1"
        onSelectRevision={() => {}}
        sources={[]}
        themes={[{ id: 'acme', name: 'Acme brand' }]}
        layoutPreviews={{ timeline: SVG }}
      />
    );
  }

  it('opens the gallery in place of the stage, adds the chosen layout after the current slide, and returns', () => {
    render(<Host initial={{ title: 'D', slides: [{ id: 's1', layout: 'title', title: 'D', sources }] }} />);
    fireEvent.click(screen.getByTestId('presentation-editor-toolbar-insert'));
    fireEvent.click(screen.getByTestId('presentation-editor-toolbar-insert-all'));
    // No dialog, no overlay: the stage column is swapped for the panel, the filmstrip stays.
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.querySelector('[aria-modal]')).toBeNull();
    const panel = screen.getByRole('region', { name: 'Choose a layout' });
    expect(screen.queryByTestId('presentation-editor-main')).toBeNull();
    expect(screen.getByTestId('presentation-editor-body')).toContainElement(panel);
    expect(screen.getByTestId('presentation-editor-body')).toContainElement(screen.getByTestId('presentation-editor-slide-strip'));
    expect(within(panel).getByText('Choose a layout')).toBeInTheDocument();
    expect(screen.getByTestId('presentation-editor-layout-back')).toHaveFocus();
    expect(within(panel).getByTestId('presentation-editor-layout-gallery-timeline').querySelector('img')).not.toBeNull();
    fireEvent.click(within(panel).getByTestId('presentation-editor-layout-gallery-timeline'));
    expect(screen.queryByTestId('presentation-editor-layout-panel')).toBeNull();
    expect(screen.getByTestId('presentation-editor-main')).toBeInTheDocument();
    // Inserted after s1 and selected.
    expect(screen.getByTestId('presentation-editor-toolbar-layout')).toHaveTextContent('Timeline');
    expect(screen.getByTestId('presentation-editor-position')).toHaveTextContent('Slide 2 of 2');
    expect(screen.getByTestId('presentation-editor-toolbar-insert')).toHaveFocus();
  });

  it('Back and Escape return to the slide being edited without adding one, focus on the opener', () => {
    render(<Host initial={{ title: 'D', slides: [
      { id: 's1', layout: 'title', title: 'D', sources },
      { id: 's2', layout: 'bullets', title: 'Second', sources },
    ] }} />);
    fireEvent.click(screen.getByTestId('presentation-editor-slide-select-s2'));
    for (const leave of ['back', 'escape'] as const) {
      fireEvent.click(screen.getByTestId('presentation-editor-toolbar-insert'));
      fireEvent.click(screen.getByTestId('presentation-editor-toolbar-insert-all'));
      const back = screen.getByRole('button', { name: 'Back to slide 2: Second' });
      // Arrow keys do not step slides behind the gallery.
      fireEvent.keyDown(window, { key: 'ArrowLeft' });
      if (leave === 'back') fireEvent.click(back);
      else fireEvent.keyDown(back, { key: 'Escape' });
      expect(screen.queryByTestId('presentation-editor-layout-panel')).toBeNull();
      expect(screen.getByTestId('presentation-editor-position')).toHaveTextContent('Slide 2 of 2');
      expect(screen.getByTestId('presentation-editor-toolbar-insert')).toHaveFocus();
    }
  });

  it('renders the gallery state to static markup without a dialog', () => {
    const html = renderToStaticMarkup(<Host initial={{ title: 'D', slides: [{ id: 's1', layout: 'title', title: 'D', sources }] }} />);
    expect(html).not.toMatch(/role="dialog"|aria-modal/);
  });

  it('keeps New slide as the quick path', () => {
    render(<Host initial={{ title: 'D', slides: [{ id: 's1', layout: 'title', title: 'D', sources }] }} />);
    fireEvent.click(screen.getByTestId('presentation-editor-toolbar-new-slide'));
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.getByTestId('presentation-editor-toolbar-layout')).toHaveTextContent('Bullets');
  });

  it('saves a stale payload stripped and a host theme as { ref }', async () => {
    const onSave = vi.fn();
    render(
      <Host
        onSave={onSave}
        initial={{ title: 'D', slides: [{ id: 's1', layout: 'bullets', title: 'D', bullets: ['x'], chart: { kind: 'bar', labels: ['a'], series: [{ name: 's', values: [1] }] }, sources }] }}
      />,
    );
    fireEvent.click(screen.getByTestId('presentation-editor-toolbar-theme'));
    fireEvent.click(screen.getByTestId('presentation-editor-toolbar-theme-ref-acme'));
    fireEvent.keyDown(window, { key: 's', metaKey: true });
    await vi.waitFor(() => expect(onSave).toHaveBeenCalled());
    const saved = onSave.mock.calls[0]![0] as DeckSpec;
    expect(saved.theme).toEqual({ ref: 'acme' });
    expect(saved.slides[0]).not.toHaveProperty('chart');
    expect(saved.slides[0]!.bullets).toEqual(['x']);
  });
});
