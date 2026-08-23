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

/** Docked into a stage corner via `className`. The badge is positioned by the
 *  caller's classes rather than an inline style or a wrapper `<div>`. */
export const DockedTopRight: Story = {
  args: { quality: 'medium', className: 'absolute top-2 right-2' },
  decorators: [
    (Story) => (
      <div className="relative w-[420px] h-[236px] rounded-lg bg-video-stage grid place-items-center">
        <span className="text-white/25 text-xs font-mono">call stage</span>
        <Story />
      </div>
    ),
  ],
};

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
