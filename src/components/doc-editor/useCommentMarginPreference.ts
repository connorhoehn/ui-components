// useCommentMarginPreference — whether a page's comment margin (the gutter
// beside the sheet) is showing, remembered per browser.
//
// CLOSED by default (2.386.10). The Folders mockup shows "Comments 3" on the
// tab and no margin: a page with three threads used to open with a 280px
// column of cards beside it, squeezing the sheet. The threads stay reachable —
// the marks in the prose are painted either way, a click on one opens its
// card and "Open thread" opens the margin, and the Comments tab lists them.
// A reader who turned the margin on (or off) keeps that choice: an explicit
// stored '1' or '0' always wins over the default.
import { useCallback, useState } from 'react';

export const COMMENT_MARGIN_STORAGE_KEY = 'doc-editor:canvas:gutter-visible';

export interface CommentMarginPreferenceOptions {
  /** Where the choice is remembered. */
  storageKey?: string;
  /** What a reader who never chose sees. Default false (closed). */
  defaultVisible?: boolean;
}

export interface CommentMarginPreference {
  visible: boolean;
  /** Flips the margin and remembers the choice. */
  toggle: () => void;
  /** Opens the margin (a thread was opened) and remembers it. */
  show: () => void;
}

/** The stored choice, or `fallback` when there is none (or storage is unavailable). */
export function readCommentMarginPreference(storageKey: string = COMMENT_MARGIN_STORAGE_KEY, fallback = false): boolean {
  if (typeof window === 'undefined') return fallback;
  try {
    const v = window.localStorage.getItem(storageKey);
    return v === '1' ? true : v === '0' ? false : fallback;
  } catch {
    return fallback;
  }
}

export function useCommentMarginPreference({
  storageKey = COMMENT_MARGIN_STORAGE_KEY,
  defaultVisible = false,
}: CommentMarginPreferenceOptions = {}): CommentMarginPreference {
  const [visible, setVisible] = useState(() => readCommentMarginPreference(storageKey, defaultVisible));
  const set = useCallback((next: boolean) => {
    try { window.localStorage.setItem(storageKey, next ? '1' : '0'); } catch { /* not remembered, still applied */ }
    setVisible(next);
  }, [storageKey]);
  const toggle = useCallback(() => {
    setVisible((prev) => {
      const next = !prev;
      try { window.localStorage.setItem(storageKey, next ? '1' : '0'); } catch { /* not remembered */ }
      return next;
    });
  }, [storageKey]);
  const show = useCallback(() => set(true), [set]);
  return { visible, toggle, show };
}
