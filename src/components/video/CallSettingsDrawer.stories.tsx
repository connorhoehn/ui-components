import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { CallSettingsDrawer, CallCaptionsSettings, type CallSettingsDrawerTab } from './CallSettingsDrawer';
import { AudioVideoSettingsForm, type AudioVideoSettings } from './AudioVideoSettingsForm';
import { MediaEffectsPreviewPanel } from './MediaEffectsPreviewPanel';
import { DEVICES, fakeCameraStream, noop, themed } from './documentCallStoryKit';

// "Call settings" (mockups 03b and 04) in the page's right column: 380px
// at 1672 × 941. The drawer fills the column it is docked in.

export const DEFAULT_AV: AudioVideoSettings = {
  microphoneId: 'mbp-mic',
  speakerId: 'mbp-speakers',
  cameraId: 'facetime',
  noiseSuppression: true,
  echoCancellation: true,
  autoGainControl: true,
  volume: 0.62,
  mirrorPreview: true,
  quality: 'auto',
  frameRate: 'auto',
  rememberDevices: true,
};

const FILTERS = [
  { id: 'none', label: 'None', cssFilter: 'none' },
  { id: 'bw', label: 'B&W', cssFilter: 'grayscale(1)' },
  { id: 'warm', label: 'Warm', cssFilter: 'saturate(1.35) contrast(1.05) brightness(1.03) hue-rotate(-6deg)' },
  { id: 'cool', label: 'Cool', cssFilter: 'saturate(1.1) hue-rotate(12deg) brightness(1.02)' },
  { id: 'sepia', label: 'Sepia', cssFilter: 'sepia(1)' },
  { id: 'vivid', label: 'Vivid', cssFilter: 'saturate(1.8)' },
  { id: 'fade', label: 'Fade', cssFilter: 'contrast(0.8) brightness(1.1)' },
];

function svgScene(top: string, bottom: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="56"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs><rect width="96" height="56" fill="url(#g)"/></svg>`,
  )}`;
}

const BACKGROUNDS = [
  { id: 'dusk', label: 'Dusk', url: svgScene('rgb(96,110,160)', 'rgb(240,150,110)') },
  { id: 'ocean', label: 'Ocean', url: svgScene('rgb(150,200,235)', 'rgb(30,90,140)') },
  { id: 'forest', label: 'Forest', url: svgScene('rgb(90,140,80)', 'rgb(30,60,35)') },
];

const FACE = [
  { id: 'sunglasses', label: 'Sunglasses', icon: '🕶️' },
  { id: 'dog-ears', label: 'Dog ears', icon: '🐶' },
  { id: 'crown', label: 'Crown', icon: '👑' },
  { id: 'mustache', label: 'Mustache', icon: '🥸' },
];

function AudioVideoTab({ micDenied = false, speakers = true }: { micDenied?: boolean; speakers?: boolean }) {
  const [value, setValue] = useState(DEFAULT_AV);
  return (
    <AudioVideoSettingsForm
      value={value}
      onChange={setValue}
      devices={DEVICES}
      permission={{ microphone: micDenied ? 'denied' : 'granted', camera: 'granted' }}
      micLevel={0.6}
      previewStream={fakeCameraStream('dev-connor', 205)}
      cameraOn
      speakerSelectionSupported={speakers}
      onTestMic={noop}
      onTestSound={noop}
      selfName="Connor Hoehn"
    />
  );
}

// What RM's useMediaEffects().faceSprites carries since 0.97.4: a plain label
// and the emoji in `icon` (older RM put the emoji in the label; still parsed).
const RM_FACE = [
  { id: 'sunglasses', label: 'Sunglasses', icon: '🕶️' },
  { id: 'dog-ears', label: 'Dog ears', icon: '🐶' },
  { id: 'disguise', label: 'Disguise', icon: '🥸' },
  { id: 'crown', label: 'Crown', icon: '👑' },
];

