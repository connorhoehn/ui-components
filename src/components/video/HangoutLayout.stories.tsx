import type { Meta, StoryObj } from '@storybook/react-vite';
import { HangoutLayout } from './HangoutLayout';
import type { HangoutLayoutParticipant } from './HangoutLayoutTypes';

// HangoutLayout is the dispatch shell: it picks HangoutGrid or
// HangoutSpotlight. These stories exercise each branch of that decision.

const SharedScreen = (
  <div className="w-full h-full grid place-items-center bg-video-tile text-white/60 text-sm font-mono">
    shared screen
  </div>
);

const LOCAL: HangoutLayoutParticipant = { id: 'me', displayName: 'Morgan Reyes' };

const NAMES = [
  'Alice Johnson', 'Bob Smith', 'Cai Lund', 'Dee Okafor', 'Eli Marsh',
  'Fern Ortiz', 'Gus Halden', 'Hana Ito', 'Ivo Petrov', 'Jules Amari',
  'Kit Nakamura', 'Lena Voss',
];

function remotes(n: number): HangoutLayoutParticipant[] {
  return NAMES.slice(0, n).map((displayName, i) => ({ id: `p${i}`, displayName }));
}

const meta = {
  title: 'Video/HangoutLayout',
  component: HangoutLayout,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div className="w-[680px] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HangoutLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `mode="auto"` under the auto-spotlight threshold → grid. */
export const AutoGrid: Story = {
  args: { participants: remotes(4), localParticipant: LOCAL, activeSpeakerId: 'p1' },
};

/** One remote — grid mode, local as a PiP overlay. */
export const OneToOne: Story = {
  args: { participants: remotes(1), localParticipant: LOCAL, activeSpeakerId: 'p0' },
};

/** `mode="auto"` flips to spotlight at 10+ total participants: a 4×4 grid is
 *  no longer legible. */
export const AutoFlipsToSpotlightAtTen: Story = {
  args: {
    participants: remotes(11),
    localParticipant: LOCAL,
    activeSpeakerId: 'p3',
    speakerHysteresisMs: 0,
  },
};

/** Any participant exposing a `screenElement` forces spotlight, regardless of
 *  `mode` and regardless of the participant count. */
export const ScreenShareForcesSpotlight: Story = {
  args: {
    participants: remotes(3).map((p, i) => (i === 1 ? { ...p, screenElement: SharedScreen } : p)),
    localParticipant: LOCAL,
    activeSpeakerId: 'p0',
    speakerHysteresisMs: 0,
  },
};

/** Explicitly pinned spotlight mode with a small call. */
export const ForcedSpotlight: Story = {
  args: {
    participants: remotes(3),
    localParticipant: LOCAL,
    mode: 'spotlight',
    activeSpeakerId: 'p2',
    speakerHysteresisMs: 0,
  },
};

/** Nobody has joined yet. */
export const Empty: Story = {
  args: { participants: [], localParticipant: null },
};
