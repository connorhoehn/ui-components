import type { Meta, StoryObj } from '@storybook/react-vite';
import { ViewerCount } from './ViewerCount';

const meta = {
  title: 'Video/ViewerCount',
  component: ViewerCount,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ViewerCount>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Under 1000, the raw number is shown. */
export const Small: Story = {
  args: { count: 42 },
};

/** Nobody watching yet. */
export const Zero: Story = {
  args: { count: 0 },
};

/** At 1000+ the badge switches to one-decimal thousands ("12.4K"). */
export const Thousands: Story = {
  args: { count: 12_400 },
};

/** Overlay use: position via `className`, not `style` — the `style` prop is
 *  deprecated and only kept so existing callers keep compiling. */
export const OverlaidOnPlayer: Story = {
  args: { count: 3120, className: 'absolute top-3 left-3' },
  decorators: [
    (Story) => (
      <div className="relative w-[420px] h-[236px] rounded-lg bg-video-stage grid place-items-center">
        <span className="text-white/25 text-xs font-mono">player</span>
        <Story />
      </div>
    ),
  ],
};
