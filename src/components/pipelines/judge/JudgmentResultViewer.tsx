import { useState } from 'react';
import { cn } from '../../../lib/cn';
import VerdictPanel from './VerdictPanel';
import CriteriaPanel from './CriteriaPanel';
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
 * Layout: stacked single column — the criteria list is the dense surface,
 * everything else is a thin wrapper. Embedding consumers can hide
 * sections via the `show*` flags.
 */
export function JudgmentResultViewer({
  result,
  showVerdict = true,
  showCriteria = true,
  showMetadata = true,
  showRawText = false,
  className,
}: JudgmentResultViewerProps) {
  const [showRaw, setShowRaw] = useState(false);

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

      {showRawText && result.rawModelText ? (
        <section className="flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => setShowRaw((v) => !v)}
            className="self-start text-[11px] font-medium text-text-tertiary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 rounded"
          >
            {showRaw ? '▾' : '▸'} Raw model output
          </button>
          {showRaw ? (
            <pre className="overflow-x-auto rounded-lg border border-border bg-surface-panel p-2 font-mono text-[11px] leading-snug text-text-secondary">
              {result.rawModelText}
            </pre>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}

export default JudgmentResultViewer;
