import type { Meta, StoryObj } from '@storybook/react-vite';
import { VideoGrid, type Participant } from './VideoGrid';

// VideoGrid is the *static* N-way grid: column count is derived from the
// participant count and tiles never reflow on speaker change. For an
// active-speaker-aware layout use HangoutLayout instead.

const NAMES = [
  'Alice Johnson', 'Bob Smith', 'Cai Lund', 'Dee Okafor',
  'Eli Marsh', 'Fern Ortiz', 'Gus Halden', 'Hana Ito', 'Ivo Petrov',
];

function people(n: number, overrides: Partial<Participant> = {}): Participant[] {
  return NAMES.slice(0, n).map((displayName, i) => ({
    id: `p${i}`,
    displayName,
    ...overrides,
  }));
}

const meta = {
  title: 'Video/VideoGrid',
  component: VideoGrid,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  // Sized through the component's own `className` — no wrapper decorator.
  args: { className: 'w-[640px] max-w-full' },
} satisfies Meta<typeof VideoGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

/** No participants — the grid collapses to nothing. Callers that need a
 *  "waiting for others" affordance should use HangoutGrid. */
export const Empty: Story = {
  args: { participants: [] },
};

/** One participant: a single full-width tile. */
export const Solo: Story = {
  args: { participants: people(1) },
};

/** 2–4 participants: 2 columns. */
export const FourUp: Story = {
  args: { participants: people(4) },
};

/** 5–9 participants: 3 columns. */
export const NineUp: Story = {
  args: { participants: people(9) },
};

/** Speaking + muted states are per-tile borders/badges, not layout changes. */
export const MixedStates: Story = {
  args: {
    participants: [
      { id: 'me', displayName: 'Morgan Reyes', isLocal: true, isMuted: true },
      { id: 'p1', displayName: 'Alice Johnson', isSpeaking: true },
      { id: 'p2', displayName: 'Bob Smith', isMuted: true },
      { id: 'p3', displayName: 'Cai Lund' },
    ],
  },
};
