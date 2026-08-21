import React, { useState } from 'react';
import { cn } from '../../../lib/cn';
import type { StepExecution } from '../../../types/pipeline';
import { StepSection } from './StepSection';
import { codeBlockClass, proseBlockClass, thClass, tdClass, eventChipClass } from './stepStyles';

export interface StepThreadProps {
  stepId: string;
  step: StepExecution;
  index: number;
  nodeType: string;
  nodeConfig?: Record<string, unknown>;
  onRetryFromStep?: (stepId: string) => void;
  onResumeFromStep?: (stepId: string) => void;
}

const STATUS_COLOR: Record<string, string> = {
  completed: '#16a34a',
  failed: '#dc2626',
  running: '#2563eb',
};

export function StepThread({ stepId, step, index, nodeType, nodeConfig, onRetryFromStep, onResumeFromStep }: StepThreadProps) {
  const [expanded, setExpanded] = useState(false);

  const output = step.output as Record<string, unknown> | undefined;
  const llmResponse = output?.response as string | undefined;
  const llmData = step.llm;
  const input = step.input as Record<string, unknown> | undefined;
  const statusColor = STATUS_COLOR[step.status] ?? '#94a3b8';

  return (
    <div className="relative pl-9 mb-1">
      <div
        className="absolute left-[10px] top-[14px] w-3 h-3 rounded-full border-2 border-white z-[1] shadow-[0_0_0_1px_#e2e8f0]"
        style={{ background: statusColor }}
      />

      <div
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpanded(!expanded); } }}
        className={cn(
          'flex items-center gap-2.5 px-3.5 py-2.5 cursor-pointer transition-colors duration-100',
          expanded ? 'bg-surface-inset rounded-t-lg' : 'bg-surface rounded-lg',
        )}
        style={{
          border: `1px solid ${expanded ? statusColor + '40' : '#e2e8f0'}`,
          ...(expanded ? { borderRadius: '8px 8px 0 0' } : {}),
        }}
      >
        <span
          aria-hidden="true"
          className={cn(
            'text-[10px] text-text-tertiary shrink-0 transition-transform duration-150',
            expanded && 'rotate-90',
          )}
        >
          ▶
        </span>
        <span
          aria-label={`Status: ${step.status}`}
          className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded-[3px] uppercase shrink-0"
          style={{ background: statusColor }}
        >
          {step.status}
        </span>
        <span className="text-[13px] font-semibold text-text-primary">
          {index + 1}. {nodeType}
        </span>
        <span className="text-[11px] font-mono text-text-tertiary">
          {stepId.slice(0, 8)}
        </span>
        {step.durationMs != null && (
          <span className="text-[11px] text-text-tertiary ml-auto">
            {step.durationMs < 1000 ? `${step.durationMs}ms` : `${(step.durationMs / 1000).toFixed(1)}s`}
          </span>
        )}
        {llmData && (
          <span className="text-[10px] text-text-tertiary font-mono">
            {llmData.tokensIn + llmData.tokensOut} tok
          </span>
        )}
        {output?.tokensIn != null && !llmData && (
          <span className="text-[10px] text-text-tertiary font-mono">
            {Number(output.tokensIn) + Number(output.tokensOut)} tok
          </span>
        )}
      </div>

      {expanded && (
        <div
          className="border-t-0 rounded-b-lg bg-surface overflow-hidden"
          style={{ border: `1px solid ${statusColor}40` }}
        >
          <StepSection title="Execution Timeline">
            <table className="w-full text-[11px] border-collapse font-mono">
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className={thClass}>Event</th>
                  <th scope="col" className={thClass}>Time</th>
                  <th scope="col" className={thClass}>Detail</th>
                </tr>
              </thead>
              <tbody>
                {step.startedAt && (
                  <tr className="border-b border-border">
                    <td className={tdClass}><span className={eventChipClass('#2563eb')}>started</span></td>
                    <td className={tdClass}>{new Date(step.startedAt).toLocaleTimeString()}</td>
                    <td className={tdClass}>Node {stepId.slice(0, 8)} ({nodeType}) began execution</td>
                  </tr>
                )}
                {llmData?.streamOpened && (
                  <tr className="border-b border-border">
                    <td className={tdClass}><span className={eventChipClass('#7c3aed')}>stream.opened</span></td>
                    <td className={tdClass}>—</td>
                    <td className={tdClass}>LLM stream connection established</td>
                  </tr>
                )}
                {llmData?.firstTokenLatencyMs != null && (
                  <tr className="border-b border-border">
                    <td className={tdClass}><span className={eventChipClass('#7c3aed')}>first.token</span></td>
                    <td className={tdClass}>+{llmData.firstTokenLatencyMs}ms</td>
                    <td className={tdClass}>First token received from LLM</td>
                  </tr>
                )}
                {step.completedAt && step.status === 'completed' && (
                  <tr className="border-b border-border">
                    <td className={tdClass}><span className={eventChipClass('#16a34a')}>completed</span></td>
                    <td className={tdClass}>{new Date(step.completedAt).toLocaleTimeString()}</td>
                    <td className={tdClass}>
                      Finished in {step.durationMs != null ? (step.durationMs < 1000 ? `${step.durationMs}ms` : `${(step.durationMs / 1000).toFixed(1)}s`) : '—'}
                    </td>
                  </tr>
                )}
                {step.status === 'failed' && (
                  <tr className="border-b border-border">
                    <td className={tdClass}><span className={eventChipClass('#dc2626')}>failed</span></td>
                    <td className={tdClass}>{step.completedAt ? new Date(step.completedAt).toLocaleTimeString() : '—'}</td>
                    <td className={tdClass}>{step.error ?? 'Unknown error'}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </StepSection>

          <StepSection title="Node Configuration">
            {nodeConfig && Object.keys(nodeConfig).length > 1 ? (
              <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-xs">
                {Object.entries(nodeConfig)
                  .filter(([k]) => k !== 'type')
                  .map(([key, value]) => (
                    <React.Fragment key={key}>
                      <span className="text-text-tertiary font-medium">{key}</span>
                      <span
                        className={cn(
                          'text-text-secondary break-words',
                          typeof value === 'string' && value.length > 60 ? 'whitespace-pre-wrap font-sans' : 'whitespace-nowrap font-mono',
                        )}
                      >
                        {typeof value === 'string' ? value : JSON.stringify(value)}
                      </span>
                    </React.Fragment>
                  ))}
              </div>
            ) : (
              <span className="text-xs text-text-tertiary italic">No configuration</span>
            )}
          </StepSection>

          {input && Object.keys(input).length > 0 && (
            <StepSection title="Runtime Input">
              <pre className={codeBlockClass}>
                {JSON.stringify(input, null, 2)}
              </pre>
            </StepSection>
          )}

          {llmData?.prompt && (
            <StepSection title="Resolved Prompt">
              <div className={proseBlockClass}>
                {llmData.prompt}
              </div>
            </StepSection>
          )}

          {(llmResponse || llmData?.response) ? (
            <StepSection title="Response">
              <div className={proseBlockClass}>
                {llmResponse ?? llmData?.response}
              </div>
            </StepSection>
          ) : (
            <StepSection title="Output">
              {output && Object.keys(output).length > 0 ? (
                <pre className={codeBlockClass}>
                  {JSON.stringify(output, null, 2)}
                </pre>
              ) : (
                <span className="text-xs text-text-tertiary italic">No output data</span>
              )}
            </StepSection>
          )}

          {(llmData || output?.tokensIn != null) && (
            <StepSection title="Token Usage">
              <div className="flex gap-5 flex-wrap text-xs text-text-secondary">
                <span>Tokens in: <strong>{String(llmData?.tokensIn ?? output?.tokensIn ?? '—')}</strong></span>
                <span>Tokens out: <strong>{String(llmData?.tokensOut ?? output?.tokensOut ?? '—')}</strong></span>
                {llmData?.firstTokenLatencyMs != null && (
                  <span>First token: <strong>{llmData.firstTokenLatencyMs}ms</strong></span>
                )}
              </div>
            </StepSection>
          )}

          {step.error && (
            <StepSection title="Error">
              <div className="px-3 py-2 bg-danger-bg border border-danger-border rounded-md text-xs text-[#991b1b] font-mono whitespace-pre-wrap">
                {step.error}
              </div>
            </StepSection>
          )}

          {(onRetryFromStep || onResumeFromStep) && (
            <div className="px-4 py-2.5 border-t border-border flex justify-end gap-2">
              {onResumeFromStep && (
                <button
                  type="button"
                  data-testid={`resume-from-step-${stepId}`}
                  onClick={(e) => { e.stopPropagation(); onResumeFromStep(stepId); }}
                  title="Resume the same run from this step (preserves accumulated context)"
                  className="px-3 py-[5px] text-xs font-medium border border-primary bg-primary text-white rounded cursor-pointer font-[inherit]"
                >
                  ↻ Resume from here
                </button>
              )}
              {onRetryFromStep && (
                <button
                  type="button"
                  data-testid={`retry-from-step-${stepId}`}
                  onClick={(e) => { e.stopPropagation(); onRetryFromStep(stepId); }}
                  className="px-3 py-[5px] text-xs font-medium border border-primary bg-transparent text-primary rounded cursor-pointer font-[inherit]"
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
