// TakeRow — one recorded or generated take in a list of takes: its play
// control, its name with a tag ("Proposed", "Kept"), one muted line of what it
// measured, an optional second line (what was heard), and its actions at the
// end. Since 2.534.0.
//
// Audition lists (music, voices, sound effects) drew each take as a card in a
// grid, three across, each card tall with its numbers; a list of takes reads
// better as rows, so the takes line up and the choice is one glance down. On a
// narrow container the actions move under the text instead of squeezing it.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface TakeRowProps {
  /** The take's play control, usually a small "Play" button. */
  play?: ReactNode;
  /** The take's name: "Take 2a". */
  title: ReactNode;
  /** Tags after the name: a "Proposed" or "Passes" pill. */
  tags?: ReactNode;
  /** One muted line of what it measured: "4.48 s · -19.2 LUFS · every word heard". */
  meta?: ReactNode;
  /** An optional second line, such as the transcript; clamped to two lines. */
  detail?: ReactNode;
  /** The take's actions ("Keep take 2a"), at the end of the row. */
  actions?: ReactNode;
  /** The proposed or chosen take: drawn on the selected surface. */
  selected?: boolean;
  className?: string;
  'data-testid'?: string;
}

export function TakeRow({ play, title, tags, meta, detail, actions, selected = false, className, 'data-testid': testId }: TakeRowProps) {
  return (
    <div
      data-ui-part=""
      data-testid={testId}
      data-selected={selected ? 'true' : undefined}
      className={cn(
        'flex w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-2 rounded-md border px-3 py-2',
        selected ? 'border-primary bg-primary-bg' : 'border-border bg-surface-panel',
        className,
      )}
    >
      {play != null && <div className="shrink-0">{play}</div>}
      <div className="flex min-w-0 flex-1 basis-40 flex-col gap-0.5">
        <div className="flex min-w-0 flex-wrap items-center gap-1.5 text-[13px] font-semibold text-text-primary">
          <span className="min-w-0 truncate">{title}</span>
          {tags}
        </div>
        {meta != null && <div className="min-w-0 text-[12px] text-text-secondary">{meta}</div>}
        {detail != null && <div className="line-clamp-2 min-w-0 text-[12px] text-text-tertiary">{detail}</div>}
      </div>
      {actions != null && <div className="ml-auto flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}

export default TakeRow;
