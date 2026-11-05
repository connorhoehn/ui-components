// frontend/src/components/pipelines/nodes/approval/ApprovalConfig.tsx
//
// Config panel for Approval nodes. See PIPELINES_PLAN.md §18.10.
//
// Approvers are stored on the node as `{ type, value }` records. The
// UserPicker (shared) returns plain user ids; we project to and from
// the approver shape so Phase 1 only surfaces "user" approvers. Role
// approvers are editable via the chip list (the picker will grow
// role support in a later phase).

import { useId, useState } from 'react';
import type { ApprovalNodeData, Approver, ApprovalTimeoutAction } from '../../../../types/pipeline';
import { ConfigField, NodeConfigShell } from '../shared';
import UserPicker from '../../../shared/UserPicker';
import { cn } from '../../../../lib/cn';
import { Select } from '../../../forms/Select';
import { Textarea } from '../../../forms/Textarea';
import { NumberInput } from '../../../forms/NumberInput';
import { RadioGroup } from '../../../forms/RadioGroup';

const TIMEOUT_UNITS = [
  { value: 'seconds', label: 'seconds' },
  { value: 'minutes', label: 'minutes' },
  { value: 'hours', label: 'hours' },
];

const TIMEOUT_ACTIONS = [
  { value: 'reject', label: 'Reject' },
  { value: 'approve', label: 'Approve' },
];

export interface ApprovalConfigProps {
  data: ApprovalNodeData;
  onChange: (patch: Partial<ApprovalNodeData>) => void;
}

type TimeUnit = 'seconds' | 'minutes' | 'hours';
const UNIT_MS: Record<TimeUnit, number> = {
  seconds: 1000,
  minutes: 60_000,
  hours:   3_600_000,
};

// Pick the coarsest unit that divides the ms value evenly so edit-roundtrips
// are stable when the user hasn't touched the unit picker.
function inferUnit(ms: number | undefined): TimeUnit {
  if (!ms || ms <= 0) return 'minutes';
  if (ms % UNIT_MS.hours   === 0) return 'hours';
  if (ms % UNIT_MS.minutes === 0) return 'minutes';
  return 'seconds';
}

