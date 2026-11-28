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

/** Stand-in artwork: a host passes the engine's `graphicSvg(name, theme.colors)`. */
const GRAPHIC_ART: Record<string, string> = {
  blob: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M62 6C82 10 96 30 92 52C88 76 70 94 46 92C22 90 6 72 8 48C10 24 38 2 62 6Z" fill="#E2DBFF"/></svg>',
  waves: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 60"><path d="M0 30Q20 10 40 30T80 30T120 30T160 30" fill="none" stroke="#6D4AFF" stroke-width="4"/></svg>',
  dots: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 54"><path d="M9 9a2 2 0 1 0 4 0a2 2 0 1 0 -4 0ZM45 27a2 2 0 1 0 4 0a2 2 0 1 0 -4 0ZM81 45a2 2 0 1 0 4 0a2 2 0 1 0 -4 0Z" fill="#6D4AFF"/></svg>',
  'badge-seal': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50 4L61 20L80 14L80 34L96 45L84 60L90 79L70 80L60 96L45 86L27 93L23 73L6 63L17 47L10 28L30 25Z" fill="#6D4AFF"/></svg>',
};
const graphicSvg = (name: string) => GRAPHIC_ART[name] ?? '';

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

/** Since 2.551.0: tiles draw the host's SVG strings; the placement row fits a 20rem side pane. */
export const GraphicsWithArtwork: Story = {
  args: IconPicker.args!,
  render: () => {
    const [value, setValue] = useState<DeckDecoration | 'none' | undefined>({ graphic: 'blob', placement: 'title' });
    return <div className="w-80"><GraphicPicker items={GRAPHICS} graphicSvg={graphicSvg} value={value} onChange={setValue} /></div>;
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

/** As the engine (0.156.0) sends them: each text region carries the painted style. */
const STYLED_REGIONS: SlideRegion[] = [
  { path: 'eyebrow', kind: 'text', box: { x: 56, y: 40, w: 300, h: 22 }, value: 'Q3 plan', text: { fontFamily: 'Carlito', officeFamily: 'Calibri', fontSize: 12, fontWeight: 700, color: '#6D4AFF', align: 'left', lineHeight: 16, letterSpacing: 2, uppercase: true, background: '#FFFFFF' } },
  { path: 'title', kind: 'runs', box: { x: 56, y: 66, w: 760, h: 58 }, value: 'Three bets for Q3', text: { fontFamily: 'Gelasio', officeFamily: 'Georgia', fontSize: 40, fontWeight: 700, color: '#1B1B2F', align: 'left', lineHeight: 48, background: '#FFFFFF' } },
  { path: 'items[0].text', kind: 'text', box: { x: 56, y: 300, w: 260, h: 60 }, value: 'Ship the pilot', text: { fontFamily: 'Carlito', officeFamily: 'Calibri', fontSize: 18, fontWeight: 400, color: '#3A3A4A', align: 'left', lineHeight: 24, background: '#F3F0FF' } },
];

/** Since 2.551.0: click the title; the editor is set in the slide's own type, and the emphasis bar sits above it. */
export const InPlaceStyled: Story = {
  args: IconPicker.args!,
  render: () => (
    <SlideStage label="Slide 1">
      <SlideRegionsOverlay regions={STYLED_REGIONS} layout="cards" onEdit={() => {}} onPick={() => {}} />
    </SlideStage>
  ),
};

export const InPlace: Story = {
  args: IconPicker.args!,
  render: () => (
    <SlideStage label="Slide 1">
      <SlideRegionsOverlay regions={REGIONS} layout="cards" onEdit={() => {}} onPick={() => {}} onRowAdd={() => {}} onRowRemove={() => {}} />
    </SlideStage>
  ),
};
