// The slides toolbar is one row at every width: what each size keeps on the
// bar, what it puts behind ⋯, and that those controls still do their job from
// there. Present never leaves the bar.
import { fireEvent, render, screen, within } from '@testing-library/react';
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

  it('medium keeps New slide, Layout, the chart switch, Undo/Redo and Present; Insert, Theme and the note wait behind ⋯', () => {
    const h = bar({ size: 'medium' });
    expect(screen.getByRole('toolbar')).toHaveAttribute('data-size', 'medium');
    for (const id of ['new-slide', 'layout', 'chart-kind', 'undo', 'redo', 'present']) {
      expect(screen.getByTestId(`slides-toolbar-${id}`)).toBeInTheDocument();
    }
    for (const id of ['insert', 'theme', 'style-note']) expect(screen.queryByTestId(`slides-toolbar-${id}`)).toBeNull();

    fireEvent.click(screen.getByTestId('slides-toolbar-more'));
    const menu = screen.getByTestId('slides-toolbar-more-menu');
    // Bar order, and the note is a heading — a sentence, never a dead row.
    expect(within(menu).getByText('New slide after this one')).toBeInTheDocument();
    expect(within(menu).getByText('Deck theme')).toBeInTheDocument();
    expect(within(menu).getByTestId('slides-toolbar-style-note')).toHaveTextContent('Text style comes from the theme');
    expect(within(menu).queryByText('Layout of this slide')).toBeNull();

    // The same controls, doing the same thing from the menu.
    fireEvent.click(within(menu).getByTestId('slides-toolbar-theme-engineering'));
    expect(h.onThemeChange).toHaveBeenCalledWith('engineering');
    fireEvent.click(screen.getByTestId('slides-toolbar-more'));
    fireEvent.click(screen.getByTestId('slides-toolbar-insert-quote'));
    expect(h.onAddSlide).toHaveBeenCalledWith('quote');
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
