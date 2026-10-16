// Wiring rehearsal (goal G11, 2.468.0): the whole meeting screen built ONLY
// from the public bindings over the real `useMeeting` and a real
// MeetingService (realtime-modules `createMeetingLoopback`), so what an app
// pastes is what is exercised here. Two stand-ins are labelled as such: a
// tiny in-memory chat store (the app has `useChat`) and room membership
// standing in for LVS lobby membership (the app's call lists the people in
// its current lobby). Not exported from any barrel: the story and the
// integration test import it. The story runs the real `useMeeting`; the
// vitest test passes `useMeetingHook`, because realtime-modules' CommonJS
// dist loads its own sibling React under vitest (Storybook dedupes it).

import { useMemo, useState, useSyncExternalStore } from 'react';
import { breakoutRoomFor, useMeeting } from '@connorhoehn/realtime-modules/client/meeting';
import type { MeetingLoopback } from '@connorhoehn/realtime-modules/meeting';
import type { ChatMessage } from '../../hooks/useChat';
import { ChatPanel } from '../social/ChatPanel';
import { T } from '../shared/Text';
import {
  WrappedBreakoutRoomBanner,
  WrappedBreakoutRoomsPanel,
  meetingRosterProps,
  meetingToolbarItems,
  useMeetingChat,
  withMeetingHands,
  type RMMeetingPerson,
  type RMMeetingSource,
} from '../../integrations/realtime/meeting';
import { HangoutGrid } from './HangoutGrid';
import { MeetingToolbar } from './MeetingToolbar';
import { RosterPanel } from './RosterPanel';

export const REHEARSAL_MEETING = 'rehearsal:weekly-sync';

/** Stand-in for the app's chat service: messages per channel, shared by every seat. */
export function createRehearsalChat() {
  const byChannel = new Map<string, ChatMessage[]>();
  const listeners = new Set<() => void>();
  const EMPTY: ChatMessage[] = [];
  return {
    list: (channel: string | null) => (channel ? byChannel.get(channel) ?? EMPTY : EMPTY),
    post(channel: string, msg: ChatMessage) {
      byChannel.set(channel, [...(byChannel.get(channel) ?? []), msg]);
      listeners.forEach((l) => l());
    },
    subscribe(l: () => void) { listeners.add(l); return () => { listeners.delete(l); }; },
  };
}
export type RehearsalChat = ReturnType<typeof createRehearsalChat>;

type Pane = 'rooms' | 'people' | 'chat' | null;

/** What the seat needs from a meeting hook: the bindings' source plus the chat to read. */
export type RehearsalMeeting = RMMeetingSource & { activeChat: string | null };
export type RehearsalMeetingHook = (meetingId: string, opts: { socket: ReturnType<MeetingLoopback['socketFor']> }) => RehearsalMeeting;

export function RehearsalSeat({
  loop, chat, person, people, hidden, useMeetingHook = useMeeting,
}: { loop: MeetingLoopback; chat: RehearsalChat; person: RMMeetingPerson; people: RMMeetingPerson[]; hidden?: boolean; useMeetingHook?: RehearsalMeetingHook }) {
  const socket = useMemo(() => loop.socketFor(`c-${person.userId}`, person.userId, person.displayName), [loop, person.userId, person.displayName]);
  const meeting = useMeetingHook(REHEARSAL_MEETING, { socket });
  const [pane, setPane] = useState<Pane>('rooms');
  const channel = meeting.activeChat;
  const messages = useSyncExternalStore(chat.subscribe, () => chat.list(channel));
  const bound = useMeetingChat(meeting, {
    send: (content) => {
      if (channel) chat.post(channel, { id: `${Date.now()}-${person.userId}`, clientId: `c-${person.userId}`, userId: person.userId, displayName: person.displayName, content, timestamp: new Date().toISOString() });
    },
  });
  const toggle = (p: Pane) => setPane((cur) => (cur === p ? null : p));
  const items = meetingToolbarItems(meeting, {
    roomsOpen: pane === 'rooms', onToggleRooms: () => toggle('rooms'), onReact: () => {},
    chat: { open: pane === 'chat', onToggle: () => toggle('chat') },
    people: { open: pane === 'people', onToggle: () => toggle('people'), count: people.length },
  });
  // Stand-in for LVS: the tiles are the people in the same lobby as you.
  const mine = breakoutRoomFor(meeting.breakout, person.userId);
  const here = people.filter((p) => breakoutRoomFor(meeting.breakout, p.userId) === mine);
  const tiles = withMeetingHands(here.map((p) => ({ id: p.userId, displayName: p.displayName, isMuted: true, isLocal: p.userId === person.userId })), meeting);
  const roster = people.map((p) => ({ id: p.userId, displayName: p.displayName, isLocal: p.userId === person.userId }));

  return (
    <section hidden={hidden} aria-label={`${person.displayName}'s screen`} data-testid={`seat-${person.userId}`} className="flex h-[720px] w-full flex-col bg-surface">
      <MeetingToolbar
        compact={false}
        start={<T size="sm" tone="secondary">Viewing as {person.displayName}{meeting.isOrganizer ? ' (organizer)' : ''}</T>}
        items={[items.chat!, items.people!, items.raise, items.react!, items.rooms]}
        onLeave={() => {}}
      />
      <WrappedBreakoutRoomBanner meeting={meeting} />
      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <div className="min-h-0 min-w-0 flex-1 p-3">
          <HangoutGrid participants={tiles} fillParent className="h-full" />
        </div>
        {pane && (
          <div className="flex max-h-[55%] w-full shrink-0 flex-col overflow-y-auto border-t border-border md:max-h-none md:w-[22rem] md:border-l md:border-t-0" data-testid={`seat-${person.userId}-pane`}>
            {pane === 'rooms' && <WrappedBreakoutRoomsPanel meeting={meeting} people={people} onClose={() => setPane(null)} />}
            {pane === 'people' && <RosterPanel {...meetingRosterProps(meeting, roster)} />}
            {pane === 'chat' && (
              <ChatPanel messages={bound.withAnnouncements(messages)} currentUserId={person.userId} onSend={bound.onSend} renderMessageReferences={bound.renderMessageReferences} dock={bound.dock} fill />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
