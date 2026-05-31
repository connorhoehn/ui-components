// ReactionPickerPopover — cmdk-driven emoji picker rendered as a popover
// near a trigger. Supports keyboard search (arrow / enter / escape) and
// click-outside dismissal. Default emoji set is an 8x8 grid (64 emojis).

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from 'react';
import { Command as Cmdk } from 'cmdk';
import { cn } from '../../lib/cn';

export const DEFAULT_PICKER_EMOJIS = [
  '👍', '❤️', '🔥', '😂', '👏', '🎉', '😮', '💯',
  '😀', '😅', '😉', '😍', '😘', '🤣', '🥰', '😇',
  '🤔', '😎', '😢', '😡', '🤯', '😱', '🙃', '🤩',
  '🙏', '🤝', '👋', '👌', '✌️', '🤞', '🤘', '🫶',
  '✨', '⭐', '💫', '🌟', '⚡', '💥', '☀️', '🌈',
  '🚀', '🎯', '🏆', '💪', '🎊', '🎈', '🥳', '🎁',
  '☕', '🍕', '🍔', '🍩', '🍦', '🍓', '🍻', '🍷',
  '👀', '🤖', '👻', '😺', '🐶', '🦄', '🐝', '🌸',
] as const;

export interface ReactionPickerPopoverProps {
  /** Controls visibility. */
  open: boolean;
  /** Fires with the chosen emoji. */
  onSelect: (emoji: string) => void;
  /** Fires when the popover should close (Escape, click outside, select). */
  onClose: () => void;
  /**
   * Trigger element to anchor against. When provided, the popover positions
   * itself above the trigger; otherwise it falls back to absolute centering
   * at top:auto/left:0 (useful inside a relatively-positioned container).
   */
  triggerRef?: RefObject<HTMLElement | null>;
  /** Override the emoji list. Defaults to 64. */
  emojis?: readonly string[];
  /** Render a search input above the grid. Defaults to true. */
  showSearch?: boolean;
  className?: string;
  style?: CSSProperties;
}

function useAnchor(triggerRef: ReactionPickerPopoverProps['triggerRef'], open: boolean) {
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);
  useLayoutEffect(() => {
    if (!open || !triggerRef?.current) {
      setCoords(null);
      return;
    }
    const rect = triggerRef.current.getBoundingClientRect();
    // Position above the trigger with a small gap.
    setCoords({
      top: Math.max(8, rect.top + window.scrollY - 12),
      left: rect.left + window.scrollX,
    });
  }, [open, triggerRef]);
  return coords;
}

export function ReactionPickerPopover({
  open,
  onSelect,
  onClose,
  triggerRef,
  emojis = DEFAULT_PICKER_EMOJIS,
  showSearch = true,
  className,
  style,
}: ReactionPickerPopoverProps) {
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const id = useId();
  const anchor = useAnchor(triggerRef, open);

  // Close on click outside (ignore clicks on the trigger itself).
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (popoverRef.current?.contains(target)) return;
      if (triggerRef?.current?.contains(target)) return;
      onClose();
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open, onClose, triggerRef]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const handleSelect = useCallback(
    (emoji: string) => {
      onSelect(emoji);
      onClose();
    },
    [onSelect, onClose],
  );

  const positionStyle = useMemo<CSSProperties>(() => {
    if (anchor) {
      return { position: 'absolute', top: anchor.top, left: anchor.left, transform: 'translateY(-100%)' };
    }
    return { position: 'absolute' };
  }, [anchor]);

  if (!open) return null;

  return (
    <div
      ref={popoverRef}
      role="dialog"
      aria-label="Pick a reaction"
      data-testid="reaction-picker-popover"
      className={cn(
        'z-50 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg p-2',
        'w-[18rem]',
        className,
      )}
      style={{ ...positionStyle, ...style }}
    >
      <Cmdk
        label="Pick a reaction"
        loop
        // cmdk's default filter does substring search on item value + keywords —
        // perfect for "search for thumbs" or ":fire:".
      >
        {showSearch && (
          <Cmdk.Input
            id={`${id}-search`}
            placeholder="Search reactions…"
            className={cn(
              'w-full rounded-md border border-[var(--color-border-field)] bg-transparent',
              'px-2 py-1.5 text-sm text-[var(--color-text-primary)] mb-2',
              'focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40',
            )}
            autoFocus
          />
        )}
        <Cmdk.List
          className="max-h-[14rem] overflow-y-auto"
          data-testid="reaction-picker-list"
        >
          <Cmdk.Empty className="px-2 py-3 text-xs text-[var(--color-text-secondary)]">
            No reactions match.
          </Cmdk.Empty>
          <div role="presentation" className="grid grid-cols-8 gap-1">
            {emojis.map((emoji) => (
              <Cmdk.Item
                key={emoji}
                value={emoji}
                onSelect={() => handleSelect(emoji)}
                data-testid="reaction-picker-item"
                data-emoji={emoji}
                className={cn(
                  'flex items-center justify-center text-xl rounded-md',
                  'h-9 cursor-pointer select-none',
                  'aria-selected:bg-[var(--color-primary)]/20',
                  'hover:bg-white/5',
                )}
              >
                {emoji}
              </Cmdk.Item>
            ))}
          </div>
        </Cmdk.List>
      </Cmdk>
    </div>
  );
}

export default ReactionPickerPopover;
