import { useState, useEffect, useCallback, type CSSProperties } from 'react';

export interface Reaction {
  id: string;
  emoji: string;
  userId?: string;
  displayName?: string;
}

export interface ReactionOverlayProps {
  reactions: Reaction[];
  style?: CSSProperties;
}

interface FloatingReaction {
  id: string;
  emoji: string;
  x: number;
  createdAt: number;
}

export function ReactionOverlay({ reactions, style }: ReactionOverlayProps) {
  const [floating, setFloating] = useState<FloatingReaction[]>([]);

  useEffect(() => {
    if (reactions.length === 0) return;
    const latest = reactions[reactions.length - 1];
    const fr: FloatingReaction = {
      id: latest.id + '-' + Date.now(),
      emoji: latest.emoji,
      x: 10 + Math.random() * 80,
      createdAt: Date.now(),
    };
    setFloating(prev => [...prev.slice(-20), fr]);
  }, [reactions]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFloating(prev => prev.filter(r => Date.now() - r.createdAt < 3000));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
      ...style,
    }}>
      {floating.map(r => (
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
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translateY(-300px) scale(0.6); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export interface ReactionPickerProps {
  onReact: (emoji: string) => void;
  emojis?: string[];
  style?: CSSProperties;
}

const DEFAULT_EMOJIS = ['👍', '❤️', '🔥', '😂', '👏', '🎉', '😮', '💯'];

export function ReactionPicker({ onReact, emojis = DEFAULT_EMOJIS, style }: ReactionPickerProps) {
  return (
    <div style={{
      display: 'flex',
      gap: 4,
      padding: '6px 8px',
      background: 'rgba(0,0,0,0.8)',
      borderRadius: 20,
      ...style,
    }}>
      {emojis.map(emoji => (
        <button
          key={emoji}
          type="button"
          onClick={() => onReact(emoji)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: 20,
            cursor: 'pointer',
            padding: '2px 4px',
            borderRadius: 4,
            transition: 'transform 0.1s',
          }}
          onMouseDown={e => (e.currentTarget.style.transform = 'scale(1.3)')}
          onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
