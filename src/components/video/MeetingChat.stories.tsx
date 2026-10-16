import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ChatPanel } from '../social/ChatPanel';
import type { ChatMessage } from '../../hooks/useChat';
import { useMeetingChat, type RMMeetingSource } from '../../integrations/realtime/meeting';

// Announcements live in the meeting chat (2.466.0). An organizer, rooms open:
// the "To" switch sits above the composer; announcements show in the thread,
// marked, in the main chat and every room's chat.

const T0 = Date.parse('2026-10-16T15:00:00Z');
const at = (min: number) => new Date(T0 + min * 60_000).toISOString();

function source(announce: (m: string) => void, announcement: RMMeetingSource['breakout']['announcement']): RMMeetingSource {
  return {
    ready: true, isOrganizer: true, hands: [], myHandPosition: null,
    toggleHand() {}, lowerHand() {}, lowerAllHands() {},
    breakout: {
      phase: 'open', mode: 'assigned', returned: [], endsAt: null, announcement, settings: { allowReturnToMain: true },
      rooms: [{ id: 'mara', name: "Mara's Room", state: 'open', members: [] }, { id: 'theo', name: "Theo's Room", state: 'open', members: [] }],
    },
    myRoom: null, state: { announcement }, error: null,
    configureBreakouts() {}, assign() {}, autoAssign() {}, openRooms() {}, closeRooms() {}, setTimer() {}, broadcast: announce,
    joinRoom() {}, returnToMain() {}, endBreakouts() {}, dismissAnnouncement() {},
  };
}

function OrganizerChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'm1', clientId: 'c1', userId: 'u-ada', displayName: 'Ada Lindqvist', content: 'Which prompt are we using for the rooms?', timestamp: at(0) },
    { id: 'm2', clientId: 'c2', userId: 'u-me', displayName: 'Rowan Ellery', content: 'The onboarding one. Pick one idea to bring back.', timestamp: at(1) },
  ]);
  const [announcement, setAnnouncement] = useState<RMMeetingSource['breakout']['announcement']>(
    { message: 'Five minutes left: pick one idea to share back.', fromUserId: 'u-me', fromDisplayName: 'Rowan Ellery', at: at(2) },
  );
  const meeting = source((m) => setAnnouncement({ message: m, fromUserId: 'u-me', fromDisplayName: 'Rowan Ellery', at: new Date().toISOString() }), announcement);
  const chat = useMeetingChat(meeting, {
    send: (content) => setMessages((list) => [...list, { id: `m${list.length + 1}`, clientId: 'c2', userId: 'u-me', displayName: 'Rowan Ellery', content, timestamp: new Date().toISOString() }]),
  });
  return (
    <div className="flex h-[560px] w-full max-w-[380px] flex-col border border-border bg-surface">
      <ChatPanel messages={chat.withAnnouncements(messages)} currentUserId="u-me" onSend={chat.onSend} renderMessageReferences={chat.renderMessageReferences} dock={chat.dock} fill />
    </div>
  );
}

const meta = { title: 'Video/MeetingChat (announcements)' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

/** Organizer with rooms open: To This chat | All rooms; an announcement in the thread. */
export const OrganizerRoomsOpen: Story = { render: () => <OrganizerChat /> };
