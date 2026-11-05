// TechnicalDetails — a disclosure for the raw internal text behind a
// human-readable failure message.
//
// The pattern this exists to stop is the two-bad-choices one: either the
// screen prints `enqueue failed: [durable-transport] publish to
// "transcription-job-queued" failed after 3 attempts: fetch failed` at a
// user, or it prints "Something went wrong" and destroys the one string
// that would have let anybody diagnose it.
//
// So: the caller leads with a sentence a person can act on and drops this
// underneath. Collapsed it costs one small line; expanded it shows the
// original verbatim, selectable, with a copy control for pasting into a bug
// report. Nothing is hidden — it is one click away and it is exact.
//
// Deliberately NOT another Error* component. There are already three
// (ErrorState, ErrorDisplay, ErrorPanel) and none of them is missing;
// what was missing is the disclosure, which composes into all of them and
// into panels that are not error-shaped at all (a transcript card, an
// activity row).

import { useEffect, useId, useState } from 'react';
import { cn } from '../../lib/cn';

export interface TechnicalDetailsProps {
  /** The raw text. Rendered verbatim. Nothing renders when empty. */
  text?: string | null;
  /** Trigger copy, collapsed state. Default "Show technical details". */
  label?: string;
  /** Trigger copy, expanded state. Default "Hide technical details". */
  hideLabel?: string;
  /** Start expanded. Default false — the point is that it stays out of the way. */
  defaultOpen?: boolean;
  className?: string;
  testId?: string;
}

function TechnicalDetails({
  text,
  label = 'Show technical details',
  hideLabel = 'Hide technical details',
  defaultOpen = false,
  className,
  testId = 'technical-details',
}: TechnicalDetailsProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [copied, setCopied] = useState(false);
  const bodyId = useId();

  // The tick is a transient acknowledgement, not state worth persisting.
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  const value = typeof text === 'string' ? text.trim() : '';
  if (!value) return null;

  const copy = () => {
    // navigator.clipboard is undefined on insecure origins and can reject
    // when the document is not focused. Either way the text is still on
    // screen and selectable, so a failure is a non-event — never a toast.
    try {
      void navigator.clipboard?.writeText(value).then(
        () => setCopied(true),
        () => { /* selectable text is the fallback */ },
      );
    } catch {
      /* selectable text is the fallback */
    }
  };

  return (
    <div className={cn('flex flex-col gap-1.5', className)} data-testid={testId}>
      <div className="flex items-center gap-2">
        <button
          data-ui-part=""
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={bodyId}
          data-testid={`${testId}-toggle`}
          className={cn(
            'self-start text-[11px] font-medium text-text-tertiary',
            'underline decoration-dotted underline-offset-2',
            'bg-transparent border-none p-0 cursor-pointer',
            'hover:text-text-secondary',
          )}
        >
          {open ? hideLabel : label}
        </button>
        {open && (
          <button
            data-ui-part=""
            type="button"
            onClick={copy}
            data-testid={`${testId}-copy`}
            className={cn(
              'text-[11px] font-medium text-text-tertiary',
              'bg-transparent border-none p-0 cursor-pointer hover:text-text-secondary',
            )}
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        )}
      </div>
      {open && (
        <pre
          id={bodyId}
          data-testid={`${testId}-text`}
          className={cn(
            'm-0 max-h-40 overflow-auto rounded-md',
            'bg-surface-panel border border-border',
            'px-2 py-1.5 text-[11px] leading-snug text-text-secondary',
            'font-mono whitespace-pre-wrap break-words select-text',
          )}
        >
          {value}
        </pre>
      )}
    </div>
  );
}

export default TechnicalDetails;
