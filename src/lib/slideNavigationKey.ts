// Keyboard slide navigation, shared by `PresentationView` and the editing
// surface in `PresentationEditor`.
//
// It lives here rather than in either component because the two must agree:
// a deck that pages with ← / → while you read it and ignores them while you
// edit it is the same bug reported twice. The editor is the reason for the
// text-entry guard — its deck-title, subtitle and bullet fields are inside
// the same key-handling subtree, and a caret moving through "Quarterly
// review" must not also jump to slide 4.

export type SlideKeyIntent = 'previous' | 'next' | 'first' | 'last';

/** True when the event came from a control that uses arrow keys itself. */
export function isTextEntryTarget(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el || typeof el.tagName !== 'string') return false;
  if (el.isContentEditable) return true;
  return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT';
}

export interface SlideKeyEventLike {
  key: string;
  target: EventTarget | null;
  ctrlKey?: boolean;
  metaKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
}

/**
 * Which way the deck should move for this key press, or `null` to leave the
 * event alone. Modified presses are always `null`: ⌘← is "back" in a browser
 * and Alt+← is the same on Windows, and neither belongs to us.
 */
export function slideNavigationIntent(event: SlideKeyEventLike): SlideKeyIntent | null {
  if (event.ctrlKey || event.metaKey || event.altKey) return null;
  if (isTextEntryTarget(event.target)) return null;
  switch (event.key) {
    case 'ArrowLeft':
    case 'PageUp':
      return 'previous';
    case 'ArrowRight':
    case 'PageDown':
      return 'next';
    case 'Home':
      return 'first';
    case 'End':
      return 'last';
    default:
      return null;
  }
}

/**
 * The 1-based slide number an intent lands on, clamped to the deck. Returns
 * the current index unchanged when there is nowhere to go, so a caller can
 * skip a no-op state update.
 */
export function nextSlideIndex(intent: SlideKeyIntent, current: number, total: number): number {
  if (total <= 0) return current;
  const target =
    intent === 'previous' ? current - 1
      : intent === 'next' ? current + 1
        : intent === 'first' ? 1
          : total;
  return Math.min(Math.max(target, 1), total);
}
