import React, { useCallback, useState } from 'react';
import { cn } from '../../../lib/cn';
import type { StepExecution } from '../../../types/pipeline';
import { StepSection } from './StepSection';
import { codeBlockClass, proseBlockClass, thClass, tdClass, eventChipClass } from './stepStyles';
import { classifyStepOutput } from '../utils/classifyStepOutput';
import { AgentTraceSection } from './AgentTraceSection';
import { isAgentStepOutput, liveAgentOutputFromCalls } from './agentTrace';
import { VisionResultViewer } from '../vision';
import type { VisionResult } from '../vision';
import { useImageUrlOptional } from '../services/PipelineEditorServicesContext';

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
  completed: 'var(--color-success)',
  failed: 'var(--color-danger)',
  running: 'var(--color-info)',
};

/**
 * Coerce an untyped token count off a step's `output` bag. Anything that isn't
 * a finite number contributes 0 rather than poisoning the sum with NaN.
 */
function countTokens(v: unknown): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

/**
 * Adapt a vision step's `output` bag into the shape <VisionResultViewer> wants.
 *
 * The step persists an opaque `imageId`; the viewer wants a URL it can put in
 * an <img>. Resolving that is the host's job, so with no resolver mounted the
 * caption, tags and extracted JSON still render and only the preview is absent.
 */
function visionResultFrom(
  output: Record<string, unknown>,
  imageUrl: ((imageId: string) => string) | null,
): VisionResult {
  const imgId = typeof output.imageId === 'string' ? output.imageId : null;
  const extracted = (output.extracted ?? {}) as Record<string, unknown>;
  return {
    ...extracted,
    ...(typeof output.caption === 'string' ? { caption: output.caption } : {}),
    ...(typeof output.rawModelText === 'string' ? { rawModelText: output.rawModelText } : {}),
    ...(imgId && imageUrl ? { imageUrl: imageUrl(imgId) } : {}),
  } as VisionResult;
}

