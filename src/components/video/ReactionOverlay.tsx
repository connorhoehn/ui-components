import { useState, useEffect, type CSSProperties } from 'react';
import { cn } from '../../lib/cn';

export interface Reaction {
  id: string;
  emoji: string;
  userId?: string;
  displayName?: string;
}

export interface ReactionOverlayProps {
  reactions: Reaction[];
  /**
   * Positioning / sizing classes from the caller. Prefer this over `style`:
   * the overlay is `absolute inset-0` by default, and callers wanting to
   * scope it to a sub-region had no seam but an inline style (banned in
   * demos and stories). Composed through `cn()`, so a caller class wins.
   */
  className?: string;
  /** @deprecated Use `className`. Kept so existing callers keep compiling. */
  style?: CSSProperties;
}

interface FloatingReaction {
  id: string;
  emoji: string;
  x: number;
  createdAt: number;
}

export function ReactionOverlay({ reactions, className, style }: ReactionOverlayProps) {
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
      setFloating(prev => {
        // `filter` always allocates, so returning it unconditionally handed
        // React a fresh array twice a second for the entire call — the
        // overlay (and anything below it) re-rendered at 2Hz even with zero
        // reactions on screen. Return the SAME array when nothing expired so
        // React bails out of the update instead.
        const next = prev.filter(r => Date.now() - r.createdAt < 3000);
        return next.length === prev.length ? prev : next;
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn('absolute inset-0 pointer-events-none overflow-hidden', className)} style={style}>
      {floating.map(r => (
        <span
          key={r.id}
          className={cn('absolute bottom-0 text-2xl opacity-0 animate-[floatUp_3s_ease-out_forwards]')}
          style={{ left: `${r.x}%` }}
        >
          {r.emoji}
        </span>
      ))}
    </div>
  );
}

export interface ReactionPickerProps {
  onReact: (emoji: string) => void;
  emojis?: string[];
  /**
   * Positioning / spacing classes from the caller. Prefer this over `style`:
   * the picker is usually floated over a call stage, which previously
   * required an inline style (banned in demos and stories). Composed
   * through `cn()`, so a caller class wins.
   */
  className?: string;
  /** @deprecated Use `className`. Kept so existing callers keep compiling. */
  style?: CSSProperties;
}

const DEFAULT_EMOJIS = ['👍', '❤️', '🔥', '😂', '👏', '🎉', '😮', '💯'];

export function ReactionPicker({ onReact, emojis = DEFAULT_EMOJIS, className, style }: ReactionPickerProps) {
  return (
    <div className={cn('flex gap-1 px-2 py-1.5 bg-black/80 rounded-[20px]', className)} style={style}>
      {emojis.map(emoji => (
        <button
          key={emoji}
          type="button"
          onClick={() => onReact(emoji)}
          className={cn('bg-transparent border-none text-xl cursor-pointer px-1 py-0.5 rounded transition-transform duration-100')}
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
