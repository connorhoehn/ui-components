import type { Meta, StoryObj } from '@storybook/react-vite';
import { NetworkQualityBadge, type NetworkQuality } from './NetworkQualityBadge';

// The badge lives on video, so it carries its own translucent-dark chip
// background — these stories sit on a stage rather than the page surface.

const ALL: NetworkQuality[] = ['good', 'medium', 'poor', 'dead'];

const meta = {
  title: 'Video/NetworkQualityBadge',
  component: NetworkQualityBadge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="p-4 rounded-lg bg-video-stage">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NetworkQualityBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 4 bars, success tone. */
export const Good: Story = { args: { quality: 'good' } };

/** 3 bars, warning tone — labelled "Fair" rather than "Medium". */
export const Medium: Story = { args: { quality: 'medium' } };

/** 2 bars, caution tone. */
export const Poor: Story = { args: { quality: 'poor' } };

/** 1 bar, danger tone — the only state whose label is a full sentence
 *  ("No Connection") rather than a one-word grade. */
export const Dead: Story = { args: { quality: 'dead' } };

/** The whole scale side by side, which is how you actually judge whether the
 *  bar counts and tones read as an ordered ramp. */
export const AllQualities: Story = {
  args: { quality: 'good' },
  render: () => (
    <div className="flex flex-col gap-2 items-start">
      {ALL.map((q) => (
        <NetworkQualityBadge key={q} quality={q} />
      ))}
    </div>
  ),
};
