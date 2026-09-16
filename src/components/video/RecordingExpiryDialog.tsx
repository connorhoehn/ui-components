// RecordingExpiryDialog — "Set to expire … View or change".
//
// Teams shows a recording's expiry under its thumbnail and lets the
// organizer move it or remove it. This is that dialog: the presets people
// actually pick (a month, a quarter, a year, never), a date for anything
// else, and the current value stated plainly so a person knows what they
// are changing from.

import { useEffect, useMemo, useState } from 'react';
import Modal from '../shared/Modal';
import FormField from '../shared/FormField';
import { ChoiceList, ChoiceRow } from '../shared/ChoiceList';
import { Button } from '../ui/Button';
import { cn } from '../../lib/cn';

export type RecordingExpiryChoice = '30d' | '90d' | '365d' | 'never' | 'custom';

export interface RecordingExpiryDialogProps {
  open: boolean;
  /** ISO, or null when the recording does not expire. */
  expiresAt: string | null | undefined;
  /** Resolves when the server has the new value; rejects with a reason to show. */
  onSave: (expiresAt: string | null) => Promise<void> | void;
  onClose: () => void;
  title?: string;
  'data-testid'?: string;
}

const DAY_MS = 24 * 60 * 60 * 1000;

const PRESETS: ReadonlyArray<{ id: RecordingExpiryChoice; title: string; days?: number }> = [
  { id: '30d', title: 'In 30 days', days: 30 },
  { id: '90d', title: 'In 90 days', days: 90 },
  { id: '365d', title: 'In a year', days: 365 },
  { id: 'never', title: 'Never' },
  { id: 'custom', title: 'On a date…' },
];

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
}

/** yyyy-mm-dd for <input type="date">, in local time. */
function toDateInput(ms: number): string {
  const d = new Date(ms);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** What a choice means as an instant: end of that day in local time. */
export function resolveExpiryChoice(choice: RecordingExpiryChoice, customDate: string, now = Date.now()): string | null | undefined {
  if (choice === 'never') return null;
  const preset = PRESETS.find((p) => p.id === choice);
  if (preset?.days) return new Date(now + preset.days * DAY_MS).toISOString();
  if (choice === 'custom') {
    if (!customDate) return undefined;
    const d = new Date(`${customDate}T23:59:59`);
    return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
  }
  return undefined;
}

export function RecordingExpiryDialog({
  open,
  expiresAt,
  onSave,
  onClose,
  title = 'Recording expiry',
  'data-testid': testId = 'recording-expiry-dialog',
}: RecordingExpiryDialogProps) {
  const [choice, setChoice] = useState<RecordingExpiryChoice>(expiresAt === null ? 'never' : 'custom');
  const [customDate, setCustomDate] = useState<string>(expiresAt ? toDateInput(Date.parse(expiresAt)) : '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Re-seed from the recording each time the dialog opens.
  useEffect(() => {
    if (!open) return;
    setChoice(expiresAt === null ? 'never' : 'custom');
    setCustomDate(expiresAt ? toDateInput(Date.parse(expiresAt)) : '');
    setError(null);
    setBusy(false);
  }, [open, expiresAt]);

  const next = useMemo(() => resolveExpiryChoice(choice, customDate), [choice, customDate]);
  const tooSoon = typeof next === 'string' && Date.parse(next) < Date.now() + 60 * 60 * 1000;
  const canSave = next !== undefined && !tooSoon && !busy;

  const current = expiresAt === null
    ? 'This recording does not expire.'
    : expiresAt
      ? `Set to expire ${formatDate(expiresAt)}.`
      : 'No expiry is recorded.';

  const save = async () => {
    if (next === undefined) return;
    setBusy(true);
    setError(null);
    try {
      await onSave(next);
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setBusy(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      maxWidth={440}
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose} disabled={busy} data-testid={`${testId}-cancel`}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={() => void save()} disabled={!canSave} data-testid={`${testId}-save`}>
            {busy ? 'Saving…' : 'Save'}
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-3 text-sm" data-testid={testId}>
        <p className="m-0 text-text-secondary" data-testid={`${testId}-current`}>{current}</p>
        <ChoiceList data-testid={`${testId}-choices`}>
          {PRESETS.map((p) => (
            <ChoiceRow
              key={p.id}
              title={p.title}
              icon={<span className={cn('text-sm', choice === p.id ? 'text-primary' : 'text-transparent')}>✓</span>}
              onSelect={() => setChoice(p.id)}
              disabled={busy}
              data-testid={`${testId}-choice-${p.id}`}
            />
          ))}
        </ChoiceList>
        {choice === 'custom' && (
          <FormField label="Expires on" hint="At the end of that day, your local time." {...(tooSoon ? { error: 'Pick a date at least an hour from now.' } : {})}>
            {(wiring) => (
              <input
                {...wiring}
                type="date"
                value={customDate}
                min={toDateInput(Date.now())}
                onChange={(e) => setCustomDate(e.target.value)}
                className="rounded-md border border-border bg-surface px-2 py-1.5 text-sm text-text-primary"
                data-testid={`${testId}-date`}
              />
            )}
          </FormField>
        )}
        {error && <p className="m-0 text-xs text-danger-fg" role="alert" data-testid={`${testId}-error`}>{error}</p>}
      </div>
    </Modal>
  );
}

export default RecordingExpiryDialog;
