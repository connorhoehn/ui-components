// frontend/src/components/pipelines/canvas/DebugTab.tsx
//
// Debug tab for ConfigPanel showing step execution details during replay.
// Displays input/output/errors/duration/LLM metadata from StepExecution.

import type { CSSProperties } from 'react';
import type { StepExecution } from '../../../types/pipeline';
import { formatDuration } from '../utils/formatTime';

export interface DebugTabProps {
  stepExecution: StepExecution | null | undefined;
  nodeId: string;
}

const sectionStyle: CSSProperties = {
  padding: '12px 16px',
  borderBottom: '1px solid #e2e8f0',
};

const labelStyle: CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  color: '#64748b',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  marginBottom: 6,
};

const valueStyle: CSSProperties = {
  fontSize: 13,
  color: '#0f172a',
  fontFamily: 'monospace',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
};

const errorStyle: CSSProperties = {
  ...valueStyle,
  color: '#dc2626',
  background: '#fef2f2',
  padding: 8,
  borderRadius: 4,
  border: '1px solid #fecaca',
};

const statusBadgeStyle = (status: string): CSSProperties => {
  const colors: Record<string, { bg: string; fg: string }> = {
    completed: { bg: '#f0fdf4', fg: '#16a34a' },
    failed: { bg: '#fef2f2', fg: '#dc2626' },
    cancelled: { bg: '#f1f5f9', fg: '#475569' },
    running: { bg: '#eff6ff', fg: '#2563eb' },
    pending: { bg: '#f1f5f9', fg: '#475569' },
    skipped: { bg: '#fafafa', fg: '#71717a' },
  };
  const c = colors[status] || colors.pending;
  return {
    display: 'inline-block',
    padding: '2px 8px',
    fontSize: 11,
    fontWeight: 600,
    borderRadius: 4,
    background: c.bg,
    color: c.fg,
  };
};

const metricStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '4px 0',
  fontSize: 12,
};

const metricLabelStyle: CSSProperties = {
  color: '#64748b',
};

const metricValueStyle: CSSProperties = {
  fontWeight: 600,
  color: '#0f172a',
};


function formatTimestamp(iso: string | undefined): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  }).format(d);
}

function formatJSON(value: unknown): string {
  if (value === null || value === undefined) return '—';
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

export default function DebugTab({ stepExecution, nodeId }: DebugTabProps) {
  if (!stepExecution) {
    return (
      <div style={{ padding: '24px 16px', textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>
        <p>No execution data available for this node.</p>
        <p style={{ marginTop: 8, fontSize: 12 }}>
          Run the pipeline to see debug information.
        </p>
      </div>
    );
  }

  const { status, startedAt, completedAt, durationMs, input, output, error, llm } = stepExecution;

  return (
    <div>
      {/* Status & Timing */}
      <div style={sectionStyle}>
        <div style={labelStyle}>Status</div>
        <div style={statusBadgeStyle(status)}>{status}</div>

        <div style={{ marginTop: 12 }}>
          <div style={metricStyle}>
            <span style={metricLabelStyle}>Started</span>
            <span style={metricValueStyle}>{formatTimestamp(startedAt)}</span>
          </div>
          <div style={metricStyle}>
            <span style={metricLabelStyle}>Completed</span>
            <span style={metricValueStyle}>{formatTimestamp(completedAt)}</span>
          </div>
          <div style={metricStyle}>
            <span style={metricLabelStyle}>Duration</span>
            <span style={metricValueStyle}>{formatDuration(durationMs)}</span>
          </div>
        </div>
      </div>

      {/* Error (if present) */}
      {error && (
        <div style={sectionStyle}>
          <div style={labelStyle}>Error</div>
          <div style={errorStyle}>{error}</div>
        </div>
      )}

      {/* Input */}
      {input !== undefined && (
        <div style={sectionStyle}>
          <div style={labelStyle}>Input</div>
          <pre style={valueStyle}>{formatJSON(input)}</pre>
        </div>
      )}

      {/* Output */}
      {output !== undefined && (
        <div style={sectionStyle}>
          <div style={labelStyle}>Output</div>
          <pre style={valueStyle}>{formatJSON(output)}</pre>
        </div>
      )}

      {/* LLM Metadata (if present) */}
      {llm && (
        <div style={sectionStyle}>
          <div style={labelStyle}>LLM Details</div>

          <div style={metricStyle}>
            <span style={metricLabelStyle}>Tokens In</span>
            <span style={metricValueStyle}>{llm.tokensIn.toLocaleString()}</span>
          </div>
          <div style={metricStyle}>
            <span style={metricLabelStyle}>Tokens Out</span>
            <span style={metricValueStyle}>{llm.tokensOut.toLocaleString()}</span>
          </div>
          {llm.firstTokenLatencyMs !== undefined && (
            <div style={metricStyle}>
              <span style={metricLabelStyle}>First Token Latency</span>
              <span style={metricValueStyle}>{formatDuration(llm.firstTokenLatencyMs)}</span>
            </div>
          )}

          {llm.prompt && (
            <div style={{ marginTop: 12 }}>
              <div style={{ ...labelStyle, marginBottom: 8 }}>Prompt</div>
              <pre style={valueStyle}>{llm.prompt}</pre>
            </div>
          )}

          {llm.response && (
            <div style={{ marginTop: 12 }}>
              <div style={{ ...labelStyle, marginBottom: 8 }}>Response</div>
              <pre style={valueStyle}>{llm.response}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
