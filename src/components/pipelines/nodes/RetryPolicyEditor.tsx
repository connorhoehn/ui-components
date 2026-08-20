// frontend/src/components/pipelines/nodes/RetryPolicyEditor.tsx
//
// Hub#1289 — shared editor for the canonical `RetryPolicy` field on LLM,
// Transform, and Action nodes. Until this landed, retryPolicy was defined in
// types but had no UI surface — operators had to hand-edit JSON.

import type { RetryPolicy } from '../../../types/pipeline';
import { NumberInput } from '../../forms/NumberInput';
import { ToggleField } from './shared';

export interface RetryPolicyEditorProps {
  value: RetryPolicy | undefined;
  onChange: (next: RetryPolicy | undefined) => void;
}

const DEFAULT_POLICY: RetryPolicy = {
  maxAttempts: 3,
  backoffMs: 1000,
  backoffMultiplier: 2,
};

const MAX_BACKOFF_CAP_MS = 30_000;

function formatMs(ms: number): string {
  if (ms < 1000) return `${Math.round(ms)}ms`;
  if (ms < 60_000) return `${(ms / 1000).toFixed(ms < 10_000 ? 1 : 0)}s`;
  return `${Math.round(ms / 60_000)}m`;
}

/**
 * Compute the per-attempt delay schedule. Mirrors the executor's formula
 * (`backoffMs * backoffMultiplier^(attempt-1)`) capped at 30s per ADR D4.
 */
function computeDelays(p: RetryPolicy): number[] {
  const delays: number[] = [];
  for (let attempt = 1; attempt < p.maxAttempts; attempt++) {
    const raw = p.backoffMs * Math.pow(p.backoffMultiplier, attempt - 1);
    delays.push(Math.min(raw, MAX_BACKOFF_CAP_MS));
  }
  return delays;
}

export default function RetryPolicyEditor({ value, onChange }: RetryPolicyEditorProps) {
  const enabled = value !== undefined;
  const policy = value ?? DEFAULT_POLICY;
  const delays = enabled ? computeDelays(policy) : [];
  const totalDelayMs = delays.reduce((s, n) => s + n, 0);
  const tailRiskMs = totalDelayMs > 5 * 60 * 1000;

  return (
    <div data-testid="retry-policy-editor" className="flex flex-col gap-1.5">
      <ToggleField
        label="Retry policy"
        checked={enabled}
        onChange={(on) => onChange(on ? DEFAULT_POLICY : undefined)}
        help={enabled ? undefined : 'No retries — failure is terminal on first attempt.'}
        data-testid="retry-policy-enabled"
      />
      {enabled && (
        <>
          <div className="grid grid-cols-3 gap-2 mt-1">
            <div>
              <label className="text-[11px] font-semibold text-text-secondary">Max attempts</label>
              <NumberInput
                size="sm"
                min={1}
                max={10}
                step={1}
                value={policy.maxAttempts}
                onChange={(maxAttempts) => onChange({ ...policy, maxAttempts })}
                aria-label="Max attempts"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-text-secondary">Initial backoff (ms)</label>
              <NumberInput
                size="sm"
                min={0}
                step={100}
                unit="ms"
                value={policy.backoffMs}
                onChange={(backoffMs) => onChange({ ...policy, backoffMs })}
                aria-label="Initial backoff in milliseconds"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-text-secondary">Backoff multiplier</label>
              <NumberInput
                size="sm"
                min={1}
                max={4}
                step={0.5}
                value={policy.backoffMultiplier}
                onChange={(backoffMultiplier) => onChange({ ...policy, backoffMultiplier })}
                aria-label="Backoff multiplier"
              />
            </div>
          </div>
          <div className="text-[11px] text-text-tertiary mt-1" data-testid="retry-policy-preview">
            {policy.maxAttempts === 1
              ? 'Effectively no retry (1 attempt).'
              : delays.length === 0
                ? `Retries up to ${policy.maxAttempts}× with no delay.`
                : `Retries up to ${policy.maxAttempts}× with delays: ${delays.map(formatMs).join(', ')}.`}
          </div>
          {tailRiskMs && (
            <div className="text-[11px] text-[#ca8a04] mt-1" data-testid="retry-policy-tail-warning">
              ⚠ Total backoff &gt;5min — long-tail latency risk on persistent failures.
            </div>
          )}
        </>
      )}
    </div>
  );
}
