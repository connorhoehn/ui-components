import type { Meta, StoryObj } from '@storybook/react-vite';
import { HangoutGrid } from './HangoutGrid';
import type { HangoutLayoutParticipant } from './HangoutLayoutTypes';

// The local participant's placement is derived from the *remote* count:
//   0 remotes → local fills the canvas (solo)
//   1 remote  → local becomes a PiP overlay (1:1 convention)
//   2+ remotes → local joins the grid inline (Meet/Teams convention)

const LOCAL: HangoutLayoutParticipant = { id: 'me', displayName: 'Morgan Reyes' };

const NAMES = ['Alice Johnson', 'Bob Smith', 'Cai Lund', 'Dee Okafor', 'Eli Marsh'];

function remotes(n: number): HangoutLayoutParticipant[] {
  return NAMES.slice(0, n).map((displayName, i) => ({ id: `p${i}`, displayName }));
}

const meta = {
  title: 'Video/HangoutGrid',
  component: HangoutGrid,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div className="w-[640px] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HangoutGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Nobody at all — the "waiting for others to join" placeholder. */
export const Empty: Story = {
  args: { participants: [] },
};

/** Solo: you joined first, so your tile fills the canvas — no PiP, no grid. */
export const LocalSolo: Story = {
  args: { participants: [], localParticipant: LOCAL },
};

/** 1:1 — the remote fills the stage and the local user becomes a corner PiP. */
export const OneToOneWithPip: Story = {
  args: { participants: remotes(1), localParticipant: LOCAL, activeSpeakerId: 'p0' },
};

/** A larger PiP for docked/fullscreen widget modes. */
export const OneToOneLargePip: Story = {
  args: { participants: remotes(1), localParticipant: LOCAL, pipWidth: 192 },
};

/** 2+ remotes — the local user joins the grid inline as another tile. */
export const LocalInline: Story = {
  args: {
    participants: [
      { id: 'p0', displayName: 'Alice Johnson' },
      { id: 'p1', displayName: 'Bob Smith', isMuted: true },
      { id: 'p2', displayName: 'Cai Lund' },
    ],
    localParticipant: { ...LOCAL, isMuted: true },
    activeSpeakerId: 'p0',
  },
};

/** Clickable tiles — the caller decides what a click means (pin, promote…). */
export const Clickable: Story = {
  args: {
    participants: remotes(5),
    localParticipant: LOCAL,
    activeSpeakerId: 'p2',
    onParticipantClick: (id) => console.log('clicked', id),
  },
};
