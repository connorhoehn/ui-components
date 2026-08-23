import type { Meta, StoryObj } from '@storybook/react-vite';
import { HangoutSpotlight } from './HangoutSpotlight';
import type { HangoutLayoutParticipant } from './HangoutLayoutTypes';

// Spotlight slot resolution, in priority order:
//   1. explicit `spotlightContent`  2. the first participant with a
//   `screenElement`  3. the stabilized active speaker  4. the first remote.

const SharedScreen = (
  <div className="w-full h-full grid place-items-center bg-video-tile text-white/60 text-sm font-mono">
    shared screen
  </div>
);

const LOCAL: HangoutLayoutParticipant = { id: 'me', displayName: 'Morgan Reyes', isMuted: true };

const PARTICIPANTS: HangoutLayoutParticipant[] = [
  { id: 'p0', displayName: 'Alice Johnson' },
  { id: 'p1', displayName: 'Bob Smith', isMuted: true },
  { id: 'p2', displayName: 'Cai Lund' },
  { id: 'p3', displayName: 'Dee Okafor' },
];

const meta = {
  title: 'Video/HangoutSpotlight',
  component: HangoutSpotlight,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  // Sized through the component's own `className` — no wrapper decorator.
  args: { className: 'w-[640px] max-w-full' },
} satisfies Meta<typeof HangoutSpotlight>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Active speaker drives the main slot; everyone else lands in the filmstrip.
 *  Hysteresis is disabled here so the story renders its final state at once. */
export const ActiveSpeaker: Story = {
  args: {
    participants: PARTICIPANTS,
    localParticipant: LOCAL,
    activeSpeakerId: 'p2',
    speakerHysteresisMs: 0,
  },
};

/** No active speaker yet — the first remote fills the slot so it is never blank. */
export const NoActiveSpeaker: Story = {
  args: { participants: PARTICIPANTS, localParticipant: LOCAL, activeSpeakerId: null },
};

/** A participant's `screenElement` is auto-promoted to the main slot, and the
 *  sharer's camera tile *stays* in the filmstrip so you still see them. */
export const AutoPromotedScreenShare: Story = {
  args: {
    participants: PARTICIPANTS.map((p) =>
      p.id === 'p1' ? { ...p, screenElement: SharedScreen } : p,
    ),
    localParticipant: LOCAL,
    activeSpeakerId: 'p2',
    speakerHysteresisMs: 0,
  },
};

/** Explicit `spotlightContent` wins over everything. Pass
 *  `spotlightContentLabel` — otherwise attribution falls back to the active
 *  speaker, who is usually not the person sharing. */
export const ExplicitSpotlightContent: Story = {
  args: {
    participants: PARTICIPANTS,
    localParticipant: LOCAL,
    spotlightContent: SharedScreen,
    spotlightContentLabel: 'Dee Okafor',
    activeSpeakerId: 'p0',
    speakerHysteresisMs: 0,
  },
};

/** Only the local user is present — the filmstrip still renders their tile. */
export const LocalOnly: Story = {
  args: { participants: [], localParticipant: LOCAL },
};

/** Wider filmstrip thumbs, for docked / fullscreen widget modes. */
export const WideFilmstrip: Story = {
  args: {
    participants: PARTICIPANTS,
    localParticipant: LOCAL,
    filmstripTileWidth: 176,
    activeSpeakerId: 'p0',
    speakerHysteresisMs: 0,
  },
};
