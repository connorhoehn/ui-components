import type { Meta, StoryObj } from '@storybook/react-vite';
import { TranscriptOverlay, type CaptionLine } from './TranscriptOverlay';

// Opacity is computed from each line's age against `fadeAfterMs`. These
// fixtures use FIXED ISO timestamps and pin the reference point with the
// `now` prop (set in meta.args below), so every story renders the same fade
// ramp on every load — and the ramp is visible at all, which it would not be
// if `now` defaulted to Date.now() against a hardcoded fixture.

const NOW = Date.parse('2026-05-28T20:00:00.000Z');

function ago(secondsAgo: number): string {
  return new Date(NOW - secondsAgo * 1000).toISOString();
}

const LINES: CaptionLine[] = [
  { id: 'c1', speakerId: 'spk-1', speakerName: 'Alice Johnson', text: 'Can everyone see the deploy dashboard?', at: ago(14) },
  { id: 'c2', speakerId: 'spk-2', speakerName: 'Bob Smith', text: 'Yep, the green bar on the left is the canary.', at: ago(7) },
  { id: 'c3', speakerId: 'spk-3', speakerName: 'Cai Lund', text: "I'm still seeing the old build, give me a second.", at: ago(1) },
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
      { id: 'c5', speakerId: 'a7f3c19b2e', text: 'Sorry, joining from my phone.', at: ago(3) },
      { id: 'c6', speakerId: 'd41d8cd98f', text: 'No problem, we can hear you.', at: ago(0) },
    ],
  },
};

/** The fade ramp end to end: fresh (opacity 1), half-aged (0.5), and past the
 *  window (clamped to the 0.35 floor). Only reproducible because `now` is
 *  pinned — with a live clock all three would sit on the floor. */
export const FadeRamp: Story = {
  args: {
    fadeAfterMs: 8000,
    lines: [
      { id: 'f1', speakerId: 'spk-1', speakerName: 'Alice Johnson', text: 'Oldest line — clamped at the 0.35 floor.', at: ago(32) },
      { id: 'f2', speakerId: 'spk-2', speakerName: 'Bob Smith', text: 'Half way through the fade window.', at: ago(4) },
      { id: 'f3', speakerId: 'spk-3', speakerName: 'Cai Lund', text: 'Just spoken — full opacity.', at: ago(0) },
    ],
  },
};

/** No captions at all — the component renders `null`, so the caller needs no
 *  visibility gate of its own. */
export const NoCaptions: Story = {
  args: { lines: [] },
};
