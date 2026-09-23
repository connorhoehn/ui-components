// ComposerReferences — what a draft points AT, above the words.
//
// ## Why this is a row of its own
//
// A reference added from somewhere else in the product — a slide in a deck, a
// line in a transcript — first lived in the composer's toolbar, alongside
// attach and emoji. That row is a strip of icon-sized controls sized to the
// chat column, so a chip reading "Sprint review · v2 · Slide 4" either
// truncated to "Sprint revie…" or pushed Send off the end of the composer.
// Neither says what the message will carry, which is the chip's only job.
//
// So references get their own full-width row above the editor, where they can
// wrap and be read in full — the same place Slack, Teams and mail clients put
// "replying to" and attachment rows, and the same place the approved Active
// Now prototype draws them.
//
// ## These are labels, not the reference
//
// The host passes text it resolved from what THIS viewer is authorized to
// see. Nothing here is sent: the reference itself travels opaquely in message
// metadata so every reader resolves it against their own access. A chip that
// carried its title onto the wire would leak whatever the sender could read.

import { cn } from '../../lib/cn';
import { DocumentIcon, CloseIcon } from '../ui/Icons';

export interface ComposerReference {
  /** Stable across re-renders; what `onRemove` is called with. */
  id: string;
  /** Already composed by the host — "Sprint review · v2 · Slide 4". */
  label: string;
  /** The referenced thing's own glyph, when it has one. */
  icon?: string;
  /** Hover text; the label itself when absent. */
  title?: string;
}

export interface ComposerReferencesProps {
  references: readonly ComposerReference[];
  /** Omit to render the chips without a remove control. */
  onRemove?: (id: string) => void;
  /** Accessible name for a chip's remove button. */
  removeLabel?: (reference: ComposerReference) => string;
  className?: string;
  /** Chip type. `xs` (default) is the 11px chip of a chat composer; `sm` is the 12px chip of a docked editor card (2.377.0). */
  size?: 'xs' | 'sm' | 'md';
  'data-testid'?: string;
}

const defaultRemoveLabel = (reference: ComposerReference) => `Remove ${reference.label}`;

export function ComposerReferences({
  references,
  onRemove,
  removeLabel = defaultRemoveLabel,
  className,
  size = 'xs',
  'data-testid': testId = 'composer-references',
}: ComposerReferencesProps) {
  // An empty row is not an empty row — it is no row. Rendering the container
  // regardless leaves a gap above every composer in the product.
  if (references.length === 0) return null;
  return (
    <ul
      data-testid={testId}
      className={cn('flex flex-wrap items-center gap-1 px-2 py-1.5', className)}
    >
      {references.map((reference) => (
        <li
          key={reference.id}
          data-testid={`${testId}-item`}
          data-reference-id={reference.id}
          title={reference.title ?? reference.label}
          className={cn('inline-flex min-w-0 max-w-full items-center gap-1 rounded-full border border-border bg-surface pl-2 pr-1 text-text-primary', size === 'md' ? 'gap-1.5 rounded-md bg-surface-inset py-1 pl-2.5 pr-1.5 text-[13px]' : size === 'sm' ? 'py-1 text-xs' : 'py-0.5 text-[11px]')}
        >
          {/* A thing's own icon is data and is rendered as given; the fallback
              glyph means "none chosen" and takes the colour of the text. */}
          {reference.icon
            ? <span aria-hidden="true" className="shrink-0">{reference.icon}</span>
            : <DocumentIcon size={size === 'md' ? 14 : 12} className={cn('shrink-0', size === 'md' ? 'text-text-secondary' : 'text-text-tertiary')} aria-hidden="true" />}
          <span className="min-w-0 truncate">{reference.label}</span>
          {onRemove && (
            <button
              type="button"
              aria-label={removeLabel(reference)}
              onClick={() => onRemove(reference.id)}
              data-testid={`${testId}-remove`}
              className="shrink-0 rounded-full p-0.5 text-text-tertiary hover:bg-surface-hover hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <CloseIcon size={10} />
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

export default ComposerReferences;
