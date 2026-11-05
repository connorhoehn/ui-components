// frontend/src/components/SocialTabContent.tsx
//
// Slack/Teams-style layout: collapsible sidebar sections with unread badges,
// main chat area on the right.

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import type { RoomItem } from '../../hooks/useRooms';
import type { ActivityEvent } from '../../hooks/useActivityBus';
import type { GatewayMessage } from '../../types/gateway';
import { cn } from '../../lib/cn';

import { NewConversationPanel } from './NewConversationPanel';
import { useFriends } from '../../hooks/useFriends';
import { ConversationList, type ConversationItem } from './ConversationList';
import { ChatRoom } from './ChatRoom';

type OnMessageFn = (handler: (msg: GatewayMessage) => void) => () => void;

export interface SocialTabContentProps {
  userId: string;
  displayName: string;
  userEmail: string;
  connectionState: string;
  idToken: string | null;
  rooms: RoomItem[];
  createRoom: (name: string) => Promise<void>;
  createDM: (targetUserId: string) => Promise<void>;
  createGroupRoom: (groupId: string, name: string) => Promise<void>;
  roomsLoading: boolean;
  roomsError?: string | null;
  onRoomsRetry?: () => void;
  handleRoomSelect: (room: RoomItem) => void;
  activeRoomId: string | null;
  activityEvents: ActivityEvent[];
  onMessage: OnMessageFn;
}

// ---------------------------------------------------------------------------
// SidebarRoomRow (with unread badge)
// ---------------------------------------------------------------------------

function SidebarRoomRow({ room, isActive, unread, onClick }: {
  room: RoomItem;
  isActive: boolean;
  unread: number;
  onClick: () => void;
}) {
  return (
    <button
      data-ui-part=""
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 w-full border-none rounded-[5px] pt-1.5 pb-1.5 pr-2 pl-6 cursor-pointer text-[13px] text-left font-[system-ui,-apple-system,sans-serif]',
        isActive
          ? 'bg-primary/15 text-primary font-semibold'
          : unread > 0
            // `text-surface-hover` is a SURFACE token: this painted the label
            // of every unread room in the sidebar's own background colour, so
            // the rooms with something new in them were the only unreadable
            // rows in the list.
            ? 'bg-transparent text-text-primary font-semibold'
            : 'bg-transparent text-text-tertiary font-normal',
      )}
    >
      <span className={cn('text-[13px] shrink-0', isActive ? 'text-primary' : 'text-text-secondary')}>
        {room.type === 'dm' ? '●' : '#'}
      </span>
      <span className="overflow-hidden text-ellipsis whitespace-nowrap flex-1">
        {room.name}
      </span>
      {unread > 0 && !isActive && (
        <span className="min-w-[18px] h-[18px] rounded-[9px] bg-danger text-white text-[10px] font-bold flex items-center justify-center px-1.5 shrink-0">
          {unread > 99 ? '99+' : unread}
        </span>
      )}
    </button>
  );
}

// ---------------------------------------------------------------------------
// SocialTabContent (exported)
// ---------------------------------------------------------------------------

