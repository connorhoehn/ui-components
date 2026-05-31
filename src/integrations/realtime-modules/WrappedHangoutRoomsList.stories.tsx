// src/integrations/realtime-modules/WrappedHangoutRoomsList.stories.tsx
//
// Demonstrates WrappedHangoutRoomsList wired to a mocked
// useHangoutRooms() return value. Covers the four states the task
// acceptance criteria call out:
//
//   - Empty       — hook returned but rooms[] is []
//   - Loading     — hook is fetching the initial list
//   - Populated   — multiple rooms with various occupancy counts
//   - One room full of self — self-participant pulse case

import type { Meta, StoryObj } from '@storybook/react-vite';
import { WrappedHangoutRoomsList } from './WrappedHangoutRoomsList';
import type {
  RMRoom,
  RMRoomOccupancy,
  RMUseHangoutRoomsReturn,
} from './types';

const ORG = 'demo-org';
const SELF_PARTICIPANT_ID = 'p-self-001';

function room(overrides: Partial<RMRoom>): RMRoom {
  return {
    orgId: ORG,
    roomId: overrides.slug ?? 'room-x',
    slug: overrides.slug ?? 'room-x',
    name: overrides.name ?? 'Room',
    createdBy: 'user-alice',
    createdAt: '2026-05-30T10:00:00.000Z',
    visibility: 'org',
    settings: { audioOnly: false, recordingEnabled: false, softCap: 25 },
    state: 'active',
    lastActiveAt: '2026-05-30T10:00:00.000Z',
    ...overrides,
  };
}

const noopAsync = async () => {};
const failCreate = async (): Promise<RMRoom> => {
  throw new Error('createRoom not wired in story');
};
const failJoin = async () => {
  throw new Error('joinRoom not wired in story');
};

function makeHook(
  rooms: RMRoom[],
  overrides: Partial<RMUseHangoutRoomsReturn> = {},
): RMUseHangoutRoomsReturn {
  return {
    rooms,
    isLoading: false,
    error: null,
    refetch: noopAsync,
    createRoom: failCreate,
    archiveRoom: noopAsync,
    joinRoom: failJoin,
    ...overrides,
  };
}

// ── Populated rooms ─────────────────────────────────────────────────────

const populatedRooms: RMRoom[] = [
  room({ slug: 'general', name: 'General', roomId: 'r-general' }),
  room({ slug: 'design-jam', name: 'Design Jam', roomId: 'r-design-jam' }),
  room({ slug: 'pairing', name: 'Pairing', roomId: 'r-pairing' }),
  room({ slug: 'water-cooler', name: 'Water Cooler', roomId: 'r-water-cooler' }),
];

// Static occupancy lookup — mirrors the legacy `occupancyFor` path.
function makeOccupancyFor(
  table: Record<string, RMRoomOccupancy>,
): (slug: string) => RMRoomOccupancy | null {
  return (slug) => table[slug] ?? null;
}

const populatedOccupancy = makeOccupancyFor({
  general: {
    slug: 'general',
    count: 3,
    members: [
      { userId: 'u-alice', displayName: 'Alice', participantId: 'p-alice' },
      { userId: 'u-bob', displayName: 'Bob', participantId: 'p-bob' },
      { userId: 'u-carol', displayName: 'Carol', participantId: 'p-carol' },
    ],
  },
  'design-jam': {
    slug: 'design-jam',
    count: 1,
    members: [
      { userId: 'u-dave', displayName: 'Dave', participantId: 'p-dave' },
    ],
  },
  // pairing + water-cooler intentionally empty
});

// Self-only occupancy — one room contains just the local participant.
const selfOnlyOccupancy = makeOccupancyFor({
  pairing: {
    slug: 'pairing',
    count: 1,
    members: [
      {
        userId: 'u-self',
        displayName: 'You',
        participantId: SELF_PARTICIPANT_ID,
      },
    ],
  },
});

// ── Story meta ──────────────────────────────────────────────────────────

const meta = {
  title: 'Integrations/WrappedHangoutRoomsList',
  component: WrappedHangoutRoomsList,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'HangoutRoomsSection pre-wired to a `useHangoutRooms()` hook ' +
          'return from realtime-modules. Auto-forwards the live ' +
          '`subscribeRoomsIndex` occupancy adapter and translates row ' +
          'clicks to a `(slug)` callback. Includes a `renderEmpty` slot ' +
          'for hosts that want full control of the empty case.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[280px] border border-border rounded-md bg-surface p-2">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WrappedHangoutRoomsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    hangoutRooms: makeHook([]),
    onJoin: (slug: string) => console.log('join', slug),
  },
};

export const Loading: Story = {
  args: {
    hangoutRooms: makeHook([], { isLoading: true }),
  },
};

export const Populated: Story = {
  args: {
    hangoutRooms: makeHook(populatedRooms),
    occupancyFor: populatedOccupancy,
    participantId: SELF_PARTICIPANT_ID,
    onJoin: (slug: string) => console.log('join', slug),
  },
};

export const OneRoomFullOfSelf: Story = {
  name: 'One room — just you',
  args: {
    hangoutRooms: makeHook(populatedRooms),
    occupancyFor: selfOnlyOccupancy,
    participantId: SELF_PARTICIPANT_ID,
    onJoin: (slug: string) => console.log('join', slug),
  },
};

export const ErrorState: Story = {
  name: 'Error (refetch CTA)',
  args: {
    hangoutRooms: makeHook([], {
      error: new Error("Couldn't reach gateway"),
    }),
  },
};

export const EmptyWithRenderSlot: Story = {
  name: 'Empty + renderEmpty slot',
  args: {
    hangoutRooms: makeHook([]),
    renderEmpty: (
      <div className="p-4 text-sm text-text-secondary border border-dashed border-border rounded-md text-center">
        Your team hasn't created any rooms yet. <br />
        <span className="text-text-tertiary text-xs">
          (custom renderEmpty slot)
        </span>
      </div>
    ),
  },
};
