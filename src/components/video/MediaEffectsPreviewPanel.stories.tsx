import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import CallSettingsDialog from './CallSettingsDialog';
import MediaEffectsPreviewPanel from './MediaEffectsPreviewPanel';
import { Button } from '../ui/Button';

// The panel is purely presentational — a real host wires it to a
// useMediaEffects() controller via <WrappedMediaEffectsPreviewPanel>.
// These stories run a local DRAFT object in state so the preview /
// dirty / apply cycle is exercisable without a camera or an engine.

/** Inline SVG swatch so no story reaches for an external URL. */
function swatch(color: string): string {
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><rect width="48" height="48" fill="${encodeURIComponent(color)}"/></svg>`;
}

const FILTERS = [
  { id: 'none', label: 'None' },
  { id: 'warm', label: 'Warm' },
  { id: 'cool', label: 'Cool' },
  { id: 'mono', label: 'Mono' },
];
const BACKGROUNDS = [
  { id: 'beach', label: 'Beach', url: swatch('goldenrod') },
  { id: 'forest', label: 'Forest', url: swatch('seagreen') },
];
const FACE_SPRITES = [
  { id: 'glasses', label: '🕶️ Glasses' },
  { id: 'crown', label: '👑 Crown' },
];

type Settings = {
  filterId: string;
  backgroundMode: 'none' | 'blur' | 'image';
  backgroundImageUrl: string | null;
  faceSpriteId: string | null;
};

const LIVE: Settings = {
  filterId: 'none',
  backgroundMode: 'none',
  backgroundImageUrl: null,
  faceSpriteId: null,
};

/** Stands in for the controller: draft state + dirty computation. */
function useFakePreviewSession(active = true) {
  const [live, setLive] = useState<Settings>(LIVE);
  const [draft, setDraft] = useState<Settings | null>(active ? { ...LIVE } : null);
  const isDirty = draft !== null && JSON.stringify(draft) !== JSON.stringify(live);
  return {
    live,
    draft,
    isDirty,
    patch: (p: Partial<Settings>) => setDraft((d) => (d ? { ...d, ...p } : d)),
    apply: () => {
      if (draft) setLive(draft);
    },
    cancel: () => setDraft({ ...live }),
    begin: () => setDraft({ ...live }),
  };
}

function Harness({ previewActive = true }: { previewActive?: boolean }) {
  const s = useFakePreviewSession(previewActive);
  const shown = s.draft ?? s.live;
  return (
    <div className="max-w-xl rounded-2xl bg-call-chrome p-4">
      <MediaEffectsPreviewPanel
        previewActive={s.draft !== null}
        previewStream={null}
        isDirty={s.isDirty}
        onApply={s.apply}
        onCancel={s.cancel}
        filters={FILTERS}
        activeFilterId={shown.filterId}
        onSelectFilter={(filterId) => s.patch({ filterId })}
        backgrounds={BACKGROUNDS}
        backgroundMode={shown.backgroundMode}
        activeBackgroundUrl={shown.backgroundImageUrl}
        onSelectBackground={(backgroundMode, backgroundImageUrl) =>
          s.patch({ backgroundMode, backgroundImageUrl })
        }
        faceSprites={FACE_SPRITES}
        activeFaceSpriteId={shown.faceSpriteId}
        onSelectFaceSprite={(faceSpriteId) => s.patch({ faceSpriteId })}
      />
      <p className="mt-3 text-xs text-white/50">
        Live (what peers see): {JSON.stringify(s.live)}
      </p>
    </div>
  );
}

const meta = {
  title: 'Video/MediaEffectsPreviewPanel',
  component: MediaEffectsPreviewPanel,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    previewActive: true,
    previewStream: null,
    isDirty: false,
    onApply: () => {},
    onCancel: () => {},
    filters: FILTERS,
    activeFilterId: 'none',
    onSelectFilter: () => {},
    backgrounds: BACKGROUNDS,
    backgroundMode: 'none',
    activeBackgroundUrl: null,
    onSelectBackground: () => {},
    faceSprites: FACE_SPRITES,
    activeFaceSpriteId: null,
    onSelectFaceSprite: () => {},
  },
} satisfies Meta<typeof MediaEffectsPreviewPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The default flow: pick effects, watch "Live" stay unchanged until Apply. */
export const AuditionThenApply: Story = {
  render: () => <Harness />,
};

/** Engine never started a session — the surface is read-only and safe. */
export const NoSessionIsInert: Story = {
  render: () => <Harness previewActive={false} />,
};

/** Hosted in the settings dialog with its small live preview suppressed. */
export const InsideCallSettingsDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div>
        <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
          Open call settings
        </Button>
        <CallSettingsDialog
          open={open}
          onClose={() => setOpen(false)}
          previewStream={null}
          showPreview={false}
          effectsContent={<Harness />}
        />
      </div>
    );
  },
};
