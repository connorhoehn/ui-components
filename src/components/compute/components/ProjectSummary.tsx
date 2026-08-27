// A project's cost centre in one line.
//
// The unit of budget is the project, not the box: computers are provisioned
// and reaped constantly, and a budget that died with the box would be useless.
// So this is the line you read before deciding whether to start a sixth
// computer — what is allocated, what is spent, how much of that spend was
// never optional, and how much is currently running.
//
// Dollars and tokens are shown side by side because they answer different
// questions. Dollars are the budget. Tokens are the thing that runs out
// inside a single long agent run, and a project can be well under budget
// while a box is about to hit a context ceiling.

import { cn } from '../../../lib/cn';
import Chip from '../../shared/Chip';
import DotMeter from '../../shared/DotMeter';
import { formatTokens, UNASSIGNED_PROJECT_ID, type ProjectRollup } from '../hooks/useComputeProjects';

/** `41m`, `2h 04m` — the shape a countdown wants. */
function formatCountdown(ms: number): string {
  const minutes = Math.max(0, Math.round(ms / 60_000));
  if (minutes < 60) return `${minutes}m`;
  return `${Math.floor(minutes / 60)}h ${String(minutes % 60).padStart(2, '0')}m`;
}

export interface ProjectSummaryProps {
  project: ProjectRollup;
  /** Render the budget meter. Off in tight spaces like a rail row. */
  showMeter?: boolean;
  className?: string;
  'data-testid'?: string;
}

export function ProjectSummary({
  project,
  showMeter = true,
  className,
  'data-testid': testId,
}: ProjectSummaryProps) {
  const { budgetUsd, spentUsd, maintenanceUsd, tokensUsed, tokenBudget } = project;
  const hasBudget = typeof budgetUsd === 'number' && budgetUsd > 0;
  const spent = spentUsd ?? project.liveSpendUsd;
  const fraction = hasBudget ? spent / budgetUsd : 0;

  // The floor an allocation has to clear before any new work fits inside it.
  // Worth its own note because "60% spent" means something very different
  // when half of it is recurring automation nobody chose this month.
  const floorShare = hasBudget && maintenanceUsd ? maintenanceUsd / budgetUsd : null;

  const computers = project.computers.length;
  const unassigned = project.id === UNASSIGNED_PROJECT_ID;

  return (
    <div
      data-testid={testId}
      className={cn('flex flex-col gap-1 font-mono min-w-0', className)}
    >
      <div className="flex items-center gap-2 text-[10px] leading-none min-w-0 flex-wrap">
        {hasBudget ? (
          <span className="text-code-subtle tabular-nums shrink-0">
            ${spent.toFixed(2)}
            <span className="text-code-muted"> / ${budgetUsd.toFixed(0)}</span>
          </span>
        ) : (
          <span className="text-code-subtle tabular-nums shrink-0">
            {spent > 0 ? `$${spent.toFixed(2)}` : '$—'}
          </span>
        )}

        {tokensUsed != null && (
          <>
            <span aria-hidden="true" className="text-code-raised">│</span>
            <span
              className="text-code-muted tabular-nums shrink-0"
              title={tokenBudget ? `${tokensUsed} of ${tokenBudget} tokens` : `${tokensUsed} tokens`}
            >
              {formatTokens(tokensUsed)}
              {tokenBudget ? <span className="text-code-raised">/{formatTokens(tokenBudget)}</span> : null} tok
            </span>
          </>
        )}

        <span className="flex-1 min-w-0" />

        {project.botCount != null && project.botCount > 0 && (
          <Chip size="xs" mono tone="neutral" title="Automations attached to this project">
            {project.botCount} {project.botCount === 1 ? 'bot' : 'bots'}
          </Chip>
        )}

        {computers > 0 && (
          <Chip
            size="xs"
            mono
            tone={project.activeCount > 0 ? 'info' : 'neutral'}
            {...(project.activeCount > 0 ? { dot: 'pulse' as const } : {})}
            title={
              project.activeCount > 0
                ? `${project.activeCount} of ${computers} doing something right now`
                : `${computers} idle`
            }
          >
            {project.activeCount > 0 ? `${project.activeCount}/${computers}` : computers} ▣
          </Chip>
        )}

        {/* Boxes reap themselves. Surfacing the soonest deadline at project
            level is what stops "where did my computer go" being a surprise. */}
        {project.soonestExpiryMs != null && (
          <Chip
            size="xs"
            mono
            tone={project.soonestExpiryMs < 5 * 60_000 ? 'warning' : 'neutral'}
            title="Time until the first of these computers stops on its own"
          >
            ⟳ {formatCountdown(project.soonestExpiryMs)}
          </Chip>
        )}
      </div>

      {showMeter && hasBudget && (
        <DotMeter
          label="budget"
          value={fraction}
          note={
            floorShare != null
              ? `${Math.round(floorShare * 100)}% is upkeep`
              : project.periodResetsAt
                ? `⟳ ${new Date(project.periodResetsAt).toLocaleDateString()}`
                : undefined
          }
          tone="code"
        />
      )}

      {unassigned && (
        <span className="text-[10px] text-code-raised">
          not charged to any project
        </span>
      )}
    </div>
  );
}