function EffectsTab({ filter, bg, sprites = FACE }: { filter: string; bg: 'none' | 'blur' | 'image'; sprites?: typeof FACE | typeof RM_FACE }) {
  const [f, setF] = useState(filter);
  const [mode, setMode] = useState(bg);
  const [url, setUrl] = useState<string | null>(null);
  const [face, setFace] = useState<string | null>(null);
  return (
    <MediaEffectsPreviewPanel
      variant="surface"
      showFooter={false}
      previewActive
      previewStream={fakeCameraStream('dev-connor', 205)}
      isDirty
      onApply={noop}
      onCancel={noop}
      filters={FILTERS}
      activeFilterId={f}
      onSelectFilter={setF}
      backgrounds={BACKGROUNDS}
      backgroundMode={mode}
      activeBackgroundUrl={url}
      onSelectBackground={(m, u) => {
        setMode(m);
        setUrl(u);
      }}
      faceSprites={sprites}
      activeFaceSpriteId={face}
      onSelectFaceSprite={setFace}
      onSelectCustomBackground={noop}
    />
  );
}

function Scene({ tab, micDenied, speakers, rmFace }: { tab: CallSettingsDrawerTab; micDenied?: boolean; speakers?: boolean; rmFace?: boolean }) {
  const [t, setT] = useState<CallSettingsDrawerTab>(tab);
  const [captions, setCaptions] = useState(false);
  return (
    <div className="h-[892px] w-[380px] overflow-hidden border border-border">
      <CallSettingsDrawer
        open
        onClose={noop}
        tab={t}
        onTabChange={setT}
        audioVideo={<AudioVideoTab {...(micDenied ? { micDenied } : {})} {...(speakers === false ? { speakers } : {})} />}
        effects={<EffectsTab filter="warm" bg="blur" {...(rmFace ? { sprites: RM_FACE } : {})} />}
        captions={<CallCaptionsSettings enabled={captions} onEnabledChange={setCaptions} language="en" />}
        effectsFooter={{ changeCount: 2, onCancel: noop, onApply: noop }}
      />
    </div>
  );
}

const meta = {
  title: 'Video/Document calls/CallSettingsDrawer',
  component: CallSettingsDrawer,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof CallSettingsDrawer>;
export default meta;
type Story = StoryObj<typeof meta>;

const args = { open: true, onClose: noop, audioVideo: null, effects: null, captions: null };

/** Mockup 03b. */
export const AudioVideo: Story = { args, render: () => <Scene tab="audio-video" />, decorators: [themed('light')] };
export const AudioVideoDark: Story = { args, render: () => <Scene tab="audio-video" />, decorators: [themed('dark')] };
/** The microphone blocked in the browser: the alert replaces the select. */
export const MicBlocked: Story = { args, render: () => <Scene tab="audio-video" micDenied />, decorators: [themed('light')] };
/** Safari: no setSinkId, so no Speakers select — the volume row stays. */
export const NoSpeakerSelection: Story = { args, render: () => <Scene tab="audio-video" speakers={false} />, decorators: [themed('light')] };
/** Mockup 04: Warm and Blur picked, not yet applied. */
export const Effects: Story = { args, render: () => <Scene tab="effects" />, decorators: [themed('light')] };
export const EffectsDark: Story = { args, render: () => <Scene tab="effects" />, decorators: [themed('dark')] };
export const Captions: Story = { args, render: () => <Scene tab="captions" />, decorators: [themed('light')] };
export const CaptionsDark: Story = { args, render: () => <Scene tab="captions" />, decorators: [themed('dark')] };

/** A-8: the Face effects icon row from RM's sprites (`icon` + plain label, RM ≥ 0.97.4) — glyph in the tile, words under it, then More. */
export const EffectsRmFaceLabels: Story = { args, render: () => <Scene tab="effects" rmFace />, decorators: [themed('light')] };
export const EffectsRmFaceLabelsDark: Story = { args, render: () => <Scene tab="effects" rmFace />, decorators: [themed('dark')] };
