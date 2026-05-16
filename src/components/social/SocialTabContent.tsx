// frontend/src/components/SocialTabContent.tsx
//
// Slack/Teams-style layout: collapsible sidebar sections with unread badges,
// main chat area on the right.

import { useState, useEffect, useRef, useCallback } from 'react';
import type { RoomItem } from '../../hooks/useRooms';
import type { ActivityEvent } from '../../hooks/useActivityBus';
import type { GatewayMessage } from '../../types/gateway';
import { useColorScheme } from '../../contexts/ThemeContext';
import { cn } from '../../lib/cn';

import { RoomList } from './RoomList';
import { GroupPanel } from './GroupPanel';
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
// CollapsibleSection
// ---------------------------------------------------------------------------

function CollapsibleSection({ title, count, unreadTotal, defaultOpen = true, children }: {
  title: string;
  count: number;
  unreadTotal?: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="mb-0.5">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1 w-full px-3 py-1.5 bg-transparent border-none cursor-pointer font-[inherit] text-left"
      >
        <span
          className="text-[10px] text-[#6b7280] inline-block w-3 transition-transform duration-150"
          style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}
        >
          ▶
        </span>
        <span className="text-[11px] font-bold text-text-tertiary uppercase tracking-wide flex-1">
          {title}
        </span>
        {!open && unreadTotal !== undefined && unreadTotal > 0 && (
          <span className="min-w-[18px] h-[18px] rounded-[9px] bg-danger text-white text-[10px] font-bold flex items-center justify-center px-1.5">
            {unreadTotal > 99 ? '99+' : unreadTotal}
          </span>
        )}
        <span className="text-[11px] text-[#6b7280]">{count}</span>
      </button>
      {open && children}
    </div>
  );
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
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 w-full border-none rounded-[5px] py-1.5 cursor-pointer text-[13px] text-left font-[system-ui,-apple-system,sans-serif]',
        isActive
          ? 'bg-[rgba(100,108,255,0.15)] text-[#a5b4fc] font-semibold'
          : unread > 0
            ? 'bg-transparent text-surface-hover font-semibold'
            : 'bg-transparent text-text-tertiary font-normal',
      )}
      style={{ padding: '6px 8px 6px 24px' }}
    >
      <span className={cn('text-[13px] shrink-0', isActive ? 'text-[#a5b4fc]' : 'text-[#6b7280]')}>
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
  const { theme } = useColorScheme();
  const isDark = theme === 'dark';

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

  const initials = displayName
    ? displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : userId.slice(0, 2).toUpperCase();

  const activeRoom = rooms.find(r => r.roomId === activeRoomId) ?? null;
  const channels = rooms.filter(r => r.type === 'standalone' || r.type === 'group');
  const dms = rooms.filter(r => r.type === 'dm');

  const channelUnreadTotal = channels.reduce((s, r) => s + (unreadCounts[r.roomId] ?? 0), 0);
  const dmUnreadTotal = dms.reduce((s, r) => s + (unreadCounts[r.roomId] ?? 0), 0);

  const sidebarBg = isDark ? '#1e1f2e' : '#f8fafc';
  const sidebarBorder = isDark ? 'rgba(255,255,255,0.06)' : '#e2e8f0';
  const sidebarTextPrimary = isDark ? '#fff' : '#0f172a';
  const sidebarTextSecondary = isDark ? '#94a3b8' : '#64748b';
  const chatBg = isDark ? '#0f172a' : '#fff';

  return (
    <div
      className="flex overflow-hidden rounded-lg transition-colors duration-200"
      style={{
        height: 'calc(100vh - 120px)',
        background: chatBg,
        border: `1px solid ${sidebarBorder}`,
      }}
    >
      {/* Left sidebar */}
      <div
        className="shrink-0 flex-col overflow-hidden transition-[width] duration-[180ms]"
        style={{
          width: CHAT_SIDEBAR_WIDTH,
          display: chatSidebarOpen ? 'flex' : 'none',
          borderRight: `1px solid ${sidebarBorder}`,
          background: sidebarBg,
        }}
      >
        {/* Workspace header */}
        <div
          className="flex items-center gap-2 shrink-0"
          style={{
            padding: '14px 14px 12px',
            borderBottom: `1px solid ${sidebarBorder}`,
          }}
        >
          <div className="w-7 h-7 rounded-md flex items-center justify-center text-white font-bold text-[11px] shrink-0" style={{ background: 'linear-gradient(135deg, #646cff, #9b59b6)' }}>
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-bold overflow-hidden text-ellipsis whitespace-nowrap" style={{ color: sidebarTextPrimary }}>
              {displayName || userId}
            </div>
            <div className="text-[11px] flex items-center gap-1" style={{ color: sidebarTextSecondary }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] inline-block" />
              Active
            </div>
          </div>
          <button
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
          {/* Channels section */}
          <CollapsibleSection title="Channels" count={channels.length} unreadTotal={channelUnreadTotal}>
            <div className="px-1">
              {roomsLoading && channels.length === 0 ? (
                <div className="px-6 py-2 text-xs" style={{ color: sidebarTextSecondary }}>Loading…</div>
              ) : channels.length === 0 ? (
                <div className="px-6 py-2 text-xs" style={{ color: sidebarTextSecondary }}>No channels yet</div>
              ) : (
                channels.map(room => (
                  <SidebarRoomRow
                    key={room.roomId}
                    room={room}
                    isActive={room.roomId === activeRoomId}
                    unread={unreadCounts[room.roomId] ?? 0}
                    onClick={() => wrappedHandleRoomSelect(room)}
                  />
                ))
              )}
              <button
                onClick={() => setShowNewRoom(v => !v)}
                className="flex items-center gap-1.5 w-full bg-transparent border-none cursor-pointer text-xs font-[inherit] rounded"
                style={{ padding: '5px 8px 5px 24px', color: sidebarTextSecondary }}
              >
                <span className="text-sm leading-none">+</span> Add channel
              </button>
              {showNewRoom && (
                <div className="px-2">
                  <RoomList
                    idToken={idToken}
                    rooms={[]}
                    createRoom={createRoom}
                    createDM={createDM}
                    loading={roomsLoading}
                    error={roomsError}
                    onRetry={onRoomsRetry}
                    onRoomSelect={wrappedHandleRoomSelect}
                    activeRoomId={activeRoomId}
                    compact
                  />
                </div>
              )}
            </div>
          </CollapsibleSection>

          {/* Direct Messages section */}
          <CollapsibleSection title="Direct Messages" count={dms.length} unreadTotal={dmUnreadTotal}>
            <div className="px-1">
              {dms.length === 0 ? (
                <div className="px-6 py-2 text-xs" style={{ color: sidebarTextSecondary }}>No conversations yet</div>
              ) : (
                dms.map(room => (
                  <SidebarRoomRow
                    key={room.roomId}
                    room={room}
                    isActive={room.roomId === activeRoomId}
                    unread={unreadCounts[room.roomId] ?? 0}
                    onClick={() => wrappedHandleRoomSelect(room)}
                  />
                ))
              )}
            </div>
          </CollapsibleSection>

          {/* Groups section */}
          <CollapsibleSection title="Groups" count={0} defaultOpen={false}>
            <GroupPanel
              idToken={idToken}
              rooms={rooms}
              createGroupRoom={createGroupRoom}
              onRoomSelect={wrappedHandleRoomSelect}
              roomsLoading={roomsLoading}
              compact
            />
          </CollapsibleSection>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Toggle bar when sidebar is collapsed */}
        {!chatSidebarOpen && (
          <div
            className="flex items-center gap-2"
            style={{ padding: '6px 12px', borderBottom: `1px solid ${sidebarBorder}` }}
          >
            <button
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
