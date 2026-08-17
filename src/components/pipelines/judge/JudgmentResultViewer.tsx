import { useEffect, useRef, useState } from 'react';
import { cn } from '../../../lib/cn';
import VerdictPanel from './VerdictPanel';
import CriteriaPanel from './CriteriaPanel';
import { useJudgmentApi } from './JudgmentApiContext';
import type { JudgmentResult } from './types';

export interface JudgmentResultViewerProps {
  result: JudgmentResult;
  /** Render the top-level verdict header. Default true. */
  showVerdict?: boolean;
  /** Render the per-criterion section. Default true. */
  showCriteria?: boolean;
  /** Render the model / token / cost footer. Default true. */
  showMetadata?: boolean;
  /** Render an expandable raw-model-text section. Default false. */
  showRawText?: boolean;
  className?: string;
}

/**
 * Top-level composite for a `JudgmentResult` — verdict header + per-criterion
 * scores + cost/latency/model footer. Drop into a
 * `pipeline.judge.scored` step's expanded view OR render standalone for
 * direct judgment exploration.
 *
 * Raw text resolution order (when `showRawText` is true):
 *   1. `result.rawModelText` (inline body) — shown immediately
 *   2. `result.rawTextTruncated && <JudgmentApiProvider>` is mounted —
 *      "Show raw" triggers a lazy fetch via `api.fetchRawText(judgmentId)`
 *   3. Neither — show "raw output unavailable" message
 *
 * The viewer never knows about URLs or fetch impls; the provider does.
 */
export function JudgmentResultViewer({
  result,
  showVerdict = true,
  showCriteria = true,
  showMetadata = true,
  showRawText = false,
  className,
}: JudgmentResultViewerProps) {
  const api = useJudgmentApi();
  const [showRaw, setShowRaw] = useState(false);
  const [lazyText, setLazyText] = useState<string | null>(null);
  const [lazyLoading, setLazyLoading] = useState(false);
  const [lazyError, setLazyError] = useState<Error | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // When the user opens the raw section AND the body was truncated AND
  // an API is wired, fire the lazy fetch. Idempotent — only fetches once
  // per judgmentId, then caches in lazyText.
  useEffect(() => {
    if (!showRaw) return;
    if (result.rawModelText) return; // inline body present
    if (lazyText !== null) return; // already fetched
    if (lazyLoading) return; // in-flight
    if (!result.rawTextTruncated) return; // not truncated; nothing to fetch
    if (!api) return; // no provider mounted; render fallback message

    setLazyLoading(true);
    void (async (): Promise<void> => {
      try {
        const body = await api.fetchRawText(result.judgmentId);
        if (!mountedRef.current) return;
        setLazyText(body ?? '');
        setLazyError(null);
      } catch (err) {
        if (!mountedRef.current) return;
        setLazyError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        if (mountedRef.current) setLazyLoading(false);
      }
    })();
  }, [showRaw, result.rawModelText, result.rawTextTruncated, result.judgmentId, api, lazyText, lazyLoading]);

  const effectiveRawText = result.rawModelText ?? lazyText ?? null;
  const rawTextAvailable = !!result.rawModelText || !!result.rawTextTruncated;

  return (
    <div className={cn('flex w-full flex-col gap-3 text-text-primary', className)}>
      {showVerdict ? <VerdictPanel result={result} /> : null}
      {showCriteria ? <CriteriaPanel result={result} /> : null}

      {showMetadata ? (
        <section className="flex flex-wrap items-center gap-2 text-[11px] text-text-tertiary">
          <span>
            tokens <span className="font-mono">{result.tokensIn}</span> in /{' '}
            <span className="font-mono">{result.tokensOut}</span> out
          </span>
          {result.cacheReadTokens && result.cacheReadTokens > 0 ? (
            <>
              <span>·</span>
              <span>
                cache <span className="font-mono">{result.cacheReadTokens}</span> read
              </span>
            </>
          ) : null}
          <span>·</span>
          <span>
            latency <span className="font-mono">{result.latencyMs}</span>ms
          </span>
          <span>·</span>
          <span>
            cost <span className="font-mono">${result.costUsd.toFixed(4)}</span>
          </span>
          <span className="ml-auto font-mono">{result.judgedAt}</span>
        </section>
      ) : null}

      {showRawText && rawTextAvailable ? (
        <section className="flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => setShowRaw((v) => !v)}
            className="self-start text-[11px] font-medium text-text-tertiary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded"
            aria-expanded={showRaw}
          >
            {showRaw ? '▾' : '▸'} Raw model output
          </button>
          {showRaw ? (
            <RawTextSurface
              text={effectiveRawText}
              loading={lazyLoading}
              error={lazyError}
              fallbackHint={
                result.rawTextTruncated && !api
                  ? 'Raw text was spilled to S3 but no JudgmentApi provider is wired.'
                  : null
              }
            />
          ) : null}
        </section>
      ) : null}
    </div>
  );
}

function RawTextSurface({
  text,
  loading,
  error,
  fallbackHint,
}: {
  text: string | null;
  loading: boolean;
  error: Error | null;
  fallbackHint: string | null;
}) {
  if (loading) {
    return (
      <div className="rounded-lg border border-border bg-surface-panel p-2 text-[11px] text-text-tertiary">
        Loading raw text…
      </div>
    );
  }
  if (error) {
    return (
      <div className="rounded-lg border border-state-failed bg-danger-bg p-2 text-[11px] text-text-primary">
        Failed to fetch raw text: {error.message}
      </div>
    );
  }
  if (text === null || text.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-surface-panel p-2 text-[11px] text-text-tertiary">
        {fallbackHint ?? 'Raw text not available.'}
      </div>
    );
  }
  return (
    <pre className="overflow-x-auto rounded-lg border border-border bg-surface-panel p-2 font-mono text-[11px] leading-snug text-text-secondary">
      {text}
    </pre>
  );
}

export default JudgmentResultViewer;
