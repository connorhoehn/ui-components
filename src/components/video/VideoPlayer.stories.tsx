import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { VideoPlayer, type PlayerPhase } from './VideoPlayer';

// These stories drive the CONTROLLED `phase` prop with no media source, which
// is exactly the overlay contract: pass a phase and the player renders that
// chrome regardless of what the underlying <video> is doing. A live WebRTC
// MediaStream is deliberately not simulated — it would not survive a static
// Storybook build.

const PHASES: PlayerPhase[] = ['idle', 'connecting', 'buffering', 'playing', 'error'];

const meta = {
  title: 'Video/VideoPlayer',
  component: VideoPlayer,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="w-[480px] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof VideoPlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Nothing playing yet — "Ready". */
export const Idle: Story = {
  args: { phase: 'idle' },
};

/** Negotiating the connection. */
export const Connecting: Story = {
  args: { phase: 'connecting' },
};

/** Stalled mid-stream: the only phase that also renders a spinner. */
export const Buffering: Story = {
  args: { phase: 'buffering' },
};

/** Playing is the one phase with NO overlay — the frame is the UI. Without a
 *  real source this is a black stage, which is the honest rendering. */
export const Playing: Story = {
  args: { phase: 'playing' },
};

/** Terminal playback failure. */
export const PlaybackError: Story = {
  args: { phase: 'error' },
};

/** Native `<video>` controls, on top of whatever overlay the phase produces. */
export const WithNativeControls: Story = {
  args: { phase: 'idle', controls: true },
};

/** Click through every phase — the fastest way to compare overlay copy. */
export const PhaseSwitcher: Story = {
  args: { phase: 'idle' },
  render: () => {
    const [phase, setPhase] = useState<PlayerPhase>('connecting');
    return (
      <div className="flex flex-col gap-3">
        <VideoPlayer phase={phase} />
        <div className="flex flex-wrap gap-2">
          {PHASES.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPhase(p)}
              className={
                p === phase
                  ? 'px-2.5 py-1 rounded text-xs font-medium bg-primary text-on-primary'
                  : 'px-2.5 py-1 rounded text-xs font-medium bg-surface-panel border border-border text-text-secondary'
              }
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    );
  },
};
