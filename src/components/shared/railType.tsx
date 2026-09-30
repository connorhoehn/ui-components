// railType — the ONE type scale every navigation rail draws from.
//
// ## Why this exists
//
// The shell rail (SubNavLayout) and the explorer rail beside it (WorkspaceRail
// + RailNavList + GroupedList) each carried their own sizes: 13px items in
// 36px rows with 10px bold group headings and 9px count pills on the left,
// 15px items at a 40px pitch with 11px semibold labels and plain counts on the
// right. Two rails side by side on one screen, two type scales — and nothing
// tied them together, so every fix to one widened the gap to the other.
//
// Every rail now composes these constants instead of spelling its own sizes,
// so a change here moves all of them together (2.397.0). 2.397.0 set the
// explorer rail's 15px/40px scale; the user preferred the smaller shell-rail
// scale, so since 2.398.0 the shared scale is 13px items on a 36px pitch.
//
// Deliberate exceptions, and why:
// - `RailNavList` (the "All / Mine / Sprints" views list at the top of a rail)
//   uses the item TYPE but 32px rows (6px padding, no gap) — the mockup draws it as a tighter
//   list of views above the rows, not as rows.
// - `GroupedList` `rowStyle="ruled"` (the default) is a work list with
//   sublines and meta, not a rail; its `size` still governs that list.
//   `rowStyle="plain"` IS the rail form and always draws this scale.
// - Conversation lists (ConversationList, TeamChannelTree) are avatar rows
//   with previews, a different kind of list, and are not covered.

import { cn } from '../../lib/cn';

/** A rail item's label: 13px, medium weight, 20px line. */
export const RAIL_ITEM_TEXT = 'text-[13px] font-medium leading-5';

/** Vertical padding that puts a one-line rail row on a 36px pitch (8 + 20 + 8). */
export const RAIL_ROW_PAD_Y = 'py-2';

/** The one-line row pitch in px, for hosts that cap a list by row count. */
export const RAIL_ROW_PITCH = 36;

/** A count at an item's right edge ("Initiatives 3"): muted, tabular. */
export const RAIL_ITEM_COUNT = 'text-[12px] font-medium leading-4 tabular-nums text-text-tertiary';

/**
 * A group heading ("PLAN", "IN PROGRESS"): 11px semibold uppercase,
 * letter-spaced. Ink is separate (`RAIL_GROUP_LABEL_INK`) so a dark rail can
 * swap it without fighting class order.
 */
export const RAIL_GROUP_LABEL = 'text-[11px] font-semibold uppercase leading-4 tracking-wide';

/** The default ink of a group heading. */
export const RAIL_GROUP_LABEL_INK = 'text-text-secondary';

/**
 * A group heading's count ("IN PROGRESS … 9"): plain muted text at the label's
 * size, never a pill — the heading already says what it counts.
 */
export const RAIL_GROUP_COUNT = 'text-[11px] font-medium leading-4 normal-case tracking-normal tabular-nums text-text-tertiary';

/** Padding that puts a group heading (20px caret box) on the same 36px pitch. */
export const RAIL_GROUP_PAD_Y = 'py-2';

/** A rail's caption ("INITIATIVES 11"): 12px semibold uppercase, spaced. */
export const RAIL_CAPTION = 'text-[12px] font-semibold uppercase tracking-[0.06em]';

/** The selected row's fill. The 3px primary edge bar goes with it. */
export const RAIL_CURRENT_FILL = 'bg-primary/8';

/** Everything above, as one object — `railType.item`, `railType.groupLabel`… */
export const railType = {
  item: RAIL_ITEM_TEXT,
  rowPadY: RAIL_ROW_PAD_Y,
  rowPitch: RAIL_ROW_PITCH,
  itemCount: RAIL_ITEM_COUNT,
  groupLabel: RAIL_GROUP_LABEL,
  groupLabelInk: RAIL_GROUP_LABEL_INK,
  groupCount: RAIL_GROUP_COUNT,
  groupPadY: RAIL_GROUP_PAD_Y,
  caption: RAIL_CAPTION,
  currentFill: RAIL_CURRENT_FILL,
} as const;

/** The disclosure caret every rail group heading wears: 14px, down when open. */
export function RailCaretIcon({ open, className }: { open: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn('shrink-0 transition-transform duration-150', open ? '' : '-rotate-90', className)}
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}
