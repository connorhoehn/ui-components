// The slides toolbar is one row at every width: what each size keeps on the
// bar, what it puts behind ⋯, and that those controls still do their job from
// there. Present never leaves the bar.
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SLIDES_TOOLBAR_BREAKPOINTS, SlidesToolbar, slidesToolbarSize, type SlidesToolbarProps } from '../presentation/SlidesToolbar';
import type { DeckSlide } from '../presentation/deckSpec';

const chartSlide: DeckSlide = {
  id: 's3',
  layout: 'chart',
  title: 'Throughput',
  chart: { kind: 'bar', labels: ['Q1', 'Q2'], series: [{ name: 'Merged', values: [3, 5] }] },
  sources: [{ documentId: 'doc-2', title: 'Metrics' }],
};

function bar(props: Partial<SlidesToolbarProps> = {}) {
  const handlers = {
    onAddSlide: vi.fn(),
    onLayoutChange: vi.fn(),
    onThemeChange: vi.fn(),
    onChartKindChange: vi.fn(),
    onUndo: vi.fn(),
    onRedo: vi.fn(),
    onPresent: vi.fn(),
  };
  render(<SlidesToolbar slide={chartSlide} theme="product" canUndo {...handlers} {...props} />);
  return handlers;
}

describe('slidesToolbarSize', () => {
  it('maps the bar width to a layout, and an unmeasured bar is wide', () => {
    expect(slidesToolbarSize(null)).toBe('wide');
    expect(slidesToolbarSize(SLIDES_TOOLBAR_BREAKPOINTS.wide)).toBe('wide');
    expect(slidesToolbarSize(SLIDES_TOOLBAR_BREAKPOINTS.wide - 1)).toBe('medium');
    expect(slidesToolbarSize(SLIDES_TOOLBAR_BREAKPOINTS.narrow)).toBe('medium');
    expect(slidesToolbarSize(SLIDES_TOOLBAR_BREAKPOINTS.narrow - 1)).toBe('narrow');
  });
});

