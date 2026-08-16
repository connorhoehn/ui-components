import { useState, useEffect, useCallback, useRef } from 'react';
import { SimulatedProvider } from '../../engine/SimulatedProvider';
import { useWebSocketContext } from '@/contexts/WebSocketContext';
import type { GatewayMessage } from '@/types/gateway';
import { collaborationTimeline } from './simulation';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CursorState {
  userId: string;
  displayName: string;
  color: string;
  x: number;
  y: number;
  reaction?: { emoji: string; expiresAt: number };
  selection?: { startX: number; startY: number; endX: number; endY: number };
}

interface PresenceUser {
  userId: string;
  displayName: string;
  color: string;
  isTyping: boolean;
  lastSeen: number;
}

interface ActivityEntry {
  id: string;
  userId: string;
  displayName: string;
  color: string;
  action: string;
  timestamp: number;
}

interface FloatingReaction {
  id: string;
  emoji: string;
  x: number;
  y: number;
  createdAt: number;
}

// ---------------------------------------------------------------------------
// Main page (inner, consumes WebSocket context)
// ---------------------------------------------------------------------------

function CollaborationCanvas() {
  const { onMessage } = useWebSocketContext();
  const [cursors, setCursors] = useState<Record<string, CursorState>>({});
  const [presenceUsers, setPresenceUsers] = useState<Record<string, PresenceUser>>({});
  const [activity, setActivity] = useState<ActivityEntry[]>([]);
  const [floatingReactions, setFloatingReactions] = useState<FloatingReaction[]>([]);
  const [docText] = useState(
    'The quick brown fox jumps over the lazy dog. This is a shared document that multiple users are editing simultaneously. Cursor positions and selections are broadcast in real-time via WebSocket.'
  );

  useEffect(() => {
    const unsubscribe = onMessage((msg: GatewayMessage) => {
      // Presence events
      if (msg.type === 'presence') {
        const userId = msg.userId as string;
        if (msg.action === 'joined') {
          setPresenceUsers(prev => ({
            ...prev,
            [userId]: {
              userId,
              displayName: msg.displayName as string,
              color: msg.color as string,
              isTyping: false,
              lastSeen: Date.now(),
            },
          }));
          addActivity(userId, msg.displayName as string, msg.color as string, 'joined the session');
        }
        if (msg.action === 'typing') {
          setPresenceUsers(prev => {
            const existing = prev[userId];
            if (!existing) return prev;
            return { ...prev, [userId]: { ...existing, isTyping: msg.isTyping as boolean } };
          });
        }
        if (msg.action === 'left') {
          setPresenceUsers(prev => {
            const copy = { ...prev };
            const name = copy[userId]?.displayName;
            const color = copy[userId]?.color;
            delete copy[userId];
            if (name) addActivity(userId, name, color || '#94a3b8', 'left the session');
            return copy;
          });
        }
      }

      // Cursor events
      if (msg.type === 'cursor') {
        const userId = msg.userId as string;
        if (msg.action === 'joined') {
          const pos = msg.position as { x: number; y: number };
          setCursors(prev => ({
            ...prev,
            [userId]: {
              userId,
              displayName: msg.displayName as string,
              color: msg.color as string,
              x: pos.x,
              y: pos.y,
            },
          }));
        }
        if (msg.action === 'moved') {
          const pos = msg.position as { x: number; y: number };
          setCursors(prev => {
            const existing = prev[userId];
            if (!existing) return prev;
            return { ...prev, [userId]: { ...existing, x: pos.x, y: pos.y } };
          });
        }
        if (msg.action === 'selection') {
          const selection = msg.selection as { startX: number; startY: number; endX: number; endY: number };
          setCursors(prev => {
            const existing = prev[userId];
            if (!existing) return prev;
            return { ...prev, [userId]: { ...existing, selection } };
          });
        }
        if (msg.action === 'selection.cleared') {
          setCursors(prev => {
            const existing = prev[userId];
            if (!existing) return prev;
            return { ...prev, [userId]: { ...existing, selection: undefined } };
          });
        }
      }

      // Reaction events
      if (msg.type === 'reaction') {
        const userId = msg.userId as string;
        const emoji = msg.emoji as string;
        if (msg.action === 'cursor.reaction') {
          const duration = (msg.duration as number) || 2000;
          setCursors(prev => {
            const existing = prev[userId];
            if (!existing) return prev;
            return { ...prev, [userId]: { ...existing, reaction: { emoji, expiresAt: Date.now() + duration } } };
          });
          setFloatingReactions(prev => [...prev, {
            id: crypto.randomUUID(),
            emoji,
            x: 10 + Math.random() * 80,
            y: 0,
            createdAt: Date.now(),
          }]);
        }
        if (msg.action === 'sent') {
          setFloatingReactions(prev => [...prev, {
            id: crypto.randomUUID(),
            emoji,
            x: 10 + Math.random() * 80,
            y: 0,
            createdAt: Date.now(),
          }]);
          const name = (msg.displayName as string) || presenceUsers[userId]?.displayName || userId;
          const color = (msg.color as string) || presenceUsers[userId]?.color || '#94a3b8';
          addActivity(userId, name, color, `reacted ${emoji}`);
        }
      }

      // Activity events
      if (msg.type === 'activity') {
        const userId = msg.userId as string;
        const name = (msg.displayName as string) || 'Unknown';
        const color = (msg.color as string) || '#94a3b8';
        const action = msg.action as string;
        addActivity(userId, name, color, action);
      }
    });
    return unsubscribe;
  }, [onMessage]);

  // Clear expired cursor reactions
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setCursors(prev => {
        let changed = false;
        const next = { ...prev };
        for (const key of Object.keys(next)) {
          if (next[key].reaction && next[key].reaction!.expiresAt < now) {
            next[key] = { ...next[key], reaction: undefined };
            changed = true;
          }
        }
        return changed ? next : prev;
      });
      setFloatingReactions(prev => prev.filter(r => Date.now() - r.createdAt < 3000));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  function addActivity(userId: string, displayName: string, color: string, action: string) {
    setActivity(prev => [{
      id: crypto.randomUUID(),
      userId,
      displayName,
      color,
      action,
      timestamp: Date.now(),
    }, ...prev].slice(0, 30));
  }

  return (
    <div className="flex h-full bg-surface-panel">
      {/* Main canvas area */}
      <div className="flex-[1] flex flex-col min-w-0">
        {/* Header */}
        <div className="py-3 px-5 bg-text-primary shrink-0 flex items-center gap-4">
          <h1 className="m-0 text-[15px] font-bold text-surface-hover">
            Real-time Collaboration
          </h1>
          <span className="text-[12px] text-[#64748b]">
            {Object.keys(presenceUsers).length + 1} users online
          </span>
          {/* Avatar stack */}
          <div className="flex items-center ml-auto">
            <div style={{ ...avatarStyle('#6366f1'), zIndex: 10 }}>You</div>
            {Object.values(presenceUsers).slice(0, 5).map((u, i) => (
              <div key={u.userId} style={{ ...avatarStyle(u.color), marginLeft: -8, zIndex: 9 - i }}>
                {u.displayName.charAt(0)}
              </div>
            ))}
            {Object.keys(presenceUsers).length > 5 && (
              <span className="ml-[6px] text-[11px] text-text-tertiary">
                +{Object.keys(presenceUsers).length - 5}
              </span>
            )}
          </div>
        </div>

        {/* Canvas with cursors */}
        <div className="flex-[1] relative overflow-hidden">
          {/* Dot grid background */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }} />

          {/* Document area */}
          <div className="absolute top-10 left-10 right-10 bg-surface rounded-lg border border-border p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            <div className="text-[11px] text-text-tertiary mb-3 uppercase tracking-[0.5px] font-semibold">
              Shared Document
            </div>
            <p style={{ fontFamily: 'Georgia, serif', fontSize: 15, lineHeight: 1.8, color: '#1e293b', margin: 0 }}>
              {docText}
            </p>
          </div>

          {/* Selections */}
          {Object.values(cursors).map(cursor =>
            cursor.selection && (
              <div
                key={`sel-${cursor.userId}`}
                style={{
                  position: 'absolute',
                  left: cursor.selection.startX,
                  top: cursor.selection.startY,
                  width: cursor.selection.endX - cursor.selection.startX,
                  height: cursor.selection.endY - cursor.selection.startY,
                  background: `${cursor.color}20`,
                  border: `2px solid ${cursor.color}60`,
                  borderRadius: 3,
                  pointerEvents: 'none',
                }}
              />
            )
          )}

          {/* Cursors */}
          {Object.values(cursors).map(cursor => (
            <div
              key={cursor.userId}
              style={{
                position: 'absolute',
                left: cursor.x,
                top: cursor.y,
                transition: 'left 0.15s ease-out, top 0.15s ease-out',
                pointerEvents: 'none',
                zIndex: 20,
              }}
            >
              <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                <path
                  d="M1 1L1 15.5L5.5 11.5L9 19L12 17.5L8.5 10.5L14 10L1 1Z"
                  fill={cursor.color}
                  stroke="#fff"
                  strokeWidth="1.5"
                />
              </svg>
              <div style={{
                position: 'absolute',
                top: 18,
                left: 10,
                background: cursor.color,
                color: '#fff',
                fontSize: 10,
                fontWeight: 600,
                padding: '2px 6px',
                borderRadius: 3,
                whiteSpace: 'nowrap',
                boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
              }}>
                {cursor.displayName}
              </div>
              {cursor.reaction && (
                <div className="absolute top-[-26px] left-1 text-[20px] animate-[cursorReactionPop_0.3s_ease-out]">
                  {cursor.reaction.emoji}
                </div>
              )}
            </div>
          ))}

          {/* Floating reactions */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {floatingReactions.map(r => (
              <span
                key={r.id}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: `${r.x}%`,
                  fontSize: 24,
                  animation: 'floatUp 3s ease-out forwards',
                  opacity: 0,
                }}
              >
                {r.emoji}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right sidebar */}
      <div className="w-65 border-l border-border flex flex-col bg-surface">
        {/* Presence panel */}
        <div className="p-4 border-b border-border">
          <div className="text-[11px] font-bold text-[#64748b] mb-[10px] uppercase tracking-[0.5px]">
            Online
          </div>
          {/* Local user */}
          <div className="flex items-center gap-2 py-1 px-0 text-[12px]">
            <div style={presenceAvatarStyle('#6366f1')}>Y</div>
            <span className="text-[#374151] font-medium">You</span>
          </div>
          {Object.values(presenceUsers).map(u => (
            <div className="flex items-center gap-2 py-1 px-0 text-[12px]" key={u.userId}>
              <div style={presenceAvatarStyle(u.color)}>{u.displayName.charAt(0)}</div>
              <span className="text-[#374151]">{u.displayName}</span>
              {u.isTyping && <span className="text-text-tertiary italic text-[11px]">typing...</span>}
            </div>
          ))}
        </div>

        {/* Activity feed */}
        <div className="flex-[1] overflow-auto p-4">
          <div className="text-[11px] font-bold text-[#64748b] mb-[10px] uppercase tracking-[0.5px]">
            Activity
          </div>
          {activity.length === 0 && (
            <div className="text-[12px] text-text-tertiary">Waiting for events...</div>
          )}
          {activity.map(entry => (
            <div className="flex items-start gap-2 py-[5px] px-0 text-[12px]" key={entry.id}>
              <div style={{ ...presenceAvatarStyle(entry.color), flexShrink: 0, marginTop: 1 }}>
                {entry.displayName.charAt(0)}
              </div>
              <div>
                <span className="font-semibold text-[#374151]">{entry.displayName}</span>{' '}
                <span className="text-[#64748b]">{entry.action}</span>
                <div className="text-[10px] text-text-tertiary mt-[1px]">
                  {formatTimeAgo(entry.timestamp)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reaction picker */}
        <div className="p-3 border-t border-border flex justify-center gap-1">
          {['👍', '❤️', '🔥', '😂', '👏', '🎉'].map(emoji => (
            <button
              key={emoji}
              type="button"
              style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', padding: '2px 4px', borderRadius: 4 }}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes cursorReactionPop {
          0% { transform: translateY(8px) scale(0.5); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translateY(-300px) scale(0.6); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function avatarStyle(color: string): React.CSSProperties {
  return {
    width: 24,
    height: 24,
    borderRadius: '50%',
    background: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 9,
    fontWeight: 700,
    border: '2px solid #0f172a',
  };
}

function presenceAvatarStyle(color: string): React.CSSProperties {
  return {
    width: 20,
    height: 20,
    borderRadius: '50%',
    background: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 9,
    fontWeight: 700,
  };
}

function formatTimeAgo(timestamp: number): string {
  const diff = Math.floor((Date.now() - timestamp) / 1000);
  if (diff < 5) return 'just now';
  if (diff < 60) return `${diff}s ago`;
  return `${Math.floor(diff / 60)}m ago`;
}

// ---------------------------------------------------------------------------
// Export (wraps in SimulatedProvider)
// ---------------------------------------------------------------------------

export default function CollaborationDemo() {
  return (
    <SimulatedProvider timeline={collaborationTimeline} autoPlay>
      <CollaborationCanvas />
    </SimulatedProvider>
  );
}
