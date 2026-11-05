// MessageActionBar — the hover/focus actions on a single message.
//
// ## Why it is not hover-only
//
// The bar appears on hover, which is what makes a dense thread readable — but
// hover alone puts react, reply and pin out of reach of anyone using a
// keyboard or a touch screen. The row is therefore also revealed by FOCUS
// (`focus-within`). A message you cannot reply to without a mouse is a
// message half the product cannot use.
//
// ## Why it is ONE tab stop and not eight
//
// Reachable is not the same as usable. Every control used to be its own tab
// stop, so a message cost EIGHT presses to walk past — measured on a seeded
// #general: 7 messages, 56 stops before the composer, and a real channel of a
// hundred messages would be eight hundred. The bar was reachable and the
// transcript was not traversable.
//
// So it is a WAI-ARIA toolbar: one stop for the whole bar, arrow keys between
// its controls, Home/End to the ends. That is the pattern's entire purpose —
// a group of related controls that should not each cost the reader a press —
// and it keeps the reachability the section above is about.
//
// ## Why the quick reactions are here at all
//
// Opening a picker to send a thumbs-up is three interactions for the most
// common one. The quick row is the two or three emoji people actually send,
// with the full picker one click further on. Which ones are quick is a
// caller's decision — different products have different vocabularies.

import { cn } from '../../lib/cn';
import { RovingToolbar } from '../shared/RovingToolbar';
import { EditIcon, ForwardIcon, LinkIcon, PinIcon, ReplyIcon, SmileyIcon, TrashIcon } from '../ui/Icons';

export interface MessageAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: (trigger: HTMLElement) => void;
  disabled?: boolean;
}

export interface MessageActionBarProps {
  /** Domain actions reuse the chat toolbar keyboard and hover hierarchy. */
  actions?: readonly MessageAction[];
  label?: string;
  /** Emoji offered inline. Keep it short; the picker covers the rest. */
  quickReactions?: readonly string[];
  onReact?: (emoji: string) => void;
  /**
   * Opens the full emoji picker, at the button that asked for it. Omit to show
   * only the quick row.
   */
  onOpenReactionPicker?: (trigger: HTMLElement) => void;
  onReply?: () => void;
  /**
   * Send this message to ANOTHER conversation.
   *
   * Sits next to Reply because the two are the same gesture pointed different
   * ways — reply keeps the message where it is, forward moves a copy
   * somewhere else — and putting it after Pin would bury it among the
   * channel-admin controls, which is not what it is.
   *
   * Absent means this message cannot be forwarded, and nothing renders. That
   * is a real state rather than a permission: a card or a system notice is
   * not a thing you can relocate (see ChatPanel's `onForwardMessage`), so a
   * disabled Forward would be a promise the product will not keep — the same
   * rule `onTogglePin` follows above.
   *
   * Hands back the BUTTON that was pressed, so the destination picker can
   * open against it instead of in the middle of a dimmed page. Same hand-back
   * `RailSectionHeader` does for the rail's + buttons, and the reason is the
   * same: only the bar knows which of the transcript's many Forward buttons
   * this click came from, and the host that owns the picker cannot ask.
   */
  onForward?: (trigger: HTMLElement) => void;
  /** Pin/unpin. Absent means this viewer may not pin here — the control is
   *  then not rendered at all, rather than rendered disabled: a greyed pin is
   *  a promise the product will not keep. */
  onTogglePin?: () => void;
  pinned?: boolean;
  onCopyLink?: () => void;
  /** Own-message actions. Absent for other people's messages. */
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
  'data-testid'?: string;
}

const DEFAULT_QUICK = ['👍', '🎉', '❤️'] as const;

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

export function MessageActionBar({
  actions: customActions = [],
  label = "Message actions",
  quickReactions = DEFAULT_QUICK,
  onReact,
  onOpenReactionPicker,
  onReply,
  onForward,
  onTogglePin,
  pinned = false,
  onCopyLink,
  onEdit,
  onDelete,
  className,
  'data-testid': testId = 'message-actions',
}: MessageActionBarProps) {
  // The click event reaches the helper rather than only Forward's own button.
  // Forward is the one control that needs the element it was pressed on (its
  // picker anchors there), and the alternative — hand-rolling a second button
  // beside this one — would duplicate the class string AND the focus-ring
  // reasoning below, which is exactly the drift that leaves one of two copies
  // unreachable by keyboard. Widening the parameter costs the other seven
  // controls nothing: their handlers already ignore it.
  // Descriptors first, rendered second: the roving tabindex needs to know how
  // many controls there are and which one is at each index, and the old shape
  // — eight conditionals inline in JSX — could not say.
  type Action = {
    key: string;
    label: string;
    glyph: React.ReactNode;
    disabled?: boolean;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  };
  const actions: Action[] = [];
  const add = (
    key: string,
    label: string,
    glyph: React.ReactNode,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  ) => actions.push({ key, label, glyph, onClick });

  if (onReact) {
    for (const e of quickReactions) {
      add(`react-${e}`, `React ${e}`, <span aria-hidden>{e}</span>, () => onReact(e));
    }
  }
  if (onOpenReactionPicker) add('more-reactions', 'More reactions', <SmileyIcon size={14} />, (e) => onOpenReactionPicker(e.currentTarget));
  if (onReply) add('reply', 'Reply', <ReplyIcon size={14} />, onReply);
  if (onForward) add('forward', 'Forward to another conversation', <ForwardIcon size={14} />, (e) => onForward(e.currentTarget));
  if (onTogglePin) add('pin', pinned ? 'Unpin' : 'Pin to channel', <PinIcon size={14} />, onTogglePin);
  if (onCopyLink) add('copy-link', 'Copy link to message', <LinkIcon size={14} />, onCopyLink);
  if (onEdit) add('edit', 'Edit message', <EditIcon size={13} />, onEdit);
  if (onDelete) add('delete', 'Delete message', <TrashIcon size={13} />, onDelete);

  for (const action of customActions) actions.push({ key: action.id, label: action.label, glyph: action.icon, disabled: action.disabled, onClick: (event) => action.onClick(event.currentTarget) });

  // The index lives in a ref AS WELL as state: state to render the tabIndex,
  // ref to compute the next one. Two keydowns in the same tick — holding the
  // arrow key down — would otherwise both read the pre-render state and move
  // to the same place, because `setActive` does not update the closure.
  if (actions.length === 0) return null;

  return (
    <RovingToolbar
      label={label}
      data-testid={testId}
      // `group-hover` reveals it in a dense list; `focus-within` is what keeps
      // it reachable without a pointer. Both, or it serves only half the users.
      className={cn(
        'gap-0.5 rounded-lg border border-border bg-surface p-0.5 shadow-sm',
        className,
      )}
    >
      {actions.map((a) => (
        <button
          data-ui-part=""
          key={a.key}
          type="button"
          aria-label={a.label}
          title={a.label}
          data-testid={`${testId}-${a.key}`}
          onClick={a.onClick}
          disabled={a.disabled}
          // The bar reveals itself on :focus-visible (see ChatPanel), but the
          // BUTTON inside it had no focus style of its own — so a keyboard user
          // could see the bar appear and not which of its controls they were
          // on. That is the case the reveal exists for.
          className={`grid h-6 w-6 place-items-center rounded text-xs leading-none text-text-secondary hover:bg-surface-hover hover:text-text-primary ${FOCUS_RING}`}
        >
          {a.glyph}
        </button>
      ))}
    </RovingToolbar>
  );
}

export default MessageActionBar;
