import type { Meta, StoryObj } from '@storybook/react-vite';
import { FollowBanner } from './FollowBanner';

// "Following Alice" — the centred banner, and (2.391.0) the in-call follow
// bar with the followed person's section: "**Following Alice** · Session flow"
// with "Stop following" on the right.

const meta = {
  title: 'Shared/FollowBanner',
  component: FollowBanner,
  parameters: { layout: 'padded' },
  args: { name: 'Alice', onStop: () => {}, autoStopOnInteract: false },
  decorators: [(S) => <div className="w-[820px]"><S /></div>],
} satisfies Meta<typeof FollowBanner>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Banner: Story = {};
export const BannerWithLocation: Story = { args: { location: 'Session flow' } };
export const Bar: Story = { args: { appearance: 'bar', location: 'Session flow' } };
export const BarNoLocation: Story = { args: { appearance: 'bar' } };
export const BarDark: Story = {
  args: { appearance: 'bar', location: 'Session flow' },
  decorators: [(S) => <div data-theme="dark" className="w-[820px] bg-surface p-4"><S /></div>],
};
