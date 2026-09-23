import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SlidesToolbar, type SlidesToolbarSize } from './SlidesToolbar';
import type { DeckSlide, DeckTheme } from './deckSpec';

/**
 * The deck editor's toolbar, at each of its three one-row layouts.
 *
 * It never wraps. `Auto` (the default in the app) measures the bar's own box;
 * the fixed sizes are here to see each layout without dragging. Present stays
 * on the bar at every width.
 */
const meta = {
  title: 'DocEditor/SlidesToolbar',
  component: SlidesToolbar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlidesToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const CHART_SLIDE: DeckSlide = {
  id: 's3',
  layout: 'chart',
  title: 'Throughput',
  chart: { kind: 'bar', labels: ['Q1', 'Q2', 'Q3'], series: [{ name: 'Merged', values: [3, 5, 8] }] },
  sources: [{ documentId: 'doc-2', title: 'Metrics' }],
};

function Bar({ size, width }: { size: SlidesToolbarSize | 'auto'; width?: string }) {
  const [slide, setSlide] = useState<DeckSlide>(CHART_SLIDE);
  const [theme, setTheme] = useState<DeckTheme>('product');
  return (
    <div className="flex h-screen flex-col bg-workspace">
      <div className="border-b border-border bg-surface-panel px-4 py-1.5" style={width ? { width } : undefined}>
        <SlidesToolbar
          slide={slide}
          theme={theme}
          size={size}
          onAddSlide={() => {}}
          onLayoutChange={(layout) => setSlide((s) => ({ ...s, layout }))}
          onThemeChange={setTheme}
          onChartKindChange={(kind) => setSlide((s) => (s.chart ? { ...s, chart: { ...s.chart, kind } } : s))}
          onUndo={() => {}}
          onRedo={() => {}}
          canUndo
          onPresent={() => {}}
        />
      </div>
      <div className="m-6 aspect-video max-w-2xl rounded bg-paper p-8 text-paper-ink shadow">
        <h1 className="text-2xl font-semibold">{slide.title}</h1>
        <p className="mt-2 text-sm text-paper-muted">Layout {slide.layout} · theme {theme} · chart {slide.chart?.kind}</p>
      </div>
    </div>
  );
}

const args = { theme: 'product' as const, onAddSlide: () => {}, onLayoutChange: () => {}, onThemeChange: () => {} };

/** Measures its own box: drag the frame's edge and watch the groups move behind ⋯. */
export const Auto: Story = { args, render: () => <Bar size="auto" /> };

/** Everything inline — the bar at a full-width editor. */
export const Wide: Story = { args, render: () => <Bar size="wide" /> };

/** Insert, Theme and the style note behind ⋯; Layout and the chart switch stay. */
export const Medium: Story = { args, render: () => <Bar size="medium" width="760px" /> };

/** Layout and the chart switch join them; New slide, Undo/Redo and Present remain. */
export const Narrow: Story = { args, render: () => <Bar size="narrow" width="520px" /> };
