// src/integrations/realtime-modules/HangoutRoomsSection.stories.tsx
//
// Demonstrates HangoutRoomsSection across its load/error/empty/populated
// states. Each story mocks a useHangoutRooms() return without touching the
// gateway, so the section renders the corresponding UI branch.

import type { Meta, StoryObj } from '@storybook/react-vite';
import { HangoutRoomsSection } from './HangoutRoomsSection';
import type {
  RMRoom,
  RMRoomOccupancy,
  RMUseHangoutRoomsReturn,
} from './types';

const noopAsync = async () => {};

function makeRoom(slug: string, name: string, overrides: Partial<RMRoom> = {}): RMRoom {
  return {
    orgId: 'org-1',
    roomId: `room-${slug}`,
    slug,
    name,
    createdBy: 'u-admin',
    createdAt: new Date(Date.now() - 7 * 86_400_000).toISOString(),
    visibility: 'org',
    settings: { audioOnly: false, recordingEnabled: false, softCap: 12 },
    state: 'active',
    lastActiveAt: new Date(Date.now() - 60_000).toISOString(),
    ...overrides,
  };
}

function makeRooms(rooms: RMRoom[], overrides: Partial<RMUseHangoutRoomsReturn> = {}): RMUseHangoutRoomsReturn {
  return {
    rooms,
    isLoading: false,
    error: null,
    refetch: noopAsync,
    createRoom: async () => rooms[0] ?? makeRoom('new', 'new'),
    archiveRoom: noopAsync,
    joinRoom: async () => ({
      room: rooms[0] ?? makeRoom('new', 'new'),
      sessionId: 'session-x',
      token: 'token-x',
      participantId: 'p-self',
    }),
    ...overrides,
  };
}

function occ(slug: string, count: number): RMRoomOccupancy {
  return {
    slug,
    count,
    members: Array.from({ length: count }, (_, i) => ({
      participantId: `p-${slug}-${i}`,
      userId: `u-${slug}-${i}`,
      displayName: `User ${i + 1}`,
    })),
  };
}

const meta = {
  title: 'Integrations/HangoutRoomsSection',
  component: HangoutRoomsSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The full "Rooms" sidebar group. Composes a `SidebarSection` header + ' +
          'N `HangoutRoomRow`s + a built-in `NewHangoutRoomDialog`. Renders loading ' +
          'skeletons, an error retry banner, or an EmptyState as appropriate.',
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
} satisfies Meta<typeof HangoutRoomsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {
  args: {
    rooms: makeRooms([], { isLoading: true }),
  },
};

export const ErrorState: Story = {
  name: 'Error (retry banner)',
  args: {
    rooms: makeRooms([], { error: new Error('Network unavailable') }),
  },
};

export const Empty: Story = {
  name: 'Empty (no rooms yet)',
  args: {
    rooms: makeRooms([]),
  },
};

export const FourRooms: Story = {
  name: '4 rooms with mixed occupancy',
  args: {
    rooms: makeRooms([
      makeRoom('general', 'general'),
      makeRoom('design', 'design'),
      makeRoom('standup', 'standup'),
      makeRoom('incidents', 'incidents'),
    ]),
    participantId: 'p-self',
    occupancyFor: (slug) => {
      switch (slug) {
        case 'general': return occ('general', 0);
        case 'design': return occ('design', 1);
        case 'standup': return occ('standup', 4);
        case 'incidents': return occ('incidents', 6);
        default: return null;
      }
    },
  },
};

export const OverflowBrowseAll: Story = {
  name: 'Overflow (Browse all link)',
  args: {
    rooms: makeRooms(
      Array.from({ length: 14 }, (_, i) =>
        makeRoom(`room-${i + 1}`, `room ${i + 1}`),
      ),
    ),
    maxVisible: 6,
    participantId: 'p-self',
    occupancyFor: () => null,
  },
};
