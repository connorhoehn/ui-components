// DocumentModePill — ONE pill naming what the reader can do on this document.
//
// It is not a control. What a person may do here is a fact about their
// access and the document's lifecycle (an owner edits, a commenter suggests,
// a document under review is reviewed, a finalized one is read), and a row
// of four toggles over that fact invited everyone to pick a mode their
// access did not grant. The pill states the fact; `reason` says why.

import Chip, { type ChipTone } from '../shared/Chip';
import { cn } from '../../lib/cn';

export type DocumentModePillMode = 'editing' | 'suggesting' | 'review' | 'read';

export interface DocumentModePillProps {
  mode: DocumentModePillMode;
  /** Why this mode — shown as the tooltip. "Finalized: read only", say. */
  reason?: string;
  className?: string;
  'data-testid'?: string;
}

const PRESENTATION: Record<DocumentModePillMode, { label: string; tone: ChipTone }> = {
  editing: { label: 'Editing', tone: 'info' },
  suggesting: { label: 'Suggesting', tone: 'warning' },
  review: { label: 'Review', tone: 'accent' },
  read: { label: 'Read', tone: 'neutral' },
};

export function DocumentModePill({
  mode,
  reason,
  className,
  'data-testid': testId = 'document-mode-pill',
}: DocumentModePillProps) {
  const { label, tone } = PRESENTATION[mode];
  return (
    <span
      className={cn('inline-flex items-center', className)}
      title={reason}
      aria-label={reason ? `${label}. ${reason}` : label}
      data-testid={testId}
      data-mode={mode}
    >
      <Chip tone={tone} size="sm" className="rounded-full px-2.5">
        {label}
      </Chip>
    </span>
  );
}

export default DocumentModePill;
