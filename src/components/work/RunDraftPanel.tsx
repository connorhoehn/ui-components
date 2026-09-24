// RunDraftPanel — the right-hand "Run draft" pane of the Documents four-pane
// view: pick a workflow, agent and model, see what similar runs cost and how
// long they took, set an enforced token budget, then Save and Dispatch.
//
// Honesty is the point of this component (PLAN §1.6, §4 risks 2, 3, 7):
//   - Money and durations arrive only as typed numbers (`RunEstimate`); there
//     is no string prop for them, so "$0.03" cannot be hard-coded.
//   - An estimate with zero prior runs never shows a range, even if one is
//     passed: it reads "No prior runs".
//   - The budget is a TOKEN budget (the one the platform enforces). Dollars
//     appear only as a derived "≈" line, and only when a price is known.
//   - Every disabled action says why, in visible text tied to the button.
//   - A dispatch error (e.g. the trigger route's 403) is shown verbatim.
// After dispatch the host passes `live` (an `AgentTaskCard`), which replaces
// the form body.

import type { ReactNode } from 'react';
import { useId, useState } from 'react';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import { ChevronIcon, InfoIcon } from '../ui/Icons';
import { Disclosure } from '../ui/Disclosure';
import { Select, type SelectOption } from '../forms/Select';
import { NumberInput } from '../forms/NumberInput';
import { InlineAlert } from '../shared/InlineAlert';
import { AccessNotice, type AccessNoticeProps } from './AccessNotice';
import { EstimateRow, confidenceNote, formatUsd, type RunEstimate } from './EstimateRow';

export type { RunEstimate } from './EstimateRow';

export type RunDraftStatus =
  | 'no-draft'
  | 'unsaved'
  | 'saved'
  | 'dispatching'
  | 'running'
  | 'completed'
  | 'failed'
  | 'stopped';

/**
 * Header state labels. PLAN §1.6 names the draft states; the mockup's
 * "Not started" is not used because it is ambiguous between "no draft yet"
 * and "saved but not dispatched" — those are `no-draft` and `saved` here.
 */
export const RUN_DRAFT_STATUS_LABELS: Record<RunDraftStatus, string> = {
  'no-draft': 'No draft',
  unsaved: 'Not saved',
  saved: 'Draft saved',
  dispatching: 'Dispatching',
  running: 'Running',
  completed: 'Completed',
  failed: 'Failed',
  stopped: 'Stopped',
};

export interface RunEstimateConfidence {
  /** How many completed runs the estimate is based on. */
  sampleSize: number;
}

export interface RunDraftSelectField {
  id: string;
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  /** Disables the select and says why (e.g. "This pipeline sets its own model"). */
  disabledReason?: string;
  placeholder?: string;
}

export interface RunDraftBudget {
  /** The enforced token budget; `null` = none set. */
  tokens: number | null;
  onChange: (tokens: number | null) => void;
  /** Price used for the derived "≈ $x" line. Omit or `null` when unknown — the line is then not shown. */
  usdPerMillionTokens?: number | null;
  /** Names the price basis: "Haiku" → "at Haiku prices". */
  priceLabel?: string;
  disabledReason?: string;
}

export interface RunDraftTarget {
  mark?: ReactNode;
  title: string;
  subtitle?: string;
}

