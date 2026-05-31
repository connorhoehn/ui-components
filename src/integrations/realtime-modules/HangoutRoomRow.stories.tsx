// src/integrations/realtime-modules/HangoutRoomRow.stories.tsx
//
// Demonstrates HangoutRoomRow across its occupancy states: empty, self-only
// (pulse badge), small group (≤3 avatars + count), and a larger group with
// avatar overflow.

import type { Meta, StoryObj } from '@storybook/react-vite';
import { HangoutRoomRow } from './HangoutRoomRow';
import type { RMRoomOccupancy } from './types';

const meta = {
  title: 'Integrations/HangoutRoomRow',
  component: HangoutRoomRow,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A single row in the sidebar "Rooms" section. Renders #-icon · name · ' +
          'PresenceAvatars · count Badge. Active highlight is derived from whether ' +
          'the local `participantId` is in the occupancy `members` list.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '18rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HangoutRoomRow>;

export default meta;
type Story = StoryObj<typeof meta>;

function occ(slug: string, members: { participantId: string; displayName?: string; userId?: string }[]): RMRoomOccupancy {
  return {
    slug,
    count: members.length,
    members: members.map((m) => ({
      participantId: m.participantId,
      userId: m.userId ?? m.participantId,
      displayName: m.displayName,
    })),
  };
}

export const EmptyRoom: Story = {
  name: 'Empty room (count = 0)',
  args: {
    slug: 'general',
    name: 'general',
    occupancy: occ('general', []),
  },
};

export const JustYou: Story = {
  name: 'Just you (pulse badge)',
  args: {
    slug: 'general',
    name: 'general',
    participantId: 'p-self',
    occupancy: occ('general', [{ participantId: 'p-self', displayName: 'You' }]),
  },
};

export const SmallGroup: Story = {
  name: 'Small group (3 members, you included)',
  args: {
    slug: 'design-review',
    name: 'design-review',
    participantId: 'p-self',
    occupancy: occ('design-review', [
      { participantId: 'p-self', displayName: 'You' },
      { participantId: 'p-bob', displayName: 'Bob' },
      { participantId: 'p-carol', displayName: 'Carol' },
    ]),
  },
};

export const LargerGroup: Story = {
  name: 'Larger group (6 members, overflow badge)',
  args: {
    slug: 'standup',
    name: 'standup',
    participantId: 'p-self',
    occupancy: occ('standup', [
      { participantId: 'p-self', displayName: 'You' },
      { participantId: 'p-bob', displayName: 'Bob' },
      { participantId: 'p-carol', displayName: 'Carol' },
      { participantId: 'p-dave', displayName: 'Dave' },
      { participantId: 'p-eve', displayName: 'Eve' },
      { participantId: 'p-frank', displayName: 'Frank' },
    ]),
  },
};

export const ObserverView: Story = {
  name: 'Observer view (someone else is in the room)',
  args: {
    slug: 'incident-room',
    name: 'incident-room',
    // No participantId — local user is not in any room.
    occupancy: occ('incident-room', [
      { participantId: 'p-oncall', displayName: 'OnCall' },
    ]),
  },
};

export const NoOccupancyYet: Story = {
  name: 'No occupancy snapshot yet (loading)',
  args: {
    slug: 'general',
    name: 'general',
    occupancy: null,
  },
};
