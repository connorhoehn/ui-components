import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { RosterPanel, type RosterParticipant } from './RosterPanel';
import { Button } from '../ui/Button';

const PEOPLE: RosterParticipant[] = [
  { id: 'me', displayName: 'Morgan Reyes', isLocal: true, isMuted: true },
  { id: 'alice', displayName: 'Alice Johnson' },
  { id: 'bob', displayName: 'Bob Smith', isMuted: true },
  { id: 'cai', displayName: 'Cai Lund', isScreenSharing: true },
  { id: 'dee', displayName: 'Dee Okafor', handRaised: true, isMuted: true },
  { id: 'eli', displayName: 'Eli Marsh' },
];

const meta = {
  title: 'Video/RosterPanel',
  component: RosterPanel,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="h-[420px] flex border border-border rounded-lg overflow-hidden">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RosterPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The full vocabulary in one list: local "(you)" suffix, mute glyph,
 *  screen-share dot, raised hand, and an active speaker ring. */
export const Populated: Story = {
  args: { participants: PEOPLE, activeSpeakerId: 'alice' },
};

/** Nobody but you. */
export const JustYou: Story = {
  args: { participants: [PEOPLE[0]!] },
};

/** Rows are only interactive when `onParticipantClick` is supplied — without
 *  it every row renders as a disabled button with a default cursor. */
export const Clickable: Story = {
  args: { participants: PEOPLE },
  render: (args) => {
    const [speaker, setSpeaker] = useState<string | null>('alice');
    return (
      <RosterPanel
        {...args}
        activeSpeakerId={speaker}
        onParticipantClick={setSpeaker}
        title="Click to spotlight"
      />
    );
  },
};

/** `count` overrides the header number — use it when the panel is showing a
 *  paginated slice of a much larger call. */
export const TruncatedWithTotalCount: Story = {
  args: { participants: PEOPLE.slice(0, 3), count: 47, title: 'In this call' },
};

/** The `footer` slot takes arbitrary content — typically an invite action. */
export const WithFooterAction: Story = {
  args: {
    participants: PEOPLE,
    activeSpeakerId: 'cai',
    footer: (
      <Button variant="secondary" size="sm" onClick={() => console.log('invite')}>
        + Add people
      </Button>
    ),
  },
};

/** Empty roster — header still renders with a zero count. */
export const Empty: Story = {
  args: { participants: [] },
};

/** The People pane's hands queue (organizer view): raised hands sort to the
 *  top in queue order, each with Lower, and Lower all hands in the header. */
export const RaisedHandsQueue: Story = {
  args: { participants: PEOPLE },
  render: (args) => {
    const [hands, setHands] = useState<string[]>(['eli', 'bob', 'alice']);
    const participants = args.participants.map((p) => {
      const at = hands.indexOf(p.id);
      return { ...p, handRaised: at >= 0 ? at + 1 : undefined };
    });
    return (
      <RosterPanel
        {...args}
        participants={participants}
        title="People"
        raisedHandsFirst
        onLowerHand={(id) => setHands((h) => h.filter((x) => x !== id))}
        onLowerAllHands={() => setHands([])}
      />
    );
  },
};

/** A host's roster: Ana is view-only (the chip), and every other row has a ⋯
 *  menu from `rowMenu` to change who can publish. */
export const ViewOnlyWithRowMenu: Story = {
  args: { participants: PEOPLE },
  render: (args) => {
    const [viewOnly, setViewOnly] = useState<string[]>(['alice']);
    const participants = args.participants.map((p) => (viewOnly.includes(p.id) ? { ...p, access: 'view-only' as const } : p));
    return (
      <RosterPanel
        {...args}
        participants={participants}
        rowMenu={(p) =>
          p.isLocal
            ? null
            : [{
                label: 'Camera and microphone',
                items: [p.access === 'view-only'
                  ? { label: 'Allow publishing', onSelect: () => setViewOnly((ids) => ids.filter((id) => id !== p.id)) }
                  : { label: 'Make view-only', danger: true, onSelect: () => setViewOnly((ids) => [...ids, p.id]) }],
              }]
        }
      />
    );
  },
};

/** The same on dark call chrome (`tone="dark"`). */
export const ViewOnlyDark: Story = {
  args: {
    participants: PEOPLE.map((p) => (p.id === 'alice' ? { ...p, access: 'view-only' as const } : p)),
    tone: 'dark',
    rowMenu: (p) => (p.isLocal ? null : [{ items: [{ label: 'Make view-only', onSelect: () => {} }] }]),
  },
};
