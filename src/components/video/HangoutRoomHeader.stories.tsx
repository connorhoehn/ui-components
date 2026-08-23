import type { Meta, StoryObj } from '@storybook/react-vite';
import HangoutRoomHeader, { type HangoutPhase } from './HangoutRoomHeader';
import { Button } from '../ui/Button';

// Deliberately has NO leave-call button: that affordance belongs to
// MediaControlsBar per the locked consumer boundary.

const PHASES: HangoutPhase[] = ['idle', 'joining', 'joined', 'reconnecting', 'ended', 'failed'];

const meta = {
  title: 'Video/HangoutRoomHeader',
  component: HangoutRoomHeader,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div className="w-[720px] max-w-full border border-border rounded-lg overflow-hidden">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HangoutRoomHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Just a room name — every other row element is conditional. */
export const TitleOnly: Story = {
  args: { channelName: '#product-design' },
};

/** A live call: people count, elapsed timer, and the joined phase chip. */
export const LiveCall: Story = {
  args: {
    channelName: '#product-design',
    subtitle: '4 people in the room',
    elapsedLabel: '12:04',
    phase: 'joined',
  },
};

/** Recording armed but not yet writing — a static grey dot, because nobody is
 *  publishing yet. */
export const RecordingArmed: Story = {
  args: {
    channelName: '#all-hands',
    subtitle: '1 person in the room',
    recording: { armed: true, active: false },
    phase: 'joining',
  },
};

/** Recording actively writing — danger tone with a pulsing dot. */
export const RecordingActive: Story = {
  args: {
    channelName: '#all-hands',
    subtitle: '23 people in the room',
    recording: { armed: true, active: true },
    elapsedLabel: '48:31',
    phase: 'joined',
  },
};

/** The network dropped — reconnecting is the only other pulsing phase. */
export const Reconnecting: Story = {
  args: { channelName: '#product-design', subtitle: '4 people in the room', phase: 'reconnecting' },
};

/** Every phase chip, for tone comparison. */
export const AllPhases: Story = {
  args: { channelName: '#product-design' },
  render: () => (
    <div className="flex flex-col">
      {PHASES.map((phase) => (
        <HangoutRoomHeader key={phase} channelName="#product-design" subtitle={phase} phase={phase} />
      ))}
    </div>
  ),
};

/** The `actions` slot takes arbitrary right-side content. */
export const WithActions: Story = {
  args: {
    channelName: '#product-design',
    subtitle: '4 people in the room',
    phase: 'joined',
    actions: (
      <>
        <Button variant="secondary" size="sm" onClick={() => console.log('roster')}>
          Roster
        </Button>
        <Button variant="ghost" size="sm" onClick={() => console.log('debug')}>
          Debug
        </Button>
      </>
    ),
  },
};

/** Long room names truncate rather than pushing the chips off the edge. */
export const LongChannelName: Story = {
  args: {
    channelName: '#engineering-platform-reliability-weekly-sync-and-retrospective',
    subtitle: '9 people in the room',
    phase: 'joined',
    elapsedLabel: '1:02:47',
  },
};
