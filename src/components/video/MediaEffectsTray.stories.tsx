import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import MediaEffectsTray from './MediaEffectsTray';

// Purely presentational — the engine hook (MediaPipe segmentation, canvas
// compositing) lives in the consumer. These stories fake the selection
// state so every visual variant is browsable without a camera.

/** Tiny inline SVG swatch so no story reaches for an external URL. */
function swatch(color: string): string {
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><rect width="48" height="48" fill="${encodeURIComponent(color)}"/></svg>`;
}

const FILTERS = [
  { id: 'none', label: 'None' },
  { id: 'warm', label: 'Warm' },
  { id: 'cool', label: 'Cool' },
  { id: 'mono', label: 'Mono' },
  { id: 'vivid', label: 'Vivid' },
];

const BACKGROUNDS = [
  { id: 'beach', label: 'Beach', url: swatch('goldenrod') },
  { id: 'forest', label: 'Forest', url: swatch('seagreen') },
  { id: 'office', label: 'Office', url: swatch('slategray') },
];

const FACE_SPRITES = [
  { id: 'glasses', label: '🕶️ Glasses' },
  { id: 'crown', label: '👑 Crown' },
  { id: 'mustache', label: '🥸 Mustache' },
];

const meta = {
  title: 'Video/MediaEffectsTray',
  component: MediaEffectsTray,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="rounded-2xl bg-video-stage p-6 w-[28rem] max-w-full">
        <Story />
      </div>
    ),
  ],
  args: {
    filters: FILTERS,
    activeFilterId: 'none',
    onSelectFilter: () => {},
    backgrounds: BACKGROUNDS,
    backgroundMode: 'none' as const,
    activeBackgroundUrl: null,
    onSelectBackground: () => {},
    faceSprites: FACE_SPRITES,
    activeFaceSpriteId: null,
    onSelectFaceSprite: () => {},
  },
} satisfies Meta<typeof MediaEffectsTray>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Everything off — the state a user first opens the tray in. */
export const Default: Story = {};

/** Tighter paddings for popover placement (e.g. anchored to an effects
 *  toggle in MediaControlsBar's `extras` slot). */
export const Compact: Story = {
  args: { compact: true },
};

/** Engine still loading (or no camera) — every chip dimmed and inert. */
export const Disabled: Story = {
  args: { disabled: true },
};

/** One selection active in each section: a filter, an image background
 *  (thumbnail chip highlighted), and a face sprite. */
export const WithActiveSelections: Story = {
  args: {
    activeFilterId: 'warm',
    backgroundMode: 'image',
    activeBackgroundUrl: BACKGROUNDS[1].url,
    activeFaceSpriteId: 'crown',
  },
};

/** Fully wired, so selections actually move between chips. */
export const Interactive: Story = {
  render: () => {
    const [filterId, setFilterId] = useState('none');
    const [bg, setBg] = useState<{
      mode: 'none' | 'blur' | 'image';
      url: string | null;
    }>({ mode: 'none', url: null });
    const [spriteId, setSpriteId] = useState<string | null>(null);
    return (
      <MediaEffectsTray
        filters={FILTERS}
        activeFilterId={filterId}
        onSelectFilter={setFilterId}
        backgrounds={BACKGROUNDS}
        backgroundMode={bg.mode}
        activeBackgroundUrl={bg.url}
        onSelectBackground={(mode, url) => setBg({ mode, url })}
        faceSprites={FACE_SPRITES}
        activeFaceSpriteId={spriteId}
        onSelectFaceSprite={setSpriteId}
      />
    );
  },
};
