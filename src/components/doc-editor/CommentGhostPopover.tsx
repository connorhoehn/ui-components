// src/components/doc-editor/CommentGhostPopover.tsx
//
// Comment "ghosts" — how a reader learns a discussion exists when the margin
// gutter is not there to tell them.
//
// ## Why ghosts exist
//
// The gutter (DocumentGutter.tsx) can be switched off, and in read-only mode
// the toolbar carrying that switch never renders at all — so for a reader the
// gutter is off with no way to turn it on. Once it is gone, nothing on the
// page records that anyone ever commented. That is the failure this file
// exists to prevent: a hidden gutter is a LAYOUT preference, and it must not
// double as a censor. Three people can have questioned a paragraph, and
// without a mark inside the prose the reader finishes the document believing
// it was uncontested.
//
// So the gutter hides the THREADS; the ghost keeps the FACT of the discussion
// visible, and gives the reader a way in.
//
// ## The division of labour with realtime-modules
//
// The marks themselves are not ours. realtime-modules' `CommentHighlight`
// Tiptap extension paints each anchored range as a ProseMirror decoration
// carrying `.canvas-comment`, a `--open` / `--active` / `--resolved` modifier
// and a `data-comment-id`. It deliberately ships no colours. This library
// supplies the other two halves: the CSS (src/styles.css, scoped under
// `.doc-page`) and this card, which is what a ghost opens INTO.
//
// ## Why the listeners are delegated rather than per-span props
//
// Those spans are decorations, not React nodes — there is no element for a
// caller to hang `onClick` on, and re-rendering the editor would not create
// one. The only handle available is the container they live in, so this
// component binds one set of listeners to `containerRef` and matches on
// `[data-comment-id]`. `mouseover`/`mouseout` rather than `mouseenter`/
// `mouseleave` for the same reason: only the former bubble, and delegation
// needs bubbling.
//
// ## Why hover alone would not do
//
// A hover-only affordance is invisible to a keyboard and does not exist on a
// touch screen, which has no pointer to hover with — and touch is precisely
// where the gutter is most likely to be off, because the margin does not fit.
// A ghost you can only reveal with a mouse is decoration, not an affordance.
// So a ghost also opens on CLICK (either our delegated listener or the
// extension's `onCommentClick`, wired through `openComment`), and the card is
// a focus-trapping `role="dialog"` that Escape dismisses — once open it is
// operable entirely from the keyboard.
//
// The trade-off that comes with reusing InlinePopover: it moves focus into the
// panel on open and restores it on close. That is what makes the keyboard
// story work, but it also means a hover while EDITING pulls the caret out of
// the prose. Hosts in an editing mode should pass `hoverEnabled={false}` and
// leave click as the way in.

import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type Ref,
  type RefObject,
} from 'react';
import InlinePopover from '../shared/InlinePopover';
import Avatar from '../shared/Avatar';
import Chip from '../shared/Chip';
import { Button } from '../ui/Button';
import { relativeTime } from './CommentThread';

/**
 * Matched on the attribute, not the class. `CommentHighlight` lets a consumer
 * namespace `classPrefix`, but `data-comment-id` is fixed — so keying on the
 * attribute survives a renamed prefix, and a host that paints its own marks
 * only has to carry the id.
 */
const GHOST_SELECTOR = '[data-comment-id]';

/**
 * Grace period before a hover-opened card closes after the pointer leaves the
 * mark. Without it the card is unreachable: the pointer has to cross dead
 * space to get from the word to the card, and a zero-delay close fires
 * mid-journey every time.
 */
const HOVER_CLOSE_DELAY_MS = 240;

/**
 * Comment ids come from storage, so they reach a selector unvalidated. `CSS`
 * is feature-checked rather than assumed: it is absent in a non-DOM render and
 * has been missing from older test environments, and a crash here would take
 * down the page over a lookup that has a perfectly good fallback.
 */