describe('SlidesToolbar sizes', () => {
  it('never wraps, and an auto bar in jsdom (no ResizeObserver) is wide', () => {
    bar();
    const toolbar = screen.getByRole('toolbar', { name: 'Slide tools' });
    expect(toolbar).toHaveAttribute('data-size', 'wide');
    expect(toolbar.className).toContain('flex-nowrap');
    expect(toolbar.className).not.toContain('flex-wrap ');
  });

  it('wide keeps everything on the bar and grows no ⋯', () => {
    bar({ size: 'wide' });
    for (const id of ['layout', 'insert', 'theme', 'chart-kind', 'undo', 'redo', 'style-note', 'present']) {
      expect(screen.getByTestId(`slides-toolbar-${id}`)).toBeInTheDocument();
    }
    expect(screen.queryByTestId('slides-toolbar-more')).toBeNull();
  });

  it('medium keeps New slide, Layout, Theme, the chart switch, Undo/Redo and Present; Insert and the note wait behind ⋯ (2.549.0)', () => {
    const h = bar({ size: 'medium' });
    expect(screen.getByRole('toolbar')).toHaveAttribute('data-size', 'medium');
    for (const id of ['new-slide', 'layout', 'theme', 'chart-kind', 'undo', 'redo', 'present']) {
      expect(screen.getByTestId(`slides-toolbar-${id}`)).toBeInTheDocument();
    }
    for (const id of ['insert', 'style-note']) expect(screen.queryByTestId(`slides-toolbar-${id}`)).toBeNull();

    fireEvent.click(screen.getByTestId('slides-toolbar-more'));
    const menu = screen.getByTestId('slides-toolbar-more-menu');
    // Bar order, and the note is a heading — a sentence, never a dead row.
    expect(within(menu).getByText('New slide after this one')).toBeInTheDocument();
    expect(within(menu).queryByText('Deck theme')).toBeNull();
    expect(within(menu).getByTestId('slides-toolbar-style-note')).toHaveTextContent('Text style comes from the theme');
    expect(within(menu).queryByText('Layout of this slide')).toBeNull();

    // The same controls, doing the same thing from the menu.
    fireEvent.click(within(menu).getByTestId('slides-toolbar-insert-quote'));
    expect(h.onAddSlide).toHaveBeenCalledWith('quote');
    fireEvent.click(screen.getByTestId('slides-toolbar-theme'));
    fireEvent.click(screen.getByTestId('slides-toolbar-theme-engineering'));
    expect(h.onThemeChange).toHaveBeenCalledWith('engineering');
  });

  it('collapse order: Insert and the note first, then the chart switch, then Layout and Theme', () => {
    expect(SLIDES_TOOLBAR_BREAKPOINTS.narrow).toBe(640);
    expect(SLIDES_TOOLBAR_BREAKPOINTS.narrow).toBeLessThan(SLIDES_TOOLBAR_BREAKPOINTS.chart);
    expect(SLIDES_TOOLBAR_BREAKPOINTS.chart).toBeLessThan(SLIDES_TOOLBAR_BREAKPOINTS.wide);
    // Theme is inline at medium and narrow begins at 640: Theme stays down to 640px.
    expect(slidesToolbarSize(700)).toBe('medium');
    expect(slidesToolbarSize(640)).toBe('medium');
    expect(slidesToolbarSize(639)).toBe('narrow');
  });

  it('measured: at 800px Theme and the chart switch are inline; at 700px the switch goes behind ⋯ and Theme stays; at 630px Theme goes too', () => {
    const real = globalThis.ResizeObserver;
    let report: ((width: number) => void) | null = null;
    class Measured {
      constructor(private cb: ResizeObserverCallback) {}
      // Only the bar's own observer is driven (a menu may observe its panel).
      observe(target: Element) {
        if (target.getAttribute('role') !== 'toolbar') return;
        report = (width) => this.cb([{ contentRect: { width, height: 32 } } as ResizeObserverEntry], this as unknown as ResizeObserver);
      }
      unobserve() {}
      disconnect() {}
    }
    globalThis.ResizeObserver = Measured as unknown as typeof ResizeObserver;
    try {
      bar();
      act(() => report!(800));
      expect(screen.getByRole('toolbar')).toHaveAttribute('data-size', 'medium');
      expect(screen.getByTestId('slides-toolbar-theme')).toBeInTheDocument();
      expect(screen.getByTestId('slides-toolbar-chart-kind')).toBeInTheDocument();
      expect(screen.queryByTestId('slides-toolbar-insert')).toBeNull();
      act(() => report!(700));
      expect(screen.getByTestId('slides-toolbar-theme')).toBeInTheDocument();
      expect(screen.queryByTestId('slides-toolbar-chart-kind')).toBeNull();
      fireEvent.click(screen.getByTestId('slides-toolbar-more'));
      expect(within(screen.getByTestId('slides-toolbar-more-menu')).getByText('Chart type')).toBeInTheDocument();
      fireEvent.keyDown(document.activeElement ?? document.body, { key: 'Escape' });
      act(() => report!(630));
      expect(screen.getByRole('toolbar')).toHaveAttribute('data-size', 'narrow');
      expect(screen.queryByTestId('slides-toolbar-theme')).toBeNull();
    } finally {
      globalThis.ResizeObserver = real;
    }
  });

  it('narrow folds Layout and the chart switch into ⋯ too; New slide, Undo/Redo and Present stay', () => {
    const h = bar({ size: 'narrow' });
    expect(screen.getByRole('toolbar')).toHaveAttribute('data-size', 'narrow');
    for (const id of ['new-slide', 'undo', 'redo', 'present']) expect(screen.getByTestId(`slides-toolbar-${id}`)).toBeInTheDocument();
    for (const id of ['layout', 'insert', 'theme', 'chart-kind', 'style-note']) expect(screen.queryByTestId(`slides-toolbar-${id}`)).toBeNull();

    fireEvent.click(screen.getByTestId('slides-toolbar-more'));
    const menu = screen.getByTestId('slides-toolbar-more-menu');
    expect(within(menu).getByText('Layout of this slide')).toBeInTheDocument();
    expect(within(menu).getByTestId('slides-toolbar-layout-title')).toBeInTheDocument();
    expect(within(menu).getByTestId('slides-toolbar-chart-kind-bar')).toHaveAttribute('aria-checked', 'true');
    fireEvent.click(within(menu).getByTestId('slides-toolbar-chart-kind-line'));
    expect(h.onChartKindChange).toHaveBeenCalledWith('line');
    fireEvent.click(screen.getByTestId('slides-toolbar-more'));
    fireEvent.click(screen.getByTestId('slides-toolbar-layout-quote'));
    expect(h.onLayoutChange).toHaveBeenCalledWith('quote');
  });

  it('a control the state rules out is in neither place: no chart switch off a chart slide, no Insert at the cap', () => {
    bar({ size: 'narrow', slide: { ...chartSlide, layout: 'title' }, canAddSlide: false });
    fireEvent.click(screen.getByTestId('slides-toolbar-more'));
    const menu = screen.getByTestId('slides-toolbar-more-menu');
    expect(within(menu).queryByText('Chart type')).toBeNull();
    expect(within(menu).queryByText('New slide after this one')).toBeNull();
    expect(within(menu).getByText('Deck theme')).toBeInTheDocument();
  });

  it('disabled shows New slide, Undo/Redo and Present only — nothing to fold, so no ⋯', () => {
    bar({ size: 'narrow', disabled: true });
    expect(screen.queryByTestId('slides-toolbar-more')).toBeNull();
    expect(screen.getByTestId('slides-toolbar-present')).toBeInTheDocument();
    expect(screen.getByTestId('slides-toolbar-new-slide')).toBeDisabled();
  });
});
