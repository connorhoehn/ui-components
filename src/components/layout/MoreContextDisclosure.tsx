// MoreContextDisclosure — the collapsed "More context" block at the bottom of
// a Workbench: sources, versions, collaborators, each a row with a count that
// can open where that thing lives.
//
// A `Disclosure` (native <details>) so the open/closed state is announced and
// keyboard-operable for free. Rows with `onSelect` are buttons; rows without
// are plain text, because a row that looks pressable and is not is a lie.

import type { ReactNode } from 'react';
import { Disclosure } from '../ui/Disclosure';
import { Button } from '../ui/Button';

export interface MoreContextItem {
  id: string;
  label: string;
  icon?: ReactNode;
  /** Shown after the label — "Sources · 2". */
  count?: number;
  onSelect?: () => void;
}

export interface MoreContextDisclosureProps {
  items: readonly MoreContextItem[];
  /** Summary text. Default "More context". */
  label?: string;
  defaultOpen?: boolean;
  open?: boolean;
  onToggle?: (open: boolean) => void;
  /** Extra content under the rows. */
  children?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

export function MoreContextDisclosure({
  items,
  label = 'More context',
  defaultOpen,
  open,
  onToggle,
  children,
  className,
  'data-testid': testId = 'more-context',
}: MoreContextDisclosureProps) {
  return (
    <Disclosure
      summary={<span className="text-xs font-semibold text-text-primary">{label}</span>}
      density="compact"
      {...(open !== undefined ? { open } : {})}
      {...(defaultOpen !== undefined ? { defaultOpen } : {})}
      {...(onToggle ? { onToggle } : {})}
      className={className}
      data-testid={testId}
    >
      <ul className="m-0 flex list-none flex-col gap-0.5 p-0" data-testid={`${testId}-items`}>
        {items.map((item) => {
          const body = (
            <>
              {item.icon && <span aria-hidden="true" className="flex w-4 shrink-0 justify-center text-text-tertiary">{item.icon}</span>}
              <span className="min-w-0 truncate">{item.label}</span>
              {item.count !== undefined && <span className="text-text-tertiary">· {item.count}</span>}
            </>
          );
          return (
            <li key={item.id}>
              {item.onSelect ? (
                <Button variant="ghost" size="sm" onClick={item.onSelect} className="w-full justify-start gap-1.5" data-testid={`${testId}-${item.id}`}>
                  {body}
                </Button>
              ) : (
                <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-text-secondary" data-testid={`${testId}-${item.id}`}>{body}</span>
              )}
            </li>
          );
        })}
      </ul>
      {children}
    </Disclosure>
  );
}

export default MoreContextDisclosure;
