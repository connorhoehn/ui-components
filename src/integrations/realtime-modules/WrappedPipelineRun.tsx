// src/integrations/realtime-modules/WrappedPipelineRun.tsx
//
// A pipeline run as a card, wired to usePipelineRunStatus() from
// realtime-modules (`client/pipelines`): the hook returns a lookup, and the
// host passes `status={statusOf(runId)}`. This draws the running state the
// Storymaker concepts (§5) give a record while a job works on it:
//
//   - a card titled with the stage ("Mesh generation (Meshy)"), a state pill
//     and the header's own action ("Open in Meshy ↗");
//   - a facts row (Job ID · Model · Preset · Topology · Created);
//   - a horizontal `WorkflowStepper` of the run's steps, each with its time;
//   - while it works, a `RunProgressPanel` (one sentence, Elapsed, Est.
//     remaining, a bar, Refresh status, Cancel job confirmed in place);
//   - a slot for the picture (`SubjectHero`, `ImageCompare`) and one for the
//     log (`ExecutorLog` from `/pipelines`, injected so this subpath does not
//     load the pipelines bundle).
//
// `compact` is the narrow-inspector form: one line ("Drawing Mina · step 2
// of 3") with Cancel and Open run, nothing else.
//
// Markers: `data-pipeline-run`, `data-run-phase` (the hook's phase).

import type { ReactNode } from 'react';
import type { RMPipelineRunPhase, RMPipelineRunStatus, RMPipelineRunStepDetail } from './types';
import { Card } from '../../components/ui/Card';
import { Stack, Inline } from '../../components/ui/Stack';
import { Button } from '../../components/ui/Button';
import CardHeader from '../../components/shared/CardHeader';
import { StatusPill, type StatusPillTone } from '../../components/shared/StatusPill';
import { WorkflowStepper, type WorkflowStep } from '../../components/shared/WorkflowStepper';
import { KeyValue, type KeyValueItem } from '../../components/shared/KeyValue';
import { RunProgressPanel } from '../../components/shared/RunProgressPanel';
import { ConfirmButton } from '../../components/shared/ConfirmButton';
import { InlineAlert } from '../../components/shared/InlineAlert';
import LoadingState from '../../components/shared/LoadingState';
import { Text } from '../../components/shared/Text';

/** A step's time beside its label ("9:02"), keyed by step id. */
export type WrappedPipelineRunStepTime = Record<string, string>;

export interface WrappedPipelineRunProps {
  /** `usePipelineRunStatus(runs, opts)(runId)`. Undefined while the first snapshot loads. */
  status: RMPipelineRunStatus | undefined;
  /** The stage: "Mesh generation (Meshy)". */
  title: string;
  /** The title's heading element (since 2.515.12). Default `h3`; `h2` for a card directly under the page title. */
  titleAs?: 'h2' | 'h3' | 'h4';
  /** A quieter line under the title ("Toby · v1.2"). */
  subtitle?: string;
  /** The facts row: Job ID, Model, Preset, Topology, Created. */
  facts?: KeyValueItem[];
  /** Times beside the steps, by step id ("9:02"). */
  stepTimes?: WrappedPipelineRunStepTime;
  /** The step list when the status carries none (a provider job with fixed stages). */
  steps?: RMPipelineRunStepDetail[];
  /** The progress panel's heading. Default: the status's `stepLabel`, else the title. */
  progressTitle?: string;
  /** The progress panel's sentence: "Meshy is generating a stylized mesh … You can continue working while this runs." */
  progressDescription?: ReactNode;
  /** 0–100 when the provider reports it. */
  progress?: number;
  /** The provider's estimate of the time left. */
  remainingMs?: number;
  onRefresh?: () => void;
  /** Cancel job, confirmed in place. A returned promise keeps it busy. */
  onCancel?: () => void | Promise<unknown>;
  /** The header's one action: "Open in Meshy ↗" (a link Button) or "Open run". */
  headerAction?: ReactNode;
  /** The compact form's "Open run". */
  onOpenRun?: () => void;
  /** The picture the run is drawing or has drawn (`SubjectHero`, `ImageCompare`). */
  picture?: ReactNode;
  /** The run's log (`ExecutorLog` from `@connorhoehn/ui-components/pipelines`). */
  log?: ReactNode;
  /** One line, for a narrow inspector: "<subject> · step 2 of 3" with Cancel and Open run. */
  compact?: boolean;
  /** The compact line's lead: "Drawing Mina". Default: the title. */
  subject?: string;
  className?: string;
  'data-testid'?: string;
}

// The card's header and pill on scale (2.515.12); tailwind-merge replaces
// CardHeader's `px-3.5 pt-3 pb-2.5` and StatusPill sm's `text-[10px]`.
const RUN_HEADER = 'px-4 pt-3 pb-3 [&_p]:mt-1';
const RUN_PILL = 'text-[11px]';

const PHASE: Record<RMPipelineRunPhase, { label: string; tone: StatusPillTone }> = {
  received: { label: 'Queued', tone: 'pending' },
  running: { label: 'Processing', tone: 'info' },
  awaiting_approval: { label: 'Ready for review', tone: 'warning' },
  completed: { label: 'Done', tone: 'success' },
  failed: { label: 'Failed', tone: 'error' },
  rejected: { label: 'Rejected', tone: 'neutral' },
};

