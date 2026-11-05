// FeedRow — one entry in a list of things that happened.
//
//   ┌────┐  A title that goes on and on and on…            14:03
//   │ 🖼 │  Hank Anderson · 180 KB                 [Approve][Reject]
//   └────┘
//
// A pinned message, a file someone shared, a time you were named, a document
// that changed, a pipeline run that failed. Different nouns, one shape: a
// visual on the left, what it is, when it was, a line of "who and where", and
// a way back to the thing itself.
//
// ## Why it is a library primitive and not five private rows
//
// It WAS a private row — `DigestRow`, living inside ChannelViews and serving
// the four panels in that file. Then the app's Activity feed needed the same
// grammar and could not have it, so it grew a second copy by hand, in a page,
// which is the thing the frontend rule exists to prevent. Two copies of a row
// drift: one of them ends up without the jump affordance, or with the unread
// dot inside the link where a screen reader never reaches it (which is exactly
// what had happened to the mentions panel). The row is defined once, here.
//
// ## The two-line contract — the load-bearing property
//
// A row is ALWAYS exactly two lines high, whatever it is handed. That is what
// makes a long list scannable, and the content here is unbounded: a pasted
// instruction, a filename nobody put a space in, a display name from an IdP.
//
// Three things enforce it, and a future caller will be tempted to break each:
//
//   - `title` and `meta` are typed `string`, not `ReactNode`. A caller who can
//     pass a <div>, a badge, or a second paragraph can produce a third line,
//     and the type is the only place that can be refused cheaply.
//   - Both lines carry `truncate` — `white-space: nowrap` plus an ellipsis.
//     The nowrap is the half that matters: it makes wrapping impossible rather
//     than unlikely. `min-w-0` goes with it, because a flex child's min-width
//     defaults to its own content and would otherwise refuse to shrink.
//   - `actions` and the timestamp sit in flex tracks BESIDE the text, never
//     above or below it. An Approve/Reject pair therefore takes width from the
//     title (which truncates earlier) and never pushes it down.
//
// Truncation hides text, so it must not lose it: each line repeats itself in a
// `title` attribute, and the abbreviated timestamp keeps the full instant one
// hover away via `timestampTitle`.
//
// ## Why `leading` is a sibling of the jump, not inside it
//
// A link's accessible name REPLACES its contents. An indicator nested in the
// jump button — the unread dot, or a disc whose whole job is to say "Failed" —
// has its label eaten by "Go to the mention from Hank". As a sibling it is
// announced as part of the row, which is the one place it is guaranteed to be
// said. The cost is that the 28px visual is no longer itself clickable; the
// row still highlights on hover, and the text is the target people aim at.
//
// ## Why every row jumps
//
// Each of these is a POINTER at something. A pinned message you cannot get
// back to is a screenshot; a file you cannot see in context is a download
// folder. `onJump` is optional only because the original may genuinely be out
// of reach — deleted, still being assembled, outside the loaded window — and
// in that case the row renders as a record rather than as a dead button.

import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { TONE_TEXT, type Tone } from '../shared/tones';

/**
 * One line, ellipsised. See the two-line contract above — `truncate` is
 * `overflow-hidden text-ellipsis whitespace-nowrap`, and `min-w-0` is what
 * lets a flex child shrink below its content.
 */
const ONE_LINE = 'min-w-0 truncate';

/** Right-aligned on the title line. Tabular figures so a column of them scans. */
const STAMP = 'shrink-0 text-[11px] tabular-nums text-text-tertiary';

