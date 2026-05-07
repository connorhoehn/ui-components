// frontend/src/components/pipelines/nodes/RetryPolicyEditor.tsx
//
// Hub#1289 — shared editor for the canonical `RetryPolicy` field on LLM,
// Transform, and Action nodes. Until this landed, retryPolicy was defined in
// types but had no UI surface — operators had to hand-edit JSON.

import type { CSSProperties } from 'react';
import type { RetryPolicy } from '../../../types/pipeline';
import { fieldStyle, colors } from '../../../constants/styles';

export interface RetryPolicyEditorProps {
  value: RetryPolicy | undefined;
  onChange: (next: RetryPolicy | undefined) => void;
}

const labelStyle: CSSProperties = { fontSize: 12, fontWeight: 600, color: colors.textSecondary };
const helpStyle: CSSProperties = { fontSize: 11, color: colors.textTertiary, marginTop: 4 };
const warningStyle: CSSProperties = { fontSize: 11, color: '#ca8a04', marginTop: 4 };

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
    <div data-testid="retry-policy-editor" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: 6 }}>
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => onChange(e.target.checked ? DEFAULT_POLICY : undefined)}
          aria-label="Enable retries"
        />
        Retry policy
      </label>
      {!enabled && (
        <div style={helpStyle}>No retries — failure is terminal on first attempt.</div>
      )}
      {enabled && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 4 }}>
            <div>
              <label style={{ ...labelStyle, fontSize: 11 }}>Max attempts</label>
              <input
                type="number"
                min={1}
                max={10}
                step={1}
                style={{ ...fieldStyle, marginTop: 2 }}
                value={policy.maxAttempts}
                onChange={(e) => {
                  const n = Math.max(1, Math.min(10, parseInt(e.target.value, 10) || 1));
                  onChange({ ...policy, maxAttempts: n });
                }}
                aria-label="Max attempts"
              />
            </div>
            <div>
              <label style={{ ...labelStyle, fontSize: 11 }}>Initial backoff (ms)</label>
              <input
                type="number"
                min={0}
                step={100}
                style={{ ...fieldStyle, marginTop: 2 }}
                value={policy.backoffMs}
                onChange={(e) => {
                  const n = Math.max(0, parseInt(e.target.value, 10) || 0);
                  onChange({ ...policy, backoffMs: n });
                }}
                aria-label="Initial backoff in milliseconds"
              />
            </div>
            <div>
              <label style={{ ...labelStyle, fontSize: 11 }}>Backoff multiplier</label>
              <input
                type="number"
                min={1}
                max={4}
                step={0.5}
                style={{ ...fieldStyle, marginTop: 2 }}
                value={policy.backoffMultiplier}
                onChange={(e) => {
                  const n = Math.max(1, Math.min(4, parseFloat(e.target.value) || 1));
                  onChange({ ...policy, backoffMultiplier: n });
                }}
                aria-label="Backoff multiplier"
              />
            </div>
          </div>
          <div style={helpStyle} data-testid="retry-policy-preview">
            {policy.maxAttempts === 1
              ? 'Effectively no retry (1 attempt).'
              : delays.length === 0
                ? `Retries up to ${policy.maxAttempts}× with no delay.`
                : `Retries up to ${policy.maxAttempts}× with delays: ${delays.map(formatMs).join(', ')}.`}
          </div>
          {tailRiskMs && (
            <div style={warningStyle} data-testid="retry-policy-tail-warning">
              ⚠ Total backoff &gt;5min — long-tail latency risk on persistent failures.
            </div>
          )}
        </>
      )}
    </div>
  );
}
