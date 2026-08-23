import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { TranscriptPanel, type TranscriptSegment } from './TranscriptPanel';

// One panel, five statuses. `ready` additionally branches on whether any
// segments came back, which is a genuinely different empty state from `idle`.

const SEGMENTS: TranscriptSegment[] = [
  {
    startMs: 0, endMs: 6200, speakerId: 'spk-1', speakerLabel: 'Alice Johnson',
    text: "Alright, let's start with the migration status. Where did we land on the schema change?",
  },
  {
    startMs: 6200, endMs: 14800, speakerId: 'spk-2', speakerLabel: 'Bob Smith',
    text: 'Shipped behind a flag on Tuesday. Backfill is about eighty percent through — should finish overnight.',
  },
  {
    startMs: 14800, endMs: 21000, speakerId: 'spk-1', speakerLabel: 'Alice Johnson',
    text: 'Any read-path regressions?',
  },
  {
    startMs: 21000, endMs: 33400, speakerId: 'spk-3', speakerLabel: 'Cai Lund',
    text: "p99 moved about four milliseconds, which is inside noise. I'll keep the dashboard open until the backfill drains.",
  },
  {
    startMs: 33400, endMs: 41000, speakerId: 'spk-2', speakerLabel: 'Bob Smith',
    text: "Then I think we can drop the flag on Friday if nothing changes.",
  },
];

const meta = {
  title: 'Video/TranscriptPanel',
  component: TranscriptPanel,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div className="w-[520px] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TranscriptPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Transcription was never enabled for this recording. */
export const Idle: Story = {
  args: { status: 'idle' },
};

/** Queued but the worker has not picked it up. */
export const Pending: Story = {
  args: { status: 'pending' },
};

/** Worker running — the caller can name the phase via `pendingMessage`. */
export const Processing: Story = {
  args: {
    status: 'processing',
    pendingMessage: 'Running Whisper on a 52-minute recording — roughly 3 minutes to go.',
  },
};

/** Failure, with the upstream error surfaced. */
export const Failed: Story = {
  args: { status: 'failed', errorMessage: 'Whisper worker timed out after 15 minutes.' },
};

/** Ready with content. Speaker colour is hashed from `speakerId`, so the same
 *  speaker keeps the same hue across re-renders and across recordings. */
export const Ready: Story = {
  args: { status: 'ready', segments: SEGMENTS },
};

/** Ready, but nobody spoke — distinct from `idle`: the job ran and found
 *  nothing. */
export const ReadyButSilent: Story = {
  args: { status: 'ready', segments: [] },
};

/** Time-aligned: pass `currentTimeMs` from the player and the active segment
 *  is highlighted and scrolled into view. `onSeek` makes segments clickable. */
export const TimeAlignedWithSeek: Story = {
  args: { status: 'ready', segments: SEGMENTS },
  render: (args) => {
    const [timeMs, setTimeMs] = useState(21000);
    return (
      <div className="flex flex-col gap-3">
        <p className="text-xs text-text-secondary">
          Simulated playhead: {(timeMs / 1000).toFixed(1)}s — click a segment to seek.
        </p>
        <TranscriptPanel {...args} currentTimeMs={timeMs} onSeek={setTimeMs} />
      </div>
    );
  },
};