export default function SocialTabContent({
  userId,
  displayName,
  idToken,
  rooms,
  createRoom,
  createDM,
  createGroupRoom,
  roomsLoading,
  roomsError,
  onRoomsRetry,
  handleRoomSelect,
  activeRoomId,
  onMessage,
}: SocialTabContentProps) {

  // ---- Sidebar collapse ----
  const [chatSidebarOpen, setChatSidebarOpen] = useState(true);
  const CHAT_SIDEBAR_WIDTH = chatSidebarOpen ? 240 : 0;

  // ---- Unread tracking ----
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
  const activeRoomIdRef = useRef(activeRoomId);
  useEffect(() => { activeRoomIdRef.current = activeRoomId; }, [activeRoomId]);

  // Clear unread when selecting a room
  const wrappedHandleRoomSelect = useCallback((room: RoomItem) => {
    setUnreadCounts(prev => {
      if (!prev[room.roomId]) return prev;
      const next = { ...prev };
      delete next[room.roomId];
      return next;
    });
    handleRoomSelect(room);
  }, [handleRoomSelect]);

  // Listen for incoming post events and increment unread
  useEffect(() => {
    const unregister = onMessage((msg: GatewayMessage) => {
      if (msg.type === 'social:post') {
        const payload = ((msg as Record<string, unknown>).payload ?? msg) as Record<string, unknown>;
        const roomId = payload.roomId as string | undefined;
        if (roomId && roomId !== activeRoomIdRef.current) {
          setUnreadCounts(prev => ({ ...prev, [roomId]: (prev[roomId] ?? 0) + 1 }));
        }
      }
    });
    return unregister;
  }, [onMessage]);

  // ---- Sidebar state ----
  const [showNewRoom, setShowNewRoom] = useState(false);
  const [creatingConversation, setCreatingConversation] = useState(false);
  // The people you can DM. Read here rather than inside the panel so the panel
  // stays presentational and testable without a network stub.
  const { friends, loadError: friendsError } = useFriends({ idToken });

  const initials = displayName
    ? displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : userId.slice(0, 2).toUpperCase();

  const activeRoom = rooms.find(r => r.roomId === activeRoomId) ?? null;
  const channels = rooms.filter(r => r.type === 'standalone' || r.type === 'group');
  const dms = rooms.filter(r => r.type === 'dm');

  // One list, channels first — a DM is a conversation with one peer, a channel
  // is a conversation with a name. `ConversationList` keys and selects on
  // `channel`, and selection here is by ROOM, so the roomId is what travels.
  const conversations: ConversationItem[] = useMemo(
    () => [
      ...channels.map((r) => ({
        channel: r.roomId,
        kind: 'channel' as const,
        name: r.name,
        peers: [],
        unreadCount: unreadCounts[r.roomId] ?? 0,
      })),
      ...dms.map((r) => ({
        channel: r.roomId,
        kind: 'dm' as const,
        // The room's name IS the peer's name for a DM; there is no separate
        // peer record to read here, and inventing an empty one would render a
        // row with an avatar and no label.
        peers: [{ userId: r.dmPeerUserId ?? r.roomId, displayName: r.name }],
        unreadCount: unreadCounts[r.roomId] ?? 0,
      })),
    ],
    [channels, dms, unreadCounts],
  );

  const handleConversationSelect = useCallback(
    (roomId: string) => {
      const room = rooms.find((r) => r.roomId === roomId);
      if (room) wrappedHandleRoomSelect(room);
    },
    [rooms, wrappedHandleRoomSelect],
  );

  // Surfaces are TOKEN-driven, not branched on the React theme context.
  //
  // The old branch had two failure modes. (1) It read `useColorScheme()`,
  // which returns the context DEFAULT ('light') for any host that stamps
  // `data-theme` itself without mounting our <ColorSchemeProvider> — so the
  // panel rendered white inside a dark app. (2) Its dark arm used
  // `var(--color-text-primary)` as a BACKGROUND, which only ever "worked"
  // because that token was dark in the light palette; with a real dark
  // palette (v2.105.0) the same token is light, so the surface inverted.
  //
  // Reading the tokens directly fixes both: they resolve light or dark from
  // whichever `[data-theme]` scope the component is rendered in, with no
  // provider requirement and no possible inversion.
  const sidebarBg = 'var(--color-surface-panel)';
  const sidebarBorder = 'var(--color-border)';
  const sidebarTextPrimary = 'var(--color-text-primary)';
  const sidebarTextSecondary = 'var(--color-text-secondary)';
  const chatBg = 'var(--color-surface)';

  return (
    <div
      className="flex overflow-hidden rounded-lg transition-colors duration-200 h-[calc(100vh-120px)]"
      style={{
        background: chatBg,
        border: `1px solid ${sidebarBorder}`,
      }}
    >
      {/* Left sidebar */}
      <div
        className={cn('shrink-0 flex-col overflow-hidden transition-[width] duration-[180ms]', chatSidebarOpen ? 'flex' : 'hidden')}
        style={{
          width: CHAT_SIDEBAR_WIDTH,
          borderRight: `1px solid ${sidebarBorder}`,
          background: sidebarBg,
        }}
      >
        {/* Workspace header */}
        <div
          className="flex items-center gap-2 shrink-0 px-[14px] pt-[14px] pb-3"
          style={{ borderBottom: `1px solid ${sidebarBorder}` }}
        >
          <div className="w-7 h-7 rounded-md flex items-center justify-center text-white font-bold text-[11px] shrink-0 bg-[linear-gradient(135deg,#646cff,#9b59b6)]">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-bold overflow-hidden text-ellipsis whitespace-nowrap" style={{ color: sidebarTextPrimary }}>
              {displayName || userId}
            </div>
            <div className="text-[11px] flex items-center gap-1" style={{ color: sidebarTextSecondary }}>
              <span className="w-1.5 h-1.5 rounded-full bg-success inline-block" />
              Active
            </div>
          </div>
          <button
            data-ui-part=""
            onClick={() => setChatSidebarOpen(false)}
            title="Collapse sidebar"
            className="bg-transparent border-none cursor-pointer text-base leading-none px-1 py-0.5 rounded"
            style={{ color: sidebarTextSecondary }}
          >
            «
          </button>
        </div>

        {/* Scrollable sections */}
        <div className="flex-1 overflow-y-auto pt-2">
          {/* ONE conversation list.

              Channels, group chats and DMs were three sections with three
              separate "new" affordances — and "Add channel" opened a nested
              RoomList carrying its own "+ New Room" and "+ New DM", so the
              sidebar offered three ways to create a thing the server calls one
              thing: a room, with `type: 'standalone' | 'group' | 'dm'`.

              Group rooms already sat in `channels` here, so a group IS a
              channel in this list — nothing had to be collapsed away.

              A channel identifies itself by name and a #, a DM by its peer.
              That is a row-rendering detail, not a reason for separate
              sections. */}
          <div className="px-1 pt-1">
            {roomsLoading && conversations.length === 0 ? (
              <div className="px-2 py-2 text-xs" style={{ color: sidebarTextSecondary }}>Loading…</div>
            ) : roomsError && conversations.length === 0 ? (
              /* An empty list drawn from a request that never succeeded would
                 state the user belongs to nothing — a claim the failed fetch
                 cannot support. */
              <div role="alert" data-testid="conversations-error" className="px-2 py-2 text-xs text-danger-fg">
                Couldn&rsquo;t load conversations
              </div>
            ) : (
              <ConversationList
                items={conversations}
                activeChannel={activeRoomId ?? null}
                onSelect={handleConversationSelect}
                onNewChat={() => setShowNewRoom(v => !v)}
                emptyLabel="No conversations yet"
                data-testid="social-conversations"
              />
            )}

            {/* One way to start a conversation, opened by the list's single
                "+". This used to be a RoomList in compact mode, which rendered
                a "Room name / Create" form AND a friends dropdown with "Open
                DM" — two always-visible forms, both usually half-disabled,
                demanding you decide what KIND of thing you wanted before you
                could type anything. */}
            {showNewRoom && (
              <div className="px-1 pt-1.5">
                <NewConversationPanel
                  people={friends.map((f) => ({
                    userId: f.userId,
                    displayName: f.displayName,
                    avatarUrl: f.avatarUrl,
                  }))}
                  peopleError={friendsError}
                  busy={creatingConversation}
                  onCancel={() => setShowNewRoom(false)}
                  onStartDm={async (userId) => {
                    setCreatingConversation(true);
                    try {
                      await createDM(userId);
                      setShowNewRoom(false);
                    } finally {
                      setCreatingConversation(false);
                    }
                  }}
                  onCreateChannel={async (name) => {
                    setCreatingConversation(true);
                    try {
                      await createRoom(name);
                      setShowNewRoom(false);
                    } finally {
                      setCreatingConversation(false);
                    }
                  }}
                />
              </div>
            )}
          </div>

          {/* Groups used to have its own section here, listing a separate
              `useGroups` fetch beside the conversation list. It was removed:
              group rooms already appear in the list above (a group room is a
              room with `type: 'group'`), so the section was a second, partial
              view of conversations the user could already see — and when its
              endpoint 404s it reported "Couldn't load groups" about something
              that was never missing.

              Group MEMBERSHIP administration is a real feature and a different
              screen; it does not belong in a conversation switcher. */}
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Toggle bar when sidebar is collapsed */}
        {!chatSidebarOpen && (
          <div
            className="flex items-center gap-2 px-3 py-1.5"
            style={{ borderBottom: `1px solid ${sidebarBorder}` }}
          >
            <button
              data-ui-part=""
              onClick={() => setChatSidebarOpen(true)}
              title="Expand sidebar"
              className="bg-transparent rounded cursor-pointer text-sm px-2 py-0.5 font-[inherit]"
              style={{ border: `1px solid ${sidebarBorder}`, color: sidebarTextSecondary }}
            >
              »
            </button>
            {activeRoom && (
              <span className="text-[13px] font-semibold" style={{ color: sidebarTextPrimary }}>
                {activeRoom.type === 'dm' ? '●' : '#'} {activeRoom.name}
              </span>
            )}
          </div>
        )}
        <div className="flex-1 min-h-0">
          {activeRoom ? (
            <ChatRoom
              key={activeRoom.roomId}
              idToken={idToken}
              roomId={activeRoom.roomId}
              roomName={activeRoom.name}
              onMessage={onMessage}
            />
          ) : (
            <div
              className="h-full flex flex-col items-center justify-center gap-2"
              style={{ color: sidebarTextSecondary }}
            >
              <span className="text-4xl">💬</span>
              <span className="text-[15px] font-semibold" style={{ color: sidebarTextPrimary }}>Select a room to start chatting</span>
              <span className="text-[13px]">Choose a channel or DM from the sidebar</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
