import type { Meta, StoryObj } from '@storybook/react-vite';
import { BreakoutRoomsPanel, type BreakoutRoomView } from './BreakoutRoomsPanel';

const PEOPLE = ['Esme Tanaka', 'Felix Moreau', 'Gus Halvorsen', 'Hana Ruiz', 'Iris Achebe', 'Jonah Petrov'];
const ROOMS: BreakoutRoomView[] = [
  { id: 'mara', name: "Mara's Room", state: 'open', members: [{ id: 'p1', name: PEOPLE[0]!, handRaised: 1 }, { id: 'p2', name: PEOPLE[1]! }] },
  { id: 'theo', name: "Theo's Room", state: 'open', members: [{ id: 'p3', name: PEOPLE[2]! }] },
  ...[1, 2, 3, 4, 5].map((n) => ({ id: `r${n}`, name: `Room ${n}`, state: 'open' as const, members: [] })),
];

const meta = {
  title: 'Video/BreakoutRoomsPanel',
  component: BreakoutRoomsPanel,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div className="flex h-[640px] w-full max-w-[360px] overflow-hidden rounded-lg border border-border"><Story /></div>],
} satisfies Meta<typeof BreakoutRoomsPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

/** What a participant sees in the reference: seven open rooms, each with Join. */
export const ParticipantSelfSelect: Story = {
  args: { rooms: ROOMS, phase: 'open', mode: 'self-select', onJoin: () => {}, onClose: () => {} },
};

/** In a room you were assigned to, with returning allowed. */
export const ParticipantInRoom: Story = {
  args: { rooms: ROOMS, phase: 'open', mode: 'assigned', myRoomId: 'theo', onReturnToMain: () => {}, onClose: () => {} },
};

/** Organizer before any rooms exist. */
export const OrganizerCreate: Story = {
  args: { rooms: [], phase: 'none', mode: 'assigned', isOrganizer: true, onCreateRooms: () => {}, onClose: () => {} },
};

/** Organizer with rooms drafted and people still to place. */
export const OrganizerDraft: Story = {
  args: {
    rooms: ROOMS.slice(0, 3).map((r) => ({ ...r, state: 'closed' as const })),
    phase: 'draft', mode: 'assigned', isOrganizer: true,
    unassigned: [{ id: 'p4', name: PEOPLE[3]! }, { id: 'p5', name: PEOPLE[4]!, handRaised: 2 }],
    onOpenRooms: () => {}, onCloseRooms: () => {}, onAutoAssign: () => {}, onAssign: () => {}, onEnd: () => {}, onDeleteRooms: () => {}, onSetTimer: () => {}, onRenameRoom: () => {}, onAddRoom: () => {}, onClose: () => {},
  },
};

/** Organizer with rooms open, a timer running and the broadcast box. */
export const OrganizerOpen: Story = {
  args: {
    rooms: ROOMS.slice(0, 3), phase: 'open', mode: 'assigned', isOrganizer: true,
    endsAt: new Date(Date.now() + 9 * 60_000).toISOString(),
    onOpenRooms: () => {}, onCloseRooms: () => {}, onAutoAssign: () => {}, onAssign: () => {}, onEnd: () => {}, onSetTimer: () => {}, onBroadcast: () => {}, onRenameRoom: () => {}, onAddRoom: () => {}, onClose: () => {},
  },
};

/** The organizer closed the rooms with a closing grace configured: the
 *  countdown replaces the timer, with Close now and Keep rooms open. */
export const OrganizerClosing: Story = {
  args: {
    ...OrganizerOpen.args,
    closing: true,
    endsAt: new Date(Date.now() + 30_000).toISOString(),
  },
};
