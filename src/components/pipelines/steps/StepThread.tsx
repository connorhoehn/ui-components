import React, { useState } from 'react';
import { colors } from '../../../constants/styles';
import type { StepExecution } from '../../../types/pipeline';
import { StepSection } from './StepSection';
import { codeBlockStyle, proseBlockStyle, thStyle, tdStyle, eventChipStyle } from './stepStyles';

export interface StepThreadProps {
  stepId: string;
  step: StepExecution;
  index: number;
  nodeType: string;
  nodeConfig?: Record<string, unknown>;
  /** When provided, renders a "Retry from here" action in the expanded panel. */
  onRetryFromStep?: (stepId: string) => void;
  /**
   * hub#2223: when provided, renders a "Resume from here" action that
   * re-enters the current run via PipelineModule.resumeFromStep. The page
   * gates this behind `run.status === 'failed'` before passing the handler.
   */
  onResumeFromStep?: (stepId: string) => void;
}

export function StepThread({ stepId, step, index, nodeType, nodeConfig, onRetryFromStep, onResumeFromStep }: StepThreadProps) {
  const [expanded, setExpanded] = useState(false);

  const output = step.output as Record<string, unknown> | undefined;
  const llmResponse = output?.response as string | undefined;
  const llmData = step.llm;
  const input = step.input as Record<string, unknown> | undefined;
  const statusColor = step.status === 'completed' ? '#16a34a'
    : step.status === 'failed' ? '#dc2626'
    : step.status === 'running' ? '#2563eb' : '#94a3b8';

  return (
    <div style={{ position: 'relative', paddingLeft: 36, marginBottom: 4 }}>
      {/* Thread node dot */}
      <div style={{
        position: 'absolute',
        left: 10,
        top: 14,
        width: 12,
        height: 12,
        borderRadius: '50%',
        background: statusColor,
        border: '2px solid #fff',
        boxShadow: '0 0 0 1px ' + colors.border,
        zIndex: 1,
      }} />

      {/* Collapsed row — always clickable */}
      <div
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpanded(!expanded); } }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '10px 14px',
          background: expanded ? colors.surfaceInset : colors.surface,
          border: `1px solid ${expanded ? statusColor + '40' : colors.border}`,
          borderRadius: expanded ? '8px 8px 0 0' : 8,
          cursor: 'pointer',
          transition: 'background 0.1s',
        }}
      >
        <span
          aria-hidden="true"
          style={{
          fontSize: 10,
          color: colors.textTertiary,
          transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
          transition: 'transform 0.15s',
          flexShrink: 0,
        }}>
          ▶
        </span>
        <span
          aria-label={`Status: ${step.status}`}
          style={{
          fontSize: 10, fontWeight: 700, color: '#fff', background: statusColor,
          padding: '2px 6px', borderRadius: 3, textTransform: 'uppercase', flexShrink: 0,
        }}>
          {step.status}
        </span>
        <span style={{ fontSize: 13, fontWeight: 600, color: colors.textPrimary }}>
          {index + 1}. {nodeType}
        </span>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: colors.textTertiary }}>
          {stepId.slice(0, 8)}
        </span>
        {step.durationMs != null && (
          <span style={{ fontSize: 11, color: colors.textTertiary, marginLeft: 'auto' }}>
            {step.durationMs < 1000 ? `${step.durationMs}ms` : `${(step.durationMs / 1000).toFixed(1)}s`}
          </span>
        )}
        {llmData && (
          <span style={{ fontSize: 10, color: colors.textTertiary, fontFamily: 'monospace' }}>
            {llmData.tokensIn + llmData.tokensOut} tok
          </span>
        )}
        {output?.tokensIn != null && !llmData && (
          <span style={{ fontSize: 10, color: colors.textTertiary, fontFamily: 'monospace' }}>
            {Number(output.tokensIn) + Number(output.tokensOut)} tok
          </span>
        )}
      </div>

      {/* Expanded detail panel — always available */}
      {expanded && (
        <div style={{
          border: `1px solid ${statusColor}40`,
          borderTop: 'none',
          borderRadius: '0 0 8px 8px',
          background: colors.surface,
          overflow: 'hidden',
        }}>
          {/* Event timeline table */}
          <StepSection title="Execution Timeline">
            <table style={{ width: '100%', fontSize: 11, borderCollapse: 'collapse', fontFamily: 'monospace' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                  <th scope="col" style={thStyle}>Event</th>
                  <th scope="col" style={thStyle}>Time</th>
                  <th scope="col" style={thStyle}>Detail</th>
                </tr>
              </thead>
              <tbody>
                {step.startedAt && (
                  <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                    <td style={tdStyle}><span style={eventChipStyle('#2563eb')}>started</span></td>
                    <td style={tdStyle}>{new Date(step.startedAt).toLocaleTimeString()}</td>
                    <td style={tdStyle}>Node {stepId.slice(0, 8)} ({nodeType}) began execution</td>
                  </tr>
                )}
                {llmData?.streamOpened && (
                  <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                    <td style={tdStyle}><span style={eventChipStyle('#7c3aed')}>stream.opened</span></td>
                    <td style={tdStyle}>—</td>
                    <td style={tdStyle}>LLM stream connection established</td>
                  </tr>
                )}
                {llmData?.firstTokenLatencyMs != null && (
                  <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                    <td style={tdStyle}><span style={eventChipStyle('#7c3aed')}>first.token</span></td>
                    <td style={tdStyle}>+{llmData.firstTokenLatencyMs}ms</td>
                    <td style={tdStyle}>First token received from LLM</td>
                  </tr>
                )}
                {step.completedAt && step.status === 'completed' && (
                  <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                    <td style={tdStyle}><span style={eventChipStyle('#16a34a')}>completed</span></td>
                    <td style={tdStyle}>{new Date(step.completedAt).toLocaleTimeString()}</td>
                    <td style={tdStyle}>
                      Finished in {step.durationMs != null ? (step.durationMs < 1000 ? `${step.durationMs}ms` : `${(step.durationMs / 1000).toFixed(1)}s`) : '—'}
                    </td>
                  </tr>
                )}
                {step.status === 'failed' && (
                  <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                    <td style={tdStyle}><span style={eventChipStyle('#dc2626')}>failed</span></td>
                    <td style={tdStyle}>{step.completedAt ? new Date(step.completedAt).toLocaleTimeString() : '—'}</td>
                    <td style={tdStyle}>{step.error ?? 'Unknown error'}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </StepSection>

          {/* Node configuration — the actual inputs defined on the node */}
          <StepSection title="Node Configuration">
            {nodeConfig && Object.keys(nodeConfig).length > 1 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '4px 16px', fontSize: 12 }}>
                {Object.entries(nodeConfig)
                  .filter(([k]) => k !== 'type')
                  .map(([key, value]) => (
                    <React.Fragment key={key}>
                      <span style={{ color: colors.textTertiary, fontWeight: 500 }}>{key}</span>
                      <span style={{
                        fontFamily: typeof value === 'string' && value.length > 60 ? 'inherit' : 'monospace',
                        color: colors.textSecondary,
                        whiteSpace: typeof value === 'string' && value.length > 60 ? 'pre-wrap' : 'nowrap',
                        wordBreak: 'break-word',
                      }}>
                        {typeof value === 'string' ? value : JSON.stringify(value)}
                      </span>
                    </React.Fragment>
                  ))}
              </div>
            ) : (
              <span style={{ fontSize: 12, color: colors.textTertiary, fontStyle: 'italic' }}>No configuration</span>
            )}
          </StepSection>

          {/* Runtime input context passed to this step */}
          {input && Object.keys(input).length > 0 && (
            <StepSection title="Runtime Input">
              <pre style={codeBlockStyle}>
                {JSON.stringify(input, null, 2)}
              </pre>
            </StepSection>
          )}

          {/* LLM Prompt (actual resolved prompt sent) */}
          {llmData?.prompt && (
            <StepSection title="Resolved Prompt">
              <div style={proseBlockStyle}>
                {llmData.prompt}
              </div>
            </StepSection>
          )}

          {/* LLM Response / Output */}
          {(llmResponse || llmData?.response) ? (
            <StepSection title="Response">
              <div style={proseBlockStyle}>
                {llmResponse ?? llmData?.response}
              </div>
            </StepSection>
          ) : (
            <StepSection title="Output">
              {output && Object.keys(output).length > 0 ? (
                <pre style={codeBlockStyle}>
                  {JSON.stringify(output, null, 2)}
                </pre>
              ) : (
                <span style={{ fontSize: 12, color: colors.textTertiary, fontStyle: 'italic' }}>No output data</span>
              )}
            </StepSection>
          )}

          {/* Token usage / LLM stats */}
          {(llmData || output?.tokensIn != null) && (
            <StepSection title="Token Usage">
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 12, color: colors.textSecondary }}>
                <span>Tokens in: <strong>{String(llmData?.tokensIn ?? output?.tokensIn ?? '—')}</strong></span>
                <span>Tokens out: <strong>{String(llmData?.tokensOut ?? output?.tokensOut ?? '—')}</strong></span>
                {llmData?.firstTokenLatencyMs != null && (
                  <span>First token: <strong>{llmData.firstTokenLatencyMs}ms</strong></span>
                )}
              </div>
            </StepSection>
          )}

          {/* Error */}
          {step.error && (
            <StepSection title="Error">
              <div style={{
                padding: '8px 12px',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: 6,
                fontSize: 12,
                color: '#991b1b',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
              }}>
                {step.error}
              </div>
            </StepSection>
          )}

          {/* Retry-from-step + Resume-from-step affordances — only rendered
              when the caller wires in the matching handler. */}
          {(onRetryFromStep || onResumeFromStep) && (
            <div
              style={{
                padding: '10px 16px',
                borderTop: `1px solid ${colors.border}`,
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 8,
              }}
            >
              {onResumeFromStep && (
                <button
                  type="button"
                  data-testid={`resume-from-step-${stepId}`}
                  onClick={(e) => { e.stopPropagation(); onResumeFromStep(stepId); }}
                  title="Resume the same run from this step (preserves accumulated context)"
                  style={{
                    padding: '5px 12px',
                    fontSize: 12,
                    fontWeight: 500,
                    border: `1px solid ${colors.primary}`,
                    background: colors.primary,
                    color: '#fff',
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  ↻ Resume from here
                </button>
              )}
              {onRetryFromStep && (
                <button
                  type="button"
                  data-testid={`retry-from-step-${stepId}`}
                  onClick={(e) => { e.stopPropagation(); onRetryFromStep(stepId); }}
                  style={{
                    padding: '5px 12px',
                    fontSize: 12,
                    fontWeight: 500,
                    border: `1px solid ${colors.primary}`,
                    background: 'transparent',
                    color: colors.primary,
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  ↻ Retry from here
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
