// frontend/src/components/ReactionButtons.tsx
//
// Grid of 12 emoji reaction buttons. Clicking a button calls onReact(emoji).
// Buttons are disabled (with reduced opacity) when the disabled prop is true.

import { cn } from '../../lib/cn';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface Props {
  onReact: (emoji: string) => void;
  disabled?: boolean;  // true when connectionState !== 'connected'
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const EMOJIS = ['❤️', '😂', '👍', '👎', '😮', '😢', '😡', '🎉', '🔥', '⚡', '💯', '🚀'] as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ReactionButtons({ onReact, disabled = false }: Props) {
  return (
    <div className="flex gap-1 flex-wrap">
      {EMOJIS.map((emoji) => (
        <button
          key={emoji}
          onClick={() => onReact(emoji)}
          disabled={disabled}
          className={cn(
            'text-lg bg-transparent border border-border rounded-md px-1.5 py-0.5 leading-none',
            disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer opacity-100'
          )}
          title={emoji}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
