import { cn } from '../../../lib/cn';
import type { WorkGraphEdgeData, WorkGraphNodeData } from './types';
import { WORK_NODE_KIND_ACCENT, WORK_NODE_KIND_ICONS, WORK_NODE_KIND_LABELS, workNodeKindCounts } from './workKinds';

export interface WorkKindLegendProps {
  nodes: readonly Pick<WorkGraphNodeData, 'kind'>[];
  edges: readonly unknown[] | readonly WorkGraphEdgeData[];
  className?: string;
  'data-testid'?: string;
}

const plural = (count: number, one: string, many: string) => `${count} ${count === 1 ? one : many}`;

/**
 * What the cards' colours and glyphs mean, and how much is on the canvas:
 * every kind of work present (its card chip, its name, how many) and the
 * "N items · M links" count. Painted from the same accent map as the cards.
 *
 * The kind names fold away in a narrow container (an ancestor `@container`,
 * such as the activity header) — the chips keep their counts, and each item
 * keeps its full name as its accessible label and tooltip.
 */
export function WorkKindLegend({ nodes, edges, className, 'data-testid': testId = 'work-kind-legend' }: WorkKindLegendProps) {
  const kinds = workNodeKindCounts(nodes);
  return (
    <span className={cn('flex min-w-0 items-center gap-3 text-[12px] text-text-tertiary', className)} data-testid={testId}>
      <ul aria-label="Kinds of work shown" className="flex min-w-0 items-center gap-2">
        {kinds.map(({ kind, count }) => {
          const label = `${count} ${WORK_NODE_KIND_LABELS[kind]}`;
          return (
            <li key={kind} className="flex shrink-0 items-center gap-1" title={label} aria-label={label} data-kind={kind} data-count={count} data-testid={`${testId}-kind`}>
              <span aria-hidden="true" className={cn('flex h-4 w-4 items-center justify-center rounded text-[10px] leading-none', WORK_NODE_KIND_ACCENT[kind].chip)}>{WORK_NODE_KIND_ICONS[kind]}</span>
              <span aria-hidden="true" className="hidden @3xl:inline">{WORK_NODE_KIND_LABELS[kind]}</span>
              <span aria-hidden="true" className="tabular-nums">{count}</span>
            </li>
          );
        })}
      </ul>
      <span className="shrink-0 tabular-nums text-text-secondary" data-testid={`${testId}-counts`} data-nodes={nodes.length} data-edges={edges.length}>
        {plural(nodes.length, 'item', 'items')} · {plural(edges.length, 'link', 'links')}
      </span>
    </span>
  );
}

export default WorkKindLegend;
