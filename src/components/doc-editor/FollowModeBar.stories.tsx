import type { Meta, StoryObj } from '@storybook/react-vite';
import FollowModeBar from './FollowModeBar';
import type { Participant } from '../../types/document';

// The editor's follow bar. `appearance="bar"` + `location` (2.391.0) is the
// in-call look: "**Following Alice** · Session flow" … "Stop following".

const participants = [{ clientId: 'c-alice', userId: 'dev-alice', displayName: 'Alice' }] as unknown as Participant[];

const meta = {
  title: 'Doc editor/FollowModeBar',
  component: FollowModeBar,
  parameters: { layout: 'padded' },
  args: { followingUserId: 'dev-alice', participants, onStopFollow: () => {} },
  decorators: [(S) => <div className="w-[820px]"><S /></div>],
} satisfies Meta<typeof FollowModeBar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Banner: Story = {};
export const InCallBar: Story = { args: { appearance: 'bar', location: 'Session flow' } };
export const InCallBarDark: Story = {
  args: { appearance: 'bar', location: 'Session flow' },
  decorators: [(S) => <div data-theme="dark" className="w-[820px] bg-surface p-4"><S /></div>],
};
