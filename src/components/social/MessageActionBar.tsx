// MessageActionBar — the hover/focus actions on a single message.
//
// ## Why it is not hover-only
//
// The bar appears on hover, which is what makes a dense thread readable — but
// hover alone puts react, reply and pin out of reach of anyone using a
// keyboard or a touch screen. The row is therefore also revealed by FOCUS
// (`focus-within`), and every control is a real button in the tab order. A
// message you cannot reply to without a mouse is a message half the product
// cannot use.
//
// ## Why the quick reactions are here at all
//
// Opening a picker to send a thumbs-up is three interactions for the most
// common one. The quick row is the two or three emoji people actually send,
// with the full picker one click further on. Which ones are quick is a
// caller's decision — different products have different vocabularies.

import { cn } from '../../lib/cn';
import { EditIcon, PinIcon, TrashIcon } from '../ui/Icons';

export interface MessageActionBarProps {
  /** Emoji offered inline. Keep it short; the picker covers the rest. */
  quickReactions?: readonly string[];
  onReact?: (emoji: string) => void;
  /** Opens the full emoji picker. Omit to show only the quick row. */
  onOpenReactionPicker?: () => void;
  onReply?: () => void;
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
  quickReactions = DEFAULT_QUICK,
  onReact,
  onOpenReactionPicker,
  onReply,
  onTogglePin,
  pinned = false,
  onCopyLink,
  onEdit,
  onDelete,
  className,
  'data-testid': testId = 'message-actions',
}: MessageActionBarProps) {
  const btn = (label: string, onClick: () => void, glyph: React.ReactNode, key: string) => (
    <button
      key={key}
      type="button"
      aria-label={label}
      title={label}
      data-testid={`${testId}-${key}`}
      onClick={onClick}
      // The bar reveals itself on :focus-visible (see ChatPanel), but the
      // BUTTON inside it had no focus style of its own — so a keyboard user
      // could see the bar appear and not which of its five controls they were
      // on. That is the case the reveal exists for.
      className={`grid h-6 w-6 place-items-center rounded text-xs leading-none text-text-secondary hover:bg-surface-hover hover:text-text-primary ${FOCUS_RING}`}
    >
      {glyph}
    </button>
  );

  return (
    <div
      data-testid={testId}
      // `group-hover` reveals it in a dense list; `focus-within` is what keeps
      // it reachable without a pointer. Both, or it serves only half the users.
      className={cn(
        'flex items-center gap-0.5 rounded-lg border border-border bg-surface p-0.5 shadow-sm',
        className,
      )}
    >
      {onReact &&
        quickReactions.map((e) =>
          btn(`React ${e}`, () => onReact(e), <span aria-hidden>{e}</span>, `react-${e}`),
        )}
      {onOpenReactionPicker && btn('More reactions', onOpenReactionPicker, <span aria-hidden>😀</span>, 'more-reactions')}
      {onReply && btn('Reply', onReply, <span aria-hidden>↩</span>, 'reply')}
      {onTogglePin && btn(pinned ? 'Unpin' : 'Pin to channel', onTogglePin, <PinIcon size={14} />, 'pin')}
      {onCopyLink && btn('Copy link to message', onCopyLink, <span aria-hidden>🔗</span>, 'copy-link')}
      {onEdit && btn('Edit message', onEdit, <EditIcon size={13} />, 'edit')}
      {onDelete && btn('Delete message', onDelete, <TrashIcon size={13} />, 'delete')}
    </div>
  );
}

export default MessageActionBar;
