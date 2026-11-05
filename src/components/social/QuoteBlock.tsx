// QuoteBlock — the message being replied to, shown above the reply.
//
// ## Why an excerpt and not the whole message
//
// A quote is context, not a second copy. Reproducing a long message in full
// pushes the actual reply off the screen and makes a thread of replies unread-
// able. The excerpt is capped, and clicking it jumps to the original — which
// is the affordance that lets the excerpt stay short.
//
// ## Why it carries the author and time
//
// "Who said this and when" is the entire reason a quote disambiguates anything.
// Without them a quote is just indented text that could have come from anyone.

import { cn } from '../../lib/cn';

export interface QuotedMessage {
  messageId: string;
  author: string;
  /** ISO timestamp of the quoted message. */
  timestamp?: string;
  /** Plain text of the original. Trimmed for display; the full text is not needed. */
  text: string;
}

export interface QuoteBlockProps {
  quote: QuotedMessage;
  /** Jumps to the original. Omit when the original is unreachable (deleted,
   *  or outside a window this client cannot load) — the quote then reads as
   *  what it is, a record of something said, rather than a dead control. */
  onJump?: (messageId: string) => void;
  /** Removes the quote — only meaningful in the composer. */
  onDismiss?: () => void;
  className?: string;
  'data-testid'?: string;
}

/** Caps an excerpt on a word boundary so a quote never dominates its reply. */
export function excerpt(text: string, limit = 120): string {
  const flat = text.replace(/\s+/g, ' ').trim();
  if (flat.length <= limit) return flat;
  const cut = flat.slice(0, limit);
  const lastSpace = cut.lastIndexOf(' ');
  // Mid-word truncation reads as corruption rather than as an excerpt.
  return `${(lastSpace > limit * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

function timeLabel(iso?: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export function QuoteBlock({
  quote,
  onJump,
  onDismiss,
  className,
  'data-testid': testId = 'quote-block',
}: QuoteBlockProps) {
  const body = (
    <>
      <span className="flex items-baseline gap-2">
        <span className="truncate text-xs font-semibold text-text-primary">{quote.author}</span>
        {quote.timestamp && (
          <span className="shrink-0 text-[11px] tabular-nums text-text-tertiary">
            {timeLabel(quote.timestamp)}
          </span>
        )}
      </span>
      <span className="block truncate text-xs text-text-secondary">{excerpt(quote.text)}</span>
    </>
  );

  return (
    <div
      data-testid={testId}
      // NOT `data-message-id`: that attribute says what a row IS, and every
      // jump in the app selects on it. A quote is a reference to a message, not
      // that message, and spelling it the same way made `[data-message-id="X"]`
      // match both X and every quote OF X — whichever came first in the
      // document won the scroll. Harmless while the original sits above its
      // replies; wrong the moment the target has scrolled out of the loaded
      // window, which is exactly when somebody presses a quote.
      data-quoted-message-id={quote.messageId}
      className={cn(
        'flex items-start gap-2 rounded border-l-2 border-primary bg-surface-inset px-2 py-1',
        className,
      )}
    >
      {onJump ? (
        <button
          data-ui-part=""
          type="button"
          data-testid={`${testId}-jump`}
          onClick={() => onJump(quote.messageId)}
          aria-label={`Go to the message from ${quote.author}`}
          className="flex min-w-0 flex-1 flex-col items-start text-left hover:underline"
        >
          {body}
        </button>
      ) : (
        <span className="flex min-w-0 flex-1 flex-col">{body}</span>
      )}

      {onDismiss && (
        <button
          data-ui-part=""
          type="button"
          data-testid={`${testId}-dismiss`}
          aria-label="Remove quote"
          onClick={onDismiss}
          className="grid h-5 w-5 shrink-0 place-items-center rounded text-text-tertiary hover:bg-surface-hover hover:text-text-primary"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default QuoteBlock;
