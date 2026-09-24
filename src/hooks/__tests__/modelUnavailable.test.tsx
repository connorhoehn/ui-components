// The API's `model` health check (platform-api's shared probe + circuit
// breaker): a degraded check keeps its words, and the banner leads with them.
import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { modelUnavailableMessage, normalizeApiHealth, type ApiHealthSnapshot } from '../useApiHealth';
import { ApiDegradedBanner } from '../../components/layout/ApiDegradedBanner';

const body = {
  status: 'degraded',
  checks: [
    { name: 'redis', ok: true, durationMs: 1 },
    { name: 'model', ok: true, degraded: true, durationMs: 2, details: 'Model unavailable — not logged in — the mounted Claude credentials are missing or expired' },
  ],
};

function snapshot(raw: unknown): ApiHealthSnapshot {
  const n = normalizeApiHealth(raw)!;
  return { status: n.status, checks: n.checks, failing: Object.entries(n.checks).filter(([, c]) => c.status !== 'ok').map(([k]) => k) };
}

describe('modelUnavailableMessage', () => {
  afterEach(() => cleanup());

  it('a degraded check is "degraded" with its details, not "ok"', () => {
    const n = normalizeApiHealth(body)!;
    expect(n.checks.model).toMatchObject({ status: 'degraded', detail: expect.stringMatching(/^Model unavailable — not logged in/) });
    expect(n.checks.redis.status).toBe('ok');
  });

  it('says why, once; null when the model is fine', () => {
    expect(modelUnavailableMessage(snapshot(body))).toBe('Model unavailable — not logged in — the mounted Claude credentials are missing or expired');
    expect(modelUnavailableMessage({ status: 'degraded', checks: { model: { status: 'degraded', detail: 'DNS lookup failed' } }, failing: ['model'] })).toBe('Model unavailable — DNS lookup failed');
    expect(modelUnavailableMessage(snapshot({ status: 'healthy', checks: [{ name: 'model', ok: true }] }))).toBeNull();
  });

  it('the banner leads with the model reason when the model is the only problem', () => {
    render(<ApiDegradedBanner health={snapshot(body)} />);
    expect(screen.getByTestId('api-degraded-model').textContent).toMatch(/^Model unavailable — not logged in/);
  });

  it('with other failures it keeps the generic headline and still names the model', () => {
    const both = snapshot({ ...body, checks: [...body.checks, { name: 'dynamodb', ok: false, error: 'x' }] });
    render(<ApiDegradedBanner health={both} />);
    const banner = screen.getByTestId('api-degraded-banner');
    expect(banner.textContent).toMatch(/Backend services degraded/);
    expect(banner.textContent).toMatch(/Affected: dynamodb\. Model unavailable — not logged in/);
  });
});