export interface RunDraftPanelProps {
  status: RunDraftStatus;
  /** Controlled collapse. Omit to let the panel own it. */
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  /** The chosen workflow. `null` shows "No workflow chosen"; `undefined` shows nothing. */
  target?: RunDraftTarget | null;
  fields?: RunDraftSelectField[];
  cost?: RunEstimate;
  duration?: RunEstimate;
  confidence?: RunEstimateConfidence | null;
  budget?: RunDraftBudget | null;
  advanced?: ReactNode;
  advancedLabel?: string;
  access?: AccessNoticeProps | null;
  onSave?: () => void;
  saveDisabledReason?: string;
  saving?: boolean;
  onDispatch?: () => void;
  dispatchDisabledReason?: string;
  /** Shown verbatim, e.g. the dispatch route's 403 message. */
  error?: string | null;
  /** After dispatch: the live run (an `AgentTaskCard`). Replaces the form body. */
  live?: ReactNode;
  /** Defaults to "Nothing runs until you authorize it."; pass `null` to hide. */
  footnote?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

const NO_PRIOR_RUNS: RunEstimate = { kind: 'none', reason: 'No prior runs' };

/** A range backed by zero runs is not an estimate. */
function honest(estimate: RunEstimate, confidence: RunEstimateConfidence | null | undefined): RunEstimate {
  if (estimate.kind === 'range' && confidence && !(confidence.sampleSize > 0)) return NO_PRIOR_RUNS;
  return estimate;
}


function InfoLine({ children, className, 'data-testid': testId }: { children: ReactNode; className?: string; 'data-testid'?: string }) {
  return (
    <p className={cn('flex items-center gap-1.5 text-[12px] text-text-tertiary', className)} data-testid={testId}>
      <InfoIcon size={14} className="shrink-0" />
      <span>{children}</span>
    </p>
  );
}

function FieldRow({ field }: { field: RunDraftSelectField }) {
  const selectId = useId();
  const reasonId = useId();
  return (
    <div className="py-2.5" data-testid={`run-draft-field-${field.id}`}>
      <div className="flex items-center justify-between gap-3 text-[14px]">
        <label htmlFor={selectId} className="shrink-0 text-text-primary">
          {field.label}
        </label>
        <Select
          id={selectId}
          size="sm"
          variant="ghost"
          value={field.value}
          options={field.options}
          placeholder={field.placeholder}
          onChange={(e) => field.onChange(e.target.value)}
          disabled={field.disabledReason != null}
          title={field.disabledReason}
          aria-describedby={field.disabledReason ? reasonId : undefined}
          className="min-w-0 max-w-[65%]"
        />
      </div>
      {field.disabledReason && (
        <p id={reasonId} className="mt-1 text-right text-[12px] text-text-tertiary">
          {field.disabledReason}
        </p>
      )}
    </div>
  );
}

function BudgetRow({ budget }: { budget: RunDraftBudget }) {
  const inputId = useId();
  const noteId = useId();
  const price = budget.usdPerMillionTokens;
  const derived =
    budget.tokens != null && price != null && Number.isFinite(price) && price >= 0 && budget.tokens >= 0
      ? `≈ ${formatUsd((budget.tokens / 1_000_000) * price)}${budget.priceLabel ? ` at ${budget.priceLabel} prices` : ''}`
      : null;
  const note = budget.disabledReason ?? derived;
  return (
    <div className="py-2.5" data-testid="run-draft-budget">
      <div className="flex items-center justify-between gap-3 text-[14px]">
        <label htmlFor={inputId} className="shrink-0 text-text-primary">
          Run budget
        </label>
        <div className="w-40">
          <NumberInput
            id={inputId}
            size="sm"
            unit="tokens"
            min={0}
            step={1000}
            value={budget.tokens ?? undefined}
            onChange={(v) => budget.onChange(v)}
            onClear={() => budget.onChange(null)}
            placeholder="No limit"
            disabled={budget.disabledReason != null}
            aria-describedby={note ? noteId : undefined}
            data-testid="run-draft-budget-input"
          />
        </div>
      </div>
      {note && (
        <p id={noteId} className="mt-1 text-right text-[12px] text-text-tertiary" data-testid="run-draft-budget-note">
          {note}
        </p>
      )}
    </div>
  );
}

export function RunDraftPanel({
  status,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  target,
  fields,
  cost,
  duration,
  confidence,
  budget,
  advanced,
  advancedLabel = 'Advanced settings',
  access,
  onSave,
  saveDisabledReason,
  saving = false,
  onDispatch,
  dispatchDisabledReason,
  error,
  live,
  footnote,
  className,
  'data-testid': testId = 'run-draft-panel',
}: RunDraftPanelProps) {
  const [ownCollapsed, setOwnCollapsed] = useState(defaultCollapsed);
  const collapsed = collapsedProp ?? ownCollapsed;
  const bodyId = useId();
  const headingId = useId();
  const saveReasonId = useId();
  const dispatchReasonId = useId();

  const toggle = () => {
    const next = !collapsed;
    if (collapsedProp === undefined) setOwnCollapsed(next);
    onCollapsedChange?.(next);
  };

  const dispatching = status === 'dispatching';
  const saveDisabled = saving || saveDisabledReason != null;
  const dispatchDisabled = dispatching || dispatchDisabledReason != null;
  const hasEstimates = cost != null || duration != null;
  const footnoteNode =
    footnote === undefined ? <InfoLine data-testid="run-draft-footnote">Nothing runs until you authorize it.</InfoLine> : footnote;

  const form = (
    <>
      {target === null && (
        <div className="rounded-md border border-dashed border-border px-3 py-3 text-[13px] text-text-secondary" data-testid="run-draft-no-target">
          No workflow chosen
        </div>
      )}
      {target && (
        <div className="flex items-center gap-3 py-1" data-testid="run-draft-target">
          {target.mark != null && <span className="flex h-8 w-8 shrink-0 items-center justify-center text-primary" data-testid="run-draft-target-mark">{target.mark}</span>}
          <div className="min-w-0">
            <div className="truncate text-[14px] font-semibold text-text-primary">{target.title}</div>
            {target.subtitle && <div className="text-[13px] text-text-secondary">{target.subtitle}</div>}
          </div>
        </div>
      )}

      <div className="mt-3 divide-y divide-border">
        {fields?.map((f) => <FieldRow key={f.id} field={f} />)}
        {/* Cost and duration are rows of their own (the mockup rules each);
            the confidence line belongs to the duration it qualifies. */}
        {cost && <EstimateRow label="Estimated cost" estimate={honest(cost, confidence)} data-testid="run-draft-cost" />}
        {hasEstimates && (duration || confidence) && (
          <div>
            {duration && <EstimateRow label="Duration" estimate={honest(duration, confidence)} data-testid="run-draft-duration" />}
            {confidence && (
              <InfoLine className="pb-2.5" data-testid="run-draft-confidence">
                {confidenceNote(confidence.sampleSize)}
              </InfoLine>
            )}
          </div>
        )}
        {budget && <BudgetRow budget={budget} />}
        {advanced != null && (
          <div className="py-1.5">
            <Disclosure summary={advancedLabel} variant="plain" density="compact" data-testid="run-draft-advanced">
              {advanced}
            </Disclosure>
          </div>
        )}
        {access && <AccessNotice data-testid="run-draft-access" {...access} />}
      </div>
    </>
  );

  const hasFooter = onSave != null || onDispatch != null;

  return (
    <section
      aria-labelledby={headingId}
      data-status={status}
      data-collapsed={collapsed || undefined}
      data-testid={testId}
      className={cn('flex flex-col bg-surface p-4 text-text-primary', className)}
    >
      <header className="flex items-center gap-2">
        <h2 id={headingId} className="text-[18px] font-semibold text-text-primary">
          Run draft
        </h2>
        <span className="text-[13px] text-text-tertiary" data-testid="run-draft-status">
          {RUN_DRAFT_STATUS_LABELS[status]}
        </span>
        <IconButton
          className="ml-auto"
          size="sm"
          aria-label={collapsed ? 'Expand run draft' : 'Collapse run draft'}
          aria-expanded={!collapsed}
          aria-controls={bodyId}
          icon={<ChevronIcon dir={collapsed ? 'down' : 'up'} />}
          onClick={toggle}
        />
      </header>

      {!collapsed && (
        <div id={bodyId} className="mt-3 flex flex-col" data-testid="run-draft-body">
          {live != null ? <div data-testid="run-draft-live">{live}</div> : form}

          {error && (
            <InlineAlert tone="error" className="mt-3" data-testid="run-draft-error">
              {error}
            </InlineAlert>
          )}

          {live == null && hasFooter && (
            <div className="mt-3 border-t border-border pt-4">
              <div className="grid grid-cols-2 gap-3">
                {onSave && (
                  <Button
                    variant="secondary"
                    fullWidth
                    onClick={onSave}
                    disabled={saveDisabled}
                    aria-busy={saving || undefined}
                    title={saveDisabledReason}
                    aria-describedby={saveDisabledReason ? saveReasonId : undefined}
                    className={cn(!onDispatch && 'col-span-2')}
                    data-testid="run-draft-save"
                  >
                    {saving ? 'Saving…' : 'Save draft'}
                  </Button>
                )}
                {onDispatch && (
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={onDispatch}
                    disabled={dispatchDisabled}
                    aria-busy={dispatching || undefined}
                    title={dispatchDisabledReason}
                    aria-describedby={dispatchDisabledReason ? dispatchReasonId : undefined}
                    className={cn(!onSave && 'col-span-2')}
                    data-testid="run-draft-dispatch"
                  >
                    {dispatching ? 'Dispatching…' : 'Dispatch agent'}
                  </Button>
                )}
              </div>
              {saveDisabledReason && (
                <p id={saveReasonId} className="mt-2 text-[12px] text-text-tertiary" data-testid="run-draft-save-reason">
                  {saveDisabledReason}
                </p>
              )}
              {dispatchDisabledReason && (
                <p id={dispatchReasonId} className="mt-2 text-[12px] text-text-tertiary" data-testid="run-draft-dispatch-reason">
                  {dispatchDisabledReason}
                </p>
              )}
            </div>
          )}

          {live == null && footnoteNode != null && <div className="mt-3">{footnoteNode}</div>}
        </div>
      )}
    </section>
  );
}

export default RunDraftPanel;
