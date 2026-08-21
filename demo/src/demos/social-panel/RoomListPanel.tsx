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
    <div className="w-55 bg-surface border border-border rounded-lg flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="py-3 px-4 border-b border-border font-semibold text-[13px] text-neutral uppercase tracking-[0.05em]"
      >
        Channels
      </div>

      {/* Room list */}
      <div className="flex-[1] py-2 px-0">
        {rooms.map((room) => (
          <div className={`py-2 px-4 flex items-center justify-between cursor-pointer transition-[all] ${activeRoom === room.id ? 'bg-surface-hover border-l-3 border-primary' : 'bg-transparent border-l-3 border-transparent'}`}
            key={room.id}
            onClick={() => setActiveRoom(room.id)}
          >
            <span className="text-[14px] text-text-primary">
              <span className="text-text-tertiary mr-1">{room.icon}</span>
              {room.name}
            </span>
            <span className="text-[11px] text-neutral bg-surface-hover py-[2px] px-[6px] rounded-lg"
            >
              {room.online}
            </span>
          </div>
        ))}
      </div>

      {/* Join indicator */}
      {joinIndicator && (
        <div className="py-2 px-4 border-t border-border text-[11px] text-success-fg flex items-center gap-[6px]"
        >
          <span className="w-[6px] h-[6px] rounded-full bg-success"
          />
          {joinIndicator} joined
        </div>
      )}
    </div>
  );
}
