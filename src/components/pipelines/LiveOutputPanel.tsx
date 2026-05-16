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
import type { CSSProperties } from 'react';
import type { PipelineEventMap } from '../../types/pipeline';
import { useEventStream } from './context/EventStreamContext';
import type { WildcardEvent } from './context/EventStreamContext';

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
// Styles
// ---------------------------------------------------------------------------

const panelStyle = (visible: boolean): CSSProperties => ({
  display: visible ? 'flex' : 'none',
  flexDirection: 'column',
  background: '#1e1e2e',
  borderTop: '1px solid #313244',
  maxHeight: 320,
  minHeight: 160,
  overflow: 'hidden',
  position: 'relative',
  transition: 'max-height 0.2s ease',
});

const headerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 14px',
  background: '#181825',
  borderBottom: '1px solid #313244',
  flexShrink: 0,
};

const headerTitleStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  color: '#cdd6f4',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
};

const bodyStyle: CSSProperties = {
  flex: 1,
  overflowY: 'auto',
  padding: '10px 14px',
  fontFamily: '"JetBrains Mono", "Fira Code", "SF Mono", Menlo, Consolas, monospace',
  fontSize: 13,
  lineHeight: 1.6,
  color: '#cdd6f4',
};

const sectionHeaderStyle = (active: boolean): CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '6px 0',
  cursor: 'pointer',
  userSelect: 'none',
  fontSize: 11,
  fontWeight: 600,
  color: active ? '#89b4fa' : '#a6adc8',
  borderBottom: '1px solid #313244',
  marginBottom: 6,
});

const tokenAreaStyle: CSSProperties = {
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  margin: '0 0 12px 0',
  padding: 0,
  color: '#cdd6f4',
};

const summaryStyle: CSSProperties = {
  fontSize: 11,
  color: '#a6e3a1',
  fontWeight: 600,
  padding: '4px 0 8px 0',
  borderBottom: '1px solid #313244',
  marginBottom: 8,
};

const emptyStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  color: '#6c7086',
  fontSize: 13,
  fontStyle: 'italic',
};

const closeBtnStyle: CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#6c7086',
  cursor: 'pointer',
  fontSize: 14,
  padding: '2px 6px',
  borderRadius: 4,
  lineHeight: 1,
};

const cursorStyle: CSSProperties = {
  display: 'inline-block',
  width: 2,
  height: 14,
  background: '#89b4fa',
  marginLeft: 1,
  verticalAlign: 'text-bottom',
  animation: 'live-output-blink 1s step-end infinite',
};

// Inject the blink keyframes once into the document.
const KEYFRAMES_ID = 'live-output-panel-keyframes';
function ensureKeyframes(): void {
  if (typeof document === 'undefined') return;
  if (document.getElementById(KEYFRAMES_ID)) return;
  const style = document.createElement('style');
  style.id = KEYFRAMES_ID;
  style.textContent = `
    @keyframes live-output-blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function LiveOutputPanel({ runId, visible }: LiveOutputPanelProps) {
  const [steps, setSteps] = useState<Map<string, StepStream>>(new Map());
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const pinnedRef = useRef(true);
  const prevRunIdRef = useRef<string | null>(null);

  // Inject CSS keyframes for the blinking cursor.
  useEffect(() => {
    ensureKeyframes();
  }, []);

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
    <div style={panelStyle(visible)} data-testid="live-output-panel">
      {/* Header */}
      <div style={headerStyle}>
        <div style={headerTitleStyle}>
          <span>Live Output</span>
          {hasActiveStream && (
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#a6e3a1]"
              style={{ animation: 'live-output-blink 1.2s ease-in-out infinite' }}
            />
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
        style={bodyStyle}
        onScroll={handleScroll}
      >
        {stepEntries.length === 0 ? (
          <div style={emptyStyle}>
            {runId
              ? 'Waiting for LLM output...'
              : 'No active run'}
          </div>
        ) : (
          stepEntries.map((step) => (
            <div key={step.stepId}>
              {/* Section header */}
              <div
                style={sectionHeaderStyle(step.active)}
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
                    <div style={tokenAreaStyle}>
                      {step.text}
                      {step.active && <span style={cursorStyle} />}
                    </div>
                  )}
                  {step.summary && (
                    <div style={summaryStyle}>
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