/** The run's steps as `WorkflowStepper` steps, with times as descriptions. */
export function pipelineRunSteps(steps: readonly RMPipelineRunStepDetail[], times: WrappedPipelineRunStepTime = {}): WorkflowStep[] {
  return steps.map((s, i) => ({
    step: i + 1,
    label: s.label,
    done: s.status === 'completed' || s.status === 'skipped',
    active: s.status === 'running' || s.status === 'awaiting',
    ...(times[s.id] ? { description: times[s.id] } : {}),
    ...(s.status === 'failed' ? { outcome: 'failed' as const } : {}),
  }));
}

export function WrappedPipelineRun({
  status,
  title,
  titleAs = 'h3',
  subtitle,
  facts = [],
  stepTimes,
  steps: givenSteps,
  progressTitle,
  progressDescription,
  progress,
  remainingMs,
  onRefresh,
  onCancel,
  headerAction,
  onOpenRun,
  picture,
  log,
  compact = false,
  subject,
  className,
  'data-testid': testId = 'wrapped-pipeline-run',
}: WrappedPipelineRunProps) {
  const phase = status?.phase;
  const steps = status?.details?.steps?.length ? status.details.steps : givenSteps ?? [];
  const working = phase === 'received' || phase === 'running';
  const pill = phase ? PHASE[phase] : { label: 'Loading', tone: 'pending' as StatusPillTone };
  const currentIndex = steps.findIndex((s) => s.status === 'running' || s.status === 'awaiting');
  const stepOf = currentIndex >= 0 ? `step ${currentIndex + 1} of ${steps.length}` : undefined;

  if (compact) {
    return (
      <Inline
        gap="sm"
        align="center"
        justify="between"
        data-pipeline-run="compact"
        data-run-phase={phase ?? 'loading'}
        data-testid={testId}
        className={className}
      >
        <Inline gap="xs" align="center" wrap={false} className="min-w-0">
          <StatusPill size="sm" tone={pill.tone} label={pill.label} className={RUN_PILL} />
          <Text as="span" size="sm" tone="primary" className="truncate">
            {[subject ?? title, stepOf].filter(Boolean).join(' · ')}
          </Text>
        </Inline>
        <Inline gap="xs" align="center" wrap={false}>
          {onCancel && working && (
            <ConfirmButton label="Cancel" question="Cancel this job?" confirmLabel="Cancel job" cancelLabel="Keep running" tone="destructive" actionKind="cancel" onConfirm={onCancel} data-testid={`${testId}-cancel`} />
          )}
          {onOpenRun && <Button variant="secondary" size="sm" onClick={onOpenRun} data-testid={`${testId}-open`}>Open run</Button>}
        </Inline>
      </Inline>
    );
  }

  return (
    <Card padding="none" data-pipeline-run="" data-run-phase={phase ?? 'loading'} data-testid={testId} className={className}>
      {/* On the 4px spacing scale (2.515.12): the inset header is 16px x /
          12px y (was 14 / 12 top, 10 bottom), the subtitle 4px under the title
          (was 2px); the state pill's text 11px (was 10px). */}
      <CardHeader
        title={title}
        as={titleAs}
        subtitle={subtitle}
        inset
        className={RUN_HEADER}
        meta={<StatusPill size="sm" tone={pill.tone} label={pill.label} className={RUN_PILL} data-testid={`${testId}-state`} />}
        action={headerAction}
      />
      <Stack gap="lg" className="p-4">
        {!status && <LoadingState label="Reading the run…" testId={`${testId}-loading`} />}
        {facts.length > 0 && <KeyValue items={facts} layout="grid" responsive data-testid={`${testId}-facts`} />}
        {steps.length > 0 && (
          <WorkflowStepper steps={pipelineRunSteps(steps, stepTimes)} orientation="horizontal" size="compact" wrap aria-label={`${title} steps`} data-testid={`${testId}-steps`} />
        )}
        {picture}
        {status && working && (
          <RunProgressPanel
            title={progressTitle ?? status.stepLabel ?? title}
            description={progressDescription}
            state={phase === 'received' ? 'queued' : 'running'}
            progress={progress}
            startedAt={status.details?.startedAt}
            remainingMs={remainingMs}
            onRefresh={onRefresh}
            onCancel={onCancel}
            framed={false}
            data-testid={`${testId}-progress`}
          />
        )}
        {status && !working && status.detail && (
          <InlineAlert tone={phase === 'failed' ? 'error' : phase === 'completed' ? 'success' : 'info'} data-testid={`${testId}-detail`}>
            {status.detail}
          </InlineAlert>
        )}
        {status?.phase === 'failed' && !status.detail && status.details?.error && (
          <InlineAlert tone="error" data-testid={`${testId}-detail`}>{status.details.error}</InlineAlert>
        )}
        {log}
      </Stack>
    </Card>
  );
}

export default WrappedPipelineRun;
