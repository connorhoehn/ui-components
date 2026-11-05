import { useState, useEffect, type CSSProperties } from 'react';
import { cn } from '../../lib/cn';

// Stable test-selector names for the default emoji set. Anything outside
// the map falls back to the emoji's codepoints so a caller-supplied set
// still gets a deterministic (if uglier) testid.
const EMOJI_TESTID_NAMES: Record<string, string> = {
  '👍': 'thumbs-up',
  '❤️': 'heart',
  '🔥': 'fire',
  '😂': 'laugh',
  '👏': 'clap',
  '🎉': 'party',
  '😮': 'wow',
  '💯': 'hundred',
};

/** Testid-safe name for a reaction emoji: 'heart', 'thumbs-up', … for the
 *  default set, hyphen-joined hex codepoints for anything else. Exported so
 *  consumers can build `reaction-option-${reactionEmojiName(e)}` selectors. */
export function reactionEmojiName(emoji: string): string {
  const named = EMOJI_TESTID_NAMES[emoji];
  if (named) return named;
  return Array.from(emoji)
    .map((c) => c.codePointAt(0)!.toString(16))
    .join('-');
}

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
    <div
      data-testid="reaction-overlay"
      className={cn('absolute inset-0 pointer-events-none overflow-hidden', className)}
      style={style}
    >
      {floating.map(r => (
        <span
          key={r.id}
          data-testid="reaction-float"
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
  /**
   * `chrome` (default): its own dark pill, for a call stage. `surface`: no
   * background of its own and theme-following hovers, for a light panel that
   * already frames it (the meeting toolbar's React popover). Since 2.465.0.
   */
  tone?: 'chrome' | 'surface';
}

const DEFAULT_EMOJIS = ['👍', '❤️', '🔥', '😂', '👏', '🎉', '😮', '💯'];

export function ReactionPicker({ onReact, emojis = DEFAULT_EMOJIS, className, style, tone = 'chrome' }: ReactionPickerProps) {
  return (
    <div
      data-testid="reaction-picker"
      data-tone={tone}
      className={cn(
        // Chrome: inverse-surface tokens (the way MediaEffectsTray styles
        // itself) over dark call chrome. Surface: the host panel frames it.
        'flex gap-1',
        tone === 'chrome' ? 'px-2 py-1.5 rounded-[20px] bg-call-chrome/90 border border-call-chrome-border' : 'p-0.5',
        className,
      )}
      style={style}
    >
      {emojis.map(emoji => {
        const name = reactionEmojiName(emoji);
        return (
          <button
            data-ui-part=""
            key={emoji}
            type="button"
            onClick={() => onReact(emoji)}
            aria-label={`React with ${name}`}
            data-testid={`reaction-option-${name}`}
            className={cn(
              'bg-transparent border-none text-xl cursor-pointer px-1 py-0.5 rounded',
              'transition-transform duration-100 active:scale-125',
              tone === 'chrome' ? 'hover:bg-white/10' : 'hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-primary',
            )}
          >
            {emoji}
          </button>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// ReactionPickerButton — compact trigger for a call control bar
// ---------------------------------------------------------------------------

export interface ReactionPickerButtonProps {
  onReact: (emoji: string) => void;
  emojis?: string[];
  /** Close the popover after an emoji is picked. Default true. */
  closeOnReact?: boolean;
  /** Horizontal anchoring of the popover relative to the trigger. Default
   *  'center'. Use 'right' when the button sits near the widget's right
   *  edge (docked CallWidget) so the row doesn't overflow the clip rect. */
  align?: 'center' | 'left' | 'right';
  /** Dims the trigger and blocks opening — e.g. while the send path
   *  is unavailable. */
  disabled?: boolean;
  /**
   * `chrome` (default): the round translucent trigger of the dark call
   * control row. `surface`: an outline button that follows the page theme,
   * 32px like `CallDock`'s header controls — for the in-call shelf.
   */
  tone?: 'chrome' | 'surface';
  className?: string;
}

// Same stroke style as the CallControls glyph set (16×16, stroke=currentColor).
const smileyIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);

/**
 * Icon trigger + popover pairing of ReactionPicker, sized to sit in a call
 * control row next to CallControls' 36px round buttons.
 *
 * The popover is positioned `absolute` against the wrapper — NEVER
 * `position: fixed` — because CallWidget applies a CSS transform to its
 * root, which makes transformed ancestors the containing block for fixed
 * children. Absolute-in-relative keeps the popover anchored to the button
 * in both the docked and expanded layouts.
 */
export function ReactionPickerButton({
  onReact,
  emojis,
  closeOnReact = true,
  align = 'center',
  disabled = false,
  tone = 'chrome',
  className,
}: ReactionPickerButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn('relative inline-flex', className)}>
      <button
        data-ui-part=""
        type="button"
        title="Send a reaction"
        aria-label="Send a reaction"
        aria-expanded={open}
        disabled={disabled}
        onClick={() => setOpen(v => !v)}
        data-testid="reaction-picker-open"
        data-tone={tone}
        className={cn(
          tone === 'surface'
            ? [
                'w-8 h-8 rounded-md flex items-center justify-center border border-solid border-border cursor-pointer transition-colors duration-150',
                open ? 'bg-surface-inset text-text-primary' : 'bg-surface text-text-secondary hover:bg-surface-hover hover:text-text-primary',
              ]
            : [
                // Mirrors CallControls' ControlButton chrome so the trigger reads
                // as one more control in the row.
                'w-9 h-9 rounded-full flex items-center justify-center border-none cursor-pointer transition-all duration-150',
                open ? 'bg-white/20 text-white' : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white',
              ],
          disabled && 'opacity-40 cursor-not-allowed',
        )}
      >
        {smileyIcon}
      </button>
      {open && (
        <ReactionPicker
          emojis={emojis}
          onReact={emoji => {
            onReact(emoji);
            if (closeOnReact) setOpen(false);
          }}
          className={cn(
            'absolute bottom-full mb-2 z-10 shadow-lg',
            align === 'center' && 'left-1/2 -translate-x-1/2',
            align === 'left' && 'left-0',
            align === 'right' && 'right-0',
          )}
        />
      )}
    </div>
  );
}
