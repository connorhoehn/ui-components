import type { Meta, StoryObj } from '@storybook/react-vite';
import { VideoOverlayChip, type VideoOverlayChipTone } from './VideoOverlayChip';

// The chip lives on video, so these stories sit on the stage colour rather
// than the page surface.

const TONES: VideoOverlayChipTone[] = ['neutral', 'success', 'warning', 'danger', 'info'];

const meta = {
  title: 'Video/VideoOverlayChip',
  component: VideoOverlayChip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="rounded-lg bg-video-stage p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof VideoOverlayChip>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A stat line in monospace with tabular figures, so it does not jitter as it ticks. */
export const Stat: Story = { args: { mono: true, children: '2.4 Mb/s · 30 fps · loss 0.3%' } };

/** Press it to show the counters under the summary. */
export const WithDetails: Story = {
  args: {
    mono: true,
    children: '2.4 Mb/s · 30 fps · loss 0.3%',
    details: 'bytes: 1,204,331 · packets: 1,022 · lost: 3',
  },
};

/** A phase readout announced politely when it changes. */
export const LivePhase: Story = { args: { tone: 'success', live: true, children: '● live (HLS)' } };

/** Every tone, to judge them against the stage. */
export const AllTones: Story = {
  args: { children: 'neutral' },
  render: () => (
    <div className="flex flex-col items-start gap-2">
      {TONES.map((tone) => (
        <VideoOverlayChip key={tone} tone={tone}>{tone}</VideoOverlayChip>
      ))}
    </div>
  ),
};