export function StepThread({ stepId, step, index, nodeType, nodeConfig, onRetryFromStep, onResumeFromStep }: StepThreadProps) {
  const [expanded, setExpanded] = useState(false);
  const [copyLabel, setCopyLabel] = useState<'Copy JSON' | 'Copied!'>('Copy JSON');
  // Optional on purpose: a run-detail page is read-only and does not mount the
  // editor's services provider. No host resolver means the produced-images
  // section simply does not render — see useImageUrlOptional.
  const imageUrl = useImageUrlOptional();

  const handleCopyOutput = useCallback(() => {
    const out = step.output as Record<string, unknown> | undefined;
    if (!out) return;
    void navigator.clipboard.writeText(JSON.stringify(out, null, 2)).then(() => {
      setCopyLabel('Copied!');
      setTimeout(() => setCopyLabel('Copy JSON'), 1000);
    });
  }, [step.output]);

  const output = step.output as Record<string, unknown> | undefined;
  const llmResponse = output?.response as string | undefined;
  const llmData = step.llm;
  const input = step.input as Record<string, unknown> | undefined;
  const statusColor = STATUS_COLOR[step.status] ?? 'var(--color-text-tertiary)';

  return (
    <div className="relative pl-9 mb-1">
      <div
        className="absolute left-[10px] top-[14px] w-3 h-3 rounded-full border-2 border-white z-[1] shadow-[0_0_0_1px_var(--color-border)]"
        style={{ background: statusColor }}
      />

      <div
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpanded(!expanded); } }}
        // Stable handle for the disclosure. Without it a spec has to match
        // this row by its text, and `getByRole('button', { name: /agent/i })`
        // matches the host's SIDEBAR pipeline link first whenever the
        // pipeline's own name contains the word — clicking it navigates away
        // and the step panel never opens, which reads as "the trace is broken".
        data-testid={`step-row-${stepId}`}
        data-node-type={nodeType}
        className={cn(
          'flex items-center gap-2.5 px-3.5 py-2.5 cursor-pointer transition-colors duration-100',
          expanded ? 'bg-surface-inset rounded-t-lg' : 'bg-surface rounded-lg',
        )}
        style={{
          border: `1px solid ${expanded ? statusColor + '40' : 'var(--color-border)'}`,
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
            {/* `output` is Record<string, unknown>; the guard only checks
                `tokensIn`, and `Number(undefined)` is NaN, so a step reporting
                input tokens but no output tokens rendered "NaN tok" in the
                collapsed header while the expanded panel below correctly showed
                "Tokens in: 4200 / Tokens out: —". Missing halves count as 0. */}
            {countTokens(output.tokensIn) + countTokens(output.tokensOut)} tok
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
                    <td className={tdClass}><span className={eventChipClass('var(--color-info)')}>started</span></td>
                    <td className={tdClass}>{new Date(step.startedAt).toLocaleTimeString()}</td>
                    <td className={tdClass}>Node {stepId.slice(0, 8)} ({nodeType}) began execution</td>
                  </tr>
                )}
                {llmData?.streamOpened && (
                  <tr className="border-b border-border">
                    <td className={tdClass}><span className={eventChipClass('var(--color-cat-ai)')}>stream.opened</span></td>
                    <td className={tdClass}>—</td>
                    <td className={tdClass}>LLM stream connection established</td>
                  </tr>
                )}
                {llmData?.firstTokenLatencyMs != null && (
                  <tr className="border-b border-border">
                    <td className={tdClass}><span className={eventChipClass('var(--color-cat-ai)')}>first.token</span></td>
                    <td className={tdClass}>+{llmData.firstTokenLatencyMs}ms</td>
                    <td className={tdClass}>First token received from LLM</td>
                  </tr>
                )}
                {step.completedAt && step.status === 'completed' && (
                  <tr className="border-b border-border">
                    <td className={tdClass}><span className={eventChipClass('var(--color-success)')}>completed</span></td>
                    <td className={tdClass}>{new Date(step.completedAt).toLocaleTimeString()}</td>
                    <td className={tdClass}>
                      Finished in {step.durationMs != null ? (step.durationMs < 1000 ? `${step.durationMs}ms` : `${(step.durationMs / 1000).toFixed(1)}s`) : '—'}
                    </td>
                  </tr>
                )}
                {step.status === 'failed' && (
                  <tr className="border-b border-border">
                    <td className={tdClass}><span className={eventChipClass('var(--color-danger)')}>failed</span></td>
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

          {/* Produced images — populated by `pipeline:step:image:produced`
              events (crop / adjust / save handlers). Rendered BEFORE the
              output section so image pipelines surface their artifacts at
              the top of the expanded panel. Needs a host image resolver;
              without one the section is omitted rather than rendering
              broken thumbnails. */}
          {imageUrl && step.images && step.images.length > 0 && (
            <StepSection title={`Produced images (${step.images.length})`}>
              <div className="flex flex-wrap gap-2">
                {step.images.map((img) => {
                  const bboxLabel = img.bbox
                    ? `[${img.bbox.x},${img.bbox.y} ${img.bbox.width}×${img.bbox.height}]`
                    : `${img.width}×${img.height}`;
                  return (
                    <figure
                      key={img.imageId}
                      className="m-0 flex flex-col gap-1 w-32"
                      title={`${img.imageId} — ${bboxLabel}`}
                    >
                      <img
                        src={imageUrl(img.imageId)}
                        alt={`Produced image ${img.imageId}`}
                        loading="lazy"
                        className="w-32 h-24 object-cover rounded border border-border bg-surface-inset block"
                      />
                      <figcaption className="font-mono text-[10px] text-text-tertiary overflow-hidden text-ellipsis whitespace-nowrap">
                        {bboxLabel}
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
            </StepSection>
          )}

          {(llmResponse || llmData?.response) ? (
            <StepSection title="Response">
              <div className={proseBlockClass}>
                {llmResponse ?? llmData?.response}
              </div>
            </StepSection>
          ) : isAgentStepOutput(output) ? (
            // `agent` steps get the tool-call waterfall + an honest header
            // instead of a JSON dump. See AgentTraceSection.
            <AgentTraceSection
              stepId={stepId}
              output={output}
              startedAt={step.startedAt}
              completedAt={step.completedAt}
            />
          ) : step.status === 'running' && (step.agentLive || nodeType === 'agent') ? (
            // LIVE agent trace: the step has no persisted output yet, but
            // `pipeline.step.agent.tool` events have been streaming into
            // `step.agentLive` (or the agent step just started and no tool
            // has fired). Render the same section in live mode so the
            // waterfall grows as calls happen instead of appearing only
            // after completion. When `step.output` lands, the branch above
            // takes over with the persisted truth.
            <AgentTraceSection
              stepId={stepId}
              output={liveAgentOutputFromCalls(step.agentLive?.toolCalls ?? [])}
              startedAt={step.startedAt}
              live
            />
          ) : output && classifyStepOutput(output) === 'vision' ? (
            // image:vision-analyze steps deserve the structured
            // VisionResultViewer composite — caption + tags + extracted JSON
            // + image preview — rather than a raw JSON dump. The viewer wants
            // a URL, so `imageId` is resolved through the host seam; with no
            // resolver the preview is simply absent and the rest still renders.
            <StepSection title="Vision result">
              <button
                type="button"
                onClick={handleCopyOutput}
                className="mb-1.5 px-2 py-[3px] text-[11px] font-medium border border-border-field rounded bg-transparent cursor-pointer font-[inherit] text-text-secondary"
              >
                📋 {copyLabel}
              </button>
              <VisionResultViewer result={visionResultFrom(output, imageUrl)} />
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
              <div className="px-3 py-2 bg-danger-bg border border-danger-border rounded-md text-xs text-danger-fg font-mono whitespace-pre-wrap">
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
