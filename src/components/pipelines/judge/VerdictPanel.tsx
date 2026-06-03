import { cn } from '../../../lib/cn';
import Chip from '../../shared/Chip';
import ScoreBarGauge from '../../shared/ScoreBarGauge';
import type { JudgmentResult } from './types';

export interface VerdictPanelProps {
  /** Subset of JudgmentResult — pass `result` directly OR pluck just what you need. */
  result: Pick<
    JudgmentResult,
    | 'overallScore'
    | 'overallVerdict'
    | 'overallPassed'
    | 'confidence'
    | 'rubricSnapshot'
    | 'model'
    | 'mode'
  >;
  className?: string;
}

function verdictTone(verdict: JudgmentResult['overallVerdict']): 'success' | 'danger' | 'warning' {
  if (verdict === 'pass') return 'success';
  if (verdict === 'fail') return 'danger';
  return 'warning';
}

/**
 * The header card for a `JudgmentResult` — overall score gauge + verdict
 * chip + rubric + model + mode metadata. Drop at the top of a
 * `JudgmentResultViewer` or use standalone alongside a CriteriaPanel.
 *
 * Label-prefix verdict tones ("PASS · …") follow the same color-blind-safe
 * convention the vision audit established for EditRecommendationsPanel.
 */
export function VerdictPanel({ result, className }: VerdictPanelProps) {
  const tone = verdictTone(result.overallVerdict);
  const verdictPrefix = tone === 'success' ? 'PASS' : tone === 'danger' ? 'FAIL' : 'INCONCLUSIVE';
  const threshold = result.rubricSnapshot.passThreshold ?? 0.5;

  return (
    <section
      className={cn(
        'flex flex-col gap-2 rounded-lg border border-border bg-surface p-3',
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
          {result.rubricSnapshot.id} v{result.rubricSnapshot.version}
        </span>
        <Chip tone={tone} size="sm">
          {verdictPrefix} · {result.overallVerdict}
        </Chip>
        <span className="text-[11px] text-text-tertiary">·</span>
        <span className="font-mono text-[11px] text-text-tertiary">{result.model}</span>
        <span className="text-[11px] text-text-tertiary">·</span>
        <span className="font-mono text-[11px] text-text-tertiary">mode: {result.mode}</span>
        {typeof result.confidence === 'number' ? (
          <span className="ml-auto font-mono text-[11px] text-text-tertiary">
            confidence {(result.confidence * 100).toFixed(0)}%
          </span>
        ) : null}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-[11px] font-medium uppercase text-text-tertiary">overall</span>
        <ScoreBarGauge
          value={result.overallScore}
          threshold={threshold}
          tone={tone === 'warning' ? 'warning' : tone}
          size="lg"
          ariaLabel={`Overall judge score ${(result.overallScore * 100).toFixed(0)}% — ${verdictPrefix}`}
        />
      </div>
    </section>
  );
}

export default VerdictPanel;
