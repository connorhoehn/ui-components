import { cn } from '../../../lib/cn';
import Chip from '../../shared/Chip';
import ScoreBarGauge from '../../shared/ScoreBarGauge';
import type { AggregateRow } from './types';

export interface AggregateSummaryCardProps {
  aggregate: AggregateRow;
  className?: string;
}

/**
 * Single-row summary card for one day's rollup. Pass-rate as a gauge,
 * verdict tone derived from numPassed/numJudgments, totals on the right.
 *
 * No fetch. No URL knowledge. Renders whatever `aggregate` it receives.
 */
export function AggregateSummaryCard({ aggregate, className }: AggregateSummaryCardProps) {
  const passRate = aggregate.numJudgments > 0
    ? aggregate.numPassed / aggregate.numJudgments
    : 0;
  const meanScore = aggregate.numJudgments > 0
    ? aggregate.sumOverallScore / aggregate.numJudgments
    : 0;

  const tone = passRate >= 0.9 ? 'success' : passRate >= 0.6 ? 'warning' : 'danger';
  const verdictPrefix = tone === 'success' ? 'HEALTHY' : tone === 'warning' ? 'MIXED' : 'FAILING';

  return (
    <section
      data-ui-part=""
      className={cn(
        'flex flex-col gap-2 rounded-lg border border-border bg-surface p-3',
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
          {aggregate.dayBucket}
        </span>
        <Chip tone={tone} size="sm">
          {verdictPrefix} · {(passRate * 100).toFixed(0)}% pass
        </Chip>
        <span className="ml-auto font-mono text-[11px] text-text-tertiary">
          {aggregate.numJudgments} judgments
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-[11px] font-medium uppercase text-text-tertiary">mean score</span>
        <ScoreBarGauge
          value={meanScore}
          tone={tone === 'warning' ? 'warning' : tone}
          size="md"
          ariaLabel={`Mean score ${(meanScore * 100).toFixed(0)}% across ${aggregate.numJudgments} judgments`}
        />
      </div>
      <div className="flex flex-wrap items-center gap-2 text-[11px] text-text-tertiary">
        <span>
          tokens <span className="font-mono">{aggregate.sumTokensIn}</span> in /{' '}
          <span className="font-mono">{aggregate.sumTokensOut}</span> out
        </span>
        <span>·</span>
        <span>
          cost <span className="font-mono">${aggregate.sumCostUsd.toFixed(4)}</span>
        </span>
        {typeof aggregate.minOverallScore === 'number' && typeof aggregate.maxOverallScore === 'number' ? (
          <>
            <span>·</span>
            <span>
              range <span className="font-mono">{aggregate.minOverallScore.toFixed(2)}</span>–
              <span className="font-mono">{aggregate.maxOverallScore.toFixed(2)}</span>
            </span>
          </>
        ) : null}
        <span>·</span>
        <span className="font-mono">{aggregate.numPassed} pass / {aggregate.numFailed} fail</span>
      </div>
    </section>
  );
}

export default AggregateSummaryCard;
