import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReconnectingBanner } from './ReconnectingBanner';

// Absolutely positioned against the call stage; the parent owns the `show`
// gate (typically `connectionState === 'reconnecting'`).

const meta = {
  title: 'Video/ReconnectingBanner',
  component: ReconnectingBanner,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="relative w-[420px] h-[200px] rounded-lg bg-video-stage grid place-items-center">
        <span className="text-white/25 text-xs font-mono">call stage</span>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ReconnectingBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The default warning pill. */
export const Reconnecting: Story = {
  args: { show: true },
};

/** A more specific label — e.g. when you know which leg is retrying. */
export const CustomLabel: Story = {
  args: { show: true, label: 'Reconnecting to the media server… (attempt 2 of 5)' },
};

/** `show: false` renders nothing, so callers don't need their own gate. */
export const Hidden: Story = {
  args: { show: false },
};
