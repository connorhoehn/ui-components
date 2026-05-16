import { cn } from '../../lib/cn';
import type { EphemeralReaction } from '../../hooks/useReactions';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface Props {
  reactions: EphemeralReaction[];
}

// ---------------------------------------------------------------------------
// Animation map — one entry per emoji type
// ---------------------------------------------------------------------------

const EMOJI_ANIMATION_CLASSES: Record<string, string> = {
  '❤️':  '[animation:reaction-heart_2.5s_ease-out_forwards]',
  '😂':  '[animation:reaction-laugh_2.5s_ease-out_forwards]',
  '👍':  '[animation:reaction-thumbsup_2.5s_ease-out_forwards]',
  '👎':  '[animation:reaction-thumbsdown_2.5s_ease-out_forwards]',
  '😮':  '[animation:reaction-wow_2.5s_ease-out_forwards]',
  '😢':  '[animation:reaction-cry_2.5s_ease-out_forwards]',
  '😡':  '[animation:reaction-angry_1.8s_ease-out_forwards]',
  '🎉':  '[animation:reaction-party_2.5s_ease-out_forwards]',
  '🔥':  '[animation:reaction-fire_2.5s_ease-out_forwards]',
  '⚡':  '[animation:reaction-lightning_1.5s_ease-out_forwards]',
  '💯':  '[animation:reaction-hundred_2.0s_ease-out_forwards]',
  '🚀':  '[animation:reaction-rocket_2.0s_ease-out_forwards]',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ReactionsOverlay({ reactions }: Props) {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[9999]">
      {reactions.map((reaction) => (
        <span
          key={reaction.id}
          className={cn(
            'absolute text-[2rem] select-none',
            EMOJI_ANIMATION_CLASSES[reaction.emoji] ?? '[animation:reaction-fade-up_2.5s_ease-out_forwards]',
          )}
          style={{ left: `${reaction.x}%`, top: `${reaction.y}%` }}
        >
          {reaction.emoji}
        </span>
      ))}
    </div>
  );
}
