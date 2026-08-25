import type { Meta, StoryObj } from '@storybook/react-vite';
import { TranscriptOverlay, type CaptionLine } from './TranscriptOverlay';

// Opacity is computed from each line's time-since-last-update against
// `fadeAfterMs`, and a line drops from the DOM 3s (REMOVE_AFTER_MS) after
// its last update. These fixtures use FIXED ISO timestamps and pin the
// reference point with the `now` prop (set in meta.args below), so every
// story renders the same fade ramp on every load — and the ramp is visible
// at all, which it would not be if `now` defaulted to Date.now() against a
// hardcoded fixture.

const NOW = Date.parse('2026-05-28T20:00:00.000Z');

function ago(secondsAgo: number): string {
  return new Date(NOW - secondsAgo * 1000).toISOString();
}

// Ages stay inside the 3s linger window: past that, lines are removed from
// the DOM entirely — the overlay reads as a running ticker, not an archive.
const LINES: CaptionLine[] = [
  { id: 'c1', speakerId: 'spk-1', speakerName: 'Alice Johnson', text: 'Can everyone see the deploy dashboard?', at: ago(2.6) },
  { id: 'c2', speakerId: 'spk-2', speakerName: 'Bob Smith', text: 'Yep, the green bar on the left is the canary.', at: ago(1.4) },
  { id: 'c3', speakerId: 'spk-3', speakerName: 'Cai Lund', text: "I'm still seeing the old build, give me a second.", at: ago(0.2) },
];

const meta = {
  title: 'Video/TranscriptOverlay',
  component: TranscriptOverlay,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { now: NOW },
  decorators: [
    (Story) => (
      <div className="relative w-[560px] h-[315px] rounded-lg bg-video-stage overflow-hidden grid place-items-center">
        <span className="text-white/25 text-xs font-mono">call stage</span>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TranscriptOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Three lines at different ages — the older ones are visibly dimmer. */
export const ThreeSpeakers: Story = {
  args: { lines: LINES },
};

/** A single fresh caption, at full opacity. */
export const SingleLine: Story = {
  args: { lines: [LINES[2]!] },
};

/** Interim (still-being-revised) captions render in italics so viewers know
 *  the wording may change. */
export const InterimResult: Story = {
  args: {
    lines: [
      LINES[1]!,
      { id: 'c4', speakerId: 'spk-1', speakerName: 'Alice Johnson', text: 'So the next step would be to roll', at: ago(0), interim: true },
    ],
  },
};

/** `maxLines` caps the band height — only the most recent N survive. */
export const CappedToOneLine: Story = {
  args: { lines: LINES, maxLines: 1 },
};

/** Without a `speakerName` the overlay falls back to a truncated speaker id,
 *  which is what an un-joined SFU participant looks like. */
export const UnnamedSpeakers: Story = {
  args: {
    lines: [
      { id: 'c5', speakerId: 'a7f3c19b2e', text: 'Sorry, joining from my phone.', at: ago(2) },
      { id: 'c6', speakerId: 'd41d8cd98f', text: 'No problem, we can hear you.', at: ago(0) },
    ],
  },
};

/** The fade ramp end to end: fresh (opacity 1), half-faded (0.5), and near
 *  the end of the 3s linger (clamped to the 0.35 floor — anything quiet for
 *  longer than 3s drops from the DOM entirely). Only reproducible because
 *  `now` is pinned — with a live clock all three would have aged out. */
export const FadeRamp: Story = {
  args: {
    lines: [
      { id: 'f1', speakerId: 'spk-1', speakerName: 'Alice Johnson', text: 'Oldest line — clamped at the 0.35 floor.', at: ago(2.9) },
      { id: 'f2', speakerId: 'spk-2', speakerName: 'Bob Smith', text: 'Half way through the fade window.', at: ago(1.5) },
      { id: 'f3', speakerId: 'spk-3', speakerName: 'Cai Lund', text: 'Just spoken — full opacity.', at: ago(0) },
    ],
  },
};

/** A long caption wraps — each wrapped fragment keeps its own padded scrim
 *  backing (`box-decoration-break: clone`) instead of one full-width bar. */
export const WrappedLineScrim: Story = {
  args: {
    lines: [
      {
        id: 'w1',
        speakerId: 'spk-1',
        speakerName: 'Alice Johnson',
        text: 'This caption is deliberately long enough to wrap across multiple rendered lines so you can see the scrim hug every fragment of the text.',
        at: ago(0.5),
      },
    ],
  },
};

/** No captions at all — the component renders `null`, so the caller needs no
 *  visibility gate of its own. */
export const NoCaptions: Story = {
  args: { lines: [] },
};
