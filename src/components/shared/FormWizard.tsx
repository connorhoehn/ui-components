// FormWizard — the one multi-field form frame (2.445.0). Every tenant's
// request forms, create wizards and settings forms had composed their own:
// a `WorkflowStepper` over a body, a Back/Next row whose Next sat stranded at
// the far edge of the page, a native dropdown, and nothing saying what the
// form would do. This is that frame once.
//
//   mode="single"   every visible section on one page (the common case — a
//                   request form, a campaign form); the stepper is off unless
//                   `stepper` asks for it as a progress cue.
//   mode="stepped"  one section at a time under a compact stepper; Back /
//                   Next / Submit in ONE footer at the end of the form column.
//
// Sections are data: `{ key, title, description?, content, hidden?, error? }`.
// `hidden` drops a section entirely (no step, no heading) — "Who is it for?"
// only when the actor has a choice. `error` is what blocks the section, or
// null: it is shown inline under the section's heading once the user tries to
// advance or submit, Next stays on the section and focus moves to its first
// invalid control (`[aria-invalid="true"]`, else its first control). Submit
// checks every visible section in order and, in stepped mode, jumps back to
// the first that blocks.
//
// Layout: a form column (max 48rem) and, when `summary` or `aside` is given,
// a 20rem side column that is sticky beside the form and stacks UNDER it when
// the wizard's own container is narrower than 56rem (a container query, so a
// wizard inside a pane or a drawer stacks by its own width, not the
// viewport's). The summary is a titled panel; Submit lives at its foot by
// default (`actionsPlacement="summary"`), else at the form column's end.
// Section headings are 14/600 with a 12/400 description; fields keep one
// 16px rhythm. The whole thing is one `<form>`, so Enter in a field advances
// (stepped) or submits (single); textareas keep Enter for new lines.
//
// Fields render through the library primitives; `Select` is the library's
// custom listbox (2.445.0), so no dropdown here opens the platform's menu.
// The root carries `data-form-wizard` and `data-form-wizard-mode`, each section
// `data-form-wizard-section`, so the DOM audit can recognise the composite.

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';
import { InlineAlert } from './InlineAlert';
import { WorkflowStepper } from './WorkflowStepper';

export interface FormWizardSection {
  key: string;
  /** The section heading (14/600) — and the step label unless `label` is given. */
  title: string;
  /** A short stepper label ("Who", "What") when the heading is a sentence. */
  label?: string;
  /** 12/400 line under the heading. */
  description?: ReactNode;
  content: ReactNode;
  /** Leave the section out entirely (no step, no heading). */
  hidden?: boolean;
  /** What blocks this section, or null/undefined when it is complete. */
  error?: string | null;
  'data-testid'?: string;
}

export type FormWizardMode = 'single' | 'stepped';

export interface FormWizardProps {
  sections: readonly FormWizardSection[];
  /** Default `single`. */
  mode?: FormWizardMode;
  /** Show the stepper. Default: on in stepped mode, off in single mode. */
  stepper?: boolean;
  /** Stepped mode, controlled: the visible section's key. */
  activeKey?: string;
  /** Stepped mode: called when the step changes (controlled or not). */
  onStepChange?: (key: string) => void;
  /** The live summary panel beside the form ("what you'll get"). */
  summary?: ReactNode;
  /** The summary panel's heading. Default "Summary". */
  summaryTitle?: string;
  /** Help under the summary (or alone in the side column). */
  aside?: ReactNode;
  /** Where Back/Next/Submit sit when there is a summary. Default `summary`; stepped mode always uses `form`. */
  actionsPlacement?: 'form' | 'summary';
  onSubmit: () => void | Promise<void>;
  submitLabel?: string;
  /** Shown on the Submit button while `submitting`. Default "Submitting…". */
  submittingLabel?: string;
  submitting?: boolean;
  /** Disable Submit (e.g. a server pre-check blocks it). The reason belongs in the summary. */
  submitDisabled?: boolean;
  /** A failed submit, shown above the actions. */
  submitError?: ReactNode;
  onDismissError?: () => void;
  /** Extra actions beside the primary (a Cancel link). */
  secondaryActions?: ReactNode;
  backLabel?: string;
  nextLabel?: string;
  /** Names the form for assistive tech. */
  'aria-label'?: string;
  className?: string;
  /** Default `form-wizard`; sections get `<id>-section-<key>`, actions `<id>-submit` / `-next` / `-back`. */
  'data-testid'?: string;
}

