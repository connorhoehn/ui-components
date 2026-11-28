import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DeckIconPicker, type DeckCatalogueItem } from './IconPicker';
import { GraphicPicker } from './GraphicPicker';
import { DeckStylePicker } from './DeckStylePicker';
import { DeckTextField } from './DeckTextField';
import { SlideRegionsOverlay, type SlideRegion } from './SlideRegionsOverlay';
import { SlideStage } from './SlideStage';
import { SlideForm } from './SlideForm';
import { LayoutGallery } from './LayoutGallery';
import { IMAGE_LAYOUTS, makeSlide, type DeckDecoration, type DeckSlide, type DeckStyle, type DeckText } from './deckSpec';

/**
 * The rich-deck pieces (2.550.0): emphasis runs, the icon, graphic and style
 * pickers, the new layout forms and editing in place. The catalogues here are
 * a few sample rows; a host passes the engine's `ICON_CATALOGUE`,
 * `ICON_PATHS` and `GRAPHICS_CATALOGUE`.
 */
const meta = {
  title: 'DocEditor/RichDeck',
  component: DeckIconPicker,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof DeckIconPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const ICONS: DeckCatalogueItem[] = [
  { name: 'rocket', label: 'Rocket', category: 'growth', keywords: ['launch'] },
  { name: 'target', label: 'Target', category: 'growth', keywords: ['goal'] },
  { name: 'users', label: 'Users', category: 'people', keywords: ['team'] },
  { name: 'clock', label: 'Clock', category: 'time', keywords: ['time'] },
];
const ICON_PATHS = {
  rocket: ['M5 19l4-4', 'M14 4c3 0 6 3 6 6l-8 8-6-6 8-8Z'],
  target: ['M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18Z', 'M12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8Z'],
  users: ['M9 7a3 3 0 1 0 0 6a3 3 0 1 0 0-6Z', 'M3 20c0-3 3-5 6-5s6 2 6 5'],
  clock: ['M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18Z', 'M12 7v5l3 2'],
};
const GRAPHICS: DeckCatalogueItem[] = [
  { name: 'blob', label: 'Blob', category: 'shape', keywords: [] },
  { name: 'waves', label: 'Waves', category: 'shape', keywords: [] },
  { name: 'dots', label: 'Dots', category: 'pattern', keywords: [] },
  { name: 'badge-seal', label: 'Seal', category: 'badge', keywords: [] },
];

export const IconPicker: Story = {
  args: { items: ICONS, icons: ICON_PATHS, onSelect: () => {} },
  render: (args) => {
    const [value, setValue] = useState<string | undefined>('target');
    return <DeckIconPicker {...args} value={value} onSelect={setValue} />;
  },
};

export const Graphics: Story = {
  args: IconPicker.args!,
  render: () => {
    const [value, setValue] = useState<DeckDecoration | 'none' | undefined>(undefined);
    return <GraphicPicker items={GRAPHICS} value={value} onChange={setValue} />;
  },
};

export const Styles: Story = {
  args: IconPicker.args!,
  render: () => {
    const [value, setValue] = useState<DeckStyle>('bold');
    return <DeckStylePicker value={value} onChange={setValue} />;
  },
};

export const Emphasis: Story = {
  args: IconPicker.args!,
  render: () => {
    const [value, setValue] = useState<DeckText>('Grow faster with less');
    return <DeckTextField aria-label="Slide title" value={value} onChange={setValue} />;
  },
};

export const GroupedGallery: Story = {
  args: IconPicker.args!,
  render: () => <LayoutGallery onSelect={() => {}} hiddenLayouts={IMAGE_LAYOUTS} />,
};

export const CardsForm: Story = {
  args: IconPicker.args!,
  render: () => {
    const [slide, setSlide] = useState<DeckSlide>({ ...makeSlide('s1', 'cards'), sources: [] });
    return <SlideForm slide={slide} onChange={setSlide} sources={[]} icons={{ items: ICONS, icons: ICON_PATHS }} graphics={{ items: GRAPHICS }} testIdPrefix="story" />;
  },
};

const REGIONS: SlideRegion[] = [
  { path: 'title', kind: 'runs', box: { x: 60, y: 60, w: 640, h: 60 }, value: 'Three bets for Q3', fontSize: 34 },
  { path: 'items.0.text', kind: 'text', box: { x: 60, y: 300, w: 260, h: 60 }, value: 'Ship the pilot', row: { list: 'items', index: 0 } },
  { path: 'items.0.icon', kind: 'icon', box: { x: 60, y: 240, w: 40, h: 40 } },
];

export const InPlace: Story = {
  args: IconPicker.args!,
  render: () => (
    <SlideStage label="Slide 1">
      <SlideRegionsOverlay regions={REGIONS} layout="cards" onEdit={() => {}} onPick={() => {}} onRowAdd={() => {}} onRowRemove={() => {}} />
    </SlideStage>
  ),
};
