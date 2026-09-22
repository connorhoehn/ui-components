// frontend/src/components/pipelines/hooks/useTriggerRun.ts
//
// Backend-sourced trigger path. POSTs `/api/pipelines/:pipelineId/runs` with
// the PipelineDefinition inline so the gateway forwards via PipelineBridge to
// the PipelineModule without a read-after-write against pipeline storage.
//
// On success returns the created `runId`; on failure returns `null` with the
// reason on `lastError`. The optional `Idempotency-Key` header is forwarded
// when supplied; replays surface via `isReplay`.

import { useCallback, useState } from 'react';
import { useOptionalIdentityContext } from '../../../contexts/IdentityContext';
import { getApiBaseUrl } from '../../../lib/apiBaseUrl';
import { loadPipeline } from '../persistence/pipelineStorage';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TriggerRunResponse {
  runId: string;
  pipelineId: string;
  triggeredBy: { userId: string; triggerType: string };
  at: string;
}

export interface UseTriggerRunOptions {
  /** Wins over this library's `useIdentityContext().idToken`. */
  idToken?: string | null;
  /** Wins over the build-time `VITE_SOCIAL_API_URL` / module `setApiBaseUrl`. */
  baseUrl?: string;
}

export interface TriggerRunOptions {
  /**
   * When provided, sent as the `Idempotency-Key` request header. The server
   * dedupes replays of the same key within a short window and returns the
   * original response (with `X-Idempotent-Replay: true`). Callers typically
   * pass `crypto.randomUUID()` once per logical trigger and reuse it across
   * retries.
   */
  idempotencyKey?: string;
}

export interface UseTriggerRunReturn {
  triggerRun: (
    pipelineId: string,
    payload?: Record<string, unknown>,
    options?: TriggerRunOptions,
  ) => Promise<string | null>;
  isTriggering: boolean;
  lastError: string | null;
  /**
   * True iff the most recent successful `triggerRun` call was served from the
   * server's idempotency cache (i.e. the `X-Idempotent-Replay` header was
   * set). Resets to `false` on each new trigger attempt.
   */
  isReplay: boolean;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useTriggerRun(options: UseTriggerRunOptions = {}): UseTriggerRunReturn {
  const identityCtx = useOptionalIdentityContext();
  const idToken = options.idToken !== undefined ? options.idToken : (identityCtx?.idToken ?? null);
  const [isTriggering, setIsTriggering] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const [isReplay, setIsReplay] = useState(false);

  const baseUrl = options.baseUrl ?? getApiBaseUrl();

  const triggerRun = useCallback(
    async (
      pipelineId: string,
      payload?: Record<string, unknown>,
      options?: TriggerRunOptions,
    ): Promise<string | null> => {
      // Auth is optional in dev (social-api SKIP_AUTH=true). Hard-failing
      // when idToken is absent caused the editor's Run button to silently
      // drop the trigger — the backend accepts the POST without a Bearer
      // header and identifies the caller as dev-user. We attach the token
      // when present and fall through cleanly when not.
      setIsTriggering(true);
      setLastError(null);
      setIsReplay(false);
      try {
        // Load the definition from local pipeline storage and ship it inline.
        // Missing-definition is non-fatal in Phase 1: the server accepts a
        // bare trigger. In Phase 4 the server will require `definition`.
        const definition = loadPipeline(pipelineId);

        const bodyPayload: Record<string, unknown> = {};
        if (payload) bodyPayload.triggerPayload = payload;
        if (definition) bodyPayload.definition = definition;

        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
        };
        if (options?.idempotencyKey) {
          headers['Idempotency-Key'] = options.idempotencyKey;
        }

        const res = await fetch(
          `${baseUrl}/api/pipelines/${encodeURIComponent(pipelineId)}/runs`,
          {
            method: 'POST',
            headers,
            body: JSON.stringify(bodyPayload),
          },
        );
        if (!res.ok) {
          const text = await res.text().catch(() => '');
          setLastError(
            `Trigger failed (${res.status})${text ? `: ${text}` : ''}`,
          );
          return null;
        }
        // Header matching is case-insensitive via the Headers API; fall back
        // to a plain-object lookup if the runtime hands us a bag of strings.
        // Note: the backend middleware uses `X-Idempotent-Replay` (RFC draft
        // wording). Keep both casings on the fallback path defensively.
        const replayHeader =
          typeof (res.headers as Headers)?.get === 'function'
            ? (res.headers as Headers).get('X-Idempotent-Replay')
            : ((res.headers as unknown as Record<string, string>)['x-idempotent-replay'] ?? null);
        setIsReplay(replayHeader === 'true');

        const data = (await res.json()) as TriggerRunResponse;
        return data.runId;
      } catch (err) {
        setLastError((err as Error).message);
        return null;
      } finally {
        setIsTriggering(false);
      }
    },
    [baseUrl, idToken],
  );

  return { triggerRun, isTriggering, lastError, isReplay };
}
