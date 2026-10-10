// ReactionPickerPopover — cmdk-driven emoji picker rendered as a popover
// near a trigger. Supports keyboard search (arrow / enter / escape) and
// click-outside dismissal. Default emoji set is an 8x8 grid (64 emojis).

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from 'react';
import { Command as Cmdk } from 'cmdk';
import { createPortal } from 'react-dom';
import { popoverBounds, popoverFloor } from '../shared/InlinePopover';
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

function useAnchor(triggerRef: ReactionPickerPopoverProps['triggerRef'], panelRef: RefObject<HTMLDivElement | null>, open: boolean) {
  const [coords, setCoords] = useState<CSSProperties | null>(null);
  useLayoutEffect(() => {
    if (!open || !triggerRef?.current) { setCoords(null); return; }
    const measure = () => {
      const trigger = triggerRef.current, panel = panelRef.current;
      if (!trigger || !panel) return;
      const rect = trigger.getBoundingClientRect();
      const bounds = popoverBounds(trigger, window.innerWidth);
      const floor = popoverFloor(rect, window.innerHeight);
      const maxWidth = Math.max(1, bounds.right - bounds.left - 16);
      const maxHeight = Math.max(1, floor - 16);
      // Apply available space before measurement; this also lets a previously
      // narrow picker regain its natural width when the viewport grows.
      panel.style.maxWidth = `${maxWidth}px`;
      panel.style.maxHeight = `${maxHeight}px`;
      const size = panel.getBoundingClientRect();
      const width = Math.min(size.width, maxWidth), height = Math.min(size.height, maxHeight);
      const above = rect.top - 12 - height, below = rect.bottom + 6;
      const top = above >= 8 ? above : below + height <= floor - 8 ? below : Math.max(8, floor - 8 - height);
      const next = { position: 'fixed' as const, top, left: Math.max(bounds.left + 8, Math.min(rect.left, bounds.right - 8 - width)), maxWidth, maxHeight };
      setCoords(previous => previous?.top === next.top && previous.left === next.left && previous.maxWidth === maxWidth && previous.maxHeight === maxHeight ? previous : next);
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (panelRef.current) observer.observe(panelRef.current);
    window.addEventListener('scroll', measure, true);
    window.addEventListener('resize', measure);
    return () => { observer.disconnect(); window.removeEventListener('scroll', measure, true); window.removeEventListener('resize', measure); };
  }, [open, triggerRef, panelRef]);
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
  const anchor = useAnchor(triggerRef, popoverRef, open);

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

  /**
   * Where focus goes when this closes.
   *
   * It used to go NOWHERE: closing unmounts the whole subtree (`if (!open)
   * return null` below), and the focused search input went with it, so a
   * keyboard user who picked an emoji — or pressed Escape — was dropped onto
   * `<body>` and had to Tab in from the top of the document to get back to the
   * message they had just reacted to. Escape especially: the whole contract of
   * Escape is "put me back where I was".
   *
   * The element is captured at OPEN time rather than read from `triggerRef` at
   * close time, because not every caller passes a trigger ref (it is optional,
   * and it exists for positioning, not for focus).
   */
  const returnFocusRef = useRef<HTMLElement | null>(null);
  // Only a real close (open → closed) hands the focus back. Mounting closed —
  // every composer on every page, and again whenever a layout change
  // remounts one — used to focus the Emoji button, stealing the focus from
  // wherever the reader was (an Activity card whose pane Escape just closed).
  const wasOpenRef = useRef(false);
  useEffect(() => {
    if (open) {
      wasOpenRef.current = true;
      const active = document.activeElement;
      returnFocusRef.current = active instanceof HTMLElement ? active : null;
      return;
    }
    if (!wasOpenRef.current) return;
    wasOpenRef.current = false;
    const back = returnFocusRef.current ?? triggerRef?.current ?? null;
    returnFocusRef.current = null;
    // `isConnected`: the row a reaction was picked on can be re-keyed by the
    // re-render the reaction itself causes, and focusing a detached node
    // silently does nothing while looking like it worked.
    if (back?.isConnected) back.focus();
  }, [open, triggerRef]);

  const handleSelect = useCallback(
    (emoji: string) => {
      onSelect(emoji);
      onClose();
    },
    [onSelect, onClose],
  );

  if (!open) return null;

  const panel = (
    <div
      ref={popoverRef}
      role="dialog"
      aria-label="Pick a reaction"
      data-testid="reaction-picker-popover"
      className={cn(
        'z-50 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg p-2',
        'w-[18rem] overflow-y-auto',
        className,
      )}
      style={{ ...(anchor ?? { position: 'absolute' }), ...style }}
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
  // Fixed viewport positioning must not inherit a clipped/transformed message
  // ancestor. Unanchored legacy callers retain their local absolute fallback.
  return triggerRef?.current ? createPortal(panel, document.body) : panel;
}

export default ReactionPickerPopover;
