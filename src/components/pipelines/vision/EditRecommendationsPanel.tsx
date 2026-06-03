import { cn } from '../../../lib/cn';
import Chip from '../../shared/Chip';
import type { VisionResult } from './types';

export interface EditRecommendationsPanelProps {
  exposure?: VisionResult['exposure'];
  whiteBalance?: VisionResult['whiteBalance'];
  contrast?: VisionResult['contrast'];
  composition?: VisionResult['composition'];
  edits?: VisionResult['edits'];
  onApplyEdit?: (edit: string) => void;
  className?: string;
}

function verdictTone(verdict: string | undefined): 'success' | 'warning' | 'neutral' {
  if (!verdict) return 'neutral';
  if (verdict === 'correct' || verdict === 'neutral' || verdict === 'normal') return 'success';
  return 'warning';
}

/**
 * Photographer-style edit panel. The verdict chips include a label prefix
 * ("OK", "ADJUST") so the signal is conveyed by text — not color alone —
 * to satisfy WCAG 1.4.1 (use of color).
 */
function verdictLabel(verdict: string | undefined): string {
  const tone = verdictTone(verdict);
  if (tone === 'success') return `OK · ${verdict}`;
  if (tone === 'warning') return `ADJUST · ${verdict}`;
  return verdict ?? '';
}

export function EditRecommendationsPanel({
  exposure,
  whiteBalance,
  contrast,
  composition,
  edits,
  onApplyEdit,
  className,
}: EditRecommendationsPanelProps) {
  const anyVerdict = exposure || whiteBalance || contrast || composition;
  const anyEdits = (edits ?? []).length > 0;
  if (!anyVerdict && !anyEdits) return null;
  return (
    <section className={cn('flex flex-col gap-2', className)}>
      <h4 className="text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
        Edits &amp; Quality
      </h4>
      {anyVerdict ? (
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          {exposure ? (
            <div className="rounded-lg border border-border bg-surface p-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-medium text-text-tertiary">EXPOSURE</span>
                <Chip tone={verdictTone(exposure.verdict)} size="sm">{verdictLabel(exposure.verdict)}</Chip>
                {exposure.evAdjustment !== 0 ? (
                  <span className="font-mono text-[11px] text-text-tertiary">
                    {exposure.evAdjustment > 0 ? '+' : ''}
                    {exposure.evAdjustment.toFixed(1)} EV
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-[12px] text-text-primary">{exposure.rationale}</p>
            </div>
          ) : null}
          {whiteBalance ? (
            <div className="rounded-lg border border-border bg-surface p-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-medium text-text-tertiary">WB</span>
                <Chip tone={verdictTone(whiteBalance.verdict)} size="sm">{verdictLabel(whiteBalance.verdict)}</Chip>
                {whiteBalance.kelvinShift ? (
                  <span className="font-mono text-[11px] text-text-tertiary">
                    {whiteBalance.kelvinShift > 0 ? '+' : ''}
                    {whiteBalance.kelvinShift}K
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-[12px] text-text-primary">{whiteBalance.rationale}</p>
            </div>
          ) : null}
          {contrast ? (
            <div className="rounded-lg border border-border bg-surface p-2">
              <span className="text-[11px] font-medium text-text-tertiary">CONTRAST</span>
              <span className="ml-1.5"><Chip tone={verdictTone(contrast)} size="sm">{verdictLabel(contrast)}</Chip></span>
            </div>
          ) : null}
          {composition ? (
            <div className="rounded-lg border border-border bg-surface p-2">
              <span className="text-[11px] font-medium text-text-tertiary">COMPOSITION</span>
              <p className="mt-1 text-[12px] text-text-primary">{composition}</p>
            </div>
          ) : null}
        </div>
      ) : null}
      {anyEdits ? (
        <ul className="flex flex-col gap-1">
          {(edits ?? []).map((edit, i) => (
            <li
              key={`${i}-${edit.slice(0, 20)}`}
              className="flex items-start justify-between gap-2 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-[13px]"
            >
              <span className="flex-1 text-text-primary">{edit}</span>
              {onApplyEdit ? (
                <button
                  type="button"
                  onClick={() => onApplyEdit(edit)}
                  className="shrink-0 rounded-md border border-border bg-surface-hover px-2 py-0.5 text-[11px] font-medium text-text-primary hover:bg-surface-panel focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  Apply
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export default EditRecommendationsPanel;
