import { useState, useEffect } from 'react';
import { useWebSocketContext } from '@/contexts/WebSocketContext';
import type { GatewayMessage } from '@/types/gateway';

interface Room {
  id: string;
  name: string;
  icon: string;
  online: number;
}

const initialRooms: Room[] = [
  { id: 'general', name: 'general', icon: '#', online: 4 },
  { id: 'feed', name: 'feed', icon: '#', online: 2 },
  { id: 'random', name: 'random', icon: '#', online: 3 },
];

export function RoomListPanel() {
  const { onMessage } = useWebSocketContext();
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [activeRoom, setActiveRoom] = useState('general');
  const [joinIndicator, setJoinIndicator] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onMessage((msg: GatewayMessage) => {
      if (msg.type === 'presence' && msg.action === 'joined') {
        const channel = (msg.channel as string) || 'general';
        setRooms((prev) =>
          prev.map((r) =>
            r.id === channel ? { ...r, online: r.online + 1 } : r
          )
        );
        setJoinIndicator(msg.displayName as string);
        setTimeout(() => setJoinIndicator(null), 3000);
      }
    });

    return unsubscribe;
  }, [onMessage]);

  return (
    <div
      style={{
        width: 220,
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '12px 16px',
          borderBottom: '1px solid #e2e8f0',
          fontWeight: 600,
          fontSize: 13,
          color: '#64748b',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        Channels
      </div>

      {/* Room list */}
      <div style={{ flex: 1, padding: '8px 0' }}>
        {rooms.map((room) => (
          <div
            key={room.id}
            onClick={() => setActiveRoom(room.id)}
            style={{
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              background: activeRoom === room.id ? '#f1f5f9' : 'transparent',
              borderLeft:
                activeRoom === room.id ? '3px solid #6366f1' : '3px solid transparent',
              transition: 'all 0.15s ease',
            }}
          >
            <span style={{ fontSize: 14, color: '#1a1a2e' }}>
              <span style={{ color: '#94a3b8', marginRight: 4 }}>{room.icon}</span>
              {room.name}
            </span>
            <span
              style={{
                fontSize: 11,
                color: '#64748b',
                background: '#f1f5f9',
                padding: '2px 6px',
                borderRadius: 8,
              }}
            >
              {room.online}
            </span>
          </div>
        ))}
      </div>

      {/* Join indicator */}
      {joinIndicator && (
        <div
          style={{
            padding: '8px 16px',
            borderTop: '1px solid #e2e8f0',
            fontSize: 11,
            color: '#10b981',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#10b981',
            }}
          />
          {joinIndicator} joined
        </div>
      )}
    </div>
  );
}
