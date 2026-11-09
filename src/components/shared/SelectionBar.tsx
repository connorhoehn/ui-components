// src/components/shared/SelectionBar.tsx
//
// The bar docked under a grid of candidates (Storymaker concepts §3, "Select
// character concept"): what is chosen (its thumbnail, "Selected: Concept 03",
// a quieter line "Toby · Main character · v1.0", or "3 selected"), the
// controls that shape the pick (a slicing Select, a couple of Switches), and
// the decision: Clear, an optional Reject, one optional secondary ("Select
// character", keeps the pick as a draft) and the one primary ("Approve").
//
// Reject and the primary confirm in place when given a `question`
// (`ConfirmButton`, `data-action-kind="reject"` / `"approve"` / `"spend"`), so
// the page never opens a dialog for its own decision (audit `confirm.inline`).
// With nothing selected the primary is disabled and the label says so.
//
// The bar is a labelled region (`role="region"`, default name "Selection")
// with `data-selection-bar` and `data-selection-count`. Its picture is shown
// whole (object-contain in a fixed square frame, `data-image-fit="contain"`).

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Inline, Stack } from '../ui/Stack';
import { Text } from './Text';
import { ConfirmButton, type ConfirmActionKind } from './ConfirmButton';
import { CheckIcon, ImageIcon } from '../ui/Icons';

export interface SelectionBarAction {
  label: string;
  /** Fired on press, or on Confirm when `question` is given. A returned promise keeps it busy. */
  onAction: () => void | Promise<unknown>;
  /** Ask in place before acting ("Approve concept 03?"). Omit for an immediate action. */
  question?: string;
  /** The confirming button's label. Default: `label`. */
  confirmLabel?: string;
  /** What the decision is, for the audit: `approve` (default for the primary), `spend`, `reject`. */
  actionKind?: ConfirmActionKind;
  disabled?: boolean;
  busy?: boolean;
}

export interface SelectionBarProps {
  /** How many candidates are chosen. 0 shows "Nothing selected" and disables the primary. */
  count: number;
  /** The chosen candidate's name, for one pick: "Concept 03". The bar reads "Selected: Concept 03". */
  label?: ReactNode;
  /** A quieter line under it: "Toby · Main character · v1.0". */
  description?: ReactNode;
  /** The chosen candidate's picture (one pick). */
  thumbnail?: { src: string; alt?: string };
  /** Controls that shape the pick: a slicing `Select`, `Switch`es. Library form controls only. */
  controls?: ReactNode;
  /** "Clear": drops the selection. Omit to leave it out. */
  onClear?: () => void;
  clearLabel?: string;
  /** "Reject": a destructive decision on the chosen candidates, confirmed in place when it has a `question`. */
  reject?: SelectionBarAction;
  /** One secondary ("Select character": keep the pick as a draft). */
  secondary?: SelectionBarAction;
  /** The one primary ("Approve"). */
  primary?: SelectionBarAction;
  /** The region's accessible name. Default "Selection". */
  'aria-label'?: string;
  className?: string;
  'data-testid'?: string;
}

function ActionControl({ action, role, testId, disabled }: { action: SelectionBarAction; role: 'primary' | 'secondary' | 'reject'; testId: string; disabled: boolean }) {
  const kind: ConfirmActionKind | undefined = action.actionKind ?? (role === 'primary' ? 'approve' : role === 'reject' ? 'reject' : undefined);
  const off = disabled || !!action.disabled;
  if (action.question) {
    return (
      <ConfirmButton
        label={action.label}
        question={action.question}
        confirmLabel={action.confirmLabel ?? action.label}
        tone={role === 'reject' ? 'destructive' : 'default'}
        variant={role === 'primary' ? 'primary' : role === 'reject' ? 'danger' : 'secondary'}
        disabled={off}
        busy={action.busy}
        actionKind={kind}
        onConfirm={action.onAction}
        data-testid={testId}
      />
    );
  }
  return (
    <Button
      size="sm"
      variant={role === 'primary' ? 'primary' : role === 'reject' ? 'danger' : 'secondary'}
      disabled={off || action.busy}
      aria-busy={action.busy || undefined}
      data-action-kind={kind}
      onClick={() => { void action.onAction(); }}
      data-testid={testId}
    >
      {action.label}
    </Button>
  );
}

export function SelectionBar({
  count,
  label,
  description,
  thumbnail,
  controls,
  onClear,
  clearLabel = 'Clear',
  reject,
  secondary,
  primary,
  'aria-label': ariaLabel = 'Selection',
  className,
  'data-testid': testId = 'selection-bar',
}: SelectionBarProps) {
  const none = count <= 0;
  const headline = none
    ? 'Nothing selected'
    : count === 1 && label != null
      ? <>Selected: {label}</>
      : `${count} selected`;
  return (
    <section
      role="region"
      aria-label={ariaLabel}
      data-selection-bar=""
      data-selection-count={count}
      data-testid={testId}
      className={cn('min-w-0', className)}
    >
      <Card padding="sm">
        <Inline gap="md" align="center" justify="between" wrap>
          <Inline gap="sm" align="center" wrap={false} className="min-w-0">
            {count === 1 && (
              <span
                data-ui-part=""
                data-image-fit="contain"
                className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-surface-inset text-text-tertiary"
              >
                {thumbnail
                  ? <img data-ui-part="" src={thumbnail.src} alt={thumbnail.alt ?? ''} className="block h-full w-full object-contain" />
                  : <ImageIcon size={16} aria-hidden="true" />}
              </span>
            )}
            <Stack gap="none" className="min-w-0">
              <Inline gap="xs" align="center" wrap={false} className="min-w-0">
                <Text as="span" size="sm" weight="semibold" tone={none ? 'secondary' : 'primary'} className="truncate" data-testid={`${testId}-label`}>
                  {headline}
                </Text>
                {!none && <CheckIcon size={14} aria-hidden="true" className="shrink-0 text-success" />}
              </Inline>
              {!none && description != null && (
                <Text as="span" size="xs" tone="secondary" className="truncate">{description}</Text>
              )}
            </Stack>
          </Inline>
          {controls != null && (
            <Inline gap="md" align="center" wrap data-testid={`${testId}-controls`}>{controls}</Inline>
          )}
          <Inline gap="sm" align="center" wrap>
            {onClear && !none && (
              <Button variant="ghost" size="sm" onClick={onClear} data-testid={`${testId}-clear`}>{clearLabel}</Button>
            )}
            {reject && <ActionControl action={reject} role="reject" disabled={none} testId={`${testId}-reject`} />}
            {secondary && <ActionControl action={secondary} role="secondary" disabled={none} testId={`${testId}-secondary`} />}
            {primary && <ActionControl action={primary} role="primary" disabled={none} testId={`${testId}-primary`} />}
          </Inline>
        </Inline>
      </Card>
    </section>
  );
}

export default SelectionBar;