export default function ApprovalConfig({ data, onChange }: ApprovalConfigProps) {
  const uid = useId();
  const approvers = data.approvers ?? [];
  const approversMissing = approvers.length === 0;

  // Unit is UI-only state — the stored value is always ms.
  const [unit, setUnit] = useState<TimeUnit>(() => inferUnit(data.timeoutMs));
  const unitValue = data.timeoutMs !== undefined
    ? Math.round(data.timeoutMs / UNIT_MS[unit])
    : '';

  const userApproverIds = approvers.filter(a => a.type === 'user').map(a => a.value);

  const setUserApprovers = (ids: string[]) => {
    // Preserve any role approvers the user added separately.
    const roles = approvers.filter(a => a.type === 'role');
    const users: Approver[] = ids.map(id => ({ type: 'user', value: id }));
    const next = [...users, ...roles];
    onChange({
      approvers: next,
      // Clamp requiredCount so it never exceeds approvers.length (min 1).
      requiredCount: Math.max(1, Math.min(data.requiredCount || 1, next.length || 1)),
    });
  };

  const removeApprover = (idx: number) => {
    const next = approvers.filter((_, i) => i !== idx);
    onChange({
      approvers: next,
      requiredCount: Math.max(1, Math.min(data.requiredCount || 1, next.length || 1)),
    });
  };

  const setTimeoutValue = (v: string) => {
    if (v === '') {
      onChange({ timeoutMs: undefined });
      return;
    }
    const n = Math.max(0, parseInt(v, 10) || 0);
    onChange({ timeoutMs: n * UNIT_MS[unit] });
  };

  const setTimeoutUnit = (nextUnit: TimeUnit) => {
    setUnit(nextUnit);
    // Reinterpret the displayed number in the new unit so the user sees
    // "24 hours" stay as "24" when they flip the picker.
    if (typeof unitValue === 'number' && !Number.isNaN(unitValue)) {
      onChange({ timeoutMs: unitValue * UNIT_MS[nextUnit] });
    }
  };

  const requiredCountMax = Math.max(1, approvers.length);

  return (
    <NodeConfigShell>
      {/* Approvers — a picker plus a removable chip per approver, i.e. a set of
          controls rather than one labelable element, so the label names a
          group. */}
      <ConfigField
        label="Approvers"
        required
        error={approversMissing ? 'At least one approver is required.' : undefined}
        help={!approversMissing ? 'Who can approve this step.' : undefined}
        render={({ describedById, labelId }) => (
          <div role="group" aria-labelledby={labelId} aria-describedby={describedById}>
            <UserPicker
              value={userApproverIds}
              onChange={setUserApprovers}
              placeholder="Add approver…"
            />

            {approvers.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {approvers.map((a, idx) => (
                  <span
                    key={`${a.type}:${a.value}:${idx}`}
                    className={cn(
                      'inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-[1.4] whitespace-nowrap',
                      a.type === 'role'
                        ? 'bg-warning-bg text-warning-fg'
                        : 'bg-info-bg text-info-fg',
                    )}
                  >
                    {a.type === 'role' ? '🎖' : '👤'} {a.value}
                    <button
                      data-ui-part=""
                      type="button"
                      onClick={() => removeApprover(idx)}
                      aria-label={`Remove ${a.value}`}
                      className="bg-transparent border-none p-0 ml-0.5 cursor-pointer text-current font-inherit text-xs leading-none"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      />

      {/* Required count — one control; the "of N" text beside it is static. */}
      <ConfigField
        label="Required count"
        required
        help="How many approvers must say yes."
        controlId={`${uid}-required-count`}
        render={({ controlId, describedById }) => (
          <div className="flex items-center gap-2">
            <NumberInput
              size="sm"
              min={1}
              max={requiredCountMax}
              value={data.requiredCount || 1}
              onChange={(requiredCount) => onChange({ requiredCount })}
              id={controlId}
              aria-describedby={describedById}
              data-testid="approval-required-count"
            />
            <span className="text-text-tertiary text-xs whitespace-nowrap">
              of {requiredCountMax}
            </span>
          </div>
        )}
      />

      {/* Timeout — amount + unit + the on-timeout action: three controls, so
          the label names the group and each control keeps its own narrower
          name. The number box had no name at all before. */}
      <ConfigField
        label="Timeout"
        help="Leave blank for no timeout."
        render={({ describedById, labelId }) => (
          <div role="group" aria-labelledby={labelId} aria-describedby={describedById}>
            <div className="flex items-center gap-2">
              <NumberInput
                size="sm"
                min={0}
                value={unitValue === '' ? undefined : Number(unitValue)}
                onChange={(v) => setTimeoutValue(String(v))}
                onClear={() => setTimeoutValue('')}
                placeholder="24"
                aria-label="Timeout value"
                data-testid="approval-timeout-value"
              />
              <Select
                size="sm"
                className="w-[120px] flex-none"
                value={unit}
                onChange={(e) => setTimeoutUnit(e.target.value as TimeUnit)}
                aria-label="Timeout unit"
                options={TIMEOUT_UNITS}
              />
            </div>

            {data.timeoutMs !== undefined && data.timeoutMs > 0 && (
              <div className="mt-2">
                <span className="text-[11px] font-semibold text-text-secondary">
                  If timeout
                </span>
                <div className="mt-1">
                  <RadioGroup
                    name="approval-timeout-action"
                    orientation="horizontal"
                    value={data.timeoutAction ?? 'reject'}
                    onChange={(timeoutAction) =>
                      onChange({ timeoutAction: timeoutAction as ApprovalTimeoutAction })
                    }
                    options={TIMEOUT_ACTIONS}
                    data-testid="approval-timeout-action"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      />

      {/* Message */}
      <ConfigField
        label="Message for approver (optional)"
        help="Shown to the approver when the request is sent."
        controlId={`${uid}-message`}
        render={({ controlId, describedById }) => (
          <Textarea
            rows={4}
            id={controlId}
            aria-describedby={describedById}
            value={data.message ?? ''}
            onChange={(e) => onChange({ message: e.target.value || undefined })}
            placeholder="Please review the summary before it's posted to the document."
          />
        )}
      />
    </NodeConfigShell>
  );
}
