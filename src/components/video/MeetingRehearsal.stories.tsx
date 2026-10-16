import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { createMeetingLoopback } from '@connorhoehn/realtime-modules/meeting';
import { SegmentedControl } from '../shared/SegmentedControl';
import { RehearsalSeat, createRehearsalChat } from './MeetingRehearsal.kit';

// Three people in one real meeting (the server runs in the page). Switch whose
// screen you see; everyone stays connected, so raise a hand as Ada and watch
// the queue as Rowan, or open rooms as Rowan and follow Bram into his.

const PEOPLE = [
  { userId: 'u-rowan', displayName: 'Rowan Ellery' },
  { userId: 'u-ada', displayName: 'Ada Lindqvist' },
  { userId: 'u-bram', displayName: 'Bram Okonjo' },
];

function Rehearsal() {
  const [loop] = useState(() => createMeetingLoopback());
  const [chat] = useState(() => createRehearsalChat());
  const [viewer, setViewer] = useState('u-rowan');
  useEffect(() => () => loop.dispose(), [loop]);
  return (
    <div className="flex w-full flex-col gap-3">
      {/* The viewer switch is story chrome; on a phone it scrolls inside its own row. */}
      <div className="max-w-full overflow-x-auto">
      <SegmentedControl
        aria-label="Viewing as"
        value={viewer}
        onChange={setViewer}
        options={PEOPLE.map((p, i) => ({ value: p.userId, label: i === 0 ? `${p.displayName.split(' ')[0]} (organizer)` : p.displayName.split(' ')[0]! }))}
      />
      </div>
      {/* Rowan mounts first, so he subscribes first and organizes. */}
      {PEOPLE.map((p) => (
        <RehearsalSeat key={p.userId} loop={loop} chat={chat} person={p} people={PEOPLE} hidden={p.userId !== viewer} />
      ))}
    </div>
  );
}

const meta = { title: 'Video/MeetingRehearsal (live bindings)', parameters: { layout: 'fullscreen' } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

/** The real service and hook, wired only through the public bindings. */
export const ThreePeople: Story = { render: () => <Rehearsal /> };
