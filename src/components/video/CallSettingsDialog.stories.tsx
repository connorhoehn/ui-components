import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useRef, useState } from 'react';

import { InviteCandidateList } from '../hangout/InviteCandidateList';
import { Button } from '../ui/Button';
import CallSettingsDialog from './CallSettingsDialog';
import MediaEffectsTray from './MediaEffectsTray';

// Purely presentational — the effects engine, roster and invite wire
// calls live in the consumer. These stories fake all of it: the effects
// tab hosts a state-wired MediaEffectsTray, the people tab hosts an
// InviteCandidateList over a static roster, and the "live" preview is a
// canvas.captureStream() animation so no story needs a camera or any
// external URL.

/** Tiny inline SVG swatch so no story reaches for an external URL. */
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
  { id: 'office', label: 'Office', url: swatch('slategray') },
];

const FACE_SPRITES = [
  { id: 'glasses', label: '🕶️ Glasses' },
  { id: 'crown', label: '👑 Crown' },
];

const CANDIDATES = [
  { userId: 'u-alice', name: 'Alice Chen' },
  { userId: 'u-bob', name: 'Bob Martinez', alreadyInCall: true },
  { userId: 'u-grace', name: 'Grace Wilson' },
  { userId: 'u-dan', name: 'Dan Okafor', pending: true },
];

/** State-wired tray so chip selection (and toggle-off) works in the story. */
function FakeEffectsTray() {
  const [filterId, setFilterId] = useState('none');
  const [bg, setBg] = useState<{ mode: 'none' | 'blur' | 'image'; url: string | null }>({
    mode: 'none',
    url: null,
  });
  const [spriteId, setSpriteId] = useState<string | null>(null);
  return (
    <MediaEffectsTray
      compact
      className="border-0 bg-transparent p-0"
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
}

/** The people tab keeps its light-surface list on a light panel. */
function FakePeopleList() {
  return (
    <div className="rounded-lg bg-surface p-3">
      <InviteCandidateList
        candidates={CANDIDATES}
        onInvite={(ids) => { console.info('invite', ids); }}
      />
    </div>
  );
}

/** Animated canvas → captureStream(): a real MediaStream, no camera. */
function useFakePreviewStream(): MediaStream | null {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const rafRef = useRef(0);
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 360;
    const ctx = canvas.getContext('2d');
    if (!ctx || typeof canvas.captureStream !== 'function') return;
    const draw = (t: number) => {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 0, 640, 360);
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(320 + Math.sin(t / 700) * 120, 180, 48, 0, Math.PI * 2);
      ctx.fill();
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    const s = canvas.captureStream(15);
    setStream(s);
    return () => {
      cancelAnimationFrame(rafRef.current);
      s.getTracks().forEach((track) => track.stop());
    };
  }, []);
  return stream;
}

const meta = {
  title: 'Video/CallSettingsDialog',
  component: CallSettingsDialog,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    open: true,
    onClose: () => {},
    previewStream: null,
  },
} satisfies Meta<typeof CallSettingsDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Effects tab active, fake preview stream driving the mirrored self-view. */
export const EffectsTab: Story = {
  render: (args) => {
    const stream = useFakePreviewStream();
    return (
      <CallSettingsDialog
        {...args}
        previewStream={stream}
        effectsContent={<FakeEffectsTray />}
        peopleContent={<FakePeopleList />}
      />
    );
  },
};

/** People tab first — the InviteCandidateList picker with its confirm. */
export const PeopleTab: Story = {
  render: (args) => {
    const stream = useFakePreviewStream();
    return (
      <CallSettingsDialog
        {...args}
        previewStream={stream}
        initialTab="people"
        effectsContent={<FakeEffectsTray />}
        peopleContent={<FakePeopleList />}
      />
    );
  },
};

/** Chat tab first — a fake in-call chat body in the new chat slot. */
export const ChatTab: Story = {
  render: (args) => {
    const stream = useFakePreviewStream();
    return (
      <CallSettingsDialog
        {...args}
        previewStream={stream}
        initialTab="chat"
        effectsContent={<FakeEffectsTray />}
        peopleContent={<FakePeopleList />}
        chatContent={
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {['Can everyone see my screen?', 'Yep, looks good.', 'One sec, grabbing the link…'].map((line, i) => (
              <li key={i} className="rounded-lg bg-white/10 px-3 py-2 text-[13px] text-white">
                {line}
              </li>
            ))}
          </ul>
        }
      />
    );
  },
};

/** No stream — the "Camera off" empty state fills the preview pane. */
export const EmptyPreview: Story = {
  render: (args) => (
    <CallSettingsDialog
      {...args}
      previewStream={null}
      effectsContent={<FakeEffectsTray />}
      peopleContent={<FakePeopleList />}
    />
  ),
};

/** Only one slot provided — the People tab disappears entirely. */
export const EffectsOnly: Story = {
  render: (args) => (
    <CallSettingsDialog
      {...args}
      previewStream={null}
      effectsContent={<FakeEffectsTray />}
    />
  ),
};

/** Open/close wiring, since the modal portals over the page. */
export const Openable: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="p-8">
        <Button variant="primary" size="md" onClick={() => setOpen(true)}>
          Open call settings
        </Button>
        <CallSettingsDialog
          open={open}
          onClose={() => setOpen(false)}
          previewStream={null}
          effectsContent={<FakeEffectsTray />}
          peopleContent={<FakePeopleList />}
        />
      </div>
    );
  },
};
