// frontend/src/components/pipelines/LiveOutputPanel.tsx
//
// Live Token Streaming panel — shows LLM output as it arrives during pipeline
// execution. Subscribes to the EventStream wildcard channel and filters for
// pipeline.llm.* events matching the active runId.
//
// Features:
//  - Streams tokens in real time with a blinking cursor animation
//  - Groups output by stepId in collapsible sections
//  - Shows a summary line when a step's stream completes
//  - Auto-scrolls to bottom (detaches on manual scroll up)
//  - Dark terminal-style background for code-like readability

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { PipelineEventMap } from '../../types/pipeline';
import { useEventStream } from './context/EventStreamContext';
import type { WildcardEvent } from './context/EventStreamContext';
import { cn } from '../../lib/cn';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface LiveOutputPanelProps {
  runId: string | null;
  visible: boolean;
}

// ---------------------------------------------------------------------------
// Internal types
// ---------------------------------------------------------------------------

interface StepStream {
  stepId: string;
  tokens: string[];
  /** Accumulated text (avoids joining on every render). */
  text: string;
  /** Whether the stream is still open (tokens arriving). */
  active: boolean;
  /** Summary shown after pipeline.llm.response arrives. */
  summary: string | null;
  /** Whether the section is collapsed by the user. */
  collapsed: boolean;
  /** Timestamp of first token or stream open. */
  startedAt: number;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function LiveOutputPanel({ runId, visible }: LiveOutputPanelProps) {
  const [steps, setSteps] = useState<Map<string, StepStream>>(new Map());
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const pinnedRef = useRef(true);
  const prevRunIdRef = useRef<string | null>(null);

  // Reset state when runId changes.
  useEffect(() => {
    if (runId !== prevRunIdRef.current) {
      prevRunIdRef.current = runId;
      setSteps(new Map());
      pinnedRef.current = true;
    }
  }, [runId]);

  // Scroll pinning logic.
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 30;
    pinnedRef.current = atBottom;
  }, []);

  // Auto-scroll when content changes.
  const autoScroll = useCallback(() => {
    if (!pinnedRef.current) return;
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, []);

  // Subscribe to wildcard event stream and filter for LLM events.
  const handler = useCallback(
    (envelope: PipelineEventMap[keyof PipelineEventMap] | WildcardEvent) => {
      if (!('eventType' in envelope)) return;
      const { eventType, payload } = envelope as { eventType: string; payload: Record<string, unknown> };

      // Only handle LLM streaming events.
      if (!eventType.startsWith('pipeline.llm.')) return;

      const eventRunId = payload?.runId as string | undefined;
      // Filter by active runId (use ref to avoid stale closure).
      if (!runId || eventRunId !== runId) return;

      const stepId = payload?.stepId as string | undefined;
      if (!stepId) return;

      if (eventType === 'pipeline.llm.stream.opened') {
        setSteps((prev) => {
          const next = new Map(prev);
          if (!next.has(stepId)) {
            next.set(stepId, {
              stepId,
              tokens: [],
              text: '',
              active: true,
              summary: null,
              collapsed: false,
              startedAt: Date.now(),
            });
          }
          return next;
        });
      } else if (eventType === 'pipeline.llm.token') {
        const token = payload?.token as string | undefined;
        if (token === undefined) return;
        setSteps((prev) => {
          const next = new Map(prev);
          const existing = next.get(stepId);
          if (existing) {
            const updated = {
              ...existing,
              tokens: [...existing.tokens, token],
              text: existing.text + token,
              active: true,
            };
            next.set(stepId, updated);
          } else {
            // Stream opened event might have been missed; create entry.
            next.set(stepId, {
              stepId,
              tokens: [token],
              text: token,
              active: true,
              summary: null,
              collapsed: false,
              startedAt: Date.now(),
            });
          }
          return next;
        });
      } else if (eventType === 'pipeline.llm.response') {
        const tokensIn = payload?.tokensIn as number | undefined;
        const tokensOut = payload?.tokensOut as number | undefined;
        setSteps((prev) => {
          const next = new Map(prev);
          const existing = next.get(stepId);
          const durationMs = existing
            ? Date.now() - existing.startedAt
            : 0;
          const durationLabel = durationMs > 1000
            ? `${(durationMs / 1000).toFixed(1)}s`
            : `${durationMs}ms`;
          const summary = `${stepId}: ${tokensIn ?? '?'} tokens in, ${tokensOut ?? '?'} tokens out (${durationLabel})`;
          if (existing) {
            next.set(stepId, {
              ...existing,
              active: false,
              summary,
            });
          } else {
            next.set(stepId, {
              stepId,
              tokens: [],
              text: '',
              active: false,
              summary,
              collapsed: false,
              startedAt: Date.now(),
            });
          }
          return next;
        });
      }
    },
    [runId],
  );

  useEventStream<keyof PipelineEventMap>('*', handler);

  // Auto-scroll after state updates.
  useEffect(() => {
    autoScroll();
  }, [steps, autoScroll]);

  // Toggle collapse for a step section.
  const toggleCollapse = useCallback((stepId: string) => {
    setSteps((prev) => {
      const next = new Map(prev);
      const existing = next.get(stepId);
      if (existing) {
        next.set(stepId, { ...existing, collapsed: !existing.collapsed });
      }
      return next;
    });
  }, []);

  // Determine if any step is actively streaming.
  const hasActiveStream = useMemo(() => {
    for (const s of steps.values()) {
      if (s.active) return true;
    }
    return false;
  }, [steps]);

  const stepEntries = useMemo(() => Array.from(steps.values()), [steps]);

  if (!visible) return null;

  return (
    <div
      className="flex flex-col bg-[#1e1e2e] border-t border-[#313244] max-h-[320px] min-h-[160px] overflow-hidden relative"
      data-testid="live-output-panel"
    >
      {/* Header */}
      <div className="flex items-center justify-between py-2 px-[14px] bg-[#181825] border-b border-[#313244] shrink-0">
        <div className="text-xs font-bold text-[#cdd6f4] tracking-[0.04em] uppercase flex items-center gap-2">
          <span>Live Output</span>
          {hasActiveStream && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#a6e3a1] [animation:live-output-blink_1.2s_ease-in-out_infinite]" />
          )}
          {runId && (
            <span className="text-[10px] text-[#6c7086] font-normal normal-case">
              {runId.slice(0, 8)}...
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto py-[10px] px-[14px] text-[13px] leading-[1.6] text-[#cdd6f4] font-code"
        onScroll={handleScroll}
      >
        {stepEntries.length === 0 ? (
          <div className="flex items-center justify-center h-full text-[#6c7086] text-[13px] italic">
            {runId
              ? 'Waiting for LLM output...'
              : 'No active run'}
          </div>
        ) : (
          stepEntries.map((step) => (
            <div key={step.stepId}>
              {/* Section header */}
              <div
                className={cn(
                  'flex items-center gap-2 py-1.5 cursor-pointer select-none text-[11px] font-semibold border-b border-[#313244] mb-1.5',
                  step.active ? 'text-[#89b4fa]' : 'text-[#a6adc8]',
                )}
                onClick={() => toggleCollapse(step.stepId)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') toggleCollapse(step.stepId);
                }}
              >
                <span className="text-[10px]">
                  {step.collapsed ? '▶' : '▼'}
                </span>
                <span>{step.stepId}</span>
                {step.active && (
                  <span className="text-[#a6e3a1] text-[10px]">streaming</span>
                )}
              </div>

              {/* Token content */}
              {!step.collapsed && (
                <>
                  {step.text.length > 0 && (
                    <div className="whitespace-pre-wrap break-words m-0 mb-3 p-0 text-[#cdd6f4]">
                      {step.text}
                      {step.active && (
                        <span className="inline-block w-0.5 h-[14px] bg-[#89b4fa] ml-px align-text-bottom [animation:live-output-blink_1s_step-end_infinite]" />
                      )}
                    </div>
                  )}
                  {step.summary && (
                    <div className="text-[11px] text-[#a6e3a1] font-semibold pt-1 pb-2 border-b border-[#313244] mb-2">
                      {'✓'} {step.summary}
                    </div>
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