const FOCUSABLE = 'input:not([type="hidden"]):not([disabled]), select:not([disabled]), textarea:not([disabled]), [role="combobox"], button:not([disabled])';

function focusFirstInvalid(root: HTMLElement | null) {
  if (!root) return;
  const el = root.querySelector<HTMLElement>('[aria-invalid="true"]') ?? root.querySelector<HTMLElement>(FOCUSABLE);
  el?.focus();
}

export function FormWizard({
  sections,
  mode = 'single',
  stepper,
  activeKey: activeKeyProp,
  onStepChange,
  summary,
  summaryTitle = 'Summary',
  aside,
  actionsPlacement = 'summary',
  onSubmit,
  submitLabel = 'Submit',
  submittingLabel = 'Submitting…',
  submitting = false,
  submitDisabled = false,
  submitError,
  onDismissError,
  secondaryActions,
  backLabel = 'Back',
  nextLabel = 'Next',
  'aria-label': ariaLabel,
  className,
  'data-testid': testId = 'form-wizard',
}: FormWizardProps) {
  const uid = useId();
  const visible = useMemo(() => sections.filter((s) => !s.hidden), [sections]);
  const stepped = mode === 'stepped';
  const [ownKey, setOwnKey] = useState<string | undefined>(undefined);
  const requested = activeKeyProp ?? ownKey;
  const activeIndex = Math.max(0, visible.findIndex((s) => s.key === requested));
  const active = visible[activeIndex];
  const isLast = activeIndex >= visible.length - 1;
  // Sections whose error the user has been shown (after Next/Submit on them).
  const [shown, setShown] = useState<ReadonlySet<string>>(() => new Set());
  const [pendingFocus, setPendingFocus] = useState<{ key: string; invalid: boolean } | null>(null);
  const sectionRefs = useRef(new Map<string, HTMLElement>());

  const goTo = useCallback((key: string) => {
    if (activeKeyProp === undefined) setOwnKey(key);
    onStepChange?.(key);
  }, [activeKeyProp, onStepChange]);

  useEffect(() => {
    if (!pendingFocus) return;
    const el = sectionRefs.current.get(pendingFocus.key) ?? null;
    if (pendingFocus.invalid) focusFirstInvalid(el);
    else el?.querySelector<HTMLElement>('[data-form-wizard-heading]')?.focus();
    setPendingFocus(null);
  }, [pendingFocus, activeIndex]);

  const reveal = (keys: readonly string[]) => setShown((prev) => new Set([...prev, ...keys]));

  const next = () => {
    if (!active) return;
    if (active.error) { reveal([active.key]); setPendingFocus({ key: active.key, invalid: true }); return; }
    const to = visible[activeIndex + 1];
    if (to) { goTo(to.key); setPendingFocus({ key: to.key, invalid: false }); }
  };

  const back = () => {
    const to = visible[activeIndex - 1];
    if (to) { goTo(to.key); setPendingFocus({ key: to.key, invalid: false }); }
  };

  const submit = () => {
    if (submitting || submitDisabled) return;
    const blocking = visible.filter((s) => s.error);
    if (blocking.length) {
      reveal(blocking.map((s) => s.key));
      const first = blocking[0];
      if (stepped && first.key !== active?.key) goTo(first.key);
      setPendingFocus({ key: first.key, invalid: true });
      return;
    }
    void onSubmit();
  };

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (stepped && !isLast) next(); else submit();
  };

  const showStepper = stepper ?? stepped;
  const steps = visible.map((s, i) => ({
    step: i + 1,
    label: s.label ?? s.title,
    done: stepped ? i < activeIndex : !s.error,
    active: stepped ? i === activeIndex : false,
  }));
  const rendered = stepped ? (active ? [active] : []) : visible;
  const hasSide = summary !== undefined || aside !== undefined;
  const actionsInSummary = !stepped && summary !== undefined && actionsPlacement === 'summary';
  const unresolved = visible.filter((s) => s.error && shown.has(s.key)).length;

  const primary = stepped && !isLast ? (
    <Button type="submit" size="sm" variant="primary" data-testid={`${testId}-next`}>{nextLabel}</Button>
  ) : (
    <Button type="submit" size="sm" variant="primary" disabled={submitting || submitDisabled} aria-busy={submitting || undefined}
      className={actionsInSummary ? 'w-full justify-center' : undefined} data-testid={`${testId}-submit`}>
      {submitting ? submittingLabel : submitLabel}
    </Button>
  );

  const actions = (
    <div className="flex flex-col gap-3" data-form-wizard-actions={actionsInSummary ? 'summary' : 'form'}>
      {submitError && (
        <InlineAlert tone="error" onDismiss={onDismissError} data-testid={`${testId}-error`}>{submitError}</InlineAlert>
      )}
      {unresolved > 0 && !stepped && (
        <p className="m-0 text-xs leading-4 text-danger-fg" role="status">
          {unresolved === 1 ? 'One section needs attention above.' : `${unresolved} sections need attention above.`}
        </p>
      )}
      {actionsInSummary ? (
        <div className="flex flex-col gap-2">
          {primary}
          {secondaryActions}
        </div>
      ) : (
        <div className={cn('flex items-center gap-2', !stepped && 'border-t border-border pt-4')}>
          {stepped && (
            <Button type="button" size="sm" variant="ghost" onClick={back} disabled={activeIndex === 0} data-testid={`${testId}-back`}>
              {backLabel}
            </Button>
          )}
          <div className="ml-auto flex items-center gap-2">
            {secondaryActions}
            {primary}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className={cn('@container w-full min-w-0', className)} data-form-wizard="" data-form-wizard-mode={mode} data-testid={testId}>
        <form
          noValidate
          aria-label={ariaLabel}
          onSubmit={onFormSubmit}
          className={cn('grid items-start gap-6', hasSide && '@min-[56rem]:grid-cols-[minmax(0,48rem)_20rem]')}
        >
          <div className="flex min-w-0 max-w-3xl flex-col gap-6" data-form-wizard-column="">
            {showStepper && visible.length > 1 && (
              <WorkflowStepper size="compact" steps={steps}
                aria-label={stepped ? `Step ${activeIndex + 1} of ${visible.length}` : 'Form sections'}
                data-testid={`${testId}-stepper`} />
            )}
            {rendered.map((s, i) => {
              const headingId = `${uid}-${s.key}-title`;
              const errorId = `${uid}-${s.key}-error`;
              const showError = !!s.error && shown.has(s.key);
              return (
                <section
                  data-ui-part=""
                  key={s.key}
                  ref={(el) => { if (el) sectionRefs.current.set(s.key, el); else sectionRefs.current.delete(s.key); }}
                  aria-labelledby={headingId}
                  aria-describedby={showError ? errorId : undefined}
                  data-form-wizard-section={s.key}
                  data-testid={s['data-testid'] ?? `${testId}-section-${s.key}`}
                  className={cn('flex min-w-0 flex-col gap-4', !stepped && i > 0 && 'border-t border-border pt-6')}
                >
                  <header className="flex flex-col gap-1">
                    <h2 id={headingId} tabIndex={-1} data-form-wizard-heading=""
                      className="m-0 text-sm font-semibold leading-5 text-text-primary outline-none">
                      {s.title}
                    </h2>
                    {s.description && <p className="m-0 text-xs font-normal leading-4 text-text-secondary">{s.description}</p>}
                    {showError && (
                      <p id={errorId} role="alert" className="m-0 text-xs font-normal leading-4 text-danger-fg" data-testid={`${testId}-section-${s.key}-error`}>
                        {s.error}
                      </p>
                    )}
                  </header>
                  <div className="flex min-w-0 flex-col gap-4">{s.content}</div>
                </section>
              );
            })}
            {!actionsInSummary && actions}
          </div>
          {hasSide && (
            <div className="flex min-w-0 flex-col gap-4 @min-[56rem]:sticky @min-[56rem]:top-4" data-form-wizard-side="">
              {summary !== undefined && (
                <section data-ui-part="" aria-labelledby={`${uid}-summary`} data-form-wizard-summary=""
                  className="flex flex-col gap-4 rounded-lg border border-border bg-surface-panel p-4" data-testid={`${testId}-summary`}>
                  <h2 id={`${uid}-summary`} className="m-0 text-sm font-semibold leading-5 text-text-primary">{summaryTitle}</h2>
                  <div className="flex min-w-0 flex-col gap-3">{summary}</div>
                  {actionsInSummary && actions}
                </section>
              )}
              {aside !== undefined && <div className="text-xs leading-4 text-text-secondary" data-form-wizard-aside="">{aside}</div>}
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default FormWizard;
