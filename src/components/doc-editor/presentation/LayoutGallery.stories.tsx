import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { LayoutGallery } from './LayoutGallery';
import { SLIDE_LAYOUTS, SLIDE_LAYOUT_LABELS, type SlideLayout } from './deckSpec';

/**
 * The deck's layouts as tiles, for choosing one (the editor opens it from
 * Insert → All layouts…). The host supplies an SVG preview per layout; a
 * layout without one shows a schematic drawn from blocks.
 */
const meta = {
  title: 'DocEditor/LayoutGallery',
  component: LayoutGallery,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof LayoutGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A stand-in for the host's server-rendered preview: plain shapes, named colours. */
function sampleSvg(title: string): string {
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180"><rect width="320" height="180" fill="white"/>'
    + '<rect width="320" height="6" fill="steelblue"/>'
    + `<text x="20" y="44" font-family="sans-serif" font-size="18" fill="black">${title}</text>`
    + '<rect x="20" y="64" width="200" height="8" rx="2" fill="gainsboro"/><rect x="20" y="80" width="160" height="8" rx="2" fill="gainsboro"/></svg>';
}

const PREVIEWS = Object.fromEntries(SLIDE_LAYOUTS.map((layout) => [layout, sampleSvg(SLIDE_LAYOUT_LABELS[layout])])) as Record<SlideLayout, string>;

function Picker(props: { previews?: Partial<Record<SlideLayout, string>> }) {
  const [selected, setSelected] = useState<SlideLayout>('bullets');
  return <LayoutGallery {...props} selected={selected} onSelect={setSelected} />;
}

/** Every layout with the host's previews. */
export const WithPreviews: Story = {
  args: { onSelect: () => {} },
  render: () => <Picker previews={PREVIEWS} />,
};

/** No previews yet: every tile draws its schematic. */
export const Schematics: Story = {
  args: { onSelect: () => {} },
  render: () => <Picker />,
};

/** Some previews: the rest fall back to the schematic, never a blank frame. */
export const Mixed: Story = {
  args: { onSelect: () => {} },
  render: () => <Picker previews={{ title: PREVIEWS.title, chart: PREVIEWS.chart, 'key-figures': PREVIEWS['key-figures'] }} />,
};
