// ui-components/src/hooks/useApiHealth.ts
//
// Polls the platform's GET /health endpoint and exposes the rollup status so
// the UI can show a "Backend services degraded" banner when dependencies
// (Dynamo/Redis/etc.) are unavailable. Distinct from the WebSocket gateway
// "Disconnected" indicator — the WS path can be healthy while REST is not.
//
// Where it polls (2.359.0): `options.baseUrl` when given, else
// `getApiBaseUrl()`. It used to read `import.meta.env.VITE_SOCIAL_API_URL`,
// which is inlined at THIS library's build and is '' in a published build —
// so the hook never polled for a consumer, which is why the gateway kept its
// own copy. That copy's two improvements live here now: both /health shapes
// are understood, and a tab coming back (visible / online) polls at once.

import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../lib/apiBaseUrl';

export type ApiHealthStatus = 'ok' | 'degraded' | 'unknown';

export interface ApiHealthCheck {
  status: 'ok' | 'error' | string;
  latencyMs?: number;
  error?: string;
}

export interface ApiHealthSnapshot {
  status: ApiHealthStatus;
  checks: Record<string, ApiHealthCheck>;
  /** Names of failing dependencies (status !== 'ok'). Empty when healthy or unknown. */
  failing: string[];
}

export interface UseApiHealthOptions {
  /** Poll interval. Default 30 s. */
  pollMs?: number;
  /** Origin whose `/health` is polled. Wins over `getApiBaseUrl()`. */
  baseUrl?: string;
}

const DEFAULT_POLL_MS = 30_000;

// /health has two shapes in the wild:
//   v1: { status: 'ok'|'degraded', checks: { name: { status: 'ok'|'error' } } }
//   v2: { status: 'healthy'|'degraded'|'unhealthy', checks: [{ name, ok, durationMs, error }] }
// Without v2 support the banner read "Affected: unknown" forever, because a
// v2 body fell into the unparseable branch.
interface HealthResponse {
  status?: string;
  service?: string;
  checks?: Record<string, ApiHealthCheck> | Array<{ name: string; ok?: boolean; status?: string; durationMs?: number; error?: string }>;
}

/** Collapses either /health shape into the v1 one; `null` when it is neither. */
export function normalizeApiHealth(body: unknown): { status: 'ok' | 'degraded'; checks: Record<string, ApiHealthCheck> } | null {
  if (!body || typeof body !== 'object') return null;
  const response = body as HealthResponse;
  let status: 'ok' | 'degraded';
  if (response.status === 'ok' || response.status === 'healthy') status = 'ok';
  else if (response.status === 'degraded' || response.status === 'unhealthy') status = 'degraded';
  else return null;

  let checks: Record<string, ApiHealthCheck> = {};
  if (Array.isArray(response.checks)) {
    for (const check of response.checks) {
      if (!check || typeof check.name !== 'string') continue;
      checks[check.name] = {
        status: check.ok === true || check.status === 'ok' ? 'ok' : 'error',
        ...(check.durationMs !== undefined ? { latencyMs: check.durationMs } : {}),
        ...(check.error !== undefined ? { error: check.error } : {}),
      };
    }
  } else if (response.checks && typeof response.checks === 'object') {
    checks = response.checks;
  }
  return { status, checks };
}

function deriveFailing(checks: Record<string, ApiHealthCheck> | undefined): string[] {
  if (!checks) return [];
  return Object.entries(checks)
    .filter(([, v]) => v && v.status !== 'ok')
    .map(([k]) => k);
}

/**
 * Polls /health every `pollMs`. The first sample lands as soon as the network
 * round-trip completes; the hook starts in `unknown` so callers don't flash
 * "degraded" before the first response.
 *
 * Accepts the interval as a bare number (the pre-2.359.0 signature) or an
 * options object.
 */
export function useApiHealth(options: number | UseApiHealthOptions = {}): ApiHealthSnapshot {
  const { pollMs = DEFAULT_POLL_MS, baseUrl: baseUrlOption } = typeof options === 'number' ? { pollMs: options } : options;
  const baseUrl = baseUrlOption ?? getApiBaseUrl();
  const [snapshot, setSnapshot] = useState<ApiHealthSnapshot>({
    status: 'unknown',
    checks: {},
    failing: [],
  });
  useEffect(() => {
    if (!baseUrl) return;

    // Per-effect-run liveness flag, NOT a `useRef`: a ref is shared across
    // effect runs, so resetting it at the top of a new run resurrects the
    // previous run's in-flight response, and a superseded sample overwrites
    // the live one.
    let alive = true;

    const tick = async () => {
      try {
        // /health returns 200 when ok, 503 when degraded — both ship a JSON body.
        const res = await fetch(`${baseUrl}/health`);
        const body = (await res.json().catch(() => null)) as unknown;
        if (!alive) return;
        const normalized = normalizeApiHealth(body);
        if (normalized) {
          setSnapshot({ status: normalized.status, checks: normalized.checks, failing: deriveFailing(normalized.checks) });
        } else {
          // Reached the server but the body is unparseable — treat as
          // degraded so operators still see something is wrong.
          setSnapshot({ status: 'degraded', checks: {}, failing: ['unknown'] });
        }
      } catch {
        if (!alive) return;
        // Network/CORS failure — for banner purposes "we can't reach REST" is
        // the same as a degraded backend.
        setSnapshot({ status: 'degraded', checks: {}, failing: ['network'] });
      }
    };

    void tick();
    const handle = setInterval(() => { void tick(); }, pollMs);

    // A tab back from the background, or a network back online, polls now
    // rather than showing a stale reading for up to `pollMs`.
    const onVisibility = () => {
      if (typeof document !== 'undefined' && document.visibilityState === 'visible') void tick();
    };
    const onOnline = () => { void tick(); };
    if (typeof document !== 'undefined') document.addEventListener('visibilitychange', onVisibility);
    if (typeof window !== 'undefined') window.addEventListener('online', onOnline);

    return () => {
      alive = false;
      clearInterval(handle);
      if (typeof document !== 'undefined') document.removeEventListener('visibilitychange', onVisibility);
      if (typeof window !== 'undefined') window.removeEventListener('online', onOnline);
    };
  }, [baseUrl, pollMs]);

  return snapshot;
}
