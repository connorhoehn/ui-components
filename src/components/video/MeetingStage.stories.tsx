// The whole reference picture composed from library parts: the meeting bar,
// the consent notice over a 3-column grid with raised hands and an active
// speaker, and the Rooms pane docked on the right. A visual contract, not a
// component — there is no `MeetingStage` export.

import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { MeetingToolbar } from './MeetingToolbar';
import { MeetingStatusCluster } from './MeetingStatusCluster';
import { RecordingConsentNotice } from './RecordingConsentNotice';
import { HangoutGrid } from './HangoutGrid';
import { BreakoutRoomsPanel, type BreakoutRoomView } from './BreakoutRoomsPanel';
import { BreakoutRoomBanner } from './BreakoutRoomBanner';
import './MeetingStage.stories.css';
import { meetingToolbarItems, type RMMeetingSource } from '../../integrations/realtime/meeting';
import { MeetingShareIcon, MeetingViewIcon } from './MeetingIcons';
import { MicOffIcon, VideoOffIcon } from './MediaIcons';
import type { HangoutLayoutParticipant } from './HangoutLayoutTypes';

const NAMES = ['Ada Lindqvist', 'Bram Okonjo', 'Rowan Ellery', 'Cleo Navarro', 'Dario Fenwick', 'Esme Tanaka', 'Felix Moreau', 'Gus Halvorsen', 'Hana Ruiz', 'Iris Achebe', 'Jonah Petrov', 'Kofi Mensah', 'Lena Sorensen', 'Milo Varga'];
const PEOPLE: HangoutLayoutParticipant[] = NAMES.map((displayName, i) => ({
  id: `p${i}`, displayName, isMuted: i !== 13, handRaised: i === 5 ? 1 : i === 8 ? 2 : undefined,
}));
const ROOMS: BreakoutRoomView[] = [
  { id: 'mara', name: "Mara's Room", state: 'open', members: [] },
  { id: 'theo', name: "Theo's Room", state: 'open', members: [] },
  ...[1, 2, 3, 4, 5].map((n) => ({ id: `r${n}`, name: `Room ${n}`, state: 'open' as const, members: [] })),
];

/** A static meeting source for the picture: the toolbar comes from the bindings, as an app's would. */
function stubMeeting(hand: boolean, setHand: (v: boolean) => void): RMMeetingSource {
  return {
    ready: true, isOrganizer: false, hands: hand ? [{ userId: 'me', displayName: 'Morgan Reyes', raisedAt: '2026-10-16T12:00:00Z' }] : [],
    myHandPosition: hand ? 1 : null, toggleHand: () => setHand(!hand), lowerHand() {}, lowerAllHands() {},
    breakout: { phase: 'open', mode: 'self-select', rooms: [], returned: [], endsAt: null, announcement: null, settings: { allowReturnToMain: true } },
    myRoom: null, state: { announcement: null }, error: null,
    configureBreakouts() {}, assign() {}, autoAssign() {}, openRooms() {}, closeRooms() {}, setTimer() {}, broadcast() {},
    joinRoom() {}, returnToMain() {}, endBreakouts() {}, dismissAnnouncement() {},
  };
}

function Stage({ inRoom }: { inRoom?: boolean }) {
  const [rooms, setRooms] = useState(true);
  const [consent, setConsent] = useState(true);
  const [hand, setHand] = useState(false);
  const bound = meetingToolbarItems(stubMeeting(hand, setHand), {
    roomsOpen: rooms, onToggleRooms: () => setRooms((v) => !v), onReact: () => {},
    chat: { open: false, onToggle: () => {} },
    people: { open: false, onToggle: () => {}, count: 15 },
  });
  return (
    <div className="flex h-[760px] w-full flex-col bg-surface">
      <MeetingToolbar
        start={<MeetingStatusCluster recording={{ armed: true, active: true }} elapsedMs={(32 * 60 + 52) * 1000} onOpenOptions={() => {}} />}
        items={[
          bound.chat!,
          bound.people!,
          bound.raise,
          bound.react!,
          { id: 'view', label: 'View', icon: <MeetingViewIcon />, priority: 'secondary', onClick: () => {} },
          bound.rooms,
        ]}
        media={[
          { id: 'camera', label: 'Camera', icon: <VideoOffIcon />, tone: 'off', onClick: () => {}, menu: [{ items: [{ label: 'FaceTime HD Camera', checked: true }] }] },
          { id: 'mic', label: 'Mic', icon: <MicOffIcon />, tone: 'off', onClick: () => {}, menu: [{ items: [{ label: 'MacBook Pro Microphone', checked: true }] }] },
          { id: 'share', label: 'Share', icon: <MeetingShareIcon />, priority: 'secondary', onClick: () => {} },
        ]}
        onLeave={() => {}}
      />
      {inRoom && (
        <BreakoutRoomBanner
          roomName="Room 2"
          endsAt={new Date(Date.now() + 4 * 60_000).toISOString()}
          announcement={{ message: 'Five minutes left — pick one idea to share back.', fromDisplayName: 'Rowan Ellery' }}
          onDismissAnnouncement={() => {}}
          onReturnToMain={() => {}}
        />
      )}
      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <div className="relative min-h-0 min-w-0 flex-1 p-3">
          <RecordingConsentNotice open={consent} kind="both" startedBy="Rowan Ellery-Castellanos" privacyHref="#privacy" onDismiss={() => setConsent(false)} />
          <HangoutGrid participants={PEOPLE} localParticipant={{ id: 'me', displayName: 'Morgan Reyes', isLocal: true, isMuted: true }} activeSpeakerId="p13" fillParent className="h-full" />
        </div>
        {rooms && (
          <div className="max-h-[50%] w-full shrink-0 overflow-y-auto border-t border-border md:max-h-none md:w-[22rem] md:border-l md:border-t-0">
            <BreakoutRoomsPanel rooms={ROOMS} phase="open" mode="self-select" onJoin={() => {}} onClose={() => setRooms(false)} />
          </div>
        )}
      </div>
    </div>
  );
}

const meta = {
  title: 'Video/MeetingStage (composition)',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** The reference: main meeting, Rooms pane open, consent notice showing. */
export const MainMeeting: Story = { render: () => <Stage /> };

/** Inside a breakout room: the banner with countdown and announcement. */
export const InBreakoutRoom: Story = { render: () => <Stage inRoom /> };

/**
 * The same stage under another app's brand (teal, like the Assessment
 * tenant): the toolbar's active underline, pressed Raise, focus ring and the
 * consent link follow `--color-primary`; hands stay warning amber.
 */
export const TealBrand: Story = {
  render: () => (
    <div className="meeting-story-teal">
      <Stage />
    </div>
  ),
};
