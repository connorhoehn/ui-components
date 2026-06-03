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
 * Photographer-style edit panel: exposure / WB / contrast verdicts +
 * actionable edit suggestions. Each edit row has an optional "Apply" hook
 * for downstream pipelines (e.g. queueing an `image:edit-apply` step).
 */
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
    <section className={['flex flex-col gap-2', className].filter(Boolean).join(' ')}>
      <h4 className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-muted,#64748b)]">
        Edits &amp; Quality
      </h4>
      {anyVerdict ? (
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          {exposure ? (
            <div className="rounded-md border border-[var(--color-border,#e2e8f0)] bg-[var(--color-surface,#fff)] p-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-medium text-[var(--color-text-muted,#64748b)]">EXPOSURE</span>
                <Chip tone={verdictTone(exposure.verdict)} size="sm">{exposure.verdict}</Chip>
                {exposure.evAdjustment !== 0 ? (
                  <span className="font-mono text-[11px] text-[var(--color-text-muted,#94a3b8)]">
                    {exposure.evAdjustment > 0 ? '+' : ''}
                    {exposure.evAdjustment.toFixed(1)} EV
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-[12px] text-[var(--color-text,#0f172a)]">{exposure.rationale}</p>
            </div>
          ) : null}
          {whiteBalance ? (
            <div className="rounded-md border border-[var(--color-border,#e2e8f0)] bg-[var(--color-surface,#fff)] p-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-medium text-[var(--color-text-muted,#64748b)]">WB</span>
                <Chip tone={verdictTone(whiteBalance.verdict)} size="sm">{whiteBalance.verdict}</Chip>
                {whiteBalance.kelvinShift ? (
                  <span className="font-mono text-[11px] text-[var(--color-text-muted,#94a3b8)]">
                    {whiteBalance.kelvinShift > 0 ? '+' : ''}
                    {whiteBalance.kelvinShift}K
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-[12px] text-[var(--color-text,#0f172a)]">{whiteBalance.rationale}</p>
            </div>
          ) : null}
          {contrast ? (
            <div className="rounded-md border border-[var(--color-border,#e2e8f0)] bg-[var(--color-surface,#fff)] p-2">
              <span className="text-[11px] font-medium text-[var(--color-text-muted,#64748b)]">CONTRAST</span>
              <span className="ml-1.5"><Chip tone={verdictTone(contrast)} size="sm">{contrast}</Chip></span>
            </div>
          ) : null}
          {composition ? (
            <div className="rounded-md border border-[var(--color-border,#e2e8f0)] bg-[var(--color-surface,#fff)] p-2">
              <span className="text-[11px] font-medium text-[var(--color-text-muted,#64748b)]">COMPOSITION</span>
              <p className="mt-1 text-[12px] text-[var(--color-text,#0f172a)]">{composition}</p>
            </div>
          ) : null}
        </div>
      ) : null}
      {anyEdits ? (
        <ul className="flex flex-col gap-1">
          {(edits ?? []).map((edit, i) => (
            <li
              key={`${i}-${edit.slice(0, 20)}`}
              className="flex items-start justify-between gap-2 rounded-md border border-[var(--color-border,#e2e8f0)] bg-[var(--color-surface,#fff)] px-2.5 py-1.5 text-[13px]"
            >
              <span className="flex-1 text-[var(--color-text,#0f172a)]">{edit}</span>
              {onApplyEdit ? (
                <button
                  type="button"
                  onClick={() => onApplyEdit(edit)}
                  className="shrink-0 rounded-md border border-[var(--color-border,#e2e8f0)] bg-[var(--color-surface-hover,#f1f5f9)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-text,#0f172a)] hover:bg-[var(--color-surface-active,#e2e8f0)]"
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