function escapeAttributeValue(id: string): string {
  if (typeof CSS !== 'undefined' && typeof CSS.escape === 'function') return CSS.escape(id);
  return id.replace(/["\\]/g, '\\$&');
}

/**
 * One thread, reduced to what a card can show before the reader commits to
 * opening the whole discussion.
 *
 * Structural, not imported: this package keeps zero runtime dependency on
 * realtime-modules, so the host maps its own comment rows onto this.
 */
export interface CommentGhostThread {
  /** Matches the `data-comment-id` on the painted range. */
  id: string;
  /** Display name of whoever opened the thread. */
  author: string;
  /** The first comment. Clamped in the card — this is a preview, not the thread. */
  text: string;
  /** Replies below the first comment. Absent and 0 both read as "no replies". */
  replyCount?: number;
  resolved?: boolean;
  /** ISO timestamp, rendered as relative time. */
  timestamp?: string;
  /** Author colour, so the ghost card and the gutter card agree. */
  color?: string;
  /**
   * The text the thread was anchored to. Worth showing because a ghost can be
   * opened from a mark the reader has not read yet.
   */
  quote?: string;
}

/** Imperative surface, for wiring the extension's click callback. */
export interface CommentGhostPopoverHandle {
  /**
   * Opens the card for `id`. The anchor element is optional: without one the
   * mark is looked up inside the container, so a host-driven "jump to next
   * comment" needs only the id.
   */
  openComment: (id: string, anchor?: Element | null) => void;
  close: () => void;
}

export interface CommentGhostPopoverProps {
  /** Every thread that could be behind a mark. Unknown ids never open a card. */
  threads: readonly CommentGhostThread[];
  /**
   * The element the painted ranges live in — the `.doc-page` sheet. Hover and
   * click delegation binds here.
   *
   * Must already be attached when this mounts, which it is whenever both live
   * in the same tree: refs are assigned during commit, before effects run.
   */
  containerRef?: RefObject<HTMLElement | null>;
  /** Dwell before a hover opens a card, so a pointer crossing the line is ignored. */
  hoverDelayMs?: number;
  /**
   * Hover-to-open. Turn it off in an editing mode: opening the card takes
   * focus, and a card that opens because the pointer drifted over a word steals
   * the caret mid-sentence.
   */
  hoverEnabled?: boolean;
  /**
   * Fires as the open thread changes (null when it closes). The reason to wire
   * it: the host can flip that thread's `CommentHighlight` state to `active`,
   * so the mark under the card is the prominent one.
   */
  onOpenChange?: (id: string | null) => void;
  /** "Open thread" — show the full discussion (a panel, a drawer, the gutter). */
  onOpenThread?: (id: string) => void;
  /** Omitted when the reader may not resolve; never offered on a resolved thread. */
  onResolve?: (id: string) => void;
  ref?: Ref<CommentGhostPopoverHandle>;
  'data-testid'?: string;
}

/** "no replies" / "1 reply" / "4 replies" — the count is the thread's weight. */
export function replyLabel(count: number): string {
  if (count <= 0) return 'No replies';
  return count === 1 ? '1 reply' : `${count} replies`;
}

interface OpenState {
  id: string;
  /**
   * A click is a deliberate open and stays put; a hover is provisional and
   * closes itself when the pointer leaves. Conflating them makes a clicked
   * card vanish the moment the reader looks away from the word.
   */
  via: 'hover' | 'click';
}

export default function CommentGhostPopover({
  threads,
  containerRef,
  hoverDelayMs = 140,
  hoverEnabled = true,
  onOpenChange,
  onOpenThread,
  onResolve,
  ref,
  'data-testid': testId = 'comment-ghost',
}: CommentGhostPopoverProps) {
  const [openState, setOpenState] = useState<OpenState | null>(null);
  // The mark the card points at. A ref, not state: InlinePopover reads it in a
  // layout effect keyed on `open`, so it only has to be current by the time
  // the state change commits.
  const anchorRef = useRef<HTMLElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Read inside long-lived DOM listeners, which would otherwise capture the
  // state from the render that installed them.
  const openStateRef = useRef<OpenState | null>(null);
  openStateRef.current = openState;

  const byId = useMemo(() => {
    const map = new Map<string, CommentGhostThread>();
    for (const thread of threads) map.set(thread.id, thread);
    return map;
  }, [threads]);
  const byIdRef = useRef(byId);
  byIdRef.current = byId;

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const close = useCallback(() => {
    clearTimer();
    setOpenState(null);
  }, [clearTimer]);

  const openAt = useCallback(
    (id: string, anchor: Element | null | undefined, via: 'hover' | 'click') => {
      clearTimer();
      // An id with no thread behind it is a mark whose comment we cannot
      // render — a stale decoration, or a thread the host has not loaded.
      // Opening an empty card would be worse than leaving the mark alone.
      if (!byIdRef.current.has(id)) return;
      const resolved =
        anchor ??
        containerRef?.current?.querySelector(
          `[data-comment-id="${escapeAttributeValue(id)}"]`,
        ) ??
        null;
      if (!(resolved instanceof HTMLElement)) return;
      anchorRef.current = resolved;
      setOpenState({ id, via });
    },
    [clearTimer, containerRef],
  );

  useImperativeHandle(
    ref,
    () => ({
      openComment: (id, anchor) => openAt(id, anchor, 'click'),
      close,
    }),
    [openAt, close],
  );

  // Report transitions only. An effect that fired on mount would tell the host
  // the thread closed before anything had opened.
  const reportedRef = useRef<string | null>(null);
  const openId = openState?.id ?? null;
  useEffect(() => {
    if (reportedRef.current === openId) return;
    reportedRef.current = openId;
    onOpenChange?.(openId);
  }, [openId, onOpenChange]);

  useEffect(() => clearTimer, [clearTimer]);

  useEffect(() => {
    const root = containerRef?.current;
    if (!root) return;

    const ghostFrom = (target: EventTarget | null): HTMLElement | null =>
      target instanceof Element ? target.closest<HTMLElement>(GHOST_SELECTOR) : null;

    const onClick = (event: MouseEvent) => {
      const el = ghostFrom(event.target);
      const id = el?.getAttribute('data-comment-id');
      if (!el || !id) return;
      // Second click on the same mark closes it. On touch there is nowhere to
      // "hover away" to, so a card with no click-to-dismiss is a trap.
      if (openStateRef.current?.id === id) {
        close();
        return;
      }
      openAt(id, el, 'click');
    };

    const onOver = (event: MouseEvent) => {
      if (!hoverEnabled) return;
      const el = ghostFrom(event.target);
      const id = el?.getAttribute('data-comment-id');
      if (!el || !id) return;
      clearTimer();
      // Already showing this thread: the pointer moved between the mark's own
      // child nodes, which is not a reason to reopen anything.
      if (openStateRef.current?.id === id) return;
      timerRef.current = setTimeout(() => openAt(id, el, 'hover'), hoverDelayMs);
    };

    const onOut = (event: MouseEvent) => {
      if (!hoverEnabled) return;
      if (!ghostFrom(event.target)) return;
      clearTimer();
      timerRef.current = setTimeout(() => {
        if (openStateRef.current?.via === 'hover') close();
      }, HOVER_CLOSE_DELAY_MS);
    };

    root.addEventListener('click', onClick);
    root.addEventListener('mouseover', onOver);
    root.addEventListener('mouseout', onOut);
    return () => {
      root.removeEventListener('click', onClick);
      root.removeEventListener('mouseover', onOver);
      root.removeEventListener('mouseout', onOut);
    };
  }, [containerRef, hoverEnabled, hoverDelayMs, openAt, close, clearTimer]);

  const thread = openId ? byId.get(openId) ?? null : null;

  const act = (fn?: (id: string) => void) => () => {
    if (!thread) return;
    fn?.(thread.id);
    close();
  };

  return (
    <InlinePopover
      trigger={anchorRef}
      open={Boolean(thread)}
      onClose={close}
      placement="bottom-start"
      className="w-72 p-0"
      aria-label={thread ? `Comment by ${thread.author}` : undefined}
      data-testid={testId}
    >
      {thread && (
        <div
          data-testid={`${testId}-card`}
          data-comment-id={thread.id}
          className="flex flex-col gap-2 p-3"
          // The card is portalled to the body, so the pointer leaving the mark
          // to reach it counts as leaving the page. Cancelling the pending
          // close here is what lets a hover-opened card be used at all.
          onMouseEnter={clearTimer}
          onMouseLeave={() => {
            clearTimer();
            timerRef.current = setTimeout(() => {
              if (openStateRef.current?.via === 'hover') close();
            }, HOVER_CLOSE_DELAY_MS);
          }}
        >
          <div className="flex items-center gap-2">
            <Avatar name={thread.author} size={20} color={thread.color} />
            <span className="truncate text-[13px] font-semibold text-text-primary">
              {thread.author}
            </span>
            {thread.timestamp && (
              <span className="text-[11px] text-text-tertiary">{relativeTime(thread.timestamp)}</span>
            )}
            {thread.resolved && (
              <Chip tone="success" size="xs">
                Resolved
              </Chip>
            )}
          </div>

          {/* The anchored words. A ghost can be opened from a mark further down
              the page than the reader has read, and a comment with no idea what
              it is about is a riddle. */}
          {thread.quote && (
            <div className="border-l-2 border-border pl-2 text-[11px] italic text-text-tertiary line-clamp-2">
              {thread.quote}
            </div>
          )}

          <div className="whitespace-pre-wrap text-[13px] leading-snug text-text-primary line-clamp-4">
            {thread.text}
          </div>

          <div className="flex items-center justify-between gap-2">
            <span data-testid={`${testId}-replies`} className="text-[11px] text-text-tertiary">
              {replyLabel(thread.replyCount ?? 0)}
            </span>
            <span className="flex gap-1.5">
              {onOpenThread && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={act(onOpenThread)}
                  data-testid={`${testId}-open`}
                >
                  Open thread
                </Button>
              )}
              {onResolve && !thread.resolved && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={act(onResolve)}
                  data-testid={`${testId}-resolve`}
                >
                  Resolve
                </Button>
              )}
            </span>
          </div>
        </div>
      )}
    </InlinePopover>
  );
}
