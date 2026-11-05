import { cn } from '../../../lib/cn';
import Chip from '../../shared/Chip';
import ScoreBarGauge from '../../shared/ScoreBarGauge';
import type {
  CriterionScore,
  JudgmentCriterion,
  JudgmentResult,
} from './types';

export interface CriteriaPanelProps {
  /** Subset of JudgmentResult — pass `result` directly OR pluck just what you need. */
  result: Pick<JudgmentResult, 'criteria' | 'rubricSnapshot'>;
  className?: string;
}

/**
 * Per-criterion rows: id + raw score + verdict chip + 0..1 gauge +
 * rationale. The rubric prompt sits inline so users can see the question
 * the model was answering without flipping tabs.
 */
export function CriteriaPanel({ result, className }: CriteriaPanelProps) {
  if (!result.criteria || result.criteria.length === 0) return null;

  // Build a fast id → def lookup so each row knows its prompt + scale.
  const defById = new Map<string, JudgmentCriterion>();
  for (const c of result.rubricSnapshot.criteria) defById.set(c.id, c);

  return (
    <section data-ui-part="" className={cn('flex flex-col gap-1.5', className)}>
      <h4 className="text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
        Criteria ({result.criteria.length})
      </h4>
      <ul className="flex flex-col gap-1.5">
        {result.criteria.map((c) => (
          <CriterionRow key={c.criterionId} score={c} def={defById.get(c.criterionId)} />
        ))}
      </ul>
    </section>
  );
}

function CriterionRow({
  score,
  def,
}: {
  score: CriterionScore;
  def: JudgmentCriterion | undefined;
}) {
  const tone = score.passed ? 'success' : 'danger';
  const passLabel = score.passed ? 'PASS' : 'FAIL';
  const scaleLabel = def?.scale ?? '0-1';
  return (
    <li className="flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-2.5">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="font-mono text-[11px] font-semibold text-text-primary">
          {score.criterionId}
        </span>
        <span className="font-mono text-[10px] uppercase text-text-tertiary">
          [{scaleLabel}]
        </span>
        <Chip tone={tone} size="sm">{passLabel}</Chip>
        <span className="ml-auto font-mono text-[11px] text-text-tertiary">
          raw: {String(score.rawScore)}
        </span>
      </div>
      <ScoreBarGauge
        value={score.score}
        threshold={def?.failThreshold ?? 0.5}
        tone={tone}
        size="sm"
        ariaLabel={`Criterion ${score.criterionId} score ${(score.score * 100).toFixed(0)}% — ${passLabel}`}
      />
      {def?.prompt ? (
        <p className="text-[12px] italic leading-snug text-text-tertiary">
          “{def.prompt}”
        </p>
      ) : null}
      {score.rationale ? (
        <p className="text-[13px] leading-snug text-text-primary">
          {score.rationale}
        </p>
      ) : null}
    </li>
  );
}

export default CriteriaPanel;
