// frontend/src/components/SocialTabContent.tsx
//
// Slack/Teams-style layout: collapsible sidebar sections with unread badges,
// main chat area on the right.

import { useState, useEffect, useRef, useCallback } from 'react';
import type { RoomItem } from '../../hooks/useRooms';
import type { ActivityEvent } from '../../hooks/useActivityBus';
import type { GatewayMessage } from '../../types/gateway';
import { useTheme } from '../../contexts/ThemeContext';

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
    <div style={{ marginBottom: 2 }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          display: 'flex', alignItems: 'center', gap: 4,
          width: '100%', padding: '6px 12px',
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'inherit', textAlign: 'left',
        }}
      >
        <span style={{
          fontSize: 10, color: '#6b7280', transition: 'transform 150ms',
          transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
          display: 'inline-block', width: 12,
        }}>
          ▶
        </span>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', flex: 1 }}>
          {title}
        </span>
        {!open && unreadTotal !== undefined && unreadTotal > 0 && (
          <span style={{
            minWidth: 18, height: 18, borderRadius: 9,
            background: '#dc2626', color: '#fff',
            fontSize: 10, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '0 5px',
          }}>
            {unreadTotal > 99 ? '99+' : unreadTotal}
          </span>
        )}
        <span style={{ fontSize: 11, color: '#6b7280' }}>{count}</span>
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
      style={{
        display: 'flex', alignItems: 'center', gap: 6,
        width: '100%', border: 'none', borderRadius: 5,
        padding: '6px 8px 6px 24px', cursor: 'pointer',
        background: isActive ? 'rgba(100, 108, 255, 0.15)' : 'transparent',
        color: isActive ? '#a5b4fc' : unread > 0 ? '#f1f5f9' : '#94a3b8',
        fontWeight: isActive || unread > 0 ? 600 : 400,
        fontSize: 13, textAlign: 'left',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <span style={{ color: isActive ? '#a5b4fc' : '#6b7280', fontSize: 13, flexShrink: 0 }}>
        {room.type === 'dm' ? '●' : '#'}
      </span>
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
        {room.name}
      </span>
      {unread > 0 && !isActive && (
        <span style={{
          minWidth: 18, height: 18, borderRadius: 9,
          background: '#dc2626', color: '#fff',
          fontSize: 10, fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '0 5px', flexShrink: 0,
        }}>
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
  const { theme } = useTheme();
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
    <div style={{
      display: 'flex',
      height: 'calc(100vh - 120px)',
      background: chatBg,
      borderRadius: 8,
      border: `1px solid ${sidebarBorder}`,
      overflow: 'hidden',
      transition: 'background 200ms ease',
    }}>
      {/* ── Left sidebar ──────────────────────────────────────────────────── */}
      <div style={{
        width: CHAT_SIDEBAR_WIDTH, flexShrink: 0,
        display: chatSidebarOpen ? 'flex' : 'none', flexDirection: 'column',
        borderRight: `1px solid ${sidebarBorder}`,
        background: sidebarBg,
        overflow: 'hidden',
        transition: 'width 180ms ease',
      }}>
        {/* Workspace header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '14px 14px 12px',
          borderBottom: `1px solid ${sidebarBorder}`,
          flexShrink: 0,
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 6,
            background: 'linear-gradient(135deg, #646cff, #9b59b6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 700, fontSize: 11, flexShrink: 0,
          }}>
            {initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: sidebarTextPrimary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {displayName || userId}
            </div>
            <div style={{ fontSize: 11, color: sidebarTextSecondary, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
              Active
            </div>
          </div>
          <button
            onClick={() => setChatSidebarOpen(false)}
            title="Collapse sidebar"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: sidebarTextSecondary, fontSize: 16, lineHeight: 1,
              padding: '2px 4px', borderRadius: 4,
            }}
          >
            «
          </button>
        </div>

        {/* Scrollable sections */}
        <div style={{ flex: 1, overflowY: 'auto', paddingTop: 8 }}>
          {/* Channels section */}
          <CollapsibleSection title="Channels" count={channels.length} unreadTotal={channelUnreadTotal}>
            <div style={{ padding: '0 4px' }}>
              {roomsLoading && channels.length === 0 ? (
                <div style={{ padding: '8px 24px', color: sidebarTextSecondary, fontSize: 12 }}>Loading…</div>
              ) : channels.length === 0 ? (
                <div style={{ padding: '8px 24px', color: sidebarTextSecondary, fontSize: 12 }}>No channels yet</div>
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
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  width: '100%', padding: '5px 8px 5px 24px',
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: 12, color: sidebarTextSecondary, fontFamily: 'inherit',
                  borderRadius: 4,
                }}
              >
                <span style={{ fontSize: 14, lineHeight: 1 }}>+</span> Add channel
              </button>
              {showNewRoom && (
                <div style={{ padding: '0 8px' }}>
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
            <div style={{ padding: '0 4px' }}>
              {dms.length === 0 ? (
                <div style={{ padding: '8px 24px', color: sidebarTextSecondary, fontSize: 12 }}>No conversations yet</div>
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

      {/* ── Main chat area ────────────────────────────────────────────────── */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Toggle bar when sidebar is collapsed */}
        {!chatSidebarOpen && (
          <div style={{
            padding: '6px 12px', borderBottom: `1px solid ${sidebarBorder}`,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <button
              onClick={() => setChatSidebarOpen(true)}
              title="Expand sidebar"
              style={{
                background: 'none', border: `1px solid ${sidebarBorder}`,
                borderRadius: 4, cursor: 'pointer',
                color: sidebarTextSecondary, fontSize: 14, padding: '2px 8px',
                fontFamily: 'inherit',
              }}
            >
              »
            </button>
            {activeRoom && (
              <span style={{ fontSize: 13, fontWeight: 600, color: sidebarTextPrimary }}>
                {activeRoom.type === 'dm' ? '●' : '#'} {activeRoom.name}
              </span>
            )}
          </div>
        )}
        <div style={{ flex: 1, minHeight: 0 }}>
          {activeRoom ? (
            <ChatRoom
              key={activeRoom.roomId}
              idToken={idToken}
              roomId={activeRoom.roomId}
              roomName={activeRoom.name}
              onMessage={onMessage}
            />
          ) : (
            <div style={{
              height: '100%', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              color: sidebarTextSecondary, gap: 8,
            }}>
              <span style={{ fontSize: 36 }}>💬</span>
              <span style={{ fontSize: 15, fontWeight: 600, color: sidebarTextPrimary }}>Select a room to start chatting</span>
              <span style={{ fontSize: 13 }}>Choose a channel or DM from the sidebar</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
