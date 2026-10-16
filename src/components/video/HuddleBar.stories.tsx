import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../ui/Button';
import { ChatIcon } from '../ui/Icons';
import { Inline } from '../ui/Stack';
import { PresenceDot } from '../shared/PresenceDot';
import { T } from '../shared/Text';
import { HuddleBar } from './HuddleBar';
import { MeetingHandIcon, MeetingReactIcon, MeetingRoomsIcon } from './MeetingIcons';
import { ReactionPicker } from './ReactionOverlay';

const meta = {
  title: 'Video/HuddleBar',
  component: HuddleBar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof HuddleBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A shell footer's left group, so the bar's type can be compared against it. */
function FooterRow({ children }: { children: React.ReactNode }) {
  return (
    <Inline gap="md" align="center" justify="between" wrap={false} className="min-h-11 border-t border-border bg-surface px-4 py-1">
      <Inline gap="sm" align="center" wrap={false}>
        <Button variant="ghost" size="sm"><Inline gap="xs" align="center" wrap={false}><ChatIcon size={16} />Messages</Inline></Button>
        <PresenceDot state="offline" pulse={false} size="sm" />
        <T size="xs" tone="secondary">0 online</T>
      </Inline>
      {children}
    </Inline>
  );
}

/** Idle beside the footer's left group: one row, one size, one weight scale. */
export const IdleInFooter: Story = {
  args: { name: 'No huddle here', phase: 'idle', onStart: () => {}, onToggleChat: () => {}, chatLabel: 'Message', className: 'min-w-0 flex-1 border-l border-border' },
  render: (args) => <FooterRow><HuddleBar {...args} /></FooterRow>,
};

export const LiveInFooter: Story = {
  args: { name: 'Standup huddle', phase: 'live', startedAt: Date.now() - 125000, participantCount: 3, onToggleChat: () => {}, onLeave: () => {}, className: 'min-w-0 flex-1 border-l border-border' },
  render: (args) => <FooterRow><HuddleBar {...args} /></FooterRow>,
};

/**
 * A live huddle that is also a meeting (2.475.0): Raise (pressed, second in
 * line), React (opens the picker) and Rooms (two rooms open) from the same
 * items `meetingToolbarItems` builds for `MeetingToolbar`.
 */
export const LiveWithMeeting: Story = {
  args: {
    name: 'Design review',
    phase: 'live',
    startedAt: Date.now() - 754000,
    participantCount: 9,
    onToggleChat: () => {},
    onLeave: () => {},
    className: 'min-w-0 flex-1 border-l border-border',
    meetingItems: [
      { id: 'raise', label: 'Lower', title: 'Lower your hand (2 in line)', icon: <MeetingHandIcon />, pressed: true, onClick: () => {} },
      { id: 'react', label: 'React', icon: <MeetingReactIcon />, popoverLabel: 'Send a reaction', popover: (close) => <ReactionPicker tone="surface" onReact={() => close()} /> },
      { id: 'rooms', label: 'Rooms', icon: <MeetingRoomsIcon />, badge: 2, onClick: () => {} },
    ],
  },
  render: (args) => <FooterRow><HuddleBar {...args} /></FooterRow>,
};