export interface FeedRowProps
  extends Omit<HTMLAttributes<HTMLLIElement>, 'title' | 'children'> {
  /**
   * Left-hand visual: a thumbnail, an avatar, a glyph, a status disc. Rendered
   * OUTSIDE the jump so anything it announces survives — see above. Give it an
   * accessible name if it carries meaning, and `aria-hidden` if it does not.
   */
  leading: ReactNode;
  /**
   * Line one. `string`, not `ReactNode`, on purpose: it is also the line's
   * `title` attribute, and a caller who could pass markup could pass a second
   * line. Truncates.
   */
  title: string;
  /**
   * Right-aligned on the title line — already formatted, and short. A feed
   * column is read by shape ("14:03", "Yesterday", "Tue"), so a phrase like
   * "3 days ago" costs the reader arithmetic and cannot be scanned.
   *
   * Callers used to stuff this into `meta`, where it sat third in a run of
   * middle-dots and was the first thing to be truncated away.
   */
  timestamp?: string;
  /** ISO-8601 behind the stamp. Its presence is what makes the stamp a `<time>`. */
  timestampIso?: string;
  /** Hover text for the stamp — the full instant the abbreviation stands for. */
  timestampTitle?: string;
  /**
   * Line two: who, and where. Required, because a row whose second line is
   * sometimes absent is a list of two different heights. Truncates.
   */
  meta: string;
  /**
   * Colours line two when it carries a state rather than context — `danger`
   * for a run's error text, which read as ordinary grey metadata beside
   * "Hank Anderson · 180 KB". Omit for the quiet default.
   */
  metaTone?: Tone;
  /** Trailing controls — unpin, download, Approve/Reject. Never the jump: the row is the jump. */
  actions?: ReactNode;
  onJump?: () => void;
  /**
   * The jump's accessible name. It replaces the row's text for a screen
   * reader, so say where it goes: "Go to the pinned message from Hank".
   */
  jumpLabel?: string;
  /** Draws a dot over `leading` and reflects `data-unread` for selection. */
  unread?: boolean;
  /** Also spelled onto the jump as `<testid>-jump`, so it can be clicked by name. */
  'data-testid'?: string;
}

export function FeedRow({
  leading,
  title,
  timestamp,
  timestampIso,
  timestampTitle,
  meta,
  metaTone,
  actions,
  onJump,
  jumpLabel,
  unread,
  className,
  'data-testid': testId,
  ...rest
}: FeedRowProps) {
  const stamp = timestamp ? (
    timestampIso ? (
      <time dateTime={timestampIso} title={timestampTitle} className={STAMP}>
        {timestamp}
      </time>
    ) : (
      <span title={timestampTitle} className={STAMP}>
        {timestamp}
      </span>
    )
  ) : null;

  const body = (
    <span className="flex min-w-0 flex-1 flex-col gap-0.5 text-left">
      <span className="flex min-w-0 items-baseline gap-2">
        <span
          data-line="primary"
          // Truncation hides text; it must not lose it.
          title={title}
          className={cn(ONE_LINE, 'flex-1 text-[13px] font-medium leading-snug text-text-primary')}
        >
          {title}
        </span>
        {stamp}
      </span>
      <span
        data-line="secondary"
        title={meta}
        className={cn(
          ONE_LINE,
          'text-[11px] leading-snug',
          metaTone ? TONE_TEXT[metaTone] : 'text-text-tertiary',
        )}
      >
        {meta}
      </span>
    </span>
  );

  return (
    <li
      {...rest}
      data-testid={testId}
      // State as an attribute, never as part of the testid: a row whose
      // selector changes the moment it is read is unfindable exactly when a
      // test or an e2e script wants it.
      data-unread={unread ? 'true' : undefined}
      className={cn('flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-surface-hover', className)}
    >
      <span className="relative shrink-0">
        {leading}
        {unread && (
          // A mark over the visual, not a different row: a row someone has now
          // read must not change shape under them.
          <span aria-label="Unread" className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary" />
        )}
      </span>
      {onJump ? (
        <button
          data-ui-part=""
          type="button"
          onClick={onJump}
          aria-label={jumpLabel}
          data-testid={testId ? `${testId}-jump` : undefined}
          className="flex min-w-0 flex-1 items-center gap-3 bg-transparent p-0 text-left"
        >
          {body}
        </button>
      ) : (
        <span className="flex min-w-0 flex-1 items-center gap-3">{body}</span>
      )}
      {actions && <span className="flex shrink-0 items-center gap-1">{actions}</span>}
    </li>
  );
}

export default FeedRow;
