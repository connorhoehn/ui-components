// CopyIdButton — a record's id behind one small control, never in the text.
//
// A page names a record by what a person calls it (a bot's name, a run's
// title); its id is still the thing an operator pastes into a log search or a
// ticket. Pages had two bad choices: print `bot:32970d0a-…` in a facts table,
// or drop the id. This is the third: a ghost icon button beside the name whose
// tooltip shows the id and whose click copies it, with a tick and a polite
// announcement when it lands (2.515.5).
import { useEffect, useState } from 'react';
import { IconButton } from '../ui/IconButton';
import { CheckIcon, CopyIcon } from '../ui/Icons';
import { Tooltip } from './Tooltip';

export interface CopyIdButtonProps {
  /** The id to copy. Shown in the tooltip, never in the page's text. */
  value: string;
  /** What the id is, for the accessible name: "Copy the bot's id". Default "Copy id". */
  label?: string;
  className?: string;
  'data-testid'?: string;
}

/**
 * Use this when a record is named in words and its id must stay one action
 * away: `<Inline>{bot.name}<CopyIdButton value={bot.id} label="Copy the bot's id" /></Inline>`.
 */
export function CopyIdButton({ value, label = 'Copy id', className, 'data-testid': testId = 'copy-id' }: CopyIdButtonProps) {
  const [copied, setCopied] = useState(false);
  // The tick is a transient acknowledgement, not state worth keeping.
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);
  const copy = () => {
    // The clipboard is undefined on an insecure origin and rejects when the
    // document is not focused; the id is still in the tooltip, so a failure is
    // a non-event, never a toast.
    try {
      void navigator.clipboard?.writeText(value).then(() => setCopied(true), () => {});
    } catch { /* the tooltip still shows the id */ }
  };
  return (
    <Tooltip content={copied ? 'Copied' : value}>
      <IconButton
        aria-label={copied ? `${label}: copied` : label}
        variant="ghost"
        size="sm"
        icon={copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
        onClick={copy}
        className={className}
        data-copy-id={value}
        data-testid={testId}
      />
    </Tooltip>
  );
}

export default CopyIdButton;
