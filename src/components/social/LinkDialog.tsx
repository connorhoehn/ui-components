// LinkDialog — paste a URL, name the text, get a link.
//
// ## Why the composer owns this instead of asking the host
//
// The link button first delegated to an `onRequestLink` callback. Every host
// that did not pass one got a button that silently did nothing — which is what
// shipped, and what "the hyperlink doesn't work" meant. A control the library
// RENDERS is a control the library must be able to complete. The callback
// survives as an override for hosts that want their own dialog; it is no
// longer the only path.
//
// ## Two fields, because a link is two things
//
// The URL and the text people read are different, and editing either after the
// fact is the common case ("make this say 'the RFC' instead of the raw URL").
// A single prompt for the URL cannot express that, which is why `window.prompt`
// is not adequate here even where it is allowed.

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import Modal from '../shared/Modal';
import { Button } from '../ui/Button';
import { Input } from '../forms/Input';

export interface LinkDialogValue {
  href: string;
  /** The visible text. Empty means "keep whatever is selected". */
  text: string;
}

export interface LinkDialogProps {
  open: boolean;
  /** Selected text at the time the dialog opened; prefills the label. */
  initialText?: string;
  /** Existing href when editing a link rather than creating one. */
  initialHref?: string;
  onSubmit: (value: LinkDialogValue) => void;
  onRemove?: () => void;
  onClose: () => void;
  'data-testid'?: string;
}

/**
 * Accepts what people actually paste.
 *
 * `example.com` is a URL to everyone except a URL parser, so a bare host gets
 * https://. Anything with a scheme is left alone — including mailto: and
 * relative paths, which a naive prefix would corrupt.
 */
export function normalizeHref(raw: string): string {
  const v = raw.trim();
  if (!v) return '';
  if (/^[a-z][a-z0-9+.-]*:/i.test(v)) return v;
  if (v.startsWith('/') || v.startsWith('#')) return v;
  return `https://${v}`;
}

export function LinkDialog({
  open,
  initialText = '',
  initialHref = '',
  onSubmit,
  onRemove,
  onClose,
  'data-testid': testId = 'link-dialog',
}: LinkDialogProps) {
  const [href, setHref] = useState(initialHref);
  const [text, setText] = useState(initialText);
  const hrefRef = useRef<HTMLInputElement | null>(null);

  // Reset per opening: a dialog that reopens holding the last link's URL will
  // eventually attach the wrong one to something.
  useEffect(() => {
    if (!open) return;
    setHref(initialHref);
    setText(initialText);
    // The URL is the field you came here to fill; the text is usually already
    // right from the selection.
    const id = setTimeout(() => hrefRef.current?.focus(), 0);
    return () => clearTimeout(id);
  }, [open, initialHref, initialText]);

  const commit = () => {
    const normalized = normalizeHref(href);
    if (!normalized) return;
    onSubmit({ href: normalized, text: text.trim() });
  };

  return (
    <Modal open={open} onClose={onClose} title={initialHref ? 'Edit link' : 'Add link'} data-testid={testId}>
      <div className="flex flex-col gap-3 p-1">
        <label className="flex flex-col gap-1 text-xs text-text-secondary">
          Address
          <Input
            ref={hrefRef}
            value={href}
            placeholder="https://example.com"
            data-testid={`${testId}-href`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHref(e.target.value)}
            onKeyDown={(e: ReactKeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') { e.preventDefault(); commit(); }
            }}
          />
        </label>

        <label className="flex flex-col gap-1 text-xs text-text-secondary">
          Text to display
          <Input
            value={text}
            placeholder="Leave blank to use the address"
            data-testid={`${testId}-text`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
            onKeyDown={(e: ReactKeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') { e.preventDefault(); commit(); }
            }}
          />
        </label>

        <div className="mt-1 flex items-center gap-2">
          <Button variant="primary" size="sm" onClick={commit} disabled={!href.trim()} data-testid={`${testId}-submit`}>
            {initialHref ? 'Update' : 'Add link'}
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
          {onRemove && initialHref && (
            <Button variant="danger" size="sm" className="ml-auto" onClick={onRemove} data-testid={`${testId}-remove`}>
              Remove
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default LinkDialog;
