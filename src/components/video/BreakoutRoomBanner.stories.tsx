import type { Meta, StoryObj } from '@storybook/react-vite';
import { BreakoutRoomBanner } from './BreakoutRoomBanner';

const meta = {
  title: 'Video/BreakoutRoomBanner',
  component: BreakoutRoomBanner,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof BreakoutRoomBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithTimerAndAnnouncement: Story = {
  args: {
    roomName: 'Room 2',
    endsAt: new Date(Date.now() + 4 * 60_000).toISOString(),
    announcement: { message: 'Five minutes left — pick one idea to share back.', fromDisplayName: 'Digisha Jain' },
    onDismissAnnouncement: () => {},
    onReturnToMain: () => {},
  },
};
export const LastMinute: Story = { args: { roomName: "Jeff's Room", endsAt: new Date(Date.now() + 45_000).toISOString() } };

/** The organizer is closing the rooms: the closing grace counts down. */
export const Closing: Story = { args: { roomName: "Hilla's Room", closing: true, endsAt: new Date(Date.now() + 30_000).toISOString(), onReturnToMain: () => {} } };
